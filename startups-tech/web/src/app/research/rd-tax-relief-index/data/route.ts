import snapshot from "@/data/rd-tax-relief-index.json";
import type { RdTaxReliefIndexSnapshot } from "@/lib/research/rd-tax-relief-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the claims/cost time series behind the R&D Tax Relief Usage Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as RdTaxReliefIndexSnapshot;

  const header = ["year", "total_claims", "total_cost_gbp_m", "total_expenditure_gbp_m"].join(",");

  const costByYear = new Map(data.costSeries.map((r) => [r.year, r.totalCostM]));
  const expByYear = new Map(data.expenditureSeries.map((r) => [r.year, r.allSchemesM]));

  const rows = data.claimsSeries.map((r) =>
    [r.year, r.totalClaims ?? "", costByYear.get(r.year) ?? "", expByYear.get(r.year) ?? ""].join(",")
  );

  const csv = [
    "# R&D Tax Relief Usage Index: annual claims, cost and qualifying expenditure",
    "# All schemes combined (SME, RDEC, Large Company, Vaccines Research Relief). UK-wide.",
    "# Source: HMRC Research and Development Tax Credits Statistics (Open Government Licence v3.0).",
    `# Generated: ${data.meta.lastUpdated}. Pull date: ${data.meta.pullDate}.`,
    "# Free to reuse with attribution to Founder Tax Partners (foundertaxpartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="rd-tax-relief-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
