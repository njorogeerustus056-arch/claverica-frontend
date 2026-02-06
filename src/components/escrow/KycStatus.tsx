import { CheckCircle2, Clock, AlertCircle, Loader2, Shield, UserCheck, FileCheck } from "lucide-react";

interface KycStatusProps {
  status: "idle" | "submitted" | "verifying" | "approved" | "rejected";
  estimatedTime: string;
}

export default function KycStatus({ status, estimatedTime }: KycStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "submitted":
        return {
          title: "Documents Submitted",
          description: "Your documents have been received successfully",
          icon: <FileCheck className="w-8 h-8" />,
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500/30",
          gradient: "from-blue-500 to-cyan-500"
        };
      case "verifying":
        return {
          title: "Verification in Progress",
          description: "We're reviewing your documents",
          icon: <Loader2 className="w-8 h-8 animate-spin" />,
          color: "text-amber-400",
          bgColor: "bg-amber-500/20",
          borderColor: "border-amber-500/30",
          gradient: "from-amber-500 to-orange-500"
        };
      case "approved":
        return {
          title: "Verification Approved!",
          description: "Your identity has been successfully verified",
          icon: <CheckCircle2 className="w-8 h-8" />,
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/30",
          gradient: "from-green-500 to-emerald-500"
        };
      case "rejected":
        return {
          title: "Verification Needed",
          description: "We need additional information to verify your identity",
          icon: <AlertCircle className="w-8 h-8" />,
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/30",
          gradient: "from-red-500 to-rose-500"
        };
      default:
        return {
          title: "Verification Status",
          description: "Check your verification progress",
          icon: <Shield className="w-8 h-8" />,
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500/30",
          gradient: "from-gray-500 to-slate-500"
        };
    }
  };

  const statusConfig = getStatusConfig();
  const verificationSteps = [
    { id: 1, name: "Document Upload", status: "completed", time: "Just now" },
    { id: 2, name: "Quality Check", status: status === "submitted" ? "current" : "completed", time: "In progress" },
    { id: 3, name: "Identity Verification", status: status === "verifying" ? "current" : "pending", time: estimatedTime },
    { id: 4, name: "Approval", status: "pending", time: "Pending" }
  ];

  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <div className={`bg-gradient-to-r ${statusConfig.gradient}/10 rounded-2xl p-8 border ${statusConfig.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-2xl ${statusConfig.bgColor} flex items-center justify-center border ${statusConfig.borderColor}`}>
              <div className={statusConfig.color}>
                {statusConfig.icon}
              </div>
            </div>
            <div>
              <h3 className={`text-3xl font-bold ${statusConfig.color} mb-2`}>
                {statusConfig.title}
              </h3>
              <p className="text-white text-lg">
                {statusConfig.description}
              </p>
            </div>
          </div>
          
          {status === "approved" && (
            <div className="text-right">
              <div className="text-5xl font-bold text-white mb-2">🎉</div>
              <p className="text-green-300 font-medium">Congratulations!</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h4 className="text-xl font-bold text-white mb-6">Verification Progress</h4>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10">
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-cyan-500 transition-all duration-1000"
              style={{ 
                height: status === "approved" ? "100%" : 
                       status === "verifying" ? "66%" :
                       status === "submitted" ? "33%" : "0%" 
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {verificationSteps.map((step, index) => (
              <div key={step.id} className="relative pl-16">
                {/* Step Icon */}
                <div className={`
                  absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border-2
                  ${step.status === "completed" 
                    ? "bg-gradient-to-br from-green-500 to-emerald-500 border-green-500" 
                    : step.status === "current"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500 animate-pulse"
                    : "bg-slate-700 border-white/20"
                  }
                `}>
                  {step.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : step.status === "current" ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <div className="w-6 h-6 text-gray-400">{step.id}</div>
                  )}
                </div>

                {/* Step Content */}
                <div className={`
                  bg-white/5 rounded-xl p-5 border transition-all
                  ${step.status === "completed" 
                    ? "border-green-500/30" 
                    : step.status === "current"
                    ? "border-blue-500/30"
                    : "border-white/10"
                  }
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`
                      text-lg font-bold
                      ${step.status === "completed" 
                        ? "text-green-300" 
                        : step.status === "current"
                        ? "text-blue-300"
                        : "text-gray-400"
                      }
                    `}>
                      {step.name}
                    </h5>
                    <span className={`
                      text-sm px-3 py-1 rounded-lg
                      ${step.status === "completed" 
                        ? "bg-green-500/20 text-green-300" 
                        : step.status === "current"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-gray-500/20 text-gray-400"
                      }
                    `}>
                      {step.time}
                    </span>
                  </div>
                  
                  {step.status === "current" && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                        <span className="text-sm text-blue-300">Processing your documents...</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {status === "approved" ? (
          <>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-green-400" />
                <h5 className="text-white font-bold">Account Upgraded</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Your account has been upgraded to Verified status
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h5 className="text-white font-bold">Higher Limits</h5>
              </div>
              <p className="text-gray-300 text-sm">
                You can now create escrow accounts above $1,500
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                <h5 className="text-white font-bold">Ready to Go</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Start creating secure escrow transactions immediately
              </p>
            </div>
          </>
        ) : status === "verifying" ? (
          <>
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-amber-400" />
                <h5 className="text-white font-bold">Estimated Time</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Verification typically takes {estimatedTime}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-blue-400" />
                <h5 className="text-white font-bold">Document Review</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Our team is reviewing your submitted documents
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h5 className="text-white font-bold">What's Next</h5>
              </div>
              <p className="text-gray-300 text-sm">
                You'll receive an email notification once verified
              </p>
            </div>
          </>
        ) : status === "rejected" ? (
          <>
            <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-2xl p-6 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h5 className="text-white font-bold">Action Required</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Please check your email for details on required corrections
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-amber-400" />
                <h5 className="text-white font-bold">Resubmit Documents</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Upload clearer images or additional required documents
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h5 className="text-white font-bold">Support Available</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Contact support if you need assistance with verification
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
                <h5 className="text-white font-bold">Waiting Period</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Verification usually completes within {estimatedTime}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h5 className="text-white font-bold">Email Notification</h5>
              </div>
              <p className="text-gray-300 text-sm">
                We'll email you once verification is complete
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
                <h5 className="text-white font-bold">Secure Process</h5>
              </div>
              <p className="text-gray-300 text-sm">
                Your documents are encrypted and securely stored
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}