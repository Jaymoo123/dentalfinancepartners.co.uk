import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcNHSPension, type TaxBand } from "@/lib/tools/compute/nhs-pension";

export const nhsPensionTool: GenericTool = {
  kind: "generic",
  slug: "nhs-pension-annual-allowance",
  name: "NHS Pension Annual Allowance Calculator",
  category: "NHS Pension",
  oneLiner:
    "Threshold income and pension growth in, tapered allowance and tax charge out. 2025/26 limits.",
  embedHeight: 520,
  metaTitle: "NHS Pension Annual Allowance Calculator 2025/26 | Tapered Allowance",
  metaDescription:
    "Free NHS pension annual allowance calculator. Calculate your 2025/26 tapered annual allowance and potential tax charge. Threshold income and adjusted income thresholds applied.",
  intro:
    "The NHS pension annual allowance can be tapered for high earners, reducing from the standard £60,000 to as low as £10,000. Enter your threshold income, annual pension growth from your NHS Pension Savings Statement, and tax band to see your allowance and any potential charge.",
  fields: [
    {
      id: "thresholdIncome",
      label: "Threshold income",
      type: "currency",
      default: 150000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "NHS salary + other income minus employee pension contributions",
    },
    {
      id: "pensionGrowth",
      label: "Annual pension growth",
      type: "currency",
      default: 40000,
      min: 0,
      max: 200000,
      step: 1000,
      help: "From your NHS Pension Savings Statement",
    },
    {
      id: "taxBand",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute(values) {
    const thresholdIncome = Number(values.thresholdIncome);
    const pensionGrowth = Number(values.pensionGrowth);
    const taxBand = String(values.taxBand) as TaxBand;
    const r = calcNHSPension({ thresholdIncome, pensionGrowth, taxBand });

    const rows = [
      { label: "Threshold income", value: gbp(thresholdIncome) },
      { label: "Pension growth (from statement)", value: gbp(pensionGrowth) },
      { label: "Adjusted income", value: gbp(r.adjustedIncome) },
      {
        label: "Annual allowance",
        value: `${gbp(r.annualAllowance)}${r.isTapered ? " (tapered)" : " (standard)"}`,
        strong: true as const,
      },
      ...(r.excess > 0
        ? [
            { label: "Excess pension growth", value: gbp(r.excess) },
            { label: "Tax charge", value: gbp(r.taxCharge), strong: true as const },
            { label: "Effective cost as % of growth", value: pct(r.effectiveCost) },
          ]
        : []),
    ];

    return {
      headline: r.excess > 0
        ? {
            label: "Annual allowance charge",
            value: gbp(r.taxCharge),
            sub: `Allowance: ${gbp(r.annualAllowance)} · Excess: ${gbp(r.excess)}`,
            tone: "warn" as const,
          }
        : {
            label: "Annual allowance",
            value: gbp(r.annualAllowance),
            sub: r.isTapered ? "Tapered, no excess charge" : "Standard allowance, no excess charge",
            tone: "good" as const,
          },
      rows,
      note: r.isTapered
        ? "Your allowance is tapered because threshold income exceeds £200,000 and adjusted income exceeds £260,000. Allowance reduces by £1 for every £2 above £260,000, with a floor of £10,000."
        : "Tapering only applies when threshold income exceeds £200,000 AND adjusted income exceeds £260,000. Your position does not currently meet both tests.",
    };
  },
  explainer: {
    heading: "How the tapered annual allowance works",
    paragraphs: [
      "The annual allowance is the maximum pension growth (employer + employee contributions, plus DB accrual) you can have in a tax year without a tax charge. The standard allowance for 2025/26 is £60,000.",
      "Tapering reduces this allowance for high earners. It applies when both: your threshold income exceeds £200,000, AND your adjusted income (threshold income plus employer pension contributions) exceeds £260,000. The allowance reduces by £1 for every £2 of adjusted income above £260,000, down to a minimum of £10,000.",
      "NHS doctors are particularly exposed because the deemed employer contribution to the NHS Pension Scheme can be significant, pushing adjusted income well above the £260,000 limit even on a moderate NHS salary. Check your Pension Savings Statement from NHSBSA each year.",
    ],
  },
  faqs: [
    {
      question: "Where do I find my annual pension growth figure?",
      answer:
        "Your Pension Savings Statement (PSS) from the NHS Business Services Authority (NHSBSA). They must issue one if your pension growth exceeds the annual allowance. You can also request one from NHSBSA. The figure is called the 'pension input amount' and is reported for the pension input period (6 April to 5 April).",
    },
    {
      question: "What is the difference between threshold income and adjusted income?",
      answer:
        "Threshold income is your total taxable income (employment, self-employment, investment, NHS salary) minus your own employee pension contributions, but NOT employer contributions. Adjusted income adds back the employer pension contributions (which for NHS members can be 20.68% or more of salary). Most of the tapering bite comes from employer contributions inflating adjusted income above £260,000.",
    },
    {
      question: "What is Scheme Pays and should I use it?",
      answer:
        "Scheme Pays lets you ask the NHS Pension Scheme to pay your annual allowance charge directly to HMRC, with the cost deducted from your eventual pension. It is available as of right if the charge exceeds £2,000 and your pension input in that scheme exceeded the annual allowance. It avoids a large cash payment now but reduces future pension income.",
    },
    {
      question: "Can I use carry-forward to reduce my charge?",
      answer:
        "Yes. If you had unused annual allowance in any of the three prior tax years (and were a member of a registered pension scheme in those years), you can carry it forward to increase your current year's effective allowance. This can reduce or eliminate an annual allowance charge. Carry-forward must be assessed over all registered schemes, not just the NHS Pension.",
    },
  ],
};
