import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, menu, waiters..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}

        {/* User Profile */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-3 rounded-xl border border-slate-200 bg-white pl-1.5 pr-3 py-1.5 shadow-sm transition-colors hover:bg-slate-50"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-500 to-brand-600 text-xs font-semibold text-white flex items-center justify-center">
            OM
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              Olivia Martinez
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Shift Manager
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
