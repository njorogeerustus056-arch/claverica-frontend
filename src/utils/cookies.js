"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.deleteCookie = deleteCookie;
// Get CSRF token from cookies
function getCookie(name) {
    var _a;
    if (typeof document === 'undefined')
        return null;
    var value = "; ".concat(document.cookie);
    var parts = value.split("; ".concat(name, "="));
    if (parts.length === 2)
        return ((_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(';').shift()) || null;
    return null;
}
// Set cookie with options
function setCookie(name, value, days) {
    if (days === void 0) { days = 7; }
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = "".concat(name, "=").concat(value, "; expires=").concat(expires, "; path=/; SameSite=Lax");
}
// Delete cookie
function deleteCookie(name) {
    document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
}
