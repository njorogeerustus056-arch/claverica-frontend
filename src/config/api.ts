// src/config/api.ts - FIXED VERSION (REMOVED /api from endpoints)
export const API_CONFIG = {
  // Base URL from environment variable - should NOT include /api
  BASE_URL: import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app',
  
  // API Endpoints - WITHOUT /api PREFIX (getApiUrl adds base URL only)
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/accounts/register/",           // ✅ REMOVED /api
      LOGIN: "/accounts/login/",                 // ✅ REMOVED /api
      LOGOUT: "/accounts/logout/",               // ✅ REMOVED /api
      VERIFY_EMAIL: "/accounts/verify-email/",   // ✅ REMOVED /api
      RESET_PASSWORD: "/accounts/reset-password/", // ✅ REMOVED /api
      ACTIVATE: "/accounts/activate/",           // ✅ REMOVED /api
      RESEND_ACTIVATION: "/accounts/resend-activation/", // ✅ REMOVED /api
    },
    USER: {
      PROFILE: "/users/profile/",                 // ✅ REMOVED /api
      ME: "/users/me/",                           // ✅ REMOVED /api
      SETTINGS: "/users/settings/",               // ✅ REMOVED /api
    },
    NOTIFICATIONS: {
      LIST: "/notifications/",                     // ✅ REMOVED /api
      UNREAD_COUNT: "/notifications/unread-count/", // ✅ REMOVED /api
      UNREAD: "/notifications/unread/",            // ✅ REMOVED /api
      PREFERENCES: "/notifications/preferences/",  // ✅ REMOVED /api
    },
    TOKEN: {
      OBTAIN: "/token/",                           // ✅ REMOVED /api
      REFRESH: "/token/refresh/",                  // ✅ REMOVED /api
    }
  },
  
  // Common headers
  HEADERS: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  const base = API_CONFIG.BASE_URL.replace(/\/$/, "");
  
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  return `${base}${cleanEndpoint}`;
};

// Default fetch configuration
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: API_CONFIG.HEADERS,
  credentials: "include", // For cookies/sessions
};