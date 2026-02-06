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
exports.useNotifications = exports.NotificationService = void 0;
// src/lib/services/notificationService.ts - ORIGINAL VERSION (NO WEBSOCKET)
var api_1 = require("../../api");
var auth_1 = require("../store/auth");
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    // Map backend notification_type to frontend type
    NotificationService.mapNotificationType = function (backendType) {
        var typeMap = {
            'PAYMENT_RECEIVED': 'success',
            'TRANSFER_COMPLETED': 'success',
            'KYC_APPROVED': 'success',
            'TAC_SENT': 'info',
            'KYC_SUBMITTED': 'info',
            'TRANSFER_INITIATED': 'info',
            'TRANSFER_FAILED': 'error',
            'KYC_REJECTED': 'error',
            'ADMIN_TAC_REQUIRED': 'warning',
            'ADMIN_KYC_REVIEW_REQUIRED': 'warning',
            'ADMIN_SETTLEMENT_REQUIRED': 'warning',
        };
        return typeMap[backendType] || 'info';
    };
    // Transform backend notification to frontend format - FIXED WITH NULL CHECK
    NotificationService.transformNotification = function (notification) {
        // ✅ FIX: Check for null/undefined notification object
        if (!notification || typeof notification !== 'object') {
            console.warn('Received invalid notification object:', notification);
            return {
                id: Date.now(),
                title: 'Invalid Notification',
                message: 'This notification could not be loaded',
                type: 'info',
                created_at: new Date().toISOString(),
                is_read: true,
                metadata: {}
            };
        }
        // ✅ FIX: Provide default values for missing properties
        return {
            id: notification.id || Date.now(),
            title: notification.title || 'Notification',
            message: notification.message || 'New update',
            type: this.mapNotificationType(notification.notification_type || 'INFO'),
            created_at: notification.created_at || new Date().toISOString(),
            is_read: notification.status === 'READ',
            metadata: notification.metadata || {},
        };
    };
    // Get all notifications - FIXED WITH PROPER HANDLING
    NotificationService.getNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, data, notificationsArray, validNotifications, error_1;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            console.warn('No auth token available for notifications');
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, api_1.api.notifications.getAll()];
                    case 1:
                        data = _b.sent();
                        console.log('🔍 Notification API response:', data);
                        notificationsArray = [];
                        if (Array.isArray(data)) {
                            notificationsArray = data;
                        }
                        else if (data && typeof data === 'object') {
                            // Django REST Framework paginated response
                            notificationsArray = data.results || data.notifications || data.data || [];
                        }
                        console.log("\uD83D\uDCCA Processing ".concat(notificationsArray.length, " notifications"));
                        validNotifications = notificationsArray.filter(function (notification) { return notification && notification.id; });
                        console.log("\u2705 Found ".concat(validNotifications.length, " valid notifications"));
                        // ✅✅✅ CRITICAL FIX: Use arrow function to preserve 'this' context
                        return [2 /*return*/, validNotifications.map(function (notif) { return _this.transformNotification(notif); })];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Failed to fetch notifications:', error_1);
                        // Handle 401 specifically - don't throw, just return empty
                        if (((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                            console.warn('Not authorized to fetch notifications');
                            return [2 /*return*/, []];
                        }
                        // For other errors, return empty array instead of crashing
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get unread notifications only - FIXED VERSION
    NotificationService.getUnreadNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, data, notificationsArray, validNotifications, error_2;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            console.warn('No auth token available for unread notifications');
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, api_1.api.notifications.getUnread()];
                    case 1:
                        data = _b.sent();
                        notificationsArray = [];
                        if (Array.isArray(data)) {
                            notificationsArray = data;
                        }
                        else if (data && typeof data === 'object') {
                            notificationsArray = data.results || data.notifications || data.data || [];
                        }
                        validNotifications = notificationsArray.filter(function (notification) { return notification && notification.id; });
                        // ✅ FIX: Use arrow function to preserve 'this' context
                        return [2 /*return*/, validNotifications.map(function (notif) { return _this.transformNotification(notif); })];
                    case 2:
                        error_2 = _b.sent();
                        console.error('Failed to fetch unread notifications:', error_2);
                        if (((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get unread count for badge - WITH DEBUG LOGGING
    NotificationService.getUnreadCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, result, count, count, error_3;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        console.log('🔍 [DEBUG] getUnreadCount() called at:', new Date().toISOString());
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            console.log('⚠️ [DEBUG] No auth token available');
                            return [2 /*return*/, 0];
                        }
                        console.log('📞 [DEBUG] Calling API for unread count...');
                        console.log('🔑 [DEBUG] Token exists, calling endpoint...');
                        return [4 /*yield*/, api_1.api.notifications.getUnreadCount()];
                    case 2:
                        result = _f.sent();
                        console.log('✅ [DEBUG] API Response received:', result);
                        console.log('📋 [DEBUG] Response type:', typeof result);
                        // Handle different response formats
                        if (typeof result === 'object' && 'unread_count' in result) {
                            count = result.unread_count || 0;
                            console.log("\uD83D\uDCCA [DEBUG] Unread count (direct): ".concat(count));
                            return [2 /*return*/, count];
                        }
                        else if (typeof result === 'number') {
                            console.log("\uD83D\uDCCA [DEBUG] Unread count (number): ".concat(result));
                            return [2 /*return*/, result];
                        }
                        else if (result && typeof result === 'object') {
                            count = ((_a = result.data) === null || _a === void 0 ? void 0 : _a.unread_count) || ((_b = result.result) === null || _b === void 0 ? void 0 : _b.unread_count) || 0;
                            console.log("\uD83D\uDCCA [DEBUG] Unread count (nested): ".concat(count));
                            return [2 /*return*/, count];
                        }
                        else {
                            console.warn('⚠️ [DEBUG] Unexpected response format:', result);
                            console.warn('⚠️ [DEBUG] Full response:', JSON.stringify(result, null, 2));
                            return [2 /*return*/, 0];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _f.sent();
                        console.error('❌ [DEBUG] Failed to fetch unread count:', error_3);
                        console.error('❌ [DEBUG] Error details:', {
                            message: error_3.message,
                            status: (_c = error_3.response) === null || _c === void 0 ? void 0 : _c.status,
                            data: (_d = error_3.response) === null || _d === void 0 ? void 0 : _d.data
                        });
                        if (((_e = error_3.response) === null || _e === void 0 ? void 0 : _e.status) === 401) {
                            console.log('🔒 [DEBUG] Not authorized (401)');
                            return [2 /*return*/, 0];
                        }
                        console.error('❌ [DEBUG] Stack trace:', error_3.stack);
                        return [2 /*return*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Mark single notification as read
    NotificationService.markAsRead = function (notificationId) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            console.warn('No auth token available to mark notification as read');
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, api_1.api.notifications.markAsRead(notificationId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Failed to mark notification as read:', error_4);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Mark all notifications as read
    NotificationService.markAllAsRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            console.warn('No auth token available to mark all notifications as read');
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, api_1.api.notifications.markAllAsRead()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Failed to mark all notifications as read:', error_5);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get notification preferences
    NotificationService.getPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            throw new Error('Not authenticated');
                        }
                        return [4 /*yield*/, api_1.api.notifications.getPreferences()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_6 = _a.sent();
                        console.error('Failed to fetch preferences:', error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update notification preferences
    NotificationService.updatePreferences = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokens = auth_1.useAuthStore.getState().tokens;
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                            console.warn('No auth token available to update preferences');
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, api_1.api.notifications.updatePreferences(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_7 = _a.sent();
                        console.error('Failed to update preferences:', error_7);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get notification icon classes based on type
    NotificationService.getNotificationIconClasses = function (type) {
        switch (type) {
            case "success":
                return {
                    svgClass: "text-green-600 dark:text-green-400",
                    containerClass: "bg-green-100 dark:bg-green-900/30"
                };
            case "warning":
                return {
                    svgClass: "text-yellow-600 dark:text-yellow-400",
                    containerClass: "bg-yellow-100 dark:bg-yellow-900/30"
                };
            case "error":
                return {
                    svgClass: "text-red-600 dark:text-red-400",
                    containerClass: "bg-red-100 dark:bg-red-900/30"
                };
            default:
                return {
                    svgClass: "text-blue-600 dark:text-blue-400",
                    containerClass: "bg-blue-100 dark:bg-blue-900/30"
                };
        }
    };
    // Get SVG path data based on type
    NotificationService.getNotificationIconPath = function (type) {
        switch (type) {
            case "success":
                return "M5 13l4 4L19 7";
            case "warning":
                return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
            case "error":
                return "M6 18L18 6M6 6l12 12";
            default:
                return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
        }
    };
    // Format notification date
    NotificationService.formatDate = function (dateString) {
        var date = new Date(dateString);
        var now = new Date();
        var diffMs = now.getTime() - date.getTime();
        var diffMins = Math.floor(diffMs / 60000);
        var diffHours = Math.floor(diffMs / 3600000);
        var diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1)
            return 'Just now';
        if (diffMins < 60)
            return "".concat(diffMins, "m ago");
        if (diffHours < 24)
            return "".concat(diffHours, "h ago");
        if (diffDays < 7)
            return "".concat(diffDays, "d ago");
        return date.toLocaleDateString();
    };
    // Get priority label
    NotificationService.getPriorityLabel = function (priority) {
        switch (priority) {
            case 'HIGH': return 'High Priority';
            case 'MEDIUM': return 'Medium Priority';
            case 'LOW': return 'Low Priority';
            default: return 'Normal Priority';
        }
    };
    // Get priority color classes
    NotificationService.getPriorityClasses = function (priority) {
        switch (priority) {
            case 'HIGH':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'LOW':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
// Hook for using notification service in components
var useNotifications = function () {
    var tokens = (0, auth_1.useAuthStore)().tokens;
    var fetchNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, NotificationService.getNotifications()];
        });
    }); };
    var fetchUnreadCount = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                return [2 /*return*/, 0];
            }
            return [2 /*return*/, NotificationService.getUnreadCount()];
        });
    }); };
    return {
        fetchNotifications: fetchNotifications,
        fetchUnreadCount: fetchUnreadCount,
        markAsRead: NotificationService.markAsRead,
        markAllAsRead: NotificationService.markAllAsRead,
        getPreferences: NotificationService.getPreferences,
        updatePreferences: NotificationService.updatePreferences,
        formatDate: NotificationService.formatDate,
        getNotificationIconClasses: NotificationService.getNotificationIconClasses,
        getNotificationIconPath: NotificationService.getNotificationIconPath,
        getPriorityLabel: NotificationService.getPriorityLabel,
        getPriorityClasses: NotificationService.getPriorityClasses,
    };
};
exports.useNotifications = useNotifications;
