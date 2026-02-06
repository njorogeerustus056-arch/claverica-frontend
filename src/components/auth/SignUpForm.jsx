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
exports.default = SignUpForm;
// src/components/auth/SignUpForm.tsx - MODERN FINTECH STYLING
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var formik_1 = require("formik");
var Yup = require("yup");
var icons_1 = require("../../icons");
var Label_1 = require("../form/Label");
var InputField_1 = require("../form/input/InputField");
var Checkbox_1 = require("../form/input/Checkbox");
var api_1 = require("../../api");
// Document types - International standards
var documentTypes = [
    { value: "", label: "Select document type" },
    { value: "passport", label: "Passport" },
    { value: "national_id", label: "National ID Card" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "residence_permit", label: "Residence Permit" },
];
// Currency options - Wise/Revolut style
var currencies = [
    { value: "USD", label: "USD ($)", symbol: "$" },
    { value: "EUR", label: "EUR (€)", symbol: "€" },
    { value: "GBP", label: "GBP (£)", symbol: "£" },
    { value: "KES", label: "KES (KSh)", symbol: "KSh" },
    { value: "ZAR", label: "ZAR (R)", symbol: "R" },
    { value: "NGN", label: "NGN (₦)", symbol: "₦" },
    { value: "GHS", label: "GHS (GH₵)", symbol: "GH₵" },
    { value: "UGX", label: "UGX (USh)", symbol: "USh" },
    { value: "TZS", label: "TZS (TSh)", symbol: "TSh" },
    { value: "INR", label: "INR (₹)", symbol: "₹" },
    { value: "CNY", label: "CNY (¥)", symbol: "¥" },
];
// Income ranges - Binance style with clear formatting
var incomeRanges = [
    { value: "", label: "Select annual income range" },
    { value: "<30000", label: "Below $30,000 / €27,000 / £22,500" },
    { value: "30000-50000", label: "$30,000 - $50,000 / €27,000 - €45,000" },
    { value: "50000-75000", label: "$50,000 - $75,000 / €45,000 - €68,000" },
    { value: "75000-100000", label: "$75,000 - $100,000 / €68,000 - €90,000" },
    { value: "100000-150000", label: "$100,000 - $150,000 / €90,000 - €135,000" },
    { value: "150000+", label: "Above $150,000 / €135,000" },
];
// Gender options - Modern inclusive
var genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non_binary', label: 'Non-binary' },
    { value: 'transgender', label: 'Transgender' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
];
// Major international countries - Wise style grouping
var countries = [
    { value: "", label: "Select country" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "IT", label: "Italy" },
    { value: "ES", label: "Spain" },
    { value: "KE", label: "Kenya" },
    { value: "NG", label: "Nigeria" },
    { value: "ZA", label: "South Africa" },
    { value: "GH", label: "Ghana" },
    { value: "UG", label: "Uganda" },
    { value: "TZ", label: "Tanzania" },
    { value: "ET", label: "Ethiopia" },
    { value: "RW", label: "Rwanda" },
    { value: "CN", label: "China" },
    { value: "IN", label: "India" },
    { value: "JP", label: "Japan" },
    { value: "KR", label: "South Korea" },
    { value: "SG", label: "Singapore" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "BR", label: "Brazil" },
    { value: "MX", label: "Mexico" },
];
var SignUpSchema = Yup.object().shape({
    // Personal Info
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
        .required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    phone: Yup.string()
        .matches(/^[+][0-9]{10,15}$/, "Enter valid international format: +1234567890")
        .required("Phone number is required"),
    date_of_birth: Yup.date()
        .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), "You must be at least 18 years old")
        .required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    // KYC Documentation
    doc_type: Yup.string().required("Please select a document type"),
    doc_number: Yup.string().when("doc_type", {
        is: function (val) { return !!val && val !== ""; },
        then: function (schema) { return schema.required("Document number is required"); },
    }),
    // Address - International format
    address_line1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state_province: Yup.string().required("State/Province is required"),
    postal_code: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    doc_country: Yup.string().required("Document country is required"),
    country_of_residence: Yup.string().required("Country of residence is required"),
    nationality: Yup.string().required("Nationality is required"),
    // Employment (Optional but recommended)
    occupation: Yup.string(),
    employer: Yup.string(),
    income_range: Yup.string(),
    // Terms
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});
function SignUpForm() {
    var _this = this;
    var _a = (0, react_1.useState)(false), showPassword = _a[0], setShowPassword = _a[1];
    var _b = (0, react_1.useState)(false), showConfirm = _b[0], setShowConfirm = _b[1];
    var _c = (0, react_1.useState)(false), showEmployment = _c[0], setShowEmployment = _c[1];
    var _d = (0, react_1.useState)(""), serverError = _d[0], setServerError = _d[1];
    var _e = (0, react_1.useState)(1), currentStep = _e[0], setCurrentStep = _e[1];
    var _f = (0, react_1.useState)(false), isLoading = _f[0], setIsLoading = _f[1];
    var _g = (0, react_1.useState)(""), selectedCountry = _g[0], setSelectedCountry = _g[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header - Revolut Style */}
      <div className="w-full max-w-2xl px-4 pt-8 mx-auto">
        <react_router_dom_1.Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-all hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:gap-3 group">
          <icons_1.ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1"/>
          <span className="transition-colors">Back to home</span>
        </react_router_dom_1.Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-2xl px-4 py-8 mx-auto">
        <div className="w-full">
          {/* Title Section - Binance Style */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create Global Account
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                256-bit Encryption
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 110-2h12a2 2 0 001-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4H6v12z" clipRule="evenodd"/>
                </svg>
                GDPR Compliant
              </span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Join 10M+ users across 100+ countries
            </p>
          </div>

          {/* Progress Indicator - Wise Style */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep} of 3
              </span>
              <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                {Math.round((currentStep / 3) * 100)}%
              </span>
            </div>
            <div className="relative w-full h-1.5 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-800">
              <div className="absolute top-0 left-0 h-full transition-all duration-500 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" style={{ width: "".concat((currentStep / 3) * 100, "%") }}/>
            </div>
          </div>

          <formik_1.Formik initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            phone: "",
            date_of_birth: "",
            gender: "",
            doc_type: "",
            doc_number: "",
            address_line1: "",
            city: "",
            state_province: "",
            postal_code: "",
            country: "",
            doc_country: "",
            country_of_residence: "",
            nationality: "",
            occupation: "",
            employer: "",
            income_range: "",
            terms: false,
            preferred_currency: "USD",
        }} validationSchema={SignUpSchema} onSubmit={function (values_1, _a) { return __awaiter(_this, [values_1, _a], void 0, function (values, _b) {
            var payload, response, err_1, errorMessage;
            var _c;
            var setSubmitting = _b.setSubmitting;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        setServerError("");
                        setIsLoading(true);
                        setSubmitting(true);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, 4, 5]);
                        console.log("?? [DEBUG] Submitting form data:", values);
                        payload = {
                            email: values.email.trim().toLowerCase(),
                            first_name: values.first_name.trim(),
                            last_name: values.last_name.trim(),
                            password: values.password,
                            confirm_password: values.confirm_password,
                            phone: values.phone.trim(),
                            date_of_birth: values.date_of_birth,
                            gender: values.gender,
                            doc_type: values.doc_type,
                            doc_number: values.doc_number.trim(),
                            address_line1: values.address_line1.trim(),
                            city: values.city.trim(),
                            state_province: values.state_province.trim(),
                            postal_code: values.postal_code.trim(),
                            country: values.country,
                            doc_country: values.doc_country,
                            country_of_residence: values.country_of_residence,
                            nationality: values.nationality,
                            occupation: showEmployment ? values.occupation.trim() : "",
                            employer: showEmployment ? values.employer.trim() : "",
                            income_range: showEmployment ? values.income_range : "",
                        };
                        return [4 /*yield*/, (0, api_1.apiFetch)("/api/accounts/register/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(payload),
                            })];
                    case 2:
                        response = _d.sent();
                        localStorage.setItem("pendingVerificationEmail", values.email);
                        navigate("/verify-email", {
                            state: { email: values.email }
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _d.sent();
                        console.error("? [DEBUG] Registration error:", err_1);
                        errorMessage = "Registration failed. Please check your details and try again.";
                        if ((_c = err_1.message) === null || _c === void 0 ? void 0 : _c.includes("already exists")) {
                            errorMessage = "Email or phone already registered. Please login or use different credentials.";
                        }
                        else if (err_1.status === 400) {
                            errorMessage = "Please check all required fields and try again.";
                        }
                        else if (err_1.status === 500) {
                            errorMessage = "Server error. Please try again later.";
                        }
                        setServerError(errorMessage);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        setSubmitting(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); }}>
            {function (_a) {
            var values = _a.values, errors = _a.errors, touched = _a.touched, handleChange = _a.handleChange, handleBlur = _a.handleBlur, setFieldValue = _a.setFieldValue, isSubmitting = _a.isSubmitting;
            // Update step based on filled fields
            var updateStep = function () {
                var step1Complete = values.first_name && values.last_name && values.email &&
                    values.password && values.confirm_password && values.phone &&
                    values.date_of_birth && values.gender;
                var step2Complete = values.doc_type && values.doc_number && values.address_line1 &&
                    values.city && values.state_province && values.postal_code &&
                    values.country && values.doc_country && values.country_of_residence && values.nationality;
                if (step1Complete && step2Complete) {
                    setCurrentStep(3);
                }
                else if (step1Complete) {
                    setCurrentStep(2);
                }
                else {
                    setCurrentStep(1);
                }
            };
            return (<formik_1.Form onChange={updateStep}>
                  <div className="space-y-6">
                    {/* Step 1: Personal Information - Revolut Card Style */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-r from-brand-500 to-brand-600">
                          1
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Personal Information
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Basic details for your account
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        {/* Name - Side by side */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              First Name
                            </Label_1.default>
                            <InputField_1.default name="first_name" value={values.first_name} onChange={handleChange} onBlur={handleBlur} placeholder="John" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.first_name && errors.first_name && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.first_name}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Last Name
                            </Label_1.default>
                            <InputField_1.default name="last_name" value={values.last_name} onChange={handleChange} onBlur={handleBlur} placeholder="Doe" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.last_name && errors.last_name && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.last_name}
                              </p>)}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Email Address
                          </Label_1.default>
                          <InputField_1.default name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="john.doe@example.com" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                          {touched.email && errors.email && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.email}
                            </p>)}
                        </div>

                        {/* Phone */}
                        <div>
                          <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Phone Number
                          </Label_1.default>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                              🌍
                            </span>
                            <InputField_1.default name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+1234567890" className="w-full pl-12 pr-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                          </div>
                          {touched.phone && errors.phone && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.phone}
                            </p>)}
                          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            Include country code (e.g., +1 for US, +44 for UK)
                          </p>
                        </div>

                        {/* Date of Birth & Gender */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Date of Birth
                            </Label_1.default>
                            <InputField_1.default name="date_of_birth" type="date" value={values.date_of_birth} onChange={handleChange} onBlur={handleBlur} max={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.date_of_birth && errors.date_of_birth && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.date_of_birth}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Gender
                            </Label_1.default>
                            <select name="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {genderOptions.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                            {touched.gender && errors.gender && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.gender}
                              </p>)}
                          </div>
                        </div>

                        {/* Password */}
                        <div>
                          <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Password
                          </Label_1.default>
                          <div className="relative">
                            <InputField_1.default name="password" type={showPassword ? "text" : "password"} value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Create a strong password" className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            <button type="button" onClick={function () { return setShowPassword(!showPassword); }} className="absolute z-10 p-2 transition-all -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95" aria-label={showPassword ? "Hide password" : "Show password"}>
                              {showPassword ? (<icons_1.EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>) : (<icons_1.EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>)}
                            </button>
                          </div>
                          {touched.password && errors.password && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.password}
                            </p>)}
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={"w-1.5 h-1.5 rounded-full ".concat(values.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600')}/>
                              <span>8+ characters</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={"w-1.5 h-1.5 rounded-full ".concat(/[A-Z]/.test(values.password) && /[a-z]/.test(values.password) && /[0-9]/.test(values.password) && /[@$!%*?&]/.test(values.password) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600')}/>
                              <span>Uppercase, lowercase, number & special character</span>
                            </div>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Confirm Password
                          </Label_1.default>
                          <div className="relative">
                            <InputField_1.default name="confirm_password" type={showConfirm ? "text" : "password"} value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} placeholder="Re-enter your password" className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            <button type="button" onClick={function () { return setShowConfirm(!showConfirm); }} className="absolute z-10 p-2 transition-all -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95" aria-label={showConfirm ? "Hide password" : "Show password"}>
                              {showConfirm ? (<icons_1.EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>) : (<icons_1.EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>)}
                            </button>
                          </div>
                          {touched.confirm_password && errors.confirm_password && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.confirm_password}
                            </p>)}
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Identity & Address - Binance Style */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-r from-brand-500 to-brand-600">
                          2
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Identity Verification
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Required for security & compliance
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        {/* Document Type + Number */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Document Type
                            </Label_1.default>
                            <select name="doc_type" value={values.doc_type} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {documentTypes.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                            {touched.doc_type && errors.doc_type && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.doc_type}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Document Number
                            </Label_1.default>
                            <InputField_1.default name="doc_number" value={values.doc_number} onChange={handleChange} onBlur={handleBlur} placeholder="Enter document number" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.doc_number && errors.doc_number && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.doc_number}
                              </p>)}
                          </div>
                        </div>

                        {/* Country Selection Grid - Wise Style */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Country
                            </Label_1.default>
                            <select name="country" value={values.country} onChange={function (e) {
                    handleChange(e);
                    setSelectedCountry(e.target.value);
                }} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {countries.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                            {touched.country && errors.country && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.country}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Document Country
                            </Label_1.default>
                            <select name="doc_country" value={values.doc_country} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {countries.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                            {touched.doc_country && errors.doc_country && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.doc_country}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Country of Residence
                            </Label_1.default>
                            <select name="country_of_residence" value={values.country_of_residence} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {countries.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                            {touched.country_of_residence && errors.country_of_residence && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.country_of_residence}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Nationality
                            </Label_1.default>
                            <select name="nationality" value={values.nationality} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {countries.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                            {touched.nationality && errors.nationality && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.nationality}
                              </p>)}
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Street Address
                          </Label_1.default>
                          <InputField_1.default name="address_line1" value={values.address_line1} onChange={handleChange} onBlur={handleBlur} placeholder="123 Main Street, Apt 4B" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                          {touched.address_line1 && errors.address_line1 && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.address_line1}
                            </p>)}
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              City
                            </Label_1.default>
                            <InputField_1.default name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} placeholder="New York" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.city && errors.city && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.city}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              State/Province
                            </Label_1.default>
                            <InputField_1.default name="state_province" value={values.state_province} onChange={handleChange} onBlur={handleBlur} placeholder={selectedCountry === "US" ? "NY" :
                    selectedCountry === "GB" ? "England" :
                        selectedCountry === "KE" ? "Nairobi" : "State/Province"} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.state_province && errors.state_province && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.state_province}
                              </p>)}
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Postal Code
                            </Label_1.default>
                            <InputField_1.default name="postal_code" value={values.postal_code} onChange={handleChange} onBlur={handleBlur} placeholder={selectedCountry === "US" ? "10001" :
                    selectedCountry === "GB" ? "SW1A 1AA" :
                        selectedCountry === "KE" ? "00100" : "Postal code"} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                            {touched.postal_code && errors.postal_code && (<p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.postal_code}
                            </p>)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Employment (Optional) - Skrill Style */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-r from-brand-500 to-brand-600">
                            3
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Employment Information
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Optional - Helps personalize your experience
                            </p>
                          </div>
                        </div>
                        <button type="button" onClick={function () { return setShowEmployment(!showEmployment); }} className="px-4 py-2 text-sm font-medium transition-all duration-200 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-750 active:scale-95">
                          {showEmployment ? "Hide" : "Add"}
                        </button>
                      </div>

                      {showEmployment && (<div className="space-y-5">
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Occupation
                            </Label_1.default>
                            <InputField_1.default name="occupation" value={values.occupation} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Software Engineer" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Employer
                            </Label_1.default>
                            <InputField_1.default name="employer" value={values.employer} onChange={handleChange} onBlur={handleBlur} placeholder="Company Name" className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"/>
                          </div>
                          <div>
                            <Label_1.default className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Annual Income
                            </Label_1.default>
                            <select name="income_range" value={values.income_range} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100">
                              {incomeRanges.map(function (opt) { return (<option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>); })}
                            </select>
                          </div>
                        </div>)}
                    </div>

                    {/* Terms & Conditions - Modern Checkbox */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl dark:bg-gray-800/50">
                      <div className="flex items-start h-6">
                        <Checkbox_1.default checked={values.terms} onChange={function (checked) { return setFieldValue("terms", checked); }} className="mt-0.5"/>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{" "}
                        <react_router_dom_1.Link to="/terms" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                          Terms & Conditions
                        </react_router_dom_1.Link>{" "}
                        and{" "}
                        <react_router_dom_1.Link to="/privacy" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                          Privacy Policy
                        </react_router_dom_1.Link>
                        . I confirm I am at least 18 years old and agree to electronic communications.
                      </p>
                    </div>
                    {touched.terms && errors.terms && (<p className="text-sm font-medium text-red-600 dark:text-red-400">
                        {errors.terms}
                      </p>)}

                    {/* Server Error - Modern Alert */}
                    {serverError && (<div className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 rounded-xl dark:bg-red-900/10 dark:border-red-800 animate-fade-in">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        <p className="text-sm font-medium text-red-800 dark:text-red-200">
                          {serverError}
                        </p>
                      </div>)}

                    {/* Submit Button - Revolut Style */}
                    <button type="submit" disabled={isSubmitting || isLoading || !values.terms} className="w-full py-4 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-500/30">
                      {isSubmitting || isLoading ? (<span className="flex items-center justify-center gap-3">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating your global account...
                        </span>) : ("Create Global Account")}
                    </button>
                  </div>
                </formik_1.Form>);
        }}
          </formik_1.Formik>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <react_router_dom_1.Link to="/signin" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                Sign in to your account
              </react_router_dom_1.Link>
            </p>
          </div>

          {/* Security Footer - Modern */}
          <div className="p-5 mt-8 border border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-2xl dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30">
                <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Bank-Grade Security
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Your data is protected with 256-bit SSL encryption. We are PCI DSS compliant and follow global security standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
