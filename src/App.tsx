// src/App.tsx - ADD EDIT PROFILE ROUTE
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Import Providers
import AuthInitializer from "./components/AuthInitializer";

// Auth Pages
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import ActivateAccount from "./pages/AuthPages/ActivateAccount";
import NotFound from "./pages/OtherPage/NotFound";

// Public Components
import PublicNavbar from "./components/PublicNavbar";
import Footer from "./components/Footer";

// Feature Pages
import FeatureDetails from "./pages/features/FeatureDetails";
import ProjectDetails from "./pages/features/ProjectDetails";

// Transfer Flow Pages
import TransferVerifyTAC from "./pages/Dashboard/TransferVerifyTAC";
import TransferStatus from "./pages/Dashboard/TransferStatus";
import TransfersHistory from "./pages/Dashboard/TransfersHistory";

// Dashboard Pages (Direct imports for critical pages)
import Escrow from "./pages/Dashboard/Escrow"; 
import Crypto from "./pages/Dashboard/Crypto";

// Lazy loaded public pages
const Home = lazy(() => import("./pages/Public/Home"));
const About = lazy(() => import("./pages/Public/About"));
const Services = lazy(() => import("./pages/Public/Services"));
const Projects = lazy(() => import("./pages/Public/Projects"));
const Contact = lazy(() => import("./pages/Public/Contact"));

// Lazy loaded dashboard pages
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
const KYC = lazy(() => import("./pages/Dashboard/KYC"));
const ContactSupport = lazy(() => import("./pages/Dashboard/Contact"));
const Cards = lazy(() => import("./pages/Dashboard/Cards"));
const CardTransactions = lazy(() => import("./pages/Dashboard/CardTransactions"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const EditProfile = lazy(() => import("./pages/Dashboard/EditProfile"));
const Settings = lazy(() => import("./pages/Dashboard/Settings"));
const Receipts = lazy(() => import("./pages/Dashboard/Receipts")); // ✅ ADDED: Receipts page

// Loading component with brand colors
function LoadingSpinner() {
  return (
    <div className="loading-container" style={{
      minHeight: '100vh',
      background: '#F5F0E6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(30, 111, 111, 0.1)',
          borderTopColor: '#8626E9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }}></div>
        <p style={{ color: '#1E6F6F', fontWeight: 500 }}>Loading...</p>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <>
      <AuthInitializer>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
                  <Home />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/about" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
                  <About />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/services" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
                  <Services />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/projects" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
                  <Projects />
                </div>
                <Footer />
              </>
            } />
            
            <Route path="/contact" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
                  <Contact />
                </div>
                <Footer />
              </>
            } />

            {/* Feature Details Page */}
            <Route path="/features" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
                  <FeatureDetails />
                </div>
                <Footer />
              </>
            } />

            {/* Project Details Page with dynamic slug */}
            <Route path="/projects/:slug" element={
              <>
                <PublicNavbar />
                <div style={{ paddingTop: '80px' }}>
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

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardIndex />}>
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
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="receipts" element={<Receipts />} /> {/* ✅ ADDED: Receipts route */}
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthInitializer>
    </>
  );
}