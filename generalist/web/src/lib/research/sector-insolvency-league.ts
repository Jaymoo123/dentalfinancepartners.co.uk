/**
 * Types for the UK Sector Insolvency League.
 *
 * Data is compiled by
 * optimisation_engine/ingestion/ingest_generalist_sector_insolvency_league.py
 * and committed as generalist/web/src/data/uk-sector-insolvency-league.json.
 */

export interface SectorAnnual {
  year: number;
  total: number;
}

export interface SectorRow {
  code: string;
  label: string;
  annual: SectorAnnual[];
  ttm_total: number;
  ttm_share_pct: number | null;
  decade_from_year: number;
  decade_to_year: number;
  decade_change_pct: number | null;
}

export interface SectorInsolvencyLeagueSnapshot {
  meta: {
    generated_at: string;
    data_through: string;
    coverage: string;
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
    data_through: string;
    ttm_total_all_sectors: number;
    ttm_unclassified: number;
    top_sector_code: string;
    top_sector_label: string;
    top_sector_ttm: number;
    top_sector_share_pct: number | null;
    n_sections_ranked: number;
    coverage: string;
  };
  sections: SectorRow[];
}
