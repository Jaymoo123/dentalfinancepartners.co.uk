import type { GenericTool } from "../types";
import { gbp } from "../format";
import { computeCgt } from "@/lib/cgt";

export const capitalGainsTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "capital-gains-tax-calculator",
  name: "Capital Gains Tax Calculator",
  category: "Capital gains tax",
  oneLiner:
    "Estimate the CGT on selling a buy-to-let or second property, at 18% / 24% with the £3,000 allowance.",
  metaTitle: "Capital Gains Tax Calculator (Property) | 18% / 24% (UK 2026/27)",
  metaDescription:
    "Free CGT calculator for UK property. Estimate Capital Gains Tax on selling a buy-to-let or second home, with the £3,000 allowance, 18% / 24% rates and the 60-day rule. Instant result.",
  intro:
    "Estimate the Capital Gains Tax on selling a residential investment property, based on your gain and your other income.",
  ctaLabel: "Selling a property? We'll handle the CGT →",
  embedHeight: 720,
  fields: [
    { id: "salePrice", label: "Sale price", type: "currency", default: 320_000, step: 5000 },
    { id: "purchasePrice", label: "Original purchase price", type: "currency", default: 200_000, step: 5000 },
    {
      id: "costs",
      label: "Buying, selling & improvement costs",
      type: "currency",
      default: 12_000,
      step: 1000,
      help: "Legal and agent fees, the SDLT you paid, and the cost of any capital improvements.",
    },
    {
      id: "otherIncome",
      label: "Your other taxable income",
      type: "currency",
      default: 50_000,
      step: 1000,
      help: "Salary, rental profit etc. for the year, before this gain. Sets how much is taxed at 18% vs 24%.",
    },
    {
      id: "aeaUsed",
      label: "I've already used my £3,000 CGT allowance this year",
      type: "toggle",
      default: false,
    },
  ],
  compute: (v) => {
    const r = computeCgt({
      salePrice: Number(v.salePrice),
      purchasePrice: Number(v.purchasePrice),
      costs: Number(v.costs),
      otherIncome: Number(v.otherIncome),
      aeaUsed: Boolean(v.aeaUsed),
    });
    const rows = [
      { label: "Capital gain", value: gbp(r.gain), strong: true },
      { label: "Less annual exempt amount", value: r.aea ? `−${gbp(r.aea)}` : gbp(0) },
      { label: "Taxable gain", value: gbp(r.taxableGain) },
    ];
    if (r.atBasic > 0) rows.push({ label: "Taxed at 18%", value: gbp(r.taxAtBasic) });
    if (r.atHigher > 0) rows.push({ label: "Taxed at 24%", value: gbp(r.taxAtHigher) });
    return {
      headline: {
        label: "Capital Gains Tax to pay",
        value: gbp(r.tax),
        sub: `Effective rate ${r.effectiveRate.toFixed(1)}% of the gain`,
      },
      rows,
      note: "Assumes an investment or second property (no Private Residence Relief). Residential CGT must be reported and paid within 60 days of completion. If this was ever your main home, PRR and final-period relief can reduce the gain.",
    };
  },
  explainer: {
    heading: "How Capital Gains Tax on property works",
    paragraphs: [
      "When you sell a residential investment property for more than you paid, the gain is subject to Capital Gains Tax. The gain is the sale price less the original cost, less buying and selling costs (legal fees, estate agent fees, the SDLT you paid) and the cost of any capital improvements.",
      "Every individual has an annual exempt amount, £3,000 for 2026/27. Above that, residential property gains are taxed at 18% to the extent they fall within your unused basic-rate band, and 24% above it. Your other income for the year matters: the more of your basic-rate band is used by income, the more of the gain is taxed at 24%.",
      "Residential property has its own deadline. You must report the disposal and pay the tax within 60 days of completion using a CGT on UK property account, separately from your Self Assessment return. Missing it brings penalties and interest.",
      "If the property was ever your main home, Private Residence Relief and final-period relief can reduce or remove the gain. That calculation depends on your periods of occupation and is not modelled here, so this tool assumes a pure investment or second property. We can work out your exact position, including any reliefs.",
    ],
  },
  faqs: [
    {
      question: "What is the Capital Gains Tax allowance for 2026/27?",
      answer:
        "The annual exempt amount is £3,000 per person for 2026/27. Gains above this are taxable. A couple who jointly own a property have £3,000 each.",
    },
    {
      question: "What rate of CGT do I pay on a buy-to-let?",
      answer:
        "Residential property gains are taxed at 18% to the extent they fall within your unused basic-rate band, and 24% above it. Your other income for the year determines how much of the gain falls into each rate.",
    },
    {
      question: "When do I have to pay CGT on a property sale?",
      answer:
        "You must report the disposal and pay the Capital Gains Tax within 60 days of completion, using HMRC's CGT on UK property service. This is separate from, and earlier than, your Self Assessment return.",
    },
  ],
};
