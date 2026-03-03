import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PiggyBank, 
  TrendingUp, 
  Lock, 
  Target,
  Percent,
  Calendar,
  Sparkles,
  Zap,
  Shield,
  Coins,
  Globe,
  Award,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import styles from "./Savings.module.css";

const savingsProducts = [
  {
    id: "easy-access",
    name: "Easy Access Saver",
    provider: "Claverica Savings",
    icon: PiggyBank,
    color: "purple",
    apy: "4.25%",
    minDeposit: "$100",
    features: ["Withdraw anytime", "No penalties", "Monthly interest", "FSCS protected"],
    popular: true,
    badge: "Most Popular"
  },
  {
    id: "fixed-term",
    name: "1-Year Fixed Saver",
    provider: "Claverica Fixed",
    icon: Lock,
    color: "navy",
    apy: "5.10%",
    minDeposit: "$1,000",
    features: ["Higher returns", "Fixed rate", "Quarterly interest", "Capital guaranteed"],
    popular: false,
    badge: "Best Rate"
  },
  {
    id: "goals",
    name: "Goal-Based Saver",
    provider: "Claverica Goals",
    icon: Target,
    color: "teal",
    apy: "4.50%",
    minDeposit: "$50",
    features: ["Set savings goals", "Auto-deposit", "Progress tracking", "Round-ups"],
    popular: true,
    badge: "Smart Saving"
  },
  {
    id: "premium",
    name: "Premium Savings",
    provider: "Claverica Elite",
    icon: Award,
    color: "gold",
    apy: "4.75%",
    minDeposit: "$10,000",
    features: ["Priority rates", "Dedicated support", "Exclusive offers", "Global access"],
    popular: false,
    badge: "Premium"
  },
  {
    id: "ethical",
    name: "Ethical Saver",
    provider: "Claverica Green",
    icon: Globe,
    color: "teal",
    apy: "4.00%",
    minDeposit: "$500",
    features: ["ESG investments", "Climate positive", "Transparent impact", "Community projects"],
    popular: false,
    badge: "Sustainable"
  },
  {
    id: "roundup",
    name: "Round-Up Saver",
    provider: "Claverica Roundups",
    icon: Coins,
    color: "purple",
    apy: "3.90%",
    minDeposit: "$0",
    features: ["Automatic saving", "Spare change", "No minimums", "Micro-investing"],
    popular: false,
    badge: "Effortless"
  }
];

