/**
 * Dependency-free SVG charts for the pharmacies research pages.
 *
 * No chart library is installed in this site, so these render plain,
 * accessible SVG server-side -- no client JS, no hydration cost.
 * ponytail: a handful of static charts don't justify adding recharts as a
 * new dependency; revisit if this site later needs interactive tooltips/zoom.
 */
/* COLOUR, and why these four hex literals survive AT the line.
 *
 * An SVG `fill`/`stroke` presentation attribute cannot take a Tailwind
 * utility, and `var(--color-primary-*)` is the wrong answer here for the same
 * two reasons PharmaciesBackdrop.tsx records for its own literal: an undefined
 * custom property invalidates the whole declaration and the element then
 * paints nothing with every test still green, and the Tailwind v4 ramp emits
 * oklch rather than the sRGB these ratios were measured on. Where a colour is
 * set on a real DOM element rather than an SVG attribute (the tick labels, the
 * legend swatches, the horizontal bars) a utility IS used and no literal
 * remains.
 *
 * The first three are declared steps of the P1-A ramp in globals.css, written
 * out: no new colour enters the site. The previous off-ramp values were
 * `#2d7a94` (ACCENT) and `#c9d8dd` / `#a8c5cd` (MUTED, and the "Large" stack
 * series passed in from the page), neither of which sits on any ramp step.
 */
const BRAND = "#0f3a4a"; // primary-950, the brand hex. 12.18 on white
const ACCENT = "#177392"; // primary-700. 5.38 on white, clears the 3.0 graphic floor
const MUTED = "#acefff"; // primary-200. 1.21 on white: see SERIES note below
/* The one genuinely off-ramp literal, and the reason it stays: a two-series
 * comparison needs a second HUE, and this site's ramp is single-hue (teal,
 * OKLCH -133 degrees) by construction, so every step of it reads as the same
 * line at a different lightness. A dash pattern alone does not separate two
 * overlapping trend lines on a shared scale. `#c2410c` is Tailwind orange-700,
 * 4.70 on white, and it is NOT a brand colour: it appears on this one chart
 * and nowhere else on the site. KIT/TOKEN ASK for the manager: a declared
 * `--chart-series-2` in globals.css would retire this line. */
const SERIES_B = "#c2410c";
/* Default stack palette, so a call site passes keys and labels and never a
 * colour. Exported for nothing: the pages take the default. */
const STACK_PALETTE = [BRAND, ACCENT, MUTED];

/* MUTED and the pale stack series sit around 1.2 on white, which is below the
 * 3.0 graphic floor. That is PRE-EXISTING (the off-ramp `#c9d8dd` / `#a8c5cd`
 * they replace measured 1.37 and 1.42) and it is not what carries the meaning:
 * every figure in every chart on this file is also a real text node, both in
 * the SrOnlyValues list below and in the full data table each chart sits
 * beside. Reported to the manager rather than "fixed" by darkening a chart
 * nobody ruled on. */

/* Values are TEXT NODES, and the SVG is decorative.
 *
 * These SVGs used to carry an image role plus an aria-label, which names the
 * image but hides every figure inside it: the numbers lived only in <title>
 * tooltips, which screen readers cannot reliably reach and an LLM scrape never
 * sees. The SVG is now `aria-hidden` and this visually hidden list carries the
 * same figures as real text in the server HTML, named by the chart's own
 * label. Nothing visible changes. */
function SrOnlyValues({ items, label }: { items: { label: string; value: string }[]; label?: string }) {
  return (
    <ul className="sr-only" aria-label={label}>
      {items.map((it) => (
        <li key={it.label}>{it.label}: {it.value}</li>
      ))}
    </ul>
  );
}

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
    <>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
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
            <text key={i} x={x} y={h - 6} fontSize={11} className="fill-slate-500" textAnchor="middle">
              {p.tick}
            </text>
          );
        })}
      </svg>
      <SrOnlyValues label={label} items={points.map((p) => ({ label: p.tick, value: formatValue(p.value) }))} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Stacked bar chart: composition over time (e.g. small/medium/large)
// ---------------------------------------------------------------------------

