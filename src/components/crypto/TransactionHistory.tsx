// src/components/crypto/TransactionHistory.tsx
import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink, Clock, Shield, Filter, Search, Download, ChevronRight, TrendingUp, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'transfer';
  asset: string;
  amount: number;
  valueUSD: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  requiresKYC?: boolean;
  fee?: number;
  recipient?: string;
}

interface TransactionHistoryProps {
  coins: Array<{ symbol: string; logo: string }>;
  fiatPlatforms: Array<{ id: string; name: string; logo: string }>;
  user: any;
  onViewDetails: (tx: Transaction) => void;
}

export const TransactionHistory = ({ coins, fiatPlatforms, user, onViewDetails }: TransactionHistoryProps) => {
  const [filter, setFilter] = useState<'all' | 'crypto' | 'fiat'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<string | null>(null);

  // Mock transaction data with more details
  const mockTransactions: Transaction[] = [
    { 
      id: '1', 
      type: 'buy', 
      asset: 'BTC', 
      amount: 0.005, 
      valueUSD: 342.10, 
      status: 'completed', 
      timestamp: '2024-01-31T10:30:00Z', 
      requiresKYC: !user?.is_verified && 342.10 > 1500,
      fee: 0.34
    },
    { 
      id: '2', 
      type: 'deposit', 
      asset: 'Wise', 
      amount: 1000, 
      valueUSD: 1000, 
      status: 'completed', 
      timestamp: '2024-01-30T14:20:00Z',
      fee: 0
    },
    { 
      id: '3', 
      type: 'transfer', 
      asset: 'Monzo', 
      amount: 500, 
      valueUSD: 500, 
      status: 'pending', 
      timestamp: '2024-01-30T09:15:00Z',
      recipient: 'John Doe',
      fee: 0.50
    },
    { 
      id: '4', 
      type: 'sell', 
      asset: 'ETH', 
      amount: 0.2, 
      valueUSD: 762.40, 
      status: 'completed', 
      timestamp: '2024-01-29T16:45:00Z',
      fee: 0.76
    },
    { 
      id: '5', 
      type: 'withdrawal', 
      asset: 'Revolut', 
      amount: 200, 
      valueUSD: 200, 
      status: 'completed', 
      timestamp: '2024-01-28T11:20:00Z',
      fee: 0
    },
    { 
      id: '6', 
      type: 'buy', 
      asset: 'SOL', 
      amount: 2.5, 
      valueUSD: 356.25, 
      status: 'completed', 
      timestamp: '2024-01-27T13:10:00Z',
      fee: 0.36
    },
  ];

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'crypto' && ['BTC', 'ETH', 'SOL'].includes(tx.asset)) ||
      (filter === 'fiat' && ['Wise', 'Monzo', 'Revolut', 'Skrill'].includes(tx.asset));
    
    const matchesSearch = 
      tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getTransactionIcon = (tx: Transaction) => {
    const coin = coins.find(c => c.symbol === tx.asset);
    const platform = fiatPlatforms.find(p => p.name === tx.asset);
    
    if (coin) return coin.logo;
    if (platform) return platform.logo;
    
    switch (tx.type) {
      case 'buy': return '🟢';
      case 'sell': return '🔴';
      case 'deposit': return '💰';
      case 'withdrawal': return '🏧';
      case 'transfer': return '🔄';
      default: return '📊';
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
          icon: CheckCircle,
          label: 'Completed'
        };
      case 'pending':
        return {
          color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
          icon: Clock,
          label: 'Pending'
        };
      case 'failed':
        return {
          color: 'text-red-400 bg-red-500/20 border-red-500/30',
          icon: XCircle,
          label: 'Failed'
        };
      default:
        return {
          color: 'text-gray-400 bg-gray-500/20 border-gray-500/30',
          icon: AlertCircle,
          label: 'Unknown'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'buy':
        return { color: 'from-emerald-500 to-green-600', icon: ArrowUpRight, label: 'Buy' };
      case 'sell':
        return { color: 'from-red-500 to-rose-600', icon: ArrowDownRight, label: 'Sell' };
      case 'deposit':
        return { color: 'from-blue-500 to-cyan-600', icon: ArrowDownRight, label: 'Deposit' };
      case 'withdrawal':
        return { color: 'from-orange-500 to-red-600', icon: ArrowUpRight, label: 'Withdraw' };
      case 'transfer':
        return { color: 'from-purple-500 to-pink-600', icon: ArrowUpRight, label: 'Transfer' };
      default:
        return { color: 'from-gray-500 to-gray-600', icon: ArrowUpRight, label: type };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Transaction History</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {filteredTransactions.length} transactions
              </p>
            </div>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            {(['all', 'crypto', 'fiat'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
        {filteredTransactions.map((tx) => {
          const statusConfig = getStatusConfig(tx.status);
          const typeConfig = getTypeConfig(tx.type);
          const StatusIcon = statusConfig.icon;
          const TypeIcon = typeConfig.icon;
          const isSelected = selectedTx === tx.id;

          return (
            <div
              key={tx.id}
              className={`group px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer ${
                isSelected ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => {
                setSelectedTx(isSelected ? null : tx.id);
                onViewDetails(tx);
              }}
            >
              <div className="flex items-center gap-4">
                {/* Transaction Icon */}
                <div className="relative flex-shrink-0">
                  {/* Type indicator ring */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${typeConfig.color} opacity-20 blur-lg group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Main icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-2xl border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    {getTransactionIcon(tx)}
                  </div>

                  {/* Type badge */}
                  <div className={`absolute -bottom-1 -right-1 w-7 h-7 p-1.5 rounded-lg bg-gradient-to-br ${typeConfig.color} shadow-lg border-2 border-white dark:border-slate-900`}>
                    <TypeIcon className="w-full h-full text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {typeConfig.label} {tx.asset}
                    </h4>
                    
                    {/* Status Badge */}
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" strokeWidth={2.5} />
                      {statusConfig.label}
                    </span>

                    {/* KYC Badge */}
                    {tx.requiresKYC && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        <Shield className="w-3 h-3" />
                        KYC
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-medium">{formatDate(tx.timestamp)}</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="font-medium">{formatTime(tx.timestamp)}</span>
                    {tx.fee !== undefined && tx.fee > 0 && (
                      <>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="font-medium">Fee: ${tx.fee.toFixed(2)}</span>
                      </>
                    )}
                  </div>

                  {/* Recipient info if transfer */}
                  {tx.recipient && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      To: {tx.recipient}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-xl font-bold tabular-nums mb-1 ${
                    tx.type === 'buy' || tx.type === 'deposit' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {tx.type === 'buy' || tx.type === 'deposit' ? '+' : '-'}${tx.valueUSD.toFixed(2)}
                  </p>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tabular-nums">
                    {tx.amount.toLocaleString()} {tx.asset}
                  </p>
                  
                  {/* View details button */}
                  <button className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold opacity-0 group-hover:opacity-100 transition-all ml-auto">
                    Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Transaction ID</p>
                      <code className="text-xs font-mono text-slate-900 dark:text-white">#{tx.id.padStart(8, '0')}</code>
                    </div>
                    
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Network Fee</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">${(tx.fee || 0).toFixed(2)}</p>
                    </div>
                    
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Total</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        ${(tx.valueUSD + (tx.fee || 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </p>
          
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors group">
            View all activity
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
