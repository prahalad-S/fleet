"use client";

import { useState } from "react";
import { FileText, Download, Printer, Filter, Calendar, BarChart3, PieChart, Table } from "lucide-react";
import { exportToPDF } from "@/lib/pdf-export";

const reportTemplates = [
  {
    id: "vehicle_utilization",
    title: "Vehicle Utilization & Hours Report",
    desc: "Detailed breakdown of running, idling, and downtime for all machines.",
    category: "Fleet",
    headers: ["Reg No.", "Machine Type", "Operating Hours", "Distance (km)", "Fuel (L)", "Efficiency"],
    rows: [
      ["AP39AB1234", "Backhoe Loader", "168 hrs", "1,420 km", "450 L", "3.15 km/L"],
      ["TS09CD5678", "Excavator", "210 hrs", "890 km", "620 L", "2.90 km/L"],
      ["MH12EF9012", "Excavator", "145 hrs", "610 km", "410 L", "3.05 km/L"],
      ["KA01GH3456", "Excavator", "180 hrs", "950 km", "510 L", "3.10 km/L"],
      ["TN22IJ7890", "Wheel Loader", "195 hrs", "1,200 km", "580 L", "3.20 km/L"],
    ],
  },
  {
    id: "fuel_consumption",
    title: "Fuel Consumption & Cost Analysis",
    desc: "Monthly fuel usage, refuel entries, mileage (km/L) and theft detection logs.",
    category: "Fuel",
    headers: ["Vehicle", "Fuel Type", "Quantity (L)", "Rate (INR)", "Total Cost", "Odometer"],
    rows: [
      ["AP39AB1234", "Diesel", "120 L", "₹89.50", "₹10,740", "24,560 km"],
      ["TS09CD5678", "Diesel", "95 L", "₹89.50", "₹8,503", "18,920 km"],
      ["TN22IJ7890", "Diesel", "140 L", "₹90.00", "₹12,600", "31,240 km"],
      ["TS05MN6789", "Diesel", "80 L", "₹89.50", "₹7,160", "15,670 km"],
    ],
  },
  {
    id: "driver_scorecard",
    title: "Driver Performance & Scorecard",
    desc: "Safety scores, overspeed count, sudden braking, and attendance summary.",
    category: "Drivers",
    headers: ["Driver Name", "Emp ID", "License No", "Assigned Machine", "Trips", "Score"],
    rows: [
      ["Ravi Kumar", "DRV-001", "AP2420220012345", "AP39AB1234", "34", "92 / 100"],
      ["Suresh Reddy", "DRV-002", "TS0920210098765", "TS09CD5678", "28", "88 / 100"],
      ["Amit Sharma", "DRV-003", "MH1220190054321", "MH12EF9012", "42", "95 / 100"],
      ["Rajesh Kumar", "DRV-004", "KA0120230067890", "Unassigned", "50", "97 / 100"],
    ],
  },
  {
    id: "maintenance_cost",
    title: "Maintenance & Parts Expense Report",
    desc: "Cost per vehicle, breakdown vs preventive service ratio, and parts issued.",
    category: "Maintenance",
    headers: ["Vehicle", "Service Type", "Title", "Date", "Workshop", "Cost"],
    rows: [
      ["AP39AB1234", "SCHEDULED", "Oil Change + Filter", "2026-07-20", "Fleet Workshop A", "₹4,500"],
      ["TS09CD5678", "PREVENTIVE", "Hydraulic Check", "2026-07-28", "HydroFix Services", "₹8,500"],
      ["MH12EF9012", "BREAKDOWN", "Engine Repair", "2026-07-22", "Komatsu Center", "₹25,000"],
    ],
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(reportTemplates[0]);
  const [dateRange, setDateRange] = useState("THIS_MONTH");
  const [exportFormat, setExportFormat] = useState("PDF");

  const handleExport = () => {
    exportToPDF({
      title: selectedReport.title,
      subtitle: `${selectedReport.category} Report • Date Range: ${dateRange.replace("_", " ")}`,
      filename: `${selectedReport.id}_report.pdf`,
      headers: selectedReport.headers,
      rows: selectedReport.rows,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Reports & Analytics Export</h1>
          <p className="text-text-secondary text-sm mt-1">Generate comprehensive fleet, maintenance, fuel, and driver reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="btn-primary inline-flex text-xs">
            <Download className="w-4 h-4" /> Export Report (PDF)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-dark text-sm uppercase tracking-wider">Report Templates</h3>
          {reportTemplates.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setSelectedReport(tmpl)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedReport.id === tmpl.id
                  ? "bg-primary/10 border-primary text-dark font-bold shadow-card"
                  : "bg-surface border-border text-text-secondary hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-primary uppercase">{tmpl.category}</span>
                <FileText className="w-4 h-4 text-text-muted" />
              </div>
              <h4 className="font-heading font-bold text-sm text-dark mb-1">{tmpl.title}</h4>
              <p className="text-xs text-text-muted line-clamp-2">{tmpl.desc}</p>
            </button>
          ))}
        </div>

        {/* Report Preview & Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium p-6">
            <h3 className="font-heading font-bold text-dark text-lg mb-4">Report Options</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary"
                >
                  <option value="TODAY">Today</option>
                  <option value="THIS_WEEK">This Week</option>
                  <option value="THIS_MONTH">This Month</option>
                  <option value="LAST_QUARTER">Last Quarter</option>
                  <option value="YEAR_TO_DATE">Year to Date</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary"
                >
                  <option value="PDF">PDF Document (.pdf)</option>
                  <option value="EXCEL">Excel Spreadsheet (.xlsx)</option>
                  <option value="CSV">Comma-Separated (.csv)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button onClick={handleExport} className="w-full btn-primary justify-center text-xs py-2.5">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>

            {/* Preview Mock */}
            <div className="border border-border rounded-xl p-6 bg-background space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="font-heading font-black text-lg text-dark">FleetForce Enterprise Analytics</h2>
                  <p className="text-xs text-text-muted">{selectedReport.title} — Generated {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-primary text-dark font-bold text-xs rounded-full">CONFIDENTIAL</span>
                </div>
              </div>

              {/* Sample Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface border-b border-border text-left">
                      {selectedReport.headers.map((h) => (
                        <th key={h} className="p-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {selectedReport.rows.map((row, idx) => (
                      <tr key={idx}>
                        {row.map((cell, cidx) => (
                          <td key={cidx} className="p-2 font-medium">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