function SavingsContent() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleOpenAccount = (productId: string) => {
    setSelectedProduct(productId);
    
    // Navigate to KYC for savings account opening
    navigate("/dashboard/kyc/submit", {
      state: {
        service_type: "savings",
        savings_product: productId,
        amount: 0,
        redirectTo: "/dashboard/savings"
      }
    });
  };

  // Helper function to get product color class
  const getProductColorClass = (color: string) => {
    switch(color) {
      case 'purple': return styles.productPurple;
      case 'navy': return styles.productNavy;
      case 'teal': return styles.productTeal;
      case 'gold': return styles.productGold;
      default: return styles.productPurple;
    }
  };

  // Helper function to get badge color class
  const getBadgeColorClass = (badge: string) => {
    switch(badge) {
      case 'Most Popular': return styles.badgePopular;
      case 'Best Rate': return styles.badgeBestRate;
      case 'Smart Saving': return styles.badgeSmart;
      case 'Premium': return styles.badgePremium;
      case 'Sustainable': return styles.badgeSustainable;
      case 'Effortless': return styles.badgeEffortless;
      default: return styles.badgeDefault;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.header}
        >
          <div className={styles.headerTop}>
            <div className={styles.headerIconWrapper}>
              <div className={styles.headerIcon}>
                <PiggyBank className={styles.headerIconSvg} />
              </div>
            </div>
            <div>
              <h1 className={styles.headerTitle}>Savings</h1>
              <p className={styles.headerSubtitle}>Grow your money, stress-free</p>
            </div>
          </div>
          
          <div className={styles.heroBanner}>
            <div className={styles.heroContent}>
              <div>
                <h2 className={styles.heroTitle}>Your Financial Future</h2>
                <p className={styles.heroText}>
                  Earn up to 5.10% APY with FSCS protection up to $85,000.
                </p>
              </div>
              <div className={styles.heroBadge}>
                <TrendingUp className={styles.heroBadgeIcon} />
                <span className={styles.heroBadgeText}>Beat inflation with smart savings</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Total Saved</p>
                <p className={styles.statValue}>$12,450</p>
              </div>
              <div className={`${styles.statIconWrapper} ${styles.statIconBlue}`}>
                <Coins className={styles.statIcon} />
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Annual Interest</p>
                <p className={styles.statValue}>$529</p>
              </div>
              <div className={`${styles.statIconWrapper} ${styles.statIconGreen}`}>
                <Percent className={styles.statIcon} />
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Active Accounts</p>
                <p className={styles.statValue}>3</p>
              </div>
              <div className={`${styles.statIconWrapper} ${styles.statIconPurple}`}>
                <PiggyBank className={styles.statIcon} />
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div>
                <p className={styles.statLabel}>Projected Growth</p>
                <p className={styles.statValue}>+8.2%</p>
              </div>
              <div className={`${styles.statIconWrapper} ${styles.statIconGold}`}>
                <TrendingUp className={styles.statIcon} />
              </div>
            </div>
          </div>
        </div>

        {/* Savings Products */}
        <div className={styles.productsSection}>
          <div className={styles.productsHeader}>
            <h2 className={styles.productsTitle}>Choose Your Savings Account</h2>
            <div className={styles.protectionBadge}>
              <Shield className={styles.protectionIcon} />
              <span className={styles.protectionText}>All accounts FSCS protected</span>
            </div>
          </div>
          
          <div className={styles.productsGrid}>
            {savingsProducts.map((product) => {
              const Icon = product.icon;
              const productColorClass = getProductColorClass(product.color);
              const badgeColorClass = getBadgeColorClass(product.badge);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className={`${styles.productCard} ${productColorClass}`}
                >
                  {product.badge && (
                    <div className={`${styles.productBadge} ${badgeColorClass}`}>
                      {product.badge}
                    </div>
                  )}
                  
                  <div className={styles.productHeader}>
                    <div className={`${styles.productIconWrapper} ${productColorClass}`}>
                      <Icon className={styles.productIcon} />
                    </div>
                    <div>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productProvider}>{product.provider}</p>
                    </div>
                  </div>
                  
                  <div className={styles.productContent}>
                    <div className={styles.productRate}>
                      <span className={styles.productRateValue}>{product.apy}</span>
                      <span className={styles.productRateLabel}>APY</span>
                    </div>
                    
                    <div className={styles.productFeatures}>
                      <h4 className={styles.featuresTitle}>Key Features:</h4>
                      <ul className={styles.featuresList}>
                        {product.features.map((feature, idx) => (
                          <li key={idx} className={styles.featureItem}>
                            <Sparkles className={styles.featureIcon} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.productMeta}>
                      <div className={styles.productMetaItem}>
                        <div className={`${styles.metaDot} ${styles.metaDotGreen}`}></div>
                        <span className={styles.metaText}>Min deposit: {product.minDeposit}</span>
                      </div>
                      <div className={styles.productMetaItem}>
                        <Zap className={styles.metaZapIcon} />
                        <span className={styles.metaText}>No monthly fees</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleOpenAccount(product.id)}
                    className={styles.productButton}
                  >
                    Open Account
                    <ChevronRight className={styles.productButtonIcon} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* KYC Notice */}
        <div className={styles.kycNotice}>
          <div className={styles.kycContent}>
            <AlertCircle className={styles.kycIcon} />
            <div className={styles.kycText}>
              <h3 className={styles.kycTitle}>Secure Account Opening</h3>
              <p className={styles.kycDescription}>
                To open a savings account and ensure FSCS protection, we need to verify your identity. 
                Our KYC process is quick, secure, and required by financial regulations.
              </p>
              <div className={styles.kycFeatures}>
                <div className={styles.kycFeature}>
                  <Lock className={styles.kycFeatureIcon} />
                  <div>
                    <p className={styles.kycFeatureTitle}>FSCS Protected</p>
                    <p className={styles.kycFeatureText}>Up to $85,000 per person</p>
                  </div>
                </div>
                <div className={styles.kycFeature}>
                  <Zap className={styles.kycFeatureIcon} />
                  <div>
                    <p className={styles.kycFeatureTitle}>Instant Access</p>
                    <p className={styles.kycFeatureText}>Accounts open in minutes</p>
                  </div>
                </div>
                <div className={styles.kycFeature}>
                  <Calendar className={styles.kycFeatureIcon} />
                  <div>
                    <p className={styles.kycFeatureTitle}>Daily Interest</p>
                    <p className={styles.kycFeatureText}>Compounded daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Savings() {
  return (
    <ProtectedRoute>
      <SavingsContent />
    </ProtectedRoute>
  );
}