/**
 * Dependency-free SVG charts for the UK Tech-Funding Reliefs Index (SEIS/EIS) page.
 *
 * No chart library is installed in this site (startups-tech), so these render
 * plain, accessible SVG bars server-side -- no client JS, no hydration cost.
 * ponytail: a handful of static bar charts don't justify adding recharts as a
 * new dependency; revisit if this site later needs interactive tooltips/zoom.
 */
import { fmtGBPm, fmtNumber } from "@/lib/research/tech-funding-reliefs-index";

const BRAND = "#4f46e5";
const MUTED = "#c7d2fe";

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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label}>
      {rows.map((r, i) => {
        const barH = (r.amountAllM / max) * (h - padB - 8);
        const x = padL + i * (barW + barGap);
        const y = h - padB - barH;
        const isLatest = i === rows.length - 1;
        return (
          <g key={r.year}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              fill={isLatest ? BRAND : MUTED}
              rx={1}
            >
              <title>
                {r.year}: {fmtGBPm(r.amountAllM)}
              </title>
            </rect>
          </g>
        );
      })}
      {/* x-axis labels: first, middle, last year only to avoid clutter */}
      {[0, Math.floor(rows.length / 2), rows.length - 1].map((i) => {
        const r = rows[i];
        if (!r) return null;
        const x = padL + i * (barW + barGap) + barW / 2;
        return (
          <text key={i} x={x} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
            {r.year}
          </text>
        );
      })}
    </svg>
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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label}>
      {rows.map((r, i) => {
        const barH = (r.value / max) * (h - padB - 8);
        const x = padL + i * (barW + barGap);
        const y = h - padB - barH;
        const isLatest = i === rows.length - 1;
        return (
          <rect key={r.year} x={x} y={y} width={barW} height={barH} fill={isLatest ? BRAND : MUTED} rx={1}>
            <title>
              {r.year}: {formatValue(r.value)}
            </title>
          </rect>
        );
      })}
      {[0, Math.floor(rows.length / 2), rows.length - 1].map((i) => {
        const r = rows[i];
        if (!r) return null;
        const x = padL + i * (barW + barGap) + barW / 2;
        return (
          <text key={i} x={x} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
            {r.year}
          </text>
        );
      })}
    </svg>
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
              <span className="ml-1 text-neutral-400">({r.sharePct}%)</span>
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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="AAR applications received vs approved same year">
      {years.map((y, i) => {
        const recH = (y.applicationsReceived / max) * (h - padB - 8);
        const appH = (y.approvedSameYear / max) * (h - padB - 8);
        const x = i * (barW + barGap);
        return (
          <g key={y.year}>
            <rect x={x} y={h - padB - recH} width={barW} height={recH} fill={MUTED} rx={1}>
              <title>
                {y.year}: {fmtNumber(y.applicationsReceived)} applications received
              </title>
            </rect>
            <rect x={x} y={h - padB - appH} width={barW} height={appH} fill={BRAND} rx={1}>
              <title>
                {y.year}: {fmtNumber(y.approvedSameYear)} approved same year
              </title>
            </rect>
          </g>
        );
      })}
      {[0, Math.floor(years.length / 2), years.length - 1].map((i) => {
        const y = years[i];
        if (!y) return null;
        const x = i * (barW + barGap) + barW / 2;
        return (
          <text key={i} x={x} y={h - 6} fontSize={11} fill="#78716c" textAnchor="middle">
            {y.year}
          </text>
        );
      })}
    </svg>
  );
}
