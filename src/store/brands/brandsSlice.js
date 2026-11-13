import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { getBrandSlug, isBrandMatchSlug } from '../../utils/brandSlug';

let savedBrands = [];
try {
  const stored = sessionStorage.getItem('stylein_brands_cache');
  if (stored) savedBrands = JSON.parse(stored);
} catch (_) {}

/**
 * Fetch all active public brands from the backend API.
 * Always retrieves fresh data and updates Redux state and session cache.
 */
export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/brand');
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Fetch a single brand by its URL slug.
 * Supports:
 *  1. Backend GET /api/brands/slug/:slug?redirect=false (preferred)
 *  2. Backend GET /brand/slug/:slug?redirect=false
 *  3. Fallback resolution via active brands list with oldSlugs history check
 * Handles HTTP 301 redirects & preserves canonical navigation.
 */
export const fetchBrandBySlug = createAsyncThunk(
  'brands/fetchBrandBySlug',
  async (slugParam, { rejectWithValue, getState }) => {
    if (!slugParam) return rejectWithValue('Slug parameter is required');
    const slug = slugParam.trim().toLowerCase();

    // 1. Try the primary public backend brand slug endpoint: /api/brands/slug/:slug
    try {
      const res = await api.get(`/api/brands/slug/${encodeURIComponent(slug)}?redirect=false`);
      if (res.data?.success && res.data?.data) {
        const result = {
          isRedirect: Boolean(res.data.data.isRedirect || res.status === 301),
          currentSlug: res.data.data.currentSlug || getBrandSlug(res.data.data),
          brand: res.data.data,
        };
        try {
          sessionStorage.setItem(`stylein_brand_detail_${slug}`, JSON.stringify(result));
        } catch (_) {}
        return result;
      }
    } catch (err1) {
      if (err1.response?.status === 301 && err1.response?.data?.data) {
        return {
          isRedirect: true,
          currentSlug: err1.response.data.data.currentSlug || getBrandSlug(err1.response.data.data),
          brand: err1.response.data.data,
        };
      }

      // 2. Try alternative backend endpoint: /brand/slug/:slug
      try {
        const res2 = await api.get(`/brand/slug/${encodeURIComponent(slug)}?redirect=false`);
        if (res2.data?.success && res2.data?.data) {
          const result = {
            isRedirect: Boolean(res2.data.data.isRedirect || res2.status === 301),
            currentSlug: res2.data.data.currentSlug || getBrandSlug(res2.data.data),
            brand: res2.data.data,
          };
          try {
            sessionStorage.setItem(`stylein_brand_detail_${slug}`, JSON.stringify(result));
          } catch (_) {}
          return result;
        }
      } catch (_) {}
    }

    // 3. Resilient Fallback: Look up from existing Redux items, or fetch fresh active brands if not matched
    try {
      let brandList = getState().brands.items;
      let activeBrands = Array.isArray(brandList) ? brandList.filter((b) => !b.deleted && b.active) : [];
      let matched = activeBrands.find((b) => isBrandMatchSlug(b, slug));

      // If not found in memory (e.g. newly created brand in Admin Panel), fetch latest from backend
      if (!matched) {
        const resList = await api.get('/brand');
        brandList = resList.data?.data || [];
        activeBrands = brandList.filter((b) => !b.deleted && b.active);
        matched = activeBrands.find((b) => isBrandMatchSlug(b, slug));
      }

      if (matched) {
        const canonical = getBrandSlug(matched);
        const isOld = Array.isArray(matched.oldSlugs) &&
          matched.oldSlugs.some((s) => s.toLowerCase() === slug) &&
          canonical !== slug;

        const result = {
          isRedirect: isOld,
          currentSlug: canonical,
          brand: matched,
        };
        try {
          sessionStorage.setItem(`stylein_brand_detail_${slug}`, JSON.stringify(result));
        } catch (_) {}
        return result;
      }
    } catch (fallbackErr) {
      return rejectWithValue(fallbackErr.message || 'Error resolving brand');
    }

    return rejectWithValue(`Brand with slug '${slug}' not found`);
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    items: savedBrands,
    loading: savedBrands.length === 0,
    error: null,
    fetched: false,

    // Brand Detail State
    currentBrand: null,
    detailLoading: false,
    detailError: null,
    redirectInfo: null,
  },
  reducers: {
    clearCurrentBrand: (state) => {
      state.currentBrand = null;
      state.detailError = null;
      state.redirectInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Brands Listing
      .addCase(fetchBrands.pending, (state) => {
        if (state.items.length === 0) state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.fetched = true;
        try {
          sessionStorage.setItem('stylein_brands_cache', JSON.stringify(action.payload));
        } catch (_) {}
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = action.payload;
      })

      // Single Brand Detail by Slug
      .addCase(fetchBrandBySlug.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.redirectInfo = null;
      })
      .addCase(fetchBrandBySlug.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentBrand = action.payload.brand;
        state.redirectInfo = action.payload.isRedirect
          ? {
              isRedirect: true,
              currentSlug: action.payload.currentSlug,
            }
          : null;
      })
      .addCase(fetchBrandBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.currentBrand = null;
        state.detailError = action.payload || 'Brand not found';
        state.redirectInfo = null;
      });
  },
});

export const { clearCurrentBrand } = brandsSlice.actions;
export default brandsSlice.reducer;
