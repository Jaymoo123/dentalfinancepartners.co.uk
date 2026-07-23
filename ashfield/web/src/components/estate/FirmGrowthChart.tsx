import type { ReactNode } from "react";
import type { SeriesPoint } from "@/lib/estate/snapshot";
import { fmtNum } from "@/lib/estate/snapshot";
import { ChartFigure, VisuallyHiddenTable } from "./FigureCaption";
import {
  HAIRLINE,
  HAIRLINE_STRONG,
  INK,
  INK_45,
  NAVY,
  PAPER,
  niceMax,
} from "./chartTokens";

export type GrowthScenario = { label: string; series: SeriesPoint[] };

// §6 palette: primary ink, comparison navy, tertiary ink-45 dashed 4 4. Max 3.
const SERIES_STYLE = [
  { stroke: INK, dash: undefined },
  { stroke: NAVY, dash: undefined },
  { stroke: INK_45, dash: "4 4" },
] as const;

/**
 * Illustrative firm-growth model chart: up to 3 scenario lines with direct
 * end labels (no legend box needed at <=3). Indicative disclaimer belongs in
 * the surrounding copy / caption, not here.
 */
export function FirmGrowthChart({
  scenarios,
  ariaLabel,
  fig,
  caption,
  source,
}: {
  scenarios: GrowthScenario[];
  ariaLabel: string;
  fig?: number;
  caption?: ReactNode;
  source?: string;
}) {
  const shown = scenarios.slice(0, 3);
  const W = 840;
  const H = 360;
  const padL = 44;
  const padR = 120; // room for direct end labels
  const padT = 24;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const n = Math.max(...shown.map((s) => s.series.length), 1);
  const maxV = niceMax(
    Math.max(1, ...shown.flatMap((s) => s.series.map((p) => p.value)))
  );
  const x = (i: number) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v: number) => padT + plotH - (v / maxV) * plotH;

  const periods = shown[0]?.series.map((p) => p.period) ?? [];
  const labelEvery = Math.max(1, Math.ceil(n / 8));
  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);

  return (
    <ChartFigure fig={fig} caption={caption} source={source}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", minHeight: 220, display: "block" }}
      >
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={padL}
              y1={y(t)}
              x2={W - padR + 8}
              y2={y(t)}
              stroke={t === 0 ? HAIRLINE_STRONG : HAIRLINE}
              strokeWidth={1}
            />
            {t > 0 ? (
              <text
                x={padL}
                y={y(t) - 5}
                fontSize={11}
                fill={INK_45}
                style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
              >
                {fmtNum(t)}
              </text>
            ) : null}
          </g>
        ))}

        {shown.map((s, si) => {
          const style = SERIES_STYLE[si];
          const d = s.series
            .map(
              (p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`
            )
            .join(" ");
          const last = s.series[s.series.length - 1];
          if (!last) return null;
          return (
            <g key={s.label}>
              <path
                d={d}
                fill="none"
                stroke={style.stroke}
                strokeWidth={1.5}
                strokeDasharray={style.dash}
                pathLength={1}
                className="chart-draw"
              />
              <circle
                cx={x(s.series.length - 1)}
                cy={y(last.value)}
                r={4}
                fill={si === 1 ? NAVY : style.stroke}
                stroke={PAPER}
                strokeWidth={2}
              />
              {/* Direct end label: identity never colour-alone */}
              <text
                x={x(s.series.length - 1) + 10}
                y={y(last.value) + 4}
                fontSize={11}
                fill={INK_45}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {periods.map((p, i) =>
          i % labelEvery === 0 || i === n - 1 ? (
            <text
              key={p}
              x={x(i)}
              y={H - padB + 18}
              textAnchor="middle"
              fontSize={11}
              fill={INK_45}
              style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
            >
              {p}
            </text>
          ) : null
        )}
      </svg>
      <VisuallyHiddenTable
        caption={ariaLabel}
        headers={["Period", ...shown.map((s) => s.label)]}
        rows={periods.map((p, i) => [
          p,
          ...shown.map((s) => (s.series[i] ? fmtNum(s.series[i].value) : "")),
        ])}
      />
    </ChartFigure>
  );
}
