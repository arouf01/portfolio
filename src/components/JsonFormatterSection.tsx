import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  Gift,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import JsonCodeAnimation from "@/components/JsonCodeAnimation";

const trust = [
  { icon: Gift, label: "Free" },
  { icon: Zap, label: "Fast" },
  { icon: ShieldCheck, label: "Secure" },
  { icon: Globe, label: "Browser-based" },
];

const features = [
  "Format & Beautify JSON",
  "Validate JSON Syntax",
  "Minify JSON",
  "Copy Formatted JSON",
  "Browser-Based Tool",
  "Free to Use",
];

const TOOL_URL = "https://json.a1zohosolutions.com/";

const JsonFormatterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="json-formatter" className="py-20 lg:py-32">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-card p-8 shadow-card transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10 sm:p-10 lg:p-12"
        >
          {/* Brand-tinted glow (follows the theme color) */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: copy + CTA */}
            <div>
              <span className="eyebrow">
                <Braces className="h-3.5 w-3.5 text-primary" />
                Free Developer Tool
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Free JSON Formatter{" "}
                <span className="gradient-text">&amp; Validator</span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Format, beautify, validate, and minify JSON instantly - right in
                your browser. No installation and no sign-up: just paste your
                JSON and go.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {trust.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground/80"
                  >
                    <t.icon className="h-3.5 w-3.5 text-primary" />
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild variant="gradient" size="lg">
                  <a href={TOOL_URL} target="_blank" rel="noopener noreferrer">
                    Try JSON Formatter
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Perfect for developers, API testing, Zoho developers, JavaScript
                developers, and anyone working with JSON data.
              </p>
            </div>

            {/* Right: animated code-window mock + feature list */}
            <div className="space-y-6">
              <JsonCodeAnimation />

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JsonFormatterSection;
