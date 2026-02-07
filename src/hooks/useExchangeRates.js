
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

export const useExchangeRates = useExchangeRates;
export const useDashboardExchangeRates = useDashboardExchangeRates;
var react_1 = require("react");
var auth_1 = require("../store/auth"); // Adjust path as needed
function useExchangeRates(baseCurrency) {
    var _this = this;
    if (baseCurrency === void 0) { baseCurrency = 'USD'; }
    var _a = (0, react_1.useState)({}), rates = _a[0], setRates = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), lastUpdated = _c[0], setLastUpdated = _c[1];
    var tokens = (0, auth_1.useAuthStore)().tokens;
    var fetchRates = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1, fallbackRates_1, baseRate_1, convertedRates_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("https://api.exchangerate-api.com/v4/latest/".concat(baseCurrency))];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    // Handle both response formats
                    if (data.rates) {
                        setRates(data.rates);
                    }
                    else if (data.conversion_rates) {
                        // Some APIs use different key names
                        setRates(data.conversion_rates);
                    }
                    else if (data.data) {
                        // Your custom backend format
                        setRates(data.data.rates || data.data);
                    }
                    setLastUpdated(new Date());
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Failed to fetch exchange rates:', error_1);
                    fallbackRates_1 = {
                        USD: 1,
                        EUR: 0.85,
                        GBP: 0.73,
                        NGN: 460,
                        KES: 120,
                        GHS: 12.5,
                        ZAR: 18.5,
                        INR: 83,
                        JPY: 110,
                        CAD: 1.25,
                        AUD: 1.35,
                        CHF: 0.88,
                        CNY: 6.45
                    };
                    // Convert fallback rates if base is not USD
                    if (baseCurrency !== 'USD' && fallbackRates_1[baseCurrency]) {
                        baseRate_1 = fallbackRates_1[baseCurrency];
                        convertedRates_1 = {};
                        Object.keys(fallbackRates_1).forEach(function (currency) {
                            convertedRates_1[currency] = fallbackRates_1[currency] / baseRate_1;
                        });
                        setRates(convertedRates_1);
                    }
                    else {
                        setRates(fallbackRates_1);
                    }
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Helper function to convert between currencies
    var convert = function (amount, from, to) {
        if (!rates[from] || !rates[to])
            return amount;
        // Convert to USD first if using external API
        if (baseCurrency === 'USD') {
            var amountInUSD = amount / rates[from];
            return amountInUSD * rates[to];
        }
        // Direct conversion if rates are based on same base
        return amount * (rates[to] / rates[from]);
    };
    // Get specific rate
    var getRate = function (targetCurrency) {
        return rates[targetCurrency] || 1;
    };
    // Get list of available currencies
    var getAvailableCurrencies = function () {
        return Object.keys(rates).sort();
    };
    (0, react_1.useEffect)(function () {
        fetchRates();
        // Refresh every 5 minutes (or adjust as needed)
        var interval = setInterval(fetchRates, 300000);
        return function () { return clearInterval(interval); };
    }, [baseCurrency, tokens === null || tokens === void 0 ? void 0 : tokens.access]); // Re-fetch if base currency or token changes
    return {
        rates: rates,
        loading: loading,
        lastUpdated: lastUpdated,
        refetch: fetchRates,
        convert: convert,
        getRate: getRate,
        getAvailableCurrencies: getAvailableCurrencies
    };
}
// Optional: Create a simpler hook for dashboard use
function useDashboardExchangeRates() {
    var _a = useExchangeRates('USD'), rates = _a.rates, loading = _a.loading;
    var quickConvert = function (amount, toCurrency) {
        if (!rates[toCurrency])
            return amount;
        return amount * rates[toCurrency];
    };
    return {
        rates: rates,
        loading: loading,
        quickConvert: quickConvert
    };
}


