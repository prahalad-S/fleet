"use client";

import { useState } from "react";
import { Settings, Building, Sliders, Bell, Key, Database, Globe, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-black text-dark">System Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Configure company profiles, integrations, units, and API keys</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="card-premium p-2 space-y-1">
          {[
            { id: "company", label: "Company Information", icon: Building },
            { id: "general", label: "General & Units", icon: Sliders },
            { id: "notifications", label: "Notification Gateways", icon: Bell },
            { id: "api", label: "API Keys & Webhooks", icon: Key },
            { id: "backup", label: "Database Backup", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-dark"
                    : "text-text-secondary hover:bg-background hover:text-dark"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Setting Panel */}
        <div className="lg:col-span-3 card-premium p-6">
          {activeTab === "company" && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-dark text-lg border-b border-border pb-3">Company Profile</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Company Name</label>
                  <input type="text" defaultValue="FleetForce Heavy Industries Pvt Ltd" className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase">GST Number</label>
                  <input type="text" defaultValue="36AAAAA0000A1Z5" className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Support Email</label>
                  <input type="email" defaultValue="support@fleetforce.in" className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Head Office Address</label>
                  <input type="text" defaultValue="Tech Hub, HITEC City, Hyderabad 500081" className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-dark text-lg border-b border-border pb-3">Units & System Defaults</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Distance Unit</label>
                  <select className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary">
                    <option>Kilometers (km)</option>
                    <option>Miles (mi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Volume Unit</label>
                  <select className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary">
                    <option>Liters (L)</option>
                    <option>Gallons (gal)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-dark text-lg border-b border-border pb-3">API Keys & Integrations</h3>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase">Google Maps API Key</label>
                <input type="password" defaultValue="AIzaSyA_sample_google_maps_key_12345" className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1 uppercase">WhatsApp Gateway API Key</label>
                <input type="password" defaultValue="wa_key_889234_sample_key" className="w-full px-3 py-2 bg-background rounded-lg border border-border text-sm outline-none focus:border-primary font-mono" />
              </div>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "backup") && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-dark text-lg border-b border-border pb-3">Settings</h3>
              <p className="text-sm text-text-secondary">Gateway settings and automatic nightly backups enabled (Cloud S3 sync active).</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-border flex justify-end">
            <button className="btn-primary inline-flex text-xs">
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
