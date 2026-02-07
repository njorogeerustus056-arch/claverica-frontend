"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/api.ts
var API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL,
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
    getUrl: function (endpointPath) {
        return this.BASE_URL + endpointPath;
    }
};
exports.default = API_CONFIG;

