import snapshot from "@/data/pensions-iht-2027.json";
import { siteConfig } from "@/config/site";
import type { PensionsIhtSnapshot } from "@/lib/research/types";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * CSV of the sourced impact and context figures behind the Pensions into IHT
 * 2027 impact model. Worked scenarios are deliberately excluded (they are
 * illustrations, not statistics (see the page's methodology section).
 */
export function GET() {
  const data = snapshot as unknown as PensionsIhtSnapshot;
  const { impact, context_series } = data;

  const rows: string[] = [
    `impact,${impact.reference_year},estates_with_inheritable_pension_wealth,${impact.estates_with_inheritable_pension_wealth},estates`,
    `impact,${impact.reference_year},newly_liable_estates,${impact.newly_liable_pa},estates`,
    `impact,${impact.reference_year},estates_paying_more,${impact.paying_more_pa},estates`,
    `impact,${impact.reference_year},average_iht_increase,${impact.average_iht_increase_gbp},GBP`,
    ...impact.exchequer_yield_by_year.map((y) => `impact,${y.year},exchequer_yield,${y.gbp_m},GBP_m`),
  ];

  for (const y of context_series.years) {
    if (y.taxpaying_estates !== null) {
      rows.push(`context,${y.tax_year},taxpaying_estates,${y.taxpaying_estates},estates`);
    }
    rows.push(`context,${y.tax_year},iht_liabilities,${y.liabilities_gbp_bn},GBP_bn`);
  }
  const lastYear = context_series.years[context_series.years.length - 1]?.tax_year;
  rows.push(`context,${lastYear},share_of_uk_deaths,${context_series.share_of_deaths_2022_23_pct},pct`);
  rows.push(`context,${lastYear},average_liability,${context_series.average_liability_2022_23_gbp},GBP`);

  const csv = [
    "# Pensions into Inheritance Tax from April 2027: impact and context figures",
    '# Impact rows: HMRC policy paper / TIIN "Inheritance Tax on unused pension funds and death benefits", 21 Jul 2025.',
    '# Context rows: HMRC "Inheritance Tax liabilities statistics" commentary, 31 Jul 2025 (data to 2022-23).',
    `# Generated: ${data.meta.generated_at}. Commencement of measure: 6 April 2027.`,
    `# Free to reuse with attribution to ${siteConfig.name} (${siteConfig.url}).`,
    "section,year,metric,value,unit",
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="pensions-iht-2027-impact.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
