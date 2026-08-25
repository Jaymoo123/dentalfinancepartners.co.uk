import snapshot from "@/data/nhs-dental-earnings-index.json";
import type { DentalEarningsSnapshot } from "@/lib/research/dental-earnings-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the England earnings time series.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as DentalEarningsSnapshot;

  const cols = ["year", "avg_gross_earnings", "avg_expenses", "avg_net_income"];
  const header = cols.join(",");
  const rows = data.timeseries_england.map((r) => {
    const vals = cols.map((c) => String((r as unknown as Record<string, unknown>)[c] ?? ""));
    return vals.join(",");
  });

  const csv = [
    "# NHS Dentist Earnings and Expenses Tracker: annual earnings time series (England)",
    `# Self-employed primary-care NHS dentists, England only. Source: NHS England Digital, ${data.meta.edition}, published ${data.meta.edition_published}.`,
    `# Table 1.1, Country = England, Dental Type = All, Contract Type = All. Coverage ${data.meta.timeseries_coverage}; England is not applicable before 2017/18.`,
    "# Open Government Licence v3.0. Generated " + data.meta.generated_at,
    "# Free to reuse with attribution to Dental Finance Partners (dentalfinancepartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="nhs-dentist-earnings-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
