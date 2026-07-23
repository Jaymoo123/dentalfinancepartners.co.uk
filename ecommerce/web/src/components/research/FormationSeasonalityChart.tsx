/**
 * Dependency-free inline SVG bar chart: average SIC 47910 incorporations by
 * calendar month. No chart library in ecommerce/web/package.json, so this is
 * plain server-rendered SVG (no client JS, no new dependency).
 */
import type { SeasonalityPoint } from "@/lib/research/formation-seasonality";

const AMBER = "#c9861b";
const NAVY = "#1a3a5c";
const GRID = "#e5e5e5";

const W = 640;
const H = 260;
const PAD = { top: 16, right: 16, bottom: 28, left: 48 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export function FormationSeasonalityChart({ points }: { points: SeasonalityPoint[] }) {
  const max = Math.max(...points.map((p) => p.avg47910), 1);
  const min = 0;
  const slot = PLOT_W / points.length;
  const barW = Math.min(48, slot * 0.62);

  const peakIdx = points.reduce((best, p, i) => (p.avg47910 > points[best].avg47910 ? i : best), 0);
  const troughIdx = points.reduce((best, p, i) => (p.avg47910 < points[best].avg47910 ? i : best), 0);

  const yFor = (v: number) => PAD.top + PLOT_H * (1 - (v - min) / (max - min));

  const gridSteps = 4;
  const gridLines = Array.from({ length: gridSteps + 1 }, (_, i) => {
    const v = (max / gridSteps) * i;
    return { v, y: yFor(v) };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Average SIC 47910 incorporations by calendar month">
      {gridLines.map(({ v, y }) => (
        <g key={v}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
          <text x={PAD.left - 6} y={y + 3} fontSize={10} fill="#737373" textAnchor="end">
            {Math.round(v).toLocaleString("en-GB")}
          </text>
        </g>
      ))}
      {points.map((p, i) => {
        const x = PAD.left + slot * i + (slot - barW) / 2;
        const yTop = yFor(p.avg47910);
        const isPeak = i === peakIdx;
        const isTrough = i === troughIdx;
        return (
          <g key={p.monthIndex}>
            <rect
              x={x}
              y={yTop}
              width={barW}
              height={PAD.top + PLOT_H - yTop}
              fill={isPeak ? AMBER : isTrough ? NAVY : NAVY}
              fillOpacity={isPeak ? 1 : isTrough ? 0.55 : 0.35}
              rx={3}
            />
            <text x={x + barW / 2} y={H - 8} fontSize={11} fill="#525252" textAnchor="middle">
              {p.label}
            </text>
          </g>
        );
      })}
      <g transform={`translate(${PAD.left}, 4)`}>
        <rect x={0} y={-8} width={10} height={10} fill={AMBER} rx={2} />
        <text x={14} y={0} fontSize={11} fill="#171717">Highest month</text>
        <rect x={110} y={-8} width={10} height={10} fill={NAVY} fillOpacity={0.55} rx={2} />
        <text x={124} y={0} fontSize={11} fill="#171717">Lowest month</text>
      </g>
    </svg>
  );
}
