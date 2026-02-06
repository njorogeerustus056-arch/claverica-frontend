"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ChartTab = function () {
    var _a = (0, react_1.useState)("optionOne"), selected = _a[0], setSelected = _a[1];
    var getButtonClass = function (option) {
        return selected === option
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400";
    };
    return (<div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button onClick={function () { return setSelected("optionOne"); }} className={"px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ".concat(getButtonClass("optionOne"))}>
        Monthly
      </button>

      <button onClick={function () { return setSelected("optionTwo"); }} className={"px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ".concat(getButtonClass("optionTwo"))}>
        Quarterly
      </button>

      <button onClick={function () { return setSelected("optionThree"); }} className={"px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ".concat(getButtonClass("optionThree"))}>
        Annually
      </button>
    </div>);
};
exports.default = ChartTab;
