import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import styles from "./SignUpForm.module.css";

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
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.backLink}>
          <ChevronLeft className={styles.backIcon} />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          {/* Title Section */}
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>
              Create Global Account
            </h1>
            <div className={styles.badgeContainer}>
              <span className={`${styles.badge} ${styles.badgeTeal}`}>
                <svg className={styles.badgeIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                256-bit Encryption
              </span>
              <span className={`${styles.badge} ${styles.badgePurple}`}>
                <svg className={styles.badgeIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 110-2h12a2 2 0 001-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4H6v12z" clipRule="evenodd" />
                </svg>
                GDPR Compliant
              </span>
            </div>
            <p className={styles.pageSubtitle}>
              Join 10M+ users across 100+ countries
            </p>
          </div>

          {/* Progress Indicator */}
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>
                Step {currentStep} of 3
              </span>
              <span className={styles.progressPercentage}>
                {Math.round((currentStep / 3) * 100)}%
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
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

                // API call would go here
                // const response = await api.auth.register(payload);

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
                <Form onChange={updateStep} className={styles.form}>
                  <div className={styles.formSections}>
                    {/* Step 1: Personal Information */}
                    <div className={styles.formCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.stepIndicator}>1</div>
                        <div>
                          <h2 className={styles.cardTitle}>
                            Personal Information
                          </h2>
                          <p className={styles.cardSubtitle}>
                            Basic details for your account
                          </p>
                        </div>
                      </div>

                      <div className={styles.cardContent}>
                        {/* Name - Side by side */}
                        <div className={styles.rowGrid}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              First Name
                            </label>
                            <input
                              name="first_name"
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="John"
                              className={`${styles.fieldInput} ${touched.first_name && errors.first_name ? styles.fieldError : ''}`}
                            />
                            {touched.first_name && errors.first_name && (
                              <p className={styles.errorMessage}>
                                {errors.first_name}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Last Name
                            </label>
                            <input
                              name="last_name"
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Doe"
                              className={`${styles.fieldInput} ${touched.last_name && errors.last_name ? styles.fieldError : ''}`}
                            />
                            {touched.last_name && errors.last_name && (
                              <p className={styles.errorMessage}>
                                {errors.last_name}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Email Address
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="john.doe@example.com"
                            className={`${styles.fieldInput} ${touched.email && errors.email ? styles.fieldError : ''}`}
                          />
                          {touched.email && errors.email && (
                            <p className={styles.errorMessage}>
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Phone Number
                          </label>
                          <div className={styles.fieldWithIcon}>
                            <span className={styles.fieldIcon}>📞</span>
                            <input
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="+1234567890"
                              className={`${styles.fieldInput} ${styles.fieldInputWithIcon} ${touched.phone && errors.phone ? styles.fieldError : ''}`}
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className={styles.errorMessage}>
                              {errors.phone}
                            </p>
                          )}
                          <p className={styles.fieldHint}>
                            Include country code (e.g., +1 for US, +44 for UK)
                          </p>
                        </div>

                        {/* Date of Birth & Gender */}
                        <div className={styles.rowGrid}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Date of Birth
                            </label>
                            <input
                              name="date_of_birth"
                              type="date"
                              value={values.date_of_birth}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              max={new Date().toISOString().split("T")[0]}
                              className={`${styles.fieldInput} ${touched.date_of_birth && errors.date_of_birth ? styles.fieldError : ''}`}
                            />
                            {touched.date_of_birth && errors.date_of_birth && (
                              <p className={styles.errorMessage}>
                                {errors.date_of_birth}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Gender
                            </label>
                            <select
                              name="gender"
                              value={values.gender}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${styles.fieldSelect} ${touched.gender && errors.gender ? styles.fieldError : ''}`}
                            >
                              {genderOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.gender && errors.gender && (
                              <p className={styles.errorMessage}>
                                {errors.gender}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Password */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Password
                          </label>
                          <div className={styles.passwordWrapper}>
                            <input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Create a strong password"
                              className={`${styles.fieldInput} ${styles.passwordInput} ${touched.password && errors.password ? styles.fieldError : ''}`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className={styles.passwordToggle}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? (
                                <Eye className={styles.eyeIcon} />
                              ) : (
                                <EyeOff className={styles.eyeIcon} />
                              )}
                            </button>
                          </div>
                          {touched.password && errors.password && (
                            <p className={styles.errorMessage}>
                              {errors.password}
                            </p>
                          )}
                          <div className={styles.passwordStrength}>
                            <div className={styles.strengthItem}>
                              <div className={`${styles.strengthDot} ${values.password.length >= 8 ? styles.strengthMet : ''}`} />
                              <span>8+ characters</span>
                            </div>
                            <div className={styles.strengthItem}>
                              <div className={`${styles.strengthDot} ${/[A-Z]/.test(values.password) && /[a-z]/.test(values.password) && /[0-9]/.test(values.password) && /[@$!%*?&]/.test(values.password) ? styles.strengthMet : ''}`} />
                              <span>Uppercase, lowercase, number & special character</span>
                            </div>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Confirm Password
                          </label>
                          <div className={styles.passwordWrapper}>
                            <input
                              name="confirm_password"
                              type={showConfirm ? "text" : "password"}
                              value={values.confirm_password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Re-enter your password"
                              className={`${styles.fieldInput} ${styles.passwordInput} ${touched.confirm_password && errors.confirm_password ? styles.fieldError : ''}`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              className={styles.passwordToggle}
                              aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                              {showConfirm ? (
                                <Eye className={styles.eyeIcon} />
                              ) : (
                                <EyeOff className={styles.eyeIcon} />
                              )}
                            </button>
                          </div>
                          {touched.confirm_password && errors.confirm_password && (
                            <p className={styles.errorMessage}>
                              {errors.confirm_password}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Identity & Address */}
                    <div className={styles.formCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.stepIndicator}>2</div>
                        <div>
                          <h2 className={styles.cardTitle}>
                            Identity Verification
                          </h2>
                          <p className={styles.cardSubtitle}>
                            Required for security & compliance
                          </p>
                        </div>
                      </div>

                      <div className={styles.cardContent}>
                        {/* Document Type + Number */}
                        <div className={styles.rowGrid}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Document Type
                            </label>
                            <select
                              name="doc_type"
                              value={values.doc_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${styles.fieldSelect} ${touched.doc_type && errors.doc_type ? styles.fieldError : ''}`}
                            >
                              {documentTypes.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.doc_type && errors.doc_type && (
                              <p className={styles.errorMessage}>
                                {errors.doc_type}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Document Number
                            </label>
                            <input
                              name="doc_number"
                              value={values.doc_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter document number"
                              className={`${styles.fieldInput} ${touched.doc_number && errors.doc_number ? styles.fieldError : ''}`}
                            />
                            {touched.doc_number && errors.doc_number && (
                              <p className={styles.errorMessage}>
                                {errors.doc_number}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Country Selection Grid */}
                        <div className={styles.countryGrid}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Country
                            </label>
                            <select
                              name="country"
                              value={values.country}
                              onChange={(e) => {
                                handleChange(e);
                                setSelectedCountry(e.target.value);
                              }}
                              onBlur={handleBlur}
                              className={`${styles.fieldSelect} ${touched.country && errors.country ? styles.fieldError : ''}`}
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.country && errors.country && (
                              <p className={styles.errorMessage}>
                                {errors.country}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Document Country
                            </label>
                            <select
                              name="doc_country"
                              value={values.doc_country}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${styles.fieldSelect} ${touched.doc_country && errors.doc_country ? styles.fieldError : ''}`}
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.doc_country && errors.doc_country && (
                              <p className={styles.errorMessage}>
                                {errors.doc_country}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Country of Residence
                            </label>
                            <select
                              name="country_of_residence"
                              value={values.country_of_residence}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${styles.fieldSelect} ${touched.country_of_residence && errors.country_of_residence ? styles.fieldError : ''}`}
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.country_of_residence && errors.country_of_residence && (
                              <p className={styles.errorMessage}>
                                {errors.country_of_residence}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Nationality
                            </label>
                            <select
                              name="nationality"
                              value={values.nationality}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`${styles.fieldSelect} ${touched.nationality && errors.nationality ? styles.fieldError : ''}`}
                            >
                              {countries.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {touched.nationality && errors.nationality && (
                              <p className={styles.errorMessage}>
                                {errors.nationality}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Address */}
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Street Address
                          </label>
                          <input
                            name="address_line1"
                            value={values.address_line1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="123 Main Street, Apt 4B"
                            className={`${styles.fieldInput} ${touched.address_line1 && errors.address_line1 ? styles.fieldError : ''}`}
                          />
                          {touched.address_line1 && errors.address_line1 && (
                            <p className={styles.errorMessage}>
                              {errors.address_line1}
                            </p>
                          )}
                        </div>

                        <div className={styles.addressGrid}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              City
                            </label>
                            <input
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="New York"
                              className={`${styles.fieldInput} ${touched.city && errors.city ? styles.fieldError : ''}`}
                            />
                            {touched.city && errors.city && (
                              <p className={styles.errorMessage}>
                                {errors.city}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              State/Province
                            </label>
                            <input
                              name="state_province"
                              value={values.state_province}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={selectedCountry === "US" ? "NY" : 
                                         selectedCountry === "GB" ? "England" : 
                                         selectedCountry === "KE" ? "Nairobi" : "State/Province"}
                              className={`${styles.fieldInput} ${touched.state_province && errors.state_province ? styles.fieldError : ''}`}
                            />
                            {touched.state_province && errors.state_province && (
                              <p className={styles.errorMessage}>
                                {errors.state_province}
                              </p>
                            )}
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Postal Code
                            </label>
                            <input
                              name="postal_code"
                              value={values.postal_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={selectedCountry === "US" ? "10001" : 
                                         selectedCountry === "GB" ? "SW1A 1AA" : 
                                         selectedCountry === "KE" ? "00100" : "Postal code"}
                              className={`${styles.fieldInput} ${touched.postal_code && errors.postal_code ? styles.fieldError : ''}`}
                            />
                            {touched.postal_code && errors.postal_code && (
                              <p className={styles.errorMessage}>
                                {errors.postal_code}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Employment (Optional) */}
                    <div className={styles.formCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.stepIndicator}>3</div>
                        <div>
                          <h2 className={styles.cardTitle}>
                            Employment Information
                          </h2>
                          <p className={styles.cardSubtitle}>
                            Optional - Helps personalize your experience
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowEmployment(!showEmployment)}
                          className={styles.toggleButton}
                        >
                          {showEmployment ? "Hide" : "Add"}
                        </button>
                      </div>

                      {showEmployment && (
                        <div className={styles.cardContent}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Occupation
                            </label>
                            <input
                              name="occupation"
                              value={values.occupation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="e.g. Software Engineer"
                              className={styles.fieldInput}
                            />
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Employer
                            </label>
                            <input
                              name="employer"
                              value={values.employer}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Company Name"
                              className={styles.fieldInput}
                            />
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                              Annual Income
                            </label>
                            <select
                              name="income_range"
                              value={values.income_range}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={styles.fieldSelect}
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

                    {/* Terms & Conditions */}
                    <div className={styles.termsContainer}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={values.terms}
                          onChange={(e) => setFieldValue("terms", e.target.checked)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>
                          I agree to the{" "}
                          <Link to="/terms" className={styles.termsLink}>
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className={styles.termsLink}>
                            Privacy Policy
                          </Link>
                          . I confirm I am at least 18 years old and agree to electronic communications.
                        </span>
                      </label>
                      {touched.terms && errors.terms && (
                        <p className={styles.errorMessage}>
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* Server Error */}
                    {serverError && (
                      <div className={styles.serverError}>
                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className={styles.errorText}>
                          {serverError}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading || !values.terms}
                      className={styles.submitButton}
                    >
                      {isSubmitting || isLoading ? (
                        <span className={styles.buttonContent}>
                          <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
                            <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className={styles.spinnerFill} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          <div className={styles.signinLink}>
            <p className={styles.signinText}>
              Already have an account?{" "}
              <Link to="/signin" className={styles.signinAnchor}>
                Sign in to your account
              </Link>
            </p>
          </div>

          {/* Security Footer */}
          <div className={styles.securityFooter}>
            <div className={styles.securityIconWrapper}>
              <svg className={styles.securityFooterIcon} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className={styles.securityFooterTitle}>
                Bank-Grade Security
              </p>
              <p className={styles.securityFooterText}>
                Your data is protected with 256-bit SSL encryption. We are PCI DSS compliant and follow global security standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}