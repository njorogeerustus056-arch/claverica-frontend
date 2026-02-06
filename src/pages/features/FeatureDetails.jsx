"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeatureDetails;
// src/pages/features/FeatureDetails.tsx
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
// Mock Link component - replace with your actual router Link
var Link = function (_a) {
    var to = _a.to, children = _a.children, className = _a.className;
    return (<a href={to} className={className}>{children}</a>);
};
function FeatureDetails() {
    var _a;
    var _b = (0, react_1.useState)("transfers"), activeFeature = _b[0], setActiveFeature = _b[1];
    var _c = (0, react_1.useState)(1000), transferAmount = _c[0], setTransferAmount = _c[1];
    var _d = (0, react_1.useState)("USD"), fromCurrency = _d[0], setFromCurrency = _d[1];
    var _e = (0, react_1.useState)("GBP"), toCurrency = _e[0], setToCurrency = _e[1];
    var _f = (0, react_1.useState)(false), showDemo = _f[0], setShowDemo = _f[1];
    var _g = (0, react_1.useState)(100), cryptoAmount = _g[0], setCryptoAmount = _g[1];
    var _h = (0, react_1.useState)("emergency"), activeSavingsGoal = _h[0], setActiveSavingsGoal = _h[1];
    var _j = (0, react_1.useState)("premium"), selectedCardTier = _j[0], setSelectedCardTier = _j[1];
    var _k = (0, react_1.useState)(false), showBalance = _k[0], setShowBalance = _k[1];
    // Exchange rates for calculator
    var exchangeRates = {
        "USD-GBP": 0.85,
        "USD-EUR": 0.92,
        "EUR-GBP": 0.88,
        "GBP-USD": 1.18,
        "EUR-USD": 1.09,
        "GBP-EUR": 1.14,
    };
    (0, react_1.useEffect)(function () {
        var params = new URLSearchParams(window.location.search);
        var section = params.get("section");
        if (section && features[section]) {
            setActiveFeature(section);
        }
    }, []);
    // Calculate transfer details
    var calculateTransfer = function () {
        var rateKey = "".concat(fromCurrency, "-").concat(toCurrency);
        var rate = exchangeRates[rateKey] || 1;
        var fee = transferAmount > 1000 ? 0.0049 * transferAmount : 4.99;
        var received = (transferAmount - fee) * rate;
        var bankFee = transferAmount * 0.03 + 25;
        var savings = bankFee - fee;
        return { rate: rate, fee: fee, received: received, bankFee: bankFee, savings: savings };
    };
    var transferResult = calculateTransfer();
    // AI Insights Data
    var aiInsights = {
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
    var features = {
        transfers: {
            title: "Global Money Transfers",
            subtitle: "Send money worldwide instantly with real-time exchange rates",
            gradient: "from-blue-500 to-cyan-500",
            icon: <lucide_react_1.Send className="w-8 h-8"/>,
            heroImage: "💸",
            stats: [
                { value: "180+", label: "Countries", icon: <lucide_react_1.Globe />, detail: "Global coverage" },
                { value: "<30s", label: "Transfer Time", icon: <lucide_react_1.Zap />, detail: "Instant arrival" },
                { value: "$0", label: "Hidden Fees", icon: <lucide_react_1.Shield />, detail: "Transparent pricing" },
                { value: "150+", label: "Currencies", icon: <lucide_react_1.DollarSign />, detail: "Wide support" }
            ],
            benefits: [
                {
                    icon: <lucide_react_1.Zap />,
                    title: "Lightning-Fast Transfers",
                    desc: "Send money instantly to 180+ countries. Real-time processing ensures funds arrive in under 30 seconds.",
                    color: "from-blue-400 to-cyan-400"
                },
                {
                    icon: <lucide_react_1.Globe />,
                    title: "Global Reach",
                    desc: "Access every major currency and local payment method worldwide. From USD to KES, we've got you covered.",
                    color: "from-blue-500 to-indigo-500"
                },
                {
                    icon: <lucide_react_1.Calculator />,
                    title: "Transparent Pricing",
                    desc: "See exact exchange rates and fees upfront. No hidden charges, no surprises. Mid-market rates guaranteed.",
                    color: "from-cyan-500 to-blue-500"
                },
                {
                    icon: <lucide_react_1.ShieldCheck />,
                    title: "Bank-Level Security",
                    desc: "256-bit encryption, real-time fraud monitoring, and FDIC insurance on all transfers.",
                    color: "from-indigo-500 to-purple-500"
                }
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Select Destination",
                    description: "Choose from 180+ countries and 150+ currencies",
                    icon: <lucide_react_1.Globe />
                },
                {
                    step: 2,
                    title: "Enter Amount",
                    description: "See live exchange rate and total fees instantly",
                    icon: <lucide_react_1.Calculator />
                },
                {
                    step: 3,
                    title: "Verify & Send",
                    description: "Confirm with biometric authentication",
                    icon: <lucide_react_1.Shield />
                },
                {
                    step: 4,
                    title: "Money Arrives",
                    description: "Recipient gets funds in under 30 seconds",
                    icon: <lucide_react_1.CheckCircle />
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
            gradient: "from-purple-500 to-pink-500",
            icon: <lucide_react_1.Wallet className="w-8 h-8"/>,
            heroImage: "₿",
            stats: [
                { value: "50+", label: "Cryptocurrencies", icon: <lucide_react_1.Coins />, detail: "Wide selection" },
                { value: "24/7", label: "Trading", icon: <lucide_react_1.Clock />, detail: "Always open" },
                { value: "95%", label: "Cold Storage", icon: <lucide_react_1.Lock />, detail: "Maximum security" },
                { value: "<1ms", label: "Trade Speed", icon: <lucide_react_1.Zap />, detail: "Instant execution" }
            ],
            benefits: [
                {
                    icon: <lucide_react_1.Lock />,
                    title: "Maximum Security",
                    desc: "95% of assets in cold storage with multi-signature protection. $250M insurance coverage.",
                    color: "from-purple-500 to-indigo-500"
                },
                {
                    icon: <lucide_react_1.Zap />,
                    title: "Institutional-Grade Trading",
                    desc: "Execute trades in milliseconds with our high-performance matching engine. Zero slippage.",
                    color: "from-pink-500 to-rose-500"
                },
                {
                    icon: <lucide_react_1.BarChart3 />,
                    title: "Professional Tools",
                    desc: "Advanced charting, 100+ indicators, market depth, and real-time analytics.",
                    color: "from-indigo-500 to-blue-500"
                },
                {
                    icon: <lucide_react_1.ShieldCheck />,
                    title: "Fully Insured",
                    desc: "Your crypto holdings are insured against theft, hacks, and unauthorized access.",
                    color: "from-rose-500 to-pink-500"
                }
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Browse Markets",
                    description: "Explore 50+ cryptocurrencies with real-time charts",
                    icon: <lucide_react_1.BarChart />
                },
                {
                    step: 2,
                    title: "Choose Order Type",
                    description: "Market, limit, stop-loss, or OCO orders",
                    icon: <lucide_react_1.Settings />
                },
                {
                    step: 3,
                    title: "Execute Trade",
                    description: "Instant execution with <1ms latency",
                    icon: <lucide_react_1.Zap />
                },
                {
                    step: 4,
                    title: "Track Portfolio",
                    description: "Real-time P&L and performance analytics",
                    icon: <lucide_react_1.TrendingUp />
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
            gradient: "from-emerald-500 to-teal-500",
            icon: <lucide_react_1.PiggyBank className="w-8 h-8"/>,
            heroImage: "💰",
            stats: [
                { value: "12%", label: "Max APY", icon: <lucide_react_1.TrendingUp />, detail: "Industry leading" },
                { value: "$0", label: "Minimum", icon: <lucide_react_1.DollarSign />, detail: "Start any amount" },
                { value: "Daily", label: "Compounding", icon: <lucide_react_1.RefreshCw />, detail: "Maximize growth" },
                { value: "$250K", label: "FDIC Insured", icon: <lucide_react_1.Shield />, detail: "Full protection" }
            ],
            benefits: [
                {
                    icon: <lucide_react_1.TrendingUp />,
                    title: "Industry-Leading Rates",
                    desc: "Earn up to 12% APY - 40x higher than traditional banks. Watch your money grow faster.",
                    color: "from-emerald-500 to-green-500"
                },
                {
                    icon: <lucide_react_1.RefreshCw />,
                    title: "Daily Compounding",
                    desc: "Interest compounds daily, maximizing your earnings. Every day your balance grows.",
                    color: "from-teal-500 to-cyan-500"
                },
                {
                    icon: <lucide_react_1.Target />,
                    title: "Goal-Based Savings",
                    desc: "Set specific goals and track progress with automated contributions.",
                    color: "from-green-500 to-emerald-500"
                },
                {
                    icon: <lucide_react_1.ShieldCheck />,
                    title: "FDIC Protected",
                    desc: "Your savings are FDIC insured up to $250,000. Your money is safe.",
                    color: "from-cyan-500 to-blue-500"
                }
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Open Account",
                    description: "Set up in 2 minutes with no paperwork",
                    icon: <lucide_react_1.Plus />
                },
                {
                    step: 2,
                    title: "Deposit Funds",
                    description: "Transfer from any bank instantly",
                    icon: <lucide_react_1.Download />
                },
                {
                    step: 3,
                    title: "Watch Growth",
                    description: "Interest compounds daily automatically",
                    icon: <lucide_react_1.TrendingUp />
                },
                {
                    step: 4,
                    title: "Withdraw Anytime",
                    description: "Access funds instantly with no penalties",
                    icon: <lucide_react_1.Minus />
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
                { name: "Emergency Fund", target: "$10,000", saved: "$4,200", color: "from-blue-500 to-cyan-500" },
                { name: "Dream Vacation", target: "$5,000", saved: "$1,800", color: "from-purple-500 to-pink-500" },
                { name: "New Car", target: "$25,000", saved: "$8,500", color: "from-emerald-500 to-teal-500" },
                { name: "Home Down Payment", target: "$50,000", saved: "$12,300", color: "from-orange-500 to-amber-500" }
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
            gradient: "from-amber-500 to-orange-500",
            icon: <lucide_react_1.CreditCard className="w-8 h-8"/>,
            heroImage: "💳",
            stats: [
                { value: "3%", label: "Max Cashback", icon: <lucide_react_1.TrendingUp />, detail: "Unlimited earnings" },
                { value: "60M+", label: "Locations", icon: <lucide_react_1.Globe />, detail: "Global acceptance" },
                { value: "$0", label: "Foreign Fees", icon: <lucide_react_1.DollarSign />, detail: "Travel freely" },
                { value: "1,200+", label: "Lounge Access", icon: <lucide_react_1.Plane />, detail: "Airport lounges" }
            ],
            benefits: [
                {
                    icon: <lucide_react_1.TrendingUp />,
                    title: "Premium Cashback",
                    desc: "Earn up to 3% cashback on all purchases. Unlimited earnings with no caps.",
                    color: "from-amber-500 to-yellow-500"
                },
                {
                    icon: <lucide_react_1.Globe />,
                    title: "Global Acceptance",
                    desc: "Use your card at 60M+ locations worldwide. Zero foreign transaction fees.",
                    color: "from-orange-500 to-red-500"
                },
                {
                    icon: <lucide_react_1.Plane />,
                    title: "Travel Benefits",
                    desc: "Complimentary access to 1,200+ airport lounges globally. Travel insurance included.",
                    color: "from-yellow-500 to-amber-500"
                },
                {
                    icon: <lucide_react_1.ShieldCheck />,
                    title: "Purchase Protection",
                    desc: "Built-in insurance, extended warranty, and fraud protection on all purchases.",
                    color: "from-red-500 to-rose-500"
                }
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Choose Tier",
                    description: "Select from Standard, Gold, or Platinum",
                    icon: <lucide_react_1.Settings />
                },
                {
                    step: 2,
                    title: "Apply Online",
                    description: "2-minute application with instant approval",
                    icon: <lucide_react_1.FileText />
                },
                {
                    step: 3,
                    title: "Receive Card",
                    description: "Get metal card in 5-7 business days",
                    icon: <lucide_react_1.Download />
                },
                {
                    step: 4,
                    title: "Start Earning",
                    description: "Immediate cashback on all purchases",
                    icon: <lucide_react_1.DollarSign />
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
            gradient: "from-rose-500 to-pink-500",
            icon: <lucide_react_1.Receipt className="w-8 h-8"/>,
            heroImage: "📄",
            stats: [
                { value: "5,000+", label: "Billers", icon: <lucide_react_1.Receipt />, detail: "Wide coverage" },
                { value: "0.5%", label: "Cashback", icon: <lucide_react_1.TrendingUp />, detail: "Earn on payments" },
                { value: "Instant", label: "Processing", icon: <lucide_react_1.Zap />, detail: "No delays" },
                { value: "Auto-Pay", label: "Available", icon: <lucide_react_1.CheckCircle />, detail: "Never miss a bill" }
            ],
            benefits: [
                {
                    icon: <lucide_react_1.Clock />,
                    title: "Never Miss a Payment",
                    desc: "Schedule payments in advance and set up automatic recurring payments. Smart reminders ensure you're never late.",
                    color: "from-rose-500 to-pink-500"
                },
                {
                    icon: <lucide_react_1.Bell />,
                    title: "Smart Reminders",
                    desc: "Receive push notifications 3 days before each bill is due with exact amounts. Stay in control.",
                    color: "from-pink-500 to-purple-500"
                },
                {
                    icon: <lucide_react_1.Calculator />,
                    title: "Earn Cashback",
                    desc: "Get 0.5% cashback on all bill payments. Save money while paying your bills.",
                    color: "from-purple-500 to-indigo-500"
                },
                {
                    icon: <lucide_react_1.PieChart />,
                    title: "Spending Insights",
                    desc: "Track your bill payments, identify spending patterns, and optimize your budget.",
                    color: "from-indigo-500 to-blue-500"
                }
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Add Billers",
                    description: "Connect utilities, subscriptions, and services",
                    icon: <lucide_react_1.Plus />
                },
                {
                    step: 2,
                    title: "Set Schedule",
                    description: "Choose one-time, recurring, or auto-pay",
                    icon: <lucide_react_1.Calendar />
                },
                {
                    step: 3,
                    title: "Get Notified",
                    description: "Reminders 3 days before due date",
                    icon: <lucide_react_1.Bell />
                },
                {
                    step: 4,
                    title: "Pay Instantly",
                    description: "Process payments with digital receipts",
                    icon: <lucide_react_1.CheckCircle />
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
            gradient: "from-violet-500 to-purple-500",
            icon: <lucide_react_1.Gift className="w-8 h-8"/>,
            heroImage: "🎁",
            stats: [
                { value: "3x", label: "Max Multiplier", icon: <lucide_react_1.TrendingUp />, detail: "Highest tier" },
                { value: "Every $1", label: "Earns Points", icon: <lucide_react_1.DollarSign />, detail: "All spending" },
                { value: "500+", label: "Reward Options", icon: <lucide_react_1.Gift />, detail: "Flexible redemption" },
                { value: "Never", label: "Points Expire", icon: <lucide_react_1.Clock />, detail: "Use anytime" }
            ],
            benefits: [
                {
                    icon: <lucide_react_1.TrendingUp />,
                    title: "Earn Everywhere",
                    desc: "Earn points on card purchases, bill payments, transfers, crypto trades - every transaction rewards you.",
                    color: "from-violet-500 to-purple-500"
                },
                {
                    icon: <lucide_react_1.Award />,
                    title: "Loyalty Tiers",
                    desc: "Climb through Bronze, Silver, Gold, and Platinum tiers to earn up to 3x points on every dollar.",
                    color: "from-purple-500 to-pink-500"
                },
                {
                    icon: <lucide_react_1.Gift />,
                    title: "Flexible Redemption",
                    desc: "Redeem points for cash back, travel bookings, gift cards, bill credits, or exclusive merchandise.",
                    color: "from-pink-500 to-rose-500"
                },
                {
                    icon: <lucide_react_1.Users />,
                    title: "Referral Bonuses",
                    desc: "Earn 500 bonus points for every friend you refer. They get 500 points too. Build rewards together.",
                    color: "from-rose-500 to-red-500"
                }
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Earn Points",
                    description: "1-3 points per $1 spent based on your tier",
                    icon: <lucide_react_1.Plus />
                },
                {
                    step: 2,
                    title: "Climb Tiers",
                    description: "Higher balances unlock better rewards",
                    icon: <lucide_react_1.TrendingUp />
                },
                {
                    step: 3,
                    title: "Track Balance",
                    description: "Real-time points dashboard",
                    icon: <lucide_react_1.DollarSign />
                },
                {
                    step: 4,
                    title: "Redeem Instantly",
                    description: "Cash, travel, gift cards, and more",
                    icon: <lucide_react_1.Gift />
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
    var currentFeature = features[activeFeature];
    return (<div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ClaveRica
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition">
              ← Back to Home
            </Link>
            <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition text-sm sm:text-base">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Feature Navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-2">
            {Object.entries(features).map(function (_a) {
            var key = _a[0], feature = _a[1];
            return (<button key={key} onClick={function () { return setActiveFeature(key); }} className={"flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap font-semibold transition-all flex-shrink-0 ".concat(activeFeature === key
                    ? "bg-gradient-to-r ".concat(feature.gradient, " text-white shadow-lg scale-105")
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
                <span className="text-sm">{feature.icon}</span>
                <span className="text-sm">{feature.title}</span>
              </button>);
        })}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={"relative py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-br ".concat(currentFeature.gradient, " overflow-hidden")}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"/>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}/>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-8xl mb-8">
            {currentFeature.heroImage}
          </framer_motion_1.motion.div>
          
          <framer_motion_1.motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            {currentFeature.title}
          </framer_motion_1.motion.h1>
          
          <framer_motion_1.motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            {currentFeature.subtitle}
          </framer_motion_1.motion.p>

          {/* Stats */}
          <framer_motion_1.motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {currentFeature.stats.map(function (stat, idx) { return (<div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-white/80 mb-2">{stat.icon}</div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>); })}
          </framer_motion_1.motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Main Benefits */}
        <section className="mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Why Choose{" "}
            <span className={"bg-gradient-to-r ".concat(currentFeature.gradient, " bg-clip-text text-transparent")}>
              {currentFeature.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Discover the powerful features that make ClaveRica the best choice for your financial needs
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {currentFeature.benefits.map(function (benefit, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={"w-16 h-16 rounded-2xl bg-gradient-to-br ".concat(currentFeature.gradient, " flex items-center justify-center text-white mb-6")}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </framer_motion_1.motion.div>); })}
          </div>
        </section>

        {/* AI-Powered Insights Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 sm:p-12 text-white overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <lucide_react_1.Cpu className="w-6 h-6"/>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">AI-Powered Insights</h2>
                <p className="text-gray-400">Smart features that help you save more and earn more</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {(aiInsights[activeFeature] || []).map(function (insight, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                  <p className="text-gray-300 mb-3">{insight.desc}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    <lucide_react_1.Sparkles className="w-3 h-3"/>
                    {insight.savings}
                  </div>
                </framer_motion_1.motion.div>); })}
            </div>
          </div>
        </section>

        {/* Interactive Transfer Calculator (for transfers feature) */}
        {activeFeature === "transfers" && (<section className="mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Live Transfer Calculator</h2>
                <p className="text-gray-600">See exactly how much you'll save compared to traditional banks</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">You send</label>
                      <div className="flex border-2 border-gray-300 rounded-xl overflow-hidden hover:border-blue-500 transition-colors">
                        <div className="flex-1 px-4 py-3">
                          <input type="number" value={transferAmount} onChange={function (e) { return setTransferAmount(parseFloat(e.target.value) || 0); }} className="w-full outline-none text-2xl font-bold" min="1"/>
                        </div>
                        <select value={fromCurrency} onChange={function (e) { return setFromCurrency(e.target.value); }} className="border-l border-gray-300 px-4 bg-gray-50 text-base font-medium">
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                          <option>JPY</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">They receive</label>
                      <div className="flex border-2 border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                        <div className="flex-1 px-4 py-3">
                          <div className="text-2xl font-bold text-gray-900">
                            {transferResult.received.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })} {toCurrency}
                          </div>
                        </div>
                        <select value={toCurrency} onChange={function (e) { return setToCurrency(e.target.value); }} className="border-l border-gray-300 px-4 bg-gray-50 text-base font-medium">
                          <option>GBP</option>
                          <option>EUR</option>
                          <option>USD</option>
                          <option>JPY</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">You save vs banks</div>
                          <div className="text-2xl font-bold text-green-700">${transferResult.savings.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Our fee</div>
                          <div className="text-xl font-bold">${transferResult.fee.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold mb-4">Comparison with Competitors</h3>
                  <div className="space-y-3">
                    {(_a = currentFeature.comparison) === null || _a === void 0 ? void 0 : _a.map(function (comp, idx) { return (<div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <span className={"font-medium ".concat(comp.provider === "ClaveRica" ? "text-blue-600" : "text-gray-700")}>
                          {comp.provider}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">{comp.fee}</span>
                          <span className="text-sm">{comp.speed}</span>
                          <span className={"px-2 py-1 rounded-full text-xs ".concat(comp.rate === "Excellent" ? "bg-green-100 text-green-800" :
                    comp.rate === "Good" ? "bg-blue-100 text-blue-800" :
                        comp.rate === "Average" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800")}>
                            {comp.rate}
                          </span>
                        </div>
                      </div>); })}
                  </div>
                </div>
              </div>
            </div>
          </section>)}

        {/* Crypto Live Prices (for crypto feature) */}
        {activeFeature === "crypto" && currentFeature.cryptoList && (<section className="mb-20">
            <div className={"bg-gradient-to-br ".concat(currentFeature.gradient, " rounded-3xl p-8 text-white overflow-hidden")}>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Live Crypto Prices</h3>
                <p className="text-white/80">Real-time prices for top cryptocurrencies</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFeature.cryptoList.map(function (crypto, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{crypto.name}</p>
                        <p className="text-white/60 text-sm">{crypto.symbol}</p>
                      </div>
                      <div className={"px-2 py-1 rounded text-xs font-bold ".concat(crypto.change.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300')}>
                        {crypto.change}
                      </div>
                    </div>
                    <p className="text-2xl font-bold">{crypto.price}</p>
                    <p className="text-white/60 text-xs">Market Cap: {crypto.marketCap}</p>
                  </framer_motion_1.motion.div>); })}
              </div>
            </div>
          </section>)}

        {/* How It Works */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentFeature.howItWorks.map(function (step, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative">
                  <div className={"w-12 h-12 rounded-full bg-gradient-to-br ".concat(currentFeature.gradient, " flex items-center justify-center text-2xl font-bold mb-6")}>
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/90 leading-relaxed">{step.description}</p>
                  {idx < currentFeature.howItWorks.length - 1 && (<lucide_react_1.ArrowRight className="hidden lg:block absolute top-6 -right-8 w-6 h-6 text-white/30"/>)}
                </framer_motion_1.motion.div>); })}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Everything you need, all in one place
          </p>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              {currentFeature.features.map(function (feature, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <lucide_react_1.CheckCircle className={"w-6 h-6 text-transparent bg-gradient-to-r ".concat(currentFeature.gradient, " bg-clip-text flex-shrink-0 mt-1")}/>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </framer_motion_1.motion.div>); })}
            </div>
          </div>
        </section>

        {/* Savings Goals Visualization (for savings feature) */}
        {activeFeature === "savings" && currentFeature.savingsGoals && (<section className="mb-20">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">Savings Goals</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentFeature.savingsGoals.map(function (goal, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={"bg-gradient-to-br ".concat(goal.color, " rounded-2xl p-6 text-white text-center")}>
                    <h3 className="text-xl font-bold mb-2">{goal.name}</h3>
                    <div className="text-3xl font-bold mb-4">
                      ${goal.saved} / ${goal.target}
                    </div>
                    <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: "".concat((parseInt(goal.saved.replace('$', '').replace(',', '')) / parseInt(goal.target.replace('$', '').replace(',', ''))) * 100, "%") }}/>
                    </div>
                    <p className="text-white/80 text-sm mt-2">
                      {Math.round((parseInt(goal.saved.replace('$', '').replace(',', '')) / parseInt(goal.target.replace('$', '').replace(',', ''))) * 100)}% Complete
                    </p>
                  </framer_motion_1.motion.div>); })}
              </div>
            </div>
          </section>)}

        {/* Use Cases (for transfers feature) */}
        {activeFeature === "transfers" && currentFeature.useCases && (<section className="mb-20">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">Perfect For</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentFeature.useCases.map(function (useCase, idx) { return (<framer_motion_1.motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <lucide_react_1.TrendingUp className="w-3 h-3"/>
                      {useCase.savings}
                    </div>
                  </framer_motion_1.motion.div>); })}
              </div>
            </div>
          </section>)}

        {/* Testimonial */}
        {currentFeature.testimonial && (<section className="mb-20">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-6 justify-center">
                  {__spreadArray([], Array(5), true).map(function (_, i) { return (<lucide_react_1.Star key={i} className="w-6 h-6 text-yellow-500" fill="currentColor"/>); })}
                </div>
                <p className="text-2xl sm:text-3xl text-gray-900 font-medium mb-8 text-center leading-relaxed">
                  "{currentFeature.testimonial.text}"
                </p>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {currentFeature.testimonial.avatar}
                  </div>
                  <p className="text-xl font-bold text-gray-900">{currentFeature.testimonial.name}</p>
                  <p className="text-gray-600">{currentFeature.testimonial.role} • {currentFeature.testimonial.country}</p>
                </div>
              </div>
            </div>
          </section>)}

        {/* Final CTA */}
        <section className={"bg-gradient-to-br ".concat(currentFeature.gradient, " rounded-3xl p-8 sm:p-16 text-white text-center relative overflow-hidden")}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"/>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}/>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl sm:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
              Join 5M+ users and experience the future of {currentFeature.title.toLowerCase()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                Open Free Account
                <lucide_react_1.ArrowRight className="w-6 h-6"/>
              </Link>
              <button onClick={function () { return setShowDemo(true); }} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30">
                <lucide_react_1.Play className="w-5 h-5"/>
                Watch Demo
              </button>
            </div>
            <p className="text-sm opacity-80 mt-6">
              No credit card required • Set up in 2 minutes • FDIC Insured
            </p>
          </div>
        </section>
      </div>

      <style>{"\n        .scrollbar-hide::-webkit-scrollbar {\n          display: none;\n        }\n        .scrollbar-hide {\n          -ms-overflow-style: none;\n          scrollbar-width: none;\n        }\n      "}</style>
    </div>);
}
