/**
 * API Configuration
 * @module api/config
 */

// API Configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_PATH;

// Validate required environment variables
if (!API_BASE_URL) {
  console.warn('VITE_API_BASE_PATH is not set in .env file');
}

// App constants
const APP_CONFIG = {
  // API Settings
  API_TIMEOUT: 30000, // 30 seconds
  
  // Authentication
  TOKEN_REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  
  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER_DATA: 'userData'
  }

};

// Freeze the config object to prevent modifications
Object.freeze(APP_CONFIG);

// Helper functions
export const getApiUrl = (endpoint = '') => {
  // Ensure endpoint starts with a forward slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${path}`;
};

/**
 * Get default headers for API requests
 * @returns {Object} Headers with content type and authorization if available
 */
export const getDefaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Only add authorization header if token exists
  const token = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Get authentication header
 * @returns {Object} Authorization header or empty object
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = data.errors || [];
    this.data = data;
    
    // Maintain proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Handle API response with enhanced error handling
 * @param {Response} response - Fetch response object
 * @returns {Promise<any>} Parsed JSON response
 * @throws {ApiError} Custom error with status and error details
 */
export const handleResponse = async (response) => {
  // Handle empty responses (like 204 No Content)
  if (response.status === 204) {
    return null;
  }

  // Handle different content types
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  try {
    let data;
    
    if (isJson) {
      try {
        data = await response.json();
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        throw new ApiError('Invalid response from server', response.status, {});
      }
    } else {
      // Handle non-JSON responses (like plain text, HTML, etc.)
      const text = await response.text();
      try {
        // Try to parse as JSON in case content-type was incorrect
        data = JSON.parse(text);
      } catch (e) {
        // If not JSON, use text as message
        data = { message: text };
      }
    }

    // Check for error status
    if (!response.ok) {
      // Handle common HTTP error statuses
      const errorMessage = data.message || 
                         data.error?.message || 
                         data.error ||
                         response.statusText ||
                         'An unknown error occurred';
      
      // Create a more specific error based on status code
      switch (response.status) {
        case 400:
          throw new ApiError(errorMessage || 'Bad Request', 400, data);
        case 401:
          // Clear auth data on unauthorized
          localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
          window.location.href = '/login?session=expired';
          throw new ApiError(errorMessage || 'Session expired', 401, data);
        case 403:
          throw new ApiError(errorMessage || 'Forbidden', 403, data);
        case 404:
          throw new ApiError(errorMessage || 'Resource not found', 404, data);
        case 422: // Validation error
          throw new ApiError(
            errorMessage || 'Validation failed', 
            422, 
            { ...data, errors: data.errors || [] }
          );
        case 429: // Rate limiting
          throw new ApiError(
            errorMessage || 'Too many requests', 
            429,
            { retryAfter: response.headers.get('Retry-After') }
          );
        case 500:
          throw new ApiError(
            errorMessage || 'Internal server error', 
            500, 
            process.env.NODE_ENV === 'development' ? data : {}
          );
        default:
          throw new ApiError(errorMessage, response.status, data);
      }
    }

    return data;
  } catch (error) {
    // If it's already an ApiError, just rethrow it
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or other unexpected errors
    console.error('API request failed:', error);
    throw new ApiError(
      'Network error or server is unreachable', 
      'NETWORK_ERROR',
      { originalError: error.message }
    );
  }
};

export default {
  API_BASE_URL,
  ...APP_CONFIG,
  getApiUrl,
  getDefaultHeaders,
  getAuthHeader,
  handleResponse
};