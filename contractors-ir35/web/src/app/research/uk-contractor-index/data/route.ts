import snapshot from "@/data/uk-contractor-index.json";
import type { ContractorIndexSnapshot } from "@/lib/research/contractor-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly incorporation series behind the UK Contractor Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as ContractorIndexSnapshot;
  const prov = new Set(data.meta.provisional_months);

  const sicCols = [
    "62011", "62012", "62020", "62090",
    "70210", "70221", "70229",
    "71121", "71122", "71129",
    "73110", "74100", "74201",
    "union",
  ];

  const header = ["month", ...sicCols, "provisional"].join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = sicCols.map((c) => String(m[c] ?? ""));
    return [m.month, ...vals, prov.has(m.month) ? "1" : "0"].join(",");
  });

  const csv = [
    "# UK Contractor Index: monthly company incorporations by contractor SIC code",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    "# Gross counts (includes companies since dissolved). union = deduplicated across all 13 codes.",
    "# A proxy for personal service company (PSC) formation, not a direct count of contractors.",
    `# Generated: ${data.meta.generated_at}. provisional=1 marks indexing-lag months.`,
    "# Free to reuse with attribution to Contractor Tax Accountants (contractortaxaccountants.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-contractor-index-incorporations.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
