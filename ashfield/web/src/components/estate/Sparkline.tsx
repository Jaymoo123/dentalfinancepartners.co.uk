import type { SeriesPoint } from "@/lib/estate/snapshot";
import { HAIRLINE_STRONG, INK, NAVY, PAPER } from "./chartTokens";

/**
 * Tiny inline sparkline for /insights asset cards. Ink 1.25px line, terminal
 * navy dot. Empty series -> a hairline placeholder (the card shows the latest
 * value in text; the sparkline stays decorative, aria-hidden).
 */
export function Sparkline({
  series,
  width = 120,
  height = 32,
}: {
  series: SeriesPoint[];
  width?: number;
  height?: number;
}) {
  const pad = 4;
  const n = series.length;

  if (n < 2) {
    // ponytail: no data (or a single point) = flat hairline placeholder
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
        style={{ width: "100%", maxWidth: width, height: "auto", display: "block" }}
      >
        <line
          x1={pad}
          y1={height / 2}
          x2={width - pad}
          y2={height / 2}
          stroke={HAIRLINE_STRONG}
          strokeWidth={1}
        />
        {n === 1 ? (
          <circle
            cx={width - pad}
            cy={height / 2}
            r={3}
            fill={NAVY}
            stroke={PAPER}
            strokeWidth={1.5}
          />
        ) : null}
      </svg>
    );
  }

  const vals = series.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i: number) => pad + (i / (n - 1)) * (width - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / span) * (height - pad * 2);

  const d = series
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(" ");
  const last = series[n - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ width: "100%", maxWidth: width, height: "auto", display: "block" }}
    >
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth={1.25}
        pathLength={1}
        className="chart-draw"
      />
      <circle
        cx={x(n - 1)}
        cy={y(last.value)}
        r={3}
        fill={NAVY}
        stroke={PAPER}
        strokeWidth={1.5}
      />
    </svg>
  );
}
