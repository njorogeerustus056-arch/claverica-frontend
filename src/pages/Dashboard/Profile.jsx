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
exports.default = Profile;
// src/pages/Dashboard/Profile.tsx - UPDATED VERSION
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("../../lib/store/auth");
var lucide_react_1 = require("lucide-react");
var client_1 = require("../../lib/api/client");
var API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";
function Profile() {
    var _this = this;
    var _a, _b, _c, _d;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _e = (0, auth_1.useAuthStore)(), authUser = _e.user, tokens = _e.tokens;
    var _f = (0, react_1.useState)(null), profile = _f[0], setProfile = _f[1];
    var _g = (0, react_1.useState)(true), loading = _g[0], setLoading = _g[1];
    var _h = (0, react_1.useState)(null), error = _h[0], setError = _h[1];
    var _j = (0, react_1.useState)(false), isRefreshing = _j[0], setIsRefreshing = _j[1];
    (0, react_1.useEffect)(function () {
        fetchProfileData();
    }, []);
    var fetchProfileData = function () { return __awaiter(_this, void 0, void 0, function () {
        var userResponse, userData, walletBalance, walletResponse, walletError_1, totalTransactions, monthlyIncome, monthlyExpenses, txResponse, transactions, currentMonth_1, currentYear_1, monthlyTransactions, txError_1, profileData, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        setError("Please login to continue");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 11, 12, 13]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, client_1.default.get('/api/users/profile/')];
                case 2:
                    userResponse = _c.sent();
                    userData = userResponse.data;
                    walletBalance = 0;
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, client_1.default.get('/api/transactions/wallet/balance/')];
                case 4:
                    walletResponse = _c.sent();
                    walletBalance = walletResponse.data.balance || 0;
                    return [3 /*break*/, 6];
                case 5:
                    walletError_1 = _c.sent();
                    console.log("Wallet endpoint not available");
                    return [3 /*break*/, 6];
                case 6:
                    totalTransactions = 0;
                    monthlyIncome = 0;
                    monthlyExpenses = 0;
                    _c.label = 7;
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, client_1.default.get('/api/transactions/recent/')];
                case 8:
                    txResponse = _c.sent();
                    transactions = txResponse.data.transactions || txResponse.data || [];
                    currentMonth_1 = new Date().getMonth();
                    currentYear_1 = new Date().getFullYear();
                    monthlyTransactions = transactions.filter(function (tx) {
                        var txDate = new Date(tx.created_at || tx.date);
                        return txDate.getMonth() === currentMonth_1 &&
                            txDate.getFullYear() === currentYear_1;
                    });
                    monthlyIncome = monthlyTransactions
                        .filter(function (tx) { return (tx.transaction_type === "credit" || tx.type === "deposit") && tx.status === "completed"; })
                        .reduce(function (sum, tx) { return sum + (tx.amount || 0); }, 0);
                    monthlyExpenses = monthlyTransactions
                        .filter(function (tx) { return (tx.transaction_type === "debit" || tx.type === "withdrawal") && tx.status === "completed"; })
                        .reduce(function (sum, tx) { return sum + (tx.amount || 0); }, 0);
                    totalTransactions = transactions.length;
                    return [3 /*break*/, 10];
                case 9:
                    txError_1 = _c.sent();
                    console.log("Transactions endpoint not available");
                    return [3 /*break*/, 10];
                case 10:
                    profileData = {
                        // Basic info
                        id: userData.id,
                        email: userData.email || "",
                        account_number: userData.account_number || "CLV-XXX-XXXXXX-XX-XX",
                        first_name: userData.first_name || "User",
                        last_name: userData.last_name || "",
                        phone: userData.phone || "",
                        is_verified: userData.is_verified || false,
                        is_active: userData.is_active !== false,
                        // Personal info (REAL DATA)
                        date_of_birth: userData.date_of_birth || "",
                        gender: userData.gender || "",
                        nationality: userData.nationality || "",
                        date_joined: userData.date_joined || "",
                        last_login: userData.last_login || "",
                        // Address info (REAL DATA)
                        address_line1: userData.address_line1 || "",
                        address_line2: userData.address_line2 || "",
                        city: userData.city || "",
                        state_province: userData.state_province || "",
                        postal_code: userData.postal_code || "",
                        country: userData.country || "",
                        country_of_residence: userData.country_of_residence || "",
                        // Employment info (REAL DATA)
                        occupation: userData.occupation || "",
                        employer: userData.employer || "",
                        income_range: userData.income_range || "",
                        // KYC & Verification (REAL DATA)
                        kyc_status: userData.kyc_status || "pending",
                        risk_level: userData.risk_level || "low",
                        account_status: userData.account_status || "active",
                        doc_type: userData.doc_type || "",
                        doc_number: userData.doc_number || "",
                        // Stats from available endpoints
                        wallet_balance: walletBalance,
                        total_transactions: totalTransactions,
                        monthly_income: monthlyIncome,
                        monthly_expenses: monthlyExpenses
                    };
                    setProfile(profileData);
                    return [3 /*break*/, 13];
                case 11:
                    err_1 = _c.sent();
                    console.error("Profile fetch error:", err_1);
                    setError(((_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to load profile");
                    // Fallback to auth store data
                    if (authUser) {
                        setProfile({
                            email: authUser.email || "user@example.com",
                            account_number: authUser.account_number || "CLV-XXX-XXXXXX-XX-XX",
                            first_name: authUser.first_name || "User",
                            last_name: authUser.last_name || "",
                            phone: authUser.phone || "",
                            is_verified: authUser.is_verified || false,
                            is_active: authUser.is_active !== false,
                            wallet_balance: 0,
                            total_transactions: 0,
                            monthly_income: 0,
                            monthly_expenses: 0,
                            kyc_status: "pending",
                            account_status: "active"
                        });
                    }
                    return [3 /*break*/, 13];
                case 12:
                    setLoading(false);
                    setIsRefreshing(false);
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    // Helper functions
    var formatAddress = function () {
        if (!profile)
            return "No address provided";
        var parts = [
            profile.address_line1,
            profile.address_line2,
            profile.city,
            profile.state_province,
            profile.postal_code,
            profile.country
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(", ") : "No address provided";
    };
    var formatDate = function (dateString) {
        if (!dateString)
            return "Not provided";
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        catch (_a) {
            return dateString;
        }
    };
    var getKycStatusColor = function (status) {
        var colors = {
            'verified': 'text-green-600 dark:text-green-400',
            'pending': 'text-amber-600 dark:text-amber-400',
            'under_review': 'text-blue-600 dark:text-blue-400',
            'rejected': 'text-red-600 dark:text-red-400',
            'submitted': 'text-purple-600 dark:text-purple-400'
        };
        return colors[status] || 'text-slate-600 dark:text-slate-400';
    };
    var getKycStatusText = function (status) {
        var texts = {
            'verified': 'Verified',
            'pending': 'Pending',
            'under_review': 'Under Review',
            'rejected': 'Rejected',
            'submitted': 'Submitted'
        };
        return texts[status] || status.charAt(0).toUpperCase() + status.slice(1);
    };
    // Memoized calculations
    var netFlow = (0, react_1.useMemo)(function () {
        return ((profile === null || profile === void 0 ? void 0 : profile.monthly_income) || 0) - ((profile === null || profile === void 0 ? void 0 : profile.monthly_expenses) || 0);
    }, [profile === null || profile === void 0 ? void 0 : profile.monthly_income, profile === null || profile === void 0 ? void 0 : profile.monthly_expenses]);
    var tier = (0, react_1.useMemo)(function () {
        if ((profile === null || profile === void 0 ? void 0 : profile.kyc_status) === 'verified')
            return "Verified";
        if (profile === null || profile === void 0 ? void 0 : profile.is_verified)
            return "Basic";
        return "Pending Verification";
    }, [profile === null || profile === void 0 ? void 0 : profile.kyc_status, profile === null || profile === void 0 ? void 0 : profile.is_verified]);
    var handleEditProfile = function () {
        navigate('/dashboard/profile/edit');
    };
    var handleRefresh = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsRefreshing(true);
                    return [4 /*yield*/, fetchProfileData()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var downloadStatement = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // TODO: Implement statement download
                alert("Statement download feature coming soon!");
            }
            catch (error) {
                console.error("Failed to download statement:", error);
                alert("Statement download will be available soon!");
            }
            return [2 /*return*/];
        });
    }); };
    var completeKyc = function () {
        navigate('/dashboard/kyc');
    };
    if (loading) {
        return (<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading your profile...</p>
        </div>
      </div>);
    }
    if (error && !profile) {
        return (<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.Shield className="w-6 h-6 text-red-600 dark:text-red-400"/>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-2">Error</h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{error}</p>
          <button onClick={fetchProfileData} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-opacity">
            Try Again
          </button>
        </div>
      </div>);
    }
    if (!profile)
        return null;
    return (<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                My Profile
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your personal information and account details
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleRefresh} disabled={isRefreshing} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50">
                {isRefreshing ? (<>
                    <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                    Refreshing...
                  </>) : (<>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Refresh
                  </>)}
              </button>
              <button onClick={handleEditProfile} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all flex items-center gap-2">
                <lucide_react_1.Edit className="w-4 h-4"/>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <div className="text-white text-3xl font-bold">
                      {(_a = profile.first_name) === null || _a === void 0 ? void 0 : _a[0]}{(_b = profile.last_name) === null || _b === void 0 ? void 0 : _b[0]}
                    </div>
                  </div>
                  {profile.kyc_status === 'verified' && (<div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5 text-white"/>
                    </div>)}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {profile.first_name} {profile.last_name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={"px-3 py-1 text-sm font-bold rounded-full ".concat(profile.kyc_status === 'verified'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400')}>
                        {tier} Tier
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        Account: {profile.account_number}
                      </span>
                      <span className={"text-sm font-medium ".concat(getKycStatusColor(profile.kyc_status || 'pending'))}>
                        KYC: {getKycStatusText(profile.kyc_status || 'pending')}
                      </span>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <lucide_react_1.Mail className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                      </div>
                      <p className="text-slate-900 dark:text-white font-medium truncate">{profile.email}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <lucide_react_1.CreditCard className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Account Number</p>
                      </div>
                      <p className="text-slate-900 dark:text-white font-mono font-bold">{profile.account_number}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <lucide_react_1.Phone className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                      </div>
                      <p className="text-slate-900 dark:text-white font-medium">{profile.phone || "Not provided"}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <lucide_react_1.Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Account Status</p>
                      </div>
                      <p className={"font-medium ".concat(profile.account_status === 'active'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400')}>
                        {((_c = profile.account_status) === null || _c === void 0 ? void 0 : _c.toUpperCase()) || "Active"}
                      </p>
                    </div>
                  </div>

                  {/* Address & Employment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <lucide_react_1.MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Location</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-700 dark:text-slate-300">
                          {profile.country_of_residence || profile.country || "Not specified"}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {formatAddress()}
                        </p>
                        {profile.nationality && (<p className="text-slate-600 dark:text-slate-400 text-sm">
                            Nationality: {profile.nationality}
                          </p>)}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <lucide_react_1.Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Occupation</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 dark:text-white font-medium">
                          {profile.occupation || "Not specified"}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {profile.employer || "No employer specified"}
                        </p>
                        {profile.income_range && (<p className="text-slate-600 dark:text-slate-400 text-sm">
                            Income: {profile.income_range}
                          </p>)}
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Date of Birth</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {formatDate(profile.date_of_birth)}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Gender</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {profile.gender ? profile.gender.replace('_', ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); }) : "Not specified"}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Member Since</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {formatDate(profile.date_joined)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <lucide_react_1.TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400"/>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Income</p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  ${(profile.monthly_income || 0).toLocaleString()}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">This month's earnings</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <lucide_react_1.TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400"/>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Expenses</p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  ${(profile.monthly_expenses || 0).toLocaleString()}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">This month's spending</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <lucide_react_1.Clock className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Transactions</p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {(profile.total_transactions || 0).toLocaleString()}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">All-time transactions</p>
              </div>
            </div>

            {/* Net Flow */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h3 className="text-xl font-bold text-white">Monthly Net Flow</h3>
                <span className={"text-2xl font-bold ".concat(netFlow >= 0 ? 'text-green-300' : 'text-red-300')}>
                  ${Math.abs(netFlow).toLocaleString()} {netFlow >= 0 ? 'Surplus' : 'Deficit'}
                </span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div className={"h-full ".concat(netFlow >= 0 ? 'bg-green-400' : 'bg-red-400', " transition-all duration-1000")} style={{ width: "".concat(Math.min(Math.abs(netFlow) / ((profile.monthly_income || 1) * 2) * 100, 100), "%") }}/>
              </div>
              <p className="text-white/80 text-sm mt-3">
                {netFlow >= 0
            ? 'You are saving money this month!'
            : 'Your expenses exceed your income this month.'}
              </p>
            </div>
          </div>

          {/* Right Column - Actions & Verification */}
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <lucide_react_1.Shield className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                Verification Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={"w-8 h-8 rounded-lg flex items-center justify-center ".concat(profile.kyc_status === 'verified'
            ? 'bg-green-100 dark:bg-green-900/30'
            : profile.kyc_status === 'rejected'
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30')}>
                      {profile.kyc_status === 'verified' ? (<lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400"/>) : profile.kyc_status === 'rejected' ? (<svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>) : (<lucide_react_1.Clock className="w-4 h-4 text-amber-600 dark:text-amber-400"/>)}
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Identity Verification</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {getKycStatusText(profile.kyc_status || 'pending')}
                      </p>
                    </div>
                  </div>
                  <span className={"font-bold ".concat(getKycStatusColor(profile.kyc_status || 'pending'))}>
                    {profile.kyc_status === 'verified' ? 'Complete' :
            profile.kyc_status === 'rejected' ? 'Failed' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400"/>
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Email Verified</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {profile.is_verified ? 'Confirmed' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <span className={"font-bold ".concat(profile.is_verified
            ? 'text-green-600 dark:text-green-400'
            : 'text-amber-600 dark:text-amber-400')}>
                    {profile.is_verified ? 'Complete' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400"/>
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Account Status</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {((_d = profile.account_status) === null || _d === void 0 ? void 0 : _d.toUpperCase()) || "Active"}
                      </p>
                    </div>
                  </div>
                  <span className={"font-bold ".concat(profile.account_status === 'active'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400')}>
                    {profile.account_status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {profile.doc_type && (<div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <lucide_react_1.FileText className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-medium">Document Type</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {profile.doc_type.replace('_', ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); })}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {profile.doc_number ? 'Provided' : 'Missing'}
                    </span>
                  </div>)}
              </div>

              {profile.kyc_status !== 'verified' && (<button onClick={completeKyc} className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all">
                  {profile.kyc_status === 'rejected' ? 'Resubmit KYC Documents' : 'Complete Identity Verification'}
                </button>)}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={downloadStatement} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Download className="w-5 h-5 text-slate-500 dark:text-slate-400"/>
                    <span>Download Statements</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                </button>
                
                <button onClick={function () { return navigate('/dashboard/support'); }} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Share2 className="w-5 h-5 text-slate-500 dark:text-slate-400"/>
                    <span>Contact Support</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                </button>
                
                <button onClick={function () { return navigate('/dashboard/settings'); }} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Award className="w-5 h-5 text-slate-500 dark:text-slate-400"/>
                    <span>Account Settings</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                </button>

                <button onClick={function () { return navigate('/dashboard/referrals'); }} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.User className="w-5 h-5 text-slate-500 dark:text-slate-400"/>
                    <span>Refer Friends</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                </button>
              </div>
            </div>

            {/* Account Tier Benefits */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {tier} Tier Benefits
              </h3>
              <ul className="space-y-2">
                {(profile.kyc_status === 'verified' ? [
            "Higher transaction limits",
            "Priority customer support",
            "Lower fees for transfers",
            "Advanced security features",
            "Dedicated account manager"
        ] : [
            "Basic transaction limits",
            "Standard customer support",
            "Secure account protection",
            "Free bank transfers",
            "24/7 fraud monitoring"
        ]).map(function (benefit, idx) { return (<li key={idx} className="flex items-start gap-2">
                    <lucide_react_1.CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"/>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{benefit}</span>
                  </li>); })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
