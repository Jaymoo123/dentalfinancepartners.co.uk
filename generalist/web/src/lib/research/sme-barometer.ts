/**
 * Types for the UK Small Business Barometer (generalist flagship).
 *
 * Data is compiled by optimisation_engine/ingestion/ingest_generalist_sme_barometer.py
 * and committed as generalist/web/src/data/uk-small-business-barometer.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface BarometerSource {
  name: string;
  publisher: string;
  url: string;
  release_page: string;
  licence: string;
  retrieved: string;
  coverage?: string;
}

export interface BarometerQuarter {
  quarter_end: string;
  incorporations: number;
  dissolutions: number;
  net: number;
  register_total: number;
  register_effective: number;
}

export interface BarometerSeasonality {
  calendar_quarter: string;
  avg_incorporations: number;
}

export interface BarometerInsolvencyMonth {
  month: string;
  total: number;
}

export interface BarometerInsolvencyYear {
  year: number;
  total: number;
}

export interface BarometerSurvivalCohort {
  birth_year: number;
  births: number | null;
  y1_pct: number | null;
  y2_pct: number | null;
  y3_pct: number | null;
  y4_pct: number | null;
  y5_pct: number | null;
}

export interface BarometerPopulationYear {
  year: number;
  total: number;
}

export interface SmeBarometerSnapshot {
  meta: {
    generated_at: string;
    sources: BarometerSource[];
    notes: string;
    attribution: string;
  };
  headline: {
    incorporations: {
      fye_label: string;
      incorporations_fye: number;
      dissolutions_fye: number;
      incorporations_yoy_pct: number | null;
      dissolutions_yoy_pct: number | null;
      register_total: number;
      register_effective: number;
      register_yoy_pct: number | null;
      as_of: string;
    };
    insolvency: {
      last_settled_month: string;
      last_month_total: number;
      yoy_pct: number | null;
      ttm_total: number;
      coverage: string;
      cvl_pct_last_month: number | null;
      cvl_pct_ttm: number | null;
    };
    survival: {
      latest_5yr_cohort_year: number | null;
      latest_5yr_pct: number | null;
      latest_1yr_cohort_year: number | null;
      latest_1yr_pct: number | null;
    };
    population: {
      total_businesses: number;
      as_of_start_year: number;
      yoy_pct: number;
      yoy_abs: number;
      sme_pct: number;
      no_employees_pct: number;
      companies_count: number;
      companies_pct: number;
      sole_proprietorships_count: number;
      sole_proprietorships_pct: number;
      partnerships_count: number;
      partnerships_pct: number;
    };
  };
  register: {
    quarterly: BarometerQuarter[];
    seasonality: BarometerSeasonality[];
  };
  insolvency: {
    monthly: BarometerInsolvencyMonth[];
    annual: BarometerInsolvencyYear[];
  };
  survival: {
    cohorts: BarometerSurvivalCohort[];
  };
  population: {
    timeseries: BarometerPopulationYear[];
  };
}
