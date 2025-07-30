import apiClient from './apiClient';
import ApiError from './ApiError';

export const applicationService = {
    getAllApplications: async (params = {}, options = {}) => {
        try {
            const query = new URLSearchParams(params).toString();
            const response = await apiClient(`/applications/${query ? `?${query}` : ''}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    getApplicationById: async (applicationId, options = {}) => {
        try {
            const response = await apiClient(`/applications/${applicationId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    createApplication: async (formData, options = {}) => {
        try {
            // The 'Content-Type' header is intentionally not set.
            // When passing a FormData object as the body, the browser
            // automatically sets 'Content-Type' to 'multipart/form-data'
            // with the correct boundary, which is required for file uploads.
            const response = await apiClient('/applications/', { body: formData, method: 'POST', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    submitApplication: async (applicationData, options = {}) => {
        try {
            const response = await apiClient('/applications/', {
                body: applicationData,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                ...options,
            });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    updateApplicationStatus: async (applicationId, statusData, options = {}) => {
        try {
            const response = await apiClient(`/applications/${applicationId}`, { body: statusData, method: 'PATCH', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    deleteApplication: async (applicationId, options = {}) => {
        try {
            const response = await apiClient(`/applications/${applicationId}`, { method: 'DELETE', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};