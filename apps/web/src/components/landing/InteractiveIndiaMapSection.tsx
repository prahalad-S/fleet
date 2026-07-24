"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, User, Gauge, Fuel, Activity, X, ChevronRight, Truck } from "lucide-react";

interface MapHub {
  id: string;
  name: string;
  state: string;
  x: string; // percentage on map SVG
  y: string;
  vehicle: string;
  model: string;
  driver: string;
  speed: number;
  fuel: number;
  engineHealth: string;
  healthColor: string;
  location: string;
}

const mapHubs: MapHub[] = [
  {
    id: "hyderabad",
    name: "Hyderabad Hub",
    state: "Telangana",
    x: "48%",
    y: "56%",
    vehicle: "AP39AB1234",
    model: "JCB 3DX Backhoe Loader",
    driver: "Ravi Kumar",
    speed: 48,
    fuel: 72,
    engineHealth: "Optimal (98%)",
    healthColor: "text-green-400",
    location: "NH-44, Kamareddy Highway",
  },
  {
    id: "mumbai",
    name: "Mumbai Metro Site",
    state: "Maharashtra",
    x: "24%",
    y: "48%",
    vehicle: "TS09CD5678",
    model: "CAT 320GC Excavator",
    driver: "Suresh Reddy",
    speed: 62,
    fuel: 58,
    engineHealth: "Good (92%)",
    healthColor: "text-green-400",
    location: "Navi Mumbai Airport Project",
  },
  {
    id: "pune",
    name: "Pune Bypass Project",
    state: "Maharashtra",
    x: "28%",
    y: "53%",
    vehicle: "MH12EF9012",
    model: "Komatsu PC200 Excavator",
    driver: "Amit Sharma",
    speed: 0,
    fuel: 45,
    engineHealth: "Service Due Soon (78%)",
    healthColor: "text-yellow-400",
    location: "Pune Ring Road Expressway",
  },
  {
    id: "bangalore",
    name: "Bangalore Depot",
    state: "Karnataka",
    x: "42%",
    y: "75%",
    vehicle: "KA01GH3456",
    model: "Volvo EC210D Excavator",
    driver: "Rajesh Kumar",
    speed: 0,
    fuel: 90,
    engineHealth: "Optimal (99%)",
    healthColor: "text-green-400",
    location: "Electronic City Phase 2",
  },
  {
    id: "chennai",
    name: "Chennai Port Project",
    state: "Tamil Nadu",
    x: "52%",
    y: "72%",
    vehicle: "TN22IJ7890",
    model: "JCB 455ZX Wheel Loader",
    driver: "Mohan Das",
    speed: 37,
    fuel: 63,
    engineHealth: "Optimal (96%)",
    healthColor: "text-green-400",
    location: "OMR Expressway Corridor",
  },
  {
    id: "vizag",
    name: "Vizag Industrial Zone",
    state: "Andhra Pradesh",
    x: "68%",
    y: "52%",
    vehicle: "TS05MN6789",
    model: "JCB VM115 Compactor",
    driver: "Venkat Rao",
    speed: 8,
    fuel: 34,
    engineHealth: "Good (90%)",
    healthColor: "text-green-400",
    location: "NH-65 Road Expansion",
  },
];

