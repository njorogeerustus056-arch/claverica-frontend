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
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var auth_1 = require("../../lib/store/auth");
var api_1 = require("../../services/api");
var framer_motion_1 = require("framer-motion");
var CardTransactions = function () {
    var user = (0, auth_1.useAuthStore)().user;
    var _a = (0, react_1.useState)([]), transactions = _a[0], setTransactions = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    (0, react_1.useEffect)(function () {
        fetchTransactions();
    }, []);
    var fetchTransactions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, api_1.default.get('/api/transactions/recent/')];
                case 1:
                    response = _c.sent();
                    console.log('Transactions API response:', response.data);
                    setTransactions(response.data.transactions || []);
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _c.sent();
                    console.error('Failed to fetch transactions:', err_1);
                    setError(((_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || err_1.message || 'Failed to load transactions');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var filteredTransactions = transactions.filter(function (tx) {
        return tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.reference.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var formatAmount = function (amount, type) {
        var isCredit = type === 'credit';
        var color = isCredit ? 'success.main' : 'error.main';
        var prefix = isCredit ? '+' : '-';
        var absAmount = Math.abs(amount);
        return (<material_1.Typography variant="body1" fontWeight="bold" color={color}>
        {prefix}${absAmount.toFixed(2)}
      </material_1.Typography>);
    };
    var formatDate = function (dateString) {
        var date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };
    var getCategoryIcon = function (description) {
        var desc = description.toLowerCase();
        if (desc.includes('amazon') || desc.includes('shopping'))
            return <icons_material_1.ShoppingCart />;
        if (desc.includes('starbucks') || desc.includes('coffee'))
            return <icons_material_1.Restaurant />;
        if (desc.includes('uber') || desc.includes('taxi') || desc.includes('flight'))
            return <icons_material_1.Flight />;
        return <icons_material_1.Store />;
    };
    var getCategoryName = function (description) {
        var desc = description.toLowerCase();
        if (desc.includes('amazon') || desc.includes('shopping'))
            return 'Shopping';
        if (desc.includes('starbucks') || desc.includes('coffee') || desc.includes('food'))
            return 'Food & Dining';
        if (desc.includes('uber') || desc.includes('taxi') || desc.includes('transport'))
            return 'Transport';
        if (desc.includes('flight') || desc.includes('hotel') || desc.includes('travel'))
            return 'Travel';
        if (desc.includes('top-up') || desc.includes('transfer') || desc.includes('deposit'))
            return 'Transfer';
        return 'Other';
    };
    var statusColors = {
        completed: 'success',
        pending: 'warning',
        failed: 'error',
        reversed: 'default',
    };
    var totalSpent = transactions
        .filter(function (tx) { return tx.type === 'debit' && tx.status === 'completed'; })
        .reduce(function (sum, tx) { return sum + tx.amount; }, 0);
    var handleExportCSV = function () {
        var headers = ['Date', 'Description', 'Amount', 'Type', 'Status', 'Reference'];
        var csvData = filteredTransactions.map(function (tx) { return [
            formatDate(tx.date),
            tx.description,
            tx.type === 'credit' ? "+$".concat(tx.amount.toFixed(2)) : "-$".concat(tx.amount.toFixed(2)),
            tx.type,
            tx.status,
            tx.reference
        ]; });
        var csvContent = __spreadArray([
            headers.join(',')
        ], csvData.map(function (row) { return row.join(','); }), true).join('\n');
        var blob = new Blob([csvContent], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "transactions-".concat(new Date().toISOString().split('T')[0], ".csv");
        a.click();
        // Show success message
        setSnackbar({
            open: true,
            message: 'CSV exported successfully!',
            severity: 'success',
        });
    };
    var _e = (0, react_1.useState)({ open: false, message: '', severity: 'info' }), snackbar = _e[0], setSnackbar = _e[1];
    if (loading) {
        return (<material_1.Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <material_1.CircularProgress />
      </material_1.Box>);
    }
    return (<material_1.Container maxWidth="lg" sx={{ py: 4 }}>
      <material_1.Box mb={4}>
        <material_1.Typography variant="h4" fontWeight="bold" gutterBottom>
          Card Transactions
        </material_1.Typography>
        <material_1.Typography variant="body1" color="text.secondary">
          View all your transaction history
        </material_1.Typography>
      </material_1.Box>

      {error && (<material_1.Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </material_1.Alert>)}

      <material_1.Grid container spacing={3} mb={4}>
        <material_1.Grid item xs={12} md={4}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Spent
              </material_1.Typography>
              <material_1.Typography variant="h4" color="error.main">
                ${Math.abs(totalSpent).toFixed(2)}
              </material_1.Typography>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
        <material_1.Grid item xs={12} md={4}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Transactions Count
              </material_1.Typography>
              <material_1.Typography variant="h4">{transactions.length}</material_1.Typography>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
        <material_1.Grid item xs={12} md={4}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Recent Activity
              </material_1.Typography>
              <material_1.Typography variant="h4">
                {transactions.filter(function (tx) { return tx.status === 'completed'; }).length}
              </material_1.Typography>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
      </material_1.Grid>

      <material_1.Paper sx={{ mb: 3, p: 2 }}>
        <material_1.Grid container spacing={2} alignItems="center">
          <material_1.Grid item xs={12} md={8}>
            <material_1.TextField fullWidth placeholder="Search by description or reference..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} InputProps={{
            startAdornment: (<material_1.InputAdornment position="start">
                    <icons_material_1.Search />
                  </material_1.InputAdornment>),
        }}/>
          </material_1.Grid>
          <material_1.Grid item xs={12} md={2}>
            <material_1.Button fullWidth variant="outlined" startIcon={<icons_material_1.FilterList />} onClick={function () { return setSearchTerm(''); }}>
              Clear
            </material_1.Button>
          </material_1.Grid>
          <material_1.Grid item xs={12} md={2}>
            <material_1.Button fullWidth variant="outlined" startIcon={<icons_material_1.Refresh />} onClick={fetchTransactions}>
              Refresh
            </material_1.Button>
          </material_1.Grid>
        </material_1.Grid>
      </material_1.Paper>

      {filteredTransactions.length === 0 ? (<material_1.Box textAlign="center" p={4}>
          <icons_material_1.Receipt sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}/>
          <material_1.Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? 'No matching transactions found' : 'No transactions yet'}
          </material_1.Typography>
          <material_1.Typography variant="body2" color="text.secondary" mb={2}>
            {searchTerm ? 'Try a different search term' : 'Your transactions will appear here'}
          </material_1.Typography>
          <material_1.Button variant="outlined" startIcon={<icons_material_1.Refresh />} onClick={fetchTransactions}>
            Refresh
          </material_1.Button>
        </material_1.Box>) : (<material_1.TableContainer component={material_1.Paper}>
          <material_1.Table>
            <material_1.TableHead>
              <material_1.TableRow>
                <material_1.TableCell>Description</material_1.TableCell>
                <material_1.TableCell>Category</material_1.TableCell>
                <material_1.TableCell>Amount</material_1.TableCell>
                <material_1.TableCell>Status</material_1.TableCell>
                <material_1.TableCell>Date</material_1.TableCell>
                <material_1.TableCell>Reference</material_1.TableCell>
              </material_1.TableRow>
            </material_1.TableHead>
            <material_1.TableBody>
              {filteredTransactions.map(function (tx) { return (<framer_motion_1.motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <material_1.TableCell>
                    <material_1.Box display="flex" alignItems="center" gap={2}>
                      <material_1.Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                        {getCategoryIcon(tx.description)}
                      </material_1.Box>
                      <material_1.Box>
                        <material_1.Typography variant="body1" fontWeight="medium">
                          {tx.description}
                        </material_1.Typography>
                      </material_1.Box>
                    </material_1.Box>
                  </material_1.TableCell>
                  <material_1.TableCell>
                    <material_1.Chip label={getCategoryName(tx.description)} size="small" variant="outlined"/>
                  </material_1.TableCell>
                  <material_1.TableCell>
                    {formatAmount(tx.amount, tx.type)}
                  </material_1.TableCell>
                  <material_1.TableCell>
                    <material_1.Chip label={tx.status} size="small" color={statusColors[tx.status]}/>
                  </material_1.TableCell>
                  <material_1.TableCell>
                    <material_1.Typography variant="body2">
                      {formatDate(tx.date)}
                    </material_1.Typography>
                  </material_1.TableCell>
                  <material_1.TableCell>
                    <material_1.Typography variant="body2" fontFamily="monospace">
                      {tx.reference}
                    </material_1.Typography>
                  </material_1.TableCell>
                </framer_motion_1.motion.tr>); })}
            </material_1.TableBody>
          </material_1.Table>
        </material_1.TableContainer>)}

      <material_1.Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <material_1.Typography variant="body2" color="text.secondary">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </material_1.Typography>
        <material_1.Box display="flex" gap={1}>
          <material_1.Button variant="outlined" startIcon={<icons_material_1.Refresh />} onClick={fetchTransactions}>
            Refresh
          </material_1.Button>
          <material_1.Button variant="outlined" startIcon={<icons_material_1.Download />} onClick={handleExportCSV}>
            Export CSV
          </material_1.Button>
        </material_1.Box>
      </material_1.Box>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={function () { return setSnackbar(__assign(__assign({}, snackbar), { open: false })); }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <material_1.Alert onClose={function () { return setSnackbar(__assign(__assign({}, snackbar), { open: false })); }} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </material_1.Alert>
      </Snackbar>
    </material_1.Container>);
};
exports.default = CardTransactions;
