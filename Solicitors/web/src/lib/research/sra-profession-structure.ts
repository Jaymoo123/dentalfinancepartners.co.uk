/**
 * Types and loader for the UK Solicitor Profession Structure research asset.
 *
 * Data is a small curated table compiled from SRA Regulated Community
 * Statistics and Law Society Annual Statistics, committed as
 * Solicitors/web/src/data/sra-profession-structure.json. The page imports
 * that snapshot at build time (no runtime fetch).
 *
 * IMPORTANT: this asset describes the STOCK/structure of the SRA-regulated
 * profession (the roll, practising certificates, firm constitution mix). It
 * is NOT the Companies House new-incorporation FLOW. Do not conflate.
 */

// fmtNumber / fmtPercent / monthLabel already live in the incorporation-index
// lib; re-use them rather than duplicating.
export { fmtNumber, fmtPercent, monthLabel } from "./legal-incorporation-index";

export interface SraProfessionStructureSnapshot {
  meta: {
    name: string;
    jurisdiction: string;
    generated_at: string;
    data_through: string;
    coverage: string;
    licence_note: string;
    notes: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      licence: string;
      attribution?: string;
    }[];
  };
  roll: {
    on_the_roll: number;
    with_practising_certificate: number;
    not_practising: number;
    practising_pct: number;
    not_practising_pct: number;
    note: string;
  };
  firm_structure: {
    as_of: string;
    baseline_year: number;
    incorporated_pct_2011: number;
    incorporated_pct_latest: number;
    llp_pct_latest: number;
    partnership_pct_latest: number;
    note: string;
  };
  abs: {
    note: string;
  };
}
