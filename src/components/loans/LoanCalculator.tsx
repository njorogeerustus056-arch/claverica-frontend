// src/components/loans/LoanCalculator.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Percent,
  Calendar,
  TrendingDown,
  BarChart3,
  Target,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./LoanCalculator.module.css";

interface LoanCalculatorProps {
  loanAmount: number;
  setLoanAmount: (amount: number) => void;
  selectedTerm: number;
  setSelectedTerm: (term: number) => void;
  selectedLoanId: string;
  loanProducts: any[];
}

// ─── Thin neon-rule separator ────────────────────────────────
const NeonRule = () => (
  <div className={styles.neonRule} />
);

// ─── Metric tile used in summary row ────────────────────────
const MetricTile = ({
  label,
  value,
  sub,
  accent = "teal",
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const accentMap: Record<string, string> = {
    teal: styles.tileTeal,
    purple: styles.tilePurple,
    gold: styles.tileGold,
  };
  const tileClass = accentMap[accent] || styles.tileTeal;

  return (
    <div className={`${styles.metricTile} ${tileClass}`}>
      <div className={styles.tileHeader}>
        <Icon className={styles.tileIcon} />
        <span className={styles.tileLabel}>{label}</span>
      </div>
      <span className={styles.tileValue}>{value}</span>
      {sub && <span className={styles.tileSubtext}>{sub}</span>}
    </div>
  );
};

// ─── Custom range slider that renders a styled track ─────────
const FintechSlider = ({
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
}) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.sliderContainer}>
      {/* value bubble */}
      <div
        className={styles.sliderBubble}
        style={{ left: `calc(${pct}% - 24px)` }}
      >
        <span className={styles.bubbleText}>
          {formatValue(value)}
        </span>
      </div>

      {/* track */}
      <div className={styles.sliderTrack}>
        <div
          className={styles.sliderFill}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.sliderInput}
        />
        {/* thumb */}
        <div
          className={styles.sliderThumb}
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>

      {/* min / max labels */}
      <div className={styles.sliderLabels}>
        <span className={styles.sliderMinMax}>{formatValue(min)}</span>
        <span className={styles.sliderMinMax}>{formatValue(max)}</span>
      </div>
    </div>
  );
};

