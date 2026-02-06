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
var react_1 = require("react");
var PhoneInput = function (_a) {
    var countries = _a.countries, _b = _a.placeholder, placeholder = _b === void 0 ? "+1 (555) 000-0000" : _b, onChange = _a.onChange, _c = _a.selectPosition, selectPosition = _c === void 0 ? "start" : _c;
    var _d = (0, react_1.useState)("US"), selectedCountry = _d[0], setSelectedCountry = _d[1];
    var _e = (0, react_1.useState)("+1"), phoneNumber = _e[0], setPhoneNumber = _e[1];
    var countryCodes = countries.reduce(function (acc, _a) {
        var _b;
        var code = _a.code, label = _a.label;
        return (__assign(__assign({}, acc), (_b = {}, _b[code] = label, _b)));
    }, {});
    var handleCountryChange = function (e) {
        var newCountry = e.target.value;
        setSelectedCountry(newCountry);
        setPhoneNumber(countryCodes[newCountry]);
        if (onChange) {
            onChange(countryCodes[newCountry]);
        }
    };
    var handlePhoneNumberChange = function (e) {
        var newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        if (onChange) {
            onChange(newPhoneNumber);
        }
    };
    return (<div className="relative flex">
      {/* Dropdown position: Start */}
      {selectPosition === "start" && (<div className="absolute">
          <select value={selectedCountry} onChange={handleCountryChange} className="appearance-none bg-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400">
            {countries.map(function (country) { return (<option key={country.code} value={country.code} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                {country.code}
              </option>); })}
          </select>
          <div className="absolute inset-y-0 flex items-center text-gray-700 pointer-events-none bg-none right-3 dark:text-gray-400">
            <svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>)}

      {/* Input field */}
      <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder={placeholder} className={"dark:bg-dark-900 h-11 w-full ".concat(selectPosition === "start" ? "pl-[84px]" : "pr-[84px]", " rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800")}/>

      {/* Dropdown position: End */}
      {selectPosition === "end" && (<div className="absolute right-0">
          <select value={selectedCountry} onChange={handleCountryChange} className="appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400">
            {countries.map(function (country) { return (<option key={country.code} value={country.code} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                {country.code}
              </option>); })}
          </select>
          <div className="absolute inset-y-0 flex items-center text-gray-700 pointer-events-none right-3 dark:text-gray-400">
            <svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>)}
    </div>);
};
exports.default = PhoneInput;
