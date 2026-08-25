import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

let savedRescue = null;
try {
  const stored = sessionStorage.getItem('stylein_rescue_cache');
  if (stored) savedRescue = JSON.parse(stored);
} catch (_) {}

export const fetchRescuePage = createAsyncThunk(
  'rescue/fetchRescuePage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/rescue');
      if (response.data && response.data.success !== false) {
        return response.data.data || response.data;
      }
      return rejectWithValue(response.data?.message || 'Failed to load rescue page');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Network error');
    }
  }
);

const rescueSlice = createSlice({
  name: 'rescue',
  initialState: {
    data: savedRescue,
    loading: !savedRescue,
    fetched: !!savedRescue,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRescuePage.pending, (state) => {
        if (!state.data) state.loading = true;
        state.error = null;
      })
      .addCase(fetchRescuePage.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        const payload = action.payload;
        if (payload) {
          const cloned = { ...payload };
          if (Array.isArray(cloned.heroServices)) {
            cloned.heroServices = [...cloned.heroServices].sort(
              (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)
            );
          }
          if (Array.isArray(cloned.rescueServices)) {
            cloned.rescueServices = [...cloned.rescueServices].sort(
              (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)
            );
          }
          state.data = cloned;
          try {
            sessionStorage.setItem('stylein_rescue_cache', JSON.stringify(cloned));
          } catch (_) {}
        } else {
          state.data = null;
        }
      })
      .addCase(fetchRescuePage.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = action.payload;
      });
  },
});

export default rescueSlice.reducer;
