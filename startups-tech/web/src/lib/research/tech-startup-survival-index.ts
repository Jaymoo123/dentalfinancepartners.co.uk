/**
 * Types and formatters for the UK Tech Startup Survival Curves research asset.
 *
 * Data is compiled from ONS Business Demography reference tables (OGL v3.0)
 * and committed as startups-tech/web/src/data/tech-startup-survival-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface SurvivalPoint {
  count: number;
  pct: number;
}

export interface CohortRow {
  cohortYear: string;
  techBirths: number;
  allIndustryBirths: number;
  techSurvival: Record<string, SurvivalPoint>;
  allIndustrySurvival: Record<string, SurvivalPoint>;
}

export interface SectorTwoYearRow {
  industry: string;
  births: number;
  oneYearSurvivalPct: number | null;
  twoYearSurvivalPct: number | null;
}

export interface TechStartupSurvivalIndexSnapshot {
  meta: {
    title: string;
    description: string;
    pullDate: string;
    lastUpdated: string;
    licence: string;
    citeAs: string;
    methodology: string;
    caveats: string[];
    sources: Record<
      string,
      { name: string; url: string; datasetUrl?: string; xlsxUrl?: string; licence: string; publisher: string; pullDate: string }
    >;
  };
  cohortSeries: CohortRow[];
  sectorTwoYear: { cohortYear: string; rows: SectorTwoYearRow[] };
  headline: {
    fullFiveYearCohort: string;
    techFiveYearSurvivalPct: number | null;
    allIndustryFiveYearSurvivalPct: number | null;
    latestCohortYear: string;
    techOneYearSurvivalPctLatest: number | null;
  };
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "37%" style, no decimals for headline copy. */
export function fmtPercent0(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${Math.round(n)}%`;
}

/** "37.0%" style, one decimal for tables. */
export function fmtPercent1(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}
