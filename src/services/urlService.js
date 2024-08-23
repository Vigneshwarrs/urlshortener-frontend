import axios from 'axios';

const API_URL = 'http://localhost:5000/api/url/';

export const createShortUrl = (originalUrl) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}shortenUrl`, { originalURL:originalUrl }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const redirectUrl = (shortenUrl) => {
  return `${API_URL}${shortenUrl}`;
}

export const getUserUrls = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}dashboard/urls`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserStats = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}