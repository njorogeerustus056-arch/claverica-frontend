"use client";

import { useState, useEffect } from "react";
import { Bell, Search, CheckCircle, User, LogOut, ChevronDown, CreditCard, Wallet } from "lucide-react";
import { useAuthStore } from "../lib/store/auth";
import { useNavigate } from "react-router-dom";
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
}

export default function DashboardHeader({ toggleSidebar }: Props) {
  const { user, tokens, logout } = useAuthStore();
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/wallet/balance/`, {
        headers: { 'Authorization': `Bearer ${tokens?.access}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      if (!tokens?.access) {
        setNotifications([]);
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${API_URL}/notifications/`, {
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        
        let notificationsArray: any[] = [];
        
        if (Array.isArray(data)) {
          notificationsArray = data;
        } else if (data && typeof data === 'object') {
          notificationsArray = data.results || data.notifications || [];
        }
        
        const transformed = notificationsArray.map((notif: any) => ({
          id: notif.id,
          title: notif.title,
          message: notif.message,
          type: mapNotificationType(notif.notification_type),
          created_at: notif.created_at,
          is_read: notif.status === 'READ'
        }));
        
        setNotifications(transformed);
        setUnreadCount(transformed.filter((n: Notification) => !n.is_read).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapNotificationType = (backendType: string): "success" | "warning" | "error" | "info" => {
    const typeMap: Record<string, "success" | "warning" | "error" | "info"> = {
      'PAYMENT_RECEIVED': 'success',
      'TRANSFER_COMPLETED': 'success',
      'KYC_APPROVED': 'success',
      'TRANSFER_FAILED': 'error',
      'KYC_REJECTED': 'error',
      'ADMIN_TAC_REQUIRED': 'warning',
      'ADMIN_KYC_REVIEW_REQUIRED': 'warning',
      'TAC_SENT': 'info',
      'KYC_SUBMITTED': 'info',
    };
    return typeMap[backendType] || 'info';
  };

  const markAsRead = async (notificationId: number) => {
    try {
      if (!tokens?.access) return;
      
      const response = await fetch(`${API_URL}/notifications/mark-read/${notificationId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
        },
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      if (!tokens?.access) return;
      
      const response = await fetch(`${API_URL}/notifications/mark-all-read/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
        },
      });
      
      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchBalance();
  }, []);

  useEffect(() => {
    if (notificationOpen) {
      fetchNotifications();
    }
  }, [notificationOpen]);

  const formatBalance = () => {
    if (balance === null) return 'Loading...';
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
            
            {/* Real Balance Display */}
            <div className={`${styles.balanceContainer} ${styles.desktopOnly}`}>
              <Wallet className={styles.balanceIcon} />
              <span className={styles.balanceLabel}>Balance:</span>
              <span className={styles.balanceAmount}>
                {formatBalance()}
              </span>
            </div>
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
            
            {/* Real Notifications */}
            <div className={styles.notificationWrapper}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className={styles.actionButton}
                disabled={loading}
              >
                <Bell className={styles.icon} />
                {unreadCount > 0 && (
                  <span className={styles.notificationBadge}></span>
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
                            onClick={markAllAsRead}
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
                      ) : notifications.length === 0 ? (
                        <div className={styles.emptyState}>
                          <Bell className={styles.emptyIcon} />
                          <p className={styles.emptyText}>No notifications</p>
                        </div>
                      ) : (
                        notifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={getNotificationItemClass(notification.is_read)}
                            onClick={() => !notification.is_read && markAsRead(notification.id)}
                          >
                            <div className={styles.notificationContent}>
                              <div className={`${styles.notificationIndicator} ${getNotificationIndicatorClass(notification.type)}`} />
                              <div className={styles.notificationDetails}>
                                <p className={styles.notificationTitle}>
                                  {notification.title}
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
                    
                    {notifications.length > 5 && (
                      <div className={styles.dropdownFooter}>
                        <button 
                          onClick={() => navigate('/dashboard/notifications')}
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

            {/* Real User Profile */}
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





