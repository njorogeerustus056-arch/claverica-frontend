// src/App.tsx - CORRECTED (Fixed Crypto route issue)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Import Providers
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import NotFound from "./pages/OtherPage/NotFound";
import PublicNavbar from "./components/PublicNavbar";
import Footer from "./components/Footer";

// Import FeatureDetails and ProjectDetails
import FeatureDetails from "./pages/features/FeatureDetails";
import ProjectDetails from "./pages/features/ProjectDetails";

// Import Transfer Flow Pages
import TransferVerifyTAC from "./pages/Dashboard/TransferVerifyTAC";
import TransferStatus from "./pages/Dashboard/TransferStatus";
import TransfersHistory from "./pages/Dashboard/TransfersHistory";

// ⭐ IMPORTANT: Direct imports for debugging problematic components
import Escrow from "./pages/Dashboard/Escrow"; 
import Crypto from "./pages/Dashboard/Crypto"; // ⭐ DIRECT IMPORT FOR NOW

// Public Pages (lazy loaded)
const Home = lazy(() => import("./pages/Public/Home"));
const About = lazy(() => import("./pages/Public/About"));
const Services = lazy(() => import("./pages/Public/Services"));
const Projects = lazy(() => import("./pages/Public/Projects"));
const Contact = lazy(() => import("./pages/Public/Contact"));

// Dashboard Pages
const DashboardIndex = lazy(() => import("./pages/Dashboard"));
const DashboardHome = lazy(() => import("./pages/Dashboard/Home"));
const Transfer = lazy(() => import("./pages/Dashboard/Transfer"));
// ⭐ REMOVED: const Crypto = lazy(() => import("./pages/Dashboard/Crypto")); // Using direct import above
const Compliance = lazy(() => import("./pages/Dashboard/Compliance"));
const KYCSubmit = lazy(() => import("./pages/Dashboard/KYCSubmit"));
const AccountSettings = lazy(() => import("./pages/Dashboard/AccountSettings"));
const Insurance = lazy(() => import("./pages/Dashboard/Insurance"));
const Loans = lazy(() => import("./pages/Dashboard/Loans"));
const Savings = lazy(() => import("./pages/Dashboard/Savings"));
const Notifications = lazy(() => import("./pages/Dashboard/Notifications"));

// Import KYC page
const KYC = lazy(() => import("./pages/Dashboard/KYC"));

// Contact Support
const ContactSupport = lazy(() => import("./pages/Dashboard/Contact"));

// Card Pages
const Cards = lazy(() => import("./pages/Dashboard/Cards"));
const CardTransactions = lazy(() => import("./pages/Dashboard/CardTransactions"));

// Profile & Settings
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const Settings = lazy(() => import("./pages/Dashboard/Settings"));

// ⭐ ADD: Create a simple Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider pollInterval={30000}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <Home />
                  </div>
                  <Footer />
                </>
              } />
              
              <Route path="/about" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <About />
                  </div>
                  <Footer />
                </>
              } />
              
              <Route path="/services" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <Services />
                  </div>
                  <Footer />
                </>
              } />
              
              <Route path="/projects" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <Projects />
                  </div>
                  <Footer />
                </>
              } />
              
              <Route path="/contact" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <Contact />
                  </div>
                  <Footer />
                </>
              } />

              {/* Feature Details Page */}
              <Route path="/features" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <FeatureDetails />
                  </div>
                  <Footer />
                </>
              } />

              {/* Project Details Page with dynamic slug */}
              <Route path="/projects/:slug" element={
                <>
                  <PublicNavbar />
                  <div style={{ paddingTop: "80px" }}>
                    <ProjectDetails />
                  </div>
                  <Footer />
                </>
              } />

              {/* Auth Pages */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Dashboard — wrapper with Outlet */}
              <Route path="/dashboard" element={<DashboardIndex />}>
                <Route index element={<DashboardHome />} />
                <Route path="transfer" element={<Transfer />} />
                
                {/* Transfer Flow Routes */}
                <Route path="transfer/verify-tac/:id" element={<TransferVerifyTAC />} />
                <Route path="transfer/status/:id" element={<TransferStatus />} />
                <Route path="transfer/history" element={<TransfersHistory />} />
                
                {/* ⭐ FIXED: Crypto Route - Using directly imported component */}
                <Route path="crypto" element={<Crypto />} />
                
                <Route path="savings" element={<Savings />} />
                <Route path="loans" element={<Loans />} />
                <Route path="insurance" element={<Insurance />} />
                
                {/* FIXED: Escrow Route - Using directly imported component */}
                <Route path="escrow" element={<Escrow />} />
                
                <Route path="compliance" element={<Compliance />} />
                
                {/* KYC Routes */}
                <Route path="kyc" element={<KYC />} />
                <Route path="kyc/submit" element={<KYCSubmit />} />
                
                <Route path="account-settings" element={<AccountSettings />} />
                <Route path="notifications" element={<Notifications />} />
                
                {/* Support Routes */}
                <Route path="support" element={<ContactSupport />} />
                <Route path="contact" element={<ContactSupport />} />
                <Route path="help" element={<ContactSupport />} />
                
                {/* Card Routes */}
                <Route path="cards" element={<Cards />} />
                <Route path="cards/transactions" element={<CardTransactions />} />
                
                {/* Profile & Settings */}
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}