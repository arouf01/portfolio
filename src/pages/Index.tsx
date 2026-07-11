import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import WorkAreasSection from "@/components/WorkAreasSection";
import JsonFormatterSection from "@/components/JsonFormatterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <TestimonialsSection />
        <WorkAreasSection />
        <JsonFormatterSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Index;
