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
exports.default = Crypto;
// src/pages/dashboard/Crypto.tsx - MODERN BANKING EDITION with KYC Integration
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("@/lib/store/auth");
var useKYC_1 = require("@/hooks/useKYC");
var kycCreatives_1 = require("@/lib/utils/kycCreatives");
var KYCProgressBar_1 = require("@/components/crypto/KYCProgressBar");
var lucide_react_1 = require("lucide-react");
// Import components
var PriceTicker_1 = require("@/components/crypto/PriceTicker");
var TransactionHistory_1 = require("@/components/crypto/TransactionHistory");
var QuickActions_1 = require("@/components/crypto/QuickActions");
var AssetAllocationChart_1 = require("@/components/crypto/AssetAllocationChart");
var CryptoWalletCard_1 = require("@/components/crypto/CryptoWalletCard");
var FiatAccountCard_1 = require("@/components/crypto/FiatAccountCard");
// Import data
var cryptoCoins_1 = require("@/data/cryptoCoins");
var fiatPlatforms_1 = require("@/data/fiatPlatforms");
function Crypto() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, auth_1.useAuthStore)(), user = _a.user, isAuthenticated = _a.isAuthenticated;
    var _b = (0, useKYC_1.useKYC)(), kycStatus = _b.kycStatus, checkRequirement = _b.checkRequirement, isVerified = _b.isVerified, refreshStatus = _b.refreshStatus;
    var _c = (0, react_1.useState)(true), showBalances = _c[0], setShowBalances = _c[1];
    var _d = (0, react_1.useState)("overview"), selectedTab = _d[0], setSelectedTab = _d[1];
    var _e = (0, react_1.useState)([]), coins = _e[0], setCoins = _e[1];
    var _f = (0, react_1.useState)([]), portfolioData = _f[0], setPortfolioData = _f[1];
    var _g = (0, react_1.useState)(0), totalPortfolioValue = _g[0], setTotalPortfolioValue = _g[1];
    var _h = (0, react_1.useState)(0), portfolioChange = _h[0], setPortfolioChange = _h[1];
    var kycThreshold = (0, react_1.useState)(1500)[0];
    var _j = (0, react_1.useState)(null), copiedAddress = _j[0], setCopiedAddress = _j[1];
    var _k = (0, react_1.useState)(""), searchQuery = _k[0], setSearchQuery = _k[1];
    var _l = (0, react_1.useState)(false), showKYCModal = _l[0], setShowKYCModal = _l[1];
    var _m = (0, react_1.useState)(null), pendingAction = _m[0], setPendingAction = _m[1];
    // Generate wallet addresses
    var generateWalletAddress = function (symbol) {
        var prefixes = {
            BTC: "bc1q",
            ETH: "0x",
            USDT: "0x",
            USDC: "0x",
            BNB: "bnb1",
            SOL: "So1",
            ADA: "addr1",
            DOGE: "D",
            MATIC: "0x",
            SHIB: "0x"
        };
        var prefix = prefixes[symbol] || "0x";
        var random = Math.random().toString(36).substring(2, 10);
        return "".concat(prefix).concat(random, "...").concat(Math.random().toString(36).substring(2, 6));
    };
    // Initialize data
    (0, react_1.useEffect)(function () {
        var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
            var updatedCoins, total, chartData;
            return __generator(this, function (_a) {
                updatedCoins = cryptoCoins_1.cryptoCoins.map(function (coin) { return (__assign(__assign({}, coin), { valueUSD: coin.price * coin.balance, walletAddress: generateWalletAddress(coin.symbol), network: coin.symbol === "BTC" ? "Bitcoin" :
                        coin.symbol === "ETH" ? "Ethereum ERC20" :
                            coin.symbol === "SOL" ? "Solana" :
                                coin.symbol === "ADA" ? "Cardano" : "ERC20" })); });
                setCoins(updatedCoins);
                total = updatedCoins.reduce(function (sum, coin) { return sum + coin.valueUSD; }, 0) +
                    fiatPlatforms_1.fiatPlatforms.reduce(function (sum, p) { return sum + p.balance; }, 0);
                setTotalPortfolioValue(total);
                setPortfolioChange(2.34);
                chartData = Array.from({ length: 24 }, function (_, i) { return ({
                    time: "".concat(i, ":00"),
                    value: total * (0.95 + Math.random() * 0.1),
                    volume: Math.random() * 1000000
                }); });
                setPortfolioData(chartData);
                return [2 /*return*/];
            });
        }); };
        loadData();
    }, []);
    // Live price updates
    (0, react_1.useEffect)(function () {
        var interval = setInterval(function () {
            setCoins(function (prevCoins) {
                return prevCoins.map(function (coin) {
                    var change = (Math.random() - 0.5) * 0.002;
                    var newPrice = coin.price * (1 + change);
                    return __assign(__assign({}, coin), { price: newPrice, change24h: coin.change24h + change, valueUSD: newPrice * coin.balance });
                });
            });
        }, 5000);
        return function () { return clearInterval(interval); };
    }, []);
    // ========== ENHANCED SMART KYC HANDLER ==========
    var handleKYCRequiredAction = (0, react_1.useCallback)(function (action, amount, asset, creativeHook) { return __awaiter(_this, void 0, void 0, function () {
        var requirement, creativeContext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isAuthenticated) {
                        navigate('/auth/signin', {
                            state: {
                                redirectTo: '/dashboard/crypto',
                                message: "Sign in to ".concat(action.replace('_', ' '), " ").concat(asset || '')
                            }
                        });
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, checkRequirement('crypto', amount)];
                case 1:
                    requirement = _a.sent();
                    if (!isVerified && (requirement === null || requirement === void 0 ? void 0 : requirement.kyc_required)) {
                        creativeContext = {
                            action: action,
                            amount: amount,
                            asset: asset,
                            icon: kycCreatives_1.KYC_CREATIVES.getIconForAction(action),
                            benefits: kycCreatives_1.KYC_CREATIVES.getActionBenefits(action, amount, asset),
                            unlockableFeature: kycCreatives_1.KYC_CREATIVES.getUnlockableFeature(action),
                            estimatedReward: kycCreatives_1.KYC_CREATIVES.getEstimatedReward(amount, action),
                            kycThreshold: (requirement === null || requirement === void 0 ? void 0 : requirement.threshold) || kycThreshold,
                            creativeHook: creativeHook || "Unlock ".concat(action.replace('_', ' '), " capabilities"),
                            ctaText: kycCreatives_1.KYC_CREATIVES.getCreativeCTAText(action, asset),
                            tier: kycCreatives_1.KYC_CREATIVES.getVerificationTier(amount),
                            timeToVerify: kycCreatives_1.KYC_CREATIVES.getTimeToVerify()
                        };
                        // Store for KYC page
                        localStorage.setItem('kycCreativeContext', JSON.stringify(creativeContext));
                        // Show enhanced modal or redirect directly
                        if (amount > kycThreshold * 2) {
                            // Large amount - show detailed modal
                            setPendingAction({
                                action: action,
                                amount: amount,
                                asset: asset,
                                creativeContext: creativeContext
                            });
                            setShowKYCModal(true);
                            return [2 /*return*/, false];
                        }
                        else {
                            // Redirect to KYC page with context
                            navigate('/kyc/submit/', {
                                state: {
                                    amount: amount,
                                    service_type: 'crypto',
                                    action: action,
                                    asset: asset,
                                    redirectTo: '/dashboard/crypto',
                                    creativeContext: creativeContext,
                                    attemptedAction: action,
                                    unlockBenefits: creativeContext.benefits.slice(0, 3)
                                }
                            });
                            return [2 /*return*/, false];
                        }
                    }
                    return [2 /*return*/, true];
            }
        });
    }); }, [isAuthenticated, isVerified, checkRequirement, navigate, kycThreshold]);
    // ========== ACTION HANDLERS ==========
    var handleCreateWallet = function () { return __awaiter(_this, void 0, void 0, function () {
        var amount, action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = 0;
                    action = 'create_wallet';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount)];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/create-wallet');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDeposit = function () { return __awaiter(_this, void 0, void 0, function () {
        var amount, action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = 1000;
                    action = 'deposit';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount)];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/deposit');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleWithdraw = function () { return __awaiter(_this, void 0, void 0, function () {
        var amount, action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = 500;
                    action = 'withdraw';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount)];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/withdraw');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleTransfer = function () { return __awaiter(_this, void 0, void 0, function () {
        var amount, action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = 2000;
                    action = 'transfer';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount)];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/transfer');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleBuyCrypto = function (coin, amount) { return __awaiter(_this, void 0, void 0, function () {
        var action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = 'buy';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount, coin.symbol, "Buy ".concat(coin.symbol, " instantly"))];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/buy', { state: { coin: coin, amount: amount } });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSendCrypto = function (coin, amount) { return __awaiter(_this, void 0, void 0, function () {
        var action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = 'send';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount, coin.symbol, "Send ".concat(coin.symbol, " worldwide"))];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/send', { state: { coin: coin, amount: amount } });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleAddFunds = function (platform, amount) { return __awaiter(_this, void 0, void 0, function () {
        var action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = 'deposit';
                    return [4 /*yield*/, handleKYCRequiredAction(action, amount, platform.name, "Add funds to ".concat(platform.name))];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/fiat/deposit', { state: { platform: platform, amount: amount } });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleViewWallet = function (coin) { return __awaiter(_this, void 0, void 0, function () {
        var action, allowed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = 'view_wallet';
                    return [4 /*yield*/, handleKYCRequiredAction(action, coin.valueUSD, coin.symbol, "View ".concat(coin.symbol, " wallet details"))];
                case 1:
                    allowed = _a.sent();
                    if (allowed) {
                        navigate('/dashboard/crypto/wallet', { state: { coin: coin } });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCopyAddress = function (address) {
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(function () { return setCopiedAddress(null); }, 2000);
    };
    var handleVerifyNow = function () {
        navigate('/kyc/submit/', {
            state: {
                amount: totalPortfolioValue,
                service_type: 'crypto',
                redirectTo: '/dashboard/crypto',
                creativeContext: {
                    action: 'verify_portfolio',
                    amount: totalPortfolioValue,
                    icon: '🔓',
                    benefits: [
                        "Unlock $".concat((kycThreshold * 3).toLocaleString(), " daily limits"),
                        'Access premium trading features',
                        'Priority customer support',
                        'Advanced security options'
                    ],
                    tier: kycCreatives_1.KYC_CREATIVES.getVerificationTier(totalPortfolioValue)
                }
            }
        });
    };
    // Filtered data
    var filteredCoins = coins.filter(function (coin) {
        return coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    });
    // Statistics
    var cryptoValue = coins.reduce(function (sum, coin) { return sum + coin.valueUSD; }, 0);
    var fiatValue = fiatPlatforms_1.fiatPlatforms.reduce(function (sum, p) { return sum + p.balance; }, 0);
    var gainers = coins.filter(function (c) { return c.change24h > 0; }).length;
    var losers = coins.filter(function (c) { return c.change24h < 0; }).length;
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Remove header as requested */}
      
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
        {/* Portfolio Header - Revolut style */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-40"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                  <lucide_react_1.Wallet className="w-7 h-7 text-white"/>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Portfolio Value</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                    {showBalances
            ? "$".concat(totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
            : '••••••'}
                  </h2>
                  <div className={"flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ".concat(portfolioChange >= 0
            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
            : 'bg-red-500/15 text-red-700 dark:text-red-400')}>
                    {portfolioChange >= 0 ? (<lucide_react_1.TrendingUp className="w-4 h-4"/>) : (<lucide_react_1.TrendingDown className="w-4 h-4"/>)}
                    {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions - Wise style */}
          <div className="flex flex-wrap gap-2">
            <button onClick={handleDeposit} className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group">
              <lucide_react_1.Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"/>
              Add Money
            </button>
            <button onClick={handleWithdraw} className="px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 group">
              <lucide_react_1.Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"/>
              Withdraw
            </button>
            <button onClick={handleCreateWallet} className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group">
              <lucide_react_1.Key className="w-4 h-4 group-hover:rotate-12 transition-transform"/>
              New Wallet
            </button>
          </div>
        </div>

        {/* Quick Stats Bar (Moved from header) */}
        <div className="flex items-center gap-6 p-4 bg-white/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {gainers} gaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {losers} losing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <lucide_react_1.Globe className="w-4 h-4 text-slate-400"/>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              24h volume: ${(cryptoValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <lucide_react_1.Users className="w-4 h-4 text-slate-400"/>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              1.2M active traders
            </span>
          </div>
          {/* KYC Status */}
          <div className="flex items-center gap-2 ml-auto">
            <div className={"w-2 h-2 rounded-full ".concat(isVerified ? 'bg-emerald-500' : 'bg-amber-500', " animate-pulse")}></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>

        {/* Live Price Ticker */}
        <PriceTicker_1.PriceTicker coins={coins}/>

        {/* KYC Progress Bar */}
        {!isVerified && (<KYCProgressBar_1.KYCProgressBar portfolioValue={totalPortfolioValue} kycThreshold={kycThreshold} onVerifyClick={handleVerifyNow}/>)}

        {/* Smart KYC Banner - Only show when needed */}
        {isAuthenticated && !isVerified && totalPortfolioValue > kycThreshold * 0.7 && (<div className="relative overflow-hidden rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"></div>
            <div className="relative p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <lucide_react_1.Shield className="w-6 h-6 text-white"/>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300">Unlock Full Potential</h3>
                  <span className="px-2.5 py-1 bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-300 text-xs font-bold rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-purple-800/80 dark:text-purple-400/80 mb-3 max-w-2xl">
                  You're ${Math.max(0, kycThreshold - totalPortfolioValue).toLocaleString()} away from KYC requirements. 
                  Verify now to access unlimited trading, higher withdrawal limits, and advanced security features.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleVerifyNow} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                    <lucide_react_1.Lock className="w-4 h-4"/>
                    Complete KYC
                  </button>
                  <button onClick={function () { return setShowKYCModal(true); }} className="px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 text-purple-700 dark:text-purple-400 rounded-xl font-semibold text-sm transition-all border border-purple-200 dark:border-purple-700/50 flex items-center gap-2">
                    <lucide_react_1.HelpCircle className="w-4 h-4"/>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>)}

        {/* Navigation Tabs - Modern banking style */}
        <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-1 border border-slate-200/50 dark:border-slate-800/50">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
            { id: "overview", label: "Overview", icon: <lucide_react_1.BarChart3 className="w-4 h-4"/> },
            { id: "crypto", label: "Cryptocurrency", icon: <lucide_react_1.Bitcoin className="w-4 h-4"/> },
            { id: "fiat", label: "Fiat & Banks", icon: <lucide_react_1.Banknote className="w-4 h-4"/> },
            { id: "cards", label: "Cards", icon: <lucide_react_1.CreditCard className="w-4 h-4"/> },
        ].map(function (tab) { return (<button key={tab.id} onClick={function () { return setSelectedTab(tab.id); }} className={"flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ".concat(selectedTab === tab.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800")}>
                {tab.icon}
                {tab.label}
              </button>); })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Allocation Chart */}
            {selectedTab === "overview" && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6">
                <AssetAllocationChart_1.AssetAllocationChart coins={coins}/>
              </div>)}

            {/* Crypto Section */}
            {(selectedTab === "overview" || selectedTab === "crypto") && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                        <lucide_react_1.Bitcoin className="w-5 h-5 text-white"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cryptocurrency Wallets</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{coins.length} assets</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleCreateWallet} className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                        <lucide_react_1.Plus className="w-4 h-4"/>
                        Add Wallet
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {filteredCoins.length > 0 ? (<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredCoins.slice(0, 4).map(function (coin) { return (<CryptoWalletCard_1.CryptoWalletCard key={coin.symbol} coin={coin} showBalances={showBalances} onBuy={function () { return handleBuyCrypto(coin, 1000); }} onSend={function () { return handleSendCrypto(coin, 500); }} onView={function () { return handleViewWallet(coin); }} onCopyAddress={function () { return handleCopyAddress(coin.walletAddress); }} copiedAddress={copiedAddress} user={user} isVerified={isVerified} kycThreshold={kycThreshold} portfolioValue={totalPortfolioValue}/>); })}
                    </div>) : (<div className="text-center py-12">
                      <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <lucide_react_1.Bitcoin className="w-10 h-10 text-slate-400"/>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Crypto Assets</h4>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">Start your crypto journey by adding your first wallet</p>
                      <button onClick={handleCreateWallet} className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                        <lucide_react_1.Key className="w-4 h-4"/>
                        Create First Wallet
                      </button>
                    </div>)}
                </div>
              </div>)}

            {/* Fiat Section */}
            {(selectedTab === "overview" || selectedTab === "fiat") && (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                        <lucide_react_1.Banknote className="w-5 h-5 text-white"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fiat Accounts</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{fiatPlatforms_1.fiatPlatforms.length} accounts</p>
                      </div>
                    </div>
                    <button onClick={handleDeposit} className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold text-sm transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                      <lucide_react_1.Plus className="w-4 h-4"/>
                      Link Account
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {fiatPlatforms_1.fiatPlatforms.map(function (platform) { return (<FiatAccountCard_1.FiatAccountCard key={platform.id} platform={platform} showBalances={showBalances} onAddFunds={function () { return handleAddFunds(platform, 1000); }} onTransfer={function () { return handleTransfer(); }} user={user} isVerified={isVerified} kycThreshold={kycThreshold} portfolioValue={totalPortfolioValue}/>); })}
                  </div>
                </div>
              </div>)}
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Portfolio Stats */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Portfolio Breakdown</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                      <lucide_react_1.Bitcoin className="w-5 h-5 text-white"/>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Cryptocurrency</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{coins.filter(function (c) { return c.valueUSD > 0; }).length} assets</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {showBalances ? "$".concat(cryptoValue.toLocaleString()) : '••••••'}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">+2.3%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                      <lucide_react_1.DollarSign className="w-5 h-5 text-white"/>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Fiat Currency</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{fiatPlatforms_1.fiatPlatforms.length} accounts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {showBalances ? "$".concat(fiatValue.toLocaleString()) : '••••••'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Stable</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Quick Stats</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Daily Limit</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {isVerified ? '$10,000' : "$".concat(kycThreshold.toLocaleString())}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">24h Volume</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      ${(cryptoValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Best Performer</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">BTC</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">+4.2%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Portfolio Risk</p>
                    <div className="flex items-center gap-1">
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Quick Status */}
              {!isVerified && (<div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Verification</h5>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Required</span>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700/30">
                    <p className="text-xs text-amber-800 dark:text-amber-400 mb-2">
                      Verify to unlock higher limits and premium features
                    </p>
                    <button onClick={handleVerifyNow} className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2">
                      <lucide_react_1.Shield className="w-3.5 h-3.5"/>
                      <span>Complete Verification</span>
                    </button>
                  </div>
                </div>)}
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <TransactionHistory_1.TransactionHistory coins={coins} fiatPlatforms={fiatPlatforms_1.fiatPlatforms} user={user} isVerified={isVerified} kycThreshold={kycThreshold} onViewDetails={function (tx) {
            if (!isVerified && tx.amount > kycThreshold) {
                setPendingAction({
                    action: tx.type,
                    amount: tx.amount,
                    asset: tx.asset
                });
                setShowKYCModal(true);
            }
        }}/>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions */}
      <QuickActions_1.QuickActions onDeposit={handleDeposit} onTransfer={handleTransfer} onBuy={function (amount) {
            if (coins[0])
                handleBuyCrypto(coins[0], amount);
        }} user={user} isVerified={isVerified} kycThreshold={kycThreshold} portfolioValue={totalPortfolioValue}/>

      {/* Enhanced Smart KYC Modal */}
      {showKYCModal && pendingAction && pendingAction.creativeContext && (<>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-in fade-in" onClick={function () { return setShowKYCModal(false); }}/>
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-800 rounded-t-3xl z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={"w-12 h-12 rounded-2xl bg-gradient-to-br ".concat(pendingAction.creativeContext.tier.color, " flex items-center justify-center shadow-lg")}>
                    <span className="text-2xl">{pendingAction.creativeContext.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pendingAction.creativeContext.unlockableFeature}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Requires verification</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">Action:</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                      {pendingAction.action.replace('_', ' ')}
                    </span>
                  </div>
                  {pendingAction.asset && (<div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">Asset:</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {pendingAction.asset}
                      </span>
                    </div>)}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">Amount:</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${pendingAction.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="p-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">What You'll Unlock:</h4>
                <div className="space-y-3 mb-6">
                  {pendingAction.creativeContext.benefits.map(function (benefit, index) { return (<div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <lucide_react_1.Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"/>
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                    </div>); })}
                </div>

                {/* Estimated Reward */}
                {pendingAction.creativeContext.estimatedReward > 0 && (<div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <lucide_react_1.TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Potential Reward</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      +${pendingAction.creativeContext.estimatedReward.toFixed(2)}
                    </p>
                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                      Estimated savings/earnings from verification
                    </p>
                  </div>)}

                {/* Verification Info */}
                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <lucide_react_1.Clock className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Verification Time</span>
                  </div>
                  <p className="text-sm text-slate-900 dark:text-white font-semibold">
                    {pendingAction.creativeContext.timeToVerify}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Usually completed within this timeframe
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button onClick={function () { return setShowKYCModal(false); }} className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold transition-all">
                    Later
                  </button>
                  <button onClick={function () {
                navigate('/kyc/submit', {
                    state: {
                        amount: pendingAction.amount,
                        service_type: 'crypto',
                        action: pendingAction.action,
                        asset: pendingAction.asset,
                        creativeContext: pendingAction.creativeContext,
                        redirectTo: '/dashboard/crypto'
                    }
                });
                setShowKYCModal(false);
            }} className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2">
                    <lucide_react_1.Lock className="w-4 h-4"/>
                    Verify Now
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                  Secure & encrypted document processing
                </p>
              </div>
            </div>
          </div>
        </>)}
    </div>);
}
