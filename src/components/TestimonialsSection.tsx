import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";

const TestimonialsSection = () => {
  const headingRef = React.useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4" ref={headingRef}>
        {/* Section Header */}
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-4 mb-6"
          >
            What Clients <span className="gradient-text">Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            Don't take my word for it - here's what clients around the world say
            about working with me.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-24 h-1 gradient-bg mx-auto rounded-full mt-6"
          />
        </div>
      </div>

      <TestimonialsCarousel />
    </section>
  );
};

/**
 * Auto-scrolling testimonial carousel that visitors can ALSO scroll/drag with
 * the mouse. The list is duplicated so scrolling loops seamlessly; auto-scroll
 * pauses while hovering or dragging and is skipped entirely under reduced-motion
 * (the carousel stays manually scrollable).
 */
function TestimonialsCarousel() {
  const scroller = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const paused = React.useRef(false);
  const dragging = React.useRef(false);
  const drag = React.useRef({ startX: 0, startScroll: 0 });

  const items = React.useMemo(() => [...testimonials, ...testimonials], []);

  // Wrap scrollLeft within the first copy so looping is seamless in both directions.
  const wrap = React.useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  }, []);

  // Auto-scroll loop.
  React.useEffect(() => {
    if (reduce) return;
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      if (!paused.current && !dragging.current) {
        el.scrollLeft += 1; // ~60px/s
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, wrap]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (!el) return;
    dragging.current = true;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const el = scroller.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    let next = drag.current.startScroll - (e.clientX - drag.current.startX);
    if (next < 0) next += half;
    else if (next >= half) next -= half;
    el.scrollLeft = next;
  }
  function endDrag() {
    dragging.current = false;
  }

  return (
    <div className="group relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        ref={scroller}
        className="no-scrollbar flex cursor-grab gap-6 overflow-x-auto select-none active:cursor-grabbing px-4"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => {
          paused.current = false;
          endDrag();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={wrap}
        aria-label="Client testimonials — drag or scroll to browse"
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="glass-card flex w-[340px] shrink-0 flex-col rounded-2xl border border-primary/10 p-7 sm:w-[380px]">
      <Quote className="h-8 w-8 shrink-0 text-primary/30" />
      <div className="mt-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-primary/10 pt-4">
        <img
          src={`https://flagcdn.com/${t.code}.svg`}
          alt={`${t.country} flag`}
          width={24}
          height={18}
          loading="lazy"
          draggable={false}
          className="h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-border"
        />
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">
            {t.service} · {t.country}
          </p>
        </div>
      </div>
    </article>
  );
}

export default TestimonialsSection;
