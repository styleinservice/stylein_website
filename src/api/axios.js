import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://stylein-backend-334136272370.asia-south1.run.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
