/**
 * Types and formatters for the UK Hospitality Food Hygiene (FHRS/FHIS) map.
 *
 * Data is compiled by optimisation_engine/ingestion/ingest_hospitality_fsa_hygiene.py
 * from the live FSA Ratings API and committed as
 * hospitality/web/src/data/hospitality-fsa-hygiene-index.json.
 *
 * AGGREGATE ONLY: this asset never carries an establishment name, address or
 * FHRSID -- enforced at ingest time by a self-check assertion. Do not add
 * fields here that would require establishment-level data.
 */

export interface BusinessTypeSummary {
  key: string;
  label: string;
  total: number;
  rating_counts: Record<string, number>;
  fhrs_top_rating_share_pct: number | null;
}

export interface LocalAuthorityRow {
  local_authority: string;
  total_hospitality_establishments: number;
  rated_total: number;
  top_rating_5_share_pct: number | null;
  low_rating_0_or_1_share_pct: number | null;
}

export interface FsaHygieneIndexSnapshot {
  meta: {
    generated_at: string;
    pull_date: string;
    source: string;
    source_url: string;
    open_data_page: string;
    licence: string;
    coverage: string;
    business_types_included: Record<string, string>;
    business_types_excluded_note: string;
    min_sample_for_league_table: number;
    aggregation_rule: string;
    notes: string;
  };
  headline: {
    total_establishments: number;
    national_top_rating_5_share_pct: number | null;
    scotland_pass_rate_pct: number | null;
    local_authorities_covered: number;
    local_authorities_in_league_table: number;
  };
  business_types: BusinessTypeSummary[];
  local_authority_league_table: {
    top15_by_top_rating_share: LocalAuthorityRow[];
    bottom15_by_top_rating_share: LocalAuthorityRow[];
    top15_by_density: LocalAuthorityRow[];
  };
}

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}
