import styles from './LiveTicker.module.css';

interface LiveTickerProps {
  items?: string[];
  speed?: number;
}

const defaultItems = [
  "USD/GBP 0.7723",
  "USD/EUR 0.9124",
  "BTC/USD 97,420.00",
  "ETH/USD 3,812.00",
  "USDT/USD 1.0001"
];

export default function LiveTicker({ 
  items = defaultItems, 
  speed = 28 
}: LiveTickerProps) {
  // Duplicate array for seamless looping
  const tickerItems = items;

  return (
    <div className={styles.ticker}>
      <div 
        className={styles.tickerTrack}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* First set */}
        {tickerItems.map((item, i) => (
          <span key={`first-${i}`} className={styles.tickerItem}>{item}</span>
        ))}
        {/* Duplicate set for seamless loop */}
        {tickerItems.map((item, i) => (
          <span key={`second-${i}`} className={styles.tickerItem}>{item}</span>
        ))}
      </div>
    </div>
  );
}