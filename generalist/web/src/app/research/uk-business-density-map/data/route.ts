import snapshot from "@/data/uk-business-density-map.json";
import type { BusinessDensityMapSnapshot } from "@/lib/research/business-density-map";

export const dynamic = "force-static";

/** Press-ready CSV of the UK Business Density Map: region-level detail. */
export function GET() {
  const data = snapshot as unknown as BusinessDensityMapSnapshot;

  const header = [
    "region", "businesses", "density_per_10k_adults", "resident_adults",
    "pct_zero_employees", "pct_1_to_49_employees", "pct_50_to_249_employees", "pct_250_plus_employees",
  ].join(",");

  const rows = data.regions.map((r) => [
    r.region, r.businesses, r.density_per_10k_adults, r.resident_adults,
    r.pct_zero_employees, r.pct_1_to_49_employees, r.pct_50_to_249_employees, r.pct_250_plus_employees,
  ].join(","));

  const csv = [
    "# UK Business Density Map: businesses per 10,000 resident adults by region",
    "# Source: Business Population Estimates for the UK and regions (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. As of: ${data.meta.as_of}.`,
    "# Free to reuse with attribution to Holloway Davies (hollowaydavies.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-business-density-map.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
