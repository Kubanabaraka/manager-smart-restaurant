import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ManagerLayout from "./components/layout/ManagerLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MenuListPage from "./pages/MenuListPage.jsx";
import MenuItemFormPage from "./pages/MenuItemFormPage.jsx";
import WaiterListPage from "./pages/WaiterListPage.jsx";
import WaiterFormPage from "./pages/WaiterFormPage.jsx";
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
          <Route path="/waiters" element={<WaiterListPage />} />
          <Route
            path="/waiters/add"
            element={<WaiterFormPage mode="create" />}
          />
          <Route path="/waiters/:id" element={<WaiterFormPage mode="edit" />} />
          <Route path="/qr" element={<QrGeneratorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </ManagerLayout>
    </div>
  );
}

export default App;
