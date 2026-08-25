import type { GenericTool } from "../types";
import { gbp } from "../format";
import { computeCgt } from "@/lib/cgt";

export const capitalGainsTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "capital-gains-tax-calculator",
  name: "UK Capital Gains Tax Calculator",
  category: "Capital gains tax",
  oneLiner:
    "Work out how much capital gains tax you pay on a property or shares in 2026/27, at 18% / 24% with the £3,000 allowance.",
  metaTitle: "Capital Gains Tax Calculator UK 2026/27: Property & Shares",
  metaDescription:
    "Free UK capital gains tax calculator for 2026/27: CGT on property or shares at 18% and 24%, £3,000 allowance, 60-day property deadline.",
  intro:
    "How much capital gains tax will you pay? Enter what you are selling and this CGT calculator estimates the bill at the 2026/27 rates: 18% within your unused basic-rate band and 24% above it, after the £3,000 annual exempt amount.",
  ctaLabel: "Selling up? We'll handle the CGT →",
  embedHeight: 760,
  fields: [
    {
      id: "assetType",
      label: "What are you selling?",
      type: "select",
      default: "residential",
      options: [
        { value: "residential", label: "Residential property (buy-to-let, second home)" },
        { value: "shares", label: "Shares & other assets" },
      ],
      help: "Rates are 18% / 24% for both since 30 October 2024. What changes is how you report: property has a 60-day deadline, shares go on Self Assessment.",
    },
    { id: "salePrice", label: "Sale price / disposal proceeds", type: "currency", default: 320_000, step: 5000 },
    { id: "purchasePrice", label: "Original purchase price", type: "currency", default: 200_000, step: 5000 },
    {
      id: "costs",
      label: "Buying, selling & improvement costs",
      type: "currency",
      default: 12_000,
      step: 1000,
      help: "Property: legal and agent fees, the SDLT you paid, capital improvements. Shares: dealing costs and stamp duty on the purchase.",
    },
    {
      id: "otherIncome",
      label: "Your other taxable income",
      type: "currency",
      default: 50_000,
      step: 1000,
      help: "Salary, rental profit etc. for the year, before this gain. Sets how much of the gain is taxed at 18% vs 24%.",
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
    const isShares = v.assetType === "shares";
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
      note: isShares
        ? "Shares and other assets are taxed at the same 18% / 24% rates since 30 October 2024. You report the gain through Self Assessment (or HMRC's real-time CGT service), not the 60-day property return. Share matching rules (same-day, 30-day) can change your base cost and are not modelled here."
        : "Assumes an investment or second property (no Private Residence Relief). Residential CGT must be reported and paid within 60 days of completion where tax is due. If this was ever your main home, PRR and final-period relief can reduce the gain.",
    };
  },
  explainer: {
    heading: "How much is capital gains tax in the UK?",
    paragraphs: [
      "Capital gains tax (CGT) is the tax on the profit when you sell something for more than it cost you. For 2026/27 the rates are 18% and 24% for individuals, and they now apply across the board: residential property, shares and other assets have all shared the same two rates since 30 October 2024. Which rate you pay depends on your income. The gain is stacked on top of your taxable income, taxed at 18% while it sits inside your unused basic-rate band and 24% once it goes above.",
      "The calculation of capital gains tax starts with the gain, not the sale price. Take your disposal proceeds, deduct the original purchase price, then deduct your allowable costs: for a property that is legal and agent fees, the SDLT you paid on the way in and the cost of capital improvements; for shares it is dealing costs and the stamp duty on the purchase. Everyone then has a capital gains tax allowance, the annual exempt amount, of £3,000 for 2026/27. Only the gain above that is taxed, which is exactly what this CGT calculator estimates.",
      "Property and shares part company on reporting, not on rates. A UK resident selling residential property must report the disposal and pay the tax within 60 days of completion where tax is due, using HMRC's CGT on UK property account, separately from Self Assessment. A gain on shares goes on your Self Assessment return instead (or HMRC's real-time CGT service), with payment by the normal 31 January deadline.",
      "Two things this capital gains tax estimator deliberately does not model. If the property was ever your main home, Private Residence Relief and final-period relief can reduce or remove the gain, and that depends on your occupation history. For shares, the matching rules (same-day and 30-day bed-and-breakfast rules) can change your base cost. Both are exactly the situations where advice pays for itself, and we can work out your precise position including any reliefs.",
    ],
  },
  faqs: [
    {
      question: "What is CGT?",
      answer:
        "CGT is capital gains tax: the tax you pay on the profit when you sell or give away an asset for more than it cost you. It applies to residential property that is not your main home, shares outside an ISA or pension, and most other investments. You are taxed on the gain, not the sale price, and only above your £3,000 annual allowance.",
    },
    {
      question: "What is the capital gains tax allowance for 2026/27?",
      answer:
        "The annual exempt amount is £3,000 per person for 2026/27. Gains above this are taxable. The allowance covers all your gains for the year across property and shares combined, and a couple who jointly own an asset have £3,000 each.",
    },
    {
      question: "How much capital gains tax will I pay?",
      answer:
        "It depends on the size of the gain and your income. On a £120,000 property gain with a higher-rate salary, the bill is close to £28,000; the same gain landing partly in an unused basic-rate band comes out several thousand pounds lower. The calculator above does the arithmetic for your own numbers rather than a rule of thumb.",
    },
    {
      question: "How do you calculate capital gains tax?",
      answer:
        "Capital gains tax is calculated in four steps: work out the gain (proceeds minus cost and allowable expenses), deduct the £3,000 annual exempt amount, split what is left between your unused basic-rate band and the rest, then apply 18% and 24%. As a percentage of the gain, the effective rate usually lands somewhere between the two headline rates, which is why the calculator shows it. The steps are the same whether the asset is a flat, commercial real estate or a share portfolio, and you can use the calculator above rather than doing it by hand.",
    },
    {
      question: "What is the threshold for capital gains tax?",
      answer:
        "The threshold is the £3,000 annual exempt amount: total gains at or below it in 2026/27 mean no CGT to pay. It has been £3,000 since 2024/25, so the 2025/26 capital gains tax allowance was the same figure. Above the threshold, the rate percentage that applies (18% or 24%) depends on how much of your basic-rate band is left after your income.",
    },
    {
      question: "What rate of CGT do I pay on a buy-to-let?",
      answer:
        "Residential property gains are taxed at 18% to the extent they fall within your unused basic-rate band, and 24% above it. Your other income for the year determines how much of the gain falls into each rate.",
    },
    {
      question: "Does this calculator work for shares as well as property?",
      answer:
        "Yes. Since 30 October 2024 shares and other assets are taxed at the same 18% and 24% rates as residential property, so the tax arithmetic is identical: choose 'Shares & other assets' at the top. The difference is reporting: shares go on Self Assessment, while residential property has its own 60-day return. Share matching rules (same-day and 30-day) can adjust your base cost and are not modelled.",
    },
    {
      question: "When do I have to pay CGT on a property sale?",
      answer:
        "You must report the disposal and pay the capital gains tax within 60 days of completion where tax is due, using HMRC's CGT on UK property service. This is separate from, and earlier than, your Self Assessment return. Gains on shares follow the normal Self Assessment timetable instead.",
    },
    {
      question: "Can I transfer property to my spouse before selling to cut the tax?",
      answer:
        "Transfers between spouses and civil partners who live together happen at no gain and no loss, so the transfer itself is not taxed and your spouse inherits your original base cost. Putting a share into joint names before a sale means two annual exempt amounts and potentially some of the gain taxed at 18% in a lower-earning spouse's basic-rate band. The transfer has to be a genuine outright gift and must complete before you exchange contracts on the sale.",
    },
    {
      question: "What happens if I miss the 60-day CGT deadline?",
      answer:
        "HMRC charges a £100 fixed penalty as soon as the return is late, daily £10 penalties from day 91, and 5% of the tax due at six and twelve months, with interest running on the unpaid tax from day 61. The return is still required even if you also report the disposal on your Self Assessment, so filing the tax return later does not remove the earlier obligation.",
    },
    {
      question: "Is this an HMRC capital gains tax calculator?",
      answer:
        "No. HMRC has its own calculator inside the CGT on UK property service, but you need to start a return to use it. This is an independent UK capital gains tax calculator using the same published 2026/27 rates and allowance, built so you can estimate the bill before you commit to anything. For the figure HMRC will actually assess, the reliefs and elections matter, which is where we come in.",
    },
  ],
};
