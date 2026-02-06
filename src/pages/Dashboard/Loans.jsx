"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.default = Loans;
// src/pages/Dashboard/Loans.tsx
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var auth_1 = require("../../lib/store/auth");
var ProtectedRoute_1 = require("../../components/ProtectedRoute");
var LoanCard_1 = require("../../components/loans/LoanCard");
var LoanCalculator_1 = require("../../components/loans/LoanCalculator");
var LoanComparison_1 = require("../../components/loans/LoanComparison");
var EligibilityBadge_1 = require("../../components/loans/EligibilityBadge");
var RepaymentSchedule_1 = require("../../components/loans/RepaymentSchedule");
var LoanRecommendation_1 = require("../../components/loans/LoanRecommendation");
var dumpster_1 = require("../../services/dumpster");
require("../../components/loans/styles/loans.css");
// ─────────────────────────────────────────────────────────────
// LOAN PRODUCT DATA (Modern Fintech Style - Inspired by Wise/Revolut/Monzo)
// ─────────────────────────────────────────────────────────────
var loanProducts = [
    {
        id: "personal",
        name: "Personal Loan",
        provider: "Claverica Finance",
        icon: lucide_react_1.Wallet,
        color: "from-cyan-500 to-blue-600",
        badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        interest: "4.9%",
        amount: "Up to $50,000",
        term: "12-60 months",
        features: [
            "No collateral required",
            "Fixed monthly payments",
            "Early repayment allowed",
            "No hidden fees",
        ],
        popular: true,
        eligibility: "Good credit (650+)",
        fundingTime: "24-48 hours",
        providerLogo: "🏦",
        tag: "MOST POPULAR",
        highlights: ["Low APR", "Flexible terms", "Fast approval"],
    },
    {
        id: "business",
        name: "Business Loan",
        provider: "Claverica Business",
        icon: lucide_react_1.Building,
        color: "from-emerald-500 to-green-600",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        interest: "6.5%",
        amount: "Up to $250,000",
        term: "6-84 months",
        features: [
            "Flexible repayment",
            "Business growth support",
            "Tax deductible",
            "Quick approval",
        ],
        popular: false,
        eligibility: "Business revenue $50k+",
        fundingTime: "2-5 business days",
        providerLogo: "💼",
        tag: "FOR ENTREPRENEURS",
        highlights: ["Growth capital", "Tax benefits", "Scale faster"],
    },
    {
        id: "emergency",
        name: "Emergency Cash",
        provider: "Claverica Instant",
        icon: lucide_react_1.Zap,
        color: "from-amber-500 to-orange-600",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        interest: "7.9%",
        amount: "Up to $10,000",
        term: "3-24 months",
        features: [
            "Same-day funding",
            "No paperwork",
            "Simple application",
            "24/7 availability",
        ],
        popular: true,
        eligibility: "Instant approval",
        fundingTime: "Same day",
        providerLogo: "⚡",
        tag: "INSTANT ACCESS",
        highlights: ["24/7 access", "Same-day cash", "No questions"],
    },
    {
        id: "education",
        name: "Education Loan",
        provider: "Claverica Learn",
        icon: lucide_react_1.GraduationCap,
        color: "from-violet-500 to-purple-600",
        badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
        interest: "3.9%",
        amount: "Up to $100,000",
        term: "Up to 120 months",
        features: [
            "Deferred payments",
            "Career counseling",
            "Grace period",
            "Lowest rates",
        ],
        popular: false,
        eligibility: "Student verification",
        fundingTime: "3-7 days",
        providerLogo: "🎓",
        tag: "INVEST IN FUTURE",
        highlights: ["Lowest rates", "Deferred payments", "Career support"],
    },
    {
        id: "mortgage",
        name: "Smart Mortgage",
        provider: "Claverica Homes",
        icon: lucide_react_1.Home,
        color: "from-indigo-500 to-purple-600",
        badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
        interest: "3.2%",
        amount: "Up to $1,000,000",
        term: "120-360 months",
        features: [
            "Fixed/variable rates",
            "No PMI required",
            "Digital closing",
            "Rate match guarantee",
        ],
        popular: false,
        eligibility: "720+ credit score",
        fundingTime: "14-30 days",
        providerLogo: "🏠",
        tag: "DREAM HOME",
        highlights: ["Lowest rates", "Digital process", "No PMI"],
    },
    {
        id: "auto",
        name: "Auto Loan",
        provider: "Claverica Drive",
        icon: lucide_react_1.Car,
        color: "from-rose-500 to-pink-600",
        badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
        interest: "5.2%",
        amount: "Up to $75,000",
        term: "24-84 months",
        features: [
            "Pre-approval online",
            "Dealer financing",
            "GAP insurance",
            "Refinancing options",
        ],
        popular: true,
        eligibility: "Good credit (680+)",
        fundingTime: "1-3 days",
        providerLogo: "🚗",
        tag: "NEW WHEELS",
        highlights: ["Pre-approved", "Dealer network", "GAP included"],
    },
    {
        id: "medical",
        name: "Medical Loan",
        provider: "Claverica Health",
        icon: lucide_react_1.Heart,
        color: "from-red-500 to-rose-600",
        badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
        interest: "6.9%",
        amount: "Up to $150,000",
        term: "12-96 months",
        features: [
            "No upfront costs",
            "Treatment coverage",
            "Deferred interest",
            "Partner hospitals",
        ],
        popular: false,
        eligibility: "Medical necessity",
        fundingTime: "24-72 hours",
        providerLogo: "❤️",
        tag: "HEALTH FIRST",
        highlights: ["No upfront cost", "Partner network", "Flexible terms"],
    },
    {
        id: "investment",
        name: "Investment Loan",
        provider: "Claverica Capital",
        icon: lucide_react_1.LineChart,
        color: "from-amber-500 to-yellow-600",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        interest: "8.5%",
        amount: "Up to $500,000",
        term: "6-36 months",
        features: [
            "Margin trading",
            "Stock collateral",
            "Quick access",
            "Portfolio based",
        ],
        popular: false,
        eligibility: "Investment account $25k+",
        fundingTime: "1-2 business days",
        providerLogo: "📈",
        tag: "GROW WEALTH",
        highlights: ["Margin trading", "Stock collateral", "Quick access"],
    },
];
// ─────────────────────────────────────────────────────────────
// SUCCESS MODAL (Modern Fintech Style)
// ─────────────────────────────────────────────────────────────
var SuccessModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, referenceId = _a.referenceId, loanName = _a.loanName, amount = _a.amount, term = _a.term;
    var handleCopyReferenceId = function () {
        navigator.clipboard.writeText(referenceId);
        // Could add toast here
    };
    return (<framer_motion_1.AnimatePresence>
      {isOpen && (<>
          <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" aria-hidden="true"/>
          
          <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md" role="dialog" aria-modal="true" aria-labelledby="success-modal-title" aria-describedby="success-modal-description">
            <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/10 dark:shadow-black/40">
              {/* Confetti-like top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 rounded-t-2xl"/>
              
              {/* Header with celebration */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30" aria-hidden="true">
                    <lucide_react_1.CheckCircle className="w-6 h-6 text-white"/>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full animate-pulse" aria-hidden="true"/>
                </div>
                <div>
                  <h3 id="success-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">You're on the list! 🎉</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-500">Early Access Program</p>
                </div>
              </div>
              
              {/* Message with emoji */}
              <div className="mb-6">
                <p id="success-modal-description" className="text-slate-700 dark:text-slate-300 mb-3">
                  ✨ <span className="font-semibold text-cyan-600 dark:text-cyan-300">{loanName}</span> interest submitted successfully!
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You're now in our priority queue. We'll contact you with exclusive rates when loans launch.
                </p>
              </div>
              
              {/* Reference Card - Wise/Revolut style */}
              <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center" aria-hidden="true">
                      <lucide_react_1.BadgeCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400"/>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reference ID</span>
                  </div>
                  <button onClick={handleCopyReferenceId} className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2 py-1 rounded-lg transition-colors" aria-label={"Copy reference ID: ".concat(referenceId)}>
                    Copy
                  </button>
                </div>
                <div className="font-mono text-sm text-slate-900 dark:text-white bg-slate-100/50 dark:bg-slate-950/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                  {referenceId}
                </div>
              </div>
              
              {/* What's Next - Monzo style */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-3">
                  <lucide_react_1.Rocket className="w-4 h-4 text-amber-500 dark:text-amber-400"/>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-300">Priority Position</p>
                    <p className="text-xs text-amber-600/80 dark:text-amber-400/80">You'll be first to access when we launch</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-violet-500/10 to-purple-500/5 border border-violet-500/20 rounded-xl p-3">
                  <lucide_react_1.Bell className="w-4 h-4 text-violet-500 dark:text-violet-400"/>
                  <div>
                    <p className="text-xs font-semibold text-violet-600 dark:text-violet-300">Exclusive Updates</p>
                    <p className="text-xs text-violet-600/80 dark:text-violet-400/80">Get early notifications & special offers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-green-500/5 border border-emerald-500/20 rounded-xl p-3">
                  <lucide_react_1.Gift className="w-4 h-4 text-emerald-500 dark:text-emerald-400"/>
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">Launch Bonus</p>
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">Eligible for early adopter rewards</p>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <button onClick={onClose} className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2" aria-label="Continue exploring loan options">
                Continue Exploring
                <lucide_react_1.ChevronRight className="w-4 h-4"/>
              </button>
              
              {/* Small print */}
              <p className="text-xs text-slate-500 dark:text-slate-600 text-center mt-4">
                Our team will contact you within 24-48 hours. No commitment required.
              </p>
            </div>
          </framer_motion_1.motion.div>
        </>)}
    </framer_motion_1.AnimatePresence>);
};
// ─────────────────────────────────────────────────────────────
// EARLY ACCESS MODAL (Replaces KYC Modal)
// ─────────────────────────────────────────────────────────────
var EarlyAccessModal = function (_a) {
    var open = _a.open, loanName = _a.loanName, onClose = _a.onClose, onSubmit = _a.onSubmit, isSubmitting = _a.isSubmitting;
    var handleKeyDown = function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            onSubmit();
        }
    };
    return (<framer_motion_1.AnimatePresence>
      {open && (<>
          <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" aria-hidden="true"/>
          
          <framer_motion_1.motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ type: "spring", damping: 25 }} className="fixed inset-x-4 bottom-0 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50" role="dialog" aria-modal="true" aria-labelledby="early-access-title" aria-describedby="early-access-description">
            <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50">
              {/* Animated gradient header */}
              <div className="h-2 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 animate-gradient-x" aria-hidden="true"/>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30" aria-hidden="true">
                      <lucide_react_1.Rocket className="w-5 h-5 text-white"/>
                    </div>
                    <div>
                      <h3 id="early-access-title" className="text-base font-bold text-slate-900 dark:text-white">Join Early Access</h3>
                      <p id="early-access-description" className="text-xs text-slate-600 dark:text-slate-500">Get priority when {loanName} launches</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 flex items-center justify-center transition-colors" aria-label="Close early access modal">
                    <lucide_react_1.X className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400"/>
                  </button>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {[
                { icon: lucide_react_1.Target, text: "Priority position in waitlist", color: "cyan" },
                { icon: lucide_react_1.Gift, text: "Exclusive launch offers", color: "emerald" },
                { icon: lucide_react_1.Bell, text: "Early notifications", color: "violet" },
                { icon: lucide_react_1.Users, text: "Dedicated support", color: "amber" },
            ].map(function (benefit, idx) {
                var Icon = benefit.icon;
                var colorClass = "text-".concat(benefit.color, "-600 dark:text-").concat(benefit.color, "-400 border-").concat(benefit.color, "-500/20 dark:border-").concat(benefit.color, "-500/30 bg-").concat(benefit.color, "-500/10 dark:bg-").concat(benefit.color, "-500/10");
                return (<div key={idx} className={"flex items-center gap-3 rounded-lg border p-3 ".concat(colorClass)}>
                        <Icon className={"w-4 h-4 text-".concat(benefit.color, "-600 dark:text-").concat(benefit.color, "-400")}/>
                        <span className="text-xs text-slate-700 dark:text-slate-300">{benefit.text}</span>
                      </div>);
            })}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-around bg-slate-100/50 dark:bg-slate-900/50 rounded-xl p-3 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <lucide_react_1.Users className="w-3 h-3 text-slate-500"/>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">150+</p>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-500">Already waiting</p>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"/>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <lucide_react_1.Calendar className="w-3 h-3 text-slate-500"/>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Q2 2024</p>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-500">Expected launch</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-2">
                  <button onClick={onSubmit} onKeyDown={handleKeyDown} disabled={isSubmitting} className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl shadow-lg shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" aria-label={"Join waitlist for ".concat(loanName)} aria-busy={isSubmitting}>
                    {isSubmitting ? (<>
                        <lucide_react_1.Loader2 className="w-4 h-4 animate-spin" aria-hidden="true"/>
                        <span>Submitting...</span>
                      </>) : (<>
                        Join Waitlist for {loanName}
                        <lucide_react_1.ArrowRight className="w-4 h-4" aria-hidden="true"/>
                      </>)}
                  </button>
                  <button onClick={onClose} className="w-full py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 transition-colors" aria-label="Skip early access for now">
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </framer_motion_1.motion.div>
        </>)}
    </framer_motion_1.AnimatePresence>);
};
// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
function LoansContent() {
    var _this = this;
    var _a = (0, auth_1.useAuthStore)(), user = _a.user, token = _a.token;
    // State
    var _b = (0, react_1.useState)(10000), loanAmount = _b[0], setLoanAmount = _b[1];
    var _c = (0, react_1.useState)(24), selectedTerm = _c[0], setSelectedTerm = _c[1];
    var _d = (0, react_1.useState)("personal"), selectedLoan = _d[0], setSelectedLoan = _d[1];
    var _e = (0, react_1.useState)(false), isComparing = _e[0], setIsComparing = _e[1];
    var _f = (0, react_1.useState)([]), compareLoans = _f[0], setCompareLoans = _f[1];
    var _g = (0, react_1.useState)(false), isSubmitting = _g[0], setIsSubmitting = _g[1];
    var _h = (0, react_1.useState)({ total_dumps: 0, by_product: { loan: 0, insurance: 0, escrow: 0 } }), stats = _h[0], setStats = _h[1];
    var _j = (0, react_1.useState)({
        isOpen: false,
        referenceId: '',
        loanName: '',
        amount: 0,
        term: 0,
    }), successModal = _j[0], setSuccessModal = _j[1];
    var _k = (0, react_1.useState)({
        isOpen: false,
        loanId: '',
        loanName: '',
    }), earlyAccessModal = _k[0], setEarlyAccessModal = _k[1];
    // Load stats
    (0, react_1.useEffect)(function () {
        (0, dumpster_1.getDumpsterStats)().then(setStats);
    }, []);
    // Submit loan interest to dumpster
    var submitLoanInterest = (0, react_1.useCallback)(function (loanId, actionLabel, amount, term) { return __awaiter(_this, void 0, void 0, function () {
        var loan, dumpsterData, result, apps, appEntry, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsSubmitting(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    loan = loanProducts.find(function (l) { return l.id === loanId; });
                    dumpsterData = {
                        product: 'loan',
                        product_subtype: loanId,
                        user_email: (user === null || user === void 0 ? void 0 : user.email) || '',
                        user_phone: (user === null || user === void 0 ? void 0 : user.phone) || '',
                        loan_amount: amount || loanAmount,
                        loan_purpose: actionLabel,
                        tenure_months: term || selectedTerm,
                        monthly_income: (user === null || user === void 0 ? void 0 : user.income_range) || 'unknown',
                        employment_type: (user === null || user === void 0 ? void 0 : user.occupation) || 'unknown',
                        timestamp: new Date().toISOString(),
                        source: 'loans_dashboard',
                        additional_data: {
                            loan_name: loan === null || loan === void 0 ? void 0 : loan.name,
                            provider: loan === null || loan === void 0 ? void 0 : loan.provider,
                            interest_rate: loan === null || loan === void 0 ? void 0 : loan.interest,
                            eligibility: loan === null || loan === void 0 ? void 0 : loan.eligibility,
                            funding_time: loan === null || loan === void 0 ? void 0 : loan.fundingTime,
                            user_has_account: !!user,
                            session_id: Math.random().toString(36).substring(7),
                        }
                    };
                    return [4 /*yield*/, (0, dumpster_1.submitToDumpster)(dumpsterData, token)];
                case 2:
                    result = _b.sent();
                    apps = JSON.parse(localStorage.getItem('claverica_loan_applications') || '[]');
                    appEntry = {
                        referenceId: result.reference_id,
                        loanType: loan === null || loan === void 0 ? void 0 : loan.name,
                        amount: amount || loanAmount,
                        date: new Date().toISOString(),
                        status: 'pending',
                        product: 'loan'
                    };
                    apps.push(appEntry);
                    localStorage.setItem('claverica_loan_applications', JSON.stringify(apps));
                    // Show success modal
                    setSuccessModal({
                        isOpen: true,
                        referenceId: result.reference_id,
                        loanName: (loan === null || loan === void 0 ? void 0 : loan.name) || 'Loan',
                        amount: amount || loanAmount,
                        term: term || selectedTerm,
                    });
                    // Refresh stats
                    (0, dumpster_1.getDumpsterStats)().then(setStats);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error('Submission error:', error_1);
                    // Show success anyway
                    setSuccessModal({
                        isOpen: true,
                        referenceId: "LOCAL-".concat(Date.now()),
                        loanName: ((_a = loanProducts.find(function (l) { return l.id === loanId; })) === null || _a === void 0 ? void 0 : _a.name) || 'Loan',
                        amount: amount || loanAmount,
                        term: term || selectedTerm,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    setEarlyAccessModal({ isOpen: false, loanId: '', loanName: '' });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [user, token, loanAmount, selectedTerm]);
    // Open early access modal
    var openEarlyAccessModal = function (loanId) {
        var loan = loanProducts.find(function (l) { return l.id === loanId; });
        setEarlyAccessModal({
            isOpen: true,
            loanId: loanId,
            loanName: (loan === null || loan === void 0 ? void 0 : loan.name) || 'Loan',
        });
    };
    // Action handlers
    var handleApplyForLoan = (0, react_1.useCallback)(function (loanId) {
        openEarlyAccessModal(loanId);
    }, []);
    var handleViewRates = (0, react_1.useCallback)(function () {
        submitLoanInterest(selectedLoan, "View exclusive rates", loanAmount, selectedTerm);
    }, [selectedLoan, loanAmount, selectedTerm, submitLoanInterest]);
    var handleStartVerification = (0, react_1.useCallback)(function () {
        submitLoanInterest(selectedLoan, "Start loan verification", loanAmount, selectedTerm);
    }, [selectedLoan, loanAmount, selectedTerm, submitLoanInterest]);
    var handleRecommendationSelect = (0, react_1.useCallback)(function (loanId) {
        setSelectedLoan(loanId);
        openEarlyAccessModal(loanId);
    }, []);
    var handleComparisonApply = (0, react_1.useCallback)(function () {
        var best = compareLoans.reduce(function (a, b) {
            var loanA = loanProducts.find(function (l) { return l.id === a; });
            var loanB = loanProducts.find(function (l) { return l.id === b; });
            return (parseFloat((loanA === null || loanA === void 0 ? void 0 : loanA.interest) || "99") < parseFloat((loanB === null || loanB === void 0 ? void 0 : loanB.interest) || "99")) ? a : b;
        });
        openEarlyAccessModal(best);
    }, [compareLoans]);
    var handleCompareToggle = (0, react_1.useCallback)(function (loanId) {
        setCompareLoans(function (prev) {
            if (prev.includes(loanId))
                return prev.filter(function (id) { return id !== loanId; });
            if (prev.length < 3)
                return __spreadArray(__spreadArray([], prev, true), [loanId], false);
            return prev;
        });
    }, []);
    var handleEligibilityKeyDown = function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            handleViewRates();
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 
                    dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20">
      {/* Animated background grid */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                        from-cyan-500/5 via-transparent to-transparent"/>
        <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23425466' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ════════════════════════════════════════════════
            HEADER (Wise/Revolut Style)
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30" aria-hidden="true">
                  <lucide_react_1.DollarSign className="w-7 h-7 text-white"/>
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                  EARLY ACCESS
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Smart Loans</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Join {stats.by_product.loan}+ others on the waitlist
                </p>
              </div>
            </div>

            {/* User Stats */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-600 dark:text-slate-500">Pre-approved for</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">$50,000</p>
                </div>
                <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"/>
                <div className="text-right">
                  <p className="text-xs text-slate-600 dark:text-slate-500">Best Rate</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">3.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Banner - Monzo Style */}
          <div className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" aria-hidden="true"/>
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Welcome back, <span className="text-cyan-600 dark:text-cyan-300">{(user === null || user === void 0 ? void 0 : user.first_name) || "valued customer"}</span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Submit interest for exclusive early access rates
                </p>
              </div>
              <div className="flex items-center gap-6">
                {[
            { icon: lucide_react_1.Zap, value: "Instant", label: "Waitlist", color: "amber" },
            { icon: lucide_react_1.Lock, value: "Secure", label: "Submission", color: "emerald" },
            { icon: lucide_react_1.Gift, value: "Bonus", label: "On Launch", color: "violet" },
        ].map(function (stat) {
            var Icon = stat.icon;
            return (<div key={stat.label} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Icon className={"w-4 h-4 text-".concat(stat.color, "-600 dark:text-").concat(stat.color, "-400")}/>
                        <p className={"text-lg font-bold text-".concat(stat.color, "-600 dark:text-").concat(stat.color, "-400")}>{stat.value}</p>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-500">{stat.label}</p>
                    </div>);
        })}
              </div>
            </div>
          </div>
        </framer_motion_1.motion.div>

        {/* ════════════════════════════════════════════════
            ELIGIBILITY BADGE
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div onClick={handleViewRates} onKeyDown={handleEligibilityKeyDown} role="button" tabIndex={0} className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-xl" aria-label="View exclusive loan rates based on your eligibility score">
            <EligibilityBadge_1.default score={85} status="Excellent" amount={50000}/>
          </div>
        </framer_motion_1.motion.div>

        {/* ════════════════════════════════════════════════
            AI RECOMMENDATIONS
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
          <LoanRecommendation_1.default userProfile={user} loans={loanProducts} onSelectLoan={handleRecommendationSelect}/>
        </framer_motion_1.motion.div>

        {/* ════════════════════════════════════════════════
            CALCULATOR
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <LoanCalculator_1.default loanAmount={loanAmount} setLoanAmount={setLoanAmount} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} selectedLoanId={selectedLoan} loanProducts={loanProducts}/>
        </framer_motion_1.motion.div>

        {/* ════════════════════════════════════════════════
            LOAN PRODUCTS GRID
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Available Loan Products</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Submit interest for early access</p>
            </div>
            <div className="flex items-center gap-3">
              {compareLoans.length > 0 && (<button onClick={function () { return setIsComparing(true); }} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900" aria-label={"Compare ".concat(compareLoans.length, " selected loans")}>
                  Compare ({compareLoans.length})
                  <lucide_react_1.ArrowRight className="w-4 h-4"/>
                </button>)}
              <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 rounded-lg px-3 py-1.5">
                <lucide_react_1.Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"/>
                <span className="text-xs text-slate-700 dark:text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Secure</span> & encrypted
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loanProducts.map(function (loan) { return (<LoanCard_1.default key={loan.id} loan={loan} isSelected={selectedLoan === loan.id} isCompare={compareLoans.includes(loan.id)} onSelect={function () { return setSelectedLoan(loan.id); }} onCompareToggle={function () { return handleCompareToggle(loan.id); }} onApply={function () { return handleApplyForLoan(loan.id); }}/>); })}
          </div>
        </framer_motion_1.motion.div>

        {/* ════════════════════════════════════════════════
            COMPARISON OVERLAY
        ════════════════════════════════════════════════ */}
        {isComparing && compareLoans.length > 0 && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div onClick={function (e) {
                var _a, _b;
                var target = e.target;
                if ((_b = (_a = target.closest('button')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes('Apply for Best Match')) {
                    e.preventDefault();
                    handleComparisonApply();
                }
            }}>
              <LoanComparison_1.default loans={loanProducts.filter(function (l) { return compareLoans.includes(l.id); })} onClose={function () { return setIsComparing(false); }}/>
            </div>
          </framer_motion_1.motion.div>)}

        {/* ════════════════════════════════════════════════
            REPAYMENT SCHEDULE
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <RepaymentSchedule_1.default amount={loanAmount} term={selectedTerm} interestRate={4.9}/>
        </framer_motion_1.motion.div>

        {/* ════════════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════════════ */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 animate-gradient-x" aria-hidden="true"/>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30" aria-hidden="true">
                  <lucide_react_1.Rocket className="w-6 h-6 text-white"/>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Ready for Early Access?</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Join {stats.by_product.loan}+ others on the waitlist</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
            { icon: lucide_react_1.Zap, label: "Priority Access", sub: "Be first in line", color: "cyan" },
            { icon: lucide_react_1.Gift, label: "Launch Bonus", sub: "Exclusive offers", color: "emerald" },
            { icon: lucide_react_1.Bell, label: "Early Notify", sub: "Get notified first", color: "violet" },
            { icon: lucide_react_1.Lock, label: "No Commitment", sub: "Free to submit", color: "amber" },
        ].map(function (feature) {
            var Icon = feature.icon;
            return (<div key={feature.label} className={"rounded-xl border border-".concat(feature.color, "-500/20 bg-gradient-to-b from-").concat(feature.color, "-500/5 to-transparent p-4")}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={"w-4 h-4 text-".concat(feature.color, "-600 dark:text-").concat(feature.color, "-400")}/>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">{feature.label}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{feature.sub}</p>
                    </div>);
        })}
              </div>

              <button onClick={handleStartVerification} disabled={isSubmitting} className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl shadow-lg shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900" aria-label="Join early access waitlist for loans" aria-busy={isSubmitting}>
                {isSubmitting ? (<>
                    <lucide_react_1.Loader2 className="w-4 h-4 animate-spin" aria-hidden="true"/>
                    <span>Submitting...</span>
                  </>) : (<>
                    Join Early Access Waitlist
                    <lucide_react_1.ArrowRight className="w-4 h-4" aria-hidden="true"/>
                  </>)}
              </button>

              <p className="text-xs text-slate-600 dark:text-slate-500 text-center mt-4">
                No commitment required. We'll contact you when loans launch.
              </p>
            </div>
          </div>
        </framer_motion_1.motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
            MODALS
        ══════════════════════════════════════════════════ */}
      <EarlyAccessModal open={earlyAccessModal.isOpen} loanName={earlyAccessModal.loanName} onClose={function () { return setEarlyAccessModal({ isOpen: false, loanId: '', loanName: '' }); }} onSubmit={function () { return submitLoanInterest(earlyAccessModal.loanId, "Join ".concat(earlyAccessModal.loanName, " waitlist"), loanAmount, selectedTerm); }} isSubmitting={isSubmitting}/>

      <SuccessModal isOpen={successModal.isOpen} onClose={function () { return setSuccessModal(function (prev) { return (__assign(__assign({}, prev), { isOpen: false })); }); }} referenceId={successModal.referenceId} loanName={successModal.loanName} amount={successModal.amount} term={successModal.term}/>
    </div>);
}
function Loans() {
    return (<ProtectedRoute_1.default>
      <LoansContent />
    </ProtectedRoute_1.default>);
}
