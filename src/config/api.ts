// src/config/api.ts - SINGLE SOURCE OF TRUTH
export const API_CONFIG = {
  // Base URL from environment variable with /api already included
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/accounts/register/",
      LOGIN: "/accounts/login/",
      LOGOUT: "/accounts/logout/",
      VERIFY_EMAIL: "/accounts/verify-email/",
      RESET_PASSWORD: "/accounts/reset-password/",
    },
    USER: {
      PROFILE: "/accounts/profile/",
      UPDATE_PROFILE: "/accounts/update-profile/",
    },
    // Add other endpoints as needed
  },
  
  // Common headers
  HEADERS: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_CONFIG.BASE_URL.replace(/\/$/, "")}/${cleanEndpoint}`;
};

// Default fetch configuration
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: API_CONFIG.HEADERS,
  credentials: "include", // For cookies/sessions
};
