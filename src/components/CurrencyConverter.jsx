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
exports.default = CurrencyConverter;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var COMMON_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];
function CurrencyConverter(_a) {
    var _this = this;
    var baseAmount = _a.baseAmount, baseCurrency = _a.baseCurrency;
    var _b = (0, react_1.useState)('EUR'), targetCurrency = _b[0], setTargetCurrency = _b[1];
    var _c = (0, react_1.useState)(0), convertedAmount = _c[0], setConvertedAmount = _c[1];
    var _d = (0, react_1.useState)(0), exchangeRate = _d[0], setExchangeRate = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(false), isOpen = _f[0], setIsOpen = _f[1];
    var fetchExchangeRate = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_1, fallbackRates, rate;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("https://api.exchangerate-api.com/v4/latest/".concat(baseCurrency))];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    setExchangeRate(data.rates[targetCurrency]);
                    setConvertedAmount(baseAmount * data.rates[targetCurrency]);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _b.sent();
                    console.error('Failed to fetch rates:', error_1);
                    fallbackRates = {
                        USD: { EUR: 0.85, GBP: 0.73, NGN: 460, KES: 120, GHS: 12.5, ZAR: 18.5, INR: 83 },
                        EUR: { USD: 1.18, GBP: 0.86, NGN: 540, KES: 140, GHS: 14.7, ZAR: 21.7, INR: 97 },
                    };
                    rate = ((_a = fallbackRates[baseCurrency]) === null || _a === void 0 ? void 0 : _a[targetCurrency]) || 1;
                    setExchangeRate(rate);
                    setConvertedAmount(baseAmount * rate);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchExchangeRate();
    }, [baseCurrency, targetCurrency, baseAmount]);
    var formatCurrency = function (amount, currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };
    return (<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Currency Converter</h3>
        <button onClick={fetchExchangeRate} disabled={loading} className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="Refresh rates">
          <lucide_react_1.RefreshCw className={"w-4 h-4 ".concat(loading ? 'animate-spin' : '')}/>
        </button>
      </div>

      <div className="space-y-4">
        {/* Original Amount */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Your Balance</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(baseAmount, baseCurrency)}
          </p>
        </div>

        {/* Conversion */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Converted to</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? 'Loading...' : formatCurrency(convertedAmount, targetCurrency)}
              </p>
            </div>
            
            {/* Currency Selector */}
            <div className="relative">
              <button onClick={function () { return setIsOpen(!isOpen); }} className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                <span className="font-semibold">{targetCurrency}</span>
                <lucide_react_1.ChevronDown className="w-4 h-4"/>
              </button>
              
              {isOpen && (<div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-10 max-h-60 overflow-y-auto">
                  {COMMON_CURRENCIES
                .filter(function (c) { return c.code !== baseCurrency; })
                .map(function (currency) { return (<button key={currency.code} onClick={function () {
                    setTargetCurrency(currency.code);
                    setIsOpen(false);
                }} className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between">
                        <span>{currency.code} - {currency.name}</span>
                        <span className="text-gray-500">{currency.symbol}</span>
                      </button>); })}
                </div>)}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="text-center text-sm text-gray-600">
          1 {baseCurrency} = {exchangeRate.toFixed(4)} {targetCurrency}
        </div>
      </div>
    </div>);
}
