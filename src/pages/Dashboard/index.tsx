// src/pages/Dashboard/index.tsx
import { Suspense } from "react";
import DashboardLayout from "../../layout/DashboardLayout"; // Correct path - layout folder
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="p-4 sm:p-6 md:p-10 text-center text-gray-900 dark:text-white">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-base sm:text-lg">Loading dashboard...</p>
            </div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}