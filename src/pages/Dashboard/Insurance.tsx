import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Heart, 
  Home, 
  Car, 
  Plane, 
  Phone, 
  CheckCircle,
  TrendingUp,
  Star,
  Zap,
  ShieldCheck,
  ChevronRight,
  Clock,
  Users,
  Sparkles,
  BadgeCheck,
  Filter,
  Search,
  Globe,
  Smartphone,
  MessageCircle,
  HelpCircle,
  BarChart3,
  Calculator,
  Gift,
  Crown,
  Shield as ShieldIcon,
  Sparkle,
  X,
  Loader2,
  FileText,
  DollarSign,
  Target,
  Sliders,
  Download,
  PhoneCall
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import styles from './Insurance.module.css';

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'https://claverica-backend-production.up.railway.app';

// Enhanced insurance plans with more details
const insurancePlans = [
  {
    id: "health",
    name: "Health Shield Pro",
    provider: "ClaveRica Protect",
    tagline: "Complete health coverage worldwide",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
    gradient: "bg-gradient-premium-purple",
    bgColor: "bg-cream",
    features: [
      "Medical cover up to $2.5M",
      "24/7 Virtual Doctor",
      "Dental & Vision included",
      "Emergency evacuation & repatriation",
      "Mental health support",
      "Pre-existing conditions considered",
      "No claim bonus up to 50%"
    ],
    monthly: 89,
    annual: 1068,
    savings: "Save $100 annually",
    popular: true,
    badge: "MOST POPULAR",
    coverage: ["Inpatient", "Outpatient", "Maternity", "Cancer Care", "Chronic Diseases"],
    rating: 4.8,
    reviews: 1243,
    claimTime: "48 hours",
    deductible: "$250",
    waitingPeriod: "14 days",
    countries: 150,
  },
  {
    id: "travel",
    name: "Travel Guard Elite",
    provider: "ClaveRica Travel",
    tagline: "Wander worry-free worldwide",
    icon: Plane,
    color: "from-gold to-gold",
    gradient: "bg-gradient-gold",
    bgColor: "bg-cream",
    features: [
      "Trip cancellation up to $10,000",
      "Lost luggage & electronics",
      "Medical abroad - unlimited",
      "Flight delay (>3hr = $300)",
      "Adventure sports included",
      "Business trip coverage",
      "Cancel for any reason (75% refund)"
    ],
    monthly: 29,
    annual: 348,
    savings: "Save $48 annually",
    popular: false,
    badge: "BEST VALUE",
    coverage: ["Cancellation", "Medical", "Luggage", "Delay", "Activities"],
    rating: 4.6,
    reviews: 892,
    claimTime: "72 hours",
    deductible: "$100",
    waitingPeriod: "Immediate",
    countries: 180,
  },
  {
    id: "home",
    name: "Home Secure Plus",
    provider: "ClaveRica Home",
    tagline: "Your castle, perfectly protected",
    icon: Home,
    color: "from-teal to-teal",
    gradient: "bg-gradient-teal",
    bgColor: "bg-cream",
    features: [
      "Property damage up to $1M",
      "Theft & burglary protection",
      "Natural disasters coverage",
      "Personal liability $2M",
      "Alternative accommodation",
      "Home emergency helpline",
      "Gadget cover included"
    ],
    monthly: 129,
    annual: 1548,
    savings: "Save $156 annually",
    popular: true,
    badge: "TRENDING",
    coverage: ["Structure", "Contents", "Liability", "Accommodation", "Emergency"],
    rating: 4.7,
    reviews: 567,
    claimTime: "24 hours",
    deductible: "$500",
    waitingPeriod: "30 days",
    countries: 50,
  },
  {
    id: "device",
    name: "Device Care Max",
    provider: "ClaveRica Tech",
    tagline: "Your tech, always working",
    icon: Smartphone,
    color: "from-purple to-gold",
    gradient: "bg-gradient-purple-gold",
    bgColor: "bg-cream",
    features: [
      "Phone repair/replace (any brand)",
      "Screen damage - 2 claims/year",
      "Water damage covered",
      "Theft protection with Find My",
      "Accidental damage",
      "Battery replacement",
      "Annual device upgrade option"
    ],
    monthly: 15,
    annual: 180,
    savings: "Get AirPods free",
    popular: true,
    badge: "BESTSELLER",
    coverage: ["Screen", "Water", "Theft", "Battery", "Accidental"],
    rating: 4.9,
    reviews: 2341,
    claimTime: "Same day repair",
    deductible: "$50",
    waitingPeriod: "7 days",
    countries: 80,
  },
  {
    id: "auto",
    name: "Auto Protect Premium",
    provider: "ClaveRica Drive",
    tagline: "Drive with complete confidence",
    icon: Car,
    color: "from-navy to-teal",
    gradient: "bg-gradient-navy-teal",
    bgColor: "bg-cream",
    features: [
      "Accident cover - comprehensive",
      "Third-party liability $5M",
      "24/7 Roadside assistance",
      "Rental car ($50/day, 14 days)",
      "Windscreen & glass cover",
      "Key replacement",
      "No claims discount protection"
    ],
    monthly: 149,
    annual: 1788,
    savings: "Save $180 annually",
    popular: false,
    badge: "PREMIUM",
    coverage: ["Accident", "Third Party", "Roadside", "Rental", "Glass"],
    rating: 4.5,
    reviews: 423,
    claimTime: "24 hours",
    deductible: "$250",
    waitingPeriod: "Immediate",
    countries: 40,
  },
  {
    id: "life",
    name: "Life Guard Essential",
    provider: "ClaveRica Life",
    tagline: "Peace of mind for loved ones",
    icon: ShieldIcon,
    color: "from-gold to-teal",
    gradient: "bg-gradient-gold-teal",
    bgColor: "bg-cream",
    features: [
      "Term life insurance up to $2M",
      "Critical illness cover",
      "Income protection up to $10k/month",
      "Funeral expenses $15,000",
      "Child cover included",
      "No medical exam under 45",
      "Convertible to whole life"
    ],
    monthly: 45,
    annual: 540,
    savings: "Save $54 annually",
    popular: false,
    badge: "ESSENTIAL",
    coverage: ["Life", "Critical Illness", "Income", "Funeral", "Child"],
    rating: 4.4,
    reviews: 289,
    claimTime: "14 days",
    deductible: "N/A",
    waitingPeriod: "90 days",
    countries: 30,
  }
];

