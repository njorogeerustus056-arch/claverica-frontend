
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

export const KYCService = void 0;
var KYCService = /** @class */ (function () {
    function KYCService() {
    }
    KYCService.checkRequirement = function (serviceType, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/check-requirement/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(localStorage.getItem('token') || '')
                                },
                                body: JSON.stringify({
                                    service_type: serviceType,
                                    amount: amount
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            // Return default if API fails
                            return [2 /*return*/, {
                                    kyc_required: amount > 1500,
                                    threshold: 1500,
                                    current_tier: 'unverified'
                                }];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        console.warn('KYC check API failed, using defaults:', error_1);
                        return [2 /*return*/, {
                                kyc_required: amount > 1500,
                                threshold: 1500,
                                current_tier: 'unverified'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    KYCService.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, docsResponse, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        token = localStorage.getItem('token');
                        if (!token)
                            return [2 /*return*/, { is_verified: false, verification_level: 'unverified' }];
                        return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/simple-status/', {
                                headers: { 'Authorization': "Bearer ".concat(token) }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/status/', {
                            headers: { 'Authorization': "Bearer ".concat(token) }
                        })];
                    case 4:
                        docsResponse = _a.sent();
                        if (!docsResponse.ok) return [3 /*break*/, 6];
                        return [4 /*yield*/, docsResponse.json()];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, {
                                is_verified: data.status === 'approved',
                                verification_level: data.status === 'approved' ? 'verified' : 'unverified'
                            }];
                    case 6: return [2 /*return*/, { is_verified: false, verification_level: 'unverified' }];
                    case 7:
                        error_2 = _a.sent();
                        console.warn('KYC status API failed:', error_2);
                        return [2 /*return*/, { is_verified: false, verification_level: 'unverified' }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    KYCService.getUserDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        token = localStorage.getItem('token');
                        if (!token)
                            return [2 /*return*/, { documents: [] }];
                        return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/', {
                                headers: { 'Authorization': "Bearer ".concat(token) }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, { documents: [] }];
                    case 4:
                        error_3 = _a.sent();
                        console.warn('Failed to fetch KYC documents:', error_3);
                        return [2 /*return*/, { documents: [] }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    KYCService.submitDocuments = function (formData) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, errorData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        token = localStorage.getItem('token');
                        if (!token)
                            throw new Error('Authentication required');
                        return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/', {
                                method: 'POST',
                                headers: { 'Authorization': "Bearer ".concat(token) },
                                body: formData
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        throw new Error(errorData.detail || errorData.message || 'Submission failed');
                    case 3: return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        error_4 = _a.sent();
                        console.error('KYC submission error:', error_4);
                        throw error_4;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    KYCService.getSubmissionHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        token = localStorage.getItem('token');
                        if (!token)
                            return [2 /*return*/, { submissions: [] }];
                        return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/submissions/', {
                                headers: { 'Authorization': "Bearer ".concat(token) }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, { submissions: [] }];
                    case 4:
                        error_5 = _a.sent();
                        console.warn('Failed to fetch submission history:', error_5);
                        return [2 /*return*/, { submissions: [] }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return KYCService;
}());
export const KYCService = KYCService;




