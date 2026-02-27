// src/context/PusherContext.tsx - FINAL FIX WITH TRANSPORT CONFIGURATION
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
    window.dispatchEvent(new CustomEvent('pusher:data-refresh'));
  };

  useEffect(() => {
    console.log('🔍 [Pusher Effect] Running with:', { 
      hasUser: !!user, 
      hasToken: !!tokens?.access,
      userId: user?.id,
      userEmail: user?.email 
    });

    // Don't block on missing account_number - it can be set later
    if (!user) {
      console.log('⏸️ Pusher: No user available - waiting for auth');
      return;
    }

    if (!tokens?.access) {
      console.log('⏸️ Pusher: No token available - waiting for auth');
      return;
    }

    console.log('🔌 INITIALIZING PUSHER NOW - Conditions met');
    console.log('👤 User data:', {
      id: user.id,
      email: user.email,
      account_number: user.account_number || 'NOT YET AVAILABLE'
    });

    // Log environment info
    console.log('🔑 Token available:', !!tokens.access);
    console.log('🔑 Token preview:', tokens.access?.substring(0, 20) + '...');

    // Get API URL
    const rawApiUrl = import.meta.env.VITE_API_URL;
    console.log('📡 Raw VITE_API_URL from env:', rawApiUrl);
    
    let baseUrl = (rawApiUrl || 'https://claverica-backend-production.up.railway.app')
      .replace(/\/api\/?$/, '')
      .replace(/\/$/, '');
    
    console.log('📡 Cleaned base URL:', baseUrl);
    
    const authEndpoint = `${baseUrl}/api/pusher/auth/`;
    console.log('🔐 Final auth endpoint:', authEndpoint);

    // 🔥 FIXED: Ensure all options are properly passed to Pusher
    console.log('🔧 Creating Pusher instance NOW...');
    
    try {
      const pusherConfig = {
        cluster: 'ap2',
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
        wsHost: 'ws-ap2.pusher.com',
        wssHost: 'ws-ap2.pusher.com',
        httpHost: 'sockjs-ap2.pusher.com',
        forceTLS: true,
        disableStats: true,
        // 🔥 CRITICAL FIX: Only use WebSocket transports
        enabledTransports: ['ws', 'wss'],
        disabledTransports: ['xhr_streaming', 'xhr_polling', 'sockjs'],
      };

      console.log('📋 Pusher config being used:', pusherConfig);

      const pusher = new Pusher('b1283987f8301fdce6e34', pusherConfig);

      console.log('✅ Pusher instance CREATED successfully');

      // 🔥 Verify options were passed correctly
      console.log('✅ Pusher connection options:', {
        enabledTransports: pusher.connection.options?.enabledTransports,
        wsHost: pusher.connection.options?.wsHost,
        wssHost: pusher.connection.options?.wssHost,
        forceTLS: pusher.connection.options?.forceTLS
      });

      // 🔍 Show what config is actually being used
      console.log('🔍 Pusher config:', {
        key: pusher.key,
        cluster: pusher.config.cluster,
        wsHost: pusher.config.wsHost,
        wssHost: pusher.config.wssHost
      });

      // Connection event handlers
      pusher.connection.bind('connected', () => {
        console.log('✅✅✅ Pusher CONNECTED successfully!');
        setConnected(true);
        setError(null);
      });

      pusher.connection.bind('disconnected', () => {
        console.log('🔌 Pusher disconnected');
        setConnected(false);
      });

      pusher.connection.bind('error', (err: any) => {
        console.error('❌❌❌ Pusher ERROR:', {
          message: err.message,
          data: err.data,
          type: err.type,
          error: err.error
        });
        setError(err.message || 'Pusher connection failed');
        setConnected(false);
      });

      // Subscribe to channel - use id as fallback if account_number not available
      const channelIdentifier = user.account_number || user.id;
      const channelName = `private-user-${channelIdentifier}`;
      
      console.log('📡 Subscribing to channel:', channelName);
      console.log('📡 Using identifier:', channelIdentifier);
      
      const channel = pusher.subscribe(channelName);

      // Channel subscription events
      channel.bind('pusher:subscription_succeeded', () => {
        console.log(`✅✅✅ Successfully subscribed to ${channelName}`);
      });

      channel.bind('pusher:subscription_error', (err: any) => {
        console.error(`❌❌❌ Subscription error for ${channelName}:`, err);
        setError('Failed to subscribe to user channel');
      });

      // ===== NOTIFICATION EVENTS =====
      channel.bind('notification.created', (data: any) => {
        console.log('📨 New notification received:', data);
        toast.success(data.title || 'New Notification', { icon: '🔔', duration: 5000 });
        triggerRefresh();
      });

      channel.bind('notification.updated', (data: any) => {
        console.log('📨 Notification updated:', data);
        triggerRefresh();
      });

      channel.bind('transfer.initiated', (data: any) => {
        console.log('💸 Transfer initiated:', data);
        toast.success(`Transfer of $${data.amount} initiated`, { icon: '💸' });
        triggerRefresh();
      });

      channel.bind('transfer.tac_sent', (data: any) => {
        console.log('🔐 TAC sent for transfer:', data);
        toast.success('TAC code sent - check your notifications', { icon: '🔐', duration: 8000 });
        triggerRefresh();
      });

      channel.bind('transfer.completed', (data: any) => {
        console.log('✅ Transfer completed:', data);
        toast.success(`Transfer of $${data.amount} completed!`, { icon: '✅' });
        triggerRefresh();
      });

      channel.bind('transfer.failed', (data: any) => {
        console.log('❌ Transfer failed:', data);
        toast.error(`Transfer failed: ${data.reason || 'Unknown error'}`, { icon: '❌' });
        triggerRefresh();
      });

      channel.bind('wallet.credited', (data: any) => {
        console.log('💰 Money received:', data);
        toast.success(`You received $${data.amount}!`, { icon: '💰' });
        triggerRefresh();
      });

      channel.bind('wallet.debited', (data: any) => {
        console.log('💸 Money sent:', data);
        toast(`$${data.amount} sent`, { icon: '💸' });
        triggerRefresh();
      });

      channel.bind('balance.updated', (data: any) => {
        console.log('💰 Balance updated:', data);
        triggerRefresh();
      });

      channel.bind('low_balance', (data: any) => {
        console.log('⚠️ Low balance warning:', data);
        toast.error(`Low balance: $${data.balance} remaining`, { icon: '⚠️' });
        triggerRefresh();
      });

      channel.bind('kyc.approved', (data: any) => {
        console.log('✅ KYC approved:', data);
        toast.success('KYC Verified! You now have higher limits.', { icon: '✅', duration: 8000 });
        triggerRefresh();
      });

      channel.bind('kyc.rejected', (data: any) => {
        console.log('❌ KYC rejected:', data);
        toast.error(`KYC rejected: ${data.reason || 'Please resubmit'}`, { icon: '❌' });
        triggerRefresh();
      });

      channel.bind('kyc.pending', (data: any) => {
        console.log('⏳ KYC under review:', data);
        toast('KYC documents under review', { icon: '⏳' });
        triggerRefresh();
      });

      channel.bind('account.activated', (data: any) => {
        console.log('✅ Account activated:', data);
        toast.success('Account activated! You can now send money.', { icon: '✅' });
        triggerRefresh();
      });

      channel.bind('login.new', (data: any) => {
        console.log('⚠️ New login detected:', data);
        toast.error(`New login from ${data.location || 'unknown location'}`, { icon: '⚠️', duration: 10000 });
        triggerRefresh();
      });

      if (user?.is_staff || user?.is_superuser) {
        channel.bind('admin.tac_required', (data: any) => {
          console.log('🔐 Admin: TAC required for transfer:', data);
          toast.success(`TAC required for transfer #${data.transfer_id}`, { icon: '🔐' });
          triggerRefresh();
        });

        channel.bind('admin.kyc_review', (data: any) => {
          console.log('📋 Admin: KYC review needed:', data);
          toast(`KYC submission from ${data.user} needs review`, { icon: '📋' });
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

    } catch (err) {
      console.error('❌❌❌ CRITICAL: Failed to create Pusher instance:', err);
      setError('Failed to initialize Pusher');
    }

  }, [user?.id, user?.email, user?.is_staff, user?.is_superuser, tokens?.access]);

  return (
    <PusherContext.Provider value={{ connected, error }}>
      {children}
    </PusherContext.Provider>
  );
};