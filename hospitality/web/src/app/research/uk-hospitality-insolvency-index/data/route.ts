import snapshot from "@/data/hospitality-insolvency-index.json";
import type { HospitalityInsolvencyIndexSnapshot } from "@/lib/research/hospitality-insolvency-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly insolvency series behind the UK Hospitality
 * Insolvency Index. Always in sync with the page because both read the same
 * snapshot.
 */
export function GET() {
  const data = snapshot as unknown as HospitalityInsolvencyIndexSnapshot;

  const procCols = [
    "cvl",
    "compulsory",
    "administration",
    "administration_to_cvl",
    "cva",
    "receivership",
    "moratorium",
    "total",
  ];

  const header = ["month", ...procCols].join(",");
  const rows = data.insolvencies.monthly.map((m) => {
    const vals = procCols.map((c) => String((m as unknown as Record<string, unknown>)[c] ?? 0));
    return [m.month, ...vals].join(",");
  });

  const survivalHeader = [
    "# ",
    "cohort_year,births,survival_1yr_pct,survival_2yr_pct,survival_3yr_pct,survival_4yr_pct,survival_5yr_pct,all_industry_5yr_pct",
  ];
  const survivalRows = data.survival.cohorts.map((c) =>
    [
      c.cohort_year,
      c.births,
      c.survival_1yr_pct ?? "",
      c.survival_2yr_pct ?? "",
      c.survival_3yr_pct ?? "",
      c.survival_4yr_pct ?? "",
      c.survival_5yr_pct ?? "",
      c.all_industry_5yr_pct ?? "",
    ].join(",")
  );

  const csv = [
    "# UK Hospitality Insolvency Index: monthly company insolvencies by procedure type",
    "# SIC Section I (Accommodation and food service activities). England, Wales and Scotland.",
    "# Source: Insolvency Service, Company Insolvency Statistics (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Hospitality Tax (hospitalitytax.co.uk).",
    header,
    ...rows,
    "#",
    "# ONS Business Demography survival by birth cohort (Accommodation and food services vs all industry)",
    ...survivalHeader.slice(1),
    ...survivalRows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-hospitality-insolvency-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
