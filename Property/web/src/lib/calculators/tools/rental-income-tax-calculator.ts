import type { GenericTool } from "../types";
import { gbp } from "../format";

const RATES: Record<string, number> = { basic: 0.2, higher: 0.4, additional: 0.45 };

export const rentalIncomeTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "rental-income-tax-calculator",
  name: "Rental Income Tax Calculator",
  category: "Income tax",
  oneLiner:
    "The income tax on your rental profit, including the Section 24 mortgage-interest credit, and your take-home.",
  metaTitle: "Rental Income Tax Calculator (UK Landlords) | 2026/27",
  metaDescription:
    "Free rental income tax calculator for UK landlords. Work out the income tax on your rental profit, including the Section 24 mortgage-interest restriction, and your take-home after tax.",
  intro:
    "Work out the income tax on your rental profit, including the Section 24 mortgage-interest credit, and what you keep.",
  ctaLabel: "Want to pay less tax on your rentals? →",
  embedHeight: 640,
  fields: [
    { id: "rentalIncome", label: "Annual rental income", type: "currency", default: 18_000 },
    {
      id: "expenses",
      label: "Allowable expenses",
      type: "currency",
      default: 3_000,
      help: "Repairs, letting fees, insurance, ground rent etc. Do not include mortgage interest here.",
    },
    { id: "mortgageInterest", label: "Annual mortgage interest", type: "currency", default: 6_000 },
    {
      id: "band",
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
  compute: (v) => {
    const rate = RATES[String(v.band)] ?? 0.4;
    const profit = Math.max(0, Number(v.rentalIncome) - Number(v.expenses));
    const taxBeforeCredit = profit * rate;
    const s24Credit = Number(v.mortgageInterest) * 0.2;
    const tax = Math.max(0, taxBeforeCredit - s24Credit);
    const takeHome = profit - Number(v.mortgageInterest) - tax;
    return {
      headline: {
        label: "Income tax on your rental profit",
        value: gbp(tax),
        sub: `On £${Math.round(profit).toLocaleString("en-GB")} of profit`,
      },
      rows: [
        { label: "Rental profit (before mortgage interest)", value: gbp(profit) },
        { label: "Tax before relief", value: gbp(taxBeforeCredit) },
        { label: "Section 24 credit (20% of interest)", value: `−${gbp(s24Credit)}` },
        { label: "Take-home after tax & mortgage", value: gbp(takeHome), strong: true },
      ],
      note: "Mortgage interest is not deducted from profit; instead a 20% credit applies (2026/27, rising to 22% from 2027/28). Assumes the profit sits in the band you selected; a large profit can span bands. Companies are taxed differently.",
    };
  },
  explainer: {
    heading: "How rental income is taxed",
    paragraphs: [
      "As an individual landlord you pay income tax on your rental profit, which is your rental income less allowable running costs such as repairs, letting agent fees, insurance and ground rent. The profit is added to your other income and taxed at your marginal rate, 20%, 40% or 45%.",
      "Mortgage interest is treated differently. Since April 2020, under Section 24, you cannot deduct it as an expense. Instead your profit is taxed in full and you receive a basic-rate tax credit of 20% of the interest. For higher and additional-rate landlords this means the effective tax on a mortgaged rental is higher than the headline profit suggests.",
      "Allowable expenses must be wholly and exclusively for the letting and revenue rather than capital in nature. Improving a property is capital (and may reduce a future Capital Gains Tax bill instead), while repairs and maintenance are revenue and deductible now. Replacing furnishings has its own relief.",
      "From 2027/28 the Section 24 credit rises from 20% to 22% in line with the new property basic rate. This tool uses current 2026/27 figures. We can confirm your exact position and find the structure that leaves you with the most after tax.",
    ],
  },
  faqs: [
    {
      question: "Can I deduct my mortgage interest from rental income?",
      answer:
        "Not as an expense. Since Section 24 fully took effect in April 2020, individual landlords add their full rental profit to income and receive a 20% basic-rate tax credit on the mortgage interest instead. Companies can still deduct interest in full.",
    },
    {
      question: "What expenses can landlords claim?",
      answer:
        "Revenue costs wholly for the letting: repairs and maintenance, letting agent and management fees, insurance, ground rent and service charges, accountancy, and the replacement of domestic items. Capital improvements are not deductible against income but may reduce a future CGT bill.",
    },
    {
      question: "How much tax will I pay on rental income?",
      answer:
        "Your rental profit is taxed at your marginal rate (20%, 40% or 45%), with a 20% credit on mortgage interest. A higher-rate landlord with a large mortgage can therefore pay considerably more than 40% of the cash they actually keep.",
    },
  ],
};
