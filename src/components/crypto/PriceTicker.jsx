"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTicker = void 0;
// src/components/crypto/PriceTicker.tsx
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var PriceTicker = function (_a) {
    var coins = _a.coins;
    var _b = (0, react_1.useState)(false), isPaused = _b[0], setIsPaused = _b[1];
    var _c = (0, react_1.useState)(coins.slice(0, 8)), visibleCoins = _c[0], setVisibleCoins = _c[1];
    var _d = (0, react_1.useState)(0), tickerOffset = _d[0], setTickerOffset = _d[1];
    var _e = (0, react_1.useState)(false), isRefreshing = _e[0], setIsRefreshing = _e[1];
    // Auto-scroll ticker
    (0, react_1.useEffect)(function () {
        if (isPaused)
            return;
        var interval = setInterval(function () {
            setTickerOffset(function (prev) { return (prev + 1) % coins.length; });
        }, 3000);
        return function () { return clearInterval(interval); };
    }, [isPaused, coins.length]);
    (0, react_1.useEffect)(function () {
        var start = tickerOffset % coins.length;
        var end = Math.min(start + 8, coins.length);
        var visible = __spreadArray([], coins.slice(start, end), true);
        // If we don't have enough coins, add from beginning
        if (visible.length < 8 && coins.length > 0) {
            visible.push.apply(visible, coins.slice(0, 8 - visible.length));
        }
        setVisibleCoins(visible);
    }, [tickerOffset, coins]);
    var handleRefresh = function () {
        setIsRefreshing(true);
        setTimeout(function () { return setIsRefreshing(false); }, 1000);
    };
    var marketSentiment = coins.reduce(function (acc, coin) { return acc + coin.change24h; }, 0) / coins.length;
    var isPositiveMarket = marketSentiment >= 0;
    return (<div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift"/>
      
      {/* Glow effect */}
      <div className={"absolute inset-0 opacity-30 transition-opacity duration-1000 ".concat(isPositiveMarket
            ? 'bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10'
            : 'bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10')}/>

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Icon with pulse effect */}
          <div className="relative">
            <div className={"absolute inset-0 rounded-xl blur-xl opacity-60 ".concat(isPositiveMarket ? 'bg-emerald-500' : 'bg-red-500', " animate-pulse")}/>
            <div className={"relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ".concat(isPositiveMarket
            ? 'from-emerald-500 to-green-600'
            : 'from-red-500 to-rose-600')}>
              <lucide_react_1.Activity className="w-5 h-5 text-white" strokeWidth={2.5}/>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Live Market Prices
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-white">
                <lucide_react_1.Zap className="w-3 h-3"/>
                Real-time
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Market {isPositiveMarket ? '🟢' : '🔴'} 
              <span className={"ml-1 font-bold ".concat(isPositiveMarket ? 'text-emerald-400' : 'text-red-400')}>
                {isPositiveMarket ? '+' : ''}{marketSentiment.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className={"p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 ".concat(isRefreshing ? 'animate-spin' : '')}>
            <lucide_react_1.RefreshCw className="w-4 h-4 text-white" strokeWidth={2.5}/>
          </button>
          
          <button onClick={function () { return setIsPaused(!isPaused); }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95">
            {isPaused ? (<lucide_react_1.PlayCircle className="w-4 h-4 text-white" strokeWidth={2.5}/>) : (<lucide_react_1.PauseCircle className="w-4 h-4 text-white" strokeWidth={2.5}/>)}
            <span className="text-xs font-bold text-white">
              {isPaused ? 'Paused' : 'Live'}
            </span>
          </button>
        </div>
      </div>

      {/* Ticker Items */}
      <div className="relative px-4 py-4 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {visibleCoins.map(function (coin, index) {
            var isPositive = coin.change24h >= 0;
            return (<div key={"".concat(coin.symbol, "-").concat(index)} className="flex-shrink-0 group relative">
                {/* Card */}
                <div className={"relative px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer border ".concat(isPositive
                    ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/20'
                    : 'bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20')}>
                  {/* Glow effect on hover */}
                  <div className={"absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl ".concat(isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20')}/>
                  
                  <div className="relative flex items-center gap-4">
                    {/* Coin Symbol */}
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white tracking-tight">{coin.symbol}</span>
                        {index < 3 && (<lucide_react_1.Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"/>)}
                      </div>
                      
                      {/* Price */}
                      <span className="text-sm font-mono font-bold text-white tabular-nums">
                        ${coin.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: coin.price < 1 ? 6 : 2
                })}
                      </span>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-10 bg-white/10"/>

                    {/* Change Badge */}
                    <div className={"flex flex-col items-end gap-1.5 min-w-[80px]"}>
                      <div className={"flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg ".concat(isPositive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40')}>
                        {isPositive ? (<lucide_react_1.TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5}/>) : (<lucide_react_1.TrendingDown className="w-3.5 h-3.5" strokeWidth={2.5}/>)}
                        <span className="tabular-nums">{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                      </div>
                      
                      <span className="text-xs text-slate-400 font-medium">24h</span>
                    </div>
                  </div>
                </div>
              </div>);
        })}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent pointer-events-none"/>
      </div>

      {/* Footer Stats */}
      <div className="relative px-6 py-3 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
              <span className="text-xs font-medium text-slate-400">
                {coins.filter(function (c) { return c.change24h >= 0; }).length} gaining
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
              <span className="text-xs font-medium text-slate-400">
                {coins.filter(function (c) { return c.change24h < 0; }).length} losing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <lucide_react_1.Activity className="w-3.5 h-3.5 text-slate-500"/>
            <span className="text-xs text-slate-400 font-medium">
              Tracking {coins.length} cryptocurrencies
            </span>
          </div>
        </div>
      </div>
    </div>);
};
exports.PriceTicker = PriceTicker;
// Add to your global CSS for gradient animation
var gradientAnimation = "\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n.animate-gradient-shift {\n  background-size: 200% 200%;\n  animation: gradient-shift 8s ease infinite;\n}\n";
