import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import api from "../../api";
import toast from "react-hot-toast";
import styles from "./Settings.module.css";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  Moon,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  Smartphone,
  Mail,
  Key,
  Eye,
  EyeOff,
  CreditCard,
  ArrowUpRight,
  AlertCircle,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Zap,
  BarChart3,
  Award,
  Clock,
  Phone,
  Mail as MailIcon,
  FileText,
  Home,
  PieChart,
  TrendingUp,
  Users,
  MapPin,
  Briefcase,
  Calendar,
  Copy,
  Edit,
  ExternalLink,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    timezone: "Africa/Nairobi",
    email_notifications: true,
    two_factor_auth: false,
    marketing_emails: false,
    login_alerts: true,
  });

  // Fetch KYC status from backend
  useEffect(() => {
    const fetchKYCStatus = async () => {
      try {
        const data = await api.fetch("/api/kyc/simple-status/");
        setKycStatus(data);
      } catch (error) {
        console.error("Failed to fetch KYC status:", error);
        setKycStatus({ status: "no_kyc" });
      } finally {
        setLoading(false);
      }
    };

    fetchKYCStatus();
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveSettings = async () => {
    try {
      await api.post("/api/users/settings/update/", settings);
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords don't match");
      return;
    }
    try {
      await api.post("/api/users/password/change/", passwordData);
      toast.success("Password changed successfully!");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const getKycBadge = () => {
    if (!kycStatus) return { label: "Pending", color: "warning" };
    
    switch (kycStatus.status) {
      case "approved":
        return { label: "Verified", color: "success" };
      case "pending":
      case "under_review":
        return { label: "Under Review", color: "warning" };
      case "rejected":
        return { label: "Rejected", color: "danger" };
      case "needs_correction":
        return { label: "Action Needed", color: "warning" };
      default:
        return { label: "Not Started", color: "info" };
    }
  };

  const kycBadge = getKycBadge();

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "account", label: "Account", icon: SettingsIcon },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your settings...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>
            Manage your preferences, security, and privacy settings
          </p>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Profile Summary Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            {user?.first_name?.charAt(0) || "U"}
            {user?.last_name?.charAt(0) || ""}
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>
              {user?.first_name} {user?.last_name}
            </h2>
            <div className={styles.profileMeta}>
              <span className={styles.accountNumber}>
                {user?.account_number || "CLV-***"}
                <button
                  onClick={() => handleCopy(user?.account_number || "", "account")}
                  className={styles.copyBtn}
                >
                  {copiedField === "account" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </span>
              <span className={styles.profileEmail}>{user?.email}</span>
            </div>
          </div>
        </div>

        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <Shield className={styles.statIconSvg} />
            </div>
            <div>
              <div className={styles.statLabel}>Account Status</div>
              <div className={styles.statValue}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Active</span>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <Award className={styles.statIconSvg} />
            </div>
            <div>
              <div className={styles.statLabel}>KYC Status</div>
              <div className={styles.statValue}>
                <span className={`${styles.statusBadge} ${styles[kycBadge.color]}`}>
                  {kycBadge.label}
                </span>
                <button
                  onClick={() => navigate("/dashboard/kyc")}
                  className={styles.viewLink}
                >
                  View
                </button>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <BarChart3 className={styles.statIconSvg} />
            </div>
            <div>
              <div className={styles.statLabel}>Security Score</div>
              <div className={styles.statValue}>
                <span className={styles.scoreValue}>85</span>
                <span className={styles.scoreMax}>/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ""}`}
              >
                <Icon className={styles.tabIcon} />
                <span>{tab.label}</span>
                {tab.id === "security" && settings.two_factor_auth && (
                  <span className={styles.tabBadge}>2FA</span>
                )}
              </button>
            );
          })}

          {/* Security Health */}
          <div className={styles.securityHealth}>
            <div className={styles.securityHeader}>
              <ShieldCheck className={styles.securityIcon} />
              <h3>Security Health</h3>
            </div>
            <div className={styles.securityScore}>
              <div className={styles.scoreCircle}>
                <svg viewBox="0 0 36 36" className={styles.scoreSvg}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <span className={styles.scoreNumber}>85</span>
              </div>
              <div className={styles.scoreDetails}>
                <div className={styles.scoreItem}>
                  <Zap className={styles.scoreItemIcon} />
                  <span>2FA Enabled</span>
                </div>
                <div className={styles.scoreItem}>
                  <Clock className={styles.scoreItemIcon} />
                  <span>Last login: 2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
            <button
              onClick={() => navigate("/dashboard/transfer")}
              className={styles.quickActionBtn}
            >
              <CreditCard className={styles.quickActionIcon} />
              <span>Send Money</span>
              <ChevronRight className={styles.quickActionArrow} />
            </button>
            <button
              onClick={() => navigate("/dashboard/kyc")}
              className={styles.quickActionBtn}
            >
              <FileText className={styles.quickActionIcon} />
              <span>Complete KYC</span>
              <ChevronRight className={styles.quickActionArrow} />
            </button>
            <button
              onClick={() => navigate("/dashboard/cards")}
              className={styles.quickActionBtn}
            >
              <CreditCard className={styles.quickActionIcon} />
              <span>Manage Cards</span>
              <ChevronRight className={styles.quickActionArrow} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          {activeTab === "profile" && (
            <div className={styles.contentCard}>
              <h2 className={styles.contentTitle}>
                <User className={styles.contentIcon} />
                Personal Information
              </h2>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Full Name</label>
                  <div className={styles.infoValue}>
                    {user?.first_name} {user?.last_name}
                    <button className={styles.editBtn}>
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <label>Email Address</label>
                  <div className={styles.infoValue}>
                    {user?.email}
                    <span className={styles.verifiedBadge}>
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
                    </span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <label>Phone Number</label>
                  <div className={styles.infoValue}>
                    {user?.phone || "+254712345678"}
                    <button className={styles.addBtn}>Add</button>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <label>Date of Birth</label>
                  <div className={styles.infoValue}>
                    {user?.date_of_birth || "Not provided"}
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <label>Nationality</label>
                  <div className={styles.infoValue}>
                    {user?.nationality || "Kenya"}
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <label>Residence</label>
                  <div className={styles.infoValue}>
                    {user?.country_of_residence || "Kenya"}
                  </div>
                </div>
              </div>

              <div className={styles.addressSection}>
                <h3>Address</h3>
                <div className={styles.addressGrid}>
                  <div className={styles.addressItem}>
                    <MapPin className={styles.addressIcon} />
                    <div>
                      <div>{user?.address_line1 || "123 Main Street"}</div>
                      <div>
                        {user?.city || "Nairobi"}, {user?.state_province || "Nairobi"} {user?.postal_code || "00100"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.employmentSection}>
                <h3>Employment</h3>
                <div className={styles.employmentGrid}>
                  <div className={styles.employmentItem}>
                    <Briefcase className={styles.employmentIcon} />
                    <div>
                      <label>Occupation</label>
                      <div>{user?.occupation || "Not specified"}</div>
                    </div>
                  </div>
                  <div className={styles.employmentItem}>
                    <TrendingUp className={styles.employmentIcon} />
                    <div>
                      <label>Income Range</label>
                      <div>{user?.income_range || "Not specified"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.contentCard}>
              <h2 className={styles.contentTitle}>
                <Lock className={styles.contentIcon} />
                Security Settings
              </h2>

              <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                <h3>Change Password</h3>
                
                <div className={styles.formGroup}>
                  <label>Current Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={styles.passwordToggle}
                    >
                      {showCurrentPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={styles.passwordToggle}
                    >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirm_password}
                      onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={styles.passwordToggle}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Key className="w-4 h-4" />
                  Update Password
                </button>
              </form>

              <div className={styles.twoFactorSection}>
                <div className={styles.twoFactorHeader}>
                  <div>
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.two_factor_auth}
                      onChange={(e) => setSettings({...settings, two_factor_auth: e.target.checked})}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
                {settings.two_factor_auth && (
                  <div className={styles.twoFactorStatus}>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>2FA is enabled on your account</span>
                  </div>
                )}
              </div>

              <div className={styles.devicesSection}>
                <h3>Connected Devices</h3>
                <div className={styles.device}>
                  <Smartphone className={styles.deviceIcon} />
                  <div className={styles.deviceInfo}>
                    <div>iPhone 14 Pro</div>
                    <div className={styles.deviceMeta}>Last active: 2 hours ago • Nairobi, Kenya</div>
                  </div>
                  <span className={styles.currentDevice}>Current</span>
                </div>
                <div className={styles.device}>
                  <Smartphone className={styles.deviceIcon} />
                  <div className={styles.deviceInfo}>
                    <div>MacBook Pro</div>
                    <div className={styles.deviceMeta}>Last active: Yesterday • Nairobi, Kenya</div>
                  </div>
                  <button className={styles.removeDevice}>Remove</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className={styles.contentCard}>
              <h2 className={styles.contentTitle}>
                <Bell className={styles.contentIcon} />
                Notification Preferences
              </h2>

              <div className={styles.notificationList}>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationInfo}>
                    <MailIcon className={styles.notificationIcon} />
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive account updates and alerts via email</p>
                    </div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.email_notifications}
                      onChange={(e) => setSettings({...settings, email_notifications: e.target.checked})}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div className={styles.notificationInfo}>
                    <Lock className={styles.notificationIcon} />
                    <div>
                      <h4>Login Alerts</h4>
                      <p>Get notified of new sign-ins to your account</p>
                    </div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.login_alerts}
                      onChange={(e) => setSettings({...settings, login_alerts: e.target.checked})}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div className={styles.notificationInfo}>
                    <Award className={styles.notificationIcon} />
                    <div>
                      <h4>Marketing Emails</h4>
                      <p>Receive offers, promotions, and product updates</p>
                    </div>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.marketing_emails}
                      onChange={(e) => setSettings({...settings, marketing_emails: e.target.checked})}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className={styles.contentCard}>
              <h2 className={styles.contentTitle}>
                <Globe className={styles.contentIcon} />
                App Preferences
              </h2>

              <div className={styles.preferencesGrid}>
                <div className={styles.preferenceItem}>
                  <label>Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className={styles.select}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (Follow System)</option>
                  </select>
                </div>

                <div className={styles.preferenceItem}>
                  <label>Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className={styles.select}
                  >
                    <option value="en">English</option>
                    <option value="sw">Swahili</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className={styles.preferenceItem}>
                  <label>Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className={styles.select}
                  >
                    <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className={styles.contentCard}>
              <h2 className={styles.contentTitle}>
                <SettingsIcon className={styles.contentIcon} />
                Account Management
              </h2>

              <div className={styles.accountActions}>
                <div className={styles.actionItem}>
                  <div className={styles.actionInfo}>
                    <Download className={styles.actionIcon} />
                    <div>
                      <h4>Export Account Data</h4>
                      <p>Download all your personal data in JSON format</p>
                    </div>
                  </div>
                  <button className={styles.actionBtn}>Export</button>
                </div>

                <div className={styles.actionItem}>
                  <div className={styles.actionInfo}>
                    <Trash2 className={styles.actionIcon} style={{ color: '#EF4444' }} />
                    <div>
                      <h4>Deactivate Account</h4>
                      <p>Temporarily disable your account (reversible within 30 days)</p>
                    </div>
                  </div>
                  <button className={`${styles.actionBtn} ${styles.dangerBtn}`}>
                    Deactivate
                  </button>
                </div>
              </div>

              <div className={styles.dangerZone}>
                <h3>Danger Zone</h3>
                <div className={styles.dangerItem}>
                  <div>
                    <h4>Delete Account Permanently</h4>
                    <p>This action cannot be undone. All your data will be permanently removed.</p>
                  </div>
                  <button className={styles.deleteBtn}>Delete Account</button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button onClick={handleSaveSettings} className={styles.saveBtn}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}