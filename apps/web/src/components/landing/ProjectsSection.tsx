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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "NH-44 Highway Widening",
    location: "Hyderabad, Telangana",
    vehicles: 32,
    duration: "24 months",
    category: "Highways",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Navi Mumbai Airport",
    location: "Navi Mumbai, Maharashtra",
    vehicles: 78,
    duration: "36 months",
    category: "Aviation",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Chennai Smart City",
    location: "Chennai, Tamil Nadu",
    vehicles: 23,
    duration: "12 months",
    category: "Smart City",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Bangalore Ring Road",
    location: "Bangalore, Karnataka",
    vehicles: 56,
    duration: "30 months",
    category: "Roads",
    image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Polavaram Dam",
    location: "West Godavari, AP",
    vehicles: 91,
    duration: "48 months",
    category: "Dam & Irrigation",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
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
    <section id="projects" className="section-padding bg-surface dark:bg-dark-800 relative overflow-hidden transition-colors">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-dark dark:text-white leading-tight mb-6">
            Major Projects{" "}
            <span className="gradient-text">Powered by FleetForce</span>
          </h2>
          <p className="text-text-secondary dark:text-gray-300 text-lg">
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
              {/* Image with overlay */}
              <div className="h-48 relative overflow-hidden bg-dark-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800";
                  }}
                />
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
                <h3 className="font-heading font-bold text-dark dark:text-white text-xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-text-muted dark:text-gray-400 text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-text-secondary dark:text-gray-300">
                    <Truck className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-dark dark:text-white">{project.vehicles}</span>{" "}
                    vehicles
                  </div>
                  <div className="flex items-center gap-1.5 text-text-secondary dark:text-gray-300">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-dark dark:text-white">{project.duration}</span>
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
