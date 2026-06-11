import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcIncorporation } from "@/lib/tools/compute/incorporation";

export const incorporationTool: GenericTool = {
  kind: "generic",
  slug: "private-practice-incorporation",
  name: "Private Practice Incorporation Calculator",
  category: "Incorporation",
  oneLiner:
    "Sole trader vs limited company for medical private practice. 2026/27 dividend tax rates and 25% CT.",
  embedHeight: 620,
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
      help: "Usually Â£12,570 (personal allowance)",
    },
  ],
  compute(values) {
    const privateIncome = Number(values.privateIncome);
    const nhsIncome = Number(values.nhsIncome);
    const expenses = Number(values.expenses);
    const desiredSalary = Number(values.desiredSalary);
    const r = calcIncorporation({ privateIncome, nhsIncome, expenses, desiredSalary });

    const rows = [
      { label: "Sole trader â€” income tax + NI", value: `-${gbp(r.soleTraderTotalTax)}` },
      { label: "Sole trader â€” net income", value: gbp(r.soleTraderNetIncome), strong: true as const },
      { label: "Ltd co â€” corporation tax (25%)", value: `-${gbp(r.corporationTax)}` },
      { label: "Ltd co â€” dividend tax", value: `-${gbp(r.dividendTax)}` },
      { label: "Ltd co â€” net income", value: gbp(r.limitedCompanyNetIncome), strong: true as const },
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
      note: "Simplified comparison for 2026/27 using 10.75% basic / 35.75% higher / 39.35% additional dividend tax rates. CT is 25%. Does not model IR35, NHS pension interaction, or accountancy costs of running a company. Speak to a specialist medical accountant before incorporating.",
    };
  },
  explainer: {
    heading: "When does incorporating private practice make sense?",
    paragraphs: [
      "The tax saving from incorporating depends on your total income level, NHS pension position, and how much private practice income you can leave in the company rather than extracting immediately. A limited company pays 25% corporation tax, then dividends carry a lower tax rate than income tax on the same profit â€” but only if the total rate is lower than the income tax you would otherwise pay.",
      "At private practice income below roughly Â£50,000 to Â£70,000, the administrative cost and accountancy fees of running a company often outweigh the tax saving. Above Â£100,000 of consistent private income, a specialist structure that allows income splitting with a spouse can save Â£5,000 to Â£20,000 per year depending on circumstances.",
      "This calculator provides a simplified comparison. The actual position depends on IR35 status for each engagement, carry-forward pension planning, NHS pension carry-in amounts, and whether the company structure is sustainable under current HMRC practice. A formal one-off analysis is worthwhile before committing to a structure.",
    ],
  },
  faqs: [
    {
      question: "Will incorporation affect my NHS pension?",
      answer:
        "Possibly. If you operate outside IR35 and route private work through a limited company, that income may not count as NHS pensionable pay (which can affect your final salary calculation in certain scheme sections). For GP partners, the interaction is different. This is one of the key reasons to get a specialist opinion before incorporating.",
    },
    {
      question: "What is the dividend allowance?",
      answer:
        "The dividend allowance is Â£500 in 2025/26 and 2026/27. Dividends up to this amount are tax-free, regardless of your income tax band. Above the allowance, dividends are taxed at 8.75% (basic), 33.75% (higher) or 39.35% (additional) in 2025/26 â€” rising to 10.75%/35.75%/39.35% in 2026/27 under FA 2025 changes.",
    },
    {
      question: "Can I put my spouse on the company payroll or as a shareholder?",
      answer:
        "You can issue different share classes to a spouse (income splitting through dividends), and employ them on the payroll if they do genuine work for the company. Both arrangements are legitimate tax planning, but must have commercial substance. HMRC scrutinises situations where a dividend-only spouse has no real involvement in the business.",
    },
    {
      question: "What are the main costs of running a limited company?",
      answer:
        "Accountancy fees are typically Â£1,500 to Â£3,000 per year for a small medical company, plus Companies House filing fees. You will also need separate business banking. These costs reduce the net saving shown by the calculator and should be factored into your decision.",
    },
  ],
};
