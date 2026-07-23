import snapshot from "@/data/uk-agency-insolvency-index.json";
import type { InsolvencyIndexSnapshot } from "@/lib/research/insolvency-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

const SIC_COLS = ["73110", "73120", "70210", "74100", "73200", "62012", "62020"] as const;
const PROC_COLS = ["cvl", "compulsory", "administration", "administration_to_cvl", "cva", "receivership", "moratorium"] as const;

/**
 * Press-ready CSV of the monthly agency insolvency series behind the UK
 * Agency Insolvency Index. Always in sync with the page because both read
 * the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as InsolvencyIndexSnapshot;

  const header = ["month", "union", ...SIC_COLS, "section_J", "section_M", ...PROC_COLS, "captured_total"].join(",");
  const rows = data.insolvencies.monthly.map((m) => {
    const sicVals = SIC_COLS.map((c) => String(m[c] ?? 0));
    const procVals = PROC_COLS.map((c) => String(m[c] ?? 0));
    return [m.month, m.union, ...sicVals, m.section_J, m.section_M, ...procVals, m.captured_total].join(",");
  });

  const csv = [
    "# UK Agency Insolvency Index: monthly company insolvencies by exact agency SIC code",
    "# union = deduplicated total across the 7 agency SIC codes: 73110, 73120, 70210, 74100, 73200, 62012, 62020.",
    "# section_J / section_M are broader backdrop context ONLY (all companies in those SIC sections, not agency-specific).",
    "# England, Wales and Scotland.",
    "# Source: Insolvency Service, Company Insolvency Statistics (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Agency Founder Finance (agencyfounderfinance.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-agency-insolvency-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
