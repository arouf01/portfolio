import { useEffect } from "react";
import { hexToHsl } from "@/lib/theme";
import { useThemeControl } from "@/components/ThemeProvider";

/**
 * Regenerates the favicon from the active brand color whenever the theme color
 * changes (hourly rotation, picker, or custom hex). The hexagon "network" mark
 * mirrors the static /favicon.svg, but its stops are derived live from the
 * current `--primary` hue so the tab icon always matches the site.
 */
const hsl = (h: number, s: number, l: number) => `hsl(${h} ${s}% ${l}%)`;

function faviconSvg(hex: string): string {
  const [h, s, l] = hexToHsl(hex);
  const base = hsl(h, s, Math.min(l, 62));
  const light = hsl(h, s, Math.min(l + 12, 82));
  const dark = hsl(h, s, Math.max(l - 22, 26));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <defs><linearGradient id="fav" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
    <stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/>
  </linearGradient></defs>
  <path d="M50 6 L88 28 V72 L50 94 L12 72 V28 Z" fill="none" stroke="url(#fav)" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="50" cy="35" r="8" fill="${base}"/>
  <circle cx="33" cy="63" r="8" fill="${dark}"/>
  <circle cx="67" cy="63" r="8" fill="${light}"/>
  <path d="M50 35 L33 63 M50 35 L67 63 M33 63 L67 63" stroke="hsl(${h} 18% 62%)" stroke-width="3"/>
</svg>`;
}

const DynamicFavicon = () => {
  const { primaryHex } = useThemeControl();

  useEffect(() => {
    const href =
      "data:image/svg+xml," + encodeURIComponent(faviconSvg(primaryHex));
    let link = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][type="image/svg+xml"]',
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [primaryHex]);

  return null;
};

export default DynamicFavicon;
