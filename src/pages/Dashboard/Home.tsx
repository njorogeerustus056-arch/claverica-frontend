import { useState, useRef, useEffect } from "react";
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
  Calendar,
  Zap,
  Target,
  PieChart,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "../../lib/store/auth";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useSafePusher } from "../../hooks/useSafePusher";
import CurrencyConverter from "../../components/CurrencyConverter";
import { FintechMetrics } from "../../components/fintech/FintechMetrics";
import { RecentOrders } from "../../components/fintech/RecentOrders";
import CountryMap from "../../components/ecommerce/CountryMap";
import api from "../../api";
import styles from './Home.module.css';

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.modalIcon}>
              <WalletIcon className={styles.modalIconSvg} />
            </div>
            <div>
              <h3 className={styles.modalTitle}>{getGreeting()}, {user?.first_name || "User"}</h3>
              <div className={styles.modalAccount}>
                <span className={styles.modalAccountNumber}>{user?.account_number?.slice(-6) || "******"}</span>
                <button onClick={handleCopy} className={styles.modalCopyBtn} title="Copy account number">
                  <Copy className={styles.modalCopyIcon} />
                  {copied && <span className={styles.modalCopied}>Copied!</span>}
                </button>
              </div>
            </div>
          </div>
          <button onClick={onClose} className={styles.modalCloseBtn}>✕</button>
        </div>

        <div className={styles.modalBalance}>
          <p className={styles.modalBalanceLabel}>Total Balance</p>
          <p className={styles.modalBalanceAmount}>
            {wallet.currency} {wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className={styles.modalBalanceDetails}>
            <div className={styles.modalBalanceItem}>
              <span className={styles.modalBalanceItemLabel}>Available</span>
              <span className={styles.modalBalanceItemValue}>
                {wallet.currency} {wallet.available.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {wallet.pending > 0 && (
              <div className={styles.modalBalanceItem}>
                <span className={styles.modalBalanceItemLabel}>Pending</span>
                <span className={styles.modalBalanceItemValue}>
                  {wallet.currency} {wallet.pending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalActions}>
          <button onClick={() => { onClose(); navigate("/dashboard/transfer"); }} className={styles.modalActionBtn} style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}>
            <Send className={styles.modalActionIcon} />
            <span>Send</span>
          </button>
          <button onClick={() => { onClose(); navigate("/dashboard/transfer"); }} className={styles.modalActionBtn} style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
            <Download className={styles.modalActionIcon} />
            <span>Withdraw</span>
          </button>
        </div>

        <div className={styles.modalRecent}>
          <h4 className={styles.modalRecentTitle}>Recent Activity</h4>
          {recentTx.length > 0 ? (
            <div className={styles.modalRecentList}>
              {recentTx.map((tx) => (
                <div key={tx.id} className={styles.modalRecentItem}>
                  <div className={styles.modalRecentItemLeft}>
                    <div className={`${styles.modalRecentIcon} ${tx.transaction_type === "credit" ? styles.creditBg : styles.debitBg}`}>
                      {tx.transaction_type === "credit" ? <ArrowUpRight /> : <ArrowDownRight />}
                    </div>
                    <div>
                      <p className={styles.modalRecentDesc}>{tx.description}</p>
                      <p className={styles.modalRecentTime}>
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.modalRecentAmount} ${tx.transaction_type === "credit" ? styles.creditText : styles.debitText}`}>
                    {tx.transaction_type === "credit" ? "+" : "-"}{wallet.currency} {tx.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.modalEmpty}>
              <WalletIcon />
              <p>No transactions yet</p>
            </div>
          )}
          <button onClick={() => { onClose(); navigate("/dashboard/transfer/history"); }} className={styles.modalViewAll}>
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { tokens } = useAuthStore();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { wallet, transactions, user, loading, error, refetch } = useDashboardData();
  const { pusherConnected } = useSafePusher();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCardsCount = async () => {
      try {
        const response = await api.get('/api/cards/user-cards/');
        let cardsArray = [];
        if (Array.isArray(response.data)) {
          cardsArray = response.data;
        } else if (response.data && Array.isArray(response.data.cards)) {
          cardsArray = response.data.cards;
        }
        setCardsCount(cardsArray.length);
      } catch (err) {
        console.error('Failed to fetch cards:', err);
        setCardsCount(0);
      }
    };
    
    if (user) {
      fetchCardsCount();
    }
  }, [user]);

  const handleRefresh = () => refetch();

  const handleCopyAccount = async () => {
    if (user?.account_number) {
      try {
        await navigator.clipboard.writeText(user.account_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
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

  const totalIncome = transactions
    .filter(tx => tx.transaction_type === "credit" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter(tx => tx.transaction_type === "debit" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingTransactions = transactions.filter(tx => tx.status === "pending");

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickActions = [
    { icon: Send, label: "Send", color: "#2563EB", action: () => navigate("/dashboard/transfer"), desc: "Transfer money" },
    { icon: Download, label: "Withdraw", color: "#7C3AED", action: () => navigate("/dashboard/transfer"), desc: "To bank account" },
    { icon: Bitcoin, label: "Crypto", color: "#F59E0B", action: () => navigate("/dashboard/crypto"), desc: "Buy/Sell crypto", badge: "New" },
    { icon: WalletIcon, label: "Wallet", color: "#10B981", action: () => setShowWalletModal(true), desc: "Quick overview" },
    { icon: CreditCard, label: "Cards", color: "#8B5CF6", action: () => navigate("/dashboard/cards"), desc: `${cardsCount} active`, count: cardsCount },
    { icon: History, label: "History", color: "#6B7280", action: () => navigate("/dashboard/transfer/history"), desc: "Transactions", badge: transactions.length > 0 ? transactions.length.toString() : null },
    { icon: Headphones, label: "Support", color: "#3B82F6", action: () => navigate("/dashboard/support"), desc: "24/7 help" },
    { icon: BarChart3, label: "Savings", color: "#059669", action: () => navigate("/dashboard/savings"), desc: "Grow money" },
  ];

  const formatTransactionDate = (dateString: string) => {
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingHeader}></div>
          <div className={styles.loadingBalance}></div>
          <div className={styles.loadingActions}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <Shield className={styles.errorIcon} />
          <h3 className={styles.errorTitle}>Connection Issue</h3>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button onClick={handleRefresh} className={styles.errorRetry}>
              <RefreshCw /> Try Again
            </button>
            <button onClick={() => navigate("/signin")} className={styles.errorBack}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showWalletModal && (
        <MiniWalletModal
          user={user}
          wallet={wallet}
          transactions={transactions}
          onClose={() => setShowWalletModal(false)}
          navigate={navigate}
        />
      )}

      <div className={styles.container}>
        {/* Hero Section - Condensed */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            {/* Top Bar - Compact */}
            <div className={styles.topBar}>
              <div className={styles.greetingSection}>
                <h1 className={styles.greeting}>
                  Hello, <span className={styles.userName}>{user?.first_name || "User"}</span>
                  <span className={styles.wave}>👋</span>
                </h1>
                <div className={styles.accountCompact}>
                  <div className={styles.accountBadge}>
                    <Building className={styles.accountIcon} />
                    <span className={styles.accountNumber}>{user?.account_number || "CLV-***"}</span>
                    <button onClick={handleCopyAccount} className={styles.copyBtn}>
                      <Copy />
                      {copied && <span className={styles.copiedTooltip}>Copied!</span>}
                    </button>
                  </div>
                  {user?.is_verified ? (
                    <div className={`${styles.verificationBadge} ${styles.verified}`}>
                      <CheckCircle />
                      <span>Verified</span>
                    </div>
                  ) : (
                    <div className={`${styles.verificationBadge} ${styles.pending}`}>
                      <Clock />
                      <span>Pending</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.dateTimeCompact}>
                <div className={styles.date}>{formatDate()}</div>
                <div className={styles.time}>{formatTime()}</div>
              </div>
            </div>

            {/* Balance Card - Smaller */}
            <div className={styles.balanceCard}>
              <div className={styles.balanceHeader}>
                <span className={styles.balanceLabel}>Total Balance</span>
                <button onClick={() => setShowBalance(!showBalance)} className={styles.visibilityToggle}>
                  {showBalance ? <EyeOff /> : <Eye />}
                </button>
              </div>
              
              <div className={styles.balanceAmount}>
                <span className={styles.currency}>{wallet?.currency || "USD"}</span>
                <span className={styles.amount}>
                  {showBalance 
                    ? wallet?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"
                    : "••••••"}
                </span>
              </div>
              
              <div className={styles.balanceDetails}>
                <div className={styles.balanceDetail}>
                  <div className={`${styles.detailDot} ${styles.available}`}></div>
                  <span>Available</span>
                  <span className={styles.detailAmount}>
                    {showBalance 
                      ? `${wallet?.currency || "USD"} ${wallet?.available?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}`
                      : "••••••"}
                  </span>
                </div>
                {wallet?.pending > 0 && (
                  <div className={styles.balanceDetail}>
                    <div className={`${styles.detailDot} ${styles.pending}`}></div>
                    <span>Pending</span>
                    <span className={styles.detailAmount}>
                      {showBalance 
                        ? `${wallet?.currency || "USD"} ${wallet?.pending?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : "••••••"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Icons - Moved inside hero */}
            <div className={styles.heroActions}>
              <button onClick={handleRefresh} className={styles.iconBtn} title="Refresh">
                <RefreshCw className={loading ? styles.spinning : ''} />
              </button>
              {pusherConnected && (
                <div className={styles.liveIndicator}>
                  <span className={styles.liveDot}></span>
                  <span className={styles.liveText}>Live</span>
                </div>
              )}
              <button className={styles.iconBtn} title="Notifications" onClick={() => navigate("/dashboard/notifications")}>
                <Bell />
                {pendingTransactions.length > 0 && <span className={styles.notificationDot}></span>}
              </button>
              <button className={styles.iconBtn} title="Settings" onClick={() => navigate("/dashboard/settings")}>
                <MoreVertical />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Quick Actions Grid */}
          <section className={styles.quickActions}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Zap className={styles.sectionIcon} />
                Quick Actions
              </h2>
            </div>
            
            <div className={styles.actionGrid}>
              {quickActions.map((action, idx) => (
                <button key={idx} onClick={action.action} className={styles.actionCard}>
                  <div className={styles.actionIcon} style={{ background: action.color }}>
                    <action.icon />
                  </div>
                  <div className={styles.actionInfo}>
                    <span className={styles.actionLabel}>{action.label}</span>
                    <span className={styles.actionDesc}>{action.desc}</span>
                  </div>
                  {action.count > 0 && <span className={styles.actionCount}>{action.count}</span>}
                  {action.badge && <span className={styles.actionBadge}>{action.badge}</span>}
                </button>
              ))}
            </div>
          </section>

          {/* Two Column Layout */}
          <div className={styles.twoColumn}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Global Map Section */}
              <section className={styles.mapSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <Globe className={styles.sectionIcon} />
                      Global Community
                    </h2>
                    <p className={styles.sectionSubtitle}>Our growing international presence</p>
                  </div>
                  <div className={styles.growthBadge}>
                    <TrendingUpIcon />
                    <span>+42% YoY</span>
                  </div>
                </div>
                
                <div className={styles.mapContainer}>
                  <CountryMap mapColor="#E5E7EB" />
                </div>
                
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>25+</div>
                    <div className={styles.statLabel}>Countries</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>5k+</div>
                    <div className={styles.statLabel}>Active Users</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>$2.5M+</div>
                    <div className={styles.statLabel}>Volume</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>98%</div>
                    <div className={styles.statLabel}>Satisfaction</div>
                  </div>
                </div>
              </section>

              {/* Recent Transactions */}
              <section className={styles.transactionsSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <History className={styles.sectionIcon} />
                      Recent Activity
                    </h2>
                    <p className={styles.sectionSubtitle}>Your latest transactions</p>
                  </div>
                  <button onClick={() => navigate("/dashboard/transfer/history")} className={styles.viewAllBtn}>
                    View all <ChevronRight />
                  </button>
                </div>

                {transactions.length > 0 ? (
                  <div className={styles.transactionsList}>
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className={styles.transactionCard}>
                        <div className={styles.transactionLeft}>
                          <div className={`${styles.transactionIcon} ${transaction.transaction_type === "credit" ? styles.creditIcon : styles.debitIcon}`}>
                            {transaction.transaction_type === "credit" ? <ArrowUpRight /> : <ArrowDownRight />}
                          </div>
                          <div className={styles.transactionInfo}>
                            <p className={styles.transactionDesc}>{transaction.description}</p>
                            <div className={styles.transactionMeta}>
                              <span className={styles.transactionTime}>
                                {formatTransactionDate(transaction.created_at)}
                              </span>
                              <span className={`${styles.transactionStatus} ${styles[transaction.status]}`}>
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`${styles.transactionAmount} ${transaction.transaction_type === "credit" ? styles.creditText : styles.debitText}`}>
                          {transaction.transaction_type === "credit" ? "+" : "-"}
                          {wallet?.currency || "USD"} {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <WalletIcon />
                    <p>No transactions yet</p>
                    <button onClick={() => navigate("/dashboard/transfer")} className={styles.emptyStateBtn}>
                      Make your first transfer <ArrowRight />
                    </button>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column */}
            <div className={styles.rightColumn}>
              {/* Currency Converter */}
              <section className={styles.currencySection}>
                <h2 className={styles.sectionTitle}>
                  <Globe className={styles.sectionIcon} />
                  Currency Converter
                </h2>
                <CurrencyConverter 
                  baseAmount={wallet.balance}
                  baseCurrency={wallet.currency}
                />
              </section>

              {/* Financial Snapshot */}
              <section className={styles.snapshotSection}>
                <h2 className={styles.sectionTitle}>
                  <PieChart className={styles.sectionIcon} />
                  Financial Snapshot
                </h2>
                
                <div className={styles.snapshotGrid}>
                  <div className={styles.snapshotCard}>
                    <div className={styles.snapshotIcon} style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <ArrowUpRight style={{ color: '#10B981' }} />
                    </div>
                    <div>
                      <p className={styles.snapshotLabel}>Income</p>
                      <p className={styles.snapshotValue}>
                        {wallet?.currency || "USD"} {totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.snapshotCard}>
                    <div className={styles.snapshotIcon} style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                      <ArrowDownRight style={{ color: '#EF4444' }} />
                    </div>
                    <div>
                      <p className={styles.snapshotLabel}>Expenses</p>
                      <p className={styles.snapshotValue}>
                        {wallet?.currency || "USD"} {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.netFlow}>
                  <span>Net Flow</span>
                  <div className={`${styles.netFlowValue} ${totalIncome > totalExpenses ? styles.positive : styles.negative}`}>
                    {totalIncome > totalExpenses ? <TrendingUp /> : <TrendingDown />}
                    <span>
                      {totalIncome > totalExpenses ? "+" : "-"}
                      {wallet?.currency || "USD"} {Math.abs(totalIncome - totalExpenses).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </section>

              {/* Account Status */}
              <section className={styles.statusSection}>
                <h2 className={styles.sectionTitle}>
                  <Shield className={styles.sectionIcon} />
                  Account Status
                </h2>
                
                <div className={styles.statusList}>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Account</span>
                    <span className={styles.statusValue}>
                      {user?.account_number?.slice(-4) || "****"}
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Email</span>
                    <span className={styles.statusValue}>{user?.email || "—"}</span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Cards</span>
                    <span className={styles.statusValue}>{cardsCount}</span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Verification</span>
                    <span className={`${styles.statusBadge} ${user?.is_verified ? styles.verifiedBadge : styles.pendingBadge}`}>
                      {user?.is_verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Financial Insights */}
          <section className={styles.insightsSection}>
            <h2 className={styles.sectionTitle}>
              <Target className={styles.sectionIcon} />
              Financial Insights
            </h2>
            <div className={styles.insightsGrid}>
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
          </section>

          {/* Support CTA */}
          <section className={styles.supportSection}>
            <div className={styles.supportContent}>
              <div className={styles.supportLeft}>
                <div className={styles.supportIcon}>
                  <Headphones />
                </div>
                <div>
                  <h3 className={styles.supportTitle}>Need assistance?</h3>
                  <p className={styles.supportDesc}>Our support team is here 24/7 to help you</p>
                </div>
              </div>
              <button onClick={() => navigate("/dashboard/support")} className={styles.supportBtn}>
                Contact Support
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}