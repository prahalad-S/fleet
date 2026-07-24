"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Activity,
  Clock,
  Wrench,
  Users,
  UserCheck,
  Fuel,
  Route,
  Gauge,
  Package,
  Bell,
  Wifi,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  MapPin,
  BarChart3,
} from "lucide-react";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FleetMapPreview from "@/components/dashboard/FleetMapPreview";

const statCards = [
  {
    label: "Total Vehicles",
    value: "127",
    change: "+3",
    trend: "up",
    icon: Truck,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    label: "Running",
    value: "84",
    change: "+12",
    trend: "up",
    icon: Activity,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    label: "Idle",
    value: "18",
    change: "-5",
    trend: "down",
    icon: Clock,
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    label: "Maintenance",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Wrench,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    label: "Available Drivers",
    value: "45",
    change: "+5",
    trend: "up",
    icon: Users,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    label: "On Duty",
    value: "82",
    change: "+8",
    trend: "up",
    icon: UserCheck,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    label: "Fuel Today",
    value: "2,450L",
    change: "-12%",
    trend: "down",
    icon: Fuel,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    label: "Trips Today",
    value: "34",
    change: "+6",
    trend: "up",
    icon: Route,
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
  },
  {
    label: "Distance (km)",
    value: "8,742",
    change: "+15%",
    trend: "up",
    icon: Gauge,
    color: "from-pink-500 to-fuchsia-600",
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    label: "Inventory",
    value: "1,234",
    change: "-23",
    trend: "down",
    icon: Package,
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    label: "Active Alerts",
    value: "7",
    change: "+3",
    trend: "up",
    icon: Bell,
    color: "from-red-600 to-red-700",
    bgColor: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    label: "GPS Online",
    value: "115",
    change: "90%",
    trend: "up",
    icon: Wifi,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
];

const quickActions = [
  { label: "Add Vehicle", icon: Plus, href: "/dashboard/fleet/new" },
  { label: "Track Fleet", icon: MapPin, href: "/dashboard/tracking" },
  { label: "View Reports", icon: BarChart3, href: "/dashboard/reports" },
  { label: "Manage Alerts", icon: Bell, href: "/dashboard/alerts" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">
            Dashboard
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Welcome back, Arun. Here&apos;s your fleet overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-xl text-sm font-medium text-text-secondary hover:text-dark hover:border-primary transition-all"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Stat Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={fadeUp}
              className="card-premium p-4 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-bold ${
                    card.trend === "up" ? "text-success" : "text-danger"
                  }`}
                >
                  {card.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-heading font-black text-dark leading-none mb-1">
                {card.value}
              </p>
              <p className="text-xs text-text-muted">{card.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts + Map + Activity Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>

        {/* Map Preview */}
        <div>
          <FleetMapPreview />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
