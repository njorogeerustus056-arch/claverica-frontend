// src/lib/store/auth.ts - FIXED VERSION WITH CORRECT ENDPOINTS
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ✅ FIXED: Define API_URL directly
const API_URL = import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app';

// Helper function to get full API URL
const getApiUrl = (endpoint: string): string => {
  const base = API_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
};

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  account_number: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthStore {
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  checkAuth: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearAuth: () => void;
  verifyToken: () => Promise<boolean>;
  syncFromLocalStorage: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      loading: false,
      isAuthenticated: false,

      syncFromLocalStorage: () => {
        if (typeof window === 'undefined') return;

        const accessToken = localStorage.getItem('access_token');
        const token = localStorage.getItem('token');
        const localRefresh = localStorage.getItem('refresh_token');
        
        // Use access_token if available, otherwise fallback to token
        const finalToken = accessToken || token;

        if (finalToken && localRefresh) {
          set({
            tokens: { access: finalToken, refresh: localRefresh }       
          });
        }
      },

      login: async (email: string, password: string): Promise<boolean> => {
        set({ loading: true });
        try {
          // ✅ FIXED: Use /api/token/ endpoint
          const response = await fetch(getApiUrl('/api/token/'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.detail || 'Login failed');
          }

          const data = await response.json();

          // JWT returns access and refresh directly
          if (data.access) {
            // Store in BOTH keys for maximum compatibility
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
            // Fetch user data after successful login
            let userData = null;
            try {
              const userResponse = await fetch(getApiUrl('/api/users/me/'), {
                headers: { 
                  'Authorization': `Bearer ${data.access}`,
                  'Content-Type': 'application/json'
                }
              });
              if (userResponse.ok) {
                userData = await userResponse.json();
              }
            } catch (e) {
              console.warn('Could not fetch user data');
            }

            set({
              user: userData,
              tokens: { access: data.access, refresh: data.refresh },
              isAuthenticated: true,
              loading: false,
            });

            return true;
          }
          
          throw new Error('Invalid response format');
          
        } catch (error: any) {
          console.error('Login error:', error);
          set({ loading: false });
          return false;
        }
      },

      logout: () => {
        // Remove all token keys
        localStorage.removeItem('access_token');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      clearAuth: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      refreshToken: async (): Promise<boolean> => {
        const { tokens } = get();
        if (!tokens?.refresh) return false;

        try {
          // ✅ FIXED: Use /api/token/refresh/ endpoint
          const response = await fetch(getApiUrl('/api/token/refresh/'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: tokens.refresh }),
          });

          if (!response.ok) return false;

          const data = await response.json();

          if (data.access) {
            // Update both storage keys
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('token', data.access);
            
            set({
              tokens: { ...tokens, access: data.access },
            });
          }

          return true;
        } catch {
          get().clearAuth();
          return false;
        }
      },

      setLoading: (loading: boolean) => set({ loading }),

      checkAuth: () => {
        get().syncFromLocalStorage();

        const { tokens, user } = get();

        if (tokens?.access && user) {
          set({ isAuthenticated: true });
          return;
        }

        if (tokens?.access && !user) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isAuthenticated: false });
      },

      verifyToken: async (): Promise<boolean> => {
        get().syncFromLocalStorage();

        const { tokens } = get();

        if (!tokens?.access) {
          return false;
        }

        try {
          // ✅ FIXED: Use /api/users/me/ endpoint
          const response = await fetch(getApiUrl('/api/users/me/'), {    
            headers: {
              Authorization: `Bearer ${tokens.access}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();

            set({
              isAuthenticated: true,
              user: userData
            });

            return true;
          } else if (response.status === 401) {
            const refreshed = await get().refreshToken();
            if (refreshed) {
              return await get().verifyToken();
            } else {
              get().logout();
              return false;
            }
          } else {
            return false;
          }
        } catch (error) {
          console.error('Token verification error:', error);
          return false;
        }
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,     
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
      }),
      migrate: (persistedState: any, version: number) => {
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('access_token');
          const token = localStorage.getItem('token');
          const localRefresh = localStorage.getItem('refresh_token');
          
          const finalToken = accessToken || token;

          if (finalToken && localRefresh) {
            if (!persistedState.tokens || !persistedState.tokens.access) {
              persistedState.tokens = {
                access: finalToken,
                refresh: localRefresh
              };
            }
          }
        }
        return persistedState;
      }
    }
  )
);