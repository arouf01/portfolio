import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";

/** WhatsApp number (digits only) used for the wa.me chat link. */
const WHATSAPP_NUMBER = "8801518980983";
const WHATSAPP_MESSAGE = "Hi Abdur Rouf, I'd like to discuss a project.";

/** Floating WhatsApp chat button + Back-to-top, stacked in the bottom-right. */
const FloatingWidgets = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full gradient-bg text-primary-foreground shadow-glow"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          WHATSAPP_MESSAGE,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-primary opacity-20" />
      </a>
    </div>
  );
};

export default FloatingWidgets;
