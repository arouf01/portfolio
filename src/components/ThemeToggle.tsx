import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useThemeControl } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { mode, toggleMode, mounted } = useThemeControl();
  const isDark = mode === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleMode}
      className="text-foreground/80 hover:text-primary"
    >
      {mounted ? (
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.span>
      ) : (
        <Sun size={20} />
      )}
    </Button>
  );
};

export default ThemeToggle;
