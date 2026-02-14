// src/context/NotificationContext.tsx - COMPLETE REAL VERSION
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, Notification, UnreadCountResponse } from '../services/api';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  markNotificationAsRead: (id: number) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  clearNotificationError: () => void;
}

interface NotificationProviderProps {
  children: ReactNode;
  pollInterval?: number; // Optional polling interval in ms
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  pollInterval = 30000 // Default 30 seconds
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert backend status to is_read boolean for frontend compatibility
  const processNotifications = (data: Notification[]): Notification[] => {
    return data.map(notification => ({
      ...notification,
      is_read: notification.status === 'READ',
      // Ensure type field exists for UI (map notification_type to type if needed)
      type: notification.notification_type?.toLowerCase().includes('error') ? 'error' :
            notification.notification_type?.toLowerCase().includes('success') ? 'success' :
            notification.notification_type?.toLowerCase().includes('warning') ? 'warning' : 'info'
    }));
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all notifications
      const data = await api.notifications.getAll();
      setNotifications(processNotifications(data));
      
      // Get unread count
      try {
        const countData = await api.notifications.getUnreadCount();
        setUnreadCount(countData.unread_count);
      } catch (countErr) {
        console.error('Failed to fetch unread count:', countErr);
        // Don't fail the whole operation for count
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (id: number) => {
    try {
      await api.notifications.markAsRead(id);
      
      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, is_read: true, status: 'READ' } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read:', err);
      setError(err instanceof Error ? err.message : 'Failed to mark as read');
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await api.notifications.markAllAsRead();
      
      // Update local state
      setNotifications(prev =>
        prev.map(n => ({ ...n, is_read: true, status: 'READ' }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      setError(err instanceof Error ? err.message : 'Failed to mark all as read');
    }
  };

  const refreshNotifications = () => {
    fetchNotifications();
  };

  const clearNotificationError = () => {
    setError(null);
  };

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    if (pollInterval > 0) {
      const intervalId = setInterval(fetchNotifications, pollInterval);
      return () => clearInterval(intervalId);
    }
  }, [pollInterval]);

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    refreshNotifications,
    clearNotificationError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;