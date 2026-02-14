// src/pages/Dashboard/AccountSettings.tsx
import { useState, useEffect } from "react"; 
import { 
  User, Mail, Phone, Lock, Shield, Bell, Eye, EyeOff, 
  Smartphone, Globe, Download, Trash2, ChevronRight,
  Check, X, MapPin, Monitor, AlertCircle, Key, Camera,
  Save, Loader2, QrCode, Upload, Globe as Earth,
  Database, CreditCard, Building, ShieldCheck,
  Smartphone as Mobile, Laptop, Tablet, Calendar,
  LogOut, HelpCircle, Users, FileText, Percent,
  Wifi, WifiOff, CheckCircle, XCircle, Wallet,
  BarChart3, Shield as ShieldIcon, Clock, Zap,
  Target, Thermometer, AlertTriangle, Fingerprint,
  Globe2, Smartphone as PhoneIcon, Cpu, Battery,
  Network, HardDrive, Cpu as CpuIcon, HardDrive as StorageIcon,
  BatteryCharging, Wifi as WifiIcon, Radio, Satellite,
  ShieldOff, Shield as ShieldOn, LockKeyhole,
  UserCheck, UserX, UserPlus, UserMinus,
  TrendingUp, TrendingDown, PieChart, LineChart,
  DollarSign, Bitcoin, Coins, WalletCards,
  Banknote, Receipt, BadgeCheck, BadgeAlert,
  FileKey, FileLock, FileQuestion, FileWarning,
  KeyRound, KeySquare, ScanFace, ScanQrCode,
  QrCode as QrCodeIcon, ScanText, ScanLine,
  ReceiptText, ReceiptEuro, ReceiptPound,
  Landmark, Building2, Factory, Home,
  Store, ShoppingCart, ShoppingBag, BaggageClaim,
  Briefcase, Suitcase, Luggage, Package,
  Truck, Ship, Plane, Train,
  Car, Bike, Bus, Tram,
  Navigation, Compass, Map, MapPinned,
  Navigation2, NavigationOff, Compass as CompassIcon,
  HardHat, Briefcase as BriefcaseIcon, GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../lib/store/auth";
import toast, { Toaster } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";

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
  street?: string; // Changed from address_line1
  city?: string;
  state?: string; // Added
  zip_code?: string; // Added
  occupation?: string;
  employer?: string;
  income_range?: string;
  date_joined?: string;
  activation_code?: string;
  activation_code_sent_at?: string;
  activation_code_expires_at?: string;
  address_line1?: string;
  state_province?: string;
  country?: string;
  nationality?: string;
  kyc_status?: string;
  risk_level?: string;
  account_status?: string;
  last_login?: string;
}

interface UserProfile {
  account: string; // account_number as foreign key
  bio?: string;
  profile_image?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  date_of_birth?: string;
}

interface UserSettings {
  theme: string;
  language: string;
  timezone: string;
  profile_visibility: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  email_frequency: string;
  two_factor_enabled?: boolean;
  last_password_change?: string;
  push_notifications?: boolean;
  activity_logs_enabled?: boolean;
  security_pin_enabled?: boolean;
  biometric_enabled?: boolean;
}

interface ConnectedDevice {
  id: number;
  device_id: string;
  device_name: string;
  device_type: string;
  last_active: string;
  location?: string;
  ip_address?: string;
  is_current: boolean;
  country?: string;
  browser?: string;
  created_at?: string;
}

interface ActivityLog {
  id: number;
  action: string;
  description?: string;
  timestamp: string;
  device: string;
  browser?: string;
  location?: string;
  ip_address?: string;
  country?: string;
  status: 'success' | 'failed';
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
  
  // UI States
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [showSecurityDetails, setShowSecurityDetails] = useState(false);
  
  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState<ConnectedDevice | null>(null);

