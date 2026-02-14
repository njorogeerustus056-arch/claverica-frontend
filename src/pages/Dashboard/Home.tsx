import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  CreditCard,
  Send,
  Download,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw,
  Bell,
  Copy,
  Building,
  Shield,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  History,
  Bitcoin,
  ExternalLink,
  MoreVertical,
  CheckCircle,
  MessageSquare,
  Headphones,
  BarChart3,
  Globe,
  TrendingUp as TrendingUpIcon,
  Users,
} from "lucide-react";
import { useAuthStore } from "../../lib/store/auth";
import { useDashboardData } from "../../hooks/useDashboardData";
import CurrencyConverter from "../../components/CurrencyConverter";
import { FintechMetrics } from "../../components/fintech/FintechMetrics";
import { RecentOrders } from "../../components/fintech/RecentOrders";
import CountryMap from "../../components/ecommerce/CountryMap"; // ADDED IMPORT

// Simplified interfaces based on your actual API
interface Transaction {
  id: number;
  amount: number;
  transaction_type: "credit" | "debit";
  description: string;
  created_at: string;
  status: "completed" | "pending" | "failed";
}

interface WalletBalance {
  balance: number;
  available: number;
  pending: number;
  currency: string;
}

interface Card {
  id: number;
  last_four: string;
  card_type: "virtual" | "physical";
  status: "active" | "frozen";
  is_primary: boolean;
  expiry_date: string;
  color_scheme: string;
}

interface UserData {
  first_name: string;
  last_name: string;
  account_number: string;
  email: string;
  is_verified: boolean;
}

// Mini Wallet Modal Component
interface MiniWalletProps {
  user: UserData | null;
  wallet: WalletBalance;
  transactions: Transaction[];
  onClose: () => void;
  navigate: (path: string) => void;
}

