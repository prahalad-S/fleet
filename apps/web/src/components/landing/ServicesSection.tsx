"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Truck,
  Wrench,
  Users,
  BarChart3,
  Fuel,
  Bell,
  Package,
} from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "GPS Live Tracking",
    desc: "Real-time vehicle positions on interactive maps with speed, heading, and geofence alerts. Track your entire fleet in one view.",
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-500",
  },
  {
    icon: Truck,
    title: "Fleet Management",
    desc: "Complete vehicle lifecycle management — from registration and insurance to fitness certificates and service schedules.",
    color: "from-blue-500/20 to-sky-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Users,
    title: "Driver Management",
    desc: "Manage driver profiles, licenses, attendance, performance scoring, and assignments — all from a single dashboard.",
    color: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Wrench,
    title: "Maintenance Scheduling",
    desc: "Automated service reminders, breakdown tracking, cost analysis, and maintenance history for every vehicle in your fleet.",
    color: "from-orange-500/20 to-amber-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: Fuel,
    title: "Fuel Analytics",
    desc: "Track fuel entries, monitor consumption patterns, detect theft, and analyze mileage across your fleet with precision.",
    color: "from-red-500/20 to-rose-500/10",
    iconColor: "text-red-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    desc: "Comprehensive reports on vehicle usage, driver performance, fuel costs, and maintenance. Export to PDF, Excel, or CSV.",
    color: "from-cyan-500/20 to-teal-500/10",
    iconColor: "text-cyan-500",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Instant notifications for overspeed, geofence violations, maintenance due dates, license expirations, and more.",
    color: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-500",
  },
  {
    icon: Package,
    title: "Inventory Control",
    desc: "Manage spare parts, tools, and supplies. Track stock levels, suppliers, purchases, and get low-stock alerts automatically.",
    color: "from-pink-500/20 to-fuchsia-500/10",
    iconColor: "text-pink-500",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding bg-dark relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accent/6 rounded-full blur-[100px]" />

      <div className="max-w-[1400px] mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.15em] mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Manage Your Fleet</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            A comprehensive suite of tools designed for construction fleet
            operations. From tracking to maintenance, we&apos;ve got every angle
            covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="card-dark p-6 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-3">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
