"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressSteps = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var ProgressSteps = function (_a) {
    var steps = _a.steps, currentStep = _a.currentStep, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"flex items-center justify-between ".concat(className)}>
      {steps.map(function (step, index) { return (<react_1.default.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div className={"w-12 h-12 rounded-full flex items-center justify-center\n              ".concat(currentStep >= step.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500')}>
              {step.icon || (currentStep > step.id ? (<lucide_react_1.CheckCircle className="w-6 h-6"/>) : (<span className="font-semibold">{step.id}</span>))}
            </div>
            <span className={"mt-2 text-sm font-medium ".concat(currentStep >= step.id
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400')}>
              {step.label}
            </span>
          </div>
          
          {index < steps.length - 1 && (<div className={"flex-1 h-1 mx-4 ".concat(currentStep > step.id
                    ? 'bg-primary-500'
                    : 'bg-gray-200 dark:bg-gray-700')}/>)}
        </react_1.default.Fragment>); })}
    </div>);
};
exports.ProgressSteps = ProgressSteps;
