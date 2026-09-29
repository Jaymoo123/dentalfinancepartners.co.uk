"use client";

import { useEffect, useRef, useState } from "react";
import { focusRing } from "../layout-utils";

export type StatItem = {
  /** Final numeric value to count up to (e.g. 100, 24, 2.4). */
  target: number;
  /**
   * Literal text shown instead of the count-up when the figure is not a
   * number a counter can reach (a date, a range, a threshold pair). When
   * set, `target` is ignored. Without it a tile such as "28 February"
   * rendered as "0".
   */
  value?: string;
  /** Decimal places to show while counting (e.g. 1 for 2.4). */
  decimals?: number;
  /** Rendered before the number (e.g. "£"). */
  prefix?: string;
  /** Rendered after the number (e.g. "+", "hr", "M+", "%"). */
  suffix?: string;
  label: string;
  /** Optional source link wrapped around the figure (a gov.uk citation, say).
   *  Unset = the plain figure every existing caller renders (2026-09-29). */
  href?: string;
};

const DURATION_MS = 1100;
/** Counting starts from 60% of the target. */
const START_FRACTION = 0.6;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatValue({ stat, play }: { stat: StatItem; play: boolean }) {
  const { target, decimals = 0 } = stat;
  /**
   * Holds the TRUE target until the count-up actually starts. Anything reading
   * the raw HTML (no-JS readers, crawlers, LLM scrapes) must see the real
   * figure: these tiles carry locked tax rates, and shipping "12%" where the
   * answer is 20% is a factual defect, not an animation detail. Dropping to the
   * start frame on mount instead would settle a tile permanently at 60% of the
   * truth whenever the observer never fires (short viewport, tile never fully
   * visible), so the start frame is computed inside the animation itself.
   */
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const from = target * START_FRACTION;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      setDisplay(from + (target - from) * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target]);

  if (stat.value !== undefined) {
    return <span>{stat.value}</span>;
  }
  // Guard, not just a `value` path: a mapper that fails to parse a non-numeric
  // figure into `value` (see generalist/services and Medical's stat mappers)
  // can still hand this component a non-finite target. Rendering "0" there is
  // the exact defect `value` was added to fix; fall back to whatever text the
  // caller did supply (suffix carries the raw string in the known defect
  // shape) instead of a false zero.
  if (!Number.isFinite(target)) {
    return (
      <span>
        {stat.prefix}
        {stat.suffix}
      </span>
    );
  }
  return (
    <span>
      {stat.prefix}
      {display.toFixed(decimals)}
      {stat.suffix}
    </span>
  );
}

export function StatsCounter({
  stats,
  tone = "light",
  columns = 4,
}: {
  stats: StatItem[];
  /**
   * Which ground the strip is painted on. `"light"` is the slate-900 figure
   * and slate-500 label this component has always rendered, so it is the
   * default and every existing caller is byte-identical. `"dark"` is a white
   * figure and a slate-300 label, for a strip inside a navy or brand band
   * where slate-900 on dark is unreadable (2026-09-29).
   *
   * The `href` figure link is unaffected either way: it inherits the figure
   * colour and carries the kit `focusRing`, whose colour a dark section should
   * rebind through `--kit-focus-ring`.
   */
  tone?: "light" | "dark";
  /** Tiles from `md`. Default 4, the fixed `md:grid-cols-4` this component
   *  always rendered, so passing nothing is byte-identical. Mobile stays
   *  `grid-cols-2` at every setting. */
  columns?: 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlay(true);
          io.disconnect();
        }
      },
      // Fire only when the whole strip is visible (0.99 guards against
      // sub-pixel rounding that can stop threshold: 1 from ever firing).
      { threshold: 0.99 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mdCols = columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  const figureTone = tone === "dark" ? "text-white" : "text-slate-900";
  const labelTone = tone === "dark" ? "text-slate-300" : "text-slate-500";

  return (
    <div ref={ref} className={`grid grid-cols-2 gap-6 sm:gap-8 ${mdCols}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${figureTone} font-mono tabular-nums`}>
            {stat.href ? (
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-md ${focusRing}`}
              >
                <StatValue stat={stat} play={play} />
              </a>
            ) : (
              <StatValue stat={stat} play={play} />
            )}
          </div>
          <div className={`mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold ${labelTone} uppercase tracking-wider`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
