// src/components/crypto/PriceTicker.tsx
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Zap, Activity, PauseCircle, PlayCircle, Star } from 'lucide-react';

interface PriceTickerProps {
  coins: Array<{
    symbol: string;
    price: number;
    change24h: number;
  }>;
}

export const PriceTicker = ({ coins }: PriceTickerProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCoins, setVisibleCoins] = useState(coins.slice(0, 8));
  const [tickerOffset, setTickerOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-scroll ticker
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTickerOffset(prev => (prev + 1) % coins.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, coins.length]);

  useEffect(() => {
    const start = tickerOffset % coins.length;
    const end = Math.min(start + 8, coins.length);
    const visible = [...coins.slice(start, end)];
    
    // If we don't have enough coins, add from beginning
    if (visible.length < 8 && coins.length > 0) {
      visible.push(...coins.slice(0, 8 - visible.length));
    }
    
    setVisibleCoins(visible);
  }, [tickerOffset, coins]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const marketSentiment = coins.reduce((acc, coin) => acc + coin.change24h, 0) / coins.length;
  const isPositiveMarket = marketSentiment >= 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift" />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 opacity-30 transition-opacity duration-1000 ${
        isPositiveMarket 
          ? 'bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10' 
          : 'bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10'
      }`} />

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Icon with pulse effect */}
          <div className="relative">
            <div className={`absolute inset-0 rounded-xl blur-xl opacity-60 ${
              isPositiveMarket ? 'bg-emerald-500' : 'bg-red-500'
            } animate-pulse`} />
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${
              isPositiveMarket 
                ? 'from-emerald-500 to-green-600' 
                : 'from-red-500 to-rose-600'
            }`}>
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Live Market Prices
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-white">
                <Zap className="w-3 h-3" />
                Real-time
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Market {isPositiveMarket ? '🟢' : '🔴'} 
              <span className={`ml-1 font-bold ${isPositiveMarket ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositiveMarket ? '+' : ''}{marketSentiment.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95"
          >
            {isPaused ? (
              <PlayCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
            ) : (
              <PauseCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
            )}
            <span className="text-xs font-bold text-white">
              {isPaused ? 'Paused' : 'Live'}
            </span>
          </button>
        </div>
      </div>

      {/* Ticker Items */}
      <div className="relative px-4 py-4 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {visibleCoins.map((coin, index) => {
            const isPositive = coin.change24h >= 0;
            
            return (
              <div
                key={`${coin.symbol}-${index}`}
                className="flex-shrink-0 group relative"
              >
                {/* Card */}
                <div className={`relative px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer border ${
                  isPositive 
                    ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/20' 
                    : 'bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20'
                }`}>
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl ${
                    isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`} />
                  
                  <div className="relative flex items-center gap-4">
                    {/* Coin Symbol */}
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white tracking-tight">{coin.symbol}</span>
                        {index < 3 && (
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        )}
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
                    <div className="w-px h-10 bg-white/10" />

                    {/* Change Badge */}
                    <div className={`flex flex-col items-end gap-1.5 min-w-[80px]`}>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg ${
                        isPositive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                        )}
                        <span className="tabular-nums">{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                      </div>
                      
                      <span className="text-xs text-slate-400 font-medium">24h</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent pointer-events-none" />
      </div>

      {/* Footer Stats */}
      <div className="relative px-6 py-3 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-400">
                {coins.filter(c => c.change24h >= 0).length} gaining
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-400">
                {coins.filter(c => c.change24h < 0).length} losing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400 font-medium">
              Tracking {coins.length} cryptocurrencies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add to your global CSS for gradient animation
const gradientAnimation = `
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
`;