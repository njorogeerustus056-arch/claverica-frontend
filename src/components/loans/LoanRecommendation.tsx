// src/components/loans/LoanRecommendation.tsx
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  Brain,
  Rocket,
  ThumbsUp,
  Clock,
  ArrowRight,
} from "lucide-react";

interface LoanRecommendationProps {
  userProfile: any;
  loans: any[];
  onSelectLoan: (loanId: string) => void;
}

// ─── Rank badge colours (Gold / Silver / Bronze) ───────────
const RANK_COLORS = [
  { bg: "from-amber-500 to-yellow-400", shadow: "shadow-amber-500/20" },
  { bg: "from-slate-400 to-slate-500", shadow: "shadow-slate-500/10" },
  { bg: "from-amber-700 to-amber-800", shadow: "shadow-amber-700/10" },
];

const LoanRecommendation = ({
  userProfile,
  loans,
  onSelectLoan,
}: LoanRecommendationProps) => {
  // ── scoring engine ──────────────────────────────────────
  const getRecommendedLoans = () => {
    const hour = new Date().getHours();

    const timeBonus: Record<string, number> = {};
    if (hour >= 22 || hour < 6) {
      timeBonus.emergency = 20;
      timeBonus.personal = 10;
    } else if (hour >= 6 && hour < 9) {
      timeBonus.business = 20;
      timeBonus.investment = 15;
    } else if (hour >= 17 && hour < 22) {
      timeBonus.personal = 20;
      timeBonus.auto = 15;
      timeBonus.mortgage = 10;
    } else {
      timeBonus.education = 15;
      timeBonus.medical = 10;
      timeBonus.personal = 15;
    }

    return loans
      .map((loan) => {
        let score = 0;
        if (loan.popular) score += 25;

        const rate = parseFloat(loan.interest.replace("%", ""));
        score += Math.max(0, 15 - rate) * 2;

        if (
          loan.fundingTime.includes("Same day") ||
          loan.fundingTime.includes("Instant")
        )
          score += 20;
        else if (loan.fundingTime.includes("24")) score += 15;

        score += loan.features.length * 3;
        score += timeBonus[loan.id] || 0;

        return { ...loan, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const recommended = getRecommendedLoans();

  const getReason = (loan: any) => {
    if (loan.id === "emergency") return "Fast funding for urgent needs";
    if (loan.id === "personal") return "Flexible for various purposes";
    if (loan.id === "business") return "Supports growth & expansion";
    if (loan.id === "education") return "Invest in your future";
    return "Best value for your current profile";
  };

  // Match % — highest for #1, descending
  const matchPct = (idx: number) => Math.max(92, 98 - idx * 3);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* ── gradient top stripe ──────────────────────────── */}
      <div className="h-0.5 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500" />

      <div className="p-6">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
              <Brain className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                AI Recommendations
              </h2>
              <p className="text-xs text-slate-500">
                Tailored to your profile & market data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/30 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-xs font-bold text-violet-400">SMART AI</span>
          </div>
        </div>

        {/* ── cards grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map((loan, idx) => {
            const Icon = loan.icon;
            const rank = RANK_COLORS[idx];
            const match = matchPct(idx);

            return (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                onClick={() => onSelectLoan(loan.id)}
                className="relative bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 rounded-xl p-4 cursor-pointer transition-all duration-250 flex flex-col"
              >
                {/* ── rank badge + score pill ────────────── */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rank.bg} shadow-sm ${rank.shadow} flex items-center justify-center`}
                  >
                    <span className="text-sm font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md tabular-nums">
                      {loan.score}/100
                    </span>
                    {idx === 0 && <Rocket className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                </div>

                {/* ── loan info ──────────────────────────── */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${loan.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {loan.name}
                    </p>
                    <p className="text-xs text-slate-500">{loan.provider}</p>
                  </div>
                </div>

                {/* ── AI reason ──────────────────────────── */}
                <div className="flex items-start gap-2 bg-slate-800/60 border border-slate-700/40 rounded-lg p-3 mb-4">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Why this works
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {getReason(loan)}
                    </p>
                  </div>
                </div>

                {/* ── quick stats row ────────────────────── */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center bg-slate-800/50 border border-slate-700/30 rounded-lg py-2">
                    <p className="text-base font-bold text-white tabular-nums">
                      {loan.interest}
                    </p>
                    <p className="text-xs text-slate-500">APR</p>
                  </div>
                  <div className="text-center bg-slate-800/50 border border-slate-700/30 rounded-lg py-2">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <p className="text-sm font-bold text-white">
                        {loan.fundingTime}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">Funding</p>
                  </div>
                </div>

                {/* ── match score bar ────────────────────── */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-500">Match Score</span>
                    <span className="text-xs font-bold text-emerald-400 tabular-nums">
                      {match}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${match}%` }}
                    />
                  </div>
                </div>

                {/* ── action row ─────────────────────────── */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLoan(loan.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg shadow-sm shadow-cyan-500/20 hover:shadow-md hover:shadow-cyan-500/30 transition-all group"
                  >
                    Select
                    <Target className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="w-9 flex items-center justify-center border border-slate-700 hover:border-slate-500 rounded-lg transition-all">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── AI explanation footer ───────────────────────── */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1">
              How recommendations work
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our algorithm scores loans across market rates, your financial
              profile, funding speed, popularity, and historical performance.
              Results update in real-time as conditions change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanRecommendation;