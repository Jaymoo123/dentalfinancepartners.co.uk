import snapshot from "@/data/uk-sector-insolvency-league.json";
import type { SectorInsolvencyLeagueSnapshot } from "@/lib/research/sector-insolvency-league";

export const dynamic = "force-static";

/** Press-ready CSV of the UK Sector Insolvency League: annual counts by SIC section. */
export function GET() {
  const data = snapshot as unknown as SectorInsolvencyLeagueSnapshot;

  const years = data.sections[0]?.annual.map((a) => a.year) ?? [];
  const header = ["sic_section", "sector_label", "ttm_total", "ttm_share_pct", ...years.map((y) => `y${y}`)].join(",");

  const rows = data.sections.map((s) => {
    const byYear = new Map(s.annual.map((a) => [a.year, a.total]));
    return [
      s.code,
      `"${s.label.replace(/"/g, '""')}"`,
      s.ttm_total,
      s.ttm_share_pct ?? "",
      ...years.map((y) => byYear.get(y) ?? ""),
    ].join(",");
  });

  const csv = [
    "# UK Sector Insolvency League: company insolvencies by SIC 2007 one-digit section",
    "# England and Wales. TTM = trailing 12 months.",
    "# Source: The Insolvency Service, Company Insolvency Statistics, Industry Tables (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Holloway Davies (hollowaydavies.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-sector-insolvency-league.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
