import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

let savedBrands = [];
try {
  const stored = sessionStorage.getItem('stylein_brands_cache');
  if (stored) savedBrands = JSON.parse(stored);
} catch (_) {}

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

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    items: savedBrands,
    loading: savedBrands.length === 0,
    error: null,
    fetched: savedBrands.length > 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default brandsSlice.reducer;
