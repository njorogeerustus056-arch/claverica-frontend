// src/context/NotificationContext.tsx - FIXED VERSION WITH useSafePusher
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { useSafePusher } from '../hooks/useSafePusher';  // ✅ IMPORT useSafePusher
import api, { Notification } from '../api';

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
  pollInterval?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  pollInterval = 30000 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialFetchDone, setInitialFetchDone] = useState<boolean>(false);
  
  const { isAuthenticated, tokens, syncFromLocalStorage } = useAuthStore();
  
  // ✅ FIXED: Use SafePusher instead of directly calling usePusher
  const { pusherConnected } = useSafePusher();

  useEffect(() => {
    syncFromLocalStorage();
  }, [syncFromLocalStorage]);

  // Map notification types to UI types
  const mapNotificationType = (type: string): "success" | "warning" | "error" | "info" => {
    if (type.includes('SUCCESS') || type.includes('COMPLETED') || type.includes('APPROVED') || 
        type.includes('CREATED') || type.includes('ACTIVATED') || type.includes('RECEIVED')) {
      return 'success';
    }
    if (type.includes('FAILED') || type.includes('REJECTED') || type.includes('ERROR') || type.includes('CANCELLED')) {
      return 'error';
    }
    if (type.includes('WARNING') || type.includes('EXPIRING') || type.includes('PENDING') || 
        type.includes('LOW') || type.includes('REQUIRED')) {
      return 'warning';
    }
    return 'info';
  };

  // Format notification messages properly based on type
  const formatNotification = (notification: any): Notification => {
    const type = notification.notification_type || '';
    const metadata = notification.metadata || {};
    
    let title = notification.title || 'Notification';
    let message = notification.message || '';
    let actionUrl = notification.action_url || null;
    let priority = notification.priority || 'NORMAL';
    
    // ===== ACCOUNT NOTIFICATIONS =====
    if (type === 'ACCOUNT_CREATED' || type.includes('ACCOUNT_CREATED')) {
      const accountNumber = metadata.account_number || notification.account_number || 'N/A';
      title = '🎉 Welcome to Claverica!';
      message = `Your account ${accountNumber} has been successfully created and is ready to use.`;
      actionUrl = '/dashboard';
    }
    else if (type === 'ACCOUNT_ACTIVATED' || type.includes('ACTIVATED')) {
      const accountNumber = metadata.account_number || notification.account_number || 'N/A';
      title = '✅ Account Activated!';
      message = `Your account ${accountNumber} has been activated. You can now send and receive money.`;
      actionUrl = '/dashboard';
    }
    else if (type === 'PASSWORD_CHANGED') {
      title = '🔐 Password Updated';
      message = 'Your password has been successfully changed.';
    }
    else if (type === 'NEW_LOGIN_DETECTED') {
      title = '⚠️ New Login Detected';
      message = `A new login was detected from ${metadata.location || 'an unknown location'}. If this wasn't you, please secure your account.`;
      priority = 'HIGH';
    }
    
    // ===== WALLET NOTIFICATIONS =====
    else if (type === 'WALLET_CREATED') {
      title = '💰 Wallet Created';
      message = 'Your wallet has been created and is ready for transactions.';
      actionUrl = '/dashboard/wallet';
    }
    else if (type === 'LOW_BALANCE' || type.includes('LOW_BALANCE')) {
      title = '⚠️ Low Balance Alert';
      message = `Your balance is $${metadata.balance || '0.00'}. Please top up to continue making transfers.`;
      actionUrl = '/dashboard/top-up';
      priority = 'HIGH';
    }
    else if (type === 'WALLET_CREDITED') {
      title = '➕ Money Added';
      message = `$${metadata.amount || ''} has been added to your wallet. New balance: $${metadata.new_balance || ''}`;
    }
    else if (type === 'WALLET_DEBITED') {
      title = '➖ Money Sent';
      message = `$${metadata.amount || ''} has been sent from your wallet. New balance: $${metadata.new_balance || ''}`;
    }
    
    // ===== TRANSFER NOTIFICATIONS (Initiated) =====
    else if (type === 'TRANSFER_INITIATED' || type.includes('INITIATED')) {
      title = '🔄 Transfer Initiated';
      message = `Your transfer of $${metadata.amount || ''} to ${metadata.recipient || metadata.recipient_name || 'recipient'} has been started. Please contact live agent for TAC code.`;
      actionUrl = `/dashboard/transfer/status/${notification.related_object_id || ''}`;
    }
    else if (type === 'TAC_SENT' || type.includes('TAC_SENT')) {
      title = '🔐 TAC Code Required';
      message = `A TAC code has been sent for your transfer of $${metadata.amount || ''}. Enter the code to complete your transfer.`;
      actionUrl = `/dashboard/transfer/verify-tac/${notification.related_object_id || ''}`;
      priority = 'HIGH';
    }
    else if (type === 'TAC_VERIFIED' || type.includes('TAC_VERIFIED')) {
      title = '✅ TAC Verified';
      message = `TAC verified successfully. Your transfer is now being processed.`;
      actionUrl = `/dashboard/transfer/status/${notification.related_object_id || ''}`;
    }
    
    // ===== TRANSFER NOTIFICATIONS (Completed/Failed) =====
    else if (type === 'TRANSFER_COMPLETED' || type.includes('COMPLETED')) {
      title = '💸 Transfer Completed';
      message = `Your transfer of $${metadata.amount || ''} to ${metadata.recipient || metadata.recipient_name || 'recipient'} has been completed successfully.`;
      actionUrl = `/dashboard/transfer/status/${notification.related_object_id || ''}`;
    }
    else if (type === 'TRANSFER_FAILED' || type.includes('FAILED')) {
      title = '❌ Transfer Failed';
      message = metadata.reason || metadata.message || 'Your transfer could not be completed. Please try again or contact support.';
      actionUrl = `/dashboard/transfer/status/${notification.related_object_id || ''}`;
      priority = 'HIGH';
    }
    else if (type === 'TRANSFER_CANCELLED' || type.includes('CANCELLED')) {
      title = '🚫 Transfer Cancelled';
      message = `Your transfer of $${metadata.amount || ''} has been cancelled. No funds were deducted.`;
      actionUrl = `/dashboard/transfer/history`;
    }
    
    // ===== MONEY RECEIVED NOTIFICATIONS (Incoming) =====
    else if (type === 'MONEY_RECEIVED' || type === 'DEPOSIT_RECEIVED' || type.includes('RECEIVED')) {
      title = '📥 Money Received!';
      message = `You received $${metadata.amount || ''} from ${metadata.sender || metadata.recipient_name || metadata.from || 'a sender'}.`;
      actionUrl = '/dashboard/transactions';
    }
    else if (type === 'LARGE_DEPOSIT' || type.includes('LARGE')) {
      title = '💰 Large Deposit Alert';
      message = `You received a large deposit of $${metadata.amount || ''}. Your new balance is $${metadata.new_balance || ''}.`;
      actionUrl = '/dashboard/transactions';
      priority = 'HIGH';
    }
    else if (type === 'INTERNATIONAL_TRANSFER' || type.includes('INTERNATIONAL')) {
      title = '🌍 International Transfer Received';
      message = `You received $${metadata.amount || ''} ${metadata.currency || 'USD'} from ${metadata.country || 'abroad'}.`;
      actionUrl = '/dashboard/transactions';
    }
    
    // ===== KYC NOTIFICATIONS =====
    else if (type === 'KYC_SUBMITTED' || type.includes('KYC_SUBMITTED')) {
      title = '📋 KYC Submitted';
      message = 'Your documents have been submitted for review. You will be notified once verified.';
      actionUrl = '/dashboard/kyc/status';
    }
    else if (type === 'KYC_APPROVED' || type.includes('KYC_APPROVED')) {
      title = '✅ KYC Verified!';
      message = 'Your identity has been verified. You now have unlimited transfers and higher limits!';
      actionUrl = '/dashboard';
    }
    else if (type === 'KYC_REJECTED' || type.includes('KYC_REJECTED')) {
      title = '⚠️ KYC Verification Failed';
      message = metadata.reason || 'Please resubmit your documents for verification.';
      actionUrl = '/dashboard/kyc/submit';
      priority = 'HIGH';
    }
    else if (type === 'KYC_PENDING' || type.includes('KYC_PENDING')) {
      title = '⏳ KYC Under Review';
      message = 'Your documents are being reviewed. This usually takes 24-48 hours.';
      actionUrl = '/dashboard/kyc/status';
    }
    
    // ===== ADMIN/COMPLIANCE NOTIFICATIONS =====
    else if (type === 'ADMIN_TAC_REQUIRED' || type.includes('TAC_REQUIRED')) {
      title = '🔐 TAC Required for Transfer';
      message = `Transfer #${metadata.transfer_id || ''} requires TAC verification. Please provide TAC code to proceed.`;
      actionUrl = `/admin/transfers/${metadata.transfer_id || ''}`;
      priority = 'HIGH';
      metadata.requires_admin_action = true;
    }
    else if (type === 'ADMIN_KYC_REVIEW' || type.includes('KYC_REVIEW')) {
      title = '📋 KYC Review Required';
      message = `New KYC submission from ${metadata.user || ''} requires review.`;
      actionUrl = '/admin/kyc/pending';
      priority = 'MEDIUM';
      metadata.requires_admin_action = true;
    }
    else if (type === 'ADMIN_LARGE_TRANSFER' || type.includes('LARGE_TRANSFER')) {
      title = '💰 Large Transfer Alert';
      message = `Transfer of $${metadata.amount || ''} from ${metadata.user || ''} requires approval.`;
      actionUrl = '/admin/transfers/pending';
      priority = 'HIGH';
      metadata.requires_admin_action = true;
    }
    else if (type === 'ADMIN_SUSPICIOUS' || type.includes('SUSPICIOUS')) {
      title = '🚨 Suspicious Activity Detected';
      message = metadata.message || 'Please review recent account activity.';
      actionUrl = '/admin/alerts';
      priority = 'URGENT';
      metadata.requires_admin_action = true;
    }
    
    // ===== SYSTEM NOTIFICATIONS =====
    else if (type === 'SYSTEM_MAINTENANCE') {
      title = '🔧 System Maintenance';
      message = metadata.message || 'Scheduled maintenance in 1 hour. Some features may be unavailable.';
      priority = 'HIGH';
    }
    else if (type === 'FEATURE_UPDATE') {
      title = '✨ New Feature Available';
      message = metadata.message || 'Check out our latest features!';
      actionUrl = '/whats-new';
    }
    
    return {
      id: notification.id,
      title,
      message,
      type: mapNotificationType(type),
      created_at: notification.created_at || new Date().toISOString(),
      is_read: notification.status === 'READ' || notification.is_read === true,
      metadata: metadata,
      priority: priority,
      action_url: actionUrl,
      requires_action: metadata.requires_admin_action || false
    };
  };

  const fetchNotifications = useCallback(async () => {
    const { tokens: currentTokens } = useAuthStore.getState();
    
    if (!isAuthenticated || !currentTokens?.access) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await api.notifications.getAll();
      const formattedNotifications = data.map(formatNotification);
      setNotifications(formattedNotifications);
      
      const countData = await api.notifications.getUnreadCount();
      setUnreadCount(countData.unread_count);
      setInitialFetchDone(true);
    } catch (err: any) {
      if (err.status !== 401) {
        console.error('Error fetching notifications:', err);
        setError(err.message || 'Failed to fetch notifications');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && tokens?.access && !initialFetchDone) {
      const timer = setTimeout(() => {
        fetchNotifications();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, tokens?.access, fetchNotifications, initialFetchDone]);

  // ✅ FIXED: Polling with Pusher awareness
  useEffect(() => {
    if (!isAuthenticated || !tokens?.access) return;
    
    const intervalTime = pusherConnected ? 60000 : pollInterval;
    
    console.log(`🔄 Starting notification polling every ${intervalTime}ms (Pusher: ${pusherConnected ? 'connected' : 'disconnected'})`);
    
    const interval = setInterval(() => {
      console.log('⏰ Polling notifications...');
      fetchNotifications();
    }, intervalTime);
    
    return () => {
      console.log('🧹 Cleaning up notification polling');
      clearInterval(interval);
    };
  }, [isAuthenticated, tokens?.access, pollInterval, fetchNotifications, pusherConnected]);

  const markAsRead = async (id: number) => {
    try {
      await api.notifications.markAsRead(id);
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