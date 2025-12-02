/**
 * OrdersPage.jsx
 * Orders status overview page showing:
 * - Tabs to filter between Pending, Served, In-Progress, and All orders
 * - Order list using the same card/table style as elsewhere
 */

import React, { useState, useEffect } from "react";
import { Card, Table, Badge } from "../components/ui";
import { getOrders } from "../api/mock";

function OrdersPage() {
  // State for the selected status filter tab
  const [statusFilter, setStatusFilter] = useState("all");
  // State for orders data from mock API
  const [ordersData, setOrdersData] = useState(null);
  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch orders whenever filter changes
  useEffect(() => {
    setLoading(true);
    getOrders(statusFilter).then((data) => {
      setOrdersData(data);
      setLoading(false);
    });
  }, [statusFilter]);

  // Tab button style helper
  const tabClass = (status) =>
    `px-4 py-2 text-xs font-medium rounded-full transition-colors ${
      statusFilter === status
        ? "bg-brand-500 text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`;

  // Table columns configuration
  const columns = [
    { key: "id", header: "Order ID" },
    {
      key: "table",
      header: "Table",
      render: (row) => (
        <span className="inline-flex h-6 items-center rounded-full bg-slate-100 px-2 text-xs font-medium text-slate-700">
          {row.table}
        </span>
      ),
    },
    { key: "items", header: "Items" },
    {
      key: "value",
      header: "Value",
      render: (row) => <span>${row.value.toFixed(2)}</span>,
    },
    {
      key: "waiter",
      header: "Waiter",
      render: (row) => (
        <span className="text-xs text-slate-600">{row.waiter}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge
          color={
            row.status === "served"
              ? "green"
              : row.status === "pending"
              ? "orange"
              : "blue"
          }
        >
          {row.status.replace("-", " ")}
        </Badge>
      ),
    },
    {
      key: "time",
      header: "Time",
      render: (row) => (
        <span className="text-xs text-slate-400">{row.time}</span>
      ),
    },
  ];

  // Show loading state
  if (loading || !ordersData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded mb-4"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Order Management
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Orders Overview
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Track all orders and filter by status.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={tabClass("all")}
        >
          All ({ordersData.counts.all})
        </button>
        <button
          onClick={() => setStatusFilter("pending")}
          className={tabClass("pending")}
        >
          Pending ({ordersData.counts.pending})
        </button>
        <button
          onClick={() => setStatusFilter("in-progress")}
          className={tabClass("in-progress")}
        >
          In Progress ({ordersData.counts.inProgress})
        </button>
        <button
          onClick={() => setStatusFilter("served")}
          className={tabClass("served")}
        >
          Served ({ordersData.counts.served})
        </button>
      </div>

      {/* Orders Table */}
      <Card
        title={`${
          statusFilter === "all"
            ? "All Orders"
            : statusFilter === "pending"
            ? "Pending Orders"
            : statusFilter === "in-progress"
            ? "In-Progress Orders"
            : "Served Orders"
        }`}
        description="Click on a filter tab above to narrow down the list."
      >
        <Table columns={columns} data={ordersData.orders} />
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Served Today
          </p>
          <p className="mt-1 text-2xl font-semibold text-emerald-800">
            {ordersData.counts.served}
          </p>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-orange-700">
            Pending
          </p>
          <p className="mt-1 text-2xl font-semibold text-orange-800">
            {ordersData.counts.pending}
          </p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
            In Progress
          </p>
          <p className="mt-1 text-2xl font-semibold text-blue-800">
            {ordersData.counts.inProgress}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
