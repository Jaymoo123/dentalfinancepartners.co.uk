/**
 * Types + formatters for the UK Construction Index research asset.
 *
 * Data is compiled from Companies House public records and committed as
 * construction-cis/web/src/data/uk-construction-index.json. The page imports
 * that snapshot at build time (no runtime fetch), so the report is fast,
 * cacheable and reproducible from git.
 */

export interface ConstructionIndexSnapshot {
  meta: {
    generated_at: string;
    incorporations_through: string;
    incorporations_settled_through: string;
    provisional_months: string[];
    sic_labels: Record<string, string>;
    division_labels: Record<string, string>;
    sources: { name: string; publisher: string; url: string; licence?: string; attribution?: string; status?: string; note?: string }[];
    attribution: string;
    notes: string;
  };
  headline: {
    primary_sic: string;
    primary_sic_label: string;
    last_settled_month: string;
    domestic_building_cos_settled: number;
    domestic_building_cos_yoy_pct: number;
    domestic_building_cos_ttm: number;
    all_construction_cos_ttm: number;
    decade: {
      from_year: number;
      to_year: number;
      from_value: number;
      to_value: number;
      multiple: number;
      change_pct: number;
      union_from: number;
      union_to: number;
      union_change_pct: number;
    };
    peak_month: string;
    peak_value: number;
    zero_data_sics: string[];
  };
  incorporations: {
    monthly: Array<Record<string, number | string> & { month: string }>;
    annual: Array<Record<string, number> & { year: number }>;
    annual_by_division: Array<{ year: number; div41: number; div42: number; div43: number; union: number }>;
  };
  construction_output: {
    available: boolean;
    series: string;
    status: string;
    note: string;
    monthly: unknown[];
  };
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-03" -> "Mar 2026". */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y}`;
}

/** "2026-03" -> "Mar 26" (compact, for dense axes). */
export function monthLabelShort(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y.slice(2)}`;
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "+4.0%" style percent string. */
export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
