"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The onboarding steps as a vertical timeline that fills as you scroll.
 *
 * A rail runs behind the numbered nodes and an emerald line draws down it,
 * tracking an anchor two thirds up the viewport. Steps light as the anchor
 * passes them, so reading down the section and watching the process advance are
 * the same movement. The effect is the point: four cards in a grid said the
 * same words without ever suggesting a sequence.
 *
 * Everything is measured off `getBoundingClientRect` inside a rAF-throttled
 * scroll handler rather than an observer per node, because the fill needs a
 * continuous value and observers only give you crossings.
 *
 * Under prefers-reduced-motion the handler never attaches and the timeline
 * renders complete and at rest, which is also what it looks like without JS.
 */

/** Where down the viewport the "you are here" anchor sits. */
const ANCHOR = 0.66;

export function ProcessTimeline({
  steps,
}: {
  steps: Array<{ n: string; title: string; body: string }>;
}) {
  const containerRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Static defaults are the finished state, so no-JS and reduced-motion both
  // land on a timeline that reads as complete rather than empty.
  const [fill, setFill] = useState(1);
  const [reached, setReached] = useState(steps.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setFill(0);
    setReached(0);

    let frame = 0;

    const measure = () => {
      frame = 0;
      const container = containerRef.current;
      if (!container) return;

      const box = container.getBoundingClientRect();
      const anchor = window.innerHeight * ANCHOR;

      const first = nodeRefs.current[0];
      const last = nodeRefs.current[steps.length - 1];
      if (!first || !last) return;

      // Draw between the first and last node centres, not the container edges,
      // so the line starts and stops exactly on a node.
      const top = first.getBoundingClientRect().top + first.offsetHeight / 2 - box.top;
      const bottom = last.getBoundingClientRect().top + last.offsetHeight / 2 - box.top;
      const span = Math.max(1, bottom - top);

      const progress = (anchor - box.top - top) / span;
      setFill(Math.min(1, Math.max(0, progress)));

      const passed = nodeRefs.current.filter((node) => {
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2 <= anchor;
      }).length;
      setReached(passed);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  return (
    <ol ref={containerRef} className="relative mt-8 sm:mt-10">
      {/* The rail, and the emerald line that draws down it. */}
      <div
        aria-hidden
        className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 sm:left-8"
      >
        <div
          className="w-px bg-emerald-600 transition-[height] duration-150 ease-out"
          style={{ height: `${fill * 100}%` }}
        />
      </div>

      {steps.map((step, i) => {
        const active = i < reached;

        return (
          <li key={step.n} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
            <div
              ref={(node) => {
                nodeRefs.current[i] = node;
              }}
              className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-lg font-bold transition-all duration-500 sm:h-16 sm:w-16 sm:text-2xl ${
                active
                  ? "bg-slate-900 text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.7)]"
                  : "bg-white text-slate-400 ring-1 ring-slate-200"
              }`}
            >
              {step.n}
            </div>
            <div
              className={`pt-1 transition-opacity duration-500 sm:pt-2.5 ${
                active ? "opacity-100" : "opacity-60"
              }`}
            >
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-3 sm:text-base">{step.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
