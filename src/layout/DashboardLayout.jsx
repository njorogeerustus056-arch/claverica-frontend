"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var LiveTicker_1 = require("./LiveTicker");
var DashboardHeader_1 = require("./DashboardHeader");
var DashboardSidebar_1 = require("./DashboardSidebar");
var ChatBubble_1 = require("../components/ChatBubble");
var ThemeContext_1 = require("../context/ThemeContext");
var ProtectedRoute_1 = require("../components/ProtectedRoute");
function DashboardLayoutContent() {
    var darkMode = (0, ThemeContext_1.useTheme)().darkMode;
    var _a = (0, react_1.useState)(false), sidebarOpen = _a[0], setSidebarOpen = _a[1];
    return (<div className={"min-h-screen bg-gray-50 transition-colors duration-300 ".concat(darkMode ? "dark:bg-gray-900" : "")}>
      <div className="flex flex-col h-screen">
        {/* Live Ticker - Fixed top */}
        <div className="flex-shrink-0">
          <LiveTicker_1.default />
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <DashboardSidebar_1.default isOpen={sidebarOpen} close={function () { return setSidebarOpen(false); }}/>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <DashboardHeader_1.default toggleSidebar={function () { return setSidebarOpen(true); }}/>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
              <react_router_dom_1.Outlet />
            </main>
          </div>
        </div>

        {/* Chat Bubble */}
        <ChatBubble_1.default />
      </div>
    </div>);
}
function DashboardLayout() {
    return (<ProtectedRoute_1.default>
      <DashboardLayoutContent />
    </ProtectedRoute_1.default>);
}
