import type { GenericTool } from "../types";
import { gbp, pct } from "../format";

export const rentalYieldCalculator: GenericTool = {
  kind: "generic",
  slug: "rental-yield-calculator",
  name: "Rental Yield Calculator",
  category: "Portfolio",
  oneLiner: "Gross and net rental yield, and monthly net income, from a property's value, rent and costs.",
  metaTitle: "Rental Yield Calculator (Gross & Net) | UK Buy-to-Let",
  metaDescription:
    "Free rental yield calculator for UK buy-to-let. Work out gross and net yield and monthly net income from a property's value, annual rent and running costs. Instant result.",
  intro: "Work out the gross and net yield on a rental property from its value, annual rent and running costs.",
  ctaLabel: "Reviewing a property deal? Talk to us →",
  embedHeight: 560,
  fields: [
    { id: "propertyValue", label: "Property value (or price)", type: "currency", default: 250_000, step: 5000 },
    { id: "annualRent", label: "Annual rent", type: "currency", default: 15_000 },
    {
      id: "annualCosts",
      label: "Annual running costs",
      type: "currency",
      default: 4_000,
      help: "Management, insurance, maintenance, service charges and an allowance for void periods.",
    },
  ],
  compute: (v) => {
    const value = Number(v.propertyValue);
    const rent = Number(v.annualRent);
    const costs = Number(v.annualCosts);
    const grossYield = value > 0 ? (rent / value) * 100 : 0;
    const netYield = value > 0 ? ((rent - costs) / value) * 100 : 0;
    const monthlyNet = (rent - costs) / 12;
    return {
      headline: { label: "Gross rental yield", value: pct(grossYield), sub: `Net yield ${pct(netYield)}` },
      rows: [
        { label: "Annual rent", value: gbp(rent) },
        { label: "Annual running costs", value: `−${gbp(costs)}` },
        { label: "Net income before tax", value: gbp(rent - costs), strong: true },
        { label: "Net income per month", value: gbp(monthlyNet) },
      ],
      note: "Gross yield is annual rent divided by the property value; net yield deducts running costs. Both are before income tax and mortgage interest, so they measure the property, not your take-home.",
    };
  },
  explainer: {
    heading: "Gross yield, net yield, and what they tell you",
    paragraphs: [
      "Rental yield expresses the rent a property produces as a percentage of its value, which makes it useful for comparing very different properties on a like-for-like basis. Gross yield is simply the annual rent divided by the property value or purchase price.",
      "Net yield is more honest. It deducts the running costs of letting, management and insurance, maintenance, service charges and an allowance for the weeks a property sits empty between tenants, before dividing by the value. A headline gross yield can look attractive while the net yield, after real costs, tells a different story.",
      "Neither figure accounts for tax or mortgage interest. Two landlords with identical yields can keep very different amounts depending on their tax band and borrowing, which is where Section 24 bites. Use yield to compare opportunities, then the rental income tax and cashflow calculators to see what you would actually keep.",
    ],
  },
  faqs: [
    {
      question: "What is a good rental yield in the UK?",
      answer:
        "It varies widely by area and property type, but many investors look for a gross yield around 5% to 8%, with higher figures in lower-value regions and lower figures in expensive areas where growth is more about capital value. Net yield, after costs, is the more meaningful number.",
    },
    {
      question: "What is the difference between gross and net yield?",
      answer:
        "Gross yield is annual rent divided by property value. Net yield deducts running costs (management, insurance, maintenance, voids) first, so it reflects the income the property actually generates before tax and finance costs.",
    },
  ],
};
