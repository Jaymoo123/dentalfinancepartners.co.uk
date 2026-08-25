"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The eyebrow's brand rule, drawn left to right the first time it scrolls
 * into view.
 *
 * Split out as its own client component so `page-blocks` stays server-rendered:
 * only this 24px mark ships an observer, not `Eyebrow`, `Prose` or `CardStack`.
 *
 * The observed node is the OUTER span, which keeps its full width at all times.
 * Observing the drawn bar itself would not work: it starts at `scaleX(0)`, so
 * its bounding box has zero area and the intersection ratio could never reach
 * the threshold.
 *
 * Motion is opt-in site-wide, so `prefers-reduced-motion` skips the animation
 * and the rule is simply present. Same outcome if IntersectionObserver is
 * missing: draw immediately rather than leave the mark invisible.
 */
export function EyebrowRule({ onDark = false }: { onDark?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="block h-0.5 w-6 flex-none overflow-hidden rounded-full"
    >
      <span
        data-draw={drawn ? "on" : "off"}
        className={`eyebrow-rule block h-full w-full rounded-full ${
          onDark ? "bg-primary-400" : "bg-primary-600"
        }`}
      />
    </span>
  );
}
