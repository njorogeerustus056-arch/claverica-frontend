// src/lib/services/notificationService.ts - FIXED VERSION (REMOVED DUPLICATE HOOK)
import { api, Notification } from '../../api';
import { useAuthStore } from '../store/auth';

export interface FrontendNotification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  created_at: string;
  is_read: boolean;
  metadata?: Record<string, any>;
}

export class NotificationService {
  // Map backend notification_type to frontend type
  private static mapNotificationType(backendType: string): 'success' | 'warning' | 'error' | 'info' {
    const typeMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      'PAYMENT_RECEIVED': 'success',
      'TRANSFER_COMPLETED': 'success',
      'KYC_APPROVED': 'success',
      'TAC_SENT': 'info',
      'KYC_SUBMITTED': 'info',
      'TRANSFER_INITIATED': 'info',
      'TRANSFER_FAILED': 'error',
      'KYC_REJECTED': 'error',
      'ADMIN_TAC_REQUIRED': 'warning',
      'ADMIN_KYC_REVIEW_REQUIRED': 'warning',
      'ADMIN_SETTLEMENT_REQUIRED': 'warning',
    };
    return typeMap[backendType] || 'info';
  }

  // Transform backend notification to frontend format - FIXED WITH NULL CHECK
  private static transformNotification(notification: any): FrontendNotification {
    // ✅ FIX: Check for null/undefined notification object
    if (!notification || typeof notification !== 'object') {
      console.warn('Received invalid notification object:', notification);
      return {
        id: Date.now(),
        title: 'Invalid Notification',
        message: 'This notification could not be loaded',
        type: 'info',
        created_at: new Date().toISOString(),
        is_read: true,
        metadata: {}
      };
    }
    
    // ✅ FIX: Provide default values for missing properties
    return {
      id: notification.id || Date.now(),
      title: notification.title || 'Notification',
      message: notification.message || 'New update',
      type: this.mapNotificationType(notification.notification_type || 'INFO'),
      created_at: notification.created_at || new Date().toISOString(),
      is_read: notification.status === 'READ',
      metadata: notification.metadata || {},
    };
  }

  // Get all notifications - FIXED WITH PROPER HANDLING
  static async getNotifications(): Promise<FrontendNotification[]> {
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        console.warn('No auth token available for notifications');
        return [];
      }
      
      // Call the API
      const data = await api.notifications.getAll();
      
      console.log('🔍 Notification API response:', data);
      
      // ✅ FIX: Handle different response formats (Django REST Framework)
      let notificationsArray: any[] = [];
      
      if (Array.isArray(data)) {
        notificationsArray = data;
      } else if (data && typeof data === 'object') {
        // Django REST Framework paginated response
        notificationsArray = data.results || data.notifications || data.data || [];
      }
      
      console.log(`📊 Processing ${notificationsArray.length} notifications`);
      
      // ✅ FIX: Filter out null/undefined/invalid objects
      const validNotifications = notificationsArray.filter(
        notification => notification && notification.id
      );
      
      console.log(`✅ Found ${validNotifications.length} valid notifications`);
      
      // ✅✅✅ CRITICAL FIX: Use arrow function to preserve 'this' context
      return validNotifications.map(notif => this.transformNotification(notif));
      
    } catch (error: any) {
      console.error('Failed to fetch notifications:', error);
      
      // Handle 401 specifically - don't throw, just return empty
      if (error.response?.status === 401) {
        console.warn('Not authorized to fetch notifications');
        return [];
      }
      
      // For other errors, return empty array instead of crashing
      return [];
    }
  }

  // Get unread notifications only - FIXED VERSION
  static async getUnreadNotifications(): Promise<FrontendNotification[]> {
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        console.warn('No auth token available for unread notifications');
        return [];
      }
      
      const data = await api.notifications.getUnread();
      
      // Handle different response formats
      let notificationsArray: any[] = [];
      
      if (Array.isArray(data)) {
        notificationsArray = data;
      } else if (data && typeof data === 'object') {
        notificationsArray = data.results || data.notifications || data.data || [];
      }
      
      // Filter out invalid objects
      const validNotifications = notificationsArray.filter(
        notification => notification && notification.id
      );
      
      // ✅ FIX: Use arrow function to preserve 'this' context
      return validNotifications.map(notif => this.transformNotification(notif));
      
    } catch (error: any) {
      console.error('Failed to fetch unread notifications:', error);
      
      if (error.response?.status === 401) {
        return [];
      }
      
      return [];
    }
  }

  // Get unread count for badge - WITH DEBUG LOGGING
  static async getUnreadCount(): Promise<number> {
    console.log('🔍 [DEBUG] getUnreadCount() called at:', new Date().toISOString());
    
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        console.log('⚠️ [DEBUG] No auth token available');
        return 0;
      }
      
      console.log('📞 [DEBUG] Calling API for unread count...');
      console.log('🔑 [DEBUG] Token exists, calling endpoint...');
      
      const result = await api.notifications.getUnreadCount();
      console.log('✅ [DEBUG] API Response received:', result);
      console.log('📋 [DEBUG] Response type:', typeof result);
      
      // Handle different response formats
      if (typeof result === 'object' && 'unread_count' in result) {
        const count = result.unread_count || 0;
        console.log(`📊 [DEBUG] Unread count (direct): ${count}`);
        return count;
      } else if (typeof result === 'number') {
        console.log(`📊 [DEBUG] Unread count (number): ${result}`);
        return result;
      } else if (result && typeof result === 'object') {
        const count = result.data?.unread_count || result.result?.unread_count || 0;
        console.log(`📊 [DEBUG] Unread count (nested): ${count}`);
        return count;
      } else {
        console.warn('⚠️ [DEBUG] Unexpected response format:', result);
        console.warn('⚠️ [DEBUG] Full response:', JSON.stringify(result, null, 2));
        return 0;
      }
    } catch (error: any) {
      console.error('❌ [DEBUG] Failed to fetch unread count:', error);
      console.error('❌ [DEBUG] Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.status === 401) {
        console.log('🔒 [DEBUG] Not authorized (401)');
        return 0;
      }
      
      console.error('❌ [DEBUG] Stack trace:', error.stack);
      return 0;
    }
  }

  // Mark single notification as read
  static async markAsRead(notificationId: number): Promise<boolean> {
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        console.warn('No auth token available to mark notification as read');
        return false;
      }
      
      await api.notifications.markAsRead(notificationId);
      return true;
    } catch (error: any) {
      console.error('Failed to mark notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read
  static async markAllAsRead(): Promise<boolean> {
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        console.warn('No auth token available to mark all notifications as read');
        return false;
      }
      
      await api.notifications.markAllAsRead();
      return true;
    } catch (error: any) {
      console.error('Failed to mark all notifications as read:', error);
      return false;
    }
  }

  // Get notification preferences
  static async getPreferences() {
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        throw new Error('Not authenticated');
      }
      
      return await api.notifications.getPreferences();
    } catch (error: any) {
      console.error('Failed to fetch preferences:', error);
      throw error;
    }
  }

  // Update notification preferences
  static async updatePreferences(data: any): Promise<boolean> {
    try {
      const { tokens } = useAuthStore.getState();
      
      if (!tokens?.access) {
        console.warn('No auth token available to update preferences');
        return false;
      }
      
      await api.notifications.updatePreferences(data);
      return true;
    } catch (error: any) {
      console.error('Failed to update preferences:', error);
      return false;
    }
  }

  // Get notification icon classes based on type
  static getNotificationIconClasses(type: string): { svgClass: string; containerClass: string } {
    switch (type) {
      case "success":
        return {
          svgClass: "text-green-600 dark:text-green-400",
          containerClass: "bg-green-100 dark:bg-green-900/30"
        };
      case "warning":
        return {
          svgClass: "text-yellow-600 dark:text-yellow-400",
          containerClass: "bg-yellow-100 dark:bg-yellow-900/30"
        };
      case "error":
        return {
          svgClass: "text-red-600 dark:text-red-400",
          containerClass: "bg-red-100 dark:bg-red-900/30"
        };
      default:
        return {
          svgClass: "text-blue-600 dark:text-blue-400",
          containerClass: "bg-blue-100 dark:bg-blue-900/30"
        };
    }
  }

  // Get SVG path data based on type
  static getNotificationIconPath(type: string): string {
    switch (type) {
      case "success":
        return "M5 13l4 4L19 7";
      case "warning":
        return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
      case "error":
        return "M6 18L18 6M6 6l12 12";
      default:
        return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    }
  }

  // Format notification date
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }

  // Get priority label
  static getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'High Priority';
      case 'MEDIUM': return 'Medium Priority';
      case 'LOW': return 'Low Priority';
      default: return 'Normal Priority';
    }
  }

  // Get priority color classes
  static getPriorityClasses(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'LOW':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  }
}

// ⚠️ IMPORTANT: useNotifications HOOK REMOVED - Use the one from context/NotificationContext instead
// This prevents duplicate polling and infinite loops