"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A checklist whose ticks draw themselves the first time the list scrolls into
 * view, one after another.
 *
 * Same shape as `EyebrowRule`: the observer only flips `data-draw` on the list,
 * and the animation itself lives in globals.css keyed off that attribute. The
 * stroke is drawn with dasharray/dashoffset, so the mark is painted along its
 * own path rather than faded or scaled in — a tick being written, which is the
 * point.
 *
 * The stagger is an inline transition-delay per item rather than a stack of
 * nth-child rules, because the list length is data and CSS would have to guess
 * at it.
 *
 * Motion is opt-in site-wide, so `prefers-reduced-motion` leaves every tick
 * drawn and still. Same outcome when IntersectionObserver is missing, and a
 * <noscript> override in the root layout covers the no-JS case: the failure
 * mode always has to be a visible tick, never an empty box beside a promise.
 */

/** Drawn from the short arm up, so it reads as a hand writing a tick. */
const TICK_PATH = "M4 12l5 5L20 6";

/** Roughly the path length; the exact value only has to exceed it. */
const TICK_LENGTH = 24;

const STAGGER_MS = 110;

export function DrawnTickList({
  items,
  className = "",
  tickClassName = "text-primary-400",
}: {
  items: string[];
  className?: string;
  /**
   * Tick colour. Defaults to primary-400, which is tuned for the navy
   * deliverables bands this list was written for and washes out badly on white
   * (roughly 1.9:1). A caller rendering on a light ground should pass
   * `text-primary-600`, which measures 4.54:1. The mark is `aria-hidden`, so
   * this is legibility rather than an AA text requirement, but a tick nobody can
   * see is not doing the job either way.
   */
  tickClassName?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} data-draw={drawn ? "on" : "off"} className={className}>
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-3 sm:gap-4">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className={`mt-0.5 h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6 ${tickClassName}`}
          >
            <path
              d={TICK_PATH}
              className="tick-draw"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: TICK_LENGTH,
                transitionDelay: `${i * STAGGER_MS}ms`,
              }}
            />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
