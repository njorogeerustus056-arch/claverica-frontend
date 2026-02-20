import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Calculator, Shield, Zap, Globe, CreditCard,
  Smartphone, Lock, TrendingUp, Users, Star, Check, X, RefreshCw,
  BarChart3, DollarSign, Clock, Code, Terminal, PlayCircle, Bell,
  MessageCircle, ChevronDown, HelpCircle, Home, Layers, Menu,
} from "lucide-react";
import { projects } from "@/data/projects";
import styles from "./ProjectDetails.module.css";

/* ── Map project slugs to their image filenames ─────────────────────────── */
const projectImages: Record<string, string> = {
  "instant-global-payments": "/images/Project/instant-global-payments.jpg",
  "multi-currency": "/images/Project/multi-currency.jpg",
  "crypto-exchange-platform": "/images/Project/crypto-exchange-platform.jpg",
  "business-banking-suite": "/images/Project/business-banking-suite.jpg",
  "fraud-detection-ai": "/images/Project/fraud-detection-ai.jpg",
  "smart-investment-portfolio": "/images/Project/smart-investment-portfolio.jpg",
  "remittance-corridors": "/images/Project/remittance-corridors.jpg",
  "high-yield-savings-vaults": "/images/Project/high-yield-savings-vaults.jpg",
  "card-payments": "/images/Project/card-payments.jpg",
  "bnpl": "/images/Project/bnpl.jpg",
  "checkout-api": "/images/Project/checkout-api.jpg",
  "subscriptions": "/images/Project/subscriptions.jpg",
  "sme-loans": "/images/Project/sme-loans.jpg",
  "expense-tracking-plus": "/images/Project/expense-tracking-plus.jpg",
  "global-cards": "/images/Project/global-cards.jpg",
  "nft-vault": "/images/Project/nft-vault.jpg",
  "peer-to-peer-lending": "/images/Project/peer-to-peer-lending.jpg",
  "student-banking": "/images/Project/student-banking.jpg",
  "charity-remittance": "/images/Project/charity-remittance.jpg",
  "kyc": "/images/Project/kyc.jpg",
};

/* ── Exchange rates (relative to USD) ───────────────────────────────────── */
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5,
  CAD: 1.36, AUD: 1.54, CHF: 0.88, SGD: 1.34,
};

/* ════════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ════════════════════════════════════════════════════════════════════════════ */
function useCounter(end: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let raf: number, start: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * ease));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return val;
}

