// src/context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '../lib/store/auth';
import api, { Notification } from '../services/api';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  pollInterval?: number; // in milliseconds
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  pollInterval = 30000 // default 30 seconds
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated, tokens } = useAuthStore();

  const fetchNotifications = useCallback(async () => {
    // Only fetch if authenticated AND token exists
    if (!isAuthenticated || !tokens?.access) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // ✅ FIXED: Use api.notifications instead of notificationAPI
      const data = await api.notifications.getAll();
      setNotifications(data);
      
      // Also fetch unread count
      const countData = await api.notifications.getUnreadCount();
      setUnreadCount(countData.unread_count);
    } catch (err: any) {
      // Don't show error for 401 - just ignore
      if (err.status !== 401) {
        console.error('Error fetching notifications:', err);
        setError(err.message || 'Failed to fetch notifications');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, tokens?.access]);

  // Add delay to ensure token is loaded
  useEffect(() => {
    if (isAuthenticated && tokens?.access) {
      // Add small delay to ensure everything is initialized
      const timer = setTimeout(() => {
        fetchNotifications();
      }, 500); // 500ms delay
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, tokens?.access, fetchNotifications]);

  // Polling for updates (only when authenticated)
  useEffect(() => {
    if (!isAuthenticated || !tokens?.access) return;
    
    const interval = setInterval(() => {
      fetchNotifications();
    }, pollInterval);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, tokens?.access, pollInterval, fetchNotifications]);

  const markAsRead = async (id: number) => {
    try {
      // ✅ FIXED: Use api.notifications instead of notificationAPI
      await api.notifications.markAsRead(id);
      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, status: 'READ', is_read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      // ✅ FIXED: Use api.notifications instead of notificationAPI
      await api.notifications.markAllAsRead();
      // Update local state
      setNotifications(prev =>
        prev.map(n => ({ ...n, status: 'READ', is_read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};