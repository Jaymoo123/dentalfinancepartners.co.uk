"use client";

import { useEffect, useRef, useState } from "react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * The late-filing penalty ladder, drawn the first time it scrolls into view.
 *
 * The section's whole argument is that these are a sequence and not a set:
 * each penalty sits on top of the one before it. Statically, a connected row
 * of steps says that. Drawn, the rail growing left to right and each number
 * landing as it arrives says it in the order the reader will experience it,
 * which is the one thing a still image of a timeline cannot do.
 *
 * Same posture as `EyebrowRule` and `DrawnTickList`, deliberately: the observer
 * only flips `data-draw` on the root and every keyframe lives in globals.css
 * behind `prefers-reduced-motion: no-preference`. The stagger is an inline
 * transition-delay per step rather than nth-child rules, because the step count
 * is data.
 *
 * The failure modes all land on "fully drawn and still": reduced motion, no
 * IntersectionObserver, and the no-JS case via the <noscript> override in the
 * root layout. A reader must never be shown an empty rail where four penalties
 * should be.
 */

export type PenaltyStep = { when: string; penalty: string; note: string };

/**
 * The rail takes ~900ms to cross, so a step every 220ms puts each number down
 * roughly as the line reaches it rather than ahead of it.
 */
const STAGGER_MS = 220;

export function PenaltyLadder({ steps }: { steps: readonly PenaltyStep[] }) {
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
      // Higher than the tick list's 0.2: the ladder is a wide, short block and
      // at 0.2 it starts drawing while still below the fold on a laptop.
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-draw={drawn ? "on" : "off"} className="penalty-ladder mt-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Miss 31 January and it escalates</p>
      <ol className="relative mt-4 grid gap-5 sm:gap-6 md:grid-cols-4">
        {/* Two rails, one per axis, because the ladder changes direction at md.
            Horizontal above md, where the discs sit in a row; vertical below it,
            running down through the disc centres so the four steps still read as
            one escalating sequence rather than four unrelated cards. The stacked
            layout used to have no rail at all.

            The disc is `h-11` (44px) so its centre sits at 22px; a 1px rail
            centred there starts at 21.5px, which is why the offset is not a
            round number. Measured: rail and disc centres both land on 22. `top`/`bottom` are inset by the same 22px so the
            rail starts and ends AT the first and last disc rather than
            overshooting into the gap. */}
        <div aria-hidden className="penalty-ladder-rail absolute left-0 right-0 top-[22px] hidden h-px bg-slate-200 md:block" />
        <div aria-hidden className="penalty-ladder-rail-v absolute bottom-[22px] left-[21.5px] top-[22px] w-px bg-slate-200 md:hidden" />
        {steps.map((step, i) => (
          <li key={step.when} className="relative">
            <span
              aria-hidden
              // All four navy. An earlier pass greyed the first step to mark it
              // as the trigger, which read as "inactive": the £100 is a real
              // penalty and lands the day after the deadline.
              className="penalty-ladder-step relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white ring-4 ring-white"
              style={{ transitionDelay: `${i * STAGGER_MS}ms` }}
            >
              {i + 1}
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{step.when}</p>
            <p className="mt-1.5 text-lg font-bold leading-tight text-slate-900 sm:text-xl">{step.penalty}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.note}</p>
          </li>
        ))}
      </ol>
      <ExampleFigureNote className="mt-4" />
    </div>
  );
}
