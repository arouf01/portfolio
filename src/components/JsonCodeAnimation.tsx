import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type Tok = { t: string; c: string };

const KEY = "text-primary";
const STR = "text-foreground/80";
const BOOL = "text-primary/80";
const MUT = "text-muted-foreground";

// The pretty-printed JSON, as color-tokenized lines (keeps theme-driven colors).
const LINES: Tok[][] = [
  [{ t: "{", c: MUT }],
  [
    { t: "  ", c: MUT },
    { t: '"tool"', c: KEY },
    { t: ": ", c: MUT },
    { t: '"JSON Formatter"', c: STR },
    { t: ",", c: MUT },
  ],
  [
    { t: "  ", c: MUT },
    { t: '"status"', c: KEY },
    { t: ": ", c: MUT },
    { t: '"valid"', c: STR },
    { t: ",", c: MUT },
  ],
  [
    { t: "  ", c: MUT },
    { t: '"features"', c: KEY },
    { t: ": [", c: MUT },
    { t: '"format"', c: STR },
    { t: ", ", c: MUT },
    { t: '"validate"', c: STR },
    { t: ", ", c: MUT },
    { t: '"minify"', c: STR },
    { t: "],", c: MUT },
  ],
  [
    { t: "  ", c: MUT },
    { t: '"secure"', c: KEY },
    { t: ": ", c: MUT },
    { t: "true", c: BOOL },
  ],
  [{ t: "}", c: MUT }],
];

// The same JSON minified onto one line.
const MINIFIED: Tok[] = [
  { t: "{", c: MUT },
  { t: '"tool"', c: KEY },
  { t: ":", c: MUT },
  { t: '"JSON Formatter"', c: STR },
  { t: ",", c: MUT },
  { t: '"status"', c: KEY },
  { t: ":", c: MUT },
  { t: '"valid"', c: STR },
  { t: ",", c: MUT },
  { t: '"features"', c: KEY },
  { t: ":[", c: MUT },
  { t: '"format"', c: STR },
  { t: ",", c: MUT },
  { t: '"validate"', c: STR },
  { t: ",", c: MUT },
  { t: '"minify"', c: STR },
  { t: "],", c: MUT },
  { t: '"secure"', c: KEY },
  { t: ":", c: MUT },
  { t: "true", c: BOOL },
  { t: "}", c: MUT },
];

type Phase = "minified" | "formatting" | "formatted";

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-blink bg-primary align-middle"
    />
  );
}

export function JsonCodeAnimation() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();

  // Default (and reduced-motion) state = fully formatted, no animation.
  const [phase, setPhase] = React.useState<Phase>("formatted");
  const [visible, setVisible] = React.useState(LINES.length);

  React.useEffect(() => {
    if (reduce || !inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const run = () => {
      if (cancelled) return;
      // 1) minified one-liner
      setPhase("minified");
      setVisible(0);
      wait(() => {
        if (cancelled) return;
        // 2) format: reveal lines one at a time
        setPhase("formatting");
        let i = 0;
        const step = () => {
          if (cancelled) return;
          i += 1;
          setVisible(i);
          if (i < LINES.length) {
            wait(step, 210);
          } else {
            // 3) hold on the formatted result, then loop
            setPhase("formatted");
            wait(run, 2800);
          }
        };
        wait(step, 260);
      }, 1100);
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce, inView]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-muted/40 p-2 shadow-lg transition-transform duration-300 group-hover:-translate-y-1"
    >
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
          {phase === "minified" ? "data.min.json" : "data.json"}
        </span>
        <span className="ml-auto text-[10px] font-semibold">
          {phase === "minified" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary [animation:pulse_1.2s_ease-in-out_infinite]">
              <ChevronDown className="h-3 w-3" />
              Format
            </span>
          )}
          {phase === "formatting" && (
            <span className="text-muted-foreground">Formatting…</span>
          )}
          {phase === "formatted" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
              <Check className="h-3 w-3" />
              Formatted
            </span>
          )}
        </span>
      </div>

      <pre className="min-h-[11.5rem] overflow-x-auto rounded-xl bg-background/70 p-4 font-mono text-xs leading-6">
        <code>
          <AnimatePresence initial={false} mode="wait">
            {phase === "minified" ? (
              <motion.div
                key="min"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="whitespace-pre-wrap break-all"
              >
                {MINIFIED.map((tok, i) => (
                  <span key={i} className={tok.c}>
                    {tok.t}
                  </span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="fmt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {LINES.slice(0, visible).map((line, li) => (
                  <motion.div
                    key={li}
                    initial={reduce ? false : { opacity: 0, y: 6, x: -6 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line.map((tok, ti) => (
                      <span key={ti} className={tok.c}>
                        {tok.t}
                      </span>
                    ))}
                    {phase === "formatting" && li === visible - 1 && <Caret />}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </code>
      </pre>
    </div>
  );
}

export default JsonCodeAnimation;
