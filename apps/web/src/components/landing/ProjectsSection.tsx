"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Mumbai Metro Extension",
    location: "Mumbai, Maharashtra",
    vehicles: 45,
    duration: "18 months",
    category: "Infrastructure",
    image: "from-yellow-500/30 via-orange-500/20 to-red-500/10",
  },
  {
    title: "NH-44 Highway Widening",
    location: "Hyderabad, Telangana",
    vehicles: 32,
    duration: "24 months",
    category: "Highways",
    image: "from-blue-500/30 via-cyan-500/20 to-teal-500/10",
  },
  {
    title: "Navi Mumbai Airport",
    location: "Navi Mumbai, Maharashtra",
    vehicles: 78,
    duration: "36 months",
    category: "Aviation",
    image: "from-purple-500/30 via-violet-500/20 to-indigo-500/10",
  },
  {
    title: "Chennai Smart City",
    location: "Chennai, Tamil Nadu",
    vehicles: 23,
    duration: "12 months",
    category: "Smart City",
    image: "from-green-500/30 via-emerald-500/20 to-lime-500/10",
  },
  {
    title: "Bangalore Ring Road",
    location: "Bangalore, Karnataka",
    vehicles: 56,
    duration: "30 months",
    category: "Roads",
    image: "from-pink-500/30 via-rose-500/20 to-red-500/10",
  },
  {
    title: "Polavaram Dam",
    location: "West Godavari, AP",
    vehicles: 91,
    duration: "48 months",
    category: "Dam & Irrigation",
    image: "from-amber-500/30 via-yellow-500/20 to-orange-500/10",
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

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding bg-surface relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-bold text-accent uppercase tracking-[0.15em] mb-4">
            Our Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-6">
            Major Projects{" "}
            <span className="gradient-text">Powered by FleetForce</span>
          </h2>
          <p className="text-text-secondary text-lg">
            From mega infrastructure to smart city projects — FleetForce manages
            fleets across India&apos;s most ambitious construction projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              className="card-premium group cursor-pointer"
            >
              {/* Image placeholder with gradient */}
              <div
                className={`h-48 bg-gradient-to-br ${project.image} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-dark/60 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-dark text-xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Truck className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{project.vehicles}</span>{" "}
                    vehicles
                  </div>
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Calendar className="w-4 h-4 text-accent" />
                    {project.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Truck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
