// src/utils/cors.ts - CORS helper
export const CORS_CONFIG = {
  // Allowed origins
  ALLOWED_ORIGINS: [
    "https://claverica-fixed.vercel.app",
    "https://claverica-frontend-vercel.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  
  // CORS headers
  HEADERS: {
    "Access-Control-Allow-Origin": "*", // In production, use specific origins
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
  },
  
  // Check if origin is allowed
  isOriginAllowed: (origin: string): boolean => {
    return CORS_CONFIG.ALLOWED_ORIGINS.includes(origin) || 
           origin.includes("localhost") || 
           origin.includes("vercel.app");
  },
};

// Add CORS headers to fetch requests
export const withCors = (options: RequestInit = {}): RequestInit => {
  return {
    ...options,
    headers: {
      ...CORS_CONFIG.HEADERS,
      ...options.headers,
    },
    mode: "cors" as RequestMode,
    credentials: "include" as RequestCredentials,
  };
};
