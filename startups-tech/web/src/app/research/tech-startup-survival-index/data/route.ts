import snapshot from "@/data/tech-startup-survival-index.json";
import type { TechStartupSurvivalIndexSnapshot } from "@/lib/research/tech-startup-survival-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the cohort survival series behind the UK Tech Startup Survival Curves.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as TechStartupSurvivalIndexSnapshot;

  const header = [
    "cohort_year",
    "horizon_years",
    "tech_survival_pct",
    "tech_survival_count",
    "all_industry_survival_pct",
    "all_industry_survival_count",
  ].join(",");

  const rows: string[] = [];
  for (const c of data.cohortSeries) {
    for (const h of ["1", "2", "3", "4", "5"]) {
      const t = c.techSurvival[h];
      const a = c.allIndustrySurvival[h];
      if (!t && !a) continue;
      rows.push(
        [c.cohortYear, h, t?.pct ?? "", t?.count ?? "", a?.pct ?? "", a?.count ?? ""].join(",")
      );
    }
  }

  const csv = [
    "# UK Tech Startup Survival Curves: cohort survival by horizon year",
    "# Tech = Information and Communication (ONS broad industry group, SIC sections 58-63). UK-wide.",
    "# Source: ONS Business Demography, UK: 2024 (Table 4.2, Open Government Licence v3.0).",
    `# Generated: ${data.meta.lastUpdated}. Pull date: ${data.meta.pullDate}.`,
    "# Free to reuse with attribution to Founder Tax Partners (foundertaxpartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="tech-startup-survival-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
