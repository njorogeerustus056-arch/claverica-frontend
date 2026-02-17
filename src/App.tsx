// src/App.tsx - FIXED: NotificationProvider only wraps dashboard routes
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Import Providers - REMOVED AuthProvider
import { NotificationProvider } from "./context/NotificationContext";
import AuthInitializer from "./components/AuthInitializer";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import ActivateAccount from "./pages/AuthPages/ActivateAccount";
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
import Crypto from "./pages/Dashboard/Crypto";

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

// Loading component
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
    <>
      {/* REMOVED AuthProvider - using Zustand store instead */}
      <AuthInitializer>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Pages - NO NotificationProvider */}
            <Route path="/" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <Home />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/about" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <About />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/services" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <Services />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/projects" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <Projects />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/contact" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <Contact />
                </div>
                <Footer />
              </>
            } />

            {/* Feature Details Page */}
            <Route path="/features" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <FeatureDetails />
                </div>
                <Footer />
              </>
            } />

            {/* Project Details Page with dynamic slug */}
            <Route path="/projects/:slug" element={
              <>
                <PublicNavbar />
                <div className="pt-16 md:pt-20 lg:pt-24">
                  <ProjectDetails />
                </div>
                <Footer />
              </>
            } />

            {/* Auth Pages */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/activate" element={<ActivateAccount />} />
            <Route path="/activate-account" element={<ActivateAccount />} />

            {/* ✅ FIXED: Dashboard routes WITH NotificationProvider */}
            <Route path="/dashboard" element={
              <NotificationProvider pollInterval={30000}>
                <DashboardIndex />
              </NotificationProvider>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="transfer" element={<Transfer />} />
              
              {/* Transfer Flow Routes */}
              <Route path="transfer/verify-tac/:id" element={<TransferVerifyTAC />} />
              <Route path="transfer/status/:id" element={<TransferStatus />} />
              <Route path="transfer/history" element={<TransfersHistory />} />
              
              <Route path="crypto" element={<Crypto />} />
              <Route path="savings" element={<Savings />} />
              <Route path="loans" element={<Loans />} />
              <Route path="insurance" element={<Insurance />} />
              <Route path="escrow" element={<Escrow />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="kyc" element={<KYC />} />
              <Route path="kyc/submit" element={<KYCSubmit />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="support" element={<ContactSupport />} />
              <Route path="contact" element={<ContactSupport />} />
              <Route path="help" element={<ContactSupport />} />
              <Route path="cards" element={<Cards />} />
              <Route path="cards/transactions" element={<CardTransactions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthInitializer>
    </>
  );
}