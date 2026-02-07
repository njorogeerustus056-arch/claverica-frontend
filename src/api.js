// ES Module - Clean API configuration
import { apiFetch, uploadFormData, getToken, getRefreshToken, setToken, removeToken, ApiError } from "./utils/api.js";

export const authAPI = {
    login: async (credentials) => {
        const response = await apiFetch("/accounts/login/", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
        return response;
    },

    register: async (userData) => {
        const response = await apiFetch("/accounts/register/", {
            method: "POST",
            body: JSON.stringify(userData),
        });
        return response;
    },

    logout: async () => {
        const response = await apiFetch("/accounts/logout/", {
            method: "POST",
        });
        removeToken();
        return response;
    },

    getProfile: async () => {
        const response = await apiFetch("/accounts/profile/");
        return response;
    },

    updateProfile: async (profileData) => {
        const response = await apiFetch("/accounts/profile/", {
            method: "PUT",
            body: JSON.stringify(profileData),
        });
        return response;
    },

    verifyEmail: async (token) => {
        const response = await apiFetch(`/accounts/verify-email/${token}/`);
        return response;
    },

    requestPasswordReset: async (email) => {
        const response = await apiFetch("/accounts/password/reset/", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
        return response;
    },

    resetPassword: async (uid, token, newPassword) => {
        const response = await apiFetch("/accounts/password/reset/confirm/", {
            method: "POST",
            body: JSON.stringify({ uid, token, new_password: newPassword }),
        });
        return response;
    },
};

export const notificationAPI = {
    getNotifications: async () => {
        const response = await apiFetch("/notifications/");
        return response;
    },

    markAsRead: async (notificationId) => {
        const response = await apiFetch(`/notifications/${notificationId}/mark-read/`, {
            method: "POST",
        });
        return response;
    },

    deleteNotification: async (notificationId) => {
        const response = await apiFetch(`/notifications/${notificationId}/`, {
            method: "DELETE",
        });
        return response;
    },
};

export const walletAPI = {
    getWallet: async () => {
        const response = await apiFetch("/wallet/");
        return response;
    },

    getTransactions: async () => {
        const response = await apiFetch("/wallet/transactions/");
        return response;
    },

    requestWithdrawal: async (amount, currency) => {
        const response = await apiFetch("/wallet/withdraw/", {
            method: "POST",
            body: JSON.stringify({ amount, currency }),
        });
        return response;
    },
};

export const paymentAPI = {
    createPayment: async (paymentData) => {
        const response = await apiFetch("/payments/create/", {
            method: "POST",
            body: JSON.stringify(paymentData),
        });
        return response;
    },

    getPaymentStatus: async (paymentId) => {
        const response = await apiFetch(`/payments/${paymentId}/status/`);
        return response;
    },
};

export const transferAPI = {
    createTransfer: async (transferData) => {
        const response = await apiFetch("/transfers/create/", {
            method: "POST",
            body: JSON.stringify(transferData),
        });
        return response;
    },

    getTransfers: async () => {
        const response = await apiFetch("/transfers/");
        return response;
    },
};

export const kycAPI = {
    submitKYC: async (formData) => {
        const response = await uploadFormData("/kyc/submit/", formData);
        return response;
    },

    getKYCStatus: async () => {
        const response = await apiFetch("/kyc/status/");
        return response;
    },
};

// Main API object
export const api = {
    auth: authAPI,
    notifications: notificationAPI,
    wallet: walletAPI,
    payments: paymentAPI,
    transfers: transferAPI,
    kyc: kycAPI,
};

// Export utility functions
export { apiFetch, uploadFormData, getToken, getRefreshToken, setToken, removeToken, ApiError };

// Default export
export default api;
