// ES Module - Clean API configuration
import { apiFetch, uploadFormData, getToken, getRefreshToken, setToken, removeToken, ApiError } from "./utils/api.js";

// ES Module - remove CommonJS exports
import { apiFetch, uploadFormData, getToken, getRefreshToken, setToken, removeToken, ApiError } from "./utils/api.js";

export const authAPI = {
    // ... keep your existing code but remove exports.
};

export const notificationAPI = {
    // ...
};

export const walletAPI = {
    // ...
};

export const paymentAPI = {
    // ...
};

export const transferAPI = {
    // ...
};

export const kycAPI = {
    // ...
};

export const api = {
    auth: authAPI,
    notifications: notificationAPI,
    wallet: walletAPI,
    payments: paymentAPI,
    transfers: transferAPI,
    kyc: kycAPI,
};

// Export everything
export { apiFetch, uploadFormData, getToken, getRefreshToken, setToken, removeToken, ApiError };
export default api;
