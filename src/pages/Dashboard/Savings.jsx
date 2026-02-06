"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Savings;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("../../lib/store/auth");
var ProtectedRoute_1 = require("../../components/ProtectedRoute");
var savingsProducts = [
    {
        id: "easy-access",
        name: "Easy Access Saver",
        provider: "Monzo Savings",
        icon: lucide_react_1.PiggyBank,
        color: "from-blue-500 to-cyan-500",
        apy: "4.25%",
        minDeposit: "$100",
        features: ["Withdraw anytime", "No penalties", "Monthly interest", "FSCS protected"],
        popular: true,
        badge: "Most Popular"
    },
    {
        id: "fixed-term",
        name: "1-Year Fixed Saver",
        provider: "Wise Fixed",
        icon: lucide_react_1.Lock,
        color: "from-emerald-500 to-green-500",
        apy: "5.10%",
        minDeposit: "$1,000",
        features: ["Higher returns", "Fixed rate", "Quarterly interest", "Capital guaranteed"],
        popular: false,
        badge: "Best Rate"
    },
    {
        id: "goals",
        name: "Goal-Based Saver",
        provider: "Revolut Goals",
        icon: lucide_react_1.Target,
        color: "from-purple-500 to-violet-500",
        apy: "4.50%",
        minDeposit: "$50",
        features: ["Set savings goals", "Auto-deposit", "Progress tracking", "Round-ups"],
        popular: true,
        badge: "Smart Saving"
    },
    {
        id: "premium",
        name: "Premium Savings",
        provider: "Skrill Elite",
        icon: lucide_react_1.Award,
        color: "from-amber-500 to-orange-500",
        apy: "4.75%",
        minDeposit: "$10,000",
        features: ["Priority rates", "Dedicated support", "Exclusive offers", "Global access"],
        popular: false,
        badge: "Premium"
    },
    {
        id: "ethical",
        name: "Ethical Saver",
        provider: "Monzo Green",
        icon: lucide_react_1.Globe,
        color: "from-green-500 to-teal-500",
        apy: "4.00%",
        minDeposit: "$500",
        features: ["ESG investments", "Climate positive", "Transparent impact", "Community projects"],
        popular: false,
        badge: "Sustainable"
    },
    {
        id: "roundup",
        name: "Round-Up Saver",
        provider: "Revolut Roundups",
        icon: lucide_react_1.Coins,
        color: "from-pink-500 to-rose-500",
        apy: "3.90%",
        minDeposit: "$0",
        features: ["Automatic saving", "Spare change", "No minimums", "Micro-investing"],
        popular: false,
        badge: "Effortless"
    }
];
function SavingsContent() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, auth_1.useAuthStore)().user;
    var _a = (0, react_1.useState)(null), selectedProduct = _a[0], setSelectedProduct = _a[1];
    var handleOpenAccount = function (productId) {
        setSelectedProduct(productId);
        // Navigate to KYC for savings account opening
        navigate("/dashboard/kyc/submit", {
            state: {
                service_type: "savings",
                savings_product: productId,
                amount: 0, // Minimum deposit will be handled in KYC
                redirectTo: "/dashboard/savings"
            }
        });
    };
    return (<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <lucide_react_1.PiggyBank className="w-6 h-6 text-white"/>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Savings</h1>
              <p className="text-slate-600 dark:text-slate-400">Grow your money, stress-free</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your Financial Future</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Earn up to 5.10% APY with FSCS protection up to $85,000.
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <lucide_react_1.TrendingUp className="w-5 h-5"/>
                <span className="font-medium">Beat inflation with smart savings</span>
              </div>
            </div>
          </div>
        </framer_motion_1.motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Saved</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">$12,450</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <lucide_react_1.Coins className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Annual Interest</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">$529</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <lucide_react_1.Percent className="w-6 h-6 text-green-600 dark:text-green-400"/>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Accounts</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">3</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <lucide_react_1.PiggyBank className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Projected Growth</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">+8.2%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <lucide_react_1.TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400"/>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Products */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Choose Your Savings Account</h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <lucide_react_1.Shield className="w-4 h-4"/>
              <span>All accounts FSCS protected</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsProducts.map(function (product) {
            var Icon = product.icon;
            return (<framer_motion_1.motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 transition-all relative overflow-hidden shadow-lg group">
                  {product.badge && (<div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </div>)}
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(product.color, " flex items-center justify-center")}>
                        <Icon className="w-6 h-6 text-white"/>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{product.provider}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">{product.apy}</span>
                      <span className="text-lg text-slate-600 dark:text-slate-400">APY</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map(function (feature, idx) { return (<li key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <lucide_react_1.Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0"/>
                            {feature}
                          </li>); })}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Min deposit: {product.minDeposit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <lucide_react_1.Zap className="w-4 h-4"/>
                        <span>No monthly fees</span>
                      </div>
                    </div>
                  </div>
                  
                  <button onClick={function () { return handleOpenAccount(product.id); }} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                    Open Account
                    <lucide_react_1.ChevronRight className="w-4 h-4"/>
                  </button>
                </framer_motion_1.motion.div>);
        })}
          </div>
        </div>

        {/* KYC Notice */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <lucide_react_1.AlertCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1"/>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Secure Account Opening</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                To open a savings account and ensure FSCS protection, we need to verify your identity. 
                Our KYC process is quick, secure, and required by financial regulations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <lucide_react_1.Lock className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">FSCS Protected</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Up to $85,000 per person</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <lucide_react_1.Zap className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Instant Access</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Accounts open in minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <lucide_react_1.Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Daily Interest</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Compounded daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function Savings() {
    return (<ProtectedRoute_1.default>
      <SavingsContent />
    </ProtectedRoute_1.default>);
}
