"use client";

/**
 * Lightweight, dependency-free SVG charts for the agency research pages.
 *
 * ponytail: no recharts/shadcn chart wrapper on this site (unlike
 * construction-cis), so these are plain inline-SVG components instead of a
 * new dependency. Fine for the fixed, small datasets these pages render
 * (a few dozen years/months at most); revisit with a charting lib only if a
 * future page needs zoom/brush/hundreds-of-series interactivity.
 */
import { useId } from "react";

const COLORS = {
  primary: "#4f46e5", // indigo-600
  primaryLight: "#a5b4fc", // indigo-300
  secondary: "#f59e0b", // amber-500
  muted: "#94a3b8", // slate-400
  grid: "#e2e8f0", // slate-200
};

function fmtAxisNum(n: number): string {
  return n.toLocaleString("en-GB");
}

// ---------------------------------------------------------------------------
// Vertical bar chart -- annual totals, seasonality, SIC breakdown
// ---------------------------------------------------------------------------

export type BarDatum = { label: string; value: number; highlight?: boolean };

export function BarChart({ data, height = 260, valueSuffix = "" }: { data: BarDatum[]; height?: number; valueSuffix?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const barW = 100 / data.length;

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex h-full items-end gap-1">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div
              key={i}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
              style={{ maxWidth: `${barW}%` }}
            >
              <div className="pointer-events-none absolute -top-7 z-10 hidden whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                {fmtAxisNum(d.value)}
                {valueSuffix}
              </div>
              <div
                className="w-full rounded-t"
                style={{
                  height: `${Math.max(pct, 1)}%`,
                  backgroundColor: d.highlight ? COLORS.secondary : COLORS.primary,
                }}
              />
              <div className="mt-1.5 max-w-full truncate text-[10px] text-slate-500 sm:text-xs">{d.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stacked vertical bar chart -- procedure / division / division-of-insolvency breakdowns
// ---------------------------------------------------------------------------

export type StackSeries = { key: string; label: string; color: string };
export type StackDatum = { label: string } & Record<string, number | string>;

export function StackedBarChart({
  data,
  series,
  height = 280,
}: {
  data: StackDatum[];
  series: StackSeries[];
  height?: number;
}) {
  const totals = data.map((d) => series.reduce((sum, s) => sum + (Number(d[s.key]) || 0), 0));
  const max = Math.max(1, ...totals);
  const barW = 100 / data.length;

  return (
    <div>
      <div className="w-full" style={{ height }}>
        <div className="flex h-full items-end gap-1.5">
          {data.map((d, i) => {
            const total = totals[i];
            const heightPct = (total / max) * 100;
            return (
              <div key={i} className="group relative flex h-full flex-1 flex-col items-center justify-end" style={{ maxWidth: `${barW}%` }}>
                <div className="pointer-events-none absolute -top-7 z-10 hidden whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                  {fmtAxisNum(total)}
                </div>
                <div className="flex w-full flex-col-reverse overflow-hidden rounded-t" style={{ height: `${Math.max(heightPct, 1)}%` }}>
                  {series.map((s) => {
                    const v = Number(d[s.key]) || 0;
                    const segPct = total > 0 ? (v / total) * 100 : 0;
                    return <div key={s.key} style={{ height: `${segPct}%`, backgroundColor: s.color }} />;
                  })}
                </div>
                <div className="mt-1.5 max-w-full truncate text-[10px] text-slate-500 sm:text-xs">{d.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Line chart -- monthly trends, survival curves. Multiple series, optional
// dashed styling per-series (used for "provisional" tails / comparison lines).
// ---------------------------------------------------------------------------

export type LineSeries = {
  key: string;
  label: string;
  color: string;
  dashed?: boolean;
};

export function LineChart({
  points,
  series,
  height = 260,
  yUnit = "number",
  yDomain,
}: {
  /** Each point is { tick: string, [seriesKey]: number | null }. */
  points: Array<{ tick: string } & Record<string, number | string | null>>;
  series: LineSeries[];
  height?: number;
  /** "percent" appends "%" instead of thousands-separating. String, not a
   * function prop, so this component stays passable from a server page
   * without crossing the client-boundary "functions aren't serializable" rule. */
  yUnit?: "number" | "percent";
  yDomain?: [number, number];
}) {
  const yFormat = yUnit === "percent" ? (n: number) => `${n}%` : fmtAxisNum;
  const uid = useId();
  const W = 600;
  const H = height;
  const padL = 44;
  const padR = 8;
  const padT = 12;
  const padB = 24;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const allVals = points.flatMap((p) => series.map((s) => p[s.key])).filter((v): v is number => typeof v === "number");
  const [yMin, yMax] = yDomain ?? [Math.min(0, ...allVals), Math.max(1, ...allVals)];
  const yRange = yMax - yMin || 1;

  const x = (i: number) => padL + (points.length <= 1 ? 0 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => padT + innerH - ((v - yMin) / yRange) * innerH;

  const yTicks = 4;
  const tickVals = Array.from({ length: yTicks + 1 }, (_, i) => yMin + (yRange * i) / yTicks);

  // Show a manageable number of x-axis labels
  const labelEvery = Math.max(1, Math.ceil(points.length / 8));

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 320 }} role="img" aria-label="Chart">
        {tickVals.map((v, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke={COLORS.grid} strokeWidth={1} />
            <text x={padL - 6} y={y(v)} textAnchor="end" dominantBaseline="middle" fontSize={9} fill="#64748b">
              {yFormat(Math.round(v))}
            </text>
          </g>
        ))}

        {points.map((p, i) =>
          i % labelEvery === 0 ? (
            <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="#64748b">
              {p.tick}
            </text>
          ) : null,
        )}

        {series.map((s) => {
          const coords = points
            .map((p, i) => {
              const v = p[s.key];
              return typeof v === "number" ? `${x(i)},${y(v)}` : null;
            })
            .filter((c): c is string => c !== null);
          if (coords.length === 0) return null;
          return (
            <polyline
              key={s.key}
              points={coords.join(" ")}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeDasharray={s.dashed ? "4 3" : undefined}
            />
          );
        })}

        {series.map((s) =>
          points.map((p, i) => {
            const v = p[s.key];
            if (typeof v !== "number") return null;
            return <circle key={`${s.key}-${i}`} cx={x(i)} cy={y(v)} r={2.5} fill={s.color} />;
          }),
        )}
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5" id={uid}>
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="h-0.5 w-4" style={{ backgroundColor: s.color, borderTop: s.dashed ? `2px dashed ${s.color}` : undefined }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export { COLORS as CHART_COLORS };
