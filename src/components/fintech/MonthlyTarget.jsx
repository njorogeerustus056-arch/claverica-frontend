"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyTarget = MonthlyTarget;
function MonthlyTarget() {
    return (<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Target
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full">
            <circle cx="50%" cy="50%" r="45%" stroke="#e5e7eb" strokeWidth="10" fill="none"/>
            <circle cx="50%" cy="50%" r="45%" stroke="#3b82f6" strokeWidth="10" fill="none" strokeDasharray="283" strokeDashoffset="60" strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold dark:text-white">
            78%
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
          You have completed <span className="font-semibold">78%</span> of your monthly financial goal.
        </p>
      </div>
    </div>);
}
