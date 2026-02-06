// src/context/NotificationContext.tsx - CLEANED VERSION
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { NotificationService, FrontendNotification } from '../lib/services/notificationService';

interface NotificationContextType {
  notifications: FrontendNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshUnreadCount: () => Promise<void>;
  clearError: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
  pollInterval?: number; // Increased to reduce spam
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  pollInterval = 30000, // ⬅️ CHANGED: 30 seconds instead of 10
}) => {
  const [notifications, setNotifications] = useState<FrontendNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, tokens } = useAuthStore();

  const fetchNotifications = async () => {
    if (!isAuthenticated || !tokens?.access) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await NotificationService.getNotifications();
      setNotifications(data);
      const unread = data.filter(n => !n.is_read).length;
      setUnreadCount(unread);
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Notification fetch error:', err);
      }
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const refreshUnreadCount = async () => {
    if (!isAuthenticated || !tokens?.access) {
      setUnreadCount(0);
      return;
    }

    try {
      const count = await NotificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      // Silent fail for unread count refresh
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unread count refresh failed:', err);
      }
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await NotificationService.markAsRead(id);
      
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err: any) {
      setError(err.message || 'Failed to mark as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true }))
      );
      
      setUnreadCount(0);
    } catch (err: any) {
      setError(err.message || 'Failed to mark all as read');
    }
  };

  const clearError = () => setError(null);

  // Single useEffect for polling - no double fetching
  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Initial fetch
    fetchNotifications();

    // Set up polling with reduced frequency
    const interval = setInterval(() => {
      refreshUnreadCount();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [isAuthenticated, pollInterval]); // Only dependencies needed

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    refreshUnreadCount,
    clearError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook for easy access
export const useNotifications = () => {
  const context = useNotificationContext();
  
  return {
    notifications: context.notifications,
    unreadCount: context.unreadCount,
    loading: context.loading,
    error: context.error,
    markNotificationAsRead: context.markAsRead,
    markAllNotificationsAsRead: context.markAllAsRead,
    refreshNotifications: context.fetchNotifications,
    clearNotificationError: context.clearError,
  };
};