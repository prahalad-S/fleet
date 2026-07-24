"use client";

import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mini fleet map preview for dashboard (static placeholder that links to full tracking)
const vehicleDots = [
  { x: "25%", y: "30%", status: "running", label: "EX-012" },
  { x: "45%", y: "55%", status: "running", label: "BH-008" },
  { x: "70%", y: "25%", status: "idle", label: "BD-003" },
  { x: "60%", y: "70%", status: "running", label: "CR-007" },
  { x: "35%", y: "75%", status: "stopped", label: "WL-015" },
  { x: "80%", y: "50%", status: "running", label: "EX-045" },
  { x: "15%", y: "60%", status: "offline", label: "FT-022" },
];

const statusColors: Record<string, string> = {
  running: "bg-green-500",
  idle: "bg-yellow-500",
  stopped: "bg-red-500",
  offline: "bg-gray-400",
};

const statusPulse: Record<string, string> = {
  running: "bg-green-500/30",
  idle: "bg-yellow-500/30",
  stopped: "bg-red-500/30",
  offline: "bg-gray-400/30",
};

export default function FleetMapPreview() {
  return (
    <div className="card-premium p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-dark text-lg">
          Fleet Map
        </h3>
        <Link
          href="/dashboard/tracking"
          className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
        >
          Full Map <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Map Placeholder */}
      <div className="flex-1 relative rounded-xl bg-dark-700 overflow-hidden min-h-[280px]">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,204,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* India outline (simplified paths) */}
        <svg
          viewBox="0 0 200 250"
          className="absolute inset-0 w-full h-full opacity-10"
        >
          <path
            d="M80 30 L100 25 L130 35 L140 60 L155 80 L150 100 L160 120 L155 140 L145 160 L130 180 L110 200 L90 210 L75 200 L70 180 L60 160 L55 140 L60 120 L50 100 L55 80 L65 60 Z"
            fill="none"
            stroke="#FFCC00"
            strokeWidth="1.5"
          />
        </svg>

        {/* Vehicle Dots */}
        {vehicleDots.map((dot) => (
          <div
            key={dot.label}
            className="absolute group cursor-pointer"
            style={{ left: dot.x, top: dot.y }}
          >
            {/* Pulse ring */}
            <div
              className={`absolute -inset-2 rounded-full ${statusPulse[dot.status]} animate-ping`}
              style={{ animationDuration: "2s" }}
            />
            {/* Dot */}
            <div
              className={`relative w-3 h-3 rounded-full ${statusColors[dot.status]} border-2 border-white/20 shadow-lg`}
            />
            {/* Label */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark/90 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
              {dot.label}
            </div>
          </div>
        ))}

        {/* Status Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-dark/80 backdrop-blur-sm rounded-lg px-3 py-2">
          {[
            { status: "running", count: 4 },
            { status: "idle", count: 1 },
            { status: "stopped", count: 1 },
            { status: "offline", count: 1 },
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${statusColors[item.status]}`}
              />
              <span className="text-white/60 text-[10px] capitalize">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
