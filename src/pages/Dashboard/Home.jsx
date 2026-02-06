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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var auth_1 = require("../../lib/store/auth");
var useDashboardData_1 = require("../../hooks/useDashboardData");
var CurrencyConverter_1 = require("../../components/CurrencyConverter");
var FintechMetrics_1 = require("../../components/fintech/FintechMetrics");
var RecentOrders_1 = require("../../components/fintech/RecentOrders");
var CountryMap_1 = require("../../components/ecommerce/CountryMap"); // ADDED IMPORT
function MiniWalletModal(_a) {
    var _this = this;
    var _b;
    var user = _a.user, wallet = _a.wallet, transactions = _a.transactions, onClose = _a.onClose, navigate = _a.navigate;
    var modalRef = (0, react_1.useRef)(null);
    var _c = (0, react_1.useState)(false), copied = _c[0], setCopied = _c[1];
    var handleClickOutside = function (event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };
    var handleCopy = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(user === null || user === void 0 ? void 0 : user.account_number)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(user.account_number)];
                case 2:
                    _a.sent();
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Failed to copy:", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var recentTx = transactions.slice(0, 3);
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <lucide_react_1.Wallet className="w-6 h-6"/>
              </div>
              <div>
                <h3 className="font-bold text-lg">{(user === null || user === void 0 ? void 0 : user.first_name) || "User"}'s Wallet</h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="font-mono">{((_b = user === null || user === void 0 ? void 0 : user.account_number) === null || _b === void 0 ? void 0 : _b.slice(-6)) || "******"}</span>
                  <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors relative" title="Copy account number">
                    <lucide_react_1.Copy className="w-3 h-3"/>
                    {copied && (<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </span>)}
                  </button>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 transition-colors">
              ✕
            </button>
          </div>
        </div>

        {/* Balance Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Current Balance</p>
            <p className="text-4xl font-bold mb-2">
              {wallet.currency} {wallet.balance.toFixed(2)}
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div>
                <p className="text-gray-400">Available</p>
                <p className="font-medium">{wallet.currency} {wallet.available.toFixed(2)}</p>
              </div>
              {wallet.pending > 0 && (<div>
                  <p className="text-gray-400">Pending</p>
                  <p className="font-medium text-yellow-400">{wallet.currency} {wallet.pending.toFixed(2)}</p>
                </div>)}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 p-6 border-b border-gray-700">
          <button onClick={function () { onClose(); navigate("/dashboard/transfer"); }} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-95">
            <lucide_react_1.Send className="w-5 h-5 inline-block mr-2"/>
            Send
          </button>
          <button onClick={function () { onClose(); navigate("/dashboard/transfer"); }} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-95">
            <lucide_react_1.Download className="w-5 h-5 inline-block mr-2"/>
            Withdraw
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="p-6">
          <h4 className="font-bold mb-4 flex items-center justify-between">
            <span>Recent Activity</span>
            <span className="text-xs text-gray-400">Last 3</span>
          </h4>
          {recentTx.length > 0 ? (<div className="space-y-3">
              {recentTx.map(function (tx) { return (<div key={tx.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={"w-8 h-8 rounded-full flex items-center justify-center ".concat(tx.transaction_type === "credit"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400")}>
                      {tx.transaction_type === "credit" ?
                    <lucide_react_1.ArrowUpRight className="w-4 h-4"/> :
                    <lucide_react_1.ArrowDownRight className="w-4 h-4"/>}
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[120px]">{tx.description}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className={"font-bold ".concat(tx.transaction_type === "credit" ? "text-green-400" : "text-red-400")}>
                    {tx.transaction_type === "credit" ? "+" : "-"}
                    {wallet.currency} {tx.amount.toFixed(2)}
                  </div>
                </div>); })}
            </div>) : (<div className="text-center py-4 text-gray-400">
              <p>No transactions yet</p>
            </div>)}
          <button onClick={function () { onClose(); navigate("/dashboard/transfer/history"); }} className="w-full mt-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition-colors">
            View All Transactions
          </button>
        </div>
      </div>
    </div>);
}
function Home() {
    var _this = this;
    var _a, _b, _c;
    var _d = (0, auth_1.useAuthStore)(), tokens = _d.tokens, logout = _d.logout;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _e = (0, react_1.useState)(true), showBalance = _e[0], setShowBalance = _e[1];
    var _f = (0, react_1.useState)(false), showWalletModal = _f[0], setShowWalletModal = _f[1];
    var _g = (0, react_1.useState)(false), copied = _g[0], setCopied = _g[1];
    // Use custom hook for dashboard data
    var _h = (0, useDashboardData_1.useDashboardData)(), wallet = _h.wallet, transactions = _h.transactions, user = _h.user, loading = _h.loading, error = _h.error, refetch = _h.refetch;
    // Handle copy account number
    var handleCopyAccount = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2, textArea;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(user === null || user === void 0 ? void 0 : user.account_number)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(user.account_number)];
                case 2:
                    _a.sent();
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    textArea = document.createElement("textarea");
                    textArea.value = user.account_number;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Calculate stats
    var totalIncome = transactions
        .filter(function (tx) { return tx.transaction_type === "credit" && tx.status === "completed"; })
        .reduce(function (sum, tx) { return sum + tx.amount; }, 0);
    var totalExpenses = transactions
        .filter(function (tx) { return tx.transaction_type === "debit" && tx.status === "completed"; })
        .reduce(function (sum, tx) { return sum + tx.amount; }, 0);
    var pendingTransactions = transactions.filter(function (tx) { return tx.status === "pending"; });
    // Smart Quick Actions - All using your existing routes
    var quickActions = [
        {
            icon: lucide_react_1.Send,
            label: "Send",
            color: "from-blue-500 to-blue-600",
            action: function () { return navigate("/dashboard/transfer"); },
            desc: "Transfer money",
            badge: null
        },
        {
            icon: lucide_react_1.Download,
            label: "Withdraw",
            color: "from-purple-500 to-purple-600",
            action: function () { return navigate("/dashboard/transfer"); },
            desc: "To bank account",
            badge: null
        },
        {
            icon: lucide_react_1.Bitcoin,
            label: "Crypto",
            color: "from-amber-500 to-orange-600",
            action: function () { return navigate("/dashboard/crypto"); },
            desc: "Buy/Sell crypto",
            badge: "New"
        },
        {
            icon: lucide_react_1.Wallet,
            label: "Wallet",
            color: "from-emerald-500 to-green-600",
            action: function () { return setShowWalletModal(true); },
            desc: "Quick overview",
            badge: null
        },
        {
            icon: lucide_react_1.CreditCard,
            label: "Cards",
            color: "from-violet-500 to-purple-600",
            action: function () { return navigate("/dashboard/cards"); },
            desc: "0 active", // Cards not in hook currently
            count: 0
        },
        {
            icon: lucide_react_1.History,
            label: "History",
            color: "from-gray-500 to-gray-600",
            action: function () { return navigate("/dashboard/transfer/history"); },
            desc: "Transactions",
            badge: transactions.length > 0 ? transactions.length.toString() : null
        },
        {
            icon: lucide_react_1.Headphones,
            label: "Support",
            color: "from-indigo-500 to-blue-600",
            action: function () { return navigate("/dashboard/support"); },
            desc: "24/7 help",
            badge: null
        },
        {
            icon: lucide_react_1.BarChart3,
            label: "Savings",
            color: "from-green-500 to-emerald-600",
            action: function () { return navigate("/dashboard/savings"); },
            desc: "Grow money",
            badge: null
        },
    ];
    // Format date for display
    var formatDate = function (dateString) {
        try {
            var date = new Date(dateString);
            var now = new Date();
            var diffMs = now.getTime() - date.getTime();
            var diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            if (diffHours < 24) {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            else if (diffHours < 48) {
                return "Yesterday";
            }
            else {
                return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            }
        }
        catch (_a) {
            return "Recently";
        }
    };
    // Loading state with skeleton
    if (loading) {
        return (<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Skeleton Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-500/30 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-blue-500/20 rounded w-1/4 mb-6"></div>
              <div className="h-20 bg-white/10 rounded-2xl"></div>
            </div>
          </div>
          
          {/* Skeleton Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {__spreadArray([], Array(8), true).map(function (_, i) { return (<div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-xl mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-2"></div>
              </div>); })}
          </div>
          
          {/* Skeleton Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              {__spreadArray([], Array(3), true).map(function (_, i) { return (<div key={i} className="h-16 bg-gray-100 rounded-xl mb-4"></div>); })}
            </div>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    // Error state
    if (error) {
        return (<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.Shield className="w-8 h-8 text-red-500"/>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Issue</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button onClick={refetch} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-all shadow-lg">
              <lucide_react_1.RefreshCw className="w-4 h-4 inline-block mr-2"/>
              Try Again
            </button>
            <button onClick={function () { return navigate("/signin"); }} className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-200 transition-colors">
              Back to Login
            </button>
          </div>
        </div>
      </div>);
    }
    return (<>
      {/* Mini Wallet Modal */}
      {showWalletModal && (<MiniWalletModal user={user} wallet={wallet} transactions={transactions} onClose={function () { return setShowWalletModal(false); }} navigate={navigate}/>)}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
        {/* Header with balance - Monzo/Revolut style */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {(user === null || user === void 0 ? void 0 : user.first_name) ? "Good morning, ".concat(user.first_name) : "Welcome back"}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 hover:bg-white/15 transition-colors cursor-pointer relative group">
                    <span className="text-sm font-mono">{(user === null || user === void 0 ? void 0 : user.account_number) || "CLV-***"}</span>
                    <button onClick={handleCopyAccount} className="text-blue-200 hover:text-white transition-colors" title="Copy account number">
                      <lucide_react_1.Copy className="w-3 h-3"/>
                    </button>
                    {copied && (<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-in fade-in slide-in-from-top-1">
                        Copied to clipboard!
                      </span>)}
                  </div>
                  {(user === null || user === void 0 ? void 0 : user.is_verified) ? (<div className="bg-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
                      <lucide_react_1.CheckCircle className="w-3 h-3"/>
                      <span className="text-xs font-medium">Verified</span>
                    </div>) : (<div className="bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-500/30">
                      <lucide_react_1.Clock className="w-3 h-3"/>
                      <span className="text-xs font-medium">Pending Verification</span>
                    </div>)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={refetch} disabled={loading} className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95" title="Refresh">
                  <lucide_react_1.RefreshCw className={"w-5 h-5 ".concat(loading ? 'animate-spin' : '')}/>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95 relative" title="Notifications" onClick={function () { return navigate("/dashboard/notifications"); }}>
                  <lucide_react_1.Bell className="w-5 h-5"/>
                  {pendingTransactions.length > 0 && (<span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>)}
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95" title="Settings" onClick={function () { return navigate("/dashboard/settings"); }}>
                  <lucide_react_1.MoreVertical className="w-5 h-5"/>
                </button>
              </div>
            </div>

            {/* Balance Card - Wise/Revolut inspired */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-100 font-medium">Total Balance</span>
                <button onClick={function () { return setShowBalance(!showBalance); }} className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 active:scale-95">
                  {showBalance ? <lucide_react_1.EyeOff className="w-5 h-5"/> : <lucide_react_1.Eye className="w-5 h-5"/>}
                  <span className="text-sm">{showBalance ? "Hide" : "Show"}</span>
                </button>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold tracking-tight">
                  {showBalance
            ? "".concat((wallet === null || wallet === void 0 ? void 0 : wallet.currency) || "USD", " ").concat(((_a = wallet === null || wallet === void 0 ? void 0 : wallet.balance) === null || _a === void 0 ? void 0 : _a.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })) || "0.00")
            : "••••••"}
                </span>
                <span className="text-lg text-blue-200">{(wallet === null || wallet === void 0 ? void 0 : wallet.currency) || "USD"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="opacity-80">Available:</span>{" "}
                  <span className="font-medium">{(wallet === null || wallet === void 0 ? void 0 : wallet.currency) || "USD"} {((_b = wallet === null || wallet === void 0 ? void 0 : wallet.available) === null || _b === void 0 ? void 0 : _b.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })) || "0.00"}</span>
                </div>
                {(wallet === null || wallet === void 0 ? void 0 : wallet.pending) && wallet.pending > 0 && (<div className="flex items-center gap-2">
                    <lucide_react_1.Clock className="w-3 h-3"/>
                    <span>Pending: {wallet.currency} {wallet.pending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 -mt-6">
          {/* Quick Actions Grid - Monzo style */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>Quick Actions</span>
              <lucide_react_1.ChevronRight className="w-4 h-4 text-gray-400"/>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {quickActions.map(function (action, idx) { return (<button key={idx} onClick={action.action} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95 text-center group relative">
                  <div className={"bg-gradient-to-r ".concat(action.color, " w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform")}>
                    <action.icon className="w-6 h-6 text-white"/>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{action.desc}</p>
                  {action.count !== undefined && action.count > 0 && (<span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
                      {action.count}
                    </span>)}
                  {action.badge && (<span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {action.badge}
                    </span>)}
                </button>); })}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Recent Activities */}
            <div className="lg:col-span-2 space-y-6">
              {/* ADDED: Global Reach Map - NEW SECTION BEFORE RECENT ACTIVITIES */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Global Community</h2>
                    <p className="text-sm text-gray-600">Our growing international presence</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <lucide_react_1.TrendingUp className="w-4 h-4 text-green-500"/>
                    <span className="text-green-600 font-medium">+42% YoY growth</span>
                  </div>
                </div>
                
                <div className="h-80 relative">
                  <CountryMap_1.default mapColor="#E5E7EB"/>
                </div>
                
                {/* Stats summary */}
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">25+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5k+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">$2.5M+</div>
                    <div className="text-sm text-gray-600">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions - Now below the map */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <p className="text-sm text-gray-600">Your latest transactions</p>
                  </div>
                  <button onClick={function () { return navigate("/dashboard/transfer/history"); }} className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors active:scale-95">
                    <lucide_react_1.History className="w-4 h-4"/> View all
                  </button>
                </div>
                
                {transactions.length > 0 ? (<div className="space-y-3">
                    {transactions.slice(0, 5).map(function (transaction) { return (<div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 active:scale-[0.98] cursor-pointer" onClick={function () { return navigate("/dashboard/transfer/history"); }}>
                        <div className="flex items-center gap-3">
                          <div className={"w-10 h-10 rounded-xl flex items-center justify-center ".concat(transaction.transaction_type === "credit"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600")}>
                            {transaction.transaction_type === "credit" ? (<lucide_react_1.ArrowUpRight className="w-5 h-5"/>) : (<lucide_react_1.ArrowDownRight className="w-5 h-5"/>)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-gray-500">{formatDate(transaction.created_at)}</span>
                              <span className={"text-xs px-2 py-1 rounded-full ".concat(transaction.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800")}>
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={"font-bold text-lg ".concat(transaction.transaction_type === "credit"
                    ? "text-green-600"
                    : "text-red-600")}>
                          {transaction.transaction_type === "credit" ? "+" : "-"}
                          {(wallet === null || wallet === void 0 ? void 0 : wallet.currency) || "USD"} {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>); })}
                  </div>) : (<div className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <lucide_react_1.Wallet className="w-8 h-8 text-gray-400"/>
                    </div>
                    <p className="text-gray-600 mb-2">No transactions yet</p>
                    <button onClick={function () { return navigate("/dashboard/transfer"); }} className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 active:scale-95">
                      Make your first transfer <lucide_react_1.ExternalLink className="w-4 h-4"/>
                    </button>
                  </div>)}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Currency Converter */}
              <CurrencyConverter_1.default baseAmount={wallet.balance} baseCurrency={wallet.currency}/>

              {/* Stats Card - Wise style */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold mb-4">Financial Snapshot</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <lucide_react_1.ArrowUpRight className="w-4 h-4 text-green-400"/>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Income</p>
                        <p className="text-lg font-bold">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <lucide_react_1.ArrowDownRight className="w-4 h-4 text-red-400"/>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">Expenses</p>
                        <p className="text-lg font-bold">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Net Flow</span>
                      <div className={"flex items-center gap-1 ".concat(totalIncome > totalExpenses ? 'text-green-400' : 'text-red-400')}>
                        {totalIncome > totalExpenses ? (<>
                            <lucide_react_1.TrendingUp className="w-4 h-4"/>
                            <span className="font-bold">+${(totalIncome - totalExpenses).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </>) : (<>
                            <lucide_react_1.TrendingDown className="w-4 h-4"/>
                            <span className="font-bold">-${(totalExpenses - totalIncome).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status - Revolut style */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                    <lucide_react_1.Shield className="w-5 h-5 text-blue-600"/>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Account Status</h3>
                    <p className="text-sm text-gray-600">
                      {(user === null || user === void 0 ? void 0 : user.is_verified) ? "Fully verified" : "Verification pending"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Account</span>
                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {((_c = user === null || user === void 0 ? void 0 : user.account_number) === null || _c === void 0 ? void 0 : _c.slice(-4)) || "****"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <span className="text-sm text-gray-900 truncate max-w-[120px]">{(user === null || user === void 0 ? void 0 : user.email) || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Cards</span>
                    <span className="text-sm font-bold text-gray-900">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Insights */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Insights</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <FintechMetrics_1.FintechMetrics totalIncome={totalIncome} totalExpenses={totalExpenses} walletBalance={wallet.balance} transactions={transactions} walletCurrency={wallet.currency}/>
              <RecentOrders_1.RecentOrders transactions={transactions.slice(0, 5)} walletCurrency={wallet.currency}/>
            </div>
          </div>

          {/* Support CTA - Monzo style */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <lucide_react_1.Headphones className="w-6 h-6"/>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Need assistance?</h3>
                  <p className="text-blue-100">Our support team is here to help 24/7</p>
                </div>
              </div>
              <button onClick={function () { return navigate("/dashboard/support"); }} className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-md whitespace-nowrap">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>);
}
