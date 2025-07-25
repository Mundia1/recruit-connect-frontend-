import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, logout } from "../context/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

const API_URL = import.meta.env.VITE_API_URL;


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {
            refreshToken,
          }
        );

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setTokens(newAccessToken, newRefreshToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const fetchProfile = () => api.get("/auth/me");


export const getJobs = () => api.get("/jobs");
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const createJob = (data) => api.post("/jobs", data);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);


export const applyForJob = (jobId, applicationData) =>
  api.post(`/jobs/${jobId}/apply`, applicationData);

export const getApplications = () => api.get("/applications");
export const getApplicationById = (id) => api.get(`/applications/${id}`);

export default api;