const LoanCalculator = ({
  loanAmount,
  setLoanAmount,
  selectedTerm,
  setSelectedTerm,
  selectedLoanId,
  loanProducts,
}: LoanCalculatorProps) => {
  const [interestRate, setInterestRate] = useState(4.9);
  const selectedLoan = loanProducts.find((l) => l.id === selectedLoanId);

  // ── core maths ──────────────────────────────────────────
  const monthly = useMemo(() => {
    const r = interestRate / 100 / 12;
    const n = selectedTerm;
    return Math.round((loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, selectedTerm, interestRate]);

  const totalInterest = useMemo(
    () => monthly * selectedTerm - loanAmount,
    [monthly, selectedTerm, loanAmount]
  );
  const totalRepayment = loanAmount + totalInterest;
  const interestPct = ((totalInterest / loanAmount) * 100).toFixed(1);

  // ── chart data ──────────────────────────────────────────
  const chartData = useMemo(() => {
    const r = interestRate / 100 / 12;
    let bal = loanAmount;
    const out: { month: number; principal: number; interest: number; balance: number }[] = [];
    const step = Math.max(1, Math.floor(selectedTerm / 12));
    for (let m = 1; m <= selectedTerm; m++) {
      const intPmt = bal * r;
      const prinPmt = monthly - intPmt;
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
  const amountChips = [5000, 25000, 50000, 75000, 100000];
  const termChips = [12, 24, 36, 48, 60, 72, 84];
  const rateChips = [2.9, 4.9, 6.9, 8.9, 10.9];

  const Chip = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.chipActive : styles.chipInactive}`}
    >
      {children}
    </button>
  );

  return (
    <div className={styles.container}>
      {/* top accent stripe */}
      <div className={styles.topAccent} />

      <div className={styles.content}>
        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Calculator className={styles.headerIconSvg} />
            </div>
            <div>
              <h2 className={styles.headerTitle}>Loan Calculator</h2>
              <p className={styles.headerSubtitle}>Real-time payment estimates</p>
            </div>
          </div>
          <div className={styles.liveBadge}>
            <div className={styles.liveDot} />
            <span className={styles.liveText}>Live</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* LEFT: controls */}
          <div className={styles.controlsColumn}>
            {/* Amount */}
            <div className={styles.controlCard}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>Loan Amount</span>
                <span className={styles.controlValue}>${loanAmount.toLocaleString()}</span>
              </div>
              <FintechSlider
                min={1000}
                max={100000}
                step={1000}
                value={loanAmount}
                onChange={setLoanAmount}
                formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <div className={styles.chipContainer}>
                {amountChips.map((a) => (
                  <Chip key={a} active={loanAmount === a} onClick={() => setLoanAmount(a)}>
                    ${(a / 1000).toFixed(0)}k
                  </Chip>
                ))}
              </div>
            </div>

            {/* Term */}
            <div className={styles.controlCard}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>Loan Term</span>
                <div className={styles.controlValueGroup}>
                  <Calendar className={styles.controlIcon} />
                  <span className={styles.controlValue}>
                    {selectedTerm} <span className={styles.controlUnit}>mo</span>
                  </span>
                </div>
              </div>
              <FintechSlider
                min={12}
                max={84}
                step={12}
                value={selectedTerm}
                onChange={setSelectedTerm}
                formatValue={(v) => `${v} mo`}
              />
              <div className={styles.chipContainer}>
                {termChips.map((t) => (
                  <Chip key={t} active={selectedTerm === t} onClick={() => setSelectedTerm(t)}>
                    {t} mo
                  </Chip>
                ))}
              </div>
            </div>

            {/* Rate */}
            <div className={styles.controlCard}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>Interest Rate</span>
                <div className={styles.controlValueGroup}>
                  <Percent className={styles.controlIcon} />
                  <span className={styles.controlValue}>
                    {interestRate}<span className={styles.controlUnit}>%</span>
                  </span>
                </div>
              </div>
              <FintechSlider
                min={2.9}
                max={15.9}
                step={0.1}
                value={interestRate}
                onChange={setInterestRate}
                formatValue={(v) => `${v}%`}
              />
              <div className={styles.chipContainer}>
                {rateChips.map((r) => (
                  <Chip key={r} active={interestRate === r} onClick={() => setInterestRate(r)}>
                    {r}%
                  </Chip>
                ))}
              </div>
            </div>

            {/* selected loan badge */}
            {selectedLoan && (
              <div className={styles.selectedLoanBadge}>
                <div className={styles.selectedLoanIcon}>
                  {selectedLoan.providerLogo}
                </div>
                <div className={styles.selectedLoanInfo}>
                  <p className={styles.selectedLoanLabel}>Selected Provider</p>
                  <p className={styles.selectedLoanName}>{selectedLoan.name}</p>
                </div>
                <span className={styles.selectedLoanRate}>
                  {selectedLoan.interest} APR
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: results */}
          <div className={styles.resultsColumn}>
            {/* summary tiles */}
            <div className={styles.tilesGrid}>
              <MetricTile
                label="Monthly"
                value={`$${monthly.toLocaleString()}`}
                sub="per month"
                accent="teal"
                icon={Target}
              />
              <MetricTile
                label="Total Interest"
                value={`$${totalInterest.toLocaleString()}`}
                sub={`${interestPct}% of principal`}
                accent="purple"
                icon={TrendingDown}
              />
              <MetricTile
                label="Total Repayment"
                value={`$${totalRepayment.toLocaleString()}`}
                sub="over full term"
                accent="gold"
                icon={BarChart3}
              />
              <MetricTile
                label="Effective Cost"
                value={`${interestPct}%`}
                sub="interest / principal"
                accent="purple"
                icon={Percent}
              />
            </div>

            <NeonRule />

            {/* chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <span className={styles.chartTitle}>Amortisation Curve</span>
                <div className={styles.chartLegend}>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendDot} ${styles.legendDotTeal}`} />
                    <span className={styles.legendText}>Principal</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div className={`${styles.legendDot} ${styles.legendDotPurple}`} />
                    <span className={styles.legendText}>Interest</span>
                  </div>
                </div>
              </div>

              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 6, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1E6F6F" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#1E6F6F" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8626E9" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#8626E9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(197, 160, 40, 0.2)",
                        borderRadius: "8px",
                        color: "#0A2540",
                        fontSize: 12,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`]}
                      labelFormatter={(l: number) => `Month ${l}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="principal"
                      stroke="#1E6F6F"
                      strokeWidth={2}
                      fill="url(#gPrincipal)"
                      name="Principal"
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      stroke="#8626E9"
                      strokeWidth={2}
                      fill="url(#gInterest)"
                      name="Interest"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* insight callout */}
            <div className={styles.insightCard}>
              <Info className={styles.insightIcon} />
              <p className={styles.insightText}>
                At <span className={styles.insightHighlight}>{interestRate}% APR</span> over{" "}
                <span className={styles.insightHighlightPurple}>{selectedTerm} months</span>, you will pay{" "}
                <span className={styles.insightHighlightGold}>
                  ${totalInterest.toLocaleString()}
                </span>{" "}
                in total interest. Shorter terms reduce interest cost but raise your monthly payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;