"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.api = exports.kycAPI = exports.transferAPI = exports.paymentAPI = exports.walletAPI = exports.notificationAPI = exports.authAPI = exports.ApiError = exports.removeToken = exports.setToken = exports.getRefreshToken = exports.getToken = void 0;
exports.apiFetch = apiFetch;
exports.uploadFormData = uploadFormData;
// src/api.ts - FIXED VERSION WITH DEBUG LOGGING
var auth_1 = require("./lib/store/auth");
var API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";
// Get tokens from Zustand store
var getToken = function () {
    try {
        var tokens = auth_1.useAuthStore.getState().tokens;
        return (tokens === null || tokens === void 0 ? void 0 : tokens.access) || null;
    }
    catch (_a) {
        return null;
    }
};
exports.getToken = getToken;
var getRefreshToken = function () {
    try {
        var tokens = auth_1.useAuthStore.getState().tokens;
        return (tokens === null || tokens === void 0 ? void 0 : tokens.refresh) || null;
    }
    catch (_a) {
        return null;
    }
};
exports.getRefreshToken = getRefreshToken;
// Also sync to localStorage for backward compatibility
var setToken = function (token) {
    try {
        // Update Zustand store
        var currentState = auth_1.useAuthStore.getState();
        var currentTokens = currentState.tokens;
        if (currentTokens) {
            auth_1.useAuthStore.setState({
                tokens: __assign(__assign({}, currentTokens), { access: token })
            });
        }
        // Also store in localStorage for any legacy code
        if (typeof window !== 'undefined') {
            localStorage.setItem("token", token);
        }
    }
    catch (error) {
        console.error('Error setting token:', error);
    }
};
exports.setToken = setToken;
var removeToken = function () {
    try {
        // Clear from Zustand
        auth_1.useAuthStore.getState().logout();
        // Clear from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
        }
    }
    catch (error) {
        console.error('Error removing token:', error);
    }
};
exports.removeToken = removeToken;
// Error handling class
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, status, data) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.data = data;
        _this.name = 'ApiError';
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
// Main API fetch utility with auto-retry and token refresh
function apiFetch(endpoint_1) {
    return __awaiter(this, arguments, void 0, function (endpoint, options, retryCount) {
        var url, token, defaultHeaders, config, response, refreshToken, refreshResponse, access, refreshError_1, data, errorMessage, error_1;
        if (options === void 0) { options = {}; }
        if (retryCount === void 0) { retryCount = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(API_URL).concat(endpoint);
                    token = (0, exports.getToken)();
                    defaultHeaders = {
                        "Content-Type": "application/json",
                    };
                    if (token) {
                        defaultHeaders["Authorization"] = "Bearer ".concat(token);
                    }
                    config = __assign(__assign({}, options), { headers: __assign(__assign({}, defaultHeaders), options.headers) });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, fetch(url, config)];
                case 2:
                    response = _a.sent();
                    if (!(response.status === 401 && retryCount === 0)) return [3 /*break*/, 10];
                    refreshToken = (0, exports.getRefreshToken)();
                    if (!refreshToken) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 8]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/accounts/refresh/"), {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ refresh: refreshToken }),
                        })];
                case 4:
                    refreshResponse = _a.sent();
                    if (!refreshResponse.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, refreshResponse.json()];
                case 5:
                    access = (_a.sent()).access;
                    (0, exports.setToken)(access);
                    // Retry the original request with new token
                    return [2 /*return*/, apiFetch(endpoint, options, retryCount + 1)];
                case 6: return [3 /*break*/, 8];
                case 7:
                    refreshError_1 = _a.sent();
                    // Refresh failed, clear tokens
                    (0, exports.removeToken)();
                    throw new ApiError("Session expired. Please login again.", 401);
                case 8: return [3 /*break*/, 10];
                case 9:
                    // No refresh token available
                    (0, exports.removeToken)();
                    _a.label = 10;
                case 10:
                    // Handle no content responses
                    if (response.status === 204 || response.status === 205) {
                        return [2 /*return*/, {}];
                    }
                    return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 11:
                    data = _a.sent();
                    if (!response.ok) {
                        errorMessage = data.message || data.error || data.detail || "API request failed (".concat(response.status, ")");
                        throw new ApiError(errorMessage, response.status, data);
                    }
                    return [2 /*return*/, data];
                case 12:
                    error_1 = _a.sent();
                    if (error_1 instanceof ApiError) {
                        throw error_1;
                    }
                    if (error_1 instanceof Error) {
                        throw new ApiError(error_1.message);
                    }
                    throw new ApiError("Network error - please check your connection");
                case 13: return [2 /*return*/];
            }
        });
    });
}
// FormData upload utility for file uploads
function uploadFormData(endpoint, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, headers, response, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(API_URL).concat(endpoint);
                    token = (0, exports.getToken)();
                    headers = {};
                    if (token) {
                        headers["Authorization"] = "Bearer ".concat(token);
                    }
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: headers,
                            body: formData,
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 2:
                    error = _a.sent();
                    throw new ApiError(error.message || error.detail || "Upload failed (".concat(response.status, ")"), response.status, error);
                case 3: return [2 /*return*/, response.json()];
            }
        });
    });
}
// Authentication API functions
exports.authAPI = {
    register: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/accounts/register/", {
                    method: "POST",
                    body: JSON.stringify(data),
                })];
        });
    }); },
    verifyActivation: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/accounts/activate/", {
                    method: "POST",
                    body: JSON.stringify(data),
                })];
        });
    }); },
    resendActivation: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/accounts/resend-activation/", {
                    method: "POST",
                    body: JSON.stringify(data),
                })];
        });
    }); },
    login: function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/accounts/login/", {
                    method: "POST",
                    body: JSON.stringify({ email: email, password: password }),
                })];
        });
    }); },
    logout: function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apiFetch("/api/accounts/logout/", {
                        method: "POST",
                    })];
                case 1:
                    result = _a.sent();
                    (0, exports.removeToken)();
                    return [2 /*return*/, result];
            }
        });
    }); },
    getProfile: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/users/profile/")];
        });
    }); },
    refresh: function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/accounts/refresh/", {
                    method: "POST",
                    body: JSON.stringify({ refresh: refreshToken }),
                })];
        });
    }); }
};
// Notification API functions - FIXED WITH DEBUG LOGGING
exports.notificationAPI = {
    // Get all notifications
    getAll: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, apiFetch("/api/notifications/")];
                case 1:
                    data = _a.sent();
                    // Handle different response formats
                    if (Array.isArray(data)) {
                        return [2 /*return*/, data];
                    }
                    else if (data && Array.isArray(data.notifications)) {
                        return [2 /*return*/, data.notifications];
                    }
                    else if (data && Array.isArray(data.results)) {
                        return [2 /*return*/, data.results];
                    }
                    else {
                        console.warn('Unexpected notifications response format:', data);
                        return [2 /*return*/, []];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    // Don't throw on 401 - return empty array
                    if (error_2.status === 401) {
                        console.warn('Not authorized to fetch notifications');
                        return [2 /*return*/, []];
                    }
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Get unread notifications
    getUnread: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, apiFetch("/api/notifications/unread/")];
                case 1:
                    data = _a.sent();
                    if (Array.isArray(data)) {
                        return [2 /*return*/, data];
                    }
                    else if (data && Array.isArray(data.notifications)) {
                        return [2 /*return*/, data.notifications];
                    }
                    else if (data && Array.isArray(data.results)) {
                        return [2 /*return*/, data.results];
                    }
                    else {
                        return [2 /*return*/, []];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (error_3.status === 401) {
                        return [2 /*return*/, []];
                    }
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Get unread count for badge - FIXED WITH BETTER HANDLING
    getUnreadCount: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, count, count, values, count, count, count, parsed, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('ðŸ” [API DEBUG] Calling /api/notifications/unread-count/');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, apiFetch("/api/notifications/unread-count/")];
                case 2:
                    data = _a.sent();
                    console.log('âœ… [API DEBUG] Raw unread count response:', data);
                    console.log('ðŸ“‹ [API DEBUG] Response type:', typeof data);
                    // Handle ALL possible response formats
                    if (typeof data === 'object' && data !== null) {
                        // Django REST Framework format: { "unread_count": 1 }
                        if ('unread_count' in data) {
                            count = Number(data.unread_count) || 0;
                            console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Found unread_count: ".concat(count));
                            return [2 /*return*/, { unread_count: count }];
                        }
                        // Alternative format: { "count": 1 }
                        if ('count' in data) {
                            count = Number(data.count) || 0;
                            console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Found count: ".concat(count));
                            return [2 /*return*/, { unread_count: count }];
                        }
                        values = Object.values(data);
                        if (values.length === 1 && typeof values[0] === 'number') {
                            count = values[0];
                            console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Found numeric value in object: ".concat(count));
                            return [2 /*return*/, { unread_count: count }];
                        }
                        // Check for nested data
                        if (data.data && typeof data.data === 'object') {
                            if ('unread_count' in data.data) {
                                count = Number(data.data.unread_count) || 0;
                                console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Found nested unread_count: ".concat(count));
                                return [2 /*return*/, { unread_count: count }];
                            }
                            if ('count' in data.data) {
                                count = Number(data.data.count) || 0;
                                console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Found nested count: ".concat(count));
                                return [2 /*return*/, { unread_count: count }];
                            }
                        }
                        // Check for results array with count
                        if (data.results && typeof data.results === 'object') {
                            console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Results object found, checking for count...");
                        }
                    }
                    // Direct number response
                    else if (typeof data === 'number') {
                        console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Direct number response: ".concat(data));
                        return [2 /*return*/, { unread_count: data }];
                    }
                    // String response (parse if possible)
                    else if (typeof data === 'string') {
                        parsed = parseInt(data, 10);
                        if (!isNaN(parsed)) {
                            console.log("\u00F0\u0178\u201C\u0160 [API DEBUG] Parsed string to number: ".concat(parsed));
                            return [2 /*return*/, { unread_count: parsed }];
                        }
                    }
                    console.warn('âš ï¸ [API DEBUG] Unexpected unread count format:', data);
                    console.warn('âš ï¸ [API DEBUG] Full response:', JSON.stringify(data, null, 2));
                    return [2 /*return*/, { unread_count: 0 }];
                case 3:
                    error_4 = _a.sent();
                    console.error('âŒ [API DEBUG] Error fetching unread count:', error_4);
                    console.error('âŒ [API DEBUG] Error details:', {
                        message: error_4.message,
                        status: error_4.status,
                        data: error_4.data
                    });
                    if (error_4.status === 401) {
                        console.log('ðŸ”’ [API DEBUG] Not authorized (401)');
                        return [2 /*return*/, { unread_count: 0 }];
                    }
                    throw error_4;
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // Mark single notification as read
    markAsRead: function (notificationId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, apiFetch("/api/notifications/mark-read/".concat(notificationId, "/"), {
                            method: "POST",
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_5 = _a.sent();
                    if (error_5.status === 401) {
                        console.warn('Not authorized to mark notification as read');
                        return [2 /*return*/, null];
                    }
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Mark all notifications as read
    markAllAsRead: function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, apiFetch("/api/notifications/mark-all-read/", {
                            method: "POST",
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_6 = _a.sent();
                    if (error_6.status === 401) {
                        console.warn('Not authorized to mark all notifications as read');
                        return [2 /*return*/, null];
                    }
                    throw error_6;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Get notification preferences
    getPreferences: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/notifications/preferences/")];
        });
    }); },
    // Update notification preferences
    updatePreferences: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/notifications/preferences/", {
                    method: "PUT",
                    body: JSON.stringify(data),
                })];
        });
    }); },
    getAdminAlerts: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/notifications/admin/alerts/")];
        });
    }); },
    getAdminActionRequired: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/notifications/admin/action-required/")];
        });
    }); }
};
// Wallet/Account API functions
exports.walletAPI = {
    getBalance: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/wallets/balance/")];
        });
    }); },
    getTransactions: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/transactions/")];
        });
    }); }
};
// Payment API functions
exports.paymentAPI = {
    processPayment: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/payments/process/", {
                    method: "POST",
                    body: JSON.stringify(data),
                })];
        });
    }); },
    getPaymentHistory: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/payments/history/")];
        });
    }); }
};
// Transfer API functions
exports.transferAPI = {
    initiateTransfer: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/transfers/initiate/", {
                    method: "POST",
                    body: JSON.stringify(data),
                })];
        });
    }); },
    getTransfers: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/transfers/")];
        });
    }); },
    verifyTAC: function (transferId, tacCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/transfers/".concat(transferId, "/verify-tac/"), {
                    method: "POST",
                    body: JSON.stringify({ tac_code: tacCode }),
                })];
        });
    }); }
};
// KYC API functions
exports.kycAPI = {
    submitDocuments: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/kyc/submit/", {
                    method: "POST",
                    body: data,
                })];
        });
    }); },
    getStatus: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, apiFetch("/api/kyc/status/")];
        });
    }); }
};
// Export all APIs as a single object
exports.api = {
    auth: exports.authAPI,
    notifications: exports.notificationAPI,
    wallet: exports.walletAPI,
    payments: exports.paymentAPI,
    transfers: exports.transferAPI,
    kyc: exports.kycAPI,
    fetch: apiFetch,
};
