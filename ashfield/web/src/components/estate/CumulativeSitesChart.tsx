import type { ReactNode } from "react";
import { fmtNum } from "@/lib/estate/snapshot";
import { ChartFigure, VisuallyHiddenTable } from "./FigureCaption";
import {
  HAIRLINE,
  HAIRLINE_STRONG,
  INK,
  INK_45,
  NAVY,
  NAVY_08,
  PAPER,
} from "./chartTokens";

export type CumulativePoint = { label: string; cum: number };

/**
 * Step chart of estate build-out. Square corners, navy-08 step fills with a
 * hairline top edge; the current (final) step is the navy highlight per §6.
 */
export function CumulativeSitesChart({
  points,
  ariaLabel,
  fig,
  caption,
  source,
}: {
  points: CumulativePoint[];
  ariaLabel: string;
  fig?: number;
  caption?: ReactNode;
  source?: string;
}) {
  const W = 840;
  const H = 360;
  const padL = 36;
  const padR = 20;
  const padT = 24;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const n = points.length;
  const maxV = Math.max(1, ...points.map((p) => p.cum));
  const slot = plotW / Math.max(1, n);
  const y = (v: number) => padT + plotH - (v / maxV) * plotH;

  const yTicks = Math.min(4, maxV);
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);
  const labelEvery = Math.max(1, Math.ceil(n / 8));

  // Step outline path across the top of the steps.
  const stepPath = points
    .map((p, i) => {
      const x0 = padL + i * slot;
      const yy = y(p.cum);
      return `${i === 0 ? `M ${x0.toFixed(1)} ${yy.toFixed(1)}` : `L ${x0.toFixed(1)} ${yy.toFixed(1)}`} L ${(x0 + slot).toFixed(1)} ${yy.toFixed(1)}`;
    })
    .join(" ");

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
              x2={W - padR}
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

        {/* Square-cornered step fills; final step = navy highlight */}
        {points.map((p, i) => {
          const x0 = padL + i * slot;
          const yy = y(p.cum);
          const isLast = i === n - 1;
          return (
            <rect
              key={p.label}
              x={x0}
              y={yy}
              width={slot}
              height={Math.max(0, padT + plotH - yy)}
              fill={isLast ? NAVY : NAVY_08}
              stroke={isLast ? "none" : PAPER}
              strokeWidth={isLast ? 0 : 1}
            />
          );
        })}

        {/* Hairline-strong step outline along the top edge */}
        <path
          d={stepPath}
          fill="none"
          stroke={INK}
          strokeWidth={1.5}
          pathLength={1}
          className="chart-draw"
        />

        {/* X labels */}
        {points.map((p, i) =>
          i % labelEvery === 0 || i === n - 1 ? (
            <text
              key={`l-${p.label}`}
              x={padL + i * slot + slot / 2}
              y={H - padB + 18}
              textAnchor="middle"
              fontSize={11}
              fill={INK_45}
              style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
            >
              {p.label}
            </text>
          ) : null
        )}
      </svg>
      <VisuallyHiddenTable
        caption={ariaLabel}
        headers={["Period", "Cumulative sites"]}
        rows={points.map((p) => [p.label, fmtNum(p.cum)])}
      />
    </ChartFigure>
  );
}
