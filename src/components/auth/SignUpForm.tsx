// src/components/auth/SignUpForm.tsx - MODERN FINTECH STYLING
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import api from '../../api';   // ✅ Correct - imports from main api.ts

// Document types - International standards
const documentTypes = [
  { value: "", label: "Select document type" },
  { value: "passport", label: "Passport" },
  { value: "national_id", label: "National ID Card" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "residence_permit", label: "Residence Permit" },
];

// Currency options - Wise/Revolut style
const currencies = [
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
const incomeRanges = [
  { value: "", label: "Select annual income range" },
  { value: "<30000", label: "Below $30,000 / €27,000 / £22,500" },
  { value: "30000-50000", label: "$30,000 - $50,000 / €27,000 - €45,000" },
  { value: "50000-75000", label: "$50,000 - $75,000 / €45,000 - €68,000" },
  { value: "75000-100000", label: "$75,000 - $100,000 / €68,000 - €90,000" },
  { value: "100000-150000", label: "$100,000 - $150,000 / €90,000 - €135,000" },
  { value: "150000+", label: "Above $150,000 / €135,000" },
];

// Gender options - Modern inclusive
const genderOptions = [
  { value: '', label: 'Select gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'transgender', label: 'Transgender' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
];

// Major international countries - Wise style grouping
const countries = [
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

const SignUpSchema = Yup.object().shape({
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
    .max(new Date(Date.now() - 18*365*24*60*60*1000), "You must be at least 18 years old")
    .required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  
  // KYC Documentation
  doc_type: Yup.string().required("Please select a document type"),
  doc_number: Yup.string().when("doc_type", {
    is: (val: string) => !!val && val !== "",
    then: (schema) => schema.required("Document number is required"),
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

type SignUpValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  doc_type: string;
  doc_number: string;
  address_line1: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  doc_country: string;
  country_of_residence: string;
  nationality: string;
  occupation: string;
  employer: string;
  income_range: string;
  terms: boolean;
  preferred_currency: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmployment, setShowEmployment] = useState(false);
  const [serverError, setServerError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header - Revolut Style */}
      <div className="w-full max-w-2xl px-4 pt-8 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-all hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:gap-3 group"
        >
          <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="transition-colors">Back to home</span>
        </Link>
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
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                256-bit Encryption
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 110-2h12a2 2 0 001-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4H6v12z" clipRule="evenodd" />
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
              <div 
                className="absolute top-0 left-0 h-full transition-all duration-500 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <Formik<SignUpValues>
            initialValues={{
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
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setServerError("");
              setIsLoading(true);
              setSubmitting(true);

              try {
                console.log("📝 [DEBUG] Submitting form data:", values);
                
                const payload = {
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

                // ✅ FIXED: Removed /api prefix (api.post already adds base URL)
                const response = await api.post("/accounts/register/", payload, {
                  headers: {
                    "Content-Type": "application/json"
                  }
                });

                localStorage.setItem("pendingVerificationEmail", values.email);

                navigate("/verify-email", {
                  state: { email: values.email }
                });
              } catch (err: any) {
                console.error("❌ [DEBUG] Registration error:", err);
                
                let errorMessage = "Registration failed. Please check your details and try again.";
                
                if (err.message?.includes("already exists")) {
                  errorMessage = "Email or phone already registered. Please login or use different credentials.";
                } else if (err.status === 400) {
                  errorMessage = "Please check all required fields and try again.";
                } else if (err.status === 500) {
                  errorMessage = "Server error. Please try again later.";
                }
                
                setServerError(errorMessage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } finally {
                setIsLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
              // Update step based on filled fields
              const updateStep = () => {
                const step1Complete = values.first_name && values.last_name && values.email && 
                                     values.password && values.confirm_password && values.phone && 
                                     values.date_of_birth && values.gender;
                
                const step2Complete = values.doc_type && values.doc_number && values.address_line1 && 
                                     values.city && values.state_province && values.postal_code && 
                                     values.country && values.doc_country && values.country_of_residence && values.nationality;
                
                if (step1Complete && step2Complete) {
                  setCurrentStep(3);
                } else if (step1Complete) {
                  setCurrentStep(2);
                } else {
                  setCurrentStep(1);
                }
              };

              return (
                <Form onChange={updateStep}>
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
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              First Name
                            </Label>
                            <Input
                              name="first_name"
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="John"
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.first_name && errors.first_name && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.first_name}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Last Name
                            </Label>
                            <Input
                              name="last_name"
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Doe"
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.last_name && errors.last_name && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.last_name}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Email Address
                          </Label>
                          <Input
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="john.doe@example.com"
                            className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                          />
                          {touched.email && errors.email && (
                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                              📞
                            </span>
                            <Input
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="+1234567890"
                              className="w-full pl-12 pr-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.phone}
                            </p>
                          )}
                          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            Include country code (e.g., +1 for US, +44 for UK)
                          </p>
                        </div>

                        {/* Date of Birth & Gender */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Date of Birth
                            </Label>
                            <Input
                              name="date_of_birth"
                              type="date"
                              value={values.date_of_birth}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              max={new Date().toISOString().split("T")[0]}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.date_of_birth && errors.date_of_birth && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.date_of_birth}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Gender
                            </Label>
                            <select
                              name="gender"
                              value={values.gender}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {genderOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.gender && errors.gender && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.gender}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Password */}
                        <div>
                          <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Create a strong password"
                              className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute z-10 p-2 transition-all -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? (
                                <EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>
                          </div>
                          {touched.password && errors.password && (
                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.password}
                            </p>
                          )}
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${values.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                              <span>8+ characters</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(values.password) && /[a-z]/.test(values.password) && /[0-9]/.test(values.password) && /[@$!%*?&]/.test(values.password) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                              <span>Uppercase, lowercase, number & special character</span>
                            </div>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Input
                              name="confirm_password"
                              type={showConfirm ? "text" : "password"}
                              value={values.confirm_password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Re-enter your password"
                              className="w-full px-4 py-3.5 pr-12 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              className="absolute z-10 p-2 transition-all -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
                              aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                              {showConfirm ? (
                                <EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>
                          </div>
                          {touched.confirm_password && errors.confirm_password && (
                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.confirm_password}
                            </p>
                          )}
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
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Document Type
                            </Label>
                            <select
                              name="doc_type"
                              value={values.doc_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {documentTypes.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.doc_type && errors.doc_type && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.doc_type}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Document Number
                            </Label>
                            <Input
                              name="doc_number"
                              value={values.doc_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter document number"
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.doc_number && errors.doc_number && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.doc_number}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Country Selection Grid - Wise Style */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Country
                            </Label>
                            <select
                              name="country"
                              value={values.country}
                              onChange={(e) => {
                                handleChange(e);
                                setSelectedCountry(e.target.value);
                              }}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.country && errors.country && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.country}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Document Country
                            </Label>
                            <select
                              name="doc_country"
                              value={values.doc_country}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.doc_country && errors.doc_country && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.doc_country}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Country of Residence
                            </Label>
                            <select
                              name="country_of_residence"
                              value={values.country_of_residence}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.country_of_residence && errors.country_of_residence && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.country_of_residence}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Nationality
                            </Label>
                            <select
                              name="nationality"
                              value={values.nationality}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.nationality && errors.nationality && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.nationality}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                            Street Address
                          </Label>
                          <Input
                            name="address_line1"
                            value={values.address_line1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="123 Main Street, Apt 4B"
                            className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                          />
                          {touched.address_line1 && errors.address_line1 && (
                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                              {errors.address_line1}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              City
                            </Label>
                            <Input
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="New York"
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.city && errors.city && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.city}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              State/Province
                            </Label>
                            <Input
                              name="state_province"
                              value={values.state_province}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={selectedCountry === "US" ? "NY" : 
                                         selectedCountry === "GB" ? "England" : 
                                         selectedCountry === "KE" ? "Nairobi" : "State/Province"}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.state_province && errors.state_province && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.state_province}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Postal Code
                            </Label>
                            <Input
                              name="postal_code"
                              value={values.postal_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={selectedCountry === "US" ? "10001" : 
                                         selectedCountry === "GB" ? "SW1A 1AA" : 
                                         selectedCountry === "KE" ? "00100" : "Postal code"}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                            {touched.postal_code && errors.postal_code && (
                              <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.postal_code}
                              </p>
                            )}
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
                        <button
                          type="button"
                          onClick={() => setShowEmployment(!showEmployment)}
                          className="px-4 py-2 text-sm font-medium transition-all duration-200 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-750 active:scale-95"
                        >
                          {showEmployment ? "Hide" : "Add"}
                        </button>
                      </div>

                      {showEmployment && (
                        <div className="space-y-5">
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Occupation
                            </Label>
                            <Input
                              name="occupation"
                              value={values.occupation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g. Software Engineer"
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Employer
                            </Label>
                            <Input
                              name="employer"
                              value={values.employer}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Company Name"
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-brand-500 dark:focus:ring-brand-500/30 transition-all duration-200"
                            />
                          </div>
                          <div>
                            <Label className="mb-2.5 text-sm font-medium text-gray-800 dark:text-gray-300">
                              Annual Income
                            </Label>
                            <select
                              name="income_range"
                              value={values.income_range}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="w-full px-4 py-3.5 text-sm border border-gray-300 rounded-xl focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100"
                            >
                              {incomeRanges.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Terms & Conditions - Modern Checkbox */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl dark:bg-gray-800/50">
                      <div className="flex items-start h-6">
                        <Checkbox
                          checked={values.terms}
                          onChange={(checked) => setFieldValue("terms", checked)}
                          className="mt-0.5"
                        />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{" "}
                        <Link to="/terms" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                          Privacy Policy
                        </Link>
                        . I confirm I am at least 18 years old and agree to electronic communications.
                      </p>
                    </div>
                    {touched.terms && errors.terms && (
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        {errors.terms}
                      </p>
                    )}

                    {/* Server Error - Modern Alert */}
                    {serverError && (
                      <div className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 rounded-xl dark:bg-red-900/10 dark:border-red-800 animate-fade-in">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium text-red-800 dark:text-red-200">
                          {serverError}
                        </p>
                      </div>
                    )}

                    {/* Submit Button - Revolut Style */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading || !values.terms}
                      className="w-full py-4 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl hover:from-brand-600 hover:to-brand-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-500/30"
                    >
                      {isSubmitting || isLoading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating your global account...
                        </span>
                      ) : (
                        "Create Global Account"
                      )}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
              >
                Sign in to your account
              </Link>
            </p>
          </div>

          {/* Security Footer - Modern */}
          <div className="p-5 mt-8 border border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-2xl dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30">
                <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
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
    </div>
  );
}