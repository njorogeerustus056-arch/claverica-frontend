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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var AuthContext_1 = require("../../context/AuthContext");
var transfer_api_1 = require("../../services/transfer-api");
var Transfer_module_css_1 = require("./Transfer.module.css");
var KYC_STEPS = [
    { id: 'identity', icon: icons_material_1.Person, title: 'Personal Info', desc: 'Name, DOB, address' },
    { id: 'documents', icon: icons_material_1.Description, title: 'ID Document', desc: 'Passport or government ID' },
    { id: 'selfie', icon: icons_material_1.PhotoCamera, title: 'Selfie Verification', desc: 'Live face-match photo' },
    { id: 'financial', icon: icons_material_1.CreditCard, title: 'Financial Details', desc: 'Income & employment' },
];
var KycModal = function (_a) {
    var open = _a.open, payload = _a.payload, onClose = _a.onClose, onConfirm = _a.onConfirm;
    var _b = (0, react_1.useState)(false), submitting = _b[0], setSubmitting = _b[1];
    var handleSubmit = function () {
        if (!payload)
            return;
        setSubmitting(true);
        setTimeout(function () {
            setSubmitting(false);
            onConfirm(payload);
        }, 800);
    };
    return (<material_1.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
            sx: {
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '1px solid #334155',
            }
        }}>
      <material_1.Box sx={{ height: 4, background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)' }}/>

      <material_1.DialogTitle sx={{ borderBottom: '1px solid #334155', pb: 2 }}>
        <material_1.Box display="flex" alignItems="center" justifyContent="space-between">
          <material_1.Box display="flex" alignItems="center" gap={2}>
            <material_1.Box sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
              <icons_material_1.VerifiedUser sx={{ color: '#06b6d4', fontSize: 20 }}/>
            </material_1.Box>
            <material_1.Box>
              <material_1.Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                KYC Verification Required
              </material_1.Typography>
              <material_1.Typography variant="caption" sx={{ color: '#94a3b8' }}>
                One-time identity check to unlock transfers
              </material_1.Typography>
            </material_1.Box>
          </material_1.Box>
          <material_1.IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8' }}>
            <icons_material_1.Close />
          </material_1.IconButton>
        </material_1.Box>
      </material_1.DialogTitle>

      <material_1.DialogContent sx={{ pt: 3 }}>
        <material_1.Box sx={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: 2,
            p: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
        }}>
          <icons_material_1.Warning sx={{ color: '#fbbf24', fontSize: 18, mt: 0.2 }}/>
          <material_1.Typography variant="body2" sx={{ color: '#e2e8f0' }}>
            To proceed with{' '}
            <material_1.Box component="span" sx={{ color: 'white', fontWeight: 600 }}>
              {(payload === null || payload === void 0 ? void 0 : payload.action_label) || 'this transfer'}
            </material_1.Box>
            , please complete identity verification below.
          </material_1.Typography>
        </material_1.Box>

        <material_1.List sx={{ mb: 3 }}>
          {KYC_STEPS.map(function (step, index) {
            var Icon = step.icon;
            return (<material_1.ListItem key={step.id} sx={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #334155',
                    borderRadius: 2,
                    mb: 1,
                    py: 2,
                }}>
                <material_1.ListItemIcon sx={{ minWidth: 44 }}>
                  <material_1.Box sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    background: 'rgba(71, 85, 105, 0.3)',
                    border: '1px solid #475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Icon sx={{ fontSize: 16, color: '#94a3b8' }}/>
                  </material_1.Box>
                </material_1.ListItemIcon>
                <material_1.ListItemText primary={<material_1.Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      {step.title}
                    </material_1.Typography>} secondary={<material_1.Typography variant="caption" sx={{ color: '#64748b' }}>
                      {step.desc}
                    </material_1.Typography>}/>
                <material_1.Chip label={"Step ".concat(index + 1)} size="small" sx={{
                    background: 'rgba(71, 85, 105, 0.3)',
                    color: '#94a3b8',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                }}/>
              </material_1.ListItem>);
        })}
        </material_1.List>

        <material_1.Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <icons_material_1.Shield sx={{ fontSize: 16, color: '#10b981' }}/>
          <material_1.Typography variant="caption" sx={{ color: '#64748b' }}>
            256-bit encrypted · Processed in under 5 minutes · PSD2 & GDPR compliant
          </material_1.Typography>
        </material_1.Box>

        <material_1.Box sx={{ mb: 3 }}>
          <material_1.Box display="flex" justifyContent="space-between" mb={0.5}>
            <material_1.Typography variant="caption" sx={{ color: '#94a3b8' }}>Verification progress</material_1.Typography>
            <material_1.Typography variant="caption" sx={{ color: '#06b6d4', fontWeight: 600 }}>0%</material_1.Typography>
          </material_1.Box>
          <material_1.LinearProgress variant="determinate" value={0} sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#1e293b',
            '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                borderRadius: 3,
            }
        }}/>
        </material_1.Box>
      </material_1.DialogContent>

      <material_1.DialogActions sx={{ px: 3, pb: 3, borderTop: '1px solid #334155', pt: 2 }}>
        <material_1.Button onClick={onClose} variant="outlined" fullWidth sx={{
            py: 1.5,
            borderColor: '#475569',
            color: '#94a3b8',
            '&:hover': {
                borderColor: '#64748b',
                backgroundColor: 'rgba(100, 116, 139, 0.1)',
            },
        }}>
          Cancel
        </material_1.Button>
        <material_1.Button onClick={handleSubmit} disabled={submitting} variant="contained" fullWidth sx={{
            py: 1.5,
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
            color: 'white',
            fontWeight: 600,
            '&:hover': {
                background: 'linear-gradient(90deg, #0891b2, #7c3aed)',
            },
            '&:disabled': {
                background: '#475569',
            },
        }}>
          {submitting ? (<material_1.Box display="flex" alignItems="center" gap={1}>
              <material_1.CircularProgress size={20} color="inherit"/>
              Preparing Verification...
            </material_1.Box>) : (<material_1.Box display="flex" alignItems="center" gap={1}>
              Start KYC Verification
              <icons_material_1.ArrowBack sx={{ transform: 'rotate(180deg)', fontSize: 20 }}/>
            </material_1.Box>)}
        </material_1.Button>
      </material_1.DialogActions>
    </material_1.Dialog>);
};
var Transfer = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(null), balance = _b[0], setBalance = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(''), success = _d[0], setSuccess = _d[1];
    // KYC State
    var _e = (0, react_1.useState)(false), kycOpen = _e[0], setKycOpen = _e[1];
    var _f = (0, react_1.useState)(null), kycPayload = _f[0], setKycPayload = _f[1];
    var _g = (0, react_1.useState)('unverified'), kycStatus = _g[0], setKycStatus = _g[1];
    var _h = (0, react_1.useState)(true), showKycBanner = _h[0], setShowKycBanner = _h[1];
    var _j = (0, react_1.useState)({
        amount: '',
        recipient_name: '',
        destination_type: 'bank',
        destination_details: {
            bank_name: '',
            account_number: '',
            account_type: '',
            branch: '',
        },
        narration: '',
    }), formData = _j[0], setFormData = _j[1];
    // Check KYC status on component mount
    (0, react_1.useEffect)(function () {
        var checkKycStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                status = (user === null || user === void 0 ? void 0 : user.kyc_status) || 'unverified';
                setKycStatus(status);
                // Auto-show banner if KYC is unverified
                if (status === 'unverified') {
                    setShowKycBanner(true);
                }
                return [2 /*return*/];
            });
        }); };
        checkKycStatus();
    }, [user]);
    // Fetch wallet balance
    (0, react_1.useEffect)(function () {
        var fetchBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
            var balanceData, parsedBalance, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, transfer_api_1.default.getWalletBalance()];
                    case 1:
                        balanceData = _a.sent();
                        if (!balanceData) {
                            setBalance({
                                balance: 0,
                                currency: 'USD'
                            });
                            return [2 /*return*/];
                        }
                        parsedBalance = parseFloat(balanceData.balance);
                        setBalance({
                            balance: isNaN(parsedBalance) ? 0 : parsedBalance,
                            currency: balanceData.currency || 'USD'
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Error fetching balance:', err_1);
                        setBalance({
                            balance: 0,
                            currency: 'USD'
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchBalance();
    }, []);
    // KYC Handler
    var requireKyc = (0, react_1.useCallback)(function (payload) {
        setKycPayload(payload);
        setKycOpen(true);
    }, []);
    var handleKycConfirm = (0, react_1.useCallback)(function (p) {
        setKycOpen(false);
        setKycPayload(null);
        navigate("/dashboard/kyc/submit", {
            state: {
                service_type: p.service_type,
                transfer_amount: p.transfer_amount,
                destination_type: p.destination_type,
                redirectTo: p.redirectTo || "/dashboard/transfer",
            },
        });
    }, [navigate]);
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        if (name.startsWith('destination_details.')) {
            var field_1 = name.split('.')[1];
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), { destination_details: __assign(__assign({}, prev.destination_details), (_a = {}, _a[field_1] = value, _a)) }));
            });
        }
        else {
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
            });
        }
    };
    var handleDestinationTypeChange = function (type) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { destination_type: type, destination_details: {
                bank_name: '',
                account_number: '',
                account_type: '',
                branch: '',
                mobile_provider: '',
                mobile_number: '',
                crypto_address: '',
                crypto_type: '',
            } })); });
    };
    var validateForm = function () {
        var _a, _b, _c, _d, _e, _f;
        setError('');
        // Amount validation
        var amount = parseFloat(formData.amount);
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount');
            return false;
        }
        if (balance && amount > balance.balance) {
            setError("Insufficient balance. Available: $".concat(balance.balance.toFixed(2)));
            return false;
        }
        // Recipient validation
        if (!formData.recipient_name.trim()) {
            setError('Please enter recipient name');
            return false;
        }
        // Destination validation based on type
        switch (formData.destination_type) {
            case 'bank':
                if (!((_a = formData.destination_details.bank_name) === null || _a === void 0 ? void 0 : _a.trim()) ||
                    !((_b = formData.destination_details.account_number) === null || _b === void 0 ? void 0 : _b.trim()) ||
                    !((_c = formData.destination_details.account_type) === null || _c === void 0 ? void 0 : _c.trim())) {
                    setError('Please fill in all bank details');
                    return false;
                }
                break;
            case 'mobile_wallet':
                if (!((_d = formData.destination_details.mobile_provider) === null || _d === void 0 ? void 0 : _d.trim()) ||
                    !((_e = formData.destination_details.mobile_number) === null || _e === void 0 ? void 0 : _e.trim())) {
                    setError('Please fill in all mobile wallet details');
                    return false;
                }
                break;
            case 'crypto':
                if (!((_f = formData.destination_details.crypto_address) === null || _f === void 0 ? void 0 : _f.trim())) {
                    setError('Please enter crypto wallet address');
                    return false;
                }
                break;
        }
        return true;
    };
    // ✅ CORRECT FLOW: handleSubmit
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var amount, response_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm())
                        return [2 /*return*/];
                    amount = parseFloat(formData.amount);
                    // ✅ CORRECT KYC LOGIC:
                    // Only require KYC for amounts ≥ $1,500 AND user not KYC verified
                    if (amount >= 1500 && kycStatus !== 'verified') {
                        // Large amount + unverified user = REQUIRE KYC
                        requireKyc({
                            service_type: 'transfer',
                            transfer_amount: amount,
                            destination_type: formData.destination_type,
                            redirectTo: '/dashboard/transfer',
                            action_label: "Transfer $".concat(amount, " to ").concat(formData.recipient_name),
                        });
                        return [2 /*return*/];
                    }
                    // ✅ FOR ALL OTHER CASES (amount < $1,500 OR KYC verified):
                    // PROCEED DIRECTLY to TAC flow
                    setLoading(true);
                    setError('');
                    setSuccess('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    console.log('📤 SUBMITTING TRANSFER DATA:', {
                        amount: amount,
                        recipient_name: formData.recipient_name,
                        destination_type: formData.destination_type,
                        destination_details: formData.destination_details,
                        narration: formData.narration,
                    });
                    return [4 /*yield*/, transfer_api_1.default.createTransfer({
                            amount: amount,
                            recipient_name: formData.recipient_name,
                            destination_type: formData.destination_type,
                            destination_details: formData.destination_details,
                            narration: formData.narration,
                        })];
                case 2:
                    response_1 = _a.sent();
                    console.log('📥 TRANSFER API RESPONSE:', response_1);
                    if (response_1.success) {
                        // ✅ FIXED: Show success message briefly
                        setSuccess("Transfer #".concat(response_1.transfer_id, " submitted successfully! Redirecting to TAC page..."));
                        // ✅ CRITICAL FIX: AUTO-REDIRECT to TAC page after 2 seconds
                        setTimeout(function () {
                            navigate("/dashboard/transfer/verify-tac/".concat(response_1.transfer_id));
                        }, 2000);
                        // Reset form
                        setFormData({
                            amount: '',
                            recipient_name: '',
                            destination_type: 'bank',
                            destination_details: {
                                bank_name: '',
                                account_number: '',
                                account_type: '',
                                branch: '',
                            },
                            narration: '',
                        });
                    }
                    else {
                        setError(response_1.message || 'Failed to submit transfer request');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error('Transfer error:', err_2);
                    setError(err_2.message || 'An error occurred while submitting transfer');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleStartKYC = function () {
        var amount = parseFloat(formData.amount) || 0;
        requireKyc({
            service_type: 'transfer',
            transfer_amount: amount,
            destination_type: formData.destination_type,
            redirectTo: '/dashboard/transfer',
            action_label: 'Complete KYC for transfers',
        });
    };
    var renderDestinationFields = function () {
        switch (formData.destination_type) {
            case 'bank':
                return (<>
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12 }}>
              <material_1.TextField select fullWidth label="Bank Name" name="destination_details.bank_name" value={formData.destination_details.bank_name || ''} onChange={handleChange} required>
                <material_1.MenuItem value="KCB">Kenya Commercial Bank (KCB)</material_1.MenuItem>
                <material_1.MenuItem value="Equity">Equity Bank</material_1.MenuItem>
                <material_1.MenuItem value="Cooperative">Cooperative Bank</material_1.MenuItem>
                <material_1.MenuItem value="Stanbic">Stanbic Bank</material_1.MenuItem>
                <material_1.MenuItem value="Standard Chartered">Standard Chartered Bank</material_1.MenuItem>
                <material_1.MenuItem value="Absa">Absa Bank</material_1.MenuItem>
                <material_1.MenuItem value="NCBA">NCBA Bank</material_1.MenuItem>
                <material_1.MenuItem value="DTB">Diamond Trust Bank (DTB)</material_1.MenuItem>
                <material_1.MenuItem value="CBA">Commercial Bank of Africa</material_1.MenuItem>
                <material_1.MenuItem value="I&M">I&M Bank</material_1.MenuItem>
                <material_1.MenuItem value="Bank of Africa">Bank of Africa</material_1.MenuItem>
                <material_1.MenuItem value="Prime">Prime Bank</material_1.MenuItem>
                <material_1.MenuItem value="Other">Other Bank</material_1.MenuItem>
              </material_1.TextField>
            </material_1.Grid>
            
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12, sm: 6 }}>
              <material_1.TextField fullWidth label="Account Number" name="destination_details.account_number" value={formData.destination_details.account_number || ''} onChange={handleChange} required/>
            </material_1.Grid>
            
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12, sm: 6 }}>
              <material_1.TextField select fullWidth label="Account Type" name="destination_details.account_type" value={formData.destination_details.account_type || ''} onChange={handleChange} required>
                <material_1.MenuItem value="savings">Savings Account</material_1.MenuItem>
                <material_1.MenuItem value="checking">Checking Account</material_1.MenuItem>
                <material_1.MenuItem value="current">Current Account</material_1.MenuItem>
                <material_1.MenuItem value="business">Business Account</material_1.MenuItem>
                <material_1.MenuItem value="fixed_deposit">Fixed Deposit Account</material_1.MenuItem>
              </material_1.TextField>
            </material_1.Grid>
            
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12 }}>
              <material_1.TextField fullWidth label="Branch (Optional)" name="destination_details.branch" value={formData.destination_details.branch || ''} onChange={handleChange} placeholder="e.g., Nairobi CBD, Westlands, etc."/>
            </material_1.Grid>
          </>);
            case 'mobile_wallet':
                return (<>
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12, sm: 6 }}>
              <material_1.TextField select fullWidth label="Mobile Provider" name="destination_details.mobile_provider" value={formData.destination_details.mobile_provider || ''} onChange={handleChange} required>
                <material_1.MenuItem value="M-Pesa">M-Pesa</material_1.MenuItem>
                <material_1.MenuItem value="Airtel Money">Airtel Money</material_1.MenuItem>
                <material_1.MenuItem value="T-Kash">T-Kash</material_1.MenuItem>
                <material_1.MenuItem value="Equity Eazzy">Equity Eazzy</material_1.MenuItem>
              </material_1.TextField>
            </material_1.Grid>
            
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12, sm: 6 }}>
              <material_1.TextField fullWidth label="Mobile Number" name="destination_details.mobile_number" value={formData.destination_details.mobile_number || ''} onChange={handleChange} required placeholder="07XXXXXXXX"/>
            </material_1.Grid>
          </>);
            case 'crypto':
                return (<>
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12, sm: 6 }}>
              <material_1.TextField select fullWidth label="Cryptocurrency" name="destination_details.crypto_type" value={formData.destination_details.crypto_type || ''} onChange={handleChange} required>
                <material_1.MenuItem value="Bitcoin">Bitcoin (BTC)</material_1.MenuItem>
                <material_1.MenuItem value="Ethereum">Ethereum (ETH)</material_1.MenuItem>
                <material_1.MenuItem value="USDT">USDT (ERC20)</material_1.MenuItem>
                <material_1.MenuItem value="USDC">USDC</material_1.MenuItem>
                <material_1.MenuItem value="BNB">BNB</material_1.MenuItem>
                <material_1.MenuItem value="Solana">Solana (SOL)</material_1.MenuItem>
              </material_1.TextField>
            </material_1.Grid>
            
            {/* ✅ FIXED: Grid v2 syntax */}
            <material_1.Grid size={{ xs: 12 }}>
              <material_1.TextField fullWidth label="Wallet Address" name="destination_details.crypto_address" value={formData.destination_details.crypto_address || ''} onChange={handleChange} required multiline rows={2} placeholder="Enter the full wallet address"/>
            </material_1.Grid>
          </>);
            default:
                return null;
        }
    };
    return (<material_1.Container maxWidth="lg" className={Transfer_module_css_1.default.container}>
      {/* KYC Modal */}
      <KycModal open={kycOpen} payload={kycPayload} onClose={function () { setKycOpen(false); setKycPayload(null); }} onConfirm={handleKycConfirm}/>

      <material_1.Box mb={4}>
        <material_1.Button startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard'); }} className={Transfer_module_css_1.default.backButton}>
          Back to Dashboard
        </material_1.Button>
        <material_1.Typography variant="h4" component="h1" gutterBottom>
          Send Money
        </material_1.Typography>
        <material_1.Typography color="textSecondary">
          Transfer funds to bank accounts, mobile wallets, or cryptocurrency addresses
        </material_1.Typography>
      </material_1.Box>

      {/* KYC Banner */}
      {showKycBanner && kycStatus !== 'verified' && (<material_1.Paper elevation={2} sx={{
                mb: 3,
                p: 2.5,
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                borderRadius: 2,
            }}>
          <material_1.Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <material_1.Box display="flex" alignItems="flex-start" gap={2} flex={1}>
              <material_1.Box sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 0.5,
            }}>
                <icons_material_1.Warning sx={{ color: '#fbbf24', fontSize: 20 }}/>
              </material_1.Box>
              <material_1.Box flex={1}>
                <material_1.Typography variant="subtitle1" sx={{ color: '#1e293b', fontWeight: 600, mb: 0.5 }}>
                  Verification Required
                </material_1.Typography>
                <material_1.Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
                  Complete KYC verification to unlock unlimited transfers and higher limits.
                  Transfers over $1,500 require verified identity.
                </material_1.Typography>
                <material_1.Box display="flex" gap={1.5}>
                  <material_1.Button variant="contained" size="small" onClick={handleStartKYC} startIcon={<icons_material_1.VerifiedUser />} sx={{
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                textTransform: 'none',
                fontWeight: 600,
            }}>
                    Start Verification
                  </material_1.Button>
                  <material_1.Button variant="outlined" size="small" onClick={function () { return setShowKycBanner(false); }} sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#64748b' }}>
                    Remind Later
                  </material_1.Button>
                </material_1.Box>
              </material_1.Box>
            </material_1.Box>
            <material_1.IconButton size="small" onClick={function () { return setShowKycBanner(false); }} sx={{ color: '#94a3b8' }}>
              <icons_material_1.Close fontSize="small"/>
            </material_1.IconButton>
          </material_1.Box>
        </material_1.Paper>)}

      {/* KYC Verified Badge */}
      {kycStatus === 'verified' && (<material_1.Paper elevation={1} sx={{
                mb: 3,
                p: 2,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 2,
            }}>
          <material_1.Box display="flex" alignItems="center" gap={2}>
            <material_1.Box sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <icons_material_1.CheckCircle sx={{ color: '#10b981', fontSize: 20 }}/>
            </material_1.Box>
            <material_1.Box>
              <material_1.Typography variant="subtitle2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                Identity Verified ✓
              </material_1.Typography>
              <material_1.Typography variant="caption" sx={{ color: '#64748b' }}>
                Your KYC is complete. You can transfer up to $25,000 per transaction.
              </material_1.Typography>
            </material_1.Box>
          </material_1.Box>
        </material_1.Paper>)}

      {/* ✅ FIXED: Grid container with v2 syntax */}
      <material_1.Grid container spacing={4}>
        {/* Balance Card */}
        <material_1.Grid size={{ xs: 12, md: 4 }}>
          <material_1.Card className={Transfer_module_css_1.default.balanceCard} sx={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <material_1.Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(40px, -40px)',
        }}/>
            <material_1.CardContent>
              <material_1.Box display="flex" alignItems="center" gap={2} mb={2}>
                <icons_material_1.AccountBalanceWallet sx={{ color: '#06b6d4', fontSize: 32 }}/>
                <material_1.Typography variant="h6" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
                  Available Balance
                </material_1.Typography>
              </material_1.Box>
              <material_1.Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                ${balance ? balance.balance.toFixed(2) : '0.00'}
              </material_1.Typography>
              <material_1.Typography variant="body2" sx={{ color: '#94a3b8' }}>
                {(balance === null || balance === void 0 ? void 0 : balance.currency) || 'USD'}
              </material_1.Typography>
              
              {/* KYC Limit Info */}
              <material_1.Box mt={3} pt={2} borderTop="1px solid #334155">
                <material_1.Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.5 }}>
                  Transfer Limits
                </material_1.Typography>
                <material_1.Box display="flex" justifyContent="space-between">
                  <material_1.Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                    Per Transaction:
                  </material_1.Typography>
                  <material_1.Typography variant="caption" sx={{
            color: kycStatus === 'verified' ? '#10b981' : '#fbbf24',
            fontWeight: 600
        }}>
                    {kycStatus === 'verified' ? '$25,000' : '$1,500'}
                  </material_1.Typography>
                </material_1.Box>
                <material_1.Box display="flex" justifyContent="space-between">
                  <material_1.Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                    Daily Limit:
                  </material_1.Typography>
                  <material_1.Typography variant="caption" sx={{
            color: kycStatus === 'verified' ? '#10b981' : '#fbbf24',
            fontWeight: 600
        }}>
                    {kycStatus === 'verified' ? '$100,000' : '$5,000'}
                </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>

        {/* Transfer Form */}
        <material_1.Grid size={{ xs: 12, md: 8 }}>
          <material_1.Paper className={Transfer_module_css_1.default.paper} sx={{
            background: 'white',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
        }}>
            {/* Form header with KYC indicator */}
            <material_1.Box sx={{
            p: 2.5,
            borderBottom: '1px solid #e2e8f0',
            background: kycStatus === 'verified'
                ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.05), transparent)'
                : 'linear-gradient(90deg, rgba(251, 191, 36, 0.05), transparent)',
        }}>
              <material_1.Box display="flex" alignItems="center" justifyContent="space-between">
                <material_1.Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
                  Transfer Details
                </material_1.Typography>
                <material_1.Chip icon={kycStatus === 'verified' ? <icons_material_1.CheckCircle /> : <icons_material_1.Warning />} label={kycStatus === 'verified' ? 'KYC Verified' : 'KYC Required'} size="small" color={kycStatus === 'verified' ? 'success' : 'warning'} variant="outlined"/>
              </material_1.Box>
            </material_1.Box>

            <material_1.Box sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                {error && (<material_1.Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </material_1.Alert>)}
                
                {success && (<material_1.Alert severity="success" sx={{ mb: 3 }}>
                    {success}
                  </material_1.Alert>)}

                {/* ✅ FIXED: Inner Grid container with v2 syntax */}
                <material_1.Grid container spacing={3}>
                  {/* Amount */}
                  <material_1.Grid size={{ xs: 12 }}>
                    <material_1.TextField fullWidth label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required InputProps={{
            startAdornment: (<material_1.Typography color="textSecondary" sx={{ mr: 1 }}>
                            $
                          </material_1.Typography>),
        }} helperText={kycStatus !== 'verified' && formData.amount
            ? "Amounts over $1,500 require KYC verification"
            : "Available: $".concat(balance ? balance.balance.toFixed(2) : '0.00')}/>
                  </material_1.Grid>

                  {/* Recipient Name */}
                  <material_1.Grid size={{ xs: 12 }}>
                    <material_1.TextField fullWidth label="Recipient Name" name="recipient_name" value={formData.recipient_name} onChange={handleChange} required placeholder="Full name of the recipient"/>
                  </material_1.Grid>

                  {/* Destination Type */}
                  <material_1.Grid size={{ xs: 12 }}>
                    <material_1.Typography variant="subtitle1" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                      Destination Type
                    </material_1.Typography>
                    <material_1.Box display="flex" gap={2} mb={2}>
                      <material_1.Button variant={formData.destination_type === 'bank' ? 'contained' : 'outlined'} onClick={function () { return handleDestinationTypeChange('bank'); }} sx={{ textTransform: 'none' }}>
                        Bank Account
                      </material_1.Button>
                      <material_1.Button variant={formData.destination_type === 'mobile_wallet' ? 'contained' : 'outlined'} onClick={function () { return handleDestinationTypeChange('mobile_wallet'); }} sx={{ textTransform: 'none' }}>
                        Mobile Wallet
                      </material_1.Button>
                      <material_1.Button variant={formData.destination_type === 'crypto' ? 'contained' : 'outlined'} onClick={function () { return handleDestinationTypeChange('crypto'); }} sx={{ textTransform: 'none' }}>
                        Cryptocurrency
                      </material_1.Button>
                    </material_1.Box>
                  </material_1.Grid>

                  {/* Dynamic Destination Fields */}
                  {renderDestinationFields()}

                  {/* Narration */}
                  <material_1.Grid size={{ xs: 12 }}>
                    <material_1.TextField fullWidth label="Narration (Optional)" name="narration" value={formData.narration} onChange={handleChange} multiline rows={2} placeholder="Add a note about this transfer"/>
                  </material_1.Grid>

                  {/* Submit Button */}
                  <material_1.Grid size={{ xs: 12 }}>
                    <material_1.Box display="flex" justifyContent="flex-end" gap={2}>
                      <material_1.Button variant="outlined" onClick={function () { return navigate('/dashboard'); }} disabled={loading} sx={{ textTransform: 'none' }}>
                        Cancel
                      </material_1.Button>
                      <material_1.Button type="submit" variant="contained" color="primary" size="large" startIcon={loading ? <material_1.CircularProgress size={20}/> : <icons_material_1.Send />} disabled={loading} sx={{
            textTransform: 'none',
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
            minWidth: 160,
            fontWeight: 600,
            '&:hover': {
                background: 'linear-gradient(90deg, #0891b2, #7c3aed)',
            },
        }}>
                        {loading ? 'Processing...' : 'Submit Transfer'}
                      </material_1.Button>
                    </material_1.Box>
                  </material_1.Grid>
                </material_1.Grid>
              </form>
            </material_1.Box>
          </material_1.Paper>

          {/* REMOVED INFO BOX - As requested */}
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Container>);
};
exports.default = Transfer;
