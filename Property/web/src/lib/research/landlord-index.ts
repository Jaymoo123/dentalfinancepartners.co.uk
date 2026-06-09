/**
 * Types + small formatters for the UK Landlord Tax Index research asset.
 *
 * The data is produced by optimisation_engine.ingestion.ingest_landlord_data and
 * committed as Property/web/src/data/landlord-tax-index.json. The page imports
 * that snapshot at build time (no runtime fetch), so the report is fast,
 * cacheable and reproducible from git.
 */

export interface LandlordIndexSnapshot {
  meta: {
    generated_at: string;
    incorporations_through: string;
    incorporations_settled_through: string | null;
    provisional_months: string[];
    house_prices_through: string;
    sic_labels: Record<string, string>;
    sources: { name: string; publisher: string; url: string }[];
    notes: string;
  };
  headline: {
    primary_sic: string;
    primary_sic_label: string;
    last_settled_month: string | null;
    landlord_cos_settled: number | null;
    landlord_cos_yoy_pct: number | null;
    landlord_cos_ttm: number | null;
    all_property_cos_ttm: number | null;
    decade: {
      from_year: number;
      to_year: number;
      from_value: number;
      to_value: number;
      multiple: number | null;
      change_pct: number | null;
      union_from: number;
      union_to: number;
    } | null;
    peak_month: string | null;
    peak_value: number;
  };
  incorporations: {
    monthly: Array<Record<string, number | string> & { month: string }>;
    annual: Array<Record<string, number> & { year: number }>;
  };
  house_prices: {
    regions: string[];
    monthly: Array<Record<string, number | string> & { month: string }>;
    latest: Record<string, { price?: number; annual_change_pct?: number }>;
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
export function fmtInt(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "£268,132". */
export function fmtGBP(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}
