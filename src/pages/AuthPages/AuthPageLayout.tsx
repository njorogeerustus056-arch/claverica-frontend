import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Modern Fintech Header - Monzo Style */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            {/* ENLARGED NAME - from text-lg to text-xl */}
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Clave<span className="text-brand-500">Rica</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content - Wise Split Screen Style */}
      <div className="relative flex flex-col lg:flex-row w-full min-h-screen pt-16">
        {/* Form Side - Revolut Clean Design */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md lg:max-w-lg">
            <div className="lg:hidden mb-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
                  <img
                    src="/images/auth/shield-security.svg"
                    alt="Security Shield"
                    className="w-10 h-10 text-white"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Goldman Sachs-grade digital finance
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Institutional security for crypto & payments
              </p>
            </div>
            {children}
          </div>
        </div>

        {/* Brand Side - Binance Professional Style */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-900 via-brand-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="relative flex-1 flex items-center justify-center p-12">
            {/* Grid Background - Modern Fintech Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <GridShape />
            </div>
            
            {/* Animated Dots Pattern - Skrill Style */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/30 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-white/20 animate-pulse delay-300"></div>
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white/30 animate-pulse delay-700"></div>
            </div>

            {/* Content Container - Monzo Clean Card */}
            <div className="relative z-10 max-w-md p-8 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl">
              {/* Logo & Shield - Wise Trust Design */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 shadow-2xl flex items-center justify-center">
                    <img
                      src="/images/auth/shield-security.svg"
                      alt="Bank-Grade Security"
                      className="w-full h-full text-brand-600 dark:text-brand-400"
                    />
                  </div>
                </div>
              </div>

              {/* Headline - Revolut Bold */}
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Institutional Digital Finance
              </h2>
              <p className="text-white/80 text-center mb-8 text-lg">
                Goldman Sachs-grade security infrastructure
              </p>

              {/* Features Grid - Binance Feature Cards */}
              <div className="space-y-4 mb-10">
                {[
                  {
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    text: "256-bit AES encryption",
                    color: "text-green-400"
                  },
                  {
                    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                    text: "Multi-signature vaults",
                    color: "text-blue-400"
                  },
                  {
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                    text: "Fortune 500 treasury teams",
                    color: "text-purple-400"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 dark:bg-black/20 rounded-xl backdrop-blur-sm border border-white/10"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${feature.color}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                      </svg>
                    </div>
                    <span className="text-white/90 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badge - Skrill Verification Style */}
              <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">9M+</div>
                  <div className="text-xs text-white/60">Users Worldwide</div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">150+</div>
                  <div className="text-xs text-white/60">Countries</div>
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">$50B+</div>
                  <div className="text-xs text-white/60">Assets Secured</div>
                </div>
              </div>

              {/* Legal Text - Modern Fintech Style */}
              <p className="text-white/50 text-xs text-center mt-8">
                ClaveRica is a member of Goldman Sachs Group. Funds protected. <br className="hidden sm:block" />
                Read our <a href="#" className="underline hover:text-white/70">Terms</a> and <a href="#" className="underline hover:text-white/70">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer - Monzo Clean */}
      <div className="lg:hidden absolute bottom-6 left-0 right-0 px-6">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ClaveRica. A Goldman Sachs Group Company.</p>
          <p className="mt-1 text-xs">All investments involve risk.</p>
        </div>
      </div>
    </div>
  );
}