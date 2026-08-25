import netFormationSnapshot from "@/data/construction-net-formation-index.json";
import type { NetFormationIndexSnapshot } from "@/lib/research/net-formation-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the annual net-formation series (incorporations minus
 * dissolutions) behind the "Net formation" section of the UK Construction
 * Index page. Always in sync with the page because both read the same
 * snapshot.
 */
export function GET() {
  const data = netFormationSnapshot as unknown as NetFormationIndexSnapshot;

  const segCols = ["union", "div41", "div42", "div43", "primary_41202"];
  const header = [
    "year",
    ...segCols.flatMap((s) => [`${s}_incorporated`, `${s}_dissolved`, `${s}_net`]),
  ].join(",");

  const rows = data.annual.map((r) => {
    const vals = segCols.flatMap((s) => [
      String((r as unknown as Record<string, number>)[`${s}_inc`] ?? 0),
      String((r as unknown as Record<string, number>)[`${s}_diss`] ?? 0),
      String((r as unknown as Record<string, number>)[`${s}_net`] ?? 0),
    ]);
    return [String(r.year), ...vals].join(",");
  });

  const csv = [
    "# UK Construction Net Formation Index: annual incorporations, dissolutions and net formation",
    "# by SIC segment (union = all 19 construction SIC codes, deduplicated; div41/42/43 = SIC divisions;",
    "# primary_41202 = construction of domestic buildings).",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Coverage: ${data.meta.coverage}.`,
    "# Free to reuse with attribution to Trade Tax Specialists (tradetaxspecialists.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-construction-net-formation-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
