import React from "react";

function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-full max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search orders, menu, waiters..."
            className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-800"
        >
          <span className="text-xs">🔔</span>
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-brand-500 to-brand-600 text-[11px] font-semibold text-white flex items-center justify-center">
            OM
          </div>
          <div className="mr-1">
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              Olivia Martinez
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Shift Manager
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-brand-500"
          >
            <span className="text-xs">⎋</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
