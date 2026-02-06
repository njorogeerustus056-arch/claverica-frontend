"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsChart = StatisticsChart;
var recharts_1 = require("recharts");
var statsData = [
    { name: "Crypto", value: 3200 },
    { name: "Transfers", value: 2800 },
    { name: "Bills", value: 1500 },
    { name: "Investments", value: 3600 },
];
function StatisticsChart() {
    return (<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Platform Statistics
      </h2>

      <div className="h-72">
        <recharts_1.ResponsiveContainer width="100%" height="100%">
          <recharts_1.BarChart data={statsData}>
            <recharts_1.CartesianGrid strokeDasharray="3 3" className="opacity-30"/>
            <recharts_1.XAxis dataKey="name" stroke="gray"/>
            <recharts_1.YAxis stroke="gray"/>
            <recharts_1.Tooltip />
            <recharts_1.Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]}/>
          </recharts_1.BarChart>
        </recharts_1.ResponsiveContainer>
      </div>
    </div>);
}
