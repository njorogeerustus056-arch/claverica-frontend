"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/loans/RepaymentSchedule.tsx
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var recharts_1 = require("recharts");
// ─── Compact summary tile ───────────────────────────────────
var SummaryTile = function (_a) {
    var label = _a.label, value = _a.value, accent = _a.accent, Icon = _a.icon;
    var accentMap = {
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
        violet: "text-violet-400 border-violet-500/20 bg-violet-500/5",
    };
    var cls = accentMap[accent] || accentMap.cyan;
    return (<div className={"rounded-xl border ".concat(cls, " p-4")}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={"w-3.5 h-3.5 ".concat(cls.split(" ")[0])}/>
        <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          {label}
        </span>
      </div>
      <p className="text-xl font-bold text-white tabular-nums">{value}</p>
    </div>);
};
var RepaymentSchedule = function (_a) {
    var amount = _a.amount, term = _a.term, interestRate = _a.interestRate;
    var _b = (0, react_1.useState)(false), showFull = _b[0], setShowFull = _b[1];
    // ── amortisation maths ──────────────────────────────────
    var _c = (0, react_1.useMemo)(function () {
        var r = interestRate / 100 / 12;
        var pmt = (amount * (r * Math.pow(1 + r, term))) /
            (Math.pow(1 + r, term) - 1);
        var bal = amount;
        var totInt = 0;
        var totPri = 0;
        var rows = [];
        for (var m = 1; m <= term; m++) {
            var intPmt = bal * r;
            var priPmt = pmt - intPmt;
            bal -= priPmt;
            totInt += intPmt;
            totPri += priPmt;
            rows.push({
                month: m,
                payment: Math.round(pmt),
                principal: Math.round(priPmt),
                interest: Math.round(intPmt),
                balance: Math.max(0, Math.round(bal)),
            });
        }
        return {
            schedule: rows,
            totalInterest: totInt,
            totalPrincipal: totPri,
            monthlyPayment: Math.round(pmt),
        };
    }, [amount, term, interestRate]), schedule = _c.schedule, totalInterest = _c.totalInterest, totalPrincipal = _c.totalPrincipal, monthlyPayment = _c.monthlyPayment;
    var totalRepayment = Math.round(monthlyPayment * term);
    var displayed = showFull ? schedule : schedule.slice(0, 6);
    // ── pie data ────────────────────────────────────────────
    var pieData = [
        { name: "Principal", value: Math.round(totalPrincipal), color: "#10b981" },
        { name: "Interest", value: Math.round(totalInterest), color: "#a78bfa" },
    ];
    // ── early repayment estimates ───────────────────────────
    var earlyScenarios = [
        { label: "12 months early", saving: Math.round(totalInterest * 0.2) },
        { label: "24 months early", saving: Math.round(totalInterest * 0.35) },
    ];
    // ── CSV export ──────────────────────────────────────────
    var handleExport = function () {
        var header = "Month,Payment,Principal,Interest,Remaining Balance";
        var body = schedule
            .map(function (r) {
            return "".concat(r.month, ",$").concat(r.payment, ",$").concat(r.principal, ",$").concat(r.interest, ",$").concat(r.balance);
        })
            .join("\n");
        var blob = new Blob(["".concat(header, "\n").concat(body)], { type: "text/csv" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "repayment-schedule-$".concat(amount, "-").concat(term, "mo.csv");
        a.click();
        URL.revokeObjectURL(url);
    };
    return (<div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* top stripe */}
      <div className="h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500"/>

      <div className="p-6">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-violet-500/30 flex items-center justify-center">
              <lucide_react_1.Calendar className="w-4.5 h-4.5 text-violet-400"/>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Repayment Schedule
              </h2>
              <p className="text-xs text-slate-500">
                Full amortisation breakdown
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 rounded-lg transition-all">
              <lucide_react_1.Download className="w-3 h-3"/>
              Export
            </button>
            <button onClick={function () { return window.print(); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-lg transition-all">
              <lucide_react_1.Printer className="w-3 h-3 text-cyan-400"/>
              Print
            </button>
          </div>
        </div>

        {/* ── top row: 3 summary tiles ─────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <SummaryTile label="Monthly" value={"$".concat(monthlyPayment.toLocaleString())} accent="emerald" icon={lucide_react_1.DollarSign}/>
          <SummaryTile label="Total Interest" value={"$".concat(Math.round(totalInterest).toLocaleString())} accent="violet" icon={lucide_react_1.TrendingDown}/>
          <SummaryTile label="Total Repayment" value={"$".concat(totalRepayment.toLocaleString())} accent="cyan" icon={lucide_react_1.DollarSign}/>
        </div>

        {/* ── middle row: donut + early repayment ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* donut chart card */}
          <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Payment Breakdown
            </p>
            <div className="flex items-center justify-center">
              <div className="h-48">
                <recharts_1.ResponsiveContainer width="100%" height="100%">
                  <recharts_1.PieChart>
                    <recharts_1.Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} strokeWidth={0} dataKey="value" label={function (_a) {
            var name = _a.name, percent = _a.percent;
            return "".concat(name, " ").concat(((percent !== null && percent !== void 0 ? percent : 0) * 100).toFixed(0), "%");
        }} labelLine={{ stroke: "#475569", strokeWidth: 1 }}>
                      {pieData.map(function (entry, i) { return (<recharts_1.Cell key={i} fill={entry.color}/>); })}
                    </recharts_1.Pie>
                    <recharts_1.Tooltip contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f1f5f9",
            fontSize: 12,
        }} formatter={function (value) { return [
            "$".concat(value.toLocaleString()),
        ]; }}/>
                  </recharts_1.PieChart>
                </recharts_1.ResponsiveContainer>
              </div>
            </div>
            {/* legend */}
            <div className="flex justify-center gap-5 mt-2">
              {pieData.map(function (d) { return (<div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}/>
                  <span className="text-xs text-slate-500">{d.name}</span>
                </div>); })}
            </div>
          </div>

          {/* early repayment card */}
          <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Early Repayment Savings
            </p>

            {earlyScenarios.map(function (s) { return (<div key={s.label} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                <p className="text-lg font-bold text-emerald-400 tabular-nums">
                  Save ${s.saving.toLocaleString()}
                </p>
              </div>); })}

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 mt-auto">
              <p className="text-xs text-emerald-400 font-semibold">
                ✓ No prepayment penalties
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Flexible early repayment available
              </p>
            </div>
          </div>
        </div>

        {/* ── schedule table ──────────────────────────── */}
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl overflow-hidden">
          {/* table header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/40">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Monthly Breakdown
            </p>
            <button onClick={function () { return setShowFull(!showFull); }} className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              {showFull ? "Show Less" : "Show All"}
              {showFull ? (<lucide_react_1.ChevronUp className="w-3 h-3"/>) : (<lucide_react_1.ChevronDown className="w-3 h-3"/>)}
            </button>
          </div>

          {/* column headers */}
          <div className="grid grid-cols-5 gap-0 px-4 py-2 border-b border-slate-700/30">
            {["Month", "Payment", "Principal", "Interest", "Balance"].map(function (h) { return (<p key={h} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {h}
                </p>); })}
          </div>

          {/* rows */}
          {displayed.map(function (row) { return (<framer_motion_1.motion.div key={row.month} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-5 gap-0 px-4 py-2.5 border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
              {/* month */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center">
                  <span className="text-xs font-semibold text-slate-300 tabular-nums">
                    {row.month}
                  </span>
                </div>
              </div>
              {/* payment */}
              <p className="text-xs font-semibold text-white tabular-nums">
                ${row.payment.toLocaleString()}
              </p>
              {/* principal */}
              <p className="text-xs font-semibold text-emerald-400 tabular-nums">
                ${row.principal.toLocaleString()}
              </p>
              {/* interest */}
              <p className="text-xs font-semibold text-violet-400 tabular-nums">
                ${row.interest.toLocaleString()}
              </p>
              {/* balance */}
              <p className="text-xs font-semibold text-slate-400 tabular-nums">
                ${row.balance.toLocaleString()}
              </p>
            </framer_motion_1.motion.div>); })}

          {/* "more" indicator when collapsed */}
          {!showFull && schedule.length > 6 && (<div className="px-4 py-2 text-center">
              <p className="text-xs text-slate-600">
                +{schedule.length - 6} more months
              </p>
            </div>)}
        </div>
      </div>
    </div>);
};
exports.default = RepaymentSchedule;
