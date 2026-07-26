"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, MapPin, Shield, Zap } from "lucide-react";
import LiveTrackingHeroCard from "./LiveTrackingHeroCard";
import HeroRightTrackingCard from "./HeroRightTrackingCard";

// Floating feature badges
const floatingBadges = [
  { icon: MapPin, label: "Live GPS", x: "2%", y: "15%", delay: 1.2 },
  { icon: Shield, label: "Geo-Fence", x: "85%", y: "10%", delay: 1.5 },
  { icon: Zap, label: "Real-time 5G", x: "80%", y: "82%", delay: 1.8 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50 z-0 pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      {/* Right-Half 100% Height Tracking Card (Screen Center to Right Edge) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 h-full z-0 hidden lg:block pointer-events-auto"
      >
        <HeroRightTrackingCard />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 py-32 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
              Real-time 3D GPS tracking, intelligent maintenance scheduling, and
              AI-powered analytics for construction fleets of any size. Built
              for the heavyweights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/login" className="btn-primary group">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#map-journey" className="btn-outline group">
                <Play className="w-4 h-4" />
                Explore 3D Journey
              </a>
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

          {/* Right Mobile Fallback & Hidden Preserved Component */}
          <div className="relative lg:hidden">
            <HeroRightTrackingCard />
          </div>

          <div className="relative">
            <LiveTrackingHeroCard />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent opacity-20" />
    </section>
  );
}
