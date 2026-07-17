import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcPensionOptimisation } from "@/lib/tools/compute/pension";

export const pensionTool: GenericTool = {
  kind: "generic",
  slug: "pension-contribution-optimiser",
  name: "Pension Contribution Optimiser",
  category: "Limited Company",
  oneLiner: "Employer pension contributions reduce corporation tax. See the real cost to your company and whether pension beats taking the same money as dividend.",
  embedHeight: 560,
  metaTitle: "Pension Contribution Optimiser | UK Limited Company Calculator",
  metaDescription:
    "Free pension contribution calculator for UK limited company directors. See the corporation tax saved, real cost to company, and advantage over taking dividends. 2026/27 rates.",
  intro:
    "For owner-managed limited companies, employer pension contributions are usually the cheapest way to extract retained profit. Salary is subject to NI; dividends face dividend tax. Employer pension goes in gross, saves corporation tax, and bypasses both. The calculator shows the tax saving, the real cost to your company, and how the pension stacks up against simply taking the same money as dividend.",
  fields: [
    {
      id: "profit",
      label: "Company profit (before extraction)",
      type: "currency",
      default: 150000,
      min: 0,
      max: 2000000,
      step: 1000,
    },
    {
      id: "salary",
      label: "Director salary (already taken)",
      type: "currency",
      default: 12570,
      min: 0,
      max: 250000,
      step: 500,
    },
    {
      id: "contribution",
      label: "Proposed employer pension contribution",
      type: "currency",
      default: 30000,
      min: 0,
      max: 60000,
      step: 500,
    },
    {
      id: "adjustedIncome",
      label: "Your adjusted income (for taper test)",
      type: "currency",
      default: 150000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Salary + dividends + employer pension contributions. Used to calculate tapered annual allowance above £260,000.",
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const salary = Number(values.salary);
    const contribution = Number(values.contribution);
    const adjustedIncome = Number(values.adjustedIncome);
    const r = calcPensionOptimisation(profit, salary, contribution, adjustedIncome);
    return {
      headline: {
        label: "In your pension",
        value: gbp(r.contribution),
        sub: r.capped
          ? `capped at annual allowance (${gbp(r.allowance)})`
          : `real cost to company: ${gbp(r.realCostToCompany)}`,
        tone: "good",
      },
      rows: [
        { label: "Annual allowance (after taper)", value: gbp(r.allowance) },
        { label: "Corp tax without pension", value: gbp(r.ctNoPension) },
        { label: "Corp tax with pension", value: gbp(r.ctWithPension) },
        { label: "Corp tax saved", value: gbp(r.ctSaved), strong: true },
        { label: "Real cost to company", value: gbp(r.realCostToCompany) },
        { label: "Net dividend if taken instead", value: gbp(r.netDividendIfTakenInstead) },
        { label: "Pension advantage", value: "+" + gbp(r.pensionAdvantage), strong: true },
      ],
      note: r.capped
        ? "Contribution capped at your tapered annual allowance. You may be able to use carry-forward from the previous three tax years."
        : "Pension money is locked until age 55 (rising to 57 in 2028). 25% can be taken tax-free at retirement; the rest is taxed as income.",
    };
  },
  explainer: {
    heading: "Why employer pension beats salary and dividend",
    paragraphs: [
      "An employer pension contribution reduces your company's taxable profit, saving corporation tax at your marginal rate. That saving offsets the cost of the contribution, so the real cost to the company is always less than the face value.",
      "If you took the same amount as dividend instead, you would first pay corporation tax on it, then dividend tax on what is left. The pension route skips both layers and lands the full gross amount in your pension.",
      "Worked example: a director with company profit of £150,000 (already taking a £12,570 salary) makes a £30,000 employer pension contribution. Without the pension, profit subject to corporation tax is £137,430, producing a CT bill of £32,669 at the marginal rate (19% on the first £50,000, 26.5% on the remainder). With the pension, taxable profit falls to £107,430 and CT drops to £24,719, saving £7,950. The real cost of putting £30,000 into the pension is only £22,050 (£30,000 minus the £7,950 CT saving). If the same £30,000 had been taken as dividend instead, corporation tax would have consumed £7,950 first (at the 26.5% marginal rate), leaving £22,050 to distribute, then dividend tax at 10.75% basic rate on the taxable portion would have cost roughly £2,317, leaving net dividend cash of £19,733. The pension advantage over dividend extraction is approximately £10,267 on a £30,000 contribution.",
    ],
  },
  faqs: [
    {
      question: "What is the annual pension allowance for 2026/27?",
      answer:
        "The standard annual allowance is £60,000. If your adjusted income (salary + dividends + employer pension contributions) exceeds £260,000, the allowance tapers by £1 for every £2 of excess, down to a minimum of £10,000.",
    },
    {
      question: "Can I carry forward unused pension allowance?",
      answer:
        "Yes, if you were a member of a registered pension scheme in the previous three tax years, you can carry forward any unused annual allowance from those years. This can let you contribute more than £60,000 in a single year.",
    },
    {
      question: "Does this model personal pension contributions?",
      answer:
        "No, this models employer contributions only, which is the most tax-efficient route for limited company directors. Personal contributions made from post-tax salary get income tax relief but do not save NI or reduce corporation tax.",
    },
  ],
};
