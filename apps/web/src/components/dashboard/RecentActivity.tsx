"use client";

import {
  Truck,
  User,
  MapPin,
  Wrench,
  Fuel,
  Bell,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    icon: Truck,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    title: "Vehicle AP39AB1234 started trip",
    desc: "Hyderabad → Warangal • Driver: Ravi Kumar",
    time: "5 min ago",
  },
  {
    icon: Bell,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    title: "Overspeed Alert — Vehicle TS09CD5678",
    desc: "Speed: 92 km/h at NH-44, Kamareddy",
    time: "12 min ago",
  },
  {
    icon: Wrench,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    title: "Maintenance Completed — JCB 3DX #BH-008",
    desc: "Oil change + filter replacement — ₹4,500",
    time: "45 min ago",
  },
  {
    icon: Fuel,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    title: "Fuel Entry Recorded — Excavator EX-012",
    desc: "120L Diesel at ₹89.50/L — Total: ₹10,740",
    time: "1 hour ago",
  },
  {
    icon: User,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    title: "Driver Suresh checked in",
    desc: "Assigned to Bulldozer BD-003 at Navi Mumbai site",
    time: "2 hours ago",
  },
  {
    icon: MapPin,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    title: "Geofence Alert — Crane CR-007",
    desc: "Exited Mumbai Metro Phase 3 project boundary",
    time: "3 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="card-premium p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-dark text-lg">
          Recent Activity
        </h3>
        <button className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-background transition-colors cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-xl ${activity.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-dark truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-text-muted mt-0.5 truncate">
                  {activity.desc}
                </p>
              </div>
              <span className="text-[11px] text-text-muted whitespace-nowrap shrink-0">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
