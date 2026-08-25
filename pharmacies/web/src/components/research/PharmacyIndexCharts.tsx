/**
 * Dependency-free SVG charts for the pharmacies research pages.
 *
 * No chart library is installed in this site, so these render plain,
 * accessible SVG server-side -- no client JS, no hydration cost.
 * ponytail: a handful of static charts don't justify adding recharts as a
 * new dependency; revisit if this site later needs interactive tooltips/zoom.
 */
const BRAND = "#0f3a4a";
const MUTED = "#c9d8dd";
const ACCENT = "#2d7a94";

// ---------------------------------------------------------------------------
// Monthly line chart: single series over many months (e.g. total pharmacies)
// ---------------------------------------------------------------------------

export function MonthlyLineChart({
  points,
  label,
  formatValue,
}: {
  points: { month: string; tick: string; value: number }[];
  label: string;
  formatValue: (n: number) => string;
}) {
  const w = 900;
  const h = 240;
  const padL = 4;
  const padR = 4;
  const padT = 10;
  const padB = 26;
  const values = points.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const xy = (i: number, v: number) => {
    const x = padL + (i / (points.length - 1)) * innerW;
    const y = padT + innerH - ((v - min) / range) * innerH;
    return [x, y] as const;
  };

  const linePath = points
    .map((p, i) => {
      const [x, y] = xy(i, p.value);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const areaPath = `${linePath} L${(padL + innerW).toFixed(1)},${(padT + innerH).toFixed(1)} L${padL},${(padT + innerH).toFixed(1)} Z`;

  const tickIdxs = [0, Math.floor((points.length - 1) / 3), Math.floor((2 * (points.length - 1)) / 3), points.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id="pharmacy-line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={BRAND} stopOpacity={0.25} />
          <stop offset="95%" stopColor={BRAND} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#pharmacy-line-fill)" />
      <path d={linePath} fill="none" stroke={BRAND} strokeWidth={2} />
      {points.map((p, i) => {
        if (!tickIdxs.includes(i) && i !== points.length - 1) return null;
        const [x, y] = xy(i, p.value);
        return <circle key={p.month} cx={x} cy={y} r={2.5} fill={BRAND}><title>{`${p.tick}: ${formatValue(p.value)}`}</title></circle>;
      })}
      {tickIdxs.map((i) => {
        const p = points[i];
        if (!p) return null;
        const [x] = xy(i, p.value);
        return (
          <text key={i} x={x} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
            {p.tick}
          </text>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Stacked bar chart: composition over time (e.g. small/medium/large)
// ---------------------------------------------------------------------------

export interface StackSeries {
  key: string;
  label: string;
  color: string;
}

export function StackedBarChart({
  data,
  series,
  label,
}: {
  data: { tick: string; values: Record<string, number> }[];
  series: StackSeries[];
  label: string;
}) {
  const w = 900;
  const h = 260;
  const padB = 26;
  const padT = 10;
  const barGap = 10;
  const barW = w / data.length - barGap;
  const max = Math.max(...data.map((d) => series.reduce((sum, s) => sum + (d.values[s.key] ?? 0), 0)));

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label}>
        {data.map((d, i) => {
          const x = i * (barW + barGap) + barGap / 2;
          let yCursor = h - padB;
          return (
            <g key={d.tick}>
              {series.map((s) => {
                const v = d.values[s.key] ?? 0;
                const barH = (v / max) * (h - padB - padT);
                const y = yCursor - barH;
                yCursor = y;
                return (
                  <rect key={s.key} x={x} y={y} width={barW} height={barH} fill={s.color} rx={1}>
                    <title>{`${d.tick} ${s.label}: ${v.toLocaleString("en-GB")}`}</title>
                  </rect>
                );
              })}
              <text x={x + barW / 2} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
                {d.tick}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-neutral-500">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Annual bar chart: single value per year
// ---------------------------------------------------------------------------

export function AnnualBarChart({
  data,
  label,
  formatValue,
}: {
  data: { tick: string; value: number }[];
  label: string;
  formatValue: (n: number) => string;
}) {
  const w = 900;
  const h = 220;
  const padL = 8;
  const padB = 24;
  const barGap = 6;
  const barW = (w - padL) / data.length - barGap;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label}>
      {data.map((d, i) => {
        const barH = (d.value / max) * (h - padB - 8);
        const x = padL + i * (barW + barGap);
        const y = h - padB - barH;
        const isLatest = i === data.length - 1;
        return (
          <rect key={d.tick} x={x} y={y} width={barW} height={barH} fill={isLatest ? BRAND : MUTED} rx={1}>
            <title>{`${d.tick}: ${formatValue(d.value)}`}</title>
          </rect>
        );
      })}
      {data.map((d, i) => {
        const x = padL + i * (barW + barGap) + barW / 2;
        return (
          <text key={d.tick} x={x} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
            {d.tick}
          </text>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Horizontal bar chart: category comparison (e.g. region density)
// ---------------------------------------------------------------------------

export interface HBarDatum {
  label: string;
  value: number;
  suffix?: string;
  highlight?: boolean;
}

export function HorizontalBarChart({ data }: { data: HBarDatum[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3 text-sm">
          <div className="w-52 shrink-0 truncate text-neutral-600" title={d.label}>
            {d.label}
          </div>
          <div className="relative h-6 flex-1 rounded bg-neutral-100">
            <div
              className="h-6 rounded"
              style={{ width: `${Math.max((d.value / max) * 100, 2)}%`, background: d.highlight ? BRAND : ACCENT }}
            />
          </div>
          <div className="w-24 shrink-0 text-right font-mono text-xs text-neutral-700">
            {d.value.toLocaleString("en-GB")}
            {d.suffix ?? ""}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dual-line comparison chart: two series with independent scales, shown as
// index-to-100 lines (e.g. pharmacy count vs items-per-pharmacy trend)
// ---------------------------------------------------------------------------

export function IndexedComparisonChart({
  categories,
  seriesA,
  seriesB,
  labelA,
  labelB,
}: {
  categories: string[];
  seriesA: number[];
  seriesB: number[];
  labelA: string;
  labelB: string;
}) {
  const w = 900;
  const h = 240;
  const padT = 10;
  const padB = 26;
  const innerH = h - padT - padB;

  const idxA = seriesA.map((v) => (v / seriesA[0]) * 100);
  const idxB = seriesB.map((v) => (v / seriesB[0]) * 100);
  const all = [...idxA, ...idxB];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = max - min || 1;

  const xy = (arr: number[], i: number) => {
    const x = (i / (categories.length - 1)) * w;
    const y = padT + innerH - ((arr[i] - min) / range) * innerH;
    return [x, y] as const;
  };

  const pathFor = (arr: number[]) =>
    arr.map((_, i) => {
      const [x, y] = xy(arr, i);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

  const tickIdxs = [0, Math.floor((categories.length - 1) / 2), categories.length - 1];

  return (
    <div>
      <div className="mb-3 flex gap-5 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: BRAND }} /> {labelA}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "#c2410c" }} /> {labelB}
        </span>
        <span className="text-neutral-400">(indexed to 100 at first year shown)</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={`${labelA} vs ${labelB}, indexed`}>
        <path d={pathFor(idxA)} fill="none" stroke={BRAND} strokeWidth={2.5} />
        <path d={pathFor(idxB)} fill="none" stroke="#c2410c" strokeWidth={2.5} strokeDasharray="6 3" />
        {categories.map((c, i) => {
          const [xa, ya] = xy(idxA, i);
          const [, yb] = xy(idxB, i);
          return (
            <g key={c}>
              <circle cx={xa} cy={ya} r={2.5} fill={BRAND}><title>{`${c} ${labelA}: index ${idxA[i].toFixed(1)}`}</title></circle>
              <circle cx={xa} cy={yb} r={2.5} fill="#c2410c"><title>{`${c} ${labelB}: index ${idxB[i].toFixed(1)}`}</title></circle>
            </g>
          );
        })}
        {tickIdxs.map((i) => {
          const [x] = xy(idxA, i);
          return (
            <text key={i} x={x} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
              {categories[i]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
