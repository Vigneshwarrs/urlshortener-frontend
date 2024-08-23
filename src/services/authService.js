import axios from 'axios';

const API_URL = 'https://urlshortener-backend-gyml.onrender.com/api/auth/';

export const login = (username, password) => {
  return axios.post(`${API_URL}login`, { username, password });
};

export const register = (data) => {
  return axios.post(`${API_URL}register`, data);
};

export const forgotPassword = (username) => {
  return axios.post(`${API_URL}forgot-password`, { username });
};

export const resetPassword = (token, password) => {
  return axios.post(`${API_URL}reset-password/${token}`, { password });
};
