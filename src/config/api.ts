// src/config/api.ts - FIXED VERSION
export const API_CONFIG = {
  // Base URL from environment variable - should NOT include /api
  BASE_URL: import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app',
  
  // API Endpoints - NOW WITH /api PREFIX
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/api/accounts/register/",
      LOGIN: "/api/accounts/login/",
      LOGOUT: "/api/accounts/logout/",
      VERIFY_EMAIL: "/api/accounts/verify-email/",
      RESET_PASSWORD: "/api/accounts/reset-password/",
      ACTIVATE: "/api/accounts/activate/", // ADD THIS
    },
    USER: {
      PROFILE: "/api/users/profile/", // FIXED: should be /users/ not /accounts/
      ME: "/api/users/me/", // ADD THIS
    },
    NOTIFICATIONS: {
      LIST: "/api/notifications/",
      UNREAD_COUNT: "/api/notifications/unread-count/",
    }
  },
  
  // Common headers
  HEADERS: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

// FIXED: Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  const base = API_CONFIG.BASE_URL.replace(/\/$/, "");
  
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  return `${base}${cleanEndpoint}`;
};

// Remove the complex cleaning functions - they're not needed now
// export const getApiUrlSimple = ... (remove this)

// Default fetch configuration
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: API_CONFIG.HEADERS,
  credentials: "include", // For cookies/sessions
};