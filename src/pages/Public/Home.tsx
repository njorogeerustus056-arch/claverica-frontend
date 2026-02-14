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
  const [videoState, setVideoState] = useState<string>('initializing');
  
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


  // Video debugging and event handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('=== VIDEO DEBUG START ===');
    
    const handleLoadStart = () => {
      console.log('✓ loadstart');
      setVideoState('loading');
    };

    const handleLoadedMetadata = () => {
      console.log('✓ loadedmetadata - Dimensions:', video.videoWidth, 'x', video.videoHeight);
      setVideoState('metadata-loaded');
    };

    const handleLoadedData = () => {
      console.log('✓ loadeddata - First frame loaded');
      setVideoLoaded(true);
      setVideoState('data-loaded');
    };

    const handleCanPlay = () => {
      console.log('✓ canplay - Ready to play');
      setVideoState('can-play');
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✓ Playing successfully');
            setVideoState('playing');
          })
          .catch((err) => {
            console.warn('⚠ Autoplay prevented:', err);
            setVideoState('play-failed');
          });
      }
    };

    const handlePlaying = () => {
      console.log('✓ playing');
      setVideoState('playing');
    };

    const handleStalled = () => {
      console.warn('⚠ stalled');
      setVideoState('stalled');
    };

    const handleError = (e: Event) => {
      console.error('❌ VIDEO ERROR');
      const target = e.target as HTMLVideoElement;
      if (target.error) {
        const errors: { [key: number]: string } = {
          1: 'MEDIA_ERR_ABORTED',
          2: 'MEDIA_ERR_NETWORK',
          3: 'MEDIA_ERR_DECODE',
          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
        };
        console.error('Error:', errors[target.error.code] || 'Unknown');
      }
      setVideoError(true);
      setVideoState('error');
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('error', handleError);

    video.load();
    console.log('Video load() called');
    console.log('=== VIDEO DEBUG END ===');

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('stalled', handleStalled);
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

  const features = [
    { 
      icon: <Send className={styles.featureIconSize} />, 
      title: "Global Transfers", 
      desc: "Send money to 180+ countries instantly with zero hidden fees.",
      color: styles.featureColor1,
      link: "/features?section=transfers",
      stats: "Save 85% vs banks"
    },
    { 
      icon: <Wallet className={styles.featureIconSize} />, 
      title: "Crypto Trading", 
      desc: "Buy, sell, and hold 50+ cryptocurrencies with bank-level security.",
      color: styles.featureColor2,
      link: "/features?section=crypto",
      stats: "24/7 trading"
    },
    { 
      icon: <PiggyBank className={styles.featureIconSize} />, 
      title: "High-Yield Savings", 
      desc: "Earn up to 12% APY on your savings, compounded daily.",
      color: styles.featureColor3,
      link: "/features?section=savings",
      stats: "40x bank rates"
    },
    { 
      icon: <CreditCard className={styles.featureIconSize} />, 
      title: "Premium Cards", 
      desc: "Metal cards with cashback, lounge access, and global acceptance.",
      color: styles.featureColor4,
      link: "/features?section=cards",
      stats: "3% cashback"
    },
    { 
      icon: <Receipt className={styles.featureIconSize} />, 
      title: "Bill Payments", 
      desc: "Pay utilities, subscriptions, and mobile top-ups instantly.",
      color: styles.featureColor5,
      link: "/features?section=bills",
      stats: "0.5% cashback"
    },
    { 
      icon: <Gift className={styles.featureIconSize} />, 
      title: "Rewards Program", 
      desc: "Earn points on every transaction and unlock exclusive perks.",
      color: styles.featureColor6,
      link: "/features?section=rewards",
      stats: "3x points"
    },
  ];

  // Enhanced Live feed events
  const liveFeedEvents = [
    { 
      icon: "💸", 
      text: "Maria sent $500 to Brazil", 
      time: "Just now",
      type: "send",
      amount: 500,
      currency: "USD",
      country: "Brazil",
      user: "Maria S.",
      status: "completed"
    },
    { 
      icon: "📈", 
      text: "John earned $45 in interest", 
      time: "2 min ago",
      type: "interest",
      amount: 45,
      currency: "USD",
      account: "Savings Plus",
      status: "credited"
    },
    { 
      icon: "₿", 
      text: "Sarah bought 0.1 Bitcoin", 
      time: "5 min ago",
      type: "crypto",
      amount: 0.1,
      currency: "BTC",
      asset: "Bitcoin",
      status: "executed"
    },
    { 
      icon: "✈️", 
      text: "Alex used card in Tokyo", 
      time: "10 min ago",
      type: "card",
      amount: 284.50,
      currency: "JPY",
      merchant: "Tokyo Metro",
      location: "Tokyo, Japan",
      status: "approved"
    },
    { 
      icon: "🏠", 
      text: "Emma paid rent via ClaveRica", 
      time: "15 min ago",
      type: "bill",
      amount: 1200,
      currency: "USD",
      biller: "Premium Apartments",
      status: "processed"
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

  // Partner logos mapping
  const getPartnerLogo = (name: string) => {
    const logoMap: Record<string, string> = {
      "Coca-Cola": "/logos/partners/cocacola.png",
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
    return logoMap[name] || "🏢";
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

      {/* HERO SECTION WITH VIDEO BACKGROUND - FIXED */}
      <section className={styles.heroSection}>
        {/* VIDEO BACKGROUND ONLY - NO OVERLAY */}
        <div className={styles.videoContainer} style={{ backgroundColor: 'red' }}>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            controls
            className={styles.videoBackground}
            onLoadedData={() => {
              console.log('Video loaded successfully');
              setVideoLoaded(true);
            }}
            onError={(e) => {
              console.error('Video failed to load:', e);
              setVideoError(true);
            }}
          >
            <source src="/videos/Home1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback gradient if video fails */}
          {!videoLoaded && (
            <div className={styles.videoFallback} />
          )}
          
          {videoError && (
            <>
              <div className={styles.videoFallback}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Video failed to load. Check console for errors.
                </div>
              </div>
            
              {/* Debug overlay */}
              <div className={styles.debugOverlay}>
                <p><strong>State:</strong> {videoState}</p>
                <p><strong>Loaded:</strong> {videoLoaded ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {videoError ? 'Yes' : 'No'}</p>
              </div>
            </>
          )}
        </div>
        
        {/* NO OVERLAY DIV - REMOVED */}
        
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

      {/* MODERN LIVE ACTIVITY FEED */}
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
                {["all", "transactions", "investments", "cards"].map((type) => (
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
                        liveFeedEvents[activeLiveFeed].type === "send" ? styles.sendIcon :
                        liveFeedEvents[activeLiveFeed].type === "interest" ? styles.interestIcon :
                        liveFeedEvents[activeLiveFeed].type === "crypto" ? styles.cryptoIcon :
                        liveFeedEvents[activeLiveFeed].type === "card" ? styles.cardIcon :
                        styles.defaultIcon
                      }`}>
                        {liveFeedEvents[activeLiveFeed].icon}
                      </div>
                      
                      {/* Status Indicator */}
                      <div className={`${styles.statusIndicator} ${
                        liveFeedEvents[activeLiveFeed].status === "completed" ? styles.statusCompleted :
                        liveFeedEvents[activeLiveFeed].status === "pending" ? styles.statusPending :
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
                          liveFeedEvents[activeLiveFeed].type === "send" ? styles.sendBadge :
                          liveFeedEvents[activeLiveFeed].type === "interest" ? styles.interestBadge :
                          liveFeedEvents[activeLiveFeed].type === "crypto" ? styles.cryptoBadge :
                          styles.defaultBadge
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
                            <span className={`${styles.amount} ${
                              ["send", "bill"].includes(liveFeedEvents[activeLiveFeed].type as string)
                                ? styles.amountNegative
                                : styles.amountPositive
                            }`}>
                              {["send", "bill"].includes(liveFeedEvents[activeLiveFeed].type as string) ? "-" : "+"}
                              ${liveFeedEvents[activeLiveFeed].amount?.toLocaleString()}
                            </span>
                            <span className={styles.currency}>
                              {liveFeedEvents[activeLiveFeed].currency}
                            </span>
                          </div>
                        )}
                        
                        {"country" in liveFeedEvents[activeLiveFeed] && (
                          <div className={styles.locationInfo}>
                            <Globe className={styles.locationIcon} />
                            {liveFeedEvents[activeLiveFeed].country}
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
                      <span className={styles.statLabel}>Avg. Fee</span>
                      <TrendingDownIcon className={styles.trendDownIcon} />
                    </div>
                    <p className={styles.statValue}>$1.49</p>
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

      {/* FEATURES SECTION WITH HOVER EFFECTS */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.featuresTitle}`}>
              Everything You Need
              <span className={styles.titleGradientBlue}>
                In One Platform
              </span>
            </h2>
            <p className={styles.sectionDescription}>
              From instant payments to crypto trading, we've built the most comprehensive financial platform
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.featureCardWrapper}
              >
                <div className={styles.featureCardHover} />
                <div className={styles.featureCard}>
                  <div className={`${styles.featureIconContainer} ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.desc}</p>
                  <div className={styles.featureFooter}>
                    <Link 
                      to={feature.link}
                      className={styles.featureLink}
                    >
                      Learn more <ArrowRight className={styles.linkArrow} />
                    </Link>
                    <span className={styles.featureStats}>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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
                          ✈️
                        </div>
                        <div>
                          <div className={styles.activityTitle}>Emirates Airlines</div>
                          <div className={styles.activityTime}>Today, 10:30 AM</div>
                        </div>
                      </div>
                      <div className={styles.activityAmountNegative}>-$845.00</div>
                    </div>
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

      {/* ANIMATED PARTNERS CAROUSEL */}
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
                          `<div class="${styles.fallbackLogoCircle}">🏢</div>`;
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
                          `<div class="${styles.fallbackLogoCircle}">🏢</div>`;
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
