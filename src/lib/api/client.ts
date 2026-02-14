import axios from 'axios';
import { useAuthStore } from '../store/auth';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().tokens?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshed = await useAuthStore.getState().refreshToken();
        if (refreshed) {
          // Retry original request with new token
          const newToken = useAuthStore.getState().tokens?.access;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout
        useAuthStore.getState().logout();
        // Don't redirect here - let components handle it
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
