// src/pages/Dashboard/Escrow.tsx - CORRECTED VERSION WITH CSS MODULES
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import { KycModal } from "../../components/escrow/KycModal";
import { 
  calculateUserTier,
  calculateTierProgress,
  TIERS,
  type UserMetrics
} from "../../lib/utils/userTiers";
import {
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Users,
  DollarSign,
  Plus,
  AlertTriangle,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Sparkles,
  Lock,
  Award,
  Zap,
  User,
  Sparkle,
  Crown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Trophy,
  Star,
  Gift,
  Rocket,
  Globe,
  Smartphone,
  CreditCard,
  Filter,
  Calendar,
  Target,
  PieChart,
  Download,
  Share2,
  Eye,
  MoreVertical,
  Settings,
  X,
  Loader2,
  Home,
  Building,
  ShoppingBag,
  Code,
  Calculator,
  Camera,
  PenTool
} from "lucide-react";
import styles from "./Escrow.module.css";

// ==================== ESCROW TEMPLATES ====================
const ESCROW_TEMPLATES = [
  {
    id: "freelance",
    name: "Freelance Services",
    provider: "Claverica Standard",
    tagline: "Secure payments for freelance work",
    icon: PenTool,
    color: "from-blue-500 to-cyan-600",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    features: [
      "Milestone-based payments",
      "File & deliverable sharing",
      "Time tracking integration",
      "Dispute resolution included",
      "Automatic release on approval",
      "Multiple currency support",
      "Progress tracking dashboard"
    ],
    monthly: 0,
    annual: 0,
    savings: "Free for Basic tier",
    popular: true,
    badge: "MOST POPULAR",
    coverage: ["Milestones", "Files", "Disputes", "Progress", "Multi-Currency"],
    rating: 4.8,
    reviews: 1243,
    setupTime: "2 minutes",
    tierRequired: "Basic",
    templateUsage: 1250,
    category: "Services"
  },
  {
    id: "ecommerce",
    name: "E-commerce Purchase",
    provider: "Claverica Retail",
    tagline: "Safe online shopping experience",
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-600",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    features: [
      "Buyer protection guarantee",
      "Delivery verification",
      "Return & refund handling",
      "Multi-party notifications",
      "Automated release conditions",
      "Shipping tracking integration",
      "Escrow release on delivery"
    ],
    monthly: 0,
    annual: 0,
    savings: "Free for Basic tier",
    popular: true,
    badge: "BESTSELLER",
    coverage: ["Delivery", "Returns", "Refunds", "Tracking", "Protection"],
    rating: 4.7,
    reviews: 892,
    setupTime: "3 minutes",
    tierRequired: "Basic",
    templateUsage: 890,
    category: "Goods"
  },
  {
    id: "realestate",
    name: "Real Estate Deposit",
    provider: "Claverica Pro",
    tagline: "Secure property transactions",
    icon: Building,
    color: "from-purple-500 to-violet-600",
    gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
    features: [
      "High-value transaction support",
      "Legal document storage",
      "Multi-party approvals",
      "Conditional release triggers",
      "Attorney review integration",
      "Title transfer verification",
      "90-day dispute resolution"
    ],
    monthly: 25,
    annual: 300,
    savings: "Save $50 annually",
    popular: false,
    badge: "PREMIUM",
    coverage: ["Legal", "Multi-Party", "Conditions", "Verification", "Disputes"],
    rating: 4.9,
    reviews: 342,
    setupTime: "5 minutes",
    tierRequired: "Verified",
    templateUsage: 342,
    category: "Property"
  },
  {
    id: "software",
    name: "Software Development",
    provider: "Claverica Tech",
    tagline: "Agile development escrow",
    icon: Code,
    color: "from-indigo-500 to-blue-600",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
    features: [
      "Git repository integration",
      "Code review milestones",
      "Testing phase validation",
      "Deployment verification",
      "Bug fix escrow periods",
      "Support & maintenance",
      "Intellectual property transfer"
    ],
    monthly: 15,
    annual: 180,
    savings: "Save $20 annually",
    popular: true,
    badge: "TRENDING",
    coverage: ["Code", "Testing", "Deployment", "Support", "IP"],
    rating: 4.6,
    reviews: 567,
    setupTime: "4 minutes",
    tierRequired: "Verified",
    templateUsage: 567,
    category: "Tech"
  },
  {
    id: "content",
    name: "Content Creation",
    provider: "Claverica Media",
    tagline: "Secure creative work payments",
    icon: Camera,
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    features: [
      "Content review cycles",
      "Revision round tracking",
      "Rights transfer automation",
      "Platform delivery verification",
      "Royalty payment scheduling",
      "Usage rights documentation",
      "Multi-platform distribution"
    ],
    monthly: 10,
    annual: 120,
    savings: "Save $15 annually",
    popular: false,
    badge: "NEW",
    coverage: ["Review", "Revisions", "Rights", "Delivery", "Royalties"],
    rating: 4.5,
    reviews: 432,
    setupTime: "3 minutes",
    tierRequired: "Verified",
    templateUsage: 432,
    category: "Media"
  },
  {
    id: "business",
    name: "Business Acquisition",
    provider: "Claverica Elite",
    tagline: "High-stakes business deals",
    icon: BarChart3,
    color: "from-amber-500 to-orange-600",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    features: [
      "Multi-million dollar support",
      "Due diligence tracking",
      "Legal compliance verification",
      "Staged payment releases",
      "Board approval workflows",
      "Regulatory documentation",
      "International transaction support"
    ],
    monthly: 100,
    annual: 1200,
    savings: "Save $200 annually",
    popular: false,
    badge: "ELITE",
    coverage: ["Due Diligence", "Compliance", "Staged", "Approvals", "International"],
    rating: 4.9,
    reviews: 156,
    setupTime: "10 minutes",
    tierRequired: "Pro",
    templateUsage: 156,
    category: "Business"
  }
];

