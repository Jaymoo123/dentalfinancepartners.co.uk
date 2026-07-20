import snapshot from "@/data/construction-insolvency-index.json";
import type { InsolvencyIndexSnapshot } from "@/lib/research/insolvency-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly insolvency series behind the UK Construction Insolvency Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as InsolvencyIndexSnapshot;

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

  const csv = [
    "# UK Construction Insolvency Index: monthly company insolvencies by procedure type",
    "# SIC Section F (Construction): Divisions 41, 42 and 43. England, Wales and Scotland.",
    "# Source: Insolvency Service, Company Insolvency Statistics (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Trade Tax Specialists (trade-tax-specialists.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-construction-insolvency-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
