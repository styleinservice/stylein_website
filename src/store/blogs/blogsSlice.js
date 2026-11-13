import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 1. Fetch Top Recent Blogs for Homepage / Sidebar
export const fetchRecentBlogs = createAsyncThunk(
  'blogs/fetchRecentBlogs',
  async ({ limit = 3 } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blog/recent?limit=${limit}`);
      const data = response.data?.data || response.data?.blogs || (Array.isArray(response.data) ? response.data : []);
      return Array.isArray(data) ? data : [];
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
      const blogs = response.data?.data || response.data?.blogs || (Array.isArray(response.data) ? response.data : []);
      const pagination = response.data?.pagination || response.data?.extra?.pagination || {
        totalDocs: blogs.length,
        totalPages: 1,
        currentPage: page,
        limit,
      };
      return { blogs, pagination };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 3. Fetch Single Blog Detail by Slug (with Automatic Fallback & Structured Redirect Support)
export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug, { rejectWithValue }) => {
    if (!slug) return rejectWithValue('Slug parameter is required');

    let response = null;
    const cleanSlug = encodeURIComponent(String(slug).trim());

    // Try /api/blogs/slug/:slug first, then fallback to /blogs/:slug and /blog/:slug
    try {
      response = await api.get(`/api/blogs/slug/${cleanSlug}`);
    } catch (err1) {
      try {
        response = await api.get(`/blogs/${cleanSlug}`);
      } catch (err2) {
        try {
          response = await api.get(`/blog/${cleanSlug}`);
        } catch (err3) {
          const errMsg = err3.response?.data?.message || err2.response?.data?.message || err1.response?.data?.message || 'Blog post not found';
          return rejectWithValue(errMsg);
        }
      }
    }

    if (!response || !response.data) {
      return rejectWithValue('Blog post not found');
    }

    const resData = response.data;

    // Check for structured redirect response (HTTP 301 / oldSlug -> newSlug)
    const isRedirect = Boolean(
      resData?.extra?.isRedirect ||
      resData?.statusCode === 301 ||
      resData?.data?.isRedirect ||
      (resData?.extra?.newSlug && resData.extra.newSlug !== slug)
    );

    if (isRedirect) {
      const newSlug = resData?.extra?.newSlug || resData?.data?.newSlug;
      const canonicalUrl = resData?.extra?.canonicalUrl || (newSlug ? `https://www.styleincar.com/blogs/${newSlug}` : null);
      const redirectUrl = resData?.extra?.redirectUrl || (newSlug ? `/blogs/${newSlug}` : null);
      return {
        isRedirect: true,
        statusCode: 301,
        oldSlug: resData?.extra?.oldSlug || slug,
        newSlug,
        canonicalUrl,
        redirectUrl,
        blog: resData?.data?.title ? resData.data : null,
      };
    }

    // Normal blog payload
    const blog = resData.data || resData.blog || (resData.title ? resData : null);
    if (blog && (blog.title || blog._id)) {
      return {
        isRedirect: false,
        blog,
        extra: resData.extra || null,
      };
    }

    return rejectWithValue('Blog post not found');
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
    redirectInfo: null,
    detailLoading: false,
    detailError: null,
  },
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
      state.redirectInfo = null;
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
        state.redirectInfo = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.detailLoading = false;
        if (action.payload?.isRedirect) {
          state.redirectInfo = action.payload;
          state.currentBlog = action.payload.blog || null;
        } else {
          state.redirectInfo = null;
          state.currentBlog = action.payload?.blog || action.payload;
        }
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
        state.currentBlog = null;
        state.redirectInfo = null;
      });
  },
});

export const { clearCurrentBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
