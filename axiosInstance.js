import axios from 'axios';

const getAccessToken = () => {
  try {
    const authTokens = localStorage.getItem('authTokens');
    if (authTokens) {
      return JSON.parse(authTokens).access;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving access token from local storage:", error);
    return null;
  }
};

const getRefreshToken = () => {
  try {
    const authTokens = localStorage.getItem('authTokens');
    if (authTokens) {
      return JSON.parse(authTokens).refresh;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving refresh token from local storage:", error);
    return null;
  }
};

const updateAuthTokens = (tokens) => {
  try {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  } catch (error) {
    console.error("Error updating auth tokens in local storage:", error);
  }
};

const api = axios.create({
  baseURL: 'http://your-api-base-url.com/api', // **IMPORTANT: Replace with your API's base URL**
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const response = await axios.post('http://your-api-base-url.com/api/auth/refresh', {
          refresh: refreshToken,
        });

        const newTokens = response.data;
        updateAuthTokens(newTokens);

        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access}`;

        return api(originalRequest);

      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;