import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  PlusCircle,
  PauseCircle,
  Clock,
  Megaphone,
  Bell,
  DollarSign,
  ShoppingCart,
  Receipt,
  UtensilsCrossed,
} from "lucide-react";
import {
  Button,
  Card,
  StatTile,
  Table,
  Badge,
  Modal,
  useToast,
} from "../components/ui";
import { todayOrders, topItems } from "../data/orders.js";
import { menuItems } from "../data/menu.js";
import { getDailyAccessStats } from "../api/mock.js";
import { exportToCSV, generateShiftReport } from "../utils/helpers.js";

function DashboardPage() {
  const [accessData, setAccessData] = useState(null);
  const [showNewTableModal, setShowNewTableModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getDailyAccessStats().then((data) => setAccessData(data));
  }, []);

  const totalRevenue = todayOrders.reduce((sum, o) => sum + o.value, 0);
  const openOrders = todayOrders.filter((o) => o.status !== "served").length;

  const handleExportReport = () => {
    const reportData = generateShiftReport(todayOrders, topItems, totalRevenue);
    exportToCSV(
      reportData,
      `shift-report-${new Date().toISOString().split("T")[0]}.csv`
    );
    showToast("Shift report exported successfully!", { type: "success" });
  };

  const handleOpenNewTable = () => {
    setShowNewTableModal(true);
  };

  const handleCreateTable = () => {
    setShowNewTableModal(false);
    showToast("New table created successfully!", { type: "success" });
  };

  const ordersColumns = [
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
      key: "since",
      header: "Since",
      render: (row) => <span className="text-slate-400">{row.since}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Today at Sunset Kitchen
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Monitor orders, revenue, and menu performance in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleExportReport}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export shift report
          </Button>
          <Button size="sm" onClick={handleOpenNewTable}>
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            Open new table
          </Button>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Live Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          trend="+12%"
          trendLabel="vs. yesterday"
          accent="brand"
          icon={DollarSign}
        />
        <StatTile
          label="Open Orders"
          value={openOrders}
          trend="3 tables"
          trendLabel="waiting for kitchen"
          accent="blue"
          icon={ShoppingCart}
        />
        <StatTile
          label="Avg. Ticket"
          value="$27.80"
          trend="+1.3"
          trendLabel="per guest"
          accent="green"
          icon={Receipt}
        />
        <StatTile
          label="Menu Items Online"
          value={menuItems.filter((m) => m.status === "available").length}
          trend={`${menuItems.length} total`}
          trendLabel="items configured"
          accent="red"
          icon={UtensilsCrossed}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Live Orders"
          description="Track what is pending, in progress, and served."
          className="lg:col-span-2"
        >
          <Table columns={ordersColumns} data={todayOrders} />
        </Card>

        <Card
          title="Top Items Today"
          description="Quick view on what is driving revenue."
        >
          <ul className="space-y-3 text-sm">
            {topItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
              >
                <div>
                  <p className="text-xs font-medium text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.sold} sold • ${item.revenue.toFixed(2)}
                  </p>
                </div>
                <div className="text-right text-[11px] text-emerald-600">
                  <p className="font-semibold">
                    {Math.round((item.sold / topItems[0].sold) * 100)}%
                  </p>
                  <p className="text-slate-400">vs. best seller</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Daily User Access Tracking Chart */}
      {accessData && (
        <Card
          title="Daily User Access"
          description="Users accessing the system over the last 7 days."
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accessData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: "#f97316", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <Card
        title="Quick Actions"
        description="One-tap controls for your current shift."
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <Button variant="ghost" size="sm">
            <PauseCircle className="mr-1.5 h-3.5 w-3.5" />
            Pause online orders
          </Button>
          <Button variant="ghost" size="sm">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            Mark kitchen as delayed
          </Button>
          <Button variant="ghost" size="sm">
            <Megaphone className="mr-1.5 h-3.5 w-3.5" />
            Push &quot;Today&apos;s Special&quot; banner
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="mr-1.5 h-3.5 w-3.5" />
            Notify all waiters
          </Button>
        </div>
      </Card>

      {/* New Table Modal */}
      <Modal
        open={showNewTableModal}
        onClose={() => setShowNewTableModal(false)}
        title="Open New Table"
        description="Create a new table for incoming guests."
        primaryAction={
          <Button size="sm" onClick={handleCreateTable}>
            Create Table
          </Button>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Table Number
            </label>
            <input
              type="text"
              placeholder="e.g., T15"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Number of Guests
            </label>
            <input
              type="number"
              placeholder="e.g., 4"
              min="1"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardPage;
