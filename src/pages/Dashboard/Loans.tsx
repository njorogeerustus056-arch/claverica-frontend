// src/pages/Dashboard/Loans.tsx - UPDATED WITH HOMEPAGE COLOR SYSTEM (CSS MODULES)
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Clock,
  Percent,
  Calendar,
  Shield,
  Zap,
  ArrowRight,
  BadgeCheck,
  Wallet,
  Building,
  GraduationCap,
  Heart,
  Home,
  Car,
  LineChart,
  X,
  CheckCircle,
  TrendingUp,
  Users,
  Sparkles,
  Target,
  CreditCard,
  Download,
  Bell,
  Lock,
  Eye,
  Star,
  Award,
  Gift,
  Rocket,
  Briefcase,
  TrendingDown,
  PieChart,
  FileText,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../../lib/store/auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import LoanCard from "../../components/loans/LoanCard";
import LoanCalculator from "../../components/loans/LoanCalculator";
import LoanComparison from "../../components/loans/LoanComparison";
import EligibilityBadge from "../../components/loans/EligibilityBadge";
import RepaymentSchedule from "../../components/loans/RepaymentSchedule";
import LoanRecommendation from "../../components/loans/LoanRecommendation";
import api from '../../api';
import styles from "./Loans.module.css";

// ─────────────────────────────────────────────────────────────
// LOAN PRODUCT DATA (Homepage Color System)
// ─────────────────────────────────────────────────────────────
const loanProducts = [
  {
    id: "personal",
    name: "Personal Loan",
    provider: "Claverica Finance",
    icon: Wallet,
    color: "purple",
    badgeColor: "bg-purple/10 text-purple border-purple/20",
    interest: "4.9%",
    amount: "Up to $50,000",
    term: "12-60 months",
    features: [
      "No collateral required",
      "Fixed monthly payments",
      "Early repayment allowed",
      "No hidden fees",
    ],
    popular: true,
    eligibility: "Good credit (650+)",
    fundingTime: "24-48 hours",
    providerLogo: "🏦",
    tag: "MOST POPULAR",
    highlights: ["Low APR", "Flexible terms", "Fast approval"],
  },
  {
    id: "business",
    name: "Business Loan",
    provider: "Claverica Business",
    icon: Building,
    color: "navy",
    badgeColor: "bg-navy/10 text-navy border-navy/20",
    interest: "6.5%",
    amount: "Up to $250,000",
    term: "6-84 months",
    features: [
      "Flexible repayment",
      "Business growth support",
      "Tax deductible",
      "Quick approval",
    ],
    popular: false,
    eligibility: "Business revenue $50k+",
    fundingTime: "2-5 business days",
    providerLogo: "💼",
    tag: "FOR ENTREPRENEURS",
    highlights: ["Growth capital", "Tax benefits", "Scale faster"],
  },
  {
    id: "emergency",
    name: "Emergency Cash",
    provider: "Claverica Instant",
    icon: Zap,
    color: "gold",
    badgeColor: "bg-gold/10 text-gold border-gold/20",
    interest: "7.9%",
    amount: "Up to $10,000",
    term: "3-24 months",
    features: [
      "Same-day funding",
      "No paperwork",
      "Simple application",
      "24/7 availability",
    ],
    popular: true,
    eligibility: "Instant approval",
    fundingTime: "Same day",
    providerLogo: "⚡",
    tag: "INSTANT ACCESS",
    highlights: ["24/7 access", "Same-day cash", "No questions"],
  },
  {
    id: "education",
    name: "Education Loan",
    provider: "Claverica Learn",
    icon: GraduationCap,
    color: "teal",
    badgeColor: "bg-teal/10 text-teal border-teal/20",
    interest: "3.9%",
    amount: "Up to $100,000",
    term: "Up to 120 months",
    features: [
      "Deferred payments",
      "Career counseling",
      "Grace period",
      "Lowest rates",
    ],
    popular: false,
    eligibility: "Student verification",
    fundingTime: "3-7 days",
    providerLogo: "🎓",
    tag: "INVEST IN FUTURE",
    highlights: ["Lowest rates", "Deferred payments", "Career support"],
  },
  {
    id: "mortgage",
    name: "Smart Mortgage",
    provider: "Claverica Homes",
    icon: Home,
    color: "purple",
    badgeColor: "bg-purple/10 text-purple border-purple/20",
    interest: "3.2%",
    amount: "Up to $1,000,000",
    term: "120-360 months",
    features: [
      "Fixed/variable rates",
      "No PMI required",
      "Digital closing",
      "Rate match guarantee",
    ],
    popular: false,
    eligibility: "720+ credit score",
    fundingTime: "14-30 days",
    providerLogo: "🏠",
    tag: "DREAM HOME",
    highlights: ["Lowest rates", "Digital process", "No PMI"],
  },
  {
    id: "auto",
    name: "Auto Loan",
    provider: "Claverica Drive",
    icon: Car,
    color: "navy",
    badgeColor: "bg-navy/10 text-navy border-navy/20",
    interest: "5.2%",
    amount: "Up to $75,000",
    term: "24-84 months",
    features: [
      "Pre-approval online",
      "Dealer financing",
      "GAP insurance",
      "Refinancing options",
    ],
    popular: true,
    eligibility: "Good credit (680+)",
    fundingTime: "1-3 days",
    providerLogo: "🚗",
    tag: "NEW WHEELS",
    highlights: ["Pre-approved", "Dealer network", "GAP included"],
  },
  {
    id: "medical",
    name: "Medical Loan",
    provider: "Claverica Health",
    icon: Heart,
    color: "gold",
    badgeColor: "bg-gold/10 text-gold border-gold/20",
    interest: "6.9%",
    amount: "Up to $150,000",
    term: "12-96 months",
    features: [
      "No upfront costs",
      "Treatment coverage",
      "Deferred interest",
      "Partner hospitals",
    ],
    popular: false,
    eligibility: "Medical necessity",
    fundingTime: "24-72 hours",
    providerLogo: "❤️",
    tag: "HEALTH FIRST",
    highlights: ["No upfront cost", "Partner network", "Flexible terms"],
  },
  {
    id: "investment",
    name: "Investment Loan",
    provider: "Claverica Capital",
    icon: LineChart,
    color: "teal",
    badgeColor: "bg-teal/10 text-teal border-teal/20",
    interest: "8.5%",
    amount: "Up to $500,000",
    term: "6-36 months",
    features: [
      "Margin trading",
      "Stock collateral",
      "Quick access",
      "Portfolio based",
    ],
    popular: false,
    eligibility: "Investment account $25k+",
    fundingTime: "1-2 business days",
    providerLogo: "📈",
    tag: "GROW WEALTH",
    highlights: ["Margin trading", "Stock collateral", "Quick access"],
  },
];

