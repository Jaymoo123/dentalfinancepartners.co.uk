import snapshot from "@/data/construction-survival-index.json";
import type { SurvivalIndexSnapshot } from "@/lib/research/survival-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the construction vs all-industries survival cohorts
 * behind the UK Construction Survival Index. Always in sync with the page
 * because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as SurvivalIndexSnapshot;

  const header = [
    "birth_year",
    "construction_births",
    "construction_y1_pct",
    "construction_y2_pct",
    "construction_y3_pct",
    "construction_y4_pct",
    "construction_y5_pct",
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
      c.construction.births ?? "",
      c.construction.y1_pct ?? "",
      c.construction.y2_pct ?? "",
      c.construction.y3_pct ?? "",
      c.construction.y4_pct ?? "",
      c.construction.y5_pct ?? "",
      c.all_industries.births ?? "",
      c.all_industries.y1_pct ?? "",
      c.all_industries.y2_pct ?? "",
      c.all_industries.y3_pct ?? "",
      c.all_industries.y4_pct ?? "",
      c.all_industries.y5_pct ?? "",
    ].join(","),
  );

  const csv = [
    "# UK Construction Survival Index: enterprise survival rates by birth-year cohort",
    "# Construction (broad industry group, SIC Section F) vs all-industries UK average.",
    "# Blank cells = survival year not yet elapsed for that cohort (ONS has not yet published it).",
    "# Source: ONS Business Demography, Table 4.2 (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Trade Tax Specialists (tradetaxspecialists.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-construction-survival-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
