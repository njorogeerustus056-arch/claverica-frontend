// src/pages/features/FeatureDetails.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Send, Wallet, PiggyBank, CreditCard, Receipt, Gift,
  ArrowRight, CheckCircle, TrendingUp, Globe, Shield,
  Zap, Clock, Users, DollarSign, Lock, BarChart3, Award, 
  RefreshCw, Bell, ChevronRight, Smartphone, Star,
  Calculator, Download, ShieldCheck, Building,
  Plane, QrCode, BarChart, PieChart, TrendingDown,
  Percent, Coins, Cpu, Target, FileText,
  Calendar, MapPin, MessageCircle, Headphones, HelpCircle,
  Settings, Repeat, Divide, Plus, Minus, ShoppingBag,
  Ticket, Hotel, Car, Coffee, Utensils, Film, Music,
  BookOpen, GamepadIcon, Phone, Mail, Monitor, Sparkles,
  Heart
} from "lucide-react";
import styles from './FeatureDetails.module.css';

export default function FeatureDetails() {
  const [activeFeature, setActiveFeature] = useState("transfers");
  const [transferAmount, setTransferAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GBP");
  const [cryptoAmount, setCryptoAmount] = useState(100);
  const [activeSavingsGoal, setActiveSavingsGoal] = useState("emergency");
  const [selectedCardTier, setSelectedCardTier] = useState("premium");
  const [showBalance, setShowBalance] = useState(false);

  // Exchange rates for calculator
  const exchangeRates: Record<string, number> = {
    "USD-GBP": 0.85,
    "USD-EUR": 0.92,
    "EUR-GBP": 0.88,
    "GBP-USD": 1.18,
    "EUR-USD": 1.09,
    "GBP-EUR": 1.14,
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if (section && features[section as keyof typeof features]) {
      setActiveFeature(section);
    }
  }, []);

  // Calculate transfer details
  const calculateTransfer = () => {
    const rateKey = `${fromCurrency}-${toCurrency}`;
    const rate = exchangeRates[rateKey] || 1;
    const fee = transferAmount > 1000 ? 0.0049 * transferAmount : 4.99;
    const received = (transferAmount - fee) * rate;
    const bankFee = transferAmount * 0.03 + 25;
    const savings = bankFee - fee;
    
    return { rate, fee, received, bankFee, savings };
  };

  const transferResult = calculateTransfer();

  // AI Insights Data
  const aiInsights = {
    transfers: [
      { title: "Smart Routing", desc: "AI finds cheapest transfer path in real-time", savings: "Save 15-30%" },
      { title: "Predictive Timing", desc: "Suggests best time to transfer for best rates", savings: "Get 0.5% better rates" },
      { title: "Fee Optimization", desc: "Automatically applies promo codes and discounts", savings: "Save $5-20 per transfer" }
    ],
    crypto: [
      { title: "Smart Orders", desc: "AI executes trades at optimal prices automatically", savings: "Increase profits by 8%" },
      { title: "Risk Assessment", desc: "Analyzes portfolio and suggests diversification", savings: "Reduce risk by 25%" },
      { title: "Market Predictions", desc: "Uses ML to identify emerging trends early", savings: "Early entry advantage" }
    ],
    savings: [
      { title: "Auto-Roundups", desc: "AI rounds up purchases and invests spare change", savings: "Save $500+/year" },
      { title: "Goal Optimization", desc: "Adjusts savings rate based on your spending", savings: "Reach goals 30% faster" },
      { title: "Interest Maximizer", desc: "Moves funds between accounts for best rates", savings: "Earn 0.5% more APY" }
    ],
    cards: [
      { title: "Spending Insights", desc: "AI categorizes and analyzes your spending", savings: "Identify 20% waste" },
      { title: "Cashback Optimizer", desc: "Suggests best card for each purchase type", savings: "Maximize cashback" },
      { title: "Fraud Prevention", desc: "ML detects unusual patterns instantly", savings: "100% fraud protection" }
    ],
    bills: [
      { title: "Bill Negotiation", desc: "AI negotiates better rates with providers", savings: "Save $300/year" },
      { title: "Subscription Audit", desc: "Finds and cancels unused subscriptions", savings: "Save $50/month" },
      { title: "Payment Optimization", desc: "Times payments for best cash flow", savings: "Improve credit score" }
    ],
    rewards: [
      { title: "Points Maximizer", desc: "AI finds best ways to earn more points", savings: "Earn 2x more points" },
      { title: "Redemption Advisor", desc: "Suggests best value redemption options", savings: "Get 30% more value" },
      { title: "Partner Offers", desc: "Personalized offers based on your habits", savings: "Exclusive discounts" }
    ]
  };

  const features = {
    transfers: {
      title: "Global Money Transfers",
      subtitle: "Send money worldwide instantly with real-time exchange rates",
      gradient: styles.gradientPurple,
      icon: <Send className={styles.featureNavIcon} />,
      heroImage: "💸",
      stats: [
        { value: "180+", label: "Countries", icon: <Globe className={styles.statIcon} />, detail: "Global coverage" },
        { value: "<30s", label: "Transfer Time", icon: <Zap className={styles.statIcon} />, detail: "Instant arrival" },
        { value: "$0", label: "Hidden Fees", icon: <Shield className={styles.statIcon} />, detail: "Transparent pricing" },
        { value: "150+", label: "Currencies", icon: <DollarSign className={styles.statIcon} />, detail: "Wide support" }
      ],
      benefits: [
        { 
          icon: <Zap className={styles.benefitIcon} />, 
          title: "Lightning-Fast Transfers", 
          desc: "Send money instantly to 180+ countries. Real-time processing ensures funds arrive in under 30 seconds."
        },
        { 
          icon: <Globe className={styles.benefitIcon} />, 
          title: "Global Reach", 
          desc: "Access every major currency and local payment method worldwide. From USD to KES, we've got you covered."
        },
        { 
          icon: <Calculator className={styles.benefitIcon} />, 
          title: "Transparent Pricing", 
          desc: "See exact exchange rates and fees upfront. No hidden charges, no surprises. Mid-market rates guaranteed."
        },
        { 
          icon: <ShieldCheck className={styles.benefitIcon} />, 
          title: "Bank-Level Security", 
          desc: "256-bit encryption, real-time fraud monitoring, and FDIC insurance on all transfers."
        }
      ],
      howItWorks: [
        {
          step: 1,
          title: "Select Destination",
          description: "Choose from 180+ countries and 150+ currencies",
          icon: <Globe className={styles.howItWorksIcon} />
        },
        {
          step: 2,
          title: "Enter Amount",
          description: "See live exchange rate and total fees instantly",
          icon: <Calculator className={styles.howItWorksIcon} />
        },
        {
          step: 3,
          title: "Verify & Send",
          description: "Confirm with biometric authentication",
          icon: <Shield className={styles.howItWorksIcon} />
        },
        {
          step: 4,
          title: "Money Arrives",
          description: "Recipient gets funds in under 30 seconds",
          icon: <CheckCircle className={styles.howItWorksIcon} />
        }
      ],
      features: [
        "Real-time exchange rates updated every second",
        "Send to bank accounts, mobile wallets, or cash pickup locations",
        "Bulk transfers for businesses and payroll (up to 1000 recipients)",
        "24/7 multilingual customer support",
        "Transfer history with downloadable receipts",
        "Recurring and scheduled transfers",
        "Multi-currency direct debits",
        "Forward contracts for businesses"
      ],
      comparison: [
        { provider: "Traditional Banks", fee: "$45.50", speed: "3-5 days", rate: "Poor (+2% markup)" },
        { provider: "PayPal", fee: "$34.99", speed: "Instant", rate: "Average (+1.5% markup)" },
        { provider: "Wise", fee: "$8.45", speed: "1-2 hours", rate: "Good (mid-market)" },
        { provider: "ClaveRica", fee: "$4.99", speed: "<30 seconds", rate: "Excellent (mid-market)" }
      ],
      useCases: [
        {
          title: "Families Abroad",
          description: "Send money home with 85% lower fees",
          icon: "👨‍👩‍👧‍👦",
          savings: "$450/year"
        },
        {
          title: "Freelancers",
          description: "Get paid instantly from international clients",
          icon: "💼",
          savings: "$1,200/year"
        },
        {
          title: "Students Overseas",
          description: "Pay tuition and living expenses easily",
          icon: "🎓",
          savings: "$300/semester"
        },
        {
          title: "Small Businesses",
          description: "Pay international suppliers efficiently",
          icon: "🏢",
          savings: "$2,500/year"
        }
      ],
      testimonial: {
        text: "I send money home to Mexico every month. ClaveRica saved me over $3,000 in fees last year alone. The transfers are instant and my family gets every dollar I send.",
        name: "Carlos M.",
        role: "Business Owner",
        country: "Mexico",
        avatar: "CM"
      }
    },
    crypto: {
      title: "Crypto Trading",
      subtitle: "Trade 50+ cryptocurrencies 24/7 with professional tools",
      gradient: styles.gradientGoldPurple,
      icon: <Wallet className={styles.featureNavIcon} />,
      heroImage: "₿",
      stats: [
        { value: "50+", label: "Cryptocurrencies", icon: <Coins className={styles.statIcon} />, detail: "Wide selection" },
        { value: "24/7", label: "Trading", icon: <Clock className={styles.statIcon} />, detail: "Always open" },
        { value: "95%", label: "Cold Storage", icon: <Lock className={styles.statIcon} />, detail: "Maximum security" },
        { value: "<1ms", label: "Trade Speed", icon: <Zap className={styles.statIcon} />, detail: "Instant execution" }
      ],
      benefits: [
        { 
          icon: <Lock className={styles.benefitIcon} />, 
          title: "Maximum Security", 
          desc: "95% of assets in cold storage with multi-signature protection. $250M insurance coverage."
        },
        { 
          icon: <Zap className={styles.benefitIcon} />, 
          title: "Institutional-Grade Trading", 
          desc: "Execute trades in milliseconds with our high-performance matching engine. Zero slippage."
        },
        { 
          icon: <BarChart3 className={styles.benefitIcon} />, 
          title: "Professional Tools", 
          desc: "Advanced charting, 100+ indicators, market depth, and real-time analytics."
        },
        { 
          icon: <ShieldCheck className={styles.benefitIcon} />, 
          title: "Fully Insured", 
          desc: "Your crypto holdings are insured against theft, hacks, and unauthorized access."
        }
      ],
      howItWorks: [
        {
          step: 1,
          title: "Browse Markets",
          description: "Explore 50+ cryptocurrencies with real-time charts",
          icon: <BarChart className={styles.howItWorksIcon} />
        },
        {
          step: 2,
          title: "Choose Order Type",
          description: "Market, limit, stop-loss, or OCO orders",
          icon: <Settings className={styles.howItWorksIcon} />
        },
        {
          step: 3,
          title: "Execute Trade",
          description: "Instant execution with <1ms latency",
          icon: <Zap className={styles.howItWorksIcon} />
        },
        {
          step: 4,
          title: "Track Portfolio",
          description: "Real-time P&L and performance analytics",
          icon: <TrendingUp className={styles.howItWorksIcon} />
        }
      ],
      features: [
        "Buy Bitcoin, Ethereum, Solana, and 47+ other cryptocurrencies",
        "Advanced order types: market, limit, stop-loss, and OCO",
        "Portfolio tracking with real-time profit/loss calculations",
        "Price alerts and trading notifications",
        "Recurring crypto purchases (DCA strategy)",
        "Instant crypto-to-fiat withdrawals",
        "Staking with up to 15% APY",
        "NFT marketplace integration"
      ],
      cryptoList: [
        { name: "Bitcoin", symbol: "BTC", price: "$65,432", change: "+2.5%", marketCap: "$1.2T" },
        { name: "Ethereum", symbol: "ETH", price: "$3,542", change: "+1.8%", marketCap: "$425B" },
        { name: "Solana", symbol: "SOL", price: "$182", change: "+5.2%", marketCap: "$81B" },
        { name: "Cardano", symbol: "ADA", price: "$0.62", change: "-0.5%", marketCap: "$22B" },
        { name: "Polkadot", symbol: "DOT", price: "$7.85", change: "+3.1%", marketCap: "$10B" },
        { name: "Dogecoin", symbol: "DOGE", price: "$0.15", change: "+8.2%", marketCap: "$21B" }
      ],
      testimonial: {
        text: "The crypto trading platform is incredibly smooth. I've been trading for 3 years and this is by far the best experience I've had. Fast execution and great security.",
        name: "Liam Chen",
        role: "Tech Founder",
        country: "Singapore",
        avatar: "LC"
      }
    },
    savings: {
      title: "High-Yield Savings",
      subtitle: "Earn up to 12% APY with daily compounding interest",
      gradient: styles.gradientTeal,
      icon: <PiggyBank className={styles.featureNavIcon} />,
      heroImage: "💰",
      stats: [
        { value: "12%", label: "Max APY", icon: <TrendingUp className={styles.statIcon} />, detail: "Industry leading" },
        { value: "$0", label: "Minimum", icon: <DollarSign className={styles.statIcon} />, detail: "Start any amount" },
        { value: "Daily", label: "Compounding", icon: <RefreshCw className={styles.statIcon} />, detail: "Maximize growth" },
        { value: "$250K", label: "FDIC Insured", icon: <Shield className={styles.statIcon} />, detail: "Full protection" }
      ],
      benefits: [
        { 
          icon: <TrendingUp className={styles.benefitIcon} />, 
          title: "Industry-Leading Rates", 
          desc: "Earn up to 12% APY - 40x higher than traditional banks. Watch your money grow faster."
        },
        { 
          icon: <RefreshCw className={styles.benefitIcon} />, 
          title: "Daily Compounding", 
          desc: "Interest compounds daily, maximizing your earnings. Every day your balance grows."
        },
        { 
          icon: <Target className={styles.benefitIcon} />, 
          title: "Goal-Based Savings", 
          desc: "Set specific goals and track progress with automated contributions."
        },
        { 
          icon: <ShieldCheck className={styles.benefitIcon} />, 
          title: "FDIC Protected", 
          desc: "Your savings are FDIC insured up to $250,000. Your money is safe."
        }
      ],
      howItWorks: [
        {
          step: 1,
          title: "Open Account",
          description: "Set up in 2 minutes with no paperwork",
          icon: <Plus className={styles.howItWorksIcon} />
        },
        {
          step: 2,
          title: "Deposit Funds",
          description: "Transfer from any bank instantly",
          icon: <Download className={styles.howItWorksIcon} />
        },
        {
          step: 3,
          title: "Watch Growth",
          description: "Interest compounds daily automatically",
          icon: <TrendingUp className={styles.howItWorksIcon} />
        },
        {
          step: 4,
          title: "Withdraw Anytime",
          description: "Access funds instantly with no penalties",
          icon: <Minus className={styles.howItWorksIcon} />
        }
      ],
      features: [
        "Automatic round-up savings from card purchases",
        "Recurring deposit scheduling (weekly, bi-weekly, monthly)",
        "Goal-based savings tracking with progress visualization",
        "Bonus loyalty tier rewards for higher balances",
        "Interest rate boost promotions for new savers",
        "Instant withdrawals 24/7 with no penalties",
        "Joint savings accounts for families",
        "Tax-advantaged savings options"
      ],
      savingsGoals: [
        { name: "Emergency Fund", target: "$10,000", saved: "$4,200", color: styles.goalBlue },
        { name: "Dream Vacation", target: "$5,000", saved: "$1,800", color: styles.goalPurple },
        { name: "New Car", target: "$25,000", saved: "$8,500", color: styles.goalTeal },
        { name: "Home Down Payment", target: "$50,000", saved: "$12,300", color: styles.goalGold }
      ],
      testimonial: {
        text: "12% APY is unbelievable! My savings have grown faster in 6 months with ClaveRica than in 5 years with my old bank. This is the future of banking.",
        name: "Sofia Rodriguez",
        role: "Freelancer",
        country: "Spain",
        avatar: "SR"
      }
    },
    cards: {
      title: "Premium Cards",
      subtitle: "Metal cards with exclusive travel benefits and cashback",
      gradient: styles.gradientGold,
      icon: <CreditCard className={styles.featureNavIcon} />,
      heroImage: "💳",
      stats: [
        { value: "3%", label: "Max Cashback", icon: <TrendingUp className={styles.statIcon} />, detail: "Unlimited earnings" },
        { value: "60M+", label: "Locations", icon: <Globe className={styles.statIcon} />, detail: "Global acceptance" },
        { value: "$0", label: "Foreign Fees", icon: <DollarSign className={styles.statIcon} />, detail: "Travel freely" },
        { value: "1,200+", label: "Lounge Access", icon: <Plane className={styles.statIcon} />, detail: "Airport lounges" }
      ],
      benefits: [
        { 
          icon: <TrendingUp className={styles.benefitIcon} />, 
          title: "Premium Cashback", 
          desc: "Earn up to 3% cashback on all purchases. Unlimited earnings with no caps."
        },
        { 
          icon: <Globe className={styles.benefitIcon} />, 
          title: "Global Acceptance", 
          desc: "Use your card at 60M+ locations worldwide. Zero foreign transaction fees."
        },
        { 
          icon: <Plane className={styles.benefitIcon} />, 
          title: "Travel Benefits", 
          desc: "Complimentary access to 1,200+ airport lounges globally. Travel insurance included."
        },
        { 
          icon: <ShieldCheck className={styles.benefitIcon} />, 
          title: "Purchase Protection", 
          desc: "Built-in insurance, extended warranty, and fraud protection on all purchases."
        }
      ],
      howItWorks: [
        {
          step: 1,
          title: "Choose Tier",
          description: "Select from Standard, Gold, or Platinum",
          icon: <Settings className={styles.howItWorksIcon} />
        },
        {
          step: 2,
          title: "Apply Online",
          description: "2-minute application with instant approval",
          icon: <FileText className={styles.howItWorksIcon} />
        },
        {
          step: 3,
          title: "Receive Card",
          description: "Get metal card in 5-7 business days",
          icon: <Download className={styles.howItWorksIcon} />
        },
        {
          step: 4,
          title: "Start Earning",
          description: "Immediate cashback on all purchases",
          icon: <DollarSign className={styles.howItWorksIcon} />
        }
      ],
      features: [
        "Contactless payments with Apple Pay & Google Pay",
        "Virtual cards for secure online shopping",
        "Instant freeze/unfreeze from the app",
        "Real-time spending notifications and insights",
        "No foreign transaction fees on international purchases",
        "Purchase protection and extended warranty coverage",
        "Travel insurance and concierge service",
        "Spending analytics and budgeting tools"
      ],
      testimonial: {
        text: "The Platinum card pays for itself. The airport lounge access alone saves me hundreds every month, and the 3% cashback is incredible. Best card I've ever owned.",
        name: "Aisha Al-Sayed",
        role: "Entrepreneur",
        country: "UAE",
        avatar: "AS"
      }
    },
    bills: {
      title: "Bill Payments",
      subtitle: "Pay all your bills automatically in one place",
      gradient: styles.gradientPurplePink,
      icon: <Receipt className={styles.featureNavIcon} />,
      heroImage: "📄",
      stats: [
        { value: "5,000+", label: "Billers", icon: <Receipt className={styles.statIcon} />, detail: "Wide coverage" },
        { value: "0.5%", label: "Cashback", icon: <TrendingUp className={styles.statIcon} />, detail: "Earn on payments" },
        { value: "Instant", label: "Processing", icon: <Zap className={styles.statIcon} />, detail: "No delays" },
        { value: "Auto-Pay", label: "Available", icon: <CheckCircle className={styles.statIcon} />, detail: "Never miss a bill" }
      ],
      benefits: [
        { 
          icon: <Clock className={styles.benefitIcon} />, 
          title: "Never Miss a Payment", 
          desc: "Schedule payments in advance and set up automatic recurring payments. Smart reminders ensure you're never late."
        },
        { 
          icon: <Bell className={styles.benefitIcon} />, 
          title: "Smart Reminders", 
          desc: "Receive push notifications 3 days before each bill is due with exact amounts. Stay in control."
        },
        { 
          icon: <Calculator className={styles.benefitIcon} />, 
          title: "Earn Cashback", 
          desc: "Get 0.5% cashback on all bill payments. Save money while paying your bills."
        },
        { 
          icon: <PieChart className={styles.benefitIcon} />, 
          title: "Spending Insights", 
          desc: "Track your bill payments, identify spending patterns, and optimize your budget."
        }
      ],
      howItWorks: [
        {
          step: 1,
          title: "Add Billers",
          description: "Connect utilities, subscriptions, and services",
          icon: <Plus className={styles.howItWorksIcon} />
        },
        {
          step: 2,
          title: "Set Schedule",
          description: "Choose one-time, recurring, or auto-pay",
          icon: <Calendar className={styles.howItWorksIcon} />
        },
        {
          step: 3,
          title: "Get Notified",
          description: "Reminders 3 days before due date",
          icon: <Bell className={styles.howItWorksIcon} />
        },
        {
          step: 4,
          title: "Pay Instantly",
          description: "Process payments with digital receipts",
          icon: <CheckCircle className={styles.howItWorksIcon} />
        }
      ],
      features: [
        "Pay utilities, subscriptions, insurance, rent, and tuition",
        "Earn 0.5% cashback on all bill payments",
        "Split bills with roommates or family members",
        "Bill forecasting and budget tracking",
        "Payment history export for tax purposes",
        "Custom payment categories and tags",
        "Subscription management and cancellation",
        "Bulk payments for businesses"
      ],
      testimonial: {
        text: "I used to spend hours every month paying bills across different platforms. Now everything is in one place, auto-paid, and I even earn cashback. It's brilliant!",
        name: "Marcus Johnson",
        role: "Software Engineer",
        country: "USA",
        avatar: "MJ"
      }
    },
    rewards: {
      title: "Rewards Program",
      subtitle: "Earn points on every transaction and redeem for amazing rewards",
      gradient: styles.gradientGoldPurple,
      icon: <Gift className={styles.featureNavIcon} />,
      heroImage: "🎁",
      stats: [
        { value: "3x", label: "Max Multiplier", icon: <TrendingUp className={styles.statIcon} />, detail: "Highest tier" },
        { value: "Every $1", label: "Earns Points", icon: <DollarSign className={styles.statIcon} />, detail: "All spending" },
        { value: "500+", label: "Reward Options", icon: <Gift className={styles.statIcon} />, detail: "Flexible redemption" },
        { value: "Never", label: "Points Expire", icon: <Clock className={styles.statIcon} />, detail: "Use anytime" }
      ],
      benefits: [
        { 
          icon: <TrendingUp className={styles.benefitIcon} />, 
          title: "Earn Everywhere", 
          desc: "Earn points on card purchases, bill payments, transfers, crypto trades - every transaction rewards you."
        },
        { 
          icon: <Award className={styles.benefitIcon} />, 
          title: "Loyalty Tiers", 
          desc: "Climb through Bronze, Silver, Gold, and Platinum tiers to earn up to 3x points on every dollar."
        },
        { 
          icon: <Gift className={styles.benefitIcon} />, 
          title: "Flexible Redemption", 
          desc: "Redeem points for cash back, travel bookings, gift cards, bill credits, or exclusive merchandise."
        },
        { 
          icon: <Users className={styles.benefitIcon} />, 
          title: "Referral Bonuses", 
          desc: "Earn 500 bonus points for every friend you refer. They get 500 points too. Build rewards together."
        }
      ],
      howItWorks: [
        {
          step: 1,
          title: "Earn Points",
          description: "1-3 points per $1 spent based on your tier",
          icon: <Plus className={styles.howItWorksIcon} />
        },
        {
          step: 2,
          title: "Climb Tiers",
          description: "Higher balances unlock better rewards",
          icon: <TrendingUp className={styles.howItWorksIcon} />
        },
        {
          step: 3,
          title: "Track Balance",
          description: "Real-time points dashboard",
          icon: <DollarSign className={styles.howItWorksIcon} />
        },
        {
          step: 4,
          title: "Redeem Instantly",
          description: "Cash, travel, gift cards, and more",
          icon: <Gift className={styles.howItWorksIcon} />
        }
      ],
      features: [
        "Earn 1-3 points per $1 spent based on your tier",
        "Bonus points on partner merchant purchases",
        "Points never expire - save them forever",
        "Instant redemption with no blackout dates",
        "Transfer points between family members",
        "Special promotional earning opportunities",
        "Exclusive member-only events",
        "Charity donation options"
      ],
      testimonial: {
        text: "I've earned over 50,000 points in just 6 months. Redeemed them for a family vacation - completely free! The rewards program is incredibly generous.",
        name: "Elena Popescu",
        role: "Marketing Director",
        country: "Romania",
        avatar: "EP"
      }
    }
  };

  const currentFeature = features[activeFeature as keyof typeof features];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            ClaveRica
          </Link>
          <div className={styles.headerActions}>
            <Link 
              to="/"
              className={styles.backLink}
            >
              ← Back to Home
            </Link>
            <Link 
              to="/signup"
              className={styles.btnPrimary}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Feature Navigation */}
      <section className={styles.featureNav}>
        <div className={styles.featureNavContainer}>
          <div className={styles.featureNavScroll}>
            {Object.entries(features).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setActiveFeature(key)}
                className={`${styles.featureNavButton} ${activeFeature === key ? styles.featureNavButtonActive : ''} ${activeFeature === key ? feature.gradient : ''}`}
              >
                <span className={styles.featureNavIconWrapper}>{feature.icon}</span>
                <span className={styles.featureNavText}>{feature.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={`${styles.heroSection} ${currentFeature.gradient}`}>
        <div className={styles.heroBackground} />
        
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.heroImage}
          >
            {currentFeature.heroImage}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.heroTitle}
          >
            {currentFeature.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.heroSubtitle}
          >
            {currentFeature.subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.heroStats}
          >
            {currentFeature.stats.map((stat, idx) => (
              <div key={idx} className={styles.heroStatCard}>
                <div className={styles.heroStatIcon}>{stat.icon}</div>
                <p className={styles.heroStatValue}>{stat.value}</p>
                <p className={styles.heroStatLabel}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className={styles.mainContent}>
        {/* Main Benefits */}
        <section className={styles.benefitsSection}>
          <h2 className={styles.sectionTitle}>
            Why Choose{" "}
            <span className={styles.sectionTitleHighlight}>
              {currentFeature.title}
            </span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Discover the powerful features that make ClaveRica the best choice for your financial needs
          </p>

          <div className={styles.benefitsGrid}>
            {currentFeature.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.benefitCard}
              >
                <div className={`${styles.benefitIconContainer} ${currentFeature.gradient}`}>
                  {benefit.icon}
                </div>
                <h3 className={styles.benefitCardTitle}>{benefit.title}</h3>
                <p className={styles.benefitCardDesc}>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI-Powered Insights Section */}
        <section className={styles.aiSection}>
          <div className={styles.aiContainer}>
            <div className={styles.aiHeader}>
              <div className={styles.aiIconContainer}>
                <Cpu className={styles.aiIcon} />
              </div>
              <div>
                <h2 className={styles.aiTitle}>AI-Powered Insights</h2>
                <p className={styles.aiSubtitle}>Smart features that help you save more and earn more</p>
              </div>
            </div>
            
            <div className={styles.aiGrid}>
              {(aiInsights[activeFeature as keyof typeof aiInsights] || []).map((insight: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={styles.aiCard}
                >
                  <h3 className={styles.aiCardTitle}>{insight.title}</h3>
                  <p className={styles.aiCardDesc}>{insight.desc}</p>
                  <div className={styles.aiCardBadge}>
                    <Sparkles className={styles.aiCardIcon} />
                    {insight.savings}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Transfer Calculator (for transfers feature) */}
        {activeFeature === "transfers" && (
          <section className={styles.calculatorSection}>
            <div className={styles.calculatorContainer}>
              <div className={styles.calculatorHeader}>
                <h2 className={styles.calculatorTitle}>Live Transfer Calculator</h2>
                <p className={styles.calculatorSubtitle}>See exactly how much you'll save compared to traditional banks</p>
              </div>
              
              <div className={styles.calculatorGrid}>
                <div className={styles.calculatorCard}>
                  <div className={styles.calculatorForm}>
                    <div>
                      <label className={styles.calculatorLabel}>You send</label>
                      <div className={styles.calculatorInput}>
                        <div className={styles.calculatorInputField}>
                          <input 
                            type="number" 
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(parseFloat(e.target.value) || 0)}
                            className={styles.calculatorNumberInput}
                            min="1"
                          />
                        </div>
                        <select 
                          value={fromCurrency}
                          onChange={(e) => setFromCurrency(e.target.value)}
                          className={styles.calculatorSelect}
                        >
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                          <option>JPY</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className={styles.calculatorLabel}>They receive</label>
                      <div className={`${styles.calculatorInput} ${styles.calculatorInputDisabled}`}>
                        <div className={styles.calculatorInputField}>
                          <div className={styles.calculatorResult}>
                            {transferResult.received.toLocaleString(undefined, { 
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2 
                            })} {toCurrency}
                          </div>
                        </div>
                        <select 
                          value={toCurrency}
                          onChange={(e) => setToCurrency(e.target.value)}
                          className={styles.calculatorSelect}
                        >
                          <option>GBP</option>
                          <option>EUR</option>
                          <option>USD</option>
                          <option>JPY</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className={styles.calculatorSavings}>
                      <div>
                        <div className={styles.calculatorSavingsLabel}>You save vs banks</div>
                        <div className={styles.calculatorSavingsAmount}>${transferResult.savings.toFixed(2)}</div>
                      </div>
                      <div className={styles.calculatorFee}>
                        <div className={styles.calculatorFeeLabel}>Our fee</div>
                        <div className={styles.calculatorFeeAmount}>${transferResult.fee.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.comparisonCard}>
                  <h3 className={styles.comparisonTitle}>Comparison with Competitors</h3>
                  <div className={styles.comparisonList}>
                    {(currentFeature as any).comparison?.map((comp: any, idx: number) => (
                      <div key={idx} className={styles.comparisonItem}>
                        <span className={`${styles.comparisonProvider} ${comp.provider === "ClaveRica" ? styles.comparisonProviderHighlight : ''}`}>
                          {comp.provider}
                        </span>
                        <div className={styles.comparisonDetails}>
                          <span className={styles.comparisonFee}>{comp.fee}</span>
                          <span className={styles.comparisonSpeed}>{comp.speed}</span>
                          <span className={`${styles.comparisonRate} ${
                            comp.rate === "Excellent" ? styles.rateExcellent :
                            comp.rate === "Good" ? styles.rateGood :
                            comp.rate === "Average" ? styles.rateAverage :
                            styles.ratePoor
                          }`}>
                            {comp.rate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Crypto Live Prices (for crypto feature) */}
        {activeFeature === "crypto" && (currentFeature as any).cryptoList && (
          <section className={styles.cryptoSecion}>
            <div className={`${styles.cryptoContainer} ${currentFeature.gradient}`}>
              <div className={styles.cryptoHeader}>
                <h3 className={styles.cryptoTitle}>Live Crypto Prices</h3>
                <p className={styles.cryptoSubtitle}>Real-time prices for top cryptocurrencies</p>
              </div>
              
              <div className={styles.cryptoGrid}>
                {(currentFeature as any).cryptoList.map((crypto: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={styles.cryptoCard}
                  >
                    <div className={styles.cryptoCardHeader}>
                      <div>
                        <p className={styles.cryptoName}>{crypto.name}</p>
                        <p className={styles.cryptoSymbol}>{crypto.symbol}</p>
                      </div>
                      <div className={`${styles.cryptoChange} ${
                        crypto.change.startsWith('+') ? styles.cryptoChangePositive : styles.cryptoChangeNegative
                      }`}>
                        {crypto.change}
                      </div>
                    </div>
                    <p className={styles.cryptoPrice}>{crypto.price}</p>
                    <p className={styles.cryptoMarketCap}>Market Cap: {crypto.marketCap}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className={styles.howItWorksSection}>
          <div className={styles.howItWorksContainer}>
            <h2 className={styles.howItWorksTitle}>How It Works</h2>
            <div className={styles.howItWorksGrid}>
              {currentFeature.howItWorks.map((step: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={styles.howItWorksCard}
                >
                  <div className={`${styles.howItWorksStep} ${currentFeature.gradient}`}>
                    {idx + 1}
                  </div>
                  <div className={styles.howItWorksIconWrapper}>
                    {step.icon}
                  </div>
                  <h3 className={styles.howItWorksCardTitle}>{step.title}</h3>
                  <p className={styles.howItWorksCardDesc}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className={styles.featuresListSection}>
          <h2 className={styles.sectionTitle}>
            Powerful Features
          </h2>
          <p className={styles.sectionSubtitle}>
            Everything you need, all in one place
          </p>

          <div className={styles.featuresListContainer}>
            <div className={styles.featuresListGrid}>
              {currentFeature.features.map((feature: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={styles.featuresListItem}
                >
                  <CheckCircle className={`${styles.featuresListIcon} ${currentFeature.gradient}`} />
                  <p className={styles.featuresListText}>{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Savings Goals Visualization (for savings feature) */}
        {activeFeature === "savings" && (currentFeature as any).savingsGoals && (
          <section className={styles.goalsSection}>
            <div className={styles.goalsContainer}>
              <h2 className={styles.sectionTitle}>Savings Goals</h2>
              <div className={styles.goalsGrid}>
                {(currentFeature as any).savingsGoals.map((goal: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${styles.goalCard} ${goal.color}`}
                  >
                    <h3 className={styles.goalCardTitle}>{goal.name}</h3>
                    <div className={styles.goalCardAmount}>
                      ${goal.saved} / ${goal.target}
                    </div>
                    <div className={styles.goalProgress}>
                      <div 
                        className={styles.goalProgressFill}
                        style={{ width: `${(parseInt(goal.saved.replace('$', '').replace(',', '')) / parseInt(goal.target.replace('$', '').replace(',', ''))) * 100}%` }}
                      />
                    </div>
                    <p className={styles.goalPercentage}>
                      {Math.round((parseInt(goal.saved.replace('$', '').replace(',', '')) / parseInt(goal.target.replace('$', '').replace(',', ''))) * 100)}% Complete
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Use Cases (for transfers feature) */}
        {activeFeature === "transfers" && (currentFeature as any).useCases && (
          <section className={styles.useCasesSection}>
            <div className={styles.useCasesContainer}>
              <h2 className={styles.sectionTitle}>Perfect For</h2>
              <div className={styles.useCasesGrid}>
                {(currentFeature as any).useCases.map((useCase: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={styles.useCaseCard}
                  >
                    <div className={styles.useCaseIcon}>{useCase.icon}</div>
                    <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
                    <p className={styles.useCaseDesc}>{useCase.description}</p>
                    <div className={styles.useCaseSavings}>
                      <TrendingUp className={styles.useCaseSavingsIcon} />
                      {useCase.savings}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {currentFeature.testimonial && (
          <section className={styles.testimonialSection}>
            <div className={styles.testimonialContainer}>
              <div className={styles.testimonialStars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={styles.testimonialStar} fill="currentColor" />
                ))}
              </div>
              <p className={styles.testimonialText}>
                "{currentFeature.testimonial.text}"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  {currentFeature.testimonial.avatar}
                </div>
                <div>
                  <p className={styles.testimonialName}>{currentFeature.testimonial.name}</p>
                  <p className={styles.testimonialMeta}>{currentFeature.testimonial.role} • {currentFeature.testimonial.country}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className={`${styles.ctaSection} ${currentFeature.gradient}`}>
          <div className={styles.ctaBackground}>
            <div className={styles.ctaPulse1} />
            <div className={styles.ctaPulse2} />
          </div>
          
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Get Started?
            </h2>
            <p className={styles.ctaDescription}>
              Join 5M+ users and experience the future of {currentFeature.title.toLowerCase()}
            </p>
            <div className={styles.ctaButtons}>
              <Link 
                to="/signup"
                className={styles.ctaButtonPrimary}
              >
                Open Free Account
                <ArrowRight className={styles.ctaButtonArrow} />
              </Link>
              <Link 
                to="/contact"
                className={styles.ctaButtonSecondary}
              >
                Contact Sales
              </Link>
            </div>
            <p className={styles.ctaDisclaimer}>
              No credit card required • Set up in 2 minutes • FDIC Insured
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}