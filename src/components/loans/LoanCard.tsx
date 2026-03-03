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
import styles from "./LoanCard.module.css";

interface LoanCardProps {
  loan: {
    id: string;
    name: string;
    provider: string;
    icon: LucideIcon;
    color: string;
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
      className={`${styles.cardContainer} ${
        isSelected ? styles.selectedCard : ""
      } ${isCompare ? styles.compareCard : ""}`}
    >
      {/* top accent stripe (animated on select) */}
      <div
        className={`${styles.cardAccent} ${
          isSelected ? styles.selectedAccent : ""
        }`}
      />

      <div className={styles.cardContent}>
        {/* header row: provider + badges */}
        <div className={styles.cardHeader}>
          {/* provider */}
          <div className={styles.providerSection}>
            <div className={styles.providerLogo}>
              {loan.providerLogo}
            </div>
            <div>
              <p className={styles.providerName}>{loan.provider}</p>
              <div className={styles.fundingTime}>
                <Clock className={styles.fundingIcon} />
                <span className={styles.fundingText}>{loan.fundingTime}</span>
              </div>
            </div>
          </div>

          {/* badges column */}
          <div className={styles.badgeColumn}>
            {loan.popular && (
              <div className={styles.popularBadge}>
                <Star className={styles.popularIcon} />
                Popular
              </div>
            )}

            {/* compare toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle();
              }}
              className={`${styles.compareToggle} ${
                isCompare ? styles.compareActive : ""
              }`}
              title={isCompare ? "Remove from comparison" : "Add to comparison"}
            >
              <ArrowLeftRight className={styles.compareIcon} />
            </button>
          </div>
        </div>

        {/* loan name row */}
        <div className={styles.loanNameRow}>
          <div className={`${styles.loanIcon} ${loan.color}`}>
            <Icon className={styles.loanIconSvg} />
            {loan.id === "emergency" && (
              <Zap className={styles.emergencyIcon} />
            )}
          </div>
          <div className={styles.loanNameContainer}>
            <h3 className={styles.loanName}>{loan.name}</h3>
            <div className={styles.securityBadge}>
              <Shield className={styles.securityIcon} />
              <span className={styles.securityText}>Secured & Regulated</span>
            </div>
          </div>
        </div>

        {/* key stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <p className={styles.statValue}>{loan.interest}</p>
            <p className={styles.statLabel}>APR</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>${Number(numericAmount).toLocaleString()}</p>
            <p className={styles.statLabel}>Max</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>{minTerm} mo</p>
            <p className={styles.statLabel}>Min Term</p>
          </div>
        </div>

        {/* eligibility chip */}
        <div className={styles.eligibilityChip}>
          <div
            className={`${styles.eligibilityDot} ${
              loan.eligibility.toLowerCase().includes("instant")
                ? styles.dotTeal
                : loan.eligibility.toLowerCase().includes("good")
                ? styles.dotPurple
                : styles.dotGold
            }`}
          />
          <span className={styles.eligibilityLabel}>Eligibility:</span>
          <span className={styles.eligibilityValue}>{loan.eligibility}</span>
        </div>

        {/* features list */}
        <div className={styles.featuresList}>
          {loan.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <CheckCircle className={styles.featureIcon} />
              <span className={styles.featureText}>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
          className={`${styles.ctaButton} ${
            isSelected ? styles.ctaSelected : ""
          }`}
        >
          {isSelected ? (
            <>
              Get This Loan
              <ArrowRight className={styles.ctaIcon} />
            </>
          ) : (
            <>
              View Details
              <ArrowRight className={styles.ctaIcon} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default LoanCard;