/**
 * Types and formatters for the UK Community Pharmacy Openings and Closures
 * Index research asset.
 *
 * Data is compiled from NHSBSA's Pharmacy Openings and Closures dataset
 * (monthly, owner-segmented) and Companies House SIC 47730 incorporations,
 * and committed as pharmacies/web/src/data/pharmacy-openings-closures-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface OpeningsClosuresMonth {
  month: string;
  date: string;
  total: number;
  total_excl_distance_sellers: number;
  distance_sellers: number;
  hundred_hour: number;
  small: number;
  medium: number;
  large: number;
  opened_excl_ds: number;
  closed_excl_ds: number;
  net_change_excl_ds: number;
  small_opened: number;
  small_closed: number;
  small_net: number;
  medium_opened: number;
  medium_closed: number;
  medium_net: number;
  large_opened: number;
  large_closed: number;
  large_net: number;
  distance_sellers_opened: number;
  distance_sellers_closed: number;
  distance_sellers_net: number;
}

export interface AnnualSnapshotRow {
  year: number;
  month: string;
  monthLabel: string;
  total: number;
  small: number;
  medium: number;
  large: number;
  hundredHour: number;
  distanceSellers: number;
}

export interface ChFormationsMonth {
  month: string;
  "47730": number;
  union: number;
}

export interface ChFormationsYear {
  year: number;
  "47730": number;
  union: number;
}

export interface Seasonality {
  monthNum: number;
  monthName: string;
  avgCount: number;
  yearsOfData: number;
}

export interface PharmacyOpeningsClosuresSnapshot {
  meta: {
    title: string;
    description: string;
    lastUpdated: string;
    pullDate: string;
    licence: string;
    citeAs: string;
    methodology: string;
    caveats: string[];
    sources: {
      nhsbsa_openings_closures: { name: string; url: string; resource: string; licence: string; publisher: string; pullDate: string };
      companies_house: { name: string; url: string; licence: string; publisher: string; pullDate: string };
    };
  };
  headline: {
    latestMonth: string;
    latestMonthLabel: string;
    latestTotal: number;
    latestTotalLabel: string;
    latestTotalExclDS: number;
    latestSmall: number;
    latestMedium: number;
    latestLarge: number;
    latestHundredHour: number;
    latestDistanceSellers: number;
    yoyChange: number | null;
    yoyChangeLabel: string | null;
    yoyPeriod: string | null;
    baselineChange: number;
    baselineChangeLabel: string;
    baselinePeriod: string;
    baselineFromTotal: number;
  };
  monthly: OpeningsClosuresMonth[];
  annualSnapshot: AnnualSnapshotRow[];
  companiesHouseSIC47730: {
    description: string;
    sicCode: number;
    sicLabel: string;
    activeCompanies: { count: number; asOf: string; label: string };
    dissolvedCompanies: { count: number; asOf: string; label: string };
    sourceUrl: string;
    monthly: ChFormationsMonth[];
    annual: ChFormationsYear[];
    lastSettledMonth: string;
    ttm: number;
    yoyPct: number | null;
    decade: {
      from_year: number;
      to_year: number;
      from_value: number;
      to_value: number;
      multiple: number | null;
      change_pct: number | null;
    };
    seasonality: Seasonality[];
    peakMonth: string;
    peakValue: number;
    provisionalMonths: string[];
    caveat: string;
  };
  networkContext: {
    englandFocus: boolean;
    scotlandWalesNote: string;
    fundingContext: string;
    ownershipNote: string;
  };
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-03" -> "Mar 2026". */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y}`;
}

/** "2026-03" -> "Mar 26" (compact, for dense axes). */
export function monthLabelShort(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y.slice(2)}`;
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "+4.0%" style percent string. */
export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

/** "+123" / "-45" style signed integer string. */
export function fmtSignedInt(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  return `${sign}${Math.abs(Math.round(n)).toLocaleString("en-GB")}`;
}
