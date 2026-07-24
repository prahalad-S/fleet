"use client";

import { useState } from "react";
import { Users, Plus, Shield, Mail, Phone, Lock, CheckCircle, XCircle } from "lucide-react";

const usersData = [
  { id: "1", name: "Arun Kumar", email: "admin@fleetforce.in", role: "Admin", branch: "Hyderabad HQ", phone: "+91 98765 00001", status: "ACTIVE", lastLogin: "2 mins ago" },
  { id: "2", name: "Rajesh Varma", email: "manager@fleetforce.in", role: "Manager", branch: "Mumbai Depot", phone: "+91 98765 00002", status: "ACTIVE", lastLogin: "1 hour ago" },
  { id: "3", name: "Priya Sharma", email: "supervisor@fleetforce.in", role: "Supervisor", branch: "Chennai Site", phone: "+91 98765 00003", status: "ACTIVE", lastLogin: "Yesterday" },
  { id: "4", name: "Vikram Singh", email: "dispatcher@fleetforce.in", role: "Dispatcher", branch: "Bangalore Hub", phone: "+91 98765 00004", status: "INACTIVE", lastLogin: "3 days ago" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">User Management</h1>
          <p className="text-text-secondary text-sm mt-1">Manage system user accounts, roles, and administrative access</p>
        </div>
        <button className="btn-primary inline-flex text-xs">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Branch</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-primary/3 transition-colors">
                  <td className="px-4 py-3 font-bold text-dark">{u.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{u.branch}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      u.status === "ACTIVE" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
