"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-bold text-accent uppercase tracking-[0.15em] mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-6">
            Ready to <span className="gradient-text">Transform</span> Your
            Fleet?
          </h2>
          <p className="text-text-secondary text-lg">
            Talk to our team and see how FleetForce can optimize your
            construction fleet operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="card-premium p-8 text-black dark:text-white transition-colors">
              <h3 className="font-heading font-bold text-xl mb-8 text-black dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1 text-black dark:text-white">Head Office</p>
                    <p className="text-black dark:text-white/80 font-medium text-sm leading-relaxed">
                      Tech Hub, HITEC City
                      <br />
                      Hyderabad, Telangana 500081
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1 text-black dark:text-white">Phone</p>
                    <p className="text-black dark:text-white/80 font-medium text-sm">+91 987 654 3210</p>
                    <p className="text-black dark:text-white/80 font-medium text-sm">+91 987 654 3211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1 text-black dark:text-white">Email</p>
                    <p className="text-black dark:text-white/80 font-medium text-sm">info@fleetforce.in</p>
                    <p className="text-black dark:text-white/80 font-medium text-sm">sales@fleetforce.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1 text-black dark:text-white">Working Hours</p>
                    <p className="text-black dark:text-white/80 font-medium text-sm">
                      Mon — Sat: 9:00 AM — 6:00 PM
                    </p>
                    <p className="text-black dark:text-white/80 font-medium text-sm">
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="card-premium p-8 lg:p-10">
              <h3 className="font-heading font-bold text-xl text-dark mb-8">
                Send us a Message
              </h3>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark placeholder:text-text-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark placeholder:text-text-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark placeholder:text-text-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Fleet Size
                    </label>
                    <select className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      <option>1–25 vehicles</option>
                      <option>26–100 vehicles</option>
                      <option>101–500 vehicles</option>
                      <option>500+ vehicles</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your fleet management needs..."
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border text-dark placeholder:text-text-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
