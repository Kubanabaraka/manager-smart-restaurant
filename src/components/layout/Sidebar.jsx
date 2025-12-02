import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  ClipboardList,
  BarChart3,
  FileText,
  QrCode,
  Settings,
  ChefHat,
} from "lucide-react";

const navItemBase =
  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors";

const navItemClasses = ({ isActive }) =>
  [
    navItemBase,
    isActive
      ? "bg-brand text-white shadow-sm"
      : "text-slate-400 hover:text-white hover:bg-slate-800/60",
  ].join(" ");

function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-950 text-slate-100 border-r border-slate-800 flex-shrink-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-600 flex items-center justify-center text-white">
          <ChefHat className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">Manager Smart</p>
          <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
            Restaurant
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
        <NavLink to="/dashboard" className={navItemClasses}>
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/menu" className={navItemClasses}>
          <UtensilsCrossed className="h-4 w-4" />
          <span>Menu</span>
        </NavLink>
        <NavLink to="/staff" className={navItemClasses}>
          <Users className="h-4 w-4" />
          <span>Staff</span>
        </NavLink>
        <NavLink to="/orders" className={navItemClasses}>
          <ClipboardList className="h-4 w-4" />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/analytics" className={navItemClasses}>
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/reports" className={navItemClasses}>
          <FileText className="h-4 w-4" />
          <span>Reports</span>
        </NavLink>
        <NavLink to="/qr" className={navItemClasses}>
          <QrCode className="h-4 w-4" />
          <span>QR Generator</span>
        </NavLink>
        <NavLink to="/settings" className={navItemClasses}>
          <Settings className="h-4 w-4" />
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
