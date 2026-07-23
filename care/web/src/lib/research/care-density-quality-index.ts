/**
 * Types and formatters for the UK Care Home Density & Quality Index research asset.
 *
 * Data is compiled from CQC open data (HSCA Active Locations, Deactivated Locations,
 * ratings by domain) cross-referenced with ONS mid-2024 (MYE24) population estimates,
 * and committed as care/web/src/data/uk-care-density-quality-index.json. The page
 * imports that snapshot at build time (no runtime fetch).
 */

export type RatingBand = "Outstanding" | "Good" | "Requires improvement" | "Inadequate" | "Not yet rated";

export interface RatingPct {
  Outstanding: number;
  Good: number;
  "Requires improvement": number;
  Inadequate: number;
  "Not yet rated": number;
}

export interface RegionRow {
  region: string;
  active_care_homes: number;
  beds_total: number;
  dormant_care_homes: number;
  population_65_plus: number | null;
  population_total: number | null;
  beds_per_100_over65: number | null;
  care_homes_per_100k_over65: number | null;
  rating_pct: RatingPct;
  good_or_above_pct: number | null;
  deactivations_12m: number;
  beds_lost_12m: number;
  churn_rate_pct: number | null;
}

export interface LocalAuthorityRow {
  local_authority: string;
  active_care_homes: number;
  beds_total: number;
  population_65_plus: number | null;
  population_total: number | null;
  beds_per_100_over65: number | null;
  good_or_above_pct: number | null;
  deactivations_12m: number;
  churn_rate_pct: number | null;
}

export interface DomainRating {
  rating_pct: RatingPct;
  good_or_above_pct: number | null;
}

export interface CareDensityQualitySnapshot {
  meta: {
    title: string;
    description: string;
    coverage: string;
    generated_at: string;
    pull_date: string;
    churn_window: { from: string; to: string };
    licence: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      licence: string;
      cadence?: string;
      vintage?: string;
    }[];
    attribution: string;
    methodology: string;
    caveats: string[];
  };
  national: {
    active_care_homes: number;
    beds_total: number;
    dormant_care_homes: number;
    population_65_plus: number;
    beds_per_100_over65: number | null;
    rating_pct: RatingPct;
    good_or_above_pct: number | null;
    deactivations_12m: number;
    beds_lost_12m: number;
    churn_rate_pct: number | null;
  };
  domain_ratings: Record<string, DomainRating>;
  regions: RegionRow[];
  care_deserts: LocalAuthorityRow[];
  best_provided_local_authorities: LocalAuthorityRow[];
  local_authorities: LocalAuthorityRow[];
  rating_bands: RatingBand[];
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "4.4%" style. */
export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}

/** "24 Jul 2026" from an ISO date string. */
export function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const DOMAIN_ORDER = ["Safe", "Effective", "Caring", "Responsive", "Well-led"];

export function sortedDomains(domainRatings: Record<string, DomainRating>): [string, DomainRating][] {
  return DOMAIN_ORDER.filter((d) => domainRatings[d]).map((d) => [d, domainRatings[d]]);
}
