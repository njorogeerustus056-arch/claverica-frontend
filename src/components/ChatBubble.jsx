"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatBubble;
// src/components/ChatBubble.tsx
var lucide_react_1 = require("lucide-react");
function ChatBubble() {
    var openChat = function () {
        // Check if tawk.to is available (only in production)
        if (typeof window.Tawk_API !== 'undefined') {
            window.Tawk_API.maximize(); // Opens tawk.to widget
        }
        else {
            // Development fallback
            if (process.env.NODE_ENV === 'development') {
                console.log('💬 Chat would open in production');
            }
            // Optional: Show a message or just do nothing
            // alert('Live chat will be available when the site is live!');
        }
    };
    return (<div className="fixed bottom-6 right-6 z-50 group">
      <button onClick={openChat} className="relative bg-blue-600 hover:bg-blue-700 text-white rounded-full p-5 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
        <lucide_react_1.MessageCircle size={32} className="drop-shadow-lg"/>
        
        {/* Red notification badge with "1" */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse ring-4 ring-red-500 ring-opacity-50">
          1
        </span>

        {/* Optional "Chat" text that appears on hover */}
        <span className="absolute -left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Live Support
        </span>
      </button>
    </div>);
}
