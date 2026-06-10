"use client";

/**
 * Visual result chart for premium calculators.
 *
 * recharts is heavy and DOM-only, so the actual chart is code-split and loaded
 * client-side via next/dynamic({ ssr: false }). It always renders inside a
 * fixed-height / fixed-aspect container so the space is reserved before the
 * chunk loads → no layout shift (CLS) and no impact on non-premium pages
 * (recharts is never in their bundle).
 *
 * Phase A note: no premium tool config exists yet, so this never renders on the
 * live site. It is the reusable renderer the Phase B/C tools will use.
 */
import dynamic from "next/dynamic";
import type { ChartSpec, ChartResult } from "@/lib/calculators/premium/types";

/** Fixed container height (px). Reserved before the chart chunk loads. */
const CHART_HEIGHT = 300;

const ChartInner = dynamic(() => import("./ResultChartInner").then((m) => m.ResultChartInner), {
  ssr: false,
  loading: () => (
    // Reserve the exact height so swapping in the chart causes zero shift.
    <div
      style={{ height: CHART_HEIGHT }}
      className="flex items-center justify-center text-xs text-slate-400"
      aria-hidden="true"
    >
      Loading chart…
    </div>
  ),
});

export function ResultChart({ spec, result }: { spec: ChartSpec; result: ChartResult }) {
  if (!result.data || result.data.length === 0) {
    return <div style={{ height: CHART_HEIGHT }} aria-hidden="true" />;
  }
  return (
    <div style={{ height: CHART_HEIGHT }} className="w-full">
      <ChartInner spec={spec} result={result} height={CHART_HEIGHT} />
    </div>
  );
}

export { CHART_HEIGHT };
