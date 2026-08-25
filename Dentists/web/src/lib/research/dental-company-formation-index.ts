/**
 * Types and formatters for the Dental Company Formation Index.
 *
 * Data is compiled from the Companies House Advanced Search API (SIC 86230)
 * and committed as Dentists/web/src/data/dental-company-formation-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface DentalFormationMonth {
  month: string;
  "86230": number;
  union: number;
}

export interface DentalFormationAnnual {
  year: number;
  "86230": number;
  union: number;
}

export interface DentalCompanyFormationSnapshot {
  meta: {
    generated_at: string;
    incorporations_through: string;
    incorporations_settled_through: string;
    provisional_months: string[];
    sic_labels: Record<string, string>;
    sources: {
      name: string;
      publisher: string;
      url: string;
      licence: string;
      attribution: string;
    }[];
    notes: string;
    attribution: string;
  };
  headline: {
    primary_sic: string;
    primary_sic_label: string;
    last_settled_month: string;
    dental_cos_settled: number;
    dental_cos_yoy_pct: number | null;
    dental_cos_ttm: number;
    decade: {
      from_year: number;
      to_year: number;
      from_value: number;
      to_value: number;
      multiple: number;
      change_pct: number;
      union_from: number;
      union_to: number;
      union_change_pct: number | null;
    };
    peak_month: string;
    peak_value: number;
    zero_data_sics: string[];
    thin: boolean;
  };
  incorporations: {
    monthly: DentalFormationMonth[];
    annual: DentalFormationAnnual[];
    annual_by_division: unknown[];
  };
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-03" -> "Mar 2026" */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y}`;
}

/** "2026-03" -> "Mar 26" (compact axis label) */
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
