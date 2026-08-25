"use client";

/**
 * Dependency-free inline SVG charts for the UK Care Home Density & Quality Index.
 * care/web has no chart library installed, so these are plain <svg> bars rather
 * than a recharts import (matches the construction-cis/hospitality convention on
 * sites that do have recharts, without adding a new dependency here).
 */

// Sequential magnitude bars: one hue (site brand colour), length encodes value.
export function SequentialBarChart({
  rows,
  unit = "",
  maxOverride,
}: {
  rows: { label: string; value: number }[];
  unit?: string;
  maxOverride?: number;
}) {
  const max = maxOverride ?? Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="w-full">
      {rows.map((r) => {
        const pct = max > 0 ? Math.max((r.value / max) * 100, 1) : 0;
        return (
          <div key={r.label} className="mb-2.5 last:mb-0">
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className="font-medium text-[var(--ink)]">{r.label}</span>
              <span className="tabular-nums text-[var(--muted)]">
                {r.value.toLocaleString("en-GB", { maximumFractionDigits: 1 })}
                {unit}
              </span>
            </div>
            <svg viewBox="0 0 100 10" width="100%" height="10" preserveAspectRatio="none" role="presentation">
              <rect x="0" y="0" width="100" height="10" rx="2" fill="var(--border)" />
              <rect x="0" y="0" width={pct} height="10" rx="2" fill="var(--brand-primary)" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

// Fixed status palette: rating bands are a state, not a series identity, so
// colour is reserved (good / warning / critical) and never reused elsewhere.
const RATING_COLORS: Record<string, string> = {
  "Outstanding or Good": "#0ca30c",
  "Requires improvement": "#e08e00",
  Inadequate: "#d03b3b",
  "Not yet rated": "#94a3af",
};

export interface RatingStackRow {
  label: string;
  outstandingOrGood: number;
  requiresImprovement: number;
  inadequate: number;
  notYetRated: number;
}

export function RatingStackChart({ rows }: { rows: RatingStackRow[] }) {
  return (
    <div className="w-full">
      {rows.map((r) => {
        const segs = [
          { key: "Outstanding or Good", pct: r.outstandingOrGood },
          { key: "Requires improvement", pct: r.requiresImprovement },
          { key: "Inadequate", pct: r.inadequate },
          { key: "Not yet rated", pct: r.notYetRated },
        ];
        let cursor = 0;
        return (
          <div key={r.label} className="mb-3 last:mb-0">
            <div className="mb-1 text-sm font-medium text-[var(--ink)]">{r.label}</div>
            <svg viewBox="0 0 100 12" width="100%" height="12" preserveAspectRatio="none" role="img"
              aria-label={`${r.label}: ${segs.map((s) => `${s.key} ${s.pct.toFixed(1)}%`).join(", ")}`}
            >
              {segs.map((s) => {
                const x = cursor;
                cursor += s.pct;
                if (s.pct <= 0) return null;
                return (
                  <rect key={s.key} x={x} y="0" width={s.pct} height="12" fill={RATING_COLORS[s.key]} />
                );
              })}
            </svg>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-[var(--muted)]">
              {segs.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ background: RATING_COLORS[s.key] }}
                  />
                  {s.key}: {s.pct.toFixed(1)}%
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
