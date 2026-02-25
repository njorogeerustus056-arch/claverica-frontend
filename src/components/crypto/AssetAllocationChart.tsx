// src/components/crypto/AssetAllocationChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, PieChart as PieChartIcon, TrendingUp, TrendingDown, BarChart3, Award, Eye, EyeOff, Shield, Globe, Zap } from 'lucide-react';

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
  const [containerDimensions, setContainerDimensions] = useState({ width: 400, height: 300 });

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
  
  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center mb-4">
          <PieChartIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-gray-900 dark:text-white font-semibold text-lg mb-2">No Assets Yet</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Start building your crypto portfolio by making your first investment
        </p>
      </div>
    );
  }

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
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{data.logo}</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-base">{data.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{data.fullName}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Allocation</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{percentage}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Value</p>
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ${data.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <BarChart3 className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Asset Allocation</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio distribution</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowValues(!showValues)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            title={showValues ? "Hide values" : "Show values"}
          >
            {showValues ? (
              <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {showValues ? `$${totalValue.toLocaleString()}` : '••••••'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        {/* Use fixed dimensions instead of ResponsiveContainer */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Fixed size chart container */}
          <div className="lg:w-2/5 flex items-center justify-center">
            <div style={{ width: '100%', height: '300px' }}>
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
          <div className="lg:w-3/5">
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Asset Breakdown</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {chartData.length} asset{chartData.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
              {chartData.slice(0, isExpanded ? chartData.length : 4).map((item, index) => {
                const percentage = ((item.value / totalValue) * 100).toFixed(1);
                const isHovered = hoveredAsset === item.name;
                const isSelected = selectedAsset === item.name;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedAsset(selectedAsset === item.name ? null : item.name)}
                    onMouseEnter={() => setHoveredAsset(item.name)}
                    onMouseLeave={() => setHoveredAsset(null)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.change >= 0 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {showValues ? `$${item.value.toLocaleString()}` : '••••••'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</p>
                    </div>
                  </div>
                );
              })}

              {chartData.length > 4 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center justify-center gap-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-dashed border-gray-300 dark:border-gray-700"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show {chartData.length - 4} More Assets <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
