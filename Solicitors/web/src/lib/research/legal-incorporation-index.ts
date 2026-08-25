/**
 * Types and formatters for the UK Legal Incorporation Index research asset.
 *
 * Data is compiled from the Companies House Advanced Search API and SRA
 * Regulated Community Statistics, committed as
 * Solicitors/web/src/data/uk-legal-incorporation-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface IncorporationMonth {
  month: string;
  total: number;
  ltd: number;
  ltd_share_pct: number | null;
}

export interface IncorporationYear {
  year: number;
  total: number;
  ltd: number;
  ltd_share_pct: number | null;
}

export interface SraSnapshot {
  year: number;
  month: string;
  sole_pct: number;
  partnership_pct: number;
  incorporated_pct: number;
  llp_pct: number;
  other_pct: number;
  total: number;
  sole: number;
  partnership: number;
  incorporated: number;
  llp: number;
}

export interface LegalIncorporationIndexSnapshot {
  meta: {
    generated_at: string;
    data_through: string;
    coverage: string;
    sic_codes: string;
    sic_label: string;
    method: string;
    note_on_llp: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      licence: string;
      licence_url?: string;
      attribution?: string;
    }[];
  };
  headline: {
    ttm_total: number;
    ttm_ltd: number;
    ttm_ltd_share_pct: number | null;
    period_change_pct: number | null;
    from_year: number;
    to_year: number;
    from_total: number;
    to_total: number;
    sra_incorporated_2011_pct: number;
    sra_incorporated_latest_pct: number;
    sra_incorporated_latest_year: number;
    sra_incorporated_latest_month: string;
    sra_llp_latest_pct: number;
    sra_total_firms_latest: number;
  };
  incorporations: {
    monthly: IncorporationMonth[];
    annual: IncorporationYear[];
  };
  sra_structure_series: SraSnapshot[];
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

/** "2026-03" -> "Mar 26" (compact for dense axes) */
export function monthLabelShort(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y.slice(2)}`;
}

/** Thousands-separated en-GB integer */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** Percent string, sign optional */
export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
