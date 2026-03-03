// src/components/loans/LoanComparison.tsx
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Star,
  AlertCircle,
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import styles from "./LoanComparison.module.css";

interface LoanComparisonProps {
  loans: any[];
  onClose: () => void;
}

// ─── SVG score ring ─────────────────────────────────────
const MiniScoreRing = ({
  score,
}: {
  score: number;
}) => {
  const R = 22;
  const circ = 2 * Math.PI * R;
  const progress = (score / 100) * circ;
  const color = score >= 85 ? "#1E6F6F" : score >= 75 ? "#8626E9" : "#C5A028";

  return (
    <div className={styles.ringWrapper}>
      <svg width="56" height="56" viewBox="0 0 56 56" className={styles.ringSvg}>
        <circle cx="28" cy="28" r={R} fill="none" stroke="#E5E7EB" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circ - progress}`}
        />
      </svg>
      <span className={styles.ringScore}>{score}</span>
    </div>
  );
};

const LoanComparison = ({ loans, onClose }: LoanComparisonProps) => {
  // ── scoring logic ─────────────────────────────────────────
  const getLoanScore = (loan: any) => {
    let s = 70;
    if (loan.popular) s += 10;
    if (parseFloat(loan.interest) < 5) s += 15;
    if (
      loan.fundingTime.includes("Same day") ||
      loan.fundingTime.includes("Instant")
    )
      s += 10;
    if (loan.features.length > 4) s += 5;
    return Math.min(s, 100);
  };

  const scoreLabel = (score: number) =>
    score >= 85 ? "Excellent" : score >= 75 ? "Good" : "Fair";

  const scoreBadge = (score: number) =>
    score >= 85
      ? styles.scoreExcellent
      : score >= 75
      ? styles.scoreGood
      : styles.scoreFair;

  // ── feature icon helper ───────────────────────────────────
  const featureIcon = (feature: string) => {
    if (feature.includes("No") || feature.includes("Free"))
      return <Check className={styles.featureIconTeal} />;
    if (feature.includes("Instant") || feature.includes("Same-day"))
      return <Zap className={styles.featureIconGold} />;
    if (feature.includes("Secure") || feature.includes("Protected"))
      return <Shield className={styles.featureIconPurple} />;
    return <Check className={styles.featureIconDefault} />;
  };

  // ── row definition ────────────────────────────────────────
  type RowDef = {
    key: string;
    label: string;
    sub: string;
    icon: React.ReactNode;
    render: (loan: any) => React.ReactNode;
  };

  const rows: RowDef[] = [
    {
      key: "interest",
      label: "Interest Rate",
      sub: "Annual Percentage Rate",
      icon: <TrendingUp className={styles.rowIconTeal} />,
      render: (loan) => (
        <div className={styles.rowValueContainer}>
          <span className={styles.rowValueLarge}>{loan.interest}</span>
          <span className={styles.rowValueSmall}>APR</span>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Maximum Amount",
      sub: "Total loan available",
      icon: <span className={styles.rowIconText}>💰</span>,
      render: (loan) => (
        <span className={styles.rowValueMedium}>{loan.amount}</span>
      ),
    },
    {
      key: "term",
      label: "Loan Term",
      sub: "Repayment period",
      icon: <span className={styles.rowIconText}>📅</span>,
      render: (loan) => (
        <span className={styles.rowValueMedium}>{loan.term}</span>
      ),
    },
    {
      key: "funding",
      label: "Funding Time",
      sub: "Time to receive funds",
      icon: <Zap className={styles.rowIconGold} />,
      render: (loan) => (
        <span className={styles.rowValueBase}>{loan.fundingTime}</span>
      ),
    },
    {
      key: "eligibility",
      label: "Eligibility",
      sub: "Minimum requirements",
      icon: <AlertCircle className={styles.rowIconRose} />,
      render: (loan) => (
        <span className={styles.eligibilityPill}>{loan.eligibility}</span>
      ),
    },
    {
      key: "features",
      label: "Key Features",
      sub: "Included benefits",
      icon: <Check className={styles.rowIconTeal} />,
      render: (loan) => (
        <ul className={styles.featuresList}>
          {loan.features.map((f: string, i: number) => (
            <li key={i} className={styles.featureListItem}>
              {featureIcon(f)}
              <span className={styles.featureText}>{f}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className={styles.container}
      >
        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <TrendingUp className={styles.headerIconSvg} />
            </div>
            <div>
              <h2 className={styles.headerTitle}>Loan Comparison</h2>
              <p className={styles.headerSubtitle}>{loans.length} loans selected</p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* scrollable table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                {/* empty corner */}
                <th className={styles.tableCorner} />
                {loans.map((loan) => {
                  const Icon = loan.icon;
                  return (
                    <th key={loan.id} className={styles.tableHeaderCell}>
                      <div className={styles.loanHeader}>
                        <div className={`${styles.loanHeaderIcon} ${loan.color}`}>
                          <Icon className={styles.loanHeaderIconSvg} />
                        </div>
                        <p className={styles.loanHeaderName}>{loan.name}</p>
                        <p className={styles.loanHeaderProvider}>{loan.provider}</p>
                        {loan.popular && (
                          <div className={styles.popularBadge}>
                            <Star className={styles.popularIcon} />
                            Popular
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.key}
                  className={`${styles.tableRow} ${idx % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
                >
                  {/* row label */}
                  <td className={styles.rowLabel}>
                    <div className={styles.rowLabelContent}>
                      <div className={styles.rowIconContainer}>
                        {row.icon}
                      </div>
                      <div>
                        <p className={styles.rowLabelText}>{row.label}</p>
                        <p className={styles.rowSubText}>{row.sub}</p>
                      </div>
                    </div>
                  </td>

                  {/* loan values */}
                  {loans.map((loan) => (
                    <td key={loan.id} className={styles.rowValue}>
                      {row.render(loan)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* score row */}
              <tr className={styles.scoreRow}>
                <td className={styles.scoreLabel}>
                  <p className={styles.scoreLabelText}>Overall Score</p>
                  <p className={styles.scoreSubText}>Based on features & value</p>
                </td>
                {loans.map((loan) => {
                  const score = getLoanScore(loan);
                  return (
                    <td key={loan.id} className={styles.scoreCell}>
                      <div className={styles.scoreContent}>
                        <MiniScoreRing score={score} />
                        <span className={`${styles.scoreBadge} ${scoreBadge(score)}`}>
                          {scoreLabel(score)}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* footer */}
        <div className={styles.footer}>
          <span className={styles.footerNote}>
            Comparing {loans.length} of 3 loans max
          </span>
          <div className={styles.footerActions}>
            <button onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button
              onClick={() => {
                const best = loans.reduce((a, b) =>
                  getLoanScore(b) > getLoanScore(a) ? b : a
                );
                console.log("Apply for:", best.id);
              }}
              className={styles.applyButton}
            >
              Apply for Best Match
              <ArrowRight className={styles.applyIcon} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoanComparison;