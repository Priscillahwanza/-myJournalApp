import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const register = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

export const getProfile = async (token: string) => {
  return await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
