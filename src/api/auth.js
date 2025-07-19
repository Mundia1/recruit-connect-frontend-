import api from './axios';

export const signIn = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  // Assuming backend returns { token, user }
  return response.data;
};

export const signUp = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};