// ==================== SAMPLE ESCROW ACCOUNTS ====================
const SAMPLE_ESCROW_ACCOUNTS = [
  {
    id: "ESC-001",
    title: "Web Development Project",
    amount: 5000,
    currency: "USD",
    status: "active",
    buyer: "John Smith",
    seller: "Sarah Johnson",
    createdDate: "2024-12-10",
    releaseDate: "2025-01-15",
    progress: 65,
    milestones: 3,
    completedMilestones: 2,
    category: "Services",
    tierLocked: false,
    requiresKYC: false,
    template: "freelance"
  },
  {
    id: "ESC-002",
    title: "Domain Purchase - techstartup.io",
    amount: 12500,
    currency: "USD",
    status: "pending",
    buyer: "Tech Startup Inc",
    seller: "Domain Seller LLC",
    createdDate: "2024-12-15",
    releaseDate: "2024-12-25",
    progress: 30,
    milestones: 1,
    completedMilestones: 0,
    category: "Digital Assets",
    tierLocked: true,
    requiresKYC: true,
    template: "realestate"
  },
  {
    id: "ESC-003",
    title: "Freelance Design Package",
    amount: 2800,
    currency: "USD",
    status: "completed",
    buyer: "Marketing Agency",
    seller: "Creative Designer",
    createdDate: "2024-11-20",
    releaseDate: "2024-12-10",
    progress: 100,
    milestones: 2,
    completedMilestones: 2,
    category: "Services",
    tierLocked: false,
    requiresKYC: false,
    template: "freelance"
  },
  {
    id: "ESC-004",
    title: "Mobile App Development",
    amount: 8500,
    currency: "USD",
    status: "active",
    buyer: "FinTech Corp",
    seller: "App Dev Studio",
    createdDate: "2024-12-05",
    releaseDate: "2025-02-28",
    progress: 40,
    milestones: 4,
    completedMilestones: 1,
    category: "Software",
    tierLocked: false,
    requiresKYC: true,
    template: "software"
  },
  {
    id: "ESC-005",
    title: "E-commerce Website",
    amount: 3200,
    currency: "USD",
    status: "completed",
    buyer: "Retail Store",
    seller: "Web Agency",
    createdDate: "2024-11-05",
    releaseDate: "2024-11-30",
    progress: 100,
    milestones: 3,
    completedMilestones: 3,
    category: "Services",
    tierLocked: false,
    requiresKYC: false,
    template: "ecommerce"
  }
];

// ==================== MOCK DATA FUNCTIONS ====================
const fetchEscrowData = async (token: string) => {
  console.log("Fetching escrow data - using mock");
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    escrows: SAMPLE_ESCROW_ACCOUNTS,
    metrics: {
      totalEscrows: 8,
      totalVolume: 12500,
      completedEscrows: 6,
      avgReleaseTime: 4.2,
      disputeRate: 0.5,
      templatesUsed: 2,
      lastActivityDays: 3
    }
  };
};

const createEscrow = async (escrowData: any, token: string) => {
  console.log("Creating escrow (mock):", escrowData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'Escrow created successfully',
    escrow_id: `ESC-${Date.now().toString().slice(-6)}`
  };
};

const releaseEscrowFunds = async (escrowId: string, token: string) => {
  console.log("Releasing funds for escrow (mock):", escrowId);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    success: true,
    message: 'Funds released successfully'
  };
};

