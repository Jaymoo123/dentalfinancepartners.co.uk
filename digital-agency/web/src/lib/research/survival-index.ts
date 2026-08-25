/**
 * Types and formatters for the UK Agency Survival & Churn Index (FLAGSHIP
 * research asset).
 *
 * Data is compiled from ONS Business Demography Tables 5.2a-5.2e via
 * digital-agency/pipeline/build_agency_survival_index.py and committed as
 * digital-agency/web/src/data/uk-agency-survival-churn-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface SurvivalStats {
  births: number | null;
  y1_count: number | null;
  y1_pct: number | null;
  y2_count: number | null;
  y2_pct: number | null;
  y3_count: number | null;
  y3_pct: number | null;
  y4_count: number | null;
  y4_pct: number | null;
  y5_count: number | null;
  y5_pct: number | null;
}

export interface SurvivalCohortRow {
  birth_year: number;
  advertising: SurvivalStats;
  market_research: SurvivalStats;
  design: SurvivalStats;
  it_consultancy: SurvivalStats;
  management_consultancy_context: SurvivalStats;
  all_industries: SurvivalStats;
  agency_combined: SurvivalStats;
}

export interface SurvivalIndexSnapshot {
  meta: {
    title: string;
    description: string;
    generated_at: string;
    pull_date: string;
    licence: string;
    source: {
      name: string;
      publisher: string;
      url: string;
      release_date: string;
      licence: string;
    };
    attribution: string;
    methodology: string;
    caveats: string[];
  };
  cohorts: SurvivalCohortRow[];
  headline: {
    latest_5yr_cohort_year: number;
    latest_5yr_agency_pct: number | null;
    latest_5yr_all_industries_pct: number | null;
    latest_5yr_advertising_pct: number | null;
    latest_5yr_market_research_pct: number | null;
    latest_5yr_design_pct: number | null;
    latest_5yr_it_consultancy_pct: number | null;
    latest_1yr_cohort_year: number;
    latest_1yr_agency_pct: number | null;
    latest_1yr_all_industries_pct: number | null;
    agency_combined_births_2019: number | null;
  };
  segments_meta: { code: string; key: string; label: string; isolable: boolean }[];
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "43.3%" style string, "n/a" for missing (not-yet-elapsed) years. */
export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}

/** Points-difference string, e.g. "+4.9pp" / "-2.1pp". */
export function fmtPointsDiff(a: number | null | undefined, b: number | null | undefined): string {
  if (a === null || a === undefined || b === null || b === undefined) return "n/a";
  const diff = a - b;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${diff.toFixed(1)}pp`;
}
