import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../lib/store/auth";
import Cookies from "js-cookie";

import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import styles from "./SignInForm.module.css";

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
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = Cookies.get("remembered_email");
    const rememberExpiry = Cookies.get("remember_expiry");
    
    if (rememberedEmail && rememberExpiry) {
      const expiryDate = new Date(rememberExpiry);
      if (new Date() < expiryDate) {
        const form = document.querySelector('form');
        if (form) {
          const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
          const rememberCheckbox = form.querySelector('[name="remember"]') as HTMLInputElement;
          if (emailInput) emailInput.value = rememberedEmail;
          if (rememberCheckbox) rememberCheckbox.checked = true;
        }
      } else {
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
        setForgotPasswordStep("newPassword");
        setForgotPasswordMessage({
          type: "info",
          text: "OTP verified. Now set your new password."
        });
      } else if (forgotPasswordStep === "newPassword") {
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
          
          setTimeout(() => {
            setShowForgotPassword(false);
            setForgotPasswordStep("email");
            setForgotPasswordEmail("");
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
    } else {
      Cookies.remove("remembered_email");
      Cookies.remove("remember_expiry");
    }
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        {/* Back Link */}
        <div className={styles.backLinkContainer}>
          <Link to="/" className={styles.backLink}>
            <ChevronLeft className={styles.backIcon} />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.formContainer}>
            {/* Brand Header */}
            <div className={styles.brandHeader}>
              <div className={styles.logoWrapper}>
                <svg className={styles.logo} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className={styles.pageTitle}>Welcome back</h1>
              <p className={styles.pageSubtitle}>
                Sign in to continue to your account
              </p>
            </div>

            {/* Sign In Card */}
            <div className={styles.signInCard}>
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
                    handleRememberMe(values.email, values.remember);
                    const success = await login(values.email, values.password);
                    
                    if (success) {
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
                  <Form className={styles.form}>
                    {/* Email Field */}
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Email address</label>
                      <input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        className={`${styles.fieldInput} ${touched.email && errors.email ? styles.fieldError : ''}`}
                      />
                      {touched.email && errors.email && (
                        <p className={styles.errorMessage}>{errors.email}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Password</label>
                      <div className={styles.passwordWrapper}>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your password"
                          className={`${styles.fieldInput} ${styles.passwordInput} ${touched.password && errors.password ? styles.fieldError : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={styles.passwordToggle}
                        >
                          {showPassword ? (
                            <Eye className={styles.eyeIcon} />
                          ) : (
                            <EyeOff className={styles.eyeIcon} />
                          )}
                        </button>
                      </div>
                      {touched.password && errors.password && (
                        <p className={styles.errorMessage}>{errors.password}</p>
                      )}
                    </div>

                    {/* Remember & Forgot */}
                    <div className={styles.actionsRow}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="remember"
                          checked={values.remember}
                          onChange={(e) => {
                            setFieldValue("remember", e.target.checked);
                            if (values.email) {
                              handleRememberMe(values.email, e.target.checked);
                            }
                          }}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>Remember for 30 days</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className={styles.forgotLink}
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Server Error */}
                    {serverError && (
                      <div className={styles.serverError}>
                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className={styles.errorText}>{serverError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading || !values.email || !values.password}
                      className={styles.submitButton}
                    >
                      {isSubmitting || isLoading ? (
                        <span className={styles.buttonContent}>
                          <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
                            <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className={styles.spinnerFill} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
              <div className={styles.signupLink}>
                <p className={styles.signupText}>
                  Don't have an account?{" "}
                  <Link to="/signup" className={styles.signupAnchor}>
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className={styles.securityNotice}>
              <div className={styles.securityIconWrapper}>
                <svg className={styles.securityIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className={styles.securityTitle}>Secure connection</p>
                <p className={styles.securityText}>Bank-level encryption protects your data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Reset Password</h3>
                <p className={styles.modalSubtitle}>
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
                  setForgotPasswordMessage({ type: "", text: "" });
                }}
                className={styles.modalClose}
              >
                <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                <Form className={styles.modalForm}>
                  {/* Email Step */}
                  {forgotPasswordStep === "email" && (
                    <div className={styles.modalField}>
                      <label className={styles.modalLabel}>Email address</label>
                      <input
                        name="forgotEmail"
                        type="email"
                        value={values.forgotEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        disabled={forgotPasswordLoading}
                        className={`${styles.modalInput} ${touched.forgotEmail && errors.forgotEmail ? styles.modalInputError : ''}`}
                      />
                      {touched.forgotEmail && errors.forgotEmail && (
                        <p className={styles.modalError}>{errors.forgotEmail}</p>
                      )}
                    </div>
                  )}

                  {/* OTP Step */}
                  {forgotPasswordStep === "otp" && (
                    <>
                      <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Enter 6-digit OTP</label>
                        <input
                          name="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={values.otp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="000000"
                          disabled={forgotPasswordLoading}
                          className={`${styles.modalInput} ${styles.otpInput} ${touched.otp && errors.otp ? styles.modalInputError : ''}`}
                        />
                        {touched.otp && errors.otp && (
                          <p className={styles.modalError}>{errors.otp}</p>
                        )}
                      </div>
                      <div className={styles.otpFooter}>
                        <p className={styles.otpEmail}>OTP sent to {forgotPasswordEmail}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotPasswordStep("email");
                            setForgotPasswordMessage({ type: "", text: "" });
                            setFieldValue("forgotEmail", forgotPasswordEmail);
                          }}
                          className={styles.changeEmailButton}
                        >
                          Change email
                        </button>
                      </div>
                    </>
                  )}

                  {/* New Password Step */}
                  {forgotPasswordStep === "newPassword" && (
                    <>
                      <div className={styles.modalField}>
                        <label className={styles.modalLabel}>New Password</label>
                        <input
                          name="newPassword"
                          type="password"
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter new password"
                          disabled={forgotPasswordLoading}
                          className={`${styles.modalInput} ${touched.newPassword && errors.newPassword ? styles.modalInputError : ''}`}
                        />
                        {touched.newPassword && errors.newPassword && (
                          <p className={styles.modalError}>{errors.newPassword}</p>
                        )}
                      </div>

                      <div className={styles.modalField}>
                        <label className={styles.modalLabel}>Confirm New Password</label>
                        <input
                          name="confirmPassword"
                          type="password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Confirm new password"
                          disabled={forgotPasswordLoading}
                          className={`${styles.modalInput} ${touched.confirmPassword && errors.confirmPassword ? styles.modalInputError : ''}`}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <p className={styles.modalError}>{errors.confirmPassword}</p>
                        )}
                      </div>

                      <div className={styles.modalField}>
                        <label className={styles.modalLabel}>OTP (from previous step)</label>
                        <input
                          name="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={values.otp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="000000"
                          disabled={forgotPasswordLoading}
                          className={`${styles.modalInput} ${touched.otp && errors.otp ? styles.modalInputError : ''}`}
                        />
                        {touched.otp && errors.otp && (
                          <p className={styles.modalError}>{errors.otp}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Message Display */}
                  {forgotPasswordMessage.text && (
                    <div className={`${styles.modalMessage} ${styles[`modalMessage${forgotPasswordMessage.type}`]}`}>
                      <p>{forgotPasswordMessage.text}</p>
                    </div>
                  )}

                  {/* Modal Actions */}
                  <div className={styles.modalActions}>
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
                      className={styles.modalButtonSecondary}
                      disabled={forgotPasswordLoading}
                    >
                      {forgotPasswordStep === "email" ? "Cancel" : "Back"}
                    </button>
                    <button
                      type="submit"
                      disabled={forgotPasswordLoading || isSubmitting}
                      className={styles.modalButtonPrimary}
                    >
                      {forgotPasswordLoading ? (
                        <span className={styles.modalButtonContent}>
                          <svg className={styles.modalSpinner} fill="none" viewBox="0 0 24 24">
                            <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className={styles.spinnerFill} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
      )}
    </>
  );
}