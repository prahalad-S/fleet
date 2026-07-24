"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Radio, Truck, MapPin, Wrench, ArrowDown } from "lucide-react";

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
        <p className="text-white/40 text-sm">Loading 3D Truck Highway Canvas...</p>
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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      setScrollProgress(v);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Checkpoints
  const checkpoints = [
    { step: "01", title: "Hero Engine Start", desc: "Heavy 3D JCB Truck powers up on the highway.", progress: 0.1, icon: Truck },
    { step: "02", title: "Passes GPS Signal Towers", desc: "Live signal telemetry synced at 5G speed.", progress: 0.35, icon: Radio },
    { step: "03", title: "Reaches Warehouse & Map Hub", desc: "Real-time location & telemetry popup pins.", progress: 0.65, icon: MapPin },
    { step: "04", title: "Maintenance & Final Station", desc: "Predictive diagnostics & fleet analytics.", progress: 0.9, icon: Wrench },
  ];

  return (
    <div id="map-journey" ref={containerRef} className="relative h-[250vh] bg-dark">
      {/* Sticky 3D Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        {/* Floating Top Banner */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 glass-dark rounded-full border border-white/10 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            3D Scroll-Driven Fleet Journey (lodisna.com Experience)
          </span>
        </div>

        {/* Three.js 3D Truck & Highway Canvas */}
        <div className="w-full h-full absolute inset-0 z-10">
          <TruckJourneyCanvas scrollProgress={scrollProgress} />
        </div>

        {/* Checkpoint Indicators Overlay */}
        <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 space-y-4 max-w-xs hidden md:block">
          {checkpoints.map((cp) => {
            const isActive = scrollProgress >= cp.progress - 0.15 && scrollProgress <= cp.progress + 0.15;
            const Icon = cp.icon;
            return (
              <motion.div
                key={cp.step}
                animate={{ scale: isActive ? 1.05 : 1, opacity: isActive ? 1 : 0.4 }}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isActive
                    ? "bg-dark-700/90 border-primary shadow-[0_0_30px_rgba(255,204,0,0.3)] text-white"
                    : "bg-dark/50 border-white/5 text-white/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${isActive ? "bg-primary text-dark" : "bg-white/10 text-white/40"}`}>
                    {cp.step}
                  </div>
                  <h4 className="font-heading font-bold text-xs">{cp.title}</h4>
                </div>
                <p className="text-[11px] leading-relaxed">{cp.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2 glass-dark rounded-full">
          <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
          <span className="text-white/60 text-xs font-bold">Scroll down to drive truck</span>
          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
