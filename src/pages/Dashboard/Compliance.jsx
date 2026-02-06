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
exports.default = Compliance;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../../context/AuthContext");
var ProtectedRoute_1 = require("../../components/ProtectedRoute");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";
function ComplianceContent() {
    var _this = this;
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var tokens = (0, AuthContext_1.useAuth)().tokens;
    var _a = (0, react_1.useState)(['', '', '', '', '', '']), tacCode = _a[0], setTacCode = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(false), success = _d[0], setSuccess = _d[1];
    var _e = location.state || {}, transferId = _e.transferId, amount = _e.amount, recipient = _e.recipient;
    (0, react_1.useEffect)(function () {
        if (!transferId) {
            navigate('/dashboard/transfer');
        }
    }, [transferId, navigate]);
    var handleTacChange = function (index, value) {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            var newTac = __spreadArray([], tacCode, true);
            newTac[index] = value;
            setTacCode(newTac);
            if (value && index < 5) {
                var nextInput = document.getElementById("tac-".concat(index + 1));
                nextInput === null || nextInput === void 0 ? void 0 : nextInput.focus();
            }
        }
    };
    var handleVerifyTac = function () { return __awaiter(_this, void 0, void 0, function () {
        var code, response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.access) || !transferId)
                        return [2 /*return*/];
                    code = tacCode.join('');
                    if (code.length !== 6) {
                        setError('Please enter complete 6-digit TAC');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/transfers/transfers/").concat(transferId, "/verify_tac/"), {
                            method: 'POST',
                            headers: {
                                Authorization: "Bearer ".concat(tokens.access),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ tac_code: code }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.ok) {
                        setSuccess(true);
                        setTimeout(function () {
                            navigate('/dashboard');
                        }, 3000);
                    }
                    else {
                        setError(data.error || 'Invalid TAC code');
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setError('Network error. Please try again.');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (!transferId)
        return null;
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <framer_motion_1.motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Security Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Enter the TAC code sent to your email
          </p>
        </framer_motion_1.motion.div>

        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          {/* Transaction Details */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <lucide_react_1.Shield className="w-8 h-8 text-primary-600 dark:text-primary-400"/>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Transaction Details
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify this is your transaction
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${amount === null || amount === void 0 ? void 0 : amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Recipient:</span>
                <span className="font-medium text-gray-900 dark:text-white">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                <span className="font-medium text-gray-900 dark:text-white">{transferId}</span>
              </div>
            </div>
          </div>

          {/* TAC Input */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <lucide_react_1.Lock className="w-5 h-5 text-primary-600 dark:text-primary-400"/>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Enter 6-digit TAC Code
              </h3>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              {tacCode.map(function (digit, index) { return (<input key={index} id={"tac-".concat(index)} type="text" maxLength={1} value={digit} onChange={function (e) { return handleTacChange(index, e.target.value); }} className="w-16 h-16 text-center text-3xl font-bold bg-gray-50 dark:bg-gray-700 
                           border-2 border-gray-300 dark:border-gray-600 rounded-xl
                           focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20
                           text-gray-900 dark:text-white"/>); })}
            </div>
            
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-2">
              Check your email for the 6-digit Transaction Authorization Code
            </p>
            <p className="text-center text-gray-500 dark:text-gray-500 text-xs">
              Code expires in 24 hours
            </p>
          </div>

          {/* Error/Success */}
          {error && (<div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <lucide_react_1.AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"/>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>)}

          {success && (<div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <lucide_react_1.CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">
                    TAC Verified Successfully!
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Funds have been deducted. Admin will process the transfer.
                  </p>
                </div>
              </div>
            </div>)}

          {/* Verify Button */}
          <button onClick={handleVerifyTac} disabled={loading || success || tacCode.join('').length !== 6} className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
                     text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 
                     flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (<>
                <lucide_react_1.Loader2 className="w-5 h-5 animate-spin"/>
                Verifying...
              </>) : success ? (<>
                <lucide_react_1.CheckCircle className="w-5 h-5"/>
                Verified Successfully
              </>) : (<>
                <lucide_react_1.Lock className="w-5 h-5"/>
                Verify & Process Transfer
              </>)}
          </button>
        </framer_motion_1.motion.div>
      </div>
    </div>);
}
function Compliance() {
    return (<ProtectedRoute_1.default>
      <ComplianceContent />
    </ProtectedRoute_1.default>);
}
