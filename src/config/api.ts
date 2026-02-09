// src/config/api.ts - FIXED VERSION
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

// FIXED: Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  // Remove any duplicate /api prefix from endpoint
  let cleanEndpoint = endpoint;
  
  // If endpoint starts with /api, remove it (since BASE_URL already has it)
  if (cleanEndpoint.startsWith("/api")) {
    cleanEndpoint = cleanEndpoint.substring(4); // Remove "/api"
  } else if (cleanEndpoint.startsWith("api")) {
    cleanEndpoint = cleanEndpoint.substring(3); // Remove "api"
  }
  
  // Ensure cleanEndpoint starts with /
  if (!cleanEndpoint.startsWith("/")) {
    cleanEndpoint = "/" + cleanEndpoint;
  }
  
  // Remove trailing slash from BASE_URL and combine
  const base = API_CONFIG.BASE_URL.replace(/\/$/, "");
  return `${base}${cleanEndpoint}`;
};

// Alternative simpler fix:
export const getApiUrlSimple = (endpoint: string): string => {
  // Just ensure proper concatenation without double /api
  const base = API_CONFIG.BASE_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // If endpoint already contains /api and base also has /api, remove from endpoint
  if (base.includes("/api") && cleanEndpoint.includes("/api")) {
    const fixedEndpoint = cleanEndpoint.replace(/^\/api/, "");
    return `${base}${fixedEndpoint}`;
  }
  
  return `${base}${cleanEndpoint}`;
};

// Default fetch configuration
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: API_CONFIG.HEADERS,
  credentials: "include", // For cookies/sessions
};