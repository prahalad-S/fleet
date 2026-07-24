"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  MapPin,
  Users,
  Route,
  Wrench,
  Fuel,
  Package,
  Bell,
  BarChart3,
  Settings,
  UserCog,
  Bot,
  ChevronLeft,
  LogOut,
  HelpCircle,
  Shield,
} from "lucide-react";

const menuGroups = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: MapPin, label: "Live Tracking", href: "/dashboard/tracking" },
    ],
  },
  {
    label: "Fleet Operations",
    items: [
      { icon: Truck, label: "Fleet", href: "/dashboard/fleet" },
      { icon: Users, label: "Drivers", href: "/dashboard/drivers" },
      { icon: Route, label: "Trips", href: "/dashboard/trips" },
    ],
  },
  {
    label: "Maintenance & Inventory",
    items: [
      { icon: Wrench, label: "Maintenance", href: "/dashboard/maintenance" },
      { icon: Fuel, label: "Fuel", href: "/dashboard/fuel" },
      { icon: Package, label: "Inventory", href: "/dashboard/inventory" },
    ],
  },
  {
    label: "Analytics & Alerts",
    items: [
      { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
      { icon: Bell, label: "Alerts", href: "/dashboard/alerts" },
      { icon: Bot, label: "AI Assistant", href: "/dashboard/ai-assistant" },
    ],
  },
  {
    label: "Administration",
    items: [
      { icon: UserCog, label: "Users", href: "/dashboard/users" },
      { icon: Shield, label: "Roles", href: "/dashboard/roles" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:relative z-50 h-full bg-dark flex flex-col border-r border-white/5 transition-all duration-300 ${
          isOpen ? "w-[260px]" : "w-[72px]"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-5 border-b border-white/5 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-heading font-black text-dark text-lg shrink-0">
              FF
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-heading font-bold text-lg text-white whitespace-nowrap overflow-hidden"
                >
                  Fleet<span className="text-primary">Force</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-dark-600 hover:bg-primary rounded-full items-center justify-center text-white/60 hover:text-dark border border-white/10 transition-all z-10"
        >
          <ChevronLeft
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <AnimatePresence>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] px-3 mb-2"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                      title={!isOpen ? item.label : undefined}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? "text-primary" : "group-hover:text-white"
                        }`}
                      />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-white/5 px-3 py-4 space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
            title={!isOpen ? "Help" : undefined}
          >
            <HelpCircle className="w-5 h-5 shrink-0" />
            {isOpen && <span>Help & Support</span>}
          </Link>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>

        {/* User Card */}
        {isOpen && (
          <div className="shrink-0 border-t border-white/5 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                AK
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  Arun Kumar
                </p>
                <p className="text-white/30 text-xs truncate">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
}
