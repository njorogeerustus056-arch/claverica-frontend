"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignInForm;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var formik_1 = require("formik");
var Yup = require("yup");
var auth_1 = require("../../lib/store/auth");
var js_cookie_1 = require("js-cookie");
var icons_1 = require("../../icons");
var Label_1 = require("../form/Label");
var InputField_1 = require("../form/input/InputField");
var Checkbox_1 = require("../form/input/Checkbox");
var SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    remember: Yup.boolean(),
});
var ForgotPasswordSchema = Yup.object().shape({
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
function SignInForm() {
    var _this = this;
    var _a = (0, react_1.useState)(false), showPassword = _a[0], setShowPassword = _a[1];
    var _b = (0, react_1.useState)(""), serverError = _b[0], setServerError = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(false), showForgotPassword = _d[0], setShowForgotPassword = _d[1];
    var _e = (0, react_1.useState)("email"), forgotPasswordStep = _e[0], setForgotPasswordStep = _e[1];
    var _f = (0, react_1.useState)(""), forgotPasswordEmail = _f[0], setForgotPasswordEmail = _f[1];
    var _g = (0, react_1.useState)(false), forgotPasswordLoading = _g[0], setForgotPasswordLoading = _g[1];
    var _h = (0, react_1.useState)({ type: "", text: "" }), forgotPasswordMessage = _h[0], setForgotPasswordMessage = _h[1];
    var _j = (0, react_1.useState)(false), otpSent = _j[0], setOtpSent = _j[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var login = (0, auth_1.useAuthStore)().login;
    // Load remembered email on component mount
    (0, react_1.useEffect)(function () {
        var rememberedEmail = js_cookie_1.default.get("remembered_email");
        var rememberExpiry = js_cookie_1.default.get("remember_expiry");
        if (rememberedEmail && rememberExpiry) {
            var expiryDate = new Date(rememberExpiry);
            if (new Date() < expiryDate) {
                // Pre-fill the form if remember is still valid
                var form = document.querySelector('form');
                if (form) {
                    var emailInput = form.querySelector('[name="email"]');
                    var rememberCheckbox = form.querySelector('[name="remember"]');
                    if (emailInput)
                        emailInput.value = rememberedEmail;
                    if (rememberCheckbox)
                        rememberCheckbox.checked = true;
                }
            }
            else {
                // Clear expired remember cookie
                js_cookie_1.default.remove("remembered_email");
                js_cookie_1.default.remove("remember_expiry");
            }
        }
    }, []);
    var handleForgotPasswordSubmit = function (values_1, _a) { return __awaiter(_this, [values_1, _a], void 0, function (values, _b) {
        var response, data, response, data, error_1;
        var setSubmitting = _b.setSubmitting;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setForgotPasswordLoading(true);
                    setForgotPasswordMessage({ type: "", text: "" });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 9, 10, 11]);
                    if (!(forgotPasswordStep === "email")) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetch("`${import.meta.env.VITE_API_URL}`/api/accounts/password/reset/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email: values.forgotEmail }),
                        })];
                case 2:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _c.sent();
                    if (response.ok) {
                        setForgotPasswordEmail(values.forgotEmail);
                        setForgotPasswordStep("otp");
                        setOtpSent(true);
                        setForgotPasswordMessage({
                            type: "success",
                            text: data.note || "OTP sent to your email. Check your inbox."
                        });
                    }
                    else {
                        setForgotPasswordMessage({
                            type: "error",
                            text: data.message || "Failed to send OTP. Please try again."
                        });
                    }
                    return [3 /*break*/, 8];
                case 4:
                    if (!(forgotPasswordStep === "otp")) return [3 /*break*/, 5];
                    // Step 2: Verify OTP and proceed to new password
                    setForgotPasswordStep("newPassword");
                    setForgotPasswordMessage({
                        type: "info",
                        text: "OTP verified. Now set your new password."
                    });
                    return [3 /*break*/, 8];
                case 5:
                    if (!(forgotPasswordStep === "newPassword")) return [3 /*break*/, 8];
                    return [4 /*yield*/, fetch("`${import.meta.env.VITE_API_URL}`/api/accounts/password/reset/confirm/", {
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
                        })];
                case 6:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 7:
                    data = _c.sent();
                    if (response.ok && data.success) {
                        setForgotPasswordMessage({
                            type: "success",
                            text: data.message || "Password reset successful! You can now login with your new password."
                        });
                        // Close modal after success
                        setTimeout(function () {
                            setShowForgotPassword(false);
                            setForgotPasswordStep("email");
                            setForgotPasswordEmail("");
                            setOtpSent(false);
                        }, 2000);
                    }
                    else {
                        setForgotPasswordMessage({
                            type: "error",
                            text: data.message || "Failed to reset password. Please try again."
                        });
                    }
                    _c.label = 8;
                case 8: return [3 /*break*/, 11];
                case 9:
                    error_1 = _c.sent();
                    console.error("Forgot password error:", error_1);
                    setForgotPasswordMessage({
                        type: "error",
                        text: "Network error. Please check your connection and try again."
                    });
                    return [3 /*break*/, 11];
                case 10:
                    setForgotPasswordLoading(false);
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var handleRememberMe = function (email, remember) {
        if (remember && email) {
            // Store email for 30 days
            var expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            js_cookie_1.default.set("remembered_email", email, {
                expires: expiryDate,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            js_cookie_1.default.set("remember_expiry", expiryDate.toISOString(), {
                expires: expiryDate,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            console.log("Remember me enabled for:", email);
        }
        else {
            // Clear cookies if remember is disabled
            js_cookie_1.default.remove("remembered_email");
            js_cookie_1.default.remove("remember_expiry");
            console.log("Remember me disabled");
        }
    };
    return (<>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Modern Banking Header */}
        <div className="w-full max-w-md px-4 pt-8 mx-auto">
          <react_router_dom_1.Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:gap-3 group">
            <icons_1.ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1"/>
            <span className="group-hover:underline underline-offset-2">Back to home</span>
          </react_router_dom_1.Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center flex-1 w-full max-w-md px-4 py-8 mx-auto sm:py-12">
          <div className="w-full">
            {/* Banking-style Title Section */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-brand/20 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
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
              <formik_1.Formik initialValues={{
            email: "",
            password: "",
            remember: false,
        }} validationSchema={SignInSchema} onSubmit={function (values_1, _a) { return __awaiter(_this, [values_1, _a], void 0, function (values, _b) {
            var success, err_1, errorMessage;
            var _c, _d, _e, _f;
            var setSubmitting = _b.setSubmitting;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        setServerError("");
                        setIsLoading(true);
                        setSubmitting(true);
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, 4, 5]);
                        console.log("Attempting login for:", values.email);
                        // Handle remember me functionality
                        handleRememberMe(values.email, values.remember);
                        return [4 /*yield*/, login(values.email, values.password)];
                    case 2:
                        success = _g.sent();
                        if (success) {
                            console.log("Login successful, redirecting to dashboard");
                            navigate("/dashboard");
                        }
                        else {
                            setServerError("Invalid email or password.");
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _g.sent();
                        console.error("Login error:", err_1);
                        errorMessage = "Login failed. Please check your credentials.";
                        if ((_c = err_1.message) === null || _c === void 0 ? void 0 : _c.includes("verify")) {
                            errorMessage = "Please verify your email before logging in.";
                        }
                        else if (((_d = err_1.message) === null || _d === void 0 ? void 0 : _d.includes("Invalid")) || ((_e = err_1.message) === null || _e === void 0 ? void 0 : _e.includes("credentials"))) {
                            errorMessage = "Invalid email or password.";
                        }
                        else if ((_f = err_1.message) === null || _f === void 0 ? void 0 : _f.includes("inactive")) {
                            errorMessage = "Account is inactive. Please contact support.";
                        }
                        else if (err_1.status === 401 || err_1.status === 403) {
                            errorMessage = "Invalid email or password.";
                        }
                        else if (err_1.status === 404) {
                            errorMessage = "Login service unavailable. Please try again later.";
                        }
                        setServerError(errorMessage);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        setSubmitting(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); }}>
                {function (_a) {
            var values = _a.values, errors = _a.errors, touched = _a.touched, handleChange = _a.handleChange, handleBlur = _a.handleBlur, isSubmitting = _a.isSubmitting, setFieldValue = _a.setFieldValue;
            return (<formik_1.Form className="space-y-6">
                    {/* Email Input - Modern Banking Style */}
                    <div className="space-y-2">
                      <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email address
                      </Label_1.default>
                      <InputField_1.default name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" className="w-full px-4 py-3.5 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-900/20 transition-all duration-200 hover:border-gray-300"/>
                      {touched.email && errors.email && (<p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                          </svg>
                          {errors.email}
                        </p>)}
                    </div>

                    {/* Password Input - Modern Banking Style */}
                    <div className="space-y-2">
                      <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Password
                      </Label_1.default>
                      <div className="relative">
                        <InputField_1.default name="password" type={showPassword ? "text" : "password"} value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password" className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-900/20 transition-all duration-200 hover:border-gray-300"/>
                        <button type="button" onClick={function () { return setShowPassword(!showPassword); }} className="absolute z-10 p-2 transition-all -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95">
                          {showPassword ? (<icons_1.EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>) : (<icons_1.EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>)}
                        </button>
                      </div>
                      {touched.password && errors.password && (<p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                          </svg>
                          {errors.password}
                        </p>)}
                    </div>

                    {/* Remember & Forgot Password - Banking Style */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Checkbox_1.default name="remember" checked={values.remember} onChange={function (checked) {
                    setFieldValue("remember", checked);
                    if (values.email) {
                        handleRememberMe(values.email, checked);
                    }
                }} className="border-2 border-gray-300 checked:border-brand-500 checked:bg-brand-500 cursor-pointer"/>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer" onClick={function () {
                    var newValue = !values.remember;
                    setFieldValue("remember", newValue);
                    if (values.email) {
                        handleRememberMe(values.email, newValue);
                    }
                }}>
                          Remember for 30 days
                        </span>
                      </div>
                      <button type="button" onClick={function () { return setShowForgotPassword(true); }} className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors underline-offset-4 hover:underline">
                        Forgot password?
                      </button>
                    </div>

                    {/* Server Error - Modern Alert */}
                    {serverError && (<div className="flex items-start gap-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg dark:bg-red-900/20 dark:border-red-400">
                        <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                            {serverError}
                          </p>
                        </div>
                      </div>)}

                    {/* Submit Button - Modern Banking Style */}
                    <button type="submit" disabled={isSubmitting || isLoading || !values.email || !values.password} className="w-full py-3.5 text-sm font-semibold text-white transition-all bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-brand/20 active:scale-[0.98]">
                      {isSubmitting || isLoading ? (<span className="flex items-center justify-center gap-2.5">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>) : ("Sign in to your account")}
                    </button>
                  </formik_1.Form>);
        }}
              </formik_1.Formik>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <react_router_dom_1.Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors underline-offset-4 hover:underline">
                    Create an account
                  </react_router_dom_1.Link>
                </p>
              </div>
            </div>

            {/* Security Notice - Banking Style */}
            <div className="p-4 mt-6 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
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
      {showForgotPassword && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
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
                <button onClick={function () {
                setShowForgotPassword(false);
                setForgotPasswordStep("email");
                setForgotPasswordEmail("");
                setOtpSent(false);
                setForgotPasswordMessage({ type: "", text: "" });
            }} className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <formik_1.Formik initialValues={{
                forgotEmail: "",
                otp: "",
                newPassword: "",
                confirmPassword: "",
            }} validationSchema={ForgotPasswordSchema} onSubmit={handleForgotPasswordSubmit} validateOnChange={true} validateOnBlur={true}>
                {function (_a) {
                var values = _a.values, errors = _a.errors, touched = _a.touched, handleChange = _a.handleChange, handleBlur = _a.handleBlur, isSubmitting = _a.isSubmitting, setFieldValue = _a.setFieldValue;
                return (<formik_1.Form className="space-y-4">
                    {/* Email Input (Step 1) */}
                    {forgotPasswordStep === "email" && (<div className="space-y-2">
                        <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Email address
                        </Label_1.default>
                        <InputField_1.default name="forgotEmail" type="email" value={values.forgotEmail} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" disabled={forgotPasswordLoading} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"/>
                        {touched.forgotEmail && errors.forgotEmail && (<p className="text-sm text-red-500 dark:text-red-400">{errors.forgotEmail}</p>)}
                      </div>)}

                    {/* OTP Input (Step 2) */}
                    {forgotPasswordStep === "otp" && (<div className="space-y-2">
                        <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Enter 6-digit OTP
                        </Label_1.default>
                        <InputField_1.default name="otp" type="text" inputMode="numeric" maxLength={6} value={values.otp} onChange={handleChange} onBlur={handleBlur} placeholder="000000" disabled={forgotPasswordLoading} className="w-full px-4 py-3 text-sm text-center border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700 font-mono text-2xl tracking-widest"/>
                        {touched.otp && errors.otp && (<p className="text-sm text-red-500 dark:text-red-400">{errors.otp}</p>)}
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            OTP sent to {forgotPasswordEmail}
                          </p>
                          <button type="button" onClick={function () {
                            setForgotPasswordStep("email");
                            setForgotPasswordMessage({ type: "", text: "" });
                            setFieldValue("forgotEmail", forgotPasswordEmail);
                        }} className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                            Change email
                          </button>
                        </div>
                      </div>)}

                    {/* New Password Inputs (Step 3) */}
                    {forgotPasswordStep === "newPassword" && (<div className="space-y-4">
                        <div className="space-y-2">
                          <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            New Password
                          </Label_1.default>
                          <InputField_1.default name="newPassword" type="password" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Enter new password" disabled={forgotPasswordLoading} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"/>
                          {touched.newPassword && errors.newPassword && (<p className="text-sm text-red-500 dark:text-red-400">{errors.newPassword}</p>)}
                        </div>

                        <div className="space-y-2">
                          <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Confirm New Password
                          </Label_1.default>
                          <InputField_1.default name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm new password" disabled={forgotPasswordLoading} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"/>
                          {touched.confirmPassword && errors.confirmPassword && (<p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword}</p>)}
                        </div>

                        <div className="space-y-2">
                          <Label_1.default className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            OTP (from previous step)
                          </Label_1.default>
                          <InputField_1.default name="otp" type="text" inputMode="numeric" maxLength={6} value={values.otp} onChange={handleChange} onBlur={handleBlur} placeholder="000000" disabled={forgotPasswordLoading} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:bg-gray-800 dark:border-gray-700"/>
                          {touched.otp && errors.otp && (<p className="text-sm text-red-500 dark:text-red-400">{errors.otp}</p>)}
                        </div>
                      </div>)}

                    {/* Success/Error Message */}
                    {forgotPasswordMessage.text && (<div className={"p-3 rounded-lg ".concat(forgotPasswordMessage.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" : forgotPasswordMessage.type === "error" ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" : "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300")}>
                        <p className="text-sm font-medium">{forgotPasswordMessage.text}</p>
                      </div>)}

                    {/* Action Buttons - FIXED: Simplified disabled logic */}
                    <div className="flex gap-3 pt-4">
                      <button type="button" onClick={function () {
                        if (forgotPasswordStep === "email") {
                            setShowForgotPassword(false);
                        }
                        else {
                            setForgotPasswordStep(forgotPasswordStep === "newPassword" ? "otp" : "email");
                        }
                        setForgotPasswordMessage({ type: "", text: "" });
                    }} className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700" disabled={forgotPasswordLoading}>
                        {forgotPasswordStep === "email" ? "Cancel" : "Back"}
                      </button>
                      <button type="submit" disabled={forgotPasswordLoading || isSubmitting} className="flex-1 px-4 py-3 text-sm font-semibold text-white transition-colors bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-60 disabled:cursor-not-allowed">
                        {forgotPasswordLoading ? (<span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>) : forgotPasswordStep === "email" ? ("Send OTP") : forgotPasswordStep === "otp" ? ("Verify OTP") : ("Reset Password")}
                      </button>
                    </div>
                  </formik_1.Form>);
            }}
              </formik_1.Formik>
            </div>
          </div>
        </div>)}
    </>);
}
