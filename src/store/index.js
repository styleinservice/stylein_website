import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './services/servicesSlice';
import brandsReducer from './brands/brandsSlice';
import rescueReducer from './rescue/rescueSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    brands: brandsReducer,
    rescue: rescueReducer,
  },
});

export default store;
