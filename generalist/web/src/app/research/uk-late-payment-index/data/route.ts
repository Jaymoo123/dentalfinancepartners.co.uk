import snapshot from "@/data/uk-late-payment-index.json";
import type { LatePaymentIndexSnapshot } from "@/lib/research/late-payment-index";

export const dynamic = "force-static";

/** Press-ready CSV of the UK Late Payment Index: aggregate half-year series. */
export function GET() {
  const data = snapshot as unknown as LatePaymentIndexSnapshot;

  const header = [
    "period", "n_filings", "n_companies", "mean_days_to_pay",
    "median_days_to_pay", "mean_pct_within_30d", "mean_pct_not_paid_on_time",
  ].join(",");

  const rows = data.periods.map((p) => [
    p.period, p.n_filings, p.n_companies, p.mean_days_to_pay ?? "",
    p.median_days_to_pay ?? "", p.mean_pct_within_30d ?? "", p.mean_pct_not_paid_on_time ?? "",
  ].join(","));

  const csv = [
    "# UK Late Payment Index: aggregate half-yearly average time to pay",
    "# Source: Payment Practices Reporting service (statutory disclosure). Aggregate only, no company named.",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Holloway Davies (hollowaydavies.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-late-payment-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
