// src/components/TawkToWrapper.tsx
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { loadTawkTo, setVisitorInfo, onChatLoaded } from '../services/tawkTo';

export default function TawkToWrapper() {
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only load for authenticated users
    if (!isAuthenticated) return;

    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID || '6990e9d3e68ce71c379eec8d';
    const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID || 'default';

    console.log('📱 Loading tawk.to for authenticated user...');
    
    loadTawkTo(propertyId, widgetId)
      .then(() => {
        // Set visitor info for logged-in user
        if (user) {
          setVisitorInfo(
            `${user.first_name} ${user.last_name}`,
            user.email
          );
          
          setVisitorProperties({
            account_number: user.account_number,
            user_id: user.id,
            logged_in: true
          });
        }

        // Show widget after login
        onChatLoaded(() => {
          if (window.Tawk_API) {
            window.Tawk_API.showWidget();
          }
        });
      })
      .catch(err => console.error('Failed to load chat:', err));
  }, [isAuthenticated, user]);

  return null;
}