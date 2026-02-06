// File: src/components/escrow/KycModal.tsx (Enhanced Version)
import { useState, useEffect, useMemo } from "react";
import { useAuthStore } from "../../lib/store/auth";
import { 
  X, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Upload, 
  FileText, 
  Camera, 
  User,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Loader2,
  Sparkles,
  Award,
  Lock,
  Globe,
  Smartphone,
  Zap,
  Trophy,
  TrendingUp,
  Star,
  Target,
  BarChart3,
  Users,
  CreditCard,
  Crown,
  Gift,
  Rocket,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  calculateUserTier, 
  calculateTierProgress, 
  calculateAchievements,
  getKYCMessage,
  getRecommendedAction,
  TIERS,
  type UserMetrics,
  type Achievement
} from '../../lib/utils/userTiers';

interface KycModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  amount?: number;
  serviceType?: string;
  redirectTo?: string;
  showTierUpgrade?: boolean;
}

interface KycDocument {
  id: string;
  type: string;
  name: string;
  description: string;
  isRequired: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
  uploaded?: boolean;
  previewUrl?: string;
  tierLocked?: boolean;
  requiredTier?: string;
}

interface KycStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "current" | "completed";
}

// Mock user metrics for demo - in real app, fetch from backend
const SAMPLE_USER_METRICS: UserMetrics = {
  totalEscrows: 3,
  totalVolume: 8500,
  completedEscrows: 2,
  avgReleaseTime: 5.5,
  disputeRate: 0,
  templatesUsed: 1,
  lastActivityDays: 7
};

