import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ScrollJourneySection from "@/components/landing/ScrollJourneySection";
import InteractiveIndiaMapSection from "@/components/landing/InteractiveIndiaMapSection";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import NewsSection from "@/components/landing/NewsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ScrollJourneySection />
      <InteractiveIndiaMapSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <ProjectsSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
