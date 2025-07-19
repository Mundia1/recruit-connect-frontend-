import axios from 'axios';

// Ensure the VITE_API_URL is set in your .env file
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL is not defined. Please set it in your .env file');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/auth/refresh`, { refresh_token: refreshToken });
        const { access_token } = response.data;
        
        localStorage.setItem('access_token', access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        return api(originalRequest);
      } catch (error) {
        // If refresh fails, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const updateUserProfile = async (updates) => {
  const response = await api.patch('/users/me', updates);
  return response.data;
};

export const getUserApplications = async (userId) => {
  const response = await api.get(`/applications?user_id=${userId}`);
  return response.data;
};
