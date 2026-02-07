

export const projects = void 0;
// src/data/projects.ts
var lucide_react_1 = require("lucide-react");
export const projects = [
    {
        id: 1,
        title: "Global Instant Money Transfers",
        description: "Send money across 190+ countries with real-time FX rates and instant settlement. Transfer to bank accounts, mobile wallets, or cash pickup locations worldwide.",
        icon: lucide_react_1.Globe,
        color: "from-blue-500 to-cyan-500",
        slug: "global-transfers",
        category: "payments",
        features: [
            "Real-time exchange rates with zero markup",
            "Instant transfers to 80+ countries",
            "Bank deposits, mobile wallets and cash pickup",
            "Track your transfer in real-time"
        ],
        stats: [
            { label: "Countries", value: "190+" },
            { label: "Currencies", value: "140+" },
            { label: "Transfer Speed", value: "< 30 sec" }
        ]
    },
    {
        id: 2,
        title: "Multi-Currency Wallet & FX",
        description: "Hold, exchange, and spend 50+ currencies with a single account. Get interbank FX rates with transparent pricing - no hidden fees, no surprises.",
        icon: lucide_react_1.Wallet,
        color: "from-purple-500 to-pink-500",
        slug: "multi-currency",
        category: "banking",
        features: [
            "Hold 50+ currencies in one wallet",
            "Exchange at real mid-market rates",
            "Automatic currency conversion on spend",
            "Set rate alerts for your currencies"
        ],
        stats: [
            { label: "Currencies Supported", value: "50+" },
            { label: "FX Savings", value: "Up to 8x cheaper" },
            { label: "Rate Updates", value: "Every second" }
        ]
    },
    {
        id: 3,
        title: "Virtual & Physical Cards",
        description: "Create instant virtual cards for online shopping or order physical debit cards. Spend globally with Apple Pay, Google Pay, and contactless payments.",
        icon: lucide_react_1.CreditCard,
        color: "from-indigo-500 to-blue-500",
        slug: "global-cards",
        category: "cards",
        features: [
            "Instant virtual card creation",
            "Physical cards delivered in 5-7 days",
            "Apple Pay & Google Pay support",
            "Real-time transaction notifications"
        ],
        stats: [
            { label: "Card Creation", value: "Instant" },
            { label: "Global Acceptance", value: "45M+ merchants" },
            { label: "Security", value: "3D Secure 2.0" }
        ]
    },
    {
        id: 4,
        title: "Crypto Wallet & Trading",
        description: "Buy, sell, and securely store Bitcoin, Ethereum, and 100+ cryptocurrencies. Trade with low fees and institutional-grade cold storage security.",
        icon: lucide_react_1.Bitcoin,
        color: "from-orange-500 to-amber-500",
        slug: "crypto-wallet",
        category: "crypto",
        features: [
            "100+ cryptocurrencies supported",
            "Industry-leading low trading fees",
            "Cold storage with multi-sig protection",
            "Real-time portfolio tracking"
        ],
        stats: [
            { label: "Supported Assets", value: "100+" },
            { label: "Trading Fee", value: "0.25%" },
            { label: "Security", value: "Military-grade" }
        ]
    },
    {
        id: 5,
        title: "High-Yield Savings Vaults",
        description: "Earn up to 5.2% APY on your savings with daily compounding. Create multiple savings goals and automate your deposits with smart rules.",
        icon: lucide_react_1.PiggyBank,
        color: "from-emerald-500 to-teal-500",
        slug: "savings-vaults",
        category: "savings",
        features: [
            "Competitive APY up to 5.2%",
            "Daily interest compounding",
            "Create unlimited savings goals",
            "Automated deposit rules"
        ],
        stats: [
            { label: "APY", value: "Up to 5.2%" },
            { label: "Minimum Deposit", value: "$0" },
            { label: "Withdrawals", value: "Anytime" }
        ]
    },
    {
        id: 6,
        title: "P2P Lending Marketplace",
        description: "Borrow money at competitive rates or earn returns by lending to verified borrowers. AI-powered credit scoring ensures fair rates and fast approvals.",
        icon: lucide_react_1.Users,
        color: "from-rose-500 to-pink-500",
        slug: "p2p-lending",
        category: "lending",
        features: [
            "Borrow $1,000 - $50,000",
            "Competitive interest rates from 5.9%",
            "Instant AI credit decisions",
            "Flexible repayment terms"
        ],
        stats: [
            { label: "Approval Time", value: "< 2 minutes" },
            { label: "Interest Rate", value: "From 5.9%" },
            { label: "Loan Range", value: "$1K - $50K" }
        ]
    },
    {
        id: 7,
        title: "Business Payments & Payroll",
        description: "Streamline your business operations with automated payroll, bulk payments, invoicing, and expense management - all in one powerful platform.",
        icon: lucide_react_1.Building2,
        color: "from-blue-600 to-indigo-600",
        slug: "business-payments",
        category: "business",
        features: [
            "Automated payroll processing",
            "Bulk payments to 1000+ recipients",
            "International invoicing in 40+ currencies",
            "Expense management & reporting"
        ],
        stats: [
            { label: "Processing Time", value: "Same day" },
            { label: "Bulk Payments", value: "Up to 10K" },
            { label: "Countries", value: "190+" }
        ]
    },
    {
        id: 8,
        title: "Card Payment Processing",
        description: "Accept card payments globally with our scalable payment infrastructure. Support for all major card networks with intelligent routing and fraud prevention.",
        icon: lucide_react_1.Zap,
        color: "from-violet-500 to-purple-500",
        slug: "card-payments",
        category: "payments",
        features: [
            "Accept Visa, Mastercard, Amex, UnionPay",
            "Smart payment routing for best rates",
            "Real-time fraud detection",
            "PCI-DSS Level 1 compliant"
        ],
        stats: [
            { label: "Success Rate", value: "99.9%" },
            { label: "Settlement", value: "T+1" },
            { label: "Uptime", value: "99.99%" }
        ]
    },
    {
        id: 9,
        title: "AI Fraud Detection Suite",
        description: "Protect your business with machine learning-powered fraud detection. Real-time analysis of transaction patterns stops fraud before it happens.",
        icon: lucide_react_1.Shield,
        color: "from-red-500 to-orange-500",
        slug: "fraud-detection",
        category: "security",
        features: [
            "Real-time ML fraud scoring",
            "Behavioral biometrics analysis",
            "Device fingerprinting",
            "Automated risk rules engine"
        ],
        stats: [
            { label: "Detection Rate", value: "99.7%" },
            { label: "False Positives", value: "< 0.1%" },
            { label: "Response Time", value: "< 50ms" }
        ]
    },
    {
        id: 10,
        title: "Subscription Management",
        description: "Track all your subscriptions in one place. Get alerts before renewals, cancel unwanted subscriptions, and optimize your monthly spending automatically.",
        icon: lucide_react_1.Repeat,
        color: "from-cyan-500 to-blue-500",
        slug: "subscriptions",
        category: "budgeting",
        features: [
            "Automatic subscription detection",
            "Renewal reminders and alerts",
            "One-click cancellation",
            "Spending insights and analytics"
        ],
        stats: [
            { label: "Avg. Savings", value: "$500/year" },
            { label: "Tracked Services", value: "1,000+" },
            { label: "Users Saving", value: "2M+" }
        ]
    },
    {
        id: 11,
        title: "Merchant Checkout API",
        description: "Integrate seamless payment experiences into your app or website. Support cards, wallets, and local payment methods with a single API integration.",
        icon: lucide_react_1.Smartphone,
        color: "from-green-500 to-emerald-500",
        slug: "checkout-api",
        category: "business",
        features: [
            "Single API for all payment methods",
            "Mobile SDK for iOS & Android",
            "Pre-built checkout UI components",
            "Real-time payment status webhooks"
        ],
        stats: [
            { label: "Integration Time", value: "< 1 hour" },
            { label: "Payment Methods", value: "50+" },
            { label: "Conversion Rate", value: "+15%" }
        ]
    },
    {
        id: 12,
        title: "Remittance Corridors",
        description: "Send money home to family with the lowest fees. Optimized routes for migrant workers with cash pickup, bank deposit, and mobile money options.",
        icon: lucide_react_1.Heart,
        color: "from-amber-500 to-yellow-500",
        slug: "remittance-corridors",
        category: "payments",
        features: [
            "Lowest fees in major corridors",
            "Multiple payout options",
            "Real-time delivery tracking",
            "Rate lock guarantee"
        ],
        stats: [
            { label: "Fee Savings", value: "Up to 90%" },
            { label: "Payout Locations", value: "500K+" },
            { label: "Delivery Speed", value: "Minutes" }
        ]
    },
    {
        id: 13,
        title: "Micro-Investing & Stocks",
        description: "Start investing with just $1. Buy fractional shares of your favorite companies and build a diversified portfolio with zero commission trading.",
        icon: lucide_react_1.TrendingUp,
        color: "from-purple-600 to-pink-600",
        slug: "investing",
        category: "investing",
        features: [
            "Fractional shares from $1",
            "Zero commission trading",
            "Auto-invest with round-ups",
            "Real-time market data"
        ],
        stats: [
            { label: "Minimum Investment", value: "$1" },
            { label: "Commission", value: "$0" },
            { label: "Available Stocks", value: "10,000+" }
        ]
    },
    {
        id: 14,
        title: "Buy Now Pay Later",
        description: "Split your purchases into interest-free installments. Shop now and pay over time with flexible payment plans and instant approval at checkout.",
        icon: lucide_react_1.DollarSign,
        color: "from-teal-500 to-cyan-500",
        slug: "bnpl",
        category: "lending",
        features: [
            "Split into 4 interest-free payments",
            "Instant approval at checkout",
            "No impact on credit score",
            "Flexible payment schedules"
        ],
        stats: [
            { label: "Approval Rate", value: "95%" },
            { label: "Interest", value: "0%" },
            { label: "Max Purchase", value: "$10,000" }
        ]
    },
    {
        id: 15,
        title: "Digital Identity & KYC",
        description: "Verify customers instantly with AI-powered identity verification. Support for 200+ ID types, biometric authentication, and automated compliance checks.",
        icon: lucide_react_1.UserCheck,
        color: "from-indigo-600 to-purple-600",
        slug: "kyc",
        category: "security",
        features: [
            "AI-powered document verification",
            "Biometric facial recognition",
            "Liveness detection",
            "Global ID type support"
        ],
        stats: [
            { label: "Verification Time", value: "< 30 seconds" },
            { label: "Accuracy", value: "99.8%" },
            { label: "ID Types", value: "200+" }
        ]
    },
    {
        id: 16,
        title: "Expense Splitter",
        description: "Split bills, rent, and group expenses effortlessly. Track who owes what, send payment reminders, and settle up with one tap.",
        icon: lucide_react_1.Split,
        color: "from-pink-500 to-rose-500",
        slug: "expense-splitter",
        category: "budgeting",
        features: [
            "Split expenses multiple ways",
            "Track IOUs and balances",
            "Automated payment reminders",
            "Group expense reports"
        ],
        stats: [
            { label: "Active Groups", value: "5M+" },
            { label: "Split Methods", value: "10+" },
            { label: "Avg. Settlement Time", value: "2 days" }
        ]
    },
    {
        id: 17,
        title: "Student Banking Toolkit",
        description: "Banking designed for international students. Open accounts without SSN, access student discounts, and manage money across borders with ease.",
        icon: lucide_react_1.GraduationCap,
        color: "from-blue-500 to-purple-500",
        slug: "student-banking",
        category: "banking",
        features: [
            "No SSN required to open",
            "Student discount marketplace",
            "Budget tracking & alerts",
            "Parent funding & oversight"
        ],
        stats: [
            { label: "Student Accounts", value: "1M+" },
            { label: "Partner Discounts", value: "500+" },
            { label: "Annual Fee", value: "$0" }
        ]
    },
    {
        id: 18,
        title: "SME Fast Financing",
        description: "Get working capital for your small business in minutes. Smart underwriting uses your business data for instant approval decisions and same-day funding.",
        icon: lucide_react_1.Calculator,
        color: "from-green-600 to-teal-600",
        slug: "sme-loans",
        category: "lending",
        features: [
            "Loans from $5K to $500K",
            "Instant AI-powered approval",
            "Same-day funding available",
            "Flexible repayment terms"
        ],
        stats: [
            { label: "Approval Time", value: "5 minutes" },
            { label: "Funding Speed", value: "Same day" },
            { label: "Loan Range", value: "$5K-$500K" }
        ]
    },
    {
        id: 19,
        title: "Charity Remittance Portal",
        description: "Send donations securely to verified charities and humanitarian organizations worldwide. Track your impact with detailed reporting and transparency.",
        icon: lucide_react_1.Heart,
        color: "from-red-500 to-pink-500",
        slug: "charity-remittance",
        category: "payments",
        features: [
            "Verified charity network",
            "Zero-fee donations option",
            "Impact tracking & reports",
            "Tax receipt automation"
        ],
        stats: [
            { label: "Partner Charities", value: "10,000+" },
            { label: "Donation Fee", value: "0%" },
            { label: "Countries Served", value: "150+" }
        ]
    },
    {
        id: 20,
        title: "NFT & Digital Asset Vault",
        description: "Securely store and manage your NFTs, tokenized assets, and digital collectibles. Multi-signature protection with insurance coverage up to $1M.",
        icon: lucide_react_1.Package,
        color: "from-violet-600 to-purple-600",
        slug: "nft-vault",
        category: "crypto",
        features: [
            "Multi-chain NFT support",
            "Multi-signature security",
            "Insurance coverage up to $1M",
            "Portfolio tracking & analytics"
        ],
        stats: [
            { label: "Supported Chains", value: "15+" },
            { label: "Insurance", value: "Up to $1M" },
            { label: "Storage Fee", value: "$0" }
        ]
    }
];



