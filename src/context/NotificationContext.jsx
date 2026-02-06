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
exports.useNotifications = exports.NotificationProvider = exports.useNotificationContext = void 0;
// src/context/NotificationContext.tsx - CLEANED VERSION
var react_1 = require("react");
var auth_1 = require("../lib/store/auth");
var notificationService_1 = require("../lib/services/notificationService");
var NotificationContext = (0, react_1.createContext)(undefined);
var useNotificationContext = function () {
    var context = (0, react_1.useContext)(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext must be used within NotificationProvider');
    }
    return context;
};
exports.useNotificationContext = useNotificationContext;
var NotificationProvider = function (_a) {
    var children = _a.children, _b = _a.pollInterval, pollInterval = _b === void 0 ? 30000 : _b;
    var _c = (0, react_1.useState)([]), notifications = _c[0], setNotifications = _c[1];
    var _d = (0, react_1.useState)(0), unreadCount = _d[0], setUnreadCount = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    var _g = (0, auth_1.useAuthStore)(), isAuthenticated = _g.isAuthenticated, tokens = _g.tokens;
    var fetchNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, unread, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        setNotifications([]);
                        setUnreadCount(0);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, notificationService_1.NotificationService.getNotifications()];
                case 2:
                    data = _a.sent();
                    setNotifications(data);
                    unread = data.filter(function (n) { return !n.is_read; }).length;
                    setUnreadCount(unread);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Notification fetch error:', err_1);
                    }
                    setError(err_1.message || 'Failed to fetch notifications');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var refreshUnreadCount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var count, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated || !(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        setUnreadCount(0);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, notificationService_1.NotificationService.getUnreadCount()];
                case 2:
                    count = _a.sent();
                    setUnreadCount(count);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    // Silent fail for unread count refresh
                    if (process.env.NODE_ENV === 'development') {
                        console.warn('Unread count refresh failed:', err_2);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var markAsRead = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notificationService_1.NotificationService.markAsRead(id)];
                case 1:
                    _a.sent();
                    setNotifications(function (prev) {
                        return prev.map(function (notification) {
                            return notification.id === id
                                ? __assign(__assign({}, notification), { is_read: true }) : notification;
                        });
                    });
                    setUnreadCount(function (prev) { return Math.max(0, prev - 1); });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    setError(err_3.message || 'Failed to mark as read');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var markAllAsRead = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notificationService_1.NotificationService.markAllAsRead()];
                case 1:
                    _a.sent();
                    setNotifications(function (prev) {
                        return prev.map(function (notification) { return (__assign(__assign({}, notification), { is_read: true })); });
                    });
                    setUnreadCount(0);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    setError(err_4.message || 'Failed to mark all as read');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var clearError = function () { return setError(null); };
    // Single useEffect for polling - no double fetching
    (0, react_1.useEffect)(function () {
        if (!isAuthenticated) {
            setNotifications([]);
            setUnreadCount(0);
            return;
        }
        // Initial fetch
        fetchNotifications();
        // Set up polling with reduced frequency
        var interval = setInterval(function () {
            refreshUnreadCount();
        }, pollInterval);
        return function () { return clearInterval(interval); };
    }, [isAuthenticated, pollInterval]); // Only dependencies needed
    var value = {
        notifications: notifications,
        unreadCount: unreadCount,
        loading: loading,
        error: error,
        fetchNotifications: fetchNotifications,
        markAsRead: markAsRead,
        markAllAsRead: markAllAsRead,
        refreshUnreadCount: refreshUnreadCount,
        clearError: clearError,
    };
    return (<NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>);
};
exports.NotificationProvider = NotificationProvider;
// Hook for easy access
var useNotifications = function () {
    var context = (0, exports.useNotificationContext)();
    return {
        notifications: context.notifications,
        unreadCount: context.unreadCount,
        loading: context.loading,
        error: context.error,
        markNotificationAsRead: context.markAsRead,
        markAllNotificationsAsRead: context.markAllAsRead,
        refreshNotifications: context.fetchNotifications,
        clearNotificationError: context.clearError,
    };
};
exports.useNotifications = useNotifications;
