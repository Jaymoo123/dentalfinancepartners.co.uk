/**
 * Types and formatters for the NHS Dental Activity Recovery Index.
 *
 * Data is compiled from NHSBSA English Contractor Monthly General Dental Activity
 * open data and committed as Dentists/web/src/data/nhs-dental-activity-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface NationalMonth {
  month: string;
  uda: number;
  cot: number;
  band1: number;
  band2: number;
  band3: number;
  urgent: number;
  recovery_index: number | null;
}

export interface RegionalRow {
  commissioner: string;
  uda_ttm: number;
  cot_ttm: number;
  recovery_index: number | null;
}

export interface DentalActivitySnapshot {
  meta: {
    generated_at: string;
    data_through: string;
    coverage: string;
    baseline_period: string;
    baseline_monthly_avg_uda: number | null;
    sources: {
      name: string;
      publisher: string;
      portal: string;
      licence: string;
      retrieved: string;
      attribution: string;
    }[];
    notes: string;
  };
  headline: {
    last_settled_month: string;
    last_month_uda: number;
    last_month_cot: number;
    last_month_recovery_index: number | null;
    yoy_pct_uda: number | null;
    baseline_monthly_avg_uda: number | null;
    months_below_90: number;
    regions_above_90: number;
    regions_below_90: number;
  };
  series: {
    national: NationalMonth[];
    regional: RegionalRow[];
  };
  provenance: {
    resource_urls_used: string[];
    total_resources_downloaded: number;
  };
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-04" -> "Apr 2026" */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y}`;
}

/** "2026-04" -> "Apr 26" (compact axis label) */
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

/** Format recovery index as "87.3" or "n/a" */
export function fmtIndex(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return n.toFixed(1);
}
