// src/pages/Dashboard/Notifications.tsx - WITH CSS MODULE
import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import api from '../../api';
import styles from './Notifications.module.css'; // ✅ Using CSS Module

// Add missing interface
interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  created_at: string;
  is_read: boolean;
}

interface NotificationPreference {
  id: number;
  account: number;
  account_number?: string;
  email_enabled: boolean;
  email_high_priority: boolean;
  email_medium_priority: boolean;
  email_low_priority: boolean;
  push_enabled: boolean;
  push_high_priority: boolean;
  push_medium_priority: boolean;
  push_low_priority: boolean;
  in_app_enabled?: boolean;
  receive_payment_notifications?: boolean;
  receive_transfer_notifications?: boolean;
  receive_tac_notifications?: boolean;
  receive_account_notifications?: boolean;
  receive_admin_notifications?: boolean;
  immediate_delivery?: boolean;
  daily_digest?: boolean;
  digest_time?: string;
  created_at: string;
  updated_at: string;
}

export default function NotificationsPage() {
  // Use the correct hook name
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
  } = useNotifications();

  const [preferences, setPreferences] = useState<NotificationPreference | null>(null);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [showMarkAllConfirm, setShowMarkAllConfirm] = useState(false);

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications;

  // Fetch real notification preferences from API
  const fetchPreferences = async () => {
    try {
      const response = await api.notifications.getPreferences();
      setPreferences(response);
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
    }
  };

  // Update preferences using real API
  const updatePreference = async (key: keyof NotificationPreference, value: boolean) => {
    if (!preferences) return;

    setSavingPreferences(true);
    try {
      const updatedPrefs = { ...preferences, [key]: value };
      await api.notifications.updatePreferences(updatedPrefs);
      setPreferences(updatedPrefs);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      // Re-fetch to ensure UI is in sync
      fetchPreferences();
    } finally {
      setSavingPreferences(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className={styles.textSuccess} />;
      case "warning":
        return <AlertCircle className={styles.textWarning} />;
      case "error":
        return <XCircle className={styles.textError} />;
      default:
        return <Bell className={styles.textInfo} />;
    }
  };

  const getIconWrapperClass = (type: string) => {
    switch (type) {
      case "success": return styles.successIcon;
      case "warning": return styles.warningIcon;
      case "error": return styles.errorIcon;
      default: return styles.infoIcon;
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "success": return styles.typeSuccess;
      case "warning": return styles.typeWarning;
      case "error": return styles.typeError;
      default: return styles.typeInfo;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.subtitle}>
          Manage your notification preferences and view your notification history
        </p>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          <p className={styles.errorMessage}>{error}</p>
          <button
            onClick={fetchNotifications}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {/* Left Column: Preferences */}
        <div>
          <div className={styles.preferencesCard}>
            <h2 className={styles.preferencesTitle}>Notification Settings</h2>

            {/* Email Notifications */}
            <div className={styles.preferencesSection}>
              <div className={styles.sectionHeader}>
                <Mail className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Email Notifications</h3>
              </div>
              
              <div className={styles.preferencesList}>
                <div className={styles.preferenceItem}>
                  <span className={styles.preferenceLabel}>Enable Email Notifications</span>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={preferences?.email_enabled || false}
                      onChange={(e) => updatePreference('email_enabled', e.target.checked)}
                      disabled={savingPreferences}
                      className={styles.toggleInput}
                    />
                    <span className={styles.toggleTrack}>
                      <span className={styles.toggleThumb}></span>
                    </span>
                  </label>
                </div>

                {preferences?.email_enabled && (
                  <>
                    <div className={styles.preferenceItem}>
                      <span className={styles.preferenceLabel}>High Priority</span>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={preferences?.email_high_priority || false}
                          onChange={(e) => updatePreference('email_high_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb}></span>
                        </span>
                      </label>
                    </div>

                    <div className={styles.preferenceItem}>
                      <span className={styles.preferenceLabel}>Medium Priority</span>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={preferences?.email_medium_priority || false}
                          onChange={(e) => updatePreference('email_medium_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb}></span>
                        </span>
                      </label>
                    </div>

                    <div className={styles.preferenceItem}>
                      <span className={styles.preferenceLabel}>Low Priority</span>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={preferences?.email_low_priority || false}
                          onChange={(e) => updatePreference('email_low_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb}></span>
                        </span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Push Notifications */}
            <div className={styles.preferencesSection}>
              <div className={styles.sectionHeader}>
                <Smartphone className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Push Notifications</h3>
              </div>
              
              <div className={styles.preferencesList}>
                <div className={styles.preferenceItem}>
                  <span className={styles.preferenceLabel}>Enable Push Notifications</span>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={preferences?.push_enabled || false}
                      onChange={(e) => updatePreference('push_enabled', e.target.checked)}
                      disabled={savingPreferences}
                      className={styles.toggleInput}
                    />
                    <span className={styles.toggleTrack}>
                      <span className={styles.toggleThumb}></span>
                    </span>
                  </label>
                </div>

                {preferences?.push_enabled && (
                  <>
                    <div className={styles.preferenceItem}>
                      <span className={styles.preferenceLabel}>High Priority</span>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={preferences?.push_high_priority || false}
                          onChange={(e) => updatePreference('push_high_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb}></span>
                        </span>
                      </label>
                    </div>

                    <div className={styles.preferenceItem}>
                      <span className={styles.preferenceLabel}>Medium Priority</span>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={preferences?.push_medium_priority || false}
                          onChange={(e) => updatePreference('push_medium_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb}></span>
                        </span>
                      </label>
                    </div>

                    <div className={styles.preferenceItem}>
                      <span className={styles.preferenceLabel}>Low Priority</span>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={preferences?.push_low_priority || false}
                          onChange={(e) => updatePreference('push_low_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                          <span className={styles.toggleThumb}></span>
                        </span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Saving indicator */}
            {savingPreferences && (
              <div className={styles.savingIndicator}>
                <div className={styles.spinner}></div>
                Saving preferences...
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Notification History */}
        <div>
          <div className={styles.notificationsCard}>
            {/* Header with tabs and actions */}
            <div className={styles.cardHeader}>
              <div className={styles.tabContainer}>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
                >
                  All Notifications
                </button>
                <button
                  onClick={() => setActiveTab('unread')}
                  className={`${styles.tabButton} ${activeTab === 'unread' ? styles.activeTab : ''}`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              <div className={styles.actionContainer}>
                <button
                  onClick={fetchNotifications}
                  disabled={loading}
                  className={`${styles.actionButton} ${styles.refreshButton}`}
                >
                  Refresh
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setShowMarkAllConfirm(true)}
                    className={`${styles.actionButton} ${styles.markAllButton}`}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className={styles.notificationsList}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSpinner}></div>
                  <p className={styles.loadingText}>Loading notifications...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className={styles.emptyContainer}>
                  <Bell className={styles.emptyIcon} />
                  <p className={styles.emptyText}>
                    {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${!notification.is_read ? styles.unreadItem : ''}`}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.iconContainer}>
                        <div className={`${styles.iconWrapper} ${getIconWrapperClass(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <div className={styles.notificationBody}>
                        <div className={styles.notificationHeader}>
                          <h4 className={styles.notificationTitle}>
                            {notification.title}
                          </h4>
                          {!notification.is_read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className={styles.markReadButton}
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                        <p className={styles.notificationMessage}>
                          {notification.message}
                        </p>
                        <div className={styles.notificationFooter}>
                          <span className={`${styles.typeBadge} ${getTypeBadgeClass(notification.type)}`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          <span className={styles.timestamp}>
                            {new Date(notification.created_at).toLocaleDateString()} at{' '}
                            {new Date(notification.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mark All Confirm Modal */}
      {showMarkAllConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Mark all as read?</h3>
            <p className={styles.modalText}>
              This will mark all {unreadCount} unread notifications as read. This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowMarkAllConfirm(false)}
                className={styles.modalCancelButton}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  markAllAsRead();
                  setShowMarkAllConfirm(false);
                }}
                className={styles.modalConfirmButton}
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}