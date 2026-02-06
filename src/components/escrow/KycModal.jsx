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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KycModal;
// File: src/components/escrow/KycModal.tsx (Enhanced Version)
var react_1 = require("react");
var auth_1 = require("../../lib/store/auth");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var userTiers_1 = require("../../lib/utils/userTiers");
// Mock user metrics for demo - in real app, fetch from backend
var SAMPLE_USER_METRICS = {
    totalEscrows: 3,
    totalVolume: 8500,
    completedEscrows: 2,
    avgReleaseTime: 5.5,
    disputeRate: 0,
    templatesUsed: 1,
    lastActivityDays: 7
};
function KycModal(_a) {
    var _this = this;
    var isOpen = _a.isOpen, onClose = _a.onClose, onSuccess = _a.onSuccess, _b = _a.amount, amount = _b === void 0 ? 0 : _b, _c = _a.serviceType, serviceType = _c === void 0 ? "escrow" : _c, _d = _a.redirectTo, redirectTo = _d === void 0 ? "/dashboard/escrow" : _d, _e = _a.showTierUpgrade, showTierUpgrade = _e === void 0 ? true : _e;
    var user = (0, auth_1.useAuthStore)().user;
    var _f = (0, react_1.useState)(1), currentStep = _f[0], setCurrentStep = _f[1];
    var _g = (0, react_1.useState)(false), isSubmitting = _g[0], setIsSubmitting = _g[1];
    var _h = (0, react_1.useState)("idle"), verificationStatus = _h[0], setVerificationStatus = _h[1];
    var _j = (0, react_1.useState)(false), showAchievementPreview = _j[0], setShowAchievementPreview = _j[1];
    var _k = (0, react_1.useState)(false), showTierComparison = _k[0], setShowTierComparison = _k[1];
    // Tier system integration
    var isVerified = (user === null || user === void 0 ? void 0 : user.is_verified) || false;
    var currentTier = (0, userTiers_1.calculateUserTier)(isVerified, SAMPLE_USER_METRICS);
    var tierProgress = (0, userTiers_1.calculateTierProgress)(currentTier, SAMPLE_USER_METRICS, isVerified);
    var achievements = (0, userTiers_1.calculateAchievements)(SAMPLE_USER_METRICS, isVerified);
    var kycMessage = (0, userTiers_1.getKYCMessage)(SAMPLE_USER_METRICS, currentTier);
    var recommendedAction = (0, userTiers_1.getRecommendedAction)(currentTier, SAMPLE_USER_METRICS, isVerified);
    // Calculate unlocked achievements upon KYC
    var kycAchievements = (0, react_1.useMemo)(function () {
        return achievements.filter(function (ach) {
            return ach.id === 'kyc_verified' ||
                ach.id === 'first_escrow' ||
                ach.category === 'engagement';
        }).slice(0, 3);
    }, [achievements]);
    var _l = (0, react_1.useState)([
        {
            id: "id_front",
            type: "government_id",
            name: "Government ID (Front)",
            description: "National ID, Passport, or Driver's License",
            isRequired: true,
            acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
            maxSizeMB: 5,
            tierLocked: false
        },
        {
            id: "id_back",
            type: "government_id",
            name: "Government ID (Back)",
            description: "Back side of your ID document",
            isRequired: true,
            acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
            maxSizeMB: 5,
            tierLocked: false
        },
        {
            id: "selfie",
            type: "selfie",
            name: "Selfie with ID",
            description: "Photo of yourself holding your ID",
            isRequired: true,
            acceptedFormats: [".jpg", ".jpeg", ".png"],
            maxSizeMB: 10,
            tierLocked: false
        },
        {
            id: "proof_of_address",
            type: "address",
            name: "Proof of Address",
            description: "Utility bill or bank statement (last 3 months)",
            isRequired: amount > 10000,
            acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
            maxSizeMB: 5,
            tierLocked: amount > 1500 && !isVerified,
            requiredTier: "Verified"
        },
        {
            id: "additional_doc",
            type: "additional",
            name: "Additional Verification",
            description: "Required for large transactions",
            isRequired: amount > 50000,
            acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
            maxSizeMB: 5,
            tierLocked: amount > 50000 && currentTier !== "Pro",
            requiredTier: "Pro"
        }
    ]), documents = _l[0], setDocuments = _l[1];
    var _m = (0, react_1.useState)({}), uploadedFiles = _m[0], setUploadedFiles = _m[1];
    var _o = (0, react_1.useState)({
        fullName: "".concat((user === null || user === void 0 ? void 0 : user.first_name) || '', " ").concat((user === null || user === void 0 ? void 0 : user.last_name) || '').trim(),
        dateOfBirth: "",
        country: "",
        idNumber: "",
        address: ""
    }), formData = _o[0], setFormData = _o[1];
    var steps = [
        {
            id: 1,
            title: "Requirements",
            description: "What you'll need",
            icon: <lucide_react_1.FileText className="w-5 h-5"/>,
            status: currentStep === 1 ? "current" : currentStep > 1 ? "completed" : "pending"
        },
        {
            id: 2,
            title: "Document Upload",
            description: "Upload your documents",
            icon: <lucide_react_1.Upload className="w-5 h-5"/>,
            status: currentStep === 2 ? "current" : currentStep > 2 ? "completed" : "pending"
        },
        {
            id: 3,
            title: "Review & Submit",
            description: "Verify your information",
            icon: <lucide_react_1.CheckCircle2 className="w-5 h-5"/>,
            status: currentStep === 3 ? "current" : currentStep > 3 ? "completed" : "pending"
        },
        {
            id: 4,
            title: "Verification",
            description: "We'll review your documents",
            icon: <lucide_react_1.Shield className="w-5 h-5"/>,
            status: currentStep === 4 ? "current" : "pending"
        }
    ];
    // Tier benefits display
    var tierBenefits = [
        {
            icon: lucide_react_1.CreditCard,
            title: "Higher Limits",
            description: "From $".concat(userTiers_1.TIERS[currentTier].limits.singleEscrow.toLocaleString(), " to $").concat(userTiers_1.TIERS.Verified.limits.singleEscrow.toLocaleString(), " per escrow"),
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: lucide_react_1.Globe,
            title: "Premium Templates",
            description: "Access 6 premium templates vs 3 basic",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: lucide_react_1.BarChart3,
            title: "Advanced Analytics",
            description: "Get detailed insights and predictions",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: lucide_react_1.Zap,
            title: "Priority Processing",
            description: "Faster escrow completion times",
            gradient: "from-amber-500 to-orange-500"
        }
    ];
    // Show achievement preview on mount if not verified
    (0, react_1.useEffect)(function () {
        if (isOpen && !isVerified && showTierUpgrade) {
            setTimeout(function () {
                setShowAchievementPreview(true);
            }, 500);
        }
    }, [isOpen, isVerified, showTierUpgrade]);
    var handleDocumentUpload = function (docId, file) {
        setUploadedFiles(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[docId] = file, _a)));
        });
        setDocuments(function (prev) { return prev.map(function (doc) {
            return doc.id === docId
                ? __assign(__assign({}, doc), { uploaded: true, previewUrl: URL.createObjectURL(file) }) : doc;
        }); });
    };
    var handleRemoveDocument = function (docId) {
        var updatedFiles = __assign({}, uploadedFiles);
        delete updatedFiles[docId];
        setUploadedFiles(updatedFiles);
        setDocuments(function (prev) { return prev.map(function (doc) {
            return doc.id === docId
                ? __assign(__assign({}, doc), { uploaded: false, previewUrl: undefined }) : doc;
        }); });
    };
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var requiredDocs, allRequiredUploaded, submissionData_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (currentStep < 3) {
                        setCurrentStep(function (prev) { return prev + 1; });
                        return [2 /*return*/];
                    }
                    requiredDocs = documents.filter(function (doc) { return doc.isRequired && !doc.tierLocked; });
                    allRequiredUploaded = requiredDocs.every(function (doc) { return doc.uploaded; });
                    if (!allRequiredUploaded) {
                        alert("Please upload all required documents before submitting.");
                        setCurrentStep(2); // Go back to document upload step
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    setVerificationStatus("submitted");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    submissionData_1 = new FormData();
                    submissionData_1.append("user_id", (user === null || user === void 0 ? void 0 : user.id) || "");
                    submissionData_1.append("full_name", formData.fullName);
                    submissionData_1.append("service_type", serviceType);
                    submissionData_1.append("amount", amount.toString());
                    // Append uploaded files
                    Object.entries(uploadedFiles).forEach(function (_a) {
                        var docId = _a[0], file = _a[1];
                        submissionData_1.append("document_".concat(docId), file);
                    });
                    // Append form data
                    Object.entries(formData).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        submissionData_1.append(key, value);
                    });
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 2:
                    // Simulate API call
                    _a.sent();
                    // Move to verification step
                    setCurrentStep(4);
                    setVerificationStatus("verifying");
                    // Simulate verification process
                    setTimeout(function () {
                        setVerificationStatus("approved");
                        setTimeout(function () {
                            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                            onClose();
                        }, 2000);
                    }, 3000);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("KYC Submission Error:", error_1);
                    setVerificationStatus("rejected");
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleNext = function () {
        if (currentStep < 4) {
            setCurrentStep(function (prev) { return prev + 1; });
        }
    };
    var handleBack = function () {
        if (currentStep > 1) {
            setCurrentStep(function (prev) { return prev - 1; });
        }
    };
    // Tier comparison component
    var TierComparisonCard = function (_a) {
        var _b;
        var tier = _a.tier;
        var tierData = userTiers_1.TIERS[tier];
        var isCurrentTier = tier === currentTier;
        var isNextTier = ((_b = tierProgress.nextTier) === null || _b === void 0 ? void 0 : _b.tier) === tier;
        return (<framer_motion_1.motion.div whileHover={{ scale: 1.02 }} className={"relative p-6 rounded-2xl border-2 transition-all duration-300 ".concat(isCurrentTier
                ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-blue-500/5 shadow-lg'
                : isNextTier
                    ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/5 to-transparent'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50')}>
        {isCurrentTier && (<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
              CURRENT TIER
            </div>
          </div>)}
        
        <div className="flex items-center gap-3 mb-4">
          <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(tierData.gradient, " flex items-center justify-center")}>
            <span className="text-2xl">{tierData.icon}</span>
          </div>
          <div>
            <h4 className={"font-bold ".concat(tierData.color, " text-lg")}>
              {tier}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Level {tierData.level}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Single Escrow</span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${tierData.limits.singleEscrow.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Volume</span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${tierData.limits.monthlyVolume.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active Escrows</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {tierData.limits.activeEscrows}
            </span>
          </div>
        </div>
        
        {isNextTier && (<button onClick={function () { return setShowTierComparison(false); }} className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow">
            Unlock This Tier
          </button>)}
      </framer_motion_1.motion.div>);
    };
    var getStepContent = function () {
        switch (currentStep) {
            case 1:
                return (<div className="space-y-6">
            {/* Personalized KYC Message */}
            <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <lucide_react_1.Zap className="w-7 h-7 text-white"/>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {kycMessage.title}
                  </h4>
                  <p className="text-gray-300 mb-4">
                    {kycMessage.message}
                  </p>
                  <div className={"inline-flex items-center gap-2 px-3 py-1 rounded-full ".concat(kycMessage.urgency === 'high' ? 'bg-red-500/20 text-red-300' :
                        kycMessage.urgency === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-blue-500/20 text-blue-300')}>
                    <lucide_react_1.AlertCircle className="w-4 h-4"/>
                    <span className="text-sm font-medium">
                      {kycMessage.urgency === 'high' ? 'High Priority' :
                        kycMessage.urgency === 'medium' ? 'Recommended' : 'When Ready'}
                    </span>
                  </div>
                </div>
              </div>
            </framer_motion_1.motion.div>

            {/* Current Tier Status */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(userTiers_1.TIERS[currentTier].gradient, " flex items-center justify-center")}>
                    <span className="text-2xl">{userTiers_1.TIERS[currentTier].icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Your Current Tier</h4>
                    <p className="text-gray-400">Level {userTiers_1.TIERS[currentTier].level} • {currentTier}</p>
                  </div>
                </div>
                <button onClick={function () { return setShowTierComparison(true); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                  Compare Tiers
                  <lucide_react_1.TrendingUp className="w-4 h-4"/>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress to Next Tier</span>
                  <span className="text-white font-medium">{tierProgress.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <framer_motion_1.motion.div initial={{ width: 0 }} animate={{ width: "".concat(tierProgress.progress, "%") }} transition={{ duration: 1, ease: "easeOut" }} className={"h-full bg-gradient-to-r ".concat(userTiers_1.TIERS[currentTier].gradient)}/>
                </div>
                <div className="text-xs text-gray-500">
                  {tierProgress.requirementsToNext.length > 0 ? tierProgress.requirementsToNext[0] : "You're at the highest tier!"}
                </div>
              </div>
            </div>

            {/* Tier Benefits Preview */}
            <div className="grid grid-cols-2 gap-4">
              {tierBenefits.map(function (benefit, index) { return (<framer_motion_1.motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors group">
                  <div className={"w-10 h-10 rounded-lg bg-gradient-to-br ".concat(benefit.gradient, " flex items-center justify-center mb-3 group-hover:scale-110 transition-transform")}>
                    <benefit.icon className="w-5 h-5 text-white"/>
                  </div>
                  <h5 className="font-bold text-white mb-1">{benefit.title}</h5>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </framer_motion_1.motion.div>); })}
            </div>

            {/* Recommended Action */}
            <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <lucide_react_1.Target className="w-6 h-6 text-white"/>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white mb-1">Recommended Action</h5>
                  <p className="text-gray-300 text-sm">{recommendedAction.reason}</p>
                </div>
                <div className={"px-3 py-1 rounded-full text-sm font-medium ".concat(recommendedAction.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        recommendedAction.priority === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-blue-500/20 text-blue-300')}>
                  {recommendedAction.priority} priority
                </div>
              </div>
            </framer_motion_1.motion.div>
          </div>);
            case 2:
                return (<div className="space-y-6">
            {/* Achievement Preview */}
            <framer_motion_1.AnimatePresence>
              {showAchievementPreview && (<framer_motion_1.motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20 overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <lucide_react_1.Trophy className="w-6 h-6 text-white"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-white">Achievements You'll Unlock</h5>
                        <button onClick={function () { return setShowAchievementPreview(false); }} className="text-amber-300 hover:text-amber-200">
                          <lucide_react_1.X className="w-4 h-4"/>
                        </button>
                      </div>
                      <div className="flex gap-3">
                        {kycAchievements.map(function (achievement) { return (<div key={achievement.id} className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                            <span className="text-2xl">{achievement.badge}</span>
                            <div>
                              <p className="text-white text-sm font-medium">{achievement.title}</p>
                              <p className="text-gray-400 text-xs">{achievement.description}</p>
                            </div>
                          </div>); })}
                      </div>
                    </div>
                  </div>
                </framer_motion_1.motion.div>)}
            </framer_motion_1.AnimatePresence>

            {/* Document Upload Section */}
            <div className="space-y-4">
              {documents.map(function (doc, index) {
                        var _a;
                        return (<framer_motion_1.motion.div key={doc.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className={"p-4 rounded-xl border-2 transition-all ".concat(doc.uploaded
                                ? 'border-green-500/30 bg-green-500/5'
                                : doc.tierLocked
                                    ? 'border-gray-700 bg-gray-800/30'
                                    : 'border-white/10 bg-white/5 hover:border-white/20')}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={"w-10 h-10 rounded-lg flex items-center justify-center ".concat(doc.uploaded
                                ? 'bg-green-500/20 text-green-400'
                                : doc.tierLocked
                                    ? 'bg-gray-700 text-gray-400'
                                    : 'bg-blue-500/20 text-blue-400')}>
                        {doc.type === 'selfie' ? (<lucide_react_1.Camera className="w-5 h-5"/>) : (<lucide_react_1.FileText className="w-5 h-5"/>)}
                      </div>
                      <div>
                        <h5 className="font-bold text-white">{doc.name}</h5>
                        <p className="text-gray-400 text-sm">{doc.description}</p>
                      </div>
                    </div>
                    
                    {doc.tierLocked ? (<div className="flex items-center gap-2 px-3 py-1 bg-gray-700/50 rounded-full">
                        <lucide_react_1.Lock className="w-3 h-3 text-gray-400"/>
                        <span className="text-gray-400 text-sm">Requires {doc.requiredTier} Tier</span>
                      </div>) : doc.isRequired ? (<div className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                        Required
                      </div>) : (<div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        Optional
                      </div>)}
                  </div>
                  
                  {doc.tierLocked ? (<div className="text-center py-4">
                      <lucide_react_1.Lock className="w-8 h-8 text-gray-500 mx-auto mb-2"/>
                      <p className="text-gray-400">
                        Unlock {doc.requiredTier} tier to upload this document
                      </p>
                      <button onClick={function () { return setShowTierComparison(true); }} className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View Tier Requirements →
                      </button>
                    </div>) : !doc.uploaded ? (<button onClick={function () {
                                    // Simulate file selection
                                    var input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = doc.acceptedFormats.join(',');
                                    input.onchange = function (e) {
                                        var _a;
                                        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                        if (file) {
                                            handleDocumentUpload(doc.id, file);
                                        }
                                    };
                                    input.click();
                                }} className="w-full py-3 border-2 border-dashed border-white/20 hover:border-white/40 rounded-xl text-gray-400 hover:text-white transition-colors">
                      <div className="flex items-center justify-center gap-2">
                        <lucide_react_1.Upload className="w-5 h-5"/>
                        <span>Click to upload or drag and drop</span>
                      </div>
                      <p className="text-xs mt-2">
                        {doc.acceptedFormats.join(', ')} • Max {doc.maxSizeMB}MB
                      </p>
                    </button>) : (<div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <lucide_react_1.CheckCircle2 className="w-5 h-5 text-green-400"/>
                        <span className="text-white">{(_a = uploadedFiles[doc.id]) === null || _a === void 0 ? void 0 : _a.name}</span>
                      </div>
                      <button onClick={function () { return handleRemoveDocument(doc.id); }} className="text-red-400 hover:text-red-300 text-sm font-medium">
                        Remove
                      </button>
                    </div>)}
                </framer_motion_1.motion.div>);
                    })}
            </div>
          </div>);
            case 3:
                return (<div className="space-y-6">
            {/* Tier Upgrade Summary */}
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <lucide_react_1.Rocket className="w-7 h-7 text-white"/>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Ready for Upgrade!</h4>
                  <p className="text-gray-300">Your verification unlocks {userTiers_1.TIERS.Verified.tier} tier benefits</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <lucide_react_1.CreditCard className="w-4 h-4 text-white"/>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Limit Increase</p>
                      <p className="text-white font-bold">33x Higher</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    From ${userTiers_1.TIERS.Basic.limits.singleEscrow.toLocaleString()} to ${userTiers_1.TIERS.Verified.limits.singleEscrow.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <lucide_react_1.Sparkles className="w-4 h-4 text-white"/>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">New Features</p>
                      <p className="text-white font-bold">6 Premium</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Advanced analytics, priority support, more
                  </div>
                </div>
              </div>
            </framer_motion_1.motion.div>

            {/* Review Content */}
            <div className="space-y-4">
              {/* Personal Info Review */}
              <div className="bg-white/5 rounded-xl p-6">
                <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                  <lucide_react_1.User className="w-5 h-5"/>
                  Personal Information
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Your country" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">ID Number</label>
                    <input type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} placeholder="Your ID number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"/>
                  </div>
                </div>
              </div>

              {/* Document Review */}
              <div className="bg-white/5 rounded-xl p-6">
                <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                  <lucide_react_1.FileText className="w-5 h-5"/>
                  Document Review
                </h5>
                <div className="space-y-3">
                  {documents.filter(function (doc) { return doc.uploaded; }).map(function (doc) {
                        var _a;
                        return (<div key={doc.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <lucide_react_1.FileText className="w-5 h-5 text-green-400"/>
                        <div>
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-gray-400 text-sm">{(_a = uploadedFiles[doc.id]) === null || _a === void 0 ? void 0 : _a.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-lg">
                          Ready
                        </span>
                        <button onClick={function () { return handleRemoveDocument(doc.id); }} className="text-red-400 hover:text-red-300">
                          <lucide_react_1.X className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>);
                    })}
                </div>
              </div>
            </div>
          </div>);
            case 4:
                return (<div className="text-center py-8">
            <framer_motion_1.motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 15, stiffness: 200 }} className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <lucide_react_1.ShieldCheck className="w-12 h-12 text-white"/>
            </framer_motion_1.motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              {verificationStatus === "verifying"
                        ? "Verification in Progress"
                        : "Verification Submitted!"}
            </h3>
            
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              {verificationStatus === "verifying"
                        ? "We're reviewing your documents. You'll receive an email once verification is complete."
                        : "Your identity verification is being processed. You'll be notified via email."}
            </p>
            
            {/* Progress indicator */}
            <div className="max-w-md mx-auto mb-8">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                <framer_motion_1.motion.div initial={{ width: 0 }} animate={{ width: verificationStatus === "verifying" ? "70%" : "100%" }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-emerald-500"/>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Status: {verificationStatus === "verifying" ? "Processing" : "Submitted"}</span>
                <span>Estimated: 24-48 hours</span>
              </div>
            </div>
            
            {/* Tier Upgrade Confirmation */}
            {!isVerified && (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <lucide_react_1.Crown className="w-6 h-6 text-yellow-400"/>
                  <div>
                    <h5 className="font-bold text-white">Tier Upgrade Pending</h5>
                    <p className="text-gray-300 text-sm">
                      Your account will be upgraded to <span className="text-green-400 font-medium">Verified Tier</span> upon approval
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">New Limits:</span>
                  <span className="text-white font-medium">${userTiers_1.TIERS.Verified.limits.singleEscrow.toLocaleString()}/escrow</span>
                </div>
              </framer_motion_1.motion.div>)}
          </div>);
            default:
                return null;
        }
    };
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}/>
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-white/20 shadow-2xl w-full max-w-4xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <lucide_react_1.Shield className="w-7 h-7 text-white"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-3xl font-bold text-white">
                        Identity Verification
                      </h2>
                      {!isVerified && (<div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-bold text-white">
                          TIER UPGRADE
                        </div>)}
                    </div>
                    <p className="text-gray-300">
                      {amount > 0
            ? "Complete KYC to unlock transactions above $".concat(amount.toLocaleString())
            : "Complete KYC to unlock all platform features"}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center group">
                  <lucide_react_1.X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"/>
                </button>
              </div>

              {/* User Info with Tier Badge */}
              <div className="flex items-center gap-4 mt-6">
                <div className={"w-12 h-12 rounded-2xl bg-gradient-to-br ".concat(userTiers_1.TIERS[currentTier].gradient, " flex items-center justify-center")}>
                  <span className="text-white text-lg font-bold">
                    {userTiers_1.TIERS[currentTier].icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold">
                      {user === null || user === void 0 ? void 0 : user.first_name} {user === null || user === void 0 ? void 0 : user.last_name}
                    </p>
                    <span className={"text-xs px-2 py-0.5 rounded-full ".concat(userTiers_1.TIERS[currentTier].color, " bg-opacity-20")}>
                      {currentTier} Tier
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{user === null || user === void 0 ? void 0 : user.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {amount > 0 && (<div className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-xl text-sm font-medium border border-amber-500/30">
                      ${amount.toLocaleString()}
                    </div>)}
                  <div className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30">
                    {serviceType.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="px-8 py-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                {steps.map(function (step, index) { return (<div key={step.id} className="flex items-center">
                    <div className={"w-10 h-10 rounded-xl flex items-center justify-center transition-all ".concat(step.status === "current"
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg"
                : step.status === "completed"
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-white/10")}>
                      <div className={step.status === "current" ? "text-white" :
                step.status === "completed" ? "text-white" : "text-gray-500"}>
                        {step.status === "completed" ? <lucide_react_1.CheckCircle2 className="w-5 h-5"/> : step.icon}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className={"text-sm font-medium ".concat(step.status === "current" ? "text-white" :
                step.status === "completed" ? "text-green-400" : "text-gray-500")}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (<div className={"w-12 h-0.5 mx-4 ".concat(step.status === "completed" ? "bg-green-500" : "bg-white/10")}/>)}
                  </div>); })}
              </div>
            </div>

            {/* Tier Comparison Modal */}
            <framer_motion_1.AnimatePresence>
              {showTierComparison && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8">
                  <framer_motion_1.motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/20 shadow-2xl w-full max-w-5xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Tier Comparison</h3>
                        <p className="text-gray-400">See what each tier unlocks</p>
                      </div>
                      <button onClick={function () { return setShowTierComparison(false); }} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center">
                        <lucide_react_1.X className="w-5 h-5 text-gray-400"/>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-6">
                      {Object.keys(userTiers_1.TIERS).map(function (tier) { return (<TierComparisonCard key={tier} tier={tier}/>); })}
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400">
                          Your current progress: <span className="text-white font-medium">{tierProgress.progress}%</span> to next tier
                        </div>
                        <button onClick={function () { return setShowTierComparison(false); }} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
                          Continue Verification
                        </button>
                      </div>
                    </div>
                  </framer_motion_1.motion.div>
                </framer_motion_1.motion.div>)}
            </framer_motion_1.AnimatePresence>

            {/* Content */}
            <div className="p-8">
              {getStepContent()}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/10 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div>
                  {currentStep > 1 && currentStep < 4 && (<button onClick={handleBack} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/20 hover:border-white/30 flex items-center gap-2">
                      <lucide_react_1.ChevronRight className="w-4 h-4 rotate-180"/>
                      Back
                    </button>)}
                </div>
                
                <div className="flex items-center gap-4">
                  {currentStep < 4 && (<button onClick={onClose} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/20 hover:border-white/30">
                      Cancel
                    </button>)}
                  
                  {currentStep < 3 ? (<button onClick={handleNext} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 group">
                      Continue
                      <lucide_react_1.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </button>) : currentStep === 3 ? (<button onClick={handleSubmit} disabled={isSubmitting} className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      {isSubmitting ? (<>
                          <lucide_react_1.Loader2 className="w-5 h-5 animate-spin"/>
                          Submitting...
                        </>) : (<>
                          <lucide_react_1.Shield className="w-5 h-5"/>
                          Submit for Verification
                        </>)}
                    </button>) : (<button onClick={onClose} className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                      <lucide_react_1.CheckCircle2 className="w-5 h-5"/>
                      Done
                    </button>)}
                </div>
              </div>

              {/* Security & Tier Assurance */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <lucide_react_1.Lock className="w-4 h-4 text-green-400"/>
                      <span className="text-sm text-gray-400">256-bit Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <lucide_react_1.Globe className="w-4 h-4 text-blue-400"/>
                      <span className="text-sm text-gray-400">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <lucide_react_1.Smartphone className="w-4 h-4 text-purple-400"/>
                      <span className="text-sm text-gray-400">Mobile Friendly</span>
                    </div>
                  </div>
                  
                  {!isVerified && (<div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-amber-400 font-medium">
                        Unlocks {userTiers_1.TIERS.Verified.tier} Tier
                      </span>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
