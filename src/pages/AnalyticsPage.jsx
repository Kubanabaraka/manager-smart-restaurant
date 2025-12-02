/**
 * AnalyticsPage.jsx
 * Manager analytics dashboard showing:
 * - Daily user access tracking with 7-day chart
 * - Waiter performance ranking with bar chart
 * - Date filter for waiter performance
 */

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, StatTile, Badge } from "../components/ui";
import { getDailyAccessStats, getWaiterPerformance } from "../api/mock";

function AnalyticsPage() {
  // State for daily access data
  const [accessData, setAccessData] = useState(null);
  // State for waiter performance data
  const [performanceData, setPerformanceData] = useState(null);
  // Date filter for waiter performance (mock - same data returned)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Loading states
  const [loadingAccess, setLoadingAccess] = useState(true);
  const [loadingPerformance, setLoadingPerformance] = useState(true);

  // Fetch daily access stats on mount
  useEffect(() => {
    getDailyAccessStats().then((data) => {
      setAccessData(data);
      setLoadingAccess(false);
    });
  }, []);

  // Fetch waiter performance when date changes
  useEffect(() => {
    setLoadingPerformance(true);
    getWaiterPerformance(selectedDate).then((data) => {
      setPerformanceData(data);
      setLoadingPerformance(false);
    });
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Insights
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Track user activity and waiter performance metrics.
          </p>
        </div>
      </div>

      {/* ========================================
          SECTION 1: Daily User Access Tracking
          ======================================== */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">
          User Access Tracking
        </h2>

        {loadingAccess || !accessData ? (
          <div className="animate-pulse h-48 bg-slate-200 rounded-xl"></div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <StatTile
                label="Users Today"
                value={accessData.todayUsers}
                trend="+8%"
                trendLabel="vs. yesterday"
                accent="brand"
              />
              <StatTile
                label="Weekly Total"
                value={accessData.totalWeek}
                trend="Last 7 days"
                trendLabel=""
                accent="blue"
              />
              <StatTile
                label="Avg. Daily"
                value={Math.round(accessData.totalWeek / 7)}
                trend="Per day"
                trendLabel=""
                accent="green"
              />
            </div>

            {/* Line chart for 7-day user access */}
            <Card
              title="Daily Users (Last 7 Days)"
              description="Number of users who accessed the system each day"
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </>
        )}
      </section>

      {/* ========================================
          SECTION 2: Waiter Performance Tracking
          ======================================== */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Waiter Performance
          </h2>
          {/* Date filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Filter by date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {loadingPerformance || !performanceData ? (
          <div className="animate-pulse h-64 bg-slate-200 rounded-xl"></div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Bar chart for tables served */}
            <Card
              title="Tables Served by Waiter"
              description={`Performance on ${performanceData.date}`}
            >
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData.waiters}
                    layout="vertical"
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="tablesServed"
                      fill="#f97316"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Waiter ranking list */}
            <Card
              title="Performance Ranking"
              description="Waiters ranked by tables served"
            >
              <ul className="space-y-3">
                {performanceData.waiters.map((waiter, index) => (
                  <li
                    key={waiter.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                  >
                    {/* Rank badge */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        index === 0
                          ? "bg-amber-100 text-amber-700"
                          : index === 1
                          ? "bg-slate-200 text-slate-600"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      #{index + 1}
                    </div>

                    {/* Waiter avatar */}
                    <img
                      src={waiter.image}
                      alt={waiter.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    {/* Waiter info */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {waiter.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {waiter.ordersCompleted} orders • ⭐ {waiter.avgRating}
                      </p>
                    </div>

                    {/* Tables served */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-600">
                        {waiter.tablesServed}
                      </p>
                      <p className="text-[10px] text-slate-400">tables</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}

export default AnalyticsPage;
