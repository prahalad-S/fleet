"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Wifi,
  Navigation,
  Gauge,
  Fuel,
  Activity,
  Radio,
} from "lucide-react";

export default function HeroRightTrackingCard() {
  const [speed, setSpeed] = useState(59);

  // Dynamic live speed fluctuation around 59 km/h
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(57 + Math.random() * 5));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Main active curve path (Continuous ultra-smooth sweeping Bezier curve with no straight lines)
  const activeRoutePath =
    "M 40 520 C 200 320, 260 460, 440 280 C 620 100, 720 340, 940 180 C 1040 100, 1140 220, 1200 160";

  return (
    <div
      className="relative w-full h-full min-h-screen overflow-hidden bg-[#16181D] group"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      {/* Dark Slate Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16181D] via-transparent to-[#16181D]/60 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/30 via-transparent to-[#16181D] pointer-events-none z-10" />

      {/* 1. MOVING MAP CONTAINER (Renders directly underneath the glass overlay) */}
      <motion.div
        className="absolute w-[1200px] h-[650px] -left-[100px] top-1/2 -translate-y-1/2 z-0"
        animate={{
          x: [0, -280, 0],
          y: [0, -70, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Subtle Map Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#26293025_1px,transparent_1px),linear-gradient(to_bottom,#26293025_1px,transparent_1px)] bg-[size:40px_40px]" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Yellow Glow Filter */}
            <filter id="yellowGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing Solid Yellow Line Gradient */}
            <linearGradient id="solidYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFD633" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF9900" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Yellow Dashed Curves */}
          <path
            d="M 40 220 C 240 80, 460 360, 700 140 C 900 40, 1060 260, 1200 120"
            stroke="#FFCC00"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            strokeOpacity="0.75"
            filter="url(#yellowGlow)"
          />
          <path
            d="M 40 560 C 260 380, 480 600, 740 400 C 920 240, 1080 460, 1200 320"
            stroke="#FFD633"
            strokeWidth="2.5"
            strokeDasharray="12 8"
            strokeOpacity="0.75"
            filter="url(#yellowGlow)"
          />
          <path
            d="M 200 40 C 380 260, 240 480, 520 620"
            stroke="#FFCC00"
            strokeWidth="2"
            strokeDasharray="10 6"
            strokeOpacity="0.7"
            filter="url(#yellowGlow)"
          />
          <path
            d="M 680 40 C 820 280, 640 480, 960 620"
            stroke="#FFA500"
            strokeWidth="2"
            strokeDasharray="12 8"
            strokeOpacity="0.7"
            filter="url(#yellowGlow)"
          />

          {/* Active Solid Yellow Curve Line */}
          <path
            d={activeRoutePath}
            stroke="#FFCC00"
            strokeWidth="10"
            strokeOpacity="0.25"
            filter="url(#yellowGlow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={activeRoutePath}
            stroke="url(#solidYellowGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Checkpoints */}
          <g transform="translate(440, 280)">
            <circle r="12" fill="none" stroke="#FFCC00" strokeWidth="2" />
            <circle r="4" fill="#FFCC00" />
          </g>
          <g transform="translate(720, 340)">
            <circle r="16" fill="none" stroke="#FFCC00" strokeWidth="1.5" strokeOpacity="0.6" className="animate-ping" />
            <circle r="5" fill="#FFCC00" />
          </g>
          <g transform="translate(940, 180)">
            <circle r="12" fill="none" stroke="#FFCC00" strokeWidth="2" />
            <circle r="4" fill="#22C55E" />
          </g>

          {/* 1 GPS Tracker Marker */}
          <g className="smooth-curve-gps-tracker">
            <circle
              r="22"
              fill="rgba(22, 24, 29, 0.95)"
              stroke="#FFCC00"
              strokeWidth="3"
              filter="url(#yellowGlow)"
            />
            <circle
              r="30"
              fill="none"
              stroke="#FFCC00"
              strokeWidth="1.2"
              strokeOpacity="0.6"
              className="animate-ping"
              style={{ animationDuration: "2.2s" }}
            />
            <circle r="8" fill="#FFCC00" />
            <circle r="3" fill="#FFFFFF" />
          </g>
        </svg>
      </motion.div>

      {/* 2. UNIFIED GLASSMORPHISM TELEMETRY OVERLAY PANEL (DIRECTLY OVERLAYED ON TOP OF MAP) */}


      {/* CSS Animation for Tracker */}
      <style jsx>{`
        .smooth-curve-gps-tracker {
          offset-path: path("M 40 520 C 200 320, 260 460, 440 280 C 620 100, 720 340, 940 180 C 1040 100, 1140 220, 1200 160");
          animation: moveSeamlesslyOnRoute 15s linear infinite;
        }

        @keyframes moveSeamlesslyOnRoute {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}
