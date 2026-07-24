import snapshot from "@/data/probate-wait-times.json";
import { siteConfig } from "@/config/site";
import type { ProbateWaitTimesSnapshot } from "@/lib/research/types";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

const cols = [
  "applications",
  "grants",
  "applications_digital",
  "applications_paper",
  "mean_weeks_all",
  "median_weeks_all",
  "mean_weeks_digital",
  "median_weeks_digital",
  "mean_weeks_paper",
  "median_weeks_paper",
] as const;

/**
 * CSV of the quarterly probate timeliness series behind the UK Probate Wait
 * Times Index. Always in sync with the page because both read the same
 * committed snapshot.
 */
export function GET() {
  const data = snapshot as unknown as ProbateWaitTimesSnapshot;

  const header = ["quarter", ...cols].join(",");
  const rows = data.series.map((r) => {
    const vals = cols.map((c) => {
      const v = r[c];
      return v === null || v === undefined ? "" : String(v);
    });
    return [r.quarter, ...vals].join(",");
  });

  const csv = [
    "# UK Probate Wait Times Index",
    "# Source: Ministry of Justice, Family Court Statistics Quarterly (probate tables), England and Wales",
    "# Publication: https://www.gov.uk/government/statistics/family-court-statistics-quarterly-january-to-march-2026",
    "# Contains public sector information licensed under the Open Government Licence v3.0",
    `# Compiled by ${siteConfig.name}. Free to reuse with attribution.`,
    `# Generated: ${data.meta.generated_at}. Latest period: ${data.meta.latest_period}. Empty cells = not published in source, never estimated.`,
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-probate-wait-times.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
