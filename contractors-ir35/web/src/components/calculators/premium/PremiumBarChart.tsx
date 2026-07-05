"use client";

/**
 * Dependency-free inline SVG bar chart for the contractors-ir35 premium calculator tier.
 *
 * Renders grouped bars from ChartResult.data + ChartSpec.series using only SVG
 * and CSS variable tokens. Fixed height (180px) so there is no CLS.
 * No recharts, no radix, no new npm dependencies.
 *
 * TOKEN DISCIPLINE: cfp does NOT define --gold, --navy or --dark. Tokens used:
 *   - var(--accent): primary brand colour (#0e7490 petrol-cyan)
 *   - Neutral hex #64748b (slate-500) for the secondary series
 *   - var(--border), var(--ink), var(--ink-soft): grid lines and labels
 * Never use var(--gold), var(--navy) or var(--dark) here.
 */
import type { ChartSpec, ChartResult } from "@/lib/calculators/premium/types";

const CHART_HEIGHT = 180;
const CHART_PADDING = { top: 16, right: 8, bottom: 32, left: 8 };
const BAR_GAP = 4;
const GROUP_GAP = 16;

function formatValue(n: number, format: ChartSpec["valueFormat"]): string {
  if (format === "currency") {
    return (
      "£" +
      Math.round(n).toLocaleString("en-GB", { maximumFractionDigits: 0 })
    );
  }
  if (format === "percent") {
    return n.toFixed(1) + "%";
  }
  return n.toLocaleString("en-GB");
}

function shortValue(n: number, format: ChartSpec["valueFormat"]): string {
  if (format === "currency") {
    if (Math.abs(n) >= 1_000_000)
      return "£" + (n / 1_000_000).toFixed(1) + "m";
    if (Math.abs(n) >= 1_000) return "£" + (n / 1_000).toFixed(0) + "k";
    return "£" + Math.round(n).toLocaleString("en-GB");
  }
  return formatValue(n, format);
}

export function PremiumBarChart({
  spec,
  result,
}: {
  spec: ChartSpec;
  result: ChartResult;
}) {
  const { data } = result;
  const series = spec.series;
  const format = spec.valueFormat ?? "currency";

  if (!data || data.length === 0 || series.length === 0) return null;

  const plotW = 500;
  const plotH = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;

  // Find max value for scaling.
  let maxVal = 0;
  for (const datum of data) {
    for (const s of series) {
      const v = Number(datum[s.dataKey] ?? 0);
      if (v > maxVal) maxVal = v;
    }
  }
  if (maxVal === 0) return null;

  const groupCount = data.length;
  const barCount = series.length;
  const totalGroupGap = GROUP_GAP * (groupCount - 1);
  const totalBarGap = BAR_GAP * (barCount - 1) * groupCount;
  const availableBarWidth =
    plotW - totalGroupGap - totalBarGap - CHART_PADDING.left - CHART_PADDING.right;
  const barWidth = Math.max(8, Math.floor(availableBarWidth / (groupCount * barCount)));

  const groupWidth = barCount * barWidth + (barCount - 1) * BAR_GAP;
  const totalContentWidth = groupCount * groupWidth + (groupCount - 1) * GROUP_GAP;
  const leftOffset = (plotW - totalContentWidth) / 2;

  const scale = (v: number) => (v / maxVal) * plotH;

  return (
    <div
      style={{ height: CHART_HEIGHT }}
      aria-hidden="true"
      className="w-full overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${plotW} ${CHART_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Bar chart comparing values across groups"
      >
        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map((frac) => {
          const y = CHART_PADDING.top + plotH - scale(maxVal * frac);
          return (
            <line
              key={frac}
              x1={CHART_PADDING.left}
              y1={y}
              x2={plotW - CHART_PADDING.right}
              y2={y}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Bars and labels */}
        {data.map((datum, gi) => {
          const groupX = leftOffset + gi * (groupWidth + GROUP_GAP);
          const groupLabel = String(datum.name);

          return (
            <g key={gi}>
              {/* Group label */}
              <text
                x={groupX + groupWidth / 2}
                y={CHART_HEIGHT - 4}
                textAnchor="middle"
                fontSize={9}
                fill="var(--ink-soft)"
              >
                {groupLabel.length > 12 ? groupLabel.slice(0, 11) + "…" : groupLabel}
              </text>

              {series.map((s, si) => {
                const val = Number(datum[s.dataKey] ?? 0);
                const barH = scale(val);
                const barX = groupX + si * (barWidth + BAR_GAP);
                const barY = CHART_PADDING.top + plotH - barH;

                return (
                  <g key={s.dataKey}>
                    <rect
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={Math.max(0, barH)}
                      fill={s.color}
                      rx={2}
                      ry={2}
                      opacity={0.9}
                    >
                      <title>
                        {s.label}: {formatValue(val, format)}
                      </title>
                    </rect>
                    {/* Value label on top of bar when bar is tall enough */}
                    {barH > 20 && (
                      <text
                        x={barX + barWidth / 2}
                        y={barY - 3}
                        textAnchor="middle"
                        fontSize={8}
                        fill="var(--ink)"
                        fontWeight={500}
                      >
                        {shortValue(val, format)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Legend */}
        {series.length > 1 && (
          <g transform={`translate(${CHART_PADDING.left}, ${CHART_PADDING.top - 4})`}>
            {series.map((s, i) => (
              <g key={s.dataKey} transform={`translate(${i * 140}, 0)`}>
                <rect x={0} y={-8} width={10} height={10} fill={s.color} rx={1} />
                <text x={14} y={0} fontSize={8} fill="var(--ink-soft)">
                  {s.label}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
