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

/**
 * The step discs, as a warm ramp instead of four identical navy circles.
 *
 * The ramp is the section's own argument in colour: these penalties are a
 * sequence that gets worse, so the discs get hotter as the reader moves along
 * them. Four flat navy discs said "four things" where the copy says "an
 * escalation".
 *
 * Read the note below before changing any of these. THE FIRST STEP MUST STAY
 * FULLY SATURATED. An earlier pass greyed step one to mark it as the trigger and
 * it read as "inactive", which is wrong: the £100 is a real penalty and it lands
 * the day after the deadline. That is why the ramp starts at amber-700 rather
 * than at a pale amber-100, and it is the same trap a light-to-dark ramp walks
 * straight back into.
 *
 * Contrast, measured against white text at the 4.5:1 AA floor (these are 14px
 * bold, which is NOT WCAG large text, so 3:1 does not apply):
 *
 *   amber-700  #b45309  5.02:1
 *   orange-700 #c2410c  5.18:1
 *   red-600    #dc2626  4.83:1
 *   red-800    #991b1b  8.31:1
 *
 * The obvious brighter choices FAIL and are not options: amber-600 is 3.19:1 and
 * orange-600, the site's own accent, is 3.56:1. Do not "brighten" this ramp
 * without re-measuring.
 *
 * Nothing rests on hue. Every step carries its number, its date and its penalty
 * in text, so the ramp is emphasis rather than information and colour-blind
 * readers lose nothing. That is also why a single-hue warm ramp is fine here
 * where `RateWedge` needed a validated CVD-separated pair: that figure asks the
 * reader to tell two series apart, this one does not.
 */
const STEP_TONES = [
  "bg-[#b45309]", // amber-700
  "bg-[#c2410c]", // orange-700
  "bg-[#dc2626]", // red-600
  "bg-[#991b1b]", // red-800
] as const;

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
        {/* The rail carries the same ramp as the discs, so the line the eye
            follows warms up as it crosses rather than staying a neutral hairline
            through four escalating steps. Direction follows the axis: left to
            right above md, top to bottom below it, matching the reading order
            each layout actually has. Both still animate on `transform`, so the
            gradient scales with the rail and the draw is unchanged. */}
        <div
          aria-hidden
          className="penalty-ladder-rail absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-[#b45309] via-[#dc2626] to-[#991b1b] md:block"
        />
        <div
          aria-hidden
          className="penalty-ladder-rail-v absolute bottom-[22px] left-[21.5px] top-[22px] w-px bg-gradient-to-b from-[#b45309] via-[#dc2626] to-[#991b1b] md:hidden"
        />
        {steps.map((step, i) => (
          <li key={step.when} className="relative">
            <span
              aria-hidden
              // Warm ramp, see STEP_TONES. A step beyond the fourth falls back to
              // the last tone rather than to an undefined class, so adding a
              // fifth penalty degrades to "as bad as the one before" instead of
              // rendering a transparent disc.
              className={`penalty-ladder-step relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white ${
                STEP_TONES[i] ?? STEP_TONES[STEP_TONES.length - 1]
              }`}
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
