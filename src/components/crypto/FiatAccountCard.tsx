// src/components/crypto/FiatAccountCard.tsx
import { CreditCard, Building, Send, Plus, AlertCircle, ChevronRight, Lock, TrendingUp, ArrowUpRight, Info, CheckCircle, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import styles from './FiatAccountCard.module.css';

interface FiatAccountCardProps {
  platform: {
    id: string;
    name: string;
    logo: string;
    type: "bank" | "payment";
    balance: number;
    currency: string;
    accountNumber?: string;
  };
  showBalances: boolean;
  onAddFunds: () => void;
  onTransfer: () => void;
  user: any;
  kycThreshold: number;
}

export const FiatAccountCard = ({
  platform,
  showBalances,
  onAddFunds,
  onTransfer,
  user,
  kycThreshold
}: FiatAccountCardProps) => {
  const requiresKYC = !user?.is_verified && platform.balance > kycThreshold;
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const currencySymbol = platform.currency === 'USD' ? '$' : 
                       platform.currency === 'EUR' ? '€' : '£';

  return (
    <div 
      className={`${styles.card} ${requiresKYC ? styles.cardKyc : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div className={`${styles.backgroundGradient} ${
        requiresKYC ? styles.backgroundGradientKyc : styles.backgroundGradientDefault
      }`} />

      {/* KYC Badge */}
      {requiresKYC && (
        <div className={styles.kycBadge}>
          <div className={styles.badgeContainer}>
            <div className={styles.badgePulse} />
            <div className={styles.badgeContent}>
              <Shield className={styles.badgeIcon} />
              <span>Verify</span>
            </div>
            
            {/* Tooltip */}
            <div className={styles.badgeTooltip}>
              <p className={styles.tooltipTitle}>Higher Limits Available</p>
              <p className={styles.tooltipText}>
                Verify your identity to increase your daily transaction limit to $10,000.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          {/* Platform Icon */}
          <div className={styles.iconWrapper}>
            <div className={styles.iconGlow} />
            
            <div className={styles.iconContainer}>
              <span className={styles.iconText}>{platform.logo}</span>
            </div>

            {/* Status indicator */}
            <div className={styles.statusIndicator}>
              <div className={styles.statusPulse} />
            </div>
          </div>

          {/* Platform Info */}
          <div className={styles.info}>
            <h4>{platform.name}</h4>
            <div className={styles.metaInfo}>
              <span className={`${styles.typeBadge} ${
                platform.type === 'bank' ? styles.typeBadgeBank : styles.typeBadgePayment
              }`}>
                {platform.type === 'bank' ? '🏦 Bank' : '💳 Payment'}
              </span>
            </div>
            
            <div className={styles.currencyInfo}>
              <span className={styles.currency}>{platform.currency}</span>
              {platform.accountNumber && (
                <>
                  <span className={styles.separator}>•</span>
                  <span className={styles.accountNumber}>
                    {platform.accountNumber}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Balance Display - Monzo style */}
        <div className={styles.balanceSection}>
          <div className={styles.balanceHeader}>
            <span className={styles.balanceLabel}>Available</span>
            <span className={styles.currencyBadge}>{platform.currency}</span>
          </div>

          <div className={styles.balanceDisplay}>
            <div className={styles.decorativeBg} />
            
            <div className={styles.balanceMain}>
              <p className={styles.amount}>
                {showBalances 
                  ? `${currencySymbol}${platform.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : '••••••'
                }
              </p>
              
              <div className={styles.activeStatus}>
                <CheckCircle className={styles.checkIcon} />
                <span className={styles.activeText}>Account Active</span>
              </div>
            </div>

            {/* KYC Notice */}
            {requiresKYC && (
              <div className={styles.kycNotice}>
                <div className={styles.noticeIcon}>
                  <TrendingUp />
                </div>
                <div className={styles.noticeContent}>
                  <h6>Unlock Higher Limits</h6>
                  <p>Verify your identity for daily limits up to $10,000</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statHeader}>
              <Clock className={styles.statIcon} />
              <span className={styles.statLabel}>Transfer Speed</span>
            </div>
            <p className={styles.statValue}>Instant</p>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statHeader}>
              <Shield className={styles.statIcon} />
              <span className={styles.statLabel}>Daily Limit</span>
            </div>
            <p className={styles.statValue}>
              {user?.is_verified ? '$10,000' : `$${kycThreshold.toLocaleString()}`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsGrid}>
          <button 
            onClick={onAddFunds}
            className={`${styles.actionButton} ${
              requiresKYC ? styles.actionButtonKyc : styles.actionButtonDefault
            }`}
          >
            <div className={styles.shineEffect} />
            <Plus className={styles.actionIcon} />
            <span>Add Funds</span>
          </button>
          
          <button 
            onClick={onTransfer}
            className={`${styles.actionButton} ${styles.actionSecondary}`}
          >
            <Send className={styles.actionIcon} />
            <span>Transfer</span>
          </button>
        </div>

        {/* Account Details - Expandable */}
        <div className={styles.footer}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={styles.expandButton}
          >
            <span>Account Details</span>
            <ChevronRight className={`${styles.expandIcon} ${showDetails ? styles.expandIconRotated : ''}`} />
          </button>

          {showDetails && (
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Account Type</span>
                <span className={styles.detailValue}>{platform.type}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Currency</span>
                <span className={styles.detailValue}>{platform.currency}</span>
              </div>

              {platform.accountNumber && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account Number</span>
                  <code className={styles.detailValue}>{platform.accountNumber}</code>
                </div>
              )}

              <div className={styles.statusActive}>
                <div className={styles.statusDot}>
                  <div className={styles.dot} />
                  <div className={styles.dotPulse} />
                </div>
                <span className={styles.statusText}>Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};