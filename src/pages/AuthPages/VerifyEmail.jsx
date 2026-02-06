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
exports.default = VerifyEmail;
// src/pages/AuthPages/VerifyEmail.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var PageMeta_1 = require("../../components/common/PageMeta");
var AuthPageLayout_1 = require("./AuthPageLayout");
var api_1 = require("../../api"); // CHANGED IMPORT
function VerifyEmail() {
    var _this = this;
    var _a;
    var _b = (0, react_1.useState)(""), otp = _b[0], setOtp = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), resendLoading = _d[0], setResendLoading = _d[1];
    var _e = (0, react_1.useState)(""), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)(false), success = _f[0], setSuccess = _f[1];
    var _g = (0, react_1.useState)(""), message = _g[0], setMessage = _g[1];
    var _h = (0, react_1.useState)(""), accountNumber = _h[0], setAccountNumber = _h[1]; // ✅ ADDED: Store account number
    var _j = (0, react_1.useState)(null), responseData = _j[0], setResponseData = _j[1]; // ✅ ADDED: Store full response
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    // Get email from location state or localStorage
    var email = ((_a = location.state) === null || _a === void 0 ? void 0 : _a.email) || localStorage.getItem("pendingVerificationEmail") || "";
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response_1, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    setMessage("");
                    if (!otp || otp.length !== 6) {
                        setError("Please enter a valid 6-digit activation code");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, api_1.authAPI.verifyActivation({
                            email: email,
                            activation_code: otp
                        })];
                case 2:
                    response_1 = _b.sent();
                    if (response_1.success || response_1.message) {
                        setSuccess(true);
                        setMessage(response_1.message || "Account activated successfully!");
                        setResponseData(response_1); // ✅ STORE: Save response for later use
                        // Store account number if available
                        if ((_a = response_1.account) === null || _a === void 0 ? void 0 : _a.account_number) {
                            setAccountNumber(response_1.account.account_number);
                            localStorage.setItem("account_number", response_1.account.account_number);
                            localStorage.setItem("user_email", response_1.account.email);
                            localStorage.setItem("user_name", "".concat(response_1.account.first_name, " ").concat(response_1.account.last_name));
                        }
                        // Clear pending email
                        localStorage.removeItem("pendingVerificationEmail");
                        // ✅ CRITICAL: Save tokens and account number
                        if (response_1.tokens) {
                            localStorage.setItem("token", response_1.tokens.access);
                            localStorage.setItem("refresh_token", response_1.tokens.refresh);
                        }
                        // Redirect to DASHBOARD after 3 seconds
                        setTimeout(function () {
                            var _a;
                            navigate("/dashboard", {
                                state: {
                                    message: "Account activated successfully! Welcome to your dashboard.",
                                    account_number: (_a = response_1.account) === null || _a === void 0 ? void 0 : _a.account_number
                                }
                            });
                        }, 3000);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    setError(err_1.message || "Activation failed. Please check your code and try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleResendOTP = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setResendLoading(true);
                    setError("");
                    setMessage("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, api_1.authAPI.resendActivation({ email: email })];
                case 2:
                    response = _a.sent();
                    setMessage(response.message || "New activation code sent to your email!");
                    // Clear message after 5 seconds
                    setTimeout(function () { return setMessage(""); }, 5000);
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    setError(err_2.message || "Failed to resend activation code. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setResendLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (!email) {
        return (<AuthPageLayout_1.default>
        <PageMeta_1.default title="Account Activation | Claverica" description="Activate Your Account address"/>
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Invalid Request</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No email found for verification. Please sign up first.
          </p>
          <button onClick={function () { return navigate("/signup"); }} className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            Go to Sign Up
          </button>
        </div>
      </AuthPageLayout_1.default>);
    }
    return (<AuthPageLayout_1.default>
      <PageMeta_1.default title="Email Activation | Claverica" description="Activate your account with 6-digit code"/>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"> 
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Activate Your Account</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          We've sent a 6-digit activation code to:
        </p>
        <p className="text-lg font-semibold text-primary mb-6">{email}</p>

        {success ? (<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>   
              </svg>
              <span className="text-green-700 dark:text-green-400 font-medium">{message}</span>
            </div>
            {/* ✅ FIXED: Use accountNumber state instead of response variable */}
            {accountNumber && (<p className="text-green-600 dark:text-green-300 text-sm mt-2">
                Your account number: <strong>{accountNumber}</strong>
              </p>)}
            <p className="text-green-600 dark:text-green-300 text-sm mt-2">
              Redirecting to dashboard...
            </p>
          </div>) : (<form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activation Code
              </label>
              <input type="text" id="otp" value={otp} onChange={function (e) { return setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); }} className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="000000" maxLength={6} required autoFocus/>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter the 6-digit activation code sent to your email
              </p>
            </div>

            {error && (<div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>)}

            {message && !success && (<div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-600 dark:text-blue-400 text-sm">{message}</p>       
              </div>)}

            <button type="submit" disabled={loading || otp.length !== 6} className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition mb-4">
              {loading ? "Activating..." : "Activate Account"}
            </button>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Didn't receive the code?
              </p>
              <button type="button" onClick={handleResendOTP} disabled={resendLoading} className="text-primary hover:text-primary-dark font-medium disabled:opacity-50">
                {resendLoading ? "Sending..." : "Resend Activation Code"}
              </button>
            </div>
          </form>)}

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{" "}
            <button onClick={function () { return navigate("/signup"); }} className="text-primary hover:text-primary-dark font-medium">
              Go back to sign up
            </button>
          </p>
        </div>
      </div>
    </AuthPageLayout_1.default>);
}
