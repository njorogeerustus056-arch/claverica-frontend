import {
  HomeIcon,
  ArrowUpRight,
  Bitcoin,
  CreditCard,
  FileCheck,
  Shield,
  Settings,
  LogOut,
  FileText,
  Heart,
  DollarSign,
  PiggyBank,
  Wallet,
  ShieldCheck,
  Lock,
  TrendingUp,
  Building,
  BadgeCheck,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../lib/store/auth";
import styles from './DashboardSidebar.module.css';

type Props = { isOpen: boolean; close: () => void };

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon, section: "overview" },
  { name: "Transfers", path: "/dashboard/transfer", icon: ArrowUpRight, section: "banking" },
  { name: "Escrow", path: "/dashboard/escrow", icon: Shield, section: "banking" },
  { name: "Savings", path: "/dashboard/savings", icon: PiggyBank, section: "financial" },
  { name: "Loans", path: "/dashboard/loans", icon: DollarSign, section: "financial" },
  { name: "Insurance", path: "/dashboard/insurance", icon: Heart, section: "financial" },
  { name: "My Cards", path: "/dashboard/cards", icon: CreditCard, section: "accounts" },
  { name: "Crypto", path: "/dashboard/crypto", icon: Bitcoin, section: "accounts" },
  { name: "Identity Verification", path: "/dashboard/kyc", icon: BadgeCheck, section: "account" },
  { name: "Account Settings", path: "/dashboard/account-settings", icon: Settings, section: "account" },
];

const SectionHeader = ({ title }: { title: string }) => (
  <div className={styles.sectionHeader}>
    <p className={styles.sectionTitle}>{title}</p>
  </div>
);

const sections = {
  overview: "Overview",
  banking: "Banking",
  financial: "Financial Services",
  accounts: "Accounts",
  account: "Account"
};

export default function DashboardSidebar({ isOpen, close }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof menu>);

  return (
    <>
      <div
        onClick={close}
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.branding}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <Building size={20} className={styles.logoIconSvg} />
            </div>
            <div>
              <h1 className={styles.logoText}>ClaveRica</h1>
              <p className={styles.tagline}>Smart Money, Worldwide</p>
            </div>
          </div>
          
          {user && (
            <div className={styles.userCard}>
              <div className={styles.userInfo}>
                <div>
                  <p className={styles.userName}>
                    {user.first_name} {user.last_name}
                  </p>
                  <p className={styles.userAccount}>
                    {user.account_number}
                  </p>
                </div>
                <div className={`${styles.verificationBadge} ${
                  user.is_verified ? styles.verified : styles.pending
                }`}>
                  {user.is_verified ? '✓ Verified' : 'Pending'}
                </div>
              </div>
              <div className={styles.userStatus}>
                <div className={`${styles.statusDot} ${
                  user.is_verified ? styles.statusVerified : styles.statusPending
                }`} />
                <span className={styles.statusText}>
                  {user.is_verified ? 'Account Verified' : 'Verification in Progress'}
                </span>
              </div>
            </div>
          )}
        </div>

        <nav className={styles.nav}>
          {Object.entries(groupedMenu).map(([sectionKey, items]) => (
            <div key={sectionKey} className={styles.navSection}>
              <SectionHeader title={sections[sectionKey as keyof typeof sections]} />
              {items.map((item) => {
                const active = location.pathname === item.path;
                const isKYC = item.name === "Identity Verification";

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      close();
                    }}
                    className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                  >
                    <div className={`${styles.navIconContainer} ${active ? styles.navIconActive : ''}`}>
                      <item.icon size={20} className={styles.navIcon} />
                    </div>
                    <span className={styles.navText}>{item.name}</span>
                    {isKYC && !user?.is_verified && (
                      <span className={styles.kycBadge}>Required</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className={styles.bottomSection}>
          <div className={styles.securityCard}>
            <div className={styles.securityIcon}>
              <ShieldCheck size={20} className={styles.securityIconSvg} />
            </div>
            <div className={styles.securityInfo}>
              <p className={styles.securityTitle}>
                <Lock size={12} className={styles.securityLock} />
                Bank‑Grade Security
              </p>
              <p className={styles.securityFeatures}>256‑bit AES • 2FA • PCI‑DSS</p>
            </div>
          </div>

          <button onClick={handleLogout} className={styles.logoutButton}>
            <div className={styles.logoutIconContainer}>
              <LogOut size={20} className={styles.logoutIcon} />
            </div>
            <span className={styles.logoutText}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}