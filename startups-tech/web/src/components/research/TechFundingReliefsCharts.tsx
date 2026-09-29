/**
 * Dependency-free SVG charts for the UK Tech-Funding Reliefs Index (SEIS/EIS) page.
 *
 * No chart library is installed in this site (startups-tech), so these render
 * plain, accessible SVG bars server-side -- no client JS, no hydration cost.
 * ponytail: a handful of static bar charts don't justify adding recharts as a
 * new dependency; revisit if this site later needs interactive tooltips/zoom.
 */
import type { SVGProps } from "react";
import { fmtGBPm, fmtNumber } from "@/lib/research/tech-funding-reliefs-index";

/**
 * DECLARED HEX EXCEPTION, phase 5 (W5R). These two are data-bound SVG/inline
 * `fill` values, not markup colours: a bar's fill encodes which series or which
 * year a bar belongs to, so it has to be a value an attribute can take, not a
 * utility class. They are therefore expressed as the RAMP TOKENS rather than as
 * literals, so the port's one-grep guarantee still holds and a ramp change
 * reaches them: `--color-primary-600` is `#4f46e5` (the locked brand step) and
 * `--color-primary-200` is `#c7d2fe`, both declared in src/app/globals.css:37-47.
 * Byte-for-byte the same two colours render as before; only the source changed.
 *
 * Contrast: these are GRAPHIC objects (3:1 floor, not 4.5:1). primary-600 on the
 * white chart card measures 6.29:1. primary-200 is the DE-EMPHASISED series and
 * measures 1.35:1, which is why no chart in this file relies on colour alone to
 * carry a value: every number is also a text node (see the sr-only lists below
 * and the visible right-hand value columns), which is T16's rule.
 */
const BRAND = "var(--color-primary-600)";
const MUTED = "var(--color-primary-200)";

// ponytail/fix (hydration #418, 2026-09-29): a nested <title> host element
// inside these bar SVGs is treated by React 19's SSR as a hoistable <head>
// title resource (react-dom-server pushTitleImpl), even though it is nested
// inside <svg>, so the server emits an empty <title></title> and the client
// then hydrates the real tooltip text into it -- a genuine text mismatch.
// The global `title` attribute gives the same native hover tooltip without
// rendering a `<title>` host element, so it sidesteps the bug entirely.
// React's SVG prop types don't list `title` (it's an HTML-only attribute in
// the type defs, though browsers honour it on any element), hence this cast.
type RectTitleProps = SVGProps<SVGRectElement> & { title?: string };
function TitledRect(props: RectTitleProps) {
  return <rect {...(props as SVGProps<SVGRectElement>)} />;
}

// ---------------------------------------------------------------------------
// Annual bar chart: amount raised (£m) over the full time series
// ---------------------------------------------------------------------------

