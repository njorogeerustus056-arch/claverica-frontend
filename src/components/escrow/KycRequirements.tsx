import { Shield, CheckCircle2, AlertCircle, Zap, Clock, Award, Lock, Globe } from "lucide-react";

interface KycRequirementsProps {
  amount: number;
  serviceType: string;
}

export default function KycRequirements({ amount, serviceType }: KycRequirementsProps) {
  const requirements = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Government-Issued ID",
      description: "Passport, National ID, or Driver's License",
      required: true
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Clear Selfie",
      description: "Photo of yourself holding your ID",
      required: true
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Proof of Address",
      description: "Utility bill or bank statement (last 3 months)",
      required: amount > 10000
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Processing Time",
      description: "24-48 hours for verification",
      required: true
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Higher Limits",
      description: "Unlock transactions up to $50,000"
    },
    {
      icon: <Award className="w-5 h-5 text-purple-400" />,
      title: "Premium Features",
      description: "Access advanced escrow options"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-400" />,
      title: "Enhanced Security",
      description: "Additional fraud protection"
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      title: "Global Access",
      description: "Transact with international partners"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Why We Need Your Verification</h3>
            <p className="text-gray-300">
              KYC (Know Your Customer) helps us prevent fraud and ensure secure transactions for everyone.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white font-bold text-lg">${amount.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Transaction Amount</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white font-bold text-lg">{serviceType.toUpperCase()}</p>
            <p className="text-gray-400 text-sm">Service Type</p>
          </div>
        </div>
      </div>

      {/* Requirements & Benefits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requirements */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">What You'll Need</h4>
              <p className="text-gray-300">Prepare these documents</p>
            </div>
          </div>

          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                  req.required 
                    ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  req.required ? 'bg-blue-500/20' : 'bg-gray-500/20'
                }`}>
                  {req.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium">{req.title}</p>
                    {req.required ? (
                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                        Required
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded">
                        Optional
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{req.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Your documents are encrypted and stored securely</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Benefits of Verification</h4>
              <p className="text-gray-300">What you'll unlock</p>
            </div>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/20 hover:border-green-500/30 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-green-300 transition-colors">
                    {benefit.title}
                  </p>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">Immediate Access</p>
                <p className="text-gray-400 text-sm">
                  Start using higher limits as soon as you're verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Guidelines */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
        <h4 className="text-lg font-bold text-white mb-4">Document Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">Image Quality</span>
            </div>
            <p className="text-gray-400 text-sm">Ensure all text is clear and readable</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">File Format</span>
            </div>
            <p className="text-gray-400 text-sm">Use JPG, PNG, or PDF formats only</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">Privacy</span>
            </div>
            <p className="text-gray-400 text-sm">We never share your documents</p>
          </div>
        </div>
      </div>
    </div>
  );
}
