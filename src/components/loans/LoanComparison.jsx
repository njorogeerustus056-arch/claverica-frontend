"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/loans/LoanComparison.tsx
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
// ─── SVG score ring (reused from EligibilityBadge style) ────
var MiniScoreRing = function (_a) {
    var score = _a.score;
    var R = 22;
    var circ = 2 * Math.PI * R;
    var progress = (score / 100) * circ;
    var color = score >= 85 ? "#10b981" : score >= 75 ? "#06b6d4" : "#f59e0b";
    return (<div className="relative flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r={R} fill="none" stroke="#1e293b" strokeWidth="4"/>
        <circle cx="28" cy="28" r={R} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={"".concat(progress, " ").concat(circ - progress)}/>
      </svg>
      <span className="absolute text-sm font-bold text-white tabular-nums">{score}</span>
    </div>);
};
var LoanComparison = function (_a) {
    var loans = _a.loans, onClose = _a.onClose;
    // ── scoring logic ─────────────────────────────────────────
    var getLoanScore = function (loan) {
        var s = 70;
        if (loan.popular)
            s += 10;
        if (parseFloat(loan.interest) < 5)
            s += 15;
        if (loan.fundingTime.includes("Same day") ||
            loan.fundingTime.includes("Instant"))
            s += 10;
        if (loan.features.length > 4)
            s += 5;
        return Math.min(s, 100);
    };
    var scoreLabel = function (score) {
        return score >= 85 ? "Excellent" : score >= 75 ? "Good" : "Fair";
    };
    var scoreBadge = function (score) {
        return score >= 85
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : score >= 75
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400";
    };
    // ── feature icon helper ───────────────────────────────────
    var featureIcon = function (feature) {
        if (feature.includes("No") || feature.includes("Free"))
            return <lucide_react_1.Check className="w-3 h-3 text-emerald-400"/>;
        if (feature.includes("Instant") || feature.includes("Same-day"))
            return <lucide_react_1.Zap className="w-3 h-3 text-amber-400"/>;
        if (feature.includes("Secure") || feature.includes("Protected"))
            return <lucide_react_1.Shield className="w-3 h-3 text-cyan-400"/>;
        return <lucide_react_1.Check className="w-3 h-3 text-slate-500"/>;
    };
    var rows = [
        {
            key: "interest",
            label: "Interest Rate",
            sub: "Annual Percentage Rate",
            icon: <lucide_react_1.TrendingUp className="w-4 h-4 text-emerald-400"/>,
            render: function (loan) { return (<div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-white tabular-nums">
            {loan.interest}
          </span>
          <span className="text-xs text-slate-500 mt-0.5">APR</span>
        </div>); },
        },
        {
            key: "amount",
            label: "Maximum Amount",
            sub: "Total loan available",
            icon: <span className="text-base">💰</span>,
            render: function (loan) { return (<span className="text-xl font-bold text-white">{loan.amount}</span>); },
        },
        {
            key: "term",
            label: "Loan Term",
            sub: "Repayment period",
            icon: <span className="text-base">📅</span>,
            render: function (loan) { return (<span className="text-lg font-bold text-white">{loan.term}</span>); },
        },
        {
            key: "funding",
            label: "Funding Time",
            sub: "Time to receive funds",
            icon: <lucide_react_1.Zap className="w-4 h-4 text-amber-400"/>,
            render: function (loan) { return (<span className="text-base font-semibold text-white">
          {loan.fundingTime}
        </span>); },
        },
        {
            key: "eligibility",
            label: "Eligibility",
            sub: "Minimum requirements",
            icon: <lucide_react_1.AlertCircle className="w-4 h-4 text-rose-400"/>,
            render: function (loan) { return (<span className="text-xs text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 inline-block">
          {loan.eligibility}
        </span>); },
        },
        {
            key: "features",
            label: "Key Features",
            sub: "Included benefits",
            icon: <lucide_react_1.Check className="w-4 h-4 text-emerald-400"/>,
            render: function (loan) { return (<ul className="flex flex-col gap-2 text-left">
          {loan.features.map(function (f, i) { return (<li key={i} className="flex items-start gap-2">
              {featureIcon(f)}
              <span className="text-xs text-slate-400">{f}</span>
            </li>); })}
        </ul>); },
        },
    ];
    return (<framer_motion_1.AnimatePresence>
      <framer_motion_1.motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        {/* ── header ──────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-cyan-500/30 flex items-center justify-center">
              <lucide_react_1.TrendingUp className="w-4.5 h-4.5 text-cyan-400"/>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Loan Comparison
              </h2>
              <p className="text-xs text-slate-500">
                {loans.length} loans selected
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 flex items-center justify-center transition-all">
            <lucide_react_1.X className="w-4 h-4 text-slate-400"/>
          </button>
        </div>

        {/* ── scrollable table ────────────────────────────── */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-800">
                {/* empty corner */}
                <th className="w-48 p-4"/>
                {loans.map(function (loan) {
            var Icon = loan.icon;
            return (<th key={loan.id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(loan.color, " flex items-center justify-center")}>
                          <Icon className="w-6 h-6 text-white"/>
                        </div>
                        <p className="text-sm font-bold text-white">
                          {loan.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {loan.provider}
                        </p>
                        {loan.popular && (<div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md">
                            <lucide_react_1.Star className="w-2.5 h-2.5"/>
                            Popular
                          </div>)}
                      </div>
                    </th>);
        })}
              </tr>
            </thead>

            <tbody>
              {rows.map(function (row, idx) { return (<tr key={row.key} className={"border-b border-slate-800/60 ".concat(idx % 2 === 0 ? "bg-slate-900" : "bg-slate-800/20")}>
                  {/* row label */}
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                        {row.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          {row.label}
                        </p>
                        <p className="text-xs text-slate-600">{row.sub}</p>
                      </div>
                    </div>
                  </td>

                  {/* loan values */}
                  {loans.map(function (loan) { return (<td key={loan.id} className="p-4 text-center">
                      {row.render(loan)}
                    </td>); })}
                </tr>); })}

              {/* ── score row ──────────────────────────────── */}
              <tr className="bg-slate-800/40">
                <td className="p-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Overall Score
                  </p>
                  <p className="text-xs text-slate-600">
                    Based on features & value
                  </p>
                </td>
                {loans.map(function (loan) {
            var score = getLoanScore(loan);
            return (<td key={loan.id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <MiniScoreRing score={score}/>
                        <span className={"text-xs font-bold border px-2 py-0.5 rounded-md ".concat(scoreBadge(score))}>
                          {scoreLabel(score)}
                        </span>
                      </div>
                    </td>);
        })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── footer ──────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <span className="text-xs text-slate-500">
            Comparing {loans.length} of 3 loans max
          </span>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 rounded-lg transition-all">
              Cancel
            </button>
            <button onClick={function () {
            var best = loans.reduce(function (a, b) {
                return getLoanScore(b) > getLoanScore(a) ? b : a;
            });
            console.log("Apply for:", best.id);
        }} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Apply for Best Match
              <lucide_react_1.ArrowRight className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>
      </framer_motion_1.motion.div>
    </framer_motion_1.AnimatePresence>);
};
exports.default = LoanComparison;
