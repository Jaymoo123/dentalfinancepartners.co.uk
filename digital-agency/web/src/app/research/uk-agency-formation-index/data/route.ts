import snapshot from "@/data/uk-agency-formation-index.json";
import type { FormationIndexSnapshot } from "@/lib/research/formation-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

const SIC_COLS = ["73110", "73120", "70210", "74100", "73200", "62012", "62020"] as const;

/**
 * Press-ready CSV of the monthly incorporation series behind the UK Agency
 * Formation Index. Always in sync with the page because both read the same
 * snapshot.
 */
export function GET() {
  const data = snapshot as unknown as FormationIndexSnapshot;
  const prov = new Set(data.meta.provisional_months);

  const header = ["month", ...SIC_COLS, "union", "provisional"].join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = SIC_COLS.map((c) => String(m[c] ?? ""));
    return [m.month, ...vals, String(m["union"] ?? ""), prov.has(m.month) ? "1" : "0"].join(",");
  });

  const csv = [
    "# UK Agency Formation Index: monthly company incorporations by agency SIC code",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    "# Gross counts (includes companies since dissolved). union = deduplicated across all 7 codes.",
    `# Generated: ${data.meta.generated_at}. provisional=1 marks indexing-lag months.`,
    "# Free to reuse with attribution to Agency Founder Finance (agencyfounderfinance.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-agency-formation-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
