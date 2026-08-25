/**
 * Types and formatters for the UK Tech-Funding Reliefs Index (SEIS/EIS) research asset.
 *
 * Data is compiled from HMRC EIS/SEIS statistics (OGL v3.0) and committed as
 * startups-tech/web/src/data/uk-tech-funding-reliefs-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface SchemeYearRow {
  year: string;
  companiesFirstTime: number;
  companiesAll: number;
  subscriptions: number;
  amountFirstTimeM?: number | null;
  amountKicsM?: number | null;
  amountAllM: number | null;
  kicsRaisingFunds?: number;
}

export interface SectorRow {
  industry: string;
  industryFull: string;
  companiesByYear: Record<string, number>;
  amountMByYear: Record<string, number | null>;
  amountSharePctLatest: number | null;
}

export interface SectorBlock {
  years: string[];
  rows: SectorRow[];
  totalAmountMLatest: number;
  totalCompaniesLatest: number;
}

export interface RegionRow {
  region: string;
  companiesByYear: Record<string, number | null>;
  amountMByYear: Record<string, number | null>;
  amountSharePctLatest: number | null;
}

export interface RegionBlock {
  years: string[];
  rows: RegionRow[];
  totalAmountMLatest: number | null;
  londonSouthEastAmountMLatest: number;
  londonSouthEastSharePctLatest: number | null;
}

export interface AarYearRow {
  year: string;
  companiesSeekingAAR: number;
  applicationsReceived: number;
  approvedSameYear: number;
  rejectedSameYear: number;
  pendingOrNotPursued: number;
  approvedSubsequentYears: number;
  rejectedSubsequentYears: number;
}

export interface AarBlock {
  years: AarYearRow[];
  latestYear: string;
  latestApprovedSameYearPct: number | null;
}

export interface SchemeBlock {
  timeSeries: SchemeYearRow[];
  bySector: SectorBlock;
  byRegion: RegionBlock;
  aar: AarBlock;
  latest: {
    year: string;
    companiesAll: number;
    amountAllM: number | null;
    infoCommsAmountM: number | null;
    infoCommsSharePct: number | null;
  };
}

export interface TechFundingRefiefsIndexSnapshot {
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
  eis: SchemeBlock;
  seis: SchemeBlock;
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "£1,575m" style. */
export function fmtGBPm(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n).toLocaleString("en-GB")}m`;
}

/** "35%" style, no decimals for headline copy. */
export function fmtPercent0(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${Math.round(n)}%`;
}
