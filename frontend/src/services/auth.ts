import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getProfile = async (token: string) => {
  return await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const updateProfile = async (profile: { username: string; email: string }, token: string) => {
  return await axios.put(`${API_URL}/auth/profile`, profile, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
