import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  XCircle,
  ExternalLink,
  Filter,
  Search,
  Download,
  MoreVertical,
  Bitcoin,
  CreditCard,
  Building,
  Wallet,
  User,
  ChevronRight,
  Eye,
  Copy,
  AlertCircle,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { useState, useMemo } from "react";

interface RecentOrdersProps {
  transactions: Array<{
    id: number;
    amount: number;
    transaction_type: "credit" | "debit";
    description: string;
    created_at: string;
    status: "completed" | "pending" | "failed";
    reference?: string;
  }>;
  walletCurrency?: string;
  limit?: number;
}

type FilterType = 'all' | 'completed' | 'pending' | 'failed' | 'credit' | 'debit';
type SortType = 'newest' | 'oldest' | 'amount-high' | 'amount-low';

export function RecentOrders({ 
  transactions, 
  walletCurrency = "USD",
  limit = 10 
}: RecentOrdersProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Extract sender/recipient from description (Wise style)
  const extractParties = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('from')) {
      const parts = description.split('from');
      return { from: parts[1]?.trim() || 'Unknown', to: 'You' };
    }
    if (desc.includes('to')) {
      const parts = description.split('to');
      return { from: 'You', to: parts[1]?.trim() || 'Unknown' };
    }
    return { from: 'System', to: 'Your Account' };
  };

  // Categorize transactions (Revolut style)
  const getTransactionCategory = (description: string, type: string) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('crypto') || desc.includes('btc') || desc.includes('eth') || desc.includes('xrp')) {
      return { 
        name: 'Crypto', 
        icon: Bitcoin, 
        color: 'bg-amber-500', 
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700'
      };
    }
    if (desc.includes('transfer') || desc.includes('send') || desc.includes('receive')) {
      return { 
        name: 'Transfer', 
        icon: ArrowUpRight, 
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700'
      };
    }
    if (desc.includes('card') || desc.includes('payment') || desc.includes('purchase')) {
      return { 
        name: 'Card Payment', 
        icon: CreditCard, 
        color: 'bg-purple-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700'
      };
    }
    if (desc.includes('deposit') || desc.includes('top-up') || desc.includes('add funds')) {
      return { 
        name: 'Deposit', 
        icon: Wallet, 
        color: 'bg-emerald-500',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700'
      };
    }
    if (desc.includes('withdraw') || desc.includes('cash out')) {
      return { 
        name: 'Withdrawal', 
        icon: Download, 
        color: 'bg-rose-500',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-700'
      };
    }
    
    return { 
      name: type === 'credit' ? 'Income' : 'Expense', 
      icon: type === 'credit' ? TrendingUp : ArrowDownRight,
      color: type === 'credit' ? 'bg-green-500' : 'bg-red-500',
      bgColor: type === 'credit' ? 'bg-green-50' : 'bg-red-50',
      textColor: type === 'credit' ? 'text-green-700' : 'text-red-700'
    };
  };

  // Smart date formatting (Binance style)
  const formatSmartDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (diffDays < 7) {
      return `${diffDays}d ago`;
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Format amount with proper spacing (Wise style)
  const formatAmount = (amount: number, type: string) => {
    const sign = type === "credit" ? "+" : "-";
    const absAmount = Math.abs(amount);
    
    // Color intensity based on amount
    const amountClass = absAmount > 1000 
      ? 'font-bold' 
      : absAmount > 500 
        ? 'font-semibold' 
        : 'font-medium';

    return (
      <div className={`text-right ${type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
        <div className={`text-lg ${amountClass}`}>
          {sign}{walletCurrency} {absAmount.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {type === 'credit' ? 'Received' : 'Sent'}
        </div>
      </div>
    );
  };

  // Get status info with better styling
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { 
          icon: CheckCircle, 
          color: "text-emerald-600", 
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          label: "Completed",
          description: "Successfully processed"
        };
      case "pending":
        return { 
          icon: Clock, 
          color: "text-amber-600", 
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          label: "Processing",
          description: "Will complete shortly"
        };
      case "failed":
        return { 
          icon: XCircle, 
          color: "text-rose-600", 
          bgColor: "bg-rose-50",
          borderColor: "border-rose-200",
          label: "Failed",
          description: "Please contact support"
        };
      default:
        return { 
          icon: AlertCircle, 
          color: "text-gray-600", 
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Unknown",
          description: "Status unavailable"
        };
    }
  };

  // Filter and sort transactions
  const filteredSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(tx => 
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.reference?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status/type filter
    if (activeFilter !== 'all') {
      if (['completed', 'pending', 'failed'].includes(activeFilter)) {
        filtered = filtered.filter(tx => tx.status === activeFilter);
      } else if (activeFilter === 'credit') {
        filtered = filtered.filter(tx => tx.transaction_type === 'credit');
      } else if (activeFilter === 'debit') {
        filtered = filtered.filter(tx => tx.transaction_type === 'debit');
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'amount-high':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-low':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
    }

    return filtered.slice(0, limit);
  }, [transactions, activeFilter, sortBy, searchQuery, limit]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const filtered = filteredSortedTransactions;
    const totalAmount = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    const creditCount = filtered.filter(tx => tx.transaction_type === 'credit').length;
    const debitCount = filtered.filter(tx => tx.transaction_type === 'debit').length;
    const completedCount = filtered.filter(tx => tx.status === 'completed').length;

    return {
      totalAmount,
      creditCount,
      debitCount,
      completedCount,
      transactionCount: filtered.length,
      successRate: filtered.length > 0 ? Math.round((completedCount / filtered.length) * 100) : 0
    };
  }, [filteredSortedTransactions]);

  // Copy transaction ID
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Filter options (Revolut style)
  const filterOptions: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: transactions.length },
    { value: 'completed', label: 'Completed', count: transactions.filter(t => t.status === 'completed').length },
    { value: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length },
    { value: 'failed', label: 'Failed', count: transactions.filter(t => t.status === 'failed').length },
    { value: 'credit', label: 'Income', count: transactions.filter(t => t.transaction_type === 'credit').length },
    { value: 'debit', label: 'Expenses', count: transactions.filter(t => t.transaction_type === 'debit').length },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header with stats (Binance style) */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            <p className="text-gray-600 mt-1">Real-time updates from your account</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions by description or reference..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === filter.value
                    ? 'bg-blue-500'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="p-6">
        {filteredSortedTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredSortedTransactions.map((tx) => {
              const statusInfo = getStatusInfo(tx.status);
              const StatusIcon = statusInfo.icon;
              const category = getTransactionCategory(tx.description, tx.transaction_type);
              const CategoryIcon = category.icon;
              const parties = extractParties(tx.description);
              const isExpanded = expandedId === tx.id;

              return (
                <div key={tx.id} className="group">
                  {/* Main transaction card */}
                  <div 
                    className={`bg-white border rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                      isExpanded ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Category icon */}
                        <div className={`p-3 rounded-xl ${category.bgColor} flex-shrink-0`}>
                          <CategoryIcon className={`w-5 h-5 ${category.textColor}`} />
                        </div>

                        {/* Transaction details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 truncate">
                              {tx.description}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${category.bgColor} ${category.textColor}`}>
                              {category.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="truncate">{parties.from} → {parties.to}</span>
                            </div>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatSmartDate(tx.created_at)}
                            </span>
                            <span>•</span>
                            <div className={`flex items-center gap-1 ${statusInfo.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              <span>{statusInfo.label}</span>
                            </div>
                          </div>

                          {/* Expanded details */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Transaction ID</div>
                                  <div className="flex items-center gap-2">
                                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                      TX-{tx.id.toString().padStart(6, '0')}
                                    </code>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(`TX-${tx.id.toString().padStart(6, '0')}`);
                                      }}
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      <Copy className="w-3 h-3 text-gray-500" />
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
                                <Eye className="w-4 h-4" />
                                View full details
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Amount and action */}
                      <div className="flex flex-col items-end ml-4">
                        {formatAmount(tx.amount, tx.transaction_type)}
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-90' : ''
                          }`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No matching transactions' : 'No transactions yet'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery 
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'Your transaction history will appear here once you start using your account.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* View more/footer */}
        {filteredSortedTransactions.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredSortedTransactions.length} of {transactions.length} transactions
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              View all transactions
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}