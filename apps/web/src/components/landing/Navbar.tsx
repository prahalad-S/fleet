"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Truck,
  MapPin,
  Wrench,
  Users,
  BarChart3,
  Phone,
} from "lucide-react";

const navLinks = [
  {
    label: "Solutions",
    href: "#services",
    children: [
      { label: "Fleet Tracking", href: "#services", icon: Truck },
      { label: "GPS Monitoring", href: "#services", icon: MapPin },
      { label: "Maintenance", href: "#services", icon: Wrench },
      { label: "Driver Management", href: "#services", icon: Users },
      { label: "Analytics", href: "#services", icon: BarChart3 },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark/95 backdrop-blur-xl shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-heading font-black text-dark text-lg transition-transform duration-300 group-hover:scale-110">
                FF
              </div>
              <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-white font-heading font-bold text-xl tracking-tight">
                Fleet<span className="text-primary">Force</span>
              </span>
              <p className="text-[10px] text-white/40 font-medium tracking-[0.2em] uppercase -mt-1">
                Fleet Management
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-white/80 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-dark-700/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-premium overflow-hidden p-2"
                    >
                      {link.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <a
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-primary hover:bg-white/5 transition-all duration-200 group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm font-medium">
                              {child.label}
                            </span>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+91 987 654 3210</span>
            </a>
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-bold text-dark bg-primary rounded-lg hover:bg-primary-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,204,0,0.3)] uppercase tracking-wider"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-primary transition-colors"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark-800/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-primary font-medium text-base transition-colors rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <div className="pl-6 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block px-4 py-2 text-white/50 hover:text-primary text-sm transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/login"
                  className="block w-full text-center px-5 py-3 text-sm font-bold text-dark bg-primary rounded-lg uppercase tracking-wider"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
