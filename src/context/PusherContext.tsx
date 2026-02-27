// src/context/PusherContext.tsx - FINAL FIXED VERSION
import React, { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useAuthStore } from '../lib/store/auth';
import toast from 'react-hot-toast';

interface PusherContextType {
  connected: boolean;
  error: string | null;
}

const PusherContext = createContext<PusherContextType | undefined>(undefined);

export const usePusher = () => {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error('usePusher must be used within PusherProvider');
  }
  return context;
};

interface PusherProviderProps {
  children: React.ReactNode;
}

export const PusherProvider: React.FC<PusherProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, tokens } = useAuthStore();

  // Create a local function to refresh data via custom events
  const triggerRefresh = () => {
    // Dispatch a custom event that components can listen to
    window.dispatchEvent(new CustomEvent('pusher:data-refresh'));
  };

  useEffect(() => {
    // 🚨 CRITICAL FIX: Check if account_number exists before proceeding
    if (!user) {
      console.log('⏸️ Pusher: No user available');
      return;
    }

    if (!user.account_number) {
      console.log('⏸️ Pusher: User account_number not available yet. Waiting...');
      // Don't try to connect until account_number is available
      return;
    }

    if (!tokens?.access) {
      console.log('⏸️ Pusher: No token available');
      return;
    }

    console.log('🔌 Initializing Pusher for user:', {
      account_number: user.account_number,
      id: user.id,
      email: user.email
    });
    
    // ✅ Token debugging
    console.log('🔑 Token available:', !!tokens.access);
    console.log('🔑 Token preview:', tokens.access?.substring(0, 20) + '...');

    // ✅ Get raw env value first
    const rawApiUrl = import.meta.env.VITE_API_URL;
    console.log('📡 Raw VITE_API_URL from env:', rawApiUrl);
    
    // ✅ CRITICAL FIX: Get base URL without any /api
    let baseUrl = (rawApiUrl || 'https://claverica-backend-production.up.railway.app')
      .replace(/\/api\/?$/, '') // Remove /api or /api/ from the end
      .replace(/\/$/, '');       // Remove trailing slash
    
    console.log('📡 Cleaned base URL:', baseUrl);
    
    // ✅ FIXED: Construct auth endpoint with SINGLE /api and trailing slash
    const authEndpoint = `${baseUrl}/api/pusher/auth/`;
    console.log('🔐 Final auth endpoint:', authEndpoint);

    // 🔥 FINAL FIX: EVERYTHING HARDCODED - NO ENV VARS
    const pusher = new Pusher('b1283987f8301fdce6e34', { // Hardcoded key
      cluster: 'ap2', // Hardcoded cluster
      authEndpoint: authEndpoint,
      auth: {
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Accept': 'application/json',
        },
        method: 'POST',
        params: {},
      },
      authTransport: 'ajax',
      // 🔥 ALL HARDCODED - NO FALLBACKS
      wsHost: 'ws-ap2.pusher.com',
      wssHost: 'ws-ap2.pusher.com',
      httpHost: 'sockjs-ap2.pusher.com',
      forceTLS: true, // Hardcoded to true
      disableStats: true,
      enabledTransports: ['ws', 'wss', 'xhr_streaming', 'xhr_polling'],
    });

    // Connection event handlers
    pusher.connection.bind('connected', () => {
      console.log('✅ Pusher connected successfully');
      setConnected(true);
      setError(null);
    });

    pusher.connection.bind('disconnected', () => {
      console.log('🔌 Pusher disconnected');
      setConnected(false);
    });

    pusher.connection.bind('error', (err: any) => {
      console.error('❌ Pusher connection error DETAILS:', {
        message: err.message,
        data: err.data,
        type: err.type,
        error: err.error
      });
      setError(err.message || 'Pusher connection failed');
      setConnected(false);
    });

    // ✅ Use account_number as backend expects (not id)
    const channelName = `private-user-${user.account_number}`;
    console.log('📡 Subscribing to channel:', channelName);
    console.log('📡 Channel name length:', channelName.length);
    console.log('📡 Channel name characters:', channelName.split('').map(c => c.charCodeAt(0)));
    
    const channel = pusher.subscribe(channelName);

    // Channel subscription events
    channel.bind('pusher:subscription_succeeded', () => {
      console.log(`✅ Successfully subscribed to ${channelName}`);
    });

    channel.bind('pusher:subscription_error', (err: any) => {
      console.error(`❌ Subscription error for ${channelName}:`, err);
      console.error('Error details:', {
        message: err.message,
        data: err.data,
        type: err.type
      });
      setError('Failed to subscribe to user channel');
    });

    // ===== NOTIFICATION EVENTS =====
    channel.bind('notification.created', (data: any) => {
      console.log('📨 New notification received:', data);
      
      // Show toast for new notification
      toast.success(data.title || 'New Notification', {
        icon: '🔔',
        duration: 5000,
      });
      
      // Trigger refresh instead of calling fetchNotifications directly
      triggerRefresh();
    });

    channel.bind('notification.updated', (data: any) => {
      console.log('📨 Notification updated:', data);
      triggerRefresh();
    });

    // ===== TRANSFER EVENTS =====
    channel.bind('transfer.initiated', (data: any) => {
      console.log('💸 Transfer initiated:', data);
      toast.success(`Transfer of $${data.amount} initiated`, {
        icon: '💸',
      });
      triggerRefresh();
    });

    channel.bind('transfer.tac_sent', (data: any) => {
      console.log('🔐 TAC sent for transfer:', data);
      toast.success('TAC code sent - check your notifications', {
        icon: '🔐',
        duration: 8000,
      });
      triggerRefresh();
    });

    channel.bind('transfer.completed', (data: any) => {
      console.log('✅ Transfer completed:', data);
      toast.success(`Transfer of $${data.amount} completed!`, {
        icon: '✅',
      });
      triggerRefresh();
    });

    channel.bind('transfer.failed', (data: any) => {
      console.log('❌ Transfer failed:', data);
      toast.error(`Transfer failed: ${data.reason || 'Unknown error'}`, {
        icon: '❌',
      });
      triggerRefresh();
    });

    // ===== WALLET EVENTS =====
    channel.bind('wallet.credited', (data: any) => {
      console.log('💰 Money received:', data);
      toast.success(`You received $${data.amount}!`, {
        icon: '💰',
      });
      triggerRefresh();
    });

    channel.bind('wallet.debited', (data: any) => {
      console.log('💸 Money sent:', data);
      toast(`$${data.amount} sent`, {
        icon: '💸',
      });
      triggerRefresh();
    });

    channel.bind('balance.updated', (data: any) => {
      console.log('💰 Balance updated:', data);
      triggerRefresh();
    });

    channel.bind('low_balance', (data: any) => {
      console.log('⚠️ Low balance warning:', data);
      toast.error(`Low balance: $${data.balance} remaining`, {
        icon: '⚠️',
      });
      triggerRefresh();
    });

    // ===== KYC EVENTS =====
    channel.bind('kyc.approved', (data: any) => {
      console.log('✅ KYC approved:', data);
      toast.success('KYC Verified! You now have higher limits.', {
        icon: '✅',
        duration: 8000,
      });
      triggerRefresh();
    });

    channel.bind('kyc.rejected', (data: any) => {
      console.log('❌ KYC rejected:', data);
      toast.error(`KYC rejected: ${data.reason || 'Please resubmit'}`, {
        icon: '❌',
      });
      triggerRefresh();
    });

    channel.bind('kyc.pending', (data: any) => {
      console.log('⏳ KYC under review:', data);
      toast('KYC documents under review', {
        icon: '⏳',
      });
      triggerRefresh();
    });

    // ===== ACCOUNT EVENTS =====
    channel.bind('account.activated', (data: any) => {
      console.log('✅ Account activated:', data);
      toast.success('Account activated! You can now send money.', {
        icon: '✅',
      });
      triggerRefresh();
    });

    channel.bind('login.new', (data: any) => {
      console.log('⚠️ New login detected:', data);
      toast.error(`New login from ${data.location || 'unknown location'}`, {
        icon: '⚠️',
        duration: 10000,
      });
      triggerRefresh();
    });

    // ===== ADMIN EVENTS (if user is admin) =====
    if (user?.is_staff || user?.is_superuser) {
      channel.bind('admin.tac_required', (data: any) => {
        console.log('🔐 Admin: TAC required for transfer:', data);
        toast.success(`TAC required for transfer #${data.transfer_id}`, {
          icon: '🔐',
        });
        triggerRefresh();
      });

      channel.bind('admin.kyc_review', (data: any) => {
        console.log('📋 Admin: KYC review needed:', data);
        toast(`KYC submission from ${data.user} needs review`, {
          icon: '📋',
        });
        triggerRefresh();
      });
    }

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up Pusher connection');
      channel.unbind_all();
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [user?.account_number, user?.id, user?.email, user?.is_staff, user?.is_superuser, tokens?.access]);

  return (
    <PusherContext.Provider value={{ connected, error }}>
      {children}
    </PusherContext.Provider>
  );
};