export interface StackSeries {
  key: string;
  label: string;
  /** Optional. Defaults to STACK_PALETTE by position, so a call site never
   *  carries a colour literal of its own. */
  color?: string;
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
  // ponytail: same NaN guard as AnnualBarChart -- an empty/zero series
  // should draw nothing visible, not an invalid SVG attribute.
  const safe = (n: number) => (Number.isFinite(n) ? n : 0);
  const barW = data.length > 0 ? w / data.length - barGap : 0;
  const max = Math.max(...data.map((d) => series.reduce((sum, s) => sum + safe(d.values[s.key] ?? 0), 0)), 1);

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
        {data.map((d, i) => {
          const x = i * (barW + barGap) + barGap / 2;
          let yCursor = h - padB;
          return (
            <g key={d.tick}>
              {series.map((s, si) => {
                const v = safe(d.values[s.key] ?? 0);
                const barH = (v / max) * (h - padB - padT);
                const y = yCursor - barH;
                yCursor = y;
                return (
                  <rect key={s.key} x={x} y={y} width={barW} height={barH} fill={s.color ?? STACK_PALETTE[si % STACK_PALETTE.length]} rx={1}>
                    <title>{`${d.tick} ${s.label}: ${v.toLocaleString("en-GB")}`}</title>
                  </rect>
                );
              })}
              <text x={x + barW / 2} y={h - 6} fontSize={11} className="fill-slate-500" textAnchor="middle">
                {d.tick}
              </text>
            </g>
          );
        })}
      </svg>
      <SrOnlyValues
        label={label}
        items={data.flatMap((d) => series.map((s) => ({ label: `${d.tick} ${s.label}`, value: safe(d.values[s.key] ?? 0).toLocaleString("en-GB") })))}
      />
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
        {series.map((s, si) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: s.color ?? STACK_PALETTE[si % STACK_PALETTE.length] }}
            />
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
  // ponytail: guard against a non-finite value reaching an SVG attribute
  // (NaN count, empty series) -- treat it as 0 rather than render "NaN".
  const safe = (n: number) => (Number.isFinite(n) ? n : 0);
  const barW = data.length > 0 ? (w - padL) / data.length - barGap : 0;
  const max = Math.max(...data.map((d) => safe(d.value)), 1);

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
        {data.map((d, i) => {
          const barH = (safe(d.value) / max) * (h - padB - 8);
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
            <text key={d.tick} x={x} y={h - 6} fontSize={11} className="fill-slate-500" textAnchor="middle">
              {d.tick}
            </text>
          );
        })}
      </svg>
      <SrOnlyValues label={label} items={data.map((d) => ({ label: d.tick, value: formatValue(safe(d.value)) }))} />
    </>
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
          <div className="w-52 shrink-0 truncate text-slate-600" title={d.label}>
            {d.label}
          </div>
          <div className="relative h-6 flex-1 rounded bg-slate-100">
            {/* Real DOM element, so the ramp is reachable as a utility and no
                literal is needed: primary-950 for the highlighted row,
                primary-700 for the rest. Same two steps as BRAND / ACCENT. */}
            <div
              className={`h-6 rounded ${d.highlight ? "bg-primary-950" : "bg-primary-700"}`}
              style={{ width: `${Math.max((d.value / max) * 100, 2)}%` }}
            />
          </div>
          <div className="w-24 shrink-0 text-right font-mono text-xs text-slate-700">
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
      <div className="mb-3 flex gap-5 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: BRAND }} /> {labelA}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: SERIES_B }} /> {labelB}
        </span>
        <span className="text-slate-500">(indexed to 100 at first year shown)</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
        <path d={pathFor(idxA)} fill="none" stroke={BRAND} strokeWidth={2.5} />
        <path d={pathFor(idxB)} fill="none" stroke={SERIES_B} strokeWidth={2.5} strokeDasharray="6 3" />
        {categories.map((c, i) => {
          const [xa, ya] = xy(idxA, i);
          const [, yb] = xy(idxB, i);
          return (
            <g key={c}>
              <circle cx={xa} cy={ya} r={2.5} fill={BRAND}><title>{`${c} ${labelA}: index ${idxA[i].toFixed(1)}`}</title></circle>
              <circle cx={xa} cy={yb} r={2.5} fill={SERIES_B}><title>{`${c} ${labelB}: index ${idxB[i].toFixed(1)}`}</title></circle>
            </g>
          );
        })}
        {tickIdxs.map((i) => {
          const [x] = xy(idxA, i);
          return (
            <text key={i} x={x} y={h - 6} fontSize={11} className="fill-slate-500" textAnchor="middle">
              {categories[i]}
            </text>
          );
        })}
      </svg>
      <SrOnlyValues
        label={`${labelA} vs ${labelB}, indexed`}
        items={categories.flatMap((c, i) => [
          { label: `${c} ${labelA}`, value: `index ${idxA[i].toFixed(1)}` },
          { label: `${c} ${labelB}`, value: `index ${idxB[i].toFixed(1)}` },
        ])}
      />
    </div>
  );
}
