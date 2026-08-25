import snapshot from "@/data/nhs-dental-activity-index.json";
import type { DentalActivitySnapshot } from "@/lib/research/dental-activity-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the national monthly NHS dental activity series.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as DentalActivitySnapshot;

  const cols = ["month", "uda", "cot", "band1", "band2", "band3", "urgent", "recovery_index"];
  const header = [...cols, "provisional"].join(",");
  const rows = data.series.national.map((m) => {
    const vals = cols.map((c) => String((m as unknown as Record<string, unknown>)[c] ?? ""));
    return [...vals, m.provisional ? "true" : "false"].join(",");
  });

  const csv = [
    "# NHS Dental Activity Recovery Index: monthly UDA delivery and recovery index",
    "# England national series. Recovery Index = monthly UDA / 2019/20 monthly average * 100.",
    "# COT = Band 1 + Band 2 + Band 3 + urgent. NHSBSA reported Band 2 as one column to Mar 2023 and as 2A+2B+2C from Apr 2023.",
    "# Source: NHSBSA English Contractor Monthly General Dental Activity (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Settled through: ${data.meta.last_settled_month}. Provisional months: ${data.meta.provisional_months.join(" ") || "none"}.`,
    "# Free to reuse with attribution to Dental Finance Partners (dentalfinancepartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="nhs-dental-activity-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
