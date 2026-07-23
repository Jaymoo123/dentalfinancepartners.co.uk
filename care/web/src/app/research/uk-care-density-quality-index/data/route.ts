import { siteConfig } from "@/config/site";
import snapshot from "@/data/uk-care-density-quality-index.json";
import type { CareDensityQualitySnapshot } from "@/lib/research/care-density-quality-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the local-authority table behind the UK Care Home Density
 * & Quality Index. Always in sync with the page because both read the same
 * committed snapshot. Aggregated by local authority only -- no individual care
 * home or provider is included in this file.
 */
export function GET() {
  const data = snapshot as unknown as CareDensityQualitySnapshot;

  const header = [
    "local_authority",
    "active_care_homes",
    "beds_total",
    "population_65_plus",
    "population_total",
    "beds_per_100_over65",
    "good_or_above_pct",
    "deactivations_12m",
    "churn_rate_pct",
  ].join(",");

  const rows = data.local_authorities.map((r) =>
    [
      `"${r.local_authority.replace(/"/g, '""')}"`,
      r.active_care_homes,
      r.beds_total,
      r.population_65_plus ?? "",
      r.population_total ?? "",
      r.beds_per_100_over65 ?? "",
      r.good_or_above_pct ?? "",
      r.deactivations_12m,
      r.churn_rate_pct ?? "",
    ].join(",")
  );

  const csv = [
    "# UK Care Home Density & Quality Index: local-authority level care home beds, CQC rating quality and closure churn",
    "# England only. Aggregated by local authority -- no individual care home or provider is named.",
    "# Source: CQC HSCA Active Locations, Deactivated Locations and ratings extracts; ONS mid-2024 (MYE24) population estimates.",
    "# Licence: Open Government Licence v3.0.",
    `# Generated: ${data.meta.generated_at}. Churn window: ${data.meta.churn_window.from} to ${data.meta.churn_window.to}.`,
    `# Free to reuse with attribution to ${siteConfig.name} (${siteConfig.domain}).`,
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-care-density-quality-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
