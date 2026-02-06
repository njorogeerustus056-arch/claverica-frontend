"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RadioSm = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, checked = _a.checked, label = _a.label, onChange = _a.onChange, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (<label htmlFor={id} className={"flex cursor-pointer select-none items-center text-sm text-gray-500 dark:text-gray-400 ".concat(className)}>
      <span className="relative">
        {/* Hidden Input */}
        <input type="radio" id={id} name={name} value={value} checked={checked} onChange={function () { return onChange(value); }} className="sr-only"/>
        {/* Styled Radio Circle */}
        <span className={"mr-2 flex h-4 w-4 items-center justify-center rounded-full border ".concat(checked
            ? "border-brand-500 bg-brand-500"
            : "bg-transparent border-gray-300 dark:border-gray-700")}>
          {/* Inner Dot */}
          <span className={"h-1.5 w-1.5 rounded-full ".concat(checked ? "bg-white" : "bg-white dark:bg-[#1e2636]")}></span>
        </span>
      </span>
      {label}
    </label>);
};
exports.default = RadioSm;
