// src/pages/Dashboard/Loans.tsx - UPDATED WITH CLEAN COLOR SYSTEM
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
import "./Loans.module.css";

// ─────────────────────────────────────────────────────────────
// LOAN PRODUCT DATA (Clean color system)
// ─────────────────────────────────────────────────────────────
const loanProducts = [
  {
    id: "personal",
    name: "Personal Loan",
    provider: "Claverica Finance",
    icon: Wallet,
    color: "purple",  // Using semantic type instead of hex
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
    color: "teal",
    badgeColor: "bg-teal/10 text-teal border-teal/20",
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
    color: "charcoal",
    badgeColor: "bg-charcoal/10 text-charcoal border-charcoal/20",
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
    color: "teal",
    badgeColor: "bg-teal/10 text-teal border-teal/20",
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
    color: "gold",
    badgeColor: "bg-gold/10 text-gold border-gold/20",
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
// SUCCESS MODAL (Clean color system)
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
            className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-md"
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
          >
            <div className="bg-ivory dark:bg-charcoal border border-gold/20 dark:border-gold/10 rounded-2xl p-6 shadow-2xl shadow-charcoal/10 dark:shadow-black/40">
              {/* Top accent - gold to purple gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-purple rounded-t-2xl" />
              
              {/* Header with celebration */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-slate/20 dark:bg-slate/30 flex items-center justify-center" aria-hidden="true">
                    <CheckCircle className="w-6 h-6 text-slate" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-pulse" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="success-modal-title" className="text-lg font-bold text-charcoal dark:text-ivory">You're on the list! 🎉</h3>
                  <p className="text-sm text-charcoal/60 dark:text-ivory/60">Early Access Program</p>
                </div>
              </div>
              
              {/* Message */}
              <div className="mb-6">
                <p className="text-charcoal/80 dark:text-ivory/80 mb-3">
                  ✨ <span className="font-semibold text-purple dark:text-purple">{loanName}</span> interest submitted successfully!
                </p>
                <p className="text-sm text-charcoal/60 dark:text-ivory/60">
                  You're now in our priority queue. We'll contact you with exclusive rates when loans launch.
                </p>
              </div>
              
              {/* Reference Card */}
              <div className="bg-ivory dark:bg-charcoal/80 border border-gold/20 dark:border-gold/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple/20 border border-purple/30 flex items-center justify-center" aria-hidden="true">
                      <BadgeCheck className="w-4 h-4 text-purple" />
                    </div>
                    <span className="text-sm font-medium text-charcoal/70 dark:text-ivory/70">Reference ID</span>
                  </div>
                  <button 
                    onClick={handleCopyReferenceId}
                    className="text-xs font-medium text-purple hover:text-gold bg-purple/10 hover:bg-gold/10 px-2 py-1 rounded-lg transition-colors"
                    aria-label={`Copy reference ID: ${referenceId}`}
                  >
                    Copy
                  </button>
                </div>
                <div className="font-mono text-sm text-charcoal dark:text-ivory bg-charcoal/5 dark:bg-ivory/5 rounded-lg p-3 border border-gold/20 dark:border-gold/10">
                  {referenceId}
                </div>
              </div>
              
              {/* What's Next - Clean ClaveRica style */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-xl p-3">
                  <Rocket className="w-4 h-4 text-gold" />
                  <div>
                    <p className="text-xs font-semibold text-gold">Priority Position</p>
                    <p className="text-xs text-charcoal/60 dark:text-ivory/60">You'll be first to access when we launch</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-purple/10 border border-purple/20 rounded-xl p-3">
                  <Bell className="w-4 h-4 text-purple" />
                  <div>
                    <p className="text-xs font-semibold text-purple">Exclusive Updates</p>
                    <p className="text-xs text-charcoal/60 dark:text-ivory/60">Get early notifications & special offers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate/10 border border-slate/20 rounded-xl p-3">
                  <Gift className="w-4 h-4 text-slate" />
                  <div>
                    <p className="text-xs font-semibold text-slate">Launch Bonus</p>
                    <p className="text-xs text-charcoal/60 dark:text-ivory/60">Eligible for early adopter rewards</p>
                  </div>
                </div>
              </div>
              
              {/* Action Button - Purple to Gold gradient */}
              <button
                onClick={onClose}
                className="w-full py-3 text-sm font-semibold text-ivory bg-gradient-to-r from-purple to-gold hover:from-gold hover:to-purple rounded-xl shadow-lg shadow-purple/25 hover:shadow-xl hover:shadow-gold/40 transition-all duration-300 flex items-center justify-center gap-2"
                aria-label="Continue exploring loan options"
              >
                Continue Exploring
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Small print */}
              <p className="text-xs text-charcoal/50 dark:text-ivory/50 text-center mt-4">
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
// EARLY ACCESS MODAL (Clean color system)
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
            className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-md"
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-x-4 bottom-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
          >
            <div className="bg-ivory dark:bg-charcoal border border-gold/20 dark:border-gold/10 rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/20 dark:shadow-black/50">
              {/* Animated gradient header - gold to purple */}
              <div className="h-2 bg-gradient-to-r from-gold to-purple animate-pulse" aria-hidden="true" />
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center" aria-hidden="true">
                      <Rocket className="w-5 h-5 text-purple" />
                    </div>
                    <div>
                      <h3 id="early-access-title" className="text-base font-bold text-charcoal dark:text-ivory">Join Early Access</h3>
                      <p className="text-xs text-charcoal/60 dark:text-ivory/60">Get priority when {loanName} launches</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-lg bg-ivory dark:bg-charcoal border border-gold/20 dark:border-gold/10 hover:border-gold flex items-center justify-center transition-colors"
                    aria-label="Close early access modal"
                  >
                    <X className="w-3.5 h-3.5 text-charcoal/60 dark:text-ivory/60" />
                  </button>
                </div>

                {/* Benefits - Clean color system */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Target, text: "Priority position in waitlist", color: "purple" },
                    { icon: Gift, text: "Exclusive launch offers", color: "slate" },
                    { icon: Bell, text: "Early notifications", color: "gold" },
                    { icon: Users, text: "Dedicated support", color: "charcoal" },
                  ].map((benefit, idx) => {
                    const Icon = benefit.icon;
                    const colorClass = benefit.color === 'purple' ? 'border-purple/20 bg-purple/10 text-purple' :
                                      benefit.color === 'slate' ? 'border-slate/20 bg-slate/10 text-slate' :
                                      benefit.color === 'gold' ? 'border-gold/20 bg-gold/10 text-gold' :
                                      'border-charcoal/20 bg-charcoal/10 text-charcoal dark:text-ivory';
                    return (
                      <div key={idx} className={`flex items-center gap-3 rounded-lg border p-3 ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-xs text-charcoal/80 dark:text-ivory/80">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-around bg-charcoal/5 dark:bg-ivory/5 rounded-xl p-3 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3 text-purple" />
                      <p className="text-lg font-bold text-charcoal dark:text-ivory">150+</p>
                    </div>
                    <p className="text-xs text-charcoal/60 dark:text-ivory/60">Already waiting</p>
                  </div>
                  <div className="h-8 w-px bg-gold/20 dark:bg-gold/10" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3 text-slate" />
                      <p className="text-lg font-bold text-charcoal dark:text-ivory">Q2 2024</p>
                    </div>
                    <p className="text-xs text-charcoal/60 dark:text-ivory/60">Expected launch</p>
                  </div>
                </div>

                {/* CTA - Purple to Gold */}
                <div className="space-y-2">
                  <button
                    onClick={onSubmit}
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                    className="w-full py-3 text-sm font-semibold text-ivory bg-gradient-to-r from-purple to-gold hover:from-gold hover:to-purple rounded-xl shadow-lg shadow-purple/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    aria-label={`Join waitlist for ${loanName}`}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        Join Waitlist for {loanName}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 text-sm font-semibold text-charcoal/60 dark:text-ivory/60 hover:text-gold transition-colors"
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
    <div className="min-h-screen bg-ivory dark:bg-charcoal">
      {/* Animated background grid - using brand colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                        from-purple/5 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238626E9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-purple/20 flex items-center justify-center" aria-hidden="true">
                  <DollarSign className="w-7 h-7 text-purple" />
                </div>
                <div className="absolute -top-2 -right-2 bg-gold text-charcoal text-xs font-bold px-2 py-1 rounded-lg">
                  EARLY ACCESS
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal dark:text-ivory tracking-tight">Smart Loans</h1>
                <p className="text-sm text-charcoal/60 dark:text-ivory/60 mt-1">
                  Join {stats.by_product.loan}+ others on the waitlist
                </p>
              </div>
            </div>

            {/* User Stats */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-charcoal/60 dark:text-ivory/60">Pre-approved for</p>
                  <p className="text-lg font-bold text-charcoal dark:text-ivory">$50,000</p>
                </div>
                <div className="h-8 w-px bg-gold/20 dark:bg-gold/10" />
                <div className="text-right">
                  <p className="text-xs text-charcoal/60 dark:text-ivory/60">Best Rate</p>
                  <p className="text-lg font-bold text-slate dark:text-slate">3.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Banner - Clean ClaveRica style */}
          <div className="bg-ivory dark:bg-charcoal/80 border border-gold/20 dark:border-gold/10 rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-gold to-purple" aria-hidden="true" />
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2 className="text-lg font-bold text-charcoal dark:text-ivory">
                  Welcome back, <span className="text-purple">{user?.first_name || "valued customer"}</span>
                </h2>
                <p className="text-sm text-charcoal/60 dark:text-ivory/60 mt-1">
                  Submit interest for exclusive early access rates
                </p>
              </div>
              <div className="flex items-center gap-6">
                {[
                  { icon: Zap, value: "Instant", label: "Waitlist", color: "gold" },
                  { icon: Lock, value: "Secure", label: "Submission", color: "slate" },
                  { icon: Gift, value: "Bonus", label: "On Launch", color: "purple" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  const colorClass = stat.color === 'gold' ? 'text-gold' : stat.color === 'slate' ? 'text-slate' : 'text-purple';
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                        <p className={`text-lg font-bold ${colorClass}`}>{stat.value}</p>
                      </div>
                      <p className="text-xs text-charcoal/60 dark:text-ivory/60">{stat.label}</p>
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
          className="mb-8"
        >
          <div 
            onClick={handleViewRates}
            onKeyDown={handleEligibilityKeyDown}
            role="button"
            tabIndex={0}
            className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 dark:focus:ring-offset-charcoal rounded-xl"
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
          className="mb-8"
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
          className="mb-8"
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
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-xl font-bold text-charcoal dark:text-ivory">Available Loan Products</h2>
              <p className="text-sm text-charcoal/60 dark:text-ivory/60 mt-0.5">Submit interest for early access</p>
            </div>
            <div className="flex items-center gap-3">
              {compareLoans.length > 0 && (
                <button
                  onClick={() => setIsComparing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-ivory bg-gradient-to-r from-purple to-gold rounded-xl shadow-lg shadow-purple/25 hover:shadow-xl hover:shadow-gold/40 transition-all focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 dark:focus:ring-offset-charcoal"
                  aria-label={`Compare ${compareLoans.length} selected loans`}
                >
                  Compare ({compareLoans.length})
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-2 bg-charcoal/5 dark:bg-ivory/5 border border-gold/20 dark:border-gold/10 rounded-lg px-3 py-1.5">
                <Shield className="w-3.5 h-3.5 text-slate" />
                <span className="text-xs text-charcoal/70 dark:text-ivory/70">
                  <span className="text-slate font-semibold">Secure</span> & encrypted
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            className="mb-8"
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
          className="mb-8"
        >
          <RepaymentSchedule amount={loanAmount} term={selectedTerm} interestRate={4.9} />
        </motion.div>

        {/* CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="bg-ivory dark:bg-charcoal/80 border border-gold/20 dark:border-gold/10 rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-gold via-purple to-slate animate-pulse" aria-hidden="true" />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple/20 flex items-center justify-center" aria-hidden="true">
                  <Rocket className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-charcoal dark:text-ivory">Ready for Early Access?</h3>
                  <p className="text-sm text-charcoal/60 dark:text-ivory/60">Join {stats.by_product.loan}+ others on the waitlist</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: Zap, label: "Priority Access", sub: "Be first in line", color: "purple" },
                  { icon: Gift, label: "Launch Bonus", sub: "Exclusive offers", color: "slate" },
                  { icon: Bell, label: "Early Notify", sub: "Get notified first", color: "gold" },
                  { icon: Lock, label: "No Commitment", sub: "Free to submit", color: "charcoal" },
                ].map((feature) => {
                  const Icon = feature.icon;
                  const colorClass = feature.color === 'purple' ? 'border-purple/20 bg-purple/5 text-purple' :
                                    feature.color === 'slate' ? 'border-slate/20 bg-slate/5 text-slate' :
                                    feature.color === 'gold' ? 'border-gold/20 bg-gold/5 text-gold' :
                                    'border-charcoal/20 bg-charcoal/5 text-charcoal dark:text-ivory';
                  return (
                    <div key={feature.label} className={`rounded-xl border ${colorClass} p-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-semibold text-charcoal dark:text-ivory">{feature.label}</span>
                      </div>
                      <p className="text-xs text-charcoal/60 dark:text-ivory/60">{feature.sub}</p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleStartVerification}
                disabled={isSubmitting}
                className="w-full py-3 text-sm font-semibold text-ivory bg-gradient-to-r from-purple to-gold hover:from-gold hover:to-purple rounded-xl shadow-lg shadow-purple/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 dark:focus:ring-offset-charcoal"
                aria-label="Join early access waitlist for loans"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    Join Early Access Waitlist
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-xs text-charcoal/60 dark:text-ivory/60 text-center mt-4">
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