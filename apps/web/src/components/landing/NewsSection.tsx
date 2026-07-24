"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, ArrowRight } from "lucide-react";

const newsItems = [
  {
    date: "Jul 20, 2026",
    category: "Product Update",
    title: "FleetForce 3.0: AI-Powered Fleet Assistant Now Available",
    excerpt:
      "Our new AI assistant can predict maintenance needs, optimize routes, and answer natural language questions about your fleet.",
    featured: true,
  },
  {
    date: "Jul 15, 2026",
    category: "Partnership",
    title: "FleetForce Partners with Major GPS Hardware Provider",
    excerpt:
      "Strategic partnership enables plug-and-play GPS integration for faster fleet onboarding.",
    featured: false,
  },
  {
    date: "Jul 10, 2026",
    category: "Industry",
    title: "Construction Fleet Management Market to Reach ₹5000 Cr by 2028",
    excerpt:
      "India's construction equipment market is booming, driving demand for digital fleet management solutions.",
    featured: false,
  },
  {
    date: "Jul 5, 2026",
    category: "Feature",
    title: "New Geofencing & Driver Score Features Released",
    excerpt:
      "Create custom geofences around project sites and monitor driver performance with AI-scored metrics.",
    featured: false,
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function NewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featured = newsItems.find((n) => n.featured);
  const others = newsItems.filter((n) => !n.featured);

  return (
    <section id="news" className="section-padding bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.15em] mb-4">
              Latest News
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight">
              Industry Updates & <span className="gradient-text">News</span>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            View All News <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Featured Article */}
          {featured && (
            <motion.div
              variants={fadeUp}
              className="card-dark p-8 lg:p-10 group cursor-pointer row-span-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/40 text-xs">
                    <Clock className="w-3 h-3" />
                    {featured.date}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-white text-2xl lg:text-3xl mb-4 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="text-white/40 text-base leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-primary font-semibold text-sm">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          )}

          {/* Other Articles */}
          {others.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="card-dark p-6 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-0.5 bg-white/5 text-white/60 text-xs font-bold rounded-full uppercase">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Clock className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-3 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-primary/70 group-hover:text-primary font-semibold text-sm transition-colors">
                Read More
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
