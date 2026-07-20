/**
 * Types and formatters for the Dental Practice Density research asset.
 *
 * Data is compiled from the CQC Care Directory (monthly release) combined with
 * ONS mid-2024 population estimates, committed as
 * Dentists/web/src/data/dental-practice-density.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface DensityRegion {
  region: string;
  dental_locations: number;
  population: number | null;
  per_100k: number | null;
  top_local_authorities: Array<{
    local_authority: string;
    count: number;
  }>;
}

export interface DentalPracticeDensitySnapshot {
  meta: {
    generated_at: string;
    cqc_data_date: string;
    coverage: string;
    population_reference: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      portal: string;
      licence: string;
      retrieved: string;
      attribution: string;
    }[];
    notes: string;
  };
  headline: {
    total_dental_locations: number;
    england_per_100k: number | null;
    england_population: number | null;
    highest_density_region: string | null;
    highest_density_per_100k: number | null;
    lowest_density_region: string | null;
    lowest_density_per_100k: number | null;
  };
  regions: DensityRegion[];
}

/** "24.59" -> "24.6" */
export function fmtDensity(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return n.toFixed(1);
}

/** Thousands-separated en-GB integer. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}
