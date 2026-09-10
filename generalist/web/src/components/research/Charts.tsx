"use client";

/**
 * Dependency-free charts for the Holloway Davies research pages.
 *
 * The site has no recharts/D3 dependency (see MiniBarChart in the
 * calculators fleet for the established precedent), so these charts are
 * plain CSS/inline-SVG: no new dependency for four research pages.
 *
 * ACCESSIBILITY (design port): every value renders as TEXT and the bars are
 * `aria-hidden` decoration. Before, each chart was one `role="img"` node with a
 * generic label ("Bar chart"), which collapses the whole subtree into a single
 * unlabelled image, and the numbers existed only in `title=` attributes, which
 * touch devices never surface and crawlers do not read. On a research page
 * whose entire value is citable numbers, that made the numbers unreachable.
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
    <div>
      {seriesLabels && (
        <div className="mb-3 flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-primary-600" />
            {seriesLabels[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-slate-300" />
            {seriesLabels[1]}
          </span>
        </div>
      )}
      <div className="flex items-end gap-2 overflow-x-auto pb-1" style={{ minHeight: 200 }}>
        {data.map((d) => (
          <div key={d.label} className="flex min-w-[44px] flex-1 flex-col items-center gap-1.5">
            {/* Values first in the DOM, so a screen reader hears the number
                before the decorative bars it labels. */}
            <div className="flex flex-col items-center gap-0.5 text-[10px] leading-tight tabular-nums">
              <span className="whitespace-nowrap font-semibold text-slate-900">
                {seriesLabels && <span className="sr-only">{seriesLabels[0]}: </span>}
                {formatValue(d.value)}
              </span>
              {d.secondaryValue !== undefined && (
                <span className="whitespace-nowrap text-slate-600">
                  {seriesLabels && <span className="sr-only">{seriesLabels[1]}: </span>}
                  {formatValue(d.secondaryValue)}
                </span>
              )}
            </div>
            <div aria-hidden className="flex h-[180px] w-full items-end justify-center gap-0.5">
              <div
                className="w-full rounded-t bg-primary-600"
                style={{ height: `${Math.max(2, (d.value / max) * 180)}px` }}
              />
              {d.secondaryValue !== undefined && (
                <div
                  className="w-full rounded-t bg-slate-300"
                  style={{ height: `${Math.max(2, (d.secondaryValue / max) * 180)}px` }}
                />
              )}
            </div>
            <span className="whitespace-nowrap text-[10px] text-slate-600">{d.label}</span>
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
    <div className="space-y-2.5">
      {data.map((d) => {
        const pct = Math.max(0, Math.min(100, (d.value / max) * 100));
        return (
          <div key={d.label} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-xs text-slate-700">{d.label}</span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-900">
                {formatValue(d.value)}
              </span>
            </div>
            <div aria-hidden className="h-4 w-full overflow-hidden rounded bg-slate-100">
              <div
                className="h-full rounded bg-primary-600"
                style={{ width: `${pct}%`, minWidth: pct > 0 ? "2px" : undefined }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
