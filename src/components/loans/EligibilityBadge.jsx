"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/loans/EligibilityBadge.tsx
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
// ─── Status-driven colour tokens ────────────────────────────
var STATUS_TOKENS = {
    excellent: {
        ring: "#10b981", // emerald-500
        glow: "rgba(16,185,129,0.25)",
        badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        text: "text-emerald-400",
    },
    good: {
        ring: "#06b6d4", // cyan-500
        glow: "rgba(6,182,212,0.25)",
        badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
        text: "text-cyan-400",
    },
    fair: {
        ring: "#f59e0b", // amber-500
        glow: "rgba(245,158,11,0.25)",
        badge: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        text: "text-amber-400",
    },
};
var getTokens = function (status) {
    return STATUS_TOKENS[status.toLowerCase()] || STATUS_TOKENS.fair;
};
var getIcon = function (status) {
    switch (status.toLowerCase()) {
        case "excellent": return lucide_react_1.Award;
        case "good": return lucide_react_1.TrendingUp;
        case "fair": return lucide_react_1.Shield;
        default: return lucide_react_1.Zap;
    }
};
// ─── SVG ring component ─────────────────────────────────────
var ScoreRing = function (_a) {
    var score = _a.score, color = _a.color;
    var R = 28;
    var circumference = 2 * Math.PI * R;
    var progress = (score / 100) * circumference;
    var gap = circumference - progress;
    return (<svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
      {/* background track */}
      <circle cx="36" cy="36" r={R} fill="none" stroke="#1e293b" strokeWidth="5"/>
      {/* progress arc */}
      <circle cx="36" cy="36" r={R} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={"".concat(progress, " ").concat(gap)} style={{ transition: "stroke-dasharray 0.6s ease" }}/>
    </svg>);
};
var EligibilityBadge = function (_a) {
    var score = _a.score, status = _a.status, amount = _a.amount;
    var tokens = getTokens(status);
    var StatusIcon = getIcon(status);
    // Derived sub-metrics (illustrative; wire to real data as needed)
    var creditScore = Math.min(score + 10, 100);
    var approvalChance = 95;
    return (<framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }} className="group relative cursor-pointer">
      {/* card shell */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 transition-all duration-300 group-hover:border-slate-600">
        {/* ── top accent stripe ─────────────────────── */}
        <div className="h-0.5 -mx-5 -mt-5 mb-5 bg-gradient-to-r from-transparent via-slate-700 to-transparent"/>

        {/* ── score row ─────────────────────────────── */}
        <div className="flex items-center gap-4">
          {/* SVG ring */}
          <div className="relative flex items-center justify-center" style={{
            filter: "drop-shadow(0 0 6px ".concat(tokens.glow, ")"),
        }}>
            <ScoreRing score={score} color={tokens.ring}/>
            <span className="absolute text-lg font-bold text-white tabular-nums">
              {score}
            </span>
          </div>

          {/* info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <StatusIcon className={"w-3.5 h-3.5 ".concat(tokens.text)}/>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                Eligibility
              </span>
            </div>
            <p className={"text-base font-bold ".concat(tokens.text)}>{status}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Pre-approved for{" "}
              <span className="text-slate-300 font-semibold">
                ${amount.toLocaleString()}
              </span>
            </p>
          </div>

          {/* status badge */}
          <span className={"text-xs font-bold border px-2 py-0.5 rounded-md ".concat(tokens.badge)}>
            {status}
          </span>
        </div>

        {/* ── sub-metrics ─────────────────────────── */}
        <div className="mt-5 flex flex-col gap-3">
          {/* Credit Score bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Credit Score</span>
              <span className="text-xs font-semibold text-slate-300">750+</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500" style={{ width: "".concat(creditScore, "%") }}/>
            </div>
          </div>

          {/* Approval Chance bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Approval Chance</span>
              <span className="text-xs font-semibold text-slate-300">
                {approvalChance}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500" style={{ width: "".concat(approvalChance, "%") }}/>
            </div>
          </div>
        </div>

        {/* ── footer action ─────────────────────────── */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-xs text-slate-500">Ready to apply</span>
          </div>
          <button className="text-xs font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-500/8 hover:bg-cyan-500/15 px-3 py-1 rounded-md transition-all">
            View Rates →
          </button>
        </div>
      </div>

      {/* subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
            boxShadow: "0 0 24px ".concat(tokens.glow),
        }}/>
    </framer_motion_1.motion.div>);
};
exports.default = EligibilityBadge;
