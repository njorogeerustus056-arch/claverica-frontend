"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetAllocationChart = void 0;
// src/components/crypto/AssetAllocationChart.tsx
var recharts_1 = require("recharts");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var AssetAllocationChart = function (_a) {
    var coins = _a.coins;
    var _b = (0, react_1.useState)(false), isExpanded = _b[0], setIsExpanded = _b[1];
    var _c = (0, react_1.useState)(null), selectedAsset = _c[0], setSelectedAsset = _c[1];
    var _d = (0, react_1.useState)(null), hoveredAsset = _d[0], setHoveredAsset = _d[1];
    var _e = (0, react_1.useState)(true), showValues = _e[0], setShowValues = _e[1];
    var _f = (0, react_1.useState)({ width: 400, height: 300 }), containerDimensions = _f[0], setContainerDimensions = _f[1];
    // Prepare chart data
    var chartData = coins
        .filter(function (coin) { return coin.valueUSD > 0; })
        .map(function (coin) { return ({
        name: coin.symbol,
        fullName: coin.name,
        value: coin.valueUSD,
        color: getColorForSymbol(coin.symbol),
        logo: coin.logo,
        change: coin.change24h,
    }); })
        .sort(function (a, b) { return b.value - a.value; });
    var totalValue = chartData.reduce(function (sum, item) { return sum + item.value; }, 0);
    if (chartData.length === 0) {
        return (<div className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center mb-4">
          <lucide_react_1.PieChart className="w-8 h-8 text-blue-600 dark:text-blue-400"/>
        </div>
        <p className="text-gray-900 dark:text-white font-semibold text-lg mb-2">No Assets Yet</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Start building your crypto portfolio by making your first investment
        </p>
      </div>);
    }
    // Get color for symbol
    function getColorForSymbol(symbol) {
        var colors = {
            BTC: '#F7931A', ETH: '#627EEA', USDT: '#26A17B', USDC: '#2775CA',
            BNB: '#F0B90B', SOL: '#00FFA3', ADA: '#0033AD', DOGE: '#C2A633',
            MATIC: '#8247E5', SHIB: '#FF8F0A', XRP: '#00A2E0', DOT: '#E6007A',
        };
        return colors[symbol] || "hsl(".concat(Math.floor(Math.random() * 60) + 200, ", 70%, 55%)");
    }
    // Custom tooltip
    var CustomTooltip = function (_a) {
        var active = _a.active, payload = _a.payload;
        if (active && payload && payload.length) {
            var data = payload[0].payload;
            var percentage = ((data.value / totalValue) * 100).toFixed(1);
            return (<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-2xl">
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
        </div>);
        }
        return null;
    };
    return (<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <lucide_react_1.BarChart3 className="w-6 h-6 text-white" strokeWidth={2}/>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Asset Allocation</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio distribution</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={function () { return setShowValues(!showValues); }} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700" title={showValues ? "Hide values" : "Show values"}>
            {showValues ? (<lucide_react_1.EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400"/>) : (<lucide_react_1.Eye className="w-4 h-4 text-gray-600 dark:text-gray-400"/>)}
          </button>
          
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {showValues ? "$".concat(totalValue.toLocaleString()) : '••••••'}
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
              <recharts_1.PieChart width={300} height={300}>
                <recharts_1.Pie data={chartData} cx={150} cy={150} innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {chartData.map(function (entry, index) { return (<recharts_1.Cell key={"cell-".concat(index)} fill={entry.color} stroke="white" strokeWidth={2}/>); })}
                </recharts_1.Pie>
                <recharts_1.Tooltip content={<CustomTooltip />}/>
              </recharts_1.PieChart>
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
              {chartData.slice(0, isExpanded ? chartData.length : 4).map(function (item, index) {
            var percentage = ((item.value / totalValue) * 100).toFixed(1);
            var isHovered = hoveredAsset === item.name;
            var isSelected = selectedAsset === item.name;
            return (<div key={index} className={"flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ".concat(isSelected
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600')} onClick={function () { return setSelectedAsset(selectedAsset === item.name ? null : item.name); }} onMouseEnter={function () { return setHoveredAsset(item.name); }} onMouseLeave={function () { return setHoveredAsset(null); }}>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: item.color }}>
                        {item.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                          <span className={"text-xs px-2 py-0.5 rounded-full ".concat(item.change >= 0
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400')}>
                            {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {showValues ? "$".concat(item.value.toLocaleString()) : '••••••'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</p>
                    </div>
                  </div>);
        })}

              {chartData.length > 4 && (<button onClick={function () { return setIsExpanded(!isExpanded); }} className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center justify-center gap-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-dashed border-gray-300 dark:border-gray-700">
                  {isExpanded ? (<>
                      Show Less <lucide_react_1.ChevronUp className="w-4 h-4"/>
                    </>) : (<>
                      Show {chartData.length - 4} More Assets <lucide_react_1.ChevronDown className="w-4 h-4"/>
                    </>)}
                </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.AssetAllocationChart = AssetAllocationChart;
