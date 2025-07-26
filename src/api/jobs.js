import axios from 'axios';
import { getApiUrl, getAuthHeader } from './config';

// Create axios instance with base URL
const api = axios.create({
  baseURL: getApiUrl('/jobs'),
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    ...getAuthHeader()
  }
});

const jobsService = {
  /**
   * Get all jobs with optional filters
   * @param {Object} filters - Optional filters (page, limit, search, location, etc.)
   * @returns {Promise<Object>} Paginated jobs data
   */
  getJobs: async (filters = {}) => {
    try {
      const response = await api.get('/', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  /**
   * Get job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Job details
   */
  getJob: async (jobId) => {
    try {
      const response = await api.get(`/${jobId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new job (Employer only)
   * @param {Object} jobData - Job data
   * @returns {Promise<Object>} Created job
   */
  createJob: async (jobData) => {
    try {
      const response = await api.post('/', jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  /**
   * Update a job (Employer only)
   * @param {string} jobId - Job ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated job
   */
  updateJob: async (jobId, updates) => {
    try {
      const response = await api.patch(`/${jobId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a job (Employer/Admin only)
   * @param {string} jobId - Job ID to delete
   * @returns {Promise<Object>} Deletion status
   */
  deleteJob: async (jobId) => {
    try {
      const response = await api.delete(`/${jobId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Get jobs posted by current employer
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} List of jobs
   */
  getMyJobs: async (filters = {}) => {
    try {
      const response = await api.get('/my-jobs', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching my jobs:', error);
      throw error;
    }
  },

  /**
   * Search jobs with advanced filters
   * @param {Object} searchParams - Search parameters
   * @returns {Promise<Object>} Search results
   */
  searchJobs: async (searchParams = {}) => {
    try {
      const response = await api.get('/search', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  },

  /**
   * Get job categories
   * @returns {Promise<Array>} List of job categories
   */
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching job categories:', error);
      throw error;
    }
  },

  /**
   * Get job types (Full-time, Part-time, etc.)
   * @returns {Promise<Array>} List of job types
   */
  getJobTypes: async () => {
    try {
      const response = await api.get('/types');
      return response.data;
    } catch (error) {
      console.error('Error fetching job types:', error);
      throw error;
    }
  },

  /**
   * Save job for later (Job Seeker only)
   * @param {string} jobId - Job ID to save
   * @returns {Promise<Object>} Save status
   */
  saveJob: async (jobId) => {
    try {
      const response = await api.post(`/${jobId}/save`);
      return response.data;
    } catch (error) {
      console.error(`Error saving job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Unsave a job (Job Seeker only)
   * @param {string} jobId - Job ID to unsave
   * @returns {Promise<Object>} Unsave status
   */
  unsaveJob: async (jobId) => {
    try {
      const response = await api.delete(`/${jobId}/save`);
      return response.data;
    } catch (error) {
      console.error(`Error unsaving job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Get saved jobs (Job Seeker only)
   * @returns {Promise<Array>} List of saved jobs
   */
  getSavedJobs: async () => {
    try {
      const response = await api.get('/saved');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      throw error;
    }
  },

  /**
   * Apply for a job (Job Seeker only)
   * @param {string} jobId - Job ID to apply for
   * @param {Object} applicationData - Application data (resume, cover letter, etc.)
   * @returns {Promise<Object>} Application status
   */
  applyForJob: async (jobId, applicationData) => {
    try {
      const formData = new FormData();
      
      // Append files
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }
      if (applicationData.coverLetter) {
        formData.append('cover_letter', applicationData.coverLetter);
      }
      
      // Append other fields
      Object.keys(applicationData).forEach(key => {
        if (key !== 'resume' && key !== 'coverLetter') {
          formData.append(key, applicationData[key]);
        }
      });

      const response = await api.post(`/${jobId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error applying for job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Get similar jobs
   * @param {string} jobId - Job ID to find similar jobs for
   * @returns {Promise<Array>} List of similar jobs
   */
  getSimilarJobs: async (jobId) => {
    try {
      const response = await api.get(`/${jobId}/similar`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching similar jobs for ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Get job application statistics (Employer only)
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Application statistics
   */
  getJobStats: async (jobId) => {
    try {
      const response = await api.get(`/${jobId}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stats for job ${jobId}:`, error);
      throw error;
    }
  }
};

export default jobsService;