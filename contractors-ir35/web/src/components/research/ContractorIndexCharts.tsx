/**
 * Charts for the UK Contractor Index page.
 *
 * These are dependency-free, server-renderable inline SVG charts (no recharts,
 * no client runtime). The server page passes plain serializable arrays. All
 * en-GB formatting happens here. Colours ride the site's petrol-cyan palette
 * (cyan-700 / cyan-800, matching BlogPostRenderer), with a lighter cyan dashed
 * tail for the provisional (indexing-lag) months.
 */
import { monthLabel, monthLabelShort } from "@/lib/research/contractor-index";
import { ChartDataTable } from "./ChartDataTable";

type MonthlyRow = Record<string, number | string> & { month: string };
type AnnualRow = Record<string, number> & { year: number };

const CYAN = "var(--chart-1, #0e7490)"; // --chart-1, cyan-700 (5.36 on white)
const CYAN_FILL = "var(--chart-1, #0e7490)"; // --chart-1
const CYAN_PROV = "var(--chart-3, #0891b2)"; // --chart-3, cyan-600 provisional tail (3.68 on white; cyan-300 was 1.45 and failed the 3.0 graphics floor)
const AMBER = "var(--highlight, #b45309)"; // --highlight, amber-700 (5.02 on white); semantic reference line, not a ramp step
const GRID = "var(--hairline, #e5e5e5)"; // --hairline
const AXIS_TEXT = "var(--chart-5, #475569)"; // --chart-5, slate-600 (7.58 on white; neutral-500 was 4.74)

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}

// ---------------------------------------------------------------------------
// Annual incorporations bar chart: IT consultancy (SIC 62020) by year
// ---------------------------------------------------------------------------

export function AnnualIncorporationsChart({
  annual,
  sic,
}: {
  annual: AnnualRow[];
  sic: string;
}) {
  const W = 720;
  const H = 280;
  const padL = 56;
  const padR = 12;
  const padT = 12;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const data = annual.map((a) => ({ year: String(a.year), value: Number(a[sic] ?? 0) }));
  const maxV = niceMax(Math.max(1, ...data.map((d) => d.value)));
  const n = data.length;
  const slot = plotW / Math.max(1, n);
  const barW = slot * 0.62;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);

  return (
    <>
    <ChartDataTable
      caption="Annual IT consultancy company incorporations by year"
      columns={["Year", "New companies"]}
      rows={data.map((d) => [d.year, d.value.toLocaleString("en-GB")])}
    />
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
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
            <rect x={x} y={y} width={barW} height={Math.max(0, h)} rx={3} fill={CYAN_FILL}>
              <title>{`${d.year}: ${d.value.toLocaleString("en-GB")} new companies`}</title>
            </rect>
            <text
              x={x + barW / 2}
              y={H - padB + 16}
              textAnchor="middle"
              fontSize={11}
              fill={AXIS_TEXT}
            >
              {d.year}
            </text>
          </g>
        );
      })}
    </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
// Monthly trend area: IT consultancy formations.
// Provisional last months shown as a dashed/lighter cyan tail.
// ---------------------------------------------------------------------------

