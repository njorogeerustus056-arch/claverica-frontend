// Copy and paste this entire file
"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import LiveTicker from "./LiveTicker";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import TawkToWidget from "../components/TawkToWidget";
import { useTheme } from "../context/ThemeContext";
import ProtectedRoute from "../components/ProtectedRoute";

function DashboardLayoutContent() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-50 transition-colors duration-300 ${
      darkMode ? "dark:bg-gray-900" : ""
    }`}>
      <div className="flex flex-col h-screen">
        {/* Live Ticker - Fixed top */}
        <div className="flex-shrink-0">
          <LiveTicker />
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <DashboardSidebar
            isOpen={sidebarOpen}
            close={() => setSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <DashboardHeader
              toggleSidebar={() => setSidebarOpen(true)}
            />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
              <Outlet />
            </main>
          </div>
        </div>

        {/* Tawk.to Widget - only shows after login */}
        <TawkToWidget />
      </div>
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