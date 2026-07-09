import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Moon, Palette, RotateCcw, Sparkles, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PALETTES } from "@/lib/theme";
import { useThemeControl } from "@/components/ThemeProvider";

const ThemeColorPicker = () => {
  const {
    primaryHex,
    mode,
    isColorAuto,
    isModeAuto,
    mounted,
    setPrimary,
    setMode,
    reset,
  } = useThemeControl();
  const [open, setOpen] = useState(false);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-label="Theme customizer"
            className="mb-3 w-72 rounded-2xl border border-border bg-popover p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold">Theme</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mode */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                Mode
                {isModeAuto && (
                  <span className="inline-flex items-center gap-1 text-primary">
                    <Sparkles className="h-3 w-3" /> auto
                  </span>
                )}
              </span>
              <div className="inline-flex rounded-full border border-border p-0.5">
                <button
                  onClick={() => setMode("light")}
                  aria-pressed={mode === "light"}
                  className={cn(
                    "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-semibold transition-colors",
                    mode === "light"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Sun className="h-3.5 w-3.5" /> Light
                </button>
                <button
                  onClick={() => setMode("dark")}
                  aria-pressed={mode === "dark"}
                  className={cn(
                    "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-semibold transition-colors",
                    mode === "dark"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Moon className="h-3.5 w-3.5" /> Dark
                </button>
              </div>
            </div>

            {/* Color */}
            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              Color
              {isColorAuto ? (
                <span className="inline-flex items-center gap-1 text-primary">
                  <Sparkles className="h-3 w-3" /> rotates hourly
                </span>
              ) : (
                <span>custom</span>
              )}
            </p>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {PALETTES.map((p) => {
                const active =
                  !isColorAuto &&
                  primaryHex.toLowerCase() === p.hex.toLowerCase();
                return (
                  <button
                    key={p.hex}
                    onClick={() => setPrimary(p.hex)}
                    aria-label={p.name}
                    aria-pressed={active}
                    title={p.name}
                    style={{ backgroundColor: p.hex }}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full ring-offset-2 ring-offset-popover transition-transform hover:scale-110",
                      active && "ring-2 ring-foreground",
                    )}
                  >
                    {active && <Check className="h-3.5 w-3.5 text-white" />}
                  </button>
                );
              })}
            </div>

            <label className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-2.5 text-sm">
              <span className="font-medium text-muted-foreground">Custom</span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase">{primaryHex}</span>
                <input
                  type="color"
                  value={primaryHex}
                  onChange={(e) => setPrimary(e.target.value)}
                  aria-label="Pick a custom brand color"
                  className="h-7 w-9 cursor-pointer rounded border border-border bg-transparent"
                />
              </span>
            </label>

            <button
              onClick={reset}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to default
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Customize theme"
        aria-expanded={open}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-lg backdrop-blur transition-transform hover:scale-105"
      >
        <Palette className="h-5 w-5" />
        {(isColorAuto || isModeAuto) && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
          </span>
        )}
      </button>
    </div>
  );
};

export default ThemeColorPicker;
