import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 1. Fetch Top Recent Blogs for Homepage / Sidebar
export const fetchRecentBlogs = createAsyncThunk(
  'blogs/fetchRecentBlogs',
  async ({ limit = 3 } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blog/recent?limit=${limit}`);
      if (response.data?.status && Array.isArray(response.data?.data)) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Fetch All Blogs with Filter, Search & Pagination
export const fetchBlogsList = createAsyncThunk(
  'blogs/fetchBlogsList',
  async ({ page = 1, limit = 9, category = '', search = '' } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', String(limit));
      if (category && category !== 'All') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());

      const response = await api.get(`/blog?${params.toString()}`);
      return {
        blogs: response.data?.data || [],
        pagination: response.data?.extra?.pagination || {
          totalDocs: 0,
          totalPages: 1,
          currentPage: page,
          limit,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 3. Fetch Single Blog Detail by Slug
export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blog/${slug}`);
      if (response.data?.status && response.data?.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    recentBlogs: [],
    recentLoading: false,
    recentFetched: false,

    list: [],
    pagination: { totalDocs: 0, totalPages: 1, currentPage: 1, limit: 9 },
    listLoading: false,
    listError: null,

    currentBlog: null,
    detailLoading: false,
    detailError: null,
  },
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Recent Blogs
      .addCase(fetchRecentBlogs.pending, (state) => {
        state.recentLoading = state.recentBlogs.length === 0;
      })
      .addCase(fetchRecentBlogs.fulfilled, (state, action) => {
        state.recentLoading = false;
        state.recentFetched = true;
        state.recentBlogs = action.payload;
      })
      .addCase(fetchRecentBlogs.rejected, (state) => {
        state.recentLoading = false;
        state.recentFetched = true;
      })
      // Blogs List
      .addCase(fetchBlogsList.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchBlogsList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload.blogs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogsList.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
      })
      // Single Blog Detail
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const { clearCurrentBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
