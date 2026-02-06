"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Services;
// src/pages/Services.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
function Services() {
    var _a = (0, react_1.useState)("personal"), activeTab = _a[0], setActiveTab = _a[1];
    var personalServices = [
        {
            id: 1,
            title: "Instant Payments & Transfers",
            description: "Send and receive money worldwide in seconds with real-time processing and zero hidden fees.",
            features: [
                "Send money to 190+ countries instantly",
                "Real-time FX rates with 0% markup",
                "Zero fees on most transfers",
                "Bank transfers arrive in under 60 seconds"
            ],
            icon: <lucide_react_1.Send className="w-8 h-8"/>,
            color: "from-blue-500 to-cyan-500",
            badge: "Most Popular"
        },
        {
            id: 2,
            title: "Multi-Currency Accounts",
            description: "Hold, convert, and manage 40+ currencies in one account with the best exchange rates.",
            features: [
                "Hold USD, EUR, GBP, JPY + 36 more",
                "Convert at interbank rates instantly",
                "No monthly account fees",
                "FDIC/FSCS insured up to $250,000"
            ],
            icon: <lucide_react_1.Wallet className="w-8 h-8"/>,
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            title: "Virtual & Physical Cards",
            description: "Get instant virtual cards and order premium physical cards for global spending.",
            features: [
                "Instant virtual card generation",
                "Premium metal cards available",
                "Contactless payments worldwide",
                "Real-time spending notifications"
            ],
            icon: <lucide_react_1.CreditCard className="w-8 h-8"/>,
            color: "from-indigo-500 to-blue-500"
        },
        {
            id: 4,
            title: "Crypto Trading & Wallet",
            description: "Buy, sell, and securely store 50+ cryptocurrencies with institutional-grade security.",
            features: [
                "Trade BTC, ETH, USDT + 50 more",
                "Cold storage with multi-sig protection",
                "No trading fees on crypto",
                "Instant crypto-to-fiat conversion"
            ],
            icon: <lucide_react_1.Bitcoin className="w-8 h-8"/>,
            color: "from-orange-500 to-amber-500",
            badge: "New"
        },
        {
            id: 5,
            title: "High-Yield Savings Vaults",
            description: "Earn up to 12% annual interest on your savings with automated daily compounding.",
            features: [
                "Up to 12% APY on savings",
                "Daily compound interest",
                "No minimum balance required",
                "Instant withdrawals anytime"
            ],
            icon: <lucide_react_1.PiggyBank className="w-8 h-8"/>,
            color: "from-emerald-500 to-teal-500"
        },
        {
            id: 6,
            title: "Bill Payments & Subscriptions",
            description: "Pay utilities, mobile bills, and manage all your subscriptions in one place.",
            features: [
                "Pay 5,000+ billers instantly",
                "Automatic subscription tracking",
                "Cancel unused subscriptions easily",
                "Cashback on bill payments"
            ],
            icon: <lucide_react_1.Receipt className="w-8 h-8"/>,
            color: "from-rose-500 to-pink-500"
        },
        {
            id: 7,
            title: "Personal Loans",
            description: "Get instant personal loans up to $50,000 with flexible repayment terms and competitive rates.",
            features: [
                "Loans from $1,000 to $50,000",
                "Approval in under 5 minutes",
                "Flexible 6-60 month terms",
                "Rates starting at 5.9% APR"
            ],
            icon: <lucide_react_1.DollarSign className="w-8 h-8"/>,
            color: "from-green-500 to-emerald-500",
            badge: "Fast Approval"
        },
        {
            id: 8,
            title: "Escrow Services",
            description: "Secure your transactions with our trusted escrow service for high-value purchases and deals.",
            features: [
                "Buyer and seller protection",
                "Secure fund holding",
                "Dispute resolution included",
                "Support for crypto & fiat"
            ],
            icon: <lucide_react_1.Handshake className="w-8 h-8"/>,
            color: "from-indigo-500 to-purple-500"
        },
        {
            id: 9,
            title: "P2P Crypto Trading",
            description: "Trade cryptocurrency directly with other users at the best rates with zero platform fees.",
            features: [
                "Zero trading fees on P2P",
                "50+ cryptocurrencies supported",
                "Escrow protection included",
                "Trade at your preferred rates"
            ],
            icon: <lucide_react_1.RefreshCw className="w-8 h-8"/>,
            color: "from-cyan-500 to-blue-500",
            badge: "0% Fees"
        }
    ];
    var businessServices = [
        {
            id: 10,
            title: "Business Banking & Payroll",
            description: "Complete business banking solution with automated payroll for teams of any size.",
            features: [
                "Business accounts with sub-accounts",
                "Automated global payroll processing",
                "Bulk payment capabilities",
                "Multi-user access with roles"
            ],
            icon: <lucide_react_1.Building2 className="w-8 h-8"/>,
            color: "from-blue-600 to-indigo-600"
        },
        {
            id: 11,
            title: "Merchant Payment Gateway",
            description: "Accept payments online and in-store with our powerful API and checkout solutions.",
            features: [
                "Accept cards, wallets & crypto",
                "One-click checkout integration",
                "Real-time payment analytics",
                "Industry-lowest processing fees"
            ],
            icon: <lucide_react_1.Smartphone className="w-8 h-8"/>,
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 12,
            title: "Business Loans & Financing",
            description: "Fast working capital loans with flexible terms and competitive rates for SMEs.",
            features: [
                "Loans from $5,000 to $500,000",
                "Approval in 24 hours",
                "Flexible repayment terms",
                "AI-powered underwriting"
            ],
            icon: <lucide_react_1.TrendingUp className="w-8 h-8"/>,
            color: "from-purple-600 to-pink-600"
        },
        {
            id: 13,
            title: "Invoice & Expense Management",
            description: "Streamline your business finances with automated invoicing and expense tracking.",
            features: [
                "Automated invoice generation",
                "Receipt scanning with OCR",
                "Real-time expense reports",
                "Integration with accounting software"
            ],
            icon: <lucide_react_1.Receipt className="w-8 h-8"/>,
            color: "from-cyan-500 to-blue-500"
        },
        {
            id: 14,
            title: "Business Escrow Services",
            description: "Protect large business transactions with enterprise-grade escrow solutions.",
            features: [
                "Support for transactions up to $10M",
                "Multi-party escrow agreements",
                "Legal document management",
                "Dedicated account manager"
            ],
            icon: <lucide_react_1.Scale className="w-8 h-8"/>,
            color: "from-orange-600 to-red-600"
        },
        {
            id: 15,
            title: "Corporate Crypto Solutions",
            description: "Enterprise-grade cryptocurrency trading and treasury management for businesses.",
            features: [
                "OTC trading desk access",
                "Corporate wallet management",
                "Tax reporting & compliance",
                "Dedicated support team"
            ],
            icon: <lucide_react_1.Bitcoin className="w-8 h-8"/>,
            color: "from-yellow-500 to-orange-500"
        }
    ];
    var securityFeatures = [
        {
            icon: <lucide_react_1.Shield className="w-6 h-6"/>,
            title: "Bank-Level Security",
            description: "256-bit encryption & 2FA"
        },
        {
            icon: <lucide_react_1.Lock className="w-6 h-6"/>,
            title: "FDIC Insured",
            description: "Up to $250,000 protected"
        },
        {
            icon: <lucide_react_1.Clock className="w-6 h-6"/>,
            title: "24/7 Fraud Monitoring",
            description: "AI-powered protection"
        },
        {
            icon: <lucide_react_1.CheckCircle className="w-6 h-6"/>,
            title: "Instant Notifications",
            description: "Real-time alerts"
        }
    ];
    var currentServices = activeTab === "personal" ? personalServices : businessServices;
    return (<div className="min-h-screen bg-white">
      
      {/* Hero Section with VIDEO BACKGROUND */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* VIDEO BACKGROUND - Add your video file named "services-hero.mp4" in /public/videos/ folder */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/services-hero.mp4" type="video/mp4"/>
          {/* Fallback gradient if video doesn't load */}
        </video>
        
        {/* Overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/85 to-pink-900/90"/>
        
        {/* Animated gradient overlays for extra visual appeal */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"/>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}/>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <framer_motion_1.motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full shadow-sm text-sm font-semibold text-white mb-6 border border-white/20">
              <lucide_react_1.Sparkles className="w-4 h-4"/>
              Trusted by 2M+ users worldwide
            </framer_motion_1.motion.div>

            <framer_motion_1.motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Everything You Need
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                In One Platform
              </span>
            </framer_motion_1.motion.h1>

            <framer_motion_1.motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Banking, payments, crypto, savings, and business tools — all designed to make managing money effortless
            </framer_motion_1.motion.p>
          </div>

          {/* Tab Navigation */}
          <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex justify-center gap-4 mb-12 flex-wrap">
            <button onClick={function () { return setActiveTab("personal"); }} className={"px-8 py-4 rounded-2xl font-semibold transition-all ".concat(activeTab === "personal"
            ? "bg-white text-blue-600 shadow-2xl scale-105"
            : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/20")}>
              Personal Banking
            </button>
            <button onClick={function () { return setActiveTab("business"); }} className={"px-8 py-4 rounded-2xl font-semibold transition-all ".concat(activeTab === "business"
            ? "bg-white text-blue-600 shadow-2xl scale-105"
            : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/20")}>
              Business Solutions
            </button>
          </framer_motion_1.motion.div>
        </div>
      </section>

      {/* Services Grid - Revolut/N26 Inspired */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map(function (service, index) { return (<framer_motion_1.motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                <div className="relative bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Badge */}
                  {service.badge && (<div className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                      {service.badge}
                    </div>)}

                  {/* Icon */}
                  <div className={"w-16 h-16 rounded-2xl bg-gradient-to-br ".concat(service.color, " flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform")}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6 flex-1">
                    {service.features.map(function (feature, idx) { return (<div key={idx} className="flex items-start gap-3">
                        <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"/>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>); })}
                  </div>

                  {/* CTA Button */}
                  <react_router_dom_1.Link to="/signup" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors group">
                    <span>Get Started</span>
                    <lucide_react_1.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </react_router_dom_1.Link>
                </div>
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </section>

      {/* Rest of your existing sections remain the same... */}
      {/* Security Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Your Money is Safe With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bank-level security, regulatory compliance, and 24/7 protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map(function (feature, index) { return (<framer_motion_1.motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees. No surprises. Just honest pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-blue-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-black text-gray-900 mb-6">
                $0<span className="text-lg font-normal text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-700">
                  <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>
                  <span>3 free transfers/month</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>
                  <span>Virtual cards</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>
                  <span>Basic crypto trading</span>
                </li>
              </ul>
              <react_router_dom_1.Link to="/signup" className="block w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold text-center hover:bg-gray-200 transition-colors">
                Get Started
              </react_router_dom_1.Link>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-black mb-6">
                $9.99<span className="text-lg font-normal opacity-80">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <lucide_react_1.CheckCircle className="w-5 h-5"/>
                  <span>Unlimited free transfers</span>
                </li>
                <li className="flex items-center gap-2">
                  <lucide_react_1.CheckCircle className="w-5 h-5"/>
                  <span>Premium metal card</span>
                </li>
                <li className="flex items-center gap-2">
                  <lucide_react_1.CheckCircle className="w-5 h-5"/>
                  <span>12% savings APY</span>
                </li>
                <li className="flex items-center gap-2">
                  <lucide_react_1.CheckCircle className="w-5 h-5"/>
                  <span>Priority support</span>
                </li>
              </ul>
              <react_router_dom_1.Link to="/signup" className="block w-full py-3 bg-white text-blue-600 rounded-xl font-semibold text-center hover:bg-blue-50 transition-colors">
                Upgrade Now
              </react_router_dom_1.Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-blue-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="text-4xl font-black text-gray-900 mb-6">
                $29<span className="text-lg font-normal text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-700">
                  <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>
                  <span>Multi-user access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>
                  <span>Payment gateway API</span>
                </li>
              </ul>
              <react_router_dom_1.Link to="/signup" className="block w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold text-center hover:bg-gray-200 transition-colors">
                Start Free Trial
              </react_router_dom_1.Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join 2 million users who trust ClaveRica for smarter banking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <react_router_dom_1.Link to="/signup" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Open Free Account
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors border-2 border-white/20">
              Talk to Sales
            </react_router_dom_1.Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              We're Here to Help
            </h2>
            <p className="text-xl text-gray-600">
              24/7 support through chat, email, or phone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.MessageCircle className="w-8 h-8 text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Average response time: 2 minutes</p>
              <button className="text-blue-600 font-semibold hover:underline">
                Start Chat →
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.Mail className="w-8 h-8 text-purple-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Response within 24 hours</p>
              <button className="text-purple-600 font-semibold hover:underline">
                Send Email →
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <lucide_react_1.Phone className="w-8 h-8 text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Available 24/7 for urgent issues</p>
              <button className="text-green-600 font-semibold hover:underline">
                Call Now →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);
}
