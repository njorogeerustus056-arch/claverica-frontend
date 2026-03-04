// src/pages/dashboard/Crypto.tsx - MODERN BANKING EDITION with KYC Integration
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../lib/store/auth';
import { useKYC } from "../../hooks/useKYC";
import { KYC_CREATIVES } from "../../lib/utils/kycCreatives";
import { KYCProgressBar } from "../../components/crypto/KYCProgressBar";
import { 
  TrendingUp, TrendingDown, Plus, Send, ArrowUpRight, ArrowDownRight, 
  Wallet, Eye, EyeOff, Sparkles, Zap, Shield, AlertCircle, CreditCard,
  QrCode, Copy, Check, ExternalLink, ChevronRight, BarChart3, 
  Settings, RefreshCw, Clock, Lock, Unlock, Download, Upload, Key,
  Bell, HelpCircle, Search, Filter, ChevronLeft, ChevronRight as RightChevron,
  PieChart as PieChartIcon, Users, Globe, Smartphone, SmartphoneCharging,
  Bitcoin, Ethereum, DollarSign, Euro, PoundSterling, Banknote
} from "lucide-react";
import toast from 'react-hot-toast';

// Import components
import { PriceTicker } from "../../components/crypto/PriceTicker";
import { TransactionHistory } from "../../components/crypto/TransactionHistory";
import { QuickActions } from "../../components/crypto/QuickActions";
import { AssetAllocationChart } from "../../components/crypto/AssetAllocationChart";
import { CryptoWalletCard } from "../../components/crypto/CryptoWalletCard";
import { FiatAccountCard } from "../../components/crypto/FiatAccountCard";
import api from '../../api';

// Import data
import { cryptoCoins } from "../../data/cryptoCoins";
import { fiatPlatforms } from "../../data/fiatPlatforms";

// Import CSS Module
import styles from './Crypto.module.css';

interface CryptoCoin {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  balance: number;
  valueUSD: number;
  walletAddress?: string;
  network?: string;
}

interface FiatPlatform {
  id: string;
  name: string;
  logo: string;
  type: "bank" | "payment";
  balance: number;
  currency: string;
  accountNumber?: string;
  iban?: string;
  swift?: string;
}

