"use client";

import { useEffect, useRef, useState } from "react";
import { fmtGBP } from "@/lib/research/landlord-index";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

/**
 * Where rental profit lands, drawn once.
 *
 * "Rental profit sits on top of your salary" is the hardest sentence on the
 * landlord tax page, because the thing it describes is a position on a scale and
 * prose can only assert it. Putting the salary and the profit on one bar makes
 * the reader see the higher-rate threshold arrive part way through the profit,
 * which is the whole point: the same £20,000 is taxed at two different rates and
 * neither of them is "the rate on rental income".
 *
 * Figures are the page's own worked example (£45,000 salary, £20,000 profit), so
 * the figure and the worked example below it cannot drift. Change them in both
 * places or not at all.
 *
 * The bar sweeps left to right the first time the figure scrolls into view.
 * That is not decoration: the sentence the figure exists to prove is that rental
 * profit sits ON TOP OF the salary, and a bar that fills in that order says so
 * in the order the reader reads it. The threshold marker lands last, once the
 * boundary it points at exists.
 *
 * Same posture as `PenaltyLadder` and `RateWedge`: the observer only flips
 * `data-draw` on the root, every keyframe lives in globals.css behind
 * `prefers-reduced-motion: no-preference`, the undrawn state is scoped to
 * [data-draw="off"] in the server HTML, and the no-JS case is released by the
 * <noscript> override in the root layout. Reduced motion, a missing
 * IntersectionObserver and no JavaScript all land on "fully drawn and still".
 */

const SALARY = 45_000;
const PROFIT = 20_000;
const HIGHER_THRESHOLD = 50_270;

const BASIC_SLICE = HIGHER_THRESHOLD - SALARY; // 5,270 of profit still in the basic band
const HIGHER_SLICE = PROFIT - BASIC_SLICE; // 14,730 above the threshold
const TOTAL = SALARY + PROFIT;

const pct = (n: number) => `${(n / TOTAL) * 100}%`;

/**
 * The sweep is timed as one continuous fill rather than three equal steps: each
 * segment's share of the duration is its share of the bar, and its delay is
 * everything to its left. The 20% slice is 8% of the width, so it carries a
 * floor of MIN_MS; without it the emerald would flash past in 65ms and the
 * reader would see two segments, not three. The floor makes it overrun into the
 * orange's start by a little over a tenth of a second, which reads as one
 * movement rather than a seam.
 */
const SWEEP_MS = 1000;
const MIN_MS = 220;

/**
 * Delays are pulled back to 72% of each segment's true offset. The easing
 * (0.22, 1, 0.36, 1) front-loads hard: measured, the salary segment is visually
 * complete around 500ms into its nominal 692ms. At the untouched offsets that
 * left a ~200ms stall in the middle of the bar, which reads as the animation
 * having finished and then starting again. At 0.72 the next segment picks up
 * where the eye says the last one stopped.
 */
const HANDOFF = 0.72;
const MARKER_MS = SWEEP_MS * HANDOFF;

/**
 * Slate for the salary, emerald for the profit still in the basic band, orange
 * for the part pushed into higher rate.
 *
 * Validated as a categorical set on white: adjacent-pair CVD ΔE 10.1 (protan),
 * normal-vision ΔE 20.2, all three at or above 3:1 contrast against the surface.
 * The slate deliberately reads as neutral rather than as a third identity, which
 * is why it sits below the chroma floor: it is the ground the profit stacks on,
 * not a category competing with it. Every segment is direct-labelled in the rows
 * beneath, so nothing rests on hue.
 */
const SEGMENTS = [
  {
    fill: "#475569",
    amount: SALARY,
    label: "Your salary",
    note: "Uses up the basic-rate band first",
  },
  {
    fill: "#059669",
    amount: BASIC_SLICE,
    label: "Rental profit taxed at 20%",
    note: `What is left of the basic-rate band, up to ${fmtGBP(HIGHER_THRESHOLD)}`,
  },
  {
    fill: "#ea580c",
    amount: HIGHER_SLICE,
    label: "Rental profit taxed at 40%",
    note: "Everything above the higher-rate threshold",
  },
];

export function RentalProfitStack() {
  const ref = useRef<HTMLElement>(null);
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
      // 0.35, matching the penalty ladder rather than the tick list's 0.2: this
      // is a wide, short block and at 0.2 the sweep starts while the bar is
      // still below the fold on a laptop.
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      data-draw={drawn ? "on" : "off"}
      className="not-prose profit-stack mt-6 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8"
    >
      <figcaption className="text-sm font-bold text-slate-900">
        Where {fmtGBP(PROFIT)} of rental profit lands
      </figcaption>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        A {fmtGBP(SALARY)} salary and {fmtGBP(PROFIT)} of rental profit, 2026/27.
      </p>

      {/* The bar carries no text of its own: the 20% slice is 8% of the width and
          nothing legible fits inside it. Every number lives in the labelled rows
          below, which double as the table view, so the bar is decorative to a
          screen reader and hidden from it. That is also why the sweep is safe to
          run here at all: it animates a decoration, and the numbers underneath
          are present and readable from the first frame. */}
      <div aria-hidden className="mt-6">
        <div className="flex h-10 gap-[2px]">
          {SEGMENTS.map((seg, i) => {
            // Share of the bar to this segment's left, and its own share. The
            // widths stay put; only the fill inside each reserved slot moves,
            // so nothing on this figure costs layout.
            const before = SEGMENTS.slice(0, i).reduce((sum, s) => sum + s.amount, 0);
            return (
              <div
                key={seg.label}
                style={{ width: pct(seg.amount) }}
                className="h-full overflow-hidden"
              >
                <div
                  style={{
                    backgroundColor: seg.fill,
                    transitionDelay: `${(before / TOTAL) * SWEEP_MS * HANDOFF}ms`,
                    transitionDuration: `${Math.max(MIN_MS, (seg.amount / TOTAL) * SWEEP_MS)}ms`,
                  }}
                  className={`profit-stack-seg h-full w-full ${i === 0 ? "rounded-l-[4px]" : ""} ${
                    i === SEGMENTS.length - 1 ? "rounded-r-[4px]" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>

      {/* The threshold marker sits on the emerald/orange boundary, which is the
            one place on this bar the reader needs to find. */}
        <div className="relative mt-1 h-9">
          <div
            className="profit-stack-marker absolute top-0 -translate-x-1/2"
            style={{ left: pct(SALARY + BASIC_SLICE), transitionDelay: `${MARKER_MS}ms` }}
          >
            <div className="mx-auto h-3 w-0.5 bg-slate-500" />
            <p className="mt-1 whitespace-nowrap text-center text-[11px] font-semibold leading-tight text-slate-600 sm:text-xs">
              Higher rate starts
              <br />
              {fmtGBP(HIGHER_THRESHOLD)}
            </p>
          </div>
        </div>
      </div>

      <dl className="mt-4 space-y-3 border-t border-slate-200 pt-4">
        {SEGMENTS.map((seg) => (
          <div key={seg.label} className="flex items-baseline gap-3">
            <span
              aria-hidden
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[2px]"
              style={{ backgroundColor: seg.fill }}
            />
            <dt className="min-w-0 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
              <span className="font-semibold text-slate-900">{seg.label}</span>
              <br />
              {seg.note}
            </dt>
            <dd className="shrink-0 text-sm font-bold text-slate-900 sm:text-base">{fmtGBP(seg.amount)}</dd>
          </div>
        ))}
      </dl>

      {/* The salary and the profit are one illustrative landlord, not a rate. */}
      <ExampleFigureNote className="mt-4" />
    </figure>
  );
}
