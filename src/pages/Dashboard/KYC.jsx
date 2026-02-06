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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var AuthContext_1 = require("../../context/AuthContext");
var KYC = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(null), kycStatus = _b[0], setKycStatus = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    // Fetch KYC status on mount
    (0, react_1.useEffect)(function () {
        fetchKYCStatus();
    }, []);
    var fetchKYCStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/api/kyc/simple-status/', {
                            headers: {
                                'Authorization': "Bearer ".concat(token),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setKycStatus(data);
                    return [3 /*break*/, 5];
                case 4:
                    setError('Failed to fetch KYC status');
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_1 = _a.sent();
                    setError('Network error. Please try again.');
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleStartVerification = function () {
        navigate('/dashboard/kyc/submit');
    };
    var handleCheckRequirements = function () {
        // Navigate to transfer or trigger KYC check
        navigate('/dashboard/transfer');
    };
    var getStatusColor = function (status) {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'warning';
            case 'rejected': return 'error';
            case 'needs_correction': return 'warning';
            case 'under_review': return 'info';
            default: return 'default';
        }
    };
    var getStatusIcon = function (status) {
        switch (status) {
            case 'approved': return <icons_material_1.CheckCircle />;
            case 'pending': return <icons_material_1.HourglassEmpty />;
            case 'rejected': return <icons_material_1.Error />;
            case 'needs_correction': return <icons_material_1.Assignment />;
            case 'under_review': return <icons_material_1.Pending />;
            default: return <icons_material_1.Description />;
        }
    };
    var getStatusMessage = function (status) {
        switch (status) {
            case 'approved': return 'Your identity is verified';
            case 'pending': return 'Your documents are under review';
            case 'rejected': return 'Your verification was rejected';
            case 'needs_correction': return 'Corrections needed in your documents';
            case 'under_review': return 'Your documents are being reviewed';
            case 'no_kyc': return 'No KYC documents submitted';
            default: return 'Status unknown';
        }
    };
    if (loading) {
        return (<material_1.Container maxWidth="md" sx={{ py: 4 }}>
        <material_1.Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <material_1.CircularProgress />
        </material_1.Box>
      </material_1.Container>);
    }
    return (<material_1.Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <material_1.Box mb={4}>
        <material_1.Typography variant="h4" gutterBottom>
          Identity Verification
        </material_1.Typography>
        <material_1.Typography color="textSecondary">
          Verify your identity to unlock full platform features
        </material_1.Typography>
      </material_1.Box>

      {error && (<material_1.Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </material_1.Alert>)}

      <material_1.Grid container spacing={3}>
        {/* Left Column: Status */}
        <material_1.Grid size={{ xs: 12, md: 8 }}>
          <material_1.Card sx={{ mb: 3 }}>
            <material_1.CardContent>
              <material_1.Box display="flex" alignItems="center" mb={2}>
                <icons_material_1.VerifiedUser sx={{ mr: 2, fontSize: 40, color: 'primary.main' }}/>
                <material_1.Box flex={1}>
                  <material_1.Typography variant="h5" gutterBottom>
                    Verification Status
                  </material_1.Typography>
                  
                  {kycStatus ? (<material_1.Box>
                      <material_1.Box display="flex" alignItems="center" mb={2}>
                        <material_1.Chip icon={getStatusIcon(kycStatus.status)} label={kycStatus.status_display || getStatusMessage(kycStatus.status)} color={getStatusColor(kycStatus.status)} sx={{ mr: 2 }}/>
                        {kycStatus.is_approved && (<material_1.Chip icon={<icons_material_1.CheckCircle />} label="Verified" color="success" variant="outlined"/>)}
                      </material_1.Box>

                      {/* Status Details */}
                      {kycStatus.submitted_at && (<material_1.Typography variant="body2" color="textSecondary">
                          Submitted: {new Date(kycStatus.submitted_at).toLocaleDateString()}
                        </material_1.Typography>)}
                      {kycStatus.reviewed_at && (<material_1.Typography variant="body2" color="textSecondary">
                          Reviewed: {new Date(kycStatus.reviewed_at).toLocaleDateString()}
                        </material_1.Typography>)}
                      {kycStatus.rejection_reason && (<material_1.Alert severity="warning" sx={{ mt: 2 }}>
                          <material_1.Typography variant="body2">
                            <strong>Reason:</strong> {kycStatus.rejection_reason}
                          </material_1.Typography>
                        </material_1.Alert>)}
                    </material_1.Box>) : (<material_1.Typography variant="body1" color="textSecondary">
                      No verification documents submitted yet.
                    </material_1.Typography>)}
                </material_1.Box>
              </material_1.Box>

              {/* Action Buttons */}
              <material_1.Box display="flex" gap={2} mt={3}>
                {(!kycStatus || kycStatus.status === 'no_kyc') ? (<material_1.Button variant="contained" startIcon={<icons_material_1.Upload />} onClick={handleStartVerification}>
                    Start Verification
                  </material_1.Button>) : kycStatus.status === 'needs_correction' ? (<material_1.Button variant="contained" startIcon={<icons_material_1.Upload />} onClick={handleStartVerification}>
                    Resubmit Documents
                  </material_1.Button>) : kycStatus.status === 'rejected' ? (<material_1.Button variant="contained" startIcon={<icons_material_1.Upload />} onClick={handleStartVerification}>
                    Submit New Documents
                  </material_1.Button>) : null}

                {(kycStatus === null || kycStatus === void 0 ? void 0 : kycStatus.is_approved) ? (<material_1.Button variant="outlined" startIcon={<icons_material_1.CheckCircle />} disabled>
                    Verification Complete
                  </material_1.Button>) : (<material_1.Button variant="outlined" onClick={handleCheckRequirements}>
                    Check Requirements
                  </material_1.Button>)}
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>

          {/* Requirements Card */}
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Typography variant="h6" gutterBottom>
                Verification Requirements
              </material_1.Typography>
              
              <material_1.List>
                <material_1.ListItem>
                  <material_1.ListItemIcon>
                    <icons_material_1.Description color="primary"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Valid Government ID" secondary="National ID, Passport, or Driver's License"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon>
                    <icons_material_1.Assignment color="primary"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Clear Document Photos" secondary="Front and back (if applicable), all text readable"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon>
                    <icons_material_1.HowToReg color="primary"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Selfie with ID" secondary="Photo of you holding your ID"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon>
                    <icons_material_1.Lock color="primary"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Privacy Protected" secondary="Documents are encrypted and securely stored"/>
                </material_1.ListItem>
              </material_1.List>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>

        {/* Right Column: Benefits */}
        <material_1.Grid size={{ xs: 12, md: 4 }}>
          <material_1.Card sx={{ mb: 3 }}>
            <material_1.CardContent>
              <material_1.Typography variant="h6" gutterBottom>
                Benefits of Verification
              </material_1.Typography>
              
              <material_1.List dense>
                <material_1.ListItem>
                  <material_1.ListItemIcon sx={{ minWidth: 36 }}>
                    <icons_material_1.CheckCircle color="success" fontSize="small"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Higher Transfer Limits" secondary="Up to $10,000 per transaction"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon sx={{ minWidth: 36 }}>
                    <icons_material_1.CheckCircle color="success" fontSize="small"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Full Crypto Access" secondary="Buy, sell, and trade cryptocurrencies"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon sx={{ minWidth: 36 }}>
                    <icons_material_1.CheckCircle color="success" fontSize="small"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Loan Eligibility" secondary="Apply for personal and business loans"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon sx={{ minWidth: 36 }}>
                    <icons_material_1.CheckCircle color="success" fontSize="small"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Escrow Services" secondary="Secure transaction protection"/>
                </material_1.ListItem>
                
                <material_1.ListItem>
                  <material_1.ListItemIcon sx={{ minWidth: 36 }}>
                    <icons_material_1.CheckCircle color="success" fontSize="small"/>
                  </material_1.ListItemIcon>
                  <material_1.ListItemText primary="Virtual Card" secondary="Get a Claverica virtual debit card"/>
                </material_1.ListItem>
              </material_1.List>
            </material_1.CardContent>
          </material_1.Card>

          {/* Quick Actions */}
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Typography variant="h6" gutterBottom>
                Quick Actions
              </material_1.Typography>
              
              <material_1.Box display="flex" flexDirection="column" gap={2}>
                <material_1.Button variant="outlined" fullWidth startIcon={<icons_material_1.Upload />} onClick={handleStartVerification}>
                  {(kycStatus === null || kycStatus === void 0 ? void 0 : kycStatus.status) === 'no_kyc' ? 'Start Verification' : 'Update Documents'}
                </material_1.Button>
                
                <material_1.Button variant="outlined" fullWidth startIcon={<icons_material_1.Description />} onClick={function () { return navigate('/dashboard/compliance'); }}>
                  View Compliance
                </material_1.Button>
                
                <material_1.Button variant="outlined" fullWidth startIcon={<icons_material_1.ArrowForward />} onClick={function () { return navigate('/dashboard/transfer'); }}>
                  Make a Transfer
                </material_1.Button>
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
      </material_1.Grid>

      {/* Processing Time Info */}
      <material_1.Alert severity="info" sx={{ mt: 3 }}>
        <material_1.Typography variant="body2">
          <strong>Processing Time:</strong> 24-48 hours during business days. 
          You'll receive an email notification when your verification is complete.
        </material_1.Typography>
      </material_1.Alert>
    </material_1.Container>);
};
exports.default = KYC;