export default function InteractiveIndiaMapSection() {
  const [selectedHub, setSelectedHub] = useState<MapHub>(mapHubs[0]);
  const [activePin, setActivePin] = useState<string>("hyderabad");

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.15em] mb-4">
            Pan-India Live Fleet Operations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight mb-6">
            Interactive <span className="gradient-text">Fleet Telemetry Map</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Click on any active project hub pin below to inspect real-time vehicle telemetry, driver metrics, current speed, fuel levels, and engine health.
          </p>
        </div>

        {/* Map & Popup Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center — India Map SVG Canvas (8 cols) */}
          <div className="lg:col-span-7 relative h-[480px] bg-dark-800 rounded-3xl border border-white/10 p-6 overflow-hidden shadow-premium flex items-center justify-center">
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,204,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.15) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* India Map Outline SVG */}
            <svg
              viewBox="0 0 500 550"
              className="w-full h-full max-h-[420px] opacity-30 drop-shadow-[0_0_20px_rgba(255,204,0,0.2)]"
            >
              <path
                d="M 230 40 L 270 35 L 310 50 L 330 90 L 380 120 L 420 160 L 400 200 L 390 250 L 360 290 L 330 340 L 280 400 L 240 480 L 220 520 L 200 480 L 170 410 L 140 350 L 110 300 L 80 250 L 90 200 L 70 160 L 100 120 L 140 90 L 180 70 Z"
                fill="rgba(255, 204, 0, 0.05)"
                stroke="#FFCC00"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Hub Pins */}
            {mapHubs.map((hub) => {
              const isActive = activePin === hub.id;
              return (
                <div
                  key={hub.id}
                  className="absolute cursor-pointer group z-20"
                  style={{ left: hub.x, top: hub.y }}
                  onClick={() => {
                    setActivePin(hub.id);
                    setSelectedHub(hub);
                  }}
                >
                  {/* Ping Animation */}
                  <div
                    className={`absolute -inset-3 rounded-full ${
                      isActive ? "bg-primary/40 animate-ping" : "bg-green-500/20"
                    }`}
                  />

                  {/* Marker Pin */}
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors ${
                      isActive
                        ? "bg-primary text-dark border-white"
                        : "bg-dark-700 text-green-400 border-primary/50"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </motion.div>

                  {/* Hover Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-dark/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {hub.name}
                  </div>
                </div>
              );
            })}

            {/* Map Watermark */}
            <div className="absolute bottom-4 left-4 text-white/30 text-xs font-mono">
              FLEETFORCE PAN-INDIA GPS GRID
            </div>
          </div>

          {/* Right — Interactive Hub Popup Card (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="card-dark p-6 border-2 border-primary/40 rounded-3xl bg-dark-700 shadow-premium"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div>
                    <span className="px-2.5 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase">
                      {selectedHub.state}
                    </span>
                    <h3 className="font-heading font-black text-white text-xl mt-2">
                      {selectedHub.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                {/* Details Popup Content */}
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-dark-800 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold">Vehicle Reg No.</p>
                      <p className="font-heading font-bold text-white text-base mt-0.5">{selectedHub.vehicle}</p>
                    </div>
                    <p className="text-white/50 text-xs">{selectedHub.model}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Driver */}
                    <div className="p-3 bg-dark-800 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5 text-primary text-xs font-bold mb-1">
                        <User className="w-3.5 h-3.5" /> Driver
                      </div>
                      <p className="font-bold text-white">{selectedHub.driver}</p>
                    </div>

                    {/* Speed */}
                    <div className="p-3 bg-dark-800 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold mb-1">
                        <Gauge className="w-3.5 h-3.5" /> Current Speed
                      </div>
                      <p className="font-bold text-white">{selectedHub.speed} km/h</p>
                    </div>

                    {/* Fuel */}
                    <div className="p-3 bg-dark-800 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                        <Fuel className="w-3.5 h-3.5" /> Fuel Level
                      </div>
                      <p className="font-bold text-amber-400">{selectedHub.fuel}%</p>
                    </div>

                    {/* Engine Health */}
                    <div className="p-3 bg-dark-800 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-1">
                        <Activity className="w-3.5 h-3.5" /> Engine Health
                      </div>
                      <p className={`font-bold ${selectedHub.healthColor}`}>{selectedHub.engineHealth}</p>
                    </div>
                  </div>

                  {/* Location Address */}
                  <div className="p-3 bg-dark-800 rounded-xl border border-white/5">
                    <p className="text-white/40 text-xs uppercase font-bold mb-1">Exact Location Address</p>
                    <p className="text-white/80 font-medium">{selectedHub.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
