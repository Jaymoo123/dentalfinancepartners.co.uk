/**
 * Types and formatters for the UK Charity Scrutiny Cliff-Edge Monitor.
 *
 * Data compiled by charities/pipeline/build_deep_research.py from the
 * Charity Commission full-register extract and committed as
 * charities/web/src/data/charity-scrutiny-cliff.json.
 */

export interface CliffEdgeRow {
  key: string;
  label: string;
  threshold: number;
  cliff_floor: number;
  charities_in_cliff: number;
  charities_just_crossed: number;
}

export interface ScrutinyCliffSnapshot {
  meta: {
    name: string;
    generated_at: string;
    jurisdiction: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
    notes: string;
  };
  headline: {
    active_charities_with_income: number;
    cliff_margin_pct: number;
  };
  cliff_edges: CliffEdgeRow[];
}

export const fmtNumber = (n: number) => n.toLocaleString("en-GB");
export const fmtGbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
