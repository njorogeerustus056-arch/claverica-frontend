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
var transfer_api_1 = require("../../services/transfer-api");
var Transfer_module_css_1 = require("./Transfer.module.css");
var TransferStatusPage = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var transferId = parseInt(id || '0');
    var _a = (0, react_1.useState)(null), transfer = _a[0], setTransfer = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(true), autoRefresh = _c[0], setAutoRefresh = _c[1];
    // Simplified status config - Only actual backend statuses
    var statusConfig = {
        pending: { color: 'warning', icon: <icons_material_1.AccessTime />, label: 'Awaiting Processing', progress: 25 },
        tac_sent: { color: 'info', icon: <icons_material_1.CheckCircle />, label: 'TAC Sent', progress: 50 }, // ✅ ADDED THIS LINE
        tac_verified: { color: 'success', icon: <icons_material_1.CheckCircle />, label: 'TAC Verified', progress: 60 },
        funds_deducted: { color: 'success', icon: <icons_material_1.AccountBalanceWallet />, label: 'Funds Deducted', progress: 70 },
        pending_settlement: { color: 'info', icon: <icons_material_1.Schedule />, label: 'Pending Settlement', progress: 80 },
        completed: { color: 'success', icon: <icons_material_1.DoneAll />, label: 'Completed', progress: 100 },
        failed: { color: 'error', icon: <icons_material_1.Error />, label: 'Failed', progress: 100 },
        cancelled: { color: 'error', icon: <icons_material_1.Error />, label: 'Cancelled', progress: 100 },
    };
    // Fetch transfer details
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
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching transfer:', error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Initial fetch
    (0, react_1.useEffect)(function () {
        if (transferId) {
            fetchTransfer();
        }
    }, [transferId]);
    // Manual refresh for pending statuses
    (0, react_1.useEffect)(function () {
        if (!autoRefresh || !transferId || !transfer)
            return;
        var intervalId = setInterval(function () {
            if (['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status)) {
                fetchTransfer();
            }
        }, 30000); // Reduced to 30 seconds (optional)
        return function () { return clearInterval(intervalId); };
    }, [autoRefresh, transferId, transfer]);
    // Format date
    var formatDate = function (dateString) {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    // Get status color and icon
    var getStatusInfo = function (status) {
        return statusConfig[status] || { color: 'default', icon: <icons_material_1.Pending />, label: status, progress: 0 };
    };
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
    var statusInfo = getStatusInfo(transfer.status);
    return (<material_1.Container maxWidth="lg" className={Transfer_module_css_1.default.container}>
      <material_1.Box mb={4}>
        <material_1.Button startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard/transfer'); }} className={Transfer_module_css_1.default.backButton}>
          Back to Transfer
        </material_1.Button>
        <material_1.Typography variant="h4" component="h1" gutterBottom>
          Transfer Status
        </material_1.Typography>
        <material_1.Typography color="textSecondary">
          Track the progress of your transfer #{transfer.reference}
        </material_1.Typography>
      </material_1.Box>

      <material_1.Grid container spacing={3}>
        {/* Status Overview Card */}
        <material_1.Grid item xs={12}>
          <material_1.Paper className={Transfer_module_css_1.default.paper}>
            <material_1.Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <material_1.Box display="flex" alignItems="center">
                {statusInfo.icon}
                <material_1.Box ml={2}>
                  <material_1.Typography variant="h5">
                    ${parseFloat(transfer.amount).toFixed(2)}
                  </material_1.Typography>
                  <material_1.Typography variant="body2" color="textSecondary">
                    To: {transfer.recipient_name}
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
              <material_1.Box display="flex" alignItems="center" gap={2}>
                <material_1.Chip label={statusInfo.label} color={statusInfo.color} icon={statusInfo.icon} variant="outlined" size="medium"/>
                {['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status) && (<material_1.Button size="small" variant="outlined" onClick={function () { return setAutoRefresh(!autoRefresh); }}>
                    {autoRefresh ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
                  </material_1.Button>)}
              </material_1.Box>
            </material_1.Box>

            {/* Progress Bar */}
            <material_1.Box mb={4}>
              <material_1.Typography variant="subtitle2" gutterBottom>
                Transfer Progress
              </material_1.Typography>
              <material_1.LinearProgress variant="determinate" value={statusInfo.progress} sx={{
            height: 10,
            borderRadius: 5,
            mb: 2,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
                borderRadius: 5,
            }
        }}/>
              <material_1.Box display="flex" justifyContent="space-between">
                <material_1.Typography variant="caption" color="textSecondary">
                  Submitted
                </material_1.Typography>
                <material_1.Typography variant="caption" color="textSecondary">
                  TAC Sent
                </material_1.Typography>
                <material_1.Typography variant="caption" color="textSecondary">
                  Funds Deducted
                </material_1.Typography>
                <material_1.Typography variant="caption" color="textSecondary">
                  Settled
                </material_1.Typography>
                <material_1.Typography variant="caption" color="textSecondary">
                  Completed
                </material_1.Typography>
              </material_1.Box>
            </material_1.Box>

            {/* Status Message */}
            <material_1.Alert severity={transfer.status === 'completed' ? 'success' :
            transfer.status === 'failed' || transfer.status === 'cancelled' ? 'error' :
                transfer.status === 'pending_settlement' || transfer.status === 'tac_sent' ? 'info' : 'warning'} sx={{ mb: 3 }}>
              <material_1.Typography variant="body2">
                {getStatusMessage(transfer.status)}
              </material_1.Typography>
            </material_1.Alert>

            {/* Refresh Controls */}
            {['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status) && (<material_1.Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <material_1.Typography variant="body2" color="textSecondary">
                  {autoRefresh ? '🔄 Auto-refreshing every 30 seconds' : '⏸️ Manual refresh only'}
                </material_1.Typography>
                <material_1.Box display="flex" gap={1}>
                  <material_1.Button variant="outlined" size="small" onClick={fetchTransfer} disabled={loading}>
                    Refresh Now
                  </material_1.Button>
                </material_1.Box>
              </material_1.Box>)}
          </material_1.Paper>
        </material_1.Grid>

        {/* Transfer Details */}
        <material_1.Grid item xs={12} md={6}>
          <material_1.Paper className={Transfer_module_css_1.default.paper}>
            <material_1.Typography variant="h6" gutterBottom>
              Transfer Details
            </material_1.Typography>
            <material_1.Divider sx={{ mb: 2 }}/>
            
            <material_1.List dense>
              <material_1.ListItem>
                <material_1.ListItemIcon>
                  <icons_material_1.AccountBalanceWallet />
                </material_1.ListItemIcon>
                <material_1.ListItemText primary="Amount" secondary={"$".concat(parseFloat(transfer.amount).toFixed(2))}/>
              </material_1.ListItem>
              
              <material_1.ListItem>
                <material_1.ListItemIcon>
                  <icons_material_1.Schedule />
                </material_1.ListItemIcon>
                <material_1.ListItemText primary="Recipient" secondary={transfer.recipient_name}/>
              </material_1.ListItem>
              
              <material_1.ListItem>
                <material_1.ListItemText primary="Destination Type" secondary={transfer.destination_type.toUpperCase()}/>
              </material_1.ListItem>
              
              {transfer.destination_type === 'bank' && (<>
                  <material_1.ListItem>
                    <material_1.ListItemText primary="Bank Name" secondary={transfer.destination_details.bank_name}/>
                  </material_1.ListItem>
                  <material_1.ListItem>
                    <material_1.ListItemText primary="Account Number" secondary={transfer.destination_details.account_number}/>
                  </material_1.ListItem>
                </>)}
              
              {transfer.destination_type === 'mobile_wallet' && (<>
                  <material_1.ListItem>
                    <material_1.ListItemText primary="Provider" secondary={transfer.destination_details.mobile_provider}/>
                  </material_1.ListItem>
                  <material_1.ListItem>
                    <material_1.ListItemText primary="Mobile Number" secondary={transfer.destination_details.mobile_number}/>
                  </material_1.ListItem>
                </>)}
              
              {transfer.destination_type === 'crypto' && (<>
                  <material_1.ListItem>
                    <material_1.ListItemText primary="Cryptocurrency" secondary={transfer.destination_details.crypto_type}/>
                  </material_1.ListItem>
                  <material_1.ListItem>
                    <material_1.ListItemText primary="Wallet Address" secondary={<material_1.Typography variant="body2" fontFamily="monospace" fontSize="12px">
                          {transfer.destination_details.crypto_address}
                        </material_1.Typography>}/>
                  </material_1.ListItem>
                </>)}
              
              <material_1.ListItem>
                <material_1.ListItemText primary="Narration" secondary={transfer.narration || 'No description provided'}/>
              </material_1.ListItem>
              
              <material_1.ListItem>
                <material_1.ListItemText primary="Created" secondary={formatDate(transfer.created_at)}/>
              </material_1.ListItem>
              
              <material_1.ListItem>
                <material_1.ListItemText primary="Last Updated" secondary={formatDate(transfer.updated_at)}/>
              </material_1.ListItem>
            </material_1.List>
          </material_1.Paper>
        </material_1.Grid>

        {/* Status Information */}
        <material_1.Grid item xs={12} md={6}>
          <material_1.Paper className={Transfer_module_css_1.default.paper}>
            <material_1.Typography variant="h6" gutterBottom>
              Status Information
            </material_1.Typography>
            <material_1.Divider sx={{ mb: 2 }}/>
            
            <material_1.Card variant="outlined" sx={{ mb: 3 }}>
              <material_1.CardContent>
                <material_1.Typography variant="subtitle2" gutterBottom color="primary">
                  {statusInfo.label}
                </material_1.Typography>
                <material_1.Typography variant="body2" color="textSecondary">
                  {getStatusMessage(transfer.status)}
                </material_1.Typography>
              </material_1.CardContent>
            </material_1.Card>

            {/* Next Steps */}
            <material_1.Typography variant="subtitle2" gutterBottom color="primary">
              Next Steps
            </material_1.Typography>
            <material_1.Typography variant="body2" color="textSecondary" paragraph>
              {getNextSteps(transfer.status)}
            </material_1.Typography>

            {/* Action Buttons */}
            {/* ✅ FIXED: Show button for both 'pending' AND 'tac_sent' statuses */}
            {(transfer.status === 'pending' || transfer.status === 'tac_sent') && (<material_1.Box mt={3}>
                <material_1.Button variant="contained" fullWidth onClick={function () { return navigate("/dashboard/transfer/verify-tac/".concat(transferId)); }} startIcon={<icons_material_1.CheckCircle />}>
                  Enter TAC Code
                </material_1.Button>
                <material_1.Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Contact live agent for TAC code
                </material_1.Typography>
              </material_1.Box>)}

            {/* External Reference */}
            {transfer.external_reference && (<material_1.Box mt={3}>
                <material_1.Typography variant="subtitle2" gutterBottom color="primary">
                  External Reference
                </material_1.Typography>
                <material_1.Typography variant="body2" fontFamily="monospace" color="textSecondary">
                  {transfer.external_reference}
                </material_1.Typography>
              </material_1.Box>)}

            {/* Balance Information */}
            {(transfer.balance_before && transfer.balance_after) && (<material_1.Box mt={3}>
                <material_1.Typography variant="subtitle2" gutterBottom color="primary">
                  Balance Impact
                </material_1.Typography>
                <material_1.Grid container spacing={1}>
                  <material_1.Grid item xs={6}>
                    <material_1.Typography variant="caption" color="textSecondary">
                      Before:
                    </material_1.Typography>
                    <material_1.Typography variant="body2">
                      ${parseFloat(transfer.balance_before).toFixed(2)}
                    </material_1.Typography>
                  </material_1.Grid>
                  <material_1.Grid item xs={6}>
                    <material_1.Typography variant="caption" color="textSecondary">
                      After:
                    </material_1.Typography>
                    <material_1.Typography variant="body2">
                      ${parseFloat(transfer.balance_after).toFixed(2)}
                    </material_1.Typography>
                  </material_1.Grid>
                </material_1.Grid>
              </material_1.Box>)}
          </material_1.Paper>
        </material_1.Grid>

        {/* Action Buttons */}
        <material_1.Grid item xs={12}>
          <material_1.Paper className={Transfer_module_css_1.default.paper}>
            <material_1.Box display="flex" justifyContent="space-between" alignItems="center">
              <material_1.Typography variant="subtitle2" color="textSecondary">
                Transfer #{transfer.reference}
              </material_1.Typography>
              
              <material_1.Box display="flex" gap={2}>
                <material_1.Button variant="outlined" onClick={function () { return navigate('/dashboard/transfer/history'); }}>
                  View All Transfers
                </material_1.Button>
                
                <material_1.Button variant="contained" onClick={function () { return navigate('/dashboard/transfer'); }}>
                  New Transfer
                </material_1.Button>
              </material_1.Box>
            </material_1.Box>
          </material_1.Paper>
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Container>);
};
// Helper function for status messages
var getStatusMessage = function (status) {
    switch (status) {
        case 'pending':
            return 'Transfer submitted. Contact live agent for TAC code to proceed.';
        case 'tac_sent': // ✅ ADDED
            return 'TAC code has been sent. Enter the code to verify and proceed with the transfer.';
        case 'tac_verified':
            return 'TAC verified successfully. Funds will be deducted from your wallet.';
        case 'funds_deducted':
            return 'Funds deducted from your wallet. Admin will now process the external transfer.';
        case 'pending_settlement':
            return 'Waiting for admin to process external bank transfer. This usually takes 1-2 business days.';
        case 'completed':
            return 'Transfer completed successfully. Funds have been sent to the recipient.';
        case 'failed':
            return 'Transfer failed. Please contact support for assistance.';
        case 'cancelled':
            return 'Transfer cancelled. No funds were deducted from your account.';
        default:
            return 'Processing your transfer...';
    }
};
// Helper function for next steps
var getNextSteps = function (status) {
    switch (status) {
        case 'pending':
            return '1. Contact live agent for TAC code → 2. Enter TAC code → 3. Funds deducted → 4. Admin processes external transfer';
        case 'tac_sent': // ✅ ADDED
            return '1. Enter the TAC code you received → 2. Funds will be deducted → 3. Admin processes external transfer';
        case 'tac_verified':
            return 'Funds have been reserved. Admin will process the external transfer shortly.';
        case 'funds_deducted':
        case 'pending_settlement':
            return 'Admin is processing the external bank transfer. You will receive a notification when completed.';
        case 'completed':
            return 'Transfer completed. The recipient should have received the funds.';
        default:
            return 'Please wait for the process to complete or contact support for assistance.';
    }
};
exports.default = TransferStatusPage;
