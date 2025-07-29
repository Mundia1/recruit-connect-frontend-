import apiClient from './apiClient';
import ApiError from './ApiError';

export const adminService = {
    getAllUsers: async (options = {}) => {
        try {
            const response = await apiClient('/admin/users', options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    getUserById: async (userId, options = {}) => {
        try {
            const response = await apiClient(`/admin/users/${userId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    updateUserRole: async (userId, roleData, options = {}) => {
        try {
            const response = await apiClient(`/admin/users/${userId}/role`, { body: roleData, method: 'PUT', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    deleteUser: async (userId, options = {}) => {
        try {
            const response = await apiClient(`/admin/users/${userId}`, { method: 'DELETE', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};
