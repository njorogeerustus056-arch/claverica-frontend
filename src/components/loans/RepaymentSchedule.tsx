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
import styles from "./RepaymentSchedule.module.css";

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
    teal: styles.tileTeal,
    purple: styles.tilePurple,
    gold: styles.tileGold,
  };
  const tileClass = accentMap[accent] || styles.tileTeal;

  return (
    <div className={`${styles.summaryTile} ${tileClass}`}>
      <div className={styles.tileHeader}>
        <Icon className={styles.tileIcon} />
        <span className={styles.tileLabel}>{label}</span>
      </div>
      <p className={styles.tileValue}>{value}</p>
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
    { name: "Principal", value: Math.round(totalPrincipal), color: "#1E6F6F" },
    { name: "Interest", value: Math.round(totalInterest), color: "#8626E9" },
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
    <div className={styles.container}>
      {/* top stripe */}
      <div className={styles.topAccent} />

      <div className={styles.content}>
        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Calendar className={styles.headerIconSvg} />
            </div>
            <div>
              <h2 className={styles.headerTitle}>Repayment Schedule</h2>
              <p className={styles.headerSubtitle}>
                Full amortisation breakdown
              </p>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button onClick={handleExport} className={styles.exportButton}>
              <Download className={styles.buttonIcon} />
              Export
            </button>
            <button onClick={() => window.print()} className={styles.printButton}>
              <Printer className={styles.buttonIcon} />
              Print
            </button>
          </div>
        </div>

        {/* top row: 3 summary tiles */}
        <div className={styles.tilesGrid}>
          <SummaryTile
            label="Monthly"
            value={`$${monthlyPayment.toLocaleString()}`}
            accent="teal"
            icon={DollarSign}
          />
          <SummaryTile
            label="Total Interest"
            value={`$${Math.round(totalInterest).toLocaleString()}`}
            accent="purple"
            icon={TrendingDown}
          />
          <SummaryTile
            label="Total Repayment"
            value={`$${totalRepayment.toLocaleString()}`}
            accent="gold"
            icon={DollarSign}
          />
        </div>

        {/* middle row: donut + early repayment */}
        <div className={styles.middleGrid}>
          {/* donut chart card */}
          <div className={styles.donutCard}>
            <p className={styles.donutTitle}>Payment Breakdown</p>
            <div className={styles.donutContainer}>
              <ResponsiveContainer width="100%" height={200}>
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
                    labelLine={{ stroke: "#C5A028", strokeWidth: 1 }}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid rgba(197, 160, 40, 0.2)",
                      borderRadius: "8px",
                      color: "#0A2540",
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [
                      `$${value.toLocaleString()}`,
                    ]}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            {/* legend */}
            <div className={styles.donutLegend}>
              {pieData.map((d) => (
                <div key={d.name} className={styles.legendItem}>
                  <div
                    className={styles.legendDot}
                    style={{ backgroundColor: d.color }}
                  />
                  <span className={styles.legendText}>{d.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* early repayment card */}
          <div className={styles.earlyCard}>
            <p className={styles.earlyTitle}>Early Repayment Savings</p>

            {earlyScenarios.map((s) => (
              <div key={s.label} className={styles.earlyScenario}>
                <p className={styles.scenarioLabel}>{s.label}</p>
                <p className={styles.scenarioValue}>
                  Save ${s.saving.toLocaleString()}
                </p>
              </div>
            ))}

            <div className={styles.earlyNote}>
              <p className={styles.noteTitle}>✓ No prepayment penalties</p>
              <p className={styles.noteText}>
                Flexible early repayment available
              </p>
            </div>
          </div>
        </div>

        {/* schedule table */}
        <div className={styles.tableContainer}>
          {/* table header */}
          <div className={styles.tableHeader}>
            <p className={styles.tableTitle}>Monthly Breakdown</p>
            <button
              onClick={() => setShowFull(!showFull)}
              className={styles.tableToggle}
            >
              {showFull ? "Show Less" : "Show All"}
              {showFull ? (
                <ChevronUp className={styles.toggleIcon} />
              ) : (
                <ChevronDown className={styles.toggleIcon} />
              )}
            </button>
          </div>

          {/* column headers */}
          <div className={styles.columnHeaders}>
            {["Month", "Payment", "Principal", "Interest", "Balance"].map(
              (h) => (
                <p key={h} className={styles.columnHeader}>
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
              className={styles.tableRow}
            >
              {/* month */}
              <div className={styles.monthCell}>
                <div className={styles.monthBadge}>
                  <span className={styles.monthNumber}>{row.month}</span>
                </div>
              </div>
              {/* payment */}
              <p className={styles.paymentCell}>
                ${row.payment.toLocaleString()}
              </p>
              {/* principal */}
              <p className={styles.principalCell}>
                ${row.principal.toLocaleString()}
              </p>
              {/* interest */}
              <p className={styles.interestCell}>
                ${row.interest.toLocaleString()}
              </p>
              {/* balance */}
              <p className={styles.balanceCell}>
                ${row.balance.toLocaleString()}
              </p>
            </motion.div>
          ))}

          {/* "more" indicator when collapsed */}
          {!showFull && schedule.length > 6 && (
            <div className={styles.moreIndicator}>
              <p className={styles.moreText}>
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