function MiniWalletModal({ user, wallet, transactions, onClose, navigate }: MiniWalletProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleCopy = async () => {
    if (user?.account_number) {
      try {
        await navigator.clipboard.writeText(user.account_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const recentTx = transactions.slice(0, 3);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <WalletIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{user?.first_name || "User"}'s Wallet</h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="font-mono">{user?.account_number?.slice(-6) || "******"}</span>
                  <button 
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white transition-colors relative"
                    title="Copy account number"
                  >
                    <Copy className="w-3 h-3" />
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 transition-colors"
            >
              ?
            </button>
          </div>
        </div>

        {/* Balance Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Current Balance</p>
            <p className="text-4xl font-bold mb-2">
              {wallet.currency} {wallet.balance.toFixed(2)}
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div>
                <p className="text-gray-400">Available</p>
                <p className="font-medium">{wallet.currency} {wallet.available.toFixed(2)}</p>
              </div>
              {wallet.pending > 0 && (
                <div>
                  <p className="text-gray-400">Pending</p>
                  <p className="font-medium text-yellow-400">{wallet.currency} {wallet.pending.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 p-6 border-b border-gray-700">
          <button 
            onClick={() => { onClose(); navigate("/dashboard/transfer"); }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Send className="w-5 h-5 inline-block mr-2" />
            Send
          </button>
          <button 
            onClick={() => { onClose(); navigate("/dashboard/transfer"); }}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-5 h-5 inline-block mr-2" />
            Withdraw
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="p-6">
          <h4 className="font-bold mb-4 flex items-center justify-between">
            <span>Recent Activity</span>
            <span className="text-xs text-gray-400">Last 3</span>
          </h4>
          {recentTx.length > 0 ? (
            <div className="space-y-3">
              {recentTx.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.transaction_type === "credit" 
                        ? "bg-green-900/30 text-green-400" 
                        : "bg-red-900/30 text-red-400"
                    }`}>
                      {tx.transaction_type === "credit" ? 
                        <ArrowUpRight className="w-4 h-4" /> : 
                        <ArrowDownRight className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[120px]">{tx.description}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className={`font-bold ${tx.transaction_type === "credit" ? "text-green-400" : "text-red-400"}`}>
                    {tx.transaction_type === "credit" ? "+" : "-"}
                    {wallet.currency} {tx.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400">
              <p>No transactions yet</p>
            </div>
          )}
          <button 
            onClick={() => { onClose(); navigate("/dashboard/transfer/history"); }}
            className="w-full mt-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition-colors"
          >
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { tokens, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Use custom hook for dashboard data
  const { 
    wallet, 
    transactions, 
    user, 
    loading, 
    error, 
    refetch 
  } = useDashboardData();

  // Handle copy account number
  const handleCopyAccount = async () => {
    if (user?.account_number) {
      try {
        await navigator.clipboard.writeText(user.account_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = user.account_number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Calculate stats
  const totalIncome = transactions
    .filter(tx => tx.transaction_type === "credit" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter(tx => tx.transaction_type === "debit" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingTransactions = transactions.filter(tx => tx.status === "pending");

  // Smart Quick Actions - All using your existing routes
  const quickActions = [
    { 
      icon: Send, 
      label: "Send", 
      color: "from-blue-500 to-blue-600", 
      action: () => navigate("/dashboard/transfer"),
      desc: "Transfer money",
      badge: null
    },
    { 
      icon: Download, 
      label: "Withdraw", 
      color: "from-purple-500 to-purple-600", 
      action: () => navigate("/dashboard/transfer"),
      desc: "To bank account",
      badge: null
    },
    { 
      icon: Bitcoin, 
      label: "Crypto", 
      color: "from-amber-500 to-orange-600", 
      action: () => navigate("/dashboard/crypto"),
      desc: "Buy/Sell crypto",
      badge: "New"
    },
    { 
      icon: WalletIcon, 
      label: "Wallet", 
      color: "from-emerald-500 to-green-600", 
      action: () => setShowWalletModal(true),
      desc: "Quick overview",
      badge: null
    },
    { 
      icon: CreditCard, 
      label: "Cards", 
      color: "from-violet-500 to-purple-600", 
      action: () => navigate("/dashboard/cards"),
      desc: `0 active`, // Cards not in hook currently
      count: 0
    },
    { 
      icon: History, 
      label: "History", 
      color: "from-gray-500 to-gray-600", 
      action: () => navigate("/dashboard/transfer/history"),
      desc: "Transactions",
      badge: transactions.length > 0 ? transactions.length.toString() : null
    },
    { 
      icon: Headphones, 
      label: "Support", 
      color: "from-indigo-500 to-blue-600", 
      action: () => navigate("/dashboard/support"),
      desc: "24/7 help",
      badge: null
    },
    { 
      icon: BarChart3, 
      label: "Savings", 
      color: "from-green-500 to-emerald-600", 
      action: () => navigate("/dashboard/savings"),
      desc: "Grow money",
      badge: null
    },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffHours < 48) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch {
      return "Recently";
    }
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Skeleton Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 mb-8">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-500/30 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-blue-500/20 rounded w-1/4 mb-6"></div>
              <div className="h-20 bg-white/10 rounded-2xl"></div>
            </div>
          </div>
          
          {/* Skeleton Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-xl mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-2"></div>
              </div>
            ))}
          </div>
          
          {/* Skeleton Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl mb-4"></div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Issue</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={refetch}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <RefreshCw className="w-4 h-4 inline-block mr-2" />
              Try Again
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mini Wallet Modal */}
      {showWalletModal && (
        <MiniWalletModal
          user={user}
          wallet={wallet}
          transactions={transactions}
          onClose={() => setShowWalletModal(false)}
          navigate={navigate}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
        {/* Header with balance - Monzo/Revolut style */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {user?.first_name ? `Good morning, ${user.first_name}` : "Welcome back"}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 hover:bg-white/15 transition-colors cursor-pointer relative group">
                    <span className="text-sm font-mono">{user?.account_number || "CLV-***"}</span>
                    <button 
                      onClick={handleCopyAccount}
                      className="text-blue-200 hover:text-white transition-colors"
                      title="Copy account number"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-in fade-in slide-in-from-top-1">
                        Copied to clipboard!
                      </span>
                    )}
                  </div>
                  {user?.is_verified ? (
                    <div className="bg-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  ) : (
                    <div className="bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-500/30">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-medium">Pending Verification</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={refetch}
                  disabled={loading}
                  className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95"
                  title="Refresh"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95 relative"
                  title="Notifications"
                  onClick={() => navigate("/dashboard/notifications")}
                >
                  <Bell className="w-5 h-5" />
                  {pendingTransactions.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95"
                  title="Settings"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Balance Card - Wise/Revolut inspired */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-100 font-medium">Total Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 active:scale-95"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  <span className="text-sm">{showBalance ? "Hide" : "Show"}</span>
                </button>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold tracking-tight">
                  {showBalance 
                    ? `${wallet?.currency || "USD"} ${wallet?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}` 
                    : "••••••"}
                </span>
                <span className="text-lg text-blue-200">{wallet?.currency || "USD"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="opacity-80">Available:</span>{" "}
                  <span className="font-medium">{wallet?.currency || "USD"} {wallet?.available?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}</span>
                </div>
                {wallet?.pending && wallet.pending > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>Pending: {wallet.currency} {wallet.pending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 -mt-6">
          {/* Quick Actions Grid - Monzo style */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>Quick Actions</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95 text-center group relative"
                >
                  <div className={`bg-gradient-to-r ${action.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{action.desc}</p>
                  {action.count !== undefined && action.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
                      {action.count}
                    </span>
                  )}
                  {action.badge && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Recent Activities */}
            <div className="lg:col-span-2 space-y-6">
              {/* ADDED: Global Reach Map - NEW SECTION BEFORE RECENT ACTIVITIES */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Global Community</h2>
                    <p className="text-sm text-gray-600">Our growing international presence</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">+42% YoY growth</span>
                  </div>
                </div>
                
                <div className="h-80 relative">
                  <CountryMap mapColor="#E5E7EB" />
                </div>
                
                {/* Stats summary */}
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">25+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5k+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">$2.5M+</div>
                    <div className="text-sm text-gray-600">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions - Now below the map */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <p className="text-sm text-gray-600">Your latest transactions</p>
                  </div>
                  <button 
                    onClick={() => navigate("/dashboard/transfer/history")}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors active:scale-95"
                  >
                    <History className="w-4 h-4" /> View all
                  </button>
                </div>
                
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 active:scale-[0.98] cursor-pointer"
                        onClick={() => navigate(`/dashboard/transfer/history`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            transaction.transaction_type === "credit" 
                              ? "bg-green-50 text-green-600" 
                              : "bg-red-50 text-red-600"
                          }`}>
                            {transaction.transaction_type === "credit" ? (
                              <ArrowUpRight className="w-5 h-5" />
                            ) : (
                              <ArrowDownRight className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-gray-500">{formatDate(transaction.created_at)}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                transaction.status === "completed" 
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`font-bold text-lg ${
                          transaction.transaction_type === "credit" 
                            ? "text-green-600" 
                            : "text-red-600"
                        }`}>
                          {transaction.transaction_type === "credit" ? "+" : "-"}
                          {wallet?.currency || "USD"} {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <WalletIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2">No transactions yet</p>
                    <button 
                      onClick={() => navigate("/dashboard/transfer")}
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 active:scale-95"
                    >
                      Make your first transfer <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Currency Converter */}
              <CurrencyConverter 
                baseAmount={wallet.balance}
                baseCurrency={wallet.currency}
              />

              {/* Stats Card - Wise style */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold mb-4">Financial Snapshot</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Income</p>
                        <p className="text-lg font-bold">${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">Expenses</p>
                        <p className="text-lg font-bold">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Net Flow</span>
                      <div className={`flex items-center gap-1 ${totalIncome > totalExpenses ? 'text-green-400' : 'text-red-400'}`}>
                        {totalIncome > totalExpenses ? (
                          <>
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-bold">+${(totalIncome - totalExpenses).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-4 h-4" />
                            <span className="font-bold">-${(totalExpenses - totalIncome).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status - Revolut style */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Account Status</h3>
                    <p className="text-sm text-gray-600">
                      {user?.is_verified ? "Fully verified" : "Verification pending"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Account</span>
                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {user?.account_number?.slice(-4) || "****"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <span className="text-sm text-gray-900 truncate max-w-[120px]">{user?.email || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Cards</span>
                    <span className="text-sm font-bold text-gray-900">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Insights */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Insights</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <FintechMetrics 
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                walletBalance={wallet.balance}
                transactions={transactions}
                walletCurrency={wallet.currency}
              />
              <RecentOrders 
                transactions={transactions.slice(0, 5)}
                walletCurrency={wallet.currency}
              />
            </div>
          </div>

          {/* Support CTA - Monzo style */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Need assistance?</h3>
                  <p className="text-blue-100">Our support team is here to help 24/7</p>
                </div>
              </div>
              <button 
                onClick={() => navigate("/dashboard/support")}
                className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
