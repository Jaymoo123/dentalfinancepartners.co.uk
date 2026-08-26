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
    // Mirrors the status column on the report page, deliberately: a reader of the
    // raw file must not be able to reach a different conclusion from a reader of
    // the page.  The incompleteness flag comes first because it is the one that
    // changes how the row may be used.
    const status = r.aft_incomplete
      ? "aft figures incomplete - excluded from trend"
      : r.provisional
      ? "provisional"
      : r.revised
      ? "revised"
      : "";
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
    "# Source: HMRC Private pension statistics, Table 7 (July 2026 edition, published 30 July 2026). Open Government Licence v3.0.",
    "# Rows to 2023/24 are from the Table 7 CSV, read 26 August 2026. The 2024/25 row was not yet in that CSV",
    "# and is taken from the same edition's published commentary, read the same day; its standard annual",
    "# allowance is the legislated figure from gov.uk, Pension schemes rates, read the same day.",
    "# Whole-market (all UK registered schemes), NOT NHS-only. NHS-specific figures: see NHSBSA FOI-02228.",
    "# scheme_pays_* columns begin in 2012/13 (Accounting for Tax); earlier years are blank.",
    "# sa_excess_contributions_value_gbp_m is contributions ABOVE the allowance, NOT a tax charge.",
    "# 2022/23 Self Assessment counts are depressed by McCloud reporting moving to HMRC's adjustment service.",
    "# status=revised (2020/21, 2021/22, 2022/23, 2023/24: figures amended by the July 2026 edition; 2006/07-2019/20 unchanged).",
    "# status=aft figures incomplete - excluded from trend (2024/25). HMRC states revisions may be particularly",
    "# substantial for the 2024/25 Accounting for Tax figures, because some public sector schemes have been delayed,",
    "# especially those implementing the McCloud remedy, and the deadline for reporting many 2024/25 Scheme Pays",
    "# cases is February 2027. Dividing that value by that count gives about GBP 10,800, which reads as a reversal",
    "# of the falling mean charge but is an artefact of missing public sector schemes. Do not treat the 2024/25",
    "# scheme_pays_* cells as comparable with earlier years; the report page excludes them from its chart and its",
    "# derived mean for this reason. The 2024/25 Self Assessment cells carry no such warning and are comparable.",
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
