// main.tsx - CLEAN VERSION WITH REDUCED LOGS
import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";

// CSS imports
import "./styles/index.css";
import "./styles/animations.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";

import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import { TransferProvider } from "./context/TransferContext.tsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { useAuthStore } from "./lib/store/auth";

// Lazy load main App
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

// Set theme before React loads
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// InitializeAuth component
function InitializeAuth() {
  useEffect(() => {
    const authStore = useAuthStore.getState();
    
    // Keep only essential logs or remove all
    if (process.env.NODE_ENV === 'development') {
      console.log("🔧 App initializing...");
    }
    
    authStore.syncFromLocalStorage();
    
    const { tokens } = authStore;
    
    if (tokens?.access) {
      authStore.checkAuth();
    } else {
      authStore.setLoading(false);
    }
  }, []);

  return null;
}

// Tawk.to Widget - Only loads in production
function TawkToWidget() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('🚫 tawk.to: Skipped in development');
      return;
    }

    // Hide tawk.to's default bubble
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function() {
      window.Tawk_API.hideWidget();
    };

    // Load tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_WEBSITE_ID_HERE/default'; // ⬅️ REPLACE WITH YOUR ID
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

if (!rootElement) {
  console.error("Root element with id='root' not found.");
} else {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <AppWrapper>
            <InitializeAuth />
            <TawkToWidget /> {/* ⬅️ ADDED THIS LINE */}
            <TransferProvider>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    <span className="ml-3">Loading...</span>
                  </div>
                }
              >
                <App />
              </Suspense>
            </TransferProvider>
          </AppWrapper>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}