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

// Enhanced insurance plans with more details
const insurancePlans = [
  {
    id: "health",
    name: "Health Shield Pro",
    provider: "Monzo Protect",
    tagline: "Complete health coverage worldwide",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
    features: [
      "Medical cover up to $2.5M",
      "24/7 Virtual Doctor (Monzo MD)",
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
    providerLogo: "https://i.imgur.com/MONZO_LOGO.png"
  },
  {
    id: "travel",
    name: "Travel Guard Elite",
    provider: "Revolut Travel",
    tagline: "Wander worry-free worldwide",
    icon: Plane,
    color: "from-blue-500 to-cyan-600",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
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
    providerLogo: "https://i.imgur.com/REVOLUT_LOGO.png"
  },
  {
    id: "home",
    name: "Home Secure Plus",
    provider: "Revolut Home",
    tagline: "Your castle, perfectly protected",
    icon: Home,
    color: "from-emerald-500 to-green-600",
    gradient: "bg-gradient-to-br from-emerald-500 to-green-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
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
    providerLogo: "https://i.imgur.com/REVOLUT_LOGO.png"
  },
  {
    id: "device",
    name: "Device Care Max",
    provider: "Skrill Shield",
    tagline: "Your tech, always working",
    icon: Smartphone,
    color: "from-purple-500 to-violet-600",
    gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
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
    providerLogo: "https://i.imgur.com/SKRILL_LOGO.png"
  },
  {
    id: "auto",
    name: "Auto Protect Premium",
    provider: "Monzo Drive",
    tagline: "Drive with complete confidence",
    icon: Car,
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
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
    providerLogo: "https://i.imgur.com/MONZO_LOGO.png"
  },
  {
    id: "life",
    name: "Life Guard Essential",
    provider: "Revolut Life",
    tagline: "Peace of mind for loved ones",
    icon: ShieldIcon,
    color: "from-indigo-500 to-blue-600",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
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
    providerLogo: "https://i.imgur.com/REVOLUT_LOGO.png"
  }
];

// Interactive coverage calculator data
const coverageCalculator = [
  { label: "Basic", value: 50000, color: "bg-slate-200" },
  { label: "Standard", value: 250000, color: "bg-blue-200" },
  { label: "Premium", value: 1000000, color: "bg-purple-200" },
  { label: "Ultimate", value: 2500000, color: "bg-rose-200" }
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

  // NEW: Modal states for all buttons
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

  // Simplified submission to KYC dumpster
  const handleGetCoverage = async (planId: string) => {
    const plan = insurancePlans.find(p => p.id === planId);
    if (!plan) return;

    setLoading(planId);
    
    try {
      // Simplified payload
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
      
      const response = await fetch('/api/kyc-spec/collect/', {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Insurance</h1>
                <p className="text-slate-600 dark:text-slate-400">Protect what matters most</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowFilterModal(true)}
                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter</span>
              </button>
              {userApplications.length > 0 && (
                <button 
                  onClick={() => setShowApplicationsModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  View Applications ({userApplications.length})
                </button>
              )}
            </div>
          </div>
          
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-slate-300/30 dark:border-slate-700/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full">
                    NEW
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Crown className="w-4 h-4" />
                    <span className="font-medium">Exclusive Partner Rates</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Your Safety Net, Reinvented
                </h2>
                <p className="text-slate-700 dark:text-slate-300 max-w-2xl">
                  Get comprehensive coverage starting from $15/month with instant approval, 
                  24/7 support, and partner rewards. <span className="font-semibold text-emerald-600 dark:text-emerald-400">Save up to 30%</span> compared to traditional insurers.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-medium mt-2">Instant Quotes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-medium mt-2">24/7 Claims</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Applications</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  {userStats.totalApplications}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {userStats.totalApplications > 0 ? '+1 pending review' : 'Start your first application'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Premium</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  ${userStats.monthlyPremium}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Potential savings: ${userStats.estimatedSavings}/mo
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Claims This Year</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">0</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  No-claim bonus: 15%
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-violet-200 dark:from-purple-900/30 dark:to-violet-800/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Partner Rewards</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  ${userStats.totalApplications * 25}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  {userStats.totalApplications > 0 ? 'Redeem in app' : 'Earn with first application'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-100 to-orange-200 dark:from-amber-900/30 dark:to-orange-800/30 flex items-center justify-center">
                <Gift className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Coverage Calculator */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg mb-10 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Coverage Calculator</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedDuration("monthly")}
                className={`px-4 py-2 rounded-lg font-medium ${selectedDuration === "monthly" ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setSelectedDuration("annual")}
                className={`px-4 py-2 rounded-lg font-medium ${selectedDuration === "annual" ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
              >
                Annual (Save 15%)
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-900 dark:text-white">Select Coverage Amount</h3>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${coverageAmount.toLocaleString()}
              </div>
            </div>
            
            <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-4">
              <div 
                className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                style={{ width: `${(coverageAmount / 2500000) * 100}%` }}
              ></div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="50000"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(Number(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {coverageCalculator.map((level) => (
                <button
                  key={level.label}
                  onClick={() => setCoverageAmount(level.value)}
                  className={`p-3 rounded-xl text-center transition-all ${coverageAmount === level.value ? 'ring-2 ring-blue-500 scale-105' : ''}`}
                >
                  <div className={`h-1 w-full ${level.color} rounded-full mb-2`}></div>
                  <div className="font-medium text-slate-900 dark:text-white">{level.label}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    ${level.value.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insurancePlans.slice(0, 3).map((plan) => (
              <div key={plan.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{plan.provider}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    ${calculateMonthlyPremium(plan.monthly, coverageAmount)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">per month</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Plans Grid */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
              Available Plans
              <span className="ml-3 text-sm font-normal text-slate-600 dark:text-slate-400">
                {filteredPlans.length} plans available
              </span>
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                {["all", "popular", "budget", "premium"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Comparison Bar */}
          {comparePlans.length > 0 && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-slate-900 dark:text-white">
                    Comparing {comparePlans.length} plans
                  </span>
                </div>
                <button
                  onClick={() => setComparePlans([])}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className={`${plan.bgColor} rounded-2xl p-6 border-2 transition-all relative overflow-hidden group ${isComparing ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'}`}
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ACTIVE BETA
                    </div>
                  </div>
                  
                  {plan.badge && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}
                  
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl ${plan.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{plan.tagline}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium">{plan.rating}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            ({plan.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {plan.countries} countries
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleCompare(plan.id)}
                      className={`p-2 rounded-lg ${isComparing ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                          ${selectedDuration === "monthly" ? plan.monthly : plan.annual}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedDuration === "monthly" ? 'per month' : 'per year'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {plan.savings}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Claim time: {plan.claimTime}
                        </div>
                      </div>
                    </div>
                    
                    {/* Toggle Details */}
                    <button
                      onClick={() => setShowDetails(showDetails === plan.id ? null : plan.id)}
                      className="w-full flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl mb-4"
                    >
                      <span className="font-medium text-slate-900 dark:text-white">
                        Coverage Details
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isDetailed ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isDetailed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white mb-2">Coverage Includes:</h4>
                              <div className="flex flex-wrap gap-2">
                                {plan.coverage.map((item, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-sm">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Deductible</p>
                                <p className="font-medium text-slate-900 dark:text-white">{plan.deductible}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Waiting Period</p>
                                <p className="font-medium text-slate-900 dark:text-white">{plan.waitingPeriod}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {plan.features.slice(0, isDetailed ? plan.features.length : 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleGetCoverage(plan.id)}
                      disabled={loading === plan.id}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg"
                    >
                      {loading === plan.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing Application...
                        </>
                      ) : (
                        <>
                          <Sparkle className="w-4 h-4" />
                          Apply Now - Priority Access
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowCalculatorModal(true)}
                        className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <Calculator className="w-4 h-4 inline mr-1" />
                        Calculate
                      </button>
                      <button 
                        onClick={() => setShowChatSupportModal(true)}
                        className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 inline mr-1" />
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' })}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Application Submitted! 🎉
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {showSuccessModal.message}
                  </p>
                  
                  {/* Reference Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-blue-800 dark:text-blue-300">Reference ID</div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(showSuccessModal.referenceId)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                      >
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="font-mono text-lg font-bold text-blue-900 dark:text-blue-200">
                      {showSuccessModal.referenceId}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      Plan: {showSuccessModal.planName}
                    </div>
                  </div>
                  
                  {/* Next Steps */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div className="text-left">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">What Happens Next?</h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li>• Our underwriting team will review your application</li>
                          <li>• You'll receive an email confirmation within {showSuccessModal.contactTimeline}</li>
                          <li>• A specialist will contact you for final details</li>
                          <li>• Get ready for your personalized quote</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' })}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
                    >
                      Continue Browsing Plans
                    </button>
                    <button
                      onClick={() => {
                        setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' });
                        setShowApplicationsModal(true);
                      }}
                      className="w-full py-3 border-2 border-slate-300 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowFilterModal(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Filter Plans</h3>
                <button onClick={() => setShowFilterModal(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Price Range</label>
                  <input 
                    type="range" 
                    min="15" 
                    max="200" 
                    defaultValue="100"
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$15</span>
                    <span>$100</span>
                    <span>$200</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Coverage Type</label>
                  <div className="space-y-2">
                    {['Health', 'Travel', 'Home', 'Device', 'Auto', 'Life'].map(type => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Minimum Rating</label>
                  <div className="flex items-center gap-2">
                    {[4, 4.5, 5].map(rating => (
                      <button key={rating} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowFilterModal(false);
                      alert('Filters applied!');
                    }}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowApplicationsModal(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Applications</h3>
                <button onClick={() => setShowApplicationsModal(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {userApplications.length > 0 ? (
                <div className="space-y-4">
                  {userApplications.map((app, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{app.planName}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{app.provider}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full">
                          {app.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Reference</p>
                          <p className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate">{app.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Monthly</p>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">${app.monthlyPremium}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                        </span>
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button 
                      onClick={() => {
                        alert('Downloading applications...');
                        setShowApplicationsModal(false);
                      }}
                      className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export Applications
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Applications Yet</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Start by applying for an insurance plan above.</p>
                  <button 
                    onClick={() => setShowApplicationsModal(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
                  >
                    Browse Plans
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calculator Modal */}
        {showCalculatorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCalculatorModal(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Advanced Calculator</h3>
                <button onClick={() => setShowCalculatorModal(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Age</label>
                  <input 
                    type="number" 
                    min="18" 
                    max="70" 
                    defaultValue="35"
                    className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <select className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Coverage Needs</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Basic', 'Standard', 'Premium', 'Maximum'].map(level => (
                      <button key={level} className="py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Health Status</label>
                  <div className="flex gap-2">
                    {['Excellent', 'Good', 'Average'].map(status => (
                      <button key={status} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Estimated Monthly Premium</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$127</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Annual Savings</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Save $156/year</span>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setShowCalculatorModal(false)}
                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      alert('Personalized quote generated!');
                      setShowCalculatorModal(false);
                    }}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowChatSupportModal(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Get Help</h3>
                <button onClick={() => setShowChatSupportModal(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneCall className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Insurance Support</h4>
                <p className="text-slate-600 dark:text-slate-400">How can we help you today?</p>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => alert('Connecting to live chat...')}
                  className="w-full py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl font-medium border border-blue-200 dark:border-blue-800"
                >
                  💬 Live Chat Support
                </button>
                <button 
                  onClick={() => alert('Calling support: 1-800-INSURANCE')}
                  className="w-full py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl font-medium border border-green-200 dark:border-green-800"
                >
                  📞 Call Support
                </button>
                <button 
                  onClick={() => alert('Scheduling callback...')}
                  className="w-full py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-xl font-medium border border-purple-200 dark:border-purple-800"
                >
                  ⏰ Schedule Callback
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
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