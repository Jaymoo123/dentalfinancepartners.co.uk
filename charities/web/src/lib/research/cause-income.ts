/**
 * Types and formatters for the UK Charity Cause Income and Reserves Health Index.
 *
 * Data compiled by charities/pipeline/build_deep_research.py from the
 * Charity Commission full-register extract and committed as
 * charities/web/src/data/charity-cause-income.json.
 */

export interface CauseIncomeRow {
  cause_code: number;
  cause_label: string;
  charity_count: number;
  median_income: number;
  median_reserves_months: number | null;
  under_3_months_reserves_pct: number | null;
}

export interface CauseIncomeSnapshot {
  meta: {
    name: string;
    generated_at: string;
    jurisdiction: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
    notes: string;
  };
  cause_income: CauseIncomeRow[];
}

export const fmtNumber = (n: number) => n.toLocaleString("en-GB");
export const fmtGbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