export function AnnualAmountChart({
  data,
  label,
}: {
  data: { year: string; amountAllM: number | null }[];
  label: string;
}) {
  const rows = data.filter((d) => d.amountAllM !== null) as { year: string; amountAllM: number }[];
  const max = Math.max(...rows.map((r) => r.amountAllM), 1);
  const w = 900;
  const h = 220;
  const padL = 8;
  const padB = 24;
  const barGap = 2;
  const barW = (w - padL) / rows.length - barGap;

  return (
    <>
      {/* T16, phase 5: the bars used to carry `role="img" aria-label=...`, which
          collapses the whole subtree and makes every value unreachable. The bars
          are now decorative (`aria-hidden`) and the series is published as text
          nodes in this list. Every string below is byte-identical to the `title`
          tooltip the matching rect already carried, so no copy is authored here
          and no figure is restated. */}
      <ul className="sr-only" aria-label={label}>
        {rows.map((r) => (
          <li key={r.year}>{`${r.year}: ${fmtGBPm(r.amountAllM)}`}</li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
      {rows.map((r, i) => {
        const barH = (r.amountAllM / max) * (h - padB - 8);
        const x = padL + i * (barW + barGap);
        const y = h - padB - barH;
        const isLatest = i === rows.length - 1;
        return (
          <g key={r.year}>
            <TitledRect
              x={x}
              y={y}
              width={barW}
              height={barH}
              fill={isLatest ? BRAND : MUTED}
              rx={1}
              title={`${r.year}: ${fmtGBPm(r.amountAllM)}`}
            />
          </g>
        );
      })}
      {/* x-axis labels: first, middle, last year only to avoid clutter */}
      {[0, Math.floor(rows.length / 2), rows.length - 1].map((i) => {
        const r = rows[i];
        if (!r) return null;
        const x = padL + i * (barW + barGap) + barW / 2;
        return (
          // fill=currentColor + text-neutral-500 replaces the literal #78716c
          // (stone-500). At 11px the 4.5:1 text floor applies: the old stone-500
          // measured 4.80 and neutral-500 measures 4.74 on the white chart card,
          // so this is a source change, not a contrast change.
          <text
            key={i}
            x={x}
            y={h - 6}
            fontSize={11}
            fill="currentColor"
            className="text-neutral-500"
            textAnchor="middle"
          >
            {r.year}
          </text>
        );
      })}
      </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
// Generic annual bar chart: any numeric series with a custom value formatter.
// Shared across research pages (funding reliefs, R&D relief) -- reuse rather
// than a bespoke chart per metric.
// ---------------------------------------------------------------------------

export function AnnualSeriesChart({
  data,
  label,
  formatValue,
}: {
  data: { year: string; value: number | null }[];
  label: string;
  formatValue: (n: number) => string;
}) {
  const rows = data.filter((d) => d.value !== null) as { year: string; value: number }[];
  const max = Math.max(...rows.map((r) => r.value), 1);
  const w = 900;
  const h = 220;
  const padL = 8;
  const padB = 24;
  const barGap = 2;
  const barW = (w - padL) / rows.length - barGap;

  return (
    <>
      {/* T16, as in AnnualAmountChart above: bars decorative, values as text.
          The strings match the rects' `title` tooltips byte for byte. */}
      <ul className="sr-only" aria-label={label}>
        {rows.map((r) => (
          <li key={r.year}>{`${r.year}: ${formatValue(r.value)}`}</li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
      {rows.map((r, i) => {
        const barH = (r.value / max) * (h - padB - 8);
        const x = padL + i * (barW + barGap);
        const y = h - padB - barH;
        const isLatest = i === rows.length - 1;
        return (
          <TitledRect
            key={r.year}
            x={x}
            y={y}
            width={barW}
            height={barH}
            fill={isLatest ? BRAND : MUTED}
            rx={1}
            title={`${r.year}: ${formatValue(r.value)}`}
          />
        );
      })}
      {[0, Math.floor(rows.length / 2), rows.length - 1].map((i) => {
        const r = rows[i];
        if (!r) return null;
        const x = padL + i * (barW + barGap) + barW / 2;
        return (
          <text
            key={i}
            x={x}
            y={h - 6}
            fontSize={11}
            fill="currentColor"
            className="text-neutral-500"
            textAnchor="middle"
          >
            {r.year}
          </text>
        );
      })}
      </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
// Horizontal bar chart: amount by sector or region for the latest year
// ---------------------------------------------------------------------------

export interface HBarDatum {
  label: string;
  value: number | null;
  sharePct: number | null;
  highlight?: boolean;
}

export function HorizontalBarChart({ data }: { data: HBarDatum[] }) {
  const rows = data.filter((d) => d.value !== null) as (HBarDatum & { value: number })[];
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3 text-sm">
          <div className="w-44 shrink-0 truncate text-neutral-600" title={r.label}>
            {r.label}
          </div>
          <div className="relative h-5 flex-1 rounded bg-neutral-100">
            <div
              className="h-5 rounded"
              style={{
                width: `${Math.max((r.value / max) * 100, 2)}%`,
                background: r.highlight ? BRAND : MUTED,
              }}
            />
          </div>
          <div className="w-28 shrink-0 text-right font-mono text-xs text-neutral-700">
            {fmtGBPm(r.value)}
            {r.sharePct !== null && (
              <span className="ml-1 text-neutral-500">({r.sharePct}%)</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Two-series comparison bar chart: e.g. tech vs all-industry survival by horizon
// ---------------------------------------------------------------------------

export function ComparisonBarChart({
  categories,
  seriesA,
  seriesB,
  labelA,
  labelB,
  formatValue,
}: {
  categories: string[];
  seriesA: (number | null)[];
  seriesB: (number | null)[];
  labelA: string;
  labelB: string;
  formatValue: (n: number) => string;
}) {
  const max = Math.max(...seriesA.filter((v): v is number => v !== null), ...seriesB.filter((v): v is number => v !== null), 1);

  return (
    <div>
      <div className="mb-3 flex gap-5 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: BRAND }} /> {labelA}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: MUTED }} /> {labelB}
        </span>
      </div>
      <div className="space-y-3">
        {categories.map((cat, i) => {
          const a = seriesA[i];
          const b = seriesB[i];
          return (
            <div key={cat}>
              <div className="mb-1 text-xs font-semibold text-neutral-600">{cat}</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-4 flex-1 rounded bg-neutral-100">
                    {a !== null && (
                      <div className="h-4 rounded" style={{ width: `${Math.max((a / max) * 100, 2)}%`, background: BRAND }} />
                    )}
                  </div>
                  <div className="w-16 shrink-0 text-right font-mono text-xs text-neutral-700">
                    {a !== null ? formatValue(a) : "n/a"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 flex-1 rounded bg-neutral-100">
                    {b !== null && (
                      <div className="h-4 rounded" style={{ width: `${Math.max((b / max) * 100, 2)}%`, background: MUTED }} />
                    )}
                  </div>
                  <div className="w-16 shrink-0 text-right font-mono text-xs text-neutral-500">
                    {b !== null ? formatValue(b) : "n/a"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AAR pipeline mini-chart: applications received vs approved same year
// ---------------------------------------------------------------------------

export function AarPipelineChart({
  years,
}: {
  years: { year: string; applicationsReceived: number; approvedSameYear: number }[];
}) {
  const max = Math.max(...years.map((y) => y.applicationsReceived), 1);
  const w = 900;
  const h = 180;
  const padB = 22;
  const barGap = 4;
  const barW = w / years.length - barGap;

  return (
    <>
      {/* T16: bars decorative, both series published as text. Each string is the
          rect's own `title` tooltip, unchanged. */}
      <ul className="sr-only" aria-label="AAR applications received vs approved same year">
        {years.map((y) => (
          <li key={y.year}>
            {`${y.year}: ${fmtNumber(y.applicationsReceived)} applications received`}
            {", "}
            {`${y.year}: ${fmtNumber(y.approvedSameYear)} approved same year`}
          </li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
      {years.map((y, i) => {
        const recH = (y.applicationsReceived / max) * (h - padB - 8);
        const appH = (y.approvedSameYear / max) * (h - padB - 8);
        const x = i * (barW + barGap);
        return (
          <g key={y.year}>
            <TitledRect
              x={x}
              y={h - padB - recH}
              width={barW}
              height={recH}
              fill={MUTED}
              rx={1}
              title={`${y.year}: ${fmtNumber(y.applicationsReceived)} applications received`}
            />
            <TitledRect
              x={x}
              y={h - padB - appH}
              width={barW}
              height={appH}
              fill={BRAND}
              rx={1}
              title={`${y.year}: ${fmtNumber(y.approvedSameYear)} approved same year`}
            />
          </g>
        );
      })}
      {[0, Math.floor(years.length / 2), years.length - 1].map((i) => {
        const y = years[i];
        if (!y) return null;
        const x = i * (barW + barGap) + barW / 2;
        return (
          <text
            key={i}
            x={x}
            y={h - 6}
            fontSize={11}
            fill="currentColor"
            className="text-neutral-500"
            textAnchor="middle"
          >
            {y.year}
          </text>
        );
      })}
      </svg>
    </>
  );
}
