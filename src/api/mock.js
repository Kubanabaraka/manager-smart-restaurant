/**
 * Mock API Module
 * Contains all mocked data and async functions to simulate real API calls.
 * Replace these with actual API calls when connecting to a backend.
 */

// ========================================
// DAILY USER ACCESS TRACKING DATA
// ========================================

// Mocked data: users who accessed the system per day (last 7 days)
export const dailyAccessData = [
  { date: "Nov 26", users: 45 },
  { date: "Nov 27", users: 52 },
  { date: "Nov 28", users: 48 },
  { date: "Nov 29", users: 61 },
  { date: "Nov 30", users: 55 },
  { date: "Dec 1", users: 67 },
  { date: "Dec 2", users: 72 }, // today
];

// Get daily access stats (simulates API call)
export const getDailyAccessStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        todayUsers: 72,
        weeklyData: dailyAccessData,
        totalWeek: dailyAccessData.reduce((sum, d) => sum + d.users, 0),
      });
    }, 300);
  });
};

// ========================================
// WAITER PERFORMANCE DATA
// ========================================

// Mocked data: waiter performance metrics
export const waiterPerformanceData = [
  {
    id: "w1",
    name: "Lucas Brown",
    image: "https://i.pravatar.cc/80?img=12",
    tablesServed: 18,
    ordersCompleted: 42,
    avgRating: 4.8,
  },
  {
    id: "w2",
    name: "Emma Wilson",
    image: "https://i.pravatar.cc/80?img=5",
    tablesServed: 15,
    ordersCompleted: 38,
    avgRating: 4.9,
  },
  {
    id: "w3",
    name: "Noah Davis",
    image: "https://i.pravatar.cc/80?img=8",
    tablesServed: 12,
    ordersCompleted: 29,
    avgRating: 4.6,
  },
  {
    id: "w4",
    name: "Sophia Garcia",
    image: "https://i.pravatar.cc/80?img=9",
    tablesServed: 20,
    ordersCompleted: 48,
    avgRating: 4.7,
  },
];

// Get waiter performance (simulates API call with optional date filter)
export const getWaiterPerformance = (date = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, filter by date; here we return same data
      const sorted = [...waiterPerformanceData].sort(
        (a, b) => b.tablesServed - a.tablesServed
      );
      resolve({
        date: date || new Date().toISOString().split("T")[0],
        waiters: sorted,
        topPerformer: sorted[0],
      });
    }, 300);
  });
};

// ========================================
// ORDERS DATA (EXTENDED)
// ========================================

// Extended orders list with more entries for filtering
export const allOrders = [
  {
    id: "o-1043",
    table: "T12",
    items: 5,
    value: 64.5,
    status: "in-progress",
    since: "7 min",
    waiter: "Lucas Brown",
    time: "12:45 PM",
  },
  {
    id: "o-1042",
    table: "T04",
    items: 3,
    value: 32.9,
    status: "served",
    since: "18 min",
    waiter: "Emma Wilson",
    time: "12:32 PM",
  },
  {
    id: "o-1041",
    table: "T09",
    items: 2,
    value: 22.0,
    status: "pending",
    since: "3 min",
    waiter: "Noah Davis",
    time: "12:50 PM",
  },
  {
    id: "o-1040",
    table: "T07",
    items: 4,
    value: 45.8,
    status: "served",
    since: "35 min",
    waiter: "Lucas Brown",
    time: "12:15 PM",
  },
  {
    id: "o-1039",
    table: "T02",
    items: 6,
    value: 78.2,
    status: "served",
    since: "42 min",
    waiter: "Sophia Garcia",
    time: "12:08 PM",
  },
  {
    id: "o-1038",
    table: "T15",
    items: 2,
    value: 19.5,
    status: "pending",
    since: "5 min",
    waiter: "Emma Wilson",
    time: "12:48 PM",
  },
  {
    id: "o-1037",
    table: "T11",
    items: 3,
    value: 28.9,
    status: "in-progress",
    since: "12 min",
    waiter: "Noah Davis",
    time: "12:38 PM",
  },
  {
    id: "o-1036",
    table: "T06",
    items: 5,
    value: 55.0,
    status: "served",
    since: "50 min",
    waiter: "Sophia Garcia",
    time: "12:00 PM",
  },
];

// Get orders by status filter
export const getOrders = (statusFilter = "all") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = allOrders;
      if (statusFilter === "pending") {
        filtered = allOrders.filter((o) => o.status === "pending");
      } else if (statusFilter === "served") {
        filtered = allOrders.filter((o) => o.status === "served");
      } else if (statusFilter === "in-progress") {
        filtered = allOrders.filter((o) => o.status === "in-progress");
      }
      resolve({
        orders: filtered,
        counts: {
          all: allOrders.length,
          pending: allOrders.filter((o) => o.status === "pending").length,
          served: allOrders.filter((o) => o.status === "served").length,
          inProgress: allOrders.filter((o) => o.status === "in-progress")
            .length,
        },
      });
    }, 300);
  });
};

