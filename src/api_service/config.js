const API_BASE_URL = import.meta.env.VITE_API_BASE_PATH;

// Validate required environment variables
if (!API_BASE_URL) {
  console.warn('VITE_API_BASE_PATH is not set in .env file');
}

export default API_BASE_URL;