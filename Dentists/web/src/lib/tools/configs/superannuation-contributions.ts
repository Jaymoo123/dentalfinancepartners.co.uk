import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcSuperannuation,
  memberTierRate,
  ASSOCIATE_DEFAULT_PENSIONABLE_PCT,
  TIER_EFFECTIVE_DATE,
} from "@/lib/tools/compute/superannuation-contributions";

export const superannuationContributionsTool: GenericTool = {
  kind: "generic",
  slug: "superannuation-contributions",
  name: "NHS Superannuation Earnings & Contribution Calculator",
  category: "NHS Pension",
  oneLiner:
    "Superannuable earnings from NHS fee income, member contribution tier rate, employer cost, tax relief saving, and projected CARE pension growth.",
  embedHeight: 620,
  metaTitle: "NHS Dentist Superannuation Calculator UK 2026 | Dental Finance Partners",
  metaDescription:
    "Calculate your NHS superannuable earnings as a dental associate or principal. Member contribution tier, employer 20.6%, net-of-tax cost, and 1/54th CARE pension accrual. England and Wales rates.",
  intro:
    "Enter your NHS fee income or net pensionable earnings to see your superannuation contribution tier, annual employee and employer costs, the saving after tax relief, and how much guaranteed CARE pension you build in one year.",
  fields: [
    {
      id: "practitionerType",
      label: "Practitioner type",
      type: "select",
      default: "associate",
      options: [
        { value: "associate", label: "Associate (% of gross fee income)" },
        { value: "principal", label: "Principal / practice owner (net pensionable earnings)" },
      ],
    },
    {
      id: "grossFees",
      label: "Gross NHS fee income (£/yr, associates)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
    },
    {
      id: "pensionablePct",
      label: "Pensionable earnings percentage (England/Wales convention: 43.9%)",
      type: "number",
      default: ASSOCIATE_DEFAULT_PENSIONABLE_PCT,
      min: 1,
      max: 100,
      step: 0.1,
      suffix: "%",
      advanced: true,
    },
    {
      id: "principalNetEarnings",
      label: "Net pensionable earnings (£/yr, principals)",
      type: "currency",
      default: 80000,
      min: 0,
      max: 500000,
      step: 1000,
    },
    {
      id: "higherRateTaxpayer",
      label: "Higher-rate taxpayer (income above £50,270)?",
      type: "toggle",
      default: false,
    },
  ],
  compute(values) {
    const isAssociate = values.practitionerType === "associate";
    const grossFees = Number(values.grossFees);
    const pensionablePct = Number(values.pensionablePct);
    const principalNetEarnings = Number(values.principalNetEarnings);
    const higherRate = values.higherRateTaxpayer === true;

    const pensionableEarnings = isAssociate
      ? grossFees * (pensionablePct / 100)
      : principalNetEarnings;

    if (pensionableEarnings <= 0) {
      return {
        headline: { label: "Pensionable earnings", value: "£0", tone: "warn" as const },
        note: "Enter your fee income or net pensionable earnings to see your contribution.",
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
        { label: "Employer contribution (20.6%)", value: gbp(r.employerContribution) },
        { label: "Total contribution to scheme", value: gbp(r.totalContribution) },
        {
          label: "CARE pension added this year (1/54th)",
          value: `${gbp(r.careGrowthPerYear)}/yr guaranteed`,
          strong: true,
        },
      ],
      note: `Tier rates effective ${TIER_EFFECTIVE_DATE} (England/Wales); thresholds shown are 2024/25 values and are uprated with NHS pay awards, so check the current year's bands if you are near a boundary. Higher-rate relief is claimed via self-assessment, not at source. Employer 20.6% (plus a 0.08% administration levy) is borne by the GDS/PDS contract or practice; it does not reduce your take-home but matters for principal cost modelling.`,
    };
  },
  explainer: {
    heading: "How NHS superannuation is calculated for dental practitioners",
    paragraphs: [
      "For associates, your superannuable (pensionable) earnings are not your gross fee income. The England and Wales convention sets net pensionable earnings at 43.9% of gross NHS fee income. This percentage reflects an assumed expenses deduction built into the GDS contract and has been the standard rate used by NHS Pensions for practitioner assessments. You can adjust it in the advanced options if your contract specifies a different figure.",
      "For principals, net pensionable earnings are your gross NHS contract income minus allowable practice expenses, as calculated on your NHS pension certificate. This figure is provided by NHS England or Wales via your annual certificate and differs from your taxable profit.",
      "Your member contribution is determined by which tier your pensionable earnings fall into. There are six tiers, from 5.2% (earnings up to £13,259) up to 12.5% (above £63,994, 2024/25 thresholds). The tier applies to all your pensionable earnings, not just the slice above the threshold. The employer pays 20.6% on top, plus a 0.08% administration levy; a centrally funded top-up takes the total scheme rate to 23.7%, though practices are only charged 20.68%.",
      "Tax relief is available on your member contribution at your marginal rate. For most associates, 20% basic-rate relief is given automatically via the net-pay arrangement. Higher-rate taxpayers (income above £50,270) can claim the additional 20% through self-assessment.",
      "Each year you contribute, you build 1/54th of your pensionable pay as a guaranteed annual pension under the 2015 CARE scheme. This revalues each year by CPI plus 1.5%, providing inflation protection on past accrual.",
      "Worked example 1: an associate generating £120,000 of gross NHS fee income has net pensionable earnings of £52,680 (43.9%). That falls in the 10.7% tier, so the member contribution is £5,636.76 a year (£469.73 a month). As a higher-rate taxpayer the relief is worth £2,254.70, so the true annual cost is £3,382.06 (£281.84 a month). The practice-side employer contribution is £10,852.08, and the year adds £975.56 of guaranteed annual CARE pension (£52,680 divided by 54).",
      "Worked example 2: a principal with net pensionable earnings of £85,000 on their NHS certificate sits in the top 12.5% tier, paying £10,625 a year (£885.42 a month). With 40% relief the net cost is £6,375 (£531.25 a month). The employer contribution on those earnings is £17,510, and the year adds £1,574.07 of guaranteed annual CARE pension.",
    ],
  },
  faqs: [
    {
      question: "Why is only 43.9% of my gross fees counted as pensionable pay?",
      answer:
        "The 43.9% rate is the England and Wales convention for calculating net pensionable earnings for GDS associates. It represents gross NHS fee income after a deemed expenses deduction agreed with NHS Pensions. It is not the same as your actual expenses. The convention is set out in the NHS Pension Scheme regulations for practitioners and is applied by NHS England when issuing your annual pension certificate. Wales uses the same rate. Scotland uses a different system based on the Statement of Dental Remuneration.",
    },
    {
      question: "Does the contribution tier apply to all my earnings or just the excess?",
      answer:
        "The tier rate applies to all your pensionable earnings, not just the slice above the threshold. If your pensionable earnings are £50,000, you pay 10.7% on the full £50,000 (the 2024/25 tier starting at £49,914), not a blended rate. This means moving into a higher tier affects the contribution on your entire pensionable pay, so earnings near a boundary are worth checking carefully.",
    },
    {
      question: "What does the 20.6% employer contribution mean for me as an associate?",
      answer:
        "The employer contribution is paid by the GDS or PDS contractor (the practice or trust) on top of your member contribution. As an associate working under a contract arrangement, you do not pay the 20.6% yourself. For principals and practice owners who employ associates, the 20.6% is a cost on top of the associate's pensionable pay and should be built into your practice cost modelling.",
    },
    {
      question: "Is the 1/54th CARE accrual a good deal compared to a private pension?",
      answer:
        "For most dentists it is. The 1/54th accrual builds a guaranteed, CPI plus 1.5% revalued pension with no investment risk. A private pension equivalent at a 4% drawdown rate would need a fund of roughly 25 times the annual pension income to deliver the same income. For an associate on £80,000 pensionable earnings, one year of NHS pension accrual (about £1,481/yr) would require a private fund of around £37,000 to replicate. The trade-off is that NHS pension accrual cannot be accessed early or drawn down flexibly.",
    },
    {
      question: "How is this different in Scotland and Wales?",
      answer:
        "Wales uses the same England/Wales contribution tier structure and the 43.9% pensionable earnings convention. Scotland operates under the Scottish Public Pensions Agency (SPPA) rather than the NHSBSA. Scottish dental practitioners working under the Statement of Dental Remuneration (SDR) have pensionable earnings calculated differently, and contribution rates may differ. If you work in Scotland, check your figures directly with the SPPA.",
    },
    {
      question: "When were the contribution tiers last changed?",
      answer:
        "The current six-tier structure was phased in from October 2022, with the final rates (5.2% to 12.5%) in force from 1 April 2024. The rates are settled, but the earnings thresholds are uprated in line with NHS pay awards, so the boundary figures move most years; this tool uses the 2024/25 thresholds. The employer rate charged to contractors is 20.6% plus a 0.08% administration levy, with the centrally funded element taking the total scheme rate to 23.7% from April 2024. Always verify current bands at nhsbsa.nhs.uk before making financial decisions.",
    },
  ],
  related: [
    { label: "Associate Take-Home Calculator", href: "/calculators/associate-take-home" },
    { label: "Principal Extraction Calculator", href: "/calculators/principal-extraction" },
    { label: "UDA Value Calculator", href: "/calculators/uda-value" },
  ],
};
