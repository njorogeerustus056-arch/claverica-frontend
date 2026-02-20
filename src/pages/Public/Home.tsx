// src/pages/Home.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Shield, Star, ArrowRight, CreditCard, Wallet, Send, 
  Receipt, Gift, PiggyBank, CheckCircle, TrendingUp, 
  Users, Globe, Zap, Lock, Smartphone, Calculator,
  TrendingDown, DollarSign, Clock, RefreshCw, Sparkles,
  Building, Plane, Coffee, ShoppingBag, Car, Hotel,
  Heart, MessageCircle, Phone, Mail, ShieldCheck, Award,
  Eye, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  ArrowUpRight, ArrowDownLeft, Circle
} from "lucide-react";

// Import CSS module
import styles from './Home.module.css';

// Mock Link component with proper typing
interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ to, children, className }: LinkProps) => (
  <a href={to} className={className}>{children}</a>
);

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transferAmount, setTransferAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GBP");
  const [userCount, setUserCount] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeLiveFeed, setActiveLiveFeed] = useState(0);
  const [savingsAmount, setSavingsAmount] = useState(5000);
  const [selectedUseCase, setSelectedUseCase] = useState("freelancer");
  const [liveFeedType, setLiveFeedType] = useState("all");
  const [feedVisible, setFeedVisible] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const testimonials = [
    { 
      name: "Carlos M.", 
      country: "Mexico", 
      role: "Business Owner",
      text: "ClaveRica saved me thousands sending money home every month. Instant transfers and zero hidden fees!",
      rating: 5,
      image: "/images/testimonials/john.jpg"
    },
    { 
      name: "Aisha Al-Sayed", 
      country: "UAE", 
      role: "Entrepreneur",
      text: "Finally a banking app that actually works in Dubai. I hold USD, AED and Bitcoin — all in one place.",
      rating: 5,
      image: "/images/testimonials/sophia.jpg"
    },
    { 
      name: "Liam Chen", 
      country: "Singapore", 
      role: "Tech Founder",
      text: "12% savings interest + instant crypto trading? No other app even comes close.",
      rating: 5,
      image: "/images/testimonials/david.jpg"
    },
    { 
      name: "Sofia Rodriguez", 
      country: "Spain", 
      role: "Freelancer",
      text: "I run my freelance business from Spain and get paid instantly from US/EU clients. The loans saved me during slow months.",
      rating: 5,
      image: "/images/testimonials/jessica.jpg"
    },
    { 
      name: "David Kim", 
      country: "South Korea", 
      role: "Investor",
      text: "The crypto trading platform is seamless. I've diversified my portfolio with ease.",
      rating: 5,
      image: "/images/testimonials/davidkim.jpg"
    },
    { 
      name: "Emily Wilson", 
      country: "USA", 
      role: "Digital Nomad",
      text: "Traveling across 12 countries with ClaveRica has been effortless. No foreign transaction fees!",
      rating: 5,
      image: "/images/testimonials/emily.jpg"
    },
    { 
      name: "Michael Brown", 
      country: "UK", 
      role: "Startup Founder",
      text: "Managing international payments for my remote team has never been easier.",
      rating: 5,
      image: "/images/testimonials/michael.jpg"
    },
    { 
      name: "Daniel Smith", 
      country: "Canada", 
      role: "Freelancer",
      text: "Getting paid by international clients used to be a headache. ClaveRica solved it all.",
      rating: 5,
      image: "/images/testimonials/daniel.jpg"
    },
  ];

  // Simple video initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video ready, attempting to play');
      setVideoLoaded(true);
      
      setTimeout(() => {
        video.play()
          .then(() => {
            console.log('Video playing successfully');
            setVideoError(false);
          })
          .catch((err) => {
            console.log('Autoplay prevented:', err);
            setVideoError(false);
          });
      }, 100);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Live user counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userCount < 5000000) {
        setUserCount(prev => Math.min(prev + 25000, 5000000));
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [userCount]);

  // Testimonial slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Live feed updates
  useEffect(() => {
    const feedTimer = setInterval(() => {
      setActiveLiveFeed((prev) => (prev + 1) % liveFeedEvents.length);
    }, 5000);
    return () => clearInterval(feedTimer);
  }, []);

  // UPDATED: Live feed events with POSITIVE transactions (increasing, not decreasing)
  const liveFeedEvents = [
    { 
      icon: "💰", 
      text: "Maria earned $45.20 in interest", 
      time: "Just now",
      type: "interest",
      amount: 45.20,
      currency: "USD",
      user: "Maria S.",
      status: "completed"
    },
    { 
      icon: "📈", 
      text: "John's investment grew by $127", 
      time: "2 min ago",
      type: "investment",
      amount: 127,
      currency: "USD",
      account: "Growth Portfolio",
      status: "credited"
    },
    { 
      icon: "₿", 
      text: "Sarah's Bitcoin gained $230", 
      time: "5 min ago",
      type: "crypto",
      amount: 230,
      currency: "BTC",
      asset: "Bitcoin",
      status: "executed"
    },
    { 
      icon: "🏦", 
      text: "Alex received $2,450 salary", 
      time: "10 min ago",
      type: "deposit",
      amount: 2450,
      currency: "USD",
      merchant: "Employer Direct",
      status: "completed"
    },
    { 
      icon: "🎁", 
      text: "Emma got $50 cashback reward", 
      time: "15 min ago",
      type: "reward",
      amount: 50,
      currency: "USD",
      biller: "Premium Rewards",
      status: "credited"
    },
    { 
      icon: "💎", 
      text: "Michael earned 500 bonus points", 
      time: "18 min ago",
      type: "reward",
      amount: 500,
      currency: "points",
      status: "completed"
    },
  ];

  // Use case savings calculations
  const useCaseSavings = {
    freelancer: { monthly: 1200, description: "Get paid instantly from international clients" },
    student: { monthly: 300, description: "Save on tuition and living expenses abroad" },
    family: { monthly: 450, description: "Send money home with minimal fees" },
    business: { monthly: 2500, description: "Pay international suppliers efficiently" },
    traveler: { monthly: 200, description: "No foreign transaction fees worldwide" }
  };

  // FIXED: Partner logos using local files with correct filenames
  const getPartnerLogo = (name: string) => {
    const logoMap: Record<string, string> = {
      "Coca-Cola": "/logos/partners/cocacola.png",     // Fixed: removed hyphen to match filename
      "Wall Street": "/logos/partners/wallstreet.png",
      "Alibaba": "/logos/partners/alibaba.png",
      "MTN": "/logos/partners/mtn.png",
      "Emirates": "/logos/partners/emirates.png",
      "Vodafone": "/logos/partners/vodafone.png",
      "Samsung": "/logos/partners/samsung.png",
      "Mastercard": "/logos/partners/mastercard.png",
      "Visa": "/logos/partners/visa.png",
      "PayPal": "/logos/partners/paypal.png",
      "Safaricom": "/logos/partners/safaricom.png",
      "Standard Bank": "/logos/partners/standardbank.png"
    };
    return logoMap[name] || "";
  };

  const partners = [
    { name: "Coca-Cola", region: "Global" },
    { name: "Wall Street", region: "Americas" },
    { name: "Alibaba", region: "Asia" },
    { name: "MTN", region: "Africa" },
    { name: "Emirates", region: "Middle East" },
    { name: "Vodafone", region: "Europe" },
    { name: "Samsung", region: "Asia" },
    { name: "Mastercard", region: "Global" },
    { name: "Visa", region: "Global" },
    { name: "PayPal", region: "Global" },
    { name: "Safaricom", region: "Africa" },
    { name: "Standard Bank", region: "Africa" }
  ];

  // Savings calculation
  const yearlySavings = useCaseSavings[selectedUseCase as keyof typeof useCaseSavings]?.monthly * 12 || 0;

  return (
    <div className={styles.container}>

      {/* HERO SECTION WITH VIDEO BACKGROUND */}
      <section className={styles.heroSection}>
        {/* VIDEO BACKGROUND */}
        <div className={styles.videoContainer}>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className={styles.videoBackground}
          >
            <source src="/videos/Home1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Simple fallback if video fails */}
          {videoError && !videoLoaded && (
            <div className={styles.videoFallback} />
          )}
        </div>
        
        {/* Hero Content */}
        <div className={styles.heroContent}>
          {/* Trust Badge with Live Counter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.trustBadge}
          >
            <Star className={styles.starIcon} fill="currentColor" />
            <span>Trusted by </span>
            <span className={styles.userCount}>
              {userCount.toLocaleString()}+ users worldwide
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: -60 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2 }}
            className={styles.heroTitle}
          >
            <span className={styles.heroTitleLine1}>Banking for the</span>
            <span className={styles.titleGradient}>
              Digital Age
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.7, duration: 1 }} 
            className={styles.heroSubtitle}
          >
            Send money globally • Trade crypto • Earn 12% on savings • Get instant loans
          </motion.p>
          
          {/* Interactive CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.3, duration: 0.9 }} 
            className={styles.ctaButtons}
          >
            <Link 
              to="/signup" 
              className={styles.btnPrimary}
            >
              Open Free Account
              <ArrowRight className={styles.arrowIcon} />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className={styles.trustIndicators}
          >
            <div className={styles.trustItem}>
              <ShieldCheck className={styles.trustIcon} />
              <span>Bank-level security</span>
            </div>
            <div className={styles.trustItem}>
              <Building className={styles.trustIcon} />
              <span>FDIC Insured</span>
            </div>
            <div className={styles.trustItem}>
              <Award className={styles.trustIcon} />
              <span>PCI DSS compliant</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODERN LIVE ACTIVITY FEED - UPDATED WITH POSITIVE TRANSACTIONS */}
      <section className={styles.liveFeedSection}>
        <div className={styles.liveFeedContainer}>
          <div className={styles.feedHeader}>
            {/* Feed Header */}
            <div className={styles.feedHeaderLeft}>
              <div className={styles.liveIndicator}>
                <div className={styles.livePing} />
                <div className={styles.liveDot} />
              </div>
              <div className={styles.feedTitle}>
                <div className={styles.feedIcon}>
                  <svg className={styles.zapIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.feedTitleText}>Live Activity</p>
                  <p className={styles.feedSubtitle}>Real-time updates from ClaveRica users</p>
                </div>
              </div>
              
              {/* Activity Stats */}
              <div className={styles.activityStats}>
                <div className={styles.statItem}>
                  <div className={styles.statDot} />
                  <span className={styles.statText}>24k active now</span>
                </div>
                <div className={styles.statItem}>
                  <TrendingUpIcon className={styles.statIcon} />
                  <span className={styles.statText}>+12% today</span>
                </div>
              </div>
            </div>

            {/* Feed Controls */}
            <div className={styles.feedControls}>
              <div className={styles.filterButtons}>
                {["all", "transactions", "investments", "rewards"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setLiveFeedType(type)}
                    className={`${styles.filterButton} ${
                      liveFeedType === type ? styles.filterButtonActive : ''
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setFeedVisible(!feedVisible)}
                className={styles.toggleButton}
              >
                {feedVisible ? (
                  <svg className={styles.toggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className={styles.toggleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Animated Feed Items */}
          {feedVisible && (
            <div className={styles.feedContent}>
              {/* Progress Bar */}
              <div className={styles.progressBar}>
                <div className={styles.progressFill} />
              </div>

              <div className={styles.feedItems}>
                <motion.div
                  key={activeLiveFeed}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.transactionCard}
                >
                  <div className={styles.transactionContent}>
                    {/* Transaction Icon with Status */}
                    <div className={styles.transactionIconContainer}>
                      <div className={`${styles.transactionIcon} ${
                        liveFeedEvents[activeLiveFeed].type === "interest" ? styles.interestIcon :
                        liveFeedEvents[activeLiveFeed].type === "investment" ? styles.investmentIcon :
                        liveFeedEvents[activeLiveFeed].type === "crypto" ? styles.cryptoIcon :
                        liveFeedEvents[activeLiveFeed].type === "deposit" ? styles.depositIcon :
                        styles.rewardIcon
                      }`}>
                        {liveFeedEvents[activeLiveFeed].icon}
                      </div>
                      
                      {/* Status Indicator */}
                      <div className={`${styles.statusIndicator} ${
                        liveFeedEvents[activeLiveFeed].status === "completed" ? styles.statusCompleted :
                        styles.statusDefault
                      }`} />
                    </div>

                    {/* Transaction Details */}
                    <div className={styles.transactionDetails}>
                      <div className={styles.transactionHeader}>
                        <p className={styles.transactionText}>
                          {liveFeedEvents[activeLiveFeed].text}
                        </p>
                        <span className={`${styles.typeBadge} ${
                          liveFeedEvents[activeLiveFeed].type === "interest" ? styles.interestBadge :
                          liveFeedEvents[activeLiveFeed].type === "investment" ? styles.investmentBadge :
                          liveFeedEvents[activeLiveFeed].type === "crypto" ? styles.cryptoBadge :
                          liveFeedEvents[activeLiveFeed].type === "deposit" ? styles.depositBadge :
                          styles.rewardBadge
                        }`}>
                          {liveFeedEvents[activeLiveFeed].type}
                        </span>
                      </div>
                      
                      {/* Additional Info */}
                      <div className={styles.transactionMeta}>
                        <div className={styles.timeInfo}>
                          <svg className={styles.timeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {liveFeedEvents[activeLiveFeed].time}
                        </div>
                        
                        {"amount" in liveFeedEvents[activeLiveFeed] && (
                          <div className={styles.amountInfo}>
                            <span className={`${styles.amount} ${styles.amountPositive}`}>
                              +{liveFeedEvents[activeLiveFeed].currency === "points" ? "" : "$"}
                              {liveFeedEvents[activeLiveFeed].amount?.toLocaleString()}
                              {liveFeedEvents[activeLiveFeed].currency === "points" ? " pts" : ""}
                            </span>
                            {liveFeedEvents[activeLiveFeed].currency !== "points" && (
                              <span className={styles.currency}>
                                {liveFeedEvents[activeLiveFeed].currency}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className={styles.actionButton}>
                    <ArrowRight className={styles.actionIcon} />
                  </button>
                </motion.div>

                {/* Live Feed Dots */}
                <div className={styles.feedDots}>
                  {liveFeedEvents.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveLiveFeed(idx)}
                      className={`${styles.feedDot} ${
                        idx === activeLiveFeed ? styles.feedDotActive : ''
                      }`}
                      aria-label={`View transaction ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Quick Stats */}
                <div className={styles.quickStats}>
                  <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>Transactions/sec</span>
                      <div className={styles.pulseDot} />
                    </div>
                    <p className={styles.statValue}>42</p>
                  </div>
                  
                  <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>Total Today</span>
                      <TrendingUpIcon className={styles.trendUpIcon} />
                    </div>
                    <p className={styles.statValue}>$2.8M</p>
                  </div>
                  
                  <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>Avg. Return</span>
                      <TrendingUpIcon className={styles.trendUpIcon} />
                    </div>
                    <p className={styles.statValue}>+12.4%</p>
                  </div>
                  
                  <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>Success Rate</span>
                      <div className={styles.successDot} />
                    </div>
                    <p className={styles.statValue}>99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STATS BAR WITH ANIMATIONS */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {[
              { value: "5M+", label: "Active Users", icon: <Users className={styles.statIconLarge} />, color: styles.statColor1 },
              { value: "180+", label: "Countries", icon: <Globe className={styles.statIconLarge} />, color: styles.statColor2 },
              { value: "$2.8B+", label: "Transferred", icon: <TrendingUp className={styles.statIconLarge} />, color: styles.statColor3 },
              { value: "4.9★", label: "Rating", icon: <Star className={styles.statIconLarge} />, color: styles.statColor4 }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.statItemLarge}
              >
                <div className={styles.statIconWrapper}>
                  <div className={`${styles.statIconGradient} ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <p className={`${styles.statValueLarge} ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <p className={styles.statLabelLarge}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONALIZED SAVINGS CALCULATOR */}
      <section className={styles.savingsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              See Your Potential Savings
            </h2>
            <p className={styles.sectionDescription}>
              Calculate how much you could save based on your needs
            </p>
          </div>

          <div className={styles.calculatorGrid}>
            <div className={styles.calculatorInput}>
              <h3 className={styles.calculatorTitle}>What describes you best?</h3>
              
              <div className={styles.useCaseGrid}>
                {Object.entries(useCaseSavings).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedUseCase(key)}
                    className={`${styles.useCaseButton} ${
                      selectedUseCase === key ? styles.useCaseButtonActive : ''
                    }`}
                  >
                    <div className={styles.useCaseEmoji}>
                      {key === 'freelancer' && '💼'}
                      {key === 'student' && '🎓'}
                      {key === 'family' && '👨‍👩‍👧‍👦'}
                      {key === 'business' && '🏢'}
                      {key === 'traveler' && '✈️'}
                    </div>
                    <div className={styles.useCaseLabel}>{key}</div>
                  </button>
                ))}
              </div>

              <div className={styles.rangeContainer}>
                <label className={styles.rangeLabel}>
                  Monthly international transfers
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="500"
                  value={savingsAmount}
                  onChange={(e) => setSavingsAmount(parseInt(e.target.value))}
                  className={styles.rangeSlider}
                />
                <div className={styles.rangeValues}>
                  <span>$0</span>
                  <span className={styles.rangeValue}>${savingsAmount}</span>
                  <span>$10,000</span>
                </div>
              </div>
            </div>

            <div className={styles.calculatorResult}>
              <div className={styles.resultHeader}>
                <h3 className={styles.resultTitle}>Your Annual Savings</h3>
                <p className={styles.resultDescription}>{useCaseSavings[selectedUseCase as keyof typeof useCaseSavings]?.description}</p>
              </div>

              <div className={styles.resultAmount}>
                <div className={styles.resultValue}>
                  ${yearlySavings.toLocaleString()}
                </div>
                <p className={styles.resultSubtitle}>Per year with ClaveRica</p>
              </div>

              <div className={styles.savingsBreakdown}>
                <div className={styles.savingsRow}>
                  <span>Traditional bank fees</span>
                  <span className={styles.feeAmount}>${(savingsAmount * 0.03 * 12 + 300).toLocaleString()}</span>
                </div>
                <div className={styles.savingsRow}>
                  <span>ClaveRica fees</span>
                  <span className={styles.feeAmountSavings}>${(savingsAmount * 0.005 * 12).toLocaleString()}</span>
                </div>
                <div className={`${styles.savingsRow} ${styles.savingsHighlight}`}>
                  <span className={styles.savingsLabel}>Total savings</span>
                  <span className={styles.savingsTotal}>${yearlySavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE APP PREVIEW */}
      <section className={styles.appPreviewSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.appPreviewGrid}>
            <div className={styles.appMockupContainer}>
              <div className={styles.appMockupWrapper}>
                {/* Mock App Interface */}
                <div className={styles.appMockup}>
                  {/* App Header */}
                  <div className={styles.appHeader}>
                    <div>
                      <p className={styles.appHeaderLabel}>Total Balance</p>
                      <div className={styles.balanceContainer}>
                        <p className={styles.balanceAmount}>$81,314.00</p>
                        <button className={styles.eyeButton}>
                          <EyeIcon />
                        </button>
                      </div>
                    </div>
                    <div className={styles.appIcon}>
                      💎
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className={styles.quickActionsGrid}>
                    {[
                      { icon: "💸", label: "Send" },
                      { icon: "📥", label: "Request" },
                      { icon: "🔄", label: "Convert" },
                      { icon: "📊", label: "Invest" }
                    ].map((action, idx) => (
                      <div key={idx} className={styles.quickActionItem}>
                        <div className={styles.actionIconContainer}>
                          {action.icon}
                        </div>
                        <span className={styles.actionLabel}>{action.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className={styles.recentActivity}>
                    <div className={styles.activityItem}>
                      <div className={styles.activityContent}>
                        <div className={styles.activityIcon}>
                          📈
                        </div>
                        <div>
                          <div className={styles.activityTitle}>Interest Earned</div>
                          <div className={styles.activityTime}>Daily compounding</div>
                        </div>
                      </div>
                      <div className={styles.activityAmountPositive}>+$45.20</div>
                    </div>
                    <div className={styles.activityItem}>
                      <div className={styles.activityContent}>
                        <div className={styles.activityIcon}>
                          💰
                        </div>
                        <div>
                          <div className={styles.activityTitle}>Salary Deposit</div>
                          <div className={styles.activityTime}>Today, 9:00 AM</div>
                        </div>
                      </div>
                      <div className={styles.activityAmountPositive}>+$3,450.00</div>
                    </div>
                  </div>
                </div>

                {/* Floating Notification */}
                <div className={styles.floatingNotification}>
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationIcon}>
                      <TrendingUp className={styles.notificationTrendIcon} />
                    </div>
                    <div>
                      <p className={styles.notificationLabel}>This Month</p>
                      <p className={styles.notificationValue}>+24.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.appInfo}>
              <div className={styles.appInfoContent}>
                <h2 className={styles.appInfoTitle}>
                  One Platform.
                  <span className={styles.appInfoTitleGradient}>
                    Total Financial Freedom.
                  </span>
                </h2>
                <p className={styles.appInfoDescription}>
                  Bank, pay, borrow, save, and trade crypto — all in one beautiful, secure app designed for the future.
                </p>
              </div>

              <div className={styles.benefitsList}>
                {[
                  "No monthly fees or hidden charges",
                  "Instant global transfers in 150+ currencies",
                  "Trade 50+ cryptocurrencies 24/7",
                  "Earn up to 12% APY on savings",
                  "Premium metal cards with lounge access",
                  "AI-powered financial insights"
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={styles.benefitItem}
                  >
                    <div className={styles.benefitIcon}>
                      <CheckCircle className={styles.benefitCheckIcon} />
                    </div>
                    <span className={styles.benefitText}>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className={styles.appCta}>
                <Link 
                  to="/signup" 
                  className={styles.btnSecondary}
                >
                  Get Started
                  <ArrowRight className={styles.ctaArrow} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED PARTNERS CAROUSEL - FIXED WITH LOCAL LOGOS */}
      <section className={styles.partnersCarouselSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Trusted by Industry Leaders
            </h2>
            <p className={styles.sectionDescription}>
              Partnering with global brands across 6 continents
            </p>
          </div>

          {/* Animated Carousel Container */}
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {/* First set of partners */}
              <div className={styles.carouselSlide}>
                {partners.map((partner, idx) => (
                  <div key={`first-${idx}`} className={styles.partnerLogoCircle}>
                    <img 
                      src={getPartnerLogo(partner.name)} 
                      alt={partner.name}
                      className={styles.partnerLogoImage}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = 
                          `<div class="${styles.fallbackLogoCircle}">${partner.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className={styles.carouselSlide}>
                {partners.map((partner, idx) => (
                  <div key={`second-${idx}`} className={styles.partnerLogoCircle}>
                    <img 
                      src={getPartnerLogo(partner.name)} 
                      alt={partner.name}
                      className={styles.partnerLogoImage}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = 
                          `<div class="${styles.fallbackLogoCircle}">${partner.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className={styles.partnershipNote}>
            <CheckCircle className={styles.checkIcon} />
            Partnership opportunities available for businesses
          </p>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className={styles.securitySection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Your Security is Our Priority
            </h2>
            <p className={styles.securityDescription}>
              Bank-level security, regulatory compliance, and 24/7 protection
            </p>
          </div>

          <div className={styles.securityGrid}>
            {[
              {
                icon: <Shield className={styles.securityIconSize} />,
                title: "256-bit Encryption",
                description: "Military-grade encryption for all data"
              },
              {
                icon: <Lock className={styles.securityIconSize} />,
                title: "FDIC Insured",
                description: "$250,000 protection per account"
              },
              {
                icon: <Zap className={styles.securityIconSize} />,
                title: "Real-time Monitoring",
                description: "AI-powered fraud detection"
              },
              {
                icon: <Smartphone className={styles.securityIconSize} />,
                title: "Biometric Auth",
                description: "Face ID & fingerprint login"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.securityCard}
              >
                <div className={styles.securityIconContainer}>
                  {feature.icon}
                </div>
                <h3 className={styles.securityCardTitle}>{feature.title}</h3>
                <p className={styles.securityCardDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className={styles.complianceBadges}>
            {['FDIC', 'PCI DSS', 'SOC 2', 'ISO 27001', 'GDPR'].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={styles.complianceBadge}
              >
                {badge} Compliant
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Loved by Millions
            </h2>
            <p className={styles.sectionDescription}>
              Join 5M+ users who trust ClaveRica
            </p>
          </div>

          <div className={styles.testimonialContainer}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.star} fill="currentColor" />
                ))}
              </div>
              
              <p className={styles.testimonialText}>
                "{testimonials[currentSlide].text}"
              </p>
              
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorImageContainer}>
                    <img 
                      src={testimonials[currentSlide].image} 
                      alt={testimonials[currentSlide].name}
                      className={styles.authorImage}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="${styles.authorFallback}">
                            ${testimonials[currentSlide].name.substring(0, 2)}
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className={styles.authorDetails}>
                    <p className={styles.authorName}>
                      {testimonials[currentSlide].name}
                    </p>
                    <p className={styles.authorInfoText}>
                      {testimonials[currentSlide].role} • {testimonials[currentSlide].country}
                    </p>
                  </div>
                </div>
                
                <div className={styles.testimonialDots}>
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`${styles.testimonialDot} ${
                        idx === currentSlide ? styles.testimonialDotActive : ''
                      }`}
                      aria-label={`View testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaPulse1} />
          <div className={styles.ctaPulse2} />
        </div>

        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Transform Your Finances?
          </h2>
          <p className={styles.ctaDescription}>
            Join millions who've already made the switch to smarter banking
          </p>

          <div className={styles.ctaButtons}>
            <Link 
              to="/signup"
              className={styles.ctaButtonPrimary}
            >
              <span className={styles.ctaButtonContent}>
                Open Free Account
                <ArrowRight className={styles.ctaButtonArrow} />
              </span>
            </Link>
            <Link 
              to="/contact"
              className={styles.ctaButtonSecondary}
            >
              <span className={styles.ctaButtonContent}>
                <MessageCircle className={styles.ctaButtonIcon} />
                Talk to Sales
              </span>
            </Link>
          </div>

          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature}>
              <CheckCircle className={styles.ctaFeatureIcon} />
              <p className={styles.ctaFeatureText}>No credit card required</p>
            </div>
            <div className={styles.ctaFeature}>
              <Clock className={styles.ctaFeatureIcon} />
              <p className={styles.ctaFeatureText}>Set up in 2 minutes</p>
            </div>
            <div className={styles.ctaFeature}>
              <Shield className={styles.ctaFeatureIcon} />
              <p className={styles.ctaFeatureText}>FDIC insured</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT BAR */}
      <section className={styles.supportBar}>
        <div className={styles.supportContainer}>
          <div className={styles.supportContent}>
            <p className={styles.supportText}>
              Questions? We're here to help 24/7
            </p>
            <div className={styles.supportLinks}>
              <button className={styles.supportLink}>
                <MessageCircle className={styles.supportIcon} />
                Live Chat
              </button>
              <button className={styles.supportLink}>
                <Phone className={styles.supportIcon} />
                +1 (888) 123-4567
              </button>
              <button className={styles.supportLink}>
                <Mail className={styles.supportIcon} />
                support@claverica.com
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for eye icon
const EyeIcon = () => (
  <svg className={styles.eyeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);