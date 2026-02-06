"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickActions = void 0;
// src/components/crypto/QuickActions.tsx
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var QuickActions = function (_a) {
    var onDeposit = _a.onDeposit, onTransfer = _a.onTransfer, onBuy = _a.onBuy, user = _a.user, kycThreshold = _a.kycThreshold;
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, react_1.useState)(100), selectedAmount = _c[0], setSelectedAmount = _c[1];
    var _d = (0, react_1.useState)(null), selectedAction = _d[0], setSelectedAction = _d[1];
    var quickAmounts = [50, 100, 500, 1000, 2000, 5000];
    var handleQuickBuy = function (amount) {
        if (!(user === null || user === void 0 ? void 0 : user.is_verified) && amount > kycThreshold) {
            onBuy(amount);
        }
        else {
            onBuy(amount);
        }
    };
    var quickActions = [
        {
            id: 'deposit',
            icon: lucide_react_1.Plus,
            label: 'Deposit',
            description: 'Add funds to wallet',
            color: 'from-blue-500 to-cyan-500',
            shadowColor: 'shadow-blue-500/30',
            action: onDeposit,
            kycRequired: false,
        },
        {
            id: 'transfer',
            icon: lucide_react_1.Send,
            label: 'Transfer',
            description: 'Send to another account',
            color: 'from-purple-500 to-pink-500',
            shadowColor: 'shadow-purple-500/30',
            action: onTransfer,
            kycRequired: !(user === null || user === void 0 ? void 0 : user.is_verified) && 2000 > kycThreshold,
        },
        {
            id: 'buy',
            icon: lucide_react_1.ArrowUpRight,
            label: 'Quick Buy',
            description: "Buy crypto instantly",
            color: 'from-emerald-500 to-green-500',
            shadowColor: 'shadow-emerald-500/30',
            action: function () { return handleQuickBuy(selectedAmount); },
            kycRequired: !(user === null || user === void 0 ? void 0 : user.is_verified) && selectedAmount > kycThreshold,
        },
        {
            id: 'sell',
            icon: lucide_react_1.ArrowDownRight,
            label: 'Quick Sell',
            description: 'Sell crypto instantly',
            color: 'from-orange-500 to-red-500',
            shadowColor: 'shadow-orange-500/30',
            action: function () { return console.log('Quick sell'); },
            kycRequired: !(user === null || user === void 0 ? void 0 : user.is_verified) && selectedAmount > kycThreshold,
        },
    ];
    return (<>
      {/* Floating Action Button - Revolut style */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={function () { return setIsOpen(!isOpen); }} className={"group relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center ".concat(isOpen ? 'scale-95 rotate-45' : 'scale-100 hover:scale-110')}>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping"/>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity"/>
          
          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? (<lucide_react_1.X className="w-7 h-7 text-white" strokeWidth={2.5}/>) : (<lucide_react_1.Zap className="w-7 h-7 text-white" strokeWidth={2.5}/>)}
          </div>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
              Quick Actions
              <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-slate-900 transform rotate-45 border-r border-b border-white/10"/>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Actions Panel */}
      {isOpen && (<>
          {/* Backdrop with blur */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 animate-in fade-in duration-300" onClick={function () { return setIsOpen(false); }}/>

          {/* Panel - Monzo inspired */}
          <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8 duration-500 border border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <lucide_react_1.Zap className="w-5 h-5 text-white" strokeWidth={2.5}/>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Fast & secure transactions</p>
                  </div>
                </div>
                
                <button onClick={function () { return setIsOpen(false); }} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <lucide_react_1.X className="w-5 h-5 text-slate-500 dark:text-slate-400"/>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* KYC Warning */}
              {!(user === null || user === void 0 ? void 0 : user.is_verified) && (<div className="relative overflow-hidden p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700/50">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent dark:from-purple-600/20 rounded-full blur-2xl"/>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <lucide_react_1.Shield className="w-6 h-6 text-white" strokeWidth={2.5}/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-purple-900 dark:text-purple-300">Unlock Full Access</h4>
                        <span className="px-2 py-0.5 bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-300 text-xs font-bold rounded-full">
                          Recommended
                        </span>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-400 leading-relaxed mb-3">
                        Complete identity verification to increase your daily limit to ${kycThreshold.toLocaleString()} and unlock premium features.
                      </p>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg">
                        <lucide_react_1.Lock className="w-4 h-4"/>
                        <span>Verify Identity</span>
                        <lucide_react_1.ChevronRight className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                </div>)}

              {/* Amount Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">Select Amount</label>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                    USD
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {quickAmounts.map(function (amount) {
                var requiresKYC = !(user === null || user === void 0 ? void 0 : user.is_verified) && amount > kycThreshold;
                var isSelected = selectedAmount === amount;
                return (<button key={amount} onClick={function () { return setSelectedAmount(amount); }} className={"relative px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ".concat(isSelected
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700')}>
                        {requiresKYC && (<lucide_react_1.Lock className="absolute top-1 right-1 w-3 h-3 text-purple-400"/>)}
                        ${amount.toLocaleString()}
                      </button>);
            })}
                </div>

                {/* Custom amount input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold">$</span>
                  <input type="number" value={selectedAmount} onChange={function (e) { return setSelectedAmount(Number(e.target.value)); }} className="w-full pl-8 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl text-slate-900 dark:text-white font-bold outline-none transition-all" placeholder="Custom amount"/>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Choose Action</h4>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map(function (action) {
                var ActionIcon = action.icon;
                var isSelected = selectedAction === action.id;
                return (<button key={action.id} onClick={function () {
                        setSelectedAction(action.id);
                        setTimeout(function () {
                            action.action();
                            setIsOpen(false);
                        }, 200);
                    }} className={"group/action relative p-5 rounded-2xl transition-all duration-300 overflow-hidden ".concat(isSelected ? 'scale-95' : 'hover:scale-105')}>
                        {/* Background gradient */}
                        <div className={"absolute inset-0 bg-gradient-to-br ".concat(action.color, " opacity-100")}/>
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/action:translate-x-[200%] transition-transform duration-1000"/>
                        
                        {/* KYC Badge */}
                        {action.kycRequired && (<div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <lucide_react_1.Lock className="w-3.5 h-3.5 text-yellow-900" strokeWidth={2.5}/>
                          </div>)}

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                            <ActionIcon className="w-6 h-6 text-white" strokeWidth={2.5}/>
                          </div>
                          <div>
                            <p className="font-bold text-white text-base mb-0.5">{action.label}</p>
                            <p className="text-xs text-white/80 font-medium">{action.description}</p>
                          </div>
                        </div>
                      </button>);
            })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Transaction Info</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <lucide_react_1.TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Daily Limit</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {(user === null || user === void 0 ? void 0 : user.is_verified) ? '$10,000' : "$".concat(kycThreshold.toLocaleString())}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <lucide_react_1.Sparkles className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Fees</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">0.1%</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <lucide_react_1.Clock className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Speed</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Instant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>)}
    </>);
};
exports.QuickActions = QuickActions;
