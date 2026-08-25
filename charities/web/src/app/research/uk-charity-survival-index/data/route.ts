import type { SurvivalIndexSnapshot } from "@/lib/research/survival-index";
import snapshot from "@/data/charity-survival-index.json";

export const dynamic = "force-static";

export function GET() {
  const data = snapshot as unknown as SurvivalIndexSnapshot;

  const lines = [
    "# UK Charity Survival and Longevity Index",
    "# Source: Charity Commission full-register extract (OGL v3.0).",
    `# Generated: ${data.meta.generated_at}. England and Wales charities.`,
    "# Free to reuse with attribution.",
    "",
    "section,cohort_year,registered,removed,active,survival_rate_pct,median_age_at_removal_years",
    ...data.cohort_survival.map(
      (r) =>
        `cohort_survival,${r.cohort_year},${r.registered},${r.removed},${r.active},${r.survival_rate_pct ?? ""},${r.median_age_at_removal_years ?? ""}`,
    ),
    "",
    "section,key,label,removed_count,median_age_at_removal_years",
    ...data.income_band_survival.map(
      (r) =>
        `income_band_survival,${r.key},"${r.label}",${r.removed_count},${r.median_age_at_removal_years ?? ""}`,
    ),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-charity-survival-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
