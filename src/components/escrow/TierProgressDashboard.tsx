// File: src/components/escrow/TierProgressDashboard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '../../lib/store/auth';
import { 
  calculateUserTier, 
  calculateTierProgress, 
  calculateAchievements,
  getRecommendedAction,
  TIERS,
  type UserMetrics,
  type Achievement,
  type UserProgress
} from '../../lib/utils/userTiers';
import { 
  Trophy, 
  TrendingUp, 
  Shield, 
  Zap, 
  CheckCircle, 
  Lock, 
  Star, 
  Award,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
  Users,
  Clock,
  CreditCard,
  Globe,
  Smartphone,
  Crown,
  Gift,
  Rocket,
  DollarSign,
  FileText,
  BarChart,
  ShieldCheck,
  Award as AwardIcon,
  LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TierProgressDashboardProps {
  userMetrics?: UserMetrics;
  showAchievements?: boolean;
  compact?: boolean;
  onUpgradeClick?: () => void;
}

// Sample user metrics for demonstration
const SAMPLE_METRICS: UserMetrics = {
  totalEscrows: 8,
  totalVolume: 12500,
  completedEscrows: 6,
  avgReleaseTime: 4.2,
  disputeRate: 0.5,
  templatesUsed: 2,
  lastActivityDays: 3
};

export default function TierProgressDashboard({ 
  userMetrics = SAMPLE_METRICS,
  showAchievements = true,
  compact = false,
  onUpgradeClick
}: TierProgressDashboardProps) {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  
  // Calculate tier and progress
  const isVerified = user?.is_verified || false;
  const currentTier = calculateUserTier(isVerified, userMetrics);
  const tierProgress: UserProgress = calculateTierProgress(currentTier, userMetrics, isVerified);
  const achievements = calculateAchievements(userMetrics, isVerified);
  const recommendedAction = getRecommendedAction(currentTier, userMetrics, isVerified);
  
  // Filter achievements by category
  const filteredAchievements = useMemo(() => {
    if (activeCategory === 'all') return achievements;
    return achievements.filter(ach => ach.category === activeCategory);
  }, [achievements, activeCategory]);
  
  // Achievement categories with icons
  const achievementCategories = [
    { id: 'all', label: 'All', icon: Trophy, count: achievements.length },
    { id: 'count', label: 'Count', icon: BarChart, count: achievements.filter(a => a.category === 'count').length },
    { id: 'volume', label: 'Volume', icon: DollarSign, count: achievements.filter(a => a.category === 'volume').length },
    { id: 'speed', label: 'Speed', icon: Zap, count: achievements.filter(a => a.category === 'speed').length },
    { id: 'quality', label: 'Quality', icon: ShieldCheck, count: achievements.filter(a => a.category === 'quality').length },
    { id: 'engagement', label: 'Engagement', icon: AwardIcon, count: achievements.filter(a => a.category === 'engagement').length }
  ];
  
  // Display achievements
  const displayedAchievements = showAllAchievements ? filteredAchievements : filteredAchievements.slice(0, 6);
  
  // Tier comparison data
  const tierComparison = Object.entries(TIERS).map(([tierName, tierData]) => ({
    name: tierName,
    ...tierData,
    isCurrent: tierName === currentTier,
    isNext: tierProgress.nextTier?.tier === tierName
  }));
  
  // Benefits unlocked at each tier
  const tierBenefits = [
    {
      tier: 'Basic',
      icon: Shield,
      color: 'text-gray-400',
      gradient: 'from-gray-500 to-gray-600',
      benefits: ['Basic escrow services', 'Standard support', '3 templates']
    },
    {
      tier: 'Verified',
      icon: CheckCircle,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-600',
      benefits: ['Higher limits', 'Priority support', '6 templates', 'Advanced analytics']
    },
    {
      tier: 'Pro',
      icon: Star,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-600',
      benefits: ['Maximum limits', 'API access', 'Unlimited templates', 'Dedicated manager']
    },
    {
      tier: 'Elite',
      icon: Crown,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-600',
      benefits: ['Unlimited everything', 'VIP support', 'Custom solutions', 'Revenue sharing']
    }
  ];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${TIERS[currentTier].gradient} flex items-center justify-center`}>
              <span className="text-xl">{TIERS[currentTier].icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-white">{currentTier} Tier</h3>
              <p className="text-sm text-gray-400">Level {TIERS[currentTier].level}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Progress to next</div>
            <div className="text-lg font-bold text-white">{tierProgress.progress}%</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tierProgress.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${TIERS[currentTier].gradient}`}
            />
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-gray-400">Escrows</div>
            <div className="text-white font-bold">{userMetrics.completedEscrows}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-gray-400">Volume</div>
            <div className="text-white font-bold">${(userMetrics.totalVolume / 1000).toFixed(0)}K</div>
          </div>
        </div>
        
        {onUpgradeClick && !isVerified && (
          <button
            onClick={onUpgradeClick}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
          >
            Upgrade to Verified
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Tier Progress Dashboard</h2>
                <p className="text-gray-400">Track your progress and unlock premium features</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${TIERS[currentTier].gradient} flex items-center gap-2`}>
                <span className="text-2xl">{TIERS[currentTier].icon}</span>
                <span className="font-bold text-white">{currentTier} Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Tier & Progress */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Tier Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Your Current Tier</h3>
                    <p className="text-gray-400">Level {TIERS[currentTier].level} • {achievements.filter(a => a.unlocked).length} achievements unlocked</p>
                  </div>
                  <div className={`text-4xl ${TIERS[currentTier].color}`}>
                    {TIERS[currentTier].icon}
                  </div>
                </div>
                
                {/* Progress Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress to {tierProgress.nextTier?.tier || 'Elite'} Tier</span>
                      <span className="text-white font-medium">{tierProgress.progress}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tierProgress.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${TIERS[currentTier].gradient}`}
                      />
                    </div>
                  </div>
                  
                  {/* Requirements */}
                  {tierProgress.requirementsToNext.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-bold text-white text-sm">Requirements to advance:</h4>
                      {tierProgress.requirementsToNext.map((req, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Target className="w-3 h-3 text-blue-400" />
                          </div>
                          <span className="text-gray-300 text-sm">{req}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <div>
                          <h4 className="font-bold text-white text-sm">Highest Tier Achieved!</h4>
                          <p className="text-gray-400 text-sm">You've reached the maximum tier level</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h4 className="font-bold text-white mb-4">Your Metrics</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Completed Escrows', value: userMetrics.completedEscrows, icon: FileText, color: 'text-blue-400' },
                    { label: 'Total Volume', value: `$${(userMetrics.totalVolume / 1000).toFixed(1)}K`, icon: DollarSign, color: 'text-green-400' },
                    { label: 'Success Rate', value: `${100 - userMetrics.disputeRate}%`, icon: CheckCircle, color: 'text-emerald-400' },
                    { label: 'Avg. Speed', value: `${userMetrics.avgReleaseTime}d`, icon: Zap, color: 'text-amber-400' }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center`}>
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                      </div>
                      <span className="font-bold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recommended Action */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Recommended Action</h4>
                    <p className="text-gray-400 text-sm">Next step to advance</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{recommendedAction.reason}</p>
                <button
                  onClick={onUpgradeClick}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <span>{recommendedAction.action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tier Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Tier Comparison</h3>
              <p className="text-gray-400">See what each tier unlocks</p>
            </div>
            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${TIERS[currentTier].gradient}`}>
              <span className="font-bold text-white">Your Tier: {currentTier}</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierComparison.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  tier.isCurrent 
                    ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-blue-500/5 shadow-lg scale-105' 
                    : tier.isNext
                    ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/5 to-transparent'
                    : 'border-gray-700 bg-white/5 hover:border-white/20'
                }`}
              >
                {tier.isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
                      CURRENT
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                    <span className="text-2xl">{tier.icon}</span>
                  </div>
                  <div>
                    <h4 className={`font-bold ${tier.color} text-lg`}>
                      {tier.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Level {tier.level}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Single Escrow</span>
                    <span className="font-bold text-white">
                      ${tier.limits.singleEscrow.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Monthly Volume</span>
                    <span className="font-bold text-white">
                      ${tier.limits.monthlyVolume.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Active Escrows</span>
                    <span className="font-bold text-white">
                      {tier.limits.activeEscrows}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-bold text-gray-300 mb-2">Key Benefits:</h5>
                  {tier.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {tier.isNext && (
                  <button
                    onClick={onUpgradeClick}
                    className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
                  >
                    Unlock This Tier
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievements Section */}
      {showAchievements && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
                <p className="text-gray-400">
                  {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">
                  {achievements.filter(a => a.unlocked).length * 100} XP
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {achievementCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.id ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {displayedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5'
                        : 'border-gray-700 bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800'
                      }`}>
                        <span className="text-3xl">{achievement.badge}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">{achievement.title}</h4>
                          {achievement.unlocked ? (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-lg">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-green-400 text-xs font-medium">Unlocked</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-lg">
                              <Lock className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400 text-xs font-medium">Locked</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              achievement.category === 'volume' ? 'bg-blue-500/20' :
                              achievement.category === 'count' ? 'bg-purple-500/20' :
                              achievement.category === 'speed' ? 'bg-amber-500/20' :
                              achievement.category === 'quality' ? 'bg-green-500/20' :
                              'bg-pink-500/20'
                            }`}>
                              {achievement.category === 'volume' ? <DollarSign className="w-3 h-3 text-blue-400" /> :
                               achievement.category === 'count' ? <BarChart className="w-3 h-3 text-purple-400" /> :
                               achievement.category === 'speed' ? <Zap className="w-3 h-3 text-amber-400" /> :
                               achievement.category === 'quality' ? <ShieldCheck className="w-3 h-3 text-green-400" /> :
                               <AwardIcon className="w-3 h-3 text-pink-400" />}
                            </div>
                            <span className="text-xs text-gray-500 capitalize">{achievement.category}</span>
                          </div>
                          
                          {achievement.unlocked && achievement.unlockedAt && (
                            <span className="text-xs text-gray-500">
                              {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Show More/Less Button */}
            {filteredAchievements.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllAchievements(!showAllAchievements)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto"
                >
                  {showAllAchievements ? 'Show Less' : `Show All ${filteredAchievements.length} Achievements`}
                  <ChevronRight className={`w-4 h-4 transition-transform ${showAllAchievements ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Benefits & Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-white/10">
          <h3 className="text-2xl font-bold text-white">Tier Benefits</h3>
          <p className="text-gray-400">Features unlocked at each tier level</p>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierBenefits.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border-2 ${
                  tier.tier === currentTier
                    ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-blue-500/5'
                    : 'border-gray-700 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                    <tier.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${tier.color} text-lg`}>
                      {tier.tier}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {tier.tier === currentTier ? 'Current Tier' : 'Available'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}