export default function Crypto() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { kycStatus, checkRequirement, isVerified, refreshStatus } = useKYC();
  
  const [showBalances, setShowBalances] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"overview" | "crypto" | "fiat" | "cards">("overview");
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [portfolioChange, setPortfolioChange] = useState(0);
  const [kycThreshold] = useState(1500);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    action: string;
    amount: number;
    asset?: string;
    creativeContext?: any;
  } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.body.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    
    // Observer for class changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Fetch KYC status on mount
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  // Generate wallet addresses
  const generateWalletAddress = (symbol: string) => {
    const prefixes: Record<string, string> = {
      BTC: "bc1q",
      ETH: "0x",
      USDT: "0x",
      USDC: "0x",
      BNB: "bnb1",
      SOL: "So1",
      ADA: "addr1",
      DOGE: "D",
      MATIC: "0x",
      SHIB: "0x"
    };
    
    const prefix = prefixes[symbol] || "0x";
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}${random}...${Math.random().toString(36).substring(2, 6)}`;
  };

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      const updatedCoins = cryptoCoins.map(coin => ({
        ...coin,
        valueUSD: coin.price * coin.balance,
        walletAddress: generateWalletAddress(coin.symbol),
        network: coin.symbol === "BTC" ? "Bitcoin" : 
                coin.symbol === "ETH" ? "Ethereum ERC20" :
                coin.symbol === "SOL" ? "Solana" :
                coin.symbol === "ADA" ? "Cardano" : "ERC20"
      }));
      setCoins(updatedCoins);

      const total = updatedCoins.reduce((sum, coin) => sum + coin.valueUSD, 0) + 
                   fiatPlatforms.reduce((sum, p) => sum + p.balance, 0);
      setTotalPortfolioValue(total);
      setPortfolioChange(2.34);

      // Generate realistic chart data
      const chartData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: total * (0.95 + Math.random() * 0.1),
        volume: Math.random() * 1000000
      }));
      setPortfolioData(chartData);
    };
    
    loadData();
  }, []);

  // Live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => {
          const change = (Math.random() - 0.5) * 0.002;
          const newPrice = coin.price * (1 + change);
          return {
            ...coin,
            price: newPrice,
            change24h: coin.change24h + change,
            valueUSD: newPrice * coin.balance
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ========== ENHANCED SMART KYC HANDLER WITH KYC_SPEC INTEGRATION ==========
  const handleKYCRequiredAction = useCallback(async (
    action: string, 
    amount: number, 
    asset?: string,
    creativeHook?: string
  ) => {
    if (!isAuthenticated) {
      navigate('/auth/signin', { 
        state: { 
          redirectTo: '/dashboard/crypto',
          message: `Sign in to ${action.replace('_', ' ')} ${asset || ''}`
        }
      });
      return false;
    }

    try {
      // Step 1: Always log to KYC_Spec collect endpoint (always returns 200)
      await api.post('/kyc_spec/collect/', {
        product: 'crypto',
        product_subtype: action,
        user_email: user?.email,
        user_phone: user?.phone,
        amount: amount,
        asset: asset,
        timestamp: new Date().toISOString(),
        action: `crypto_${action}`,
        source: 'crypto_dashboard',
        metadata: {
          threshold: kycThreshold,
          portfolio_value: totalPortfolioValue,
          is_verified: isVerified
        }
      }).catch(err => {
        // Even if it fails, continue - this is just logging
        console.log('KYC_Spec log attempted (non-critical)');
      });

      // Step 2: Check actual KYC status
      let actualKYCStatus = false;
      let kycData = null;

      try {
        kycData = await api.get('/kyc/simple-status/');
        actualKYCStatus = kycData?.is_verified || false;
      } catch (kycErr) {
        console.log('KYC status check failed, using fallback');
        
        // Try KYC_Spec as fallback
        try {
          const specResponse = await api.get('/kyc_spec/summary/');
          actualKYCStatus = specResponse?.stats?.verified || false;
        } catch (specErr) {
          // If both fail, assume not verified for amounts over threshold
          actualKYCStatus = amount < kycThreshold;
        }
      }

      // Step 3: Check requirement via API
      const requirement = await checkRequirement('crypto', amount).catch(() => ({
        requiresKYC: amount > kycThreshold,
        hasApprovedKYC: actualKYCStatus
      }));

      // Step 4: Handle KYC prompt if needed
      if (!actualKYCStatus && (requirement?.requiresKYC || amount > kycThreshold)) {
        // Create creative context
        const creativeContext = {
          action,
          amount,
          asset,
          icon: KYC_CREATIVES.getIconForAction(action),
          benefits: KYC_CREATIVES.getActionBenefits(action, amount, asset),
          unlockableFeature: KYC_CREATIVES.getUnlockableFeature(action),
          estimatedReward: KYC_CREATIVES.getEstimatedReward(amount, action),
          kycThreshold: kycThreshold,
          creativeHook: creativeHook || `Unlock ${action.replace('_', ' ')} capabilities`,
          ctaText: KYC_CREATIVES.getCreativeCTAText(action, asset),
          tier: KYC_CREATIVES.getVerificationTier(amount),
          timeToVerify: KYC_CREATIVES.getTimeToVerify()
        };
        
        // Store for KYC page
        localStorage.setItem('kycCreativeContext', JSON.stringify(creativeContext));
        
        // Show modal for large amounts
        if (amount > kycThreshold * 2) {
          setPendingAction({ action, amount, asset, creativeContext });
          setShowKYCModal(true);
          return false;
        } else {
          // Redirect to KYC page
          navigate('/dashboard/kyc/submit', {
            state: {
              amount,
              service_type: 'crypto',
              action,
              asset,
              redirectTo: '/dashboard/crypto',
              creativeContext,
              attemptedAction: action,
              unlockBenefits: creativeContext.benefits.slice(0, 3)
            }
          });
          return false;
        }
      }

      // Step 5: For demo purposes - show coming soon message
      toast.success(`${action} requested - feature coming soon!`, {
        icon: '🚀',
        duration: 3000
      });
      
      return true;

    } catch (error) {
      console.log('KYC check recorded, proceeding with demo');
      toast.success('Demo mode: Action recorded', {
        icon: '🎮',
        duration: 2000
      });
      return true;
    }
  }, [isAuthenticated, isVerified, checkRequirement, navigate, kycThreshold, totalPortfolioValue, user]);

  // ========== ACTION HANDLERS ==========
  const handleCreateWallet = async () => {
    await handleKYCRequiredAction('create_wallet', 0, undefined, 'Create new crypto wallet');
  };

  const handleDeposit = async () => {
    await handleKYCRequiredAction('deposit', 1000, 'USD', 'Add funds to your account');
  };

  const handleWithdraw = async () => {
    await handleKYCRequiredAction('withdraw', 500, 'USD', 'Withdraw to external wallet');
  };

  const handleTransfer = async () => {
    await handleKYCRequiredAction('transfer', 2000, 'USD', 'Transfer between accounts');
  };

  const handleBuyCrypto = async (coin: CryptoCoin, amount: number) => {
    if (!coin || !amount) return;
    await handleKYCRequiredAction('buy', amount, coin.symbol, `Buy ${coin.symbol} instantly`);
  };

  const handleSendCrypto = async (coin: CryptoCoin, amount: number) => {
    if (!coin || !amount) return;
    await handleKYCRequiredAction('send', amount, coin.symbol, `Send ${coin.symbol} worldwide`);
  };

  const handleViewWallet = async (coin: CryptoCoin) => {
    if (!coin) return;
    await handleKYCRequiredAction('view_wallet', coin.valueUSD, coin.symbol, `View ${coin.symbol} wallet details`);
  };

  const handleAddFunds = async (platform: FiatPlatform, amount: number) => {
    await handleKYCRequiredAction('deposit', amount, platform.name, `Add funds to ${platform.name}`);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
    toast.success('Address copied!', { icon: '📋' });
  };

  const handleVerifyNow = () => {
    navigate('/dashboard/kyc/submit', {
      state: {
        amount: totalPortfolioValue,
        service_type: 'crypto',
        redirectTo: '/dashboard/crypto',
        creativeContext: {
          action: 'verify_portfolio',
          amount: totalPortfolioValue,
          icon: '🔓',
          benefits: [
            `Unlock $${(kycThreshold * 3).toLocaleString()} daily limits`,
            'Access premium trading features',
            'Priority customer support',
            'Advanced security options'
          ],
          tier: KYC_CREATIVES.getVerificationTier(totalPortfolioValue)
        }
      }
    });
  };

  // Filtered data
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics
  const cryptoValue = coins.reduce((sum, coin) => sum + coin.valueUSD, 0);
  const fiatValue = fiatPlatforms.reduce((sum, p) => sum + p.balance, 0);
  const gainers = coins.filter(c => c.change24h > 0).length;
  const losers = coins.filter(c => c.change24h < 0).length;

  return (
    <div className={`${styles.cryptoContainer} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.contentWrapper}>
        {/* Portfolio Header */}
        <div className={styles.portfolioHeader}>
          <div className={styles.portfolioHeaderLeft}>
            <div className={styles.portfolioIconWrapper}>
              <div className={styles.portfolioIconGlow}></div>
              <div className={styles.portfolioIcon}>
                <Wallet className={styles.portfolioIconSvg} />
              </div>
            </div>
            <div>
              <p className={styles.portfolioLabel}>Total Portfolio Value</p>
              <div className={styles.portfolioValueWrapper}>
                <h2 className={styles.portfolioValue}>
                  {showBalances 
                    ? `$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : '••••••'
                  }
                </h2>
                <div className={`${styles.portfolioChange} ${portfolioChange >= 0 ? styles.changePositive : styles.changeNegative}`}>
                  {portfolioChange >= 0 ? (
                    <TrendingUp className={styles.changeIcon} />
                  ) : (
                    <TrendingDown className={styles.changeIcon} />
                  )}
                  {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className={styles.quickActionsWrapper}>
            <button 
              onClick={handleDeposit}
              className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
            >
              <Download className={styles.actionIcon} />
              Add Money
            </button>
            <button 
              onClick={handleWithdraw}
              className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
            >
              <Upload className={styles.actionIcon} />
              Withdraw
            </button>
            <button 
              onClick={handleCreateWallet}
              className={`${styles.actionButton} ${styles.actionButtonGradient}`}
            >
              <Key className={styles.actionIcon} />
              New Wallet
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.statsBarItem}>
            <div className={`${styles.statusDot} ${styles.statusDotSuccess}`}></div>
            <span className={styles.statsBarText}>
              {gainers} gaining
            </span>
          </div>
          <div className={styles.statsBarItem}>
            <div className={`${styles.statusDot} ${styles.statusDotError}`}></div>
            <span className={styles.statsBarText}>
              {losers} losing
            </span>
          </div>
          <div className={styles.statsBarItem}>
            <Globe className={styles.statsBarIcon} />
            <span className={styles.statsBarText}>
              24h volume: ${(cryptoValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className={styles.statsBarItem}>
            <Users className={styles.statsBarIcon} />
            <span className={styles.statsBarText}>
              1.2M active traders
            </span>
          </div>
          <div className={`${styles.statsBarItem} ${styles.statsBarKyc}`}>
            <div className={`${styles.statusDot} ${isVerified ? styles.statusDotSuccess : styles.statusDotWarning}`}></div>
            <span className={styles.statsBarText}>
              {isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>

        {/* Price Ticker */}
        <PriceTicker coins={coins} />

        {/* KYC Progress Bar */}
        {!isVerified && (
          <KYCProgressBar 
            portfolioValue={totalPortfolioValue} 
            kycThreshold={kycThreshold}
            onVerifyClick={handleVerifyNow}
          />
        )}

        {/* Smart KYC Banner */}
        {isAuthenticated && !isVerified && totalPortfolioValue > kycThreshold * 0.7 && (
          <div className={styles.kycBanner}>
            <div className={styles.kycBannerGlow}></div>
            <div className={styles.kycBannerContent}>
              <div className={styles.kycBannerIconWrapper}>
                <div className={styles.kycBannerIcon}>
                  <Shield className={styles.kycBannerIconSvg} />
                </div>
              </div>
              <div className={styles.kycBannerText}>
                <div className={styles.kycBannerHeader}>
                  <h3 className={styles.kycBannerTitle}>Unlock Full Potential</h3>
                  <span className={styles.kycBannerBadge}>Recommended</span>
                </div>
                <p className={styles.kycBannerDescription}>
                  You're ${Math.max(0, kycThreshold - totalPortfolioValue).toLocaleString()} away from KYC requirements. 
                  Verify now to access unlimited trading, higher withdrawal limits, and advanced security features.
                </p>
                <div className={styles.kycBannerActions}>
                  <button 
                    onClick={handleVerifyNow}
                    className={`${styles.kycBannerButton} ${styles.kycBannerButtonPrimary}`}
                  >
                    <Lock className={styles.kycBannerButtonIcon} />
                    Complete KYC
                  </button>
                  <button 
                    onClick={() => setShowKYCModal(true)}
                    className={`${styles.kycBannerButton} ${styles.kycBannerButtonSecondary}`}
                  >
                    <HelpCircle className={styles.kycBannerButtonIcon} />
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className={styles.tabContainer}>
          <div className={styles.tabWrapper}>
            {[
              { id: "overview", label: "Overview", icon: <BarChart3 className={styles.tabIcon} /> },
              { id: "crypto", label: "Cryptocurrency", icon: <Bitcoin className={styles.tabIcon} /> },
              { id: "fiat", label: "Fiat & Banks", icon: <Banknote className={styles.tabIcon} /> },
              { id: "cards", label: "Cards", icon: <CreditCard className={styles.tabIcon} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`${styles.tabButton} ${selectedTab === tab.id ? styles.tabButtonActive : ''}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Asset Allocation Chart */}
            {selectedTab === "overview" && (
              <div className={styles.chartCard}>
                <AssetAllocationChart coins={coins} />
              </div>
            )}

            {/* Crypto Section */}
            {(selectedTab === "overview" || selectedTab === "crypto") && (
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionHeaderLeft}>
                    <div className={`${styles.sectionIcon} ${styles.sectionIconCrypto}`}>
                      <Bitcoin className={styles.sectionIconSvg} />
                    </div>
                    <div>
                      <h3 className={styles.sectionTitle}>Cryptocurrency Wallets</h3>
                      <p className={styles.sectionSubtitle}>{coins.length} assets</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleCreateWallet}
                    className={`${styles.sectionButton} ${styles.sectionButtonPrimary}`}
                  >
                    <Plus className={styles.sectionButtonIcon} />
                    Add Wallet
                  </button>
                </div>
                
                <div className={styles.sectionContent}>
                  {filteredCoins.length > 0 ? (
                    <div className={styles.cryptoGrid}>
                      {filteredCoins.slice(0, 4).map((coin) => (
                        <CryptoWalletCard
                          key={coin.symbol}
                          coin={coin}
                          showBalances={showBalances}
                          onBuy={() => handleBuyCrypto(coin, 1000)}
                          onSend={() => handleSendCrypto(coin, 500)}
                          onView={() => handleViewWallet(coin)}
                          onCopyAddress={() => handleCopyAddress(coin.walletAddress!)}
                          copiedAddress={copiedAddress}
                          user={user}
                          isVerified={isVerified}
                          kycThreshold={kycThreshold}
                          portfolioValue={totalPortfolioValue}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyStateIcon}>
                        <Bitcoin className={styles.emptyStateIconSvg} />
                      </div>
                      <h4 className={styles.emptyStateTitle}>No Crypto Assets</h4>
                      <p className={styles.emptyStateText}>Start your crypto journey by adding your first wallet</p>
                      <button 
                        onClick={handleCreateWallet}
                        className={styles.emptyStateButton}
                      >
                        <Key className={styles.emptyStateButtonIcon} />
                        Create First Wallet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fiat Section */}
            {(selectedTab === "overview" || selectedTab === "fiat") && (
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionHeaderLeft}>
                    <div className={`${styles.sectionIcon} ${styles.sectionIconFiat}`}>
                      <Banknote className={styles.sectionIconSvg} />
                    </div>
                    <div>
                      <h3 className={styles.sectionTitle}>Fiat Accounts</h3>
                      <p className={styles.sectionSubtitle}>{fiatPlatforms.length} accounts</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDeposit}
                    className={`${styles.sectionButton} ${styles.sectionButtonOutline}`}
                  >
                    <Plus className={styles.sectionButtonIcon} />
                    Link Account
                  </button>
                </div>
                
                <div className={styles.sectionContent}>
                  <div className={styles.fiatGrid}>
                    {fiatPlatforms.map((platform) => (
                      <FiatAccountCard
                        key={platform.id}
                        platform={platform}
                        showBalances={showBalances}
                        onAddFunds={() => handleAddFunds(platform, 1000)}
                        onTransfer={() => handleTransfer()}
                        user={user}
                        isVerified={isVerified}
                        kycThreshold={kycThreshold}
                        portfolioValue={totalPortfolioValue}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Portfolio Stats */}
            <div className={styles.statsCard}>
              <h4 className={styles.statsCardTitle}>Portfolio Breakdown</h4>
              
              <div className={styles.breakdownList}>
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemLeft}>
                    <div className={`${styles.breakdownIcon} ${styles.breakdownIconCrypto}`}>
                      <Bitcoin className={styles.breakdownIconSvg} />
                    </div>
                    <div>
                      <p className={styles.breakdownName}>Cryptocurrency</p>
                      <p className={styles.breakdownCount}>{coins.filter(c => c.valueUSD > 0).length} assets</p>
                    </div>
                  </div>
                  <div className={styles.breakdownRight}>
                    <p className={styles.breakdownValue}>
                      {showBalances ? `$${cryptoValue.toLocaleString()}` : '••••••'}
                    </p>
                    <p className={styles.breakdownChange}>+2.3%</p>
                  </div>
                </div>
                
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownItemLeft}>
                    <div className={`${styles.breakdownIcon} ${styles.breakdownIconFiat}`}>
                      <DollarSign className={styles.breakdownIconSvg} />
                    </div>
                    <div>
                      <p className={styles.breakdownName}>Fiat Currency</p>
                      <p className={styles.breakdownCount}>{fiatPlatforms.length} accounts</p>
                    </div>
                  </div>
                  <div className={styles.breakdownRight}>
                    <p className={styles.breakdownValue}>
                      {showBalances ? `$${fiatValue.toLocaleString()}` : '••••••'}
                    </p>
                    <p className={styles.breakdownStable}>Stable</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className={styles.quickStats}>
                <h5 className={styles.quickStatsTitle}>Quick Stats</h5>
                <div className={styles.quickStatsGrid}>
                  <div className={styles.quickStatItem}>
                    <p className={styles.quickStatLabel}>Daily Limit</p>
                    <p className={styles.quickStatValue}>
                      {isVerified ? '$10,000' : `$${kycThreshold.toLocaleString()}`}
                    </p>
                  </div>
                  <div className={styles.quickStatItem}>
                    <p className={styles.quickStatLabel}>24h Volume</p>
                    <p className={styles.quickStatValue}>
                      ${(cryptoValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className={styles.quickStatItem}>
                    <p className={styles.quickStatLabel}>Best Performer</p>
                    <div className={styles.quickStatFlex}>
                      <span className={styles.quickStatAsset}>BTC</span>
                      <span className={styles.quickStatPositive}>+4.2%</span>
                    </div>
                  </div>
                  <div className={styles.quickStatItem}>
                    <p className={styles.quickStatLabel}>Portfolio Risk</p>
                    <div className={styles.quickStatFlex}>
                      <div className={styles.riskBar}>
                        <div className={styles.riskBarFill} style={{ width: '33%' }}></div>
                      </div>
                      <span className={styles.quickStatLow}>Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Quick Status */}
              {!isVerified && (
                <div className={styles.kycQuickStatus}>
                  <div className={styles.kycQuickHeader}>
                    <h5 className={styles.kycQuickTitle}>Verification</h5>
                    <span className={styles.kycQuickRequired}>Required</span>
                  </div>
                  <div className={styles.kycQuickContent}>
                    <p className={styles.kycQuickText}>
                      Verify to unlock higher limits and premium features
                    </p>
                    <button 
                      onClick={handleVerifyNow}
                      className={styles.kycQuickButton}
                    >
                      <Shield className={styles.kycQuickButtonIcon} />
                      <span>Complete Verification</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className={styles.transactionCard}>
              <TransactionHistory 
                coins={coins}
                fiatPlatforms={fiatPlatforms}
                user={user}
                isVerified={isVerified}
                kycThreshold={kycThreshold}
                onViewDetails={(tx) => {
                  if (!isVerified && tx.amount > kycThreshold) {
                    setPendingAction({ 
                      action: tx.type, 
                      amount: tx.amount,
                      asset: tx.asset
                    });
                    setShowKYCModal(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions */}
      <QuickActions 
        onDeposit={handleDeposit}
        onTransfer={handleTransfer}
        onBuy={(amount) => {
          if (coins[0]) handleBuyCrypto(coins[0], amount);
        }}
        user={user}
        isVerified={isVerified}
        kycThreshold={kycThreshold}
        portfolioValue={totalPortfolioValue}
      />

      {/* Enhanced Smart KYC Modal */}
      {showKYCModal && pendingAction && pendingAction.creativeContext && (
        <>
          <div 
            className={styles.modalBackdrop}
            onClick={() => setShowKYCModal(false)}
          />
          
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              {/* Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalIconWrapper}>
                  <div className={`${styles.modalIcon} ${pendingAction.creativeContext.tier.color}`}>
                    <span className={styles.modalIconText}>{pendingAction.creativeContext.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className={styles.modalTitle}>{pendingAction.creativeContext.unlockableFeature}</h3>
                  <p className={styles.modalSubtitle}>Requires verification</p>
                </div>
              </div>
              
              <div className={styles.modalActionDetails}>
                <div className={styles.modalActionRow}>
                  <span className={styles.modalActionLabel}>Action:</span>
                  <span className={styles.modalActionValue}>
                    {pendingAction.action.replace('_', ' ')}
                  </span>
                </div>
                {pendingAction.asset && (
                  <div className={styles.modalActionRow}>
                    <span className={styles.modalActionLabel}>Asset:</span>
                    <span className={styles.modalActionValue}>
                      {pendingAction.asset}
                    </span>
                  </div>
                )}
                <div className={styles.modalActionRow}>
                  <span className={styles.modalActionLabel}>Amount:</span>
                  <span className={styles.modalActionValue}>
                    ${pendingAction.amount.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Benefits */}
              <div className={styles.modalBenefits}>
                <h4 className={styles.modalBenefitsTitle}>What You'll Unlock:</h4>
                <div className={styles.modalBenefitsList}>
                  {pendingAction.creativeContext.benefits.map((benefit: string, index: number) => (
                    <div key={index} className={styles.modalBenefitItem}>
                      <div className={styles.modalBenefitIcon}>
                        <Check className={styles.modalBenefitIconSvg} />
                      </div>
                      <span className={styles.modalBenefitText}>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Estimated Reward */}
                {pendingAction.creativeContext.estimatedReward > 0 && (
                  <div className={styles.modalReward}>
                    <div className={styles.modalRewardHeader}>
                      <TrendingUp className={styles.modalRewardIcon} />
                      <span className={styles.modalRewardTitle}>Potential Reward</span>
                    </div>
                    <p className={styles.modalRewardAmount}>
                      +${pendingAction.creativeContext.estimatedReward.toFixed(2)}
                    </p>
                    <p className={styles.modalRewardNote}>
                      Estimated savings/earnings from verification
                    </p>
                  </div>
                )}

                {/* Verification Info */}
                <div className={styles.modalVerificationInfo}>
                  <div className={styles.modalVerificationHeader}>
                    <Clock className={styles.modalVerificationIcon} />
                    <span className={styles.modalVerificationTitle}>Verification Time</span>
                  </div>
                  <p className={styles.modalVerificationTime}>
                    {pendingAction.creativeContext.timeToVerify}
                  </p>
                  <p className={styles.modalVerificationNote}>
                    Usually completed within this timeframe
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className={styles.modalActions}>
                  <button
                    onClick={() => setShowKYCModal(false)}
                    className={styles.modalCancelButton}
                  >
                    Later
                  </button>
                  <button
                    onClick={() => {
                      navigate('/dashboard/kyc/submit', {
                        state: {
                          amount: pendingAction.amount,
                          service_type: 'crypto',
                          action: pendingAction.action,
                          asset: pendingAction.asset,
                          creativeContext: pendingAction.creativeContext,
                          redirectTo: '/dashboard/crypto'
                        }
                      });
                      setShowKYCModal(false);
                    }}
                    className={styles.modalConfirmButton}
                  >
                    <Lock className={styles.modalConfirmIcon} />
                    Verify Now
                  </button>
                </div>
                
                <p className={styles.modalSecurityNote}>
                  Secure & encrypted document processing
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}