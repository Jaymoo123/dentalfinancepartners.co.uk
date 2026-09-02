import snapshot from "@/data/landlord-tax-index.json";
import { buildNetFormationSeries } from "@/lib/research/landlord-index";
import type { LandlordIndexSnapshot } from "@/lib/research/landlord-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly incorporation series behind the UK SPV
 * Incorporation Index. Always in sync with the page because both read the
 * same snapshot.
 *
 * Shape: table 1 is the monthly incorporation series by SIC code, unchanged
 * from the original index and always present. When `net_formation` exists in
 * the snapshot, two extra columns ("dissolved", "net") are appended to the
 * same rows for the months that have a matching dissolved count. When
 * `regional` exists, a second CSV table (region, last12m, share_last12m_pct,
 * total_live) is appended below a blank line and a comment header. Neither
 * addition changes the output when those keys are absent from the JSON.
 */
export function GET() {
  const data = snapshot as unknown as LandlordIndexSnapshot;
  const prov = new Set(data.meta.provisional_months);
  const cols = ["68100", "68201", "68209", "68320", "union"];
  const netSeries = buildNetFormationSeries(data.incorporations, data.net_formation, data.headline.primary_sic);
  const netByMonth = new Map(netSeries.map((r) => [r.month, r]));
  const hasNet = netSeries.length > 0;

  const header = ["month", ...cols, "provisional", ...(hasNet ? ["dissolved", "net"] : [])].join(",");
  const rows = data.incorporations.monthly.map((m) => {
    const vals = cols.map((c) => String(m[c] ?? ""));
    const netCols = hasNet
      ? (() => {
          const r = netByMonth.get(m.month);
          return [r ? String(r.dissolved) : "", r ? String(r.net) : ""];
        })()
      : [];
    return [m.month, ...vals, prov.has(m.month) ? "1" : "0", ...netCols].join(",");
  });

  const lines = [
    "# UK SPV Incorporation Index: monthly company incorporations by real-estate SIC code",
    "# Source: Companies House Advanced Search API. Gross counts (incl. since-dissolved).",
    `# Generated: ${data.meta.generated_at}. provisional=1 marks indexing-lag months.`,
    "# Free to reuse with attribution to Property Tax Partners (propertytaxpartners.co.uk).",
    header,
    ...rows,
  ];

  if (data.regional?.regions?.length) {
    lines.push("");
    lines.push("# Regional distribution (SPV incorporations)");
    lines.push(["region", "last12m", "share_last12m_pct", "total_live"].join(","));
    for (const r of data.regional.regions) {
      lines.push([r.region, r.last12m, r.share_last12m_pct, r.total_live].join(","));
    }
  }

  const csv = lines.join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-spv-incorporation-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
