import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, Users, Globe, TrendingUp, Heart, Zap, 
  CheckCircle, Award, Target, Sparkles, ArrowRight,
  Lock, Building2, Headphones, Activity, Star,
  ChevronLeft, ChevronRight, PlayCircle, BookOpen,
  ShieldCheck, Globe2, CreditCard, Smartphone,
  Send, Wallet, PiggyBank, Receipt, Gift
} from "lucide-react";
import styles from './About.module.css';

// Types for better maintainability
interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  text: string;
  stars: number;
  country: string;
}

interface Stat {
  id: string;
  value: string;
  label: string;
  icon: JSX.Element;
  trend?: string;
}

interface Value {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  desc: string;
  milestone: string;
}

interface ProtectionFeature {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  stat: string;
}

interface FeatureLink {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
  stats: string;
}

// Constants outside component to prevent recreation
const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "John Carter",
    role: "CEO, Tech Innovators Inc.",
    photo: "/images/testimonials/john.jpg",
    text: "ClaveRica has revolutionized how we handle international payments. The platform is intuitive, secure, and has significantly reduced our transaction costs.",
    stars: 5,
    country: "USA"
  },
  {
    id: "testimonial-2",
    name: "Sophia Chen",
    role: "Freelance Designer",
    photo: "/images/testimonials/sophia.jpg",
    text: "As a freelancer, getting paid on time from clients worldwide used to be a headache. ClaveRica's payment system is fast, reliable, and their low fees mean I keep more of what I earn.",
    stars: 5,
    country: "Singapore"
  },
  {
    id: "testimonial-3",
    name: "David Lee",
    role: "Startup Founder",
    photo: "/images/testimonials/david.jpg",
    text: "The loan options provided by ClaveRica gave our startup the capital it needed to scale. The application process was straightforward and flexible.",
    stars: 4,
    country: "UK"
  },
  {
    id: "testimonial-4",
    name: "Emily White",
    role: "Marketing Director",
    photo: "/images/testimonials/emily.jpg",
    text: "Managing campaign budgets across multiple currencies is finally simple. The virtual cards are a game-changer for our team.",
    stars: 5,
    country: "Canada"
  },
  {
    id: "testimonial-5",
    name: "Michael Rodriguez",
    role: "E-commerce Specialist",
    photo: "/images/testimonials/michael.jpg",
    text: "Integrating ClaveRica's crypto payment gateway was seamless. We've seen a significant increase in sales from crypto users.",
    stars: 4,
    country: "Spain"
  },
  {
    id: "testimonial-6",
    name: "Daniel Kim",
    role: "IT Consultant",
    photo: "/images/testimonials/daniel.jpg",
    text: "Security is my top priority, and ClaveRica's platform is rock-solid. Advanced encryption and MFA give me complete peace of mind.",
    stars: 5,
    country: "South Korea"
  },
];

const STATS: Stat[] = [
  { 
    id: "stat-1", 
    value: "5M+", 
    label: "Happy Customers",
    icon: <Users className={styles.statIcon} />,
    trend: "↑ 40% this year"
  },
  { 
    id: "stat-2", 
    value: "$2.8B+", 
    label: "Processed in 2024",
    icon: <TrendingUp className={styles.statIcon} />,
    trend: "↑ $800M from 2023"
  },
  { 
    id: "stat-3", 
    value: "180+", 
    label: "Countries Served",
    icon: <Globe className={styles.statIcon} />,
    trend: "20+ added in 2024"
  },
  { 
    id: "stat-4", 
    value: "4.9★", 
    label: "User Rating",
    icon: <Star className={styles.statIcon} />,
    trend: "Based on 250K+ reviews"
  }
];

