"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/Marquee/Marquee.tsx
var react_1 = require("react");
var Marquee_module_css_1 = require("./Marquee.module.css");
var lucide_react_1 = require("lucide-react");
var Marquee = function () {
    var items = [
        { icon: <lucide_react_1.TrendingUp />, text: 'BTC +5.2%', value: '$45,231', positive: true },
        { icon: <lucide_react_1.Shield />, text: 'Secure Escrow', value: '100% Safe' },
        { icon: <lucide_react_1.Zap />, text: 'Fast Transfers', value: '< 2min' },
        { icon: <lucide_react_1.Lock />, text: 'Encrypted', value: 'AES-256' },
        { icon: <lucide_react_1.Globe />, text: 'Global', value: '150+ Countries' },
        { icon: <lucide_react_1.TrendingDown />, text: 'ETH -1.8%', value: '$3,210', positive: false },
    ];
    // Duplicate items for seamless loop
    var duplicatedItems = __spreadArray(__spreadArray(__spreadArray([], items, true), items, true), items, true);
    return (<div className={Marquee_module_css_1.default.marqueeContainer}>
      {/* Left gradient overlay */}
      <div className={"".concat(Marquee_module_css_1.default.marqueeOverlay, " ").concat(Marquee_module_css_1.default.marqueeOverlayLeft)}/>
      
      {/* First row */}
      <div className={Marquee_module_css_1.default.marqueeTrack}>
        {duplicatedItems.map(function (item, index) { return (<div key={index} className={Marquee_module_css_1.default.marqueeItem}>
            <div className={Marquee_module_css_1.default.marqueeIcon}>{item.icon}</div>
            <div>
              <div className={Marquee_module_css_1.default.marqueeText}>{item.text}</div>
              <div className={"".concat(Marquee_module_css_1.default.marqueeValue, " ").concat(item.positive ? Marquee_module_css_1.default.marqueePositive : item.positive === false ? Marquee_module_css_1.default.marqueeNegative : '')}>
                {item.value}
              </div>
            </div>
          </div>); })}
      </div>
      
      {/* Second row (reverse direction) */}
      <div className={"".concat(Marquee_module_css_1.default.marqueeTrack, " ").concat(Marquee_module_css_1.default.marqueeTrackReverse)}>
        {duplicatedItems.map(function (item, index) { return (<div key={"reverse-".concat(index)} className={Marquee_module_css_1.default.marqueeItem}>
            <div className={Marquee_module_css_1.default.marqueeIcon}>{item.icon}</div>
            <div>
              <div className={Marquee_module_css_1.default.marqueeText}>{item.text}</div>
              <div className={Marquee_module_css_1.default.marqueeValue}>{item.value}</div>
            </div>
          </div>); })}
      </div>
      
      {/* Right gradient overlay */}
      <div className={"".concat(Marquee_module_css_1.default.marqueeOverlay, " ").concat(Marquee_module_css_1.default.marqueeOverlayRight)}/>
    </div>);
};
exports.default = Marquee;
