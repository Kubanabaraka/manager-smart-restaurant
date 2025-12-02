import React from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

function ManagerLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-100 text-slate-900">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        <Topbar />
        <main className="flex-1 w-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default ManagerLayout;
