// src/components/crypto/KYCProgressBar.tsx
import { TrendingUp, Zap, Target, Award } from 'lucide-react';
import { KYC_CREATIVES } from '../../lib/utils/kycCreatives';
import styles from './KYCProgressBar.module.css';

interface KYCProgressBarProps {
  portfolioValue: number;
  kycThreshold?: number;
  onVerifyClick?: () => void;
}

export const KYCProgressBar = ({ 
  portfolioValue, 
  kycThreshold = 1500,
  onVerifyClick 
}: KYCProgressBarProps) => {
  const progress = Math.min((portfolioValue / kycThreshold) * 100, 100);
  const difference = kycThreshold - portfolioValue;
  const tier = KYC_CREATIVES.getVerificationTier(portfolioValue);
  
  const getIconWrapperClass = () => {
    if (progress >= 100) return styles.iconWrapperComplete;
    if (progress >= 70) return styles.iconWrapperNear;
    if (progress >= 40) return styles.iconWrapperProgress;
    return styles.iconWrapperWarning;
  };

  const getProgressBarClass = () => {
    if (progress >= 100) return styles.progressBarComplete;
    if (progress >= 70) return styles.progressBarNear;
    if (progress >= 40) return styles.progressBarProgress;
    return styles.progressBarWarning;
  };

  const getTierBadgeClass = () => {
    switch(tier.name) {
      case 'Basic': return styles.tierBadgeBasic;
      case 'Silver': return styles.tierBadgeSilver;
      case 'Gold': return styles.tierBadgeGold;
      case 'Platinum': return styles.tierBadgePlatinum;
      default: return styles.tierBadgeBasic;
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={`${styles.iconWrapper} ${getIconWrapperClass()}`}>
            <Target className={styles.icon} />
          </div>
          <div className={styles.title}>
            <h4>Verification Progress</h4>
            <p className={styles.subtitle}>
              Unlock higher limits & premium features
            </p>
          </div>
        </div>
        
        <div className={`${styles.tierBadge} ${getTierBadgeClass()}`}>
          {tier.name} Tier
        </div>
      </div>
      
      {/* Progress bar */}
      <div className={styles.progressSection}>
        <div className={styles.statsRow}>
          <span className={styles.statLabel}>Current: ${portfolioValue.toLocaleString()}</span>
          <span className={styles.statValue}>{Math.round(progress)}%</span>
          <span className={styles.statLabel}>Goal: ${kycThreshold.toLocaleString()}</span>
        </div>
        
        <div className={styles.progressBarContainer}>
          <div 
            className={`${styles.progressBar} ${getProgressBarClass()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {progress < 100 && (
          <p className={styles.message}>
            {KYC_CREATIVES.getProgressMessage(portfolioValue, kycThreshold)}
          </p>
        )}
      </div>
      
      {/* Tier benefits */}
      <div className={styles.benefitsGrid}>
        {tier.benefits.map((benefit, index) => (
          <div key={index} className={styles.benefitItem}>
            <div className={styles.benefitHeader}>
              <div className={`${styles.benefitIcon} ${getIconWrapperClass()}`}>
                <CheckIcon />
              </div>
              <span className={styles.benefitName}>
                {benefit.split(':')[0]}
              </span>
            </div>
            <p className={styles.benefitDesc}>
              {benefit.split(':')[1] || benefit}
            </p>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className={styles.actions}>
        {progress >= 100 ? (
          <button
            onClick={onVerifyClick}
            className={`${styles.primaryButton} ${styles.primaryButtonComplete}`}
          >
            <Award className={styles.primaryButtonIcon} />
            <span>Complete Verification</span>
            <Zap className={styles.primaryButtonIcon} />
          </button>
        ) : (
          <>
            <button
              onClick={onVerifyClick}
              className={styles.primaryButton}
            >
              <TrendingUp className={styles.primaryButtonIcon} />
              <span>Verify Early</span>
            </button>
            <button className={styles.secondaryButton}>
              Need ${Math.ceil(difference)}
            </button>
          </>
        )}
      </div>
      
      {/* Quick stats */}
      {progress < 100 && (
        <div className={styles.quickStats}>
          <div className={styles.quickStat}>
            <div className={styles.quickStatIcon}>
              <Zap />
            </div>
            <p className={styles.quickStatLabel}>Verify in</p>
            <p className={styles.quickStatValue}>
              {KYC_CREATIVES.getTimeToVerify()}
            </p>
          </div>
          
          <div className={styles.quickStat}>
            <div className={styles.quickStatIcon}>
              <TrendingUp />
            </div>
            <p className={styles.quickStatLabel}>Next Tier</p>
            <p className={styles.quickStatValue}>
              ${kycThreshold.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckIcon = () => (
  <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
  </svg>
);