"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Radio, Gauge, MapPin, Fuel, ShieldCheck, Activity, Navigation, Wifi } from "lucide-react";

export default function LiveTrackingHeroCard() {
  const [speed, setSpeed] = useState(48);
  const [fuel, setFuel] = useState(72);
  const [lat, setLat] = useState(17.385);
  const [lng, setLng] = useState(78.4867);
  const [pulse, setPulse] = useState(true);

  // Real-time telemetry simulation (xcoldchain inspired)
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(40 + Math.random() * 25));
      setLat((prev) => parseFloat((prev + (Math.random() - 0.5) * 0.002).toFixed(4)));
      setLng((prev) => parseFloat((prev + (Math.random() - 0.5) * 0.002).toFixed(4)));
      setPulse((p) => !p);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="card-dark p-6 relative border-2 border-primary/30 shadow-[0_0_50px_rgba(255,204,0,0.15)] rounded-2xl overflow-hidden bg-dark-700/90 backdrop-blur-xl"
    >
      {/* Top Banner with Radar Pulse */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-white text-base">AP39AB1234</h3>
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full uppercase">
                Live Signal
              </span>
            </div>
            <p className="text-white/40 text-xs font-mono">JCB 3DX Backhoe Loader</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-primary text-xs font-bold justify-end">
            <Wifi className="w-3.5 h-3.5" /> 5G Telemetry
          </div>
          <p className="text-[10px] text-white/30 font-mono mt-0.5">Ping: 12ms</p>
        </div>
      </div>

      {/* Animated Route Display (xcoldchain SVG map line) */}
      <div className="relative h-32 bg-dark-800 rounded-xl overflow-hidden border border-white/5 mb-5 p-3 flex flex-col justify-between">
        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,204,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.2) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Animated Route Line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120">
          <motion.path
            d="M 20 100 Q 80 20, 150 70 T 280 20"
            fill="none"
            stroke="#FFCC00"
            strokeWidth="3"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Animated moving dot on route */}
          <motion.circle
            cx="150"
            cy="70"
            r="6"
            fill="#22C55E"
            stroke="#FFFFFF"
            strokeWidth="2"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>

        {/* Floating Route Info */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="px-2.5 py-1 bg-dark/80 backdrop-blur-md rounded-lg border border-white/10 text-xs">
            <span className="text-white/40">From: </span>
            <span className="font-bold text-white">Hyderabad HQ</span>
          </div>
          <div className="px-2.5 py-1 bg-dark/80 backdrop-blur-md rounded-lg border border-white/10 text-xs">
            <span className="text-white/40">To: </span>
            <span className="font-bold text-primary">Warangal Site</span>
          </div>
        </div>

        {/* Coordinates readout */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/50">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" /> {lat}° N, {lng}° E
          </span>
          <span className="text-green-400 font-bold">GPS Active</span>
        </div>
      </div>

      {/* Gauge & Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Speedometer */}
        <div className="p-3 bg-dark-800 rounded-xl border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-primary text-xs font-bold mb-1">
            <Gauge className="w-3.5 h-3.5" /> Speed
          </div>
          <p className="text-2xl font-heading font-black text-white">{speed}</p>
          <p className="text-[10px] text-white/40 font-bold uppercase">km/h</p>
        </div>

        {/* Fuel Level */}
        <div className="p-3 bg-dark-800 rounded-xl border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold mb-1">
            <Fuel className="w-3.5 h-3.5" /> Fuel
          </div>
          <p className="text-2xl font-heading font-black text-amber-400">{fuel}%</p>
          <p className="text-[10px] text-white/40 font-bold uppercase">Diesel</p>
        </div>

        {/* Engine Temp / Health */}
        <div className="p-3 bg-dark-800 rounded-xl border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-green-400 text-xs font-bold mb-1">
            <Activity className="w-3.5 h-3.5" /> Health
          </div>
          <p className="text-2xl font-heading font-black text-green-400">98%</p>
          <p className="text-[10px] text-white/40 font-bold uppercase">Optimal</p>
        </div>
      </div>

      {/* Driver Footer */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary text-dark font-bold flex items-center justify-center text-[10px]">
            RK
          </div>
          <span className="text-white/70 font-medium">Driver: Ravi Kumar</span>
        </div>
        <span className="text-white/30 text-[10px] font-mono">ID: DRV-001</span>
      </div>
    </motion.div>
  );
}
