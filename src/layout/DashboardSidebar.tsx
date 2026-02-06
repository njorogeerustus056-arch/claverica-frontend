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
  <div className="px-4 py-2 mt-2 first:mt-0">
    <p className="text-xs uppercase tracking-wider text-blue-100/80 font-semibold">
      {title}
    </p>
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
      {/* Dark Overlay for Mobile */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-indigo-950/70 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar - Modern Vibrant */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-indigo-950 via-indigo-900/90 to-indigo-950 text-white flex flex-col transition-all duration-300 ease-in-out transform shadow-2xl shadow-indigo-900/40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Branding - Modern Style */}
        <div className="p-6 border-b border-indigo-800/50 bg-gradient-to-r from-indigo-900/80 to-purple-900/70">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-400/40">
                <Building size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  ClaveRica
                </h1>
                <p className="text-blue-100/90 text-sm mt-1 font-medium">Smart Money, Worldwide</p>
              </div>
            </div>
            
            {/* User Info - Modern Card */}
            {user && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/40 rounded-2xl border border-blue-500/20 backdrop-blur-lg shadow-inner">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-blue-100/80 mt-1 font-mono tracking-tight">
                      {user.account_number}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.is_verified 
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {user.is_verified ? '✓ Verified' : 'Pending'}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-500/20">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      user.is_verified ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}></div>
                    <span className="text-xs text-blue-100/80">
                      {user.is_verified ? 'Account Verified' : 'Verification in Progress'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MENU - Modern Style */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar-finance">
          {Object.entries(groupedMenu).map(([sectionKey, items]) => (
            <div key={sectionKey} className="mb-2">
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
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1.5 transition-all duration-200 group ${
                      active
                        ? "bg-gradient-to-r from-blue-500/25 via-cyan-500/15 to-purple-500/20 text-white shadow-inner shadow-blue-500/20 border-l-4 border-cyan-400"
                        : "text-blue-100/90 hover:bg-indigo-800/40 hover:text-white hover:shadow-lg hover:border-l-4 hover:border-indigo-500/50"
                    } ${isKYC ? "border-l-4 border-amber-500/60" : ""}`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      active 
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-cyan-500/40" 
                        : "bg-indigo-800/50 group-hover:bg-indigo-700/60"
                    }`}>
                      <item.icon
                        size={20}
                        className={active ? "text-white" : "text-blue-100/70 group-hover:text-white"}
                      />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                    {isKYC && !user?.is_verified && (
                      <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/40">
                        Required
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Section - Modern Style */}
        <div className="p-4 border-t border-indigo-800/50 bg-indigo-900/30">
          {/* Security Badge - Modern */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-900/30 to-teal-900/25 rounded-2xl mb-4 border border-emerald-500/20 shadow-inner">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-600/20 border border-emerald-500/30">
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <Lock size={12} className="text-emerald-400" />
                Bank‑Grade Security
              </p>
              <p className="text-xs text-blue-100/70 mt-1">256‑bit AES • 2FA • PCI‑DSS</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-blue-100/90 hover:bg-rose-500/15 hover:text-rose-300 hover:border-rose-500/30 border border-transparent transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-indigo-800/50 group-hover:bg-rose-500/20 transition-colors">
              <LogOut size={20} className="group-hover:text-rose-400" />
            </div>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}