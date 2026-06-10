import snapshot from "@/data/landlord-tax-index.json";
import type { LandlordIndexSnapshot } from "@/lib/research/landlord-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly incorporation series behind the UK Landlord Tax
 * Index. Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as LandlordIndexSnapshot;
  const prov = new Set(data.meta.provisional_months);
  const cols = ["68100", "68201", "68209", "68320", "union"];

  const header = ["month", ...cols, "provisional"].join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = cols.map((c) => String(m[c] ?? ""));
    return [m.month, ...vals, prov.has(m.month) ? "1" : "0"].join(",");
  });
  const csv = [
    "# UK Landlord Tax Index: monthly company incorporations by real-estate SIC code",
    "# Source: Companies House Advanced Search API. Gross counts (incl. since-dissolved).",
    `# Generated: ${data.meta.generated_at}. provisional=1 marks indexing-lag months.`,
    "# Free to reuse with attribution to Property Tax Partners (propertytaxpartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-landlord-tax-index-incorporations.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
