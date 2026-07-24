"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Star,
  MoreVertical,
  Shield,
  Calendar,
} from "lucide-react";

const drivers = [
  { id: "1", name: "Ravi Kumar", empId: "DRV-001", phone: "+91 98765 43210", license: "AP2420220012345", licenseExpiry: "2027-03-15", bloodGroup: "O+", experience: 8, skills: ["Excavator", "Backhoe"], status: "ON_DUTY", vehicle: "AP39AB1234", score: 92, avatar: "RK" },
  { id: "2", name: "Suresh Reddy", empId: "DRV-002", phone: "+91 98765 43211", license: "TS0920210098765", licenseExpiry: "2026-11-20", bloodGroup: "B+", experience: 12, skills: ["Excavator", "Crane"], status: "ON_DUTY", vehicle: "TS09CD5678", score: 88, avatar: "SR" },
  { id: "3", name: "Amit Sharma", empId: "DRV-003", phone: "+91 98765 43212", license: "MH1220190054321", licenseExpiry: "2026-08-10", bloodGroup: "A+", experience: 5, skills: ["Excavator", "Loader"], status: "ON_DUTY", vehicle: "MH12EF9012", score: 95, avatar: "AS" },
  { id: "4", name: "Rajesh Kumar", empId: "DRV-004", phone: "+91 98765 43213", license: "KA0120230067890", licenseExpiry: "2028-01-05", bloodGroup: "AB+", experience: 15, skills: ["Bulldozer", "Crane", "Excavator"], status: "AVAILABLE", vehicle: null, score: 97, avatar: "RJ" },
  { id: "5", name: "Mohan Das", empId: "DRV-005", phone: "+91 98765 43214", license: "TN2220210043210", licenseExpiry: "2026-12-30", bloodGroup: "O-", experience: 7, skills: ["Loader", "Forklift"], status: "ON_DUTY", vehicle: "TN22IJ7890", score: 84, avatar: "MD" },
  { id: "6", name: "Prakash Rao", empId: "DRV-006", phone: "+91 98765 43215", license: "AP0720200078901", licenseExpiry: "2027-06-18", bloodGroup: "B-", experience: 10, skills: ["Excavator", "Compactor"], status: "ON_LEAVE", vehicle: null, score: 90, avatar: "PR" },
  { id: "7", name: "Venkat Rao", empId: "DRV-007", phone: "+91 98765 43216", license: "TS0520220056789", licenseExpiry: "2027-09-22", bloodGroup: "A-", experience: 6, skills: ["Compactor", "Roller"], status: "ON_DUTY", vehicle: "TS05MN6789", score: 86, avatar: "VR" },
  { id: "8", name: "Ramesh Patil", empId: "DRV-008", phone: "+91 98765 43217", license: "MH0420210034567", licenseExpiry: "2026-10-14", bloodGroup: "O+", experience: 9, skills: ["Bulldozer", "Excavator"], status: "ON_DUTY", vehicle: "MH04OP1234", score: 91, avatar: "RP" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  ON_DUTY: { bg: "bg-green-500/10", text: "text-green-600" },
  AVAILABLE: { bg: "bg-blue-500/10", text: "text-blue-600" },
  ON_LEAVE: { bg: "bg-orange-500/10", text: "text-orange-600" },
  SUSPENDED: { bg: "bg-red-500/10", text: "text-red-600" },
};

export default function DriversPage() {
  const [search, setSearch] = useState("");

  const filtered = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.empId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Driver Management</h1>
          <p className="text-text-secondary text-sm mt-1">{drivers.length} drivers registered</p>
        </div>
        <button className="btn-primary inline-flex">
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      {/* Search */}
      <div className="card-premium p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or employee ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
      </div>

      {/* Driver Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filtered.map((driver) => {
          const statusStyle = statusColors[driver.status] || statusColors.AVAILABLE;
          return (
            <motion.div
              key={driver.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="card-premium p-5 group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-lg">
                    {driver.avatar}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark">{driver.name}</h3>
                    <p className="text-xs text-text-muted">{driver.empId}</p>
                  </div>
                </div>
                <button className="text-text-muted hover:text-dark transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Status + Score */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyle.bg} ${statusStyle.text}`}>
                  {driver.status.replace("_", " ")}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-sm font-bold text-dark">{driver.score}</span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-text-muted" />
                  {driver.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-text-muted" />
                  <span className="truncate">{driver.license}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-text-muted" />
                  Exp: {driver.experience} years
                </div>
                {driver.vehicle && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-text-muted" />
                    Vehicle: <span className="font-semibold text-dark">{driver.vehicle}</span>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {driver.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
