"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  Settings,
  User,
  LogOut,
  X,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Overspeed Alert",
    message: "Vehicle AP39AB1234 exceeded speed limit at NH-44",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "maintenance",
    title: "Service Due",
    message: "JCB 3DX Backhoe Loader #BH-012 — service in 3 days",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "fuel",
    title: "Low Fuel",
    message: "Vehicle TS09EF5678 fuel level at 12%",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    type: "geofence",
    title: "Geofence Exit",
    message: "Excavator EX-045 left Mumbai Metro project site",
    time: "2 hours ago",
    unread: false,
  },
];

interface TopNavProps {
  onMenuToggle: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export default function TopNav({
  onMenuToggle,
  darkMode,
  onDarkModeToggle,
}: TopNavProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSignOut = () => {
    window.location.href = "/";
  };

  return (
    <header
      className={`h-16 border-b shrink-0 flex items-center justify-between px-4 lg:px-6 transition-colors relative z-[999] ${
        darkMode
          ? "bg-dark-800 border-white/5"
          : "bg-surface border-border"
      }`}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-white/60 hover:bg-white/5"
              : "text-text-secondary hover:bg-background"
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              darkMode ? "text-white/30" : "text-text-muted"
            }`}
          />
          <input
            type="text"
            placeholder="Search vehicles, drivers, trips... (Ctrl+K)"
            className={`w-72 lg:w-96 pl-10 pr-4 py-2 text-sm rounded-xl border outline-none transition-all ${
              darkMode
                ? "bg-dark-700 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50"
                : "bg-background border-border text-dark placeholder:text-text-muted focus:border-primary"
            } focus:ring-2 focus:ring-primary/20`}
          />
          <kbd
            className={`absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-bold rounded border ${
              darkMode
                ? "border-white/10 text-white/20"
                : "border-border text-text-muted"
            }`}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className={`sm:hidden p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-white/60 hover:bg-white/5"
              : "text-text-secondary hover:bg-background"
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onDarkModeToggle}
          className={`p-2 rounded-lg transition-all duration-300 ${
            darkMode
              ? "text-primary hover:bg-white/5"
              : "text-text-secondary hover:bg-background"
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className={`relative p-2 rounded-lg transition-colors ${
              darkMode
                ? "text-white/60 hover:bg-white/5"
                : "text-text-secondary hover:bg-background"
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 top-full mt-2 w-80 rounded-xl border shadow-premium overflow-hidden z-[9999] ${
                  darkMode
                    ? "bg-dark-700 border-white/10"
                    : "bg-surface border-border"
                }`}
              >
                <div
                  className={`px-4 py-3 border-b flex items-center justify-between ${
                    darkMode ? "border-white/5" : "border-border"
                  }`}
                >
                  <h3
                    className={`font-heading font-bold text-sm ${
                      darkMode ? "text-white" : "text-dark"
                    }`}
                  >
                    Notifications
                  </h3>
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="text-text-muted hover:text-dark"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b last:border-b-0 hover:bg-primary/5 transition-colors cursor-pointer ${
                        darkMode ? "border-white/5" : "border-border/50"
                      } ${notif.unread ? (darkMode ? "bg-white/3" : "bg-primary/5") : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        {notif.unread && (
                          <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        )}
                        <div className={`${notif.unread ? "" : "pl-5"}`}>
                          <p
                            className={`text-sm font-semibold ${
                              darkMode ? "text-white" : "text-dark"
                            }`}
                          >
                            {notif.title}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${
                              darkMode ? "text-white/40" : "text-text-secondary"
                            }`}
                          >
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-text-muted mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`px-4 py-2.5 border-t text-center ${
                    darkMode ? "border-white/5" : "border-border"
                  }`}
                >
                  <button className="text-primary text-xs font-bold hover:underline">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className={`flex items-center gap-2 p-1.5 rounded-xl transition-colors ${
              darkMode ? "hover:bg-white/5" : "hover:bg-background"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AK
            </div>
            <div className="hidden md:block text-left">
              <p
                className={`text-sm font-semibold leading-tight ${
                  darkMode ? "text-white" : "text-dark"
                }`}
              >
                Arun Kumar
              </p>
              <p className="text-[10px] text-text-muted">Admin</p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 hidden md:block ${
                darkMode ? "text-white/30" : "text-text-muted"
              }`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-premium overflow-hidden z-[9999] ${
                  darkMode
                    ? "bg-dark-700 border-white/10"
                    : "bg-surface border-border"
                }`}
              >
                <div className="p-2">
                  <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      darkMode
                        ? "text-white/60 hover:bg-white/5 hover:text-white"
                        : "text-text-secondary hover:bg-background hover:text-dark"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Landing Website
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      darkMode
                        ? "text-white/60 hover:bg-white/5 hover:text-white"
                        : "text-text-secondary hover:bg-background hover:text-dark"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </div>
                <div
                  className={`border-t p-2 ${
                    darkMode ? "border-white/5" : "border-border"
                  }`}
                >
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out & Return Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
