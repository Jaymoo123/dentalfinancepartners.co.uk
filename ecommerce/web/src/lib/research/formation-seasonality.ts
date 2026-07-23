/**
 * Types + derived seasonality for the UK Online Seller Formation Seasonality
 * snapshot (SIC 47910 + 47990 monthly incorporations from Companies House,
 * engine-generated via optimisation_engine/ingestion/research/niches/ecommerce.py).
 *
 * Snapshot: ecommerce/web/src/data/online-seller-formation-seasonality.json.
 * Seasonality (month-of-year averages) is derived here from the raw monthly
 * series at render time, never hardcoded.
 */

export interface FormationMonthRow {
  month: string; // "YYYY-MM"
  "47910": number;
  "47990": number;
  union: number;
}

export interface FormationYearRow {
  year: number;
  "47910": number;
  "47990": number;
  union: number;
}

export interface FormationSeasonalitySnapshot {
  meta: {
    generated_at: string;
    incorporations_through: string;
    incorporations_settled_through: string;
    provisional_months: string[];
    sic_labels: Record<string, string>;
    sources: { name: string; publisher: string; url: string; licence: string; attribution: string }[];
    notes: string;
    attribution: string;
  };
  headline: {
    primary_sic: string;
    primary_sic_label: string;
    last_settled_month: string;
    online_retail_cos_settled: number | null;
    online_retail_cos_yoy_pct: number | null;
    online_retail_cos_ttm: number | null;
    all_online_seller_cos_ttm: number | null;
    decade: {
      from_year: number;
      to_year: number;
      from_value: number;
      to_value: number;
      multiple: number | null;
      change_pct: number | null;
      union_from: number;
      union_to: number;
      union_change_pct: number | null;
    } | null;
    peak_month: string | null;
    peak_value: number;
    thin: boolean;
  };
  incorporations: {
    monthly: FormationMonthRow[];
    annual: FormationYearRow[];
  };
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export interface SeasonalityPoint {
  monthIndex: number; // 1-12
  label: string;
  avg47910: number;
  nYears: number;
}

/**
 * Average SIC-47910 incorporations by calendar month, across every complete
 * (non-provisional) year in the series. Derived from data every render, not
 * cached or hardcoded, so it stays correct as the snapshot is refreshed.
 */
export function deriveSeasonality(snapshot: FormationSeasonalitySnapshot): SeasonalityPoint[] {
  const provisional = new Set(snapshot.meta.provisional_months);
  const byMonth: number[][] = Array.from({ length: 12 }, () => []);
  for (const row of snapshot.incorporations.monthly) {
    if (provisional.has(row.month)) continue;
    const moy = Number(row.month.slice(5, 7));
    if (moy >= 1 && moy <= 12) byMonth[moy - 1].push(row["47910"]);
  }
  return byMonth.map((vals, i) => ({
    monthIndex: i + 1,
    label: MONTH_NAMES[i],
    avg47910: vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0,
    nYears: vals.length,
  }));
}

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTH_NAMES[mi]} ${y}`;
}
