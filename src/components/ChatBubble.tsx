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

  // Load tawk.to script once
  useEffect(() => {
    if (!isEnabled) return;

    // Check if script already exists
    if (document.querySelector('script[src*="tawk.to"]')) {
      setIsLoaded(true);
      return;
    }

    // Create and load tawk.to script
    const script = document.createElement('script');
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    script.onload = () => {
      console.log('✅ Tawk.to loaded');
      setIsLoaded(true);
      
      // Hide default widget
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget = function() {};
        
        // Listen for agent status
        window.Tawk_API.onStatusChange = function(status: string) {
          setAgentStatus(status === 'online' ? 'online' : 'offline');
        };
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      const scriptEl = document.querySelector('script[src*="tawk.to"]');
      if (scriptEl) scriptEl.remove();
    };
  }, [propertyId, widgetId, isEnabled]);

  // 💣 CONSOLE-TESTED KILLER - This uses the exact code that worked
  useEffect(() => {
    // Create style element with the exact CSS that worked in console
    const style = document.createElement('style');
    style.id = 'tawk-killer-style';
    style.textContent = `
      iframe[src*="tawk"], 
      [class*="tawk"], 
      [id*="tawk"],
      .tawk-min-container, 
      .tawk-max-container,
      iframe[src*="tawk.to"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0px !important;
        height: 0px !important;
        position: fixed !important;
        top: -99999px !important;
        left: -99999px !important;
        z-index: -99999 !important;
        pointer-events: none !important;
      }
      
      /* Make sure your blue button is visible */
      .fixed.bottom-6.right-6,
      button[aria-label="Open live chat support"] {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 999999999 !important;
      }
    `;
    document.head.appendChild(style);
    
    // Run the killer function every 100ms (what worked in console)
    const killInterval = setInterval(() => {
      // Find all tawk elements - exactly like console command
      const tawkElements = document.querySelectorAll(
        'iframe[src*="tawk"], [class*="tawk"], [id*="tawk"], .tawk-min-container, .tawk-max-container'
      );
      
      tawkElements.forEach(el => {
        if (el instanceof HTMLElement) {
          // Apply the same styles that worked in console
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('width', '0px', 'important');
          el.style.setProperty('height', '0px', 'important');
          el.style.setProperty('position', 'fixed', 'important');
          el.style.setProperty('top', '-99999px', 'important');
          el.style.setProperty('left', '-99999px', 'important');
          el.style.setProperty('z-index', '-99999', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
        }
      });
    }, 100); // Check every 100ms for new elements
    
    return () => {
      clearInterval(killInterval);
      const styleEl = document.getElementById('tawk-killer-style');
      if (styleEl) styleEl.remove();
    };
  }, []); // Empty dependency array - run once on mount

  const handleOpenChat = useCallback(() => {
    if (!isEnabled) {
      if (appEnv === 'development') {
        alert('🔧 Development Mode\n\nLive chat is disabled in development.');
      }
      return;
    }

    if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
      window.Tawk_API.toggle(); // Opens the chat
    } else {
      // If not loaded yet, wait and try again
      console.log('⏳ Waiting for Tawk.to to load...');
      const checkInterval = setInterval(() => {
        if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
          window.Tawk_API.toggle();
          clearInterval(checkInterval);
        }
      }, 500);
      
      // Timeout after 5 seconds
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }, [isEnabled, appEnv]);

  // Button color based on agent status
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