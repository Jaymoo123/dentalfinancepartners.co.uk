import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { compareVATSchemes } from "@/lib/tools/compute/vat-scheme";

export const vatTool: GenericTool = {
  kind: "generic",
  slug: "vat-scheme-comparator",
  name: "VAT Scheme Comparator",
  category: "VAT",
  oneLiner: "Standard vs Flat Rate — run your turnover and input VAT to find out which scheme saves you money and whether the Limited Cost Trader rule forces you to 16.5%.",
  embedHeight: 500,
  metaTitle: "VAT Scheme Comparator | Standard vs Flat Rate UK Calculator",
  metaDescription:
    "Free VAT scheme comparator for UK businesses. Compares Standard vs Flat Rate (with Limited Cost Trader test). Find out which VAT scheme costs less. 2026/27.",
  intro:
    "Picking the wrong VAT scheme costs four-figure sums a year for most service businesses. Run your turnover and input VAT through the comparator to see whether the Flat Rate Scheme beats Standard VAT for you, and whether the Limited Cost Trader rules would force you onto the 16.5% sector rate anyway.",
  fields: [
    {
      id: "turnover",
      label: "Annual VAT-able turnover (ex VAT)",
      type: "currency",
      default: 180000,
      min: 0,
      max: 5000000,
      step: 1000,
    },
    {
      id: "vatInputs",
      label: "Annual VAT reclaimable on inputs",
      type: "currency",
      default: 8000,
      min: 0,
      max: 500000,
      step: 500,
      help: "VAT element of your business costs — software, freelancers if VAT-registered, equipment. Standard scheme reclaims this; flat rate does not.",
    },
    {
      id: "goodsSpend",
      label: "Annual relevant goods spend",
      type: "currency",
      default: 500,
      min: 0,
      max: 100000,
      step: 100,
      help: "Spend on physical goods used in the business. Excludes services, software, stationery for own use, travel, capital items. For most service businesses this is very low.",
    },
  ],
  compute(values) {
    const r = compareVATSchemes(
      Number(values.turnover),
      Number(values.vatInputs),
      Number(values.goodsSpend),
    );
    return {
      headline: {
        label: "Best scheme",
        value: r.bestScheme,
        sub: `saves ${gbp(r.saving)}/year vs the other scheme`,
        tone: "good",
      },
      rows: [
        { label: "VAT collected on turnover (20%)", value: gbp(r.vatCollected) },
        { label: "Standard scheme — net payable", value: gbp(r.standardNet), strong: true },
        {
          label: "Flat Rate scheme rate",
          value: pct(r.flatRate * 100) + (r.lctApplies ? " (Limited Cost Trader)" : " (sector rate)"),
        },
        { label: "Flat Rate scheme — net payable", value: gbp(r.flatNet), strong: true },
        { label: "Annual saving (best vs other)", value: gbp(r.saving) },
      ],
      note: r.lctApplies
        ? "Limited Cost Trader rate (16.5%) applies because goods spend is below 2% of VAT-inclusive turnover or £1,000. Flat Rate is rarely beneficial for service businesses with LCT status."
        : "Sector flat rate (12.5% used here for marketing/consulting) varies. Check HMRC's published table for your specific sector before switching schemes.",
    };
  },
  explainer: {
    heading: "Standard vs Flat Rate",
    paragraphs: [
      "Under the Standard scheme you charge 20% VAT, reclaim the VAT on your costs, and pay HMRC the difference. Under the Flat Rate scheme you still charge 20% but pay HMRC a fixed percentage of your VAT-inclusive turnover instead, with no input VAT reclaim.",
      "The Limited Cost Trader test catches most service businesses: if your goods spend is below 2% of VAT-inclusive turnover or £1,000, HMRC applies a 16.5% flat rate instead of your sector rate. At 16.5%, the Flat Rate scheme almost never wins against Standard.",
      "Worked example: a marketing consultant with VAT-exclusive turnover of £180,000 collects £36,000 in VAT (20%), making VAT-inclusive turnover £216,000. They spend £8,000 on reclaimable input VAT and only £500 on physical goods. Under Standard VAT they pay HMRC £36,000 minus £8,000 input reclaim = £28,000. The goods spend of £500 is below both £1,000 and 2% of £216,000 (£4,320), so the Limited Cost Trader rate of 16.5% applies to the Flat Rate scheme. Flat Rate payment would be £216,000 times 16.5% = £35,640. Standard VAT saves £7,640 per year in this case. A consultant with the same turnover but higher input VAT (say £20,000 on premises and equipment) would pay only £16,000 under Standard, widening the advantage further.",
    ],
  },
  faqs: [
    {
      question: "What is the Limited Cost Trader (LCT) rule?",
      answer:
        "If your spending on physical goods is less than 2% of your VAT-inclusive turnover, or less than £1,000 per year, HMRC classifies you as a Limited Cost Trader and applies a flat rate of 16.5%. This applies to most service businesses, consultancies, and digital agencies.",
    },
    {
      question: "Can I switch VAT schemes at any time?",
      answer:
        "You can join the Flat Rate Scheme if your taxable turnover is below £150,000 (and leave if it exceeds £230,000). You must notify HMRC before switching. There is no minimum time you must remain on a scheme, but frequent switching may attract scrutiny.",
    },
    {
      question: "What about Cash Accounting?",
      answer:
        "Cash Accounting can be combined with either scheme. Under Cash Accounting you account for VAT when you receive payment, not when you raise an invoice. It is cash-flow positive if you have long payment terms with clients (60+ days) and is available if turnover is below £1.35 million.",
    },
  ],
};
