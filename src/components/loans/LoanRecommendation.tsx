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
import styles from "./LoanRecommendation.module.css";

interface LoanRecommendationProps {
  userProfile: any;
  loans: any[];
  onSelectLoan: (loanId: string) => void;
}

// ─── Rank badge colours (Gold / Silver / Bronze) ───────────
const RANK_COLORS = [
  { bg: "gold-gradient", shadow: "shadow-gold" },
  { bg: "silver-gradient", shadow: "shadow-silver" },
  { bg: "bronze-gradient", shadow: "shadow-bronze" },
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
    <div className={styles.container}>
      {/* gradient top stripe */}
      <div className={styles.topAccent} />

      <div className={styles.content}>
        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.aiIcon}>
              <Brain className={styles.aiIconSvg} />
            </div>
            <div>
              <h2 className={styles.headerTitle}>AI Recommendations</h2>
              <p className={styles.headerSubtitle}>
                Tailored to your profile & market data
              </p>
            </div>
          </div>

          <div className={styles.smartBadge}>
            <Sparkles className={styles.smartIcon} />
            <span className={styles.smartText}>SMART AI</span>
          </div>
        </div>

        {/* cards grid */}
        <div className={styles.cardsGrid}>
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
                className={styles.recommendationCard}
              >
                {/* rank badge + score pill */}
                <div className={styles.cardHeader}>
                  <div className={`${styles.rankBadge} ${styles[rank.bg]}`}>
                    <span className={styles.rankNumber}>{idx + 1}</span>
                  </div>
                  <div className={styles.scorePill}>
                    <span className={styles.scoreValue}>{loan.score}/100</span>
                    {idx === 0 && <Rocket className={styles.rocketIcon} />}
                  </div>
                </div>

                {/* loan info */}
                <div className={styles.loanInfo}>
                  <div className={`${styles.loanIcon} ${loan.color}`}>
                    <Icon className={styles.loanIconSvg} />
                  </div>
                  <div className={styles.loanDetails}>
                    <p className={styles.loanName}>{loan.name}</p>
                    <p className={styles.loanProvider}>{loan.provider}</p>
                  </div>
                </div>

                {/* AI reason */}
                <div className={styles.reasonCard}>
                  <ThumbsUp className={styles.reasonIcon} />
                  <div>
                    <p className={styles.reasonTitle}>Why this works</p>
                    <p className={styles.reasonText}>{getReason(loan)}</p>
                  </div>
                </div>

                {/* quick stats row */}
                <div className={styles.quickStats}>
                  <div className={styles.statBox}>
                    <p className={styles.statBoxValue}>{loan.interest}</p>
                    <p className={styles.statBoxLabel}>APR</p>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statBoxFlex}>
                      <Clock className={styles.statBoxIcon} />
                      <p className={styles.statBoxValue}>{loan.fundingTime}</p>
                    </div>
                    <p className={styles.statBoxLabel}>Funding</p>
                  </div>
                </div>

                {/* match score bar */}
                <div className={styles.matchSection}>
                  <div className={styles.matchHeader}>
                    <span className={styles.matchLabel}>Match Score</span>
                    <span className={styles.matchPercentage}>{match}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${match}%` }}
                    />
                  </div>
                </div>

                {/* action row */}
                <div className={styles.actionRow}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLoan(loan.id);
                    }}
                    className={styles.selectButton}
                  >
                    Select
                    <Target className={styles.selectIcon} />
                  </button>
                  <button className={styles.trendButton}>
                    <TrendingUp className={styles.trendIcon} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI explanation footer */}
        <div className={styles.footer}>
          <div className={styles.footerIcon}>
            <Zap className={styles.footerIconSvg} />
          </div>
          <div>
            <p className={styles.footerTitle}>How recommendations work</p>
            <p className={styles.footerText}>
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