/**
 * Types and formatters for the Law Firm Survival Index research asset.
 *
 * Data is from ONS Business Demography 2024 (SIC 691 Legal activities),
 * committed as Solicitors/web/src/data/legal-survival-index.json.
 */

export interface SurvivalCohort {
  birth_year: number;
  sic_691_label: string;
  sic_691_births: number;
  sic_691_1yr_pct: number | null;
  sic_691_2yr_pct: number | null;
  sic_691_3yr_pct: number | null;
  sic_691_4yr_pct: number | null;
  sic_691_5yr_pct: number | null;
  sic_69_label: string;
  sic_69_births: number;
  sic_69_1yr_pct: number | null;
  sic_69_2yr_pct: number | null;
  sic_69_3yr_pct: number | null;
  sic_69_4yr_pct: number | null;
  sic_69_5yr_pct: number | null;
  all_industry_births: number | null;
  all_industry_1yr_pct: number | null;
  all_industry_2yr_pct: number | null;
  all_industry_3yr_pct: number | null;
  all_industry_4yr_pct: number | null;
  all_industry_5yr_pct: number | null;
}

export interface LegalSurvivalSnapshot {
  meta: {
    generated_at: string;
    source_name: string;
    source_url: string;
    source_file: string;
    source_release: string;
    licence: string;
    licence_url: string;
    sic_note: string;
    coverage_note: string;
    all_industry_note: string;
  };
  headline: {
    legal_activities_1yr_pct_2019: number;
    legal_activities_3yr_pct_2019: number;
    legal_activities_5yr_pct_2019: number;
    all_industry_1yr_pct_2019: number;
    all_industry_3yr_pct_2019: number;
    all_industry_5yr_pct_2019: number;
    professional_sci_tech_1yr_pct_2019: number;
    professional_sci_tech_3yr_pct_2019: number;
    professional_sci_tech_5yr_pct_2019: number;
  };
  survival_by_cohort: SurvivalCohort[];
}

/** Format a survival percentage */
export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}

/** Thousands-separated integer */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}
