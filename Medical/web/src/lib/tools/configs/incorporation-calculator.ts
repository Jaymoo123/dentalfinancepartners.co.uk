import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcIncorporation } from "@/lib/tools/compute/incorporation";

export const incorporationTool: GenericTool = {
  kind: "generic",
  slug: "private-practice-incorporation",
  name: "Private Practice Incorporation Calculator",
  category: "Incorporation",
  oneLiner:
    "Sole trader vs limited company for medical private practice. 2026/27 dividend tax rates and the 19% to 25% corporation tax bands.",
  embedHeight: 700,
  metaTitle: "Private Practice Incorporation Calculator | Sole Trader vs Ltd Company",
  metaDescription:
    "Free calculator: compare sole trader vs limited company tax for UK doctors with private practice income. 2026/27 dividend tax rates. Instant savings estimate.",
  intro:
    "If you have significant private practice income, a limited company may reduce your overall tax bill. Enter your private practice income, expenses, desired salary and any NHS income to compare the two structures side by side.",
  fields: [
    {
      id: "privateIncome",
      label: "Private practice income",
      type: "currency",
      default: 100000,
      min: 0,
      max: 1000000,
      step: 5000,
    },
    {
      id: "nhsIncome",
      label: "NHS income (salary or partnership share)",
      type: "currency",
      default: 50000,
      min: 0,
      max: 500000,
      step: 5000,
    },
    {
      id: "expenses",
      label: "Business expenses",
      type: "currency",
      default: 15000,
      min: 0,
      max: 200000,
      step: 1000,
      help: "Indemnity, GMC, CPD, equipment, travel, room rental",
    },
    {
      id: "desiredSalary",
      label: "Desired salary from company",
      type: "currency",
      default: 12570,
      min: 0,
      max: 100000,
      step: 1000,
      help: "Usually £12,570 (personal allowance)",
    },
  ],
  compute(values) {
    const privateIncome = Number(values.privateIncome);
    const nhsIncome = Number(values.nhsIncome);
    const expenses = Number(values.expenses);
    const desiredSalary = Number(values.desiredSalary);
    const r = calcIncorporation({ privateIncome, nhsIncome, expenses, desiredSalary });

    const rows = [
      { label: "Sole trader: total tax and NIC", value: `-${gbp(r.soleTraderTotalTax)}` },
      {
        label: "Sole trader: net income after all tax and NIC",
        value: gbp(r.soleTraderNetIncome),
        strong: true as const,
      },
      { label: "Ltd co: corporation tax", value: `-${gbp(r.corporationTax)}` },
      { label: "Ltd co: employer National Insurance", value: `-${gbp(r.employerNIC)}` },
      { label: "Ltd co: income tax on salary and NHS pay", value: `-${gbp(r.payeIncomeTax)}` },
      { label: "Ltd co: dividend tax", value: `-${gbp(r.dividendTax)}` },
      { label: "Ltd co: total tax and NIC", value: `-${gbp(r.limitedCompanyTotalTax)}` },
      {
        label: "Ltd co: net income after all tax and NIC",
        value: gbp(r.limitedCompanyNetIncome),
        strong: true as const,
      },
    ];

    const tone = r.taxSavings > 0 ? ("good" as const) : ("default" as const);

    return {
      headline: {
        label: r.taxSavings > 0 ? "Annual saving by incorporating" : r.taxSavings < 0 ? "Sole trader is cheaper" : "Break even",
        value: gbp(Math.abs(r.taxSavings)),
        sub: r.taxSavings > 0 ? `${gbp(Math.abs(r.savingsPerMonth))}/month saving` : r.taxSavings < 0 ? "No tax saving from incorporation at this income level" : "",
        tone,
      },
      rows,
      note: "Company dividends are not NHS pensionable, so any saving shown here is bought with NHS pension accrual you do not get back. Simplified comparison for 2026/27 using 10.75% basic, 35.75% higher and 39.35% additional dividend tax rates with the £500 dividend allowance. Corporation tax is 19% on profits up to £50,000 and 25% above £250,000 with marginal relief between, charged after the director salary and the employer National Insurance on it are deducted. Employer National Insurance is 15% above the £5,000 secondary threshold, with no Employment Allowance because a company whose only employee is a single director cannot claim it. The model assumes one company with no associated companies, so the £50,000 and £250,000 limits are not divided. It does not charge employee National Insurance on the director salary, and does not model IR35, retained profit, or the accountancy and filing costs of running a company. Speak to a specialist medical accountant before incorporating.",
    };
  },
  explainer: {
    heading: "When does incorporating private practice make sense?",
    paragraphs: [
      "The tax saving from incorporating depends on your total income level, NHS pension position, and how much private practice income you can leave in the company rather than extracting immediately. A limited company pays corporation tax at 19% on profits up to £50,000 and 25% above £250,000, with marginal relief tapering between the two, and the director salary plus the employer National Insurance on it come off the profit before that tax is charged. Dividends then carry a lower tax rate than income tax on the same profit, but only if the combined rate is lower than the income tax you would otherwise pay.",
      "Running a company also carries costs a sole trader does not: accountancy and filing work, separate business banking, and the employer National Insurance on any salary you pay yourself. The first two sit outside the comparison above, so read the figure as the gap before them rather than as money in hand. The calculator computes your figures from your own inputs, which is a better guide than any general rule about the income level at which incorporation starts to pay.",
      "This calculator provides a simplified comparison. The actual position depends on IR35 status for each engagement, carry-forward pension planning, NHS pension carry-in amounts, and whether the company structure is sustainable under current HMRC practice. A formal one-off analysis is worthwhile before committing to a structure.",
    ],
  },
  faqs: [
    {
      question: "Will incorporation affect my NHS pension?",
      answer:
        "Yes. Company dividends are not NHS pensionable, so private income routed through a limited company builds no NHS pension. Everyone accrues in the 2015 section, which is career average rather than final salary, so what you give up is 1/54th of the earnings you move outside pensionable pay each year, index linked. For a hospital consultant only the NHS post is ever pensionable in any case. For a GP the pensionable route runs through the annual certification machinery, and a doctor's ordinary personal service company cannot hold a GMS or PMS contract. Set the accrual you lose against any saving above before you decide.",
    },
    {
      question: "What is the dividend allowance?",
      answer:
        "The dividend allowance is £500 in 2026/27. Dividends up to this amount are tax-free, regardless of your income tax band. Above the allowance, dividends are taxed at 10.75% (basic), 35.75% (higher) or 39.35% (additional). Finance Act 2026 section 4 raised the ordinary and upper rates by 1.25 percentage points, and those rates have applied since 6 April 2026.",
    },
    {
      question: "Can I put my spouse on the company payroll or as a shareholder?",
      answer:
        "You can issue different share classes to a spouse (income splitting through dividends), and employ them on the payroll if they do genuine work for the company. Both arrangements are legitimate tax planning, but must have commercial substance. HMRC scrutinises situations where a dividend-only spouse has no real involvement in the business.",
    },
    {
      question: "What are the main costs of running a limited company?",
      answer:
        "Accountancy fees are typically £1,500 to £3,000 per year for a small medical company, plus Companies House filing fees. You will also need separate business banking. These costs reduce the net saving shown by the calculator and should be factored into your decision.",
    },
  ],
};
