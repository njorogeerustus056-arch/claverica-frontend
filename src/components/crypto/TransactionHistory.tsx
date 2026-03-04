// src/components/crypto/TransactionHistory.tsx - Using CSS Module Only
import { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, ExternalLink, Clock, 
  Shield, Search, Download, ChevronRight, CheckCircle, 
  XCircle, AlertCircle, Calendar 
} from 'lucide-react';
import styles from './TransactionHistory.module.css';

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
          className: styles.statusBadgeCompleted,
          icon: CheckCircle,
          label: 'Completed'
        };
      case 'pending':
        return {
          className: styles.statusBadgePending,
          icon: Clock,
          label: 'Pending'
        };
      case 'failed':
        return {
          className: styles.statusBadgeFailed,
          icon: XCircle,
          label: 'Failed'
        };
      default:
        return {
          className: '',
          icon: AlertCircle,
          label: 'Unknown'
        };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return styles.typeBuy;
      case 'sell': return styles.typeSell;
      case 'deposit': return styles.typeDeposit;
      case 'withdrawal': return styles.typeWithdrawal;
      case 'transfer': return styles.typeTransfer;
      default: return '';
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

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrapper}>
              <div className={styles.iconGlow} />
              <div className={styles.iconContainer}>
                <Clock />
              </div>
            </div>
            <div className={styles.headerTitle}>
              <h3>Transaction History</h3>
              <p>{filteredTransactions.length} transactions</p>
            </div>
          </div>

          {/* Export Button */}
          <button className={styles.exportButton}>
            <Download className={styles.exportIcon} />
            <span>Export</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className={styles.filters}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            {(['all', 'crypto', 'fiat'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`${styles.filterTab} ${filter === type ? styles.filterTabActive : ''}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className={styles.transactionList}>
        {filteredTransactions.map((tx) => {
          const statusConfig = getStatusConfig(tx.status);
          const StatusIcon = statusConfig.icon;
          const typeColorClass = getTypeColor(tx.type);
          const isSelected = selectedTx === tx.id;

          return (
            <div
              key={tx.id}
              className={`${styles.transactionItem} ${isSelected ? styles.transactionItemSelected : ''}`}
              onClick={() => {
                setSelectedTx(isSelected ? null : tx.id);
                onViewDetails(tx);
              }}
            >
              <div className={styles.transactionContent}>
                {/* Transaction Icon */}
                <div className={styles.iconSection}>
                  {/* Type indicator ring */}
                  <div className={`${styles.iconRing} ${typeColorClass}`} />
                  
                  {/* Main icon */}
                  <div className={styles.transactionIcon}>
                    {getTransactionIcon(tx)}
                  </div>

                  {/* Type badge */}
                  <div className={`${styles.typeBadge} ${typeColorClass}`}>
                    <StatusIcon />
                  </div>
                </div>

                {/* Transaction Details */}
                <div className={styles.details}>
                  <div className={styles.detailsHeader}>
                    <h4 className={styles.detailsTitle}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.asset}
                    </h4>
                    
                    {/* Status Badge */}
                    <span className={`${styles.statusBadge} ${statusConfig.className}`}>
                      <StatusIcon className={styles.statusIcon} />
                      {statusConfig.label}
                    </span>

                    {/* KYC Badge */}
                    {tx.requiresKYC && (
                      <span className={styles.kycBadge}>
                        <Shield className={styles.kycIcon} />
                        KYC
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.metaInfo}>
                    <Calendar className={styles.metaIcon} />
                    <span>{formatDate(tx.timestamp)}</span>
                    <span className={styles.metaSeparator}>•</span>
                    <span>{formatTime(tx.timestamp)}</span>
                    {tx.fee !== undefined && tx.fee > 0 && (
                      <>
                        <span className={styles.metaSeparator}>•</span>
                        <span>Fee: ${tx.fee.toFixed(2)}</span>
                      </>
                    )}
                  </div>

                  {/* Recipient info if transfer */}
                  {tx.recipient && (
                    <p className={styles.recipientInfo}>
                      To: {tx.recipient}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className={styles.amountSection}>
                  <p className={`${styles.amount} ${
                    tx.type === 'buy' || tx.type === 'deposit' 
                      ? styles.amountPositive 
                      : styles.amountNegative
                  }`}>
                    {tx.type === 'buy' || tx.type === 'deposit' ? '+' : '-'}${tx.valueUSD.toFixed(2)}
                  </p>
                  
                  <p className={styles.assetAmount}>
                    {tx.amount.toLocaleString()} {tx.asset}
                  </p>
                  
                  {/* View details button */}
                  <button className={styles.viewDetails}>
                    Details
                    <ChevronRight className={styles.viewAllIcon} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className={styles.expandedDetails}>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailBox}>
                      <p className={styles.detailLabel}>Transaction ID</p>
                      <code className={styles.detailValue}>#{tx.id.padStart(8, '0')}</code>
                    </div>
                    
                    <div className={styles.detailBox}>
                      <p className={styles.detailLabel}>Network Fee</p>
                      <p className={styles.detailValue}>${(tx.fee || 0).toFixed(2)}</p>
                    </div>
                    
                    <div className={styles.detailBox}>
                      <p className={styles.detailLabel}>Total</p>
                      <p className={styles.detailValue}>
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
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Showing {filteredTransactions.length} of {mockTransactions.length} transactions
        </p>
        
        <button className={styles.viewAllButton}>
          View all activity
          <ExternalLink className={styles.viewAllIcon} />
        </button>
      </div>
    </div>
  );
};