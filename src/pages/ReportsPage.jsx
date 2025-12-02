/**
 * ReportsPage.jsx
 * Full reports page for the manager with:
 * - Date filter options: Day, Week, Month
 * - Charts showing revenue, orders, served vs pending
 * - Uses Recharts for visualization
 */

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, Button, StatTile } from "../components/ui";
import { getReports } from "../api/mock";

function ReportsPage() {
  // State for the selected time period filter
  const [period, setPeriod] = useState("day");
  // State for report data loaded from mock API
  const [reportData, setReportData] = useState(null);
  // Loading state for better UX
  const [loading, setLoading] = useState(true);

  // Fetch report data whenever the period changes
  useEffect(() => {
    setLoading(true);
    getReports(period).then((data) => {
      setReportData(data);
      setLoading(false);
    });
  }, [period]);

  // Period filter button style helper
  const periodButtonClass = (p) =>
    `px-4 py-2 text-xs font-medium rounded-full transition-colors ${
      period === p
        ? "bg-brand-500 text-white"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`;

  // Show loading skeleton while data is being fetched
  if (loading || !reportData) {
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
            Analytics
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Reports & Insights
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            View revenue, orders, and performance metrics over time.
          </p>
        </div>

        {/* Period Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("day")}
            className={periodButtonClass("day")}
          >
            Daily
          </button>
          <button
            onClick={() => setPeriod("week")}
            className={periodButtonClass("week")}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("month")}
            className={periodButtonClass("month")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile
          label="Total Revenue"
          value={`$${reportData.summary.totalRevenue.toFixed(2)}`}
          trend={period === "day" ? "Last 7 days" : `This ${period}`}
          trendLabel=""
          accent="brand"
        />
        <StatTile
          label="Total Orders"
          value={reportData.summary.totalOrders}
          trend={period === "day" ? "Last 7 days" : `This ${period}`}
          trendLabel=""
          accent="blue"
        />
        <StatTile
          label="Avg. Daily Revenue"
          value={`$${reportData.summary.avgDaily.toFixed(2)}`}
          trend="Per day average"
          trendLabel=""
          accent="green"
        />
      </section>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Line Chart */}
        <Card
          title="Revenue Trend"
          description={`${
            period === "day"
              ? "Daily"
              : period === "week"
              ? "Weekly"
              : "Monthly"
          } revenue breakdown`}
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportData.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey={
                    period === "day"
                      ? "date"
                      : period === "week"
                      ? "week"
                      : "month"
                  }
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
                  dataKey="revenue"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: "#f97316", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders Bar Chart */}
        <Card
          title="Orders Volume"
          description={`Number of orders per ${
            period === "day" ? "day" : period === "week" ? "week" : "month"
          }`}
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey={
                    period === "day"
                      ? "date"
                      : period === "week"
                      ? "week"
                      : "month"
                  }
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
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Order Status Pie Chart */}
      <Card
        title="Order Status Breakdown"
        description="Distribution of served, pending, and in-progress orders today"
      >
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-8">
          <div className="h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportData.orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {reportData.orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-3 lg:mt-8">
            {reportData.orderStatus.map((status) => (
              <div key={status.name} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: status.fill }}
                ></div>
                <span className="text-sm text-slate-700">
                  {status.name}: <strong>{status.value}</strong> orders
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ReportsPage;
