import apiClient, { setToken, setRefreshToken, removeToken, removeRefreshToken, getToken } from './apiClient';
import ApiError from './ApiError';

export const authService = {
    register: async (userData) => {
        try {
            const response = await apiClient('/auth/register', {
                method: 'POST',
                body: userData
            });
            return response;
        } catch (error) {
            throw new ApiError(
                error.message || 'Registration failed',
                error.status || 500,
                error.data
            );
        }
    },

    login: async (email, password) => {
        try {
            const response = await apiClient('/auth/login', {
                method: 'POST',
                body: { email, password }
            });
            
            
            if (response.access_token && response.refresh_token) {
                setToken(response.access_token);
                setRefreshToken(response.refresh_token);
                // Set the token in the Authorization header for subsequent requests
                const token = getToken();
                if (token) {
                    apiClient.defaults = apiClient.defaults || {};
                    apiClient.defaults.headers = apiClient.defaults.headers || {};
                    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
                }
            }
            return response;
        } catch (error) {
            console.error('Login API error:', error);
            throw new ApiError(
                error.message || 'Login failed. Please check your credentials.',
                error.status || 500,
                error.data
            );
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await apiClient('/auth/me');
            return response;
        } catch (error) {
            throw new ApiError(
                error.message || 'Failed to fetch user data',
                error.status,
                error.data
            );
        }
    },

    refreshAccessToken: async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new ApiError('No refresh token available', 401);
        }

        try {
            const response = await apiClient('/auth/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            if (response.access_token) {
                setToken(response.access_token);
                if (response.refresh_token) {
                    setRefreshToken(response.refresh_token);
                }
                return response;
            }
            throw new ApiError('Invalid response from server', 500);
        } catch (error) {
            // If refresh fails, clear tokens and redirect to login
            if (error.status === 401) {
                removeToken();
                removeRefreshToken();
            }
            throw error;
        }
    },

    logout: () => {
        // Clear tokens
        removeToken();
        removeRefreshToken();
        
        // Clear any stored user data
        localStorage.removeItem('user');
        
        // Clear the Authorization header
        if (apiClient.defaults && apiClient.defaults.headers) {
            delete apiClient.defaults.headers.Authorization;
        }
    }
};