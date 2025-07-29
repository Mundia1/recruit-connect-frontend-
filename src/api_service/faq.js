import apiClient from './apiClient';
import ApiError from './ApiError';

export const faqService = {
    getAllFaqs: async (options = {}) => {
        try {
            const response = await apiClient('/faq', options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    getFaqById: async (faqId, options = {}) => {
        try {
            const response = await apiClient(`/faq/${faqId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    createFaq: async (faqData, options = {}) => {
        try {
            const response = await apiClient('/faq', { body: faqData, method: 'POST', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    updateFaq: async (faqId, faqData, options = {}) => {
        try {
            const response = await apiClient(`/faq/${faqId}`, { body: faqData, method: 'PATCH', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    deleteFaq: async (faqId, options = {}) => {
        try {
            const response = await apiClient(`/faq/${faqId}`, { method: 'DELETE', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};