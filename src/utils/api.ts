// ✅ THIS IS CORRECT - all files are in same utils folder
import { getCookie } from './cookies';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Standard API fetch with auth and CSRF
export const apiFetch = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('access_token');
  const csrfToken = getCookie('csrftoken');

  const headers: HeadersInit = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || data.detail || 'API request failed',
        data
      );
    }

    return {
      success: true,
      data: data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',  
      status: 0,
    };
  }
};

// Form data upload (for KYC documents)
export const uploadFormData = async <T = any>(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('access_token');
  const csrfToken = getCookie('csrftoken');

  const headers: HeadersInit = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'include',
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || data.detail || 'Upload failed',
        data
      );
    }

    return {
      success: true,
      data: data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',  
      status: 0,
    };
  }
};







