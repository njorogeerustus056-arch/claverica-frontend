"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentCard = function (_a) {
    var title = _a.title, children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.desc, desc = _c === void 0 ? "" : _c;
    return (<div className={"rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 ".concat(className)}>
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        {desc && (<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>)}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>);
};
exports.default = ComponentCard;
