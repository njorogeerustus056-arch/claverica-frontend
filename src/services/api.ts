// src/services/api.ts - FIXED VERSION WITH PROPER TOKEN HANDLING
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
  
  // ✅ FIXED: Get token from store or localStorage with fallback
  const getToken = (): string | null => {
    // Try from store first
    if (authStore.tokens?.access) {
      return authStore.tokens.access;
    }
    // Fallback to localStorage (check both keys)
    return localStorage.getItem('access_token') || localStorage.getItem('token') || null;
  };
  
  const token = getToken();
  
  // Merge options with defaults
  const fetchOptions: RequestInit = {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_FETCH_OPTIONS.headers,
      ...options.headers,
      // ✅ Add auth token if available
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
        errorData.detail || errorData.message || `API error: ${response.status}`,
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

// Interface for Notification objects
export interface Notification {
  id: number;
  account_number?: string;
  email?: string;
  title: string;
  message: string;
  notification_type: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  is_read?: boolean; // Computed property from status
  metadata?: any;
  created_at: string;
  read_at: string | null;
  expires_at: string | null;
  is_expired?: boolean;
  is_urgent?: boolean;
  requires_admin_action?: boolean;
  action_url?: string | null;
}

// Interface for Notification Preferences
export interface NotificationPreference {
  id?: number;
  account?: number;
  email_enabled: boolean;
  email_high_priority: boolean;
  email_medium_priority: boolean;
  email_low_priority: boolean;
  push_enabled: boolean;
  push_high_priority: boolean;
  push_medium_priority: boolean;
  push_low_priority: boolean;
  in_app_enabled?: boolean;
  receive_payment_notifications?: boolean;
  receive_transfer_notifications?: boolean;
  receive_tac_notifications?: boolean;
  receive_account_notifications?: boolean;
  receive_admin_notifications?: boolean;
  immediate_delivery?: boolean;
  daily_digest?: boolean;
  digest_time?: string;
  created_at?: string;
  updated_at?: string;
}

// Interface for unread count response
export interface UnreadCountResponse {
  unread_count: number;
}

// Notification-specific API methods - FIXED: Removed duplicate /api/ prefix
export const notificationApi = {
  // Get all notifications for current user
  getAll: () => 
    apiFetch<Notification[]>('/notifications/'),
  
  // Get unread notifications count
  getUnreadCount: () => 
    apiFetch<UnreadCountResponse>('/notifications/unread-count/'),
  
  // Get only unread notifications
  getUnread: () => 
    apiFetch<Notification[]>('/notifications/unread/'),
  
  // Mark a specific notification as read
  markAsRead: (id: number) => 
    apiFetch<{ status: string }>(`/notifications/${id}/mark-read/`, { 
      method: 'POST' 
    }),
  
  // Mark all notifications as read
  markAllAsRead: () => 
    apiFetch<{ status: string }>('/notifications/mark-all-read/', { 
      method: 'POST' 
    }),
  
  // Get notification preferences
  getPreferences: () => 
    apiFetch<NotificationPreference>('/notifications/preferences/'),
  
  // Update notification preferences
  updatePreferences: (data: Partial<NotificationPreference>) => 
    apiFetch<NotificationPreference>('/notifications/preferences/', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  
  // Get a single notification by ID
  getById: (id: number) => 
    apiFetch<Notification>(`/notifications/${id}/`),
  
  // Admin: Get admin alerts
  getAdminAlerts: () => 
    apiFetch<Notification[]>('/notifications/admin/alerts/'),
  
  // Admin: Get action required count
  getActionRequiredCount: () => 
    apiFetch<{ action_required_count: number }>('/notifications/admin/action-required/'),
};

// Convenience methods - MAIN API OBJECT
export const api = {
  // Core HTTP methods
  get: <T = any>(endpoint: string, options?: RequestInit) => 
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
    apiFetch<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    }),
  
  put: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
    apiFetch<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined 
    }),
  
  patch: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
    apiFetch<T>(endpoint, { 
      ...options, 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined 
    }),
  
  delete: <T = any>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
  
  // Account activation - ADD THIS
  activate: (email: string, activation_code: string) =>
    apiFetch('/accounts/activate/', {
      method: 'POST',
      body: JSON.stringify({ email, activation_code })
    }),
  
  // Notification methods (direct access)
  notifications: notificationApi,
};

// Also export as default for backward compatibility
export default api;