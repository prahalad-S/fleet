"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  Grid3X3,
  List,
  Download,
  MoreVertical,
  MapPin,
  Fuel,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Archive,
} from "lucide-react";
import { exportToPDF } from "@/lib/pdf-export";

const vehicles = [
  {
    id: "1",
    vehicleNumber: "AP39AB1234",
    registrationNumber: "AP39AB1234",
    brand: "JCB",
    model: "3DX Backhoe Loader",
    category: "Backhoe Loader",
    year: 2022,
    fuelType: "Diesel",
    status: "RUNNING",
    driver: "Ravi Kumar",
    location: "NH-44, Hyderabad",
    speed: 35,
    fuelLevel: 72,
    image: null,
  },
  {
    id: "2",
    vehicleNumber: "TS09CD5678",
    registrationNumber: "TS09CD5678",
    brand: "Caterpillar",
    model: "320 GC Excavator",
    category: "Excavator",
    year: 2023,
    fuelType: "Diesel",
    status: "RUNNING",
    driver: "Suresh Reddy",
    location: "Navi Mumbai Site",
    speed: 12,
    fuelLevel: 58,
    image: null,
  },
  {
    id: "3",
    vehicleNumber: "MH12EF9012",
    registrationNumber: "MH12EF9012",
    brand: "Komatsu",
    model: "PC200-10M0 Excavator",
    category: "Excavator",
    year: 2021,
    fuelType: "Diesel",
    status: "IDLE",
    driver: "Amit Sharma",
    location: "Pune Bypass Project",
    speed: 0,
    fuelLevel: 45,
    image: null,
  },
  {
    id: "4",
    vehicleNumber: "KA01GH3456",
    registrationNumber: "KA01GH3456",
    brand: "Volvo",
    model: "EC210D Excavator",
    category: "Excavator",
    year: 2023,
    fuelType: "Diesel",
    status: "MAINTENANCE",
    driver: "Unassigned",
    location: "Workshop - Bangalore",
    speed: 0,
    fuelLevel: 90,
    image: null,
  },
  {
    id: "5",
    vehicleNumber: "TN22IJ7890",
    registrationNumber: "TN22IJ7890",
    brand: "JCB",
    model: "455ZX Wheel Loader",
    category: "Wheel Loader",
    year: 2022,
    fuelType: "Diesel",
    status: "RUNNING",
    driver: "Mohan Das",
    location: "Chennai Smart City",
    speed: 28,
    fuelLevel: 63,
    image: null,
  },
  {
    id: "6",
    vehicleNumber: "AP07KL2345",
    registrationNumber: "AP07KL2345",
    brand: "Tata Hitachi",
    model: "ZAXIS 120 Excavator",
    category: "Mini Excavator",
    year: 2024,
    fuelType: "Diesel",
    status: "AVAILABLE",
    driver: "Unassigned",
    location: "Depot - Vijayawada",
    speed: 0,
    fuelLevel: 100,
    image: null,
  },
  {
    id: "7",
    vehicleNumber: "TS05MN6789",
    registrationNumber: "TS05MN6789",
    brand: "JCB",
    model: "VM115 Compactor",
    category: "Compactor",
    year: 2021,
    fuelType: "Diesel",
    status: "RUNNING",
    driver: "Venkat Rao",
    location: "NH-65, Vijayawada",
    speed: 8,
    fuelLevel: 34,
    image: null,
  },
  {
    id: "8",
    vehicleNumber: "MH04OP1234",
    registrationNumber: "MH04OP1234",
    brand: "Caterpillar",
    model: "D6 Bulldozer",
    category: "Bulldozer",
    year: 2020,
    fuelType: "Diesel",
    status: "IDLE",
    driver: "Ramesh Patil",
    location: "Polavaram Dam Site",
    speed: 0,
    fuelLevel: 51,
    image: null,
  },
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  RUNNING: { bg: "bg-green-500/10", text: "text-green-600", dot: "bg-green-500" },
  IDLE: { bg: "bg-yellow-500/10", text: "text-yellow-600", dot: "bg-yellow-500" },
  MAINTENANCE: { bg: "bg-orange-500/10", text: "text-orange-600", dot: "bg-orange-500" },
  AVAILABLE: { bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
  BREAKDOWN: { bg: "bg-red-500/10", text: "text-red-600", dot: "bg-red-500" },
};

const categoryIcons: Record<string, string> = {
  Excavator: "🦾",
  "Backhoe Loader": "🏗️",
  Bulldozer: "🚜",
  "Wheel Loader": "⚙️",
  "Mini Excavator": "🔩",
  Compactor: "🛞",
  Crane: "🏗️",
  Forklift: "📦",
  "Dump Truck": "🚛",
  Telehandler: "🔧",
};

export default function FleetPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">
            Fleet Management
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            {vehicles.length} vehicles in your fleet
          </p>
        </div>
        <Link
          href="/dashboard/fleet/new"
          className="btn-primary inline-flex"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="card-premium p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle number, brand, model, driver..."
              className="w-full pl-10 pr-4 py-2.5 bg-background rounded-xl border border-border text-sm text-dark placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 flex-wrap">
            {["ALL", "RUNNING", "IDLE", "MAINTENANCE", "AVAILABLE"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    statusFilter === status
                      ? "bg-primary text-dark"
                      : "bg-background text-text-muted hover:text-dark border border-border"
                  }`}
                >
                  {status === "ALL" ? "All" : status}
                </button>
              )
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-background rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-dark"
                  : "text-text-muted hover:text-dark"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-primary text-dark"
                  : "text-text-muted hover:text-dark"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() =>
              exportToPDF({
                title: "FleetForce Vehicle Fleet Inventory",
                subtitle: `Exported ${filteredVehicles.length} vehicles`,
                filename: "fleet_vehicles_report.pdf",
                headers: ["Vehicle No.", "Brand & Model", "Category", "Driver", "Location", "Status", "Fuel %", "Speed"],
                rows: filteredVehicles.map((v) => [
                  v.vehicleNumber,
                  `${v.brand} ${v.model}`,
                  v.category,
                  v.driver,
                  v.location,
                  v.status,
                  `${v.fuelLevel}%`,
                  v.speed > 0 ? `${v.speed} km/h` : "0 km/h",
                ]),
              })
            }
            title="Export Fleet to PDF"
            className="p-2 bg-background rounded-xl border border-border text-text-muted hover:text-dark hover:border-primary transition-all flex items-center gap-1 font-bold text-xs"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Vehicle Grid / List */}
      {viewMode === "grid" ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredVehicles.map((vehicle) => {
            const statusStyle = statusColors[vehicle.status] || statusColors.AVAILABLE;
            return (
              <motion.div
                key={vehicle.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
                className="card-premium group cursor-pointer"
              >
                {/* Image / Category Icon Area */}
                <div className="h-36 bg-gradient-to-br from-dark-600 to-dark-800 relative flex items-center justify-center">
                  <span className="text-5xl">
                    {categoryIcons[vehicle.category] || "🚜"}
                  </span>
                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusStyle.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                    <span className={`text-[10px] font-bold uppercase ${statusStyle.text}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  {/* Menu */}
                  <button className="absolute top-3 right-3 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {/* Brand */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-primary/90 text-dark text-[10px] font-bold rounded uppercase">
                    {vehicle.brand}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-heading font-bold text-dark text-sm">
                      {vehicle.vehicleNumber}
                    </h3>
                  </div>
                  <p className="text-text-muted text-xs mb-3">
                    {vehicle.model}
                  </p>

                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-text-muted shrink-0" />
                      <span className="truncate">{vehicle.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Fuel className="w-3 h-3 text-text-muted" />
                        <span>{vehicle.fuelLevel}%</span>
                      </div>
                      {vehicle.speed > 0 && (
                        <span className="text-green-600 font-bold">
                          {vehicle.speed} km/h
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">Driver:</span>
                      <span className="font-medium text-dark">
                        {vehicle.driver}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border">
                    <Link
                      href={`/dashboard/fleet/${vehicle.id}`}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      <Eye className="w-3 h-3" /> View
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-text-muted hover:text-dark hover:bg-background rounded-lg transition-colors">
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-semibold text-text-muted hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* Table/List View */
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-background">
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Vehicle</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Driver</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Location</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Fuel</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Speed</th>
                  <th className="text-right px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVehicles.map((vehicle) => {
                  const statusStyle = statusColors[vehicle.status] || statusColors.AVAILABLE;
                  return (
                    <tr
                      key={vehicle.id}
                      className="hover:bg-primary/3 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-lg">
                            {categoryIcons[vehicle.category] || "🚜"}
                          </div>
                          <div>
                            <p className="font-bold text-dark">{vehicle.vehicleNumber}</p>
                            <p className="text-xs text-text-muted">{vehicle.brand} {vehicle.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{vehicle.category}</td>
                      <td className="px-4 py-3 text-text-secondary">{vehicle.driver}</td>
                      <td className="px-4 py-3 text-text-secondary truncate max-w-[200px]">{vehicle.location}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${statusStyle.bg} ${statusStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${vehicle.fuelLevel > 50 ? "bg-green-500" : vehicle.fuelLevel > 20 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-muted">{vehicle.fuelLevel}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {vehicle.speed > 0 ? (
                          <span className="text-green-600">{vehicle.speed} km/h</span>
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/dashboard/fleet/${vehicle.id}`} className="p-1.5 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="p-1.5 hover:bg-primary/10 rounded-lg text-text-muted hover:text-dark transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-red-500/10 rounded-lg text-text-muted hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
