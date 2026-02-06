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
exports.RecentOrders = RecentOrders;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
function RecentOrders(_a) {
    var _this = this;
    var transactions = _a.transactions, _b = _a.walletCurrency, walletCurrency = _b === void 0 ? "USD" : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
    var _d = (0, react_1.useState)('all'), activeFilter = _d[0], setActiveFilter = _d[1];
    var _e = (0, react_1.useState)('newest'), sortBy = _e[0], setSortBy = _e[1];
    var _f = (0, react_1.useState)(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = (0, react_1.useState)(null), expandedId = _g[0], setExpandedId = _g[1];
    // Extract sender/recipient from description (Wise style)
    var extractParties = function (description) {
        var _a, _b;
        var desc = description.toLowerCase();
        if (desc.includes('from')) {
            var parts = description.split('from');
            return { from: ((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.trim()) || 'Unknown', to: 'You' };
        }
        if (desc.includes('to')) {
            var parts = description.split('to');
            return { from: 'You', to: ((_b = parts[1]) === null || _b === void 0 ? void 0 : _b.trim()) || 'Unknown' };
        }
        return { from: 'System', to: 'Your Account' };
    };
    // Categorize transactions (Revolut style)
    var getTransactionCategory = function (description, type) {
        var desc = description.toLowerCase();
        if (desc.includes('crypto') || desc.includes('btc') || desc.includes('eth') || desc.includes('xrp')) {
            return {
                name: 'Crypto',
                icon: lucide_react_1.Bitcoin,
                color: 'bg-amber-500',
                bgColor: 'bg-amber-50',
                textColor: 'text-amber-700'
            };
        }
        if (desc.includes('transfer') || desc.includes('send') || desc.includes('receive')) {
            return {
                name: 'Transfer',
                icon: lucide_react_1.ArrowUpRight,
                color: 'bg-blue-500',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-700'
            };
        }
        if (desc.includes('card') || desc.includes('payment') || desc.includes('purchase')) {
            return {
                name: 'Card Payment',
                icon: lucide_react_1.CreditCard,
                color: 'bg-purple-500',
                bgColor: 'bg-purple-50',
                textColor: 'text-purple-700'
            };
        }
        if (desc.includes('deposit') || desc.includes('top-up') || desc.includes('add funds')) {
            return {
                name: 'Deposit',
                icon: lucide_react_1.Wallet,
                color: 'bg-emerald-500',
                bgColor: 'bg-emerald-50',
                textColor: 'text-emerald-700'
            };
        }
        if (desc.includes('withdraw') || desc.includes('cash out')) {
            return {
                name: 'Withdrawal',
                icon: lucide_react_1.Download,
                color: 'bg-rose-500',
                bgColor: 'bg-rose-50',
                textColor: 'text-rose-700'
            };
        }
        return {
            name: type === 'credit' ? 'Income' : 'Expense',
            icon: type === 'credit' ? lucide_react_1.TrendingUp : lucide_react_1.ArrowDownRight,
            color: type === 'credit' ? 'bg-green-500' : 'bg-red-500',
            bgColor: type === 'credit' ? 'bg-green-50' : 'bg-red-50',
            textColor: type === 'credit' ? 'text-green-700' : 'text-red-700'
        };
    };
    // Smart date formatting (Binance style)
    var formatSmartDate = function (dateString) {
        var date = new Date(dateString);
        var now = new Date();
        var diffMs = now.getTime() - date.getTime();
        var diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        var diffDays = Math.floor(diffHours / 24);
        if (diffHours < 1) {
            var diffMinutes = Math.floor(diffMs / (1000 * 60));
            return "".concat(diffMinutes, "m ago");
        }
        if (diffHours < 24) {
            return "".concat(diffHours, "h ago");
        }
        if (diffDays === 1) {
            return "Yesterday, ".concat(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        if (diffDays < 7) {
            return "".concat(diffDays, "d ago");
        }
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };
    // Format amount with proper spacing (Wise style)
    var formatAmount = function (amount, type) {
        var sign = type === "credit" ? "+" : "-";
        var absAmount = Math.abs(amount);
        // Color intensity based on amount
        var amountClass = absAmount > 1000
            ? 'font-bold'
            : absAmount > 500
                ? 'font-semibold'
                : 'font-medium';
        return (<div className={"text-right ".concat(type === 'credit' ? 'text-green-600' : 'text-red-600')}>
        <div className={"text-lg ".concat(amountClass)}>
          {sign}{walletCurrency} {absAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {type === 'credit' ? 'Received' : 'Sent'}
        </div>
      </div>);
    };
    // Get status info with better styling
    var getStatusInfo = function (status) {
        switch (status) {
            case "completed":
                return {
                    icon: lucide_react_1.CheckCircle,
                    color: "text-emerald-600",
                    bgColor: "bg-emerald-50",
                    borderColor: "border-emerald-200",
                    label: "Completed",
                    description: "Successfully processed"
                };
            case "pending":
                return {
                    icon: lucide_react_1.Clock,
                    color: "text-amber-600",
                    bgColor: "bg-amber-50",
                    borderColor: "border-amber-200",
                    label: "Processing",
                    description: "Will complete shortly"
                };
            case "failed":
                return {
                    icon: lucide_react_1.XCircle,
                    color: "text-rose-600",
                    bgColor: "bg-rose-50",
                    borderColor: "border-rose-200",
                    label: "Failed",
                    description: "Please contact support"
                };
            default:
                return {
                    icon: lucide_react_1.AlertCircle,
                    color: "text-gray-600",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    label: "Unknown",
                    description: "Status unavailable"
                };
        }
    };
    // Filter and sort transactions
    var filteredSortedTransactions = (0, react_1.useMemo)(function () {
        var filtered = __spreadArray([], transactions, true);
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(function (tx) {
                var _a;
                return tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ((_a = tx.reference) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase()));
            });
        }
        // Apply status/type filter
        if (activeFilter !== 'all') {
            if (['completed', 'pending', 'failed'].includes(activeFilter)) {
                filtered = filtered.filter(function (tx) { return tx.status === activeFilter; });
            }
            else if (activeFilter === 'credit') {
                filtered = filtered.filter(function (tx) { return tx.transaction_type === 'credit'; });
            }
            else if (activeFilter === 'debit') {
                filtered = filtered.filter(function (tx) { return tx.transaction_type === 'debit'; });
            }
        }
        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filtered.sort(function (a, b) { return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); });
                break;
            case 'oldest':
                filtered.sort(function (a, b) { return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); });
                break;
            case 'amount-high':
                filtered.sort(function (a, b) { return b.amount - a.amount; });
                break;
            case 'amount-low':
                filtered.sort(function (a, b) { return a.amount - b.amount; });
                break;
        }
        return filtered.slice(0, limit);
    }, [transactions, activeFilter, sortBy, searchQuery, limit]);
    // Calculate summary stats
    var summaryStats = (0, react_1.useMemo)(function () {
        var filtered = filteredSortedTransactions;
        var totalAmount = filtered.reduce(function (sum, tx) { return sum + tx.amount; }, 0);
        var creditCount = filtered.filter(function (tx) { return tx.transaction_type === 'credit'; }).length;
        var debitCount = filtered.filter(function (tx) { return tx.transaction_type === 'debit'; }).length;
        var completedCount = filtered.filter(function (tx) { return tx.status === 'completed'; }).length;
        return {
            totalAmount: totalAmount,
            creditCount: creditCount,
            debitCount: debitCount,
            completedCount: completedCount,
            transactionCount: filtered.length,
            successRate: filtered.length > 0 ? Math.round((completedCount / filtered.length) * 100) : 0
        };
    }, [filteredSortedTransactions]);
    // Copy transaction ID
    var copyToClipboard = function (text) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy:', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Filter options (Revolut style)
    var filterOptions = [
        { value: 'all', label: 'All', count: transactions.length },
        { value: 'completed', label: 'Completed', count: transactions.filter(function (t) { return t.status === 'completed'; }).length },
        { value: 'pending', label: 'Pending', count: transactions.filter(function (t) { return t.status === 'pending'; }).length },
        { value: 'failed', label: 'Failed', count: transactions.filter(function (t) { return t.status === 'failed'; }).length },
        { value: 'credit', label: 'Income', count: transactions.filter(function (t) { return t.transaction_type === 'credit'; }).length },
        { value: 'debit', label: 'Expenses', count: transactions.filter(function (t) { return t.transaction_type === 'debit'; }).length },
    ];
    return (<div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header with stats (Binance style) */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            <p className="text-gray-600 mt-1">Real-time updates from your account</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              <lucide_react_1.Download className="w-4 h-4"/>
              Export
            </button>
            <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <lucide_react_1.MoreVertical className="w-5 h-5 text-gray-600"/>
            </button>
          </div>
        </div>

        {/* Stats summary (Wise style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Volume</div>
            <div className="text-2xl font-bold text-gray-900">
              {walletCurrency} {summaryStats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Transactions</div>
            <div className="text-2xl font-bold text-gray-900">{summaryStats.transactionCount}</div>
            <div className="text-xs text-gray-500 mt-1">{summaryStats.successRate}% success rate</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Income</div>
            <div className="text-2xl font-bold text-emerald-600">{summaryStats.creditCount}</div>
            <div className="text-xs text-gray-500 mt-1">Credits received</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Expenses</div>
            <div className="text-2xl font-bold text-rose-600">{summaryStats.debitCount}</div>
            <div className="text-xs text-gray-500 mt-1">Payments made</div>
          </div>
        </div>

        {/* Filters and search (Revolut style) */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input type="text" placeholder="Search transactions by description or reference..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }}/>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filterOptions.map(function (filter) { return (<button key={filter.value} onClick={function () { return setActiveFilter(filter.value); }} className={"flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ".concat(activeFilter === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50')}>
                <span>{filter.label}</span>
                <span className={"text-xs px-1.5 py-0.5 rounded-full ".concat(activeFilter === filter.value
                ? 'bg-blue-500'
                : 'bg-gray-200 text-gray-700')}>
                  {filter.count}
                </span>
              </button>); })}
          </div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="p-6">
        {filteredSortedTransactions.length > 0 ? (<div className="space-y-3">
            {filteredSortedTransactions.map(function (tx) {
                var statusInfo = getStatusInfo(tx.status);
                var StatusIcon = statusInfo.icon;
                var category = getTransactionCategory(tx.description, tx.transaction_type);
                var CategoryIcon = category.icon;
                var parties = extractParties(tx.description);
                var isExpanded = expandedId === tx.id;
                return (<div key={tx.id} className="group">
                  {/* Main transaction card */}
                  <div className={"bg-white border rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer ".concat(isExpanded ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-gray-300')} onClick={function () { return setExpandedId(isExpanded ? null : tx.id); }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Category icon */}
                        <div className={"p-3 rounded-xl ".concat(category.bgColor, " flex-shrink-0")}>
                          <CategoryIcon className={"w-5 h-5 ".concat(category.textColor)}/>
                        </div>

                        {/* Transaction details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 truncate">
                              {tx.description}
                            </span>
                            <span className={"text-xs px-2 py-1 rounded-full ".concat(category.bgColor, " ").concat(category.textColor)}>
                              {category.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <lucide_react_1.User className="w-3 h-3"/>
                              <span className="truncate">{parties.from} → {parties.to}</span>
                            </div>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <lucide_react_1.Clock className="w-3 h-3"/>
                              {formatSmartDate(tx.created_at)}
                            </span>
                            <span>•</span>
                            <div className={"flex items-center gap-1 ".concat(statusInfo.color)}>
                              <StatusIcon className="w-3 h-3"/>
                              <span>{statusInfo.label}</span>
                            </div>
                          </div>

                          {/* Expanded details */}
                          {isExpanded && (<div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Transaction ID</div>
                                  <div className="flex items-center gap-2">
                                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                      TX-{tx.id.toString().padStart(6, '0')}
                                    </code>
                                    <button onClick={function (e) {
                            e.stopPropagation();
                            copyToClipboard("TX-".concat(tx.id.toString().padStart(6, '0')));
                        }} className="p-1 hover:bg-gray-200 rounded">
                                      <lucide_react_1.Copy className="w-3 h-3 text-gray-500"/>
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Reference</div>
                                  <div className="text-sm font-medium">
                                    {tx.reference || 'N/A'}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">
                                {statusInfo.description}
                              </div>
                              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                <lucide_react_1.Eye className="w-4 h-4"/>
                                View full details
                                <lucide_react_1.ChevronRight className="w-4 h-4"/>
                              </button>
                            </div>)}
                        </div>
                      </div>

                      {/* Amount and action */}
                      <div className="flex flex-col items-end ml-4">
                        {formatAmount(tx.amount, tx.transaction_type)}
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <lucide_react_1.ChevronRight className={"w-5 h-5 text-gray-400 transition-transform ".concat(isExpanded ? 'rotate-90' : '')}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>);
            })}
          </div>) : (<div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <lucide_react_1.BarChart3 className="w-8 h-8 text-gray-400"/>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No matching transactions' : 'No transactions yet'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'Your transaction history will appear here once you start using your account.'}
            </p>
            {searchQuery && (<button onClick={function () {
                    setSearchQuery('');
                    setActiveFilter('all');
                }} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                Clear filters
              </button>)}
          </div>)}

        {/* View more/footer */}
        {filteredSortedTransactions.length > 0 && (<div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredSortedTransactions.length} of {transactions.length} transactions
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              View all transactions
              <lucide_react_1.ExternalLink className="w-4 h-4"/>
            </button>
          </div>)}
      </div>
    </div>);
}
