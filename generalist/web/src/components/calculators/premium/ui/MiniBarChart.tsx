"use client";

/**
 * CSS/inline-SVG bar chart for the generalist premium calculator fleet.
 *
 * Dependency-free: no recharts, no D3. Renders a simple horizontal bar
 * chart using two-div stacked bars (coloured div + label) so it works
 * inside any flex context without needing a canvas. The bars are scaled
 * proportionally to the largest value.
 *
 * Used by PremiumCalculator to visualise tool results (e.g. net cash vs
 * total tax for the director-pay tool).
 */

import type { ChartSpec } from "@/lib/calculators/premium/types";

function gbpShort(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `£${Math.round(n / 1_000)}k`;
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

export function MiniBarChart({ chart }: { chart: ChartSpec }) {
  if (!chart.bars || chart.bars.length === 0) return null;

  const maxValue = Math.max(...chart.bars.map((b) => b.value), 1);

  return (
    <div className="space-y-2" role="img" aria-label={chart.heading ?? "Chart"}>
      {chart.heading && (
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {chart.heading}
        </p>
      )}
      <div className="space-y-2.5">
        {chart.bars.map((bar, i) => {
          const pct = Math.max(0, Math.min(100, (bar.value / maxValue) * 100));
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-600 min-w-0 truncate">{bar.label}</span>
                <span className="text-xs font-semibold text-slate-800 tabular-nums shrink-0">
                  {gbpShort(bar.value)}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded bg-slate-100">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: bar.colour,
                    minWidth: pct > 0 ? "2px" : undefined,
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
