"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FintechMetrics = FintechMetrics;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
function FintechMetrics(_a) {
    var totalIncome = _a.totalIncome, totalExpenses = _a.totalExpenses, walletBalance = _a.walletBalance, transactions = _a.transactions, _b = _a.walletCurrency, walletCurrency = _b === void 0 ? "USD" : _b;
    var _c = (0, react_1.useState)(null), hoveredMetric = _c[0], setHoveredMetric = _c[1];
    // Calculate real metrics from existing data
    var completedTransactions = transactions.filter(function (tx) { return tx.status === "completed"; }).length;
    var pendingTransactions = transactions.filter(function (tx) { return tx.status === "pending"; }).length;
    var failedTransactions = transactions.filter(function (tx) { return tx.status === "failed"; }).length;
    var totalTransactions = transactions.length;
    var successRate = totalTransactions > 0
        ? Math.round((completedTransactions / totalTransactions) * 100)
        : 0;
    var avgTransactionAmount = totalTransactions > 0
        ? transactions.reduce(function (sum, tx) { return sum + tx.amount; }, 0) / totalTransactions
        : 0;
    var netFlow = totalIncome - totalExpenses;
    // Safe growth rate calculation (prevent Infinity)
    var growthRate = totalIncome > 0
        ? (netFlow / totalIncome * 100)
        : netFlow > 0 ? 100 : 0;
    // Calculate trends (mock - in real app, compare with previous period)
    var calculateTrend = function (value, metricType) {
        if (value === 0)
            return { change: "0%", positive: true };
        // Mock trend based on common patterns
        var trends = {
            balance: { change: "+1.8%", positive: walletBalance > 1000 },
            income: { change: totalIncome > 500 ? "+2.4%" : "+0.5%", positive: true },
            expenses: { change: totalExpenses > 300 ? "-1.2%" : "-0.3%", positive: false },
            growth: { change: growthRate > 0 ? "+3.1%" : "-0.8%", positive: growthRate > 0 },
            success: { change: successRate > 80 ? "+5.2%" : "-1.5%", positive: successRate > 80 },
            avgTx: { change: avgTransactionAmount > 50 ? "+1.9%" : "-0.4%", positive: avgTransactionAmount > 50 }
        };
        return trends[metricType] || { change: "+0.0%", positive: true };
    };
    // Inspired by Wise/Revolut metrics cards
    var metrics = [
        {
            id: 1,
            title: "Total Balance",
            value: "".concat(walletCurrency, " ").concat(walletBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })),
            description: "Available funds in your account",
            trend: calculateTrend(walletBalance, "balance"),
            icon: lucide_react_1.Wallet,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
            borderColor: "border-blue-500/20",
            showDecimals: true,
        },
        {
            id: 2,
            title: "Monthly Income",
            value: "".concat(walletCurrency, " ").concat(totalIncome.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })),
            description: "Total credits this month",
            trend: calculateTrend(totalIncome, "income"),
            icon: lucide_react_1.DollarSign,
            color: "from-emerald-500 to-green-500",
            bgColor: "bg-gradient-to-br from-emerald-500/10 to-green-500/10",
            borderColor: "border-emerald-500/20",
            showDecimals: true,
        },
        {
            id: 3,
            title: "Monthly Expenses",
            value: "".concat(walletCurrency, " ").concat(totalExpenses.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })),
            description: "Total debits this month",
            trend: calculateTrend(totalExpenses, "expenses"),
            icon: lucide_react_1.PieChart,
            color: "from-rose-500 to-pink-500",
            bgColor: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
            borderColor: "border-rose-500/20",
            showDecimals: true,
        },
        {
            id: 4,
            title: "Net Growth",
            value: "".concat(growthRate >= 0 ? '+' : '').concat(growthRate.toFixed(1), "%"),
            description: "Income growth after expenses",
            trend: calculateTrend(growthRate, "growth"),
            icon: lucide_react_1.TrendingUp,
            color: growthRate >= 0 ? "from-emerald-500 to-green-500" : "from-rose-500 to-pink-500",
            bgColor: growthRate >= 0
                ? "bg-gradient-to-br from-emerald-500/10 to-green-500/10"
                : "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
            borderColor: growthRate >= 0 ? "border-emerald-500/20" : "border-rose-500/20",
            showDecimals: false,
        },
        {
            id: 5,
            title: "Success Rate",
            value: "".concat(successRate, "%"),
            description: "Completed transactions",
            trend: calculateTrend(successRate, "success"),
            icon: lucide_react_1.CheckCircle,
            color: successRate >= 90 ? "from-emerald-500 to-green-500" :
                successRate >= 70 ? "from-amber-500 to-yellow-500" : "from-rose-500 to-pink-500",
            bgColor: successRate >= 90 ? "bg-gradient-to-br from-emerald-500/10 to-green-500/10" :
                successRate >= 70 ? "bg-gradient-to-br from-amber-500/10 to-yellow-500/10" :
                    "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
            borderColor: successRate >= 90 ? "border-emerald-500/20" :
                successRate >= 70 ? "border-amber-500/20" : "border-rose-500/20",
            showDecimals: false,
        },
        {
            id: 6,
            title: "Avg Transaction",
            value: "".concat(walletCurrency, " ").concat(avgTransactionAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })),
            description: "Average transaction amount",
            trend: calculateTrend(avgTransactionAmount, "avgTx"),
            icon: lucide_react_1.BarChart3,
            color: "from-violet-500 to-purple-500",
            bgColor: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
            borderColor: "border-violet-500/20",
            showDecimals: true,
        },
    ];
    // Transaction status breakdown (inspired by Binance dashboard)
    var transactionStats = [
        {
            label: "Completed",
            value: completedTransactions,
            color: "bg-emerald-500",
            icon: lucide_react_1.CheckCircle,
            percentage: totalTransactions > 0 ? Math.round((completedTransactions / totalTransactions) * 100) : 0,
        },
        {
            label: "Pending",
            value: pendingTransactions,
            color: "bg-amber-500",
            icon: lucide_react_1.Clock,
            percentage: totalTransactions > 0 ? Math.round((pendingTransactions / totalTransactions) * 100) : 0,
        },
        {
            label: "Failed",
            value: failedTransactions,
            color: "bg-rose-500",
            icon: lucide_react_1.AlertCircle,
            percentage: totalTransactions > 0 ? Math.round((failedTransactions / totalTransactions) * 100) : 0,
        },
    ];
    return (<div className="space-y-6">
      {/* Header - Inspired by Wise dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
          <p className="text-gray-600 text-sm mt-1">
            Real-time metrics from your transactions • Updated just now
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <lucide_react_1.Percent className="w-4 h-4"/>
          <span>Live data</span>
        </div>
      </div>

      {/* Main Metrics Grid - Revolut style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map(function (metric) { return (<div key={metric.id} className={"relative p-5 rounded-2xl border ".concat(metric.borderColor, " ").concat(metric.bgColor, " \n                       hover:shadow-lg transition-all duration-300 hover:-translate-y-1\n                       ").concat(hoveredMetric === metric.id ? 'ring-2 ring-opacity-50 ring-gray-300' : '')} onMouseEnter={function () { return setHoveredMetric(metric.id); }} onMouseLeave={function () { return setHoveredMetric(null); }}>
            {/* Header with icon and help */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={"p-2 rounded-xl bg-gradient-to-br ".concat(metric.color, " bg-opacity-20")}>
                  <metric.icon className="w-5 h-5 text-gray-700"/>
                </div>
                <div className="relative group">
                  <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                  <div className="absolute invisible group-hover:visible -top-10 left-0 
                                bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap
                                z-10 shadow-xl">
                    {metric.description}
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                  <lucide_react_1.HelpCircle className="absolute -right-6 top-1 w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100"/>
                </div>
              </div>
              
              {/* Trend indicator */}
              <div className={"flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full\n                            ".concat(metric.trend.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>
                {metric.trend.positive ? (<lucide_react_1.ArrowUpRight className="w-3 h-3"/>) : (<lucide_react_1.ArrowDownRight className="w-3 h-3"/>)}
                {metric.trend.change}
              </div>
            </div>
            
            {/* Value display */}
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900 tracking-tight">
                {metric.value}
              </div>
              {metric.showDecimals && (<div className="text-xs text-gray-500 mt-1">
                  {metric.title === "Total Balance" ? "Available now" :
                    metric.title === "Monthly Income" ? "This month" :
                        "30-day average"}
                </div>)}
            </div>
            
            {/* Progress bar for rates */}
            {(metric.id === 4 || metric.id === 5) && (<div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{metric.value}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className={"h-full rounded-full ".concat(metric.trend.positive ? 'bg-emerald-500' : 'bg-rose-500')} style={{
                    width: metric.id === 5
                        ? "".concat(Math.min(successRate, 100), "%")
                        : "".concat(Math.min(Math.abs(growthRate), 100), "%")
                }}></div>
                </div>
              </div>)}
          </div>); })}
      </div>

      {/* Transaction Breakdown - Binance inspired */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Transaction Analytics</h3>
            <p className="text-sm text-gray-600">Status breakdown of {totalTransactions} transactions</p>
          </div>
          <div className="text-sm font-medium text-gray-700">
            <span className="text-emerald-600">{successRate}%</span> success rate
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transactionStats.map(function (stat, index) { return (<div key={index} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={"p-2 rounded-lg ".concat(stat.color, " bg-opacity-10")}>
                    <stat.icon className={"w-4 h-4 ".concat(stat.color.replace('bg-', 'text-'))}/>
                  </div>
                  <span className="font-medium text-gray-900">{stat.label}</span>
                </div>
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{stat.percentage}% of total</span>
                  <span>{stat.value} transactions</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={"h-full rounded-full ".concat(stat.color)} style={{ width: "".concat(stat.percentage, "%") }}></div>
                </div>
              </div>
            </div>); })}
        </div>
        
        {/* Summary row */}
        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalTransactions}</div>
            <div className="text-xs text-gray-600">Total TX</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {walletCurrency} {avgTransactionAmount.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600">Avg Amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {walletCurrency} {netFlow >= 0 ? '+' : ''}{netFlow.toFixed(2)}
            </div>
            <div className="text-xs text-gray-600">Net Flow</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(avgTransactionAmount * totalTransactions / 100) || 0}
            </div>
            <div className="text-xs text-gray-600">Volume Score</div>
          </div>
        </div>
      </div>
      
      {/* Legend/Help - Wise style */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Positive trend</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span>Needs attention</span>
          </div>
        </div>
        <div className="text-gray-400">
          Data updates in real-time • Hover for details
        </div>
      </div>
    </div>);
}
