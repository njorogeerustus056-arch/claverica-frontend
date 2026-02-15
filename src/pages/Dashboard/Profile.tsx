// src/pages/Dashboard/Profile.tsx - FIXED VERSION
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import { 
  User, Mail, Phone, Shield, CheckCircle2, 
  Calendar, MapPin, Building, Edit, Download,
  Share2, Award, Clock, TrendingUp, CreditCard,
  ChevronRight, Briefcase, Home, Globe, FileText,
  Map
} from "lucide-react";
import apiClient from "../../lib/api/client";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || "`${import.meta.env.VITE_API_URL}`";

interface ProfileData {
  // Basic user info
  id?: number;
  email: string;
  account_number: string;
  first_name: string;
  last_name: string;
  phone?: string;
  is_verified?: boolean;
  is_active?: boolean;
  
  // Personal info
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  date_joined?: string;
  last_login?: string;
  
  // Address information (REAL FIELDS)
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  country_of_residence?: string;
  
  // Employment information (REAL FIELDS)
  occupation?: string;
  employer?: string;
  income_range?: string;
  
  // KYC & Verification
  kyc_status?: string;
  risk_level?: string;
  account_status?: string;
  doc_type?: string;
  doc_number?: string;
  
  // Stats (from available endpoints)
  wallet_balance?: number;
  total_transactions?: number;
  monthly_income?: number;
  monthly_expenses?: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, tokens } = useAuthStore();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    if (!tokens?.access) {
      setError("Please login to continue");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // ✅ FIXED: Removed duplicate /api/ from endpoint
      const userResponse = await apiClient.get('/users/profile/');
      const userData = userResponse.data;
      
      // 2. Get wallet balance from /api/transactions/wallet/balance/
      let walletBalance = 0;
      try {
        const walletResponse = await apiClient.get('/transactions/wallet/balance/');
        walletBalance = walletResponse.data.balance || 0;
      } catch (walletError) {
        console.log("Wallet endpoint not available");
      }

      // 3. Get transaction stats from /api/transactions/recent/
      let totalTransactions = 0;
      let monthlyIncome = 0;
      let monthlyExpenses = 0;
      
      try {
        const txResponse = await apiClient.get('/transactions/recent/');
        const transactions = txResponse.data.transactions || txResponse.data || [];
        
        // Calculate stats
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyTransactions = transactions.filter((tx: any) => {
          const txDate = new Date(tx.created_at || tx.date);
          return txDate.getMonth() === currentMonth && 
                 txDate.getFullYear() === currentYear;
        });
        
        monthlyIncome = monthlyTransactions
          .filter((tx: any) => (tx.transaction_type === "credit" || tx.type === "deposit") && tx.status === "completed")
          .reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
        
        monthlyExpenses = monthlyTransactions
          .filter((tx: any) => (tx.transaction_type === "debit" || tx.type === "withdrawal") && tx.status === "completed")
          .reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
        
        totalTransactions = transactions.length;
      } catch (txError) {
        console.log("Transactions endpoint not available");
      }

      // Combine data - USING REAL BACKEND FIELDS
      const profileData: ProfileData = {
        // Basic info
        id: userData.id,
        email: userData.email || "",
        account_number: userData.account_number || "CLV-XXX-XXXXXX-XX-XX",
        first_name: userData.first_name || "User",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
        is_verified: userData.is_verified || false,
        is_active: userData.is_active !== false,
        
        // Personal info (REAL DATA)
        date_of_birth: userData.date_of_birth || "",
        gender: userData.gender || "",
        nationality: userData.nationality || "",
        date_joined: userData.date_joined || "",
        last_login: userData.last_login || "",
        
        // Address info (REAL DATA)
        address_line1: userData.address_line1 || "",
        address_line2: userData.address_line2 || "",
        city: userData.city || "",
        state_province: userData.state_province || "",
        postal_code: userData.postal_code || "",
        country: userData.country || "",
        country_of_residence: userData.country_of_residence || "",
        
        // Employment info (REAL DATA)
        occupation: userData.occupation || "",
        employer: userData.employer || "",
        income_range: userData.income_range || "",
        
        // KYC & Verification (REAL DATA)
        kyc_status: userData.kyc_status || "pending",
        risk_level: userData.risk_level || "low",
        account_status: userData.account_status || "active",
        doc_type: userData.doc_type || "",
        doc_number: userData.doc_number || "",
        
        // Stats from available endpoints
        wallet_balance: walletBalance,
        total_transactions: totalTransactions,
        monthly_income: monthlyIncome,
        monthly_expenses: monthlyExpenses
      };

      setProfile(profileData);
    } catch (err: any) {
      console.error("Profile fetch error:", err);
      setError(err.response?.data?.message || "Failed to load profile");
      
      // Fallback to auth store data
      if (authUser) {
        setProfile({
          email: authUser.email || "user@example.com",
          account_number: authUser.account_number || "CLV-XXX-XXXXXX-XX-XX",
          first_name: authUser.first_name || "User",
          last_name: authUser.last_name || "",
          phone: authUser.phone || "",
          is_verified: authUser.is_verified || false,
          is_active: authUser.is_active !== false,
          wallet_balance: 0,
          total_transactions: 0,
          monthly_income: 0,
          monthly_expenses: 0,
          kyc_status: "pending",
          account_status: "active"
        });
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Helper functions
  const formatAddress = () => {
    if (!profile) return "No address provided";
    
    const parts = [
      profile.address_line1,
      profile.address_line2,
      profile.city,
      profile.state_province,
      profile.postal_code,
      profile.country
    ].filter(Boolean);
    
    return parts.length > 0 ? parts.join(", ") : "No address provided";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getKycStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'verified': 'text-green-600 dark:text-green-400',
      'pending': 'text-amber-600 dark:text-amber-400',
      'under_review': 'text-blue-600 dark:text-blue-400',
      'rejected': 'text-red-600 dark:text-red-400',
      'submitted': 'text-purple-600 dark:text-purple-400'
    };
    return colors[status] || 'text-slate-600 dark:text-slate-400';
  };

  const getKycStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'verified': 'Verified',
      'pending': 'Pending',
      'under_review': 'Under Review',
      'rejected': 'Rejected',
      'submitted': 'Submitted'
    };
    return texts[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Memoized calculations
  const netFlow = useMemo(() => {
    return (profile?.monthly_income || 0) - (profile?.monthly_expenses || 0);
  }, [profile?.monthly_income, profile?.monthly_expenses]);

  const tier = useMemo(() => {
    if (profile?.kyc_status === 'verified') return "Verified";
    if (profile?.is_verified) return "Basic";
    return "Pending Verification";
  }, [profile?.kyc_status, profile?.is_verified]);

  const handleEditProfile = () => {
    navigate('/dashboard/profile/edit');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProfileData();
  };

  const downloadStatement = async () => {
    try {
      // TODO: Implement statement download
      alert("Statement download feature coming soon!");
    } catch (error) {
      console.error("Failed to download statement:", error);
      alert("Statement download will be available soon!");
    }
  };

  const completeKyc = () => {
    navigate('/dashboard/kyc');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-2">Error</h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{error}</p>
          <button
            onClick={fetchProfileData}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                My Profile
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your personal information and account details
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isRefreshing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <div className="text-white text-3xl font-bold">
                      {profile.first_name?.[0]}{profile.last_name?.[0]}
                    </div>
                  </div>
                  {profile.kyc_status === 'verified' && (
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {profile.first_name} {profile.last_name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                        profile.kyc_status === 'verified' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      }`}>
                        {tier} Tier
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        Account: {profile.account_number}
                      </span>
                      <span className={`text-sm font-medium ${getKycStatusColor(profile.kyc_status || 'pending')}`}>
                        KYC: {getKycStatusText(profile.kyc_status || 'pending')}
                      </span>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                      </div>
                      <p className="text-slate-900 dark:text-white font-medium truncate">{profile.email}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Account Number</p>
                      </div>
                      <p className="text-slate-900 dark:text-white font-mono font-bold">{profile.account_number}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                      </div>
                      <p className="text-slate-900 dark:text-white font-medium">{profile.phone || "Not provided"}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Account Status</p>
                      </div>
                      <p className={`font-medium ${
                        profile.account_status === 'active'
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {profile.account_status?.toUpperCase() || "Active"}
                      </p>
                    </div>
                  </div>

                  {/* Address & Employment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Location</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-700 dark:text-slate-300">
                          {profile.country_of_residence || profile.country || "Not specified"}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {formatAddress()}
                        </p>
                        {profile.nationality && (
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Nationality: {profile.nationality}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Occupation</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 dark:text-white font-medium">
                          {profile.occupation || "Not specified"}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {profile.employer || "No employer specified"}
                        </p>
                        {profile.income_range && (
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Income: {profile.income_range}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Date of Birth</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {formatDate(profile.date_of_birth)}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Gender</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {profile.gender ? profile.gender.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Not specified"}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Member Since</p>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {formatDate(profile.date_joined)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Income</p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  ${(profile.monthly_income || 0).toLocaleString()}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">This month's earnings</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Expenses</p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  ${(profile.monthly_expenses || 0).toLocaleString()}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">This month's spending</p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Transactions</p>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {(profile.total_transactions || 0).toLocaleString()}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">All-time transactions</p>
              </div>
            </div>

            {/* Net Flow */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h3 className="text-xl font-bold text-white">Monthly Net Flow</h3>
                <span className={`text-2xl font-bold ${
                  netFlow >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  ${Math.abs(netFlow).toLocaleString()} {netFlow >= 0 ? 'Surplus' : 'Deficit'}
                </span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${netFlow >= 0 ? 'bg-green-400' : 'bg-red-400'} transition-all duration-1000`}
                  style={{ width: `${Math.min(Math.abs(netFlow) / ((profile.monthly_income || 1) * 2) * 100, 100)}%` }}
                />
              </div>
              <p className="text-white/80 text-sm mt-3">
                {netFlow >= 0 
                  ? 'You are saving money this month!'
                  : 'Your expenses exceed your income this month.'}
              </p>
            </div>
          </div>

          {/* Right Column - Actions & Verification */}
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Verification Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      profile.kyc_status === 'verified' 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : profile.kyc_status === 'rejected'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-amber-100 dark:bg-amber-900/30'
                    }`}>
                      {profile.kyc_status === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : profile.kyc_status === 'rejected' ? (
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Identity Verification</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {getKycStatusText(profile.kyc_status || 'pending')}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${getKycStatusColor(profile.kyc_status || 'pending')}`}>
                    {profile.kyc_status === 'verified' ? 'Complete' : 
                     profile.kyc_status === 'rejected' ? 'Failed' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Email Verified</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {profile.is_verified ? 'Confirmed' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    profile.is_verified 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {profile.is_verified ? 'Complete' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Account Status</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {profile.account_status?.toUpperCase() || "Active"}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    profile.account_status === 'active'
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {profile.account_status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {profile.doc_type && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-medium">Document Type</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {profile.doc_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {profile.doc_number ? 'Provided' : 'Missing'}
                    </span>
                  </div>
                )}
              </div>

              {profile.kyc_status !== 'verified' && (
                <button
                  onClick={completeKyc}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all"
                >
                  {profile.kyc_status === 'rejected' ? 'Resubmit KYC Documents' : 'Complete Identity Verification'}
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={downloadStatement}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <span>Download Statements</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
                
                <button
                  onClick={() => navigate('/dashboard/support')}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <span>Contact Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
                
                <button
                  onClick={() => navigate('/dashboard/settings')}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>

                <button
                  onClick={() => navigate('/dashboard/referrals')}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <span>Refer Friends</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            </div>

            {/* Account Tier Benefits */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {tier} Tier Benefits
              </h3>
              <ul className="space-y-2">
                {(profile.kyc_status === 'verified' ? [
                  "Higher transaction limits",
                  "Priority customer support",
                  "Lower fees for transfers",
                  "Advanced security features",
                  "Dedicated account manager"
                ] : [
                  "Basic transaction limits",
                  "Standard customer support",
                  "Secure account protection",
                  "Free bank transfers",
                  "24/7 fraud monitoring"
                ]).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}