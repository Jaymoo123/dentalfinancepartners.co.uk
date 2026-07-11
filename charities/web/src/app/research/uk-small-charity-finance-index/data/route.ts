import snapshot from "@/data/uk-small-charity-finance-index.json";
import type { FinanceIndexSnapshot } from "@/lib/research/finance-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the scrutiny-band and flow series behind the UK Small
 * Charity Finance Index. Always in sync with the page because both read the
 * same committed snapshot.
 */
export function GET() {
  const data = snapshot as unknown as FinanceIndexSnapshot;

  const lines = [
    "# UK Small Charity Finance Index",
    "# Source: Charity Commission full-register extract (OGL v3.0); Companies House free company data (OGL v3.0).",
    `# Generated: ${data.meta.generated_at}. England and Wales charities; CIC layer UK-wide.`,
    "# Free to reuse with attribution.",
    "",
    "section,key,label,count,pct",
    ...data.charities.scrutiny_bands.map(
      (b) => `scrutiny_band,${b.key},"${b.label}",${b.count},${b.pct}`,
    ),
    "",
    "section,year,registrations,removals,net",
    ...data.charities.flows.map(
      (f) => `flows,${f.year},${f.registrations},${f.removals},${f.net}`,
    ),
  ];

  if (data.cics) {
    lines.push("", "section,year,cic_incorporations");
    for (const r of data.cics.incorporations_by_year) {
      lines.push(`cic_incorporations,${r.year},${r.count}`);
    }
  }

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-small-charity-finance-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
