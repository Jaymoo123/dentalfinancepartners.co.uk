/**
 * Types and formatters for the Care Company Formation Index (Companies House, monthly).
 *
 * Data is compiled by the shared research-ingestion engine
 * (optimisation_engine/ingestion/research/engine.py + niches/care.py) and committed as
 * care/web/src/data/uk-care-company-formation-index.json. This snapshot powers the
 * "Company formations and seasonality" section folded into the existing
 * /research/care-provider-business-index page (it does not have its own URL).
 */

export interface FormationMonthRow {
  month: string;
  [sicOrUnion: string]: string | number;
}

export interface FormationSegment {
  key: string;
  label: string;
  sic_codes: string[];
  is_primary: boolean;
  monthly: { month: string; count: number }[];
  annual: { year: number; count: number }[];
  last_settled_month: string | null;
  settled_value: number | null;
  yoy_pct: number | null;
  ttm: number | null;
  peak_month: string | null;
  peak_value: number;
  thin_segment: boolean;
}

export interface CareFormationIndexSnapshot {
  meta: {
    generated_at: string;
    incorporations_through: string;
    incorporations_settled_through: string | null;
    provisional_months: string[];
    sic_labels: Record<string, string>;
    sources: { name: string; publisher: string; url: string; licence?: string; attribution?: string }[];
    notes: string;
    attribution?: string;
  };
  headline: {
    primary_sic: string;
    primary_sic_label: string;
    last_settled_month: string | null;
    care_cos_settled: number | null;
    care_cos_yoy_pct: number | null;
    care_cos_ttm: number | null;
    all_care_cos_ttm: number | null;
    decade: {
      from_year: number;
      to_year: number;
      from_value: number;
      to_value: number;
      multiple: number | null;
      change_pct: number | null;
      union_from: number;
      union_to: number;
      union_change_pct: number | null;
    } | null;
    peak_month: string | null;
    peak_value: number;
    zero_data_sics: string[];
    thin: boolean;
  };
  incorporations: { monthly: FormationMonthRow[]; annual: Record<string, number | string>[] };
  segments: FormationSegment[];
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-03" -> "Mar 2026". */
export function monthLabel(ym: string | null): string {
  if (!ym) return "n/a";
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTH_NAMES[mi]} ${y}`;
}

/** Average incorporations by calendar month across settled months (seasonality index). */
export function seasonalityFromMonthly(
  monthly: { month: string; count: number }[],
  settledThrough: string | null
): { monthName: string; avgCount: number; yearsOfData: number }[] {
  const settled = settledThrough ? monthly.filter((r) => r.month <= settledThrough) : monthly;
  const byCalMonth = new Map<number, number[]>();
  for (const row of settled) {
    const mi = Number(row.month.slice(5, 7));
    if (!byCalMonth.has(mi)) byCalMonth.set(mi, []);
    byCalMonth.get(mi)!.push(row.count);
  }
  return Array.from(byCalMonth.entries())
    .sort(([a], [b]) => a - b)
    .map(([mi, vals]) => ({
      monthName: MONTH_NAMES[mi - 1],
      avgCount: Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10,
      yearsOfData: vals.length,
    }));
}