// Interactive coverage calculator data
const coverageCalculator = [
  { label: "Basic", value: 50000, color: "bg-gold-light" },
  { label: "Standard", value: 250000, color: "bg-purple-light" },
  { label: "Premium", value: 1000000, color: "bg-teal-light" },
  { label: "Ultimate", value: 2500000, color: "bg-gold" }
];

function InsuranceContent() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState({
    visible: false,
    referenceId: '',
    planName: '',
    message: '',
    contactTimeline: ''
  });
  const [coverageAmount, setCoverageAmount] = useState(250000);
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [comparePlans, setComparePlans] = useState<string[]>([]);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userStats, setUserStats] = useState({
    totalApplications: 0,
    monthlyPremium: 0,
    estimatedSavings: 0
  });

  // Modal states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showChatSupportModal, setShowChatSupportModal] = useState(false);

  // Load user's previous applications from localStorage
  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem('claverica_insurance_applications') || '[]');
    setUserApplications(savedApps);
    
    // Calculate stats
    const totalPremium = savedApps.reduce((sum, app) => sum + (app.monthlyPremium || 0), 0);
    const estimatedSavings = savedApps.length * 45;
    
    setUserStats({
      totalApplications: savedApps.length,
      monthlyPremium: totalPremium,
      estimatedSavings: estimatedSavings
    });
  }, []);

  // Handle insurance application
  const handleGetCoverage = async (planId: string) => {
    const plan = insurancePlans.find(p => p.id === planId);
    if (!plan) return;

    setLoading(planId);
    
    try {
      const dumpsterData = {
        product: 'insurance',
        product_subtype: planId,
        user_email: user?.email || '',
        user_phone: user?.phone || '',
        plan_name: plan.name,
        monthly_premium: plan.monthly,
        provider: plan.provider,
        coverage_amount: coverageAmount,
        duration: selectedDuration,
        source: 'insurance_dashboard',
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch(`${API_URL}/kyc_spec/collect/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(dumpsterData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        const application = {
          id: result.reference_id,
          planId: planId,
          planName: plan.name,
          monthlyPremium: plan.monthly,
          provider: plan.provider,
          status: 'pending_review',
          submittedAt: new Date().toISOString()
        };
        
        const updatedApps = [...userApplications, application];
        setUserApplications(updatedApps);
        localStorage.setItem('claverica_insurance_applications', JSON.stringify(updatedApps));
        
        setUserStats(prev => ({
          ...prev,
          totalApplications: updatedApps.length,
          monthlyPremium: prev.monthlyPremium + plan.monthly,
          estimatedSavings: updatedApps.length * 45
        }));
        
        setShowSuccessModal({
          visible: true,
          referenceId: result.reference_id,
          planName: plan.name,
          message: result.message || "Application submitted successfully",
          contactTimeline: result.contact_timeline || "24-48 hours"
        });
        
      } else {
        setShowSuccessModal({
          visible: true,
          referenceId: `LOCAL-${Date.now()}`,
          planName: plan.name,
          message: "Your interest has been registered. Our team will contact you.",
          contactTimeline: "24-48 hours"
        });
      }
      
    } catch (error) {
      console.error('Failed to submit insurance application:', error);
      
      setShowSuccessModal({
        visible: true,
        referenceId: `FALLBACK-${Date.now()}`,
        planName: plan.name,
        message: "We've received your interest and will contact you shortly.",
        contactTimeline: "24-48 hours"
      });
      
    } finally {
      setLoading(null);
    }
  };

  const toggleCompare = (planId: string) => {
    setComparePlans(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId)
        : [...prev, planId].slice(0, 3)
    );
  };

  const calculateMonthlyPremium = (basePrice: number, coverage: number) => {
    const multiplier = coverage / 250000;
    return Math.round(basePrice * multiplier * 100) / 100;
  };

  const filteredPlans = insurancePlans.filter(plan => {
    if (activeFilter === "popular" && !plan.popular) return false;
    if (activeFilter === "budget" && plan.monthly > 50) return false;
    if (activeFilter === "premium" && plan.monthly <= 50) return false;
    if (searchQuery && !plan.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.headerSection}
        >
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIcon}>
                <Shield className={styles.headerIconSvg} />
              </div>
              <div>
                <h1 className={styles.headerTitle}>Insurance</h1>
                <p className={styles.headerSubtitle}>Protect what matters most</p>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button 
                onClick={() => setShowFilterModal(true)}
                className={styles.filterButton}
              >
                <Filter className={styles.buttonIcon} />
                <span>Filter</span>
              </button>
              {userApplications.length > 0 && (
                <button 
                  onClick={() => setShowApplicationsModal(true)}
                  className={styles.applicationsButton}
                >
                  View Applications ({userApplications.length})
                </button>
              )}
            </div>
          </div>
          
          {/* Hero Banner */}
          <div className={styles.heroBanner}>
            <div className={styles.heroContent}>
              <div>
                <div className={styles.heroBadge}>
                  <Sparkles className={styles.badgeIcon} />
                  <span>Exclusive Partner Rates</span>
                </div>
                <h2 className={styles.heroTitle}>
                  Your Safety Net, Reinvented
                </h2>
                <p className={styles.heroDescription}>
                  Get comprehensive coverage starting from $15/month with instant approval, 
                  24/7 support, and partner rewards. <span className={styles.highlight}>Save up to 30%</span> compared to traditional insurers.
                </p>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <div className={`${styles.statCircle} ${styles.purpleCircle}`}>
                    <Zap className={styles.statIcon} />
                  </div>
                  <p className={styles.statLabel}>Instant Quotes</p>
                </div>
                <div className={styles.heroStat}>
                  <div className={`${styles.statCircle} ${styles.tealCircle}`}>
                    <Clock className={styles.statIcon} />
                  </div>
                  <p className={styles.statLabel}>24/7 Claims</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Stats Dashboard */}
        <div className={styles.statsGrid}>
          <motion.div whileHover={{ scale: 1.02 }} className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Applications</p>
                <p className={styles.statValue}>{userStats.totalApplications}</p>
                <p className={styles.statSubtext}>
                  {userStats.totalApplications > 0 ? '+1 pending review' : 'Start your first application'}
                </p>
              </div>
              <div className={`${styles.statIconContainer} ${styles.purpleIcon}`}>
                <BadgeCheck className={styles.statIconSvg} />
              </div>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Monthly Premium</p>
                <p className={styles.statValue}>${userStats.monthlyPremium}</p>
                <p className={styles.statSubtext}>
                  Potential savings: ${userStats.estimatedSavings}/mo
                </p>
              </div>
              <div className={`${styles.statIconContainer} ${styles.tealIcon}`}>
                <TrendingUp className={styles.statIconSvg} />
              </div>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Claims This Year</p>
                <p className={styles.statValue}>0</p>
                <p className={styles.statSubtext}>
                  No-claim bonus: 15%
                </p>
              </div>
              <div className={`${styles.statIconContainer} ${styles.goldIcon}`}>
                <ShieldCheck className={styles.statIconSvg} />
              </div>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Partner Rewards</p>
                <p className={styles.statValue}>${userStats.totalApplications * 25}</p>
                <p className={styles.statSubtext}>
                  {userStats.totalApplications > 0 ? 'Redeem in app' : 'Earn with first application'}
                </p>
              </div>
              <div className={`${styles.statIconContainer} ${styles.goldIcon}`}>
                <Gift className={styles.statIconSvg} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Coverage Calculator */}
        <div className={styles.calculatorSection}>
          <div className={styles.calculatorHeader}>
            <h2 className={styles.sectionTitle}>Coverage Calculator</h2>
            <div className={styles.durationToggle}>
              <button 
                onClick={() => setSelectedDuration("monthly")}
                className={`${styles.durationButton} ${selectedDuration === "monthly" ? styles.activeDuration : ''}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setSelectedDuration("annual")}
                className={`${styles.durationButton} ${selectedDuration === "annual" ? styles.activeDuration : ''}`}
              >
                Annual (Save 15%)
              </button>
            </div>
          </div>
          
          <div className={styles.calculatorContent}>
            <div className={styles.rangeHeader}>
              <h3 className={styles.rangeTitle}>Select Coverage Amount</h3>
              <div className={styles.coverageAmount}>
                ${coverageAmount.toLocaleString()}
              </div>
            </div>
            
            <div className={styles.rangeContainer}>
              <div className={styles.rangeTrack}>
                <div 
                  className={styles.rangeFill}
                  style={{ width: `${(coverageAmount / 2500000) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="50000"
                  max="2500000"
                  step="50000"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>
            </div>
            
            <div className={styles.coverageLevels}>
              {coverageCalculator.map((level) => (
                <button
                  key={level.label}
                  onClick={() => setCoverageAmount(level.value)}
                  className={`${styles.coverageLevel} ${coverageAmount === level.value ? styles.activeLevel : ''}`}
                >
                  <div className={`${styles.levelBar} ${level.color}`}></div>
                  <div className={styles.levelLabel}>{level.label}</div>
                  <div className={styles.levelValue}>${level.value.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.previewGrid}>
            {insurancePlans.slice(0, 3).map((plan) => (
              <div key={plan.id} className={styles.previewCard}>
                <div className={styles.previewHeader}>
                  <div className={`${styles.previewIcon} ${plan.gradient}`}>
                    <plan.icon className={styles.previewIconSvg} />
                  </div>
                  <div>
                    <h4 className={styles.previewName}>{plan.name}</h4>
                    <p className={styles.previewProvider}>{plan.provider}</p>
                  </div>
                </div>
                <div className={styles.previewPrice}>
                  <div className={styles.previewAmount}>
                    ${calculateMonthlyPremium(plan.monthly, coverageAmount)}
                  </div>
                  <div className={styles.previewPeriod}>per month</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Plans Grid */}
        <div className={styles.plansSection}>
          <div className={styles.plansHeader}>
            <h2 className={styles.sectionTitle}>
              Available Plans
              <span className={styles.plansCount}>
                {filteredPlans.length} plans available
              </span>
            </h2>
            
            <div className={styles.plansControls}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <div className={styles.filterTabs}>
                {["all", "popular", "budget", "premium"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`${styles.filterTab} ${activeFilter === filter ? styles.activeFilter : ''}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Comparison Bar */}
          {comparePlans.length > 0 && (
            <div className={styles.comparisonBar}>
              <div className={styles.comparisonContent}>
                <div className={styles.comparisonText}>
                  <BarChart3 className={styles.comparisonIcon} />
                  <span>Comparing {comparePlans.length} plans</span>
                </div>
                <button
                  onClick={() => setComparePlans([])}
                  className={styles.clearComparison}
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
          
          <div className={styles.plansGrid}>
            {filteredPlans.map((plan) => {
              const Icon = plan.icon;
              const isComparing = comparePlans.includes(plan.id);
              const isDetailed = showDetails === plan.id;
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className={`${styles.planCard} ${isComparing ? styles.comparing : ''}`}
                >
                  {/* Badges */}
                  <div className={styles.badgeContainer}>
                    <div className={styles.betaBadge}>
                      <Sparkles className={styles.badgeIcon} />
                      <span>ACTIVE BETA</span>
                    </div>
                    
                    {plan.badge && (
                      <div className={styles.featuredBadge}>
                        {plan.badge}
                      </div>
                    )}
                  </div>
                  
                  {/* Plan Header */}
                  <div className={styles.planHeader}>
                    <div className={styles.planHeaderLeft}>
                      <div className={`${styles.planIcon} ${plan.gradient}`}>
                        <Icon className={styles.planIconSvg} />
                      </div>
                      <div>
                        <h3 className={styles.planName}>{plan.name}</h3>
                        <p className={styles.planTagline}>{plan.tagline}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleCompare(plan.id)}
                      className={`${styles.compareButton} ${isComparing ? styles.activeCompare : ''}`}
                    >
                      <BarChart3 className={styles.compareIcon} />
                    </button>
                  </div>
                  
                  {/* Rating & Meta */}
                  <div className={styles.planMeta}>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} />
                      <span className={styles.ratingValue}>{plan.rating}</span>
                      <span className={styles.reviewCount}>({plan.reviews} reviews)</span>
                    </div>
                    <div className={styles.countryInfo}>
                      <Globe className={styles.globeIcon} />
                      <span>{plan.countries} countries</span>
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className={styles.pricingSection}>
                    <div className={styles.priceContainer}>
                      <div>
                        <div className={styles.priceAmount}>
                          ${selectedDuration === "monthly" ? plan.monthly : plan.annual}
                        </div>
                        <div className={styles.pricePeriod}>
                          {selectedDuration === "monthly" ? 'per month' : 'per year'}
                        </div>
                      </div>
                      <div className={styles.priceMeta}>
                        <div className={styles.savingsBadge}>
                          {plan.savings}
                        </div>
                        <div className={styles.claimTime}>
                          Claim time: {plan.claimTime}
                        </div>
                      </div>
                    </div>
                    
                    {/* Toggle Details */}
                    <button
                      onClick={() => setShowDetails(showDetails === plan.id ? null : plan.id)}
                      className={styles.detailsToggle}
                    >
                      <span>Coverage Details</span>
                      <ChevronRight className={`${styles.chevron} ${isDetailed ? styles.chevronOpen : ''}`} />
                    </button>
                    
                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isDetailed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={styles.expandedDetails}
                        >
                          <div className={styles.coverageSection}>
                            <h4 className={styles.coverageTitle}>Coverage Includes:</h4>
                            <div className={styles.coverageTags}>
                              {plan.coverage.map((item, idx) => (
                                <span key={idx} className={styles.coverageTag}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className={styles.detailsGrid}>
                            <div>
                              <p className={styles.detailLabel}>Deductible</p>
                              <p className={styles.detailValue}>{plan.deductible}</p>
                            </div>
                            <div>
                              <p className={styles.detailLabel}>Waiting Period</p>
                              <p className={styles.detailValue}>{plan.waitingPeriod}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Features */}
                  <div className={styles.featuresSection}>
                    <h4 className={styles.featuresTitle}>Key Features:</h4>
                    <ul className={styles.featuresList}>
                      {plan.features.slice(0, isDetailed ? plan.features.length : 4).map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          <CheckCircle className={styles.featureIcon} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => handleGetCoverage(plan.id)}
                      disabled={loading === plan.id}
                      className={styles.primaryButton}
                    >
                      {loading === plan.id ? (
                        <>
                          <Loader2 className={styles.spinnerIcon} />
                          Processing Application...
                        </>
                      ) : (
                        <>
                          <Sparkle className={styles.buttonIcon} />
                          Apply Now - Priority Access
                          <ChevronRight className={styles.buttonChevron} />
                        </>
                      )}
                    </button>
                    
                    <div className={styles.secondaryButtons}>
                      <button 
                        onClick={() => setShowCalculatorModal(true)}
                        className={styles.secondaryButton}
                      >
                        <Calculator className={styles.buttonIcon} />
                        Calculate
                      </button>
                      <button 
                        onClick={() => setShowChatSupportModal(true)}
                        className={styles.secondaryButton}
                      >
                        <HelpCircle className={styles.buttonIcon} />
                        Get Help
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== MODALS ===== */}

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal.visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modalOverlay}
              onClick={() => setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' })}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.successModal}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalContent}>
                  <div className={styles.successIconContainer}>
                    <CheckCircle className={styles.successIcon} />
                  </div>
                  
                  <h3 className={styles.modalTitle}>
                    Application Submitted! 🎉
                  </h3>
                  
                  <p className={styles.modalMessage}>
                    {showSuccessModal.message}
                  </p>
                  
                  {/* Reference Card */}
                  <div className={styles.referenceCard}>
                    <div className={styles.referenceHeader}>
                      <div className={styles.referenceLabel}>Reference ID</div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(showSuccessModal.referenceId)}
                        className={styles.copyButton}
                      >
                        Copy
                      </button>
                    </div>
                    <div className={styles.referenceId}>
                      {showSuccessModal.referenceId}
                    </div>
                    <div className={styles.referencePlan}>
                      Plan: {showSuccessModal.planName}
                    </div>
                  </div>
                  
                  {/* Next Steps */}
                  <div className={styles.nextStepsCard}>
                    <div className={styles.nextStepsContent}>
                      <Clock className={styles.nextStepsIcon} />
                      <div>
                        <h4 className={styles.nextStepsTitle}>What Happens Next?</h4>
                        <ul className={styles.nextStepsList}>
                          <li>• Our underwriting team will review your application</li>
                          <li>• You'll receive an email confirmation within {showSuccessModal.contactTimeline}</li>
                          <li>• A specialist will contact you for final details</li>
                          <li>• Get ready for your personalized quote</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className={styles.modalActions}>
                    <button
                      onClick={() => setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' })}
                      className={styles.modalPrimaryButton}
                    >
                      Continue Browsing Plans
                    </button>
                    <button
                      onClick={() => {
                        setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' });
                        setShowApplicationsModal(true);
                      }}
                      className={styles.modalSecondaryButton}
                    >
                      Track Application Status
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className={styles.modalOverlay} onClick={() => setShowFilterModal(false)}>
            <div className={styles.filterModal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Filter Plans</h3>
                <button onClick={() => setShowFilterModal(false)} className={styles.closeButton}>
                  <X className={styles.closeIcon} />
                </button>
              </div>
              <div className={styles.filterContent}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Price Range</label>
                  <input 
                    type="range" 
                    min="15" 
                    max="200" 
                    defaultValue="100"
                    className={styles.filterRange}
                  />
                  <div className={styles.rangeLabels}>
                    <span>$15</span>
                    <span>$100</span>
                    <span>$200</span>
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Coverage Type</label>
                  <div className={styles.checkboxGroup}>
                    {['Health', 'Travel', 'Home', 'Device', 'Auto', 'Life'].map(type => (
                      <label key={type} className={styles.checkboxLabel}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Minimum Rating</label>
                  <div className={styles.ratingButtons}>
                    {[4, 4.5, 5].map(rating => (
                      <button key={rating} className={styles.ratingButton}>
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button 
                    onClick={() => setShowFilterModal(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowFilterModal(false);
                      alert('Filters applied!');
                    }}
                    className={styles.applyButton}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications Modal */}
        {showApplicationsModal && (
          <div className={styles.modalOverlay} onClick={() => setShowApplicationsModal(false)}>
            <div className={styles.applicationsModal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Your Applications</h3>
                <button onClick={() => setShowApplicationsModal(false)} className={styles.closeButton}>
                  <X className={styles.closeIcon} />
                </button>
              </div>
              
              <div className={styles.applicationsList}>
                {userApplications.length > 0 ? (
                  <>
                    {userApplications.map((app, index) => (
                      <div key={index} className={styles.applicationItem}>
                        <div className={styles.applicationHeader}>
                          <div>
                            <h4 className={styles.applicationName}>{app.planName}</h4>
                            <p className={styles.applicationProvider}>{app.provider}</p>
                          </div>
                          <span className={`${styles.statusBadge} ${styles.pendingStatus}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className={styles.applicationDetails}>
                          <div>
                            <p className={styles.detailLabel}>Reference</p>
                            <p className={styles.detailValue}>{app.id}</p>
                          </div>
                          <div>
                            <p className={styles.detailLabel}>Monthly</p>
                            <p className={styles.detailValue}>${app.monthlyPremium}</p>
                          </div>
                        </div>
                        <div className={styles.applicationFooter}>
                          <span className={styles.submittedDate}>
                            Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                          <button className={styles.viewDetailsButton}>
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className={styles.exportSection}>
                      <button 
                        onClick={() => {
                          alert('Downloading applications...');
                          setShowApplicationsModal(false);
                        }}
                        className={styles.exportButton}
                      >
                        <Download className={styles.buttonIcon} />
                        Export Applications
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.emptyState}>
                    <FileText className={styles.emptyIcon} />
                    <h4 className={styles.emptyTitle}>No Applications Yet</h4>
                    <p className={styles.emptyMessage}>Start by applying for an insurance plan above.</p>
                    <button 
                      onClick={() => setShowApplicationsModal(false)}
                      className={styles.emptyButton}
                    >
                      Browse Plans
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Calculator Modal */}
        {showCalculatorModal && (
          <div className={styles.modalOverlay} onClick={() => setShowCalculatorModal(false)}>
            <div className={styles.calculatorModal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Advanced Calculator</h3>
                <button onClick={() => setShowCalculatorModal(false)} className={styles.closeButton}>
                  <X className={styles.closeIcon} />
                </button>
              </div>
              
              <div className={styles.calculatorContent}>
                <div className={styles.calculatorGroup}>
                  <label className={styles.calculatorLabel}>Age</label>
                  <input 
                    type="number" 
                    min="18" 
                    max="70" 
                    defaultValue="35"
                    className={styles.calculatorInput}
                  />
                </div>
                <div className={styles.calculatorGroup}>
                  <label className={styles.calculatorLabel}>Location</label>
                  <select className={styles.calculatorSelect}>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className={styles.calculatorGroup}>
                  <label className={styles.calculatorLabel}>Coverage Needs</label>
                  <div className={styles.coverageOptions}>
                    {['Basic', 'Standard', 'Premium', 'Maximum'].map(level => (
                      <button key={level} className={styles.coverageOption}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.calculatorGroup}>
                  <label className={styles.calculatorLabel}>Health Status</label>
                  <div className={styles.healthOptions}>
                    {['Excellent', 'Good', 'Average'].map(status => (
                      <button key={status} className={styles.healthOption}>
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className={styles.calculatorResult}>
                  <div className={styles.resultRow}>
                    <span>Estimated Monthly Premium</span>
                    <span className={styles.resultValue}>$127</span>
                  </div>
                  <div className={styles.resultRow}>
                    <span>Annual Savings</span>
                    <span className={styles.savingsValue}>Save $156/year</span>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button 
                    onClick={() => setShowCalculatorModal(false)}
                    className={styles.cancelButton}
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      alert('Personalized quote generated!');
                      setShowCalculatorModal(false);
                    }}
                    className={styles.applyButton}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Support Modal */}
        {showChatSupportModal && (
          <div className={styles.modalOverlay} onClick={() => setShowChatSupportModal(false)}>
            <div className={styles.chatModal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Get Help</h3>
                <button onClick={() => setShowChatSupportModal(false)} className={styles.closeButton}>
                  <X className={styles.closeIcon} />
                </button>
              </div>
              
              <div className={styles.chatContent}>
                <div className={styles.chatIconContainer}>
                  <PhoneCall className={styles.chatIcon} />
                </div>
                <h4 className={styles.chatTitle}>Insurance Support</h4>
                <p className={styles.chatMessage}>How can we help you today?</p>
              </div>
              
              <div className={styles.chatOptions}>
                <button 
                  onClick={() => alert('Connecting to live chat...')}
                  className={styles.chatOptionButton}
                >
                  💬 Live Chat Support
                </button>
                <button 
                  onClick={() => alert('Calling support: 1-800-INSURANCE')}
                  className={styles.chatOptionButton}
                >
                  📞 Call Support
                </button>
                <button 
                  onClick={() => alert('Scheduling callback...')}
                  className={styles.chatOptionButton}
                >
                  ⏰ Schedule Callback
                </button>
              </div>
              
              <div className={styles.chatFooter}>
                <p className={styles.chatFooterText}>
                  Available 24/7 • Average wait time: 2 minutes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Insurance() {
  return (
    <ProtectedRoute>
      <InsuranceContent />
    </ProtectedRoute>
  );
}