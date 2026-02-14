// src/components/Marquee/Marquee.tsx
import React from 'react';
import styles from './Marquee.module.css';
import { TrendingUp, TrendingDown, Shield, Zap, Lock, Globe } from 'lucide-react';

const Marquee = () => {
  const items = [
    { icon: <TrendingUp />, text: 'BTC +5.2%', value: '$45,231', positive: true },
    { icon: <Shield />, text: 'Secure Escrow', value: '100% Safe' },
    { icon: <Zap />, text: 'Fast Transfers', value: '< 2min' },
    { icon: <Lock />, text: 'Encrypted', value: 'AES-256' },
    { icon: <Globe />, text: 'Global', value: '150+ Countries' },
    { icon: <TrendingDown />, text: 'ETH -1.8%', value: '$3,210', positive: false },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={styles.marqueeContainer}>
      {/* Left gradient overlay */}
      <div className={`${styles.marqueeOverlay} ${styles.marqueeOverlayLeft}`} />
      
      {/* First row */}
      <div className={styles.marqueeTrack}>
        {duplicatedItems.map((item, index) => (
          <div key={index} className={styles.marqueeItem}>
            <div className={styles.marqueeIcon}>{item.icon}</div>
            <div>
              <div className={styles.marqueeText}>{item.text}</div>
              <div className={`${styles.marqueeValue} ${item.positive ? styles.marqueePositive : item.positive === false ? styles.marqueeNegative : ''}`}>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Second row (reverse direction) */}
      <div className={`${styles.marqueeTrack} ${styles.marqueeTrackReverse}`}>
        {duplicatedItems.map((item, index) => (
          <div key={`reverse-${index}`} className={styles.marqueeItem}>
            <div className={styles.marqueeIcon}>{item.icon}</div>
            <div>
              <div className={styles.marqueeText}>{item.text}</div>
              <div className={styles.marqueeValue}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Right gradient overlay */}
      <div className={`${styles.marqueeOverlay} ${styles.marqueeOverlayRight}`} />
    </div>
  );
};

export default Marquee;
