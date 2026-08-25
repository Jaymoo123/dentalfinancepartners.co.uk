"use client";

import { useEffect, useRef, useState } from "react";

export type StatItem = {
  /** Final numeric value to count up to (e.g. 100, 24, 2.4). */
  target: number;
  /** Decimal places to show while counting (e.g. 1 for 2.4). */
  decimals?: number;
  /** Rendered before the number (e.g. "£"). */
  prefix?: string;
  /** Rendered after the number (e.g. "+", "hr", "M+", "%"). */
  suffix?: string;
  label: string;
};

const DURATION_MS = 1100;
/** Counting starts from 60% of the target. */
const START_FRACTION = 0.6;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatValue({ stat, play }: { stat: StatItem; play: boolean }) {
  const { target, decimals = 0 } = stat;
  const [display, setDisplay] = useState(target * START_FRACTION);

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

  return (
    <span>
      {stat.prefix}
      {display.toFixed(decimals)}
      {stat.suffix}
    </span>
  );
}

export function StatsCounter({ stats }: { stats: StatItem[] }) {
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

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-mono tabular-nums">
            <StatValue stat={stat} play={play} />
          </div>
          <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
