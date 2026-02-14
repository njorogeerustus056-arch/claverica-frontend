// src/components/ChatBubble.tsx
import { MessageCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { loadTawkTo, openChat, isChatLoaded } from "../services/tawkTo";

export default function ChatBubble() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get environment variables
  const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
  const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;
  const isEnabled = import.meta.env.VITE_TAWK_ENABLED === 'true';
  const appEnv = import.meta.env.VITE_APP_ENV;

  // Load tawk.to when component mounts (only if enabled)
  useEffect(() => {
    if (isEnabled && propertyId && widgetId) {
      console.log(`📱 Loading tawk.to for ${appEnv} environment...`);
      loadTawkTo(propertyId, widgetId)
        .then(() => {
          setIsLoaded(true);
          console.log('✅ Tawk.to ready');
        })
        .catch(error => console.error('Failed to load chat:', error));
    } else {
      console.log(`🔧 Tawk.to disabled in ${appEnv} mode`);
    }
  }, [isEnabled, propertyId, widgetId, appEnv]);

  const handleOpenChat = useCallback(() => {
    if (isEnabled) {
      if (isLoaded || isChatLoaded()) {
        openChat();
      } else {
        // If not loaded yet, load and then open
        loadTawkTo(propertyId, widgetId)
          .then(() => {
            setIsLoaded(true);
            setTimeout(openChat, 500);
          })
          .catch(console.error);
      }
    } else {
      // Development/disabled fallback
      console.log('💬 Chat would open in production');
      
      if (appEnv === 'development') {
        alert('🔧 Development Mode\n\nLive chat is disabled in development.\n\nIt will work when deployed to production!');
      } else {
        alert('💬 Live chat coming soon!\n\nPlease contact us via email in the meantime.');
      }
    }
  }, [isEnabled, isLoaded, propertyId, widgetId, appEnv]);

  // Determine badge color based on environment
  const badgeColor = isEnabled ? 'bg-red-500' : 'bg-yellow-500';
  const badgeText = isEnabled ? '1' : '⚡';

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <button 
        onClick={handleOpenChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-blue-600 hover:bg-blue-700 text-white rounded-full p-5 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
        aria-label="Open live chat support"
      >
        <MessageCircle size={32} className="drop-shadow-lg" />
        
        {/* Notification badge - shows different color in dev/prod */}
        <span className={`
          absolute -top-2 -right-2 
          ${badgeColor} text-white text-xs font-bold 
          rounded-full w-7 h-7 flex items-center justify-center 
          animate-pulse ring-4 ${badgeColor} ring-opacity-50
        `}>
          {badgeText}
        </span>

        {/* Dynamic tooltip based on environment */}
        <span className={`
          absolute -left-28 top-1/2 -translate-y-1/2 
          bg-gray-900 text-white px-4 py-2 rounded-lg 
          text-sm font-medium whitespace-nowrap 
          shadow-lg transition-all duration-200
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
          pointer-events-none
        `}>
          {isEnabled ? 'Live Support 💬' : 'Coming Soon 🔧'}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
        </span>
      </button>
    </div>
  );
}