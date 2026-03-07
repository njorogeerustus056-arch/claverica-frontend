// src/components/crypto/QuickActions.tsx
import { Plus, Send, ArrowUpRight, ArrowDownRight, Shield, Zap, X, ChevronRight, TrendingUp, Sparkles, Lock, Clock } from 'lucide-react';
import { useState } from 'react';
import styles from './QuickActions.module.css';

interface QuickActionsProps {
  onDeposit: () => void;
  onTransfer: () => void;
  onBuy: (amount: number) => void;
  user: any;
  kycThreshold: number;
}

export const QuickActions = ({ onDeposit, onTransfer, onBuy, user, kycThreshold }: QuickActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const quickAmounts = [50, 100, 500, 1000, 2000, 5000];

  const handleQuickBuy = (amount: number) => {
    onBuy(amount);
  };

  const quickActions = [
    {
      id: 'deposit',
      icon: Plus,
      label: 'Deposit',
      description: 'Add funds to wallet',
      action: onDeposit,
      kycRequired: false,
    },
    {
      id: 'transfer',
      icon: Send,
      label: 'Transfer',
      description: 'Send to another account',
      action: onTransfer,
      kycRequired: !user?.is_verified && 2000 > kycThreshold,
    },
    {
      id: 'buy',
      icon: ArrowUpRight,
      label: 'Quick Buy',
      description: `Buy crypto instantly`,
      action: () => handleQuickBuy(selectedAmount),
      kycRequired: !user?.is_verified && selectedAmount > kycThreshold,
    },
    {
      id: 'sell',
      icon: ArrowDownRight,
      label: 'Quick Sell',
      description: 'Sell crypto instantly',
      action: () => console.log('Quick sell'),
      kycRequired: !user?.is_verified && selectedAmount > kycThreshold,
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className={styles.floatingButton}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.button} ${isOpen ? styles.buttonOpen : styles.buttonClosed}`}
        >
          {/* Pulsing ring */}
          <div className={styles.pulseRing} />
          
          {/* Glow effect */}
          <div className={styles.glow} />
          
          {/* Icon */}
          <div className={styles.icon}>
            {isOpen ? <X /> : <Zap />}
          </div>

          {/* Tooltip on hover */}
          <div className={styles.tooltip}>
            Quick Actions
            <div className={styles.tooltipArrow} />
          </div>
        </button>
      </div>

      {/* Quick Actions Panel */}
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <div 
            className={styles.backdrop}
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className={styles.panel}>
            {/* Header */}
            <div className={styles.panelHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.headerIcon}>
                  <Zap />
                </div>
                <div className={styles.headerText}>
                  <h3>Quick Actions</h3>
                  <p>Fast & secure transactions</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
              >
                <X className={styles.closeIcon} />
              </button>
            </div>

            {/* Content */}
            <div className={styles.panelContent}>
              {/* KYC Warning */}
              {!user?.is_verified && (
                <div className={styles.kycWarning}>
                  <div className={styles.decorative} />
                  
                  <div className={styles.warningContent}>
                    <div className={styles.warningIcon}>
                      <Shield />
                    </div>
                    <div className={styles.warningText}>
                      <div className={styles.warningHeader}>
                        <h4>Unlock Full Access</h4>
                        <span className={styles.warningBadge}>
                          Recommended
                        </span>
                      </div>
                      <p className={styles.warningDescription}>
                        Complete identity verification to increase your daily limit to ${kycThreshold.toLocaleString()} and unlock premium features.
                      </p>
                      <button className={styles.verifyButton}>
                        <Lock className={styles.actionIcon} />
                        <span>Verify Identity</span>
                        <ChevronRight className={styles.actionIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Amount Selector */}
              <div className={styles.amountSection}>
                <div className={styles.amountHeader}>
                  <label className={styles.amountLabel}>Select Amount</label>
                  <span className={styles.currencyTag}>USD</span>
                </div>
                
                <div className={styles.amountGrid}>
                  {quickAmounts.map((amount) => {
                    const requiresKYC = !user?.is_verified && amount > kycThreshold;
                    const isSelected = selectedAmount === amount;
                    
                    return (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`${styles.amountButton} ${isSelected ? styles.amountButtonSelected : ''}`}
                      >
                        {requiresKYC && (
                          <Lock className={styles.kycLock} />
                        )}
                        ${amount.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Custom amount input */}
                <div className={styles.customInput}>
                  <span className={styles.customInputPrefix}>$</span>
                  <input
                    type="number"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    className={styles.customInputField}
                    placeholder="Custom amount"
                  />
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div>
                <h4 className={styles.actionsTitle}>Choose Action</h4>
                <div className={styles.actionsGrid}>
                  {quickActions.map((action) => {
                    const ActionIcon = action.icon;
                    const isSelected = selectedAction === action.id;
                    
                    return (
                      <button
                        key={action.id}
                        onClick={() => {
                          setSelectedAction(action.id);
                          setTimeout(() => {
                            action.action();
                            setIsOpen(false);
                          }, 200);
                        }}
                        className={`${styles.actionCard} ${isSelected ? styles.actionCardSelected : ''}`}
                      >
                        {/* Background gradient */}
                        <div className={styles.actionBackground} />
                        
                        {/* Shine effect */}
                        <div className={styles.actionShine} />
                        
                        {/* KYC Badge */}
                        {action.kycRequired && (
                          <div className={styles.kycBadge}>
                            <Lock />
                          </div>
                        )}

                        {/* Content */}
                        <div className={styles.actionContent}>
                          <div className={styles.actionIconWrapper}>
                            <ActionIcon className={styles.actionIcon} />
                          </div>
                          <div>
                            <p className={styles.actionName}>{action.label}</p>
                            <p className={styles.actionDesc}>{action.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className={styles.statsCard}>
                <h4 className={styles.statsTitle}>Transaction Info</h4>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <div className={styles.statItemIcon}>
                      <TrendingUp />
                    </div>
                    <p className={styles.statItemLabel}>Daily Limit</p>
                    <p className={styles.statItemValue}>
                      {user?.is_verified ? '$10,000' : `$${kycThreshold.toLocaleString()}`}
                    </p>
                  </div>
                  
                  <div className={styles.statItem}>
                    <div className={styles.statItemIcon}>
                      <Sparkles />
                    </div>
                    <p className={styles.statItemLabel}>Fees</p>
                    <p className={styles.statItemValue}>0.1%</p>
                  </div>
                  
                  <div className={styles.statItem}>
                    <div className={styles.statItemIcon}>
                      <Clock />
                    </div>
                    <p className={styles.statItemLabel}>Speed</p>
                    <p className={styles.statItemValue}>Instant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
