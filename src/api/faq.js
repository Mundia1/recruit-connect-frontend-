import axios from 'axios';
import { getApiUrl, getAuthHeader } from './config';

// Create axios instance with base URL
const api = axios.create({
  baseURL: getApiUrl('/faqs'),
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    ...getAuthHeader()
  }
});

const faqService = {
  /**
   * Get all FAQs
   * @param {Object} filters - Optional filters (category, is_featured, etc.)
   * @returns {Promise<Array>} List of FAQs
   */
  getAllFAQs: async (filters = {}) => {
    try {
      const response = await api.get('/', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },

  /**
   * Get FAQ by ID
   * @param {string} id - FAQ ID
   * @returns {Promise<Object>} FAQ details
   */
  getFAQ: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching FAQ ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get FAQ categories
   * @returns {Promise<Array>} List of FAQ categories
   */
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQ categories:', error);
      throw error;
    }
  },

  /**
   * Get FAQs by category
   * @param {string} category - Category name
   * @returns {Promise<Array>} List of FAQs in the category
   */
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/category/${encodeURIComponent(category)}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching FAQs for category ${category}:`, error);
      throw error;
    }
  },

  /**
   * Search FAQs
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  searchFAQs: async (query) => {
    try {
      const response = await api.get('/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching FAQs:', error);
      throw error;
    }
  },

  /**
   * Create a new FAQ (Admin only)
   * @param {Object} faqData - FAQ data
   * @returns {Promise<Object>} Created FAQ
   */
  createFAQ: async (faqData) => {
    try {
      const response = await api.post('/', faqData);
      return response.data;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }
  },

  /**
   * Update an FAQ (Admin only)
   * @param {string} id - FAQ ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated FAQ
   */
  updateFAQ: async (id, updates) => {
    try {
      const response = await api.patch(`/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating FAQ ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an FAQ (Admin only)
   * @param {string} id - FAQ ID to delete
   * @returns {Promise<Object>} Deletion status
   */
  deleteFAQ: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting FAQ ${id}:`, error);
      throw error;
    }
  },

  /**
   * Increment FAQ view count
   * @param {string} id - FAQ ID
   * @returns {Promise<Object>} Updated view count
   */
  incrementViewCount: async (id) => {
    try {
      const response = await api.post(`/${id}/view`);
      return response.data;
    } catch (error) {
      console.error(`Error incrementing view count for FAQ ${id}:`, error);
      throw error;
    }
  },

  /**
   * Rate FAQ helpfulness
   * @param {string} id - FAQ ID
   * @param {boolean} isHelpful - Whether the FAQ was helpful
   * @returns {Promise<Object>} Updated helpfulness rating
   */
  rateHelpfulness: async (id, isHelpful) => {
    try {
      const response = await api.post(`/${id}/rate`, { is_helpful: isHelpful });
      return response.data;
    } catch (error) {
      console.error(`Error rating FAQ ${id}:`, error);
      throw error;
    }
  }
};

export default faqService;