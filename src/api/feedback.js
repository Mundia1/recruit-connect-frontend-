import axios from 'axios';
import config from './config';
const { API_BASE_URL } = config;

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: `${API_BASE_URL}/feedback`,
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

const feedbackService = {
  /**
   * Submit new feedback
   * @param {Object} feedbackData - Feedback data including job_application_id, rating, and optional comment
   * @returns {Promise<Object>} Created feedback
   */
  submitFeedback: async (feedbackData) => {
    try {
      const response = await api.post('/', feedbackData);
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  },

  /**
   * Get feedback by ID
   * @param {string} feedbackId - ID of the feedback to retrieve
   * @returns {Promise<Object>} Feedback details
   */
  getFeedback: async (feedbackId) => {
    try {
      const response = await api.get(`/${feedbackId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  },

  /**
   * Get all feedback for a specific job application
   * @param {string} applicationId - ID of the job application
   * @returns {Promise<Array>} List of feedback items
   */
  getFeedbackForApplication: async (applicationId) => {
    try {
      const response = await api.get(`/application/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback for application:', error);
      throw error;
    }
  },

  /**
   * Update existing feedback
   * @param {string} feedbackId - ID of the feedback to update
   * @param {Object} updates - Fields to update (rating, comment)
   * @returns {Promise<Object>} Updated feedback
   */
  updateFeedback: async (feedbackId, updates) => {
    try {
      const response = await api.patch(`/${feedbackId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating feedback:', error);
      throw error;
    }
  },

  /**
   * Delete feedback
   * @param {string} feedbackId - ID of the feedback to delete
   * @returns {Promise<Object>} Deletion status
   */
  deleteFeedback: async (feedbackId) => {
    try {
      const response = await api.delete(`/${feedbackId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw error;
    }
  },

  /**
   * Get feedback statistics for a job application
   * @param {string} applicationId - ID of the job application
   * @returns {Promise<Object>} Feedback statistics
   */
  getFeedbackStats: async (applicationId) => {
    try {
      const response = await api.get(`/application/${applicationId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
      throw error;
    }
  }
};

export default feedbackService;