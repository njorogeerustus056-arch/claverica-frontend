// src/components/ChatBubble.tsx
import { MessageCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

// Tawk.to API types
declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function ChatBubble() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'online' | 'offline'>('offline');

  // Get environment variables
  const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID || '6990e9d3e68ce71c379eec8d';
  const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID || '1jhhluieo';
  const isEnabled = import.meta.env.VITE_TAWK_ENABLED !== 'false';
  const appEnv = import.meta.env.VITE_APP_ENV;

  // Load tawk.to script once - SIMPLIFIED
  useEffect(() => {
    if (!isEnabled) return;

    // Check if script already exists
    if (document.querySelector('script[src*="tawk.to"]')) {
      console.log('✅ Tawk.to script already loaded');
      setIsLoaded(true);
      return;
    }

    console.log(`📦 Loading tawk.to script...`, { propertyId, widgetId });

    // Create and load tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    script.onload = () => {
      console.log('✅ Tawk.to loaded successfully');
      setIsLoaded(true);
      
      // Don't try to set visitor info - let Tawk.to handle itself
      if (window.Tawk_API) {
        // Just listen for status changes
        if (window.Tawk_API.onStatusChange) {
          window.Tawk_API.onStatusChange = function(status: string) {
            setAgentStatus(status === 'online' ? 'online' : 'offline');
          };
        }
      }
    };

    script.onerror = (error) => {
      console.error('❌ Failed to load Tawk.to:', error);
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove the script on unmount - it should persist
    };
  }, [propertyId, widgetId, isEnabled]);

  // Nuclear option to hide default Tawk.to widget
  useEffect(() => {
    // Create style to hide default widget
    const style = document.createElement('style');
    style.id = 'tawk-hide-style';
    style.textContent = `
      /* Hide all default Tawk.to elements */
      iframe[src*="tawk.to"],
      .tawk-min-container,
      .tawk-max-container,
      [class*="tawk-"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* Ensure our button is visible */
      .fixed.bottom-6.right-6 {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 999999999 !important;
      }
    `;
    
    if (!document.getElementById('tawk-hide-style')) {
      document.head.appendChild(style);
    }

    // Periodically check for and hide any tawk elements
    const interval = setInterval(() => {
      const tawkElements = document.querySelectorAll(
        'iframe[src*="tawk.to"], .tawk-min-container, .tawk-max-container'
      );
      
      tawkElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
        }
      });
    }, 500);

    return () => {
      clearInterval(interval);
      const styleEl = document.getElementById('tawk-hide-style');
      if (styleEl) styleEl.remove();
    };
  }, []);

  // Simple function to open chat
  const handleOpenChat = useCallback(() => {
    if (!isEnabled) {
      if (appEnv === 'development') {
        alert('🔧 Development Mode\n\nLive chat is disabled in development.');
      }
      return;
    }

    console.log('💬 Opening chat...');

    // Try to open chat
    if (window.Tawk_API) {
      if (typeof window.Tawk_API.toggle === 'function') {
        window.Tawk_API.toggle();
      } else if (typeof window.Tawk_API.maximize === 'function') {
        window.Tawk_API.maximize();
      } else {
        console.warn('⚠️ Tawk.to API not ready');
        
        // Wait for API to be ready
        const checkInterval = setInterval(() => {
          if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
            window.Tawk_API.toggle();
            clearInterval(checkInterval);
          }
        }, 500);
        
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    } else {
      console.warn('⚠️ Tawk.to not loaded');
    }
  }, [isEnabled, appEnv]);

  // Button color
  const buttonColor = agentStatus === 'online' ? 'bg-blue-600' : 'bg-gray-500';
  const buttonHoverColor = agentStatus === 'online' ? 'hover:bg-blue-700' : 'hover:bg-gray-600';

  return (
    <div className="fixed bottom-6 right-6 z-[999999999] group">
      <button 
        onClick={handleOpenChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative ${buttonColor} ${buttonHoverColor}
          text-white rounded-full p-5 shadow-2xl 
          transition-all duration-300 hover:scale-110 active:scale-105 
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
        `}
        aria-label="Open live chat support"
      >
        <MessageCircle size={32} className="drop-shadow-lg" />
        
        {/* Status indicator */}
        <span className={`
          absolute -top-2 -right-2 
          ${agentStatus === 'online' ? 'bg-green-500' : 'bg-yellow-500'}
          text-white text-xs font-bold 
          rounded-full w-7 h-7 flex items-center justify-center 
          animate-pulse ring-4 ${agentStatus === 'online' ? 'ring-green-200' : 'ring-yellow-200'}
        `}>
          {agentStatus === 'online' ? '1' : '⚡'}
        </span>

        {/* Tooltip */}
        <span className={`
          absolute -left-32 top-1/2 -translate-y-1/2 
          bg-gray-900 text-white px-4 py-2 rounded-lg 
          text-sm font-medium whitespace-nowrap 
          shadow-lg transition-all duration-200
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          pointer-events-none
        `}>
          {agentStatus === 'online' ? 'Live Support 💬' : 'Leave a message ✉️'}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
        </span>
      </button>
    </div>
  );
}