import api from './axios';

export const postJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const getApplicants = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}/applicants`);
  return response.data;
};

export const approveJob = async (jobId) => {
  const response = await api.post(`/jobs/${jobId}/approve`);
  return response.data;
};

export const rejectJob = async (jobId) => {
  const response = await api.post(`/jobs/${jobId}/reject`);
  return response.data;
};
