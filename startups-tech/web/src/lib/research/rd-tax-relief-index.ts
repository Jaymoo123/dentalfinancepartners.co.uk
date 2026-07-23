/**
 * Types and formatters for the R&D Tax Relief Usage Index research asset.
 *
 * Data is compiled from HMRC R&D Tax Credits Statistics (OGL v3.0) and
 * committed as startups-tech/web/src/data/rd-tax-relief-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface RdClaimsYearRow {
  year: string;
  status: string;
  smeDeductions: number | null;
  smePayableCredits: number | null;
  smeCombination: number | null;
  smeIntensives: number | null;
  smeTotal: number | null;
  largeCompanyScheme: number | null;
  rdecByLargeCompanies: number | null;
  rdecBySmes: number | null;
  lcRdecTotal: number | null;
  vaccinesResearchRelief: number | null;
  totalClaims: number | null;
  totalReturns: number | null;
  totalCompanies: number | null;
}

export interface RdCostYearRow {
  year: string;
  status: string;
  smeDeductionsM: number | null;
  smePayableCreditsM: number | null;
  smeTotalM: number | null;
  largeCompanySchemeM: number | null;
  rdecByLargeCompaniesM: number | null;
  rdecBySmesM: number | null;
  lcRdecTotalM: number | null;
  vaccinesResearchReliefM: number | null;
  totalCostM: number | null;
}

export interface RdExpenditureYearRow {
  year: string;
  status: string;
  smeSchemeM: number | null;
  largeCompanySchemeM: number | null;
  rdecByLargeCompaniesM: number | null;
  rdecBySmesM: number | null;
  vaccinesResearchReliefM: number | null;
  allSchemesM: number | null;
}

export interface RdSectorRow {
  sector: string;
  sectorFull: string;
  smeClaims: number | null;
  smeCostM: number | null;
  rdecLcClaims: number | null;
  rdecLcCostM: number | null;
  rdecSmeClaims: number | null;
  rdecSmeCostM: number | null;
  totalClaims: number | null;
  totalCostM: number | null;
  totalExpenditureM: number | null;
  claimsSharePct: number | null;
  costSharePct: number | null;
}

export interface RdRegionRow {
  region: string;
  totalClaims: number | null;
  totalCostM: number | null;
  totalExpenditureM: number | null;
  costSharePct: number | null;
}

export interface RdTaxReliefIndexSnapshot {
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
      { name: string; url: string; odsUrl?: string; licence: string; publisher: string; pullDate: string }
    >;
  };
  claimsSeries: RdClaimsYearRow[];
  costSeries: RdCostYearRow[];
  expenditureSeries: RdExpenditureYearRow[];
  sector: { rows: RdSectorRow[]; total: RdSectorRow | null };
  region: { rows: RdRegionRow[]; total: RdRegionRow | null };
  headline: {
    latestYear: string;
    totalClaims: number | null;
    yoyClaimsPct: number | null;
    totalCostM: number | null;
    totalExpenditureM: number | null;
    infoCommsClaims: number | null;
    infoCommsClaimsSharePct: number | null;
    infoCommsCostM: number | null;
    infoCommsCostSharePct: number | null;
    infoCommsClaimsRank: number;
    top3SectorsClaimsSharePct: number | null;
    top3SectorsCostSharePct: number | null;
  };
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "£7,555m" or "£7.6bn" style depending on magnitude. */
export function fmtGBPm(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n).toLocaleString("en-GB")}m`;
}

export function fmtGBPbn(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${(n / 1000).toFixed(1)}bn`;
}

/** "26%" style, no decimals for headline copy. Sign optional. */
export function fmtPercent0(n: number | null | undefined, showSign = false): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${Math.round(n)}%`;
}