// ─────────────────────────────────────────────────────────────
// SUCCESS MODAL (Homepage Color System)
// ─────────────────────────────────────────────────────────────
const SuccessModal = ({ isOpen, onClose, referenceId, loanName, amount, term }: {
  isOpen: boolean;
  onClose: () => void;
  referenceId: string;
  loanName: string;
  amount: number;
  term: number;
}) => {
  const handleCopyReferenceId = () => {
    navigator.clipboard.writeText(referenceId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.modalBackdrop}
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={styles.modalContainer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
          >
            <div className={styles.successModal}>
              {/* Top accent - gold to purple gradient */}
              <div className={styles.modalAccent} />
              
              {/* Header with celebration */}
              <div className={styles.modalHeader}>
                <div className={styles.modalIconWrapper}>
                  <div className={styles.modalIcon}>
                    <CheckCircle className={styles.modalIconSvg} />
                  </div>
                  <div className={styles.modalPulseDot} />
                </div>
                <div>
                  <h3 id="success-modal-title" className={styles.modalTitle}>You're on the list! 🎉</h3>
                  <p className={styles.modalSubtitle}>Early Access Program</p>
                </div>
              </div>
              
              {/* Message */}
              <div className={styles.modalMessage}>
                <p className={styles.modalMessageText}>
                  ✨ <span className={styles.modalMessageHighlight}>{loanName}</span> interest submitted successfully!
                </p>
                <p className={styles.modalMessageNote}>
                  You're now in our priority queue. We'll contact you with exclusive rates when loans launch.
                </p>
              </div>
              
              {/* Reference Card */}
              <div className={styles.referenceCard}>
                <div className={styles.referenceHeader}>
                  <div className={styles.referenceTitleWrapper}>
                    <div className={styles.referenceIcon}>
                      <BadgeCheck className={styles.referenceIconSvg} />
                    </div>
                    <span className={styles.referenceLabel}>Reference ID</span>
                  </div>
                  <button 
                    onClick={handleCopyReferenceId}
                    className={styles.copyButton}
                    aria-label={`Copy reference ID: ${referenceId}`}
                  >
                    Copy
                  </button>
                </div>
                <div className={styles.referenceValue}>
                  {referenceId}
                </div>
              </div>
              
              {/* What's Next */}
              <div className={styles.whatsNextGrid}>
                <div className={styles.whatsNextItem}>
                  <Rocket className={styles.whatsNextIcon} />
                  <div>
                    <p className={styles.whatsNextTitle}>Priority Position</p>
                    <p className={styles.whatsNextText}>You'll be first to access when we launch</p>
                  </div>
                </div>
                
                <div className={styles.whatsNextItem}>
                  <Bell className={styles.whatsNextIcon} />
                  <div>
                    <p className={styles.whatsNextTitle}>Exclusive Updates</p>
                    <p className={styles.whatsNextText}>Get early notifications & special offers</p>
                  </div>
                </div>
                
                <div className={styles.whatsNextItem}>
                  <Gift className={styles.whatsNextIcon} />
                  <div>
                    <p className={styles.whatsNextTitle}>Launch Bonus</p>
                    <p className={styles.whatsNextText}>Eligible for early adopter rewards</p>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <button
                onClick={onClose}
                className={styles.modalContinueButton}
                aria-label="Continue exploring loan options"
              >
                Continue Exploring
                <ChevronRight className={styles.modalContinueIcon} />
              </button>
              
              {/* Small print */}
              <p className={styles.modalFootnote}>
                Our team will contact you within 24-48 hours. No commitment required.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────
// EARLY ACCESS MODAL (Homepage Color System)
// ─────────────────────────────────────────────────────────────
const EarlyAccessModal = ({
  open,
  loanName,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  loanName: string;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSubmit();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.earlyAccessBackdrop}
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25 }}
            className={styles.earlyAccessContainer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
          >
            <div className={styles.earlyAccessModal}>
              {/* Animated gradient header */}
              <div className={styles.earlyAccessAccent} />
              
              <div className={styles.earlyAccessContent}>
                {/* Header */}
                <div className={styles.earlyAccessHeader}>
                  <div className={styles.earlyAccessHeaderLeft}>
                    <div className={styles.earlyAccessIcon}>
                      <Rocket className={styles.earlyAccessIconSvg} />
                    </div>
                    <div>
                      <h3 id="early-access-title" className={styles.earlyAccessTitle}>Join Early Access</h3>
                      <p className={styles.earlyAccessSubtitle}>Get priority when {loanName} launches</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className={styles.earlyAccessCloseButton}
                    aria-label="Close early access modal"
                  >
                    <X className={styles.earlyAccessCloseIcon} />
                  </button>
                </div>

                {/* Benefits */}
                <div className={styles.earlyAccessBenefits}>
                  {[
                    { icon: Target, text: "Priority position in waitlist", color: "purple" },
                    { icon: Gift, text: "Exclusive launch offers", color: "teal" },
                    { icon: Bell, text: "Early notifications", color: "gold" },
                    { icon: Users, text: "Dedicated support", color: "navy" },
                  ].map((benefit, idx) => {
                    const Icon = benefit.icon;
                    const colorClass = 
                      benefit.color === 'purple' ? styles.benefitPurple :
                      benefit.color === 'teal' ? styles.benefitTeal :
                      benefit.color === 'gold' ? styles.benefitGold :
                      styles.benefitNavy;
                    
                    return (
                      <div key={idx} className={`${styles.benefitItem} ${colorClass}`}>
                        <Icon className={styles.benefitIcon} />
                        <span className={styles.benefitText}>{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className={styles.earlyAccessStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statIconWrapper}>
                      <Users className={styles.statIcon} />
                      <p className={styles.statNumber}>150+</p>
                    </div>
                    <p className={styles.statLabel}>Already waiting</p>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <div className={styles.statIconWrapper}>
                      <Calendar className={styles.statIcon} />
                      <p className={styles.statNumber}>Q2 2024</p>
                    </div>
                    <p className={styles.statLabel}>Expected launch</p>
                  </div>
                </div>

                {/* CTA */}
                <div className={styles.earlyAccessCta}>
                  <button
                    onClick={onSubmit}
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                    className={styles.joinButton}
                    aria-label={`Join waitlist for ${loanName}`}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className={styles.spinnerIcon} aria-hidden="true" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        Join Waitlist for {loanName}
                        <ArrowRight className={styles.arrowIcon} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className={styles.notNowButton}
                    aria-label="Skip early access for now"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
function LoansContent() {
  const { user } = useAuthStore();
  
  // State
  const [loanAmount, setLoanAmount] = useState(10000);
  const [selectedTerm, setSelectedTerm] = useState(24);
  const [selectedLoan, setSelectedLoan] = useState("personal");
  const [isComparing, setIsComparing] = useState(false);
  const [compareLoans, setCompareLoans] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({ total_dumps: 0, by_product: { loan: 0, insurance: 0, escrow: 0 } });
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    referenceId: '',
    loanName: '',
    amount: 0,
    term: 0,
  });
  const [earlyAccessModal, setEarlyAccessModal] = useState({
    isOpen: false,
    loanId: '',
    loanName: '',
  });

  // Load stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.fetch('/api/kyc_spec/stats/');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  // Submit loan interest
  const submitLoanInterest = useCallback(async (
    loanId: string, 
    actionLabel: string, 
    amount?: number, 
    term?: number
  ) => {
    setIsSubmitting(true);
    
    try {
      const loan = loanProducts.find(l => l.id === loanId);
      const dumpsterData = {
        product: 'loan',
        product_subtype: loanId,
        user_email: user?.email || '',
        user_phone: user?.phone || '',
        loan_amount: amount || loanAmount,
        loan_purpose: actionLabel,
        tenure_months: term || selectedTerm,
        monthly_income: user?.income_range || 'unknown',
        employment_type: user?.occupation || 'unknown',
        timestamp: new Date().toISOString(),
        source: 'loans_dashboard',
        additional_data: {
          loan_name: loan?.name,
          provider: loan?.provider,
          interest_rate: loan?.interest,
          eligibility: loan?.eligibility,
          funding_time: loan?.fundingTime,
          user_has_account: !!user,
          session_id: Math.random().toString(36).substring(7),
        }
      };

      const result = await api.post('/api/kyc_spec/collect/', dumpsterData);

      // Store in localStorage for tracking
      const apps = JSON.parse(localStorage.getItem('claverica_loan_applications') || '[]');
      const appEntry = {
        referenceId: result.reference_id || `LOCAL-${Date.now()}`,
        loanType: loan?.name,
        amount: amount || loanAmount,
        date: new Date().toISOString(),
        status: 'pending',
        product: 'loan'
      };
      apps.push(appEntry);
      localStorage.setItem('claverica_loan_applications', JSON.stringify(apps));

      // Show success modal
      setSuccessModal({
        isOpen: true,
        referenceId: result.reference_id || `LOCAL-${Date.now()}`,
        loanName: loan?.name || 'Loan',
        amount: amount || loanAmount,
        term: term || selectedTerm,
      });

      // Refresh stats
      const statsData = await api.fetch('/api/kyc_spec/stats/');
      setStats(statsData);

    } catch (error) {
      console.error('Submission error:', error);
      setSuccessModal({
        isOpen: true,
        referenceId: `LOCAL-${Date.now()}`,
        loanName: loanProducts.find(l => l.id === loanId)?.name || 'Loan',
        amount: amount || loanAmount,
        term: term || selectedTerm,
      });
    } finally {
      setIsSubmitting(false);
      setEarlyAccessModal({ isOpen: false, loanId: '', loanName: '' });
    }
  }, [user, loanAmount, selectedTerm]);

  // Open early access modal
  const openEarlyAccessModal = (loanId: string) => {
    const loan = loanProducts.find(l => l.id === loanId);
    setEarlyAccessModal({
      isOpen: true,
      loanId,
      loanName: loan?.name || 'Loan',
    });
  };

  const handleApplyForLoan = useCallback((loanId: string) => {
    openEarlyAccessModal(loanId);
  }, []);

  const handleViewRates = useCallback(() => {
    submitLoanInterest(
      selectedLoan,
      "View exclusive rates",
      loanAmount,
      selectedTerm
    );
  }, [selectedLoan, loanAmount, selectedTerm, submitLoanInterest]);

  const handleStartVerification = useCallback(() => {
    submitLoanInterest(
      selectedLoan,
      "Start loan verification",
      loanAmount,
      selectedTerm
    );
  }, [selectedLoan, loanAmount, selectedTerm, submitLoanInterest]);

  const handleRecommendationSelect = useCallback((loanId: string) => {
    setSelectedLoan(loanId);
    openEarlyAccessModal(loanId);
  }, []);

  const handleComparisonApply = useCallback(() => {
    const best = compareLoans.reduce((a, b) => {
      const loanA = loanProducts.find(l => l.id === a);
      const loanB = loanProducts.find(l => l.id === b);
      return (parseFloat(loanA?.interest || "99") < parseFloat(loanB?.interest || "99")) ? a : b;
    });
    openEarlyAccessModal(best);
  }, [compareLoans]);

  const handleCompareToggle = useCallback((loanId: string) => {
    setCompareLoans((prev) => {
      if (prev.includes(loanId)) return prev.filter((id) => id !== loanId);
      if (prev.length < 3) return [...prev, loanId];
      return prev;
    });
  }, []);

  const handleEligibilityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleViewRates();
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated background grid */}
      <div className={styles.backgroundGrid}>
        <div className={styles.backgroundGradient} />
        <div className={styles.backgroundPattern} />
      </div>

      <div className={styles.content}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.headerSection}
        >
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIconWrapper}>
                <div className={styles.headerIcon}>
                  <DollarSign className={styles.headerIconSvg} />
                </div>
                <div className={styles.earlyAccessBadge}>
                  EARLY ACCESS
                </div>
              </div>
              <div>
                <h1 className={styles.headerTitle}>Smart Loans</h1>
                <p className={styles.headerSubtitle}>
                  Join {stats.by_product.loan}+ others on the waitlist
                </p>
              </div>
            </div>

            {/* User Stats */}
            <div className={styles.userStats}>
              <div className={styles.userStatItem}>
                <p className={styles.userStatLabel}>Pre-approved for</p>
                <p className={styles.userStatValue}>$50,000</p>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.userStatItem}>
                <p className={styles.userStatLabel}>Best Rate</p>
                <p className={`${styles.userStatValue} ${styles.rateValue}`}>3.2%</p>
              </div>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className={styles.welcomeBanner}>
            <div className={styles.welcomeAccent} />
            <div className={styles.welcomeContent}>
              <div>
                <h2 className={styles.welcomeTitle}>
                  Welcome back, <span className={styles.welcomeName}>{user?.first_name || "valued customer"}</span>
                </h2>
                <p className={styles.welcomeText}>
                  Submit interest for exclusive early access rates
                </p>
              </div>
              <div className={styles.welcomeStats}>
                {[
                  { icon: Zap, value: "Instant", label: "Waitlist", color: "gold" },
                  { icon: Lock, value: "Secure", label: "Submission", color: "teal" },
                  { icon: Gift, value: "Bonus", label: "On Launch", color: "purple" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  const colorClass = 
                    stat.color === 'gold' ? styles.statGold :
                    stat.color === 'teal' ? styles.statTeal :
                    styles.statPurple;
                  return (
                    <div key={stat.label} className={styles.welcomeStat}>
                      <div className={styles.welcomeStatIconWrapper}>
                        <Icon className={`${styles.welcomeStatIcon} ${colorClass}`} />
                        <p className={`${styles.welcomeStatValue} ${colorClass}`}>{stat.value}</p>
                      </div>
                      <p className={styles.welcomeStatLabel}>{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ELIGIBILITY BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.eligibilitySection}
        >
          <div 
            onClick={handleViewRates}
            onKeyDown={handleEligibilityKeyDown}
            role="button"
            tabIndex={0}
            className={styles.eligibilityButton}
            aria-label="View exclusive loan rates based on your eligibility score"
          >
            <EligibilityBadge
              score={85}
              status="Excellent"
              amount={50000}
            />
          </div>
        </motion.div>

        {/* AI RECOMMENDATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={styles.recommendationSection}
        >
          <LoanRecommendation
            userProfile={user}
            loans={loanProducts}
            onSelectLoan={handleRecommendationSelect}
          />
        </motion.div>

        {/* CALCULATOR */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.calculatorSection}
        >
          <LoanCalculator
            loanAmount={loanAmount}
            setLoanAmount={setLoanAmount}
            selectedTerm={selectedTerm}
            setSelectedTerm={setSelectedTerm}
            selectedLoanId={selectedLoan}
            loanProducts={loanProducts}
          />
        </motion.div>

        {/* LOAN PRODUCTS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={styles.productsSection}
        >
          <div className={styles.productsHeader}>
            <div>
              <h2 className={styles.productsTitle}>Available Loan Products</h2>
              <p className={styles.productsSubtitle}>Submit interest for early access</p>
            </div>
            <div className={styles.productsActions}>
              {compareLoans.length > 0 && (
                <button
                  onClick={() => setIsComparing(true)}
                  className={styles.compareButton}
                  aria-label={`Compare ${compareLoans.length} selected loans`}
                >
                  Compare ({compareLoans.length})
                  <ArrowRight className={styles.compareButtonIcon} />
                </button>
              )}
              <div className={styles.securityBadge}>
                <Shield className={styles.securityIcon} />
                <span className={styles.securityText}>
                  <span className={styles.securityHighlight}>Secure</span> & encrypted
                </span>
              </div>
            </div>
          </div>

          <div className={styles.loanGrid}>
            {loanProducts.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                isSelected={selectedLoan === loan.id}
                isCompare={compareLoans.includes(loan.id)}
                onSelect={() => setSelectedLoan(loan.id)}
                onCompareToggle={() => handleCompareToggle(loan.id)}
                onApply={() => handleApplyForLoan(loan.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* COMPARISON OVERLAY */}
        {isComparing && compareLoans.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.comparisonSection}
          >
            <div onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button')?.textContent?.includes('Apply for Best Match')) {
                e.preventDefault();
                handleComparisonApply();
              }
            }}>
              <LoanComparison
                loans={loanProducts.filter((l) => compareLoans.includes(l.id))}
                onClose={() => setIsComparing(false)}
              />
            </div>
          </motion.div>
        )}

        {/* REPAYMENT SCHEDULE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.repaymentSection}
        >
          <RepaymentSchedule amount={loanAmount} term={selectedTerm} interestRate={4.9} />
        </motion.div>

        {/* CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={styles.ctaSection}
        >
          <div className={styles.ctaBanner}>
            <div className={styles.ctaAccent} />
            <div className={styles.ctaContent}>
              <div className={styles.ctaHeader}>
                <div className={styles.ctaIcon}>
                  <Rocket className={styles.ctaIconSvg} />
                </div>
                <div>
                  <h3 className={styles.ctaTitle}>Ready for Early Access?</h3>
                  <p className={styles.ctaSubtitle}>Join {stats.by_product.loan}+ others on the waitlist</p>
                </div>
              </div>

              <div className={styles.featureGrid}>
                {[
                  { icon: Zap, label: "Priority Access", sub: "Be first in line", color: "purple" },
                  { icon: Gift, label: "Launch Bonus", sub: "Exclusive offers", color: "teal" },
                  { icon: Bell, label: "Early Notify", sub: "Get notified first", color: "gold" },
                  { icon: Lock, label: "No Commitment", sub: "Free to submit", color: "navy" },
                ].map((feature) => {
                  const Icon = feature.icon;
                  const colorClass = 
                    feature.color === 'purple' ? styles.featurePurple :
                    feature.color === 'teal' ? styles.featureTeal :
                    feature.color === 'gold' ? styles.featureGold :
                    styles.featureNavy;
                  return (
                    <div key={feature.label} className={`${styles.featureItem} ${colorClass}`}>
                      <div className={styles.featureHeader}>
                        <Icon className={styles.featureIcon} />
                        <span className={styles.featureLabel}>{feature.label}</span>
                      </div>
                      <p className={styles.featureSubtext}>{feature.sub}</p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleStartVerification}
                disabled={isSubmitting}
                className={styles.ctaButton}
                aria-label="Join early access waitlist for loans"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={styles.spinnerIcon} aria-hidden="true" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    Join Early Access Waitlist
                    <ArrowRight className={styles.ctaButtonIcon} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className={styles.ctaFootnote}>
                No commitment required. We'll contact you when loans launch.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODALS */}
      <EarlyAccessModal
        open={earlyAccessModal.isOpen}
        loanName={earlyAccessModal.loanName}
        onClose={() => setEarlyAccessModal({ isOpen: false, loanId: '', loanName: '' })}
        onSubmit={() => submitLoanInterest(
          earlyAccessModal.loanId,
          `Join ${earlyAccessModal.loanName} waitlist`,
          loanAmount,
          selectedTerm
        )}
        isSubmitting={isSubmitting}
      />

      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
        referenceId={successModal.referenceId}
        loanName={successModal.loanName}
        amount={successModal.amount}
        term={successModal.term}
      />
    </div>
  );
}

export default function Loans() {
  return (
    <ProtectedRoute>
      <LoansContent />
    </ProtectedRoute>
  );
}