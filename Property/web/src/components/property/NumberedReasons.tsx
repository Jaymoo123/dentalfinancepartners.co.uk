"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Numbered argument list whose numerals light emerald the first time the
 * section scrolls into view, one after another.
 *
 * Same shape as DrawnTickList and the eyebrow rule: the observer only flips
 * `data-draw` on the wrapper, and the animation itself lives in globals.css
 * keyed off that attribute. The stagger is an inline transition-delay per item
 * rather than a stack of nth-child rules, because the list length is data and
 * CSS would have to guess at it.
 *
 * The numerals settle emerald and STAY there. Everything on this site draws
 * once and stops; a numeral that pulsed would compete with the copy beside it,
 * and the point of the mark is the arrival, not the loop.
 *
 * Motion is opt-in site-wide, so `prefers-reduced-motion` lands every numeral
 * already lit. Same outcome when IntersectionObserver is missing, and a
 * <noscript> override in the root layout covers the no-JS case: the failure
 * mode is always a finished numeral, never a row of grey stubs.
 */

const STAGGER_MS = 130;

export function NumberedReasons({ items }: { items: { title: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-draw={drawn ? "on" : "off"}
      className="mt-8 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-3"
    >
      {items.map((item, i) => (
        <div key={item.title}>
          <span
            className="story-numeral block text-3xl font-bold tabular-nums sm:text-4xl"
            style={{ transitionDelay: `${i * STAGGER_MS}ms` }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="story-numeral-rule mt-3 block h-px w-10 bg-emerald-600"
            style={{ transitionDelay: `${i * STAGGER_MS}ms` }}
          />
          <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
