"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProtectedRoute;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("../lib/store/auth");
var lucide_react_1 = require("lucide-react");
function ProtectedRoute(_a) {
    var _this = this;
    var children = _a.children;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, auth_1.useAuthStore)(), isAuthenticated = _b.isAuthenticated, loading = _b.loading, verifyToken = _b.verifyToken;
    var _c = (0, react_1.useState)(true), checkingAuth = _c[0], setCheckingAuth = _c[1];
    (0, react_1.useEffect)(function () {
        // On mount, verify token with backend
        var verifyAuth = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, verifyToken()];
                    case 1:
                        _a.sent();
                        setCheckingAuth(false);
                        return [2 /*return*/];
                }
            });
        }); };
        verifyAuth();
    }, [verifyToken]);
    (0, react_1.useEffect)(function () {
        // Only redirect after auth check is complete
        if (!checkingAuth && !loading && !isAuthenticated) {
            navigate('/signin');
        }
    }, [checkingAuth, loading, isAuthenticated, navigate]);
    if (checkingAuth || loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <lucide_react_1.Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4"/>
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>);
    }
    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }
    return <>{children}</>;
}
