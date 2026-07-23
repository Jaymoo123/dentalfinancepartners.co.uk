import snapshot from "@/data/uk-contractor-survival-index.json";
import type { ContractorSurvivalIndexSnapshot } from "@/lib/research/contractor-survival-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the contractor-vs-all-industries survival cohorts behind
 * the UK Contractor Survival Index. Always in sync with the page because both
 * read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as ContractorSurvivalIndexSnapshot;

  const header = [
    "birth_year",
    "contractor_births",
    "contractor_y1_pct",
    "contractor_y2_pct",
    "contractor_y3_pct",
    "contractor_y4_pct",
    "contractor_y5_pct",
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
      c.contractor.births ?? "",
      c.contractor.y1_pct ?? "",
      c.contractor.y2_pct ?? "",
      c.contractor.y3_pct ?? "",
      c.contractor.y4_pct ?? "",
      c.contractor.y5_pct ?? "",
      c.all_industries.births ?? "",
      c.all_industries.y1_pct ?? "",
      c.all_industries.y2_pct ?? "",
      c.all_industries.y3_pct ?? "",
      c.all_industries.y4_pct ?? "",
      c.all_industries.y5_pct ?? "",
    ].join(","),
  );

  const groupHeader = ["sic_group", "label", "birth_year", "births", "y1_pct", "y2_pct", "y3_pct", "y4_pct", "y5_pct"].join(",");
  const groupRows = data.groups.flatMap((g) =>
    g.cohorts.map((c) =>
      [
        g.sic_group,
        `"${g.label.replace(/"/g, '""')}"`,
        c.birth_year,
        c.births ?? "",
        c.y1_pct ?? "",
        c.y2_pct ?? "",
        c.y3_pct ?? "",
        c.y4_pct ?? "",
        c.y5_pct ?? "",
      ].join(","),
    ),
  );

  const csv = [
    "# UK Contractor Survival Index: enterprise survival rates by birth-year cohort",
    "# Combined contractor SIC groups (62, 70, 71) vs all-industries UK average.",
    "# Blank cells = survival year not yet elapsed for that cohort (ONS has not yet published it).",
    "# Source: ONS Business Demography, Table 5.2a-5.2e (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Contractor Tax Accountants (contractortaxaccountants.co.uk).",
    header,
    ...rows,
    "",
    "# Per-SIC-group breakdown",
    groupHeader,
    ...groupRows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-contractor-survival-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
