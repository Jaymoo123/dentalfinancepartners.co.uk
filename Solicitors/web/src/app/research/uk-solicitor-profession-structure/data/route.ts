import snapshot from "@/data/sra-profession-structure.json";
import type { SraProfessionStructureSnapshot } from "@/lib/research/sra-profession-structure";

// Static: derived purely from the committed snapshot.
export const dynamic = "force-static";

/**
 * CSV download of the SRA solicitor profession structure summary.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as SraProfessionStructureSnapshot;
  const { roll, firm_structure } = data;

  const rows = [
    ["measure", "value", "unit"],
    ["solicitors_on_the_roll", String(roll.on_the_roll), "count"],
    ["with_practising_certificate", String(roll.with_practising_certificate), "count"],
    ["not_currently_practising", String(roll.not_practising), "count"],
    ["not_practising_share", String(roll.not_practising_pct), "percent"],
    ["incorporated_firms_2011", String(firm_structure.incorporated_pct_2011), "percent"],
    ["incorporated_firms_latest", String(firm_structure.incorporated_pct_latest), "percent"],
    ["llp_firms_latest", String(firm_structure.llp_pct_latest), "percent"],
    ["partnership_firms_latest", String(firm_structure.partnership_pct_latest), "percent"],
  ].map((r) => r.join(","));

  const csv = [
    "# UK Solicitor Profession Structure: the roll, practising certificates and SRA-regulated firm mix.",
    "# STOCK measure of the SRA-regulated profession in England and Wales. NOT a Companies House new-incorporation flow measure.",
    "# Source: SRA Regulated Community Statistics and The Law Society Annual Statistics (aggregate data).",
    "# SRA statistics used with attribution; not OGL. Aggregate only; no named-firm data.",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Accounts for Lawyers (accountsforlawyers.co.uk).",
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-solicitor-profession-structure.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
