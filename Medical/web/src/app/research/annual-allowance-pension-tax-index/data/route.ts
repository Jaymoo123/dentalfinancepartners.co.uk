import snapshot from "@/data/nhs-aa-index.json";
import type { AaIndexSnapshot } from "@/lib/research/nhs-aa-index";

// Static: derived purely from the committed snapshot so it can be prerendered.
// Both this route and the report page import the same JSON so they can never drift.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the HMRC whole-market annual allowance series behind the
 * Annual Allowance Pension Tax Index.  Always in sync with the page because
 * both read the same snapshot JSON.
 *
 * NHS FOI-specific figures (practitioner/officer counts) are not included in
 * this CSV; they are downloadable directly from NHSBSA and are linked in the
 * methodology section of the report page.
 */
export function GET() {
  const data = snapshot as unknown as AaIndexSnapshot;

  const header =
    "tax_year,standard_annual_allowance_gbp,scheme_pays_charges_n,scheme_pays_charge_value_gbp_m,sa_individuals_over_aa_n,sa_excess_contributions_value_gbp_m,status";

  const rows = data.hmrc.series.map((r) => {
    const status = r.provisional ? "provisional" : r.revised ? "revised" : "";
    return [
      r.tax_year,
      String(r.standard_aa_gbp),
      r.aft_charges_n !== null ? String(r.aft_charges_n) : "",
      r.aft_charges_value_gbp_m !== null ? String(r.aft_charges_value_gbp_m) : "",
      String(r.sa_individuals_over_aa_n),
      String(r.sa_excess_value_gbp_m),
      status,
    ].join(",");
  });

  const csv = [
    "# Annual Allowance Pension Tax Index: annual allowance charges across all UK registered pension schemes",
    "# Source: HMRC Private pension statistics, Table 7 (July 2025 edition). Open Government Licence v3.0.",
    "# Whole-market (all UK registered schemes), NOT NHS-only. NHS-specific figures: see NHSBSA FOI-02228.",
    "# scheme_pays_* columns begin in 2012/13 (Accounting for Tax); earlier years are blank.",
    "# sa_excess_contributions_value_gbp_m is contributions ABOVE the allowance, NOT a tax charge.",
    "# 2022/23 Self Assessment counts are depressed by McCloud reporting moving to HMRC's adjustment service.",
    "# status=provisional (2023/24) or revised (2016/17-2022/23).",
    "# Free to reuse with attribution to Medical Accountants UK (medicalaccounts.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition":
        'attachment; filename="annual-allowance-pension-tax-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
