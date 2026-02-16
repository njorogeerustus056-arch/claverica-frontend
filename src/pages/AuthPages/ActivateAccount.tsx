import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';  // ✅ CHANGED: Use centralized API
import toast from 'react-hot-toast';

export default function ActivateAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const codeParam = searchParams.get('code');
    
    if (emailParam) setEmail(emailParam);
    if (codeParam) setCode(codeParam);
  }, [searchParams]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIXED: Using centralized api.post
      const response = await api.post("/api/accounts/activate/", {
        email, 
        activation_code: code 
      });

      if (response.success || response.message) {
        toast.success('Account activated successfully!');
        navigate('/signin');
      } else {
        toast.error(response.detail || response.message || 'Activation failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);
    try {
      // ✅ FIXED: Using centralized api.post
      const response = await api.post("/api/accounts/resend-activation/", {
        email
      });

      toast.success('Activation code resent!');
    } catch (error: any) {
      toast.error(error.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Activate Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the activation code sent to your email
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleActivate}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="code" className="sr-only">Activation Code</label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="6-digit activation code"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Activating...' : 'Activate Account'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={handleResendCode}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Resend activation code
          </button>
        </div>
      </div>
    </div>
  );
}