// src/services/tawkTo.ts

interface TawkAPI {
  maximize: () => void;
  minimize: () => void;
  toggle: () => void;
  popup: () => void;
  showWidget: () => void;
  hideWidget: () => void;
  isChatMaximized: () => boolean;
  onLoaded: (callback: () => void) => void;
  onBeforeLoaded: (callback: () => void) => void;
  visitor: {
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setProperties: (properties: Record<string, any>) => void;
  };
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
  }
}

/**
 * Load the tawk.to script dynamically
 */
export const loadTawkTo = (propertyId: string, widgetId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.getElementById('tawkTo-script')) {
      console.log('✅ Tawk.to script already loaded');
      resolve(true);
      return;
    }

    // Validate IDs
    if (!propertyId || !widgetId) {
      console.warn('⚠️ Tawk.to property ID or widget ID missing');
      reject(new Error('Tawk.to IDs missing'));
      return;
    }

    console.log(`📦 Loading tawk.to script...`, { propertyId, widgetId });

    // Create script element
    const script = document.createElement('script');
    script.id = 'tawkTo-script';
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Handle load events
    script.onload = () => {
      console.log('✅ Tawk.to script loaded successfully');
      resolve(true);
    };
    
    script.onerror = (error) => {
      console.error('❌ Failed to load tawk.to script:', error);
      reject(new Error('Failed to load tawk.to'));
    };

    // Add to document
    document.body.appendChild(script);
  });
};

/**
 * Open/minimize the chat widget
 */
export const openChat = (): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    console.log('💬 Opening chat...');
    window.Tawk_API.maximize();
  } else {
    console.warn('⚠️ Tawk.to not loaded yet');
  }
};

export const closeChat = (): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    console.log('💬 Closing chat...');
    window.Tawk_API.minimize();
  }
};

export const toggleChat = (): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    if (window.Tawk_API.isChatMaximized()) {
      window.Tawk_API.minimize();
      console.log('💬 Chat minimized');
    } else {
      window.Tawk_API.maximize();
      console.log('💬 Chat maximized');
    }
  }
};

/**
 * Check if chat is loaded
 */
export const isChatLoaded = (): boolean => {
  return typeof window.Tawk_API !== 'undefined';
};

export const isChatMaximized = (): boolean => {
  if (typeof window.Tawk_API !== 'undefined') {
    return window.Tawk_API.isChatMaximized();
  }
  return false;
};

/**
 * Set visitor information (useful for logged-in users)
 */
export const setVisitorInfo = (name: string, email: string): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    window.Tawk_API.visitor.setName(name);
    window.Tawk_API.visitor.setEmail(email);
    console.log('👤 Visitor info set:', { name, email });
  }
};

/**
 * Set custom visitor properties
 */
export const setVisitorProperties = (properties: Record<string, any>): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    window.Tawk_API.visitor.setProperties(properties);
    console.log('📊 Visitor properties set:', properties);
  }
};

/**
 * Register event handlers
 */
export const onChatLoaded = (callback: () => void): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    window.Tawk_API.onLoaded(callback);
  } else {
    // If API not ready, wait and try again
    const checkInterval = setInterval(() => {
      if (typeof window.Tawk_API !== 'undefined') {
        clearInterval(checkInterval);
        window.Tawk_API.onLoaded(callback);
      }
    }, 100);
  }
};

export const onChatBeforeLoaded = (callback: () => void): void => {
  if (typeof window.Tawk_API !== 'undefined') {
    window.Tawk_API.onBeforeLoaded(callback);
  } else {
    const checkInterval = setInterval(() => {
      if (typeof window.Tawk_API !== 'undefined') {
        clearInterval(checkInterval);
        window.Tawk_API.onBeforeLoaded(callback);
      }
    }, 100);
  }
};