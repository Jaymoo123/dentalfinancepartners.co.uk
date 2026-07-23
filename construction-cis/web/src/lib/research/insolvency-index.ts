/**
 * Types and formatters for the UK Construction Insolvency Index research asset.
 *
 * Data is compiled from Insolvency Service record-level data and committed as
 * construction-cis/web/src/data/construction-insolvency-index.json.
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

export interface InsolvencyDivisionMonth {
  month: string;
  div41: number;
  div42: number;
  div43: number;
  total: number;
}

export interface InsolvencyDivisionYear {
  year: number;
  div41: number;
  div42: number;
  div43: number;
  total: number;
}

export interface InsolvencyDivisionHeadline {
  last_month: string;
  last_month_by_division: { div41: number; div42: number; div43: number };
  ttm_by_division: { div41: number; div42: number; div43: number };
  ttm_total: number;
  ttm_share_pct: { div41: number | null; div42: number | null; div43: number | null };
  decade_from_year: number;
  decade_to_year: number;
  decade_change_pct_by_division: { div41: number | null; div42: number | null; div43: number | null };
}

export interface InsolvencyIndexSnapshot {
  meta: {
    generated_at: string;
    data_through: string;
    coverage: string;
    sic_section: string;
    sic_section_label: string;
    division_labels: Record<string, string>;
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
  divisions: {
    headline: InsolvencyDivisionHeadline;
    monthly: InsolvencyDivisionMonth[];
    annual: InsolvencyDivisionYear[];
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
