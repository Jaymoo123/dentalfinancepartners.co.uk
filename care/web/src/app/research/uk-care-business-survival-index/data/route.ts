import { siteConfig } from "@/config/site";
import snapshot from "@/data/uk-care-business-survival-index.json";
import type { CareSurvivalIndexSnapshot } from "@/lib/research/care-survival-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the survival-by-cohort table behind the UK Care Business
 * Survival Index. Always in sync with the page because both read the same
 * committed snapshot.
 */
export function GET() {
  const data = snapshot as unknown as CareSurvivalIndexSnapshot;

  const header = ["sic_group", "label", "birth_year", "births", "survival_1yr_pct", "survival_2yr_pct", "survival_3yr_pct", "survival_4yr_pct", "survival_5yr_pct"].join(",");

  const rows: string[] = [];
  for (const seg of data.segments) {
    for (const c of seg.cohorts) {
      rows.push(
        [
          seg.sic_group,
          `"${seg.label.replace(/"/g, '""')}"`,
          c.birth_year,
          c.births ?? "",
          c.survival_pct["1"] ?? "",
          c.survival_pct["2"] ?? "",
          c.survival_pct["3"] ?? "",
          c.survival_pct["4"] ?? "",
          c.survival_pct["5"] ?? "",
        ].join(",")
      );
    }
  }

  const csv = [
    "# UK Care Business Survival Index: enterprise survival by SIC group and birth-year cohort",
    "# SIC 87 (residential care) and SIC 88 (social work without accommodation), and 3-digit sub-groups.",
    "# Source: ONS Business Demography reference tables (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}.`,
    `# Free to reuse with attribution to ${siteConfig.name} (${siteConfig.domain}).`,
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-care-business-survival-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
