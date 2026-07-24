"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Truck, Shield, Zap } from "lucide-react";

const roles = [
  { label: "Admin", value: "admin", color: "bg-red-500/20 text-red-400" },
  { label: "Manager", value: "manager", color: "bg-blue-500/20 text-blue-400" },
  { label: "Operator", value: "operator", color: "bg-green-500/20 text-green-400" },
  { label: "Driver", value: "driver", color: "bg-orange-500/20 text-orange-400" },
];

const demoAccounts = [
  { email: "admin@fleetforce.in", password: "admin123", role: "Admin" },
  { email: "manager@fleetforce.in", password: "manager123", role: "Manager" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleDemoLogin = (demo: (typeof demoAccounts)[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-premium relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-heading font-black text-dark text-xl">
                FF
              </div>
              <span className="text-white font-heading font-bold text-2xl tracking-tight">
                Fleet<span className="text-primary">Force</span>
              </span>
            </Link>

            <h1 className="text-4xl font-heading font-black text-white leading-tight mb-6">
              Manage Your Fleet
              <br />
              <span className="gradient-text">Like Never Before</span>
            </h1>

            <p className="text-white/40 text-lg leading-relaxed mb-12">
              Real-time GPS tracking, intelligent maintenance, and complete
              fleet visibility — all from one powerful dashboard.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Truck,
                  text: "Track 500+ vehicles in real-time",
                },
                {
                  icon: Shield,
                  text: "Enterprise-grade security & RBAC",
                },
                {
                  icon: Zap,
                  text: "AI-powered fleet optimization",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white/60 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-surface">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link
            href="/"
            className="flex lg:hidden items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-heading font-black text-dark text-lg">
              FF
            </div>
            <span className="font-heading font-bold text-xl text-dark tracking-tight">
              Fleet<span className="text-primary">Force</span>
            </span>
          </Link>

          <h2 className="text-2xl font-heading font-black text-dark mb-2">
            Welcome back
          </h2>
          <p className="text-text-secondary mb-8">
            Sign in to access your fleet dashboard
          </p>

          {/* Role Selector */}
          <div className="flex gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedRole === role.value
                    ? "bg-primary text-dark"
                    : "bg-background text-text-muted hover:text-dark border border-border"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              // Navigate to dashboard
              window.location.href = "/dashboard";
            }}
          >
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fleetforce.in"
                className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark placeholder:text-text-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark placeholder:text-text-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-dark transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm text-text-secondary"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-3">
              Demo Accounts
            </p>
            <div className="space-y-2">
              {demoAccounts.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => handleDemoLogin(demo)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-background hover:bg-primary/5 rounded-lg border border-border text-sm transition-all group"
                >
                  <span className="text-text-secondary">
                    <span className="font-semibold text-dark">{demo.role}</span>{" "}
                    — {demo.email}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
