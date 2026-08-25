/**
 * Types and formatters for the UK Charity Survival and Longevity Index.
 *
 * Data compiled by charities/pipeline/build_deep_research.py from the
 * Charity Commission full-register extract and committed as
 * charities/web/src/data/charity-survival-index.json.
 */

export interface SurvivalCohortRow {
  cohort_year: number;
  registered: number;
  removed: number;
  active: number;
  survival_rate_pct: number | null;
  median_age_at_removal_years: number | null;
}

export interface IncomeBandSurvivalRow {
  key: string;
  label: string;
  removed_count: number;
  median_age_at_removal_years: number | null;
}

export interface SurvivalIndexSnapshot {
  meta: {
    name: string;
    generated_at: string;
    jurisdiction: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
    notes: string;
  };
  headline: {
    total_main_charities: number;
    total_active: number;
    total_removed: number;
    median_age_at_removal_years: number | null;
  };
  cohort_survival: SurvivalCohortRow[];
  income_band_survival: IncomeBandSurvivalRow[];
}

export const fmtNumber = (n: number) => n.toLocaleString("en-GB");
export const fmtGbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
export const fmtPct = (n: number) => `${n}%`;
