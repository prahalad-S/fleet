"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus } from "lucide-react";

export default function AddVehiclePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "/dashboard/fleet";
    }, 1200);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/fleet" className="p-2 bg-surface border border-border rounded-xl text-text-secondary hover:text-dark hover:border-primary transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-black text-dark">Add New Vehicle</h1>
          <p className="text-text-secondary text-sm">Register a new machine or construction vehicle in the fleet database</p>
        </div>
      </div>

      {submitted && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-600 rounded-xl font-bold text-sm">
          ✓ Vehicle successfully added! Redirecting to fleet list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-premium p-6 space-y-6">
        <h3 className="font-heading font-bold text-dark text-base border-b border-border pb-3">Basic Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Vehicle Number / License Plate *</label>
            <input required type="text" placeholder="AP39AB1234" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Registration Number *</label>
            <input required type="text" placeholder="AP39AB1234" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Category *</label>
            <select required className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none">
              <option value="">Select Category</option>
              <option value="Backhoe Loader">Backhoe Loader</option>
              <option value="Excavator">Excavator</option>
              <option value="Bulldozer">Bulldozer</option>
              <option value="Wheel Loader">Wheel Loader</option>
              <option value="Mini Excavator">Mini Excavator</option>
              <option value="Compactor">Compactor</option>
              <option value="Crane">Crane</option>
              <option value="Dump Truck">Dump Truck</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Brand / Manufacturer *</label>
            <input required type="text" placeholder="JCB / Caterpillar / Komatsu" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Model *</label>
            <input required type="text" placeholder="3DX / 320GC" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Manufacture Year *</label>
            <input required type="number" defaultValue={2023} className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
        </div>

        <h3 className="font-heading font-bold text-dark text-base border-b border-border pb-3 pt-4">Technical Details & GPS</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Engine Number</label>
            <input type="text" placeholder="ENG-998877" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Chassis Number</label>
            <input type="text" placeholder="CHS-112233" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Fuel Type</label>
            <select className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none">
              <option>Diesel</option>
              <option>Electric</option>
              <option>Petrol</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1 uppercase">GPS Device ID</label>
            <input type="text" placeholder="GPS-DEV-991" className="w-full px-3 py-2.5 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none" />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <Link href="/dashboard/fleet" className="px-5 py-2.5 text-xs font-bold text-text-secondary bg-background rounded-xl border border-border">
            Cancel
          </Link>
          <button type="submit" className="btn-primary text-xs py-2.5">
            <Save className="w-4 h-4" /> Save Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}
