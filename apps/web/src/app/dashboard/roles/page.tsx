"use client";

import { Shield, Lock, Check, Plus } from "lucide-react";

const rolesList = [
  { name: "Admin", desc: "Full administrative access to all modules, settings, user management, and billing.", users: 3, permissions: ["All Modules", "User Management", "System Config", "Export Data"] },
  { name: "Manager", desc: "Manages fleet, drivers, trips, maintenance, and views financial reports.", users: 8, permissions: ["Fleet CRUD", "Drivers CRUD", "Trips CRUD", "Maintenance", "Reports"] },
  { name: "Supervisor", desc: "Site supervisor role to assign trips, check maintenance, and view live tracking.", users: 15, permissions: ["Live Tracking", "Trips Assign", "Driver Attendance", "Maintenance View"] },
  { name: "Dispatcher", desc: "Handles trip scheduling, vehicle dispatches, and real-time route monitoring.", users: 6, permissions: ["Live Tracking", "Trip Dispatch", "Alerts View"] },
  { name: "Driver / Operator", desc: "Mobile app access for trip check-ins, vehicle inspection, and SOS alerts.", users: 120, permissions: ["My Trips", "Check-in/out", "Vehicle Inspection", "SOS Alert"] },
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Role-Based Access Control (RBAC)</h1>
          <p className="text-text-secondary text-sm mt-1">Configure permissions and access rights for different organization roles</p>
        </div>
        <button className="btn-primary inline-flex text-xs">
          <Plus className="w-4 h-4" /> Create Custom Role
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rolesList.map((role) => (
          <div key={role.name} className="card-premium p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold text-dark text-base">{role.name}</h3>
                </div>
                <span className="px-2 py-0.5 bg-background text-text-muted text-xs font-bold rounded-full">
                  {role.users} Users
                </span>
              </div>
              <p className="text-xs text-text-muted mb-4 leading-relaxed">{role.desc}</p>
              <div className="space-y-1.5 border-t border-border pt-3">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Granted Permissions</p>
                {role.permissions.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-5 w-full py-2 bg-background hover:bg-primary/10 rounded-lg text-xs font-bold text-dark border border-border transition-colors">
              Edit Permissions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
