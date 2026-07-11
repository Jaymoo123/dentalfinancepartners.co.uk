/**
 * Types + formatters for the UK Small Charity Finance Index research asset.
 *
 * Data is compiled by charities/pipeline/build_finance_index.py from the
 * Charity Commission full-register extract and Companies House bulk data,
 * and committed as charities/web/src/data/uk-small-charity-finance-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface FinanceIndexSnapshot {
  meta: {
    name: string;
    generated_at: string;
    jurisdiction: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
    thresholds: {
      registration: number;
      independent_examination: number;
      accruals_qualified_examiner: number;
      audit: number;
    };
    notes: string;
  };
  charities: {
    registered_charities: number;
    removed_charities_on_register: number;
    with_reported_income: number;
    income: { median: number; mean: number; p25: number; p75: number; p90: number };
    scrutiny_bands: { key: string; label: string; count: number; pct: number }[];
    headline_shares: { under_25k_pct: number; ie_band_pct: number; audit_band_pct: number };
    flows: { year: number; registrations: number; removals: number; net: number }[];
  };
  cics: {
    source_file: string;
    total_cics_on_register: number;
    active_cics: number;
    incorporations_by_year: { year: number; count: number }[];
  } | null;
}

export const fmtNumber = (n: number) => n.toLocaleString("en-GB");
export const fmtGbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
export const fmtPct = (n: number) => `${n}%`;
