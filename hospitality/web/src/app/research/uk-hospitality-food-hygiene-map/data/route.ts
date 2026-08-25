import snapshot from "@/data/hospitality-fsa-hygiene-index.json";
import type { FsaHygieneIndexSnapshot } from "@/lib/research/hospitality-fsa-hygiene-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the aggregate FSA hygiene data behind the UK Hospitality
 * Food Hygiene Map. Aggregate-only: local authority rows and business-type
 * rows, no establishment-level data.
 */
/** Quote a CSV field if it contains a comma, quote or newline (RFC 4180). */
function csvField(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function GET() {
  const data = snapshot as unknown as FsaHygieneIndexSnapshot;

  const row = (cols: (string | number)[]) => cols.map(csvField).join(",");

  const byTypeRows = data.business_types.map((b) =>
    row(["business_type", b.label, b.total, b.fhrs_top_rating_share_pct ?? ""])
  );

  const laRows = [
    ...data.local_authority_league_table.top15_by_top_rating_share.map((r) =>
      row(["local_authority_top15_rating", r.local_authority, r.total_hospitality_establishments, r.top_rating_5_share_pct ?? ""])
    ),
    ...data.local_authority_league_table.bottom15_by_top_rating_share.map((r) =>
      row(["local_authority_bottom15_rating", r.local_authority, r.total_hospitality_establishments, r.top_rating_5_share_pct ?? ""])
    ),
    ...data.local_authority_league_table.top15_by_density.map((r) =>
      row(["local_authority_top15_density", r.local_authority, r.total_hospitality_establishments, r.top_rating_5_share_pct ?? ""])
    ),
  ];

  const csv = [
    "# UK Hospitality Food Hygiene Map: aggregate FHRS/FHIS ratings by local authority and business type",
    "# AGGREGATE STATISTICS ONLY -- no individual establishment is identified.",
    "# Source: Food Standards Agency Ratings API (api.ratings.food.gov.uk).",
    `# Generated: ${data.meta.generated_at}. Pull date: ${data.meta.pull_date}.`,
    "# Free to reuse with attribution to Hospitality Tax (hospitalitytax.co.uk).",
    "category,label_or_authority,establishment_count,top_rating_5_share_pct",
    ...byTypeRows,
    ...laRows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-hospitality-food-hygiene-map.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
