// src/pages/Dashboard/Notifications.tsx - FIXED VERSION WITH REAL API
import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import api from '../../services/api'; // ✅ ADDED: Real API import

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

  // ✅ FIXED: Fetch real notification preferences from API
  const fetchPreferences = async () => {
    try {
      const response = await api.notifications.getPreferences();
      setPreferences(response);
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
    }
  };

  // ✅ FIXED: Update preferences using real API
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
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your notification preferences and view your notification history
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchNotifications}
              className="text-sm text-red-700 dark:text-red-300 hover:text-red-900"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Preferences */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Notification Settings
            </h2>

            {/* Email Notifications */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
              </div>
              
              <div className="space-y-4 pl-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences?.email_enabled || false}
                      onChange={(e) => updatePreference('email_enabled', e.target.checked)}
                      disabled={savingPreferences}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                {preferences?.email_enabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">High Priority</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.email_high_priority || false}
                          onChange={(e) => updatePreference('email_high_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Medium Priority</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.email_medium_priority || false}
                          onChange={(e) => updatePreference('email_medium_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Low Priority</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.email_low_priority || false}
                          onChange={(e) => updatePreference('email_low_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Push Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
              </div>
              
              <div className="space-y-4 pl-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Push Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences?.push_enabled || false}
                      onChange={(e) => updatePreference('push_enabled', e.target.checked)}
                      disabled={savingPreferences}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                {preferences?.push_enabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">High Priority</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.push_high_priority || false}
                          onChange={(e) => updatePreference('push_high_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Medium Priority</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.push_medium_priority || false}
                          onChange={(e) => updatePreference('push_medium_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Low Priority</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.push_low_priority || false}
                          onChange={(e) => updatePreference('push_low_priority', e.target.checked)}
                          disabled={savingPreferences}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Saving indicator */}
            {savingPreferences && (
              <div className="mt-4 text-sm text-teal-600 dark:text-teal-400 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
                Saving preferences...
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Notification History */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Header with tabs and actions */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'all'
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('unread')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'unread'
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchNotifications}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Refresh
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => setShowMarkAllConfirm(true)}
                      className="px-4 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4">Loading notifications...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                      !notification.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          notification.type === 'success'
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : notification.type === 'warning'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30'
                            : notification.type === 'error'
                            ? 'bg-red-100 dark:bg-red-900/30'
                            : 'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.is_read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            notification.type === 'success'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : notification.type === 'warning'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : notification.type === 'error'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Mark all as read?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This will mark all {unreadCount} unread notifications as read. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowMarkAllConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  markAllAsRead();
                  setShowMarkAllConfirm(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
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