export function MonthlyIncorporationsChart({
  monthly,
  sic,
  provisionalMonths,
}: {
  monthly: MonthlyRow[];
  sic: string;
  provisionalMonths: string[];
}) {
  const prov = new Set(provisionalMonths);

  const W = 720;
  const H = 280;
  const padL = 48;
  const padR = 12;
  const padT = 12;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const pts = monthly.map((d) => ({
    month: d.month,
    value: Number(d[sic] ?? 0),
    prov: prov.has(d.month),
  }));
  const n = pts.length;
  const maxV = niceMax(Math.max(1, ...pts.map((p) => p.value)));

  const x = (i: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const y = (v: number) => padT + plotH - (v / maxV) * plotH;

  // Last settled index (everything up to and including it is the solid path).
  let lastSettledIdx = -1;
  pts.forEach((p, i) => {
    if (!p.prov) lastSettledIdx = i;
  });

  const solidPts = pts.slice(0, lastSettledIdx + 1);
  const provPts = pts.slice(Math.max(0, lastSettledIdx)); // include the join point

  const linePath = (rows: { value: number }[], startIdx: number) =>
    rows
      .map((p, k) => `${k === 0 ? "M" : "L"} ${x(startIdx + k).toFixed(1)} ${y(p.value).toFixed(1)}`)
      .join(" ");

  const areaPath =
    solidPts.length > 0
      ? `${linePath(solidPts, 0)} L ${x(solidPts.length - 1).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${x(0).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`
      : "";

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);

  // X labels: roughly one per ~12 months.
  const labelEvery = Math.max(1, Math.ceil(n / 10));

  return (
    <>
    <ChartDataTable
      caption="Monthly IT consultancy company incorporations over time"
      columns={["Month", "New companies", "Status"]}
      rows={pts.map((p) => [
        monthLabel(p.month),
        p.value.toLocaleString("en-GB"),
        p.prov ? "Provisional" : "Settled",
      ])}
    />
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
      className="h-[280px] w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cti-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={CYAN} stopOpacity={0.32} />
          <stop offset="95%" stopColor={CYAN} stopOpacity={0.03} />
        </linearGradient>
      </defs>

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

      {areaPath ? <path d={areaPath} fill="url(#cti-fill)" stroke="none" /> : null}
      {solidPts.length > 0 ? (
        <path d={linePath(solidPts, 0)} fill="none" stroke={CYAN} strokeWidth={2} />
      ) : null}
      {provPts.length > 1 ? (
        <path
          d={linePath(provPts, Math.max(0, lastSettledIdx))}
          fill="none"
          stroke={CYAN_PROV}
          strokeWidth={2}
          strokeDasharray="4 3"
        />
      ) : null}

      {pts.map((p, i) =>
        i % labelEvery === 0 ? (
          <text
            key={p.month}
            x={x(i)}
            y={H - padB + 16}
            textAnchor="middle"
            fontSize={10}
            fill={AXIS_TEXT}
          >
            {monthLabelShort(p.month)}
          </text>
        ) : null
      )}

      {/* Accessible values live in the sr-only ChartDataTable above; the title
          elements below give sighted users per-point hover values. */}
      {pts.map((p, i) => (
        <circle key={`pt-${p.month}`} cx={x(i)} cy={y(p.value)} r={6} fill="transparent">
          <title>{`${monthLabel(p.month)}: ${p.value.toLocaleString("en-GB")}${p.prov ? " (provisional)" : ""}`}</title>
        </circle>
      ))}
    </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
// Reform-overlay chart: all-contractor union formations by year, with the two
// off-payroll (IR35) reform dates marked as vertical reference lines.
// ---------------------------------------------------------------------------

export function ReformOverlayChart({
  annual,
  reformYears,
}: {
  annual: AnnualRow[];
  reformYears: { year: number; label: string }[];
}) {
  const W = 720;
  const H = 300;
  const padL = 56;
  const padR = 12;
  const padT = 28;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const data = annual.map((a) => ({ year: a.year, value: Number(a.union ?? 0) }));
  const maxV = niceMax(Math.max(1, ...data.map((d) => d.value)));
  const n = data.length;
  const slot = plotW / Math.max(1, n);
  const barW = slot * 0.62;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV / yTicks) * i);

  // A reform "year" line sits at the left edge of the bar for that year, since
  // the reform (April) falls early in the calendar year.
  const xForYearStart = (year: number) => {
    const i = data.findIndex((d) => d.year === year);
    if (i < 0) return null;
    return padL + i * slot;
  };

  return (
    <>
    <ChartDataTable
      caption="All-contractor company formations by year, with off-payroll reform dates marked"
      columns={["Year", "New contractor-sector companies", "Off-payroll reform"]}
      rows={data.map((d) => [
        String(d.year),
        d.value.toLocaleString("en-GB"),
        reformYears.find((r) => r.year === d.year)?.label ?? "",
      ])}
    />
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
      className="h-[300px] w-full"
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
            <rect x={x} y={y} width={barW} height={Math.max(0, h)} rx={3} fill={CYAN_FILL}>
              <title>{`${d.year}: ${d.value.toLocaleString("en-GB")} new contractor-sector companies`}</title>
            </rect>
            <text
              x={x + barW / 2}
              y={H - padB + 16}
              textAnchor="middle"
              fontSize={11}
              fill={AXIS_TEXT}
            >
              {d.year}
            </text>
          </g>
        );
      })}
      {reformYears.map((r) => {
        const x = xForYearStart(r.year);
        if (x === null) return null;
        return (
          <g key={r.year}>
            <line
              x1={x}
              y1={padT - 14}
              x2={x}
              y2={padT + plotH}
              stroke={AMBER}
              strokeWidth={1.5}
              strokeDasharray="5 3"
            />
            <text x={x + 4} y={padT - 4} fontSize={10.5} fontWeight={600} fill={AMBER}>
              {r.label}
            </text>
          </g>
        );
      })}
    </svg>
    </>
  );
}
