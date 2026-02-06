"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlySalesChart = MonthlySalesChart;
var recharts_1 = require("recharts");
var data = [
    { month: "Jan", sales: 3200 },
    { month: "Feb", sales: 4200 },
    { month: "Mar", sales: 3800 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 4700 },
    { month: "Jun", sales: 5200 },
];
function MonthlySalesChart() {
    return (<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Sales
      </h2>

      <div className="h-72">
        <recharts_1.ResponsiveContainer width="100%" height="100%">
          <recharts_1.LineChart data={data}>
            <recharts_1.CartesianGrid strokeDasharray="3 3" className="opacity-30"/>
            <recharts_1.XAxis dataKey="month" stroke="gray"/>
            <recharts_1.YAxis stroke="gray"/>
            <recharts_1.Tooltip />
            <recharts_1.Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }}/>
          </recharts_1.LineChart>
        </recharts_1.ResponsiveContainer>
      </div>
    </div>);
}
