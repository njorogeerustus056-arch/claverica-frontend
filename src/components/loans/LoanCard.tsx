// src/components/loans/LoanCard.tsx
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  TrendingUp,
  Zap,
  ArrowLeftRight,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface LoanCardProps {
  loan: {
    id: string;
    name: string;
    provider: string;
    icon: LucideIcon;
    color: string;       // kept for icon bg gradient, e.g. "from-cyan-500 to-blue-600"
    interest: string;
    amount: string;
    term: string;
    features: string[];
    popular: boolean;
    eligibility: string;
    fundingTime: string;
    providerLogo: string;
  };
  isSelected: boolean;
  isCompare: boolean;
  onSelect: () => void;
  onCompareToggle: () => void;
  onApply: () => void;
}

const LoanCard = ({
  loan,
  isSelected,
  isCompare,
  onSelect,
  onCompareToggle,
  onApply,
}: LoanCardProps) => {
  const Icon = loan.icon;

  // Parse the numeric amount for the "Max" stat chip
  const numericAmount = loan.amount.replace(/[^0-9.]/g, "");

  // Parse the minimum term number
  const minTerm = loan.term.replace(/[^0-9]/g, "").slice(0, 2) || "12";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
        border bg-slate-900
        ${
          isSelected
            ? "border-cyan-500/60 shadow-lg shadow-cyan-500/10"
            : "border-slate-800 hover:border-slate-600"
        }
      `}
    >
      {/* ── top accent stripe (animated on select) ─────── */}
      <div
        className={`h-0.5 transition-all duration-500 ${
          isSelected
            ? "bg-gradient-to-r from-cyan-500 via-violet-500 to-rose-500"
            : "bg-slate-800"
        }`}
      />

      <div className="p-5">
        {/* ── header row: provider + badges ──────────── */}
        <div className="flex items-start justify-between mb-5">
          {/* provider */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-base">
              {loan.providerLogo}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">{loan.provider}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-2.5 h-2.5 text-slate-600" />
                <span className="text-xs text-slate-600">{loan.fundingTime}</span>
              </div>
            </div>
          </div>

          {/* badges column */}
          <div className="flex flex-col items-end gap-1.5">
            {loan.popular && (
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md">
                <Star className="w-2.5 h-2.5" />
                Popular
              </div>
            )}

            {/* compare toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle();
              }}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                isCompare
                  ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400"
                  : "bg-slate-800 border border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
              }`}
              title={isCompare ? "Remove from comparison" : "Add to comparison"}
            >
              <ArrowLeftRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ── loan name row ───────────────────────────── */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${loan.color} flex items-center justify-center relative`}
          >
            <Icon className="w-5.5 h-5.5 text-white" />
            {loan.id === "emergency" && (
              <Zap className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-white">{loan.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-slate-500">Secured & Regulated</span>
            </div>
          </div>
        </div>

        {/* ── key stats ───────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "APR", value: loan.interest },
            { label: "Max", value: `$${Number(numericAmount).toLocaleString()}` },
            { label: "Min Term", value: `${minTerm} mo` },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center bg-slate-800/50 border border-slate-700/40 rounded-lg py-2 px-1"
            >
              <p className="text-xs font-bold text-white tabular-nums">{s.value}</p>
              <p className="text-xs text-slate-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── eligibility chip ───────────────────────── */}
        <div className="flex items-center gap-2 mb-4 bg-slate-800/40 border border-slate-700/30 rounded-lg px-3 py-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              loan.eligibility.toLowerCase().includes("instant")
                ? "bg-emerald-400"
                : loan.eligibility.toLowerCase().includes("good")
                ? "bg-cyan-400"
                : "bg-violet-400"
            }`}
          />
          <span className="text-xs text-slate-400">Eligibility:</span>
          <span className="text-xs font-semibold text-white">{loan.eligibility}</span>
        </div>

        {/* ── features list ───────────────────────────── */}
        <div className="flex flex-col gap-1.5 mb-5">
          {loan.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-400">{feature}</span>
            </div>
          ))}
        </div>

        {/* ── CTA button ──────────────────────────────── */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
          className={`
            w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group
            ${
              isSelected
                ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30"
                : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            }
          `}
        >
          {isSelected ? (
            <>
              Get This Loan
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default LoanCard;
