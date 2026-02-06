"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCProgressBar = void 0;
var lucide_react_1 = require("lucide-react");
var kycCreatives_1 = require("../../lib/utils/kycCreatives");
var KYCProgressBar = function (_a) {
    var portfolioValue = _a.portfolioValue, _b = _a.kycThreshold, kycThreshold = _b === void 0 ? 1500 : _b, onVerifyClick = _a.onVerifyClick;
    var progress = Math.min((portfolioValue / kycThreshold) * 100, 100);
    var difference = kycThreshold - portfolioValue;
    var tier = kycCreatives_1.KYC_CREATIVES.getVerificationTier(portfolioValue);
    var getProgressColor = function () {
        if (progress >= 100)
            return 'from-emerald-500 to-green-500';
        if (progress >= 70)
            return 'from-blue-500 to-cyan-500';
        if (progress >= 40)
            return 'from-purple-500 to-pink-500';
        return 'from-orange-500 to-red-500';
    };
    return (<div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={"w-12 h-12 rounded-xl bg-gradient-to-br ".concat(getProgressColor(), " flex items-center justify-center shadow-lg")}>
            <lucide_react_1.Target className="w-6 h-6 text-white" strokeWidth={2.5}/>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Verification Progress</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Unlock higher limits & premium features
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={"px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-br ".concat(tier.color, " text-white shadow-md")}>
            {tier.name} Tier
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Current: ${portfolioValue.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {Math.round(progress)}%
          </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Goal: ${kycThreshold.toLocaleString()}
          </span>
        </div>
        
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className={"h-full bg-gradient-to-r ".concat(getProgressColor(), " rounded-full transition-all duration-1000 ease-out")} style={{ width: "".concat(progress, "%") }}/>
        </div>
        
        {progress < 100 && (<p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-center">
            {kycCreatives_1.KYC_CREATIVES.getProgressMessage(portfolioValue, kycThreshold)}
          </p>)}
      </div>
      
      {/* Tier benefits */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {tier.benefits.map(function (benefit, index) { return (<div key={index} className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <div className={"w-6 h-6 rounded-full bg-gradient-to-br ".concat(tier.color, " flex items-center justify-center")}>
                <CheckIcon />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {benefit.split(':')[0]}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {benefit.split(':')[1] || benefit}
            </p>
          </div>); })}
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        {progress >= 100 ? (<button onClick={onVerifyClick} className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
            <lucide_react_1.Award className="w-5 h-5 group-hover:scale-110 transition-transform"/>
            <span>Complete Verification</span>
            <lucide_react_1.Zap className="w-4 h-4"/>
          </button>) : (<>
            <button onClick={onVerifyClick} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              <lucide_react_1.TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform"/>
              <span>Verify Early</span>
            </button>
            <button className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-bold text-sm transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span>Need ${difference}</span>
            </button>
          </>)}
      </div>
      
      {/* Quick stats */}
      {progress < 100 && (<div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-1">
                <lucide_react_1.Zap className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Verify in</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {kycCreatives_1.KYC_CREATIVES.getTimeToVerify()}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-1">
                <lucide_react_1.TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Next Tier</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                ${kycThreshold.toLocaleString()}
              </p>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.KYCProgressBar = KYCProgressBar;
var CheckIcon = function () { return (<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
  </svg>); };
