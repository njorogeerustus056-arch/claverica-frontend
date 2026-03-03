// src/pages/Dashboard/Profile.tsx - COMPLETE WITH HOMEPAGE COLOR SYSTEM
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import { api } from "../../api";
import { 
  User, Mail, Phone, Shield, CheckCircle2, 
  Calendar, MapPin, Building, Edit, Download,
  Share2, Award, Clock, TrendingUp, CreditCard,
  ChevronRight, Briefcase, Home, Globe, FileText,
  Map, AlertCircle, Loader2, Zap
} from "lucide-react";
import styles from './Profile.module.css';

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
  
  // Address information
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  country_of_residence?: string;
  
  // Employment information
  occupation?: string;
  employer?: string;
  income_range?: string;
  
  // KYC & Verification
  kyc_status?: string;
  risk_level?: string;
  account_status?: string;
  doc_type?: string;
  doc_number?: string;
  
  // Stats
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

      const userData = await api.auth.getProfile();
      
      // Get wallet balance
      let walletBalance = 0;
      try {
        const walletData = await api.wallet.getBalance();
        walletBalance = walletData.balance || 0;
      } catch (walletError) {
        console.log("Wallet endpoint not available");
      }

      // Get transaction stats
      let totalTransactions = 0;
      let monthlyIncome = 0;
      let monthlyExpenses = 0;
      
      try {
        const txData = await api.wallet.getTransactions();
        const transactions = txData.transactions || txData || [];
        
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyTransactions = transactions.filter((tx: any) => {
          const txDate = new Date(tx.created_at || tx.timestamp);
          return txDate.getMonth() === currentMonth && 
                 txDate.getFullYear() === currentYear;
        });
        
        monthlyIncome = monthlyTransactions
          .filter((tx: any) => tx.transaction_type === "credit" && tx.status === "completed")
          .reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
        
        monthlyExpenses = monthlyTransactions
          .filter((tx: any) => tx.transaction_type === "debit" && tx.status === "completed")
          .reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
        
        totalTransactions = transactions.length;
      } catch (txError) {
        console.log("Transactions endpoint not available");
      }

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
        
        // Personal info
        date_of_birth: userData.date_of_birth || "",
        gender: userData.gender || "",
        nationality: userData.nationality || "",
        date_joined: userData.date_joined || "",
        last_login: userData.last_login || "",
        
        // Address info
        address_line1: userData.address_line1 || "",
        address_line2: userData.address_line2 || "",
        city: userData.city || "",
        state_province: userData.state_province || "",
        postal_code: userData.postal_code || "",
        country: userData.country || "",
        country_of_residence: userData.country_of_residence || "",
        
        // Employment info
        occupation: userData.occupation || "",
        employer: userData.employer || "",
        income_range: userData.income_range || "",
        
        // KYC & Verification
        kyc_status: userData.kyc_status || "pending",
        risk_level: userData.risk_level || "low",
        account_status: userData.account_status || "active",
        doc_type: userData.doc_type || "",
        doc_number: userData.doc_number || "",
        
        // Stats
        wallet_balance: walletBalance,
        total_transactions: totalTransactions,
        monthly_income: monthlyIncome,
        monthly_expenses: monthlyExpenses
      };

      setProfile(profileData);
    } catch (err: any) {
      console.error("Profile fetch error:", err);
      setError(err.message || "Failed to load profile");
      
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
      'verified': styles.statusSuccess,
      'pending': styles.statusWarning,
      'under_review': styles.statusInfo,
      'rejected': styles.statusError,
      'submitted': styles.statusPurple
    };
    return colors[status] || styles.statusDefault;
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

  const downloadStatement = () => {
    alert("Statement download coming soon!");
  };

  const completeKyc = () => {
    navigate('/dashboard/kyc');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <AlertCircle className={styles.errorIcon} />
          <h3 className={styles.errorTitle}>Error</h3>
          <p className={styles.errorMessage}>{error}</p>
          <button
            onClick={fetchProfileData}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Profile</h1>
            <p className={styles.subtitle}>
              Manage your personal information and account details
            </p>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={styles.refreshButton}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className={styles.buttonIcon + ' ' + styles.spinning} />
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
            <button
              onClick={handleEditProfile}
              className={styles.editButton}
            >
              <Edit className={styles.buttonIcon} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Left Column - Profile Card */}
          <div className={styles.leftColumn}>
            {/* Main Profile Card */}
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                {/* Avatar */}
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar}>
                    {profile.first_name?.[0]}{profile.last_name?.[0]}
                  </div>
                  {profile.kyc_status === 'verified' && (
                    <div className={styles.verifiedBadge}>
                      <CheckCircle2 className={styles.verifiedIcon} />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className={styles.profileInfo}>
                  <div className={styles.profileHeaderTop}>
                    <h2 className={styles.profileName}>
                      {profile.first_name} {profile.last_name}
                    </h2>
                    <div className={styles.profileBadges}>
                      <span className={`${styles.tierBadge} ${
                        profile.kyc_status === 'verified' ? styles.tierVerified : styles.tierPending
                      }`}>
                        {tier} Tier
                      </span>
                      <span className={styles.accountNumber}>
                        {profile.account_number}
                      </span>
                      <span className={`${styles.kycBadge} ${getKycStatusColor(profile.kyc_status || 'pending')}`}>
                        KYC: {getKycStatusText(profile.kyc_status || 'pending')}
                      </span>
                    </div>
                  </div>

                  {/* Account Details Grid */}
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <Mail className={styles.detailIcon} />
                      <div>
                        <p className={styles.detailLabel}>Email</p>
                        <p className={styles.detailValue}>{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <CreditCard className={styles.detailIcon} />
                      <div>
                        <p className={styles.detailLabel}>Account Number</p>
                        <p className={`${styles.detailValue} ${styles.monoText}`}>{profile.account_number}</p>
                      </div>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <Phone className={styles.detailIcon} />
                      <div>
                        <p className={styles.detailLabel}>Phone</p>
                        <p className={styles.detailValue}>{profile.phone || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <Shield className={styles.detailIcon} />
                      <div>
                        <p className={styles.detailLabel}>Account Status</p>
                        <p className={`${styles.detailValue} ${
                          profile.account_status === 'active' ? styles.textSuccess : styles.textError
                        }`}>
                          {profile.account_status?.toUpperCase() || "Active"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address & Employment */}
                  <div className={styles.infoSections}>
                    <div className={styles.infoSection}>
                      <div className={styles.infoSectionHeader}>
                        <MapPin className={styles.infoSectionIcon} />
                        <h3 className={styles.infoSectionTitle}>Location</h3>
                      </div>
                      <div className={styles.infoSectionContent}>
                        <p className={styles.infoText}>
                          {profile.country_of_residence || profile.country || "Not specified"}
                        </p>
                        <p className={styles.infoSubtext}>
                          {formatAddress()}
                        </p>
                        {profile.nationality && (
                          <p className={styles.infoSubtext}>
                            Nationality: {profile.nationality}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.infoSection}>
                      <div className={styles.infoSectionHeader}>
                        <Briefcase className={styles.infoSectionIcon} />
                        <h3 className={styles.infoSectionTitle}>Occupation</h3>
                      </div>
                      <div className={styles.infoSectionContent}>
                        <p className={styles.infoText}>
                          {profile.occupation || "Not specified"}
                        </p>
                        <p className={styles.infoSubtext}>
                          {profile.employer || "No employer specified"}
                        </p>
                        {profile.income_range && (
                          <p className={styles.infoSubtext}>
                            Income: {profile.income_range}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Info Grid */}
                  <div className={styles.personalGrid}>
                    <div className={styles.personalItem}>
                      <p className={styles.personalLabel}>Date of Birth</p>
                      <p className={styles.personalValue}>
                        {formatDate(profile.date_of_birth)}
                      </p>
                    </div>
                    <div className={styles.personalItem}>
                      <p className={styles.personalLabel}>Gender</p>
                      <p className={styles.personalValue}>
                        {profile.gender ? profile.gender.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Not specified"}
                      </p>
                    </div>
                    <div className={styles.personalItem}>
                      <p className={styles.personalLabel}>Member Since</p>
                      <p className={styles.personalValue}>
                        {formatDate(profile.date_joined)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <TrendingUp className={`${styles.statIcon} ${styles.statIconSuccess}`} />
                  <p className={styles.statLabel}>Monthly Income</p>
                </div>
                <p className={styles.statValue}>
                  ${(profile.monthly_income || 0).toLocaleString()}
                </p>
                <p className={styles.statSubtext}>This month's earnings</p>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <TrendingUp className={`${styles.statIcon} ${styles.statIconError}`} />
                  <p className={styles.statLabel}>Monthly Expenses</p>
                </div>
                <p className={styles.statValue}>
                  ${(profile.monthly_expenses || 0).toLocaleString()}
                </p>
                <p className={styles.statSubtext}>This month's spending</p>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <Clock className={`${styles.statIcon} ${styles.statIconPurple}`} />
                  <p className={styles.statLabel}>Total Transactions</p>
                </div>
                <p className={styles.statValue}>
                  {(profile.total_transactions || 0).toLocaleString()}
                </p>
                <p className={styles.statSubtext}>All-time transactions</p>
              </div>
            </div>

            {/* Net Flow */}
            <div className={styles.netFlowCard}>
              <div className={styles.netFlowHeader}>
                <h3 className={styles.netFlowTitle}>Monthly Net Flow</h3>
                <span className={`${styles.netFlowAmount} ${
                  netFlow >= 0 ? styles.netFlowPositive : styles.netFlowNegative
                }`}>
                  ${Math.abs(netFlow).toLocaleString()} {netFlow >= 0 ? 'Surplus' : 'Deficit'}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={`${styles.progressFill} ${
                    netFlow >= 0 ? styles.progressPositive : styles.progressNegative
                  }`}
                  style={{ width: `${Math.min(Math.abs(netFlow) / ((profile.monthly_income || 1) * 2) * 100, 100)}%` }}
                />
              </div>
              <p className={styles.netFlowText}>
                {netFlow >= 0 
                  ? 'You are saving money this month!'
                  : 'Your expenses exceed your income this month.'}
              </p>
            </div>
          </div>

          {/* Right Column - Actions & Verification */}
          <div className={styles.rightColumn}>
            {/* Verification Status */}
            <div className={styles.verificationCard}>
              <h3 className={styles.cardTitle}>
                <Shield className={styles.cardTitleIcon} />
                Verification Status
              </h3>
              
              <div className={styles.verificationList}>
                <div className={styles.verificationItem}>
                  <div className={styles.verificationLeft}>
                    <div className={`${styles.verificationIcon} ${
                      profile.kyc_status === 'verified' ? styles.iconSuccess : 
                      profile.kyc_status === 'rejected' ? styles.iconError : styles.iconWarning
                    }`}>
                      {profile.kyc_status === 'verified' ? (
                        <CheckCircle2 className={styles.iconSize} />
                      ) : profile.kyc_status === 'rejected' ? (
                        <AlertCircle className={styles.iconSize} />
                      ) : (
                        <Clock className={styles.iconSize} />
                      )}
                    </div>
                    <div>
                      <p className={styles.verificationTitle}>Identity Verification</p>
                      <p className={styles.verificationSubtitle}>
                        {getKycStatusText(profile.kyc_status || 'pending')}
                      </p>
                    </div>
                  </div>
                  <span className={`${styles.verificationStatus} ${getKycStatusColor(profile.kyc_status || 'pending')}`}>
                    {profile.kyc_status === 'verified' ? 'Complete' : 
                     profile.kyc_status === 'rejected' ? 'Failed' : 'Required'}
                  </span>
                </div>

                <div className={styles.verificationItem}>
                  <div className={styles.verificationLeft}>
                    <div className={`${styles.verificationIcon} ${profile.is_verified ? styles.iconSuccess : styles.iconWarning}`}>
                      <CheckCircle2 className={styles.iconSize} />
                    </div>
                    <div>
                      <p className={styles.verificationTitle}>Email Verified</p>
                      <p className={styles.verificationSubtitle}>
                        {profile.is_verified ? 'Confirmed' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <span className={`${styles.verificationStatus} ${
                    profile.is_verified ? styles.statusSuccess : styles.statusWarning
                  }`}>
                    {profile.is_verified ? 'Complete' : 'Required'}
                  </span>
                </div>

                <div className={styles.verificationItem}>
                  <div className={styles.verificationLeft}>
                    <div className={`${styles.verificationIcon} ${styles.iconSuccess}`}>
                      <CheckCircle2 className={styles.iconSize} />
                    </div>
                    <div>
                      <p className={styles.verificationTitle}>Account Status</p>
                      <p className={styles.verificationSubtitle}>
                        {profile.account_status?.toUpperCase() || "Active"}
                      </p>
                    </div>
                  </div>
                  <span className={`${styles.verificationStatus} ${
                    profile.account_status === 'active' ? styles.statusSuccess : styles.statusError
                  }`}>
                    {profile.account_status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {profile.doc_type && (
                  <div className={styles.verificationItem}>
                    <div className={styles.verificationLeft}>
                      <div className={`${styles.verificationIcon} ${styles.iconInfo}`}>
                        <FileText className={styles.iconSize} />
                      </div>
                      <div>
                        <p className={styles.verificationTitle}>Document Type</p>
                        <p className={styles.verificationSubtitle}>
                          {profile.doc_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                      </div>
                    </div>
                    <span className={`${styles.verificationStatus} ${styles.statusInfo}`}>
                      {profile.doc_number ? 'Provided' : 'Missing'}
                    </span>
                  </div>
                )}
              </div>

              {profile.kyc_status !== 'verified' && (
                <button
                  onClick={completeKyc}
                  className={styles.kycButton}
                >
                  {profile.kyc_status === 'rejected' ? 'Resubmit KYC Documents' : 'Complete Identity Verification'}
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className={styles.actionsCard}>
              <h3 className={styles.cardTitle}>
                <Zap className={styles.cardTitleIcon} />
                Quick Actions
              </h3>
              <div className={styles.actionsList}>
                <button
                  onClick={downloadStatement}
                  className={styles.actionButton}
                >
                  <div className={styles.actionLeft}>
                    <Download className={styles.actionIcon} />
                    <span>Download Statements</span>
                  </div>
                  <ChevronRight className={styles.actionArrow} />
                </button>
                
                <button
                  onClick={() => navigate('/dashboard/support')}
                  className={styles.actionButton}
                >
                  <div className={styles.actionLeft}>
                    <Share2 className={styles.actionIcon} />
                    <span>Contact Support</span>
                  </div>
                  <ChevronRight className={styles.actionArrow} />
                </button>
                
                <button
                  onClick={() => navigate('/dashboard/settings')}
                  className={styles.actionButton}
                >
                  <div className={styles.actionLeft}>
                    <Award className={styles.actionIcon} />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className={styles.actionArrow} />
                </button>

                <button
                  onClick={() => navigate('/dashboard/referrals')}
                  className={styles.actionButton}
                >
                  <div className={styles.actionLeft}>
                    <User className={styles.actionIcon} />
                    <span>Refer Friends</span>
                  </div>
                  <ChevronRight className={styles.actionArrow} />
                </button>
              </div>
            </div>

            {/* Account Tier Benefits */}
            <div className={styles.benefitsCard}>
              <h3 className={styles.cardTitle}>
                <Award className={styles.cardTitleIcon} />
                {tier} Tier Benefits
              </h3>
              <ul className={styles.benefitsList}>
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
                  <li key={idx} className={styles.benefitItem}>
                    <CheckCircle2 className={styles.benefitIcon} />
                    <span className={styles.benefitText}>{benefit}</span>
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