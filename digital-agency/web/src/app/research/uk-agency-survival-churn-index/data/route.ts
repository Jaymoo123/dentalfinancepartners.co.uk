import snapshot from "@/data/uk-agency-survival-churn-index.json";
import type { SurvivalIndexSnapshot } from "@/lib/research/survival-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the agency-cluster vs all-industries survival cohorts
 * behind the UK Agency Survival & Churn Index. Always in sync with the page
 * because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as SurvivalIndexSnapshot;

  const header = [
    "birth_year",
    "advertising_births", "advertising_y1_pct", "advertising_y2_pct", "advertising_y3_pct", "advertising_y4_pct", "advertising_y5_pct",
    "market_research_births", "market_research_y1_pct", "market_research_y2_pct", "market_research_y3_pct", "market_research_y4_pct", "market_research_y5_pct",
    "design_births", "design_y1_pct", "design_y2_pct", "design_y3_pct", "design_y4_pct", "design_y5_pct",
    "it_consultancy_births", "it_consultancy_y1_pct", "it_consultancy_y2_pct", "it_consultancy_y3_pct", "it_consultancy_y4_pct", "it_consultancy_y5_pct",
    "agency_combined_births", "agency_combined_y1_pct", "agency_combined_y2_pct", "agency_combined_y3_pct", "agency_combined_y4_pct", "agency_combined_y5_pct",
    "all_industries_births", "all_industries_y1_pct", "all_industries_y2_pct", "all_industries_y3_pct", "all_industries_y4_pct", "all_industries_y5_pct",
  ].join(",");

  const seg = (s: SurvivalIndexSnapshot["cohorts"][number]["advertising"]) =>
    [s.births ?? "", s.y1_pct ?? "", s.y2_pct ?? "", s.y3_pct ?? "", s.y4_pct ?? "", s.y5_pct ?? ""];

  const rows = data.cohorts.map((c) =>
    [
      c.birth_year,
      ...seg(c.advertising),
      ...seg(c.market_research),
      ...seg(c.design),
      ...seg(c.it_consultancy),
      ...seg(c.agency_combined),
      ...seg(c.all_industries),
    ].join(","),
  );

  const csv = [
    "# UK Agency Survival & Churn Index: enterprise survival rates by birth-year cohort",
    "# Segments: advertising (SIC 731, incl. media representation), market_research (732),",
    "# design (741), it_consultancy (620), agency_combined (weighted union of the 4), vs all UK industries.",
    "# Blank cells = survival year not yet elapsed for that cohort (ONS has not yet published it).",
    "# Source: ONS Business Demography, Tables 5.2a-5.2e (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Agency Founder Finance (agencyfounderfinance.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-agency-survival-churn-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
