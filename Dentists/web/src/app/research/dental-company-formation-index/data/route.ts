import snapshot from "@/data/dental-company-formation-index.json";
import type { DentalCompanyFormationSnapshot } from "@/lib/research/dental-company-formation-index";

// Static: derived purely from the committed snapshot.
export const dynamic = "force-static";

export function GET() {
  const data = snapshot as unknown as DentalCompanyFormationSnapshot;

  const cols = ["month", "86230", "union"];
  const header = cols.join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = cols.map((c) => String((m as unknown as Record<string, unknown>)[c] ?? ""));
    return vals.join(",");
  });

  const csv = [
    "# Dental Company Formation Index: monthly SIC 86230 incorporations",
    "# SIC 86230 = General dental practice activities (Companies House).",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.incorporations_settled_through} (settled).`,
    `# Provisional months (excluded from headline): ${data.meta.provisional_months.join(", ")}.`,
    "# Free to reuse with attribution to Dental Finance Partners (dentalfinancepartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="dental-company-formation-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
