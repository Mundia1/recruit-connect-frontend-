import apiClient from './apiClient';
import ApiError from './ApiError';

export const feedbackService = {
    getFeedbackForApplication: async (jobApplicationId, options = {}) => {
        try {
            const response = await apiClient(`/feedback/application/${jobApplicationId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    submitFeedback: async (feedbackData, options = {}) => {
        try {
            const response = await apiClient('/feedback', { body: feedbackData, method: 'POST', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    getFeedbackById: async (feedbackId, options = {}) => {
        try {
            const response = await apiClient(`/feedback/${feedbackId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    updateFeedback: async (feedbackId, feedbackData, options = {}) => {
        try {
            const response = await apiClient(`/feedback/${feedbackId}`, { body: feedbackData, method: 'PATCH', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    deleteFeedback: async (feedbackId, options = {}) => {
        try {
            const response = await apiClient(`/feedback/${feedbackId}`, { method: 'DELETE', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};