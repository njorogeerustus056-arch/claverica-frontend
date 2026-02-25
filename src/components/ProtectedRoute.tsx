import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, loading, verifyToken } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // On mount, verify token with backend
    const verifyAuth = async () => {
      await verifyToken();
      setCheckingAuth(false);
    };
    
    verifyAuth();
  }, [verifyToken]);

  useEffect(() => {
    // Only redirect after auth check is complete
    if (!checkingAuth && !loading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [checkingAuth, loading, isAuthenticated, navigate]);

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
