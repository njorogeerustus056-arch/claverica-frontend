// Copy and paste this entire file
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { useLocation } from 'react-router-dom'; // Add this import

export default function TawkToWidget() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation(); // Add this
  
  // Only show on dashboard routes
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
  // Get env variables
  const isEnabled = import.meta.env.VITE_TAWK_ENABLED === 'true';
  const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID || '6990e9d3e68ce71c379eec8d';
  const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID || 'default';

  useEffect(() => {
    // Only load if enabled AND user is authenticated AND on dashboard route
    if (!isEnabled || !isAuthenticated || !isDashboardRoute) return;

    // Check if already loaded
    if (document.querySelector('script[src*="tawk.to"]')) return;

    console.log('📦 Loading Tawk.to script...', { propertyId, widgetId });

    // Load Tawk.to script with property ID from env
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    script.onload = () => {
      console.log('✅ Tawk.to loaded successfully');
      
      // Optional: Set user data if available
      const user = useAuthStore.getState().user;
      if (user && window.Tawk_API) {
        window.Tawk_API.setAttributes({
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User',
          email: user.email || '',
          hash: user.id
        });
      }
    };
    
    script.onerror = (error) => {
      console.error('❌ Failed to load Tawk.to:', error);
    };
    
    document.body.appendChild(script);

    // Cleanup when leaving dashboard or unmounting
    return () => {
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Remove any iframes/widgets
      document.querySelectorAll('iframe[src*="tawk.to"]').forEach(el => el.remove());
      
      // Clean up global Tawk object
      delete window.Tawk_API;
    };
  }, [isAuthenticated, isDashboardRoute, isEnabled, propertyId, widgetId]); // Add isDashboardRoute to dependencies

  return null; // No UI, just loads script
}