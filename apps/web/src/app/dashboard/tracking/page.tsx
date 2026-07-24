"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Search,
  Layers,
  Maximize2,
  RefreshCw,
  Truck,
  Activity,
  Clock,
  WifiOff,
  Square,
} from "lucide-react";

// Dynamic import for Leaflet (SSR incompatible)
const TrackingMap = dynamic(
  () => import("@/components/maps/TrackingMap"),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="w-full h-full bg-dark-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Loading map...</p>
      </div>
    </div>
  );
}

const vehicleList = [
  { id: "1", number: "AP39AB1234", driver: "Ravi Kumar", status: "running", speed: 35, fuel: 72, lat: 17.385, lng: 78.4867, model: "JCB 3DX" },
  { id: "2", number: "TS09CD5678", driver: "Suresh Reddy", status: "running", speed: 12, fuel: 58, lat: 19.076, lng: 72.8777, model: "CAT 320GC" },
  { id: "3", number: "MH12EF9012", driver: "Amit Sharma", status: "idle", speed: 0, fuel: 45, lat: 18.5204, lng: 73.8567, model: "Komatsu PC200" },
  { id: "4", number: "KA01GH3456", driver: "Rajesh Kumar", status: "stopped", speed: 0, fuel: 90, lat: 12.9716, lng: 77.5946, model: "Volvo EC210D" },
  { id: "5", number: "TN22IJ7890", driver: "Mohan Das", status: "running", speed: 28, fuel: 63, lat: 13.0827, lng: 80.2707, model: "JCB 455ZX" },
  { id: "6", number: "AP07KL2345", driver: "Prakash Rao", status: "offline", speed: 0, fuel: 100, lat: 16.5062, lng: 80.648, model: "Tata Hitachi" },
  { id: "7", number: "TS05MN6789", driver: "Venkat Rao", status: "running", speed: 8, fuel: 34, lat: 17.686, lng: 83.2185, model: "JCB VM115" },
  { id: "8", number: "MH04OP1234", driver: "Ramesh Patil", status: "idle", speed: 0, fuel: 51, lat: 17.1899, lng: 81.7787, model: "CAT D6" },
];

const statusConfig: Record<string, { color: string; label: string; icon: React.ElementType }> = {
  running: { color: "text-green-500", label: "Running", icon: Activity },
  idle: { color: "text-yellow-500", label: "Idle", icon: Clock },
  stopped: { color: "text-red-500", label: "Stopped", icon: Square },
  offline: { color: "text-gray-400", label: "Offline", icon: WifiOff },
};

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const counts = {
    total: vehicleList.length,
    running: vehicleList.filter((v) => v.status === "running").length,
    idle: vehicleList.filter((v) => v.status === "idle").length,
    stopped: vehicleList.filter((v) => v.status === "stopped").length,
    offline: vehicleList.filter((v) => v.status === "offline").length,
  };

  const filtered = vehicleList.filter((v) => {
    const matchSearch =
      v.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-4">
      {/* Sidebar Panel */}
      <div className="w-80 shrink-0 flex flex-col bg-surface rounded-2xl border border-border overflow-hidden">
        {/* Status Summary */}
        <div className="p-4 border-b border-border">
          <h2 className="font-heading font-bold text-dark text-lg mb-3">
            Live Tracking
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { key: "running", count: counts.running, color: "bg-green-500" },
              { key: "idle", count: counts.idle, color: "bg-yellow-500" },
              { key: "stopped", count: counts.stopped, color: "bg-red-500" },
              { key: "offline", count: counts.offline, color: "bg-gray-400" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() =>
                  setStatusFilter(statusFilter === s.key ? "all" : s.key)
                }
                className={`text-center py-2 rounded-xl transition-all ${
                  statusFilter === s.key
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-background border-2 border-transparent hover:border-border"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-1`} />
                <p className="text-lg font-heading font-bold text-dark">
                  {s.count}
                </p>
                <p className="text-[9px] text-text-muted uppercase tracking-wider capitalize">
                  {s.key}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vehicle or driver..."
              className="w-full pl-9 pr-3 py-2 bg-background rounded-lg border border-border text-sm focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        {/* Vehicle List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((vehicle) => {
            const config = statusConfig[vehicle.status];
            const StatusIcon = config.icon;
            const isSelected = selectedVehicle === vehicle.id;
            return (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle.id)}
                className={`w-full text-left px-4 py-3 border-b border-border/50 hover:bg-primary/5 transition-all ${
                  isSelected ? "bg-primary/10 border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-dark text-sm">
                    {vehicle.number}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${config.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-text-muted">{vehicle.model} • {vehicle.driver}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                  {vehicle.speed > 0 && (
                    <span className="text-green-600 font-semibold">
                      {vehicle.speed} km/h
                    </span>
                  )}
                  <span>⛽ {vehicle.fuel}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Total */}
        <div className="px-4 py-3 border-t border-border bg-background">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">
              Total: <span className="font-bold text-dark">{counts.total}</span> vehicles
            </span>
            <button className="text-primary font-semibold text-xs flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-border relative">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <button className="w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center text-text-secondary hover:text-dark hover:border-primary transition-all shadow-card">
            <Layers className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center text-text-secondary hover:text-dark hover:border-primary transition-all shadow-card">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <TrackingMap vehicles={filtered} selectedVehicle={selectedVehicle} />
      </div>
    </div>
  );
}
