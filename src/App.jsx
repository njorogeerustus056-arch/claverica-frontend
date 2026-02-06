"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
// src/App.tsx - CORRECTED (Fixed Crypto route issue)
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
// Import Providers
var AuthContext_1 = require("./context/AuthContext");
var NotificationContext_1 = require("./context/NotificationContext");
var SignIn_1 = require("./pages/AuthPages/SignIn");
var SignUp_1 = require("./pages/AuthPages/SignUp");
var VerifyEmail_1 = require("./pages/AuthPages/VerifyEmail");
var NotFound_1 = require("./pages/OtherPage/NotFound");
var PublicNavbar_1 = require("./components/PublicNavbar");
var Footer_1 = require("./components/Footer");
// Import FeatureDetails and ProjectDetails
var FeatureDetails_1 = require("./pages/features/FeatureDetails");
var ProjectDetails_1 = require("./pages/features/ProjectDetails");
// Import Transfer Flow Pages
var TransferVerifyTAC_1 = require("./pages/Dashboard/TransferVerifyTAC");
var TransferStatus_1 = require("./pages/Dashboard/TransferStatus");
var TransfersHistory_1 = require("./pages/Dashboard/TransfersHistory");
// ⭐ IMPORTANT: Direct imports for debugging problematic components
var Escrow_1 = require("./pages/Dashboard/Escrow");
var Crypto_1 = require("./pages/Dashboard/Crypto"); // ⭐ DIRECT IMPORT FOR NOW
// Public Pages (lazy loaded)
var Home = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Public/Home"); }); });
var About = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Public/About"); }); });
var Services = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Public/Services"); }); });
var Projects = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Public/Projects"); }); });
var Contact = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Public/Contact"); }); });
// Dashboard Pages
var DashboardIndex = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard"); }); });
var DashboardHome = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Home"); }); });
var Transfer = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Transfer"); }); });
// ⭐ REMOVED: const Crypto = lazy(() => import("./pages/Dashboard/Crypto")); // Using direct import above
var Compliance = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Compliance"); }); });
var KYCSubmit = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/KYCSubmit"); }); });
var AccountSettings = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/AccountSettings"); }); });
var Insurance = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Insurance"); }); });
var Loans = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Loans"); }); });
var Savings = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Savings"); }); });
var Notifications = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Notifications"); }); });
// Import KYC page
var KYC = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/KYC"); }); });
// Contact Support
var ContactSupport = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Contact"); }); });
// Card Pages
var Cards = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Cards"); }); });
var CardTransactions = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/CardTransactions"); }); });
// Profile & Settings
var Profile = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Profile"); }); });
var Settings = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require("./pages/Dashboard/Settings"); }); });
// ⭐ ADD: Create a simple Loading component
function LoadingSpinner() {
    return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>);
}
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <AuthContext_1.AuthProvider>
        <NotificationContext_1.NotificationProvider pollInterval={30000}>
          <react_1.Suspense fallback={<LoadingSpinner />}>
            <react_router_dom_1.Routes>
              {/* Public Pages */}
              <react_router_dom_1.Route path="/" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <Home />
                  </div>
                  <Footer_1.default />
                </>}/>
              
              <react_router_dom_1.Route path="/about" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <About />
                  </div>
                  <Footer_1.default />
                </>}/>
              
              <react_router_dom_1.Route path="/services" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <Services />
                  </div>
                  <Footer_1.default />
                </>}/>
              
              <react_router_dom_1.Route path="/projects" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <Projects />
                  </div>
                  <Footer_1.default />
                </>}/>
              
              <react_router_dom_1.Route path="/contact" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <Contact />
                  </div>
                  <Footer_1.default />
                </>}/>

              {/* Feature Details Page */}
              <react_router_dom_1.Route path="/features" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <FeatureDetails_1.default />
                  </div>
                  <Footer_1.default />
                </>}/>

              {/* Project Details Page with dynamic slug */}
              <react_router_dom_1.Route path="/projects/:slug" element={<>
                  <PublicNavbar_1.default />
                  <div style={{ paddingTop: "80px" }}>
                    <ProjectDetails_1.default />
                  </div>
                  <Footer_1.default />
                </>}/>

              {/* Auth Pages */}
              <react_router_dom_1.Route path="/signin" element={<SignIn_1.default />}/>
              <react_router_dom_1.Route path="/signup" element={<SignUp_1.default />}/>
              <react_router_dom_1.Route path="/verify-email" element={<VerifyEmail_1.default />}/>

              {/* Dashboard — wrapper with Outlet */}
              <react_router_dom_1.Route path="/dashboard" element={<DashboardIndex />}>
                <react_router_dom_1.Route index element={<DashboardHome />}/>
                <react_router_dom_1.Route path="transfer" element={<Transfer />}/>
                
                {/* Transfer Flow Routes */}
                <react_router_dom_1.Route path="transfer/verify-tac/:id" element={<TransferVerifyTAC_1.default />}/>
                <react_router_dom_1.Route path="transfer/status/:id" element={<TransferStatus_1.default />}/>
                <react_router_dom_1.Route path="transfer/history" element={<TransfersHistory_1.default />}/>
                
                {/* ⭐ FIXED: Crypto Route - Using directly imported component */}
                <react_router_dom_1.Route path="crypto" element={<Crypto_1.default />}/>
                
                <react_router_dom_1.Route path="savings" element={<Savings />}/>
                <react_router_dom_1.Route path="loans" element={<Loans />}/>
                <react_router_dom_1.Route path="insurance" element={<Insurance />}/>
                
                {/* FIXED: Escrow Route - Using directly imported component */}
                <react_router_dom_1.Route path="escrow" element={<Escrow_1.default />}/>
                
                <react_router_dom_1.Route path="compliance" element={<Compliance />}/>
                
                {/* KYC Routes */}
                <react_router_dom_1.Route path="kyc" element={<KYC />}/>
                <react_router_dom_1.Route path="kyc/submit" element={<KYCSubmit />}/>
                
                <react_router_dom_1.Route path="account-settings" element={<AccountSettings />}/>
                <react_router_dom_1.Route path="notifications" element={<Notifications />}/>
                
                {/* Support Routes */}
                <react_router_dom_1.Route path="support" element={<ContactSupport />}/>
                <react_router_dom_1.Route path="contact" element={<ContactSupport />}/>
                <react_router_dom_1.Route path="help" element={<ContactSupport />}/>
                
                {/* Card Routes */}
                <react_router_dom_1.Route path="cards" element={<Cards />}/>
                <react_router_dom_1.Route path="cards/transactions" element={<CardTransactions />}/>
                
                {/* Profile & Settings */}
                <react_router_dom_1.Route path="profile" element={<Profile />}/>
                <react_router_dom_1.Route path="settings" element={<Settings />}/>
              </react_router_dom_1.Route>

              {/* 404 */}
              <react_router_dom_1.Route path="*" element={<NotFound_1.default />}/>
            </react_router_dom_1.Routes>
          </react_1.Suspense>
        </NotificationContext_1.NotificationProvider>
      </AuthContext_1.AuthProvider>
    </react_router_dom_1.BrowserRouter>);
}
