"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, MapPin, Shield, Zap } from "lucide-react";

// SVG Excavator illustration
function ExcavatorSVG() {
  return (
    <motion.svg
      viewBox="0 0 800 500"
      className="w-full max-w-2xl"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Ground */}
      <motion.rect
        x="0" y="420" width="800" height="80"
        fill="#1a1a1a" rx="4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Tracks */}
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <rect x="280" y="380" width="280" height="45" rx="22" fill="#333" />
        <rect x="290" y="390" width="260" height="25" rx="12" fill="#222" />
        <circle cx="310" cy="402" r="14" fill="#444" stroke="#555" strokeWidth="2" />
        <circle cx="350" cy="402" r="10" fill="#444" stroke="#555" strokeWidth="2" />
        <circle cx="385" cy="402" r="10" fill="#444" stroke="#555" strokeWidth="2" />
        <circle cx="420" cy="402" r="10" fill="#444" stroke="#555" strokeWidth="2" />
        <circle cx="455" cy="402" r="10" fill="#444" stroke="#555" strokeWidth="2" />
        <circle cx="490" cy="402" r="10" fill="#444" stroke="#555" strokeWidth="2" />
        <circle cx="530" cy="402" r="14" fill="#444" stroke="#555" strokeWidth="2" />
      </motion.g>

      {/* Main Body */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <rect x="300" y="290" width="240" height="95" rx="8" fill="#FFCC00" />
        <rect x="305" y="295" width="230" height="85" rx="6" fill="#E6B800" />
        {/* Engine vents */}
        <rect x="420" y="310" width="100" height="4" rx="2" fill="#CC9900" />
        <rect x="420" y="320" width="100" height="4" rx="2" fill="#CC9900" />
        <rect x="420" y="330" width="100" height="4" rx="2" fill="#CC9900" />
        <rect x="420" y="340" width="100" height="4" rx="2" fill="#CC9900" />
        <rect x="420" y="350" width="100" height="4" rx="2" fill="#CC9900" />
        <rect x="420" y="360" width="100" height="4" rx="2" fill="#CC9900" />
      </motion.g>

      {/* Cab */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <rect x="310" y="230" width="110" height="65" rx="6" fill="#333" />
        <rect x="315" y="238" width="65" height="50" rx="4" fill="#5BA8D9" opacity="0.6" />
        {/* Window shine */}
        <rect x="318" y="241" width="20" height="44" rx="2" fill="#7BC4EF" opacity="0.3" />
      </motion.g>

      {/* Boom (arm) */}
      <motion.g
        initial={{ rotate: 15, originX: "320px", originY: "280px" }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
      >
        {/* Boom base */}
        <rect x="200" y="250" width="130" height="28" rx="6" fill="#FFCC00" transform="rotate(-25, 310, 264)" />
        {/* Stick */}
        <rect x="100" y="190" width="120" height="22" rx="5" fill="#E6B800" transform="rotate(-15, 200, 220)" />
        {/* Bucket */}
        <motion.path
          d="M80 200 L120 180 L130 210 L100 230 Z"
          fill="#666"
          stroke="#555"
          strokeWidth="2"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 180px" }}
        />
        {/* Bucket teeth */}
        <motion.g
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 180px" }}
        >
          <rect x="82" y="226" width="4" height="10" rx="1" fill="#888" />
          <rect x="90" y="228" width="4" height="10" rx="1" fill="#888" />
          <rect x="98" y="229" width="4" height="10" rx="1" fill="#888" />
        </motion.g>
      </motion.g>

      {/* Hydraulic cylinders */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <line x1="300" y1="270" x2="230" y2="220" stroke="#888" strokeWidth="5" />
        <line x1="250" y1="250" x2="170" y2="200" stroke="#888" strokeWidth="4" />
      </motion.g>

      {/* Counterweight */}
      <motion.rect
        x="520" y="295" width="30" height="80" rx="4" fill="#444"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* FleetForce Logo on body */}
      <motion.text
        x="360" y="345" fontSize="14" fill="#111" fontWeight="bold" fontFamily="sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        FLEETFORCE
      </motion.text>

      {/* Exhaust smoke */}
      <motion.circle
        cx="540" cy="280" r="6" fill="#555" opacity="0.4"
        animate={{ cy: [280, 240, 200], opacity: [0.4, 0.2, 0], r: [6, 10, 14] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx="545" cy="275" r="4" fill="#555" opacity="0.3"
        animate={{ cy: [275, 230, 185], opacity: [0.3, 0.15, 0], r: [4, 8, 12] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />

      {/* GPS Signal */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.circle
          cx="365" cy="220" r="8" fill="none" stroke="#22C55E" strokeWidth="2"
          animate={{ r: [8, 16, 24], opacity: [1, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="365" cy="220" r="4" fill="#22C55E"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.g>
    </motion.svg>
  );
}

// Floating feature badges
const floatingBadges = [
  { icon: MapPin, label: "Live GPS", x: "5%", y: "20%", delay: 1.5 },
  { icon: Shield, label: "Geo-Fence", x: "80%", y: "15%", delay: 1.8 },
  { icon: Zap, label: "Real-time", x: "85%", y: "60%", delay: 2.1 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                Enterprise Fleet Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-white leading-[1.05] mb-6"
            >
              Command Your{" "}
              <span className="gradient-text">Fleet</span>
              <br />
              With Precision
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg lg:text-xl text-white/50 max-w-lg mb-10 leading-relaxed"
            >
              Real-time GPS tracking, intelligent maintenance scheduling, and
              AI-powered analytics for construction fleets of any size. Built
              for the heavyweights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/login"
                className="btn-primary group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-outline group">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-14 flex items-center gap-8 text-white/30"
            >
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-white/70">500+</p>
                <p className="text-xs uppercase tracking-wider mt-1">Vehicles</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-white/70">99.9%</p>
                <p className="text-xs uppercase tracking-wider mt-1">Uptime</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-white/70">24/7</p>
                <p className="text-xs uppercase tracking-wider mt-1">Monitoring</p>
              </div>
            </motion.div>
          </div>

          {/* Right — Excavator SVG */}
          <div className="relative hidden lg:block">
            <ExcavatorSVG />

            {/* Floating badges */}
            {floatingBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: badge.delay }}
                  className="absolute glass-dark rounded-xl px-4 py-2.5 flex items-center gap-2"
                  style={{ left: badge.x, top: badge.y }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white text-sm font-semibold">{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
