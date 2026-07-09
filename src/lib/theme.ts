/**
 * Smart theme system — mode and color are INDEPENDENT.
 *
 * Everything visual is derived from three CSS variables (`--primary-h/s/l`)
 * plus the `dark` class. Two aspects are automated separately, and each is
 * frozen independently the moment the visitor customizes it:
 *
 *   - Mode:  auto = Light 06:00–17:59 / Dark 18:00–05:59, switching on the
 *            day/night boundary. Fixed once the visitor toggles it.
 *   - Color: auto = rotates every hour, `PALETTES[hour % 7]`. Fixed once the
 *            visitor picks a color.
 *
 * Persistence keys exist ONLY when that aspect is user-controlled:
 *   - `theme-mode` present  → mode is fixed to its value; absent → auto.
 *   - `theme-color` present → color is fixed to its value; absent → auto.
 * "Reset to default" removes both keys, restoring full automation.
 */

export type Palette = { name: string; hex: string };

export const PALETTES: Palette[] = [
  { name: "Blue", hex: "#3386FE" },
  { name: "Indigo", hex: "#6366F1" },
  { name: "Violet", hex: "#8B5CF6" },
  { name: "Cyan", hex: "#06B6D4" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Rose", hex: "#F43F5E" },
  { name: "Amber", hex: "#F59E0B" },
];

export const DEFAULT_HEX = "#3386FE";

export const KEYS = {
  color: "theme-color", // saved primary hex — present only when user-fixed
  mode: "theme-mode", // "light" | "dark" — present only when user-fixed
} as const;

export type Mode = "light" | "dark";

export function hexToHsl(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let sat = 0;
  const lig = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lig > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue /= 6;
  }
  return [Math.round(hue * 360), Math.round(sat * 100), Math.round(lig * 100)];
}

/** True when a color is light enough to need dark (not white) foreground text. */
export function isLightColor(hex: string): boolean {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Perceived luminance (ITU-R BT.601).
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export function paletteIndexForHour(hour: number): number {
  return ((hour % PALETTES.length) + PALETTES.length) % PALETTES.length;
}

/** Automatic color (hourly rotation) for a given moment. */
export function autoColor(date = new Date()): string {
  return PALETTES[paletteIndexForHour(date.getHours())].hex;
}

/** Automatic mode (time of day) for a given moment. */
export function autoMode(date = new Date()): Mode {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

/**
 * Inline, dependency-free script that applies the correct theme BEFORE first
 * paint (no flash). Mode and color resolve independently. Kept in sync with the
 * controller's `apply()` and the copy inlined in index.html.
 */
export const THEME_FOUC_SCRIPT = `(function(){try{
var K=${JSON.stringify(KEYS)},P=${JSON.stringify(PALETTES.map((p) => p.hex))},D=${JSON.stringify(DEFAULT_HEX)};
function ls(k){try{var v=localStorage.getItem(k);if(v!=null)return v;}catch(e){}
var m=document.cookie.match(new RegExp('(?:^|; )'+k+'=([^;]+)'));return m?decodeURIComponent(m[1]):null;}
function toHsl(x){var h=x.replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c}).join('');
var r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255;
var mx=Math.max(r,g,b),mn=Math.min(r,g,b),hu=0,sa=0,li=(mx+mn)/2;
if(mx!==mn){var d=mx-mn;sa=li>0.5?d/(2-mx-mn):d/(mx+mn);
if(mx===r)hu=(g-b)/d+(g<b?6:0);else if(mx===g)hu=(b-r)/d+2;else hu=(r-g)/d+4;hu/=6;}
return[Math.round(hu*360),Math.round(sa*100),Math.round(li*100)];}
function light(x){var h=x.replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c}).join('');
var r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
return (r*299+g*587+b*114)/1000>150;}
var hr=new Date().getHours();
var savedColor=ls(K.color),savedMode=ls(K.mode);
var hex=savedColor||P[((hr%P.length)+P.length)%P.length];
var mode=savedMode||((hr>=6&&hr<18)?'light':'dark');
var hsl=toHsl(hex),s=document.documentElement;
s.style.setProperty('--primary-h',hsl[0]);
s.style.setProperty('--primary-s',hsl[1]+'%');
s.style.setProperty('--primary-l',hsl[2]+'%');
s.style.setProperty('--primary-foreground',light(hex)?'216 40% 14%':'0 0% 100%');
if(mode==='dark')s.classList.add('dark');else s.classList.remove('dark');
s.style.colorScheme=mode;
}catch(e){}})();`;
