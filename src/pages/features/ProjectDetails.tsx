import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Shield,
  Zap,
  Globe,
  CreditCard,
  Smartphone,
  Lock,
  TrendingUp,
  Users,
  Star,
  Check,
  X,
  RefreshCw,
  BarChart3,
  PieChart,
  DollarSign,
  Clock,
  MapPin,
  Award,
  Briefcase,
  Code,
  Webhook,
  Terminal,
  PlayCircle,
  Gauge,
  Bell,
  Settings,
  MessageCircle,
  Mail
} from "lucide-react";
import { projects } from "@/data/projects";
import styles from "./ProjectDetails.module.css";

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // Interactive States
  const [activeTab, setActiveTab] = useState("overview");
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [deviceView, setDeviceView] = useState("desktop");
  const [securityLevel, setSecurityLevel] = useState(3);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [email, setEmail] = useState("");

  // Simulated exchange rate
  const exchangeRate = 0.92;

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount]);

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing! You'll receive updates at ${email}`);
      setEmail("");
    } else {
      alert("Please enter your email address");
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-blue-600 hover:underline">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "demo", label: "Live Demo", icon: PlayCircle },
    { id: "features", label: "Features", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
    { id: "integration", label: "Integration", icon: Code },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Transfers",
      description: "Process transactions in milliseconds with our optimized infrastructure",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "256-bit encryption and multi-factor authentication as standard",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Send money to over 180 countries with competitive rates",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Native iOS and Android apps with seamless synchronization",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track your spending, savings, and investments in one dashboard",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get instant alerts for every transaction and account activity",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const securityFeatures = [
    { level: 1, name: "Two-Factor Authentication", active: true },
    { level: 2, name: "Biometric Login", active: true },
    { level: 3, name: "End-to-End Encryption", active: securityLevel >= 3 },
    { level: 4, name: "Real-time Fraud Detection", active: securityLevel >= 4 },
    { level: 5, name: "Hardware Security Module", active: securityLevel >= 5 },
  ];

  const stats = [
    { label: "Active Users", value: "2.5M+", icon: Users, color: "text-blue-600" },
    { label: "Transactions/Day", value: "500K+", icon: TrendingUp, color: "text-green-600" },
    { label: "Countries Supported", value: "180+", icon: Globe, color: "text-purple-600" },
    { label: "Average Rating", value: "4.8/5", icon: Star, color: "text-yellow-600" },
  ];

  const integrations = [
    { name: "REST API", status: "Available", docs: "/docs/api" },
    { name: "Webhooks", status: "Available", docs: "/docs/webhooks" },
    { name: "GraphQL", status: "Beta", docs: "/docs/graphql" },
    { name: "Mobile SDK", status: "Available", docs: "/docs/sdk" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      content: "This platform revolutionized how we handle international payments. The API integration was seamless!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Finance Director",
      content: "Best fintech solution we've implemented. Saved us 40% on transaction fees in the first quarter.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Williams",
      role: "Product Manager",
      content: "The analytics dashboard gives us insights we never had before. Highly recommend!",
      rating: 5,
      avatar: "EW",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up in Minutes",
      description: "Create your account with just your email. No lengthy forms or waiting periods.",
      icon: Users,
    },
    {
      step: 2,
      title: "Verify Your Identity",
      description: "Quick KYC process using AI-powered document verification. Takes less than 2 minutes.",
      icon: Shield,
    },
    {
      step: 3,
      title: "Add Funds",
      description: "Connect your bank account or use a debit card. Multiple funding options available.",
      icon: CreditCard,
    },
    {
      step: 4,
      title: "Start Transacting",
      description: "Send money globally, pay bills, or invest - all from one unified platform.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Sticky Navigation */}
      <nav className={styles.stickyNav}>
        <div className={`${styles.container} ${styles.navContainer}`}>
          <Link
            to="/projects"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Projects</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Live</span>
            </div>
            <Link
              to="/demo"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Try Free Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.orbBlue} />
          <div className={styles.orbCoral} />
        </div>

        <div className={styles.container} style={{ position: "relative", zIndex: 10 }}>
          <div className="max-w-5xl mx-auto text-center">
            {/* Category Badge */}
            <div className={`${styles.categoryBadge} mb-6`} style={{ display: "inline-flex" }}>
              <div className={styles.iconContainer}>
                <project.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>

            {/* Project Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              {project.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                to="/signup"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-full font-bold border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact Sales</span>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
                  <div className={styles.statNumber}>{stat.value}</div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className={styles.container}>
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <section className="py-16 px-6">
          <div className={styles.container}>
            {/* Live Calculator */}
            <div className={styles.liveCalculator}>
              <div className={styles.calculatorHeader}>
                <div className={styles.calculatorIcon}>
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Live Transfer Calculator</h3>
                  <p className="text-gray-600">See how much you'll receive in real-time</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">You Send</label>
                  <div className={styles.currencyInput}>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className={styles.inputField}
                    />
                    <select 
                      className={styles.currencySelect} 
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">They Receive</label>
                  <div className={styles.currencyInput}>
                    <input
                      type="number"
                      value={convertedAmount.toFixed(2)}
                      readOnly
                      className={styles.inputField}
                      style={{ background: "#F8FAFC" }}
                    />
                    <select 
                      className={styles.currencySelect} 
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.rateTicker}>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</span>
                </div>
                <div className={styles.rateChange}>↑ 0.5%</div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Transfer Fee</span>
                  <span className="font-semibold text-gray-900">$2.99</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Exchange Rate Markup</span>
                  <span className="font-semibold text-green-600">$0.00 (Mid-market rate)</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-blue-200">
                  <span className="text-gray-900">Total Cost</span>
                  <span className="text-gray-900">${(amount + 2.99).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Open Account to Transfer
                </Link>
              </div>
            </div>

            {/* Fee Comparison */}
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
              <div className={styles.feeComparison}>
                <table className={styles.comparisonTable}>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th className={styles.tableCell}>Provider</th>
                      <th className={styles.tableCell}>Transfer Fee</th>
                      <th className={styles.tableCell}>Exchange Rate</th>
                      <th className={styles.tableCell}>Total Cost</th>
                      <th className={styles.tableCell}>You Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={`${styles.tableCell} font-bold`}>{project.title}</td>
                      <td className={`${styles.tableCell} ${styles.highlightCell}`}>$2.99</td>
                      <td className={`${styles.tableCell} ${styles.highlightCell}`}>Mid-market</td>
                      <td className={`${styles.tableCell} ${styles.highlightCell}`}>$1,002.99</td>
                      <td className={`${styles.tableCell} ${styles.highlightCell}`}>-</td>
                    </tr>
                    <tr>
                      <td className={styles.tableCell}>Traditional Bank</td>
                      <td className={styles.tableCell}>$25.00</td>
                      <td className={styles.tableCell}>+3% markup</td>
                      <td className={styles.tableCell}>$1,055.00</td>
                      <td className={`${styles.tableCell} text-green-600 font-bold`}>$52.01</td>
                    </tr>
                    <tr>
                      <td className={styles.tableCell}>PayPal</td>
                      <td className={styles.tableCell}>$4.99</td>
                      <td className={styles.tableCell}>+2.5% markup</td>
                      <td className={styles.tableCell}>$1,029.99</td>
                      <td className={`${styles.tableCell} text-green-600 font-bold`}>$27.00</td>
                    </tr>
                    <tr>
                      <td className={styles.tableCell}>Western Union</td>
                      <td className={styles.tableCell}>$15.00</td>
                      <td className={styles.tableCell}>+2% markup</td>
                      <td className={styles.tableCell}>$1,035.00</td>
                      <td className={`${styles.tableCell} text-green-600 font-bold`}>$32.01</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demo Tab */}
      {activeTab === "demo" && (
        <section className="py-16 px-6">
          <div className={styles.container}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Product Demo</h2>
              <p className="text-xl text-gray-600">Experience the platform in action</p>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {["desktop", "tablet", "mobile"].map((device) => (
                <button
                  key={device}
                  onClick={() => setDeviceView(device)}
                  className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                    deviceView === device
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {device}
                </button>
              ))}
            </div>

            {/* Demo Container */}
            <div className="max-w-6xl mx-auto">
              <div
                className={`bg-gradient-to-br ${project.color} rounded-3xl p-1 shadow-2xl transition-all duration-500 ${
                  deviceView === "mobile" ? "max-w-sm mx-auto" : deviceView === "tablet" ? "max-w-3xl mx-auto" : ""
                }`}
              >
                <div className="bg-white rounded-[22px] overflow-hidden">
                  {/* Demo Header */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <project.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold">Dashboard</h4>
                        <p className="text-xs text-gray-400">Welcome back, Demo User</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <Settings className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Demo Content */}
                  <div className="p-6 min-h-[400px] bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6">
                        <DollarSign className="w-8 h-8 mb-3 opacity-80" />
                        <p className="text-sm opacity-90 mb-1">Available Balance</p>
                        <h3 className="text-3xl font-bold">$12,450.00</h3>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <TrendingUp className="w-8 h-8 mb-3 text-green-500" />
                        <p className="text-sm text-gray-600 mb-1">This Month</p>
                        <h3 className="text-3xl font-bold text-gray-900">+$2,340</h3>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <Clock className="w-8 h-8 mb-3 text-blue-500" />
                        <p className="text-sm text-gray-600 mb-1">Pending</p>
                        <h3 className="text-3xl font-bold text-gray-900">3</h3>
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4">Recent Transactions</h4>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                                {i}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Transaction #{i}</p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                              </div>
                            </div>
                            <span className="font-bold text-green-600">+$250.00</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/demo"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <PlayCircle className="w-6 h-6" />
                <span>Launch Full Interactive Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Tab */}
      {activeTab === "features" && (
        <section className="py-16 px-6">
          <div className={styles.container}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600">Everything you need in one platform</p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={styles.featureCard}
                  onMouseEnter={() => setSelectedFeature(index)}
                >
                  <div className={styles.featureIcon} style={{ background: `linear-gradient(135deg, ${feature.color.split(" ")[0].replace("from-", "")}, ${feature.color.split(" ")[1].replace("to-", "")})` }}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-gray-600 relative z-10">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <section className="py-16 px-6">
          <div className={styles.container}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h2>
              <p className="text-xl text-gray-600">Your data and money are protected at every level</p>
            </div>

            {/* Security Level Control */}
            <div className="max-w-3xl mx-auto mb-12 bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Security Level</h3>
                  <p className="text-gray-600">Adjust to see different security features</p>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-6 h-6 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">{securityLevel}/5</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                value={securityLevel}
                onChange={(e) => setSecurityLevel(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="mt-6 space-y-3">
                {securityFeatures.map((feature) => (
                  <div
                    key={feature.level}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      feature.active ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {feature.active ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`font-semibold ${feature.active ? "text-gray-900" : "text-gray-400"}`}>
                        {feature.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        feature.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      Level {feature.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Grid */}
            <div className={styles.securityGrid}>
              {[
                { icon: Lock, title: "256-bit Encryption", desc: "Military-grade encryption for all data" },
                { icon: Shield, title: "PCI DSS Compliant", desc: "Highest standard for payment security" },
                { icon: RefreshCw, title: "Real-time Monitoring", desc: "24/7 fraud detection and prevention" },
                { icon: Award, title: "SOC 2 Certified", desc: "Independently audited security controls" },
              ].map((item, index) => (
                <div key={index} className={styles.securityCard}>
                  <div className={styles.securityIcon}>
                    <item.icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Integration Tab */}
      {activeTab === "integration" && (
        <section className="py-16 px-6">
          <div className={styles.container}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Easy Integration</h2>
              <p className="text-xl text-gray-600">Connect your systems in minutes</p>
            </div>

            {/* Integration Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Code className="w-8 h-8 text-blue-600" />
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        integration.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {integration.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{integration.name}</h3>
                  <Link 
                    to={integration.docs}
                    className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
                  >
                    View Docs
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Code Example */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
                <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300 font-semibold">Quick Start Example</span>
                  </div>
                  <button 
                    onClick={() => {
                      const code = `// Initialize the SDK
import { ${project.title.replace(/\s+/g, "")} } from '@fintech/sdk';

const client = new ${project.title.replace(/\s+/g, "")}({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Create a transfer
const transfer = await client.transfers.create({
  amount: 1000,
  currency: 'USD',
  recipient: 'user@example.com'
});

console.log('Transfer successful:', transfer.id);`;
                      navigator.clipboard.writeText(code);
                      alert("Code copied to clipboard!");
                    }}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Copy Code
                  </button>
                </div>
                <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                  <pre>
                    {`// Initialize the SDK
import { ${project.title.replace(/\s+/g, "")} } from '@fintech/sdk';

const client = new ${project.title.replace(/\s+/g, "")}({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Create a transfer
const transfer = await client.transfers.create({
  amount: 1000,
  currency: 'USD',
  recipient: 'user@example.com'
});

console.log('Transfer successful:', transfer.id);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className={styles.container}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 4 simple steps</p>
          </div>

          <div className={styles.stepsContainer}>
            {howItWorks.map((step) => (
              <div key={step.step} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.step}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
                <step.icon className="w-12 h-12 text-gray-400" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className={styles.container}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of businesses worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className={styles.bigCTA}>
        <div className={styles.ctaBackground} />
        <div className={styles.container} style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Ready to Get Started?</h2>
          <p className="text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join thousands of companies already using {project.title} to transform their financial operations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterBackground} />
        <div className={styles.container} style={{ position: "relative", zIndex: 10 }}>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h3>
            <p className="text-lg text-gray-600 mb-8">Get product updates, industry insights, and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                onClick={handleSubscribe}
                className={styles.newsletterButton}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCTA}>
        <div className={styles.container}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-2">Have Questions?</h4>
              <p className={styles.footerText}>Our team is here to help you get started</p>
            </div>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
