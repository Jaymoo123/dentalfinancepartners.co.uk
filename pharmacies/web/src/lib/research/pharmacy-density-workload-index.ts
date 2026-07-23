/**
 * Types and formatters for the Pharmacy Density and Dispensing Workload Index.
 *
 * Two datasets, both committed as JSON under pharmacies/web/src/data/:
 *   - pharmacy-density-by-region.json (NHSBSA Contractor Details + ONS/Nomis population)
 *   - pharmacy-dispensing-workload.json (NHSBSA dispensing data, annual March snapshot)
 */

export interface RegionDensityRow {
  region: string;
  pharmacy_count: number;
  population: number;
  population_year: string;
  ons_regions: string[];
  per_100k: number;
}

export interface PharmacyDensitySnapshot {
  source: { name: string; url: string; resource_title: string; licence: string; publisher: string };
  population_source: { name: string; url: string; licence: string; publisher: string; year: string };
  regions: RegionDensityRow[];
  england_total_pharmacies: number;
  england_total_population: number;
  england_per_100k: number;
  non_england_or_channel_islands: Record<string, number>;
  pull_date: string;
}

export interface WorkloadYearRow {
  year: number;
  month: string;
  total_items: number;
  pharmacy_count: number;
  items_per_pharmacy: number;
}

export interface PharmacyWorkloadSnapshot {
  source: { name: string; url: string; resource_title: string; licence: string; publisher: string };
  annual_march_snapshot: WorkloadYearRow[];
  pull_date: string;
  methodology: string;
}

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
