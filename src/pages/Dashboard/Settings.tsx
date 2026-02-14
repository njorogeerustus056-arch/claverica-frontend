// src/pages/Dashboard/Settings.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import { 
  Settings as SettingsIcon, User, Lock, Bell, Globe, 
  Shield, Moon, Download, Trash2, CheckCircle2,
  Smartphone, Mail, Key, Eye, EyeOff
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    timezone: "UTC",
    email_notifications: true,
    sms_notifications: true,
    two_factor_auth: false
  });
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Fetch user settings from /api/users/settings/
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setSettings({
            theme: "light",
            language: "en",
            timezone: "Africa/Nairobi",
            email_notifications: true,
            sms_notifications: true,
            two_factor_auth: false
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      // Simulate POST /api/users/settings/update/
      console.log("Updating settings:", settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Failed to update settings");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate POST /api/users/password/change/
    console.log("Changing password...");
    alert("Password changed successfully!");
  };

  const handleExportData = () => {
    console.log("Exporting user data...");
    alert("Data export started. You'll receive an email shortly.");
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Are you sure you want to deactivate your account? This action can be reversed within 30 days.")) {
      console.log("Deactivating account...");
      // Call deactivation endpoint
      alert("Account deactivation requested. Check your email for confirmation.");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "account", label: "Account", icon: SettingsIcon }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-400">
            Manage your preferences, security, and privacy settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Tabs */}
          <div className="lg:w-64">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full px-6 py-4 flex items-center gap-3 transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-600/20 text-white border-l-4 border-blue-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-400" />
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Account Number</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white font-mono">{user?.account_number || "CLV-678-010190-26-88"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white">
                          {user?.first_name} {user?.last_name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email Address</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Phone Number</label>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white">+254712345678</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => navigate('/dashboard/profile')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-green-400" />
                    Password & Security
                  </h2>
                  
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all"
                      >
                        <Key className="w-4 h-4 inline mr-2" />
                        Change Password
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => navigate('/dashboard/kyc/submit')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all"
                      >
                        <Shield className="w-4 h-4 inline mr-2" />
                        Enhance Security with KYC
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-sm font-bold rounded-full ${settings.two_factor_auth ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                        {settings.two_factor_auth ? 'Enabled' : 'Disabled'}
                      </span>
                      <button
                        onClick={() => setSettings({...settings, two_factor_auth: !settings.two_factor_auth})}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/10 hover:border-white/20"
                      >
                        {settings.two_factor_auth ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-yellow-400" />
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-gray-400 text-sm">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.email_notifications}
                          onChange={(e) => setSettings({...settings, email_notifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">SMS Notifications</p>
                        <p className="text-gray-400 text-sm">Receive important alerts via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.sms_notifications}
                          onChange={(e) => setSettings({...settings, sms_notifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-400" />
                    App Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Theme</label>
                      <div className="flex gap-3">
                        {["light", "dark", "auto"].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setSettings({...settings, theme})}
                            className={`px-4 py-2 rounded-xl border transition-all ${
                              settings.theme === theme
                                ? "bg-blue-600/20 text-white border-blue-500"
                                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                            }`}
                          >
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="en">English</option>
                        <option value="sw">Swahili</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <SettingsIcon className="w-6 h-6 text-red-400" />
                    Account Management
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Export Account Data</p>
                          <p className="text-gray-400 text-sm">Download all your data in JSON format</p>
                        </div>
                      </div>
                      <button
                        onClick={handleExportData}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all border border-white/10 hover:border-white/20"
                      >
                        Export
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-white font-medium">Deactivate Account</p>
                          <p className="text-gray-400 text-sm">Temporarily disable your account</p>
                        </div>
                      </div>
                      <button
                        onClick={handleDeactivateAccount}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-700/30 backdrop-blur-xl text-red-300 rounded-xl font-medium transition-all border border-red-500/30 hover:border-red-500/50"
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8">
              <button
                onClick={handleSaveSettings}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
