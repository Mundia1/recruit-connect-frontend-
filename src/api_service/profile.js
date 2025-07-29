import apiClient from './apiClient';
import ApiError from './ApiError';

export const profileService = {
    getProfile: async (options = {}) => {
        try {
            const response = await apiClient('/profile/', options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};
