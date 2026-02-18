// src/config/api.ts - COMPLETE FIXED VERSION
export const API_CONFIG = {
  // Base URL from environment variable - should NOT include /api
  BASE_URL: import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app',
  
  // API Endpoints - WITHOUT /api PREFIX (getApiUrl adds base URL and /api)
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/accounts/register/",
      LOGIN: "/accounts/login/",
      LOGOUT: "/accounts/logout/",
      VERIFY_EMAIL: "/accounts/verify-email/",
      RESET_PASSWORD: "/accounts/reset-password/",
      ACTIVATE: "/accounts/activate/",
      RESEND_ACTIVATION: "/accounts/resend-activation/",
    },
    USER: {
      PROFILE: "/users/profile/",
      ME: "/users/me/",
      SETTINGS: "/users/settings/",
    },
    NOTIFICATIONS: {
      LIST: "/notifications/",
      UNREAD_COUNT: "/notifications/unread-count/",
      UNREAD: "/notifications/unread/",
      PREFERENCES: "/notifications/preferences/",
    },
    TOKEN: {
      OBTAIN: "/token/",
      REFRESH: "/token/refresh/",
    }
  },
  
  // Common headers
  HEADERS: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

// ✅ FIXED: Helper function to get full URL with /api prefix
export const getApiUrl = (endpoint: string): string => {
  const base = API_CONFIG.BASE_URL.replace(/\/$/, "");
  
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // ✅ Add /api prefix to match backend structure
  return `${base}/api${cleanEndpoint}`;
};

// Default fetch configuration
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: API_CONFIG.HEADERS,
  credentials: "include", // For cookies/sessions
};