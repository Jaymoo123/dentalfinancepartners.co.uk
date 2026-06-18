import snapshot from "@/data/uk-construction-index.json";
import type { ConstructionIndexSnapshot } from "@/lib/research/construction-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly incorporation series behind the UK Construction Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as ConstructionIndexSnapshot;
  const prov = new Set(data.meta.provisional_months);

  const sicCols = [
    "41100", "41201", "41202",
    "42110", "42120", "42130", "42910", "42990",
    "43110", "43120", "43210", "43220", "43290",
    "43310", "43320", "43330", "43341", "43390", "43999",
    "union",
  ];

  const header = ["month", ...sicCols, "provisional"].join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = sicCols.map((c) => String(m[c] ?? ""));
    return [m.month, ...vals, prov.has(m.month) ? "1" : "0"].join(",");
  });

  const csv = [
    "# UK Construction Index: monthly company incorporations by construction SIC code",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    "# Gross counts (includes companies since dissolved). union = deduplicated across all 19 codes.",
    `# Generated: ${data.meta.generated_at}. provisional=1 marks indexing-lag months.`,
    "# Free to reuse with attribution to Trade Tax Specialists (trade-tax-specialists.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-construction-index-incorporations.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
