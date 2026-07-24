"use client";

import { Fuel, TrendingUp, TrendingDown, Plus, IndianRupee, Droplets, Gauge } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const fuelData = [
  { month: "Jan", consumption: 12500, cost: 1125000, mileage: 3.2 },
  { month: "Feb", consumption: 13200, cost: 1188000, mileage: 3.1 },
  { month: "Mar", consumption: 11800, cost: 1062000, mileage: 3.4 },
  { month: "Apr", consumption: 14100, cost: 1269000, mileage: 3.0 },
  { month: "May", consumption: 13500, cost: 1215000, mileage: 3.2 },
  { month: "Jun", consumption: 15200, cost: 1368000, mileage: 2.9 },
  { month: "Jul", consumption: 14800, cost: 1332000, mileage: 3.1 },
];

const entries = [
  { id: "1", vehicle: "AP39AB1234", date: "2026-07-24", type: "Diesel", qty: 120, rate: 89.5, total: 10740, odometer: 24560, station: "HP Petrol Bunk, Madhapur" },
  { id: "2", vehicle: "TS09CD5678", date: "2026-07-24", type: "Diesel", qty: 95, rate: 89.5, total: 8503, odometer: 18920, station: "IOCL, Thane" },
  { id: "3", vehicle: "TN22IJ7890", date: "2026-07-23", type: "Diesel", qty: 140, rate: 90.0, total: 12600, odometer: 31240, station: "BP, OMR Chennai" },
  { id: "4", vehicle: "TS05MN6789", date: "2026-07-23", type: "Diesel", qty: 80, rate: 89.5, total: 7160, odometer: 15670, station: "HP, Vizag Port" },
  { id: "5", vehicle: "MH04OP1234", date: "2026-07-22", type: "Diesel", qty: 200, rate: 88.9, total: 17780, odometer: 42100, station: "BPCL, Polavaram" },
];

export default function FuelPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Fuel Management</h1>
          <p className="text-text-secondary text-sm mt-1">Track fuel consumption and costs</p>
        </div>
        <button className="btn-primary inline-flex"><Plus className="w-4 h-4" /> Add Fuel Entry</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Consumption", value: "14,800L", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+3.2%" },
          { label: "Total Cost", value: "₹13.32L", icon: IndianRupee, color: "text-green-500", bg: "bg-green-500/10", trend: "-2.6%" },
          { label: "Avg. Mileage", value: "3.1 km/L", icon: Gauge, color: "text-primary", bg: "bg-primary/10", trend: "+0.2" },
          { label: "Entries This Month", value: "156", icon: Fuel, color: "text-orange-500", bg: "bg-orange-500/10", trend: "+12" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-premium p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-bold text-success">
                  <TrendingUp className="w-3 h-3" />{card.trend}
                </span>
              </div>
              <p className="text-xl font-heading font-bold text-dark">{card.value}</p>
              <p className="text-xs text-text-muted mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <h3 className="font-heading font-bold text-dark mb-4">Monthly Consumption (Liters)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#999" }} />
                <YAxis tick={{ fontSize: 12, fill: "#999" }} />
                <Tooltip contentStyle={{ background: "#111", border: "none", borderRadius: "12px", color: "#fff", fontSize: "13px" }} />
                <Bar dataKey="consumption" fill="#FFCC00" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-premium p-6">
          <h3 className="font-heading font-bold text-dark mb-4">Mileage Trend (km/L)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#999" }} />
                <YAxis tick={{ fontSize: 12, fill: "#999" }} domain={[2.5, 3.8]} />
                <Tooltip contentStyle={{ background: "#111", border: "none", borderRadius: "12px", color: "#fff", fontSize: "13px" }} />
                <Line type="monotone" dataKey="mileage" stroke="#22C55E" strokeWidth={3} dot={{ r: 5, fill: "#22C55E" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Entries Table */}
      <div className="card-premium overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-heading font-bold text-dark">Recent Fuel Entries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-background">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Fuel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Qty (L)</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Rate</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Total</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Odometer</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Station</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-primary/3 transition-colors">
                  <td className="px-4 py-3 font-bold text-dark">{e.vehicle}</td>
                  <td className="px-4 py-3 text-text-secondary">{e.date}</td>
                  <td className="px-4 py-3 text-text-secondary">{e.type}</td>
                  <td className="px-4 py-3 font-semibold text-dark">{e.qty}</td>
                  <td className="px-4 py-3 text-text-secondary">₹{e.rate}</td>
                  <td className="px-4 py-3 font-bold text-dark">₹{e.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-text-secondary">{e.odometer.toLocaleString()} km</td>
                  <td className="px-4 py-3 text-text-secondary truncate max-w-[200px]">{e.station}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
