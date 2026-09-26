/**
 * Dependency-free inline SVG charts for the Online Seller Survival Index page.
 *
 * The site has no chart library (no recharts in ecommerce/web/package.json,
 * unlike some sibling sites), so these are plain server-rendered SVG: no client
 * JS, no new dependency. Two charts:
 *   1. Survival curve for the latest full 5-year cohort: Retail vs all
 *      industries, year 1 through year 5.
 *   2. 1-year survival rate by birth-year cohort, Retail only (trend).
 *
 * COLOUR HERE IS DATA ENCODING, NOT DECORATION. Read this before "fixing" it.
 *
 * AMBER is the brand hex #c9861b. Every use of it below is a FILL (line stroke,
 * point, bar), which is a graphic at the 3.0 floor, not text: 3.04 on white.
 * It is not the text-contrast defect that commit 3f23c7e7 fixed site-wide, and
 * swapping it for the primary-700 text step would change which series the
 * reader thinks they are looking at. Leave it.
 *
 * Series separation does NOT rest on colour alone: Retail is a solid 2.5px line
 * with r=4 points, all-industries is a 40%-opacity dashed line with r=3 points,
 * plus an on-chart legend. Colour-only separation would be thin (amber #c9861b
 * against the composited navy-at-40% #a3b0be is 1.38), which is exactly why the
 * dash pattern and the point radii carry the encoding too.
 *
 * All chart TEXT is neutral and measured on the white card these charts sit in
 * (page.tsx renders both inside `bg-white border border-neutral-200`):
 * axis tick labels #737373 = 4.74, x-axis category labels #525252 = 7.81,
 * legend and bar data labels #171717 = 17.93. All clear the 4.5 text floor.
 * GRID #e5e5e5 is 1.26 on white and is deliberately below the graphic floor:
 * gridlines are not essential information, the y-axis labels and the bar data
 * labels carry the values, and darkening them would compete with the series.
 */
import type { SurvivalCohortRow } from "@/lib/research/survival-index";

const NAVY = "#1a3a5c";
const AMBER = "#c9861b";
const GRID = "#e5e5e5";

const W = 640;
const H = 280;
const PAD = { top: 16, right: 16, bottom: 28, left: 40 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function yFromPct(pct: number, min: number, max: number): number {
  const clamped = Math.min(max, Math.max(min, pct));
  return PAD.top + PLOT_H * (1 - (clamped - min) / (max - min));
}

function GridLines({ min, max, step }: { min: number; max: number; step: number }) {
  const lines = [];
  for (let v = min; v <= max; v += step) {
    const y = yFromPct(v, min, max);
    lines.push(
      <g key={v}>
        <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
        <text x={PAD.left - 6} y={y + 3} fontSize={10} fill="#737373" textAnchor="end">
          {v}%
        </text>
      </g>,
    );
  }
  return <>{lines}</>;
}

export function SurvivalCurveChart({ cohort }: { cohort: SurvivalCohortRow }) {
  const years = [1, 2, 3, 4, 5] as const;
  const retailPoints = years
    .map((y) => cohort.retail[`y${y}_pct` as const])
    .filter((v): v is number => v !== null);
  const allPoints = years
    .map((y) => cohort.all_industries[`y${y}_pct` as const])
    .filter((v): v is number => v !== null);
  const n = retailPoints.length;
  if (n === 0) return null;

  const stepX = PLOT_W / 4; // fixed 5-point (year 1..5) x-axis regardless of how many resolve
  const xFor = (i: number) => PAD.left + stepX * i;

  const retailPath = retailPoints
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFromPct(v, 0, 100)}`)
    .join(" ");
  const allPath = allPoints
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFromPct(v, 0, 100)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Survival curve: Retail vs all industries">
      <GridLines min={0} max={100} step={20} />
      {years.slice(0, n).map((y, i) => (
        <text key={y} x={xFor(i)} y={H - 8} fontSize={11} fill="#525252" textAnchor="middle">
          Year {y}
        </text>
      ))}
      <path d={allPath} fill="none" stroke={NAVY} strokeOpacity={0.4} strokeWidth={2} strokeDasharray="4 3" />
      {allPoints.map((v, i) => (
        <circle key={`a${i}`} cx={xFor(i)} cy={yFromPct(v, 0, 100)} r={3} fill={NAVY} fillOpacity={0.4} />
      ))}
      <path d={retailPath} fill="none" stroke={AMBER} strokeWidth={2.5} />
      {retailPoints.map((v, i) => (
        <circle key={`r${i}`} cx={xFor(i)} cy={yFromPct(v, 0, 100)} r={4} fill={AMBER} />
      ))}
      <g transform={`translate(${PAD.left}, 4)`}>
        <circle cx={0} cy={0} r={4} fill={AMBER} />
        <text x={8} y={4} fontSize={11} fill="#171717">Retail</text>
        <circle cx={80} cy={0} r={3} fill={NAVY} fillOpacity={0.4} />
        <text x={88} y={4} fontSize={11} fill="#171717">All industries</text>
      </g>
    </svg>
  );
}

export function OneYearTrendChart({ cohorts }: { cohorts: SurvivalCohortRow[] }) {
  const rows = cohorts.filter((c) => c.retail.y1_pct !== null);
  if (rows.length === 0) return null;

  const min = 80;
  const max = 100;
  const barW = Math.min(64, (PLOT_W / rows.length) * 0.6);
  const slot = PLOT_W / rows.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="1-year survival rate by cohort year">
      <GridLines min={min} max={max} step={5} />
      {rows.map((c, i) => {
        const pct = c.retail.y1_pct as number;
        const yTop = yFromPct(pct, min, max);
        const x = PAD.left + slot * i + (slot - barW) / 2;
        return (
          <g key={c.birth_year}>
            <rect x={x} y={yTop} width={barW} height={PAD.top + PLOT_H - yTop} fill={AMBER} rx={3} />
            <text x={x + barW / 2} y={yTop - 6} fontSize={11} fill="#171717" textAnchor="middle" fontWeight={600}>
              {pct.toFixed(1)}%
            </text>
            <text x={x + barW / 2} y={H - 8} fontSize={11} fill="#525252" textAnchor="middle">
              {c.birth_year}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
