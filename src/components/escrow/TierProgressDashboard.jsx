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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TierProgressDashboard;
// File: src/components/escrow/TierProgressDashboard.tsx
var react_1 = require("react");
var auth_1 = require("../../lib/store/auth");
var userTiers_1 = require("../../lib/utils/userTiers");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
// Sample user metrics for demonstration
var SAMPLE_METRICS = {
    totalEscrows: 8,
    totalVolume: 12500,
    completedEscrows: 6,
    avgReleaseTime: 4.2,
    disputeRate: 0.5,
    templatesUsed: 2,
    lastActivityDays: 3
};
function TierProgressDashboard(_a) {
    var _b;
    var _c = _a.userMetrics, userMetrics = _c === void 0 ? SAMPLE_METRICS : _c, _d = _a.showAchievements, showAchievements = _d === void 0 ? true : _d, _e = _a.compact, compact = _e === void 0 ? false : _e, onUpgradeClick = _a.onUpgradeClick;
    var user = (0, auth_1.useAuthStore)().user;
    var _f = (0, react_1.useState)('all'), activeCategory = _f[0], setActiveCategory = _f[1];
    var _g = (0, react_1.useState)(false), showAllAchievements = _g[0], setShowAllAchievements = _g[1];
    // Calculate tier and progress
    var isVerified = (user === null || user === void 0 ? void 0 : user.is_verified) || false;
    var currentTier = (0, userTiers_1.calculateUserTier)(isVerified, userMetrics);
    var tierProgress = (0, userTiers_1.calculateTierProgress)(currentTier, userMetrics, isVerified);
    var achievements = (0, userTiers_1.calculateAchievements)(userMetrics, isVerified);
    var recommendedAction = (0, userTiers_1.getRecommendedAction)(currentTier, userMetrics, isVerified);
    // Filter achievements by category
    var filteredAchievements = (0, react_1.useMemo)(function () {
        if (activeCategory === 'all')
            return achievements;
        return achievements.filter(function (ach) { return ach.category === activeCategory; });
    }, [achievements, activeCategory]);
    // Achievement categories with icons
    var achievementCategories = [
        { id: 'all', label: 'All', icon: lucide_react_1.Trophy, count: achievements.length },
        { id: 'count', label: 'Count', icon: lucide_react_1.BarChart, count: achievements.filter(function (a) { return a.category === 'count'; }).length },
        { id: 'volume', label: 'Volume', icon: lucide_react_1.DollarSign, count: achievements.filter(function (a) { return a.category === 'volume'; }).length },
        { id: 'speed', label: 'Speed', icon: lucide_react_1.Zap, count: achievements.filter(function (a) { return a.category === 'speed'; }).length },
        { id: 'quality', label: 'Quality', icon: lucide_react_1.ShieldCheck, count: achievements.filter(function (a) { return a.category === 'quality'; }).length },
        { id: 'engagement', label: 'Engagement', icon: lucide_react_1.Award, count: achievements.filter(function (a) { return a.category === 'engagement'; }).length }
    ];
    // Display achievements
    var displayedAchievements = showAllAchievements ? filteredAchievements : filteredAchievements.slice(0, 6);
    // Tier comparison data
    var tierComparison = Object.entries(userTiers_1.TIERS).map(function (_a) {
        var _b;
        var tierName = _a[0], tierData = _a[1];
        return (__assign(__assign({ name: tierName }, tierData), { isCurrent: tierName === currentTier, isNext: ((_b = tierProgress.nextTier) === null || _b === void 0 ? void 0 : _b.tier) === tierName }));
    });
    // Benefits unlocked at each tier
    var tierBenefits = [
        {
            tier: 'Basic',
            icon: lucide_react_1.Shield,
            color: 'text-gray-400',
            gradient: 'from-gray-500 to-gray-600',
            benefits: ['Basic escrow services', 'Standard support', '3 templates']
        },
        {
            tier: 'Verified',
            icon: lucide_react_1.CheckCircle,
            color: 'text-green-400',
            gradient: 'from-green-500 to-emerald-600',
            benefits: ['Higher limits', 'Priority support', '6 templates', 'Advanced analytics']
        },
        {
            tier: 'Pro',
            icon: lucide_react_1.Star,
            color: 'text-blue-400',
            gradient: 'from-blue-500 to-cyan-600',
            benefits: ['Maximum limits', 'API access', 'Unlimited templates', 'Dedicated manager']
        },
        {
            tier: 'Elite',
            icon: lucide_react_1.Crown,
            color: 'text-purple-400',
            gradient: 'from-purple-500 to-pink-600',
            benefits: ['Unlimited everything', 'VIP support', 'Custom solutions', 'Revenue sharing']
        }
    ];
    if (compact) {
        return (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={"w-10 h-10 rounded-xl bg-gradient-to-br ".concat(userTiers_1.TIERS[currentTier].gradient, " flex items-center justify-center")}>
              <span className="text-xl">{userTiers_1.TIERS[currentTier].icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-white">{currentTier} Tier</h3>
              <p className="text-sm text-gray-400">Level {userTiers_1.TIERS[currentTier].level}</p>
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
            <framer_motion_1.motion.div initial={{ width: 0 }} animate={{ width: "".concat(tierProgress.progress, "%") }} transition={{ duration: 1, ease: "easeOut" }} className={"h-full bg-gradient-to-r ".concat(userTiers_1.TIERS[currentTier].gradient)}/>
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
        
        {onUpgradeClick && !isVerified && (<button onClick={onUpgradeClick} className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow">
            Upgrade to Verified
          </button>)}
      </framer_motion_1.motion.div>);
    }
    return (<div className="space-y-6">
      {/* Main Dashboard Card */}
      <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <lucide_react_1.Trophy className="w-8 h-8 text-white"/>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Tier Progress Dashboard</h2>
                <p className="text-gray-400">Track your progress and unlock premium features</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={"px-4 py-2 rounded-xl bg-gradient-to-r ".concat(userTiers_1.TIERS[currentTier].gradient, " flex items-center gap-2")}>
                <span className="text-2xl">{userTiers_1.TIERS[currentTier].icon}</span>
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
                    <p className="text-gray-400">Level {userTiers_1.TIERS[currentTier].level} • {achievements.filter(function (a) { return a.unlocked; }).length} achievements unlocked</p>
                  </div>
                  <div className={"text-4xl ".concat(userTiers_1.TIERS[currentTier].color)}>
                    {userTiers_1.TIERS[currentTier].icon}
                  </div>
                </div>
                
                {/* Progress Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress to {((_b = tierProgress.nextTier) === null || _b === void 0 ? void 0 : _b.tier) || 'Elite'} Tier</span>
                      <span className="text-white font-medium">{tierProgress.progress}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <framer_motion_1.motion.div initial={{ width: 0 }} animate={{ width: "".concat(tierProgress.progress, "%") }} transition={{ duration: 1.5, ease: "easeOut" }} className={"h-full bg-gradient-to-r ".concat(userTiers_1.TIERS[currentTier].gradient)}/>
                    </div>
                  </div>
                  
                  {/* Requirements */}
                  {tierProgress.requirementsToNext.length > 0 ? (<div className="space-y-3">
                      <h4 className="font-bold text-white text-sm">Requirements to advance:</h4>
                      {tierProgress.requirementsToNext.map(function (req, index) { return (<framer_motion_1.motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <lucide_react_1.Target className="w-3 h-3 text-blue-400"/>
                          </div>
                          <span className="text-gray-300 text-sm">{req}</span>
                        </framer_motion_1.motion.div>); })}
                    </div>) : (<div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <lucide_react_1.Crown className="w-5 h-5 text-yellow-400"/>
                        <div>
                          <h4 className="font-bold text-white text-sm">Highest Tier Achieved!</h4>
                          <p className="text-gray-400 text-sm">You've reached the maximum tier level</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h4 className="font-bold text-white mb-4">Your Metrics</h4>
                <div className="space-y-3">
                  {[
            { label: 'Completed Escrows', value: userMetrics.completedEscrows, icon: lucide_react_1.FileText, color: 'text-blue-400' },
            { label: 'Total Volume', value: "$".concat((userMetrics.totalVolume / 1000).toFixed(1), "K"), icon: lucide_react_1.DollarSign, color: 'text-green-400' },
            { label: 'Success Rate', value: "".concat(100 - userMetrics.disputeRate, "%"), icon: lucide_react_1.CheckCircle, color: 'text-emerald-400' },
            { label: 'Avg. Speed', value: "".concat(userMetrics.avgReleaseTime, "d"), icon: lucide_react_1.Zap, color: 'text-amber-400' }
        ].map(function (stat, index) { return (<div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={"w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"}>
                          <stat.icon className={"w-4 h-4 ".concat(stat.color)}/>
                        </div>
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                      </div>
                      <span className="font-bold text-white">{stat.value}</span>
                    </div>); })}
                </div>
              </div>
              
              {/* Recommended Action */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <lucide_react_1.Rocket className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Recommended Action</h4>
                    <p className="text-gray-400 text-sm">Next step to advance</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{recommendedAction.reason}</p>
                <button onClick={onUpgradeClick} className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                  <span>{recommendedAction.action}</span>
                  <lucide_react_1.ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </framer_motion_1.motion.div>

      {/* Tier Comparison */}
      <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Tier Comparison</h3>
              <p className="text-gray-400">See what each tier unlocks</p>
            </div>
            <div className={"px-4 py-2 rounded-xl bg-gradient-to-r ".concat(userTiers_1.TIERS[currentTier].gradient)}>
              <span className="font-bold text-white">Your Tier: {currentTier}</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierComparison.map(function (tier, index) { return (<framer_motion_1.motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={"relative p-6 rounded-2xl border-2 transition-all duration-300 ".concat(tier.isCurrent
                ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-blue-500/5 shadow-lg scale-105'
                : tier.isNext
                    ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/5 to-transparent'
                    : 'border-gray-700 bg-white/5 hover:border-white/20')}>
                {tier.isCurrent && (<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
                      CURRENT
                    </div>
                  </div>)}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(tier.gradient, " flex items-center justify-center")}>
                    <span className="text-2xl">{tier.icon}</span>
                  </div>
                  <div>
                    <h4 className={"font-bold ".concat(tier.color, " text-lg")}>
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
                  {tier.benefits.slice(0, 3).map(function (benefit, i) { return (<div key={i} className="flex items-start gap-2">
                      <lucide_react_1.CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"/>
                      <span className="text-gray-400 text-sm">{benefit}</span>
                    </div>); })}
                </div>
                
                {tier.isNext && (<button onClick={onUpgradeClick} className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow">
                    Unlock This Tier
                  </button>)}
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </framer_motion_1.motion.div>

      {/* Achievements Section */}
      {showAchievements && (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
                <p className="text-gray-400">
                  {achievements.filter(function (a) { return a.unlocked; }).length} of {achievements.length} unlocked
                </p>
              </div>
              <div className="flex items-center gap-2">
                <lucide_react_1.Trophy className="w-5 h-5 text-yellow-400"/>
                <span className="text-yellow-400 font-bold">
                  {achievements.filter(function (a) { return a.unlocked; }).length * 100} XP
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {achievementCategories.map(function (category) {
                var Icon = category.icon;
                return (<button key={category.id} onClick={function () { return setActiveCategory(category.id); }} className={"px-4 py-2 rounded-xl flex items-center gap-2 transition-all ".concat(activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-white/10 text-gray-400 hover:text-white')}>
                    <Icon className="w-4 h-4"/>
                    <span className="font-medium">{category.label}</span>
                    <span className={"text-xs px-1.5 py-0.5 rounded-full ".concat(activeCategory === category.id ? 'bg-white/20' : 'bg-white/10')}>
                      {category.count}
                    </span>
                  </button>);
            })}
            </div>
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <framer_motion_1.AnimatePresence>
                {displayedAchievements.map(function (achievement, index) { return (<framer_motion_1.motion.div key={achievement.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05 }} className={"p-6 rounded-2xl border-2 transition-all duration-300 ".concat(achievement.unlocked
                    ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5'
                    : 'border-gray-700 bg-white/5')}>
                    <div className="flex items-start gap-4">
                      <div className={"w-16 h-16 rounded-xl flex items-center justify-center ".concat(achievement.unlocked
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800')}>
                        <span className="text-3xl">{achievement.badge}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">{achievement.title}</h4>
                          {achievement.unlocked ? (<div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-lg">
                              <lucide_react_1.CheckCircle className="w-3 h-3 text-green-400"/>
                              <span className="text-green-400 text-xs font-medium">Unlocked</span>
                            </div>) : (<div className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-lg">
                              <lucide_react_1.Lock className="w-3 h-3 text-gray-400"/>
                              <span className="text-gray-400 text-xs font-medium">Locked</span>
                            </div>)}
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={"w-6 h-6 rounded-full flex items-center justify-center ".concat(achievement.category === 'volume' ? 'bg-blue-500/20' :
                    achievement.category === 'count' ? 'bg-purple-500/20' :
                        achievement.category === 'speed' ? 'bg-amber-500/20' :
                            achievement.category === 'quality' ? 'bg-green-500/20' :
                                'bg-pink-500/20')}>
                              {achievement.category === 'volume' ? <lucide_react_1.DollarSign className="w-3 h-3 text-blue-400"/> :
                    achievement.category === 'count' ? <lucide_react_1.BarChart className="w-3 h-3 text-purple-400"/> :
                        achievement.category === 'speed' ? <lucide_react_1.Zap className="w-3 h-3 text-amber-400"/> :
                            achievement.category === 'quality' ? <lucide_react_1.ShieldCheck className="w-3 h-3 text-green-400"/> :
                                <lucide_react_1.Award className="w-3 h-3 text-pink-400"/>}
                            </div>
                            <span className="text-xs text-gray-500 capitalize">{achievement.category}</span>
                          </div>
                          
                          {achievement.unlocked && achievement.unlockedAt && (<span className="text-xs text-gray-500">
                              {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </span>)}
                        </div>
                      </div>
                    </div>
                  </framer_motion_1.motion.div>); })}
              </framer_motion_1.AnimatePresence>
            </div>
            
            {/* Show More/Less Button */}
            {filteredAchievements.length > 6 && (<div className="text-center mt-8">
                <button onClick={function () { return setShowAllAchievements(!showAllAchievements); }} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto">
                  {showAllAchievements ? 'Show Less' : "Show All ".concat(filteredAchievements.length, " Achievements")}
                  <lucide_react_1.ChevronRight className={"w-4 h-4 transition-transform ".concat(showAllAchievements ? 'rotate-90' : '')}/>
                </button>
              </div>)}
          </div>
        </framer_motion_1.motion.div>)}

      {/* Benefits & Features */}
      <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <h3 className="text-2xl font-bold text-white">Tier Benefits</h3>
          <p className="text-gray-400">Features unlocked at each tier level</p>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierBenefits.map(function (tier, index) { return (<framer_motion_1.motion.div key={tier.tier} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={"p-6 rounded-2xl border-2 ".concat(tier.tier === currentTier
                ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-blue-500/5'
                : 'border-gray-700 bg-white/5')}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(tier.gradient, " flex items-center justify-center")}>
                    <tier.icon className="w-6 h-6 text-white"/>
                  </div>
                  <div>
                    <h4 className={"font-bold ".concat(tier.color, " text-lg")}>
                      {tier.tier}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {tier.tier === currentTier ? 'Current Tier' : 'Available'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {tier.benefits.map(function (benefit, i) { return (<div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <lucide_react_1.CheckCircle className="w-3 h-3 text-green-400"/>
                      </div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>); })}
                </div>
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </framer_motion_1.motion.div>
    </div>);
}
