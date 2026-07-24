"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, Award, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    desc: "End-to-end encrypted tracking with tamper-proof GPS devices and secure data storage.",
  },
  {
    icon: Target,
    title: "Precision Tracking",
    desc: "Sub-meter accuracy GPS tracking with real-time updates every 2 seconds.",
  },
  {
    icon: Award,
    title: "Industry Leading",
    desc: "Trusted by top construction companies. Managing 500+ vehicles across India.",
  },
  {
    icon: Globe,
    title: "Pan-India Coverage",
    desc: "Seamless tracking across all states with offline mode and automatic sync.",
  },
];

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-surface relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-[1400px] mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left text */}
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-bold text-accent uppercase tracking-[0.15em] mb-4"
            >
              About FleetForce
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-6"
            >
              Powering the Future of{" "}
              <span className="gradient-text">Heavy Equipment</span> Management
            </motion.h2>

            <motion.p variants={fadeUp} className="text-text-secondary text-lg leading-relaxed mb-8">
              FleetForce is built for the construction industry. We understand
              the rugged demands of managing excavators, loaders, dozers, and
              cranes across multiple job sites. Our platform provides
              military-grade reliability with consumer-grade simplicity.
            </motion.p>

            <motion.p variants={fadeUp} className="text-text-secondary leading-relaxed mb-10">
              From real-time GPS tracking to predictive maintenance powered by
              AI, FleetForce gives fleet managers complete visibility and
              control over their heavy equipment operations — reducing downtime,
              cutting fuel costs, and maximizing utilization.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <div className="text-center px-6 py-4 bg-dark rounded-xl">
                <p className="text-3xl font-heading font-black text-primary">15+</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">Years Exp.</p>
              </div>
              <div className="text-center px-6 py-4 bg-dark rounded-xl">
                <p className="text-3xl font-heading font-black text-primary">50+</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">Companies</p>
              </div>
              <div className="text-center px-6 py-4 bg-dark rounded-xl">
                <p className="text-3xl font-heading font-black text-primary">2M+</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">KM Tracked</p>
              </div>
            </motion.div>
          </div>

          {/* Right — Feature cards */}
          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 gap-5"
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  className="card-premium p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-lg mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
