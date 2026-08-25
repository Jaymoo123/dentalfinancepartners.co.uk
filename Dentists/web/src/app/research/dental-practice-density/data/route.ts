import snapshot from "@/data/dental-practice-density.json";
import type { DentalPracticeDensitySnapshot } from "@/lib/research/dental-practice-density";

// Static: derived purely from the committed snapshot.
export const dynamic = "force-static";

export function GET() {
  const data = snapshot as unknown as DentalPracticeDensitySnapshot;

  const header = "region,dental_locations,population,per_100k";
  const rows = data.regions
    .filter((r) => r.per_100k !== null)
    .map((r) => `${r.region},${r.dental_locations},${r.population ?? ""},${r.per_100k ?? ""}`);

  const csv = [
    "# Dental Practice Density by Region: CQC-registered dental locations per 100,000 population",
    `# CQC data date: ${data.meta.cqc_data_date}. Population: ONS Mid-2024.`,
    "# Source: CQC Care Directory + ONS Population Estimates (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}.`,
    "# Free to reuse with attribution to Dental Finance Partners (dentalfinancepartners.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="dental-practice-density.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
