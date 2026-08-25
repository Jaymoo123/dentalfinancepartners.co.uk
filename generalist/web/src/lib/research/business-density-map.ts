/**
 * Types for the UK Business Density Map.
 *
 * Data is compiled by
 * optimisation_engine/ingestion/ingest_generalist_business_density.py
 * and committed as generalist/web/src/data/uk-business-density-map.json.
 */

export interface DensityRegion {
  region: string;
  resident_adults: number;
  density_per_10k_adults: number;
  businesses: number;
  pct_zero_employees: number;
  pct_1_to_49_employees: number;
  pct_50_to_249_employees: number;
  pct_250_plus_employees: number;
}

export interface BusinessDensityMapSnapshot {
  meta: {
    generated_at: string;
    as_of: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      release_page: string;
      licence: string;
      retrieved: string;
    }[];
    notes: string;
    attribution: string;
  };
  headline: {
    uk_density_per_10k_adults: number;
    uk_total_businesses: number;
    highest_region: string;
    highest_density_per_10k_adults: number;
    lowest_region: string;
    lowest_density_per_10k_adults: number;
    density_ratio_highest_to_lowest: number;
    as_of: string;
  };
  regions: DensityRegion[];
}
