import snapshot from "@/data/pharmacy-openings-closures-index.json";
import type { PharmacyOpeningsClosuresSnapshot } from "@/lib/research/pharmacy-openings-closures-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly NHS pharmacy count series behind the UK
 * Community Pharmacy Openings and Closures Index. Always in sync with the
 * page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as PharmacyOpeningsClosuresSnapshot;

  const cols: (keyof PharmacyOpeningsClosuresSnapshot["monthly"][number])[] = [
    "month",
    "total",
    "total_excl_distance_sellers",
    "distance_sellers",
    "hundred_hour",
    "small",
    "medium",
    "large",
    "opened_excl_ds",
    "closed_excl_ds",
    "net_change_excl_ds",
  ];
  const header = cols.join(",");
  const rows = data.monthly.map((m) => cols.map((c) => String(m[c])).join(","));

  const csv = [
    "# UK Community Pharmacy Openings and Closures Index: monthly NHS pharmacy count by owner-group size",
    "# Small = 1-5 premises (mostly independents), Medium = 6-99, Large = 100+ (multiples). England only.",
    `# Source: ${data.meta.sources.nhsbsa_openings_closures.name} (${data.meta.sources.nhsbsa_openings_closures.resource}). Open Government Licence v3.0.`,
    `# Generated: ${data.meta.lastUpdated}.`,
    "# Free to reuse with attribution to Pharmacy Tax (pharmacytax.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="pharmacy-openings-closures-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
