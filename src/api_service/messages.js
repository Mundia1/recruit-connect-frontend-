import apiClient from './apiClient';
import ApiError from './ApiError';

export const messageService = {
    getMessagesBetweenUsers: async (user1Id, user2Id, options = {}) => {
        try {
            const response = await apiClient(`/messages/between/${user1Id}/${user2Id}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    sendMessage: async (messageData, options = {}) => {
        try {
            const response = await apiClient('/messages', { body: messageData, method: 'POST', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    getMessageById: async (messageId, options = {}) => {
        try {
            const response = await apiClient(`/messages/${messageId}`, options);
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    markMessageAsRead: async (messageId, options = {}) => {
        try {
            const response = await apiClient(`/messages/${messageId}/read`, { method: 'PATCH', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },

    deleteMessage: async (messageId, options = {}) => {
        try {
            const response = await apiClient(`/messages/${messageId}`, { method: 'DELETE', ...options });
            return response;
        } catch (error) {
            throw new ApiError(error.message, error.status, error.data);
        }
    },
};