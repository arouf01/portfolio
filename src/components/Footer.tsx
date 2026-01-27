import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© {currentYear} Abdur Rouf. All rights reserved.</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            ></motion.span>
          </div>

          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#home")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-2xl font-bold font-display gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Abdur Rouf
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
