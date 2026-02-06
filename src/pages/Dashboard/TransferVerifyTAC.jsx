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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var TransferContext_1 = require("../../context/TransferContext");
var transfer_api_1 = require("../../services/transfer-api");
var Transfer_module_css_1 = require("./Transfer.module.css");
var TransferVerifyTAC = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var verifyTAC = (0, TransferContext_1.useTransfer)().verifyTAC;
    var transferId = parseInt(id || '0');
    var _a = (0, react_1.useState)(null), transfer = _a[0], setTransfer = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), verifying = _c[0], setVerifying = _c[1];
    var _d = (0, react_1.useState)(''), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(''), success = _e[0], setSuccess = _e[1];
    // TAC code state (6 digits)
    var _f = (0, react_1.useState)(['', '', '', '', '', '']), tacCode = _f[0], setTacCode = _f[1];
    var inputRefs = (0, react_1.useRef)([]);
    // Fetch transfer details
    (0, react_1.useEffect)(function () {
        var fetchTransfer = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, transfer_api_1.default.getTransfer(transferId)];
                    case 1:
                        data = _a.sent();
                        setTransfer(data);
                        // ✅ FIXED: Check if already in tac_sent, tac_verified, or completed status
                        if (['tac_sent', 'tac_verified', 'completed'].includes(data.status)) {
                            navigate("/dashboard/transfer/status/".concat(transferId));
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching transfer:', error_1);
                        setError('Failed to load transfer details');
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (transferId) {
            fetchTransfer();
        }
    }, [transferId, navigate]);
    // Handle TAC code input
    var handleTACChange = function (index, value) {
        var _a;
        // Only allow numbers
        if (!/^\d*$/.test(value))
            return;
        var newTacCode = __spreadArray([], tacCode, true);
        newTacCode[index] = value.slice(0, 1); // Only take first character
        setTacCode(newTacCode);
        // Auto-focus next input
        if (value && index < 5) {
            (_a = inputRefs.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    // Handle backspace
    var handleKeyDown = function (index, e) {
        var _a;
        if (e.key === 'Backspace' && !tacCode[index] && index > 0) {
            // Move to previous input on backspace if current is empty
            (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    // Handle paste
    var handlePaste = function (e) {
        e.preventDefault();
        var pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            var digits = pastedData.split('');
            var newTacCode_1 = __spreadArray([], tacCode, true);
            digits.forEach(function (digit, index) {
                if (index < 6) {
                    newTacCode_1[index] = digit;
                }
            });
            setTacCode(newTacCode_1);
            // Focus the last input
            setTimeout(function () {
                var _a;
                (_a = inputRefs.current[5]) === null || _a === void 0 ? void 0 : _a.focus();
            }, 0);
        }
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var code, result, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    code = tacCode.join('');
                    if (code.length !== 6) {
                        setError('Please enter the complete 6-digit TAC code');
                        return [2 /*return*/];
                    }
                    setVerifying(true);
                    setError('');
                    setSuccess('');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, verifyTAC(transferId, code)];
                case 2:
                    result = _b.sent();
                    if (result.success) {
                        setSuccess('TAC verified successfully! Funds will be deducted shortly.');
                        // Redirect to status page after 2 seconds
                        setTimeout(function () {
                            navigate("/dashboard/transfer/status/".concat(transferId));
                        }, 2000);
                    }
                    else {
                        setError(result.message || 'Invalid TAC code. Please try again.');
                        // Clear the TAC inputs on error
                        setTacCode(['', '', '', '', '', '']);
                        // Focus first input
                        (_a = inputRefs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    setError(err_1.message || 'An error occurred during verification');
                    return [3 /*break*/, 5];
                case 4:
                    setVerifying(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (<material_1.Container maxWidth="md" className={Transfer_module_css_1.default.container}>
        <material_1.Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <material_1.CircularProgress />
        </material_1.Box>
      </material_1.Container>);
    }
    if (!transfer) {
        return (<material_1.Container maxWidth="md" className={Transfer_module_css_1.default.container}>
        <material_1.Alert severity="error" sx={{ mt: 4 }}>
          Transfer not found
        </material_1.Alert>
        <material_1.Button startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard/transfer'); }} sx={{ mt: 2 }}>
          Back to Transfer
        </material_1.Button>
      </material_1.Container>);
    }
    return (<material_1.Container maxWidth="md" className={Transfer_module_css_1.default.container}>
      <material_1.Box mb={4}>
        <material_1.Button startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard/transfer'); }} className={Transfer_module_css_1.default.backButton}>
          Back to Transfer
        </material_1.Button>
        <material_1.Typography variant="h4" component="h1" gutterBottom>
          Enter TAC Code
        </material_1.Typography>
        <material_1.Typography color="textSecondary">
          Enter the 6-digit code from live agent
        </material_1.Typography>
      </material_1.Box>

      <material_1.Grid container spacing={3}>
        <material_1.Grid item xs={12}>
          <material_1.Paper className={Transfer_module_css_1.default.paper}>
            {/* Transfer Summary */}
            <material_1.Card variant="outlined" sx={{ mb: 3 }}>
              <material_1.CardContent>
                <material_1.Grid container spacing={2}>
                  <material_1.Grid item xs={12} sm={4}>
                    <material_1.Typography variant="body2" color="textSecondary">
                      Amount
                    </material_1.Typography>
                    <material_1.Typography variant="h5">
                      ${parseFloat(transfer.amount).toFixed(2)}
                    </material_1.Typography>
                  </material_1.Grid>
                  <material_1.Grid item xs={12} sm={4}>
                    <material_1.Typography variant="body2" color="textSecondary">
                      Recipient
                    </material_1.Typography>
                    <material_1.Typography variant="body1">
                      {transfer.recipient_name}
                    </material_1.Typography>
                  </material_1.Grid>
                  <material_1.Grid item xs={12} sm={4}>
                    <material_1.Typography variant="body2" color="textSecondary">
                      Reference
                    </material_1.Typography>
                    <material_1.Typography variant="body1" fontFamily="monospace">
                      {transfer.reference}
                    </material_1.Typography>
                  </material_1.Grid>
                </material_1.Grid>
              </material_1.CardContent>
            </material_1.Card>

            {/* Error/Success Messages */}
            {error && (<material_1.Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </material_1.Alert>)}
            
            {success && (<material_1.Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </material_1.Alert>)}

            {/* TAC Input Form */}
            <form onSubmit={handleSubmit}>
              <material_1.Box mb={4}>
                <material_1.Typography variant="h6" gutterBottom align="center">
                  Enter 6-Digit TAC Code
                </material_1.Typography>
                <material_1.Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                  Enter code provided by live agent
                </material_1.Typography>

                {/* TAC Input Boxes */}
                <material_1.Box display="flex" justifyContent="center" gap={2} my={4}>
                  {tacCode.map(function (digit, index) { return (<material_1.TextField key={index} inputRef={function (el) { return inputRefs.current[index] = el; }} value={digit} onChange={function (e) { return handleTACChange(index, e.target.value); }} onKeyDown={function (e) { return handleKeyDown(index, e); }} onPaste={index === 0 ? handlePaste : undefined} inputProps={{
                maxLength: 1,
                style: {
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    padding: '12px',
                },
            }} sx={{
                width: '60px',
                '& .MuiOutlinedInput-root': {
                    height: '60px',
                },
            }} autoFocus={index === 0} disabled={verifying}/>); })}
                </material_1.Box>

                {/* Submit Button */}
                <material_1.Box display="flex" justifyContent="center" mb={3}>
                  <material_1.Button type="submit" variant="contained" color="primary" size="large" startIcon={verifying ? <material_1.CircularProgress size={20}/> : <icons_material_1.CheckCircle />} disabled={verifying || tacCode.join('').length !== 6} sx={{ minWidth: '200px' }}>
                    {verifying ? 'Verifying...' : 'Verify & Proceed'}
                  </material_1.Button>
                </material_1.Box>
              </material_1.Box>
            </form>

            {/* Instructions */}
            <material_1.Alert severity="info" icon={<icons_material_1.Email />} sx={{ mb: 3 }}>
              <material_1.Typography variant="body2">
                • Contact live agent if you don't have TAC code
                <br />
                • TAC codes are valid for one-time use
                <br />
                • After verification, funds will be deducted from your wallet
              </material_1.Typography>
            </material_1.Alert>

            {/* Action Buttons */}
            <material_1.Box display="flex" justifyContent="space-between" mt={4}>
              <material_1.Button variant="outlined" startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard/transfer'); }}>
                Back to Transfer
              </material_1.Button>
              
              <material_1.Button variant="text" onClick={function () { return navigate('/dashboard/transfer'); }}>
                Cancel
              </material_1.Button>
            </material_1.Box>
          </material_1.Paper>
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Container>);
};
exports.default = TransferVerifyTAC;
