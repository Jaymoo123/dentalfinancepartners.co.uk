import snapshot from "@/data/uk-tech-funding-reliefs-index.json";
import type { TechFundingRefiefsIndexSnapshot } from "@/lib/research/tech-funding-reliefs-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the EIS/SEIS time series behind the UK Tech-Funding Reliefs Index.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as TechFundingRefiefsIndexSnapshot;

  const header = ["scheme", "year", "companies_all", "subscriptions", "amount_all_gbp_m"].join(",");

  const eisRows = data.eis.timeSeries.map((r) =>
    ["EIS", r.year, r.companiesAll, r.subscriptions, r.amountAllM ?? ""].join(",")
  );
  const seisRows = data.seis.timeSeries.map((r) =>
    ["SEIS", r.year, r.companiesAll, r.subscriptions, r.amountAllM ?? ""].join(",")
  );

  const csv = [
    "# UK Tech-Funding Reliefs Index: EIS and SEIS funding time series",
    "# EIS from 1993-94, SEIS from 2012-13. UK-wide, all sectors.",
    "# Source: HMRC Enterprise Investment Scheme and Seed Enterprise Investment Scheme statistics (Open Government Licence v3.0).",
    `# Generated: ${data.meta.lastUpdated}. Pull date: ${data.meta.pullDate}.`,
    "# Free to reuse with attribution to Founder Tax Partners (foundertaxpartners.co.uk).",
    header,
    ...eisRows,
    ...seisRows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-tech-funding-reliefs-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
