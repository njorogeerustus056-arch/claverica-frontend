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

// Import components - FIXED: Changed from @/ to relative paths
import { PriceTicker } from "../../components/crypto/PriceTicker";
import { TransactionHistory } from "../../components/crypto/TransactionHistory";
import { QuickActions } from "../../components/crypto/QuickActions";
import { AssetAllocationChart } from "../../components/crypto/AssetAllocationChart";
import { CryptoWalletCard } from "../../components/crypto/CryptoWalletCard";
import { FiatAccountCard } from "../../components/crypto/FiatAccountCard";

// Import data
import { cryptoCoins } from "../../data/cryptoCoins";
import { fiatPlatforms } from "../../data/fiatPlatforms";

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

  // ========== ENHANCED SMART KYC HANDLER ==========
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

    // Check KYC requirement via API
    const requirement = await checkRequirement('crypto', amount);
    
    if (!isVerified && requirement?.requiresKYC) {
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
      
      // Show enhanced modal or redirect directly
      if (amount > kycThreshold * 2) {
        // Large amount - show detailed modal
        setPendingAction({ 
          action, 
          amount, 
          asset, 
          creativeContext 
        });
        setShowKYCModal(true);
        return false;
      } else {
        // ✅ FIXED: Redirect to KYC page with correct path
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
    
    return true;
  }, [isAuthenticated, isVerified, checkRequirement, navigate, kycThreshold]);

  // ========== ACTION HANDLERS - FIXED WITH TRY/CATCH AND NULL CHECKS ==========
  const handleCreateWallet = async () => {
    try {
      const amount = 0;
      const action = 'create_wallet';
      const allowed = await handleKYCRequiredAction(action, amount);
      if (allowed) {
        navigate('/dashboard/crypto/create-wallet');
      }
    } catch (error) {
      console.error('Error in handleCreateWallet:', error);
    }
  };

  const handleDeposit = async () => {
    try {
      const amount = 1000;
      const action = 'deposit';
      const allowed = await handleKYCRequiredAction(action, amount);
      if (allowed) {
        navigate('/dashboard/crypto/deposit');
      }
    } catch (error) {
      console.error('Error in handleDeposit:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const amount = 500;
      const action = 'withdraw';
      const allowed = await handleKYCRequiredAction(action, amount);
      if (allowed) {
        navigate('/dashboard/crypto/withdraw');
      }
    } catch (error) {
      console.error('Error in handleWithdraw:', error);
    }
  };

  const handleTransfer = async () => {
    try {
      const amount = 2000;
      const action = 'transfer';
      const allowed = await handleKYCRequiredAction(action, amount);
      if (allowed) {
        navigate('/dashboard/crypto/transfer');
      }
    } catch (error) {
      console.error('Error in handleTransfer:', error);
    }
  };

  const handleBuyCrypto = async (coin: CryptoCoin, amount: number) => {
    try {
      if (!coin || !amount) {
        console.error('Missing coin or amount for buy action');
        return;
      }
      const action = 'buy';
      const allowed = await handleKYCRequiredAction(action, amount, coin.symbol, `Buy ${coin.symbol} instantly`);
      if (allowed) {
        navigate('/dashboard/crypto/buy', { state: { coin, amount } });
      }
    } catch (error) {
      console.error('Error in handleBuyCrypto:', error);
    }
  };

  const handleSendCrypto = async (coin: CryptoCoin, amount: number) => {
    try {
      if (!coin || !amount) {
        console.error('Missing coin or amount for send action');
        return;
      }
      const action = 'send';
      const allowed = await handleKYCRequiredAction(action, amount, coin.symbol, `Send ${coin.symbol} worldwide`);
      if (allowed) {
        navigate('/dashboard/crypto/send', { state: { coin, amount } });
      }
    } catch (error) {
      console.error('Error in handleSendCrypto:', error);
    }
  };

  const handleViewWallet = async (coin: CryptoCoin) => {
    try {
      if (!coin) {
        console.error('Missing coin for view wallet action');
        return;
      }
      const action = 'view_wallet';
      const allowed = await handleKYCRequiredAction(action, coin.valueUSD, coin.symbol, `View ${coin.symbol} wallet details`);
      if (allowed) {
        navigate('/dashboard/crypto/wallet', { state: { coin } });
      }
    } catch (error) {
      console.error('Error in handleViewWallet:', error);
    }
  };

  const handleAddFunds = async (platform: FiatPlatform, amount: number) => {
    try {
      const action = 'deposit';
      const allowed = await handleKYCRequiredAction(action, amount, platform.name, `Add funds to ${platform.name}`);
      if (allowed) {
        navigate('/dashboard/fiat/deposit', { state: { platform, amount } });
      }
    } catch (error) {
      console.error('Error in handleAddFunds:', error);
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  // ✅ FIXED: handleVerifyNow with correct path
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Remove header as requested */}
      
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
        {/* Portfolio Header - Revolut style */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-40"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Portfolio Value</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                    {showBalances 
                      ? `$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : '••••••'
                    }
                  </h2>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${portfolioChange >= 0 
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-red-500/15 text-red-700 dark:text-red-400'
                  }`}>
                    {portfolioChange >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions - Wise style */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleDeposit}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Add Money
            </button>
            <button 
              onClick={handleWithdraw}
              className="px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 group"
            >
              <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Withdraw
            </button>
            <button 
              onClick={handleCreateWallet}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              New Wallet
            </button>
          </div>
        </div>

        {/* Quick Stats Bar (Moved from header) */}
        <div className="flex items-center gap-6 p-4 bg-white/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {gainers} gaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {losers} losing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              24h volume: ${(cryptoValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              1.2M active traders
            </span>
          </div>
          {/* KYC Status */}
          <div className="flex items-center gap-2 ml-auto">
            <div className={`w-2 h-2 rounded-full ${isVerified ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>

        {/* Live Price Ticker */}
        <PriceTicker coins={coins} />

        {/* KYC Progress Bar */}
        {!isVerified && (
          <KYCProgressBar 
            portfolioValue={totalPortfolioValue} 
            kycThreshold={kycThreshold}
            onVerifyClick={handleVerifyNow}
          />
        )}

        {/* Smart KYC Banner - Only show when needed */}
        {isAuthenticated && !isVerified && totalPortfolioValue > kycThreshold * 0.7 && (
          <div className="relative overflow-hidden rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"></div>
            <div className="relative p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300">Unlock Full Potential</h3>
                  <span className="px-2.5 py-1 bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-300 text-xs font-bold rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-purple-800/80 dark:text-purple-400/80 mb-3 max-w-2xl">
                  You're ${Math.max(0, kycThreshold - totalPortfolioValue).toLocaleString()} away from KYC requirements. 
                  Verify now to access unlimited trading, higher withdrawal limits, and advanced security features.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={handleVerifyNow}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Complete KYC
                  </button>
                  <button 
                    onClick={() => setShowKYCModal(true)}
                    className="px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 text-purple-700 dark:text-purple-400 rounded-xl font-semibold text-sm transition-all border border-purple-200 dark:border-purple-700/50 flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs - Modern banking style */}
        <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-1 border border-slate-200/50 dark:border-slate-800/50">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
              { id: "crypto", label: "Cryptocurrency", icon: <Bitcoin className="w-4 h-4" /> },
              { id: "fiat", label: "Fiat & Banks", icon: <Banknote className="w-4 h-4" /> },
              { id: "cards", label: "Cards", icon: <CreditCard className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Allocation Chart */}
            {selectedTab === "overview" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6">
                <AssetAllocationChart coins={coins} />
              </div>
            )}

            {/* Crypto Section */}
            {(selectedTab === "overview" || selectedTab === "crypto") && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                        <Bitcoin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cryptocurrency Wallets</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{coins.length} assets</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleCreateWallet}
                        className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Wallet
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {filteredCoins.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Bitcoin className="w-10 h-10 text-slate-400" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Crypto Assets</h4>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">Start your crypto journey by adding your first wallet</p>
                      <button 
                        onClick={handleCreateWallet}
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                      >
                        <Key className="w-4 h-4" />
                        Create First Wallet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fiat Section */}
            {(selectedTab === "overview" || selectedTab === "fiat") && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fiat Accounts</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{fiatPlatforms.length} accounts</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleDeposit}
                      className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold text-sm transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Link Account
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Portfolio Stats */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Portfolio Breakdown</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                      <Bitcoin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Cryptocurrency</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{coins.filter(c => c.valueUSD > 0).length} assets</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {showBalances ? `$${cryptoValue.toLocaleString()}` : '••••••'}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">+2.3%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Fiat Currency</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{fiatPlatforms.length} accounts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {showBalances ? `$${fiatValue.toLocaleString()}` : '••••••'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Stable</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Quick Stats</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Daily Limit</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {isVerified ? '$10,000' : `$${kycThreshold.toLocaleString()}`}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">24h Volume</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      ${(cryptoValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Best Performer</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">BTC</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">+4.2%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Portfolio Risk</p>
                    <div className="flex items-center gap-1">
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Quick Status */}
              {!isVerified && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Verification</h5>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Required</span>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700/30">
                    <p className="text-xs text-amber-800 dark:text-amber-400 mb-2">
                      Verify to unlock higher limits and premium features
                    </p>
                    <button 
                      onClick={handleVerifyNow}
                      className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Complete Verification</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-in fade-in"
            onClick={() => setShowKYCModal(false)}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-800 rounded-t-3xl z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pendingAction.creativeContext.tier.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{pendingAction.creativeContext.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pendingAction.creativeContext.unlockableFeature}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Requires verification</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">Action:</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                      {pendingAction.action.replace('_', ' ')}
                    </span>
                  </div>
                  {pendingAction.asset && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">Asset:</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {pendingAction.asset}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">Amount:</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${pendingAction.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="p-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">What You'll Unlock:</h4>
                <div className="space-y-3 mb-6">
                  {pendingAction.creativeContext.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Estimated Reward */}
                {pendingAction.creativeContext.estimatedReward > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Potential Reward</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      +${pendingAction.creativeContext.estimatedReward.toFixed(2)}
                    </p>
                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                      Estimated savings/earnings from verification
                    </p>
                  </div>
                )}

                {/* Verification Info */}
                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Verification Time</span>
                  </div>
                  <p className="text-sm text-slate-900 dark:text-white font-semibold">
                    {pendingAction.creativeContext.timeToVerify}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Usually completed within this timeframe
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowKYCModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold transition-all"
                  >
                    Later
                  </button>
                  <button
                    onClick={() => {
                      // ✅ FIXED: Modal redirect with correct path
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Verify Now
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
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