const VALUES: Value[] = [
  {
    id: "value-1",
    icon: <Heart className={styles.valueIcon} aria-hidden="true" />,
    title: "Customer First",
    description: "Every decision we make puts our customers at the heart of what we do."
  },
  {
    id: "value-2",
    icon: <Shield className={styles.valueIcon} aria-hidden="true" />,
    title: "Security & Trust",
    description: "Bank-level security and transparency in everything we do."
  },
  {
    id: "value-3",
    icon: <Zap className={styles.valueIcon} aria-hidden="true" />,
    title: "Innovation",
    description: "Continuously improving and building the future of finance."
  },
  {
    id: "value-4",
    icon: <Globe className={styles.valueIcon} aria-hidden="true" />,
    title: "Global Reach",
    description: "Making money work for everyone, everywhere in the world."
  }
];

const TIMELINE: TimelineItem[] = [
  { 
    id: "timeline-1", 
    year: "2020", 
    title: "Founded", 
    desc: "ClaveRica was born with a mission to democratize finance",
    milestone: "🏁 Journey Begins"
  },
  { 
    id: "timeline-2", 
    year: "2021", 
    title: "1M Users", 
    desc: "Reached our first million users milestone",
    milestone: "🚀 Rapid Growth"
  },
  { 
    id: "timeline-3", 
    year: "2022", 
    title: "Global Expansion", 
    desc: "Launched in 100+ countries worldwide",
    milestone: "🌍 Going Global"
  },
  { 
    id: "timeline-4", 
    year: "2023", 
    title: "Crypto Integration", 
    desc: "Added cryptocurrency trading and wallets",
    milestone: "💰 Crypto Era"
  },
  { 
    id: "timeline-5", 
    year: "2024", 
    title: "$2.8B Processed", 
    desc: "Processed over $2.8 billion in transactions",
    milestone: "📈 Major Milestone"
  },
  { 
    id: "timeline-6", 
    year: "2025", 
    title: "5M+ Users", 
    desc: "Growing community of 5 million+ users",
    milestone: "🌟 Community Love"
  }
];

const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: "protection-1",
    icon: <Lock className={styles.protectionIcon} aria-hidden="true" />,
    title: "256-bit Encryption",
    description: "Military-grade encryption protects all your data and transactions",
    stat: "100% secure"
  },
  {
    id: "protection-2",
    icon: <Activity className={styles.protectionIcon} aria-hidden="true" />,
    title: "24/7 Monitoring",
    description: "Real-time fraud detection running 140 checks per second",
    stat: "140+ checks/sec"
  },
  {
    id: "protection-3",
    icon: <Building2 className={styles.protectionIcon} aria-hidden="true" />,
    title: "Segregated Accounts",
    description: "Your funds are held separately in tier-1 financial institutions",
    stat: "100% insured"
  },
  {
    id: "protection-4",
    icon: <Headphones className={styles.protectionIcon} aria-hidden="true" />,
    title: "Always Available",
    description: "Round-the-clock customer support whenever you need us",
    stat: "<2 min response"
  }
];

// Feature links pointing to FeatureDetails page
const FEATURE_LINKS: FeatureLink[] = [
  {
    id: "feature-1",
    icon: <Smartphone className={styles.featureIcon} />,
    title: "Mobile App",
    description: "Bank on the go with our 5-star rated app",
    link: "/features?section=cards",
    stats: "4.9★ rating"
  },
  {
    id: "feature-2",
    icon: <CreditCard className={styles.featureIcon} />,
    title: "Virtual Cards",
    description: "Create disposable cards for online safety",
    link: "/features?section=cards",
    stats: "3% cashback"
  },
  {
    id: "feature-3",
    icon: <Globe2 className={styles.featureIcon} />,
    title: "Global Transfers",
    description: "Send money worldwide with zero hidden fees",
    link: "/features?section=transfers",
    stats: "Save 85%"
  },
  {
    id: "feature-4",
    icon: <ShieldCheck className={styles.featureIcon} />,
    title: "Family Accounts",
    description: "Manage finances together securely",
    link: "/features?section=rewards",
    stats: "Shared rewards"
  },
  {
    id: "feature-5",
    icon: <Send className={styles.featureIcon} />,
    title: "Instant Transfers",
    description: "Send money to 180+ countries instantly",
    link: "/features?section=transfers",
    stats: "<30 seconds"
  },
  {
    id: "feature-6",
    icon: <Wallet className={styles.featureIcon} />,
    title: "Crypto Trading",
    description: "Buy, sell, and hold 50+ cryptocurrencies",
    link: "/features?section=crypto",
    stats: "24/7 trading"
  },
  {
    id: "feature-7",
    icon: <PiggyBank className={styles.featureIcon} />,
    title: "High-Yield Savings",
    description: "Earn up to 12% APY on your savings",
    link: "/features?section=savings",
    stats: "40x bank rates"
  },
  {
    id: "feature-8",
    icon: <Receipt className={styles.featureIcon} />,
    title: "Bill Payments",
    description: "Pay utilities and subscriptions instantly",
    link: "/features?section=bills",
    stats: "0.5% cashback"
  },
  {
    id: "feature-9",
    icon: <Gift className={styles.featureIcon} />,
    title: "Rewards Program",
    description: "Earn points on every transaction",
    link: "/features?section=rewards",
    stats: "3x points"
  }
];

