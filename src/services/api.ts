// src/services/api.ts - UPDATED VERSION
import { API_CONFIG, getApiUrl, DEFAULT_FETCH_OPTIONS } from '../config/api';
import { useAuthStore } from '../lib/store/auth';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  const authStore = useAuthStore.getState();
  
  // Merge options with defaults
  const fetchOptions: RequestInit = {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_FETCH_OPTIONS.headers,
      ...options.headers,
      // Add auth token if available
      ...(authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {}),
    },
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: await response.text() };
      }
      
      throw new ApiError(
        errorData.detail || `API error: ${response.status}`,
        response.status,
        errorData
      );
    }
    
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text() as T;
    
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      undefined,
      error
    );
  }
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, options?: RequestInit) => 
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
    apiFetch<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  
  put: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
    apiFetch<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  
  patch: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
    apiFetch<T>(endpoint, { 
      ...options, 
      method: 'PATCH', 
      body: JSON.stringify(data) 
    }),
  
  delete: <T = any>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};

// Default export
export default api;

