"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = AccountSettings;
// src/pages/Dashboard/AccountSettings.tsx
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var auth_1 = require("../../lib/store/auth");
var react_hot_toast_1 = require("react-hot-toast");
var API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";
function AccountSettings() {
    var _this = this;
    var _a, _b, _c;
    var _d = (0, auth_1.useAuthStore)(), authUser = _d.user, tokens = _d.tokens, logout = _d.logout;
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(false), saving = _f[0], setSaving = _f[1];
    var _g = (0, react_1.useState)(null), error = _g[0], setError = _g[1];
    // UI States
    var _h = (0, react_1.useState)(false), showActivityLogs = _h[0], setShowActivityLogs = _h[1];
    var _j = (0, react_1.useState)(false), showDevices = _j[0], setShowDevices = _j[1];
    var _k = (0, react_1.useState)(false), showSecurityDetails = _k[0], setShowSecurityDetails = _k[1];
    // Modal states
    var _l = (0, react_1.useState)(false), showPasswordModal = _l[0], setShowPasswordModal = _l[1];
    var _m = (0, react_1.useState)(false), show2FAModal = _m[0], setShow2FAModal = _m[1];
    var _o = (0, react_1.useState)(false), showDeleteModal = _o[0], setShowDeleteModal = _o[1];
    var _p = (0, react_1.useState)(false), showExportModal = _p[0], setShowExportModal = _p[1];
    var _q = (0, react_1.useState)(false), showProfileModal = _q[0], setShowProfileModal = _q[1];
    var _r = (0, react_1.useState)(false), showKYCModal = _r[0], setShowKYCModal = _r[1];
    var _s = (0, react_1.useState)(null), showDeviceModal = _s[0], setShowDeviceModal = _s[1];
    // Form states
    var _t = (0, react_1.useState)({
        current_password: '',
        new_password: '',
        confirm_password: ''
    }), passwordForm = _t[0], setPasswordForm = _t[1];
    // Match your Django Account model fields exactly
    var _u = (0, react_1.useState)({
        first_name: '',
        last_name: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        street: '',
        city: '',
        state: '',
        zip_code: '',
        occupation: '',
        employer: '',
        income_range: ''
    }), profileForm = _u[0], setProfileForm = _u[1];
    var _v = (0, react_1.useState)({
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        profile_visibility: 'public',
        email_notifications: true,
        sms_notifications: false,
        email_frequency: 'realtime'
    }), settingsForm = _v[0], setSettingsForm = _v[1];
    // Data states - ALL EMPTY INITIALLY (NO MOCK DATA)
    var _w = (0, react_1.useState)({
        email: "",
        first_name: "",
        last_name: "",
        account_number: "", // EMPTY - will be filled by API
        phone: "",
        is_verified: false,
        is_active: false
    }), account = _w[0], setAccount = _w[1];
    var _x = (0, react_1.useState)({
        account: ""
    }), userProfile = _x[0], setUserProfile = _x[1];
    var _y = (0, react_1.useState)({
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        profile_visibility: 'public',
        email_notifications: true,
        sms_notifications: false,
        email_frequency: 'realtime'
    }), userSettings = _y[0], setUserSettings = _y[1];
    var _z = (0, react_1.useState)([]), connectedDevices = _z[0], setConnectedDevices = _z[1]; // EMPTY
    var _0 = (0, react_1.useState)([]), activityLogs = _0[0], setActivityLogs = _0[1]; // EMPTY
    var _1 = (0, react_1.useState)({
        email_verified: false,
        phone_verified: false,
        kyc_status: 'pending',
        kyc_docs_submitted: false,
        verification_score: 0
    }), kycStatus = _1[0], setKycStatus = _1[1];
    var _2 = (0, react_1.useState)({
        two_factor_enabled: false,
        last_password_change: '',
        failed_login_attempts: 0,
        suspicious_activity: false,
        security_score: 0
    }), securityStatus = _2[0], setSecurityStatus = _2[1];
    // Fetch account data from REAL APIs
    (0, react_1.useEffect)(function () {
        fetchAccountData();
    }, []);
    var fetchAccountData = function () { return __awaiter(_this, void 0, void 0, function () {
        var userRes, userData, settingsRes, settingsData, devicesData, devicesRes, devicesResponse, err_1, logsData, logsRes, logsResponse, err_2, kycDocsSubmitted, kycStatusValue, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        setError("Please login to view account settings");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 19, 20, 21]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/profile/"), {
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 2:
                    userRes = _a.sent();
                    if (!userRes.ok) {
                        throw new Error("Failed to load user: ".concat(userRes.statusText));
                    }
                    return [4 /*yield*/, userRes.json()];
                case 3:
                    userData = _a.sent();
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/settings/"), {
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 4:
                    settingsRes = _a.sent();
                    settingsData = {
                        theme: 'light',
                        language: 'en',
                        timezone: 'UTC',
                        profile_visibility: 'public',
                        email_notifications: true,
                        sms_notifications: false,
                        email_frequency: 'realtime'
                    };
                    if (!settingsRes.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, settingsRes.json()];
                case 5:
                    settingsData = _a.sent();
                    _a.label = 6;
                case 6:
                    devicesData = [];
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 11, , 12]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/devices/"), {
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 8:
                    devicesRes = _a.sent();
                    if (!devicesRes.ok) return [3 /*break*/, 10];
                    return [4 /*yield*/, devicesRes.json()];
                case 9:
                    devicesResponse = _a.sent();
                    devicesData = devicesResponse.devices || [];
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_1 = _a.sent();
                    console.log("Devices endpoint error:", err_1);
                    return [3 /*break*/, 12];
                case 12:
                    logsData = [];
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 17, , 18]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/activity-logs/"), {
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 14:
                    logsRes = _a.sent();
                    if (!logsRes.ok) return [3 /*break*/, 16];
                    return [4 /*yield*/, logsRes.json()];
                case 15:
                    logsResponse = _a.sent();
                    logsData = logsResponse.logs || [];
                    _a.label = 16;
                case 16: return [3 /*break*/, 18];
                case 17:
                    err_2 = _a.sent();
                    console.log("Activity logs endpoint error:", err_2);
                    return [3 /*break*/, 18];
                case 18:
                    // Update account state with REAL data
                    setAccount({
                        email: userData.email || "",
                        first_name: userData.first_name || "",
                        last_name: userData.last_name || "",
                        account_number: userData.account_number || "",
                        phone: userData.phone || "",
                        is_verified: userData.is_verified || false,
                        is_active: userData.is_active || false,
                        date_of_birth: userData.date_of_birth,
                        gender: userData.gender,
                        doc_type: userData.doc_type,
                        doc_number: userData.doc_number,
                        street: userData.street || userData.address_line1,
                        city: userData.city,
                        state: userData.state || userData.state_province,
                        zip_code: userData.zip_code || userData.postal_code,
                        occupation: userData.occupation,
                        employer: userData.employer,
                        income_range: userData.income_range,
                        date_joined: userData.date_joined,
                        kyc_status: userData.kyc_status,
                        risk_level: userData.risk_level,
                        account_status: userData.account_status,
                        country: userData.country,
                        nationality: userData.nationality,
                        last_login: userData.last_login
                    });
                    // Update user settings state
                    setUserSettings(settingsData);
                    setSettingsForm(settingsData);
                    // Update connected devices
                    setConnectedDevices(devicesData);
                    // Update activity logs with proper status detection
                    setActivityLogs(logsData.map(function (log) {
                        var _a;
                        return (__assign(__assign({}, log), { status: ((_a = log.action) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('failed')) ? 'failed' : 'success' }));
                    }));
                    kycDocsSubmitted = !!(userData.doc_type && userData.doc_number);
                    kycStatusValue = userData.kyc_status || (kycDocsSubmitted ? 'submitted' : 'pending');
                    setKycStatus({
                        email_verified: userData.is_verified || false,
                        phone_verified: false, // Would need separate verification endpoint
                        kyc_status: kycStatusValue,
                        kyc_docs_submitted: kycDocsSubmitted,
                        verification_score: calculateVerificationScore(userData)
                    });
                    // Update security status
                    setSecurityStatus({
                        two_factor_enabled: settingsData.two_factor_enabled || false,
                        last_password_change: 'Recently', // Would need backend to provide this
                        failed_login_attempts: 0, // Would need backend data
                        suspicious_activity: false,
                        security_score: calculateSecurityScore(settingsData, userData)
                    });
                    // Set profile form with REAL initial data
                    setProfileForm({
                        first_name: userData.first_name || "",
                        last_name: userData.last_name || "",
                        phone: userData.phone || "",
                        date_of_birth: userData.date_of_birth || "",
                        gender: userData.gender || "",
                        street: userData.street || userData.address_line1 || "",
                        city: userData.city || "",
                        state: userData.state || userData.state_province || "",
                        zip_code: userData.zip_code || userData.postal_code || "",
                        occupation: userData.occupation || "",
                        employer: userData.employer || "",
                        income_range: userData.income_range || ""
                    });
                    return [3 /*break*/, 21];
                case 19:
                    err_3 = _a.sent();
                    console.error("Account data fetch error:", err_3);
                    setError(err_3.message || "Failed to load account data");
                    react_hot_toast_1.default.error("Failed to load account data");
                    return [3 /*break*/, 21];
                case 20:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 21: return [2 /*return*/];
            }
        });
    }); };
    var calculateVerificationScore = function (accountData) {
        var score = 0;
        if (accountData.is_verified)
            score += 30;
        if (accountData.phone)
            score += 20;
        if (accountData.doc_type && accountData.doc_number)
            score += 30;
        if ((accountData.street || accountData.address_line1) && accountData.city && (accountData.state || accountData.state_province))
            score += 20;
        return score;
    };
    var calculateSecurityScore = function (settings, accountData) {
        var score = 50; // Base score
        if (settings.two_factor_enabled)
            score += 30;
        if (accountData.is_verified)
            score += 10;
        if (accountData.phone)
            score += 10;
        return Math.min(score, 100);
    };
    // Update settings using PATCH method
    var updateSettings = function (updates) { return __awaiter(_this, void 0, void 0, function () {
        var response, errorData, updatedSettings, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to update settings");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/settings/update/"), {
                            method: "PATCH",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updates),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.message || "Failed to update settings: ".concat(response.statusText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    updatedSettings = _a.sent();
                    // Update local state
                    setUserSettings(function (prev) { return (__assign(__assign({}, prev), updates)); });
                    setSettingsForm(function (prev) { return (__assign(__assign({}, prev), updates)); });
                    // Recalculate security score
                    setSecurityStatus(function (prev) { return (__assign(__assign({}, prev), { security_score: calculateSecurityScore(__assign(__assign({}, userSettings), updates), account) })); });
                    react_hot_toast_1.default.success("Settings updated successfully");
                    return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    console.error("Settings update failed:", err_4);
                    react_hot_toast_1.default.error(err_4.message || "Failed to update settings");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // Update profile using POST method
    var updateProfile = function () { return __awaiter(_this, void 0, void 0, function () {
        var cleanedData, response, errorData, data, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to update profile");
                        return [2 /*return*/];
                    }
                    setSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    cleanedData = Object.fromEntries(Object.entries(profileForm).map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return [
                            key,
                            value === '' ? null : value
                        ];
                    }));
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/profile/update/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(cleanedData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.message || "Failed to update profile: ".concat(response.statusText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    react_hot_toast_1.default.success("Profile updated successfully");
                    setShowProfileModal(false);
                    fetchAccountData(); // Refresh data
                    return [3 /*break*/, 8];
                case 6:
                    err_5 = _a.sent();
                    console.error("Profile update failed:", err_5);
                    react_hot_toast_1.default.error(err_5.message || "Failed to update profile");
                    return [3 /*break*/, 8];
                case 7:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    // Change password using your endpoint
    var changePassword = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to change password");
                        return [2 /*return*/];
                    }
                    if (passwordForm.new_password !== passwordForm.confirm_password) {
                        react_hot_toast_1.default.error("New passwords do not match");
                        return [2 /*return*/];
                    }
                    if (passwordForm.new_password.length < 8) {
                        react_hot_toast_1.default.error("Password must be at least 8 characters");
                        return [2 /*return*/];
                    }
                    setSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/password/change/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(passwordForm),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1.message || "Failed to change password");
                case 4:
                    react_hot_toast_1.default.success("Password changed successfully");
                    setShowPasswordModal(false);
                    setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
                    // Update security status
                    setSecurityStatus(function (prev) { return (__assign(__assign({}, prev), { last_password_change: new Date().toLocaleDateString() })); });
                    return [3 /*break*/, 7];
                case 5:
                    err_6 = _a.sent();
                    console.error("Password change failed:", err_6);
                    react_hot_toast_1.default.error(err_6.message || "Failed to change password");
                    return [3 /*break*/, 7];
                case 6:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // Verify email using your endpoint
    var verifyEmail = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to verify email");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/email/verify/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_2 = _a.sent();
                    throw new Error(error_2.message || "Failed to send verification email: ".concat(response.statusText));
                case 4:
                    react_hot_toast_1.default.success("Verification email sent. Please check your inbox.");
                    return [3 /*break*/, 6];
                case 5:
                    err_7 = _a.sent();
                    console.error("Email verification failed:", err_7);
                    react_hot_toast_1.default.error(err_7.message || "Failed to send verification email");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Verify phone using your endpoint
    var verifyPhone = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to verify phone");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/phone/verify/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_3 = _a.sent();
                    throw new Error(error_3.message || "Failed to send verification SMS: ".concat(response.statusText));
                case 4:
                    react_hot_toast_1.default.success("Verification SMS sent. Please check your phone.");
                    return [3 /*break*/, 6];
                case 5:
                    err_8 = _a.sent();
                    console.error("Phone verification failed:", err_8);
                    react_hot_toast_1.default.error(err_8.message || "Failed to send verification SMS");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Setup 2FA using your endpoint
    var setupTwoFactor = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_4, data, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to setup 2FA");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/2fa/setup/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_4 = _a.sent();
                    throw new Error(error_4.message || "Failed to setup 2FA: ".concat(response.statusText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    if (data.qr_code_url) {
                        setShow2FAModal(true);
                        // You can display QR code from data.qr_code_url if backend provides it
                    }
                    else {
                        react_hot_toast_1.default.success("2FA setup initiated - Check your email for next steps");
                    }
                    setSecurityStatus(function (prev) { return (__assign(__assign({}, prev), { two_factor_enabled: true })); });
                    return [3 /*break*/, 7];
                case 6:
                    err_9 = _a.sent();
                    console.error("2FA setup failed:", err_9);
                    react_hot_toast_1.default.error(err_9.message || "Failed to setup 2FA");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // Remove device using your endpoint
    var removeDevice = function (deviceId) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_5, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to remove device");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/devices/").concat(deviceId, "/remove/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_5 = _a.sent();
                    throw new Error(error_5.message || "Failed to remove device: ".concat(response.statusText));
                case 4:
                    // Remove from local state
                    setConnectedDevices(function (prev) { return prev.filter(function (device) { return device.device_id !== deviceId; }); });
                    setShowDeviceModal(null);
                    react_hot_toast_1.default.success("Device removed successfully");
                    // Refresh devices
                    fetchAccountData();
                    return [3 /*break*/, 6];
                case 5:
                    err_10 = _a.sent();
                    console.error("Device removal failed:", err_10);
                    react_hot_toast_1.default.error(err_10.message || "Failed to remove device");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Export data using your endpoint
    var exportData = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_6, data, blob, url, a, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to export data");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/data/export/"), {
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_6 = _a.sent();
                    throw new Error(error_6.message || "Failed to export data: ".concat(response.statusText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    blob = new Blob([data.data], { type: 'text/csv' });
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.href = url;
                    a.download = data.filename || "claverica-account-data-".concat(new Date().toISOString().split('T')[0], ".csv");
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                    react_hot_toast_1.default.success("Data exported successfully");
                    setShowExportModal(false);
                    return [3 /*break*/, 7];
                case 6:
                    err_11 = _a.sent();
                    console.error("Data export failed:", err_11);
                    react_hot_toast_1.default.error(err_11.message || "Failed to export data");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // Delete account using your endpoint
    var deleteAccount = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_7, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        react_hot_toast_1.default.error("Please login to delete account");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/users/delete/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ confirmation: 'DELETE MY ACCOUNT' }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    error_7 = _a.sent();
                    throw new Error(error_7.message || "Failed to delete account: ".concat(response.statusText));
                case 4:
                    react_hot_toast_1.default.success("Account deactivation requested.");
                    setTimeout(function () { return logout(); }, 2000);
                    return [3 /*break*/, 6];
                case 5:
                    err_12 = _a.sent();
                    console.error("Account deletion failed:", err_12);
                    react_hot_toast_1.default.error(err_12.message || "Failed to delete account");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var submitKYC = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // For now, redirect to KYC page
            window.location.href = '/kyc/submit/';
            return [2 /*return*/];
        });
    }); };
    var SecurityScoreCircle = function (_a) {
        var score = _a.score;
        var radius = 40;
        var circumference = 2 * Math.PI * radius;
        var strokeDashoffset = circumference - (score / 100) * circumference;
        var getColor = function (score) {
            if (score >= 80)
                return "text-green-500";
            if (score >= 60)
                return "text-yellow-500";
            return "text-red-500";
        };
        var getBgColor = function (score) {
            if (score >= 80)
                return "stroke-green-500/20";
            if (score >= 60)
                return "stroke-yellow-500/20";
            return "stroke-red-500/20";
        };
        return (<div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r={radius} strokeWidth="8" fill="none" className={getBgColor(score)}/>
          <circle cx="64" cy="64" r={radius} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={"".concat(getColor(score), " transition-all duration-1000")}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={"text-3xl font-bold ".concat(getColor(score))}>{score}</span>
          <span className="text-xs text-gray-500">Security Score</span>
        </div>
      </div>);
    };
    var VerificationProgress = function () {
        var steps = [
            { label: "Email", completed: kycStatus.email_verified, required: true },
            { label: "Phone", completed: kycStatus.phone_verified, required: false },
            { label: "ID Docs", completed: kycStatus.kyc_docs_submitted, required: true },
            { label: "Address", completed: !!(account.street || account.address_line1) && account.city && (account.state || account.state_province), required: true },
        ];
        var completedCount = steps.filter(function (step) { return step.completed; }).length;
        var totalCount = steps.filter(function (step) { return step.required; }).length;
        var percentage = Math.round((completedCount / totalCount) * 100);
        return (<div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Verification Progress
          </span>
          <span className="text-sm font-bold text-blue-600">{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: "".concat(percentage, "%") }}/>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {steps.map(function (step, index) { return (<div key={index} className="text-center">
              <div className={"w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ".concat(step.completed
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400')}>
                {step.completed ? <lucide_react_1.Check className="w-4 h-4"/> : <span>{index + 1}</span>}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{step.label}</span>
            </div>); })}
        </div>
      </div>);
    };
    // Document type options matching your backend
    var documentTypes = [
        { value: "passport", label: "Passport" },
        { value: "national_id", label: "National ID Card" },
        { value: "drivers_license", label: "Driver's License" },
        { value: "residence_permit", label: "Residence Permit" }
    ];
    // Income range options matching your backend
    var incomeRanges = [
        { value: "<10000", label: "Below $10,000 / â‚¬9,000 / Â£8,000" },
        { value: "10000-30000", label: "$10,000 - $30,000 / â‚¬9,000 - â‚¬27,000" },
        { value: "30000-50000", label: "$30,000 - $50,000 / â‚¬27,000 - â‚¬45,000" },
        { value: "50000-75000", label: "$50,000 - $75,000 / â‚¬45,000 - â‚¬68,000" },
        { value: "75000-100000", label: "$75,000 - $100,000 / â‚¬68,000 - â‚¬90,000" },
        { value: "100000-150000", label: "$100,000 - $150,000 / â‚¬90,000 - â‚¬135,000" },
        { value: "150000-200000", label: "$150,000 - $200,000 / â‚¬135,000 - â‚¬180,000" },
        { value: ">200000", label: "Above $200,000 / â‚¬180,000 / Â£160,000" }
    ];
    // Gender options matching your backend
    var genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "non_binary", label: "Non-binary" },
        { value: "transgender", label: "Transgender" },
        { value: "genderqueer", label: "Genderqueer" },
        { value: "other", label: "Other" },
        { value: "prefer_not_to_say", label: "Prefer not to say" }
    ];
    if (loading) {
        return (<div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading account settings...</p>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.AlertCircle className="w-8 h-8 text-red-600"/>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-2">Error Loading Settings</h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{error}</p>
          <button onClick={fetchAccountData} className="w-full bg-slate-900 dark:bg-slate-700 text-white rounded-xl py-3 font-semibold hover:bg-slate-800 transition-colors">
            Retry
          </button>
        </div>
      </div>);
    }
    return (<div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <react_hot_toast_1.Toaster position="top-right"/>
      
      <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account preferences, security, and privacy settings
            </p>
          </div>

          {/* Profile & Security Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden lg:col-span-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"/>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"/>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border-4 border-white/30 shadow-lg">
                    {((_a = account.first_name) === null || _a === void 0 ? void 0 : _a[0]) || ((_b = account.email) === null || _b === void 0 ? void 0 : _b[0]) || "U"}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-blue-600 rounded-lg shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <lucide_react_1.Camera className="w-4 h-4"/>
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold mb-1">
                    {account.first_name} {account.last_name}
                  </h2>
                  <p className="text-white/80 mb-2">{account.email}</p>
                  <div className="flex flex-wrap gap-2">
                    {account.account_number && (<span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        <lucide_react_1.CreditCard className="w-3 h-3 inline mr-1"/> 
                        {account.account_number}
                      </span>)}
                    {account.country && (<span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        <lucide_react_1.Globe className="w-3 h-3 inline mr-1"/> 
                        {account.country}
                      </span>)}
                    <span className={"px-3 py-1 rounded-full text-sm font-medium ".concat(account.is_verified
            ? 'bg-green-500/30 backdrop-blur-sm'
            : 'bg-yellow-500/30 backdrop-blur-sm')}>
                      {account.is_verified ? 'âœ“ Verified' : 'âš  Needs Verification'}
                    </span>
                  </div>
                </div>
                <button onClick={function () { return setShowProfileModal(true); }} className="px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
                  <lucide_react_1.User className="w-4 h-4 inline mr-2"/>
                  Edit Profile
                </button>
              </div>
            </framer_motion_1.motion.div>

            {/* Security Score Card */}
            <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Security Health
                </h3>
                <lucide_react_1.Shield className="w-5 h-5 text-blue-600"/>
              </div>
              <div className="flex flex-col items-center">
                <SecurityScoreCircle score={securityStatus.security_score}/>
                <div className="mt-4 w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">2FA</span>
                    <span className={"font-medium ".concat(securityStatus.two_factor_enabled ? 'text-green-600' : 'text-red-600')}>
                      {securityStatus.two_factor_enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Email Verified</span>
                    <span className={"font-medium ".concat(kycStatus.email_verified ? 'text-green-600' : 'text-yellow-600')}>
                      {kycStatus.email_verified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last Password</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {securityStatus.last_password_change || 'Never'}
                    </span>
                  </div>
                </div>
              </div>
            </framer_motion_1.motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
            {
                label: "Account Status",
                value: account.is_active ? "Active" : "Inactive",
                icon: account.is_active ? lucide_react_1.CheckCircle : lucide_react_1.XCircle,
                color: account.is_active ? "from-green-500 to-emerald-500" : "from-red-500 to-orange-500",
                trend: null
            },
            {
                label: "KYC Status",
                value: account.kyc_status ? account.kyc_status.charAt(0).toUpperCase() + account.kyc_status.slice(1).replace('_', ' ') : 'Pending',
                icon: account.kyc_status === 'verified' ? lucide_react_1.BadgeCheck : lucide_react_1.BadgeAlert,
                color: account.kyc_status === 'verified' ? "from-green-500 to-emerald-500" :
                    account.kyc_status === 'pending' ? "from-yellow-500 to-amber-500" : "from-red-500 to-orange-500",
                trend: null
            },
            {
                label: "Security Score",
                value: "".concat(securityStatus.security_score, "/100"),
                icon: lucide_react_1.ShieldCheck,
                color: "from-blue-500 to-cyan-500",
                trend: null
            },
            {
                label: "Verification",
                value: "".concat(Math.round((kycStatus.verification_score / 100) * 100), "%"),
                icon: lucide_react_1.UserCheck,
                color: "from-purple-500 to-pink-500",
                trend: kycStatus.verification_score > 50 ? "up" : "down"
            }
        ].map(function (stat, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105">
                <div className={"absolute inset-0 bg-gradient-to-br ".concat(stat.color, " opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity")}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={"w-10 h-10 rounded-xl bg-gradient-to-br ".concat(stat.color, " flex items-center justify-center shadow-md")}>
                      <stat.icon className="w-5 h-5 text-white"/>
                    </div>
                    {stat.trend && (<div className={"px-2 py-1 rounded-lg text-xs font-medium ".concat(stat.trend === 'up'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400')}>
                        {stat.trend === 'up' ? 'â†‘' : 'â†“'}
                      </div>)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </framer_motion_1.motion.div>); })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Information */}
              <framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                        <lucide_react_1.User className="w-5 h-5 text-white"/>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Personal Information
                      </h3>
                    </div>
                    <button onClick={function () { return setShowProfileModal(true); }} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">First Name</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.first_name || "Not set"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Name</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.last_name || "Not set"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.email}
                        </p>
                        {account.is_verified ? (<span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-semibold">
                            âœ“ Verified
                          </span>) : (<button onClick={verifyEmail} className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors">
                            Verify Email
                          </button>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.phone || "Not set"}
                        </p>
                        {account.phone && !kycStatus.phone_verified && (<button onClick={verifyPhone} className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors">
                            Verify Phone
                          </button>)}
                      </div>
                    </div>
                  </div>

                  {account.date_of_birth && (<div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {new Date(account.date_of_birth).toLocaleDateString()}
                      </p>
                    </div>)}

                  {(account.street || account.address_line1) && (<div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.street || account.address_line1}
                        {account.city && ", ".concat(account.city)}
                        {(account.state || account.state_province) && ", ".concat(account.state || account.state_province)}
                        {account.zip_code && " ".concat(account.zip_code)}
                        {account.country && ", ".concat(account.country)}
                      </p>
                    </div>)}

                  {account.occupation && (<div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Occupation</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.occupation}
                        </p>
                      </div>
                      {account.employer && (<div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Employer</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {account.employer}
                          </p>
                        </div>)}
                    </div>)}

                  {account.doc_type && (<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <p className="text-xs text-gray-500 dark:text-gray-400">ID Document</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {((_c = documentTypes.find(function (doc) { return doc.value === account.doc_type; })) === null || _c === void 0 ? void 0 : _c.label) || account.doc_type}: {account.doc_number}
                      </p>
                    </div>)}
                </div>
              </framer_motion_1.motion.div>

              {/* Verification Progress */}
              <framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                        <lucide_react_1.BadgeCheck className="w-5 h-5 text-white"/>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Identity Verification
                      </h3>
                    </div>
                    <button onClick={submitKYC} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      {kycStatus.kyc_docs_submitted ? 'Update KYC' : 'Submit KYC'}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <VerificationProgress />
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {kycStatus.kyc_docs_submitted
            ? "Your KYC documents have been ".concat(account.kyc_status, ".")
            : "Complete KYC verification to access all features including higher transfer limits."}
                    </p>
                  </div>
                </div>
              </framer_motion_1.motion.div>

              {/* Connected Devices */}
              <framer_motion_1.motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                        <lucide_react_1.Smartphone className="w-5 h-5 text-white"/>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Connected Devices ({connectedDevices.length})
                      </h3>
                    </div>
                    <button onClick={function () { return setShowDevices(!showDevices); }} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      {showDevices ? 'Hide' : 'Show All'}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  {connectedDevices.length > 0 ? (connectedDevices.slice(0, showDevices ? undefined : 2).map(function (device) { return (<div key={device.id} className="flex items-center justify-between p-3 mb-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={"w-10 h-10 rounded-xl flex items-center justify-center ".concat(device.device_type === 'mobile'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600')}>
                            {device.device_type === 'mobile' ? (<lucide_react_1.Smartphone className="w-5 h-5"/>) : (<lucide_react_1.Laptop className="w-5 h-5"/>)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{device.device_name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Last active: {new Date(device.last_active).toLocaleDateString()}
                              {device.is_current && " â€¢ Current session"}
                            </p>
                          </div>
                        </div>
                        <button onClick={function () { return setShowDeviceModal(device); }} className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg">
                          <lucide_react_1.Trash2 className="w-4 h-4"/>
                        </button>
                      </div>); })) : (<p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No connected devices found.
                    </p>)}
                </div>
              </framer_motion_1.motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Security Settings */}
              <framer_motion_1.motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                        <lucide_react_1.Shield className="w-5 h-5 text-white"/>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Security Settings
                      </h3>
                    </div>
                    <button onClick={function () { return setShowSecurityDetails(!showSecurityDetails); }} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      {showSecurityDetails ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {/* 2FA */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.Shield className="w-5 h-5 text-green-600"/>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Two-Factor Auth</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Extra security layer</p>
                      </div>
                    </div>
                    <button onClick={function () {
            if (!securityStatus.two_factor_enabled) {
                setupTwoFactor();
            }
            else {
                updateSettings({ two_factor_enabled: !securityStatus.two_factor_enabled });
            }
        }} className={"relative w-12 h-6 rounded-full transition-colors duration-200 ".concat(securityStatus.two_factor_enabled
            ? 'bg-gradient-to-r from-green-500 to-green-600'
            : 'bg-gray-300 dark:bg-gray-600')}>
                      <span className={"absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ".concat(securityStatus.two_factor_enabled ? 'translate-x-6' : 'translate-x-0')}/>
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.Bell className="w-5 h-5 text-purple-600"/>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive important updates</p>
                      </div>
                    </div>
                    <button onClick={function () { return updateSettings({ email_notifications: !userSettings.email_notifications }); }} className={"relative w-12 h-6 rounded-full transition-colors duration-200 ".concat(userSettings.email_notifications
            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
            : 'bg-gray-300 dark:bg-gray-600')}>
                      <span className={"absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ".concat(userSettings.email_notifications ? 'translate-x-6' : 'translate-x-0')}/>
                    </button>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.Smartphone className="w-5 h-5 text-blue-600"/>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">SMS Alerts</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get SMS for transactions</p>
                      </div>
                    </div>
                    <button onClick={function () { return updateSettings({ sms_notifications: !userSettings.sms_notifications }); }} className={"relative w-12 h-6 rounded-full transition-colors duration-200 ".concat(userSettings.sms_notifications
            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
            : 'bg-gray-300 dark:bg-gray-600')}>
                      <span className={"absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ".concat(userSettings.sms_notifications ? 'translate-x-6' : 'translate-x-0')}/>
                    </button>
                  </div>

                  {/* Theme */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.Monitor className="w-5 h-5 text-orange-600"/>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Theme</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Appearance</p>
                      </div>
                    </div>
                    <select value={settingsForm.theme} onChange={function (e) { return updateSettings({ theme: e.target.value }); }} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <lucide_react_1.Globe className="w-5 h-5 text-cyan-600"/>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Language</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Display language</p>
                      </div>
                    </div>
                    <select value={settingsForm.language} onChange={function (e) { return updateSettings({ language: e.target.value }); }} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </framer_motion_1.motion.div>

              {/* Quick Actions */}
              <framer_motion_1.motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                      <lucide_react_1.Zap className="w-5 h-5 text-white"/>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Quick Actions
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
            { icon: lucide_react_1.Lock, label: "Change Password", color: "from-blue-500 to-blue-600", action: function () { return setShowPasswordModal(true); } },
            { icon: lucide_react_1.Download, label: "Export Data", color: "from-green-500 to-green-600", action: function () { return setShowExportModal(true); } },
            { icon: lucide_react_1.FileText, label: "Activity Log", color: "from-purple-500 to-purple-600", action: function () { return setShowActivityLogs(true); } },
            { icon: lucide_react_1.LogOut, label: "Logout All", color: "from-red-500 to-red-600", action: function () { return logout(); } },
            { icon: lucide_react_1.HelpCircle, label: "Support", color: "from-yellow-500 to-yellow-600", action: function () { return react_hot_toast_1.default.info("Support center coming soon"); } },
            { icon: lucide_react_1.Trash2, label: "Delete Account", color: "from-gray-500 to-gray-600", action: function () { return setShowDeleteModal(true); } }
        ].map(function (action, idx) { return (<button key={idx} onClick={action.action} className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 hover:shadow-md transition-all hover:scale-105">
                        <div className={"w-10 h-10 rounded-xl bg-gradient-to-br ".concat(action.color, " flex items-center justify-center mb-2 group-hover:scale-110 transition-transform")}>
                          <action.icon className="w-5 h-5 text-white"/>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white text-left">{action.label}</p>
                      </button>); })}
                  </div>
                </div>
              </framer_motion_1.motion.div>

              {/* Activity Log */}
              {showActivityLogs && (<framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                          <lucide_react_1.Clock className="w-5 h-5 text-white"/>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Recent Activity
                        </h3>
                      </div>
                      <button onClick={function () { return setShowActivityLogs(false); }} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        Close
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {activityLogs.length > 0 ? (activityLogs.slice(0, 10).map(function (log) { return (<div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{log.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(log.timestamp).toLocaleString()} â€¢ {log.device || 'Unknown device'}
                              </p>
                            </div>
                            <span className={"px-2 py-1 rounded text-xs font-semibold ".concat(log.status === 'success'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400')}>
                              {log.status}
                            </span>
                          </div>); })) : (<p className="text-gray-500 dark:text-gray-400 text-center py-4">
                          No activity logs found.
                        </p>)}
                    </div>
                  </div>
                </framer_motion_1.motion.div>)}
            </div>
          </div>

          {/* Account Details */}
          <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-md">
                  <lucide_react_1.CreditCard className="w-5 h-5 text-white"/>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Account Details
                </h3>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {account.account_number && (<div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Account Number</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                      {account.account_number}
                    </p>
                  </div>)}
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {account.date_joined ? new Date(account.date_joined).toLocaleDateString() : "Recently"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Account Status</p>
                  <p className={"text-sm font-bold ".concat(account.is_active
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400')}>
                    {account.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
                {account.kyc_status && (<div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">KYC Status</p>
                    <p className={"text-sm font-bold ".concat(account.kyc_status === 'verified'
                ? 'text-green-600 dark:text-green-400'
                : account.kyc_status === 'pending' || account.kyc_status === 'submitted'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400')}>
                      {account.kyc_status.charAt(0).toUpperCase() + account.kyc_status.slice(1).replace('_', ' ')}
                    </p>
                  </div>)}
                {account.risk_level && (<div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Risk Level</p>
                    <p className={"text-sm font-bold ".concat(account.risk_level === 'low'
                ? 'text-green-600 dark:text-green-400'
                : account.risk_level === 'medium'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400')}>
                      {account.risk_level.charAt(0).toUpperCase() + account.risk_level.slice(1)}
                    </p>
                  </div>)}
                {account.nationality && (<div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nationality</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {account.nationality}
                    </p>
                  </div>)}
              </div>
            </div>
          </framer_motion_1.motion.div>
        </div>
      </div>

      {/* Modals */}
      <framer_motion_1.AnimatePresence>
        {/* Profile Modal */}
        {showProfileModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h3>
                <button onClick={function () { return setShowProfileModal(false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input type="text" value={profileForm.first_name} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { first_name: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input type="text" value={profileForm.last_name} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { last_name: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required/>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input type="tel" value={profileForm.phone} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { phone: e.target.value })); }} placeholder="+254 XXX XXX XXX" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input type="date" value={profileForm.date_of_birth} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { date_of_birth: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender
                    </label>
                    <select value={profileForm.gender} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { gender: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option value="">Select Gender</option>
                      {genderOptions.map(function (gender) { return (<option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>); })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <input type="text" value={profileForm.street} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { street: e.target.value })); }} placeholder="Street address" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"/>
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" value={profileForm.city} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { city: e.target.value })); }} placeholder="City" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                    <input type="text" value={profileForm.state} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { state: e.target.value })); }} placeholder="State/Region" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                    <input type="text" value={profileForm.zip_code} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { zip_code: e.target.value })); }} placeholder="Postal Code" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Occupation
                    </label>
                    <input type="text" value={profileForm.occupation} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { occupation: e.target.value })); }} placeholder="e.g., Software Engineer" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Employer
                    </label>
                    <input type="text" value={profileForm.employer} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { employer: e.target.value })); }} placeholder="e.g., Claverica Ltd" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Income Range
                  </label>
                  <select value={profileForm.income_range} onChange={function (e) { return setProfileForm(__assign(__assign({}, profileForm), { income_range: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option value="">Select Income Range</option>
                    {incomeRanges.map(function (range) { return (<option key={range.value} value={range.value}>
                        {range.label}
                      </option>); })}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={function () { return setShowProfileModal(false); }} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={updateProfile} disabled={saving} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <lucide_react_1.Loader2 className="w-5 h-5 animate-spin"/> : <lucide_react_1.Save className="w-5 h-5"/>}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </framer_motion_1.motion.div>
          </div>)}

        {/* Password Modal */}
        {showPasswordModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h3>
                <button onClick={function () { return setShowPasswordModal(false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input type="password" value={passwordForm.current_password} onChange={function (e) { return setPasswordForm(__assign(__assign({}, passwordForm), { current_password: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input type="password" value={passwordForm.new_password} onChange={function (e) { return setPasswordForm(__assign(__assign({}, passwordForm), { new_password: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input type="password" value={passwordForm.confirm_password} onChange={function (e) { return setPasswordForm(__assign(__assign({}, passwordForm), { confirm_password: e.target.value })); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"/>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={function () { return setShowPasswordModal(false); }} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={changePassword} disabled={saving} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <lucide_react_1.Loader2 className="w-5 h-5 animate-spin"/> : <lucide_react_1.Key className="w-5 h-5"/>}
                  {saving ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </framer_motion_1.motion.div>
          </div>)}

        {/* 2FA Modal */}
        {show2FAModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Two-Factor Auth</h3>
                <button onClick={function () { return setShow2FAModal(false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                    <lucide_react_1.QrCode className="w-16 h-16 text-gray-400"/>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter 6-digit code from authenticator
                  </label>
                  <input type="text" placeholder="000000" maxLength={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-2xl tracking-widest font-mono"/>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button onClick={function () { return setShow2FAModal(false); }} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={function () {
                react_hot_toast_1.default.success("2FA enabled successfully");
                setShow2FAModal(false);
            }} className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all">
                  Verify & Enable
                </button>
              </div>
            </framer_motion_1.motion.div>
          </div>)}

        {/* Device Removal Modal */}
        {showDeviceModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Remove Device</h3>
                <button onClick={function () { return setShowDeviceModal(null); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Are you sure you want to remove this device? You'll be logged out from this device.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <div className={"w-10 h-10 rounded-xl flex items-center justify-center ".concat(showDeviceModal.device_type === 'mobile'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600')}>
                    {showDeviceModal.device_type === 'mobile' ? (<lucide_react_1.Smartphone className="w-5 h-5"/>) : (<lucide_react_1.Laptop className="w-5 h-5"/>)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{showDeviceModal.device_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last active: {new Date(showDeviceModal.last_active).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button onClick={function () { return setShowDeviceModal(null); }} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={function () { return removeDevice(showDeviceModal.device_id); }} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all">
                  Remove Device
                </button>
              </div>
            </framer_motion_1.motion.div>
          </div>)}

        {/* Export Modal */}
        {showExportModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Export Your Data</h3>
                <button onClick={function () { return setShowExportModal(false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    âš ï¸ This file contains sensitive information. Keep it secure and don't share it.
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Your data will be exported in CSV format and include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <lucide_react_1.Check className="w-4 h-4 text-green-500"/>
                      <span className="text-sm">Personal information</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <lucide_react_1.Check className="w-4 h-4 text-green-500"/>
                      <span className="text-sm">Account settings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <lucide_react_1.Check className="w-4 h-4 text-green-500"/>
                      <span className="text-sm">Transaction history (last 2 years)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <lucide_react_1.Check className="w-4 h-4 text-green-500"/>
                      <span className="text-sm">Connected devices</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button onClick={function () { return setShowExportModal(false); }} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={exportData} className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2">
                  <lucide_react_1.Download className="w-5 h-5"/>
                  Export Data
                </button>
              </div>
            </framer_motion_1.motion.div>
          </div>)}

        {/* Delete Account Modal */}
        {showDeleteModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Delete Account</h3>
                <button onClick={function () { return setShowDeleteModal(false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                  <lucide_react_1.X className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    âš ï¸ This action is irreversible. All your data will be permanently deleted.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    When you delete your account:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <lucide_react_1.X className="w-4 h-4 text-red-500 mt-0.5"/>
                      <span className="text-sm">All personal data will be permanently deleted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <lucide_react_1.X className="w-4 h-4 text-red-500 mt-0.5"/>
                      <span className="text-sm">Your transaction history will be removed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <lucide_react_1.X className="w-4 h-4 text-red-500 mt-0.5"/>
                      <span className="text-sm">You will lose access to all features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <lucide_react_1.X className="w-4 h-4 text-red-500 mt-0.5"/>
                      <span className="text-sm">Your account number will be deactivated</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button onClick={function () { return setShowDeleteModal(false); }} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={deleteAccount} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all">
                  Delete Account
                </button>
              </div>
            </framer_motion_1.motion.div>
          </div>)}
      </framer_motion_1.AnimatePresence>
    </div>);
}