// Fallback image URL
const FALLBACK_IMAGE = "/images/fallback/hero-fallback.jpg";

export default function AboutUs() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState<boolean>(true);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [userCount, setUserCount] = useState(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  
  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    if (node) {
      node.play().catch(() => setVideoError(true));
    }
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

  // Memoized computations
  const stats = useMemo(() => STATS, []);
  const values = useMemo(() => VALUES, []);
  const timeline = useMemo(() => TIMELINE, []);
  const protectionFeatures = useMemo(() => PROTECTION_FEATURES, []);
  const featureLinks = useMemo(() => FEATURE_LINKS, []);

  // Handle testimonial navigation with debouncing
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % ALL_TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + ALL_TESTIMONIALS.length) % ALL_TESTIMONIALS.length);
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentTestimonial(index);
    setIsTestimonialAutoPlaying(false);
    setTimeout(() => setIsTestimonialAutoPlaying(true), 10000);
  }, []);

  // Auto-rotation effect with visibility awareness
  useEffect(() => {
    if (!isTestimonialAutoPlaying) return;

    const timer = setInterval(() => {
      if (!document.hidden) {
        nextTestimonial();
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isTestimonialAutoPlaying, nextTestimonial]);

  // Handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = FALLBACK_IMAGE;
    target.onerror = null;
  };

  // Generate star ratings
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={`star-${i}`}
        className={`${styles.starIcon} ${i < count ? styles.starFilled : styles.starEmpty}`}
        aria-hidden="true"
      />
    ));
  };

  // Video play handler
  const handleVideoPlay = useCallback(() => {
    setVideoPlaying(true);
    window.location.href = "/features?section=cards";
  }, []);

  // Don't render if no testimonials
  if (ALL_TESTIMONIALS.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>Content coming soon</h1>
          <p className={styles.errorText}>Our testimonials are being updated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} aria-hidden="true" />
        <div className={styles.heroBackground2} aria-hidden="true" />
        
        <div className={styles.heroContent}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroBadge}>
                <Sparkles className={styles.heroBadgeIcon} aria-hidden="true" />
                Building the future of finance
              </div>
              
              <h1 className={styles.heroTitle}>
                Money for
                <span className={styles.heroTitleGradient}>
                  Humans
                </span>
              </h1>
              
              <p className={styles.heroSubtitle}>
                We're building a global financial platform that helps you take control of your money—wherever you are in the world.
              </p>
              
              <div className={styles.heroButtons}>
                <Link 
                  to="/signup"
                  className={styles.btnPrimary}
                  aria-label="Create a ClaveRica account"
                >
                  <CheckCircle className={styles.btnIcon} aria-hidden="true" />
                  Get Started Free
                  <ArrowRight className={styles.btnArrow} aria-hidden="true" />
                </Link>
                
                <Link 
                  to="/contact"
                  className={styles.btnSecondary}
                  aria-label="Contact our sales team"
                >
                  <BookOpen className={styles.btnIcon} aria-hidden="true" />
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <div className={styles.videoContainer} onClick={handleVideoPlay}>
                {!videoError ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.videoThumbnail}
                    onError={() => setVideoError(true)}
                  >
                    <source src="/videos/Service2.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src="/images/hero/team-collaborating.jpg"
                    alt="ClaveRica team collaborating in a modern office environment"
                    className={styles.videoThumbnail}
                    width={800}
                    height={600}
                    loading="lazy"
                    onError={handleImageError}
                  />
                )}
                <div className={styles.videoOverlay} aria-hidden="true" />
                
                {!videoPlaying && (
                  <div className={styles.playButton}>
                    <div className={styles.playButtonInner}>
                      <PlayCircle className={styles.playIcon} aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Floating stat card */}
              <div className={styles.floatingCard}>
                <div className={styles.floatingCardContent}>
                  <div className={styles.floatingCardIcon}>
                    <CheckCircle className={styles.floatingCardCheck} />
                  </div>
                  <div>
                    <p className={styles.floatingCardValue}>{userCount.toLocaleString()}+</p>
                    <p className={styles.floatingCardLabel}>Trusted Users</p>
                    <p className={styles.floatingCardTrend}>↑ 40% this year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statIconContainer}>
                    {stat.icon}
                  </div>
                  {stat.trend && (
                    <span className={styles.statTrend}>
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className={styles.statValue}>
                  {stat.value}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            Experience ClaveRica
          </h2>
          <div className={styles.featuresGrid}>
            {featureLinks.map((feature) => (
              <Link
                key={feature.id}
                to={feature.link}
                className={styles.featureCard}
                aria-label={`Learn about ${feature.title}`}
              >
                <div className={styles.featureIconContainer}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                <p className={styles.featureCardDescription}>
                  {feature.description}
                </p>
                <div className={styles.featureCardFooter}>
                  <span className={styles.featureCardLink}>
                    Learn more
                    <ArrowRight className={styles.featureCardArrow} />
                  </span>
                  <span className={styles.featureCardStats}>
                    {feature.stats}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className={styles.missionSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleLarge}>
              Our Mission
            </h2>
            <p className={styles.sectionDescription}>
              To build a fair, transparent financial platform that works for everyone—not just the wealthy few.
            </p>
          </div>

          <div className={styles.missionGrid}>
            <div className={styles.missionItems}>
              <div className={styles.missionItem}>
                <div className={styles.missionIconContainer}>
                  <Target className={styles.missionIcon} />
                </div>
                <div>
                  <h3 className={styles.missionItemTitle}>Democratize Finance</h3>
                  <p className={styles.missionItemText}>
                    We believe everyone deserves access to great financial services, regardless of where they live or how much money they have.
                  </p>
                </div>
              </div>

              <div className={styles.missionItem}>
                <div className={styles.missionIconContainer2}>
                  <Users className={styles.missionIcon} />
                </div>
                <div>
                  <h3 className={styles.missionItemTitle}>Build for People</h3>
                  <p className={styles.missionItemText}>
                    Every feature we build is designed with our customers in mind—simple, transparent, and helpful.
                  </p>
                </div>
              </div>

              <div className={styles.missionItem}>
                <div className={styles.missionIconContainer3}>
                  <TrendingUp className={styles.missionIcon} />
                </div>
                <div>
                  <h3 className={styles.missionItemTitle}>Drive Innovation</h3>
                  <p className={styles.missionItemText}>
                    We're constantly pushing boundaries and finding new ways to make money work better for you.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.missionMetrics}>
              <div className={styles.metricsCard}>
                <h3 className={styles.metricsTitle}>
                  <Activity className={styles.metricsIcon} />
                  Live Metrics
                </h3>
                <div className={styles.metricsList}>
                  <div className={styles.metricsItem}>
                    <span className={styles.metricsLabel}>Transactions per second</span>
                    <span className={styles.metricsValue}>140+</span>
                  </div>
                  <div className={styles.metricsItem}>
                    <span className={styles.metricsLabel}>Active Countries</span>
                    <div className={styles.metricsValueWithIcon}>
                      <span className={styles.metricsValue}>180+</span>
                      <Globe className={styles.metricsSmallIcon} />
                    </div>
                  </div>
                  <div className={styles.metricsItem}>
                    <span className={styles.metricsLabel}>Customer Satisfaction</span>
                    <div className={styles.metricsValueWithIcon}>
                      <span className={styles.metricsValue}>98%</span>
                      <div className={styles.metricsStars}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={styles.metricsStar} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={styles.metricsItem}>
                    <span className={styles.metricsLabel}>Support Response</span>
                    <div className={styles.metricsValueWithIcon}>
                      <span className={styles.metricsValue}>&lt;2min</span>
                      <Headphones className={styles.metricsSmallIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleLarge}>
              Our Values
            </h2>
            <p className={styles.sectionDescription}>
              The principles that guide everything we do
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.id} className={styles.valueCard}>
                <div className={styles.valueIconContainer}>
                  {value.icon}
                </div>
                <h3 className={styles.valueCardTitle}>{value.title}</h3>
                <p className={styles.valueCardDescription}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleLarge}>
              Our Journey
            </h2>
            <p className={styles.sectionDescription}>
              From startup to global fintech leader
            </p>
          </div>

          <div className={styles.timelineWrapper}>
            <div className={styles.timelineLine} aria-hidden="true" />

            <div className={styles.timelineItems}>
              {timeline.map((item, idx) => (
                <div key={item.id} className={`${styles.timelineRow} ${idx % 2 === 0 ? styles.timelineRowLeft : styles.timelineRowRight}`}>
                  <div className={styles.timelineContent}>
                    <Link 
                      to="/about#timeline"
                      className={styles.timelineCard}
                    >
                      <div className={styles.timelineCardHeader}>
                        <div className={styles.timelineYear}>
                          {item.year}
                        </div>
                        <span className={styles.timelineMilestone}>
                          {item.milestone}
                        </span>
                      </div>
                      <h3 className={styles.timelineCardTitle}>{item.title}</h3>
                      <p className={styles.timelineCardDesc}>{item.desc}</p>
                    </Link>
                  </div>

                  <div className={styles.timelineDot} 
                       aria-hidden="true" />

                  <div className={styles.timelineSpacer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className={styles.securitySection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleLarge}>
              Your Money is Safe
            </h2>
            <p className={styles.sectionDescriptionLight}>
              We process over $2.8 billion annually with bank-level security protecting every transaction
            </p>
          </div>

          <div className={styles.securityGrid}>
            {protectionFeatures.map((feature) => (
              <Link
                key={feature.id}
                to="/security"
                className={styles.securityCard}
                aria-label={`Learn about ${feature.title}`}
              >
                <div className={styles.securityIconContainer}>
                  {feature.icon}
                </div>
                <h3 className={styles.securityCardTitle}>{feature.title}</h3>
                <p className={styles.securityCardDescription}>{feature.description}</p>
                <div className={styles.securityCardStat}>{feature.stat}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleLarge}>
              Loved by Millions
            </h2>
            <p className={styles.sectionDescription}>
              Join 5M+ users who trust ClaveRica
            </p>
          </div>

          <div className={styles.testimonialsWrapper}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars} aria-label={`Rating: ${ALL_TESTIMONIALS[currentTestimonial].stars} out of 5 stars`}>
                {renderStars(ALL_TESTIMONIALS[currentTestimonial].stars)}
                <span className={styles.testimonialRating}>
                  {ALL_TESTIMONIALS[currentTestimonial].stars}.0/5.0
                </span>
              </div>
              
              <blockquote className={styles.testimonialQuote}>
                "{ALL_TESTIMONIALS[currentTestimonial].text}"
              </blockquote>
              
              <div className={styles.testimonialFooter}>
                <Link 
                  to="/about#testimonials"
                  className={styles.testimonialAuthor}
                >
                  <img 
                    src={ALL_TESTIMONIALS[currentTestimonial].photo}
                    alt={`Portrait of ${ALL_TESTIMONIALS[currentTestimonial].name}`}
                    className={styles.testimonialImage}
                    width={64}
                    height={64}
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div>
                    <p className={styles.testimonialName}>
                      {ALL_TESTIMONIALS[currentTestimonial].name}
                    </p>
                    <p className={styles.testimonialMeta}>
                      {ALL_TESTIMONIALS[currentTestimonial].role} • {ALL_TESTIMONIALS[currentTestimonial].country}
                    </p>
                  </div>
                </Link>
                
                <div className={styles.testimonialDots} role="tablist" aria-label="Testimonial navigation">
                  {ALL_TESTIMONIALS.map((_, idx) => (
                    <button
                      key={`indicator-${idx}`}
                      onClick={() => goToTestimonial(idx)}
                      className={`${styles.testimonialDot} ${idx === currentTestimonial ? styles.testimonialDotActive : ''}`}
                      role="tab"
                      aria-selected={idx === currentTestimonial}
                      aria-label={`View testimonial ${idx + 1} of ${ALL_TESTIMONIALS.length}`}
                      tabIndex={0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button 
              onClick={prevTestimonial}
              className={styles.testimonialNavLeft}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className={styles.testimonialNavIcon} aria-hidden="true" />
            </button>
            <button 
              onClick={nextTestimonial}
              className={styles.testimonialNavRight}
              aria-label="Next testimonial"
            >
              <ChevronRight className={styles.testimonialNavIcon} aria-hidden="true" />
            </button>
          </div>

          {/* Customer stats */}
          <div className={styles.customerStats}>
            <div className={styles.customerStat}>
              <div className={styles.customerStatValue}>96%</div>
              <div className={styles.customerStatLabel}>Recommend Us</div>
            </div>
            <div className={styles.customerStat}>
              <div className={styles.customerStatValue}>4.9</div>
              <div className={styles.customerStatLabel}>App Store Rating</div>
            </div>
            <div className={styles.customerStat}>
              <div className={styles.customerStatValue}>99.9%</div>
              <div className={styles.customerStatLabel}>Uptime</div>
            </div>
            <div className={styles.customerStat}>
              <div className={styles.customerStatValue}>2min</div>
              <div className={styles.customerStatLabel}>Avg. Support Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="join" className={styles.ctaSection}>
        <div className={styles.ctaBackground} aria-hidden="true">
          <div className={styles.ctaPulse1} />
          <div className={styles.ctaPulse2} />
        </div>

        <div className={styles.ctaContent}>
          <div className={styles.ctaBadge}>
            <Sparkles className={styles.ctaBadgeIcon} />
            <span>No commitment • Cancel anytime</span>
          </div>
          
          <h2 className={styles.ctaTitle}>
            Ready to Start?
          </h2>
          <p className={styles.ctaDescription}>
            Join millions who trust ClaveRica with their finances.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link 
              to="/signup"
              className={styles.ctaButtonPrimary}
              aria-label="Create a free ClaveRica account"
            >
              <CheckCircle className={styles.ctaButtonIcon} aria-hidden="true" />
              Create Free Account
              <ArrowRight className={styles.ctaButtonArrow} aria-hidden="true" />
            </Link>
            
            <Link 
              to="/contact"
              className={styles.ctaButtonSecondary}
              aria-label="Contact our sales team"
            >
              Contact Sales
            </Link>
          </div>

          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureCheck}>✓</span>
              <span>No Fees</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureCheck}>✓</span>
              <span>Instant Setup</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureCheck}>✓</span>
              <span>24/7 Support</span>
            </div>
          </div>

          <p className={styles.ctaDisclaimer}>
            No credit card required • Free forever • Set up in 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}