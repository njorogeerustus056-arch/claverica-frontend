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
exports.default = EscrowList;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function EscrowList() {
    var _a = (0, react_1.useState)([]), escrows = _a[0], setEscrows = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(""), searchQuery = _d[0], setSearchQuery = _d[1];
    var _e = (0, react_1.useState)("all"), filterStatus = _e[0], setFilterStatus = _e[1];
    // âœ… Pagination state
    var _f = (0, react_1.useState)(1), currentPage = _f[0], setCurrentPage = _f[1];
    var _g = (0, react_1.useState)(null), pagination = _g[0], setPagination = _g[1];
    var pageSize = 10;
    (0, react_1.useEffect)(function () {
        fetchEscrows();
    }, [currentPage, filterStatus]); // Refetch when page or filter changes
    function fetchEscrows() {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, params, apiUrl, url, res, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        setError(null);
                        token = localStorage.getItem("token");
                        userId = localStorage.getItem("user_id");
                        if (!token || !userId) {
                            setError("User not authenticated. Please login again.");
                            setLoading(false);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        params = new URLSearchParams({
                            user_id: userId,
                            page: currentPage.toString(),
                            page_size: pageSize.toString(),
                        });
                        // Add status filter if not "all"
                        if (filterStatus !== "all") {
                            params.append("status", filterStatus);
                        }
                        apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL;
                        url = "".concat(apiUrl, "/api/escrow/list/?").concat(params.toString());
                        return [4 /*yield*/, fetch(url, {
                                headers: {
                                    Authorization: "Bearer ".concat(token),
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 2:
                        res = _a.sent();
                        if (!res.ok) {
                            if (res.status === 401) {
                                throw new Error("Session expired. Please login again.");
                            }
                            throw new Error("HTTP error! status: ".concat(res.status));
                        }
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        setEscrows(data.escrows);
                        setPagination(data.pagination);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        setError(err_1.message);
                        console.error("Escrow fetch error:", err_1);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    var getStatusConfig = function (status) {
        var configs = {
            active: {
                color: "bg-blue-50 text-blue-700 border-blue-200",
                icon: <lucide_react_1.Clock className="w-3.5 h-3.5"/>,
                label: "In Progress",
            },
            pending: {
                color: "bg-amber-50 text-amber-700 border-amber-200",
                icon: <lucide_react_1.AlertCircle className="w-3.5 h-3.5"/>,
                label: "Pending",
            },
            completed: {
                color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                icon: <lucide_react_1.CheckCircle2 className="w-3.5 h-3.5"/>,
                label: "Completed",
            },
        };
        return configs[status] || configs.pending;
    };
    // âœ… Client-side search filter (search happens after fetching)
    var filteredEscrows = escrows.filter(function (escrow) {
        var matchesSearch = escrow.receiver_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            escrow.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
    var totalInEscrow = escrows.reduce(function (sum, e) { return sum + e.amount; }, 0);
    var activeCount = escrows.filter(function (e) { return e.status === "active"; }).length;
    var completedCount = escrows.filter(function (e) { return e.status === "completed"; }).length;
    if (loading) {
        return (<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your escrows...</p>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.AlertCircle className="w-8 h-8 text-red-600"/>
          </div>
          <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Something went wrong</h3>
          <p className="text-slate-600 text-center mb-6">{error}</p>
          <button onClick={function () {
                setError(null);
                fetchEscrows();
            }} className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold hover:bg-slate-800 transition-colors">
            Try Again
          </button>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Escrow Accounts</h1>
          <p className="text-slate-600">Manage your secure transactions with confidence</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Total in Escrow</span>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <lucide_react_1.TrendingUp className="w-5 h-5 text-blue-600"/>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalInEscrow.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">
              {pagination ? "Showing ".concat(escrows.length, " of ").concat(pagination.total) : "".concat(escrows.length, " accounts")}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Active</span>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <lucide_react_1.Clock className="w-5 h-5 text-blue-600"/>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{activeCount}</p>
            <p className="text-xs text-slate-500 mt-2">In progress</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Completed</span>
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <lucide_react_1.CheckCircle2 className="w-5 h-5 text-emerald-600"/>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{completedCount}</p>
            <p className="text-xs text-slate-500 mt-2">Successful transfers</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <lucide_react_1.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input type="text" placeholder="Search by name or description..." value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"/>
          </div>
          <select value={filterStatus} onChange={function (e) {
            setFilterStatus(e.target.value);
            setCurrentPage(1); // Reset to page 1 when filter changes
        }} className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 cursor-pointer">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Escrow List */}
        <div className="space-y-3">
          {filteredEscrows.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.Search className="w-8 h-8 text-slate-400"/>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No escrows found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>) : (filteredEscrows.map(function (escrow) {
            var statusConfig = getStatusConfig(escrow.status);
            var timeAgo = new Date(escrow.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
            return (<div key={escrow.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 truncate">{escrow.receiver_name}</h3>
                        <span className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ".concat(statusConfig.color)}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm mb-3 line-clamp-1">{escrow.description}</p>

                      {escrow.progress !== undefined && escrow.status === "active" && (<div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                            <span>Progress</span>
                            <span className="font-medium">{escrow.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" style={{ width: "".concat(escrow.progress, "%") }}/>
                          </div>
                        </div>)}

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>ID: #{escrow.id}</span>
                        <span>â€¢</span>
                        <span>{timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">${escrow.amount.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 mt-0.5">USD</p>
                      </div>
                      <lucide_react_1.ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all"/>
                    </div>
                  </div>
                </div>);
        }))}
        </div>

        {/* âœ… Pagination Controls */}
        {pagination && pagination.pages > 1 && (<div className="mt-8 flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <button onClick={function () { return setCurrentPage(currentPage - 1); }} disabled={!pagination.has_previous} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <lucide_react_1.ChevronLeft className="w-4 h-4"/>
              <span className="font-medium">Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                Page {pagination.current_page} of {pagination.pages}
              </span>
              <span className="text-xs text-slate-400">
                ({pagination.total} total)
              </span>
            </div>

            <button onClick={function () { return setCurrentPage(currentPage + 1); }} disabled={!pagination.has_next} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span className="font-medium">Next</span>
              <lucide_react_1.ChevronRight className="w-4 h-4"/>
            </button>
          </div>)}

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <lucide_react_1.CheckCircle2 className="w-6 h-6 text-white"/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Protected Transactions</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Your funds are held securely until both parties confirm completion. Bank-level security ensures every transaction is protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);
}

