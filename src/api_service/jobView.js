import apiClient from './apiClient';
import ApiError from './ApiError';

export const jobViewService = {
    getMonthlyJobViews: async (year, month, options = {}) => {
        try {
            const response = await apiClient(`/job_views/monthly?year=${year}&month=${month}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};
