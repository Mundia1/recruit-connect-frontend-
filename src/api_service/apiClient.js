import API_BASE_URL from './config.js';
import ApiError from './ApiError.js';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Token management functions
export const getToken = () => localStorage.getItem('access_token');

export const setToken = (token) => {
    localStorage.setItem('access_token', token);
    // Update the default Authorization header
    apiClient.defaults = apiClient.defaults || {};
    apiClient.defaults.headers = apiClient.defaults.headers || {};
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
    localStorage.removeItem('access_token');
    if (apiClient.defaults?.headers) {
        delete apiClient.defaults.headers.Authorization;
    }
};

export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const setRefreshToken = (token) => localStorage.setItem('refresh_token', token);
export const removeRefreshToken = () => localStorage.removeItem('refresh_token');

const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...(customConfig.headers || {}),
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const url = `${API_BASE_URL}${endpoint}`;

    try {
        let response = await fetch(url, config);
        let data = await response.json().catch(() => ({}));

        if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    config.headers.Authorization = `Bearer ${token}`;
                    return fetch(url, config).then(res => res.json());
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            isRefreshing = true;

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                removeToken();
                removeRefreshToken();
                processQueue(new ApiError('Unauthorized: No refresh token available.', 401));
                throw new ApiError('Unauthorized: No refresh token available.', 401);
            }

            try {
                const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${refreshToken}`,
                    },
                });
                const refreshData = await refreshResponse.json();

                if (refreshResponse.ok) {
                    setToken(refreshData.access_token);
                    isRefreshing = false;
                    processQueue(null, refreshData.access_token);

                    // Retry the original request with the new token
                    config.headers.Authorization = `Bearer ${refreshData.access_token}`;
                    response = await fetch(url, config);
                    data = await response.json().catch(() => ({}));

                    if (!response.ok) {
                        throw new ApiError(data.message || response.statusText || 'Something went wrong', response.status, data);
                    }
                    return data;
                } else {
                    removeToken();
                    removeRefreshToken();
                    isRefreshing = false;
                    processQueue(new ApiError(refreshData.message || 'Failed to refresh token', refreshResponse.status, refreshData));
                    throw new ApiError(refreshData.message || 'Failed to refresh token', refreshResponse.status, refreshData);
                }
            } catch (refreshError) {
                removeToken();
                removeRefreshToken();
                isRefreshing = false;
                processQueue(new ApiError(refreshError.message || 'Network error during token refresh', 0));
                throw new ApiError(refreshError.message || 'Network error during token refresh', 0);
            }
        }

        if (!response.ok) {
            throw new ApiError(data.message || response.statusText || 'Something went wrong', response.status, data);
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(error.message || 'Network error', 0, null);
        }
    }
};

// Export the apiClient as default
export default apiClient;