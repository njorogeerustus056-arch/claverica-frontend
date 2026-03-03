// src/pages/Dashboard/AccountSettings.tsx - UPDATED WITH ONLY EXISTING APIS
import { useState, useEffect } from "react"; 
import { 
  User, Mail, Phone, Lock, Shield, Bell, Eye, EyeOff, 
  Smartphone, Globe, Download, Trash2, ChevronRight,
  Check, X, MapPin, Monitor, AlertCircle, Key, Camera,
  Save, Loader2, CreditCard, Building,
  Laptop, Tablet, Calendar,
  LogOut, HelpCircle, Users, FileText,
  CheckCircle, XCircle, Wallet,
  BarChart3, Shield as ShieldIcon, Clock, Zap,
  Target, AlertTriangle,
  Globe2, Smartphone as PhoneIcon,
  UserCheck, UserX,
  TrendingUp, TrendingDown,
  BadgeCheck, BadgeAlert,
  Briefcase, MapPinned
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../lib/store/auth";
import toast, { Toaster } from 'react-hot-toast';
import styles from './AccountSettings.module.css';

const API_URL = import.meta.env.VITE_API_URL || "https://claverica-backend-production.up.railway.app";

// Match your Django Account model exactly
interface Account {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  account_number: string;
  phone?: string;
  is_verified: boolean;
  is_active: boolean;
  date_of_birth?: string;
  gender?: string;
  doc_type?: string;
  doc_number?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  occupation?: string;
  employer?: string;
  income_range?: string;
  date_joined?: string;
  address_line1?: string;
  state_province?: string;
  country?: string;
  nationality?: string;
  kyc_status?: string;
  risk_level?: string;
  account_status?: string;
  last_login?: string;
}

interface UserSettings {
  profile_visibility: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  email_frequency: string;
  two_factor_enabled?: boolean;
  last_password_change?: string;
}

interface KYCStatus {
  email_verified: boolean;
  phone_verified: boolean;
  kyc_status: 'pending' | 'submitted' | 'verified' | 'rejected' | 'under_review';
  kyc_docs_submitted: boolean;
  verification_score: number;
}

interface SecurityStatus {
  two_factor_enabled: boolean;
  last_password_change: string;
  failed_login_attempts: number;
  suspicious_activity: boolean;
  security_score: number;
}

export default function AccountSettings() {
  const { user: authUser, tokens, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Form states
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    occupation: '',
    employer: '',
    income_range: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    profile_visibility: 'public',
    email_notifications: true,
    sms_notifications: false,
    email_frequency: 'realtime'
  });

  // Data states
  const [account, setAccount] = useState<Account>({
    email: "",
    first_name: "",
    last_name: "",
    account_number: "",
    phone: "",
    is_verified: false,
    is_active: false
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    profile_visibility: 'public',
    email_notifications: true,
    sms_notifications: false,
    email_frequency: 'realtime'
  });

  const [kycStatus, setKycStatus] = useState<KYCStatus>({
    email_verified: false,
    phone_verified: false,
    kyc_status: 'pending',
    kyc_docs_submitted: false,
    verification_score: 0
  });

  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    two_factor_enabled: false,
    last_password_change: '',
    failed_login_attempts: 0,
    suspicious_activity: false,
    security_score: 0
  });

  // Fetch account data from REAL APIs only
  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    setLoading(true);
    setError(null);

    if (!tokens?.access) {
      setError("Please login to view account settings");
      setLoading(false);
      return;
    }

    try {
      // Using /api/ prefix - CORRECT
      const userRes = await fetch(`${API_URL}/api/users/profile/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!userRes.ok) {
        throw new Error(`Failed to load user: ${userRes.statusText}`);
      }

      const userData = await userRes.json();
      
      // Using /api/ prefix - CORRECT
      const settingsRes = await fetch(`${API_URL}/api/users/settings/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      let settingsData: UserSettings = {
        profile_visibility: 'public',
        email_notifications: true,
        sms_notifications: false,
        email_frequency: 'realtime'
      };
      
      if (settingsRes.ok) {
        settingsData = await settingsRes.json();
      }

      setAccount({
        email: userData.email || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        account_number: userData.account_number || "",
        phone: userData.phone || "",
        is_verified: userData.is_verified || false,
        is_active: userData.is_active || false,
        date_of_birth: userData.date_of_birth,
        gender: userData.gender,
        doc_type: userData.doc_type,
        doc_number: userData.doc_number,
        street: userData.street || userData.address_line1,
        city: userData.city,
        state: userData.state || userData.state_province,
        zip_code: userData.zip_code || userData.postal_code,
        occupation: userData.occupation,
        employer: userData.employer,
        income_range: userData.income_range,
        date_joined: userData.date_joined,
        kyc_status: userData.kyc_status,
        risk_level: userData.risk_level,
        account_status: userData.account_status,
        country: userData.country,
        nationality: userData.nationality,
        last_login: userData.last_login
      });

      setUserSettings(settingsData);
      setSettingsForm(settingsData);

      const kycDocsSubmitted = !!(userData.doc_type && userData.doc_number);
      const kycStatusValue = userData.kyc_status || (kycDocsSubmitted ? 'submitted' : 'pending');
      
      setKycStatus({
        email_verified: userData.is_verified || false,
        phone_verified: false,
        kyc_status: kycStatusValue,
        kyc_docs_submitted: kycDocsSubmitted,
        verification_score: calculateVerificationScore(userData)
      });

      setSecurityStatus({
        two_factor_enabled: settingsData.two_factor_enabled || false,
        last_password_change: 'Recently',
        failed_login_attempts: 0,
        suspicious_activity: false,
        security_score: calculateSecurityScore(settingsData, userData)
      });

      setProfileForm({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
        date_of_birth: userData.date_of_birth || "",
        gender: userData.gender || "",
        street: userData.street || userData.address_line1 || "",
        city: userData.city || "",
        state: userData.state || userData.state_province || "",
        zip_code: userData.zip_code || userData.postal_code || "",
        occupation: userData.occupation || "",
        employer: userData.employer || "",
        income_range: userData.income_range || ""
      });

    } catch (err: any) {
      console.error("Account data fetch error:", err);
      setError(err.message || "Failed to load account data");
      toast.error("Failed to load account data");
    } finally {
      setLoading(false);
    }
  };

  const calculateVerificationScore = (accountData: any): number => {
    let score = 0;
    if (accountData.is_verified) score += 30;
    if (accountData.phone) score += 20;
    if (accountData.doc_type && accountData.doc_number) score += 30;
    if ((accountData.street || accountData.address_line1) && accountData.city && (accountData.state || accountData.state_province)) score += 20;
    return score;
  };

  const calculateSecurityScore = (settings: any, accountData: any): number => {
    let score = 50;
    if (settings.two_factor_enabled) score += 30;
    if (accountData.is_verified) score += 10;
    if (accountData.phone) score += 10;
    return Math.min(score, 100);
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!tokens?.access) {
      toast.error("Please login to update settings");
      return;
    }

    try {
      // Using /api/ prefix - CORRECT
      const response = await fetch(`${API_URL}/api/users/settings/update/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update settings: ${response.statusText}`);
      }

      const updatedSettings = await response.json();
      
      setUserSettings(prev => ({ ...prev, ...updates }));
      setSettingsForm(prev => ({ ...prev, ...updates }));
      
      setSecurityStatus(prev => ({
        ...prev,
        security_score: calculateSecurityScore({ ...userSettings, ...updates }, account)
      }));

      toast.success("Settings updated successfully");
    } catch (err: any) {
      console.error("Settings update failed:", err);
      toast.error(err.message || "Failed to update settings");
    }
  };

  const updateProfile = async () => {
    if (!tokens?.access) {
      toast.error("Please login to update profile");
      return;
    }

    setSaving(true);
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(profileForm).map(([key, value]) => [
          key, 
          value === '' ? null : value
        ])
      );

      // Using /api/ prefix - CORRECT
      const response = await fetch(`${API_URL}/api/users/profile/update/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update profile: ${response.statusText}`);
      }

      toast.success("Profile updated successfully");
      setShowProfileModal(false);
      fetchAccountData();
    } catch (err: any) {
      console.error("Profile update failed:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (!tokens?.access) {
      toast.error("Please login to change password");
      return;
    }

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.new_password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setSaving(true);
    try {
      // Using /api/ prefix - CORRECT
      const response = await fetch(`${API_URL}/api/users/password/change/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to change password");
      }

      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      
      setSecurityStatus(prev => ({
        ...prev,
        last_password_change: new Date().toLocaleDateString()
      }));
    } catch (err: any) {
      console.error("Password change failed:", err);
      toast.error(err.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const submitKYC = async () => {
    window.location.href = '/dashboard/kyc';
  };

  const SecurityScoreCircle = ({ score }: { score: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    const getColor = (score: number) => {
      if (score >= 80) return styles.scoreGreen;
      if (score >= 60) return styles.scoreYellow;
      return styles.scoreRed;
    };

    return (
      <div className={styles.scoreCircle}>
        <svg className={styles.scoreSvg} viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            strokeWidth="8"
            fill="none"
            className={styles.scoreCircleBg}
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${styles.scoreCircleFill} ${getColor(score)}`}
          />
        </svg>
        <div className={styles.scoreValue}>
          <span className={styles.scoreNumber}>{score}</span>
          <span className={styles.scoreText}>Security Score</span>
        </div>
      </div>
    );
  };

  const VerificationProgress = () => {
    const steps = [
      { label: "Email", completed: kycStatus.email_verified, required: true },
      { label: "Phone", completed: kycStatus.phone_verified, required: false },
      { label: "ID Docs", completed: kycStatus.kyc_docs_submitted, required: true },
      { label: "Address", completed: !!(account.street || account.address_line1) && account.city && (account.state || account.state_province), required: true },
    ];

    const completedCount = steps.filter(step => step.completed).length;
    const totalCount = steps.filter(step => step.required).length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return (
      <div>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Verification Progress</span>
          <span className={styles.progressPercentage}>{percentage}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={`${styles.stepCircle} ${step.completed ? styles.stepCompleted : styles.stepPending}`}>
                {step.completed ? <Check size={16} /> : index + 1}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const documentTypes = [
    { value: "passport", label: "Passport" },
    { value: "national_id", label: "National ID Card" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "residence_permit", label: "Residence Permit" }
  ];

  const incomeRanges = [
    { value: "<10000", label: "Below $10,000 / €9,000 / £8,000" },
    { value: "10000-30000", label: "$10,000 - $30,000 / €9,000 - €27,000" },
    { value: "30000-50000", label: "$30,000 - $50,000 / €27,000 - €45,000" },
    { value: "50000-75000", label: "$50,000 - $75,000 / €45,000 - €68,000" },
    { value: "75000-100000", label: "$75,000 - $100,000 / €68,000 - €90,000" },
    { value: "100000-150000", label: "$100,000 - $150,000 / €90,000 - €135,000" },
    { value: "150000-200000", label: "$150,000 - $200,000 / €135,000 - €180,000" },
    { value: ">200000", label: "Above $200,000 / €180,000 / £160,000" }
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non_binary", label: "Non-binary" },
    { value: "transgender", label: "Transgender" },
    { value: "genderqueer", label: "Genderqueer" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" }
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading account settings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <AlertCircle className={styles.errorIcon} />
          <h3 className={styles.errorTitle}>Error Loading Settings</h3>
          <p className={styles.errorMessage}>{error}</p>
          <button
            onClick={fetchAccountData}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your account preferences and security settings</p>
        </div>

        {/* Profile & Security Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.profileCard}
          >
            <div className={styles.profileGlow} />
            <div className={styles.profileGlow2} />
            <div className={styles.profileContent}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {account.first_name?.[0] || account.email?.[0] || "U"}
                </div>
                <button className={styles.cameraButton}>
                  <Camera size={16} />
                </button>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>
                  {account.first_name} {account.last_name}
                </h2>
                <p className={styles.profileEmail}>{account.email}</p>
                <div className={styles.profileBadges}>
                  {account.account_number && (
                    <span className={styles.badge}>
                      <CreditCard size={12} /> 
                      {account.account_number}
                    </span>
                  )}
                  {account.country && (
                    <span className={styles.badge}>
                      <Globe2 size={12} /> 
                      {account.country}
                    </span>
                  )}
                  <span className={`${styles.badge} ${account.is_verified ? styles.badgeVerified : styles.badgeUnverified}`}>
                    {account.is_verified ? '✓ Verified' : '⚠ Needs Verification'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileModal(true)}
                className={styles.editButton}
              >
                <User size={16} />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Security Score Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.securityCard}
          >
            <div className={styles.securityHeader}>
              <h3 className={styles.securityTitle}>Security Health</h3>
              <Shield className={styles.securityIcon} size={20} />
            </div>
            <div className={styles.scoreContainer}>
              <SecurityScoreCircle score={securityStatus.security_score} />
              <div className={styles.scoreDetails}>
                <div className={styles.scoreDetail}>
                  <span className={styles.scoreDetailLabel}>2FA</span>
                  <span className={`${styles.scoreDetailValue} ${securityStatus.two_factor_enabled ? styles.scoreDetailSuccess : styles.scoreDetailError}`}>
                    {securityStatus.two_factor_enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className={styles.scoreDetail}>
                  <span className={styles.scoreDetailLabel}>Email Verified</span>
                  <span className={`${styles.scoreDetailValue} ${kycStatus.email_verified ? styles.scoreDetailSuccess : styles.scoreDetailWarning}`}>
                    {kycStatus.email_verified ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className={styles.scoreDetail}>
                  <span className={styles.scoreDetailLabel}>Last Password</span>
                  <span className={styles.scoreDetailValue}>
                    {securityStatus.last_password_change || 'Never'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {[
            { 
              label: "Account Status", 
              value: account.is_active ? "Active" : "Inactive", 
              icon: account.is_active ? CheckCircle : XCircle, 
              colorStart: account.is_active ? "#10B981" : "#EF4444",
              colorEnd: account.is_active ? "#059669" : "#DC2626",
              trend: null
            },
            { 
              label: "KYC Status", 
              value: account.kyc_status ? account.kyc_status.charAt(0).toUpperCase() + account.kyc_status.slice(1).replace('_', ' ') : 'Pending', 
              icon: account.kyc_status === 'verified' ? BadgeCheck : BadgeAlert, 
              colorStart: account.kyc_status === 'verified' ? "#10B981" : account.kyc_status === 'pending' ? "#F59E0B" : "#EF4444",
              colorEnd: account.kyc_status === 'verified' ? "#059669" : account.kyc_status === 'pending' ? "#D97706" : "#DC2626",
              trend: null
            },
            { 
              label: "Security Score", 
              value: `${securityStatus.security_score}/100`, 
              icon: ShieldCheck, 
              colorStart: "#3B82F6",
              colorEnd: "#2563EB",
              trend: null
            },
            { 
              label: "Verification", 
              value: `${Math.round((kycStatus.verification_score / 100) * 100)}%`, 
              icon: UserCheck, 
              colorStart: "#8B5CF6",
              colorEnd: "#7C3AED",
              trend: kycStatus.verification_score > 50 ? "up" : "down"
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={styles.statCard}
              style={{
                '--color-start': stat.colorStart,
                '--color-end': stat.colorEnd
              } as React.CSSProperties}
            >
              <div className={styles.statGlow} />
              <div className={styles.statContent}>
                <div className={styles.statHeader}>
                  <div className={styles.statIcon}>
                    <stat.icon size={20} />
                  </div>
                  {stat.trend && (
                    <div className={`${styles.statTrend} ${stat.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                      {stat.trend === 'up' ? '↑' : '↓'}
                    </div>
                  )}
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.section}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderLeft}>
                  <div className={styles.sectionIcon}>
                    <User size={20} />
                  </div>
                  <h3 className={styles.sectionTitle}>Personal Information</h3>
                </div>
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className={styles.sectionAction}
                >
                  Edit
                </button>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>First Name</p>
                    <p className={styles.infoValue}>{account.first_name || "Not set"}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Last Name</p>
                    <p className={styles.infoValue}>{account.last_name || "Not set"}</p>
                  </div>
                </div>
                
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Email</p>
                    <div className={styles.infoRow}>
                      <p className={styles.infoValue}>{account.email}</p>
                      {account.is_verified ? (
                        <span className={styles.verifiedBadge}>✓ Verified</span>
                      ) : (
                        <span className={styles.verifyButton}>Verify Email</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Phone</p>
                    <div className={styles.infoRow}>
                      <p className={styles.infoValue}>{account.phone || "Not set"}</p>
                    </div>
                  </div>
                </div>

                {account.date_of_birth && (
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Date of Birth</p>
                    <p className={styles.infoValue}>
                      {new Date(account.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {(account.street || account.address_line1) && (
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Address</p>
                    <p className={styles.infoValue}>
                      {account.street || account.address_line1}
                      {account.city && `, ${account.city}`}
                      {(account.state || account.state_province) && `, ${account.state || account.state_province}`}
                      {account.zip_code && ` ${account.zip_code}`}
                      {account.country && `, ${account.country}`}
                    </p>
                  </div>
                )}

                {account.occupation && (
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Occupation</p>
                      <p className={styles.infoValue}>{account.occupation}</p>
                    </div>
                    {account.employer && (
                      <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Employer</p>
                        <p className={styles.infoValue}>{account.employer}</p>
                      </div>
                    )}
                  </div>
                )}

                {account.doc_type && (
                  <div className={styles.docBadge}>
                    <p className={styles.infoLabel}>ID Document</p>
                    <p className={styles.infoValue}>
                      {documentTypes.find(doc => doc.value === account.doc_type)?.label || account.doc_type}: {account.doc_number}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Verification Progress */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.section}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderLeft}>
                  <div className={styles.sectionIcon}>
                    <BadgeCheck size={20} />
                  </div>
                  <h3 className={styles.sectionTitle}>Identity Verification</h3>
                </div>
                <button 
                  onClick={submitKYC}
                  className={styles.sectionAction}
                >
                  {kycStatus.kyc_docs_submitted ? 'Update KYC' : 'Submit KYC'}
                </button>
              </div>
              <div className={styles.sectionContent}>
                <VerificationProgress />
                <div className={styles.infoBox}>
                  <p className={styles.infoText}>
                    {kycStatus.kyc_docs_submitted 
                      ? `Your KYC documents have been ${account.kyc_status}.`
                      : "Complete KYC verification to access all features including higher transfer limits."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Security Settings */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.section}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderLeft}>
                  <div className={styles.sectionIcon}>
                    <ShieldIcon size={20} />
                  </div>
                  <h3 className={styles.sectionTitle}>Security Settings</h3>
                </div>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.settingsList}>
                  {/* 2FA - informational only since endpoint doesn't exist */}
                  <div className={styles.settingItem}>
                    <div className={styles.settingLeft}>
                      <Shield className={`${styles.settingIcon} ${styles.settingIconSuccess}`} size={20} />
                      <div className={styles.settingInfo}>
                        <p className={styles.settingTitle}>Two-Factor Auth</p>
                        <p className={styles.settingDesc}>Extra security layer</p>
                      </div>
                    </div>
                    <span className={`${styles.settingBadge} ${securityStatus.two_factor_enabled ? styles.badgeSuccess : styles.badgeDisabled}`}>
                      {securityStatus.two_factor_enabled ? 'Enabled' : 'Coming Soon'}
                    </span>
                  </div>

                  {/* Email Notifications */}
                  <div className={styles.settingItem}>
                    <div className={styles.settingLeft}>
                      <Bell className={`${styles.settingIcon} ${styles.settingIconPurple}`} size={20} />
                      <div className={styles.settingInfo}>
                        <p className={styles.settingTitle}>Email Notifications</p>
                        <p className={styles.settingDesc}>Receive important updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSettings({ email_notifications: !userSettings.email_notifications })}
                      className={`${styles.toggle} ${userSettings.email_notifications ? styles.toggleActive : ''}`}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>

                  {/* SMS Notifications */}
                  <div className={styles.settingItem}>
                    <div className={styles.settingLeft}>
                      <PhoneIcon className={`${styles.settingIcon} ${styles.settingIconBlue}`} size={20} />
                      <div className={styles.settingInfo}>
                        <p className={styles.settingTitle}>SMS Alerts</p>
                        <p className={styles.settingDesc}>Get SMS for transactions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSettings({ sms_notifications: !userSettings.sms_notifications })}
                      className={`${styles.toggle} ${userSettings.sms_notifications ? styles.toggleActive : ''}`}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.section}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderLeft}>
                  <div className={styles.sectionIcon}>
                    <Zap size={20} />
                  </div>
                  <h3 className={styles.sectionTitle}>Quick Actions</h3>
                </div>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.actionsGrid}>
                  {[
                    { icon: Lock, label: "Change Password", colorStart: "#3B82F6", colorEnd: "#2563EB", action: () => setShowPasswordModal(true) },
                    { icon: FileText, label: "Complete KYC", colorStart: "#8B5CF6", colorEnd: "#7C3AED", action: () => submitKYC() },
                    { icon: LogOut, label: "Logout", colorStart: "#EF4444", colorEnd: "#DC2626", action: () => logout() },
                    { icon: HelpCircle, label: "Support", colorStart: "#F59E0B", colorEnd: "#D97706", action: () => toast.info("Support center coming soon") }
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      onClick={action.action}
                      className={styles.actionButton}
                      style={{
                        '--color-start': action.colorStart,
                        '--color-end': action.colorEnd
                      } as React.CSSProperties}
                    >
                      <div className={styles.actionIcon}>
                        <action.icon size={20} />
                      </div>
                      <p className={styles.actionLabel}>{action.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Account Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.section}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLeft}>
              <div className={styles.sectionIcon}>
                <CreditCard size={20} />
              </div>
              <h3 className={styles.sectionTitle}>Account Details</h3>
            </div>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.detailsGrid}>
              {account.account_number && (
                <div className={styles.detailCard}>
                  <p className={styles.detailLabel}>Account Number</p>
                  <p className={`${styles.detailValue} ${styles.detailMono}`}>
                    {account.account_number}
                  </p>
                </div>
              )}
              <div className={styles.detailCard}>
                <p className={styles.detailLabel}>Member Since</p>
                <p className={styles.detailValue}>
                  {account.date_joined ? new Date(account.date_joined).toLocaleDateString() : "Recently"}
                </p>
              </div>
              <div className={styles.detailCard}>
                <p className={styles.detailLabel}>Account Status</p>
                <p className={`${styles.detailValue} ${account.is_active ? styles.textSuccess : styles.textError}`}>
                  {account.is_active ? "Active" : "Inactive"}
                </p>
              </div>
              {account.kyc_status && (
                <div className={styles.detailCard}>
                  <p className={styles.detailLabel}>KYC Status</p>
                  <p className={`${styles.detailValue} ${
                    account.kyc_status === 'verified' 
                      ? styles.textSuccess 
                      : account.kyc_status === 'pending' || account.kyc_status === 'submitted'
                      ? styles.textWarning
                      : styles.textError
                  }`}>
                    {account.kyc_status.charAt(0).toUpperCase() + account.kyc_status.slice(1).replace('_', ' ')}
                  </p>
                </div>
              )}
              {account.risk_level && (
                <div className={styles.detailCard}>
                  <p className={styles.detailLabel}>Risk Level</p>
                  <p className={`${styles.detailValue} ${
                    account.risk_level === 'low' 
                      ? styles.textSuccess 
                      : account.risk_level === 'medium'
                      ? styles.textWarning
                      : styles.textError
                  }`}>
                    {account.risk_level.charAt(0).toUpperCase() + account.risk_level.slice(1)}
                  </p>
                </div>
              )}
              {account.nationality && (
                <div className={styles.detailCard}>
                  <p className={styles.detailLabel}>Nationality</p>
                  <p className={styles.detailValue}>{account.nationality}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Profile Modal */}
        {showProfileModal && (
          <div className={styles.modalOverlay}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={styles.modal}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Edit Profile</h3>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className={styles.modalClose}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>First Name *</label>
                  <input
                    type="text"
                    value={profileForm.first_name}
                    onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name *</label>
                  <input
                    type="text"
                    value={profileForm.last_name}
                    onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number *</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  placeholder="+254 XXX XXX XXX"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date of Birth</label>
                  <input
                    type="date"
                    value={profileForm.date_of_birth}
                    onChange={(e) => setProfileForm({...profileForm, date_of_birth: e.target.value})}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Gender</label>
                  <select
                    value={profileForm.gender}
                    onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})}
                    className={styles.formSelect}
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Address</label>
                <input
                  type="text"
                  value={profileForm.street}
                  onChange={(e) => setProfileForm({...profileForm, street: e.target.value})}
                  placeholder="Street address"
                  className={`${styles.formInput} mb-3`}
                />
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                    placeholder="City"
                    className={styles.formInput}
                  />
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={(e) => setProfileForm({...profileForm, state: e.target.value})}
                    placeholder="State/Region"
                    className={styles.formInput}
                  />
                  <input
                    type="text"
                    value={profileForm.zip_code}
                    onChange={(e) => setProfileForm({...profileForm, zip_code: e.target.value})}
                    placeholder="Postal Code"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Occupation</label>
                  <input
                    type="text"
                    value={profileForm.occupation}
                    onChange={(e) => setProfileForm({...profileForm, occupation: e.target.value})}
                    placeholder="e.g., Software Engineer"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Employer</label>
                  <input
                    type="text"
                    value={profileForm.employer}
                    onChange={(e) => setProfileForm({...profileForm, employer: e.target.value})}
                    placeholder="e.g., Claverica Ltd"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Income Range</label>
                <select
                  value={profileForm.income_range}
                  onChange={(e) => setProfileForm({...profileForm, income_range: e.target.value})}
                  className={styles.formSelect}
                >
                  <option value="">Select Income Range</option>
                  {incomeRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className={`${styles.button} ${styles.buttonCancel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className={styles.modalOverlay}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={styles.modal}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Change Password</h3>
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className={styles.modalClose}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                    className={styles.formInput}
                  />
                  <p className={styles.formHint}>
                    Minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm({...passwordForm, confirm_password: e.target.value})}
                    className={styles.formInput}
                  />
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className={`${styles.button} ${styles.buttonCancel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={changePassword}
                  disabled={saving}
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Key size={20} />}
                  {saving ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}