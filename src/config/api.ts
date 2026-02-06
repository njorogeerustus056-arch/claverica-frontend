// src/config/api.ts
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  ENDPOINTS: {
    ACCOUNTS: {
      REGISTER: "/api/accounts/register/",
      ACTIVATE: "/api/accounts/activate/",
      RESEND_ACTIVATION: "/api/accounts/resend-activation/",
      LOGIN: "/api/accounts/login/",
      LOGOUT: "/api/accounts/logout/",
      REFRESH: "/api/accounts/refresh/",
    },
    USERS: {
      PROFILE: "/api/users/profile/",
      SETTINGS: "/api/users/settings/",
    },
  },

  getUrl: function(endpointPath: string): string {
    return this.BASE_URL + endpointPath;
  }
};

export default API_CONFIG;






