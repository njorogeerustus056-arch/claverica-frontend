"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dashboard;
// src/pages/Dashboard/index.tsx - UPDATED WITH NOTIFICATIONS IMPORT
var react_1 = require("react");
var DashboardLayout_1 = require("../../layout/DashboardLayout");
var react_router_dom_1 = require("react-router-dom");
function Dashboard() {
    return (<DashboardLayout_1.default>
      <react_1.Suspense fallback={<div className="p-10 text-center text-gray-900 dark:text-white">
            Loading...
          </div>}>
        <react_router_dom_1.Outlet />
      </react_1.Suspense>
    </DashboardLayout_1.default>);
}
