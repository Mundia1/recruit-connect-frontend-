import axios from 'axios';
import config from './config';
const { API_BASE_URL } = config;

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: `${API_BASE_URL}/applications`,
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

const applicationService = {
  /**
   * Submit a new job application
   * @param {Object} applicationData - Application data including job_posting_id and any additional fields
   * @returns {Promise<Object>} Created application
   */
  submitApplication: async (applicationData) => {
    try {
      const response = await api.post('/', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  /**
   * Get application by ID
   * @param {string} applicationId - Application ID
   * @returns {Promise<Object>} Application details
   */
  getApplication: async (applicationId) => {
    try {
      const response = await api.get(`/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  /**
   * Get all applications for the current user
   * @param {Object} filters - Optional filters (status, date range, etc.)
   * @returns {Promise<Array>} List of user's applications
   */
  getUserApplications: async (filters = {}) => {
    try {
      const response = await api.get('/me', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching user applications:', error);
      throw error;
    }
  },

  /**
   * Get all applications for a specific job posting (employer view)
   * @param {string} jobId - Job posting ID
   * @param {Object} filters - Optional filters (status, date range, etc.)
   * @returns {Promise<Array>} List of applications for the job
   */
  getJobApplications: async (jobId, filters = {}) => {
    try {
      const response = await api.get(`/job/${jobId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching job applications:', error);
      throw error;
    }
  },

  /**
   * Update application status
   * @param {string} applicationId - Application ID
   * @param {string} status - New status (e.g., 'submitted', 'reviewed', 'accepted', 'rejected')
   * @returns {Promise<Object>} Updated application
   */
  updateStatus: async (applicationId, status) => {
    try {
      const response = await api.patch(`/${applicationId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  /**
   * Withdraw an application
   * @param {string} applicationId - Application ID to withdraw
   * @returns {Promise<Object>} Withdrawal confirmation
   */
  withdrawApplication: async (applicationId) => {
    try {
      const response = await api.delete(`/${applicationId}/withdraw`);
      return response.data;
    } catch (error) {
      console.error('Error withdrawing application:', error);
      throw error;
    }
  },

  /**
   * Upload application documents
   * @param {string} applicationId - Application ID
   * @param {File} file - Document file to upload
   * @param {string} documentType - Type of document (resume, cover_letter, etc.)
   * @returns {Promise<Object>} Upload confirmation
   */
  uploadDocument: async (applicationId, file, documentType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', documentType);

      const response = await api.post(`/${applicationId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  /**
   * Get application timeline/status history
   * @param {string} applicationId - Application ID
   * @returns {Promise<Array>} Status history timeline
   */
  getApplicationTimeline: async (applicationId) => {
    try {
      const response = await api.get(`/${applicationId}/timeline`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application timeline:', error);
      throw error;
    }
  }
};

export default applicationService;