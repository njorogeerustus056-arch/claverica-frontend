// src/components/loans/EligibilityBadge.tsx
import { motion } from "framer-motion";
import { Award, TrendingUp, Shield, Zap } from "lucide-react";
import styles from "./EligibilityBadge.module.css";

interface EligibilityBadgeProps {
  score: number;         // 0-100
  status: string;        // "Excellent" | "Good" | "Fair"
  amount: number;
}

// ─── Status-driven colour tokens ────────────────────────────
const STATUS_TOKENS: Record<
  string,
  { ring: string; glow: string; badge: string; text: string }
> = {
  excellent: {
    ring: "#1E6F6F",           // teal
    glow: "rgba(30,111,111,0.15)",
    badge: "bg-teal-10 border-teal-20 text-teal",
    text: "text-teal",
  },
  good: {
    ring: "#8626E9",           // purple
    glow: "rgba(134,38,233,0.15)",
    badge: "bg-purple-10 border-purple-20 text-purple",
    text: "text-purple",
  },
  fair: {
    ring: "#C5A028",           // gold
    glow: "rgba(197,160,40,0.15)",
    badge: "bg-gold-10 border-gold-20 text-gold",
    text: "text-gold",
  },
};

const getTokens = (status: string) =>
  STATUS_TOKENS[status.toLowerCase()] || STATUS_TOKENS.fair;

const getIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "excellent": return Award;
    case "good":      return TrendingUp;
    case "fair":      return Shield;
    default:          return Zap;
  }
};

// ─── SVG ring component ─────────────────────────────────────
const ScoreRing = ({
  score,
  color,
}: {
  score: number;
  color: string;
}) => {
  const R = 28;
  const circumference = 2 * Math.PI * R;
  const progress = (score / 100) * circumference;
  const gap = circumference - progress;

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
      {/* background track */}
      <circle
        cx="36"
        cy="36"
        r={R}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="5"
      />
      {/* progress arc */}
      <circle
        cx="36"
        cy="36"
        r={R}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${progress} ${gap}`}
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
    </svg>
  );
};

const EligibilityBadge = ({ score, status, amount }: EligibilityBadgeProps) => {
  const tokens = getTokens(status);
  const StatusIcon = getIcon(status);

  // Derived sub-metrics (illustrative; wire to real data as needed)
  const creditScore = Math.min(score + 10, 100);
  const approvalChance = 95;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className={styles.eligibilityCard}
    >
      {/* card shell */}
      <div className={styles.cardContainer}>
        {/* top accent stripe */}
        <div className={styles.cardAccent} />

        {/* score row */}
        <div className={styles.scoreRow}>
          {/* SVG ring */}
          <div className={styles.ringContainer}>
            <ScoreRing score={score} color={tokens.ring} />
            <span className={styles.ringScore}>{score}</span>
          </div>

          {/* info */}
          <div className={styles.scoreInfo}>
            <div className={styles.scoreHeader}>
              <StatusIcon className={`${styles.statusIcon} ${tokens.text}`} />
              <span className={styles.eligibilityLabel}>Eligibility</span>
            </div>
            <p className={`${styles.statusText} ${tokens.text}`}>{status}</p>
            <p className={styles.preapprovedText}>
              Pre-approved for{" "}
              <span className={styles.preapprovedAmount}>
                ${amount.toLocaleString()}
              </span>
            </p>
          </div>

          {/* status badge */}
          <span className={`${styles.statusBadge} ${tokens.badge}`}>
            {status}
          </span>
        </div>

        {/* sub-metrics */}
        <div className={styles.metricsContainer}>
          {/* Credit Score bar */}
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Credit Score</span>
              <span className={styles.metricValue}>750+</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${creditScore}%` }}
              />
            </div>
          </div>

          {/* Approval Chance bar */}
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Approval Chance</span>
              <span className={styles.metricValue}>{approvalChance}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFillPurple}
                style={{ width: `${approvalChance}%` }}
              />
            </div>
          </div>
        </div>

        {/* footer action */}
        <div className={styles.cardFooter}>
          <div className={styles.footerLeft}>
            <div className={styles.pulseDot} />
            <span className={styles.footerText}>Ready to apply</span>
          </div>
          <button className={styles.viewRatesButton}>
            View Rates →
          </button>
        </div>
      </div>

      {/* subtle glow on hover */}
      <div
        className={styles.cardGlow}
        style={{
          boxShadow: `0 0 24px ${tokens.glow}`,
        }}
      />
    </motion.div>
  );
};

export default EligibilityBadge;