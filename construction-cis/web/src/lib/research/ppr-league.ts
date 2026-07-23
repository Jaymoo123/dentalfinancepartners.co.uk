/**
 * Types and formatters for the UK Construction Payment Practices League.
 *
 * Data is compiled by
 * optimisation_engine/ingestion/ingest_construction_ppr_league.py from the
 * Payment Practices Reporting (PPR) service's full CSV export, cross-checked
 * against Companies House SIC codes, and committed as
 * construction-cis/web/src/data/construction-ppr-league.json.
 */

export interface PprCompanyRow {
  name: string;
  company_number: string;
  end: string; // reporting period end date, "YYYY-MM-DD"
  atp: number; // average time to pay, days (statutory self-reported figure)
  pct_within_30: string;
  pct_31_60: string;
  pct_later_60: string;
  pct_not_agreed_terms: string;
  retention_clauses_all: string;
  shortest_term_days: string;
  longest_term_days: string;
  n_filings: number;
  sic_code: string | null;
  sic_label: string;
}

export interface PprLeagueSnapshot {
  meta: {
    generated_at: string;
    source_url: string;
    release_page: string;
    regulations_page: string;
    current_cohort_cutoff: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      release_page?: string;
      licence: string;
      retrieved?: string;
      attribution: string;
    }[];
    notes: string;
    attribution: string;
  };
  headline: {
    n_companies: number;
    mean_days_to_pay: number | null;
    median_days_to_pay: number | null;
    slowest: PprCompanyRow | null;
    fastest: PprCompanyRow | null;
  };
  companies: PprCompanyRow[];
}

/** "2026-03-31" -> "31 Mar 2026". */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const mi = Number(m) - 1;
  if (!y || !d || mi < 0 || mi > 11) return iso;
  return `${Number(d)} ${months[mi]} ${y}`;
}

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}
