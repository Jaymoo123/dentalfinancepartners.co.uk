import snapshot from "@/data/uk-tech-formations-index.json";
import type { TechFormationsIndexSnapshot } from "@/lib/research/tech-formations-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly incorporation series behind the UK Tech Formations Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as TechFormationsIndexSnapshot;

  const sicCols = Object.keys(data.meta.sic_labels);
  const header = ["month", ...sicCols, "union"].join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = [...sicCols, "union"].map((c) => String(m[c] ?? 0));
    return [m.month, ...vals].join(",");
  });

  const csv = [
    "# UK Tech Formations Index: monthly company incorporations by SIC code",
    "# SIC codes: 62012 (software dev), 62020 (IT consultancy), 62090 (other IT services), 63110 (data processing), 58290 (software publishing). UK-wide.",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Settled through: ${data.meta.incorporations_settled_through}.`,
    "# Free to reuse with attribution to Founder Tax Partners (foundertaxpartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-tech-formations-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
