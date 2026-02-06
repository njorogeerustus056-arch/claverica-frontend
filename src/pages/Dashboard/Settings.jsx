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
exports.default = Settings;
// src/pages/Dashboard/Settings.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("../../lib/store/auth");
var lucide_react_1 = require("lucide-react");
function Settings() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, auth_1.useAuthStore)().user;
    var _a = (0, react_1.useState)("profile"), activeTab = _a[0], setActiveTab = _a[1];
    var _b = (0, react_1.useState)({
        theme: "light",
        language: "en",
        timezone: "UTC",
        email_notifications: true,
        sms_notifications: true,
        two_factor_auth: false
    }), settings = _b[0], setSettings = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), showCurrentPassword = _d[0], setShowCurrentPassword = _d[1];
    var _e = (0, react_1.useState)(false), showNewPassword = _e[0], setShowNewPassword = _e[1];
    // Fetch user settings from /api/users/settings/
    (0, react_1.useEffect)(function () {
        var fetchSettings = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // Simulate API call
                    setTimeout(function () {
                        setSettings({
                            theme: "light",
                            language: "en",
                            timezone: "Africa/Nairobi",
                            email_notifications: true,
                            sms_notifications: true,
                            two_factor_auth: false
                        });
                        setLoading(false);
                    }, 500);
                }
                catch (error) {
                    console.error("Failed to fetch settings:", error);
                    setLoading(false);
                }
                return [2 /*return*/];
            });
        }); };
        fetchSettings();
    }, []);
    var handleSaveSettings = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // Simulate POST /api/users/settings/update/
                console.log("Updating settings:", settings);
                alert("Settings updated successfully!");
            }
            catch (error) {
                console.error("Failed to update settings:", error);
                alert("Failed to update settings");
            }
            return [2 /*return*/];
        });
    }); };
    var handleChangePassword = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            // Simulate POST /api/users/password/change/
            console.log("Changing password...");
            alert("Password changed successfully!");
            return [2 /*return*/];
        });
    }); };
    var handleExportData = function () {
        console.log("Exporting user data...");
        alert("Data export started. You'll receive an email shortly.");
    };
    var handleDeactivateAccount = function () {
        if (window.confirm("Are you sure you want to deactivate your account? This action can be reversed within 30 days.")) {
            console.log("Deactivating account...");
            // Call deactivation endpoint
            alert("Account deactivation requested. Check your email for confirmation.");
        }
    };
    var tabs = [
        { id: "profile", label: "Profile", icon: lucide_react_1.User },
        { id: "security", label: "Security", icon: lucide_react_1.Lock },
        { id: "notifications", label: "Notifications", icon: lucide_react_1.Bell },
        { id: "preferences", label: "Preferences", icon: lucide_react_1.Globe },
        { id: "privacy", label: "Privacy", icon: lucide_react_1.Shield },
        { id: "account", label: "Account", icon: lucide_react_1.Settings }
    ];
    if (loading) {
        return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading settings...</div>
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-400">
            Manage your preferences, security, and privacy settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Tabs */}
          <div className="lg:w-64">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              {tabs.map(function (tab) {
            var Icon = tab.icon;
            return (<button key={tab.id} onClick={function () { return setActiveTab(tab.id); }} className={"w-full px-6 py-4 flex items-center gap-3 transition-all ".concat(activeTab === tab.id
                    ? "bg-blue-600/20 text-white border-l-4 border-blue-500"
                    : "text-gray-400 hover:text-white hover:bg-white/5")}>
                    <Icon className="w-5 h-5"/>
                    <span className="font-medium">{tab.label}</span>
                  </button>);
        })}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {activeTab === "profile" && (<div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <lucide_react_1.User className="w-6 h-6 text-blue-400"/>
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Account Number</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white font-mono">{(user === null || user === void 0 ? void 0 : user.account_number) || "CLV-678-010190-26-88"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white">
                          {user === null || user === void 0 ? void 0 : user.first_name} {user === null || user === void 0 ? void 0 : user.last_name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email Address</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white">{user === null || user === void 0 ? void 0 : user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Phone Number</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white">+254712345678</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button onClick={function () { return navigate('/dashboard/profile'); }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>)}

            {activeTab === "security" && (<div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <lucide_react_1.Lock className="w-6 h-6 text-green-400"/>
                    Password & Security
                  </h2>
                  
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Current Password</label>
                      <div className="relative">
                        <input type={showCurrentPassword ? "text" : "password"} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Enter current password" required/>
                        <button type="button" onClick={function () { return setShowCurrentPassword(!showCurrentPassword); }} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {showCurrentPassword ? (<lucide_react_1.EyeOff className="w-5 h-5 text-gray-400"/>) : (<lucide_react_1.Eye className="w-5 h-5 text-gray-400"/>)}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">New Password</label>
                      <div className="relative">
                        <input type={showNewPassword ? "text" : "password"} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Enter new password" required/>
                        <button type="button" onClick={function () { return setShowNewPassword(!showNewPassword); }} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {showNewPassword ? (<lucide_react_1.EyeOff className="w-5 h-5 text-gray-400"/>) : (<lucide_react_1.Eye className="w-5 h-5 text-gray-400"/>)}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4">
                      <button type="submit" className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all">
                        <lucide_react_1.Key className="w-4 h-4 inline mr-2"/>
                        Change Password
                      </button>
                      
                      <button type="button" onClick={function () { return navigate('/dashboard/kyc/submit'); }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all">
                        <lucide_react_1.Shield className="w-4 h-4 inline mr-2"/>
                        Enhance Security with KYC
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={"px-3 py-1 text-sm font-bold rounded-full ".concat(settings.two_factor_auth ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300')}>
                        {settings.two_factor_auth ? 'Enabled' : 'Disabled'}
                      </span>
                      <button onClick={function () { return setSettings(__assign(__assign({}, settings), { two_factor_auth: !settings.two_factor_auth })); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/10 hover:border-white/20">
                        {settings.two_factor_auth ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}

            {activeTab === "notifications" && (<div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <lucide_react_1.Bell className="w-6 h-6 text-yellow-400"/>
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-gray-400 text-sm">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.email_notifications} onChange={function (e) { return setSettings(__assign(__assign({}, settings), { email_notifications: e.target.checked })); }} className="sr-only peer"/>
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">SMS Notifications</p>
                        <p className="text-gray-400 text-sm">Receive important alerts via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.sms_notifications} onChange={function (e) { return setSettings(__assign(__assign({}, settings), { sms_notifications: e.target.checked })); }} className="sr-only peer"/>
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>)}

            {activeTab === "preferences" && (<div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <lucide_react_1.Globe className="w-6 h-6 text-purple-400"/>
                    App Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Theme</label>
                      <div className="flex gap-3">
                        {["light", "dark", "auto"].map(function (theme) { return (<button key={theme} onClick={function () { return setSettings(__assign(__assign({}, settings), { theme: theme })); }} className={"px-4 py-2 rounded-xl border transition-all ".concat(settings.theme === theme
                    ? "bg-blue-600/20 text-white border-blue-500"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20")}>
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </button>); })}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Language</label>
                      <select value={settings.language} onChange={function (e) { return setSettings(__assign(__assign({}, settings), { language: e.target.value })); }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                        <option value="en">English</option>
                        <option value="sw">Swahili</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Timezone</label>
                      <select value={settings.timezone} onChange={function (e) { return setSettings(__assign(__assign({}, settings), { timezone: e.target.value })); }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                        <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>)}

            {activeTab === "account" && (<div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <lucide_react_1.Settings className="w-6 h-6 text-red-400"/>
                    Account Management
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <lucide_react_1.Download className="w-5 h-5 text-blue-400"/>
                        <div>
                          <p className="text-white font-medium">Export Account Data</p>
                          <p className="text-gray-400 text-sm">Download all your data in JSON format</p>
                        </div>
                      </div>
                      <button onClick={handleExportData} className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/10 hover:border-white/20">
                        Export
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <lucide_react_1.Trash2 className="w-5 h-5 text-red-400"/>
                        <div>
                          <p className="text-white font-medium">Deactivate Account</p>
                          <p className="text-gray-400 text-sm">Temporarily disable your account</p>
                        </div>
                      </div>
                      <button onClick={handleDeactivateAccount} className="px-4 py-2 bg-red-600/20 hover:bg-red-700/30 backdrop-blur-xl text-red-300 rounded-xl font-medium transition-all border border-red-500/30 hover:border-red-500/50">
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}

            {/* Save Button */}
            <div className="mt-8">
              <button onClick={handleSaveSettings} className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
