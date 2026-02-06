"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tailwind_merge_1 = require("tailwind-merge");
var clsx_1 = require("clsx");
var Label = function (_a) {
    var htmlFor = _a.htmlFor, children = _a.children, className = _a.className;
    return (<label htmlFor={htmlFor} className={(0, clsx_1.clsx)((0, tailwind_merge_1.twMerge)("mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400", className))}>
      {children}
    </label>);
};
exports.default = Label;
