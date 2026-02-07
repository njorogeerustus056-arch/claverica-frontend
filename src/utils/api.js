"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
export const export const export const void 0;
// ✅ THIS IS CORRECT - all files are in same utils folder
var cookies_1 = require("./cookies");
var API_URL = import.meta.env.VITE_API_URL || "";
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(status, message, data) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.message = message;
        _this.data = data;
        _this.name = 'ApiError';
        return _this;
    }
    return ApiError;
}(Error));

// Standard API fetch with auth and CSRF
var apiFetch = function (endpoint_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([endpoint_1], args_1, true), void 0, function (endpoint, options) {
        var token, csrfToken, headers, response, data, error_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem('access_token');
                    csrfToken = (0, cookies_1.getCookie)('csrftoken');
                    headers = __assign(__assign({}, options.headers), { 'Content-Type': 'application/json' });
                    if (token) {
                        headers['Authorization'] = "Bearer ".concat(token);
                    }
                    if (csrfToken) {
                        headers['X-CSRFToken'] = csrfToken;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(API_URL).concat(endpoint), __assign(__assign({}, options), { headers: headers, credentials: 'include' }))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new ApiError(response.status, data.error || data.detail || 'API request failed', data);
                    }
                    return [2 /*return*/, {
                            success: true,
                            data: data,
                            status: response.status,
                        }];
                case 4:
                    error_1 = _a.sent();
                    if (error_1 instanceof ApiError) {
                        return [2 /*return*/, {
                                success: false,
                                error: error_1.message,
                                status: error_1.status,
                            }];
                    }
                    return [2 /*return*/, {
                            success: false,
                            error: error_1 instanceof Error ? error_1.message : 'Network error',
                            status: 0,
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
};

// Form data upload (for KYC documents)
var uploadFormData = function (endpoint, formData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, csrfToken, headers, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = localStorage.getItem('access_token');
                csrfToken = (0, cookies_1.getCookie)('csrftoken');
                headers = {};
                if (token) {
                    headers['Authorization'] = "Bearer ".concat(token);
                }
                if (csrfToken) {
                    headers['X-CSRFToken'] = csrfToken;
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("".concat(API_URL).concat(endpoint), {
                        method: 'POST',
                        headers: headers,
                        body: formData,
                        credentials: 'include',
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json().catch(function () { return ({}); })];
            case 3:
                data = _a.sent();
                if (!response.ok) {
                    throw new ApiError(response.status, data.error || data.detail || 'Upload failed', data);
                }
                return [2 /*return*/, {
                        success: true,
                        data: data,
                        status: response.status,
                    }];
            case 4:
                error_2 = _a.sent();
                if (error_2 instanceof ApiError) {
                    return [2 /*return*/, {
                            success: false,
                            error: error_2.message,
                            status: error_2.status,
                        }];
                }
                return [2 /*return*/, {
                        success: false,
                        error: error_2 instanceof Error ? error_2.message : 'Upload failed',
                        status: 0,
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };


