import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/store/auth';
import ProtectedRoute from '../../components/ProtectedRoute';
import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// ✅ FIXED: Clean up API_URL definition
const API_URL = import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app';

function ComplianceContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tokens } = useAuthStore();
  const [tacCode, setTacCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { transferId, amount, recipient } = location.state || {};

  useEffect(() => {
    if (!transferId) {
      navigate('/dashboard/transfer');
    }
  }, [transferId, navigate]);

  const handleTacChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newTac = [...tacCode];
      newTac[index] = value;
      setTacCode(newTac);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`tac-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyTac = async () => {
    if (!tokens?.access || !transferId) return;
    
    const code = tacCode.join('');
    if (code.length !== 6) {
      setError('Please enter complete 6-digit TAC');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ✅ FIXED: Correct endpoint - /api/compliance/transfers/{id}/verify-tac/
      const response = await fetch(`${API_URL}/api/compliance/transfers/${transferId}/verify-tac/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tac_code: code }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(data.error || 'Invalid TAC code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!transferId) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Security Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Enter the TAC code sent to your email
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
        >
          {/* Transaction Details */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Transaction Details
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify this is your transaction
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${amount?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Recipient:</span>
                <span className="font-medium text-gray-900 dark:text-white">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                <span className="font-medium text-gray-900 dark:text-white">{transferId}</span>
              </div>
            </div>
          </div>

          {/* TAC Input */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Enter 6-digit TAC Code
              </h3>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              {tacCode.map((digit, index) => (
                <input
                  key={index}
                  id={`tac-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleTacChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-3xl font-bold bg-gray-50 dark:bg-gray-700 
                           border-2 border-gray-300 dark:border-gray-600 rounded-xl
                           focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20
                           text-gray-900 dark:text-white"
                />
              ))}
            </div>
            
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-2">
              Check your email for the 6-digit Transaction Authorization Code
            </p>
            <p className="text-center text-gray-500 dark:text-gray-500 text-xs">
              Code expires in 24 hours
            </p>
          </div>

          {/* Error/Success */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">
                    TAC Verified Successfully!
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Funds have been deducted. Admin will process the transfer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerifyTac}
            disabled={loading || success || tacCode.join('').length !== 6}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
                     text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 
                     flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Verified Successfully
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Verify & Process Transfer
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function Compliance() {
  return (
    <ProtectedRoute>
      <ComplianceContent />
    </ProtectedRoute>
  );
}
