import { useEffect } from "react";
import { hexToHsl } from "@/lib/theme";
import { useThemeControl } from "@/components/ThemeProvider";

/**
 * Keeps the tab icon in sync with the active brand color. The mark is the "AR"
 * monogram inside a gradient ring on a dark tile — identical to the static
 * /favicon.svg and the generated PNGs — but its ring is derived live from the
 * current `--primary` hue, so a custom brand color retints the icon too. The
 * "AR" glyph is pre-outlined (Sora 700) so it needs no font at render time.
 */
const AR_PATH =
  "M17.70 0L1.30 0L25.40-73L51.90-73L76.90 0L59.90 0L54-18.10L23.50-18.10L17.70 0ZM27.80-31.70L49.50-31.70L40.40-59.60L36.70-59.60L27.80-31.70ZM102.80 0L86.40 0L86.40-73.60L115.10-73.60Q124.20-73.60 130.90-70.85Q137.60-68.10 141.20-62.70Q144.80-57.30 144.80-49.10L144.80-49.10L144.80-47.50Q144.80-39.40 141.20-34.10L141.20-34.10Q137.60-28.80 131.10-26.10L131.10-26.10L149.70 0L130.70 0L114.80-23.40L102.80-23.40L102.80 0ZM116.40-59.70L102.80-59.70L102.80-36.30L116.40-36.30Q120-36.30 122.65-37.75Q125.30-39.20 126.75-41.85Q128.20-44.50 128.20-48Q128.20-51.50 126.75-54.15Q125.30-56.80 122.65-58.25Q120-59.70 116.40-59.70L116.40-59.70Z";
const AR_TRANSFORM = "translate(24.56 62.4) scale(0.3369)";

const hsl = (h: number, s: number, l: number) => `hsl(${h} ${s}% ${l}%)`;

function faviconSvg(hex: string): string {
  const [h, s, l] = hexToHsl(hex);
  const ringLight = hsl(h, s, Math.min(l + 16, 80));
  const ringDark = hsl(h, s, Math.max(l - 14, 36));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs><linearGradient id="fav" x1="16" y1="14" x2="84" y2="86" gradientUnits="userSpaceOnUse">
    <stop stop-color="${ringLight}"/><stop offset="1" stop-color="${ringDark}"/>
  </linearGradient></defs>
  <rect x="3" y="3" width="94" height="94" rx="24" fill="#0E0A1F"/>
  <circle cx="50" cy="50" r="34" fill="none" stroke="url(#fav)" stroke-width="6"/>
  <g transform="${AR_TRANSFORM}"><path d="${AR_PATH}" fill="#ffffff"/></g>
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
