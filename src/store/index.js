import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './services/servicesSlice';
import brandsReducer from './brands/brandsSlice';
import rescueReducer from './rescue/rescueSlice';
import blogsReducer from './blogs/blogsSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    brands: brandsReducer,
    rescue: rescueReducer,
    blogs: blogsReducer,
  },
});

export default store;
