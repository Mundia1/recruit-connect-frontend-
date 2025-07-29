import apiClient from './apiClient';
import ApiError from './ApiError';

export const jobService = {
    getAllJobs: async (options = {}) => {
        try {
            const response = await apiClient('/jobs/', options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    getJobById: async (jobId, options = {}) => {
        try {
            const response = await apiClient(`/jobs/${jobId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    createJob: async (jobData, options = {}) => {
        try {
            const response = await apiClient('/jobs', { body: jobData, method: 'POST', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    updateJob: async (jobId, jobData, options = {}) => {
        try {
            const response = await apiClient(`/jobs/${jobId}`, { body: jobData, method: 'PATCH', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    deleteJob: async (jobId, options = {}) => {
        try {
            const response = await apiClient(`/jobs/${jobId}`, { method: 'DELETE', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
    
    applyForJob: async (jobId, formData, options = {}) => {
        try {
            const response = await apiClient(`/jobs/${jobId}/apply`, {
                method: 'POST',
                body: formData,
                ...options,
                headers: {
                    // Let the browser set the Content-Type header with the correct boundary
                    ...(options.headers || {}),
                }
            });
            return response;
        } catch (error) {
            console.error('Error applying for job:', error);
            throw new ApiError(
                error.message || 'Failed to submit application',
                error.status,
                error.data
            );
        }
    },
};