/**
 * Types and formatters for the UK Tech Formations Index research asset.
 *
 * Data is compiled from Companies House Advanced Search API (OGL v3.0) via
 * the shared research ingestion engine and committed as
 * startups-tech/web/src/data/uk-tech-formations-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface MonthlyRow {
  month: string;
  [sicOrUnion: string]: string | number;
}

export interface AnnualRow {
  year: number;
  [sicOrUnion: string]: number;
}

export interface SegmentBlock {
  key: string;
  label: string;
  sic_codes: string[];
  is_primary: boolean;
  monthly: { month: string; count: number }[];
  annual: { year: number; count: number }[];
  last_settled_month: string | null;
  settled_value: number | null;
  yoy_pct: number | null;
  ttm: number | null;
  peak_month: string | null;
  peak_value: number;
  thin_segment: boolean;
}

export interface TechFormationsIndexSnapshot {
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
    software_development_cos_settled: number | null;
    software_development_cos_yoy_pct: number | null;
    software_development_cos_ttm: number | null;
    all_tech_cos_ttm: number | null;
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
    };
    peak_month: string | null;
    peak_value: number;
    zero_data_sics: string[];
    thin: boolean;
  };
  incorporations: {
    monthly: MonthlyRow[];
    annual: AnnualRow[];
  };
  segments: SegmentBlock[];
}

/** "2026-04" -> "Apr 2026". */
export function monthLabel(ym: string): string {
  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y}`;
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
