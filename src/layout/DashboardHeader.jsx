"use client";
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
exports.default = DashboardHeader;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var auth_1 = require("../lib/store/auth");
var react_router_dom_1 = require("react-router-dom");
var DashboardHeader_module_css_1 = require("./DashboardHeader.module.css");
var API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL;
function DashboardHeader(_a) {
    var _this = this;
    var _b, _c, _d, _e;
    var toggleSidebar = _a.toggleSidebar;
    var _f = (0, auth_1.useAuthStore)(), user = _f.user, tokens = _f.tokens, logout = _f.logout;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _g = (0, react_1.useState)(false), notificationOpen = _g[0], setNotificationOpen = _g[1];
    var _h = (0, react_1.useState)(false), userMenuOpen = _h[0], setUserMenuOpen = _h[1];
    var _j = (0, react_1.useState)([]), notifications = _j[0], setNotifications = _j[1];
    var _k = (0, react_1.useState)(0), unreadCount = _k[0], setUnreadCount = _k[1];
    var _l = (0, react_1.useState)(true), loading = _l[0], setLoading = _l[1];
    var _m = (0, react_1.useState)(""), searchQuery = _m[0], setSearchQuery = _m[1];
    var _o = (0, react_1.useState)(null), balance = _o[0], setBalance = _o[1];
    // Fetch wallet balance
    var fetchBalance = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/transactions/wallet/balance/"), {
                            headers: { 'Authorization': "Bearer ".concat(tokens === null || tokens === void 0 ? void 0 : tokens.access) }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setBalance(data.balance);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Failed to fetch balance:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var fetchNotifications = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, notificationsArray, transformed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access)) {
                        setNotifications([]);
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/notifications/"), {
                            headers: {
                                'Authorization': "Bearer ".concat(tokens.access),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    notificationsArray = [];
                    if (Array.isArray(data)) {
                        notificationsArray = data;
                    }
                    else if (data && typeof data === 'object') {
                        notificationsArray = data.results || data.notifications || [];
                    }
                    transformed = notificationsArray.map(function (notif) { return ({
                        id: notif.id,
                        title: notif.title,
                        message: notif.message,
                        type: mapNotificationType(notif.notification_type),
                        created_at: notif.created_at,
                        is_read: notif.status === 'READ'
                    }); });
                    setNotifications(transformed);
                    setUnreadCount(transformed.filter(function (n) { return !n.is_read; }).length);
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error("Failed to fetch notifications:", error_2);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var mapNotificationType = function (backendType) {
        var typeMap = {
            'PAYMENT_RECEIVED': 'success',
            'TRANSFER_COMPLETED': 'success',
            'KYC_APPROVED': 'success',
            'TRANSFER_FAILED': 'error',
            'KYC_REJECTED': 'error',
            'ADMIN_TAC_REQUIRED': 'warning',
            'ADMIN_KYC_REVIEW_REQUIRED': 'warning',
            'TAC_SENT': 'info',
            'KYC_SUBMITTED': 'info',
        };
        return typeMap[backendType] || 'info';
    };
    var markAsRead = function (notificationId) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access))
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/notifications/mark-read/").concat(notificationId, "/"), {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(tokens.access),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        setNotifications(function (prev) {
                            return prev.map(function (n) { return n.id === notificationId ? __assign(__assign({}, n), { is_read: true }) : n; });
                        });
                        setUnreadCount(function (prev) { return Math.max(0, prev - 1); });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Failed to mark notification as read:", error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var markAllAsRead = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access))
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/notifications/mark-all-read/"), {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(tokens.access),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        setNotifications(function (prev) { return prev.map(function (n) { return (__assign(__assign({}, n), { is_read: true })); }); });
                        setUnreadCount(0);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Failed to mark all as read:", error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchNotifications();
        fetchBalance();
    }, []);
    (0, react_1.useEffect)(function () {
        if (notificationOpen) {
            fetchNotifications();
        }
    }, [notificationOpen]);
    var formatBalance = function () {
        if (balance === null)
            return 'Loading...';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(balance);
    };
    var handleLogout = function () {
        logout();
        navigate('/signin');
    };
    var getNotificationIndicatorClass = function (type) {
        switch (type) {
            case 'success': return DashboardHeader_module_css_1.default.indicatorSuccess;
            case 'error': return DashboardHeader_module_css_1.default.indicatorError;
            case 'warning': return DashboardHeader_module_css_1.default.indicatorWarning;
            default: return DashboardHeader_module_css_1.default.indicatorInfo;
        }
    };
    var getNotificationItemClass = function (is_read) {
        return "".concat(DashboardHeader_module_css_1.default.notificationItem, " ").concat(!is_read ? DashboardHeader_module_css_1.default.notificationUnread : '');
    };
    return (<header className={DashboardHeader_module_css_1.default.header}>
      <div className={DashboardHeader_module_css_1.default.container}>
        <div className={DashboardHeader_module_css_1.default.inner}>
          
          {/* Left Section */}
          <div className={DashboardHeader_module_css_1.default.leftSection}>
            <button onClick={toggleSidebar} className={"".concat(DashboardHeader_module_css_1.default.menuButton, " ").concat(DashboardHeader_module_css_1.default.mobileOnly)} aria-label="Toggle sidebar">
              <div className={DashboardHeader_module_css_1.default.menuIcon}>
                <div className={DashboardHeader_module_css_1.default.menuLine}></div>
                <div className={DashboardHeader_module_css_1.default.menuLine}></div>
                <div className={DashboardHeader_module_css_1.default.menuLine}></div>
              </div>
            </button>
            
            {/* Real Balance Display */}
            <div className={"".concat(DashboardHeader_module_css_1.default.balanceContainer, " ").concat(DashboardHeader_module_css_1.default.desktopOnly)}>
              <lucide_react_1.Wallet className={DashboardHeader_module_css_1.default.balanceIcon}/>
              <span className={DashboardHeader_module_css_1.default.balanceLabel}>Balance:</span>
              <span className={DashboardHeader_module_css_1.default.balanceAmount}>
                {formatBalance()}
              </span>
            </div>
          </div>

          {/* Center - Search */}
          <div className={DashboardHeader_module_css_1.default.searchContainer}>
            <div className={DashboardHeader_module_css_1.default.searchWrapper}>
              <lucide_react_1.Search className={DashboardHeader_module_css_1.default.searchIcon}/>
              <input type="text" value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} placeholder="Search transactions, contacts..." className={DashboardHeader_module_css_1.default.searchInput}/>
            </div>
          </div>

          {/* Right Actions */}
          <div className={DashboardHeader_module_css_1.default.rightActions}>
            
            {/* Real Notifications */}
            <div className={DashboardHeader_module_css_1.default.notificationWrapper}>
              <button onClick={function () { return setNotificationOpen(!notificationOpen); }} className={DashboardHeader_module_css_1.default.actionButton} disabled={loading}>
                <lucide_react_1.Bell className={DashboardHeader_module_css_1.default.icon}/>
                {unreadCount > 0 && (<span className={DashboardHeader_module_css_1.default.notificationBadge}></span>)}
              </button>

              {notificationOpen && (<>
                  <div className={DashboardHeader_module_css_1.default.backdrop} onClick={function () { return setNotificationOpen(false); }}/>
                  <div className={DashboardHeader_module_css_1.default.dropdown}>
                    <div className={DashboardHeader_module_css_1.default.dropdownHeader}>
                      <div className={DashboardHeader_module_css_1.default.dropdownTitle}>
                        <h3 className={DashboardHeader_module_css_1.default.dropdownHeading}>Notifications</h3>
                        {unreadCount > 0 && (<button onClick={markAllAsRead} className={DashboardHeader_module_css_1.default.markAllButton}>
                            Mark all read
                          </button>)}
                      </div>
                    </div>
                    
                    <div className={DashboardHeader_module_css_1.default.dropdownContent}>
                      {loading ? (<div className={DashboardHeader_module_css_1.default.loadingState}>
                          <div className={DashboardHeader_module_css_1.default.spinner}></div>
                        </div>) : notifications.length === 0 ? (<div className={DashboardHeader_module_css_1.default.emptyState}>
                          <lucide_react_1.Bell className={DashboardHeader_module_css_1.default.emptyIcon}/>
                          <p className={DashboardHeader_module_css_1.default.emptyText}>No notifications</p>
                        </div>) : (notifications.slice(0, 5).map(function (notification) { return (<div key={notification.id} className={getNotificationItemClass(notification.is_read)} onClick={function () { return !notification.is_read && markAsRead(notification.id); }}>
                            <div className={DashboardHeader_module_css_1.default.notificationContent}>
                              <div className={"".concat(DashboardHeader_module_css_1.default.notificationIndicator, " ").concat(getNotificationIndicatorClass(notification.type))}/>
                              <div className={DashboardHeader_module_css_1.default.notificationDetails}>
                                <p className={DashboardHeader_module_css_1.default.notificationTitle}>
                                  {notification.title}
                                </p>
                                <p className={DashboardHeader_module_css_1.default.notificationMessage}>
                                  {notification.message}
                                </p>
                                {!notification.is_read && (<button onClick={function (e) {
                        e.stopPropagation();
                        markAsRead(notification.id);
                    }} className={DashboardHeader_module_css_1.default.markReadButton}>
                                    Mark read
                                  </button>)}
                              </div>
                            </div>
                          </div>); }))}
                    </div>
                    
                    {notifications.length > 5 && (<div className={DashboardHeader_module_css_1.default.dropdownFooter}>
                        <button onClick={function () { return navigate('/dashboard/notifications'); }} className={DashboardHeader_module_css_1.default.viewAllButton}>
                          View all notifications
                        </button>
                      </div>)}
                  </div>
                </>)}
            </div>

            {/* Real User Profile */}
            <div className={DashboardHeader_module_css_1.default.userWrapper}>
              <button onClick={function () { return setUserMenuOpen(!userMenuOpen); }} className={DashboardHeader_module_css_1.default.userButton}>
                <div className={DashboardHeader_module_css_1.default.avatar}>
                  <span className={DashboardHeader_module_css_1.default.avatarText}>
                    {((_b = user === null || user === void 0 ? void 0 : user.first_name) === null || _b === void 0 ? void 0 : _b[0]) || 'U'}{((_c = user === null || user === void 0 ? void 0 : user.last_name) === null || _c === void 0 ? void 0 : _c[0]) || 'S'}
                  </span>
                  <div className={DashboardHeader_module_css_1.default.onlineIndicator}></div>
                </div>
                <lucide_react_1.ChevronDown className={DashboardHeader_module_css_1.default.chevron}/>
              </button>

              {userMenuOpen && (<>
                  <div className={DashboardHeader_module_css_1.default.backdrop} onClick={function () { return setUserMenuOpen(false); }}/>
                  <div className={"".concat(DashboardHeader_module_css_1.default.dropdown, " ").concat(DashboardHeader_module_css_1.default.userDropdown)}>
                    
                    <div className={DashboardHeader_module_css_1.default.userHeader}>
                      <div className={DashboardHeader_module_css_1.default.userInfo}>
                        <div className={"".concat(DashboardHeader_module_css_1.default.avatar, " ").concat(DashboardHeader_module_css_1.default.largeAvatar)}>
                          <span className={DashboardHeader_module_css_1.default.avatarText}>
                            {((_d = user === null || user === void 0 ? void 0 : user.first_name) === null || _d === void 0 ? void 0 : _d[0]) || 'U'}{((_e = user === null || user === void 0 ? void 0 : user.last_name) === null || _e === void 0 ? void 0 : _e[0]) || 'S'}
                          </span>
                        </div>
                        <div className={DashboardHeader_module_css_1.default.userDetails}>
                          <h4 className={DashboardHeader_module_css_1.default.userName}>
                            {user === null || user === void 0 ? void 0 : user.first_name} {user === null || user === void 0 ? void 0 : user.last_name}
                          </h4>
                          <p className={DashboardHeader_module_css_1.default.userAccount}>
                            {(user === null || user === void 0 ? void 0 : user.account_number) || '•••• ••••'}
                          </p>
                          <p className={DashboardHeader_module_css_1.default.userEmail}>
                            {(user === null || user === void 0 ? void 0 : user.email) || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={DashboardHeader_module_css_1.default.userMenu}>
                      <button onClick={function () {
                navigate('/dashboard/profile');
                setUserMenuOpen(false);
            }} className={DashboardHeader_module_css_1.default.menuItem}>
                        <lucide_react_1.User className={DashboardHeader_module_css_1.default.menuIcon}/>
                        <span className={DashboardHeader_module_css_1.default.menuText}>My Profile</span>
                      </button>
                      <button onClick={function () {
                navigate('/dashboard/cards');
                setUserMenuOpen(false);
            }} className={DashboardHeader_module_css_1.default.menuItem}>
                        <lucide_react_1.CreditCard className={DashboardHeader_module_css_1.default.menuIcon}/>
                        <span className={DashboardHeader_module_css_1.default.menuText}>My Cards</span>
                      </button>
                    </div>
                    
                    <div className={DashboardHeader_module_css_1.default.logoutSection}>
                      <button onClick={handleLogout} className={DashboardHeader_module_css_1.default.logoutButton}>
                        <lucide_react_1.LogOut className={DashboardHeader_module_css_1.default.logoutIcon}/>
                        <span className={DashboardHeader_module_css_1.default.logoutText}>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>)}
            </div>
          </div>
        </div>
      </div>
    </header>);
}

