import snapshot from "@/data/uk-small-business-barometer.json";
import type { SmeBarometerSnapshot } from "@/lib/research/sme-barometer";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the State of UK Small Business Barometer: quarterly
 * company register series plus annual insolvency and population totals.
 */
export function GET() {
  const data = snapshot as unknown as SmeBarometerSnapshot;

  const insolvencyByYear = new Map(data.insolvency.annual.map((r) => [r.year, r.total]));
  const populationByYear = new Map(data.population.timeseries.map((r) => [r.year, r.total]));

  const header = [
    "quarter_end",
    "incorporations",
    "dissolutions",
    "net_formation",
    "register_total",
    "register_effective",
    "calendar_year",
    "insolvencies_that_year",
    "uk_business_population_that_year",
  ].join(",");

  const rows = data.register.quarterly.map((q) => {
    const year = Number(q.quarter_end.slice(0, 4));
    return [
      q.quarter_end,
      q.incorporations,
      q.dissolutions,
      q.net,
      q.register_total,
      q.register_effective,
      year,
      insolvencyByYear.get(year) ?? "",
      populationByYear.get(year) ?? "",
    ].join(",");
  });

  const csv = [
    "# State of UK Small Business Barometer: quarterly company register series",
    "# with annual company insolvencies (England and Wales) and UK business population for context.",
    "# Sources: Companies House, The Insolvency Service, ONS/DBT Business Population Estimates.",
    "# Licence: Open Government Licence v3.0.",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Holloway Davies (hollowaydavies.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-small-business-barometer.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
