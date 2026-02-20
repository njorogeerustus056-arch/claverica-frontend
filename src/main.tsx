// main.tsx - FINAL FIXED VERSION WITH CORRECT CSS IMPORTS
import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// CSS imports - ONLY EXISTING FILES!
import "./styles/index.css";           // ✅ Master stylesheet
import "swiper/swiper-bundle.css";      // ✅ Third-party swiper styles
import "flatpickr/dist/flatpickr.css";  // ✅ Third-party date picker styles

import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import { TransferProvider } from "./context/TransferContext.tsx";
import { PusherProvider } from "./context/PusherContext";
import { NotificationProvider } from "./context/NotificationContext";
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
  React.useEffect(() => {
    const authStore = useAuthStore.getState();
    
    if (process.env.NODE_ENV === 'development') {
      console.log("📱 App initializing...");
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

// Provider wrapper with correct order
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PusherProvider>           {/* Pusher first */}
      <NotificationProvider>   {/* Then Notification can use Pusher */}
        <TransferProvider>
          {children}
        </TransferProvider>
      </NotificationProvider>
    </PusherProvider>
  );
}

if (!rootElement) {
  console.error("Root element with id='root' not found.");
} else {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <AppWrapper>
              <InitializeAuth />
              <Providers>
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
              </Providers>
            </AppWrapper>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}