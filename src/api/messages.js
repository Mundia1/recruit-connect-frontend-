import axios from 'axios';
import { getApiUrl, getAuthHeader } from './config';
import { io } from 'socket.io-client';

// Create axios instance for REST API
const api = axios.create({
  baseURL: getApiUrl('/messages'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...getAuthHeader()
  }
});

// Socket.IO connection
let socket = null;
let messageListeners = new Set();
let typingListeners = new Set();
let presenceListeners = new Set();

const connectSocket = () => {
  if (!socket) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token available for socket connection');
      return;
    }

    socket = io(getApiUrl(), {
      path: '/socket.io',
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    // Connection events
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error.message);
    });

    // Message events
    socket.on('new_message', (message) => {
      messageListeners.forEach(callback => callback(message));
    });

    socket.on('message_read', (data) => {
      messageListeners.forEach(callback => callback({
        type: 'message_read',
        ...data
      }));
    });

    socket.on('typing', (data) => {
      typingListeners.forEach(callback => callback(data));
    });

    socket.on('user_online', (userId) => {
      presenceListeners.forEach(callback => callback({
        userId,
        isOnline: true,
        lastSeen: new Date().toISOString()
      }));
    });

    socket.on('user_offline', (userId) => {
      presenceListeners.forEach(callback => callback({
        userId,
        isOnline: false,
        lastSeen: new Date().toISOString()
      }));
    });
  }
};

const messagesService = {
  // Socket.IO connection management
  connect: () => {
    connectSocket();
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  },

  // Event listeners
  onMessage: (callback) => {
    messageListeners.add(callback);
    return () => messageListeners.delete(callback);
  },

  onTyping: (callback) => {
    typingListeners.add(callback);
    return () => typingListeners.delete(callback);
  },

  onPresenceChange: (callback) => {
    presenceListeners.add(callback);
    return () => presenceListeners.delete(callback);
  },

  // REST API methods
  /**
   * Get all conversations for the current user
   * @param {Object} params - Pagination and filter params
   * @returns {Promise<Array>} List of conversations
   */
  getConversations: async (params = {}) => {
    try {
      const response = await api.get('/conversations', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  /**
   * Get messages in a conversation
   * @param {string} conversationId - Conversation ID
   * @param {Object} params - Pagination params
   * @returns {Promise<Object>} Messages and pagination info
   */
  getMessages: async (conversationId, params = {}) => {
    try {
      const response = await api.get(`/conversations/${conversationId}/messages`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for conversation ${conversationId}:`, error);
      throw error;
    }
  },

  /**
   * Send a new message
   * @param {string} conversationId - Conversation ID
   * @param {Object} messageData - Message content and metadata
   * @returns {Promise<Object>} Sent message
   */
  sendMessage: async (conversationId, messageData) => {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, messageData);
      return response.data;
    } catch (error) {
      console.error(`Error sending message to conversation ${conversationId}:`, error);
      throw error;
    }
  },

  /**
   * Send a message via WebSocket
   * @param {string} conversationId - Conversation ID
   * @param {Object} message - Message data
   */
  sendMessageRealTime: (conversationId, message) => {
    if (!socket) {
      console.error('Socket not connected');
      return;
    }
    socket.emit('send_message', {
      conversationId,
      ...message
    });
  },

  /**
   * Mark messages as read
   * @param {string} conversationId - Conversation ID
   * @param {Array<string>} messageIds - Array of message IDs to mark as read
   * @returns {Promise<Object>} Status
   */
  markAsRead: async (conversationId, messageIds) => {
    try {
      const response = await api.patch(`/conversations/${conversationId}/read`, { messageIds });
      return response.data;
    } catch (error) {
      console.error(`Error marking messages as read in conversation ${conversationId}:`, error);
      throw error;
    }
  },

  /**
   * Notify other users that current user is typing
   * @param {string} conversationId - Conversation ID
   * @param {boolean} isTyping - Whether the user is typing
   */
  sendTypingStatus: (conversationId, isTyping) => {
    if (!socket) {
      console.error('Socket not connected');
      return;
    }
    socket.emit('typing', {
      conversationId,
      isTyping
    });
  },

  /**
   * Create a new conversation
   * @param {Object} participantIds - Array of participant user IDs
   * @param {string} initialMessage - Optional initial message
   * @returns {Promise<Object>} New conversation and initial message
   */
  createConversation: async (participantIds, initialMessage = null) => {
    try {
      const response = await api.post('/conversations', {
        participantIds,
        initialMessage
      });
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  /**
   * Get or create a direct conversation with another user
   * @param {string} userId - Other user's ID
   * @returns {Promise<Object>} Conversation
   */
  getOrCreateDirectConversation: async (userId) => {
    try {
      const response = await api.post('/conversations/direct', { userId });
      return response.data;
    } catch (error) {
      console.error(`Error getting/creating direct conversation with user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a conversation
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<Object>} Deletion status
   */
  deleteConversation: async (conversationId) => {
    try {
      const response = await api.delete(`/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting conversation ${conversationId}:`, error);
      throw error;
    }
  },

  /**
   * Upload a file attachment
   * @param {File} file - File to upload
   * @param {Function} onUploadProgress - Progress callback
   * @returns {Promise<Object>} File metadata
   */
  uploadAttachment: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/attachments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading attachment:', error);
      throw error;
    }
  },

  /**
   * Search messages
   * @param {string} query - Search query
   * @param {Object} params - Additional search parameters
   * @returns {Promise<Array>} Search results
   */
  searchMessages: async (query, params = {}) => {
    try {
      const response = await api.get('/search', {
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching messages:', error);
      throw error;
    }
  }
};

export default messagesService;