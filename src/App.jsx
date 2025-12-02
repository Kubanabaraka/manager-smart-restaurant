import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "./components/layout/ManagerLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MenuListPage from "./pages/MenuListPage.jsx";
import MenuItemFormPage from "./pages/MenuItemFormPage.jsx";
import StaffPage from "./pages/StaffPage.jsx";
import WaiterFormPage from "./pages/WaiterFormPage.jsx";
import KitchenStaffFormPage from "./pages/KitchenStaffFormPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import QrGeneratorPage from "./pages/QrGeneratorPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function App() {
  const isAuthenticated = true; // TODO: wire up to real auth state

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <ManagerLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/menu" element={<MenuListPage />} />
          <Route
            path="/menu/add"
            element={<MenuItemFormPage mode="create" />}
          />
          <Route path="/menu/:id" element={<MenuItemFormPage mode="edit" />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route
            path="/staff/waiters/add"
            element={<WaiterFormPage mode="create" />}
          />
          <Route
            path="/staff/waiters/:id"
            element={<WaiterFormPage mode="edit" />}
          />
          <Route
            path="/staff/kitchen/add"
            element={<KitchenStaffFormPage mode="create" />}
          />
          <Route
            path="/staff/kitchen/:id"
            element={<KitchenStaffFormPage mode="edit" />}
          />
          {/* Redirect old routes to new staff page */}
          <Route path="/waiters" element={<Navigate to="/staff" replace />} />
          <Route path="/waiters/*" element={<Navigate to="/staff" replace />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/qr" element={<QrGeneratorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </ManagerLayout>
    </div>
  );
}

export default App;
