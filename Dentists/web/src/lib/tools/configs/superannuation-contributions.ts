import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcSuperannuation,
  memberTierRate,
  TIER_EFFECTIVE_DATE,
} from "@/lib/tools/compute/superannuation-contributions";

export const superannuationContributionsTool: GenericTool = {
  kind: "generic",
  slug: "superannuation-contributions",
  name: "NHS Superannuation Earnings & Contribution Calculator",
  category: "NHS Pension",
  oneLiner:
    "Member contribution tier rate from your net pensionable earnings, employer cost, tax relief saving, and projected CARE pension growth.",
  embedHeight: 620,
  metaTitle: "NHS Dentist Superannuation Calculator UK 2026",
  metaDescription:
    "Calculate your NHS superannuable earnings as a dental associate or principal. Member contribution tier, employer 23.7%, net-of-tax cost, and 1/54th CARE pension accrual. England and Wales rates.",
  intro:
    "Enter the net pensionable earnings figure from your own NHS pension paperwork to see your superannuation contribution tier, annual employee and employer costs, the saving after tax relief, and how much guaranteed CARE pension you build in one year.",
  fields: [
    {
      id: "pensionableEarnings",
      label: "Net pensionable earnings (£/yr)",
      type: "currency",
      default: 0,
      min: 0,
      max: 500000,
      step: 1000,
      help: "This is not your gross NHS fee income, and there is no percentage of gross that reliably produces it. Take the figure from your own paperwork: practitioners use the net pensionable earnings on their annual certificate of pensionable profits (the NHS pension certificate you or your accountant submit to NHSBSA), and a performer on a GDS or PDS contract uses the amount the contract provider has allocated to them, shown on the Annual Reconciliation Report. If you do not have either to hand, ask the practice or NHSBSA rather than estimating.",
    },
    {
      id: "higherRateTaxpayer",
      label: "Higher-rate taxpayer (income above £50,270)?",
      type: "toggle",
      default: false,
    },
  ],
  compute(values) {
    const higherRate = values.higherRateTaxpayer === true;
    const pensionableEarnings = Number(values.pensionableEarnings);

    if (pensionableEarnings <= 0) {
      return {
        headline: { label: "Pensionable earnings", value: "£0", tone: "warn" as const },
        note: "Enter the net pensionable earnings from your NHS pension certificate or your Annual Reconciliation Report allocation to see your contribution.",
      };
    }

    const r = calcSuperannuation(pensionableEarnings);
    const tierPct = pct(r.memberRate * 100, 1);
    const netCost = higherRate ? r.netCostHigherRatepayer : r.netCostBasicRatepayer;
    const monthlyNetCost = higherRate ? r.monthlyNetCostHigher : r.monthlyNetCostBasic;
    const taxRelief = higherRate ? r.taxReliefHigher : r.taxReliefBasic;
    const reliefLabel = higherRate ? "40% higher-rate" : "20% basic-rate";

    return {
      headline: {
        label: "Net annual cost after tax relief",
        value: gbp(netCost),
        sub: `${gbp(monthlyNetCost)}/month · Contribution tier: ${tierPct} · ${reliefLabel} relief`,
        tone: "default" as const,
      },
      rows: [
        { label: "Pensionable earnings", value: gbp(r.pensionableEarnings) },
        { label: "Member contribution rate", value: tierPct },
        { label: "Annual member contribution (gross)", value: gbp(r.memberContribution) },
        { label: `Tax relief (${reliefLabel})`, value: gbp(taxRelief) },
        { label: "Net cost to you per year", value: gbp(netCost), strong: true },
        { label: "Employer contribution (23.7%)", value: gbp(r.employerContribution) },
        { label: "Total contribution to scheme", value: gbp(r.totalContribution) },
        {
          label: "CARE pension added this year (1/54th)",
          value: `${gbp(r.careGrowthPerYear)}/yr guaranteed`,
          strong: true,
        },
      ],
      note: `Tier thresholds and rates effective ${TIER_EFFECTIVE_DATE}, England and Wales only (Scotland and Northern Ireland run different tier tables). The rates have been settled since 1 April 2024; the thresholds are uprated with NHS pay awards, so check the current year's bands if you are near a boundary. Higher-rate relief is claimed via self-assessment, not at source. Employer 23.7% (plus a 0.08% administration levy), the rate from 1 April 2024, is borne by the GDS/PDS contract or practice; it does not reduce your take-home but matters for principal cost modelling.`,
    };
  },
  explainer: {
    heading: "How NHS superannuation is calculated for dental practitioners",
    paragraphs: [
      "Your superannuable (pensionable) earnings are not your gross NHS fee income, and this calculator will not guess them for you. For a practitioner, net pensionable earnings are NHS-derived income after the scheme's permitted expenses, as set out on the annual certificate of pensionable profits submitted to NHSBSA. That figure differs from your taxable profit. For a performer on a GDS or PDS contract, the pensionable amount is whatever the contract provider has allocated to you and declared on the Annual Reconciliation Report.",
      "There is a 43.9% figure in this area and it is widely misquoted. It is the ceiling on the net pensionable earnings that can be declared against a single GDS or PDS contract, expressed as a share of that contract's Total Contract Value, and it covers every dentist working on the contract combined. It is not a rate that turns one dentist's gross fees into their pensionable pay, and a dentist cannot claim a colleague's share of the pool. Use your own allocated or certified figure instead.",
      "Your member contribution is determined by which tier your pensionable earnings fall into. There are six tiers, from 5.2% (earnings up to £13,259) up to 12.5% (earnings of £67,669 and above) on the 2026/27 England and Wales thresholds. The tier applies to all your pensionable earnings, not just the slice above the threshold. The employer pays 23.7% on top (the rate from 1 April 2024, up from 20.6%), plus a 0.08% administration levy, so 23.78% in total.",
      "Tax relief is available on your member contribution at your marginal rate. For most associates, 20% basic-rate relief is given automatically via the net-pay arrangement. Higher-rate taxpayers (income above £50,270) can claim the additional 20% through self-assessment.",
      "Each year you contribute, you build 1/54th of your pensionable pay as a guaranteed annual pension under the 2015 CARE scheme. This revalues each year by CPI plus 1.5%, providing inflation protection on past accrual.",
      "Worked example 1: an associate whose certificate shows net pensionable earnings of £52,680. On the 2026/27 England and Wales thresholds that falls in the 9.8% tier (£35,156 to £52,778), so the member contribution is £5,162.64 a year (£430.22 a month). As a higher-rate taxpayer the relief is worth £2,065.06, so the true annual cost is £3,097.58 (£258.13 a month). The practice-side employer contribution at 23.7% is £12,485.16, and the year adds £975.56 of guaranteed annual CARE pension (£52,680 divided by 54).",
      "Worked example 2: a principal with net pensionable earnings of £85,000 on their NHS certificate sits in the top 12.5% tier, paying £10,625 a year (£885.42 a month). With 40% relief the net cost is £6,375 (£531.25 a month). The employer contribution on those earnings at 23.7% is £20,145, and the year adds £1,574.07 of guaranteed annual CARE pension.",
    ],
  },
  faqs: [
    {
      question: "Where do I find my net pensionable earnings figure?",
      answer:
        "From your own NHS pension paperwork, not from a percentage of your gross fees. A practitioner takes it from the annual certificate of pensionable profits submitted to NHSBSA, which starts from NHS-derived income and applies the scheme's permitted expenses rules. A performer on a GDS or PDS contract takes the amount the contract provider has allocated to them, which is reconciled on the Annual Reconciliation Report. The 43.9% figure you may have seen is the ceiling on declared net pensionable earnings for a whole contract, shared across every dentist on it, so applying it to your own gross fees can give a badly wrong answer in either direction. If neither document is to hand, ask the practice or NHSBSA.",
    },
    {
      question: "Does the contribution tier apply to all my earnings or just the excess?",
      answer:
        "The tier rate applies to all your pensionable earnings, not just the slice above the threshold. If your pensionable earnings are £50,000, you pay 9.8% on the full £50,000 (the 2026/27 England and Wales tier running from £35,156 to £52,778), not a blended rate. This means moving into a higher tier affects the contribution on your entire pensionable pay, so earnings near a boundary are worth checking carefully.",
    },
    {
      question: "What does the 23.7% employer contribution mean for me as an associate?",
      answer:
        "The employer contribution is paid by the GDS or PDS contractor (the practice or trust) on top of your member contribution. As an associate working under a contract arrangement, you do not pay the 23.7% yourself. For principals and practice owners who employ associates, the 23.7% (the rate from 1 April 2024, up from 20.6%) is a cost on top of the associate's pensionable pay and should be built into your practice cost modelling.",
    },
    {
      question: "Is the 1/54th CARE accrual a good deal compared to a private pension?",
      answer:
        "For most dentists it is. The 1/54th accrual builds a guaranteed, CPI plus 1.5% revalued pension with no investment risk. A private pension equivalent at a 4% drawdown rate would need a fund of roughly 25 times the annual pension income to deliver the same income. For an associate on £80,000 pensionable earnings, one year of NHS pension accrual (about £1,481/yr) would require a private fund of around £37,000 to replicate. The trade-off is that NHS pension accrual cannot be accessed early or drawn down flexibly.",
    },
    {
      question: "How is this different in Scotland and Wales?",
      answer:
        "Wales uses the same England and Wales contribution tier structure and the same certificate-based approach to net pensionable earnings. Scotland operates under the Scottish Public Pensions Agency (SPPA) rather than the NHSBSA. Scottish dental practitioners working under the Statement of Dental Remuneration (SDR) have pensionable earnings calculated differently, and contribution rates may differ. If you work in Scotland, check your figures directly with the SPPA.",
    },
    {
      question: "When were the contribution tiers last changed?",
      answer:
        "The current six-tier structure was phased in from October 2022, with the final rates (5.2% to 12.5%) in force from 1 April 2024. The rates are settled, but the earnings thresholds are uprated in line with NHS pay awards, so the boundary figures move most years; this tool uses the 2026/27 England and Wales thresholds, in force from 1 April 2026 after a 3.8% CPI uprating. The employer contribution rate is 23.7% from 1 April 2024 (up from 20.6%), plus a 0.08% administration levy, so 23.78% in total. Always verify current bands at nhsbsa.nhs.uk before making financial decisions.",
    },
  ],
  related: [
    { label: "Associate Take-Home Calculator", href: "/calculators/associate-take-home" },
    { label: "Principal Extraction Calculator", href: "/calculators/principal-extraction" },
    { label: "UDA Value Calculator", href: "/calculators/uda-value" },
  ],
};
