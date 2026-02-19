// src/pages/Services.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, Send, Wallet, Bitcoin, PiggyBank, Receipt, 
  Gift, Shield, Zap, Globe, Building2, Users, TrendingUp, 
  Smartphone, Lock, Clock, CheckCircle, ArrowRight, Sparkles,
  DollarSign, RefreshCw, Scale, FileText, ChevronDown,
  Star, Award, Phone, Mail, MessageCircle, ChevronRight,
  Gem, Coins, BarChart3, PieChart, Repeat, Handshake
} from "lucide-react";
import styles from "./Services.module.css";

// Types
interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: JSX.Element;
  color: string;
  gradient: string;
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  new?: boolean;
}

interface StatProps {
  value: string;
  label: string;
  icon: JSX.Element;
}

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

// Stat Card Component
const StatCard = ({ value, label, icon }: StatProps) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statValue}><AnimatedCounter value={value} /></div>
    <div className={styles.statLabel}>{label}</div>
  </div>
);

export default function Services() {
  const [activeTab, setActiveTab] = useState("personal");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("global");

  // Trust indicators
  const trustStats = [
    { value: "2.5M+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { value: "190+", label: "Countries", icon: <Globe className="w-5 h-5" /> },
    { value: "$50B+", label: "Transactions", icon: <BarChart3 className="w-5 h-5" /> },
    { value: "4.8", label: "App Store Rating", icon: <Star className="w-5 h-5" /> }
  ];

  // Personal Services - Monzo/Wise inspired
  const personalServices: Service[] = [
    {
      id: 1,
      title: "Instant Global Transfers",
      description: "Send money to 190+ countries in seconds. Real-time exchange rates with zero hidden fees.",
      features: [
        "Send to 190+ countries instantly",
        "Real-time mid-market exchange rates",
        "Zero hidden fees - what you see is what you get",
        "Arrives in under 60 seconds"
      ],
      icon: <Send className="w-8 h-8" />,
      color: "#0075FF",
      gradient: "linear-gradient(135deg, #0075FF, #00B9FF)",
      badge: "Most Popular",
      badgeColor: "#FF4F6F",
      popular: true
    },
    {
      id: 2,
      title: "Multi-Currency Accounts",
      description: "Hold, convert, and manage 50+ currencies in one account. Like having local accounts worldwide.",
      features: [
        "Hold USD, EUR, GBP, JPY + 46 more",
        "Convert at interbank rates instantly",
        "Get local account details in 8 currencies",
        "No monthly fees, no minimum balance"
      ],
      icon: <Wallet className="w-8 h-8" />,
      color: "#8A2BE2",
      gradient: "linear-gradient(135deg, #8A2BE2, #B15EFF)"
    },
    {
      id: 3,
      title: "Smart Cards",
      description: "Virtual and physical cards with instant issuance. Freeze, unfreeze, and manage from your phone.",
      features: [
        "Instant virtual cards",
        "Premium metal cards available",
        "Contactless payments worldwide",
        "Real-time spending notifications"
      ],
      icon: <CreditCard className="w-8 h-8" />,
      color: "#FF4F6F",
      gradient: "linear-gradient(135deg, #FF4F6F, #FF8C69)"
    },
    {
      id: 4,
      title: "Crypto & Digital Assets",
      description: "Buy, sell, and securely store 50+ cryptocurrencies. Trade seamlessly between fiat and crypto.",
      features: [
        "Trade BTC, ETH, SOL, USDT + 46 more",
        "Institutional-grade cold storage",
        "Zero trading fees on all pairs",
        "Instant crypto-to-fiat conversion"
      ],
      icon: <Bitcoin className="w-8 h-8" />,
      color: "#F0B90B",
      gradient: "linear-gradient(135deg, #F0B90B, #FFB347)",
      badge: "New",
      badgeColor: "#F0B90B",
      new: true
    },
    {
      id: 5,
      title: "High-Yield Savings",
      description: "Earn up to 12% APY on your savings with daily compounding. No lock-in periods.",
      features: [
        "Up to 12% APY on savings",
        "Daily compound interest",
        "Instant withdrawals anytime",
        "No minimum balance required"
      ],
      icon: <PiggyBank className="w-8 h-8" />,
      color: "#00B9FF",
      gradient: "linear-gradient(135deg, #00B9FF, #0052CC)"
    },
    {
      id: 6,
      title: "Bill Payments Hub",
      description: "Pay utilities, rent, and subscriptions in one place. Never miss a payment again.",
      features: [
        "Pay 5,000+ billers instantly",
        "Schedule recurring payments",
        "Get reminders before due dates",
        "Cashback on select payments"
      ],
      icon: <Receipt className="w-8 h-8" />,
      color: "#8626E9",
      gradient: "linear-gradient(135deg, #8626E9, #B87CFF)"
    },
    {
      id: 7,
      title: "Instant Personal Loans",
      description: "Get loans from $1,000 to $50,000 with approval in minutes. Competitive rates from 5.9% APR.",
      features: [
        "Loans from $1,000 to $50,000",
        "Approval in under 5 minutes",
        "Flexible 6-60 month terms",
        "No early repayment fees"
      ],
      icon: <DollarSign className="w-8 h-8" />,
      color: "#00A86B",
      gradient: "linear-gradient(135deg, #00A86B, #34C759)",
      badge: "Fast Approval",
      badgeColor: "#00A86B"
    },
    {
      id: 8,
      title: "Secure Escrow Service",
      description: "Protect your transactions with escrow. Safe for high-value purchases and deals.",
      features: [
        "Buyer and seller protection",
        "Secure fund holding until terms met",
        "Dispute resolution included",
        "Support for crypto & fiat"
      ],
      icon: <Handshake className="w-8 h-8" />,
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)"
    },
    {
      id: 9,
      title: "P2P Crypto Exchange",
      description: "Trade crypto directly with other users. Set your own rates with zero platform fees.",
      features: [
        "Zero trading fees on P2P",
        "50+ cryptocurrencies supported",
        "Escrow protection on every trade",
        "Choose your preferred rates"
      ],
      icon: <RefreshCw className="w-8 h-8" />,
      color: "#1E90FF",
      gradient: "linear-gradient(135deg, #1E90FF, #4169E1)",
      badge: "0% Fees",
      badgeColor: "#1E90FF"
    }
  ];

  // Business Services - Stripe/Skrill inspired
  const businessServices: Service[] = [
    {
      id: 10,
      title: "Business Banking Suite",
      description: "Complete banking for businesses. Multi-user access, automated payroll, and global payments.",
      features: [
        "Business accounts with sub-accounts",
        "Automated global payroll",
        "Bulk payments up to 10,000 transactions",
        "Multi-user access with role-based permissions"
      ],
      icon: <Building2 className="w-8 h-8" />,
      color: "#0052CC",
      gradient: "linear-gradient(135deg, #0052CC, #0075FF)",
      popular: true
    },
    {
      id: 11,
      title: "Payment Gateway",
      description: "Accept payments online and in-store. One integration for cards, wallets, and crypto.",
      features: [
        "Accept all major cards & wallets",
        "One-click checkout integration",
        "Real-time payment analytics",
        "1.4% + $0.25 per transaction"
      ],
      icon: <Zap className="w-8 h-8" />,
      color: "#6772E5",
      gradient: "linear-gradient(135deg, #6772E5, #8A2BE2)"
    },
    {
      id: 12,
      title: "Business Financing",
      description: "Fast working capital loans from $5,000 to $500,000. Approval in 24 hours.",
      features: [
        "Loans from $5,000 to $500,000",
        "Approval in 24 hours",
        "Flexible 3-24 month terms",
        "Revenue-based repayment options"
      ],
      icon: <TrendingUp className="w-8 h-8" />,
      color: "#34C759",
      gradient: "linear-gradient(135deg, #34C759, #00A86B)"
    },
    {
      id: 13,
      title: "Invoice & Expense Management",
      description: "Streamline your finances with automated invoicing and real-time expense tracking.",
      features: [
        "Automated invoice generation",
        "Receipt scanning with OCR",
        "Real-time expense reports",
        "QuickBooks & Xero integration"
      ],
      icon: <FileText className="w-8 h-8" />,
      color: "#FF9500",
      gradient: "linear-gradient(135deg, #FF9500, #FFB347)"
    },
    {
      id: 14,
      title: "Business Escrow",
      description: "Enterprise-grade escrow for large transactions up to $10M. Legal document support.",
      features: [
        "Support for transactions up to $10M",
        "Multi-party escrow agreements",
        "Legal document management",
        "Dedicated account manager"
      ],
      icon: <Scale className="w-8 h-8" />,
      color: "#5856D6",
      gradient: "linear-gradient(135deg, #5856D6, #8A2BE2)"
    },
    {
      id: 15,
      title: "Corporate Crypto Treasury",
      description: "Manage your corporate crypto assets with institutional-grade security and compliance.",
      features: [
        "OTC trading desk access",
        "Multi-signature wallets",
        "Tax reporting & compliance",
        "Dedicated relationship manager"
      ],
      icon: <Gem className="w-8 h-8" />,
      color: "#F0B90B",
      gradient: "linear-gradient(135deg, #F0B90B, #FFB347)",
      badge: "Enterprise",
      badgeColor: "#F0B90B"
    }
  ];

  // Security Features - Binance/Monzo inspired
  const securityFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "256-bit encryption & multi-factor authentication",
      color: "#0075FF"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "FDIC Insured",
      description: "Up to $250,000 deposit protection",
      color: "#34C759"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Fraud Monitoring",
      description: "AI-powered real-time protection",
      color: "#FF4F6F"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Regulated & Licensed",
      description: "FCA, FinCEN, and MAS regulated",
      color: "#8A2BE2"
    }
  ];

  // FAQ Data - Wise/Monzo style
  const faqs = [
    {
      question: "How fast are international transfers?",
      answer: "Most transfers complete within seconds. For some countries, it may take up to 24 hours due to local banking hours, but 90% arrive within 60 seconds."
    },
    {
      question: "What are your fees?",
      answer: "We're completely transparent: 0% hidden markup on exchange rates. For transfers, fees start at $2.99. Crypto trades are free. Business plans have custom pricing."
    },
    {
      question: "Is my money safe with you?",
      answer: "Yes. We're regulated by top financial authorities, use 256-bit encryption, and keep customer funds in segregated accounts. You're protected up to $250,000."
    },
    {
      question: "Which countries do you support?",
      answer: "We support 190+ countries for sending money and 80+ countries for receiving. We're adding more countries every month."
    },
    {
      question: "Can I have both personal and business accounts?",
      answer: "Absolutely! You can hold both account types with the same login. Switch between them seamlessly in the app."
    }
  ];

  // Regions
  const regions = ["Global", "Europe", "North America", "Asia Pacific", "Middle East"];

  const currentServices = activeTab === "personal" ? personalServices : businessServices;

  return (
    <div className={styles.container}>
      
      {/* ===== HERO SECTION - Monzo/Wise Inspired ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
        </div>
        
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroBadge}
          >
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 2.5M+ users worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.heroTitle}
          >
            Financial services
            <span className={styles.heroGradient}> for a connected world</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.heroSubtitle}
          >
            Banking, payments, crypto, and business tools — all in one place. 
            No branches. No hidden fees. No borders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={styles.heroCta}
          >
            <Link to="/signup" className={styles.primaryButton}>
              Open your free account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className={styles.secondaryButton}>
              <MessageCircle className="w-5 h-5" />
              Talk to sales
            </Link>
          </motion.div>

          {/* Trust Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={styles.statsRow}
          >
            {trustStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION - Revolut Style ===== */}
      <section className={styles.tabSection}>
        <div className={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("personal")}
            className={`${styles.tabButton} ${activeTab === "personal" ? styles.tabActive : ""}`}
          >
            <Users className="w-5 h-5" />
            Personal
          </button>
          <button
            onClick={() => setActiveTab("business")}
            className={`${styles.tabButton} ${activeTab === "business" ? styles.tabActive : ""}`}
          >
            <Building2 className="w-5 h-5" />
            Business
          </button>
        </div>

        {/* Region Selector - Wise Style */}
        <div className={styles.regionSelector}>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region.toLowerCase())}
              className={`${styles.regionButton} ${selectedRegion === region.toLowerCase() ? styles.regionActive : ""}`}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      {/* ===== SERVICES GRID - Monzo/Revolut Inspired ===== */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesGrid}>
          <AnimatePresence mode="wait">
            {currentServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={styles.serviceCard}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className={styles.popularBadge}>
                    <Award className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                {/* New Badge */}
                {service.new && (
                  <div className={styles.newBadge}>
                    <Sparkles className="w-3 h-3" />
                    New
                  </div>
                )}

                {/* Custom Badge */}
                {service.badge && !service.popular && !service.new && (
                  <div 
                    className={styles.customBadge}
                    style={{ backgroundColor: service.badgeColor }}
                  >
                    {service.badge}
                  </div>
                )}

                {/* Icon */}
                <div 
                  className={styles.serviceIcon}
                  style={{ background: service.gradient }}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>

                {/* Features List */}
                <div className={styles.featuresList}>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <CheckCircle className="w-4 h-4" style={{ color: service.color }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link 
                  to="/signup" 
                  className={styles.serviceCta}
                  style={{ 
                    background: service.gradient,
                    boxShadow: `0 10px 20px -5px ${service.color}40`
                  }}
                >
                  Get started
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== SECURITY SECTION - Binance/Monzo Style ===== */}
      <section className={styles.securitySection}>
        <div className={styles.securityBackground} />
        
        <div className={styles.securityContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.securityHeader}
          >
            <h2 className={styles.securityTitle}>
              Bank-grade security,
              <span className={styles.securityGradient}> always</span>
            </h2>
            <p className={styles.securitySubtitle}>
              Your money is protected by the same security measures as top global banks — and then some.
            </p>
          </motion.div>

          <div className={styles.securityGrid}>
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={styles.securityCard}
              >
                <div 
                  className={styles.securityCardIcon}
                  style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <Shield className="w-4 h-4" />
              FCA Regulated
            </div>
            <div className={styles.trustBadge}>
              <Shield className="w-4 h-4" />
              FinCEN Registered
            </div>
            <div className={styles.trustBadge}>
              <Shield className="w-4 h-4" />
              MAS Licensed
            </div>
            <div className={styles.trustBadge}>
              <Lock className="w-4 h-4" />
              256-bit Encryption
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION - Wise/Monzo Inspired ===== */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingHeader}>
          <h2>Simple, transparent pricing</h2>
          <p>No hidden fees. No surprises. Just honest rates you can trust.</p>
        </div>

        <div className={styles.pricingGrid}>
          {/* Free Tier - Monzo Style */}
          <div className={styles.pricingCard}>
            <h3>Personal</h3>
            <div className={styles.pricingPrice}>
              $0<span>/month</span>
            </div>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>3 free transfers/month</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Virtual cards included</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Basic crypto trading</span>
              </li>
              <li className={`${styles.pricingFeature} ${styles.pricingFeatureDisabled}`}>
                <span>Premium savings rates</span>
              </li>
            </ul>
            <Link to="/signup" className={styles.pricingButton}>
              Get started
            </Link>
          </div>

          {/* Premium Tier - Highlighted */}
          <div className={styles.pricingCardPremium}>
            <div className={styles.pricingPopular}>Most popular</div>
            <h3>Premium</h3>
            <div className={styles.pricingPrice}>
              $9.99<span>/month</span>
            </div>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Unlimited free transfers</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Premium metal card</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>12% APY on savings</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Priority 24/7 support</span>
              </li>
            </ul>
            <Link to="/signup" className={styles.pricingButtonPremium}>
              Upgrade to Premium
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Business Tier */}
          <div className={styles.pricingCard}>
            <h3>Business</h3>
            <div className={styles.pricingPrice}>
              $29<span>/month</span>
            </div>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Everything in Premium</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Multi-user access</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Payment gateway API</span>
              </li>
              <li className={styles.pricingFeature}>
                <CheckCircle className="w-5 h-5" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
            <Link to="/contact" className={styles.pricingButton}>
              Contact sales
            </Link>
          </div>
        </div>

        <p className={styles.pricingNote}>
          All plans include bank-level security, 24/7 support, and FDIC insurance up to $250,000.
        </p>
      </section>

      {/* ===== FAQ SECTION - Wise/Monzo Style ===== */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2>Frequently asked questions</h2>
          <p>Everything you need to know about our services</p>
        </div>

        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className={styles.faqQuestion}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`${styles.faqIcon} ${expandedFaq === index ? styles.faqIconRotated : ""}`} 
                />
              </button>
              {expandedFaq === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.faqMore}>
          <p>Still have questions?</p>
          <Link to="/contact" className={styles.faqContact}>
            Contact our support team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== CTA SECTION - Bold Fintech Style ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOrb1} />
          <div className={styles.ctaOrb2} />
        </div>
        
        <div className={styles.ctaContent}>
          <h2>Join 2.5 million people already banking smarter</h2>
          <p>Open your account in minutes. No paperwork. No branches. Just better banking.</p>
          <div className={styles.ctaButtons}>
            <Link to="/signup" className={styles.ctaPrimary}>
              Open your free account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className={styles.ctaSecondary}>
              <MessageCircle className="w-5 h-5" />
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUPPORT SECTION - 24/7 Support ===== */}
      <section className={styles.supportSection}>
        <h2>We're here 24/7</h2>
        <p>Real people, real support, anytime you need us</p>
        
        <div className={styles.supportGrid}>
          <div className={styles.supportCard}>
            <div className={styles.supportIcon} style={{ backgroundColor: '#0075FF15', color: '#0075FF' }}>
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3>Live chat</h3>
            <p>Average response: 2 minutes</p>
            <Link to="/contact" className={styles.supportLink}>
              Start chat
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.supportIcon} style={{ backgroundColor: '#8A2BE215', color: '#8A2BE2' }}>
              <Mail className="w-6 h-6" />
            </div>
            <h3>Email</h3>
            <p>Response within 24 hours</p>
            <Link to="/contact" className={styles.supportLink}>
              Send email
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.supportIcon} style={{ backgroundColor: '#34C75915', color: '#34C759' }}>
              <Phone className="w-6 h-6" />
            </div>
            <h3>Phone</h3>
            <p>Available 24/7 for urgent issues</p>
            <Link to="/contact" className={styles.supportLink}>
              Request call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}