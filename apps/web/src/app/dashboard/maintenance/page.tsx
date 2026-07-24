"use client";

import { Wrench, Calendar, AlertTriangle, CheckCircle, Clock, IndianRupee, Plus } from "lucide-react";

const records = [
  { id: "1", vehicle: "AP39AB1234", type: "SCHEDULED", title: "Oil Change + Filter", status: "COMPLETED", date: "2026-07-20", cost: 4500, technician: "Suresh Mechanics", workshop: "Fleet Workshop A" },
  { id: "2", vehicle: "TS09CD5678", type: "PREVENTIVE", title: "Hydraulic System Check", status: "SCHEDULED", date: "2026-07-28", cost: 8500, technician: "HydroFix Services", workshop: "Fleet Workshop B" },
  { id: "3", vehicle: "MH12EF9012", type: "BREAKDOWN", title: "Engine Overheating Repair", status: "IN_PROGRESS", date: "2026-07-22", cost: 25000, technician: "Komatsu Service Center", workshop: "Authorized Workshop" },
  { id: "4", vehicle: "KA01GH3456", type: "INSPECTION", title: "Annual Safety Inspection", status: "SCHEDULED", date: "2026-08-01", cost: 3000, technician: "Volvo Service", workshop: "Bangalore Hub" },
  { id: "5", vehicle: "TN22IJ7890", type: "CORRECTIVE", title: "Bucket Teeth Replacement", status: "COMPLETED", date: "2026-07-18", cost: 12000, technician: "JCB Parts", workshop: "Chennai Depot" },
  { id: "6", vehicle: "AP07KL2345", type: "SCHEDULED", title: "Track Chain Replacement", status: "OVERDUE", date: "2026-07-15", cost: 35000, technician: "Pending", workshop: "Vijayawada Depot" },
];

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  SCHEDULED: { bg: "bg-blue-500/10", text: "text-blue-600", icon: Calendar },
  IN_PROGRESS: { bg: "bg-yellow-500/10", text: "text-yellow-600", icon: Clock },
  COMPLETED: { bg: "bg-green-500/10", text: "text-green-600", icon: CheckCircle },
  OVERDUE: { bg: "bg-red-500/10", text: "text-red-600", icon: AlertTriangle },
};

const typeColors: Record<string, string> = {
  SCHEDULED: "border-l-blue-500",
  PREVENTIVE: "border-l-green-500",
  CORRECTIVE: "border-l-orange-500",
  BREAKDOWN: "border-l-red-500",
  INSPECTION: "border-l-purple-500",
};

export default function MaintenancePage() {
  const totalCost = records.reduce((s, r) => s + r.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Maintenance</h1>
          <p className="text-text-secondary text-sm mt-1">{records.length} maintenance records</p>
        </div>
        <button className="btn-primary inline-flex"><Plus className="w-4 h-4" /> Schedule Service</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Scheduled", value: records.filter((r) => r.status === "SCHEDULED").length, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "In Progress", value: records.filter((r) => r.status === "IN_PROGRESS").length, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Completed", value: records.filter((r) => r.status === "COMPLETED").length, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Total Cost", value: `₹${(totalCost / 1000).toFixed(0)}K`, icon: IndianRupee, color: "text-primary", bg: "bg-primary/10" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-premium p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-xl font-heading font-bold text-dark">{card.value}</p>
                  <p className="text-xs text-text-muted">{card.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Records */}
      <div className="space-y-3">
        {records.map((record) => {
          const st = statusStyles[record.status] || statusStyles.SCHEDULED;
          const StIcon = st.icon;
          return (
            <div key={record.id} className={`card-premium p-5 border-l-4 ${typeColors[record.type] || "border-l-gray-300"} hover:border-primary transition-colors cursor-pointer`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-dark text-sm">{record.title}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${st.bg} ${st.text}`}>
                        <StIcon className="w-3 h-3" />{record.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">
                      🚛 {record.vehicle} • 🔧 {record.technician} • 🏭 {record.workshop}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm shrink-0">
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">{record.type}</p>
                    <p className="text-[10px] text-text-muted uppercase">Type</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">₹{record.cost.toLocaleString()}</p>
                    <p className="text-[10px] text-text-muted uppercase">Cost</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-dark">{record.date}</p>
                    <p className="text-[10px] text-text-muted uppercase">Date</p>
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
