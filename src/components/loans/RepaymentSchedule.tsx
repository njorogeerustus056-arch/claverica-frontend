// src/components/loans/RepaymentSchedule.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  TrendingDown,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RepaymentScheduleProps {
  amount: number;
  term: number;
  interestRate: number;
}

// ─── Compact summary tile ───────────────────────────────────
const SummaryTile = ({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const accentMap: Record<string, string> = {
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    violet: "text-violet-400 border-violet-500/20 bg-violet-500/5",
  };
  const cls = accentMap[accent] || accentMap.cyan;

  return (
    <div className={`rounded-xl border ${cls} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-3.5 h-3.5 ${cls.split(" ")[0]}`} />
        <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          {label}
        </span>
      </div>
      <p className="text-xl font-bold text-white tabular-nums">{value}</p>
    </div>
  );
};

const RepaymentSchedule = ({
  amount,
  term,
  interestRate,
}: RepaymentScheduleProps) => {
  const [showFull, setShowFull] = useState(false);

  // ── amortisation maths ──────────────────────────────────
  const { schedule, totalInterest, totalPrincipal, monthlyPayment } =
    useMemo(() => {
      const r = interestRate / 100 / 12;
      const pmt =
        (amount * (r * Math.pow(1 + r, term))) /
        (Math.pow(1 + r, term) - 1);

      let bal = amount;
      let totInt = 0;
      let totPri = 0;
      const rows: {
        month: number;
        payment: number;
        principal: number;
        interest: number;
        balance: number;
      }[] = [];

      for (let m = 1; m <= term; m++) {
        const intPmt = bal * r;
        const priPmt = pmt - intPmt;
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
    }, [amount, term, interestRate]);

  const totalRepayment = Math.round(monthlyPayment * term);
  const displayed = showFull ? schedule : schedule.slice(0, 6);

  // ── pie data ────────────────────────────────────────────
  const pieData = [
    { name: "Principal", value: Math.round(totalPrincipal), color: "#10b981" },
    { name: "Interest", value: Math.round(totalInterest), color: "#a78bfa" },
  ];

  // ── early repayment estimates ───────────────────────────
  const earlyScenarios = [
    { label: "12 months early", saving: Math.round(totalInterest * 0.2) },
    { label: "24 months early", saving: Math.round(totalInterest * 0.35) },
  ];

  // ── CSV export ──────────────────────────────────────────
  const handleExport = () => {
    const header = "Month,Payment,Principal,Interest,Remaining Balance";
    const body = schedule
      .map(
        (r) =>
          `${r.month},$${r.payment},$${r.principal},$${r.interest},$${r.balance}`
      )
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `repayment-schedule-$${amount}-${term}mo.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* top stripe */}
      <div className="h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500" />

      <div className="p-6">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-violet-500/30 flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5 text-violet-400" />
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
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 border border-slate-700 hover:border-slate-500 rounded-lg transition-all"
            >
              <Download className="w-3 h-3" />
              Export
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-lg transition-all"
            >
              <Printer className="w-3 h-3 text-cyan-400" />
              Print
            </button>
          </div>
        </div>

        {/* ── top row: 3 summary tiles ─────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <SummaryTile
            label="Monthly"
            value={`$${monthlyPayment.toLocaleString()}`}
            accent="emerald"
            icon={DollarSign}
          />
          <SummaryTile
            label="Total Interest"
            value={`$${Math.round(totalInterest).toLocaleString()}`}
            accent="violet"
            icon={TrendingDown}
          />
          <SummaryTile
            label="Total Repayment"
            value={`$${totalRepayment.toLocaleString()}`}
            accent="cyan"
            icon={DollarSign}
          />
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
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      strokeWidth={0}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                      labelLine={{ stroke: "#475569", strokeWidth: 1 }}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#f1f5f9",
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                      ]}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* legend */}
            <div className="flex justify-center gap-5 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-slate-500">{d.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* early repayment card */}
          <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Early Repayment Savings
            </p>

            {earlyScenarios.map((s) => (
              <div
                key={s.label}
                className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-3"
              >
                <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                <p className="text-lg font-bold text-emerald-400 tabular-nums">
                  Save ${s.saving.toLocaleString()}
                </p>
              </div>
            ))}

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
            <button
              onClick={() => setShowFull(!showFull)}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {showFull ? "Show Less" : "Show All"}
              {showFull ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* column headers */}
          <div className="grid grid-cols-5 gap-0 px-4 py-2 border-b border-slate-700/30">
            {["Month", "Payment", "Principal", "Interest", "Balance"].map(
              (h) => (
                <p
                  key={h}
                  className="text-xs font-semibold text-slate-600 uppercase tracking-wider"
                >
                  {h}
                </p>
              )
            )}
          </div>

          {/* rows */}
          {displayed.map((row) => (
            <motion.div
              key={row.month}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-5 gap-0 px-4 py-2.5 border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors"
            >
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
            </motion.div>
          ))}

          {/* "more" indicator when collapsed */}
          {!showFull && schedule.length > 6 && (
            <div className="px-4 py-2 text-center">
              <p className="text-xs text-slate-600">
                +{schedule.length - 6} more months
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepaymentSchedule;