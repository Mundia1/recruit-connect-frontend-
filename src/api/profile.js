import api from './axios';

export const getUserProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const getUserApplications = async () => {
  const response = await api.get('/applications/me');
  return response.data;
};