function AnimatedStat({ value, label, icon: Icon, color }: {
  value: string; label: string; icon: any; color: string;
}) {
  const num    = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "").trim();
  const count  = useCounter(num);
  return (
    <div className={styles.statCard}>
      <Icon className={`w-9 h-9 ${color} mx-auto`} />
      <div className={styles.statNumber}>{count.toLocaleString()}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MINI BAR CHART
   ════════════════════════════════════════════════════════════════════════════ */
const CHART_PERIODS = {
  "3M": [42,58,61,55,70,78,65,82,90,87,94,100],
  "6M": [30,40,55,50,65,72,60,77,84,80,89,100],
  "1Y": [18,26,38,44,52,58,54,63,75,79,88,100],
} as const;

function MiniChart() {
  const [period, setPeriod]   = useState<keyof typeof CHART_PERIODS>("3M");
  const [hovered, setHovered] = useState<number | null>(null);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const data   = CHART_PERIODS[period];
  const max    = Math.max(...data);
  const total  = data.reduce((s, v) => s + v, 0);
  const avg    = (total / data.length).toFixed(1);
  const peak   = data.indexOf(max);

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h4 className={styles.chartTitle}>Transaction Volume</h4>
          <p className="text-xs text-[#475569] mt-0.5">Monthly performance overview</p>
        </div>
        <div className={styles.chartPeriodBtns}>
          {(Object.keys(CHART_PERIODS) as (keyof typeof CHART_PERIODS)[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`${styles.chartPeriodBtn} ${period === p ? styles.chartPeriodBtnActive : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.chartBars}>
        {data.map((v, i) => (
          <div
            key={i}
            className={styles.chartBarCol}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={styles.chartBarFill}
              style={{ height: `${(v / max) * 100}%` }}
            >
              {hovered === i && (
                <div className={styles.chartBarTooltip}>${v}K</div>
              )}
            </div>
            <span className={styles.chartBarLabel}>{months[i]}</span>
          </div>
        ))}
      </div>
      <div className={styles.chartStat}>
        <div className={styles.chartStatItem}>
          <div className={styles.chartStatValue}>${max}K</div>
          <div className={styles.chartStatLabel}>Peak ({months[peak]})</div>
        </div>
        <div className={styles.chartStatItem}>
          <div className={styles.chartStatValue}>${avg}K</div>
          <div className={styles.chartStatLabel}>Monthly Avg</div>
        </div>
        <div className={styles.chartStatItem}>
          <div className={styles.chartStatValue} style={{ color: "#1E6F6F" }}>+{(((max - data[0]) / data[0]) * 100).toFixed(0)}%</div>
          <div className={styles.chartStatLabel}>Growth</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SAVINGS CALCULATOR
   ════════════════════════════════════════════════════════════════════════════ */
function SavingsCalculator() {
  const [monthly,  setMonthly]  = useState(500);
  const [years,    setYears]    = useState(5);
  const [interest, setInterest] = useState(3.5);

  const r   = interest / 100 / 12;
  const n   = years * 12;
  const fv  = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const dep = monthly * n;
  const ear = fv - dep;

  return (
    <div className={styles.savingsCard}>
      <div className={styles.savingsHeader}>
        <p className={styles.savingsHeaderTitle}>💰 Savings Growth Calculator</p>
        <p className={styles.savingsHeaderSub}>See how your money compounds over time</p>
      </div>
      <div className={styles.savingsBody}>
        {[
          { name: "Monthly Deposit", val: `$${monthly.toLocaleString()}`, min: 100, max: 5000, step: 100, set: setMonthly, value: monthly },
          { name: "Time Period",     val: `${years} yr${years !== 1 ? "s" : ""}`, min: 1, max: 30, step: 1, set: setYears, value: years },
          { name: "Interest Rate",   val: `${interest}% p.a.`, min: 0.5, max: 12, step: 0.5, set: setInterest, value: interest },
        ].map(({ name, val, min, max, step, set, value }) => (
          <div key={name} className={styles.savingsSliderGroup}>
            <div className={styles.savingsSliderLabel}>
              <span className={styles.savingsSliderName}>{name}</span>
              <span className={styles.savingsSliderValue}>{val}</span>
            </div>
            <input
              type="range"
              min={min} max={max} step={step} value={value}
              onChange={e => set(Number(e.target.value))}
              className={styles.slider}
            />
          </div>
        ))}
        <div className={styles.savingsResult}>
          <div className={styles.savingsResultMain}>
            <p className={styles.savingsResultMainLabel}>Future Value</p>
            <p className={styles.savingsResultMainValue}>
              ${fv.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className={styles.savingsResultRows}>
            <div className={styles.savingsResultRow}>
              <span className={styles.savingsResultRowLabel}>Total deposited</span>
              <span className={styles.savingsResultRowValue}>${dep.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
            </div>
            <div className={styles.savingsResultRow}>
              <span className={styles.savingsResultRowLabel}>Interest earned</span>
              <span className={styles.savingsResultRowGreen}>+${ear.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "How fast are international transfers?",   a: "Most transfers complete in minutes. Some corridor pairs settle in under 30 seconds thanks to our real-time payment rails." },
  { q: "What are the fees?",                      a: "We charge a flat low fee starting at $2.99 and always use the mid-market exchange rate — zero hidden markup." },
  { q: "Is my money safe?",                       a: "Absolutely. Funds are held in segregated, FDIC-insured accounts. We use AES-256 encryption and are regulated in every jurisdiction." },
  { q: "Which countries are supported?",          a: "We support sending from 50+ countries and receiving in 180+ countries across 40 currencies." },
  { q: "Can I set up recurring transfers?",       a: "Yes. You can schedule daily, weekly, or monthly transfers with automatic rate-lock to protect against currency swings." },
  { q: "How does identity verification work?",    a: "Our AI-powered KYC checks your ID in under 2 minutes, 24/7. No branch visits, no waiting days for approval." },
];

function FAQ() {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) =>
    setOpen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className={styles.faqWrap}>
      {FAQS.map((faq, i) => (
        <div key={i} className={`${styles.faqItem} ${open.includes(i) ? styles.faqItemOpen : ""}`}>
          <button className={styles.faqBtn} onClick={() => toggle(i)}>
            <span>{faq.q}</span>
            <ChevronDown className={`${styles.faqChevron} ${open.includes(i) ? styles.faqChevronOpen : ""}`} />
          </button>
          {open.includes(i) && (
            <div className={styles.faqAnswer}>{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PRODUCT TOUR
   ════════════════════════════════════════════════════════════════════════════ */
const TOUR_STEPS = [
  { emoji: "👋", title: "Welcome aboard!",          body: "This tour walks you through every key section so you can evaluate the platform in under 3 minutes." },
  { emoji: "🧮", title: "Live Transfer Calculator", body: "Use the real-time calculator to see exactly what your recipient gets — including the exchange rate and every fee." },
  { emoji: "📊", title: "Performance Charts",       body: "Interactive charts show real transaction volume trends. Hover any bar for detailed monthly data." },
  { emoji: "💰", title: "Savings Calculator",       body: "Drag the sliders to model how compound interest grows your savings over time with our high-yield accounts." },
  { emoji: "🔒", title: "Security Centre",          body: "Toggle the security level dial to see all the layers protecting your account — from biometrics to HSM." },
];

function ProductTour({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const s = TOUR_STEPS[step];
  return (
    <div className={styles.tourBackdrop} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.tourModal}>
        <div className={styles.tourHead}>
          <span className={styles.tourStepPill}>Step {step + 1} of {TOUR_STEPS.length}</span>
          <button className={styles.tourCloseBtn} onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <div className={styles.tourProgress}>
          <div className={styles.tourProgressBar} style={{ width: `${((step + 1) / TOUR_STEPS.length) * 100}%` }} />
        </div>
        <span className={styles.tourEmoji}>{s.emoji}</span>
        <h3 className={styles.tourTitle}>{s.title}</h3>
        <p className={styles.tourContent}>{s.body}</p>
        <div className={styles.tourFooter}>
          <button className={styles.tourBtnBack} onClick={() => setStep(p => p - 1)} disabled={step === 0}>← Back</button>
          {step < TOUR_STEPS.length - 1
            ? <button className={styles.tourBtnNext} onClick={() => setStep(p => p + 1)}>Next →</button>
            : <button className={styles.tourBtnNext} onClick={onClose}>Let's go! 🚀</button>
          }
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
export default function ProjectDetails() {
  const { slug }   = useParams();
  const project    = projects.find(p => p.slug === slug);

  const [activeTab,     setActiveTab]     = useState("overview");
  const [amount,        setAmount]        = useState(1000);
  const [fromCur,       setFromCur]       = useState("USD");
  const [toCur,         setToCur]         = useState("EUR");
  const [isFlipping,    setIsFlipping]    = useState(false);
  const [secLevel,      setSecLevel]      = useState(3);
  const [email,         setEmail]         = useState("");
  const [subscribed,    setSubscribed]    = useState(false);
  const [showTour,      setShowTour]      = useState(false);
  const [codeCopied,    setCodeCopied]    = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rate = useMemo(() => RATES[toCur] / RATES[fromCur], [fromCur, toCur]);
  const converted = useMemo(() => (amount * rate).toFixed(2), [amount, rate]);

  const flipCurrencies = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFromCur(toCur);
    setToCur(fromCur);
    setTimeout(() => setIsFlipping(false), 400);
  };

  const copyCode = () => {
    const code = `import { ${project!.title.replace(/\s+/g, "")} } from '@fintech/sdk';\n\nconst client = new ${project!.title.replace(/\s+/g, "")}({\n  apiKey: process.env.FINTECH_API_KEY,\n  environment: 'production',\n});\n\n// Create an international transfer\nconst transfer = await client.transfers.create({\n  amount: 1000,\n  fromCurrency: 'USD',\n  toCurrency:   'EUR',\n  recipient: 'user@example.com',\n});\n\nconsole.log('Transfer ID:', transfer.id);\nconsole.log('ETA:', transfer.estimatedArrival);`;
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => { setEmail(""); setSubscribed(false); }, 3000);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
        <div className="text-center max-w-sm p-8">
          <div className="text-7xl mb-5">🔍</div>
          <h1 className="text-2xl font-black text-[#0A2540] mb-3 tracking-tight">Project not found</h1>
          <p className="text-[#475569] text-sm mb-6">That project doesn't exist or has been moved.</p>
          <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8626E9] text-white rounded-xl font-bold text-sm hover:bg-[#C5A028] transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  /* ── Get project image ── */
  const projectImage = projectImages[project.slug] || "/images/Project/placeholder.jpg";

  /* ── Data ── */
  const TABS = [
    { id: "overview",    label: "Overview",    icon: BarChart3 },
    { id: "features",    label: "Features",    icon: Zap },
    { id: "security",    label: "Security",    icon: Shield },
    { id: "integration", label: "Integration", icon: Code },
  ];

  const FEATURES = [
    { icon: Zap,       title: "Lightning Transfers",    desc: "Settle in milliseconds — not days. Our optimised payment rails skip legacy banking intermediaries.", color: "from-[#C5A028] to-[#8626E9]" },
    { icon: Shield,    title: "Bank-Grade Security",     desc: "AES-256 encryption, biometric authentication, and 24/7 AI fraud detection as standard — always.", color: "from-[#8626E9] to-[#0A2540]" },
    { icon: Globe,     title: "180+ Countries",          desc: "Send and receive in 40 currencies across 180+ countries. We handle compliance in every market.", color: "from-[#1E6F6F] to-[#0A2540]" },
    { icon: Smartphone,title: "Native Mobile Apps",     desc: "Award-winning iOS and Android apps with Face ID, Apple Pay, and real-time push notifications.", color: "from-[#C5A028] to-[#8626E9]" },
    { icon: BarChart3, title: "Live Analytics",          desc: "Interactive dashboards surface trends in your cash flow, FX exposure, and savings growth in real time.", color: "from-[#8626E9] to-[#1E6F6F]" },
    { icon: Bell,      title: "Instant Alerts",          desc: "Every transaction triggers an instant, customisable push alert — zero surprises on your statement.", color: "from-[#C5A028] to-[#8626E9]" },
  ];

  const SEC_FEATURES = [
    { level: 1, name: "Two-Factor Authentication",  desc: "TOTP or hardware key required on every login." },
    { level: 2, name: "Biometric Verification",     desc: "Face ID / fingerprint unlock with liveness detection." },
    { level: 3, name: "End-to-End Encryption",      desc: "All data encrypted at rest and in transit with AES-256." },
    { level: 4, name: "Real-time Fraud AI",         desc: "300+ signals analysed per transaction in < 50 ms." },
    { level: 5, name: "Hardware Security Module",   desc: "Private keys stored in FIPS 140-2 Level 3 certified HSM." },
  ];

  const INTEGRATIONS = [
    { name: "REST API",       status: "Available", statusColor: "Available", desc: "Full CRUD access to all resources." },
    { name: "Webhooks",       status: "Available", statusColor: "Available", desc: "Real-time event callbacks." },
    { name: "GraphQL",        status: "Beta",      statusColor: "Beta",      desc: "Flexible query interface." },
    { name: "Mobile SDK",     status: "Available", statusColor: "Available", desc: "iOS, Android & React Native." },
  ];

  const STATS = [
    { value: "2500000+", label: "Active Users",     icon: Users,     color: "text-[#8626E9]" },
    { value: "500000+",  label: "Txns / Day",       icon: TrendingUp,color: "text-[#1E6F6F]" },
    { value: "180+",     label: "Countries",        icon: Globe,     color: "text-[#C5A028]" },
    { value: "4.9/5",    label: "App Store Rating", icon: Star,      color: "text-[#C5A028]" },
  ];

  const TESTIMONIALS = [
    { name: "Sarah Johnson",  role: "CEO, TechStart Inc",  text: "This platform transformed how we handle international payroll. Integration took one afternoon — live the next morning.", rating: 5, avatar: "SJ" },
    { name: "Michael Chen",   role: "Finance Director",    text: "We cut FX costs by 42% in Q1. The fee transparency alone convinced our CFO in 10 minutes.", rating: 5, avatar: "MC" },
    { name: "Emma Williams",  role: "Product Manager",     text: "The analytics dashboard replaced three separate tools. Our team shipped faster than ever after switching.", rating: 5, avatar: "EW" },
  ];

  const HOW_IT_WORKS = [
    { n: 1, title: "Sign Up in 2 Minutes",   desc: "Email only to start. No forms, no branch visit, no waiting.", icon: Users },
    { n: 2, title: "Instant KYC",            desc: "AI-powered ID verification completes in under 2 minutes, 24/7.", icon: Shield },
    { n: 3, title: "Fund Your Account",      desc: "Bank transfer, debit card, or Apple/Google Pay — your choice.", icon: CreditCard },
    { n: 4, title: "Transact Globally",      desc: "Send, receive, invest, and automate from one unified dashboard.", icon: Zap },
  ];

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white">
      {showTour && <ProductTour onClose={() => setShowTour(false)} />}

      {/* ── Sticky Nav ─────────────────────────────────────────────────────── */}
      <nav className={styles.stickyNav}>
        <div className={`${styles.container} ${styles.navContainer}`}>
          <Link to="/projects" className={styles.navBack}>
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </Link>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className={styles.navLivePill}>
              <div className={styles.liveDot} />
              Live
            </div>
            <button
              onClick={() => setShowTour(true)}
              className={styles.btnGhost}
            >
              <HelpCircle className="w-4 h-4" />Tour
            </button>
            <Link to="/signup" className={styles.btnPrimary}>
              Get Started<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0A2540] p-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A2540] border-t-2 border-[#C5A028] px-4 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <div className={styles.liveDot} />
                <span className="text-sm font-bold">Live</span>
              </div>
              <button
                onClick={() => { setShowTour(true); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-white hover:text-[#C5A028] transition-colors py-2"
              >
                <HelpCircle className="w-4 h-4" />Take Tour
              </button>
              <Link
                to="/signup"
                className="bg-[#8626E9] text-white px-6 py-3 rounded-full font-bold text-center hover:bg-[#C5A028] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className={styles.breadcrumb}>
        <div className={`${styles.container} ${styles.breadcrumbInner}`}>
          <Link to="/"        className={styles.breadcrumbLink}><Home className="w-3.5 h-3.5" /></Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link to="/projects" className={styles.breadcrumbLink}>Projects</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{project.title}</span>
        </div>
      </div>

      {/* ── Hero with Project Image ────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlowBlue}  />
        <div className={styles.heroGlowCoral} />
        <div className={styles.heroGlowGold}  />

        {/* Project image as subtle background */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src={projectImage} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E6] via-transparent to-[#F5F0E6]" />
        </div>

        <div className={`${styles.container} relative z-10`}>
          <div className={styles.heroInner}>
            {/* Category badge */}
            <div className={styles.heroCategoryBadge}>
              <div className={styles.heroCategoryIcon}>
                <project.icon className="w-5 h-5 text-white" />
              </div>
              <span className={styles.heroCategoryLabel}>{project.category}</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleGrad}>{project.title}</span>
            </h1>
            <p className={styles.heroDescription}>{project.description}</p>

            <div className={styles.heroCTAs}>
              <Link to="/signup"  className={styles.ctaGetStarted}>
                Get Started Free<ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className={styles.ctaContactSales}>
                <MessageCircle className="w-5 h-5" />Contact Sales
              </Link>
              <button
                onClick={() => setShowTour(true)}
                className="hidden md:inline-flex items-center gap-2 px-5 py-3 bg-white/60 backdrop-blur-sm border border-[rgba(197,160,40,0.2)] text-[#475569] rounded-xl font-bold text-sm hover:bg-white hover:shadow-md transition-all"
              >
                <Layers className="w-4 h-4" />Take Tour
              </button>
            </div>

            {/* Animated stats */}
            <div className={styles.statsGrid}>
              {STATS.map((s, i) => (
                <AnimatedStat key={i} value={s.value} label={s.label} icon={s.icon} color={s.color} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab nav ────────────────────────────────────────────────────────── */}
      <div className={styles.tabNav}>
        <div className={`${styles.container} ${styles.tabNavInner}`}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ""}`}
              >
                <Icon className="w-4 h-4" /><span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          OVERVIEW TAB
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className={styles.section}>
          <div className={styles.container}>

            {/* ── Live Calculator ── */}
            <div className={styles.calcWrapper} style={{ marginBottom: "3rem" }}>
              <div className={styles.calcHeader}>
                <div className={styles.calcHeaderIcon}>
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={styles.calcHeaderTitle}>Live Transfer Calculator</p>
                  <p className={styles.calcHeaderSub}>Real mid-market rates, zero hidden fees</p>
                </div>
              </div>

              <div className={styles.calcBody}>
                <div className={styles.calcRow}>
                  {/* From */}
                  <div>
                    <p className={styles.calcLabel}>You send</p>
                    <div className={styles.currencyInput}>
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(Math.max(0, Number(e.target.value)))}
                        className={styles.inputField}
                      />
                      <select
                        value={fromCur}
                        onChange={e => setFromCur(e.target.value)}
                        className={styles.currencySelect}
                      >
                        {Object.keys(RATES).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Flip */}
                  <div className={styles.flipCol}>
                    <button
                      onClick={flipCurrencies}
                      className={`${styles.flipBtn} ${isFlipping ? styles.flipBtnSpinning : ""}`}
                      title="Swap currencies"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>

                  {/* To */}
                  <div>
                    <p className={styles.calcLabel}>They receive</p>
                    <div className={`${styles.currencyInput} ${styles.currencyInputReadonly}`}>
                      <input
                        readOnly
                        value={converted}
                        className={styles.inputField}
                        style={{ cursor: "default" }}
                      />
                      <select
                        value={toCur}
                        onChange={e => setToCur(e.target.value)}
                        className={styles.currencySelect}
                      >
                        {Object.keys(RATES).filter(c => c !== fromCur).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rate banner */}
                <div className={styles.calcRateBanner}>
                  <span className={styles.calcRateText}>
                    <TrendingUp className="w-4 h-4" />
                    1 {fromCur} = {rate.toFixed(5)} {toCur}
                  </span>
                  <span className={styles.calcRateBadge}>Mid-market ↑ 0.4%</span>
                </div>

                {/* Breakdown */}
                <div className={styles.calcBreakdown}>
                  <div className={styles.calcBreakdownRow}>
                    <span className={styles.calcBreakdownLabel}>Transfer fee</span>
                    <span className={styles.calcBreakdownValue}>$2.99</span>
                  </div>
                  <div className={styles.calcBreakdownRow}>
                    <span className={styles.calcBreakdownLabel}>Exchange rate markup</span>
                    <span className={styles.calcBreakdownGreen}>$0.00 — free!</span>
                  </div>
                  <div className={styles.calcBreakdownRow}>
                    <span className={styles.calcBreakdownLabel}>Estimated delivery</span>
                    <span className={styles.calcBreakdownValue}>~2 minutes</span>
                  </div>
                  <div className={styles.calcBreakdownRow}>
                    <span className={styles.calcBreakdownLabel}><strong>Total you pay</strong></span>
                    <span className={styles.calcBreakdownValue}><strong>${(amount + 2.99).toFixed(2)}</strong></span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/signup"
                    className={styles.ctaGetStarted}
                    style={{ display: "inline-flex" }}
                  >
                    Open an account to transfer<ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Fee comparison ── */}
            <div style={{ marginBottom: "3rem" }}>
              <div className={styles.sectionHead} style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                <h3 className={styles.sectionTitle}>Why choose us?</h3>
                <p className={styles.sectionSub}>We beat every legacy provider on cost — transparently.</p>
              </div>
              <div className={styles.feeTable}>
                <div className={styles.feeTableHead}>
                  {["Provider","Transfer Fee","FX Markup","Total Cost","You Save"].map(h => (
                    <div key={h} className={styles.feeTableCell}>{h}</div>
                  ))}
                </div>
                {[
                  { name: project.title, fee: "$2.99", fx: "0%", total: "$1,002.99", save: "—",    highlight: true },
                  { name: "High-St. Bank",fee:"$25.00",fx:"+3.2%",total:"$1,057.99",save:"$55.00", highlight: false },
                  { name: "PayPal",       fee:"$4.99", fx:"+2.5%",total:"$1,029.99",save:"$27.00", highlight: false },
                  { name: "Western Union",fee:"$15.00",fx:"+2.0%",total:"$1,035.99",save:"$33.00", highlight: false },
                ].map(row => (
                  <div key={row.name} className={`${styles.feeTableRow} ${row.highlight ? styles.feeTableRowHighlight : ""}`}>
                    <div className={`${styles.feeTableData} ${styles.feeProviderName}`}>{row.name}</div>
                    <div className={`${styles.feeTableData} ${row.highlight ? styles.feeTableDataBlue : ""}`}>{row.fee}</div>
                    <div className={`${styles.feeTableData} ${row.highlight ? styles.feeTableDataBlue : ""}`}>{row.fx}</div>
                    <div className={`${styles.feeTableData} ${row.highlight ? styles.feeTableDataBlue : ""}`}>{row.total}</div>
                    <div className={`${styles.feeTableData} ${!row.highlight ? styles.feeTableDataGreen : ""}`}>{row.save}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Chart ── */}
            <div style={{ marginBottom: "3rem" }}>
              <MiniChart />
            </div>

            {/* ── Savings Calculator ── */}
            <div style={{ marginBottom: "4rem" }}>
              <SavingsCalculator />
            </div>

            {/* ── FAQ ── */}
            <div>
              <div className={styles.sectionHead} style={{ marginBottom: "2rem" }}>
                <h3 className={styles.sectionTitle}>Frequently Asked Questions</h3>
                <p className={styles.sectionSub}>Everything you need to know before you send your first transfer.</p>
              </div>
              <FAQ />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURES TAB
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "features" && (
        <div className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Powerful by Design</h2>
              <p className={styles.sectionSub}>Six core capabilities that set us apart from legacy fintech.</p>
            </div>
            <div className={styles.featuresGrid}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <div className={`${styles.featureIconWrap} bg-gradient-to-br ${f.color}`}>
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          SECURITY TAB
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "security" && (
        <div className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Security First, Always</h2>
              <p className={styles.sectionSub}>Your funds and data are protected by multiple independent layers.</p>
            </div>

            {/* Security level dial */}
            <div className={styles.securityLevelPanel} style={{ maxWidth: 640, margin: "0 auto 2.5rem" }}>
              <div className={styles.securityLevelHeader}>
                <span className={styles.securityLevelTitle}>Security Layer Dial</span>
                <div className={styles.securityLevelDots}>
                  {[1,2,3,4,5].map(l => (
                    <button
                      key={l}
                      onClick={() => setSecLevel(l)}
                      className={`${styles.securityDot} ${secLevel >= l ? styles.securityDotActive : styles.securityDotInactive}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                {SEC_FEATURES.map(sf => (
                  <div
                    key={sf.level}
                    className={`${styles.securityFeatureItem} ${secLevel >= sf.level ? styles.securityFeatureActive : styles.securityFeatureLocked}`}
                  >
                    <div className={`${styles.securityCheckIcon} ${secLevel >= sf.level ? styles.securityCheckActive : styles.securityCheckLocked}`}>
                      {secLevel >= sf.level
                        ? <Check className="w-4 h-4 text-white" />
                        : <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
                      }
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#0A2540]">{sf.name}</p>
                      <p className="text-xs text-[#475569] mt-0.5">{sf.desc}</p>
                    </div>
                    {secLevel >= sf.level && (
                      <span className="ml-auto text-xs bg-[rgba(30,111,111,0.12)] text-[#1E6F6F] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">Active</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Security cards */}
            <div className={styles.securityGrid}>
              {[
                { icon: Shield,    title: "AES-256 Encryption",       desc: "Military-grade encryption for all data at rest and in transit — always." },
                { icon: Lock,      title: "Zero-Knowledge Storage",   desc: "We never store or see your private keys, PINs, or sensitive credentials." },
                { icon: Globe,     title: "Global Compliance",        desc: "Fully licensed and regulated — FCA, FINTRAC, AUSTRAC, and 30+ more." },
                { icon: Bell,      title: "AI Fraud Detection",       desc: "300+ real-time signals analysed per transaction to stop fraud before it happens." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className={styles.securityCard}>
                  <div className={`${styles.featureIconWrap} bg-gradient-to-br from-[#8626E9] to-[#0A2540]`} style={{ marginBottom: "1rem" }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p className={styles.featureDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          INTEGRATION TAB
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "integration" && (
        <div className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Developer-First API</h2>
              <p className={styles.sectionSub}>Go live in an afternoon — not weeks. Our SDK handles all the heavy lifting.</p>
            </div>

            <div className={styles.integrationGrid}>
              {INTEGRATIONS.map(intg => (
                <div key={intg.name} className={styles.integrationCard}>
                  <span
                    className={`${styles.integrationStatus} ${intg.statusColor === "Available" ? styles.integrationStatusAvailable : styles.integrationStatusBeta}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${intg.statusColor === "Available" ? "bg-[#1E6F6F]" : "bg-[#C5A028]"}`} />
                    {intg.status}
                  </span>
                  <h3 className={styles.integrationName}>{intg.name}</h3>
                  <p className={`${styles.featureDesc} text-xs mb-3`}>{intg.desc}</p>
                  <Link to={`/docs/${intg.name.toLowerCase().replace(/\s+/g, "-")}`} className={styles.integrationLink}>
                    View docs <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Code block */}
            <div className={styles.codeBlock}>
              <div className={styles.codeBlockHeader}>
                <div className="flex items-center gap-3">
                  <div className={styles.codeBlockDots}>
                    <div className={`${styles.codeDot} bg-[#D32F2F]`} />
                    <div className={`${styles.codeDot} bg-[#C5A028]`} />
                    <div className={`${styles.codeDot} bg-[#1E6F6F]`} />
                  </div>
                  <span className={styles.codeBlockTitle}>
                    <Terminal className="w-4 h-4" />
                    quick-start.ts
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className={`${styles.codeCopyBtn} ${codeCopied ? styles.codeCopyBtnSuccess : ""}`}
                >
                  {codeCopied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className={styles.codeBlockBody}>
                <pre>{`import { ${project.title.replace(/\s+/g, "")} } from '@fintech/sdk';

const client = new ${project.title.replace(/\s+/g, "")}({
  apiKey:      process.env.FINTECH_API_KEY,
  environment: 'production',
});

// Create an international transfer
const transfer = await client.transfers.create({
  amount:       1000,
  fromCurrency: 'USD',
  toCurrency:   'EUR',
  recipient:    'user@example.com',
});

console.log('Transfer ID:',  transfer.id);
console.log('ETA:',          transfer.estimatedArrival);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSub}>From sign-up to your first global transfer in under 5 minutes.</p>
          </div>
          <div className={styles.stepsContainer} style={{ maxWidth: 680, margin: "0 auto 3rem" }}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.n} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.n}</div>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
                <step.icon className="w-8 h-8 text-[#C5A028] flex-shrink-0" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/signup" className={styles.ctaGetStarted} style={{ display: "inline-flex" }}>
              Start in 2 minutes<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Loved by Finance Teams</h2>
            <p className={styles.sectionSub}>Over 2.5 million businesses and individuals trust us with their money.</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#C5A028] text-[#C5A028]" />
                  ))}
                </div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Big CTA ─────────────────────────────────────────────────────────── */}
      <section className={styles.bigCTA}>
        <div className={styles.bigCTAOrb1} />
        <div className={styles.bigCTAOrb2} />
        <div className={styles.bigCTAOrb3} />
        <div className={styles.container}>
          <div className={styles.bigCTAInner}>
            <h2 className={styles.bigCTATitle}>
              Ready to cut costs<br />and move faster?
            </h2>
            <p className={styles.bigCTASub}>
              Join {project.title} and thousands of companies who've already switched. First transfer fee is on us.
            </p>
            <div className={styles.bigCTABtns}>
              <Link to="/signup"  className={styles.bigCTABtnPrimary}>
                Start Free Trial<ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className={styles.bigCTABtnSecondary}>
                <MessageCircle className="w-5 h-5" />Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────────────── */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterInner}>
          <h3 className={styles.newsletterTitle}>Stay in the loop</h3>
          <p className={styles.newsletterSub}>
            Product updates, rate alerts, and fintech insights — straight to your inbox.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-[#1E6F6F] font-bold">
              <Check className="w-5 h-5" />You're subscribed!
            </div>
          ) : (
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                className={styles.newsletterInput}
              />
              <button onClick={handleSubscribe} className={styles.newsletterBtn}>Subscribe</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer strip ────────────────────────────────────────────────────── */}
      <div className={styles.footerStrip}>
        <div className={styles.container}>
          <div className={styles.footerStripInner}>
            <div>
              <p className={styles.footerStripTitle}>Have questions?</p>
              <p className={styles.footerStripText}>Our team is available 24 / 7 to help you get started or migrate.</p>
            </div>
            <Link to="/contact" className={styles.footerStripBtn}>
              <MessageCircle className="w-4 h-4" />Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}