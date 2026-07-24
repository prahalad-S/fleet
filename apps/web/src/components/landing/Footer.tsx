"use client";

import Link from "next/link";
import {
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const footerLinks = {
  Solutions: [
    { label: "GPS Tracking", href: "#services" },
    { label: "Fleet Management", href: "#services" },
    { label: "Driver Management", href: "#services" },
    { label: "Maintenance", href: "#services" },
    { label: "Fuel Analytics", href: "#services" },
    { label: "Inventory", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#news" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Case Studies", href: "#projects" },
    { label: "System Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-white relative">
      {/* CTA Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading font-black text-2xl lg:text-3xl mb-3">
                Ready to get started with{" "}
                <span className="text-primary">FleetForce</span>?
              </h3>
              <p className="text-white/40 text-lg">
                Start your 30-day free trial. No credit card required.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="btn-primary">
                Start Free Trial
              </Link>
              <a href="#contact" className="btn-outline">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-heading font-black text-dark text-lg">
                FF
              </div>
              <div>
                <span className="text-white font-heading font-bold text-xl tracking-tight">
                  Fleet<span className="text-primary">Force</span>
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Enterprise-grade fleet management platform for construction and
              heavy equipment industries. Real-time tracking, AI-powered
              insights, and complete fleet visibility.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Hyderabad, Telangana, India
              </div>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +91 987 654 3210
              </div>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                info@fleetforce.in
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} FleetForce. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center text-white/40 hover:text-primary transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-dark shadow-lg hover:shadow-[0_0_30px_rgba(255,204,0,0.4)] transition-all duration-300 hover:-translate-y-1 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
