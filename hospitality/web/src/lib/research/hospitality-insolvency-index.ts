/**
 * Types and formatters for the UK Hospitality Insolvency Index research asset.
 *
 * Data is compiled by optimisation_engine/ingestion/ingest_hospitality_insolvency.py
 * from Insolvency Service record-level data (SIC Section I) and ONS Business
 * Demography Table 4.2 (survival by broad industry group), and committed as
 * hospitality/web/src/data/hospitality-insolvency-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface InsolvencyMonth {
  month: string;
  total: number;
  cvl: number;
  compulsory: number;
  administration: number;
  administration_to_cvl: number;
  cva: number;
  receivership: number;
  moratorium: number;
}

export interface InsolvencyYear {
  year: number;
  total: number;
  cvl: number;
  compulsory: number;
  administration: number;
  administration_to_cvl: number;
  cva: number;
  receivership: number;
  moratorium: number;
}

export interface SurvivalCohort {
  cohort_year: number;
  births: number;
  survival_1yr_count: number | null;
  survival_1yr_pct: number | null;
  survival_2yr_count: number | null;
  survival_2yr_pct: number | null;
  survival_3yr_count: number | null;
  survival_3yr_pct: number | null;
  survival_4yr_count: number | null;
  survival_4yr_pct: number | null;
  survival_5yr_count: number | null;
  survival_5yr_pct: number | null;
  all_industry_1yr_pct: number | null;
  all_industry_2yr_pct: number | null;
  all_industry_3yr_pct: number | null;
  all_industry_4yr_pct: number | null;
  all_industry_5yr_pct: number | null;
}

export interface HospitalityInsolvencyIndexSnapshot {
  meta: {
    generated_at: string;
    data_through: string;
    coverage: string;
    sic_section: string;
    sic_section_label: string;
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
    last_month_total: number;
    last_month_cvl: number;
    last_month_compulsory: number;
    last_month_administration: number;
    yoy_pct: number | null;
    ttm_total: number;
    peak_month: string;
    peak_total: number;
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
  survival: {
    cohorts: SurvivalCohort[];
    latest_full_cohort_year: number | null;
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

/** "38.1%" -- one decimal place, no sign, "n/a" for null (suppressed ONS cells). */
export function fmtSurvivalPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}
