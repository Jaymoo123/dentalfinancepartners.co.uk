import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { corporationTax, CT } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Corporation tax for FY2026, with marginal relief and associated-company
 * apportionment. All maths runs through the verified corporationTax primitive;
 * the CT constants drive the regime labels. No rate is inlined.
 */
export const corporationTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "corporation-tax-calculator",
  name: "Corporation Tax Calculator",
  category: "Limited company tax",
  oneLiner:
    "Work out your company's corporation tax for the 2026/27 financial year, including marginal relief between £50,000 and £250,000 and the effect of associated companies.",
  metaTitle: "Corporation Tax Calculator 2026/27 | Marginal Relief",
  metaDescription:
    "Free corporation tax calculator for 2026/27. Enter your profit to see the tax due at 19%, 25% or the marginal rate, with associated-company adjustment.",
  intro:
    "Enter your company's taxable profit to see the corporation tax due for the 2026/27 financial year, including marginal relief and the effect of any associated companies.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 660,
  fields: [
    {
      id: "profit",
      label: "Taxable profit",
      type: "currency",
      default: 80000,
      step: 1000,
      help: "Profit chargeable to corporation tax for the accounting period (turnover less allowable costs, salary and other deductions).",
    },
    {
      id: "associatedCompanies",
      label: "Associated companies",
      type: "number",
      default: 0,
      step: 1,
      min: 0,
      max: 20,
      advanced: true,
      help: "Other companies under common control with yours. Each one shrinks the £50,000 and £250,000 marginal-relief limits, raising your effective rate.",
    },
  ],
  compute: (v) => {
    const profit = Number(v.profit);
    const associated = Number(v.associatedCompanies);

    const ct = corporationTax(profit, { associated });
    const n = associated + 1;
    const lower = CT.lowerLimit / n;
    const upper = CT.upperLimit / n;

    let regime: string;
    if (profit <= 0) regime = "No profit (no corporation tax)";
    else if (profit <= lower) regime = `Small profits rate (19%)`;
    else if (profit >= upper) regime = `Main rate (25%)`;
    else regime = `Marginal relief (effective about 26.5%)`;

    const effRate = profit > 0 ? (ct / profit) * 100 : 0;

    return {
      headline: {
        label: "Corporation tax due (FY2026)",
        value: gbp(ct),
        sub: `Effective rate ${pct(effRate)} on ${gbp(profit)} of profit`,
        tone: "warn",
      },
      rows: [
        { label: "Taxable profit", value: gbp(profit) },
        { label: "Lower limit (÷ associated)", value: gbp(lower) },
        { label: "Upper limit (÷ associated)", value: gbp(upper) },
        { label: "Tax regime", value: regime },
        { label: "Corporation tax due", value: gbp(ct), strong: true },
        { label: "Effective rate", value: pct(effRate), strong: true },
      ],
      note: "For the 2026/27 financial year, corporation tax is 19% on profits up to £50,000, 25% on profits over £250,000, and the main rate with marginal relief (standard fraction 3/200) in between, giving an effective rate of about 26.5% on profits in the £50,000 to £250,000 band. The £50,000 and £250,000 limits are divided by the number of associated companies (companies under common control), so a contractor and a connected spouse company, or anyone running more than one company, can see the bands shrink. Finance Act 2026 made no change to the corporation tax rates.",
    };
  },
  explainer: {
    heading: "How corporation tax works for the 2026/27 financial year",
    paragraphs: [
      "A limited company pays corporation tax on its taxable profit, which for a contractor is broadly turnover less allowable costs, the director's salary, employer NIC, expenses and any employer pension contribution. For the 2026/27 financial year there are two headline rates and a relief in between. Profits up to £50,000 are taxed at the small profits rate of 19%. Profits above £250,000 are taxed at the main rate of 25%. Between £50,000 and £250,000 the main rate applies but marginal relief tapers the charge, using the standard fraction of 3/200, so the effective rate on profits in that band is about 26.5%. Finance Act 2026 left these rates unchanged from the previous year.",
      "The marginal relief calculation is exactly: tax equals 25% of profit, minus 3/200 of the difference between the £250,000 upper limit and the profit. The effect is a gentle ramp from 19% up to 25% as profit rises through the band, with the highest marginal rate of around 26.5% biting on each extra pound earned inside it. This is why pushing profit out of the marginal band, for example through an employer pension contribution, can be particularly valuable: the relief on a contribution made while in the band is worth more than the headline 25%.",
      "Associated companies are the trap contractors most often miss. The £50,000 and £250,000 limits are divided by the number of associated companies plus one. Two companies are associated where one controls the other or both are under common control, which can include a company run by a spouse or partner if the businesses are connected. So if you run two companies, each one's limits halve to £25,000 and £125,000, pushing more profit into the marginal band or the main rate sooner. This calculator lets you enter associated companies so you can see the effect; whether two companies are genuinely associated is a question of fact worth checking carefully.",
    ],
  },
  faqs: [
    {
      question: "What are the corporation tax rates for 2026/27?",
      answer:
        "For the financial year beginning 1 April 2026, corporation tax is 19% on profits up to £50,000 (the small profits rate), 25% on profits above £250,000 (the main rate), and the main rate with marginal relief in between, which produces an effective rate of roughly 26.5% on profits in the £50,000 to £250,000 band. Finance Act 2026 made no change to these rates, so they match the previous financial year.",
    },
    {
      question: "How is marginal relief calculated?",
      answer:
        "Marginal relief reduces the 25% main rate for profits between £50,000 and £250,000. The tax is 25% of the profit, less the standard fraction of 3/200 multiplied by the amount by which the £250,000 upper limit exceeds the profit. The practical result is an effective rate that rises smoothly from 19% at £50,000 to 25% at £250,000, with a marginal rate of about 26.5% on each additional pound of profit earned inside the band.",
    },
    {
      question: "What are associated companies and why do they matter?",
      answer:
        "Two companies are associated where one controls the other, or both are under the control of the same person or connected persons. The £50,000 and £250,000 corporation tax limits are divided by the number of associated companies plus one, so the more associated companies you have, the lower the thresholds and the higher your effective rate. A contractor running a second company, or whose spouse runs a connected company, can find both companies pushed into the marginal band. Whether companies are genuinely associated turns on the facts and is worth confirming.",
    },
    {
      question: "When do I have to pay the corporation tax?",
      answer:
        "Corporation tax for a small company is normally due nine months and one day after the end of the accounting period, with the company tax return (CT600) due twelve months after the period end. Larger companies with profits above £1.5 million may have to pay in quarterly instalments, but that rarely applies to a contractor company. This calculator shows the liability for the period, not the payment timing; budgeting for the bill across the year is part of good cash-flow planning.",
    },
    {
      question: "Can I reduce my corporation tax?",
      answer:
        "Within the rules, yes. Legitimate ways include making sure all genuine wholly-and-exclusively business expenses are claimed, paying a director salary (a deductible cost), and above all making an employer pension contribution, which is deductible against corporation tax, carries no NIC and is not taxed on you as income within the £60,000 annual allowance for 2026/27. A contribution made while your profits sit in the marginal band attracts relief at the higher effective marginal rate. A specialist can model the salary, dividend and pension mix for your specific profit level.",
    },
  ],
};
