import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getEntries = async (token: string) => {
  return await axios.get(`${API_URL}/entries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addEntry = async (entry: { title: string, content: string, category: string, date: string }, token: string) => {
  return await axios.post(`${API_URL}/entries`, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEntry = async (id: string, entry: { title?: string, content?: string, category?: string, date?: string }, token: string) => {
  return await axios.put(`${API_URL}/entries/${id}`, entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteEntry = async (id: string, token: string) => {
  return await axios.delete(`${API_URL}/entries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
