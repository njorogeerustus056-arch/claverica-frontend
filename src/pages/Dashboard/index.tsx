// src/pages/Dashboard/index.tsx - UPDATED WITH NOTIFICATIONS IMPORT
import { Suspense } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="p-10 text-center text-gray-900 dark:text-white">
            Loading...
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}