  // Form states
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  // Match your Django Account model fields exactly
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
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    profile_visibility: 'public',
    email_notifications: true,
    sms_notifications: false,
    email_frequency: 'realtime'
  });

  // Data states - ALL EMPTY INITIALLY (NO MOCK DATA)
  const [account, setAccount] = useState<Account>({
    email: "",
    first_name: "",
    last_name: "",
    account_number: "", // EMPTY - will be filled by API
    phone: "",
    is_verified: false,
    is_active: false
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    account: ""
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    profile_visibility: 'public',
    email_notifications: true,
    sms_notifications: false,
    email_frequency: 'realtime'
  });

  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([]); // EMPTY
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]); // EMPTY

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

  // Fetch account data from REAL APIs
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
      // 1. Get user data from /api/users/profile/ (updated endpoint)
      const userRes = await fetch(`${API_URL}/users/profile/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!userRes.ok) {
        throw new Error(`Failed to load user: ${userRes.statusText}`);
      }

      const userData = await userRes.json();
      
      // 2. Fetch user settings from /api/users/settings/
      const settingsRes = await fetch(`${API_URL}/users/settings/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      let settingsData: UserSettings = {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        profile_visibility: 'public',
        email_notifications: true,
        sms_notifications: false,
        email_frequency: 'realtime'
      };
      
      if (settingsRes.ok) {
        settingsData = await settingsRes.json();
      }

      // 3. Fetch connected devices from /api/users/devices/
      let devicesData: ConnectedDevice[] = [];
      try {
        const devicesRes = await fetch(`${API_URL}/users/devices/`, {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        if (devicesRes.ok) {
          const devicesResponse = await devicesRes.json();
          devicesData = devicesResponse.devices || [];
        }
      } catch (err) {
        console.log("Devices endpoint error:", err);
      }

      // 4. Fetch activity logs from /api/users/activity-logs/
      let logsData: any[] = [];
      try {
        const logsRes = await fetch(`${API_URL}/users/activity-logs/`, {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        if (logsRes.ok) {
          const logsResponse = await logsRes.json();
          logsData = logsResponse.logs || [];
        }
      } catch (err) {
        console.log("Activity logs endpoint error:", err);
      }

      // Update account state with REAL data
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

      // Update user settings state
      setUserSettings(settingsData);
      setSettingsForm(settingsData);

      // Update connected devices
      setConnectedDevices(devicesData);

      // Update activity logs with proper status detection
      setActivityLogs(logsData.map((log: any) => ({
        ...log,
        status: log.action?.toLowerCase().includes('failed') ? 'failed' : 'success'
      })));

      // Calculate KYC status based on REAL account data
      const kycDocsSubmitted = !!(userData.doc_type && userData.doc_number);
      const kycStatusValue = userData.kyc_status || (kycDocsSubmitted ? 'submitted' : 'pending');
      
      setKycStatus({
        email_verified: userData.is_verified || false,
        phone_verified: false, // Would need separate verification endpoint
        kyc_status: kycStatusValue,
        kyc_docs_submitted: kycDocsSubmitted,
        verification_score: calculateVerificationScore(userData)
      });

      // Update security status
      setSecurityStatus({
        two_factor_enabled: settingsData.two_factor_enabled || false,
        last_password_change: 'Recently', // Would need backend to provide this
        failed_login_attempts: 0, // Would need backend data
        suspicious_activity: false,
        security_score: calculateSecurityScore(settingsData, userData)
      });

      // Set profile form with REAL initial data
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
    let score = 50; // Base score
    if (settings.two_factor_enabled) score += 30;
    if (accountData.is_verified) score += 10;
    if (accountData.phone) score += 10;
    return Math.min(score, 100);
  };

  // Update settings using PATCH method
  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!tokens?.access) {
      toast.error("Please login to update settings");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/settings/update/`, {
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
      
      // Update local state
      setUserSettings(prev => ({ ...prev, ...updates }));
      setSettingsForm(prev => ({ ...prev, ...updates }));
      
      // Recalculate security score
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

  // Update profile using POST method
  const updateProfile = async () => {
    if (!tokens?.access) {
      toast.error("Please login to update profile");
      return;
    }

    setSaving(true);
    try {
      // Convert empty strings to null for optional fields
      const cleanedData = Object.fromEntries(
        Object.entries(profileForm).map(([key, value]) => [
          key, 
          value === '' ? null : value
        ])
      );

      const response = await fetch(`${API_URL}/users/profile/update/`, {
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

      const data = await response.json();
      toast.success("Profile updated successfully");
      setShowProfileModal(false);
      fetchAccountData(); // Refresh data
    } catch (err: any) {
      console.error("Profile update failed:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Change password using your endpoint
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
      const response = await fetch(`${API_URL}/users/password/change/`, {
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
      
      // Update security status
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

  // Verify email using your endpoint
  const verifyEmail = async () => {
    if (!tokens?.access) {
      toast.error("Please login to verify email");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/email/verify/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to send verification email: ${response.statusText}`);
      }

      toast.success("Verification email sent. Please check your inbox.");
    } catch (err: any) {
      console.error("Email verification failed:", err);
      toast.error(err.message || "Failed to send verification email");
    }
  };

  // Verify phone using your endpoint
  const verifyPhone = async () => {
    if (!tokens?.access) {
      toast.error("Please login to verify phone");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/phone/verify/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to send verification SMS: ${response.statusText}`);
      }

      toast.success("Verification SMS sent. Please check your phone.");
    } catch (err: any) {
      console.error("Phone verification failed:", err);
      toast.error(err.message || "Failed to send verification SMS");
    }
  };

  // Setup 2FA using your endpoint
  const setupTwoFactor = async () => {
    if (!tokens?.access) {
      toast.error("Please login to setup 2FA");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/2fa/setup/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to setup 2FA: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.qr_code_url) {
        setShow2FAModal(true);
        // You can display QR code from data.qr_code_url if backend provides it
      } else {
        toast.success("2FA setup initiated - Check your email for next steps");
      }
      
      setSecurityStatus(prev => ({ ...prev, two_factor_enabled: true }));
    } catch (err: any) {
      console.error("2FA setup failed:", err);
      toast.error(err.message || "Failed to setup 2FA");
    }
  };

  // Remove device using your endpoint
  const removeDevice = async (deviceId: string) => {
    if (!tokens?.access) {
      toast.error("Please login to remove device");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/devices/${deviceId}/remove/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to remove device: ${response.statusText}`);
      }

      // Remove from local state
      setConnectedDevices(prev => prev.filter(device => device.device_id !== deviceId));
      setShowDeviceModal(null);
      toast.success("Device removed successfully");
      
      // Refresh devices
      fetchAccountData();
    } catch (err: any) {
      console.error("Device removal failed:", err);
      toast.error(err.message || "Failed to remove device");
    }
  };

  // Export data using your endpoint
  const exportData = async () => {
    if (!tokens?.access) {
      toast.error("Please login to export data");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/data/export/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to export data: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Create and download CSV file
      const blob = new Blob([data.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data.filename || `claverica-account-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Data exported successfully");
      setShowExportModal(false);
    } catch (err: any) {
      console.error("Data export failed:", err);
      toast.error(err.message || "Failed to export data");
    }
  };

  // Delete account using your endpoint
  const deleteAccount = async () => {
    if (!tokens?.access) {
      toast.error("Please login to delete account");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/delete/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmation: 'DELETE MY ACCOUNT' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to delete account: ${response.statusText}`);
      }

      toast.success("Account deactivation requested.");
      setTimeout(() => logout(), 2000);
    } catch (err: any) {
      console.error("Account deletion failed:", err);
      toast.error(err.message || "Failed to delete account");
    }
  };

  const submitKYC = async () => {
    // For now, redirect to KYC page
    window.location.href = '/kyc/submit/';
  };

  const SecurityScoreCircle = ({ score }: { score: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    const getColor = (score: number) => {
      if (score >= 80) return "text-green-500";
      if (score >= 60) return "text-yellow-500";
      return "text-red-500";
    };

    const getBgColor = (score: number) => {
      if (score >= 80) return "stroke-green-500/20";
      if (score >= 60) return "stroke-yellow-500/20";
      return "stroke-red-500/20";
    };

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            strokeWidth="8"
            fill="none"
            className={getBgColor(score)}
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
            className={`${getColor(score)} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getColor(score)}`}>{score}</span>
          <span className="text-xs text-gray-500">Security Score</span>
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
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Verification Progress
          </span>
          <span className="text-sm font-bold text-blue-600">{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                step.completed 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {step.completed ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Document type options matching your backend
  const documentTypes = [
    { value: "passport", label: "Passport" },
    { value: "national_id", label: "National ID Card" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "residence_permit", label: "Residence Permit" }
  ];

  // Income range options matching your backend
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

  // Gender options matching your backend
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
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading account settings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-2">Error Loading Settings</h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{error}</p>
          <button
            onClick={fetchAccountData}
            className="w-full bg-slate-900 dark:bg-slate-700 text-white rounded-xl py-3 font-semibold hover:bg-slate-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <Toaster position="top-right" />
      
      <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account preferences, security, and privacy settings
            </p>
          </div>

          {/* Profile & Security Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden lg:col-span-2"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border-4 border-white/30 shadow-lg">
                    {account.first_name?.[0] || account.email?.[0] || "U"}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-blue-600 rounded-lg shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold mb-1">
                    {account.first_name} {account.last_name}
                  </h2>
                  <p className="text-white/80 mb-2">{account.email}</p>
                  <div className="flex flex-wrap gap-2">
                    {account.account_number && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        <CreditCard className="w-3 h-3 inline mr-1" /> 
                        {account.account_number}
                      </span>
                    )}
                    {account.country && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        <Earth className="w-3 h-3 inline mr-1" /> 
                        {account.country}
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      account.is_verified 
                        ? 'bg-green-500/30 backdrop-blur-sm' 
                        : 'bg-yellow-500/30 backdrop-blur-sm'
                    }`}>
                      {account.is_verified ? '✓ Verified' : '⚠ Needs Verification'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className="px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </button>
              </div>
            </motion.div>

            {/* Security Score Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Security Health
                </h3>
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-col items-center">
                <SecurityScoreCircle score={securityStatus.security_score} />
                <div className="mt-4 w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">2FA</span>
                    <span className={`font-medium ${securityStatus.two_factor_enabled ? 'text-green-600' : 'text-red-600'}`}>
                      {securityStatus.two_factor_enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Email Verified</span>
                    <span className={`font-medium ${kycStatus.email_verified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {kycStatus.email_verified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last Password</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {securityStatus.last_password_change || 'Never'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                label: "Account Status", 
                value: account.is_active ? "Active" : "Inactive", 
                icon: account.is_active ? CheckCircle : XCircle, 
                color: account.is_active ? "from-green-500 to-emerald-500" : "from-red-500 to-orange-500",
                trend: null
              },
              { 
                label: "KYC Status", 
                value: account.kyc_status ? account.kyc_status.charAt(0).toUpperCase() + account.kyc_status.slice(1).replace('_', ' ') : 'Pending', 
                icon: account.kyc_status === 'verified' ? BadgeCheck : BadgeAlert, 
                color: account.kyc_status === 'verified' ? "from-green-500 to-emerald-500" : 
                       account.kyc_status === 'pending' ? "from-yellow-500 to-amber-500" : "from-red-500 to-orange-500",
                trend: null
              },
              { 
                label: "Security Score", 
                value: `${securityStatus.security_score}/100`, 
                icon: ShieldCheck, 
                color: "from-blue-500 to-cyan-500",
                trend: null
              },
              { 
                label: "Verification", 
                value: `${Math.round((kycStatus.verification_score / 100) * 100)}%`, 
                icon: UserCheck, 
                color: "from-purple-500 to-pink-500",
                trend: kycStatus.verification_score > 50 ? "up" : "down"
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    {stat.trend && (
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        stat.trend === 'up' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {stat.trend === 'up' ? '↑' : '↓'}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
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
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Personal Information
                      </h3>
                    </div>
                    <button 
                      onClick={() => setShowProfileModal(true)}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">First Name</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.first_name || "Not set"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Name</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.last_name || "Not set"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.email}
                        </p>
                        {account.is_verified ? (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-semibold">
                            ✓ Verified
                          </span>
                        ) : (
                          <button 
                            onClick={verifyEmail}
                            className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors"
                          >
                            Verify Email
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.phone || "Not set"}
                        </p>
                        {account.phone && !kycStatus.phone_verified && (
                          <button 
                            onClick={verifyPhone}
                            className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors"
                          >
                            Verify Phone
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {account.date_of_birth && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {new Date(account.date_of_birth).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {(account.street || account.address_line1) && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.street || account.address_line1}
                        {account.city && `, ${account.city}`}
                        {(account.state || account.state_province) && `, ${account.state || account.state_province}`}
                        {account.zip_code && ` ${account.zip_code}`}
                        {account.country && `, ${account.country}`}
                      </p>
                    </div>
                  )}

                  {account.occupation && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Occupation</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.occupation}
                        </p>
                      </div>
                      {account.employer && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Employer</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {account.employer}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {account.doc_type && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <p className="text-xs text-gray-500 dark:text-gray-400">ID Document</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
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
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                        <BadgeCheck className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Identity Verification
                      </h3>
                    </div>
                    <button 
                      onClick={submitKYC}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {kycStatus.kyc_docs_submitted ? 'Update KYC' : 'Submit KYC'}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <VerificationProgress />
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {kycStatus.kyc_docs_submitted 
                        ? `Your KYC documents have been ${account.kyc_status}.`
                        : "Complete KYC verification to access all features including higher transfer limits."}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Connected Devices */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Connected Devices ({connectedDevices.length})
                      </h3>
                    </div>
                    <button 
                      onClick={() => setShowDevices(!showDevices)}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showDevices ? 'Hide' : 'Show All'}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  {connectedDevices.length > 0 ? (
                    connectedDevices.slice(0, showDevices ? undefined : 2).map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-3 mb-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            device.device_type === 'mobile' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' 
                              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                          }`}>
                            {device.device_type === 'mobile' ? (
                              <Smartphone className="w-5 h-5" />
                            ) : (
                              <Laptop className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{device.device_name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Last active: {new Date(device.last_active).toLocaleDateString()}
                              {device.is_current && " • Current session"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowDeviceModal(device)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No connected devices found.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Security Settings */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                        <ShieldIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Security Settings
                      </h3>
                    </div>
                    <button 
                      onClick={() => setShowSecurityDetails(!showSecurityDetails)}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showSecurityDetails ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {/* 2FA */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Two-Factor Auth</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Extra security layer</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!securityStatus.two_factor_enabled) {
                          setupTwoFactor();
                        } else {
                          updateSettings({ two_factor_enabled: !securityStatus.two_factor_enabled });
                        }
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        securityStatus.two_factor_enabled 
                          ? 'bg-gradient-to-r from-green-500 to-green-600' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          securityStatus.two_factor_enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive important updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSettings({ email_notifications: !userSettings.email_notifications })}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        userSettings.email_notifications 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          userSettings.email_notifications ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">SMS Alerts</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get SMS for transactions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSettings({ sms_notifications: !userSettings.sms_notifications })}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        userSettings.sms_notifications 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          userSettings.sms_notifications ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Theme */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Theme</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Appearance</p>
                      </div>
                    </div>
                    <select
                      value={settingsForm.theme}
                      onChange={(e) => updateSettings({ theme: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-cyan-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Language</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Display language</p>
                      </div>
                    </div>
                    <select
                      value={settingsForm.language}
                      onChange={(e) => updateSettings({ language: e.target.value })}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Quick Actions
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Lock, label: "Change Password", color: "from-blue-500 to-blue-600", action: () => setShowPasswordModal(true) },
                      { icon: Download, label: "Export Data", color: "from-green-500 to-green-600", action: () => setShowExportModal(true) },
                      { icon: FileText, label: "Activity Log", color: "from-purple-500 to-purple-600", action: () => setShowActivityLogs(true) },
                      { icon: LogOut, label: "Logout All", color: "from-red-500 to-red-600", action: () => logout() },
                      { icon: HelpCircle, label: "Support", color: "from-yellow-500 to-yellow-600", action: () => toast.info("Support center coming soon") },
                      { icon: Trash2, label: "Delete Account", color: "from-gray-500 to-gray-600", action: () => setShowDeleteModal(true) }
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        onClick={action.action}
                        className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 hover:shadow-md transition-all hover:scale-105"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white text-left">{action.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Activity Log */}
              {showActivityLogs && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
                >
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Recent Activity
                        </h3>
                      </div>
                      <button 
                        onClick={() => setShowActivityLogs(false)}
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      {activityLogs.length > 0 ? (
                        activityLogs.slice(0, 10).map((log) => (
                          <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{log.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(log.timestamp).toLocaleString()} • {log.device || 'Unknown device'}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              log.status === 'success' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            }`}>
                              {log.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                          No activity logs found.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Account Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-md">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Account Details
                </h3>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {account.account_number && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Account Number</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                      {account.account_number}
                    </p>
                  </div>
                )}
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {account.date_joined ? new Date(account.date_joined).toLocaleDateString() : "Recently"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Account Status</p>
                  <p className={`text-sm font-bold ${
                    account.is_active 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {account.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
                {account.kyc_status && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">KYC Status</p>
                    <p className={`text-sm font-bold ${
                      account.kyc_status === 'verified' 
                        ? 'text-green-600 dark:text-green-400' 
                        : account.kyc_status === 'pending' || account.kyc_status === 'submitted'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {account.kyc_status.charAt(0).toUpperCase() + account.kyc_status.slice(1).replace('_', ' ')}
                    </p>
                  </div>
                )}
                {account.risk_level && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Risk Level</p>
                    <p className={`text-sm font-bold ${
                      account.risk_level === 'low' 
                        ? 'text-green-600 dark:text-green-400' 
                        : account.risk_level === 'medium'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {account.risk_level.charAt(0).toUpperCase() + account.risk_level.slice(1)}
                    </p>
                  </div>
                )}
                {account.nationality && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nationality</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {account.nationality}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h3>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    placeholder="+254 XXX XXX XXX"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profileForm.date_of_birth}
                      onChange={(e) => setProfileForm({...profileForm, date_of_birth: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profileForm.street}
                    onChange={(e) => setProfileForm({...profileForm, street: e.target.value})}
                    placeholder="Street address"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                      placeholder="City"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      value={profileForm.state}
                      onChange={(e) => setProfileForm({...profileForm, state: e.target.value})}
                      placeholder="State/Region"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      value={profileForm.zip_code}
                      onChange={(e) => setProfileForm({...profileForm, zip_code: e.target.value})}
                      placeholder="Postal Code"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={profileForm.occupation}
                      onChange={(e) => setProfileForm({...profileForm, occupation: e.target.value})}
                      placeholder="e.g., Software Engineer"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Employer
                    </label>
                    <input
                      type="text"
                      value={profileForm.employer}
                      onChange={(e) => setProfileForm({...profileForm, employer: e.target.value})}
                      placeholder="e.g., Claverica Ltd"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Income Range
                  </label>
                  <select
                    value={profileForm.income_range}
                    onChange={(e) => setProfileForm({...profileForm, income_range: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Income Range</option>
                    {incomeRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h3>
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm({...passwordForm, confirm_password: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={changePassword}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Key className="w-5 h-5" />}
                  {saving ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2FA Modal */}
        {show2FAModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Two-Factor Auth</h3>
                <button 
                  onClick={() => setShow2FAModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter 6-digit code from authenticator
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-2xl tracking-widest font-mono"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShow2FAModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success("2FA enabled successfully");
                    setShow2FAModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all"
                >
                  Verify & Enable
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Device Removal Modal */}
        {showDeviceModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Remove Device</h3>
                <button 
                  onClick={() => setShowDeviceModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Are you sure you want to remove this device? You'll be logged out from this device.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    showDeviceModal.device_type === 'mobile' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' 
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                  }`}>
                    {showDeviceModal.device_type === 'mobile' ? (
                      <Smartphone className="w-5 h-5" />
                    ) : (
                      <Laptop className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{showDeviceModal.device_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last active: {new Date(showDeviceModal.last_active).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowDeviceModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => removeDevice(showDeviceModal.device_id)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all"
                >
                  Remove Device
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Export Your Data</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    ⚠️ This file contains sensitive information. Keep it secure and don't share it.
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Your data will be exported in CSV format and include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Personal information</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Account settings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Transaction history (last 2 years)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Connected devices</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={exportData}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export Data
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Delete Account</h3>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    ⚠️ This action is irreversible. All your data will be permanently deleted.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    When you delete your account:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">All personal data will be permanently deleted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Your transaction history will be removed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">You will lose access to all features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="text-sm">Your account number will be deactivated</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteAccount}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
