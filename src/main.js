

// main.tsx - CLEAN VERSION WITH REDUCED LOGS
var react_1 = require("react");
var client_1 = require("react-dom/client");
// CSS imports
require("./styles/index.css");
require("./styles/animations.css");
require("swiper/swiper-bundle.css");
require("flatpickr/dist/flatpickr.css");
var PageMeta_1 = require("./components/common/PageMeta");
var ThemeContext_1 = require("./context/ThemeContext");
var TransferContext_1 = require("./context/TransferContext");
var ErrorBoundary_1 = require("./components/common/ErrorBoundary");
var auth_1 = require("./lib/store/auth");
// Lazy load main App
var App = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./App"); }); });
var rootElement = document.getElementById("root");
// Set theme before React loads
var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}
else {
    document.documentElement.classList.remove("dark");
}
// InitializeAuth component
function InitializeAuth() {
    (0, react_1.useEffect)(function () {
        var authStore = auth_1.useAuthStore.getState();
        // Keep only essential logs or remove all
        if (process.env.NODE_ENV === 'development') {
            console.log("🔧 App initializing...");
        }
        authStore.syncFromLocalStorage();
        var tokens = authStore.tokens;
        if (tokens === null || tokens === void 0 ? void 0 : tokens.access) {
            authStore.checkAuth();
        }
        else {
            authStore.setLoading(false);
        }
    }, []);
    return null;
}
// Tawk.to Widget - Only loads in production
function TawkToWidget() {
    (0, react_1.useEffect)(function () {
        var _a;
        // Only load in production
        if (process.env.NODE_ENV !== 'production') {
            console.log('🚫 tawk.to: Skipped in development');
            return;
        }
        // Hide tawk.to's default bubble
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.onLoad = function () {
            window.Tawk_API.hideWidget();
        };
        // Load tawk.to script
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://embed.tawk.to/YOUR_WEBSITE_ID_HERE/default'; // ⬅️ REPLACE WITH YOUR ID
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        var firstScript = document.getElementsByTagName('script')[0];
        (_a = firstScript.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(script, firstScript);
        return function () {
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
}
else {
    var root = (0, client_1.createRoot)(rootElement);
    root.render(<react_1.StrictMode>
      <ErrorBoundary_1.ErrorBoundary>
        <ThemeContext_1.ThemeProvider>
          <PageMeta_1.AppWrapper>
            <InitializeAuth />
            <TawkToWidget /> {/* ⬅️ ADDED THIS LINE */}
            <TransferContext_1.TransferProvider>
              <react_1.Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    <span className="ml-3">Loading...</span>
                  </div>}>
                <App />
              </react_1.Suspense>
            </TransferContext_1.TransferProvider>
          </PageMeta_1.AppWrapper>
        </ThemeContext_1.ThemeProvider>
      </ErrorBoundary_1.ErrorBoundary>
    </react_1.StrictMode>);
}

