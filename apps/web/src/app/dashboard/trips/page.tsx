"use client";

import { useState } from "react";
import { Plus, Search, MapPin, Clock, Fuel, Route as RouteIcon, Play, Square, CheckCircle, Calendar } from "lucide-react";

const trips = [
  { id: "1", number: "TRP-2026-0034", vehicle: "AP39AB1234", driver: "Ravi Kumar", from: "Hyderabad", to: "Warangal", distance: 145, duration: "3h 20m", fuel: 35, avgSpeed: 42, status: "IN_PROGRESS", date: "2026-07-24" },
  { id: "2", number: "TRP-2026-0033", vehicle: "TS09CD5678", driver: "Suresh Reddy", from: "Mumbai", to: "Pune", distance: 148, duration: "4h 10m", fuel: 42, avgSpeed: 38, status: "COMPLETED", date: "2026-07-24" },
  { id: "3", number: "TRP-2026-0032", vehicle: "TN22IJ7890", driver: "Mohan Das", from: "Chennai", to: "Vellore", distance: 132, duration: "—", fuel: 0, avgSpeed: 0, status: "PLANNED", date: "2026-07-25" },
  { id: "4", number: "TRP-2026-0031", vehicle: "TS05MN6789", driver: "Venkat Rao", from: "Vizag", to: "Rajahmundry", distance: 187, duration: "5h 45m", fuel: 55, avgSpeed: 34, status: "COMPLETED", date: "2026-07-23" },
  { id: "5", number: "TRP-2026-0030", vehicle: "MH04OP1234", driver: "Ramesh Patil", from: "Polavaram", to: "Rajahmundry", distance: 45, duration: "1h 30m", fuel: 12, avgSpeed: 30, status: "COMPLETED", date: "2026-07-23" },
];

const statusMap: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  PLANNED: { bg: "bg-blue-500/10", text: "text-blue-600", icon: Calendar },
  IN_PROGRESS: { bg: "bg-green-500/10", text: "text-green-600", icon: Play },
  COMPLETED: { bg: "bg-gray-500/10", text: "text-gray-600", icon: CheckCircle },
  CANCELLED: { bg: "bg-red-500/10", text: "text-red-600", icon: Square },
};

export default function TripsPage() {
  const [filter, setFilter] = useState("ALL");
  const filtered = trips.filter((t) => filter === "ALL" || t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Trip Management</h1>
          <p className="text-text-secondary text-sm mt-1">{trips.length} trips recorded</p>
        </div>
        <button className="btn-primary inline-flex"><Plus className="w-4 h-4" /> Create Trip</button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["ALL", "PLANNED", "IN_PROGRESS", "COMPLETED"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === s ? "bg-primary text-dark" : "bg-surface text-text-muted hover:text-dark border border-border"}`}>
            {s === "ALL" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Trip List */}
      <div className="space-y-3">
        {filtered.map((trip) => {
          const st = statusMap[trip.status] || statusMap.PLANNED;
          const StIcon = st.icon;
          return (
            <div key={trip.id} className="card-premium p-5 hover:border-primary transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <RouteIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-dark">{trip.number}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${st.bg} ${st.text}`}>
                        <StIcon className="w-3 h-3" />{trip.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <MapPin className="w-3 h-3" />
                      <span>{trip.from}</span>
                      <span className="text-text-muted">→</span>
                      <span>{trip.to}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      🚛 {trip.vehicle} • 👤 {trip.driver} • 📅 {trip.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">{trip.distance} km</p>
                    <p className="text-[10px] text-text-muted uppercase">Distance</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">{trip.duration}</p>
                    <p className="text-[10px] text-text-muted uppercase">Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">{trip.fuel}L</p>
                    <p className="text-[10px] text-text-muted uppercase">Fuel</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">{trip.avgSpeed}</p>
                    <p className="text-[10px] text-text-muted uppercase">Avg km/h</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
