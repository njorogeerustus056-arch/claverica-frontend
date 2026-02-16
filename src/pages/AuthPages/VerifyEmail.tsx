// src/pages/AuthPages/VerifyEmail.tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import { authAPI } from "../../api";  // CHANGED IMPORT

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // ✅ ADDED: Store account number
  const [responseData, setResponseData] = useState<any>(null); // ✅ ADDED: Store full response
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem("pendingVerificationEmail") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit activation code");
      setLoading(false);
      return;
    }

    try {
      // ✅ ADDED: Debug log to check the URL
      console.log('🔍 API_URL from env:', import.meta.env.VITE_API_URL);
      console.log('🔍 Full activation URL:', `${import.meta.env.VITE_API_URL || "https://claverica-backend-production.up.railway.app"}/api/accounts/activate/`);
      
      const response = await authAPI.verifyActivation({
        email: email,
        activation_code: otp
      });
      
      console.log('✅ Activation response:', response);
      
      if (response.success || response.message) {
        setSuccess(true);
        setMessage(response.message || "Account activated successfully!");
        setResponseData(response); // ✅ STORE: Save response for later use
        
        // Store account number if available
        if (response.account?.account_number) {
          setAccountNumber(response.account.account_number);
          localStorage.setItem("account_number", response.account.account_number);
          localStorage.setItem("user_email", response.account.email);
          localStorage.setItem("user_name", `${response.account.first_name} ${response.account.last_name}`);
        }
        
        // Clear pending email
        localStorage.removeItem("pendingVerificationEmail");
        
        // ✅ CRITICAL: Save tokens and account number
        if (response.tokens) {
          localStorage.setItem("token", response.tokens.access);
          localStorage.setItem("access_token", response.tokens.access);
          localStorage.setItem("refresh_token", response.tokens.refresh);
        }
        
        // Redirect to DASHBOARD after 3 seconds
        setTimeout(() => {
          navigate("/dashboard", {
            state: {
              message: "Account activated successfully! Welcome to your dashboard.",
              account_number: response.account?.account_number
            }
          });
        }, 3000);
      }
    } catch (err: any) {
      console.error('❌ Activation error:', err);
      setError(err.message || "Activation failed. Please check your code and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");
    setMessage("");

    try {
      // ✅ ADDED: Debug log for resend
      console.log('🔍 Resend URL:', `${import.meta.env.VITE_API_URL || "https://claverica-backend-production.up.railway.app"}/api/accounts/resend-activation/`);
      
      const response = await authAPI.resendActivation({ email });
      console.log('✅ Resend response:', response);
      
      setMessage(response.message || "New activation code sent to your email!");

      // Clear message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (err: any) {
      console.error('❌ Resend error:', err);
      setError(err.message || "Failed to resend activation code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return (
      <AuthLayout>
        <PageMeta
          title="Account Activation | Claverica"
          description="Activate Your Account address"
        />
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Invalid Request</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No email found for verification. Please sign up first.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Go to Sign Up
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <PageMeta
        title="Email Activation | Claverica"
        description="Activate your account with 6-digit code"
      />
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"> 
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Activate Your Account</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          We've sent a 6-digit activation code to:
        </p>
        <p className="text-lg font-semibold text-primary mb-6">{email}</p>

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />   
              </svg>
              <span className="text-green-700 dark:text-green-400 font-medium">{message}</span>
            </div>
            {/* ✅ FIXED: Use accountNumber state instead of response variable */}
            {accountNumber && (
              <p className="text-green-600 dark:text-green-300 text-sm mt-2">
                Your account number: <strong>{accountNumber}</strong>
              </p>
            )}
            <p className="text-green-600 dark:text-green-300 text-sm mt-2">
              Redirecting to dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activation Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="000000"
                maxLength={6}
                required
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter the 6-digit activation code sent to your email
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {message && !success && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-600 dark:text-blue-400 text-sm">{message}</p>       
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition mb-4"
            >
              {loading ? "Activating..." : "Activate Account"}
            </button>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-primary hover:text-primary-dark font-medium disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend Activation Code"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-primary hover:text-primary-dark font-medium"
            >
              Go back to sign up
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}