"use client";

import { useState, useEffect } from "react";
import { Bell, Search, CheckCircle, User, LogOut, ChevronDown, CreditCard, Wallet, RefreshCw, X } from "lucide-react";
import { useAuthStore } from "../lib/store/auth";
import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import styles from './DashboardHeader.module.css';

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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch balance
  const fetchBalance = async () => {
    if (!isAuthenticated || !tokens?.access) return;
    
    setRefreshing(true);
    try {
      const response = await fetch('https://claverica-backend-production.up.railway.app/api/transactions/wallet/balance/', {
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const balanceValue = parseFloat(data.balance || "0");
      setBalance(balanceValue);
      
      // Show success state briefly
      setTimeout(() => setRefreshing(false), 500);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance(0);
      setRefreshing(false);
    }
  };

  // Map notification types
  const mapNotificationType = (notification: any): "success" | "warning" | "error" | "info" => {
    const type = notification.notification_type || '';
    const priority = notification.priority || '';
    
    if (type.includes('PAYMENT') || type.includes('DEPOSIT') || type.includes('CREDIT') || type.includes('TRANSFER_COMPLETED')) {
      return 'success';
    }
    if (type.includes('TRANSFER_FAILED')) return 'error';
    if (type.includes('TAC_SENT') || type.includes('KYC_SUBMITTED')) return 'info';
    if (type.includes('TAC_VERIFIED')) return 'success';
    if (type.includes('TAC_EXPIRED') || type.includes('KYC_REVIEW')) return 'warning';
    if (type.includes('KYC_APPROVED')) return 'success';
    if (type.includes('KYC_REJECTED')) return 'error';
    if (priority === 'HIGH') return 'warning';
    if (priority === 'MEDIUM') return 'info';
    
    return 'info';
  };

  // Transform notifications
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

  // Fetch balance when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBalance();
    } else {
      setBalance(null);
    }
    setLoading(false);
  }, [isAuthenticated, tokens?.access]);

  // Fetch notifications when opening dropdown
  useEffect(() => {
    if (notificationOpen && isAuthenticated) {
      fetchNotifications();
    }
  }, [notificationOpen, fetchNotifications, isAuthenticated]);

  const formatBalance = () => {
    if (balance === null) return '---';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(balance);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getNotificationIcon = (type: string, notification: any) => {
    const metadata = notification.metadata || {};
    if (type.includes('tac')) return '🔐';
    if (type.includes('transfer')) return '💸';
    if (type.includes('payment')) return '💰';
    if (type.includes('kyc')) return '📋';
    if (type.includes('wallet')) return '👛';
    if (type.includes('admin')) return '⚙️';
    if (notification.requires_action) return '⚠️';
    return '📌';
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          
          {/* Left Section - Menu + Balance */}
          <div className={styles.leftSection}>
            <button
              onClick={toggleSidebar}
              className={styles.menuButton}
              aria-label="Toggle sidebar"
            >
              <div className={styles.menuIcon}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            
            {/* Balance Display - Desktop */}
            {isAuthenticated && (
              <div className={`${styles.balanceContainer} ${styles.desktopOnly}`}>
                <div className={styles.balanceContent}>
                  <Wallet className={styles.balanceIcon} />
                  <div className={styles.balanceInfo}>
                    <span className={styles.balanceLabel}>Total Balance</span>
                    <span className={styles.balanceAmount}>
                      {formatBalance()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={fetchBalance}
                  className={`${styles.refreshButton} ${refreshing ? styles.refreshing : ''}`}
                  title="Refresh balance"
                  disabled={refreshing}
                >
                  <RefreshCw className={styles.refreshIcon} />
                </button>
              </div>
            )}
          </div>

          {/* Center - Search Desktop */}
          <div className={`${styles.searchContainer} ${styles.desktopOnly}`}>
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

          {/* Mobile Search Toggle */}
          <button 
            className={`${styles.mobileSearchToggle} ${styles.mobileOnly}`}
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <Search className={styles.icon} />
          </button>

          {/* Right Actions */}
          <div className={styles.rightActions}>
            
            {/* Balance Pill - Mobile */}
            {isAuthenticated && (
              <div className={`${styles.mobileBalance} ${styles.mobileOnly}`}>
                <span className={styles.mobileBalanceAmount}>{formatBalance()}</span>
              </div>
            )}
            
            {/* Notifications */}
            {isAuthenticated && (
              <div className={styles.notificationWrapper}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className={`${styles.actionButton} ${notificationOpen ? styles.active : ''}`}
                  disabled={loading}
                >
                  <Bell className={styles.icon} />
                  {unreadCount > 0 && (
                    <span className={styles.notificationBadge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
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
                              className={`${styles.notificationItem} ${!notification.is_read ? styles.unread : ''}`}
                              onClick={() => {
                                if (!notification.is_read) {
                                  markAsRead(notification.id);
                                }
                                if (notification.action_url) {
                                  navigate(notification.action_url);
                                  setNotificationOpen(false);
                                }
                              }}
                            >
                              <div className={styles.notificationContent}>
                                <div className={`${styles.notificationIndicator} ${styles[`type${notification.type}`]}`}>
                                  <span>{getNotificationIcon(notification.type, notification)}</span>
                                </div>
                                <div className={styles.notificationDetails}>
                                  <div className={styles.notificationHeader}>
                                    <p className={styles.notificationTitle}>
                                      {notification.title}
                                    </p>
                                    <span className={styles.notificationTime}>
                                      {getTimeAgo(notification.created_at)}
                                    </span>
                                  </div>
                                  <p className={styles.notificationMessage}>
                                    {notification.message}
                                  </p>
                                  {notification.priority === 'HIGH' && (
                                    <span className={styles.priorityBadge}>Urgent</span>
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
                className={`${styles.userButton} ${userMenuOpen ? styles.active : ''}`}
              >
                <div className={styles.avatar}>
                  <span className={styles.avatarText}>
                    {user?.first_name?.[0] || 'U'}{user?.last_name?.[0] || 'S'}
                  </span>
                  <span className={styles.onlineIndicator}></span>
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
                            {user?.first_name} {user?.last_name || 'User'}
                          </h4>
                          <p className={styles.userAccount}>
                            {user?.account_number || '•••• •••• •••• ••••'}
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

      {/* Mobile Search Bar - Slide Down */}
      {mobileSearchOpen && (
        <div className={styles.mobileSearchBar}>
          <div className={styles.mobileSearchWrapper}>
            <Search className={styles.mobileSearchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions, contacts..."
              className={styles.mobileSearchInput}
              autoFocus
            />
            <button 
              className={styles.mobileSearchClose}
              onClick={() => setMobileSearchOpen(false)}
            >
              <X className={styles.icon} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}