// src/components/AuthInitializer.tsx
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store/auth';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { verifyToken, syncFromLocalStorage } = useAuthStore();

  useEffect(() => {
    // Sync tokens from localStorage on app start
    syncFromLocalStorage();
    
    // Verify token with backend
    verifyToken();
  }, [verifyToken, syncFromLocalStorage]);

  return <>{children}</>;
}