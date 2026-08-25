import snapshot from "@/data/construction-ppr-league.json";
import type { PprLeagueSnapshot } from "@/lib/research/ppr-league";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the construction payment practices league. Always in
 * sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as unknown as PprLeagueSnapshot;

  const header = [
    "company_name",
    "company_number",
    "sic_code",
    "sic_label",
    "reporting_period_end",
    "average_days_to_pay",
    "pct_invoices_within_30_days",
    "pct_invoices_31_to_60_days",
    "pct_invoices_later_than_60_days",
    "pct_invoices_not_paid_within_agreed_terms",
    "retention_clauses_in_all_construction_contracts",
  ].join(",");

  const esc = (v: string) => (v.includes(",") ? `"${v.replace(/"/g, '""')}"` : v);

  const rows = data.companies.map((c) =>
    [
      esc(c.name),
      c.company_number,
      c.sic_code ?? "",
      esc(c.sic_label),
      c.end,
      c.atp,
      c.pct_within_30,
      c.pct_31_60,
      c.pct_later_60,
      c.pct_not_agreed_terms,
      c.retention_clauses_all,
    ].join(","),
  );

  const csv = [
    "# UK Construction Payment Practices League: large construction businesses' own statutory",
    "# payment practice disclosures (Reporting on Payment Practices and Performance Regulations 2017).",
    "# average_days_to_pay is each company's overall reported average across all supplier invoices,",
    "# not isolable to construction contracts alone. Companies House SIC-cross-referenced to genuine",
    "# construction-sector reporters only.",
    `# Generated: ${data.meta.generated_at}. Cohort cutoff: filings ending on/after ${data.meta.current_cohort_cutoff}.`,
    "# Free to reuse with attribution to Trade Tax Specialists (tradetaxspecialists.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-construction-payment-practices-league.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
