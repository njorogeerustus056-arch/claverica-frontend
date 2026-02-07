
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

export const useKYC = void 0;
var react_1 = require("react");
var api_1 = require("@/api");
var kycCreatives_1 = require("@/lib/utils/kycCreatives");
var useKYC = function () {
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    // Add creative context helper ✅
    var getCreativeContext = (0, react_1.useCallback)(function (action, amount, asset) {
        return {
            action: action,
            amount: amount,
            asset: asset,
            benefits: kycCreatives_1.KYC_CREATIVES.getActionBenefits(action, amount, asset),
            unlockableFeature: kycCreatives_1.KYC_CREATIVES.getUnlockableFeature(action),
            estimatedReward: kycCreatives_1.KYC_CREATIVES.getEstimatedReward(amount, action),
            icon: kycCreatives_1.KYC_CREATIVES.getIconForAction(action),
            ctaText: kycCreatives_1.KYC_CREATIVES.getCreativeCTAText(action, asset),
            tier: kycCreatives_1.KYC_CREATIVES.getVerificationTier(amount),
            timeToVerify: kycCreatives_1.KYC_CREATIVES.getTimeToVerify()
        };
    }, []);
    // ✅ MOVE checkKYCRequirement FIRST (before it's used)
    var checkKYCRequirement = (0, react_1.useCallback)(function (serviceType_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([serviceType_1], args_1, true), void 0, function (serviceType, amount) {
            var response, err_1;
            if (amount === void 0) { amount = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, (0, api_1.apiFetch)('/kyc/check-requirement/', {
                                method: 'POST',
                                body: JSON.stringify({ service_type: serviceType, amount: amount }),
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.success) {
                            return [2 /*return*/, {
                                    requiresKYC: response.data.requires_kyc || false,
                                    message: response.data.message || '',
                                    redirectUrl: response.data.redirect_url,
                                }];
                        }
                        throw new Error(response.error);
                    case 3:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Check failed');
                        return [2 /*return*/, { requiresKYC: false, message: 'Unable to verify KYC requirement' }];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, []);
    // ✅ THEN checkKYCRequirementWithContext (depends on checkKYCRequirement)
    var checkKYCRequirementWithContext = (0, react_1.useCallback)(function (serviceType_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([serviceType_1], args_1, true), void 0, function (serviceType, amount, action, asset) {
            var basicCheck;
            if (amount === void 0) { amount = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, checkKYCRequirement(serviceType, amount)];
                    case 1:
                        basicCheck = _a.sent();
                        if (basicCheck.requiresKYC && action) {
                            return [2 /*return*/, __assign(__assign({}, basicCheck), { creativeContext: getCreativeContext(action, amount, asset) })];
                        }
                        return [2 /*return*/, basicCheck];
                }
            });
        });
    }, [checkKYCRequirement, getCreativeContext]);
    // Submit KYC documents
    var submitDocuments = (0, react_1.useCallback)(function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_2, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, api_1.uploadFormData)('/kyc/submit/', formData)];
                case 2:
                    response = _a.sent();
                    if (response.success) {
                        return [2 /*return*/, {
                                success: true,
                                message: 'Documents submitted successfully',
                            }];
                    }
                    throw new Error(response.error);
                case 3:
                    err_2 = _a.sent();
                    message = err_2 instanceof Error ? err_2.message : 'Submission failed';
                    setError(message);
                    return [2 /*return*/, { success: false, message: message }];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    // Get KYC status
    var getKYCStatus = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, api_1.apiFetch)('/kyc/status/')];
                case 2:
                    response = _b.sent();
                    if (response.success) {
                        // Transform backend response to our interface
                        return [2 /*return*/, {
                                hasApprovedKYC: ((_a = response.data.latest_kyc) === null || _a === void 0 ? void 0 : _a.status) === 'approved',
                                latestSubmission: response.data.latest_kyc,
                                pendingRequests: response.data.pending_submissions || [],
                            }];
                    }
                    throw new Error(response.error);
                case 3:
                    err_3 = _b.sent();
                    setError(err_3 instanceof Error ? err_3.message : 'Failed to get status');
                    return [2 /*return*/, null];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    return {
        loading: loading,
        error: error,
        checkKYCRequirement: checkKYCRequirement, // Original
        checkKYCRequirementWithContext: checkKYCRequirementWithContext, // ✅ New enhanced version
        submitDocuments: submitDocuments,
        getKYCStatus: getKYCStatus,
        getCreativeContext: getCreativeContext, // ✅ Expose for direct use
        clearError: function () { return setError(null); },
    };
};
export const useKYC = useKYC;




