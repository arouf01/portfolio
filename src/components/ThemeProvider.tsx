import * as React from "react";
import {
  DEFAULT_HEX,
  KEYS,
  autoColor,
  autoMode,
  hexToHsl,
  isLightColor,
  type Mode,
} from "@/lib/theme";

type ThemeControl = {
  mode: Mode;
  primaryHex: string;
  isModeAuto: boolean;
  isColorAuto: boolean;
  mounted: boolean;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
  setPrimary: (hex: string) => void;
  reset: () => void;
};

const Ctx = React.createContext<ThemeControl | null>(null);

export function useThemeControl(): ThemeControl {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useThemeControl must be used within ThemeProvider");
  return c;
}

/* ── storage (localStorage, cookie fallback) ────────────────────────────── */
function read(key: string): string | null {
  try {
    const v = localStorage.getItem(key);
    if (v != null) return v;
  } catch {
    /* blocked */
  }
  const m = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    document.cookie = `${key}=${encodeURIComponent(value)};path=/;max-age=31536000;samesite=lax`;
  }
}
function remove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
  document.cookie = `${key}=;path=/;max-age=0;samesite=lax`;
}

/* ── DOM application ─────────────────────────────────────────────────────── */
let transitionTimer: ReturnType<typeof setTimeout> | undefined;
function apply(hex: string, mode: Mode, animate: boolean) {
  const el = document.documentElement;
  if (animate) {
    el.classList.add("theme-transition");
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(
      () => el.classList.remove("theme-transition"),
      360,
    );
  }
  const [h, s, l] = hexToHsl(hex);
  el.style.setProperty("--primary-h", String(h));
  el.style.setProperty("--primary-s", `${s}%`);
  el.style.setProperty("--primary-l", `${l}%`);
  el.style.setProperty(
    "--primary-foreground",
    isLightColor(hex) ? "216 40% 14%" : "0 0% 100%",
  );
  el.classList.toggle("dark", mode === "dark");
  el.style.colorScheme = mode;
}

/** Resolve the effective color + mode from storage (auto where not fixed). */
function resolve(): { hex: string; mode: Mode } {
  const now = new Date();
  return {
    hex: read(KEYS.color) || autoColor(now),
    mode: (read(KEYS.mode) as Mode) || autoMode(now),
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [mode, setModeState] = React.useState<Mode>("dark");
  const [primaryHex, setPrimaryHex] = React.useState<string>(DEFAULT_HEX);
  const [isModeAuto, setIsModeAuto] = React.useState(true);
  const [isColorAuto, setIsColorAuto] = React.useState(true);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  // Re-evaluate whichever aspect is still automatic. Reads storage fresh, so a
  // fixed aspect is never overridden while the auto one keeps advancing.
  const syncAuto = React.useCallback(() => {
    const { hex, mode: m } = resolve();
    apply(hex, m, true);
    setPrimaryHex(hex);
    setModeState(m);
    setIsColorAuto(read(KEYS.color) == null);
    setIsModeAuto(read(KEYS.mode) == null);
  }, []);

  // Fire exactly on each hour boundary (color rotation + any day/night flip),
  // without a page refresh.
  const scheduleAuto = React.useCallback(() => {
    clearTimeout(timer.current);
    const now = new Date();
    const msToNextHour =
      (60 - now.getMinutes()) * 60000 -
      now.getSeconds() * 1000 -
      now.getMilliseconds() +
      50;
    timer.current = setTimeout(() => {
      syncAuto();
      scheduleAuto();
    }, msToNextHour);
  }, [syncAuto]);

  // Initialize from storage on mount (FOUC script already painted the DOM).
  React.useEffect(() => {
    const { hex, mode: m } = resolve();
    setPrimaryHex(hex);
    setModeState(m);
    setIsColorAuto(read(KEYS.color) == null);
    setIsModeAuto(read(KEYS.mode) == null);
    setMounted(true);
    scheduleAuto();

    // Re-sync when returning to a backgrounded tab (may have crossed an hour).
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      syncAuto();
      scheduleAuto();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [scheduleAuto, syncAuto]);

  // Fix the color only. Mode keeps its current auto/fixed state (color rotation
  // stops; day/night mode continues if it was automatic).
  const setPrimary = React.useCallback(
    (hex: string) => {
      write(KEYS.color, hex);
      apply(hex, mode, true);
      setPrimaryHex(hex);
      setIsColorAuto(false);
    },
    [mode],
  );

  // Fix the mode only. Color keeps rotating if it was automatic.
  const setMode = React.useCallback(
    (m: Mode) => {
      write(KEYS.mode, m);
      apply(primaryHex, m, true);
      setModeState(m);
      setIsModeAuto(false);
    },
    [primaryHex],
  );

  const toggleMode = React.useCallback(
    () => setMode(mode === "dark" ? "light" : "dark"),
    [setMode, mode],
  );

  // Reset everything to full automation.
  const reset = React.useCallback(() => {
    remove(KEYS.color);
    remove(KEYS.mode);
    syncAuto();
    scheduleAuto();
  }, [syncAuto, scheduleAuto]);

  const value: ThemeControl = {
    mode,
    primaryHex,
    isModeAuto,
    isColorAuto,
    mounted,
    setMode,
    toggleMode,
    setPrimary,
    reset,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
