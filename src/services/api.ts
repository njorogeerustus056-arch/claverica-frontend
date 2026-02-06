// src/services/api.ts - COMPLETE VERSION
import { useAuthStore } from '../lib/store/auth';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
  const url = `${API_URL}${endpoint}`;
  const { tokens } = useAuthStore.getState();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Add auth token if available
  if (tokens?.access) {
    headers['Authorization'] = `Bearer ${tokens.access}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || errorData.error || `API request failed (${response.status})`,
      response.status,
      errorData
    );
  }

  return response.json();
}

// ✅ MUST HAVE THESE METHODS for Cards.tsx compatibility:
export const api = {
  get: <T = any>(endpoint: string) => apiFetch<T>(endpoint, { method: 'GET' }),
  post: <T = any>(endpoint: string, data?: any) => apiFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: <T = any>(endpoint: string, data?: any) => apiFetch<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: <T = any>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' }),

  // Optional: Add the fetch method too
  fetch: apiFetch,
};

export default api;



