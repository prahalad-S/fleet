"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Fuel, Gauge, Calendar, Wrench, ShieldCheck, FileText, QrCode, User } from "lucide-react";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const vehicle = {
    id: resolvedParams.id,
    vehicleNumber: "AP39AB1234",
    registrationNumber: "AP39AB1234",
    brand: "JCB",
    model: "3DX Backhoe Loader",
    category: "Backhoe Loader",
    year: 2022,
    chassisNumber: "JCB3DX2022IN987654",
    engineNumber: "ENG-JCB-444-9988",
    fuelType: "Diesel",
    status: "RUNNING",
    driver: "Ravi Kumar",
    location: "NH-44, Kamareddy, Telangana",
    speed: 35,
    fuelLevel: 72,
    insuranceExpiry: "2027-04-15",
    fitnessExpiry: "2027-08-20",
    pollutionExpiry: "2026-12-10",
    gpsDeviceId: "GPS-DEVC-99120",
    operatingHours: 2450,
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/fleet" className="p-2 bg-surface border border-border rounded-xl text-text-secondary hover:text-dark hover:border-primary transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-black text-dark">{vehicle.vehicleNumber}</h1>
            <span className="px-3 py-1 bg-green-500/10 text-green-600 font-bold text-xs rounded-full uppercase">
              {vehicle.status}
            </span>
          </div>
          <p className="text-text-secondary text-sm">{vehicle.brand} {vehicle.model} • {vehicle.category}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Cols Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Specs */}
          <div className="card-premium p-6">
            <h3 className="font-heading font-bold text-dark text-base mb-4 border-b border-border pb-3">Vehicle Specifications</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-text-muted text-xs block uppercase">Registration Number</span><strong className="text-dark font-mono">{vehicle.registrationNumber}</strong></div>
              <div><span className="text-text-muted text-xs block uppercase">Manufacture Year</span><strong className="text-dark">{vehicle.year}</strong></div>
              <div><span className="text-text-muted text-xs block uppercase">Chassis Number</span><strong className="text-dark font-mono">{vehicle.chassisNumber}</strong></div>
              <div><span className="text-text-muted text-xs block uppercase">Engine Number</span><strong className="text-dark font-mono">{vehicle.engineNumber}</strong></div>
              <div><span className="text-text-muted text-xs block uppercase">Fuel Type</span><strong className="text-dark">{vehicle.fuelType}</strong></div>
              <div><span className="text-text-muted text-xs block uppercase">Operating Hours</span><strong className="text-dark">{vehicle.operatingHours} hrs</strong></div>
            </div>
          </div>

          {/* Compliance & Certificates */}
          <div className="card-premium p-6">
            <h3 className="font-heading font-bold text-dark text-base mb-4 border-b border-border pb-3">Compliance & Insurance Expiries</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-3 bg-background rounded-xl border border-border">
                <ShieldCheck className="w-5 h-5 text-green-500 mb-1" />
                <p className="text-xs text-text-muted">Insurance Expiry</p>
                <p className="font-bold text-dark text-sm">{vehicle.insuranceExpiry}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-border">
                <FileText className="w-5 h-5 text-blue-500 mb-1" />
                <p className="text-xs text-text-muted">Fitness Expiry</p>
                <p className="font-bold text-dark text-sm">{vehicle.fitnessExpiry}</p>
              </div>
              <div className="p-3 bg-background rounded-xl border border-border">
                <FileText className="w-5 h-5 text-orange-500 mb-1" />
                <p className="text-xs text-text-muted">Pollution Expiry</p>
                <p className="font-bold text-dark text-sm">{vehicle.pollutionExpiry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel Telemetry */}
        <div className="space-y-6">
          <div className="card-premium p-6 bg-dark text-white space-y-4">
            <h3 className="font-heading font-bold text-base border-b border-white/10 pb-3 flex items-center justify-between">
              Live Telemetry
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/50 flex items-center gap-1.5"><Gauge className="w-4 h-4 text-primary" /> Current Speed</span>
                <strong className="text-green-400 font-bold">{vehicle.speed} km/h</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50 flex items-center gap-1.5"><Fuel className="w-4 h-4 text-primary" /> Fuel Level</span>
                <strong className="text-yellow-400 font-bold">{vehicle.fuelLevel}%</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50 flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Assigned Driver</span>
                <strong className="text-white">{vehicle.driver}</strong>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-white/50 text-xs flex items-center gap-1 mb-1"><MapPin className="w-3.5 h-3.5 text-primary" /> Location</span>
                <p className="text-xs text-white/80 font-medium">{vehicle.location}</p>
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="card-premium p-6 text-center space-y-3">
            <div className="w-32 h-32 bg-dark rounded-xl mx-auto flex items-center justify-center text-primary">
              <QrCode className="w-24 h-24" />
            </div>
            <p className="text-xs font-bold text-dark font-mono">{vehicle.gpsDeviceId}</p>
            <p className="text-xs text-text-muted">Scan QR Code for instant vehicle inspection & mobile check-in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