export default function KycModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  amount = 0,
  serviceType = "escrow",
  redirectTo = "/dashboard/escrow",
  showTierUpgrade = true
}: KycModalProps) {
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "submitted" | "verifying" | "approved" | "rejected">("idle");
  const [showAchievementPreview, setShowAchievementPreview] = useState(false);
  const [showTierComparison, setShowTierComparison] = useState(false);
  
  // Tier system integration
  const isVerified = user?.is_verified || false;
  const currentTier = calculateUserTier(isVerified, SAMPLE_USER_METRICS);
  const tierProgress = calculateTierProgress(currentTier, SAMPLE_USER_METRICS, isVerified);
  const achievements = calculateAchievements(SAMPLE_USER_METRICS, isVerified);
  const kycMessage = getKYCMessage(SAMPLE_USER_METRICS, currentTier);
  const recommendedAction = getRecommendedAction(currentTier, SAMPLE_USER_METRICS, isVerified);
  
  // Calculate unlocked achievements upon KYC
  const kycAchievements = useMemo(() => {
    return achievements.filter(ach => 
      ach.id === 'kyc_verified' || 
      ach.id === 'first_escrow' || 
      ach.category === 'engagement'
    ).slice(0, 3);
  }, [achievements]);
  
  const [documents, setDocuments] = useState<KycDocument[]>([
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
  ]);
  
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [formData, setFormData] = useState({
    fullName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
    dateOfBirth: "",
    country: "",
    idNumber: "",
    address: ""
  });

  const steps: KycStep[] = [
    {
      id: 1,
      title: "Requirements",
      description: "What you'll need",
      icon: <FileText className="w-5 h-5" />,
      status: currentStep === 1 ? "current" : currentStep > 1 ? "completed" : "pending"
    },
    {
      id: 2,
      title: "Document Upload",
      description: "Upload your documents",
      icon: <Upload className="w-5 h-5" />,
      status: currentStep === 2 ? "current" : currentStep > 2 ? "completed" : "pending"
    },
    {
      id: 3,
      title: "Review & Submit",
      description: "Verify your information",
      icon: <CheckCircle2 className="w-5 h-5" />,
      status: currentStep === 3 ? "current" : currentStep > 3 ? "completed" : "pending"
    },
    {
      id: 4,
      title: "Verification",
      description: "We'll review your documents",
      icon: <Shield className="w-5 h-5" />,
      status: currentStep === 4 ? "current" : "pending"
    }
  ];

  // Tier benefits display
  const tierBenefits = [
    {
      icon: CreditCard,
      title: "Higher Limits",
      description: `From $${TIERS[currentTier].limits.singleEscrow.toLocaleString()} to $${TIERS.Verified.limits.singleEscrow.toLocaleString()} per escrow`,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Premium Templates",
      description: "Access 6 premium templates vs 3 basic",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights and predictions",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Priority Processing",
      description: "Faster escrow completion times",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  // Show achievement preview on mount if not verified
  useEffect(() => {
    if (isOpen && !isVerified && showTierUpgrade) {
      setTimeout(() => {
        setShowAchievementPreview(true);
      }, 500);
    }
  }, [isOpen, isVerified, showTierUpgrade]);

  const handleDocumentUpload = (docId: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [docId]: file }));
    
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { ...doc, uploaded: true, previewUrl: URL.createObjectURL(file) }
        : doc
    ));
  };

  const handleRemoveDocument = (docId: string) => {
    const updatedFiles = { ...uploadedFiles };
    delete updatedFiles[docId];
    setUploadedFiles(updatedFiles);
    
    setDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { ...doc, uploaded: false, previewUrl: undefined }
        : doc
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Check if all required documents are uploaded
    const requiredDocs = documents.filter(doc => doc.isRequired && !doc.tierLocked);
    const allRequiredUploaded = requiredDocs.every(doc => doc.uploaded);
    
    if (!allRequiredUploaded) {
      alert("Please upload all required documents before submitting.");
      setCurrentStep(2); // Go back to document upload step
      return;
    }

    setIsSubmitting(true);
    setVerificationStatus("submitted");

    try {
      // Prepare form data for API
      const submissionData = new FormData();
      submissionData.append("user_id", user?.id || "");
      submissionData.append("full_name", formData.fullName);
      submissionData.append("service_type", serviceType);
      submissionData.append("amount", amount.toString());

      // Append uploaded files
      Object.entries(uploadedFiles).forEach(([docId, file]) => {
        submissionData.append(`document_${docId}`, file);
      });

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Move to verification step
      setCurrentStep(4);
      setVerificationStatus("verifying");
      
      // Simulate verification process
      setTimeout(() => {
        setVerificationStatus("approved");
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 2000);
      }, 3000);

    } catch (error) {
      console.error("KYC Submission Error:", error);
      setVerificationStatus("rejected");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Tier comparison component
  const TierComparisonCard = ({ tier }: { tier: string }) => {
    const tierData = TIERS[tier as keyof typeof TIERS];
    const isCurrentTier = tier === currentTier;
    const isNextTier = tierProgress.nextTier?.tier === tier;
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
          isCurrentTier 
            ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-blue-500/5 shadow-lg' 
            : isNextTier
            ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/5 to-transparent'
            : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50'
        }`}
      >
        {isCurrentTier && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
              CURRENT TIER
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierData.gradient} flex items-center justify-center`}>
            <span className="text-2xl">{tierData.icon}</span>
          </div>
          <div>
            <h4 className={`font-bold ${tierData.color} text-lg`}>
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
        
        {isNextTier && (
          <button
            onClick={() => setShowTierComparison(false)}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
          >
            Unlock This Tier
          </button>
        )}
      </motion.div>
    );
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Personalized KYC Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {kycMessage.title}
                  </h4>
                  <p className="text-gray-300 mb-4">
                    {kycMessage.message}
                  </p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                    kycMessage.urgency === 'high' ? 'bg-red-500/20 text-red-300' :
                    kycMessage.urgency === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {kycMessage.urgency === 'high' ? 'High Priority' : 
                       kycMessage.urgency === 'medium' ? 'Recommended' : 'When Ready'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Tier Status */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${TIERS[currentTier].gradient} flex items-center justify-center`}>
                    <span className="text-2xl">{TIERS[currentTier].icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Your Current Tier</h4>
                    <p className="text-gray-400">Level {TIERS[currentTier].level} • {currentTier}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTierComparison(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                >
                  Compare Tiers
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress to Next Tier</span>
                  <span className="text-white font-medium">{tierProgress.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgress.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${TIERS[currentTier].gradient}`}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {tierProgress.requirementsToNext.length > 0 ? tierProgress.requirementsToNext[0] : "You're at the highest tier!"}
                </div>
              </div>
            </div>

            {/* Tier Benefits Preview */}
            <div className="grid grid-cols-2 gap-4">
              {tierBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <h5 className="font-bold text-white mb-1">{benefit.title}</h5>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Recommended Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white mb-1">Recommended Action</h5>
                  <p className="text-gray-300 text-sm">{recommendedAction.reason}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  recommendedAction.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                  recommendedAction.priority === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {recommendedAction.priority} priority
                </div>
              </div>
            </motion.div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {/* Achievement Preview */}
            <AnimatePresence>
              {showAchievementPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20 overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-white">Achievements You'll Unlock</h5>
                        <button
                          onClick={() => setShowAchievementPreview(false)}
                          className="text-amber-300 hover:text-amber-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-3">
                        {kycAchievements.map((achievement) => (
                          <div key={achievement.id} className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                            <span className="text-2xl">{achievement.badge}</span>
                            <div>
                              <p className="text-white text-sm font-medium">{achievement.title}</p>
                              <p className="text-gray-400 text-xs">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Document Upload Section */}
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    doc.uploaded
                      ? 'border-green-500/30 bg-green-500/5'
                      : doc.tierLocked
                      ? 'border-gray-700 bg-gray-800/30'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        doc.uploaded 
                          ? 'bg-green-500/20 text-green-400' 
                          : doc.tierLocked
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {doc.type === 'selfie' ? (
                          <Camera className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-white">{doc.name}</h5>
                        <p className="text-gray-400 text-sm">{doc.description}</p>
                      </div>
                    </div>
                    
                    {doc.tierLocked ? (
                      <div className="flex items-center gap-2 px-3 py-1 bg-gray-700/50 rounded-full">
                        <Lock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400 text-sm">Requires {doc.requiredTier} Tier</span>
                      </div>
                    ) : doc.isRequired ? (
                      <div className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                        Required
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        Optional
                      </div>
                    )}
                  </div>
                  
                  {doc.tierLocked ? (
                    <div className="text-center py-4">
                      <Lock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Unlock {doc.requiredTier} tier to upload this document
                      </p>
                      <button
                        onClick={() => setShowTierComparison(true)}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        View Tier Requirements →
                      </button>
                    </div>
                  ) : !doc.uploaded ? (
                    <button
                      onClick={() => {
                        // Simulate file selection
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = doc.acceptedFormats.join(',');
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleDocumentUpload(doc.id, file);
                          }
                        };
                        input.click();
                      }}
                      className="w-full py-3 border-2 border-dashed border-white/20 hover:border-white/40 rounded-xl text-gray-400 hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Upload className="w-5 h-5" />
                        <span>Click to upload or drag and drop</span>
                      </div>
                      <p className="text-xs mt-2">
                        {doc.acceptedFormats.join(', ')} • Max {doc.maxSizeMB}MB
                      </p>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-white">{uploadedFiles[doc.id]?.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {/* Tier Upgrade Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Ready for Upgrade!</h4>
                  <p className="text-gray-300">Your verification unlocks {TIERS.Verified.tier} tier benefits</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Limit Increase</p>
                      <p className="text-white font-bold">33x Higher</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    From ${TIERS.Basic.limits.singleEscrow.toLocaleString()} to ${TIERS.Verified.limits.singleEscrow.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
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
            </motion.div>

            {/* Review Content */}
            <div className="space-y-4">
              {/* Personal Info Review */}
              <div className="bg-white/5 rounded-xl p-6">
                <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Your country"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      placeholder="Your ID number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Document Review */}
              <div className="bg-white/5 rounded-xl p-6">
                <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Review
                </h5>
                <div className="space-y-3">
                  {documents.filter(doc => doc.uploaded).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-gray-400 text-sm">{uploadedFiles[doc.id]?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-lg">
                          Ready
                        </span>
                        <button
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <ShieldCheck className="w-12 h-12 text-white" />
            </motion.div>
            
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
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: verificationStatus === "verifying" ? "70%" : "100%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-emerald-500"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Status: {verificationStatus === "verifying" ? "Processing" : "Submitted"}</span>
                <span>Estimated: 24-48 hours</span>
              </div>
            </div>
            
            {/* Tier Upgrade Confirmation */}
            {!isVerified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 max-w-md mx-auto"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  <div>
                    <h5 className="font-bold text-white">Tier Upgrade Pending</h5>
                    <p className="text-gray-300 text-sm">
                      Your account will be upgraded to <span className="text-green-400 font-medium">Verified Tier</span> upon approval
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">New Limits:</span>
                  <span className="text-white font-medium">${TIERS.Verified.limits.singleEscrow.toLocaleString()}/escrow</span>
                </div>
              </motion.div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
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
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-3xl font-bold text-white">
                        Identity Verification
                      </h2>
                      {!isVerified && (
                        <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-bold text-white">
                          TIER UPGRADE
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300">
                      {amount > 0 
                        ? `Complete KYC to unlock transactions above $${amount.toLocaleString()}`
                        : `Complete KYC to unlock all platform features`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center group"
                >
                  <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* User Info with Tier Badge */}
              <div className="flex items-center gap-4 mt-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${TIERS[currentTier].gradient} flex items-center justify-center`}>
                  <span className="text-white text-lg font-bold">
                    {TIERS[currentTier].icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${TIERS[currentTier].color} bg-opacity-20`}>
                      {currentTier} Tier
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {amount > 0 && (
                    <div className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-xl text-sm font-medium border border-amber-500/30">
                      ${amount.toLocaleString()}
                    </div>
                  )}
                  <div className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30">
                    {serviceType.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="px-8 py-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      step.status === "current" 
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg"
                        : step.status === "completed"
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : "bg-white/10"
                    }`}>
                      <div className={step.status === "current" ? "text-white" : 
                                   step.status === "completed" ? "text-white" : "text-gray-500"}>
                        {step.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        step.status === "current" ? "text-white" : 
                        step.status === "completed" ? "text-green-400" : "text-gray-500"
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        step.status === "completed" ? "bg-green-500" : "bg-white/10"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier Comparison Modal */}
            <AnimatePresence>
              {showTierComparison && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/20 shadow-2xl w-full max-w-5xl p-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Tier Comparison</h3>
                        <p className="text-gray-400">See what each tier unlocks</p>
                      </div>
                      <button
                        onClick={() => setShowTierComparison(false)}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-6">
                      {Object.keys(TIERS).map((tier) => (
                        <TierComparisonCard key={tier} tier={tier} />
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400">
                          Your current progress: <span className="text-white font-medium">{tierProgress.progress}%</span> to next tier
                        </div>
                        <button
                          onClick={() => setShowTierComparison(false)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                        >
                          Continue Verification
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content */}
            <div className="p-8">
              {getStepContent()}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/10 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div>
                  {currentStep > 1 && currentStep < 4 && (
                    <button
                      onClick={handleBack}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/20 hover:border-white/30 flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Back
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  {currentStep < 4 && (
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/20 hover:border-white/30"
                    >
                      Cancel
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 group"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : currentStep === 3 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5" />
                          Submit for Verification
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Done
                    </button>
                  )}
                </div>
              </div>

              {/* Security & Tier Assurance */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">256-bit Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Mobile Friendly</span>
                    </div>
                  </div>
                  
                  {!isVerified && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-amber-400 font-medium">
                        Unlocks {TIERS.Verified.tier} Tier
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}