// src/lib/store/auth.ts - COMPLETELY FIXED VERSION
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ✅ CRITICAL FIX: Remove any trailing /api from the URL
const RAW_API_URL = import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app';
// Remove any trailing /api or /api/ from the URL
const API_URL = RAW_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');

console.log('🔧 Auth Store - Raw API URL:', RAW_API_URL);
console.log('🔧 Auth Store - Cleaned API URL:', API_URL);

// Helper function to get full API URL - now adds /api prefix automatically
const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  // Always add /api/ prefix
  return `${API_URL}/api/${cleanEndpoint}`;
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
          // ✅ FIXED: Use "token/" not "/api/token/"
          const url = getApiUrl('token/');
          console.log('🔐 Login URL:', url);
          
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Login failed:', error);
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
              const userUrl = getApiUrl('users/me/');
              console.log('👤 Fetching user profile from:', userUrl);
              
              const userResponse = await fetch(userUrl, {
                headers: { 
                  'Authorization': `Bearer ${data.access}`,
                  'Content-Type': 'application/json'
                }
              });
              if (userResponse.ok) {
                userData = await userResponse.json();
                console.log('✅ User data fetched:', userData);
              }
            } catch (e) {
              console.warn('Could not fetch user data:', e);
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
          // ✅ FIXED: Use "token/refresh/" not "/api/token/refresh/"
          const url = getApiUrl('token/refresh/');
          console.log('🔄 Refreshing token at:', url);
          
          const response = await fetch(url, {
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
        } catch (error) {
          console.error('Refresh token error:', error);
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
          // ✅ FIXED: Use "users/me/" not "/api/users/me/"
          const url = getApiUrl('users/me/');
          console.log('🔍 Verifying token at:', url);
          
          const response = await fetch(url, {    
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