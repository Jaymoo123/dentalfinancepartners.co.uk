/**
 * Types and formatters for the Online Seller Survival Index research asset.
 *
 * Data is compiled from ONS Business Demography Table 4.2 (survival of
 * newly-born enterprises by broad industry group, "Retail") and committed as
 * ecommerce/web/src/data/online-seller-survival-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface SurvivalCohortStats {
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
  retail: SurvivalCohortStats;
  all_industries: SurvivalCohortStats;
}

export interface SurvivalIndexSnapshot {
  meta: {
    generated_at: string;
    source_url: string;
    release_page: string;
    release_date: string;
    publisher: string;
    licence: string;
    broad_group: string;
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
    latest_5yr_cohort_year: number | null;
    latest_5yr_retail_pct: number | null;
    latest_5yr_all_industries_pct: number | null;
    latest_1yr_cohort_year: number | null;
    latest_1yr_retail_pct: number | null;
    latest_1yr_all_industries_pct: number | null;
  };
  cohorts: SurvivalCohortRow[];
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