// Status config
const getStatusConfig = (status: string) => {
  const configs = {
    active: {
      className: styles.statusActive,
      icon: <Clock className={styles.statusIcon} />,
      label: "Active"
    },
    pending: {
      className: styles.statusPending,
      icon: <AlertCircle className={styles.statusIcon} />,
      label: "Pending"
    },
    completed: {
      className: styles.statusCompleted,
      icon: <CheckCircle2 className={styles.statusIcon} />,
      label: "Completed"
    }
  };
  return configs[status as keyof typeof configs] || configs.pending;
};

// ==================== MAIN COMPONENT ====================
export default function Escrow() {
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuthStore();
  const [loading, setLoading] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState({
    visible: false,
    referenceId: '',
    planName: '',
    message: '',
    contactTimeline: ''
  });
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [compareTemplates, setCompareTemplates] = useState<string[]>([]);
  const [userEscrows, setUserEscrows] = useState(SAMPLE_ESCROW_ACCOUNTS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userStats, setUserStats] = useState({
    totalEscrows: 0,
    monthlyVolume: 0,
    estimatedSavings: 0
  });
  
  // Modal states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEscrowsModal, setShowEscrowsModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showChatSupportModal, setShowChatSupportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState<any>(null);

  // Load user escrows
  useEffect(() => {
    setLoading("initial");
    fetchEscrowData(token || 'mock-token')
      .then((data) => {
        setUserEscrows(data.escrows || SAMPLE_ESCROW_ACCOUNTS);
        setUserStats({
          totalEscrows: data.escrows?.length || 0,
          monthlyVolume: data.escrows?.reduce((sum, e) => sum + e.amount, 0) || 0,
          estimatedSavings: (data.escrows?.length || 0) * 45
        });
      })
      .catch(console.error)
      .finally(() => setLoading(null));
  }, []);

  // Tier system
  const isVerified = user?.is_verified || false;
  const currentTier = calculateUserTier(isVerified, userStats);
  const tierProgress = calculateTierProgress(currentTier, userStats, isVerified);

  // Filter escrows
  const filteredEscrows = useMemo(() => {
    return userEscrows.filter(escrow => {
      if (activeFilter === "active" && escrow.status !== "active") return false;
      if (activeFilter === "completed" && escrow.status !== "completed") return false;
      if (activeFilter === "pending" && escrow.status !== "pending") return false;
      if (searchQuery && !escrow.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (currentTier === "Basic" && escrow.tierLocked) return false;
      return true;
    });
  }, [activeFilter, searchQuery, currentTier, userEscrows]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return ESCROW_TEMPLATES.filter(template => {
      if (activeFilter === "premium" && !template.monthly) return false;
      if (activeFilter === "free" && template.monthly > 0) return false;
      if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (currentTier === "Basic" && template.tierRequired !== "Basic") return false;
      if (currentTier === "Verified" && template.tierRequired === "Pro") return false;
      return true;
    });
  }, [activeFilter, searchQuery, currentTier]);

  // Handle template selection
  const handleUseTemplate = async (templateId: string) => {
    const template = ESCROW_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    setLoading(templateId);
    
    try {
      const dumpsterData = {
        product: 'escrow',
        product_subtype: 'template',
        user_email: user?.email || '',
        user_phone: user?.phone || '',
        template_name: template.name,
        monthly_fee: template.monthly,
        provider: template.provider,
        tier_required: template.tierRequired,
        source: 'escrow_dashboard',
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch('/api/kyc_spec/collect/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(dumpsterData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowSuccessModal({
          visible: true,
          referenceId: result.reference_id,
          planName: template.name,
          message: result.message || "Template selected! Our team will contact you to set up your escrow.",
          contactTimeline: result.contact_timeline || "24-48 hours"
        });
        setShowTemplatesModal(false);
      } else {
        setShowSuccessModal({
          visible: true,
          referenceId: `LOCAL-${Date.now()}`,
          planName: template.name,
          message: "Template selected! Our team will contact you to set up your escrow.",
          contactTimeline: "24-48 hours"
        });
      }
      
    } catch (error) {
      console.error('Failed to select template:', error);
      setShowSuccessModal({
        visible: true,
        referenceId: `FALLBACK-${Date.now()}`,
        planName: template.name,
        message: "Template selected! Our team will contact you to set up your escrow.",
        contactTimeline: "24-48 hours"
      });
    } finally {
      setLoading(null);
    }
  };

  // Handle create escrow
  const handleCreateEscrow = async () => {
    setLoading("create");
    
    try {
      const dumpsterData = {
        product: 'escrow',
        product_subtype: 'custom',
        user_email: user?.email || '',
        user_phone: user?.phone || '',
        action: 'create_escrow',
        amount: 0,
        tier: currentTier,
        source: 'escrow_dashboard',
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch('/api/kyc_spec/collect/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(dumpsterData)
      });
      
      const result = await response.json();
      
      setShowSuccessModal({
        visible: true,
        referenceId: result.reference_id || `ESC-${Date.now().toString().slice(-6)}`,
        planName: "Custom Escrow",
        message: "Our team will contact you to discuss your custom escrow requirements.",
        contactTimeline: "24-48 hours"
      });
      setShowCreateModal(false);
      
    } catch (error) {
      console.error('Failed to create escrow:', error);
      setShowSuccessModal({
        visible: true,
        referenceId: `ESC-${Date.now().toString().slice(-6)}`,
        planName: "Custom Escrow",
        message: "Our team will contact you to discuss your custom escrow requirements.",
        contactTimeline: "24-48 hours"
      });
    } finally {
      setLoading(null);
    }
  };

  // Handle release funds
  const handleReleaseFunds = async (escrowId: string) => {
    setLoading(`release-${escrowId}`);
    
    try {
      const result = await releaseEscrowFunds(escrowId, token || '');
      if (result.success) {
        setUserEscrows(prev => prev.map(e => 
          e.id === escrowId ? { ...e, status: 'completed', progress: 100 } : e
        ));
        
        setShowSuccessModal({
          visible: true,
          referenceId: `REL-${Date.now().toString().slice(-6)}`,
          planName: "Funds Release",
          message: "Funds release request submitted successfully.",
          contactTimeline: "24-72 hours"
        });
      }
    } catch (error) {
      console.error('Failed to release funds:', error);
    } finally {
      setLoading(null);
    }
  };

  if (loading === "initial") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading escrow dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        {/* Header */}
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
                <h1 className={styles.headerTitle}>Escrow</h1>
                <p className={styles.headerSubtitle}>Secure transactions with confidence</p>
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
              {userEscrows.length > 0 && (
                <button 
                  onClick={() => setShowEscrowsModal(true)}
                  className={styles.viewEscrowsButton}
                >
                  View Escrows ({userEscrows.length})
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
                  <span>NEW</span>
                </div>
                <div className={styles.tierBadgeWrapper}>
                  <Crown className={styles.tierIcon} />
                  <span className={styles.tierText}>Tier-Based Benefits</span>
                </div>
                <h2 className={styles.heroTitle}>
                  Transaction Security, Simplified
                </h2>
                <p className={styles.heroDescription}>
                  Secure transactions starting from $0/month with instant setup, 
                  24/7 support, and tier-based benefits. <span className={styles.highlight}>Save up to 40%</span> compared to traditional escrow services.
                </p>
              </div>
              <div className={styles.heroFeatures}>
                <div className={styles.heroFeature}>
                  <div className={styles.featureCircle}>
                    <Zap className={styles.featureIcon} />
                  </div>
                  <p className={styles.featureLabel}>Instant Setup</p>
                </div>
                <div className={styles.heroFeature}>
                  <div className={styles.featureCircle}>
                    <Shield className={styles.featureIcon} />
                  </div>
                  <p className={styles.featureLabel}>Secure Holding</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Active Escrows</p>
                <p className={styles.statValue}>
                  {userEscrows.filter(e => e.status === 'active').length}
                </p>
                <p className={styles.statSubtext}>
                  ${userStats.monthlyVolume.toLocaleString()} total
                </p>
              </div>
              <div className={styles.statIcon}>
                <Shield className={styles.statIconSvg} />
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Total Volume</p>
                <p className={styles.statValue}>
                  ${userStats.monthlyVolume.toLocaleString()}
                </p>
                <p className={styles.statSubtext}>
                  Limit: ${TIERS[currentTier].limits.monthlyVolume.toLocaleString()}/mo
                </p>
              </div>
              <div className={styles.statIcon}>
                <TrendingUp className={styles.statIconSvg} />
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Current Tier</p>
                <p className={styles.statValue}>{currentTier}</p>
                <p className={styles.statSubtext}>
                  Level {TIERS[currentTier].level}
                </p>
              </div>
              <div className={styles.statIcon}>
                <Award className={styles.statIconSvg} />
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Available Templates</p>
                <p className={styles.statValue}>{filteredTemplates.length}</p>
                <p className={styles.statSubtext}>
                  {ESCROW_TEMPLATES.length} total
                </p>
              </div>
              <div className={styles.statIcon}>
                <FileText className={styles.statIconSvg} />
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className={styles.templatesSection}>
          <div className={styles.templatesHeader}>
            <h2 className={styles.sectionTitle}>
              Escrow Templates
              <span className={styles.templatesCount}>
                {filteredTemplates.length} templates available
              </span>
            </h2>
            
            <div className={styles.templatesControls}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <div className={styles.filterTabs}>
                {["all", "free", "premium"].map((filter) => (
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
          
          <div className={styles.templatesGrid}>
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              const isDetailed = showDetails === template.id;
              const isComparing = compareTemplates.includes(template.id);
              const isLocked = template.tierRequired !== "Basic" && currentTier === "Basic";
              
              return (
                <div
                  key={template.id}
                  className={`${styles.templateCard} ${isComparing ? styles.comparing : ''}`}
                >
                  {/* Badges */}
                  <div className={styles.badgeContainer}>
                    {template.badge && (
                      <div className={styles.featuredBadge}>
                        {template.badge}
                      </div>
                    )}
                    
                    {isLocked && (
                      <div className={styles.lockedBadge}>
                        <Lock className={styles.lockedIcon} />
                        TIER LOCKED
                      </div>
                    )}
                  </div>
                  
                  {/* Template Header */}
                  <div className={styles.templateHeader}>
                    <div className={styles.templateHeaderLeft}>
                      <div className={styles.templateIcon}>
                        <Icon className={styles.templateIconSvg} />
                      </div>
                      <div>
                        <h3 className={styles.templateName}>{template.name}</h3>
                        <p className={styles.templateTagline}>{template.tagline}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setCompareTemplates(prev => 
                        prev.includes(template.id) 
                          ? prev.filter(id => id !== template.id)
                          : [...prev, template.id].slice(0, 3)
                      )}
                      className={`${styles.compareButton} ${isComparing ? styles.activeCompare : ''}`}
                    >
                      <BarChart3 className={styles.compareIcon} />
                    </button>
                  </div>
                  
                  {/* Template Meta */}
                  <div className={styles.templateMeta}>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} />
                      <span className={styles.ratingValue}>{template.rating}</span>
                      <span className={styles.reviewCount}>({template.reviews} reviews)</span>
                    </div>
                    <div className={styles.usageInfo}>
                      <Users className={styles.usageIcon} />
                      <span>{template.templateUsage.toLocaleString()} uses</span>
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className={styles.pricingSection}>
                    <div className={styles.priceContainer}>
                      <div>
                        <div className={styles.priceAmount}>
                          ${template.monthly === 0 ? '0' : template.monthly}
                        </div>
                        <div className={styles.pricePeriod}>
                          {template.monthly === 0 ? 'Free forever' : 'per month'}
                        </div>
                      </div>
                      <div className={styles.priceMeta}>
                        <div className={styles.savingsBadge}>
                          {template.savings}
                        </div>
                        <div className={styles.setupTime}>
                          Setup: {template.setupTime}
                        </div>
                      </div>
                    </div>
                    
                    {/* Toggle Details */}
                    <button
                      onClick={() => setShowDetails(showDetails === template.id ? null : template.id)}
                      className={styles.detailsToggle}
                    >
                      <span>Template Details</span>
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
                              {template.coverage.map((item, idx) => (
                                <span key={idx} className={styles.coverageTag}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className={styles.detailsGrid}>
                            <div>
                              <p className={styles.detailLabel}>Tier Required</p>
                              <p className={styles.detailValue}>{template.tierRequired}</p>
                            </div>
                            <div>
                              <p className={styles.detailLabel}>Category</p>
                              <p className={styles.detailValue}>{template.category}</p>
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
                      {template.features.slice(0, isDetailed ? template.features.length : 4).map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          <CheckCircle2 className={styles.featureIcon} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => isLocked ? setShowDetailsModal(template) : handleUseTemplate(template.id)}
                      disabled={loading === template.id}
                      className={`${styles.primaryButton} ${isLocked ? styles.lockedButton : ''}`}
                    >
                      {loading === template.id ? (
                        <>
                          <Loader2 className={styles.spinnerIcon} />
                          Processing Request...
                        </>
                      ) : isLocked ? (
                        <>
                          <Lock className={styles.buttonIcon} />
                          Unlock {template.tierRequired} Tier
                          <ChevronRight className={styles.buttonChevron} />
                        </>
                      ) : (
                        <>
                          <Sparkle className={styles.buttonIcon} />
                          Use This Template
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
                        <AlertCircle className={styles.buttonIcon} />
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Escrows Section */}
        <div className={styles.escrowsSection}>
          <div className={styles.escrowsHeader}>
            <h2 className={styles.sectionTitle}>
              Your Escrow Accounts
              <span className={styles.escrowsCount}>
                {filteredEscrows.length} active accounts
              </span>
            </h2>
            <button 
              onClick={() => setShowCreateModal(true)}
              className={styles.createButton}
            >
              <Plus className={styles.buttonIcon} />
              Create Custom Escrow
            </button>
          </div>
          
          {filteredEscrows.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FileText className={styles.emptyIconSvg} />
              </div>
              <h3 className={styles.emptyTitle}>No Escrow Accounts Found</h3>
              <p className={styles.emptyMessage}>
                {searchQuery 
                  ? "No escrows match your search criteria"
                  : "Start by selecting a template above or create a custom escrow"}
              </p>
              <div className={styles.emptyActions}>
                <button 
                  onClick={() => setShowTemplatesModal(true)}
                  className={styles.primaryButton}
                >
                  Browse Templates
                </button>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className={styles.secondaryButton}
                >
                  Create Custom
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.escrowsList}>
              {filteredEscrows.map((escrow) => {
                const statusConfig = getStatusConfig(escrow.status);
                
                return (
                  <div key={escrow.id} className={styles.escrowCard}>
                    <div className={styles.escrowContent}>
                      <div className={styles.escrowMain}>
                        <div className={styles.escrowHeader}>
                          <div>
                            <h3 className={styles.escrowTitle}>{escrow.title}</h3>
                            <p className={styles.escrowId}>{escrow.id}</p>
                          </div>
                          <div className={styles.escrowBadges}>
                            <span className={`${styles.statusBadge} ${statusConfig.className}`}>
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                            {escrow.tierLocked && currentTier === "Basic" && (
                              <span className={styles.tierLockedBadge}>
                                <Lock className={styles.tierLockedIcon} />
                                Tier Locked
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className={styles.escrowDetails}>
                          <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>Amount</p>
                            <p className={styles.detailValue}>${escrow.amount.toLocaleString()}</p>
                          </div>
                          <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>Category</p>
                            <p className={styles.detailValue}>{escrow.category}</p>
                          </div>
                          <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>Progress</p>
                            <p className={styles.detailValue}>{escrow.progress}%</p>
                          </div>
                          <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>Release Date</p>
                            <p className={styles.detailValue}>
                              {new Date(escrow.releaseDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className={styles.escrowParties}>
                          <div className={styles.partyInfo}>
                            <Users className={styles.partyIcon} />
                            <span className={styles.partyLabel}>Buyer:</span>
                            <span className={styles.partyName}>{escrow.buyer}</span>
                          </div>
                          <div className={styles.partyInfo}>
                            <Users className={styles.partyIcon} />
                            <span className={styles.partyLabel}>Seller:</span>
                            <span className={styles.partyName}>{escrow.seller}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.escrowActions}>
                        <button
                          onClick={() => setShowDetailsModal(escrow)}
                          className={styles.viewButton}
                        >
                          <Eye className={styles.buttonIcon} />
                          View Details
                        </button>
                        {escrow.status === "active" && (
                          <button
                            onClick={() => handleReleaseFunds(escrow.id)}
                            disabled={loading === `release-${escrow.id}` || (escrow.tierLocked && currentTier === "Basic")}
                            className={`${styles.releaseButton} ${escrow.tierLocked && currentTier === "Basic" ? styles.lockedReleaseButton : ''}`}
                          >
                            {loading === `release-${escrow.id}` ? (
                              <Loader2 className={styles.spinnerIcon} />
                            ) : escrow.tierLocked && currentTier === "Basic" ? (
                              <>
                                <Lock className={styles.buttonIcon} />
                                Upgrade to Release
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className={styles.buttonIcon} />
                                Release Funds
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== MODALS ===== */}

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal.visible && (
            <div className={styles.modalOverlay} onClick={() => setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' })}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.successModal}>
                  <div className={styles.successIconContainer}>
                    <CheckCircle2 className={styles.successIcon} />
                  </div>
                  
                  <h3 className={styles.modalTitle}>Request Submitted! 🎉</h3>
                  
                  <p className={styles.modalMessage}>
                    {showSuccessModal.message}
                  </p>
                  
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
                      {showSuccessModal.planName}
                    </div>
                  </div>
                  
                  <div className={styles.nextStepsCard}>
                    <div className={styles.nextStepsContent}>
                      <Clock className={styles.nextStepsIcon} />
                      <div>
                        <h4 className={styles.nextStepsTitle}>Next Steps</h4>
                        <ul className={styles.nextStepsList}>
                          <li>• Our team will contact you within {showSuccessModal.contactTimeline}</li>
                          <li>• Have your transaction details ready</li>
                          <li>• Check your email for confirmation</li>
                          <li>• Prepare any required documents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.modalActions}>
                    <button
                      onClick={() => setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' })}
                      className={styles.modalPrimaryButton}
                    >
                      Continue Browsing
                    </button>
                    <button
                      onClick={() => {
                        setShowSuccessModal({ visible: false, referenceId: '', planName: '', message: '', contactTimeline: '' });
                        setShowEscrowsModal(true);
                      }}
                      className={styles.modalSecondaryButton}
                    >
                      View Your Escrows
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Filter Modal */}
        <AnimatePresence>
          {showFilterModal && (
            <div className={styles.modalOverlay} onClick={() => setShowFilterModal(false)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>Filter Options</h3>
                  <button onClick={() => setShowFilterModal(false)} className={styles.closeButton}>
                    <X className={styles.closeIcon} />
                  </button>
                </div>
                
                <div className={styles.filterContent}>
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Amount Range</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="50000" 
                      defaultValue="25000"
                      className={styles.filterRange}
                    />
                    <div className={styles.rangeLabels}>
                      <span>$0</span>
                      <span>$25K</span>
                      <span>$50K</span>
                    </div>
                  </div>
                  
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Category</label>
                    <div className={styles.checkboxGroup}>
                      {['Services', 'Goods', 'Property', 'Tech', 'Media', 'Business'].map(type => (
                        <label key={type} className={styles.checkboxLabel}>
                          <input type="checkbox" className={styles.checkbox} />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Tier Access</label>
                    <div className={styles.tierButtons}>
                      {['Basic', 'Verified', 'Pro'].map(tier => (
                        <button key={tier} className={styles.tierButton}>
                          {tier}
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
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Escrows Modal */}
        <AnimatePresence>
          {showEscrowsModal && (
            <div className={styles.modalOverlay} onClick={() => setShowEscrowsModal(false)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>Your Escrow Accounts</h3>
                  <button onClick={() => setShowEscrowsModal(false)} className={styles.closeButton}>
                    <X className={styles.closeIcon} />
                  </button>
                </div>
                
                <div className={styles.escrowsList}>
                  {userEscrows.map((escrow, index) => {
                    const statusConfig = getStatusConfig(escrow.status);
                    return (
                      <div key={index} className={styles.modalEscrowItem}>
                        <div className={styles.modalEscrowHeader}>
                          <div>
                            <h4 className={styles.modalEscrowTitle}>{escrow.title}</h4>
                            <p className={styles.modalEscrowId}>{escrow.id}</p>
                          </div>
                          <span className={`${styles.modalStatusBadge} ${statusConfig.className}`}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className={styles.modalEscrowDetails}>
                          <div>
                            <p className={styles.modalDetailLabel}>Amount</p>
                            <p className={styles.modalDetailValue}>${escrow.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className={styles.modalDetailLabel}>Progress</p>
                            <p className={styles.modalDetailValue}>{escrow.progress}%</p>
                          </div>
                        </div>
                        <div className={styles.modalEscrowFooter}>
                          <span className={styles.modalEscrowDate}>
                            Created: {new Date(escrow.createdDate).toLocaleDateString()}
                          </span>
                          <button 
                            onClick={() => {
                              setShowEscrowsModal(false);
                              setShowDetailsModal(escrow);
                            }}
                            className={styles.modalViewButton}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Create Escrow Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>Create Custom Escrow</h3>
                  <button onClick={() => setShowCreateModal(false)} className={styles.closeButton}>
                    <X className={styles.closeIcon} />
                  </button>
                </div>
                
                <div className={styles.createForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Escrow Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Custom Project Agreement"
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Estimated Amount</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select className={styles.formSelect}>
                      <option>Services</option>
                      <option>Goods</option>
                      <option>Digital Assets</option>
                      <option>Property</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea 
                      rows={3}
                      placeholder="Brief description of the transaction..."
                      className={styles.formTextarea}
                    />
                  </div>
                  
                  <div className={styles.tierInfo}>
                    <div className={styles.tierInfoRow}>
                      <span className={styles.tierInfoLabel}>Your Tier</span>
                      <span className={`${styles.tierInfoValue} ${TIERS[currentTier].color}`}>{currentTier}</span>
                    </div>
                    <div className={styles.tierInfoRow}>
                      <span className={styles.tierInfoLabel}>Max Single Escrow</span>
                      <span className={styles.tierInfoLimit}>${TIERS[currentTier].limits.singleEscrow.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className={styles.modalFooter}>
                    <button 
                      onClick={() => setShowCreateModal(false)}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateEscrow}
                      disabled={loading === "create"}
                      className={styles.submitButton}
                    >
                      {loading === "create" ? (
                        <Loader2 className={styles.spinnerIcon} />
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Chat Support Modal */}
        <AnimatePresence>
          {showChatSupportModal && (
            <div className={styles.modalOverlay} onClick={() => setShowChatSupportModal(false)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>Escrow Support</h3>
                  <button onClick={() => setShowChatSupportModal(false)} className={styles.closeButton}>
                    <X className={styles.closeIcon} />
                  </button>
                </div>
                
                <div className={styles.chatContent}>
                  <div className={styles.chatIconContainer}>
                    <AlertCircle className={styles.chatIcon} />
                  </div>
                  <h4 className={styles.chatTitle}>Need Help?</h4>
                  <p className={styles.chatMessage}>How can we assist you today?</p>
                </div>
                
                <div className={styles.chatOptions}>
                  <button 
                    onClick={() => alert('Connecting to live chat...')}
                    className={styles.chatOptionButton}
                  >
                    💬 Live Chat Support
                  </button>
                  <button 
                    onClick={() => alert('Calling support: 1-800-ESCROW')}
                    className={styles.chatOptionButton}
                  >
                    📞 Call Support
                  </button>
                  <button 
                    onClick={() => alert('Email support: escrow@claverica.com')}
                    className={styles.chatOptionButton}
                  >
                    📧 Email Support
                  </button>
                </div>
                
                <div className={styles.chatFooter}>
                  <p className={styles.chatFooterText}>
                    Available 24/7 • Average response time: 5 minutes
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetailsModal && (
            <div className={styles.modalOverlay} onClick={() => setShowDetailsModal(null)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>
                    {typeof showDetailsModal === 'string' ? 'Template Details' : 'Escrow Details'}
                  </h3>
                  <button onClick={() => setShowDetailsModal(null)} className={styles.closeButton}>
                    <X className={styles.closeIcon} />
                  </button>
                </div>
                
                {'title' in showDetailsModal ? (
                  // Escrow Details
                  <div className={styles.detailsContent}>
                    <div>
                      <h4 className={styles.detailsTitle}>{showDetailsModal.title}</h4>
                      <p className={styles.detailsId}>{showDetailsModal.id}</p>
                    </div>
                    
                    <div className={styles.detailsGrid}>
                      <div>
                        <p className={styles.detailsLabel}>Amount</p>
                        <p className={styles.detailsValue}>${showDetailsModal.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className={styles.detailsLabel}>Status</p>
                        <div className={styles.detailsStatus}>
                          {getStatusConfig(showDetailsModal.status).icon}
                          <span>{showDetailsModal.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className={styles.detailsLabel}>Parties</p>
                      <div className={styles.detailsParties}>
                        <div>
                          <p className={styles.detailsPartyLabel}>Buyer</p>
                          <p className={styles.detailsPartyName}>{showDetailsModal.buyer}</p>
                        </div>
                        <div>
                          <p className={styles.detailsPartyLabel}>Seller</p>
                          <p className={styles.detailsPartyName}>{showDetailsModal.seller}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className={styles.detailsLabel}>Progress</p>
                      <div className={styles.detailsProgress}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ width: `${showDetailsModal.progress}%` }}
                          />
                        </div>
                        <p className={styles.progressText}>
                          {showDetailsModal.completedMilestones} of {showDetailsModal.milestones} milestones completed
                        </p>
                      </div>
                    </div>
                    
                    <div className={styles.detailsFooter}>
                      <button
                        onClick={() => {
                          setShowDetailsModal(null);
                          alert('Downloading details...');
                        }}
                        className={styles.exportButton}
                      >
                        <Download className={styles.buttonIcon} />
                        Export Details
                      </button>
                    </div>
                  </div>
                ) : (
                  // Template Details (Locked)
                  <div className={styles.lockedTemplate}>
                    <div className={styles.lockedIconContainer}>
                      <Lock className={styles.lockedIconLarge} />
                    </div>
                    <h4 className={styles.lockedTitle}>Template Locked</h4>
                    <p className={styles.lockedMessage}>
                      This template requires <span className={styles.lockedHighlight}>{showDetailsModal.tierRequired} Tier</span>
                    </p>
                    <button
                      onClick={() => {
                        setShowDetailsModal(null);
                        alert('Redirecting to tier upgrade...');
                      }}
                      className={styles.upgradeButton}
                    >
                      <Rocket className={styles.buttonIcon} />
                      Upgrade to {showDetailsModal.tierRequired}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}