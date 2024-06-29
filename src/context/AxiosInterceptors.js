import axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // This ensures cookies are sent
});

// Request interceptor for adding auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor for handling token expiration
api.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
      localStorage.setItem('token', data.token);
      originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
      return api(originalRequest);
    } catch (err) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      const navigate = useNavigate();
      navigate('/login'); // Redirect to login page
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export default api;
