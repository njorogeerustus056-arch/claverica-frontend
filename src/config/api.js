// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  endpoints: {
    auth: {
      login: "/accounts/login/",
      register: "/accounts/register/",
      logout: "/accounts/logout/",
      profile: "/accounts/profile/",
      verifyEmail: "/accounts/verify-email/",
      passwordReset: "/accounts/password/reset/",
    },
    wallet: {
      main: "/wallet/",
      transactions: "/wallet/transactions/",
      withdraw: "/wallet/withdraw/",
    },
    payments: "/payments/",
    transfers: "/transfers/",
    notifications: "/notifications/",
    kyc: "/kyc/",
  },
};
