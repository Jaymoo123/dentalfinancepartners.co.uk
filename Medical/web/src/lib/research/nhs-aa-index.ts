/**
 * TypeScript interface and formatters for the Annual Allowance Pension Tax Index.
 *
 * The data is committed as Medical/web/src/data/nhs-aa-index.json.
 * The page and CSV route both import that same JSON at build time so they can
 * never drift from each other.  No runtime fetch anywhere.
 */

export interface AaIndexSnapshot {
  meta: {
    generated_at: string;
    retrieved_date: string;
    hmrc_publication_date: string;
    hmrc_edition: string;
    latest_year: string;
    provisional_years: string[];
    revised_years: string[];
    foi_snapshot_date: string;
    foi_safe_window: string[];
    nhs_scope: string;
    temporal_coverage: string;
    license: string;
    license_url: string;
    update_cadence: string;
    next_release: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
    notes: string;
  };
  hmrc: {
    series: Array<{
      tax_year: string;
      standard_aa_gbp: number;
      aft_charges_n: number | null;
      aft_charges_value_gbp_m: number | null;
      sa_individuals_over_aa_n: number;
      sa_excess_value_gbp_m: number;
      provisional: boolean;
      revised: boolean;
    }>;
  };
  nhs: {
    foi_reference: string;
    snapshot_date: string;
    scope: string;
    basis: string;
    exceeded_aa: Array<{
      tax_year: string;
      practitioner_exceeded: number;
      officer_exceeded: number;
      total_exceeded: number;
      practitioner_scheme_pays_records: number;
      officer_scheme_pays_records: number;
    }>;
  };
  nhs_role_split_2019_20: {
    foi_reference: string;
    basis: string;
    scope: string;
    rows: Array<{
      employment_type: string;
      scheme_pays_forms: number;
      applied_aa_compensation: number;
    }>;
  };
  member_counts: {
    scope: string;
    source: string;
    rows: Array<{
      as_at: string;
      active: number;
      deferred: number;
      pensions_in_payment: number;
    }>;
  };
  headline: {
    scheme_pays_value_latest_gbp_m: number;
    scheme_pays_value_latest_year: string;
    scheme_pays_value_2016_17_gbp_m: number;
    sa_peak_individuals: number;
    sa_peak_year: string;
    sa_2016_17_individuals: number;
    nhs_officer_peak_2021_22: number;
    nhs_practitioner_2021_22: number;
    aa_2006_07_gbp: number;
    aa_latest_gbp: number;
    aa_latest_year: string;
    member_active_latest: number;
    member_active_latest_as_at: string;
  };
}

/** Thousands-separated en-GB integer. Returns "n/a" when null or undefined. */
export function fmtInt(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "£60,000"; "n/a" when null or undefined. */
export function fmtGBP(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

/** "£350m"; "n/a" when null or undefined. */
export function fmtGBPm(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n)}m`;
}

/** "£215k" (compact, for axis labels); "n/a" when null or undefined. */
export function fmtGBPk(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${Math.round(n / 1000)}k`;
}

/** Identity passthrough; reserved for future formatting. */
export function taxYearLabel(ty: string): string {
  return ty;
}
