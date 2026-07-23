/**
 * Types for the UK Late Payment Index.
 *
 * Data is compiled by
 * optimisation_engine/ingestion/ingest_generalist_late_payment_index.py
 * and committed as generalist/web/src/data/uk-late-payment-index.json.
 * Aggregate only: no company is named anywhere in this snapshot.
 */

export interface LatePaymentPeriod {
  period: string; // e.g. "2025H2"
  n_filings: number;
  n_companies: number;
  mean_days_to_pay: number | null;
  median_days_to_pay: number | null;
  mean_pct_within_30d: number | null;
  mean_pct_not_paid_on_time: number | null;
}

export interface LatePaymentIndexSnapshot {
  meta: {
    generated_at: string;
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
    data_quality: {
      total_rows_in_export: number;
      rows_dropped_bad_date: number;
      atp_values_dropped_as_outliers: number;
    };
  };
  headline: {
    latest_period: string;
    latest_mean_days_to_pay: number | null;
    latest_median_days_to_pay: number | null;
    latest_pct_within_30d: number | null;
    latest_pct_not_paid_on_time: number | null;
    latest_n_companies: number;
    series_from_period: string;
    series_from_mean_days_to_pay: number | null;
    change_pct: number | null;
  };
  periods: LatePaymentPeriod[];
}

/** "2025H2" -> "H2 2025". */
export function periodLabel(p: string): string {
  const half = p.slice(4);
  const year = p.slice(0, 4);
  return `${half} ${year}`;
}
