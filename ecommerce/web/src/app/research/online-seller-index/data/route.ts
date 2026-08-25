import data from "@/data/online-seller-index.json";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the quarterly SIC 47910 incorporations/dissolutions series
 * behind the UK Online Seller Business Index. Always in sync with the page
 * because both read the same snapshot.
 */
export function GET() {
  const header = ["quarter", "incorporations", "dissolutions", "net"].join(",");
  const rows = data.quarterlyChurn47910.quarters.map((q) =>
    [q.quarter, q.incorporations, q.dissolutions, q.net].join(","),
  );

  const csv = [
    "# UK Online Seller Business Index: quarterly SIC 47910 incorporations and dissolutions",
    "# SIC 47910: retail sale via mail order houses or via internet.",
    "# Source: Companies House Advanced Search API (Open Government Licence v3.0).",
    `# Generated: ${data.meta.lastUpdated}. Pull date: ${data.meta.pullDate}.`,
    "# Free to reuse with attribution to Ecommerce Finance (ecommercefinance.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="online-seller-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
