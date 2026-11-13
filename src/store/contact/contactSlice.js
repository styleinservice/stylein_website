import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { CONTACT_INFO } from '../../constants/contactData';

const DEFAULT_CONTACT_DATA = {
  phone: CONTACT_INFO.phone || '+971 4 800 STYLE',
  whatsapp: CONTACT_INFO.whatsapp || '+971 50 999 8877',
  email: CONTACT_INFO.email || 'support@stylein.ae',
  address: CONTACT_INFO.address || 'Showroom 4, Sheikh Zayed Road, Al Quoz 3, Dubai, UAE',
  workingHours: 'Monday - Sunday: 08:00 AM - 10:00 PM',
  googleMapsUrl: CONTACT_INFO.mapsHref || 'https://maps.google.com/?q=Al+Quoz+Dubai',
  mapEmbedUrl: CONTACT_INFO.mapEmbedUrl || 'https://maps.google.com/maps?q=Al+Quoz+Dubai&output=embed',
  coordinates: CONTACT_INFO.coordinates || '25°08\'12.0"N 55°14\'30.0"E',
  license: CONTACT_INFO.license || 'Trade License No. 59292',
  socialLinks: {
    instagram: 'https://instagram.com/stylein_dubai',
    facebook: 'https://facebook.com/stylein.ae',
  },
};

// Fetch Dynamic Website Contact Details
export const fetchContactDetails = createAsyncThunk(
  'contact/fetchContactDetails',
  async (_, { rejectWithValue }) => {
    try {
      let response;
      try {
        response = await api.get('/contact');
      } catch {
        response = await api.get('/contact/details');
      }

      if (response.data?.data) {
        return response.data.data;
      }
      if (response.data && typeof response.data === 'object' && (response.data.phone || response.data.customerSupportPhone)) {
        return response.data;
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: DEFAULT_CONTACT_DATA,
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        if (action.payload) {
          const payload = action.payload;
          state.data = {
            ...state.data,
            ...payload,
            phone: payload.customerSupportPhone || payload.phone || state.data.phone,
            whatsapp: payload.customerWhatsapp || payload.whatsapp || state.data.whatsapp,
            email: payload.customerSupportEmail || payload.email || state.data.email,
            address: payload.address || state.data.address,
            workingHours: payload.workingHours || state.data.workingHours,
            googleMapsUrl: payload.googleMapsUrl || state.data.googleMapsUrl,
            socialLinks: {
              ...state.data.socialLinks,
              ...(payload.socialLinks || {}),
            },
          };
        }
      })
      .addCase(fetchContactDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
