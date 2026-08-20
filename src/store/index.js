import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './services/servicesSlice';
import brandsReducer from './brands/brandsSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    brands: brandsReducer,
  },
});

export default store;
