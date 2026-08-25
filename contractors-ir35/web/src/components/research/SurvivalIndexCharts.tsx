/**
 * Charts for the UK Contractor Survival Index page.
 *
 * Dependency-free, server-renderable inline SVG charts (no recharts, no
 * client runtime), matching the pattern in ContractorIndexCharts.tsx.
 */
import type { SurvivalCohortRow } from "@/lib/research/contractor-survival-index";

const CYAN = "#0e7490"; // cyan-700, contractor series
const NEUTRAL = "#a3a3a3"; // neutral-400, all-industries comparator
const GRID = "#e5e7eb"; // neutral-200
const AXIS_TEXT = "#737373"; // neutral-500

function niceMax(v: number): number {
  if (v <= 0) return 10;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}

// ---------------------------------------------------------------------------
// Survival curve: contractor SIC groups vs all industries, for one cohort year
// ---------------------------------------------------------------------------

export function SurvivalCurveChart({ cohort }: { cohort: SurvivalCohortRow }) {
  const W = 720;
  const H = 280;
  const padL = 44;
  const padR = 100;
  const padT = 16;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const years = [0, 1, 2, 3, 4, 5] as const;
  const contractorPts = years
    .map((yr) => (yr === 0 ? 100 : cohort.contractor[`y${yr}_pct` as const]))
    .map((v, i) => ({ year: i, value: v }))
    .filter((p): p is { year: number; value: number } => p.value !== null);
  const allIndPts = years
    .map((yr) => (yr === 0 ? 100 : cohort.all_industries[`y${yr}_pct` as const]))
    .map((v, i) => ({ year: i, value: v }))
    .filter((p): p is { year: number; value: number } => p.value !== null);

  const x = (yr: number) => padL + (yr / 5) * plotW;
  const y = (v: number) => padT + plotH - (v / 100) * plotH;

  const path = (pts: { year: number; value: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year).toFixed(1)} ${y(p.value).toFixed(1)}`).join(" ");

  const yTicks = [0, 20, 40, 60, 80, 100];

  const lastContractor = contractorPts.at(-1);
  const lastAllInd = allIndPts.at(-1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Survival curve: contractor SIC groups vs all industries"
      className="h-[280px] w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {yTicks.map((t, i) => {
        const yy = y(t);
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={yy + 3} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {t}%
            </text>
          </g>
        );
      })}
      {[0, 1, 2, 3, 4, 5].map((yr) => (
        <text key={yr} x={x(yr)} y={H - padB + 16} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
          {yr === 0 ? "Birth" : `Yr ${yr}`}
        </text>
      ))}

      <path d={path(allIndPts)} fill="none" stroke={NEUTRAL} strokeWidth={2} strokeDasharray="4 3" />
      {allIndPts.map((p) => (
        <circle key={`ai-${p.year}`} cx={x(p.year)} cy={y(p.value)} r={3} fill={NEUTRAL} />
      ))}

      <path d={path(contractorPts)} fill="none" stroke={CYAN} strokeWidth={2.5} />
      {contractorPts.map((p) => (
        <circle key={`c-${p.year}`} cx={x(p.year)} cy={y(p.value)} r={4} fill={CYAN}>
          <title>{`Year ${p.year}: ${p.value.toFixed(1)}% still active`}</title>
        </circle>
      ))}

      {lastContractor && (
        <text x={x(lastContractor.year) + 8} y={y(lastContractor.value) + 4} fontSize={11} fontWeight={600} fill={CYAN}>
          Contractor SIC groups
        </text>
      )}
      {lastAllInd && (
        <text x={x(lastAllInd.year) + 8} y={y(lastAllInd.value) + 4} fontSize={11} fill={NEUTRAL}>
          All industries
        </text>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 1-year survival rate by birth-year cohort (the only year available for
// every cohort in the series), contractor SIC groups only.
// ---------------------------------------------------------------------------

export function OneYearTrendChart({ cohorts }: { cohorts: SurvivalCohortRow[] }) {
  const W = 640;
  const H = 240;
  const padL = 48;
  const padR = 12;
  const padT = 12;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const data = cohorts
    .filter((c) => c.contractor.y1_pct !== null)
    .map((c) => ({ year: String(c.birth_year), value: c.contractor.y1_pct as number }));

  const minV = 80;
  const maxV = niceMax(Math.max(100, ...data.map((d) => d.value)));
  const n = data.length;
  const slot = plotW / Math.max(1, n);
  const barW = slot * 0.5;

  const y = (v: number) => padT + plotH - ((v - minV) / (maxV - minV)) * plotH;

  const yTicks = [80, 85, 90, 95, 100];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="1-year survival rate by birth-year cohort, contractor SIC groups"
      className="h-[240px] w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {yTicks.map((t, i) => {
        const yy = y(t);
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={yy + 3} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {t}%
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const barY = y(d.value);
        const baseY = padT + plotH;
        const x = padL + i * slot + (slot - barW) / 2;
        return (
          <g key={d.year}>
            <rect x={x} y={barY} width={barW} height={Math.max(0, baseY - barY)} rx={3} fill={CYAN}>
              <title>{`${d.year} cohort: ${d.value.toFixed(1)}% survived 1 year`}</title>
            </rect>
            <text x={x + barW / 2} y={H - padB + 16} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
              {d.year}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
