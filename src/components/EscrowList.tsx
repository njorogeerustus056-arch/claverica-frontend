import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, ChevronRight, TrendingUp, Search, ChevronLeft } from "lucide-react";

// ✅ Match backend response structure exactly
interface Escrow {
  id: number;
  receiver_name: string;
  amount: number;
  description: string;
  created_at: string;
  status: string;
  progress?: number;
}

interface PaginationData {
  total: number;
  pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

interface EscrowListResponse {
  escrows: Escrow[];
  pagination: PaginationData;
}

export default function EscrowList() {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const pageSize = 10;

  useEffect(() => {
    fetchEscrows();
  }, [currentPage, filterStatus]); // Refetch when page or filter changes

  async function fetchEscrows() {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      setError("User not authenticated. Please login again.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Build query parameters correctly
      const params = new URLSearchParams({
        user_id: userId,
        page: currentPage.toString(),
        page_size: pageSize.toString(),
      });

      // Add status filter if not "all"
      if (filterStatus !== "all") {
        params.append("status", filterStatus);
      }

      const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/escrow/list/?${params.toString()}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // ✅ Handle paginated response correctly
      const data: EscrowListResponse = await res.json();
      setEscrows(data.escrows);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message);
      console.error("Escrow fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <Clock className="w-3.5 h-3.5" />,
        label: "In Progress",
      },
      pending: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <AlertCircle className="w-3.5 h-3.5" />,
        label: "Pending",
      },
      completed: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        label: "Completed",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  // ✅ Client-side search filter (search happens after fetching)
  const filteredEscrows = escrows.filter((escrow) => {
    const matchesSearch =
      escrow.receiver_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escrow.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalInEscrow = escrows.reduce((sum, e) => sum + e.amount, 0);
  const activeCount = escrows.filter((e) => e.status === "active").length;
  const completedCount = escrows.filter((e) => e.status === "completed").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your escrows...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Something went wrong</h3>
          <p className="text-slate-600 text-center mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchEscrows();
            }}
            className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold hover:bg-slate-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalInEscrow.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">
              {pagination ? `Showing ${escrows.length} of ${pagination.total}` : `${escrows.length} accounts`}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Active</span>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{activeCount}</p>
            <p className="text-xs text-slate-500 mt-2">In progress</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Completed</span>
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{completedCount}</p>
            <p className="text-xs text-slate-500 mt-2">Successful transfers</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // Reset to page 1 when filter changes
            }}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Escrow List */}
        <div className="space-y-3">
          {filteredEscrows.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No escrows found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredEscrows.map((escrow) => {
              const statusConfig = getStatusConfig(escrow.status);
              const timeAgo = new Date(escrow.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={escrow.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 truncate">{escrow.receiver_name}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm mb-3 line-clamp-1">{escrow.description}</p>

                      {escrow.progress !== undefined && escrow.status === "active" && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                            <span>Progress</span>
                            <span className="font-medium">{escrow.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${escrow.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>ID: #{escrow.id}</span>
                        <span>•</span>
                        <span>{timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">${escrow.amount.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 mt-0.5">USD</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ✅ Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-8 flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!pagination.has_previous}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
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

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.has_next}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
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
    </div>
  );
}











