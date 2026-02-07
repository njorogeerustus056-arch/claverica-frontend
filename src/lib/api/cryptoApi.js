
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

export const fetchKYCLimits = export const submitSellOrder = export const submitBuyOrder = export const fetchMarketData = export const fetchTransactions = export const fetchPortfolioData = export const fetchFiatPlatforms = export const fetchCryptoData = void 0;
// src/lib/api/cryptoApi.ts - Mock API for crypto data
var cryptoCoins_1 = require("../../data/cryptoCoins");
var fiatPlatforms_1 = require("../../data/fiatPlatforms");
// Mock delay to simulate API call
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
// Fetch crypto data
var fetchCryptoData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, delay(500)];
            case 1:
                _a.sent(); // Simulate network delay
                // In a real app, this would be an API call
                return [2 /*return*/, cryptoCoins_1.cryptoCoins.map(function (coin) { return (__assign(__assign({}, coin), { valueUSD: coin.price * coin.balance, 
                        // Add some random variation for demo
                        price: coin.price * (1 + (Math.random() - 0.5) * 0.02), change24h: coin.change24h + (Math.random() - 0.5) * 0.5 })); })];
        }
    });
}); };
export const fetchCryptoData = fetchCryptoData;
// Fetch fiat platforms data
var fetchFiatPlatforms = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, delay(300)];
            case 1:
                _a.sent();
                return [2 /*return*/, fiatPlatforms_1.fiatPlatforms];
        }
    });
}); };
export const fetchFiatPlatforms = fetchFiatPlatforms;
// Fetch portfolio summary
var fetchPortfolioData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var totalCryptoValue, totalFiatValue, totalValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, delay(400)];
            case 1:
                _a.sent();
                totalCryptoValue = cryptoCoins_1.cryptoCoins.reduce(function (sum, coin) { return sum + (coin.price * coin.balance); }, 0);
                totalFiatValue = fiatPlatforms_1.fiatPlatforms.reduce(function (sum, platform) { return sum + platform.balance; }, 0);
                totalValue = totalCryptoValue + totalFiatValue;
                return [2 /*return*/, {
                        totalValue: totalValue,
                        dayChange: 2.34 + (Math.random() - 0.5) * 1,
                        weekChange: 5.67 + (Math.random() - 0.5) * 2,
                        monthChange: 12.45 + (Math.random() - 0.5) * 3,
                    }];
        }
    });
}); };
export const fetchPortfolioData = fetchPortfolioData;
// Fetch transaction history
var fetchTransactions = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (limit) {
        var mockTransactions;
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delay(600)];
                case 1:
                    _a.sent();
                    mockTransactions = [
                        {
                            id: '1',
                            type: 'buy',
                            asset: 'BTC',
                            amount: 0.005,
                            valueUSD: 342.10,
                            status: 'completed',
                            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                            description: 'Market buy order',
                        },
                        {
                            id: '2',
                            type: 'deposit',
                            asset: 'Wise',
                            amount: 1000,
                            valueUSD: 1000,
                            status: 'completed',
                            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                            description: 'Bank transfer deposit',
                        },
                        {
                            id: '3',
                            type: 'transfer',
                            asset: 'Monzo',
                            amount: 500,
                            valueUSD: 500,
                            status: 'pending',
                            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
                            description: 'International transfer to USD',
                        },
                        {
                            id: '4',
                            type: 'sell',
                            asset: 'ETH',
                            amount: 0.2,
                            valueUSD: 762.40,
                            status: 'completed',
                            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                            description: 'Limit sell order filled',
                        },
                        {
                            id: '5',
                            type: 'withdrawal',
                            asset: 'Revolut',
                            amount: 200,
                            valueUSD: 200,
                            status: 'completed',
                            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
                            description: 'ATM withdrawal',
                        },
                        {
                            id: '6',
                            type: 'buy',
                            asset: 'SOL',
                            amount: 2.5,
                            valueUSD: 356.25,
                            status: 'completed',
                            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
                            description: 'Quick buy',
                        },
                        {
                            id: '7',
                            type: 'deposit',
                            asset: 'Skrill',
                            amount: 750,
                            valueUSD: 750,
                            status: 'completed',
                            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
                            description: 'Card deposit',
                        },
                        {
                            id: '8',
                            type: 'transfer',
                            asset: 'Wise',
                            amount: 300,
                            valueUSD: 300,
                            status: 'failed',
                            timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
                            description: 'Insufficient funds',
                        },
                    ];
                    return [2 /*return*/, mockTransactions.slice(0, limit)];
            }
        });
    });
};
export const fetchTransactions = fetchTransactions;
// Fetch market data (prices, changes)
var fetchMarketData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var marketData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, delay(800)];
            case 1:
                _a.sent();
                marketData = cryptoCoins_1.cryptoCoins.map(function (coin) { return ({
                    symbol: coin.symbol,
                    price: coin.price * (1 + (Math.random() - 0.5) * 0.05),
                    change24h: coin.change24h + (Math.random() - 0.5) * 2,
                    volume24h: Math.random() * 1000000,
                    marketCap: Math.random() * 1000000000,
                }); });
                return [2 /*return*/, {
                        timestamp: new Date().toISOString(),
                        data: marketData,
                        source: 'CoinGecko Mock API',
                    }];
        }
    });
}); };
export const fetchMarketData = fetchMarketData;
// Submit buy order
var submitBuyOrder = function (symbol, amount, price) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, delay(1000)];
            case 1:
                _b.sent(); // Simulate processing time
                // In reality, this would call your backend
                return [2 /*return*/, {
                        success: true,
                        orderId: "ORD-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9)),
                        symbol: symbol,
                        amount: amount,
                        executedPrice: price || ((_a = cryptoCoins_1.cryptoCoins.find(function (c) { return c.symbol === symbol; })) === null || _a === void 0 ? void 0 : _a.price) || 0,
                        timestamp: new Date().toISOString(),
                        status: 'pending_execution',
                    }];
        }
    });
}); };
export const submitBuyOrder = submitBuyOrder;
// Submit sell order
var submitSellOrder = function (symbol, amount, price) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, delay(1000)];
            case 1:
                _b.sent();
                return [2 /*return*/, {
                        success: true,
                        orderId: "ORD-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9)),
                        symbol: symbol,
                        amount: amount,
                        executedPrice: price || ((_a = cryptoCoins_1.cryptoCoins.find(function (c) { return c.symbol === symbol; })) === null || _a === void 0 ? void 0 : _a.price) || 0,
                        timestamp: new Date().toISOString(),
                        status: 'pending_execution',
                    }];
        }
    });
}); };
export const submitSellOrder = submitSellOrder;
// Check KYC status and limits
var fetchKYCLimits = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, delay(200)];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        isVerified: false, // This would come from backend
                        dailyLimit: 1500,
                        monthlyLimit: 10000,
                        withdrawalLimit: 2000,
                        depositLimit: 5000,
                        remainingDaily: 1500,
                        kycLevel: 1, // 0 = no KYC, 1 = basic, 2 = enhanced, 3 = full
                        nextLevelRequirements: ['identity_verification', 'address_proof', 'source_of_funds'],
                    }];
        }
    });
}); };
export const fetchKYCLimits = fetchKYCLimits;




