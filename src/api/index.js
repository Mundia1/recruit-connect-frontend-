/**
 * @file API Module Index
 * @description Central export point for all API modules and utilities
 * @module api
 */

import config from './config';

// Core API services
export { default as authService } from './auth';
export { default as jobsService } from './jobs';
export { default as messagesService } from './messages';
export { default as faqService } from './faq';

// Configuration and utilities
export const { 
  API_BASE_URL, 
  getDefaultHeaders, 
  handleResponse,
  getApiUrl,
  getAuthHeader 
} = config;

// Re-export types for better IDE support and documentation
/**
 * @typedef {import('./auth').AuthService} AuthService
 * @typedef {import('./jobs').JobsService} JobsService
 * @typedef {import('./messages').MessagesService} MessagesService
 * @typedef {import('./faq').FAQService} FAQService
 * @typedef {import('./applications').ApplicationsService} ApplicationsService
 * @typedef {import('./feedback').FeedbackService} FeedbackService
 * @typedef {import('./admin').AdminService} AdminService
 * @typedef {import('./profile').ProfileService} ProfileService
 * @typedef {import('./config').ApiConfig} ApiConfig
 */

// Additional API services
export { default as applicationsService } from './applications';
export { default as feedbackService } from './feedback';
export { default as adminService } from './admin';
export { default as profileService } from './profile';
