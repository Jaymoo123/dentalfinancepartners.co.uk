/**
 * Types and formatters for the UK Care Business Survival Index research asset.
 *
 * Data is read from ONS Business Demography birth-cohort survival tables and
 * committed as care/web/src/data/uk-care-business-survival-index.json.
 */

export interface SurvivalCohort {
  birth_year: number;
  births: number | null;
  survival_pct: Record<string, number | null>;
}

export interface SurvivalSegment {
  sic_group: string;
  label: string;
  cohorts: SurvivalCohort[];
}

export interface SurvivalCurvePoint {
  year: number;
  survival_pct: number;
}

export interface CareSurvivalIndexSnapshot {
  meta: {
    title: string;
    description: string;
    generated_at: string;
    pull_date: string;
    licence: string;
    source: { name: string; publisher: string; url: string; release_date: string; licence: string };
    attribution: string;
    methodology: string;
    caveats: string[];
  };
  segments: SurvivalSegment[];
  headline: {
    sic_87_5yr_curve: SurvivalCurvePoint[];
    sic_88_5yr_curve: SurvivalCurvePoint[];
    combined_5yr_curve: SurvivalCurvePoint[];
    combined_2019_births: number | null;
    one_year_survival_trend: Record<string, { birth_year: number; survival_pct: number | null }[]>;
  };
}

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}
