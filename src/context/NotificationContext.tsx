// src/context/NotificationContext.tsx - FIXED VERSION (ADDED CLEANUP)
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '../lib/store/auth'; // Using Zustand store
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
  const [initialFetchDone, setInitialFetchDone] = useState<boolean>(false);
  
  // Get auth state from Zustand store
  const { isAuthenticated, tokens, syncFromLocalStorage } = useAuthStore();

  // Sync tokens from localStorage on mount
  useEffect(() => {
    syncFromLocalStorage();
  }, [syncFromLocalStorage]);

  const fetchNotifications = useCallback(async () => {
    // Get fresh tokens from store
    const { tokens: currentTokens } = useAuthStore.getState();
    
    // Only fetch if authenticated AND token exists
    if (!isAuthenticated || !currentTokens?.access) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Use api.notifications to fetch data
      const data = await api.notifications.getAll();
      setNotifications(data);
      
      // Also fetch unread count
      const countData = await api.notifications.getUnreadCount();
      setUnreadCount(countData.unread_count);
      setInitialFetchDone(true);
    } catch (err: any) {
      // Don't show error for 401 - just ignore
      if (err.status !== 401) {
        console.error('Error fetching notifications:', err);
        setError(err.message || 'Failed to fetch notifications');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // Remove tokens?.access from deps since we get fresh inside

  // Add delay to ensure token is loaded
  useEffect(() => {
    if (isAuthenticated && tokens?.access && !initialFetchDone) {
      // Add small delay to ensure everything is initialized
      const timer = setTimeout(() => {
        fetchNotifications();
      }, 500); // 500ms delay
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, tokens?.access, fetchNotifications, initialFetchDone]);

  // ✅ FIXED: Polling with proper cleanup to prevent memory leaks
  useEffect(() => {
    if (!isAuthenticated || !tokens?.access) return;
    
    console.log('🔄 Starting notification polling every', pollInterval, 'ms');
    
    const interval = setInterval(() => {
      console.log('⏰ Polling notifications...');
      fetchNotifications();
    }, pollInterval);
    
    // ✅ IMPORTANT: Cleanup function to clear interval on unmount
    return () => {
      console.log('🧹 Cleaning up notification polling');
      clearInterval(interval);
    };
  }, [isAuthenticated, tokens?.access, pollInterval, fetchNotifications]);

  const markAsRead = async (id: number) => {
    try {
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