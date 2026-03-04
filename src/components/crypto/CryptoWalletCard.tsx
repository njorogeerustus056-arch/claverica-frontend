// src/components/crypto/CryptoWalletCard.tsx
import { Copy, Check, Send, Download, Eye, ChevronRight, TrendingUp, TrendingDown, Sparkles, Lock, Info } from 'lucide-react';
import { useState } from 'react';
import styles from './CryptoWalletCard.module.css';

interface CryptoWalletCardProps {
  coin: {
    symbol: string;
    name: string;
    logo: string;
    price: number;
    change24h: number;
    balance: number;
    valueUSD: number;
    walletAddress?: string;
    network?: string;
  };
  showBalances: boolean;
  onBuy: () => void;
  onSend: () => void;
  onView: () => void;
  onCopyAddress: () => void;
  copiedAddress: string | null;
  user: any;
  kycThreshold: number;
}

export const CryptoWalletCard = ({
  coin,
  showBalances,
  onBuy,
  onSend,
  onView,
  onCopyAddress,
  copiedAddress,
  user,
  kycThreshold
}: CryptoWalletCardProps) => {
  const requiresKYC = !user?.is_verified && coin.valueUSD > kycThreshold;
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isPositive = coin.change24h >= 0;

  // Calculate 24h change in USD
  const change24hUSD = (coin.balance * coin.price * coin.change24h) / 100;

  return (
    <div 
      className={`${styles.walletCard} ${requiresKYC ? styles.walletCardKyc : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background Effect */}
      <div className={`${styles.backgroundGradient} ${
        requiresKYC ? styles.backgroundGradientKyc : styles.backgroundGradientDefault
      }`} />

      {/* Shimmer Effect on Hover */}
      <div className={styles.shimmer}>
        <div className={styles.shimmerInner} />
      </div>

      {/* KYC Badge */}
      {requiresKYC && (
        <div className={styles.kycBadge}>
          <div className={styles.badgeContainer}>
            <div className={styles.badgePulse} />
            <div className={styles.badgeContent}>
              <Lock className={styles.badgeIcon} />
              <span>Verify ID</span>
              <Sparkles className={styles.badgeSparkle} />
            </div>
            <div className={styles.badgeTooltip}>
              <p className={styles.tooltipTitle}>Verification Required</p>
              <p className={styles.tooltipText}>
                Complete KYC to unlock unlimited transactions and advanced features.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.coinInfo}>
            {/* Coin Icon with glow */}
            <div className={styles.iconWrapper}>
              <div className={`${styles.iconGlow} ${
                requiresKYC ? styles.iconGlowKyc : styles.iconGlowDefault
              }`} />
              
              <div className={`${styles.iconContainer} ${
                requiresKYC ? styles.iconContainerKyc : styles.iconContainerDefault
              }`}>
                <span className={styles.iconText}>{coin.logo}</span>
              </div>

              {/* Active indicator */}
              <div className={styles.activeIndicator}>
                <div className={styles.activePulse} />
              </div>
            </div>

            {/* Coin Info */}
            <div className={styles.details}>
              <h4>{coin.name}</h4>
              <div className={styles.metaInfo}>
                <span className={styles.symbol}>{coin.symbol}</span>
                <span className={styles.separator}>•</span>
                <div className={styles.priceInfo}>
                  <span className={styles.price}>
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={styles.priceCurrency}>USD</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Price Change Badge */}
          <div className={`${styles.priceChangeBadge} ${
            isPositive ? styles.priceChangePositive : styles.priceChangeNegative
          }`}>
            {isPositive ? <TrendingUp className={styles.actionIcon} /> : <TrendingDown className={styles.actionIcon} />}
            <span>{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
          </div>
        </div>

        {/* Balance Section */}
        <div className={styles.balanceSection}>
          <div className={styles.balanceHeader}>
            <span className={styles.balanceLabel}>Balance</span>
            <span className={styles.balanceValue}>
              {showBalances ? `${coin.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${coin.symbol}` : '••••••'}
            </span>
          </div>
          
          {/* Main Balance Display */}
          <div className={styles.balanceDisplay}>
            <div className={styles.decorativePattern} />
            
            <div className={styles.balanceMain}>
              <div className={styles.amount}>
                {showBalances 
                  ? `$${coin.valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : '••••••'
                }
              </div>
              {showBalances && (
                <div className={`${styles.changeAmount} ${
                  isPositive ? styles.changePositive : styles.changeNegative
                }`}>
                  {isPositive ? '+' : ''}{change24hUSD.toFixed(2)}
                </div>
              )}
              
              <p className={styles.coinBalance}>
                ≈ {showBalances ? coin.balance.toFixed(8) : '••••••'} {coin.symbol}
              </p>
            </div>

            {/* KYC Notice */}
            {requiresKYC && (
              <div className={styles.kycNotice}>
                <div className={styles.noticeIcon}>
                  <Info />
                </div>
                <div className={styles.noticeContent}>
                  <h6>Action Required</h6>
                  <p>Complete identity verification to enable unlimited transactions</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Address Section */}
        {coin.walletAddress && (
          <div className={styles.walletSection}>
            <div className={styles.walletHeader}>
              <h5>Wallet Address</h5>
              <div className={styles.networkBadge}>{coin.network}</div>
            </div>
            
            <div className={styles.addressContainer}>
              <code className={styles.address}>{coin.walletAddress}</code>
              <button
                onClick={onCopyAddress}
                className={`${styles.copyButton} ${copiedAddress === coin.walletAddress ? styles.copySuccess : ''}`}
              >
                {copiedAddress === coin.walletAddress ? (
                  <>
                    <Check className={styles.copySuccessIcon} />
                    <span className={styles.copySuccessText}>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className={styles.copyIcon} />
                    <span className={styles.copyText}>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actionsGrid}>
          <button 
            onClick={onBuy}
            className={`${styles.actionButton} ${
              requiresKYC ? styles.actionButtonKyc : styles.actionButtonDefault
            }`}
          >
            <div className={styles.shineEffect} />
            <Download className={styles.actionIcon} />
            <span className={styles.actionLabel}>Buy</span>
          </button>
          
          <button 
            onClick={onSend}
            className={`${styles.actionButton} ${styles.actionSecondary}`}
          >
            <Send className={styles.actionIcon} />
            <span className={styles.actionLabel}>Send</span>
          </button>
          
          <button 
            onClick={onView}
            className={`${styles.actionButton} ${styles.actionSecondary}`}
          >
            <Eye className={styles.actionIcon} />
            <span className={styles.actionLabel}>View</span>
          </button>
        </div>

        {/* Market Stats - Collapsible */}
        <div className={styles.footer}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={styles.expandButton}
          >
            <span>Market Statistics</span>
            <ChevronRight className={`${styles.expandIcon} ${showDetails ? styles.expandIconRotated : ''}`} />
          </button>

          {showDetails && showBalances && (
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <p className={styles.statLabel}>24h High</p>
                <p className={styles.statValue}>${(coin.price * 1.035).toFixed(2)}</p>
              </div>
              
              <div className={styles.statBox}>
                <p className={styles.statLabel}>24h Low</p>
                <p className={styles.statValue}>${(coin.price * 0.965).toFixed(2)}</p>
              </div>

              <div className={styles.statBox}>
                <p className={styles.statLabel}>Volume</p>
                <p className={styles.statValue}>${(coin.valueUSD * 24.5).toFixed(0)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};