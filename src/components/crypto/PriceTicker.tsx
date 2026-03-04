// src/components/crypto/PriceTicker.tsx
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Zap, Activity, PauseCircle, PlayCircle, Star } from 'lucide-react';
import styles from './PriceTicker.module.css';

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
    <div className={styles.priceTicker}>
      {/* Animated background gradient */}
      <div className={styles.animatedBg} />
      
      {/* Glow effect */}
      <div className={`${styles.glowEffect} ${isPositiveMarket ? styles.glowPositive : styles.glowNegative}`} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {/* Icon with pulse effect */}
          <div className={styles.iconWrapper}>
            <div className={`${styles.iconPulse} ${isPositiveMarket ? styles.iconPulsePositive : styles.iconPulseNegative}`} />
            <div className={`${styles.iconContainer} ${isPositiveMarket ? styles.iconContainerPositive : styles.iconContainerNegative}`}>
              <Activity className={styles.icon} />
            </div>
          </div>

          <div>
            <h3 className={styles.headerTitle}>
              Live Market Prices
              <span className={styles.liveBadge}>
                <Zap className={styles.icon} />
                Real-time
              </span>
            </h3>
            <p className={styles.marketStatus}>
              Market {isPositiveMarket ? '🟢' : '🔴'} 
              <span className={`${styles.marketStatusPositive} ${isPositiveMarket ? styles.marketStatusPositive : styles.marketStatusNegative}`}>
                {isPositiveMarket ? '+' : ''}{marketSentiment.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            onClick={handleRefresh}
            className={`${styles.controlButton} ${isRefreshing ? styles.refreshSpinning : ''}`}
          >
            <RefreshCw className={styles.controlIcon} />
          </button>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={styles.controlButton}
          >
            {isPaused ? (
              <PlayCircle className={styles.controlIcon} />
            ) : (
              <PauseCircle className={styles.controlIcon} />
            )}
            <span className={styles.controlText}>
              {isPaused ? 'Paused' : 'Live'}
            </span>
          </button>
        </div>
      </div>

      {/* Ticker Items */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerTrack}>
          {visibleCoins.map((coin, index) => {
            const isPositive = coin.change24h >= 0;
            
            return (
              <div key={`${coin.symbol}-${index}`} className={styles.tickerItem}>
                {/* Card */}
                <div className={`${styles.coinCard} ${isPositive ? styles.coinCardPositive : styles.coinCardNegative}`}>
                  {/* Glow effect on hover */}
                  <div className={`${styles.cardGlow} ${isPositive ? styles.cardGlowPositive : styles.cardGlowNegative}`} />
                  
                  <div className={styles.cardContent}>
                    {/* Coin Info */}
                    <div className={styles.coinInfo}>
                      <div className={styles.coinHeader}>
                        <span className={styles.coinSymbol}>{coin.symbol}</span>
                        {index < 3 && <Star className={styles.starIcon} />}
                      </div>
                      
                      {/* Price */}
                      <span className={styles.coinPrice}>
                        ${coin.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: coin.price < 1 ? 6 : 2
                        })}
                      </span>
                    </div>

                    {/* Separator */}
                    <div className={styles.separator} />

                    {/* Change Badge */}
                    <div className={styles.changeBadge}>
                      <div className={`${styles.changeValue} ${isPositive ? styles.changeValuePositive : styles.changeValueNegative}`}>
                        {isPositive ? (
                          <TrendingUp className={styles.changeIcon} />
                        ) : (
                          <TrendingDown className={styles.changeIcon} />
                        )}
                        <span>{isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                      </div>
                      
                      <span className={styles.changeText}>24h</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradient Overlays */}
        <div className={styles.overlayLeft} />
        <div className={styles.overlayRight} />
      </div>

      {/* Footer Stats */}
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.statsGroup}>
            <div className={styles.statItem}>
              <div className={`${styles.statDot} ${styles.statDotGaining}`} />
              <span className={styles.statText}>
                {coins.filter(c => c.change24h >= 0).length} gaining
              </span>
            </div>
            
            <div className={styles.statItem}>
              <div className={`${styles.statDot} ${styles.statDotLosing}`} />
              <span className={styles.statText}>
                {coins.filter(c => c.change24h < 0).length} losing
              </span>
            </div>
          </div>

          <div className={styles.trackingInfo}>
            <Activity className={styles.trackingIcon} />
            <span className={styles.trackingText}>
              Tracking {coins.length} cryptocurrencies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};