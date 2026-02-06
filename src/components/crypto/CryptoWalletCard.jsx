"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoWalletCard = void 0;
// src/components/crypto/CryptoWalletCard.tsx
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var CryptoWalletCard = function (_a) {
    var coin = _a.coin, showBalances = _a.showBalances, onBuy = _a.onBuy, onSend = _a.onSend, onView = _a.onView, onCopyAddress = _a.onCopyAddress, copiedAddress = _a.copiedAddress, user = _a.user, kycThreshold = _a.kycThreshold;
    var requiresKYC = !(user === null || user === void 0 ? void 0 : user.is_verified) && coin.valueUSD > kycThreshold;
    var _b = (0, react_1.useState)(false), isHovered = _b[0], setIsHovered = _b[1];
    var _c = (0, react_1.useState)(false), showDetails = _c[0], setShowDetails = _c[1];
    var isPositive = coin.change24h >= 0;
    // Calculate 24h change in USD
    var change24hUSD = (coin.balance * coin.price * coin.change24h) / 100;
    return (<div className={"group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ".concat(requiresKYC
            ? 'ring-2 ring-purple-500/20 hover:ring-purple-500/40'
            : 'ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-blue-500/30')} onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }}>
      {/* Gradient Background Effect */}
      <div className={"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ".concat(requiresKYC
            ? 'bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5'
            : 'bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5')}/>

      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }}/>
      </div>

      {/* KYC Badge - Redesigned */}
      {requiresKYC && (<div className="absolute top-4 right-4 z-20">
          <div className="relative group/badge cursor-pointer">
            {/* Pulsing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-40 animate-pulse"/>
            
            {/* Badge content */}
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-xl border border-white/20">
              <lucide_react_1.Lock className="w-3.5 h-3.5 animate-pulse"/>
              <span className="tracking-wide">Verify ID</span>
              <lucide_react_1.Sparkles className="w-3 h-3"/>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 w-56 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-2xl opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none border border-purple-500/30">
              <p className="font-semibold mb-1">Verification Required</p>
              <p className="text-slate-300">Complete KYC to unlock unlimited transactions and advanced features.</p>
            </div>
          </div>
        </div>)}
      
      {/* Card Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Coin Icon with glow */}
            <div className="relative">
              <div className={"absolute inset-0 rounded-2xl blur-xl opacity-60 transition-all duration-500 ".concat(isHovered ? 'scale-110' : 'scale-100', " ").concat(requiresKYC
            ? 'bg-gradient-to-br from-purple-500 to-pink-600'
            : 'bg-gradient-to-br from-blue-500 to-cyan-600')}/>
              
              <div className={"relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 ".concat(isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0', " ").concat(requiresKYC
            ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600'
            : 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600')}>
                <span className="relative filter drop-shadow-lg">{coin.logo}</span>
              </div>

              {/* Active indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"/>
              </div>
            </div>

            {/* Coin Info */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{coin.name}</h4>
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{coin.symbol}</span>
                <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-slate-400">USD</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Price Change Badge */}
          <div className={"flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-lg transition-all duration-300 backdrop-blur-sm ".concat(isHovered ? 'scale-105 shadow-xl' : '', " ").concat(isPositive
            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30'
            : 'bg-red-500/15 text-red-700 dark:text-red-400 ring-1 ring-red-500/30')}>
            {isPositive ? (<lucide_react_1.TrendingUp className="w-4 h-4" strokeWidth={2.5}/>) : (<lucide_react_1.TrendingDown className="w-4 h-4" strokeWidth={2.5}/>)}
            <span className="tabular-nums">{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
          </div>
        </div>

        {/* Balance Section - Monzo-inspired */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Balance</span>
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
              {showBalances ? "".concat(coin.balance.toLocaleString(undefined, { maximumFractionDigits: 8 }), " ").concat(coin.symbol) : '••••••'}
            </span>
          </div>
          
          {/* Main Balance Display */}
          <div className="relative p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/30 to-transparent dark:from-slate-700/20 rounded-full blur-2xl"/>
            
            <div className="relative">
              <div className="flex items-baseline gap-3 mb-2">
                <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
                  {showBalances
            ? "$".concat(coin.valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
            : '••••••'}
                </p>
                {showBalances && (<div className={"flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold ".concat(isPositive
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400')}>
                    {isPositive ? '+' : ''}{change24hUSD.toFixed(2)}
                  </div>)}
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ≈ {showBalances ? coin.balance.toFixed(8) : '••••••'} {coin.symbol}
              </p>
            </div>

            {/* KYC Notice */}
            {requiresKYC && (<div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <lucide_react_1.Info className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-0.5">Action Required</p>
                    <p className="text-xs text-purple-600/80 dark:text-purple-400/80 leading-relaxed">
                      Complete identity verification to enable unlimited transactions
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Wallet Address Section */}
        {coin.walletAddress && (<div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Wallet Address</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  {coin.network}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 group/address hover:border-slate-300 dark:hover:border-slate-600 transition-all">
              <code className="flex-1 text-sm font-mono text-slate-700 dark:text-slate-300 truncate">
                {coin.walletAddress}
              </code>
              <button onClick={onCopyAddress} className="group/copy flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 active:scale-95">
                {copiedAddress === coin.walletAddress ? (<>
                    <lucide_react_1.Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>) : (<>
                    <lucide_react_1.Copy className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover/copy:text-blue-600 dark:group-hover/copy:text-blue-400"/>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover/copy:text-blue-600 dark:group-hover/copy:text-blue-400">Copy</span>
                  </>)}
              </button>
            </div>
          </div>)}

        {/* Action Buttons - Wise/Revolut style */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button onClick={onBuy} className={"group/btn relative px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ".concat(requiresKYC
            ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:via-purple-600 hover:to-pink-700 text-white shadow-purple-500/30'
            : 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700 text-white shadow-blue-500/30')}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"/>
            <lucide_react_1.Download className="w-5 h-5 relative z-10" strokeWidth={2.5}/>
            <span className="relative z-10 tracking-wide">Buy</span>
          </button>
          
          <button onClick={onSend} className="group/btn relative px-4 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-white rounded-2xl font-bold text-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
            <lucide_react_1.Send className="w-5 h-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={2.5}/>
            <span className="tracking-wide">Send</span>
          </button>
          
          <button onClick={onView} className="group/btn relative px-4 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-white rounded-2xl font-bold text-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
            <lucide_react_1.Eye className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" strokeWidth={2.5}/>
            <span className="tracking-wide">View</span>
          </button>
        </div>

        {/* Market Stats - Collapsible */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <button onClick={function () { return setShowDetails(!showDetails); }} className="w-full flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-3">
            <span>Market Statistics</span>
            <lucide_react_1.ChevronRight className={"w-4 h-4 transition-transform duration-300 ".concat(showDetails ? 'rotate-90' : '')}/>
          </button>

          {showDetails && showBalances && (<div className="grid grid-cols-3 gap-3 animate-in slide-in-from-top-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">24h High</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  ${(coin.price * 1.035).toFixed(2)}
                </p>
              </div>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">24h Low</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  ${(coin.price * 0.965).toFixed(2)}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Volume</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  ${(coin.valueUSD * 24.5).toFixed(0)}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </div>);
};
exports.CryptoWalletCard = CryptoWalletCard;
// Add to global CSS for shimmer animation
var shimmerKeyframes = "\n@keyframes shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n";
