// src/api.ts - FIXED VERSION WITH CORRECT ENDPOINTS
import { useAuthStore } from './lib/store/auth';

const API_URL = import.meta.env.VITE_API_URL || "https://claverica-backend-production.up.railway.app";

// Get tokens from Zustand store
export const getToken = (): string | null => {
  try {
    const tokens = useAuthStore.getState().tokens;
    return tokens?.access || null;
  } catch {
    return null;
  }
};

export const getRefreshToken = (): string | null => {
  try {
    const tokens = useAuthStore.getState().tokens;
    return tokens?.refresh || null;
  } catch {
    return null;
  }
};

// Also sync to localStorage for backward compatibility
export const setToken = (token: string): void => {
  try {
    // Update Zustand store
    const currentState = useAuthStore.getState();
    const currentTokens = currentState.tokens;
    
    if (currentTokens) {
      useAuthStore.setState({
        tokens: { ...currentTokens, access: token }
      });
    }
    
    // Also store in localStorage for any legacy code
    if (typeof window !== 'undefined') {
      localStorage.setItem("access_token", token);
    }
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = (): void => {
  try {
    // Clear from Zustand
    useAuthStore.getState().logout();
    
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Error handling class
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

// Main API fetch utility with auto-retry and token refresh
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = getToken();

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle token refresh on 401
    if (response.status === 401 && retryCount === 0) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          // ✅ FIXED: Use correct JWT refresh endpoint
          const refreshResponse = await fetch(`${API_URL}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            setToken(data.access);
            // Retry the original request with new token
            return apiFetch<T>(endpoint, options, retryCount + 1);
          } else {
            // Refresh failed, clear tokens
            removeToken();
            throw new ApiError("Session expired. Please login again.", 401);
          }
        } catch (refreshError) {
          removeToken();
          throw new ApiError("Session expired. Please login again.", 401);
        }
      } else {
        // No refresh token available
        removeToken();
        throw new ApiError("Session expired. Please login again.", 401);
      }
    }

    // Handle no content responses
    if (response.status === 204 || response.status === 205) {
      return {} as T;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.message || data.error || data.detail || `API request failed (${response.status})`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw new ApiError("Network error - please check your connection");
  }
}

// FormData upload utility for file uploads
export async function uploadFormData<T = any>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = getToken();

  const headers: HeadersInit = {};
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // Don't set Content-Type for FormData - browser sets it automatically with boundary

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message || error.detail || `Upload failed (${response.status})`,
      response.status,
      error
    );
  }

  return response.json();
}

// Authentication API functions - ✅ FIXED WITH CORRECT ENDPOINTS
export const authAPI = {
  register: async (data: any) => {
    return apiFetch("/api/accounts/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyActivation: async (data: { email: string; activation_code: string }) => {
    return apiFetch("/api/accounts/activate/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resendActivation: async (data: { email: string }) => {
    return apiFetch("/api/accounts/resend-activation/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login: async (email: string, password: string) => {
    // ✅ FIXED: Use JWT token endpoint
    return apiFetch("/api/token/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    const result = await apiFetch("/api/accounts/logout/", {
      method: "POST",
    });
    removeToken();
    return result;
  },

  getProfile: async () => {
    return apiFetch("/api/users/me/");
  },

  refresh: async (refreshToken: string) => {
    // ✅ FIXED: Use correct JWT refresh endpoint
    return apiFetch("/api/token/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }
};

// Notification API functions
export const notificationAPI = {
  // Get all notifications
  getAll: async () => {
    try {
      const data = await apiFetch<any>("/api/notifications/");
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.notifications)) {
        return data.notifications;
      } else if (data && Array.isArray(data.results)) {
        return data.results;
      } else {
        console.warn('Unexpected notifications response format:', data);
        return [];
      }
    } catch (error: any) {
      // Don't throw on 401 - return empty array
      if (error.status === 401) {
        console.warn('Not authorized to fetch notifications');
        return [];
      }
      throw error;
    }
  },

  // Get unread notifications
  getUnread: async () => {
    try {
      const data = await apiFetch<any>("/api/notifications/unread/");
      
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.notifications)) {
        return data.notifications;
      } else if (data && Array.isArray(data.results)) {
        return data.results;
      } else {
        return [];
      }
    } catch (error: any) {
      if (error.status === 401) {
        return [];
      }
      throw error;
    }
  },

  // Get unread count for badge
  getUnreadCount: async () => {
    console.log('🔍 [API DEBUG] Calling /api/notifications/unread-count/');
    
    try {
      const data = await apiFetch<any>("/api/notifications/unread-count/");
      
      console.log('✅ [API DEBUG] Raw unread count response:', data);
      
      // Handle ALL possible response formats
      if (typeof data === 'object' && data !== null) {
        // Django REST Framework format: { "unread_count": 1 }
        if ('unread_count' in data) {
          const count = Number(data.unread_count) || 0;
          return { unread_count: count };
        }
        
        // Alternative format: { "count": 1 }
        if ('count' in data) {
          const count = Number(data.count) || 0;
          return { unread_count: count };
        }
        
        // Direct number in simple object
        const values = Object.values(data);
        if (values.length === 1 && typeof values[0] === 'number') {
          const count = values[0] as number;
          return { unread_count: count };
        }
        
        // Check for nested data
        if (data.data && typeof data.data === 'object') {
          if ('unread_count' in data.data) {
            const count = Number(data.data.unread_count) || 0;
            return { unread_count: count };
          }
          if ('count' in data.data) {
            const count = Number(data.data.count) || 0;
            return { unread_count: count };
          }
        }
      } 
      
      // Direct number response
      else if (typeof data === 'number') {
        return { unread_count: data };
      }
      
      // String response (parse if possible)
      else if (typeof data === 'string') {
        const parsed = parseInt(data, 10);
        if (!isNaN(parsed)) {
          return { unread_count: parsed };
        }
      }
      
      console.warn('⚠️ Unexpected unread count format:', data);
      return { unread_count: 0 };
      
    } catch (error: any) {
      console.error('❌ Error fetching unread count:', error);
      
      if (error.status === 401) {
        return { unread_count: 0 };
      }
      
      throw error;
    }
  },

  // Mark single notification as read
  markAsRead: async (notificationId: number) => {
    try {
      return await apiFetch(`/api/notifications/${notificationId}/mark-read/`, {
        method: "POST",
      });
    } catch (error: any) {
      if (error.status === 401) {
        console.warn('Not authorized to mark notification as read');
        return null;
      }
      throw error;
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      return await apiFetch("/api/notifications/mark-all-read/", {
        method: "POST",
      });
    } catch (error: any) {
      if (error.status === 401) {
        console.warn('Not authorized to mark all notifications as read');
        return null;
      }
      throw error;
    }
  },

  // Get notification preferences
  getPreferences: async () => {
    return apiFetch("/api/notifications/preferences/");
  },

  // Update notification preferences
  updatePreferences: async (data: any) => {
    return apiFetch("/api/notifications/preferences/", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  getAdminAlerts: async () => {
    return apiFetch("/api/notifications/admin/alerts/");
  },

  getAdminActionRequired: async () => {
    return apiFetch<{ action_required_count: number }>("/api/notifications/admin/action-required/");
  }
};

// Wallet/Account API functions
export const walletAPI = {
  getBalance: async () => {
    return apiFetch("/api/transactions/wallet/balance/");
  },

  getTransactions: async () => {
    return apiFetch("/api/transactions/recent/");
  }
};

// Payment API functions
export const paymentAPI = {
  processPayment: async (data: any) => {
    return apiFetch("/api/payments/process/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getPaymentHistory: async () => {
    return apiFetch("/api/payments/history/");
  }
};

// Transfer API functions - ✅ FIXED WITH CORRECT COMPLIANCE ENDPOINTS
export const transferAPI = {
  initiateTransfer: async (data: any) => {
    return apiFetch("/api/compliance/transfers/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getTransfers: async () => {
    return apiFetch("/api/compliance/transfers/");
  },

  getTransfer: async (id: number) => {
    return apiFetch(`/api/compliance/transfers/${id}/`);
  },

  verifyTAC: async (transferId: number, tacCode: string) => {
    return apiFetch(`/api/compliance/transfers/${transferId}/verify-tac/`, {
      method: "POST",
      body: JSON.stringify({ tac_code: tacCode }),
    });
  },

  getTransferHistory: async (page = 1) => {
    return apiFetch(`/api/compliance/transfers/?page=${page}`);
  }
};

// KYC API functions
export const kycAPI = {
  submitDocuments: async (data: FormData) => {
    return uploadFormData("/api/kyc/documents/", data);
  },

  getStatus: async () => {
    return apiFetch("/api/kyc/documents/status/");
  },

  checkRequirement: async (amount: number, serviceType: string = 'transfer') => {
    return apiFetch(`/api/kyc/check-requirement/?amount=${amount}&service_type=${serviceType}`);
  },

  getSubmissions: async () => {
    return apiFetch("/api/kyc/documents/submissions/");
  }
};

// Export all APIs as a single object
export const api = {
  auth: authAPI,
  notifications: notificationAPI,
  wallet: walletAPI,
  payments: paymentAPI,
  transfers: transferAPI,
  kyc: kycAPI,
  fetch: apiFetch,
};

// Type definitions for better TypeScript support
export interface Notification {
  id: number;
  recipient: number;
  notification_type: string;
  title: string;
  message: string;
  status: "UNREAD" | "READ";
  priority: "HIGH" | "MEDIUM" | "LOW";
  metadata: Record<string, any>;
  created_at: string;
  read_at: string | null;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  account_number: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface Wallet {
  id: number;
  account: number;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  amount: number;
  transaction_type: string;
  status: string;
  reference: string;
  created_at: string;
}

export default api;