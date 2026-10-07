import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0].href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll-spy: the last section whose top has passed under the navbar wins.
      const offset = 140;
      let current = navLinks[0].href;
      navLinks.forEach((link) => {
        const element = document.querySelector(link.href);
        if (element && element.getBoundingClientRect().top <= offset) {
          current = link.href;
        }
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-end gap-3">
        {/* Desktop Menu — centered floating pill */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-foreground/[0.06] p-2 backdrop-blur-xl shadow-soft">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative rounded-full px-6 py-2.5 text-[0.9375rem] font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full border border-primary/25 bg-primary/15"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle className="rounded-full border border-border/60 bg-foreground/[0.06] backdrop-blur-xl hover:bg-foreground/10" />

          <Button
            variant="gradient"
            className="hidden sm:inline-flex rounded-xl px-5"
            onClick={() => scrollToSection("#contact")}
          >
            Hire Me
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-full border border-border/60 bg-foreground/[0.06] backdrop-blur-xl hover:bg-foreground/10"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden container mx-auto px-4 mt-3"
          >
            <div className="rounded-3xl border border-border/60 glass-effect shadow-soft p-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`rounded-2xl px-4 py-3 font-medium transition-colors ${
                    activeSection === link.href
                      ? "bg-primary/15 text-primary"
                      : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <Button
                variant="gradient"
                className="mt-2 rounded-2xl"
                onClick={() => scrollToSection("#contact")}
              >
                Hire Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
