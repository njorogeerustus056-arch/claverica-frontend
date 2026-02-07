// Production API configuration - ensures no localhost fallbacks
export const API_CONFIG = {
  get baseURL() {
    // Always use environment variable, never fallback to localhost
    const url = import.meta.env.VITE_API_URL;
    if (!url) {
      console.error("? VITE_API_URL is not set!");
      throw new Error("VITE_API_URL environment variable is required");
    }
    return url;
  }
};

// Helper function for all API calls
export function getApiUrl(endpoint = "") {
  const base = API_CONFIG.baseURL;
  // Ensure proper URL formatting
  if (endpoint.startsWith("/")) {
    return base + endpoint;
  }
  return base + "/" + endpoint;
}

// Export for backward compatibility
export default API_CONFIG;
