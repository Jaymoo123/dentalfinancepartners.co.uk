/**
 * The Section 24 wedge, for the April 2027 section.
 *
 * The section's argument is counterintuitive and prose can only assert it: the
 * reducer rises from 20% to 22%, which reads like relief, but property income
 * moves to its own 22/42/47 rates at the same moment, so the distance between
 * the rate you pay and the relief you get is unchanged. Two tracks drawn to the
 * same scale show the whole thing move right while the gap stays the same
 * width, which is the one claim the reader has to believe.
 *
 * Figures are the higher-rate case the section's copy uses. The additional-rate
 * case is a 25 point gap on the same logic and is left to the prose: a third
 * track would say the same thing twice.
 *
 * Palette: #059669 (relief) and #ea580c (tax paid), the pair already validated
 * and shipped in `RentalProfitStack`. Re-run before changing either:
 *
 *   node scripts/validate_palette.js "#059669,#ea580c" --mode light
 *
 * Passes all six checks (chroma, lightness, CVD separation dE 10.1 protan,
 * normal-vision dE 28.8, 3:1 contrast). Emerald and rose FAILS CVD separation
 * at dE 5.8 deutan, so do not "fix" this to red and green.
 *
 * Every figure is direct-labelled in the row beneath its track, so nothing
 * rests on hue and the labels are the table view. The tracks are `aria-hidden`
 * for that reason, which is also why the fill animation costs nothing in
 * meaning: the numbers are already readable before a pixel moves.
 *
 * The bars fill left to right the first time the figure is 90% on screen. Same
 * posture as `PenaltyLadder` and `DrawnTickList`: the observer only flips
 * `data-draw` on the figure and the keyframes live in globals.css behind
 * `prefers-reduced-motion: no-preference`. Reduced motion, a missing
 * IntersectionObserver and the no-JS case all land on "fully drawn and still".
 *
 * Both rows fill together rather than in sequence. The claim is that the two
 * gaps are the same width, and a reader can only see that if the two bars
 * arrive at the same moment.
 */
"use client";

import { useEffect, useRef, useState } from "react";

import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/** Percentage points spanned by the full track width. */
const SCALE = 50;

type Year = { year: string; note: string; relief: number; rate: number };

const YEARS: Year[] = [
  { year: "2026/27", note: "Higher-rate landlord, today", relief: 20, rate: 40 },
  { year: "2027/28", note: "New property rates, from 6 April 2027", relief: 22, rate: 42 },
];

export function RateWedge() {
  const ref = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    // 0.9, by request. A figure this short clears it comfortably on a laptop;
    // on a viewport shorter than the figure a threshold of 0.9 could never
    // fire, so fall back to the highest ratio that is actually reachable.
    const reachable = Math.min(0.9, (window.innerHeight / el.offsetHeight) * 0.9);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        }
      },
      { threshold: Math.max(0.25, reachable) },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      data-draw={drawn ? "on" : "off"}
      className="rate-wedge mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:mt-10 sm:p-8"
    >
      <figcaption className="text-base font-bold text-slate-900 sm:text-lg">
        Both rates rise by 2 points, so the gap does not move
      </figcaption>

      <div className="mt-6 space-y-7 sm:space-y-8">
        {YEARS.map(({ year, note, relief, rate }) => (
          <div key={year}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-bold text-slate-900 sm:text-base">{year}</p>
              <p className="text-xs text-slate-500 sm:text-sm">{note}</p>
            </div>

            {/* Decorative: every number below is in the labels. */}
            <div aria-hidden className="relative mt-3 h-3 w-full rounded-full bg-slate-100">
              <div
                className="rate-wedge-fill absolute inset-y-0 left-0 rounded-l-full bg-[#059669]"
                style={{ width: `${(relief / SCALE) * 100}%` }}
              />
              {/* 2px surface gap between the two fills, per the mark spec. */}
              <div
                className="rate-wedge-fill absolute inset-y-0 rounded-r-full bg-[#ea580c]"
                style={{
                  left: `calc(${(relief / SCALE) * 100}% + 2px)`,
                  width: `calc(${((rate - relief) / SCALE) * 100}% - 2px)`,
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-sm bg-[#059669]" />
                <span className="text-slate-700">
                  Relief at <strong className="font-bold text-slate-900">{relief}%</strong>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-sm bg-[#ea580c]" />
                <span className="text-slate-700">
                  Tax at <strong className="font-bold text-slate-900">{rate}%</strong>
                </span>
              </span>
              <span className="font-bold text-slate-900">{rate - relief} point gap</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-600">
        On a £20,000 interest bill the higher reducer is worth £400. A higher-rate landlord also pays 2% more on
        every pound of restricted property profit, so unless your profit before finance costs is smaller than your
        interest bill, April 2027 costs you money.
      </p>
      <ExampleFigureNote className="mt-4" />
    </figure>
  );
}
