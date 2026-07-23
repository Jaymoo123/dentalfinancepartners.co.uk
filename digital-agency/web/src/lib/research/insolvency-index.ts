/**
 * Types and formatters for the UK Agency Insolvency Index research asset.
 *
 * Data is compiled from Insolvency Service record-level data via
 * digital-agency/pipeline/build_agency_insolvency_index.py and committed as
 * digital-agency/web/src/data/uk-agency-insolvency-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface InsolvencyMonth {
  month: string;
  captured_total: number;
  union: number;
  "73110": number;
  "73120": number;
  "70210": number;
  "74100": number;
  "73200": number;
  "62012": number;
  "62020": number;
  section_J: number;
  section_M: number;
  cvl: number;
  compulsory: number;
  administration: number;
  administration_to_cvl: number;
  cva: number;
  receivership: number;
  moratorium: number;
}

export type InsolvencyYear = Omit<InsolvencyMonth, "month"> & { year: number };

export interface InsolvencyIndexSnapshot {
  meta: {
    generated_at: string;
    data_through: string;
    coverage: string;
    agency_sic_labels: Record<string, string>;
    section_labels: Record<string, string>;
    procedure_labels: Record<string, string>;
    sources: {
      name: string;
      publisher: string;
      url: string;
      release_page: string;
      licence: string;
      retrieved: string;
      release_date: string;
      attribution: string;
    }[];
    notes: string;
    attribution: string;
  };
  headline: {
    last_settled_month: string;
    last_month_union: number;
    last_month_cvl: number;
    last_month_compulsory: number;
    last_month_administration: number;
    yoy_pct: number | null;
    ttm_union: number;
    ttm_captured_total: number;
    ttm_share_of_captured_pct: number | null;
    ttm_by_sic: Record<string, number>;
    ttm_by_section: Record<string, number>;
    peak_month: string;
    peak_union: number;
    decade: {
      from_year: number;
      to_year: number;
      from_total: number;
      to_total: number;
      change_pct: number | null;
    };
  };
  insolvencies: {
    monthly: InsolvencyMonth[];
    annual: InsolvencyYear[];
  };
}

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
