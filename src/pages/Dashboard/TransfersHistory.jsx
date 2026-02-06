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
var DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var AdapterDateFns_1 = require("@mui/x-date-pickers/AdapterDateFns");
var transfer_api_1 = require("../../services/transfer-api");
var Transfer_module_css_1 = require("./Transfer.module.css");
var TransfersHistory = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)([]), transfers = _c[0], setTransfers = _c[1]; // ✅ Initialize as empty array
    var _d = (0, react_1.useState)({
        page: 1,
        totalPages: 1,
        totalCount: 0,
    }), pagination = _d[0], setPagination = _d[1];
    // Filters
    var _e = (0, react_1.useState)(''), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = (0, react_1.useState)('all'), statusFilter = _f[0], setStatusFilter = _f[1];
    var _g = (0, react_1.useState)('all'), typeFilter = _g[0], setTypeFilter = _g[1];
    var _h = (0, react_1.useState)(null), dateFrom = _h[0], setDateFrom = _h[1];
    var _j = (0, react_1.useState)(null), dateTo = _j[0], setDateTo = _j[1];
    // Fetch transfers with proper error handling
    var fetchTransfers = function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (page) {
            var history_1, results, count, totalPages, error_1;
            if (page === void 0) { page = 1; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, transfer_api_1.default.getTransfersHistory(page, 20)];
                    case 2:
                        history_1 = _a.sent();
                        results = (history_1 === null || history_1 === void 0 ? void 0 : history_1.results) || (history_1 === null || history_1 === void 0 ? void 0 : history_1.transfers) || (history_1 === null || history_1 === void 0 ? void 0 : history_1.data) || [];
                        count = (history_1 === null || history_1 === void 0 ? void 0 : history_1.count) || results.length || 0;
                        setTransfers(Array.isArray(results) ? results : []);
                        totalPages = Math.ceil(count / 20) || 1;
                        setPagination({
                            page: page,
                            totalPages: totalPages,
                            totalCount: count,
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching transfers:', error_1);
                        setError((error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || 'Failed to load transfer history. Please try again.');
                        setTransfers([]); // ✅ Reset to empty array on error
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Initial fetch
    (0, react_1.useEffect)(function () {
        fetchTransfers();
    }, []);
    // Handle page change
    var handlePageChange = function (event, page) {
        fetchTransfers(page);
    };
    // Get status chip color
    var getStatusColor = function (status) {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'tac_sent': return 'info';
            case 'tac_verified': return 'info';
            case 'pending_settlement': return 'info';
            case 'failed': return 'error';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };
    // Format date
    var formatDate = function (dateString) {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        }
        catch (_a) {
            return 'Invalid Date';
        }
    };
    // Format date with time
    var formatDateTime = function (dateString) {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
        catch (_a) {
            return 'Invalid Date';
        }
    };
    // ✅ SAFE FILTER: Use optional chaining and null check
    var filteredTransfers = (transfers || []).filter(function (transfer) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!transfer)
            return false; // ✅ Skip null/undefined transfers
        // Search filter
        if (searchTerm) {
            var searchLower = searchTerm.toLowerCase();
            var matchesSearch = (((_a = transfer.reference) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '').includes(searchLower) ||
                (((_b = transfer.recipient_name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '').includes(searchLower) ||
                (((_d = (_c = transfer.destination_details) === null || _c === void 0 ? void 0 : _c.bank_name) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '').includes(searchLower) ||
                (((_f = (_e = transfer.destination_details) === null || _e === void 0 ? void 0 : _e.account_number) === null || _f === void 0 ? void 0 : _f.toLowerCase()) || '').includes(searchLower) ||
                (((_h = (_g = transfer.destination_details) === null || _g === void 0 ? void 0 : _g.mobile_number) === null || _h === void 0 ? void 0 : _h.toLowerCase()) || '').includes(searchLower);
            if (!matchesSearch)
                return false;
        }
        // Status filter
        if (statusFilter !== 'all' && transfer.status !== statusFilter) {
            return false;
        }
        // Type filter
        if (typeFilter !== 'all' && transfer.destination_type !== typeFilter) {
            return false;
        }
        // Date filters
        if (dateFrom && transfer.created_at) {
            try {
                var transferDate = new Date(transfer.created_at);
                if (transferDate < dateFrom)
                    return false;
            }
            catch (_j) {
                // Invalid date, skip filtering
            }
        }
        if (dateTo && transfer.created_at) {
            try {
                var transferDate = new Date(transfer.created_at);
                var toDate = new Date(dateTo);
                toDate.setHours(23, 59, 59, 999);
                if (transferDate > toDate)
                    return false;
            }
            catch (_k) {
                // Invalid date, skip filtering
            }
        }
        return true;
    });
    // Export to CSV
    var handleExport = function () {
        var csvContent = __spreadArray([
            ['Reference', 'Date', 'Amount', 'Recipient', 'Type', 'Status', 'Destination Details', 'Narration']
        ], filteredTransfers.map(function (t) {
            var _a, _b, _c, _d, _e, _f;
            return [
                t.reference || 'N/A',
                formatDate(t.created_at),
                "$".concat(parseFloat(t.amount || 0).toFixed(2)),
                t.recipient_name || 'N/A',
                t.destination_type || 'N/A',
                t.status || 'N/A',
                t.destination_type === 'bank'
                    ? "".concat(((_a = t.destination_details) === null || _a === void 0 ? void 0 : _a.bank_name) || 'N/A', " - ").concat(((_b = t.destination_details) === null || _b === void 0 ? void 0 : _b.account_number) || 'N/A')
                    : t.destination_type === 'mobile_wallet'
                        ? "".concat(((_c = t.destination_details) === null || _c === void 0 ? void 0 : _c.mobile_provider) || 'N/A', " - ").concat(((_d = t.destination_details) === null || _d === void 0 ? void 0 : _d.mobile_number) || 'N/A')
                        : (((_f = (_e = t.destination_details) === null || _e === void 0 ? void 0 : _e.crypto_address) === null || _f === void 0 ? void 0 : _f.slice(0, 20)) || 'N/A') + '...',
                t.narration || '',
            ];
        }), true).map(function (row) { return row.join(','); }).join('\n');
        var blob = new Blob([csvContent], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "transfers-".concat(new Date().toISOString().split('T')[0], ".csv");
        a.click();
        window.URL.revokeObjectURL(url);
    };
    // Clear filters
    var clearFilters = function () {
        setSearchTerm('');
        setStatusFilter('all');
        setTypeFilter('all');
        setDateFrom(null);
        setDateTo(null);
    };
    // Calculate stats safely
    var totalAmount = (transfers || []).reduce(function (sum, t) {
        var amount = parseFloat((t === null || t === void 0 ? void 0 : t.amount) || 0);
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    var completedCount = (transfers || []).filter(function (t) { return (t === null || t === void 0 ? void 0 : t.status) === 'completed'; }).length;
    var pendingCount = (transfers || []).filter(function (t) {
        return ['pending', 'tac_sent', 'tac_verified', 'pending_settlement'].includes((t === null || t === void 0 ? void 0 : t.status) || '');
    }).length;
    // Handle error snackbar close
    var handleErrorClose = function () {
        setError(null);
    };
    return (<material_1.Container maxWidth="xl" className={Transfer_module_css_1.default.container}>
      {/* Error Snackbar */}
      <material_1.Snackbar open={!!error} autoHideDuration={6000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <material_1.Alert severity="error" onClose={handleErrorClose} icon={<icons_material_1.ErrorOutline />}>
          {error}
        </material_1.Alert>
      </material_1.Snackbar>

      <material_1.Box mb={4}>
        <material_1.Button startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard'); }} className={Transfer_module_css_1.default.backButton}>
          Back to Dashboard
        </material_1.Button>
        <material_1.Typography variant="h4" component="h1" gutterBottom>
          Transfer History
        </material_1.Typography>
        <material_1.Typography color="textSecondary">
          View and manage all your money transfers
        </material_1.Typography>
      </material_1.Box>

      {/* Filters Section */}
      <material_1.Paper className={Transfer_module_css_1.default.paper} sx={{ mb: 3 }}>
        <material_1.Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <material_1.Typography variant="h6">
            Filters
          </material_1.Typography>
          <material_1.Box display="flex" gap={1}>
            <material_1.Button startIcon={<icons_material_1.Refresh />} onClick={function () { return fetchTransfers(pagination.page); }} size="small" disabled={loading}>
              Refresh
            </material_1.Button>
            <material_1.Button startIcon={<icons_material_1.Download />} onClick={handleExport} size="small" variant="outlined" disabled={filteredTransfers.length === 0}>
              Export CSV
            </material_1.Button>
          </material_1.Box>
        </material_1.Box>

        <material_1.Grid container spacing={2}>
          {/* Search */}
          <material_1.Grid item xs={12} md={3}>
            <material_1.TextField fullWidth placeholder="Search transfers..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} InputProps={{
            startAdornment: (<material_1.InputAdornment position="start">
                    <icons_material_1.Search />
                  </material_1.InputAdornment>),
        }} size="small" disabled={loading}/>
          </material_1.Grid>

          {/* Status Filter */}
          <material_1.Grid item xs={12} md={2}>
            <material_1.FormControl fullWidth size="small" disabled={loading}>
              <material_1.InputLabel>Status</material_1.InputLabel>
              <material_1.Select value={statusFilter} label="Status" onChange={function (e) { return setStatusFilter(e.target.value); }}>
                <material_1.MenuItem value="all">All Status</material_1.MenuItem>
                <material_1.MenuItem value="pending">Pending</material_1.MenuItem>
                <material_1.MenuItem value="tac_sent">TAC Sent</material_1.MenuItem>
                <material_1.MenuItem value="tac_verified">TAC Verified</material_1.MenuItem>
                <material_1.MenuItem value="pending_settlement">Pending Settlement</material_1.MenuItem>
                <material_1.MenuItem value="completed">Completed</material_1.MenuItem>
                <material_1.MenuItem value="failed">Failed</material_1.MenuItem>
                <material_1.MenuItem value="cancelled">Cancelled</material_1.MenuItem>
              </material_1.Select>
            </material_1.FormControl>
          </material_1.Grid>

          {/* Type Filter */}
          <material_1.Grid item xs={12} md={2}>
            <material_1.FormControl fullWidth size="small" disabled={loading}>
              <material_1.InputLabel>Type</material_1.InputLabel>
              <material_1.Select value={typeFilter} label="Type" onChange={function (e) { return setTypeFilter(e.target.value); }}>
                <material_1.MenuItem value="all">All Types</material_1.MenuItem>
                <material_1.MenuItem value="bank">Bank Transfer</material_1.MenuItem>
                <material_1.MenuItem value="mobile_wallet">Mobile Wallet</material_1.MenuItem>
                <material_1.MenuItem value="crypto">Cryptocurrency</material_1.MenuItem>
              </material_1.Select>
            </material_1.FormControl>
          </material_1.Grid>

          {/* Date From */}
          <material_1.Grid item xs={12} md={2}>
            <LocalizationProvider_1.LocalizationProvider dateAdapter={AdapterDateFns_1.AdapterDateFns}>
              <DatePicker_1.DatePicker label="From Date" value={dateFrom} onChange={function (newValue) { return setDateFrom(newValue); }} slotProps={{ textField: { size: 'small', fullWidth: true, disabled: loading } }}/>
            </LocalizationProvider_1.LocalizationProvider>
          </material_1.Grid>

          {/* Date To */}
          <material_1.Grid item xs={12} md={2}>
            <LocalizationProvider_1.LocalizationProvider dateAdapter={AdapterDateFns_1.AdapterDateFns}>
              <DatePicker_1.DatePicker label="To Date" value={dateTo} onChange={function (newValue) { return setDateTo(newValue); }} slotProps={{ textField: { size: 'small', fullWidth: true, disabled: loading } }}/>
            </LocalizationProvider_1.LocalizationProvider>
          </material_1.Grid>

          {/* Clear Filters */}
          <material_1.Grid item xs={12} md={1}>
            <material_1.Button fullWidth variant="outlined" onClick={clearFilters} size="small" disabled={loading}>
              Clear
            </material_1.Button>
          </material_1.Grid>
        </material_1.Grid>
      </material_1.Paper>

      {/* Stats Summary */}
      <material_1.Grid container spacing={3} sx={{ mb: 3 }}>
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Paper className={Transfer_module_css_1.default.statsCard}>
            <material_1.Typography variant="h6" gutterBottom>
              Total Transfers
            </material_1.Typography>
            <material_1.Typography variant="h4">
              {pagination.totalCount}
            </material_1.Typography>
          </material_1.Paper>
        </material_1.Grid>
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Paper className={Transfer_module_css_1.default.statsCard}>
            <material_1.Typography variant="h6" gutterBottom>
              Total Amount
            </material_1.Typography>
            <material_1.Typography variant="h4">
              ${totalAmount.toFixed(2)}
            </material_1.Typography>
          </material_1.Paper>
        </material_1.Grid>
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Paper className={Transfer_module_css_1.default.statsCard}>
            <material_1.Typography variant="h6" gutterBottom>
              Completed
            </material_1.Typography>
            <material_1.Typography variant="h4" color="success.main">
              {completedCount}
            </material_1.Typography>
          </material_1.Paper>
        </material_1.Grid>
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Paper className={Transfer_module_css_1.default.statsCard}>
            <material_1.Typography variant="h6" gutterBottom>
              Pending
            </material_1.Typography>
            <material_1.Typography variant="h4" color="warning.main">
              {pendingCount}
            </material_1.Typography>
          </material_1.Paper>
        </material_1.Grid>
      </material_1.Grid>

      {/* Transfers Table */}
      <material_1.Paper className={Transfer_module_css_1.default.paper}>
        {loading ? (<material_1.Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <material_1.CircularProgress />
          </material_1.Box>) : error ? (<material_1.Box textAlign="center" py={8}>
            <icons_material_1.ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }}/>
            <material_1.Typography variant="h6" color="error" gutterBottom>
              Error Loading Data
            </material_1.Typography>
            <material_1.Typography variant="body2" color="textSecondary" paragraph>
              {error}
            </material_1.Typography>
            <material_1.Button variant="contained" onClick={function () { return fetchTransfers(); }} sx={{ mt: 2 }}>
              Retry
            </material_1.Button>
          </material_1.Box>) : filteredTransfers.length === 0 ? (<material_1.Box textAlign="center" py={8}>
            <material_1.Typography variant="h6" color="textSecondary" gutterBottom>
              No transfers found
            </material_1.Typography>
            <material_1.Typography variant="body2" color="textSecondary" paragraph>
              {(transfers || []).length === 0
                ? "You haven't made any transfers yet."
                : "No transfers match your current filters."}
            </material_1.Typography>
            <material_1.Button variant="contained" onClick={function () { return navigate('/dashboard/transfer'); }} sx={{ mt: 2 }}>
              Make Your First Transfer
            </material_1.Button>
          </material_1.Box>) : (<>
            <material_1.TableContainer>
              <material_1.Table>
                <material_1.TableHead>
                  <material_1.TableRow>
                    <material_1.TableCell>Reference</material_1.TableCell>
                    <material_1.TableCell>Date</material_1.TableCell>
                    <material_1.TableCell>Amount</material_1.TableCell>
                    <material_1.TableCell>Recipient</material_1.TableCell>
                    <material_1.TableCell>Type</material_1.TableCell>
                    <material_1.TableCell>Status</material_1.TableCell>
                    <material_1.TableCell>Details</material_1.TableCell>
                    <material_1.TableCell>Actions</material_1.TableCell>
                  </material_1.TableRow>
                </material_1.TableHead>
                <material_1.TableBody>
                  {filteredTransfers.map(function (transfer) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return (<material_1.TableRow key={transfer.id || transfer.reference} hover>
                      <material_1.TableCell>
                        <material_1.Typography variant="body2" fontFamily="monospace">
                          {transfer.reference || 'N/A'}
                        </material_1.Typography>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Typography variant="body2">
                          {formatDate(transfer.created_at)}
                        </material_1.Typography>
                        <material_1.Typography variant="caption" color="textSecondary">
                          {formatDateTime(transfer.created_at).split(',')[1]}
                        </material_1.Typography>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Typography variant="body1" fontWeight="bold">
                          ${parseFloat(transfer.amount || 0).toFixed(2)}
                        </material_1.Typography>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Typography variant="body2">
                          {transfer.recipient_name || 'N/A'}
                        </material_1.Typography>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Chip label={(transfer.destination_type || 'N/A').toUpperCase()} size="small" variant="outlined"/>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Chip label={(transfer.status || 'N/A').replace('_', ' ').toUpperCase()} color={getStatusColor(transfer.status)} size="small"/>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Typography variant="body2" noWrap sx={{ maxWidth: '200px' }}>
                          {transfer.destination_type === 'bank' &&
                        "".concat(((_a = transfer.destination_details) === null || _a === void 0 ? void 0 : _a.bank_name) || 'N/A', " \u2022\u2022\u2022 ").concat(((_c = (_b = transfer.destination_details) === null || _b === void 0 ? void 0 : _b.account_number) === null || _c === void 0 ? void 0 : _c.slice(-4)) || 'N/A')}
                          {transfer.destination_type === 'mobile_wallet' &&
                        "".concat(((_d = transfer.destination_details) === null || _d === void 0 ? void 0 : _d.mobile_provider) || 'N/A', " \u2022\u2022\u2022 ").concat(((_f = (_e = transfer.destination_details) === null || _e === void 0 ? void 0 : _e.mobile_number) === null || _f === void 0 ? void 0 : _f.slice(-4)) || 'N/A')}
                          {transfer.destination_type === 'crypto' &&
                        "".concat(((_g = transfer.destination_details) === null || _g === void 0 ? void 0 : _g.crypto_type) || 'N/A', " \u2022\u2022\u2022 ").concat(((_j = (_h = transfer.destination_details) === null || _h === void 0 ? void 0 : _h.crypto_address) === null || _j === void 0 ? void 0 : _j.slice(-10)) || 'N/A')}
                        </material_1.Typography>
                      </material_1.TableCell>
                      <material_1.TableCell>
                        <material_1.Tooltip title="View Details">
                          <material_1.IconButton size="small" onClick={function () { return navigate("/dashboard/transfer/status/".concat(transfer.id)); }} disabled={!transfer.id}>
                            <icons_material_1.Visibility fontSize="small"/>
                          </material_1.IconButton>
                        </material_1.Tooltip>
                      </material_1.TableCell>
                    </material_1.TableRow>);
            })}
                </material_1.TableBody>
              </material_1.Table>
            </material_1.TableContainer>

            {/* Pagination */}
            {pagination.totalPages > 1 && (<material_1.Box display="flex" justifyContent="center" mt={3}>
                <material_1.Pagination count={pagination.totalPages} page={pagination.page} onChange={handlePageChange} color="primary" showFirstButton showLastButton disabled={loading}/>
              </material_1.Box>)}
          </>)}
      </material_1.Paper>

      {/* Quick Actions */}
      <material_1.Box mt={3} display="flex" justifyContent="flex-end">
        <material_1.Button variant="contained" onClick={function () { return navigate('/dashboard/transfer'); }} startIcon={<icons_material_1.Download />}>
          New Transfer
        </material_1.Button>
      </material_1.Box>
    </material_1.Container>);
};
exports.default = TransfersHistory;
