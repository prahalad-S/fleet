"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
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

const vehicleUsageData = [
  { month: "Jan", running: 65, idle: 20, maintenance: 10 },
  { month: "Feb", running: 72, idle: 18, maintenance: 8 },
  { month: "Mar", running: 68, idle: 22, maintenance: 12 },
  { month: "Apr", running: 80, idle: 15, maintenance: 9 },
  { month: "May", running: 78, idle: 16, maintenance: 11 },
  { month: "Jun", running: 85, idle: 12, maintenance: 7 },
  { month: "Jul", running: 84, idle: 18, maintenance: 12 },
];

const tripsData = [
  { month: "Jan", trips: 120, distance: 4200 },
  { month: "Feb", trips: 145, distance: 5100 },
  { month: "Mar", trips: 130, distance: 4600 },
  { month: "Apr", trips: 168, distance: 5900 },
  { month: "May", trips: 155, distance: 5400 },
  { month: "Jun", trips: 190, distance: 6700 },
  { month: "Jul", trips: 175, distance: 6200 },
];

const fuelData = [
  { month: "Jan", consumption: 12500, cost: 1125000 },
  { month: "Feb", consumption: 13200, cost: 1188000 },
  { month: "Mar", consumption: 11800, cost: 1062000 },
  { month: "Apr", consumption: 14100, cost: 1269000 },
  { month: "May", consumption: 13500, cost: 1215000 },
  { month: "Jun", consumption: 15200, cost: 1368000 },
  { month: "Jul", consumption: 14800, cost: 1332000 },
];

const categoryData = [
  { name: "Excavator", value: 35, color: "#FFCC00" },
  { name: "Backhoe", value: 25, color: "#FF6B00" },
  { name: "Bulldozer", value: 15, color: "#3B82F6" },
  { name: "Loader", value: 12, color: "#22C55E" },
  { name: "Crane", value: 8, color: "#A855F7" },
  { name: "Others", value: 32, color: "#6B7280" },
];

type ChartType = "usage" | "trips" | "fuel" | "category";

const chartTabs: { key: ChartType; label: string }[] = [
  { key: "usage", label: "Vehicle Usage" },
  { key: "trips", label: "Monthly Trips" },
  { key: "fuel", label: "Fuel Analytics" },
  { key: "category", label: "Categories" },
];

export default function DashboardCharts() {
  const [activeChart, setActiveChart] = useState<ChartType>("usage");

  return (
    <div className="card-premium p-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {chartTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveChart(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeChart === tab.key
                ? "bg-primary text-dark font-bold"
                : "text-text-muted hover:text-dark hover:bg-background"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === "usage" ? (
            <AreaChart data={vehicleUsageData}>
              <defs>
                <linearGradient id="gradRunning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradIdle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMaintenance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#999" }} />
              <YAxis tick={{ fontSize: 12, fill: "#999" }} />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="running" stroke="#22C55E" fill="url(#gradRunning)" strokeWidth={2} />
              <Area type="monotone" dataKey="idle" stroke="#F59E0B" fill="url(#gradIdle)" strokeWidth={2} />
              <Area type="monotone" dataKey="maintenance" stroke="#EF4444" fill="url(#gradMaintenance)" strokeWidth={2} />
            </AreaChart>
          ) : activeChart === "trips" ? (
            <BarChart data={tripsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#999" }} />
              <YAxis tick={{ fontSize: 12, fill: "#999" }} />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              />
              <Legend />
              <Bar dataKey="trips" fill="#FFCC00" radius={[6, 6, 0, 0]} />
              <Bar dataKey="distance" fill="#FF6B00" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : activeChart === "fuel" ? (
            <LineChart data={fuelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#999" }} />
              <YAxis tick={{ fontSize: 12, fill: "#999" }} />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#FFCC00" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="cost" stroke="#FF6B00" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
