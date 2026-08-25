/**
 * Types for the UK Construction Net Formation Index (a section within the UK
 * Construction Index page, not a standalone page -- net formation is the same
 * asset seen from the incorporations-minus-dissolutions angle).
 *
 * Data is compiled by optimisation_engine/ingestion/ingest_construction_net_formation.py
 * and committed as construction-cis/web/src/data/construction-net-formation-index.json.
 * Incorporations are reused from uk-construction-index.json (same Companies
 * House source); only dissolutions are fetched fresh via Companies House
 * Advanced Search (company_status=dissolved).
 */

export type NetFormationSegmentKey = "union" | "div41" | "div42" | "div43" | "primary_41202";

export type NetFormationAnnualRow = {
  year: number;
} & {
  [K in `${NetFormationSegmentKey}_${"inc" | "diss" | "net"}`]: number;
};

export interface NetFormationPartialYear {
  year: number;
  incorporations_settled_through: string;
  union_diss_ytd: number;
  union_inc_ytd?: number;
  union_net_ytd?: number;
  div41_diss_ytd: number;
  div42_diss_ytd: number;
  div43_diss_ytd: number;
  primary_41202_diss_ytd: number;
  primary_41202_inc_ytd?: number;
  primary_41202_net_ytd?: number;
}

export interface NetFormationIndexSnapshot {
  meta: {
    generated_at: string;
    coverage: string;
    incorporations_source: string;
    dissolutions_source: string;
    sources: { name: string; publisher: string; url: string; licence: string; attribution: string }[];
    segment_labels: Record<NetFormationSegmentKey, string>;
    notes: string;
    attribution: string;
  };
  headline: {
    from_year: number;
    to_year: number;
    union_net_from: number;
    union_net_to: number;
    union_net_change_pct: number | null;
    primary_net_from: number;
    primary_net_to: number;
    primary_first_negative_year: number | null;
    union_first_negative_year: number | null;
  };
  annual: NetFormationAnnualRow[];
  partial_current_year: NetFormationPartialYear | null;
}