// ========================================
// REPORTS DATA
// ========================================

// Daily revenue data for the last 7 days
export const revenueData = [
  { date: "Nov 26", revenue: 1245.5, orders: 42 },
  { date: "Nov 27", revenue: 1389.2, orders: 48 },
  { date: "Nov 28", revenue: 1156.8, orders: 39 },
  { date: "Nov 29", revenue: 1678.4, orders: 56 },
  { date: "Nov 30", revenue: 1523.9, orders: 51 },
  { date: "Dec 1", revenue: 1892.3, orders: 63 },
  { date: "Dec 2", revenue: 1456.7, orders: 49 },
];

// Weekly summary data
export const weeklyData = [
  { week: "Week 1", revenue: 8234.5, orders: 276 },
  { week: "Week 2", revenue: 9123.8, orders: 305 },
  { week: "Week 3", revenue: 8756.2, orders: 292 },
  { week: "Week 4", revenue: 9842.8, orders: 328 },
];

// Monthly summary data
export const monthlyData = [
  { month: "Sep", revenue: 32456.8, orders: 1089 },
  { month: "Oct", revenue: 35678.2, orders: 1192 },
  { month: "Nov", revenue: 38234.5, orders: 1274 },
  { month: "Dec", revenue: 12456.7, orders: 416 }, // partial month
];

// Order status breakdown for charts
export const orderStatusData = [
  { name: "Served", value: 156, fill: "#10b981" },
  { name: "Pending", value: 23, fill: "#f97316" },
  { name: "In Progress", value: 18, fill: "#3b82f6" },
];

// Get reports based on period filter
export const getReports = (period = "day") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data;
      let summary;

      switch (period) {
        case "week":
          data = weeklyData;
          summary = {
            totalRevenue: weeklyData.reduce((sum, w) => sum + w.revenue, 0),
            totalOrders: weeklyData.reduce((sum, w) => sum + w.orders, 0),
            avgDaily: weeklyData.reduce((sum, w) => sum + w.revenue, 0) / 28,
          };
          break;
        case "month":
          data = monthlyData;
          summary = {
            totalRevenue: monthlyData.reduce((sum, m) => sum + m.revenue, 0),
            totalOrders: monthlyData.reduce((sum, m) => sum + m.orders, 0),
            avgDaily: monthlyData.reduce((sum, m) => sum + m.revenue, 0) / 120,
          };
          break;
        default: // day
          data = revenueData;
          summary = {
            totalRevenue: revenueData.reduce((sum, d) => sum + d.revenue, 0),
            totalOrders: revenueData.reduce((sum, d) => sum + d.orders, 0),
            avgDaily: revenueData.reduce((sum, d) => sum + d.revenue, 0) / 7,
          };
      }

      resolve({
        period,
        data,
        summary,
        orderStatus: orderStatusData,
      });
    }, 300);
  });
};

// ========================================
// MENU ITEMS WITH IMAGES
// ========================================

export const menuItemsWithImages = [
  {
    id: "m1",
    name: "Spicy Chicken Burger",
    category: "Burgers",
    price: 9.9,
    status: "available",
    popularity: 92,
    prepTime: 12,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop",
  },
  {
    id: "m2",
    name: "Truffle Fries",
    category: "Sides",
    price: 5.5,
    status: "available",
    popularity: 88,
    prepTime: 8,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=80&h=80&fit=crop",
  },
  {
    id: "m3",
    name: "Passion Fruit Iced Tea",
    category: "Drinks",
    price: 4.2,
    status: "out-of-stock",
    popularity: 75,
    prepTime: 3,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=80&h=80&fit=crop",
  },
  {
    id: "m4",
    name: "Grilled Salmon",
    category: "Mains",
    price: 18.9,
    status: "available",
    popularity: 85,
    prepTime: 15,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=80&h=80&fit=crop",
  },
  {
    id: "m5",
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 7.5,
    status: "available",
    popularity: 90,
    prepTime: 10,
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=80&h=80&fit=crop",
  },
];

// ========================================
// WAITERS WITH IMAGES
// ========================================

export const waitersWithImages = [
  {
    id: "w1",
    name: "Lucas Brown",
    email: "lucas.brown@example.com",
    pin: "1289",
    status: "active",
    lastActive: "12 min ago",
    image: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: "w2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    pin: "6734",
    status: "active",
    lastActive: "43 min ago",
    image: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: "w3",
    name: "Noah Davis",
    email: "noah.davis@example.com",
    pin: "9043",
    status: "inactive",
    lastActive: "Yesterday",
    image: "https://i.pravatar.cc/80?img=8",
  },
  {
    id: "w4",
    name: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    pin: "4521",
    status: "active",
    lastActive: "5 min ago",
    image: "https://i.pravatar.cc/80?img=9",
  },
];
