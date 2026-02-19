"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import LiveTicker from "./LiveTicker";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import TawkToWidget from "../components/TawkToWidget";
import { useTheme } from "../context/ThemeContext";
import ProtectedRoute from "../components/ProtectedRoute";
import styles from './DashboardLayout.module.css';

function DashboardLayoutContent() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`${styles.layout} ${darkMode ? styles.dark : ''}`}>
      {/* Live Ticker */}
      <LiveTicker />

      <div className={styles.container}>
        {/* Sidebar */}
        <DashboardSidebar
          isOpen={sidebarOpen}
          close={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Header */}
          <DashboardHeader
            toggleSidebar={() => setSidebarOpen(true)}
          />

          {/* Page Content */}
          <main className={styles.content}>
            <div className={styles.contentWrapper}>
              <Outlet />
            </div>
          </main>

          {/* Mobile Bottom Navigation - Only visible on mobile */}
          <div className={styles.mobileNav}>
            <button className={styles.mobileNavItem}>
              <span className={styles.mobileNavIcon}>🏠</span>
              <span className={styles.mobileNavLabel}>Home</span>
            </button>
            <button className={styles.mobileNavItem}>
              <span className={styles.mobileNavIcon}>💸</span>
              <span className={styles.mobileNavLabel}>Send</span>
            </button>
            <button className={`${styles.mobileNavItem} ${styles.mobileNavActive}`}>
              <span className={styles.mobileNavIcon}>📊</span>
              <span className={styles.mobileNavLabel}>Dashboard</span>
            </button>
            <button className={styles.mobileNavItem}>
              <span className={styles.mobileNavIcon}>💳</span>
              <span className={styles.mobileNavLabel}>Cards</span>
            </button>
            <button className={styles.mobileNavItem}>
              <span className={styles.mobileNavIcon}>👤</span>
              <span className={styles.mobileNavLabel}>Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tawk.to Widget */}
      <TawkToWidget />
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent />
    </ProtectedRoute>
  );
}