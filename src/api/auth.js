import axios from 'axios';
import config from './config';
const { API_BASE_URL } = config;

// Create axios instance with base URL
const api = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && !config.url.includes('/refresh') && !config.url.includes('/login')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url.includes('/refresh')) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');
        
        const response = await api.post('/refresh', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        
        const { access_token, refresh_token } = response.data;
        
        // Store the new tokens
        localStorage.setItem('accessToken', access_token);
        if (refresh_token) {
          localStorage.setItem('refreshToken', refresh_token);
        }
        
        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh fails, clear tokens and redirect to login
        authService.logout();
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} User data and tokens
   */
  register: async (userData) => {
    try {
      const response = await api.post('/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
      });
      const { user, access_token, refresh_token } = response.data;
      
      // Store tokens
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User data
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { user, access_token, refresh_token } = response.data.data;
      
      if (!user) {
        throw new Error('No user data returned from server');
      }
      
      // Ensure user has required fields
      const userWithDefaults = {
        ...user,
        email: user.email || email, // Use email from response or fallback to input
        role: user.role?.toLowerCase() || 'job_seeker' // Ensure role is lowercase
      };
      
      return { 
        user: userWithDefaults, 
        access_token, 
        refresh_token 
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    // Clear tokens and user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Clear any other user-related data
    delete axios.defaults.headers.common['Authorization'];
    // Redirect to login page
    window.location.href = '/login';
  },

  /**
   * Get current authenticated user
   * @returns {Promise<Object|null>} Current user data or null if not authenticated
   */
  getCurrentUser: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        authService.logout();
      }
      return null;
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Server response
   */
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param {string} token - Password reset token
   * @param {string} password - New password
   * @param {string} passwordConfirmation - Password confirmation
   * @returns {Promise<Object>} Server response
   */
  resetPassword: async (token, password, passwordConfirmation) => {
    try {
      const response = await api.post('/reset-password', {
        token,
        password,
        password_confirmation: passwordConfirmation
      });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  /**
   * Change password while authenticated
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Server response
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  /**
   * Verify email with token
   * @param {string} token - Email verification token
   * @returns {Promise<Object>} Server response
   */
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/verify-email/${token}`);
      return response.data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Get auth headers
   * @returns {Object} Authorization header
   */
  getAuthHeader: () => {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

export default authService;