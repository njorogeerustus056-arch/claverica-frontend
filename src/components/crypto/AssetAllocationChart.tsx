// src/components/crypto/AssetAllocationChart.tsx
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3, Eye, EyeOff } from 'lucide-react';
import styles from './AssetAllocationChart.module.css';

interface AssetAllocationChartProps {
  coins: Array<{
    symbol: string;
    name: string;
    valueUSD: number;
    logo: string;
    change24h: number;
  }>;
}

export const AssetAllocationChart = ({ coins }: AssetAllocationChartProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  const [showValues, setShowValues] = useState(true);

  // Prepare chart data
  const chartData = coins
    .filter(coin => coin.valueUSD > 0)
    .map(coin => ({
      name: coin.symbol,
      fullName: coin.name,
      value: coin.valueUSD,
      color: getColorForSymbol(coin.symbol),
      logo: coin.logo,
      change: coin.change24h,
    }))
    .sort((a, b) => b.value - a.value);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  
  // Get color for symbol
  function getColorForSymbol(symbol: string): string {
    const colors: Record<string, string> = {
      BTC: '#F7931A', ETH: '#627EEA', USDT: '#26A17B', USDC: '#2775CA',
      BNB: '#F0B90B', SOL: '#00FFA3', ADA: '#0033AD', DOGE: '#C2A633',
      MATIC: '#8247E5', SHIB: '#FF8F0A', XRP: '#00A2E0', DOT: '#E6007A',
    };
    return colors[symbol] || `hsl(${Math.floor(Math.random() * 60) + 200}, 70%, 55%)`;
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalValue) * 100).toFixed(1);
      
      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipHeader}>
            <div className={styles.tooltipIcon} style={{ backgroundColor: data.color }}>
              <span>{data.logo}</span>
            </div>
            <div>
              <p className={styles.tooltipName}>{data.name}</p>
              <p className={styles.tooltipFullName}>{data.fullName}</p>
            </div>
          </div>
          <div className={styles.tooltipGrid}>
            <div>
              <p className={styles.tooltipLabel}>Allocation</p>
              <p className={styles.tooltipValue}>{percentage}%</p>
            </div>
            <div>
              <p className={styles.tooltipLabel}>Value</p>
              <p className={styles.tooltipValue}>
                ${data.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <BarChart3 />
        </div>
        <p className={styles.emptyTitle}>No Assets Yet</p>
        <p className={styles.emptyText}>
          Start building your crypto portfolio by making your first investment
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            <BarChart3 />
          </div>
          <div className={styles.title}>
            <h4>Asset Allocation</h4>
            <p className={styles.subtitle}>Portfolio distribution</p>
          </div>
        </div>
        
        <div className={styles.controls}>
          <button
            onClick={() => setShowValues(!showValues)}
            className={styles.toggleButton}
            title={showValues ? "Hide values" : "Show values"}
          >
            {showValues ? <EyeOff className={styles.toggleIcon} /> : <Eye className={styles.toggleIcon} />}
          </button>
          
          <div className={styles.totalValue}>
            <p className={styles.totalLabel}>Total Value</p>
            <p className={styles.totalAmount}>
              {showValues ? `$${totalValue.toLocaleString()}` : '••••••'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chartSection}>
        {/* Chart */}
        <div className={styles.chartWrapper}>
          <div className={styles.chartContainer}>
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </div>
        </div>

        {/* Asset list */}
        <div className={styles.assetList}>
          <div className={styles.assetHeader}>
            <h5 className={styles.assetTitle}>Asset Breakdown</h5>
            <p className={styles.assetCount}>
              {chartData.length} asset{chartData.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className={styles.listContainer}>
            {chartData.slice(0, isExpanded ? chartData.length : 4).map((item, index) => {
              const percentage = ((item.value / totalValue) * 100).toFixed(1);
              const isHovered = hoveredAsset === item.name;
              const isSelected = selectedAsset === item.name;
              
              return (
                <div
                  key={index}
                  className={`${styles.assetItem} ${isSelected ? styles.assetItemSelected : ''}`}
                  onClick={() => setSelectedAsset(selectedAsset === item.name ? null : item.name)}
                  onMouseEnter={() => setHoveredAsset(item.name)}
                  onMouseLeave={() => setHoveredAsset(null)}
                >
                  <div className={styles.assetInfo}>
                    <div 
                      className={styles.assetIcon}
                      style={{ backgroundColor: item.color }}
                    >
                      <span>{item.logo}</span>
                    </div>
                    <div className={styles.assetDetails}>
                      <div className={styles.assetNameRow}>
                        <span className={styles.assetSymbol}>{item.name}</span>
                        <span className={`${styles.changeBadge} ${
                          item.change >= 0 ? styles.changePositive : styles.changeNegative
                        }`}>
                          {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                        </span>
                      </div>
                      <p className={styles.assetFullName}>{item.fullName}</p>
                    </div>
                  </div>
                  
                  <div className={styles.assetValue}>
                    <p className={styles.assetValueAmount}>
                      {showValues ? `$${item.value.toLocaleString()}` : '••••••'}
                    </p>
                    <p className={styles.assetValuePercentage}>{percentage}%</p>
                  </div>
                </div>
              );
            })}

            {chartData.length > 4 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.expandButton}
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className={styles.expandIcon} />
                  </>
                ) : (
                  <>
                    Show {chartData.length - 4} More Assets <ChevronDown className={styles.expandIcon} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};