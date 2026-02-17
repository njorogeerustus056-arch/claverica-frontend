"use client";

import { useState, useEffect } from "react";
import { Bell, Search, CheckCircle, User, LogOut, ChevronDown, CreditCard, Wallet, RefreshCw } from "lucide-react";
import { useAuthStore } from "../lib/store/auth";
import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ ADDED: Import centralized API
import styles from './DashboardHeader.module.css';

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  toggleSidebar: () => void;
};

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  created_at: string;
  is_read: boolean;
  metadata?: any;
}

export default function DashboardHeader({ toggleSidebar }: Props) {
  const { user, tokens, logout, isAuthenticated } = useAuthStore();
  const { 
    unreadCount, 
    notifications, 
    markAsRead, 
    markAllAsRead,
    fetchNotifications 
  } = useNotifications();
  
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  // ✅ FIXED: Using centralized API instead of direct fetch
  const fetchBalance = async () => {
    if (!isAuthenticated || !tokens?.access) {
      console.log('⏭️ Skipping balance fetch - not authenticated');
      return;
    }
    
    try {
      console.log('🔍 Fetching balance via API...');
      
      // ✅ USING CENTRALIZED API - CORRECT
      const response = await api.get('/api/transactions/wallet/balance/');
      
      console.log('📥 Balance response:', response);
      
      if (response && typeof response === 'object') {
        const balanceValue = response.balance ?? response.amount ?? response.value ?? 0;
        setBalance(Number(balanceValue));
        console.log('💰 Balance set to:', Number(balanceValue));
      } else {
        console.warn('⚠️ Unexpected balance format:', response);
        setBalance(0);
      }
    } catch (error) {
      console.error("❌ Failed to fetch balance:", error);
      setBalance(0);
    }
  };

  // ✅ Map notification types for all events (wallet, transfers, TAC, etc.)
  const mapNotificationType = (notification: any): "success" | "warning" | "error" | "info" => {
    const type = notification.notification_type || '';
    const priority = notification.priority || '';
    const metadata = notification.metadata || {};
    
    // Wallet related notifications
    if (type.includes('PAYMENT') || type.includes('DEPOSIT') || type.includes('CREDIT')) {
      return 'success';
    }
    
    // Transfer related notifications
    if (type.includes('TRANSFER_COMPLETED')) return 'success';
    if (type.includes('TRANSFER_INITIATED')) return 'info';
    if (type.includes('TRANSFER_FAILED')) return 'error';
    
    // TAC related notifications
    if (type.includes('TAC_SENT')) return 'info';
    if (type.includes('TAC_VERIFIED')) return 'success';
    if (type.includes('TAC_EXPIRED')) return 'warning';
    
    // KYC related
    if (type.includes('KYC_APPROVED')) return 'success';
    if (type.includes('KYC_REJECTED')) return 'error';
    if (type.includes('KYC_SUBMITTED')) return 'info';
    if (type.includes('KYC_REVIEW')) return 'warning';
    
    // Admin actions
    if (type.includes('ADMIN_TAC_REQUIRED')) return 'warning';
    if (type.includes('ADMIN_KYC_REVIEW')) return 'warning';
    if (type.includes('ADMIN_SETTLEMENT')) return 'info';
    
    // Priority based
    if (priority === 'HIGH') return 'warning';
    if (priority === 'MEDIUM') return 'info';
    
    return 'info';
  };

  // ✅ Transform notifications with all metadata
  const transformedNotifications = notifications.map((n: any) => ({
    id: n.id,
    title: n.title || 'Notification',
    message: n.message || '',
    type: mapNotificationType(n),
    created_at: n.created_at || new Date().toISOString(),
    is_read: n.status === 'READ' || n.is_read === true,
    metadata: n.metadata || {},
    priority: n.priority || 'NORMAL',
    action_url: n.action_url || null,
    requires_action: n.requires_admin_action || false
  }));

  // ✅ Fetch balance when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBalance();
    } else {
      setBalance(null);
    }
    setLoading(false);
  }, [isAuthenticated, tokens?.access]);

  // ✅ Fetch notifications when opening dropdown
  useEffect(() => {
    if (notificationOpen && isAuthenticated) {
      fetchNotifications();
    }
  }, [notificationOpen, fetchNotifications, isAuthenticated]);

  const formatBalance = () => {
    if (balance === null) return 'Loading...';
    if (balance === 0) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(balance);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getNotificationIndicatorClass = (type: string) => {
    switch(type) {
      case 'success': return styles.indicatorSuccess;
      case 'error': return styles.indicatorError;
      case 'warning': return styles.indicatorWarning;
      default: return styles.indicatorInfo;
    }
  };

  const getNotificationItemClass = (is_read: boolean) => {
    return `${styles.notificationItem} ${!is_read ? styles.notificationUnread : ''}`;
  };

  // ✅ Get icon for notification type
  const getNotificationIcon = (type: string, notification: any) => {
    const typeLower = type.toLowerCase();
    const metadata = notification.metadata || {};
    
    if (typeLower.includes('tac')) return '🔐';
    if (typeLower.includes('transfer')) return '💸';
    if (typeLower.includes('payment')) return '💰';
    if (typeLower.includes('kyc')) return '📋';
    if (typeLower.includes('wallet')) return '👛';
    if (typeLower.includes('admin')) return '⚙️';
    if (notification.requires_action) return '⚠️';
    return '📌';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          
          {/* Left Section */}
          <div className={styles.leftSection}>
            <button
              onClick={toggleSidebar}
              className={`${styles.menuButton} ${styles.mobileOnly}`}
              aria-label="Toggle sidebar"
            >
              <div className={styles.menuIcon}>
                <div className={styles.menuLine}></div>
                <div className={styles.menuLine}></div>
                <div className={styles.menuLine}></div>
              </div>
            </button>
            
            {/* Balance Display - Using centralized API */}
            {isAuthenticated && (
              <div className={`${styles.balanceContainer} ${styles.desktopOnly}`}>
                <Wallet className={styles.balanceIcon} />
                <span className={styles.balanceLabel}>Balance:</span>
                <span className={styles.balanceAmount}>
                  {formatBalance()}
                </span>
                <button
                  onClick={fetchBalance}
                  className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                  title="Refresh balance"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Center - Search */}
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions, contacts..."
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className={styles.rightActions}>
            
            {/* Notifications Dropdown - With all types */}
            {isAuthenticated && (
              <div className={styles.notificationWrapper}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className={styles.actionButton}
                  disabled={loading}
                >
                  <Bell className={styles.icon} />
                  {unreadCount > 0 && (
                    <span className={styles.notificationBadge}>{unreadCount}</span>
                  )}
                </button>

                {notificationOpen && (
                  <>
                    <div className={styles.backdrop} onClick={() => setNotificationOpen(false)} />
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownHeader}>
                        <div className={styles.dropdownTitle}>
                          <h3 className={styles.dropdownHeading}>Notifications</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={() => {
                                markAllAsRead();
                                setNotificationOpen(false);
                              }}
                              className={styles.markAllButton}
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.dropdownContent}>
                        {loading ? (
                          <div className={styles.loadingState}>
                            <div className={styles.spinner}></div>
                          </div>
                        ) : transformedNotifications.length === 0 ? (
                          <div className={styles.emptyState}>
                            <Bell className={styles.emptyIcon} />
                            <p className={styles.emptyText}>No notifications</p>
                          </div>
                        ) : (
                          transformedNotifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={getNotificationItemClass(notification.is_read)}
                              onClick={() => {
                                if (!notification.is_read) {
                                  markAsRead(notification.id);
                                }
                                // Navigate if action URL exists
                                if (notification.action_url) {
                                  navigate(notification.action_url);
                                  setNotificationOpen(false);
                                }
                              }}
                            >
                              <div className={styles.notificationContent}>
                                <div className={`${styles.notificationIndicator} ${getNotificationIndicatorClass(notification.type)}`}>
                                  <span className="text-xs">
                                    {getNotificationIcon(notification.type, notification)}
                                  </span>
                                </div>
                                <div className={styles.notificationDetails}>
                                  <p className={styles.notificationTitle}>
                                    {notification.title}
                                    {notification.priority === 'HIGH' && (
                                      <span className="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                                        Urgent
                                      </span>
                                    )}
                                  </p>
                                  <p className={styles.notificationMessage}>
                                    {notification.message}
                                  </p>
                                  {!notification.is_read && (
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                      className={styles.markReadButton}
                                    >
                                      Mark read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {transformedNotifications.length > 5 && (
                        <div className={styles.dropdownFooter}>
                          <button 
                            onClick={() => {
                              navigate('/dashboard/notifications');
                              setNotificationOpen(false);
                            }}
                            className={styles.viewAllButton}
                          >
                            View all notifications
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* User Profile */}
            <div className={styles.userWrapper}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={styles.userButton}
              >
                <div className={styles.avatar}>
                  <span className={styles.avatarText}>
                    {user?.first_name?.[0] || 'U'}{user?.last_name?.[0] || 'S'}
                  </span>
                  <div className={styles.onlineIndicator}></div>
                </div>
                <ChevronDown className={styles.chevron} />
              </button>

              {userMenuOpen && (
                <>
                  <div className={styles.backdrop} onClick={() => setUserMenuOpen(false)} />
                  <div className={`${styles.dropdown} ${styles.userDropdown}`}>
                    
                    <div className={styles.userHeader}>
                      <div className={styles.userInfo}>
                        <div className={`${styles.avatar} ${styles.largeAvatar}`}>
                          <span className={styles.avatarText}>
                            {user?.first_name?.[0] || 'U'}{user?.last_name?.[0] || 'S'}
                          </span>
                        </div>
                        <div className={styles.userDetails}>
                          <h4 className={styles.userName}>
                            {user?.first_name} {user?.last_name}
                          </h4>
                          <p className={styles.userAccount}>
                            {user?.account_number || '•••• ••••'}
                          </p>
                          <p className={styles.userEmail}>
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.userMenu}>
                      <button 
                        onClick={() => {
                          navigate('/dashboard/profile');
                          setUserMenuOpen(false);
                        }}
                        className={styles.menuItem}
                      >
                        <User className={styles.menuIcon} />
                        <span className={styles.menuText}>My Profile</span>
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/dashboard/cards');
                          setUserMenuOpen(false);
                        }}
                        className={styles.menuItem}
                      >
                        <CreditCard className={styles.menuIcon} />
                        <span className={styles.menuText}>My Cards</span>
                      </button>
                    </div>
                    
                    <div className={styles.logoutSection}>
                      <button 
                        onClick={handleLogout}
                        className={styles.logoutButton}
                      >
                        <LogOut className={styles.logoutIcon} />
                        <span className={styles.logoutText}>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}