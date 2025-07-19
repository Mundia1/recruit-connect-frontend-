import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
9