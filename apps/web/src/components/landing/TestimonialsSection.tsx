"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Fleet Manager",
    company: "BuildPro Infrastructure",
    text: "FleetForce transformed how we manage our 120+ heavy equipment fleet. The real-time GPS tracking and maintenance alerts alone have saved us ₹45 lakhs annually.",
    rating: 5,
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    role: "Operations Director",
    company: "Sharma Construction Co.",
    text: "The driver performance scoring and fuel analytics are game changers. We reduced idle time by 40% and fuel theft is practically zero now.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Mohammed Ismail",
    role: "CEO",
    company: "Royal Earth Movers",
    text: "We switched from manual logs to FleetForce and it was the best decision. The dashboard gives me complete visibility across all our 8 project sites.",
    rating: 5,
    avatar: "MI",
  },
  {
    name: "Anita Desai",
    role: "Maintenance Head",
    company: "Metro Infrastructure Ltd.",
    text: "The automated maintenance scheduling has reduced our vehicle breakdown incidents by 65%. The inventory management module keeps our spare parts optimized.",
    rating: 5,
    avatar: "AD",
  },
  {
    name: "Vikram Singh",
    role: "Transport Head",
    company: "Singh & Sons Builders",
    text: "FleetForce's geofencing feature ensures our equipment stays within project boundaries. The instant alerts have prevented multiple unauthorized usage incidents.",
    rating: 5,
    avatar: "VS",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () =>
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-surface-alt relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-bold text-accent uppercase tracking-[0.15em] mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight">
            Trusted by Industry{" "}
            <span className="gradient-text">Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="card-premium p-10 lg:p-14 relative">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

              <div key={active}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[active].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-primary fill-primary"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <p className="text-lg lg:text-xl text-text-secondary leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[active].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-dark flex items-center justify-center text-primary font-heading font-bold text-lg">
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-lg">
                        {testimonials[active].name}
                      </p>
                      <p className="text-text-muted text-sm">
                        {testimonials[active].role} •{" "}
                        {testimonials[active].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-dark/10 hover:bg-primary hover:text-dark flex items-center justify-center transition-all duration-300 text-dark"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-8 bg-primary"
                        : "w-2 bg-dark/20 hover:bg-dark/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-dark/10 hover:bg-primary hover:text-dark flex items-center justify-center transition-all duration-300 text-dark"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
