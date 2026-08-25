/**
 * Charts for the UK Contractor Insolvency Index page.
 *
 * Dependency-free, server-renderable inline SVG charts (no recharts, no
 * client runtime), matching the pattern in ContractorIndexCharts.tsx.
 */
import { monthLabel, monthLabelShort } from "@/lib/research/contractor-insolvency-index";
import type {
  InsolvencyMonth,
  InsolvencyYear,
  SectionYear,
  CapturedYear,
} from "@/lib/research/contractor-insolvency-index";

const CYAN = "#0e7490"; // cyan-700
const CYAN_LIGHT = "#67e8f9"; // cyan-300
const AMBER = "#b45309"; // amber-700
const NEUTRAL = "#a3a3a3"; // neutral-400
const GRID = "#e5e7eb"; // neutral-200
const AXIS_TEXT = "#737373"; // neutral-500

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}

// ---------------------------------------------------------------------------
// Annual totals bar chart: Section J+M combined insolvencies by year
// ---------------------------------------------------------------------------

export function AnnualInsolvencyChart({ annual }: { annual: InsolvencyYear[] }) {
  const W = 720;
  const H = 280;
  const padL = 52;
  const padR = 12;
  const padT = 12;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const data = annual.filter((r) => r.year < 2026).map((r) => ({ year: String(r.year), value: r.total }));
  const maxV = niceMax(Math.max(1, ...data.map((d) => d.value)));
  const n = data.length;
  const slot = plotW / Math.max(1, n);
  const barW = slot * 0.62;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Annual contractor-sector company insolvencies by year"
      className="h-[280px] w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {ticks.map((t, i) => {
        const y = padT + plotH - (t / maxV) * plotH;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={y + 3} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {Math.round(t).toLocaleString("en-GB")}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.value / maxV) * plotH;
        const x = padL + i * slot + (slot - barW) / 2;
        const y = padT + plotH - h;
        return (
          <g key={d.year}>
            <rect x={x} y={y} width={barW} height={Math.max(0, h)} rx={3} fill={CYAN}>
              <title>{`${d.year}: ${d.value.toLocaleString("en-GB")} Section J+M insolvencies`}</title>
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

// ---------------------------------------------------------------------------
// Monthly trend area: cvl + compulsory + administration, stacked
// ---------------------------------------------------------------------------

export function MonthlyInsolvencyChart({ monthly }: { monthly: InsolvencyMonth[] }) {
  const W = 720;
  const H = 280;
  const padL = 44;
  const padR = 12;
  const padT = 12;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const pts = monthly.map((d) => ({
    month: d.month,
    cvl: d.cvl,
    compulsory: d.compulsory,
    administration: d.administration + d.administration_to_cvl,
  }));
  const n = pts.length;
  const maxV = niceMax(Math.max(1, ...pts.map((p) => p.cvl + p.compulsory + p.administration)));

  const x = (i: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const yFor = (v: number) => padT + plotH - (v / maxV) * plotH;

  const linePath = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ");

  /** Filled band between a lower and upper cumulative series (stacked-area band). */
  const bandPath = (lower: number[], upper: number[]) => {
    const top = upper.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${yFor(v).toFixed(1)}`);
    const bottom = lower
      .map((v, i) => `${x(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
      .reverse()
      .map((coords, i) => `${i === 0 ? "L" : "L"} ${coords}`);
    return `${top.join(" ")} ${bottom.join(" ")} Z`;
  };

  const cvlCum = pts.map((p) => p.cvl);
  const cvlCompCum = pts.map((p) => p.cvl + p.compulsory);
  const totalCum = pts.map((p) => p.cvl + p.compulsory + p.administration);
  const zero = pts.map(() => 0);

  const cvlPath = linePath(cvlCum);
  const cvlCompPath = linePath(cvlCompCum);
  const totalPath = linePath(totalCum);
  const zeroLine = linePath(zero);

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);
  const labelEvery = Math.max(1, Math.ceil(n / 10));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Monthly contractor-sector insolvencies by procedure"
      className="h-[280px] w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {ticks.map((t, i) => {
        const yy = yFor(t);
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={yy + 3} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {Math.round(t).toLocaleString("en-GB")}
            </text>
          </g>
        );
      })}

      <path d={bandPath(zero, cvlCum)} fill={CYAN} fillOpacity={0.35} stroke="none" />
      <path d={cvlPath} fill="none" stroke={CYAN} strokeWidth={1.5} />

      <path d={bandPath(cvlCum, cvlCompCum)} fill={AMBER} fillOpacity={0.3} stroke="none" />
      <path d={cvlCompPath} fill="none" stroke={AMBER} strokeWidth={1.2} />

      <path d={bandPath(cvlCompCum, totalCum)} fill={NEUTRAL} fillOpacity={0.28} stroke="none" />
      <path d={totalPath} fill="none" stroke={NEUTRAL} strokeWidth={1.2} />

      <path d={zeroLine} fill="none" stroke={GRID} strokeWidth={1} />

      {pts.map((p, i) =>
        i % labelEvery === 0 ? (
          <text key={p.month} x={x(i)} y={H - padB + 16} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
            {monthLabelShort(p.month)}
          </text>
        ) : null
      )}
      {pts.map((p, i) => (
        <circle key={`pt-${p.month}`} cx={x(i)} cy={yFor(p.cvl + p.compulsory + p.administration)} r={6} fill="transparent">
          <title>{`${monthLabel(p.month)}: CVL ${p.cvl}, compulsory ${p.compulsory}, administration ${p.administration}`}</title>
        </circle>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Captured share bar chart: divisions 62/70/71 as a share of the Section J+M
// total, by year.
// ---------------------------------------------------------------------------

export function CapturedShareChart({
  sectionAnnual,
  capturedAnnual,
}: {
  sectionAnnual: SectionYear[];
  capturedAnnual: CapturedYear[];
}) {
  const W = 640;
  const H = 260;
  const padL = 52;
  const padR = 12;
  const padT = 12;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const capturedByYear = new Map(capturedAnnual.map((c) => [c.year, c.total]));
  const data = sectionAnnual
    .filter((r) => r.year < 2026)
    .map((r) => {
      const captured = capturedByYear.get(r.year) ?? 0;
      return { year: String(r.year), captured, other: Math.max(0, r.total - captured), total: r.total };
    });

  const maxV = niceMax(Math.max(1, ...data.map((d) => d.total)));
  const n = data.length;
  const slot = plotW / Math.max(1, n);
  const barW = slot * 0.6;

  const y = (v: number) => padT + plotH - (v / maxV) * plotH;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Divisions 62/70/71 as a share of Section J+M insolvencies, by year"
      className="h-[260px] w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {ticks.map((t, i) => {
        const yy = y(t);
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={yy + 3} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {Math.round(t).toLocaleString("en-GB")}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = padL + i * slot + (slot - barW) / 2;
        const capturedH = (d.captured / maxV) * plotH;
        const otherH = (d.other / maxV) * plotH;
        const baseY = padT + plotH;
        return (
          <g key={d.year}>
            <rect x={x} y={baseY - capturedH} width={barW} height={Math.max(0, capturedH)} fill={CYAN}>
              <title>{`${d.year}: ${d.captured.toLocaleString("en-GB")} in divisions 62/70/71`}</title>
            </rect>
            <rect x={x} y={baseY - capturedH - otherH} width={barW} height={Math.max(0, otherH)} rx={3} fill={CYAN_LIGHT}>
              <title>{`${d.year}: ${d.other.toLocaleString("en-GB")} elsewhere in Section J+M`}</title>
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
