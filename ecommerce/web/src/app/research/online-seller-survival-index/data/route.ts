import snapshot from "@/data/online-seller-survival-index.json";
import type { SurvivalIndexSnapshot } from "@/lib/research/survival-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the Retail vs all-industries survival cohorts behind the
 * Online Seller Survival Index. Always in sync with the page because both
 * read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as SurvivalIndexSnapshot;

  const header = [
    "birth_year",
    "retail_births",
    "retail_y1_pct",
    "retail_y2_pct",
    "retail_y3_pct",
    "retail_y4_pct",
    "retail_y5_pct",
    "all_industries_births",
    "all_industries_y1_pct",
    "all_industries_y2_pct",
    "all_industries_y3_pct",
    "all_industries_y4_pct",
    "all_industries_y5_pct",
  ].join(",");

  const rows = data.cohorts.map((c) =>
    [
      c.birth_year,
      c.retail.births ?? "",
      c.retail.y1_pct ?? "",
      c.retail.y2_pct ?? "",
      c.retail.y3_pct ?? "",
      c.retail.y4_pct ?? "",
      c.retail.y5_pct ?? "",
      c.all_industries.births ?? "",
      c.all_industries.y1_pct ?? "",
      c.all_industries.y2_pct ?? "",
      c.all_industries.y3_pct ?? "",
      c.all_industries.y4_pct ?? "",
      c.all_industries.y5_pct ?? "",
    ].join(","),
  );

  const csv = [
    "# Online Seller Survival Index: retail enterprise survival rates by birth-year cohort",
    "# Retail (broad industry group, ONS SIC 2007 grouping) vs all-industries UK average.",
    "# Blank cells = survival year not yet elapsed for that cohort (ONS has not yet published it).",
    "# Source: ONS Business Demography, Table 4.2 (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Ecommerce Finance (ecommercefinance.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="online-seller-survival-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
