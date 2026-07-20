import snapshot from "@/data/uk-legal-incorporation-index.json";
import type { LegalIncorporationIndexSnapshot } from "@/lib/research/legal-incorporation-index";

// Static: derived purely from the committed snapshot.
export const dynamic = "force-static";

/**
 * CSV download of the monthly legal firm incorporation series.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as LegalIncorporationIndexSnapshot;

  const header = "month,total,ltd,ltd_share_pct";
  const rows = data.incorporations.monthly.map(
    (m) => `${m.month},${m.total},${m.ltd},${m.ltd_share_pct ?? ""}`
  );

  const csv = [
    "# UK Legal Incorporation Index: monthly law firm incorporations by type",
    "# SIC codes: 69101 (Barristers at law), 69102 (Solicitors), 69109 (Other legal activities). England, Wales and Scotland.",
    "# total = all company types; ltd = private limited companies only.",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Accounts for Lawyers (accountsforlawyers.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-legal-incorporation-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
