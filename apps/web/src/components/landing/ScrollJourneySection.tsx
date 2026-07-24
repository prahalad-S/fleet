"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Radio, Truck, MapPin, Wrench, ArrowDown, ChevronRight } from "lucide-react";

// Dynamic import for WebGL Three.js canvas (SSR incompatible)
const TruckJourneyCanvas = dynamic(
  () => import("@/components/3d/TruckJourneyCanvas"),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

function CanvasSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-dark">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm font-medium">Loading 3D Highway Canvas...</p>
      </div>
    </div>
  );
}

export default function ScrollJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      setScrollProgress(v);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Expanded Spaced-out Checkpoints
  const checkpoints = [
    {
      step: "01",
      title: "Hero Engine Ignition",
      desc: "Heavy Optimus 3D semi-truck powers up on the highway, initializing 5G telemetry core.",
      progress: 0.1,
      icon: Truck,
      tag: "Ignition Phase",
    },
    {
      step: "02",
      title: "5G Signal Telematics",
      desc: "Live vehicle telemetry & speed sensors streaming data to cloud database at 12ms low latency.",
      progress: 0.35,
      icon: Radio,
      tag: "Signal Active",
    },
    {
      step: "03",
      title: "Warehouse & Hub Navigation",
      desc: "Real-time location, driver assignment & interactive pan-India map pin tracking.",
      progress: 0.65,
      icon: MapPin,
      tag: "GPS Pin Active",
    },
    {
      step: "04",
      title: "Predictive Service & Analytics",
      desc: "AI diagnostics monitoring hydraulic pressure, engine health, and scheduled maintenance.",
      progress: 0.9,
      icon: Wrench,
      tag: "Optimal Health",
    },
  ];

  return (
    <div id="map-journey" ref={containerRef} className="relative h-[280vh] bg-dark">
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Grid Texture */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        {/* Floating Top Banner */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 glass-dark rounded-full border border-white/15 shadow-2xl flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            Interactive 3D Fleet Journey & Live Operations
          </span>
        </div>

        {/* 3D Semi-Truck Canvas */}
        <div className="w-full h-full absolute inset-0 z-10">
          <TruckJourneyCanvas scrollProgress={scrollProgress} />
        </div>

        {/* Spaced-Out Vertical Timeline Overlay (Uses Full Screen Height Top-to-Bottom) */}
        <div className="absolute left-6 lg:left-14 top-12 bottom-16 z-20 w-full max-w-sm lg:max-w-md hidden md:flex flex-col justify-between pointer-events-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-6 top-8 bottom-8 w-1 bg-white/10 rounded-full -z-10 overflow-hidden">
            <div
              className="w-full bg-primary transition-all duration-150 shadow-[0_0_15px_#FFCC00]"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {checkpoints.map((cp, idx) => {
            const isActive = scrollProgress >= cp.progress - 0.16 && scrollProgress <= cp.progress + 0.16;
            const Icon = cp.icon;

            return (
              <motion.div
                key={cp.step}
                initial={false}
                animate={{
                  x: isActive ? 12 : 0,
                  scale: isActive ? 1.03 : 0.96,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`relative p-5 lg:p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                  isActive
                    ? "bg-dark-700/95 border-primary shadow-[0_0_40px_rgba(255,204,0,0.3)] text-white"
                    : "bg-dark-800/60 border-white/10 text-white/50 hover:text-white/80"
                }`}
              >
                {/* Active Indicator Pulse Ring */}
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/40 animate-ping pointer-events-none" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-dark shadow-lg shadow-primary/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {cp.step}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                        {cp.tag}
                      </span>
                      <h4 className="font-heading font-black text-base lg:text-lg text-white leading-tight">
                        {cp.title}
                      </h4>
                    </div>
                  </div>
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary animate-pulse" : "text-white/30"}`} />
                </div>

                <p className="text-xs lg:text-sm text-white/70 leading-relaxed pl-13 font-medium">
                  {cp.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Progress Bar at Bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-6 py-3 glass-dark rounded-full border border-white/15 shadow-2xl">
          <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
          <span className="text-white/80 text-xs font-bold tracking-wide">
            Scroll down to drive 3D semi-truck
          </span>
          <div className="w-36 h-2 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 shadow-[0_0_10px_#FFCC00]"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>
          <span className="text-primary text-xs font-mono font-bold">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
