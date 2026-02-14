// src/components/crypto/FiatAccountCard.tsx
import { CreditCard, Building, Send, Plus, AlertCircle, ChevronRight, Lock, TrendingUp, ArrowUpRight, Info, CheckCircle, Clock, Shield } from 'lucide-react';
import { useState } from 'react';

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

  const currencyColors = {
    USD: 'from-blue-500 to-cyan-500',
    EUR: 'from-indigo-500 to-blue-500',
    GBP: 'from-purple-500 to-pink-500'
  };

  const gradientColor = currencyColors[platform.currency as keyof typeof currencyColors] || 'from-slate-500 to-slate-600';

  return (
    <div 
      className={`group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
        requiresKYC 
          ? 'ring-2 ring-teal-500/20 hover:ring-teal-500/40' 
          : 'ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-blue-500/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
        requiresKYC 
          ? 'bg-gradient-to-br from-teal-500/5 via-transparent to-emerald-500/5' 
          : 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5'
      }`} />

      {/* KYC Badge */}
      {requiresKYC && (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative group/badge cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full blur-xl opacity-40 animate-pulse" />
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-xl border border-white/20">
              <Shield className="w-3.5 h-3.5" />
              <span className="tracking-wide">Verify</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 w-56 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-2xl opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none border border-teal-500/30">
              <p className="font-semibold mb-1">Higher Limits Available</p>
              <p className="text-slate-300">Verify your identity to increase your daily transaction limit to $10,000.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Platform Icon */}
          <div className="relative">
            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-60 transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } bg-gradient-to-br ${gradientColor}`} />
            
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-all duration-500 ${
              isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
            } bg-gradient-to-br ${gradientColor}`}>
              <span className="relative filter drop-shadow-lg">{platform.logo}</span>
            </div>

            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-3 border-white dark:border-slate-900 shadow-lg">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </div>
          </div>

          {/* Platform Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{platform.name}</h4>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                platform.type === 'bank' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
              }`}>
                {platform.type === 'bank' ? '🏦 Bank' : '💳 Payment'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{platform.currency}</span>
              {platform.accountNumber && (
                <>
                  <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-500 truncate">
                    {platform.accountNumber}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Balance Display - Monzo style */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Available</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
              {platform.currency}
            </span>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/30 to-transparent dark:from-slate-700/20 rounded-full blur-2xl" />
            
            <div className="relative">
              <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums mb-2">
                {showBalances 
                  ? `${currencySymbol}${platform.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : '••••••'
                }
              </p>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Account Active
                </span>
              </div>
            </div>

            {/* KYC Notice */}
            {requiresKYC && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-0.5">Unlock Higher Limits</p>
                    <p className="text-xs text-teal-600/80 dark:text-teal-400/80 leading-relaxed">
                      Verify your identity for daily limits up to $10,000
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Transfer Speed</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Instant</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Daily Limit</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {user?.is_verified ? '$10,000' : `$${kycThreshold.toLocaleString()}`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            onClick={onAddFunds}
            className={`group/btn relative px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
              requiresKYC
                ? 'bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-700 hover:via-teal-600 hover:to-emerald-700 text-white shadow-teal-500/30'
                : 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700 text-white shadow-blue-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
            <Plus className="w-5 h-5 relative z-10" strokeWidth={2.5} />
            <span className="relative z-10 tracking-wide">Add Funds</span>
          </button>
          
          <button 
            onClick={onTransfer}
            className="group/btn relative px-4 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-white rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            <Send className="w-5 h-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={2.5} />
            <span className="tracking-wide">Transfer</span>
          </button>
        </div>

        {/* Account Details - Expandable */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-3"
          >
            <span>Account Details</span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
          </button>

          {showDetails && (
            <div className="space-y-3 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Account Type</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white capitalize">{platform.type}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Currency</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{platform.currency}</span>
              </div>

              {platform.accountNumber && (
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Account Number</span>
                  <code className="text-xs font-mono font-bold text-slate-900 dark:text-white">{platform.accountNumber}</code>
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700/30">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
