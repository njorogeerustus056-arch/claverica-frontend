"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/loans/LoanCalculator.tsx
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var recharts_1 = require("recharts");
// ─── Thin neon-rule separator ────────────────────────────────
var NeonRule = function () { return (<div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"/>); };
// ─── Metric tile used in summary row ────────────────────────
var MetricTile = function (_a) {
    var label = _a.label, value = _a.value, sub = _a.sub, _b = _a.accent, accent = _b === void 0 ? "cyan" : _b, Icon = _a.icon;
    var accentMap = {
        cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        violet: "text-violet-400 border-violet-500/20 bg-violet-500/5",
        rose: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    };
    var cls = accentMap[accent] || accentMap.cyan;
    return (<div className={"rounded-xl border ".concat(cls, " p-4 flex flex-col gap-1.5 transition-all duration-300 hover:border-opacity-60")}>
      <div className="flex items-center gap-2">
        <Icon className={"w-3.5 h-3.5 ".concat(cls.split(" ")[0])}/>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
          {label}
        </span>
      </div>
      <span className="text-2xl font-bold text-white font-variant-numeric tabular-nums">
        {value}
      </span>
      {sub && <span className="text-xs text-slate-500">{sub}</span>}
    </div>);
};
// ─── Custom range slider that renders a styled track ─────────
var FintechSlider = function (_a) {
    var min = _a.min, max = _a.max, step = _a.step, value = _a.value, onChange = _a.onChange, formatValue = _a.formatValue;
    var pct = ((value - min) / (max - min)) * 100;
    return (<div className="relative flex flex-col gap-3">
      {/* value bubble */}
      <div className="absolute -top-6 flex items-center" style={{ left: "calc(".concat(pct, "% - 24px)") }}>
        <span className="bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded-md whitespace-nowrap shadow-lg shadow-black/30">
          {formatValue(value)}
        </span>
      </div>

      {/* track */}
      <div className="relative w-full h-1.5 rounded-full bg-slate-700/60">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: "".concat(pct, "%") }}/>
        <input type="range" min={min} max={max} step={step} value={value} onChange={function (e) { return onChange(Number(e.target.value)); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
        {/* thumb */}
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-cyan-500 shadow-md shadow-cyan-500/30 pointer-events-none" style={{ left: "calc(".concat(pct, "% - 8px)") }}/>
      </div>

      {/* min / max labels */}
      <div className="flex justify-between">
        <span className="text-xs text-slate-600">{formatValue(min)}</span>
        <span className="text-xs text-slate-600">{formatValue(max)}</span>
      </div>
    </div>);
};
var LoanCalculator = function (_a) {
    var loanAmount = _a.loanAmount, setLoanAmount = _a.setLoanAmount, selectedTerm = _a.selectedTerm, setSelectedTerm = _a.setSelectedTerm, selectedLoanId = _a.selectedLoanId, loanProducts = _a.loanProducts;
    var _b = (0, react_1.useState)(4.9), interestRate = _b[0], setInterestRate = _b[1];
    var selectedLoan = loanProducts.find(function (l) { return l.id === selectedLoanId; });
    // ── core maths ──────────────────────────────────────────
    var monthly = (0, react_1.useMemo)(function () {
        var r = interestRate / 100 / 12;
        var n = selectedTerm;
        return Math.round((loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1));
    }, [loanAmount, selectedTerm, interestRate]);
    var totalInterest = (0, react_1.useMemo)(function () { return monthly * selectedTerm - loanAmount; }, [monthly, selectedTerm, loanAmount]);
    var totalRepayment = loanAmount + totalInterest;
    var interestPct = ((totalInterest / loanAmount) * 100).toFixed(1);
    // ── chart data ──────────────────────────────────────────
    var chartData = (0, react_1.useMemo)(function () {
        var r = interestRate / 100 / 12;
        var bal = loanAmount;
        var out = [];
        var step = Math.max(1, Math.floor(selectedTerm / 12));
        for (var m = 1; m <= selectedTerm; m++) {
            var intPmt = bal * r;
            var prinPmt = monthly - intPmt;
            bal -= prinPmt;
            if (m % step === 0 || m === selectedTerm) {
                out.push({
                    month: m,
                    principal: Math.round(prinPmt),
                    interest: Math.round(intPmt),
                    balance: Math.max(0, Math.round(bal)),
                });
            }
        }
        return out;
    }, [loanAmount, selectedTerm, interestRate, monthly]);
    // ── quick-pick chips ────────────────────────────────────
    var amountChips = [5000, 25000, 50000, 75000, 100000];
    var termChips = [12, 24, 36, 48, 60, 72, 84];
    var rateChips = [2.9, 4.9, 6.9, 8.9, 10.9];
    var Chip = function (_a) {
        var active = _a.active, onClick = _a.onClick, children = _a.children;
        return (<button onClick={onClick} className={"px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ".concat(active
                ? "bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/10"
                : "bg-slate-800/60 border border-slate-700/40 text-slate-500 hover:border-slate-500 hover:text-slate-300")}>
      {children}
    </button>);
    };
    return (<div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* ── top accent stripe ────────────────────────────── */}
      <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-rose-500"/>

      <div className="p-6 lg:p-8">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-cyan-500/30 flex items-center justify-center">
              <lucide_react_1.Calculator className="w-5 h-5 text-cyan-400"/>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Loan Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Real-time payment estimates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/40 rounded-lg px-2.5 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-xs text-slate-400 font-medium">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* ── LEFT: controls ──────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Amount */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Loan Amount
                </span>
                <span className="text-xl font-bold text-white tabular-nums">
                  ${loanAmount.toLocaleString()}
                </span>
              </div>
              <FintechSlider min={1000} max={100000} step={1000} value={loanAmount} onChange={setLoanAmount} formatValue={function (v) { return "$".concat((v / 1000).toFixed(0), "k"); }}/>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {amountChips.map(function (a) { return (<Chip key={a} active={loanAmount === a} onClick={function () { return setLoanAmount(a); }}>
                    ${(a / 1000).toFixed(0)}k
                  </Chip>); })}
              </div>
            </div>

            {/* Term */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Loan Term
                </span>
                <div className="flex items-center gap-1.5">
                  <lucide_react_1.Calendar className="w-3.5 h-3.5 text-violet-400"/>
                  <span className="text-xl font-bold text-white tabular-nums">
                    {selectedTerm} <span className="text-sm font-medium text-slate-500">mo</span>
                  </span>
                </div>
              </div>
              <FintechSlider min={12} max={84} step={12} value={selectedTerm} onChange={setSelectedTerm} formatValue={function (v) { return "".concat(v, " mo"); }}/>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {termChips.map(function (t) { return (<Chip key={t} active={selectedTerm === t} onClick={function () { return setSelectedTerm(t); }}>
                    {t} mo
                  </Chip>); })}
              </div>
            </div>

            {/* Rate */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Interest Rate
                </span>
                <div className="flex items-center gap-1.5">
                  <lucide_react_1.Percent className="w-3.5 h-3.5 text-rose-400"/>
                  <span className="text-xl font-bold text-white tabular-nums">
                    {interestRate}<span className="text-sm font-medium text-slate-500">%</span>
                  </span>
                </div>
              </div>
              <FintechSlider min={2.9} max={15.9} step={0.1} value={interestRate} onChange={setInterestRate} formatValue={function (v) { return "".concat(v, "%"); }}/>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {rateChips.map(function (r) { return (<Chip key={r} active={interestRate === r} onClick={function () { return setInterestRate(r); }}>
                    {r}%
                  </Chip>); })}
              </div>
            </div>

            {/* selected loan badge */}
            {selectedLoan && (<div className="bg-slate-800/40 border border-violet-500/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-lg">
                  {selectedLoan.providerLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                    Selected Provider
                  </p>
                  <p className="text-sm text-white font-medium truncate">
                    {selectedLoan.name}
                  </p>
                </div>
                <span className="text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/30 px-2 py-0.5 rounded-md">
                  {selectedLoan.interest} APR
                </span>
              </div>)}
          </div>

          {/* ── RIGHT: results ──────────────────────────── */}
          <div className="flex flex-col gap-5">
            {/* summary tiles */}
            <div className="grid grid-cols-2 gap-3">
              <MetricTile label="Monthly" value={"$".concat(monthly.toLocaleString())} sub="per month" accent="cyan" icon={lucide_react_1.Target}/>
              <MetricTile label="Total Interest" value={"$".concat(totalInterest.toLocaleString())} sub={"".concat(interestPct, "% of principal")} accent="rose" icon={lucide_react_1.TrendingDown}/>
              <MetricTile label="Total Repayment" value={"$".concat(totalRepayment.toLocaleString())} sub="over full term" accent="emerald" icon={lucide_react_1.BarChart3}/>
              <MetricTile label="Effective Cost" value={"".concat(interestPct, "%")} sub="interest / principal" accent="violet" icon={lucide_react_1.Percent}/>
            </div>

            <NeonRule />

            {/* chart */}
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Amortisation Curve
                </span>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"/>
                    <span className="text-xs text-slate-500">Principal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-violet-400"/>
                    <span className="text-xs text-slate-500">Interest</span>
                  </div>
                </div>
              </div>

              <div className="h-48">
                <recharts_1.ResponsiveContainer width="100%" height="100%">
                  <recharts_1.AreaChart data={chartData} margin={{ top: 6, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <recharts_1.CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
                    <recharts_1.XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false}/>
                    <recharts_1.YAxis stroke="#475569" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={function (v) { return "$".concat((v / 1000).toFixed(0), "k"); }}/>
                    <recharts_1.Tooltip contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f1f5f9",
            fontSize: 12,
        }} formatter={function (value) { return ["$".concat(value.toLocaleString())]; }} labelFormatter={function (l) { return "Month ".concat(l); }}/>
                    <recharts_1.Area type="monotone" dataKey="principal" stroke="#22d3ee" strokeWidth={2} fill="url(#gPrincipal)" name="Principal"/>
                    <recharts_1.Area type="monotone" dataKey="interest" stroke="#a78bfa" strokeWidth={2} fill="url(#gInterest)" name="Interest"/>
                  </recharts_1.AreaChart>
                </recharts_1.ResponsiveContainer>
              </div>
            </div>

            {/* insight callout */}
            <div className="flex items-start gap-3 bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
              <lucide_react_1.Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-slate-500 leading-relaxed">
                At <span className="text-cyan-300 font-semibold">{interestRate}% APR</span> over{" "}
                <span className="text-violet-300 font-semibold">{selectedTerm} months</span>, you will pay{" "}
                <span className="text-rose-300 font-semibold">
                  ${totalInterest.toLocaleString()}
                </span>{" "}
                in total interest. Shorter terms reduce interest cost but raise your monthly payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = LoanCalculator;
