import densitySnapshot from "@/data/pharmacy-density-by-region.json";
import workloadSnapshot from "@/data/pharmacy-dispensing-workload.json";
import type {
  PharmacyDensitySnapshot,
  PharmacyWorkloadSnapshot,
} from "@/lib/research/pharmacy-density-workload-index";

// Static: derived purely from the committed snapshots, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV combining the regional density table and the annual
 * dispensing-workload table behind the Pharmacy Density and Dispensing
 * Workload Index. Always in sync with the page because both read the same
 * snapshots.
 */
export function GET() {
  const density = densitySnapshot as unknown as PharmacyDensitySnapshot;
  const workload = workloadSnapshot as unknown as PharmacyWorkloadSnapshot;

  const densityRows = density.regions.map((r) =>
    [r.region, r.pharmacy_count, r.population, r.per_100k].join(",")
  );
  const workloadRows = workload.annual_march_snapshot.map((r) =>
    [r.year, r.total_items, r.pharmacy_count, r.items_per_pharmacy].join(",")
  );

  const csv = [
    "# Pharmacy Density and Dispensing Workload Index",
    `# Source (density): ${density.source.name} (${density.source.resource_title}) + ${density.population_source.name}. Open Government Licence v3.0.`,
    `# Source (workload): ${workload.source.name}. Open Government Licence v3.0.`,
    `# Generated: ${density.pull_date}.`,
    "# Free to reuse with attribution to Pharmacy Tax (pharmacytax.co.uk).",
    "",
    "# Section 1: NHS pharmacies per 100,000 population, by region",
    "region,pharmacy_count,population,per_100k",
    ...densityRows,
    "",
    "# Section 2: Dispensing workload, annual March snapshot",
    "year,total_items,pharmacy_count,items_per_pharmacy",
    ...workloadRows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="pharmacy-density-and-workload-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
