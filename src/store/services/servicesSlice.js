import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { RESCUE_SERVICE } from '../../data/collections';

export const fetchHomeServices = createAsyncThunk(
  'services/fetchHomeServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/service/home');
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: [RESCUE_SERVICE],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeServices.fulfilled, (state, action) => {
        state.loading = false;
        // Sort API services numerically by order ASC
        const apiServices = [...action.payload]
          .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
          .map((srv, index) => ({
            id: srv.id || srv.serviceId || `api-srv-${index + 1}`,
            number: String(index + 1).padStart(2, '0'),
            name: srv.name,
            title: srv.title,
            redline: srv.redline,
            description: srv.description,
            buttonText: srv.buttonText,
            image: srv.image,
            order: srv.order,
          }));

        // Append hardcoded Rescue as the 7th item
        state.items = [...apiServices, RESCUE_SERVICE];
      })
      .addCase(fetchHomeServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (state.items.length === 0) {
          state.items = [RESCUE_SERVICE];
        }
      });
  },
});

export default servicesSlice.reducer;
