/**
 * Types and formatters for the NHS Dentist Earnings and Expenses Tracker.
 *
 * Data is compiled from NHS England Digital open data and committed as
 * Dentists/web/src/data/nhs-dental-earnings-index.json.
 * The page imports that snapshot at build time (no runtime fetch).
 */

export interface EarningsYear {
  year: string;
  avg_gross_earnings: number | null;
  avg_expenses: number | null;
  avg_net_income: number | null;
}

export interface CountryRow {
  country: string;
  year: string;
  avg_gross_earnings: number | null;
  avg_expenses: number | null;
  avg_net_income: number | null;
  median_net_income: number | null;
}

export interface RegionalRow {
  region_code: string;
  year: string;
  avg_gross_earnings: number | null;
  avg_expenses: number | null;
  avg_net_income: number | null;
  median_net_income: number | null;
}

export interface DentalEarningsSnapshot {
  meta: {
    generated_at: string;
    reference_year: string;
    sources: {
      name: string;
      publisher: string;
      url: string;
      publication_page: string;
      licence: string;
      retrieved: string;
      attribution: string;
    }[];
    notes: string;
  };
  headline: {
    reference_year: string;
    avg_net_income_england: number | null;
    median_net_income_england: number | null;
    avg_gross_earnings_england: number | null;
    avg_expenses_england: number | null;
    estimated_population_england: number | null;
    net_income_change_yoy: number | null;
    prior_year: string | null;
    prior_year_avg_net_income: number | null;
  };
  cross_sectional_2324: {
    national: CountryRow;
    by_country: CountryRow[];
    by_region_england: RegionalRow[];
  };
  timeseries_england: EarningsYear[];
}

/** Thousands-separated en-GB integer (rounds). */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "£78,200" style. */
export function fmtGBP(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

/** "+£4,900" year-on-year change. */
export function fmtGBPChange(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  const sign = n > 0 ? "+" : "";
  return `${sign}£${Math.abs(Math.round(n)).toLocaleString("en-GB")}`;
}

/** "+4.0%" style percent string. */
export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
