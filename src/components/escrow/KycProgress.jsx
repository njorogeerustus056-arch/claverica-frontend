"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KycProgress;
var lucide_react_1 = require("lucide-react");
function KycProgress(_a) {
    var _b;
    var steps = _a.steps, currentStep = _a.currentStep;
    return (<div className="px-8 py-6 border-b border-white/10 bg-slate-900/30">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" style={{ width: "".concat(((currentStep - 1) / (steps.length - 1)) * 100, "%") }}/>
        </div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map(function (step) { return (<div key={step.id} className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={"\n                w-12 h-12 rounded-full flex items-center justify-center mb-3\n                transition-all duration-300 transform\n                ".concat(step.status === "completed"
                ? "bg-gradient-to-br from-green-500 to-emerald-500 scale-110 shadow-lg shadow-green-500/30"
                : step.status === "current"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500 scale-110 shadow-lg shadow-blue-500/30 animate-pulse"
                    : "bg-white/10 border border-white/20", "\n              ")}>
                {step.status === "completed" ? (<lucide_react_1.CheckCircle2 className="w-6 h-6 text-white"/>) : step.status === "current" ? (<div className="animate-spin-slow">
                    {step.icon}
                  </div>) : (<lucide_react_1.Clock className="w-6 h-6 text-gray-400"/>)}
              </div>

              {/* Step Info */}
              <div className="text-center">
                <p className={"\n                  font-bold mb-1\n                  ".concat(step.status === "completed"
                ? "text-green-400"
                : step.status === "current"
                    ? "text-white"
                    : "text-gray-400", "\n                ")}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>

              {/* Step Number */}
              <div className={"\n                absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold\n                ".concat(step.status === "completed"
                ? "bg-green-500 text-white"
                : step.status === "current"
                    ? "bg-blue-500 text-white animate-pulse"
                    : "bg-gray-700 text-gray-400", "\n              ")}>
                {step.id}
              </div>
            </div>); })}
        </div>
      </div>

      {/* Current Step Indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
          <lucide_react_1.AlertCircle className="w-4 h-4 text-blue-400"/>
          <span className="text-sm text-blue-300">
            Step {currentStep} of {steps.length}: {(_b = steps.find(function (s) { return s.id === currentStep; })) === null || _b === void 0 ? void 0 : _b.title}
          </span>
        </div>
      </div>

      <style jsx>{"\n        @keyframes spin-slow {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n        .animate-spin-slow {\n          animation: spin-slow 3s linear infinite;\n        }\n      "}</style>
    </div>);
}
