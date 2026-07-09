import { useEffect, useRef } from "react";

/**
 * Soft circular glow that trails the cursor with eased interpolation. Tinted
 * with the active brand color via `--primary`, so it retints instantly with the
 * theme. Sits BEHIND page content (negative z-index), so it never covers text
 * or buttons and never hurts readability.
 *
 * Performance: a single rAF loop lerps toward the target and only runs while
 * the glow is still catching up (it parks itself when settled). Movement is a
 * GPU-composited `translate3d` on a `will-change: transform` layer, and the
 * blur is static — so it stays at 60 FPS. Disabled on touch/coarse pointers
 * and when reduced-motion is requested.
 */
const CursorSpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let raf = 0;
    let visible = false;

    const tick = () => {
      const dx = targetX - curX;
      const dy = targetY - curY;
      curX += dx * 0.14; // easing factor — lower = smoother/slower trail
      curY += dy * 0.14;
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      // Keep animating only while still catching up, then park (saves power).
      raf =
        Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const hide = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        ref={ref}
        className="absolute left-[-150px] top-[-150px] h-[300px] w-[300px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.14) 0%, hsl(var(--primary) / 0.08) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
