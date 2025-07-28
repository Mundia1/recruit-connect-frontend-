
import axios from 'axios';
import config from './config';
const { API_BASE_URL } = config;

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const adminService = {
  // User Management
  /**
   * Get all users
   * @param {Object} filters - Optional filters for user listing
   * @returns {Promise<Array>} List of users
   */
  getUsers: async (filters = {}) => {
    try {
      const response = await api.get('/users', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User details
   */
  getUser: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  /**
   * Update user role
   * @param {string} userId - User ID
   * @param {string} role - New role (job_seeker, employer, admin)
   * @returns {Promise<Object>} Updated user
   */
  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },

  /**
   * Delete user
   * @param {string} userId - User ID to delete
   * @returns {Promise<Object>} Deletion status
   */
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Application Management
  /**
   * Get all applications
   * @param {Object} filters - Optional filters for applications
   * @returns {Promise<Array>} List of applications
   */
  getApplications: async (filters = {}) => {
    try {
      const response = await api.get('/applications', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  /**
   * Update application status
   * @param {string} applicationId - Application ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated application
   */
  updateApplicationStatus: async (applicationId, status) => {
    try {
      const response = await api.patch(`/applications/${applicationId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  // System Statistics
  /**
   * Get system statistics
   * @returns {Promise<Object>} System statistics
   */
  getStatistics: async () => {
    try {
      const response = await api.get('/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Content Management
  /**
   * Get system content (FAQs, terms, etc.)
   * @param {string} contentType - Type of content to fetch
   * @returns {Promise<Object>} Content data
   */
  getContent: async (contentType) => {
    try {
      const response = await api.get(`/content/${contentType}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${contentType}:`, error);
      throw error;
    }
  },

  /**
   * Update system content
   * @param {string} contentType - Type of content to update
   * @param {Object} content - New content data
   * @returns {Promise<Object>} Updated content
   */
  updateContent: async (contentType, content) => {
    try {
      const response = await api.put(`/content/${contentType}`, content);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${contentType}:`, error);
      throw error;
    }
  }
};

export default adminService;
