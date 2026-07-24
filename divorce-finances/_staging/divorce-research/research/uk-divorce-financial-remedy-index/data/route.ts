import snapshot from "@/data/uk-divorce-financial-remedy-index.json";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the annual series behind the UK Divorce and Financial Remedy Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as {
    meta: { generated_at: string };
    divorce_annual: Record<string, number | null>[];
    financial_remedy_annual: Record<string, number | null>[];
  };

  const frByYear = new Map(data.financial_remedy_annual.map((r) => [r.year, r]));

  const cols = [
    "year",
    "divorce_applications",
    "conditional_orders",
    "final_orders",
    "mean_weeks_to_conditional_order",
    "median_weeks_to_conditional_order",
    "mean_weeks_to_final_order",
    "median_weeks_to_final_order",
    "fr_applications_total",
    "fr_applications_contested",
    "fr_applications_uncontested",
    "fr_disposals_total",
    "fr_disposals_contested",
    "fr_disposals_initially_contested",
    "fr_disposals_uncontested",
    "fr_uncontested_share_pct",
  ];

  const v = (x: number | null | undefined) => (x === null || x === undefined ? "" : String(x));

  const rows = data.divorce_annual.map((d) => {
    const f = frByYear.get(d.year) ?? {};
    return [
      v(d.year),
      v(d.applications),
      v(d.conditional_orders),
      v(d.final_orders),
      v(d.mean_weeks_to_conditional_order),
      v(d.median_weeks_to_conditional_order),
      v(d.mean_weeks_to_final_order),
      v(d.median_weeks_to_final_order),
      v(f.applications_total),
      v(f.applications_contested),
      v(f.applications_uncontested),
      v(f.disposals_total),
      v(f.disposals_contested),
      v(f.disposals_initially_contested),
      v(f.disposals_uncontested),
      v(f.applications_uncontested_share_pct),
    ].join(",");
  });

  const csv = [
    "# UK Divorce and Financial Remedy Index: annual series, England and Wales",
    "# Source: Ministry of Justice, Family Court Statistics Quarterly Oct-Dec 2025 (Open Government Licence v3.0).",
    "# Divorce = dissolution of marriage only. Timeliness = all case types, both legal regimes. Blank = not published.",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to {{BRAND}}.",
    cols.join(","),
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-divorce-financial-remedy-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
