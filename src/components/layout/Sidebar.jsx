import React from "react";
import { NavLink } from "react-router-dom";
const Icon = ({ children }) => (
  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[6px] bg-slate-800/80 text-[10px] font-semibold text-orange-400">
    {children}
  </span>
);

const navItemBase =
  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors";

const navItemClasses = ({ isActive }) =>
  [
    navItemBase,
    isActive
      ? "bg-brand text-white shadow-sm"
      : "text-slate-400 hover:text-white hover:bg-slate-800/60",
  ].join(" ");

function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-950 text-slate-100 border-r border-slate-800">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
          MS
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">Manager Smart</p>
          <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
            Restaurant
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
        <NavLink to="/dashboard" className={navItemClasses}>
          <Icon>🏠</Icon>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/menu" className={navItemClasses}>
          <Icon>📋</Icon>
          <span>Menu</span>
        </NavLink>
        <NavLink to="/waiters" className={navItemClasses}>
          <Icon>👥</Icon>
          <span>Waiter Accounts</span>
        </NavLink>
        <NavLink to="/orders" className={navItemClasses}>
          <Icon>🍽️</Icon>
          <span>Orders</span>
        </NavLink>
        <NavLink to="/analytics" className={navItemClasses}>
          <Icon>📊</Icon>
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/reports" className={navItemClasses}>
          <Icon>📈</Icon>
          <span>Reports</span>
        </NavLink>
        <NavLink to="/qr" className={navItemClasses}>
          <Icon>QR</Icon>
          <span>QR Generator</span>
        </NavLink>
        <NavLink to="/settings" className={navItemClasses}>
          <Icon>⚙️</Icon>
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-500">
        <p className="font-medium text-slate-300">Today&apos;s Shift</p>
        <p>Manager: Olivia Martinez</p>
      </div>
    </aside>
  );
}

export default Sidebar;
