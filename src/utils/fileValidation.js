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
exports.compressImage = exports.validateDocumentRequirements = exports.validateImageFile = void 0;
// Validate image files
var validateImageFile = function (file) {
    var errors = [];
    var warnings = [];
    // Check file type
    if (!file.type.startsWith('image/')) {
        errors.push('Only image files are allowed');
    }
    // Check file size (5MB limit)
    var maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        errors.push("File size must be less than 5MB. Current: ".concat((file.size / 1024 / 1024).toFixed(2), "MB"));
    }
    // Check file name
    if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        warnings.push('File extension should be .jpg, .png, .gif, or .webp');
    }
    // Check dimensions (if image can be loaded)
    if (file.type.startsWith('image/')) {
        var img = new Image();
        img.src = URL.createObjectURL(file);
        // Note: This is async, would need Promise for full implementation
        if (file.size < 50 * 1024) { // Less than 50KB
            warnings.push('Image quality might be low');
        }
    }
    return {
        valid: errors.length === 0,
        error: errors.length > 0 ? errors.join(', ') : undefined,
        warnings: warnings.length > 0 ? warnings : undefined
    };
};
exports.validateImageFile = validateImageFile;
// Validate document type specific requirements
var validateDocumentRequirements = function (docType, frontFile, backFile) {
    var errors = [];
    if (!frontFile) {
        errors.push('Front image is required');
    }
    // Require back image for certain document types
    if (['national_id', 'driver_license'].includes(docType) && !backFile) {
        errors.push('Back image is required for this document type');
    }
    return {
        valid: errors.length === 0,
        error: errors.length > 0 ? errors.join(', ') : undefined
    };
};
exports.validateDocumentRequirements = validateDocumentRequirements;
// Compress image if needed
var compressImage = function (file_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([file_1], args_1, true), void 0, function (file, maxSizeMB) {
        if (maxSizeMB === void 0) { maxSizeMB = 1; }
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (file.size <= maxSizeMB * 1024 * 1024) {
                        resolve(file);
                        return;
                    }
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (event) {
                        var _a;
                        var img = new Image();
                        img.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                        img.onload = function () {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            // Calculate new dimensions
                            var maxDimension = 1200;
                            var width = img.width;
                            var height = img.height;
                            if (width > height && width > maxDimension) {
                                height *= maxDimension / width;
                                width = maxDimension;
                            }
                            else if (height > maxDimension) {
                                width *= maxDimension / height;
                                height = maxDimension;
                            }
                            canvas.width = width;
                            canvas.height = height;
                            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
                            canvas.toBlob(function (blob) {
                                if (blob) {
                                    var compressedFile = new File([blob], file.name, {
                                        type: 'image/jpeg',
                                        lastModified: Date.now()
                                    });
                                    resolve(compressedFile);
                                }
                                else {
                                    reject(new Error('Compression failed'));
                                }
                            }, 'image/jpeg', 0.8 // Quality
                            );
                        };
                    };
                    reader.onerror = function () { return reject(new Error('Failed to read file')); };
                })];
        });
    });
};
exports.compressImage = compressImage;
