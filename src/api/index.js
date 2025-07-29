// API Configuration
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


// Helper function for making API requests
async function apiRequest(endpoint, method = 'GET', data = null, requiresAuth = true) {
  const authToken = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (requiresAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    method,
    headers,
    credentials: 'include', // Include cookies for session management
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, config);
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return { success: true };
    }

    const responseData = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong');
      error.status = response.status;
      throw error;
    }
    
    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Authentication
const auth = {
  // Register a new user
  async register(userData) {
    return apiRequest('/auth/register', 'POST', userData, false);
  },

  // Login user
  async login(credentials) {
    const response = await apiRequest('/auth/login', 'POST', credentials, false);
    if (response.data && response.data.access_token && response.data) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  // Refresh access token
  async refreshToken() {
    const response = await apiRequest('/auth/refresh', 'POST', {}, true);
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response;
  },

  // Get current user profile
  async getCurrentUser() {
    const currentAuthToken = localStorage.getItem('token');
    if (!currentAuthToken) {
      throw new Error("No authentication token found.");
    }
    const response = await apiRequest('/auth/me');
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Update user profile
  async updateUserProfile(updates) {
    return apiRequest('/auth/me', 'PATCH', updates);
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
  },
};

// Jobs API
const jobs = {
  // Get all jobs
  getAll(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return apiRequest(`/jobs/${query ? `?${query}` : ''}`);
  },

  // Get single job
  getById(id) {
    return apiRequest(`/jobs/${id}/`);
  },

  // Create job (Admin/Employer only)
  create(jobData) {
    return apiRequest('/jobs/', 'POST', jobData);
  },

  // Update job
  update(id, jobData) {
    return apiRequest(`/jobs/${id}/`, 'PATCH', jobData);
  },

  // Delete job
  delete(id) {
    return apiRequest(`/jobs/${id}/`, 'DELETE');
  },
};

// Applications API
const applications = {
  // Get all applications (filterable)
  getAll(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return apiRequest(`/applications/${query ? `?${query}` : ''}`);
  },

  // Get single application
  getById(id) {
    return apiRequest(`/applications/${id}/`);
  },

  // Create application
  create(applicationData) {
    return apiRequest('/applications/', 'POST', applicationData);
  },

  // Update application status
  updateStatus(id, status) {
    return apiRequest(`/applications/${id}/`, 'PATCH', { status });
  },

  // Delete application
  delete(id) {
    return apiRequest(`/applications/${id}/`, 'DELETE');
  },
};

// Messages API
const messages = {
  // Get all messages
  getAll() {
    return apiRequest('/messages/');
  },

  // Get single message
  getById(id) {
    return apiRequest(`/messages/${id}/`);
  },

  // Get messages between two users
  getBetweenUsers(user1Id, user2Id) {
    return apiRequest(`/messages/between/${user1Id}/${user2Id}/`);
  },

  // Send message
  send(messageData) {
    return apiRequest('/messages/', 'POST', messageData);
  },

  // Mark message as read
  markAsRead(messageId) {
    return apiRequest(`/messages/${messageId}/read`, 'PATCH');
  },

  // Delete message
  delete(messageId) {
    return apiRequest(`/messages/${messageId}/`, 'DELETE');
  },
};

// Feedback API
const feedback = {
  // Get all feedback for an application
  getForApplication(applicationId) {
    return apiRequest(`/feedback/application/${applicationId}/`);
  },

  // Get single feedback
  getById(id) {
    return apiRequest(`/feedback/${id}/`);
  },

  // Create feedback
  create(feedbackData) {
    return apiRequest('/feedback/', 'POST', feedbackData);
  },

  // Update feedback
  update(id, updateData) {
    return apiRequest(`/feedback/${id}/`, 'PATCH', updateData);
  },

  // Delete feedback
  delete(id) {
    return apiRequest(`/feedback/${id}/`, 'DELETE');
  },
};

// FAQ API
const faqs = {
  // Get all FAQs
  getAll() {
    return apiRequest('/faqs/');
  },

  // Get single FAQ
  getById(id) {
    return apiRequest(`/faqs/${id}/`);
  },

  // Create FAQ (Admin only)
  create(faqData) {
    return apiRequest('/faqs/', 'POST', faqData);
  },

  // Update FAQ (Admin only)
  update(id, updateData) {
    return apiRequest(`/faqs/${id}/`, 'PATCH', updateData);
  },

  // Delete FAQ (Admin only)
  delete(id) {
    return apiRequest(`/faqs/${id}/`, 'DELETE');
  },
};

// Admin API
const admin = {
  // Get all users (Admin only)
  getAllUsers() {
    return apiRequest('/admin/users');
  },

  // Get user by ID (Admin only)
  getUserById(id) {
    return apiRequest(`/admin/users/${id}`);
  },

  // Update user role (Admin only)
  updateUserRole(id, role) {
    return apiRequest(`/admin/users/${id}/role`, 'PUT', { role });
  },

  // Delete user (Admin only)
  deleteUser(id) {
    return apiRequest(`/admin/users/${id}`, 'DELETE');
  },
};


// Export all API methods
export * as jobs from './jobs';

// Add request interceptor for token refresh
// This is a simplified version - you might want to implement a more robust solution
const originalRequest = apiRequest;
apiRequest = async (endpoint, method = 'GET', data = null, requiresAuth = true) => {
  try {
    return await originalRequest(endpoint, method, data, requiresAuth);
  } catch (error) {
    // If token is expired, try to refresh it
    if (error.status === 401 && localStorage.getItem('token')) {
      try {
        const { access_token } = await auth.refreshToken();
        if (access_token) {
          // Retry the original request with new token
          return await originalRequest(endpoint, method, data, requiresAuth);
        }
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        auth.logout();
        window.location.href = '/signin';
      }
    }
    throw error;
  }
};