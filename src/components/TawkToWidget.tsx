// Copy and paste this entire file
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store/auth';
import { useLocation } from 'react-router-dom';

export default function TawkToWidget() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  
  // 🚫 Block on public routes - especially login/signup pages
  const isPublicRoute = 
    location.pathname === '/signin' || 
    location.pathname === '/signup' || 
    location.pathname === '/verify-email' ||
    location.pathname === '/activate' ||
    location.pathname === '/activate-account' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/about') ||
    location.pathname.startsWith('/services') ||
    location.pathname.startsWith('/projects') ||
    location.pathname.startsWith('/contact') ||
    location.pathname.startsWith('/features');
  
  // Only show on dashboard routes AND authenticated AND not public
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const shouldShow = isAuthenticated && isDashboardRoute && !isPublicRoute;
  
  // Get env variables - UPDATED with new IDs
  const isEnabled = import.meta.env.VITE_TAWK_ENABLED === 'true';
  const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID || '69a0b278865cc31c343af01b';
  const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID || '1jidri9sm';

  useEffect(() => {
    // Clean up if we shouldn't show
    if (!shouldShow || !isEnabled) {
      // Remove any existing Tawk.to scripts/iframes
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) {
        existingScript.remove();
      }
      document.querySelectorAll('iframe[src*="tawk.to"]').forEach(el => el.remove());
      delete window.Tawk_API;
      return;
    }

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
      
      // Set user data if available
      const user = useAuthStore.getState().user;
      if (user && window.Tawk_API) {
        window.Tawk_API.setAttributes({
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User',
          email: user.email || '',
          hash: user.id
        }, function(error) {
          if (error) {
            console.error('Error setting user attributes:', error);
          }
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
  }, [shouldShow, isEnabled, propertyId, widgetId]); // Updated dependencies

  return null; // No UI, just loads script
}