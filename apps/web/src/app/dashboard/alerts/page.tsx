"use client";

import { useState } from "react";
import { Bell, AlertTriangle, ShieldAlert, CheckCircle, Clock, Zap, Filter, Search, Check } from "lucide-react";

const alertsData = [
  { id: "1", type: "OVERSPEED", severity: "HIGH", title: "Overspeed Violation", message: "Vehicle AP39AB1234 reached 94 km/h in a 60 km/h zone on NH-44", vehicle: "AP39AB1234", driver: "Ravi Kumar", location: "NH-44 Km 142", time: "10 mins ago", isRead: false, isResolved: false },
  { id: "2", type: "GEOFENCE_EXIT", severity: "CRITICAL", title: "Geofence Exit Detected", message: "Excavator EX-045 moved outside the designated Navi Mumbai construction perimeter", vehicle: "TS09CD5678", driver: "Suresh Reddy", location: "Outer Ring Road", time: "25 mins ago", isRead: false, isResolved: false },
  { id: "3", type: "MAINTENANCE_DUE", severity: "MEDIUM", title: "Preventive Maintenance Overdue", message: "JCB 3DX #BH-008 has exceeded service interval by 250 km", vehicle: "MH12EF9012", driver: "Amit Sharma", location: "Pune Site", time: "1 hour ago", isRead: true, isResolved: false },
  { id: "4", type: "FUEL_LOW", severity: "LOW", title: "Low Fuel Warning", message: "Fuel level dropped below 15% (12L remaining)", vehicle: "TS05MN6789", driver: "Venkat Rao", location: "Vizag Site", time: "2 hours ago", isRead: true, isResolved: true },
  { id: "5", type: "IDLE_TIME", severity: "MEDIUM", title: "Excessive Engine Idling", message: "Bulldozer BD-003 idling for over 45 minutes without movement", vehicle: "MH04OP1234", driver: "Ramesh Patil", location: "Polavaram Site", time: "3 hours ago", isRead: true, isResolved: true },
  { id: "6", type: "LICENSE_EXPIRY", severity: "HIGH", title: "Driver License Expiration", message: "Driver Suresh Reddy's HMV license expires in 14 days", vehicle: "N/A", driver: "Suresh Reddy", location: "HR Department", time: "5 hours ago", isRead: true, isResolved: false },
];

const severityColors: Record<string, { bg: string; text: string; border: string }> = {
  CRITICAL: { bg: "bg-red-500/10", text: "text-red-500", border: "border-l-red-500" },
  HIGH: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-l-orange-500" },
  MEDIUM: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-l-yellow-500" },
  LOW: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertsData);
  const [filterSeverity, setFilterSeverity] = useState("ALL");
  const [search, setSearch] = useState("");

  const toggleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isResolved: !a.isResolved } : a))
    );
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchSev = filterSeverity === "ALL" || a.severity === filterSeverity;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      a.driver.toLowerCase().includes(search.toLowerCase());
    return matchSev && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Alerts & System Monitoring</h1>
          <p className="text-text-secondary text-sm mt-1">Real-time alerts for overspeed, geofence, maintenance, and safety violations</p>
        </div>
        <button
          onClick={() => setAlerts((prev) => prev.map((a) => ({ ...a, isResolved: true, isRead: true })))}
          className="btn-primary inline-flex text-xs"
        >
          <Check className="w-4 h-4" /> Acknowledge All
        </button>
      </div>

      {/* Filters & Search */}
      <div className="card-premium p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts by title, vehicle, or driver..."
            className="w-full pl-10 pr-4 py-2 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-1">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                filterSeverity === sev
                  ? "bg-primary text-dark"
                  : "bg-background text-text-muted border border-border hover:text-dark"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const sev = severityColors[alert.severity] || severityColors.LOW;
          return (
            <div
              key={alert.id}
              className={`card-premium p-5 border-l-4 ${sev.border} transition-all ${
                alert.isResolved ? "opacity-60" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${sev.bg} flex items-center justify-center shrink-0`}>
                    <AlertTriangle className={`w-5 h-5 ${sev.text}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-dark text-base">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${sev.bg} ${sev.text}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{alert.message}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                      <span>🚜 Vehicle: <strong className="text-dark">{alert.vehicle}</strong></span>
                      <span>👤 Driver: <strong className="text-dark">{alert.driver}</strong></span>
                      <span>📍 Location: <strong className="text-dark">{alert.location}</strong></span>
                      <span>⏰ {alert.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleResolve(alert.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      alert.isResolved
                        ? "bg-green-500/10 text-green-600 border border-green-500/20"
                        : "bg-primary text-dark hover:bg-primary-dark"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {alert.isResolved ? "Resolved" : "Mark Resolved"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
