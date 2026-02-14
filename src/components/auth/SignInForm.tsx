import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../lib/store/auth";
import Cookies from "js-cookie";

import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean(),
});

const ForgotPasswordSchema = Yup.object().shape({
  forgotEmail: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().length(6, "OTP must be 6 digits").matches(/^\d+$/, "OTP must contain only digits"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], "Passwords must match")
    .required("Please confirm your password"),
});

type SignInValues = {
  email: string;
  password: string;
  remember: boolean;
};

type ForgotPasswordValues = {
  forgotEmail: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<"email" | "otp" | "newPassword">("email");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState({ type: "", text: "" });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = Cookies.get("remembered_email");
    const rememberExpiry = Cookies.get("remember_expiry");
    
    if (rememberedEmail && rememberExpiry) {
      const expiryDate = new Date(rememberExpiry);
      if (new Date() < expiryDate) {
        // Pre-fill the form if remember is still valid
        const form = document.querySelector('form');
        if (form) {
          const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
          const rememberCheckbox = form.querySelector('[name="remember"]') as HTMLInputElement;
          if (emailInput) emailInput.value = rememberedEmail;
          if (rememberCheckbox) rememberCheckbox.checked = true;
        }
      } else {
        // Clear expired remember cookie
        Cookies.remove("remembered_email");
        Cookies.remove("remember_expiry");
      }
    }
  }, []);

  const handleForgotPasswordSubmit = async (values: ForgotPasswordValues, { setSubmitting }: any) => {
    setForgotPasswordLoading(true);
    setForgotPasswordMessage({ type: "", text: "" });

    try {
      if (forgotPasswordStep === "email") {
        // Step 1: Request OTP
        const response = await fetch(`${import.meta.env.VITE_API_URL}/accounts/password/reset/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.forgotEmail }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setForgotPasswordEmail(values.forgotEmail);
          setForgotPasswordStep("otp");
          setOtpSent(true);
          setForgotPasswordMessage({
            type: "success",
            text: data.note || "OTP sent to your email. Check your inbox."
          });
        } else {
          setForgotPasswordMessage({
            type: "error",
            text: data.message || "Failed to send OTP. Please try again."
          });
        }
      } else if (forgotPasswordStep === "otp") {
        // Step 2: Verify OTP and proceed to new password
        setForgotPasswordStep("newPassword");
        setForgotPasswordMessage({
          type: "info",
          text: "OTP verified. Now set your new password."
        });
      } else if (forgotPasswordStep === "newPassword") {
        // Step 3: Confirm password reset
        const response = await fetch(`${import.meta.env.VITE_API_URL}/accounts/password/reset/confirm/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            otp: values.otp,
            new_password: values.newPassword,
            confirm_password: values.confirmPassword
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          setForgotPasswordMessage({
            type: "success",
            text: data.message || "Password reset successful! You can now login with your new password."
          });
          
          // Close modal after success
          setTimeout(() => {
            setShowForgotPassword(false);
            setForgotPasswordStep("email");
            setForgotPasswordEmail("");
            setOtpSent(false);
          }, 2000);
        } else {
          setForgotPasswordMessage({
            type: "error",
            text: data.message || "Failed to reset password. Please try again."
          });
        }
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setForgotPasswordMessage({
        type: "error",
        text: "Network error. Please check your connection and try again."
      });
    } finally {
      setForgotPasswordLoading(false);
      setSubmitting(false);
    }
  };

  const handleRememberMe = (email: string, remember: boolean) => {
    if (remember && email) {
      // Store email for 30 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      
      Cookies.set("remembered_email", email, {
        expires: expiryDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
      
      Cookies.set("remember_expiry", expiryDate.toISOString(), {
        expires: expiryDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
      
      console.log("Remember me enabled for:", email);
    } else {
      // Clear cookies if remember is disabled
      Cookies.remove("remembered_email");
      Cookies.remove("remember_expiry");
      console.log("Remember me disabled");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Modern Banking Header */}
        <div className="w-full max-w-md px-4 pt-8 mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:gap-3 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="group-hover:underline underline-offset-2">Back to home</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center flex-1 w-full max-w-md px-4 py-8 mx-auto sm:py-12">
          <div className="w-full">
            {/* Banking-style Title Section */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-brand/20 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome back
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Sign in to continue to your account
              </p>
            </div>

            {/* Modern Card Container */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl dark:bg-gray-900 dark:border-gray-800 sm:p-10">
              <Formik<SignInValues>
                initialValues={{
                  email: "",
                  password: "",
                  remember: false,
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setServerError("");
                  setIsLoading(true);
                  setSubmitting(true);

                  try {
                    console.log("Attempting login for:", values.email);
                    
                    // Handle remember me functionality
                    handleRememberMe(values.email, values.remember);
                    
                    // Use the Zustand login function
                    const success = await login(values.email, values.password);
                    
                    if (success) {
                      console.log("Login successful, redirecting to dashboard");
                      navigate("/dashboard");
                    } else {
                      setServerError("Invalid email or password.");
                    }
                  } catch (err: any) {
                    console.error("Login error:", err);
                    
                    let errorMessage = "Login failed. Please check your credentials.";
                    
                    if (err.message?.includes("verify")) {
                      errorMessage = "Please verify your email before logging in.";
                    } else if (err.message?.includes("Invalid") || err.message?.includes("credentials")) {
                      errorMessage = "Invalid email or password.";
                    } else if (err.message?.includes("inactive")) {
                      errorMessage = "Account is inactive. Please contact support.";
                    } else if (err.status === 401 || err.status === 403) {
                      errorMessage = "Invalid email or password.";
                    } else if (err.status === 404) {
                      errorMessage = "Login service unavailable. Please try again later.";
                    }
                    
                    setServerError(errorMessage);
                  } finally {
                    setIsLoading(false);
                    setSubmitting(false);
                  }
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                  <Form className="space-y-6">
                    {/* Email Input - Modern Banking Style */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email address
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-900/20 transition-all duration-200 hover:border-gray-300"
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Input - Modern Banking Style */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-900/20 transition-all duration-200 hover:border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-10 p-2 transition-all -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
                        >
                          {showPassword ? (
                            <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                      {touched.password && errors.password && (
                        <p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Remember & Forgot Password - Banking Style */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Checkbox
                          name="remember"
                          checked={values.remember}
                          onChange={(checked) => {
                            setFieldValue("remember", checked);
                            if (values.email) {
                              handleRememberMe(values.email, checked);
                            }
                          }}
                          className="border-2 border-gray-300 checked:border-brand-500 checked:bg-brand-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => {
                            const newValue = !values.remember;
                            setFieldValue("remember", newValue);
                            if (values.email) {
                              handleRememberMe(values.email, newValue);
                            }
                          }}
                        >
                          Remember for 30 days
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Server Error - Modern Alert */}
                    {serverError && (
                      <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg dark:bg-red-900/20 dark:border-red-400">
                        <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                            {serverError}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button - Modern Banking Style */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading || !values.email || !values.password}
                      className="w-full py-3.5 text-sm font-semibold text-white transition-all bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-brand/20 active:scale-[0.98]"
                    >
                      {isSubmitting || isLoading ? (
                        <span className="flex items-center justify-center gap-2.5">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        "Sign in to your account"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            {/* Security Notice - Banking Style */}
            <div className="p-4 mt-6 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Secure connection
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Bank-level encryption protects your data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl dark:bg-gray-900 animate-in fade-in zoom-in-95">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Reset Password
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {forgotPasswordStep === "email" && "Enter your email to receive OTP"}
                    {forgotPasswordStep === "otp" && "Enter the OTP sent to your email"}
                    {forgotPasswordStep === "newPassword" && "Set your new password"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordStep("email");
                    setForgotPasswordEmail("");
                    setOtpSent(false);
                    setForgotPasswordMessage({ type: "", text: "" });
                  }}
                  className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <Formik<ForgotPasswordValues>
                initialValues={{
                  forgotEmail: "",
                  otp: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={handleForgotPasswordSubmit}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                  <Form className="space-y-4">
                    {/* Email Input (Step 1) */}
                    {forgotPasswordStep === "email" && (
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Email address
                        </Label>
                        <Input
                          name="forgotEmail"
                          type="email"
                          value={values.forgotEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="you@example.com"
                          disabled={forgotPasswordLoading}
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"
                        />
                        {touched.forgotEmail && errors.forgotEmail && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.forgotEmail}</p>
                        )}
                      </div>
                    )}

                    {/* OTP Input (Step 2) */}
                    {forgotPasswordStep === "otp" && (
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Enter 6-digit OTP
                        </Label>
                        <Input
                          name="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={values.otp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="000000"
                          disabled={forgotPasswordLoading}
                          className="w-full px-4 py-3 text-sm text-center border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700 font-mono text-2xl tracking-widest"
                        />
                        {touched.otp && errors.otp && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.otp}</p>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            OTP sent to {forgotPasswordEmail}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setForgotPasswordStep("email");
                              setForgotPasswordMessage({ type: "", text: "" });
                              setFieldValue("forgotEmail", forgotPasswordEmail);
                            }}
                            className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                          >
                            Change email
                          </button>
                        </div>
                      </div>
                    )}

                    {/* New Password Inputs (Step 3) */}
                    {forgotPasswordStep === "newPassword" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            New Password
                          </Label>
                          <Input
                            name="newPassword"
                            type="password"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter new password"
                            disabled={forgotPasswordLoading}
                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"
                          />
                          {touched.newPassword && errors.newPassword && (
                            <p className="text-sm text-red-500 dark:text-red-400">{errors.newPassword}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Confirm New Password
                          </Label>
                          <Input
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Confirm new password"
                            disabled={forgotPasswordLoading}
                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"
                          />
                          {touched.confirmPassword && errors.confirmPassword && (
                            <p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            OTP (from previous step)
                          </Label>
                          <Input
                            name="otp"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={values.otp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="000000"
                            disabled={forgotPasswordLoading}
                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"
                          />
                          {touched.otp && errors.otp && (
                            <p className="text-sm text-red-500 dark:text-red-400">{errors.otp}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Success/Error Message */}
                    {forgotPasswordMessage.text && (
                      <div className={`p-3 rounded-lg ${forgotPasswordMessage.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" : forgotPasswordMessage.type === "error" ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" : "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"}`}>
                        <p className="text-sm font-medium">{forgotPasswordMessage.text}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (forgotPasswordStep === "email") {
                            setShowForgotPassword(false);
                          } else {
                            setForgotPasswordStep(forgotPasswordStep === "newPassword" ? "otp" : "email");
                          }
                          setForgotPasswordMessage({ type: "", text: "" });
                        }}
                        className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        disabled={forgotPasswordLoading}
                      >
                        {forgotPasswordStep === "email" ? "Cancel" : "Back"}
                      </button>
                      <button
                        type="submit"
                        disabled={forgotPasswordLoading || isSubmitting}
                        className="flex-1 px-4 py-3 text-sm font-semibold text-white transition-colors bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {forgotPasswordLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : forgotPasswordStep === "email" ? (
                          "Send OTP"
                        ) : forgotPasswordStep === "otp" ? (
                          "Verify OTP"
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}