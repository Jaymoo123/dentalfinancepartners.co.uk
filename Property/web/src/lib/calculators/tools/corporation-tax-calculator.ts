import type { GenericTool } from "../types";
import { gbp } from "../format";
import { corporationTax, corporationTaxEffectiveRate } from "@/lib/corpTax";

export const corporationTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "corporation-tax-calculator",
  name: "Corporation Tax Calculator",
  category: "Incorporation",
  oneLiner:
    "Corporation Tax on a property company's profit, with the 19% / 25% rates and marginal relief between.",
  metaTitle: "Corporation Tax Calculator | Property Company (19% / 25%)",
  metaDescription:
    "Free Corporation Tax calculator for property companies. Work out the tax on company profit with the 19% small-profits and 25% main rates and marginal relief in between. 2026/27.",
  intro:
    "Work out the Corporation Tax on your property company's profit, with the 19% and 25% rates and marginal relief between.",
  ctaLabel: "Running a property company? Talk to us →",
  embedHeight: 520,
  fields: [
    {
      id: "profit",
      label: "Annual taxable profit",
      type: "currency",
      default: 30_000,
      help: "Rental profit after allowable costs. A company deducts mortgage interest in full, unlike an individual.",
    },
  ],
  compute: (v) => {
    const profit = Number(v.profit);
    const tax = corporationTax(profit);
    const eff = corporationTaxEffectiveRate(profit);
    return {
      headline: {
        label: "Corporation Tax to pay",
        value: gbp(tax),
        sub: `Effective rate ${eff.toFixed(1)}%`,
      },
      rows: [
        { label: "Taxable profit", value: gbp(profit) },
        { label: "Profit after Corporation Tax", value: gbp(profit - tax), strong: true },
      ],
      note: "19% up to £50,000, 25% from £250,000, with marginal relief (about 26.5%) between. The £50,000 and £250,000 limits are shared between associated companies and reduced for short periods. To take the profit out personally you then pay dividend or salary tax on top.",
    };
  },
  explainer: {
    heading: "How Corporation Tax works for a property company",
    paragraphs: [
      "A limited company that holds rental property pays Corporation Tax on its profit, not income tax. The profit is the rental income less allowable costs, and crucially a company deducts mortgage interest in full, which is the main attraction of incorporating for a higher-rate landlord caught by Section 24.",
      "The rate depends on the size of the profit. Up to £50,000 the small-profits rate of 19% applies; at £250,000 or more the main rate is 25%; in between, marginal relief tapers the rate so the effective charge on the middle slice is around 26.5%. Most single-property companies sit in the 19% band.",
      "Those £50,000 and £250,000 limits are divided between associated companies, so if you control several companies each gets a smaller slice of the lower rate. They are also reduced for accounting periods shorter than twelve months.",
      "Corporation Tax is only the first layer. The profit left in the company can be reinvested, but to spend it personally you pay yourself a salary or dividends and are taxed again on that. Whether a company beats personal ownership depends on your wider position, which is exactly what we model before you incorporate.",
    ],
  },
  faqs: [
    {
      question: "What is the Corporation Tax rate for a property company?",
      answer:
        "19% on profits up to £50,000, 25% on profits of £250,000 or more, with marginal relief tapering between the two (an effective rate of about 26.5% on the middle slice). Most small property companies pay 19%.",
    },
    {
      question: "Does a property company pay tax on mortgage interest?",
      answer:
        "No. Unlike an individual landlord restricted by Section 24, a company deducts mortgage interest in full as a business expense before Corporation Tax. This is a key reason higher-rate landlords consider incorporating.",
    },
    {
      question: "Do I pay tax again when I take money out of the company?",
      answer:
        "Yes. Corporation Tax is charged on company profit; if you then draw that profit as dividends or salary, you pay dividend or income tax personally on top. The combined cost is what matters when comparing a company with personal ownership.",
    },
  ],
};
