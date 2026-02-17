// src/components/TawkToWidget.tsx
import { useEffect } from 'react';
import { useAuthStore } from '../lib/store/auth';

export default function TawkToWidget() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only load if user is authenticated
    if (!isAuthenticated) return;

    // Check if already loaded
    if (document.querySelector('script[src*="tawk.to"]')) return;

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/69911599e68ce71c379eed61/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    // Cleanup on logout
    return () => {
      // Remove script when user logs out
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Remove any iframes/widgets
      document.querySelectorAll('iframe[src*="tawk.to"]').forEach(el => el.remove());
      
      // Clean up global Tawk object
      delete window.Tawk_API;
    };
  }, [isAuthenticated]);

  return null; // No UI, just loads script
}