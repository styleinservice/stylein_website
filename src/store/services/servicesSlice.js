import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { SERVICES_SECTION_DATA } from '../../constants/servicesData';

const INITIAL_FALLBACK_SERVICES = SERVICES_SECTION_DATA.map((srv, index) => ({
  id: srv.id,
  serviceId: srv.id,
  number: String(index + 1).padStart(2, '0'),
  name: srv.label,
  title: srv.title,
  redline: 'PREMIUM CARE',
  description: srv.description,
  buttonText: srv.cta,
  image: srv.image,
  order: index + 1,
}));

let initialServices = INITIAL_FALLBACK_SERVICES;
try {
  const stored = sessionStorage.getItem('stylein_home_services_cache');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      initialServices = parsed;
    }
  }
} catch (_) {}

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
    items: initialServices,
    loading: false,
    fetched: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeServices.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchHomeServices.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          const mapped = [...action.payload]
            .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
            .map((srv, index) => ({
              id: srv.id || srv.serviceId || `api-srv-${index + 1}`,
              serviceId: srv.serviceId || srv.id,
              number: String(index + 1).padStart(2, '0'),
              name: srv.name,
              title: srv.title,
              redline: srv.redline,
              description: srv.description,
              buttonText: srv.buttonText,
              image: srv.image,
              order: srv.order,
            }));
          state.items = mapped;
          try {
            sessionStorage.setItem('stylein_home_services_cache', JSON.stringify(mapped));
          } catch (_) {}
        }
      })
      .addCase(fetchHomeServices.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
