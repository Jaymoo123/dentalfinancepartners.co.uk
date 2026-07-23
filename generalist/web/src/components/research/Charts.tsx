"use client";

/**
 * Dependency-free charts for the Holloway Davies research pages.
 *
 * The site has no recharts/D3 dependency (see MiniBarChart in the
 * calculators fleet for the established precedent), so these charts are
 * plain CSS/inline-SVG: no new dependency for four research pages.
 */

export type BarPoint = { label: string; value: number; secondaryValue?: number };

/**
 * Value display format for chart tooltips/labels. A string enum rather than a
 * formatter function, because these charts are Client Components and a
 * function prop cannot cross the Server -> Client boundary from the page.
 */
export type ChartValueFormat = "number" | "percent" | "days";

function formatChartValue(n: number, format: ChartValueFormat): string {
  if (format === "percent") return `${n.toFixed(1)}%`;
  if (format === "days") return `${n.toFixed(1)} days`;
  return n.toLocaleString("en-GB");
}

/**
 * Vertical column chart. One or two series (secondaryValue renders a second,
 * lighter column alongside the first) per category. Good for year-on-year
 * and month-on-month series with a modest number of points.
 */
export function VerticalBarChart({
  data,
  format = "number",
  seriesLabels,
}: {
  data: BarPoint[];
  format?: ChartValueFormat;
  seriesLabels?: [string, string];
}) {
  const formatValue = (n: number) => formatChartValue(n, format);
  const max = Math.max(...data.flatMap((d) => [d.value, d.secondaryValue ?? 0]), 1);

  return (
    <div role="img" aria-label="Bar chart">
      {seriesLabels && (
        <div className="mb-3 flex items-center gap-4 text-xs text-neutral-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-orange-500" />
            {seriesLabels[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-neutral-300" />
            {seriesLabels[1]}
          </span>
        </div>
      )}
      <div className="flex items-end gap-2 overflow-x-auto pb-1" style={{ minHeight: 200 }}>
        {data.map((d) => (
          <div key={d.label} className="flex min-w-[36px] flex-1 flex-col items-center gap-1.5">
            <div className="flex h-[180px] w-full items-end justify-center gap-0.5">
              <div
                className="w-full rounded-t bg-orange-500"
                style={{ height: `${Math.max(2, (d.value / max) * 180)}px` }}
                title={formatValue(d.value)}
              />
              {d.secondaryValue !== undefined && (
                <div
                  className="w-full rounded-t bg-neutral-300"
                  style={{ height: `${Math.max(2, (d.secondaryValue / max) * 180)}px` }}
                  title={formatValue(d.secondaryValue)}
                />
              )}
            </div>
            <span className="whitespace-nowrap text-[10px] text-neutral-500">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Horizontal bar chart, ranked. Good for many categories with long labels
 * (sector league tables, regional rankings).
 */
export function HorizontalBarChart({
  data,
  format = "number",
}: {
  data: BarPoint[];
  format?: ChartValueFormat;
}) {
  const formatValue = (n: number) => formatChartValue(n, format);
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-2.5" role="img" aria-label="Ranked bar chart">
      {data.map((d) => {
        const pct = Math.max(0, Math.min(100, (d.value / max) * 100));
        return (
          <div key={d.label} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-xs text-neutral-700">{d.label}</span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-neutral-900">
                {formatValue(d.value)}
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded bg-neutral-100">
              <div
                className="h-full rounded bg-orange-500"
                style={{ width: `${pct}%`, minWidth: pct > 0 ? "2px" : undefined }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
