import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import {
  calcBusinessValuation,
  SECTOR_MULTIPLES,
  type ValuationSector,
} from "@/lib/tools/compute/business-valuation-calculator";

export const businessValuationCalculatorTool: GenericTool = {
  kind: "generic",
  slug: "business-valuation-calculator",
  name: "Business Valuation Calculator",
  category: "Exit and Capital Gains",
  oneLiner:
    "Get an indicative enterprise and equity value range for your company from its adjusted EBITDA and a sector multiple, before surplus cash and debt.",
  embedHeight: 620,
  metaTitle: "Business Valuation Calculator UK | EBITDA Multiple Range",
  metaDescription:
    "Free UK business valuation calculator. Estimate an indicative enterprise value and equity value range from your adjusted EBITDA, a sector multiple, surplus cash and debt.",
  intro:
    "Thinking about what your company might be worth? Enter your adjusted EBITDA (or net profit), pick the closest sector, and add any surplus cash or debt to see an indicative value range. Multiples vary widely by sector and by the specifics of your business, so this gives a starting range, not a fixed number.",
  fields: [
    {
      id: "ebitda",
      label: "Adjusted EBITDA (or net profit)",
      type: "currency",
      default: 500000,
      min: 0,
      max: 50000000,
      step: 10000,
      help: "Profit after adding back owner's salary above a fair market rate, one-off costs, and non-trading items, so it reflects what a buyer would actually earn from the business.",
    },
    {
      id: "sector",
      label: "Sector",
      type: "select",
      default: "general",
      options: Object.entries(SECTOR_MULTIPLES).map(([value, { label, low, high }]) => ({
        value,
        label: `${label} (${low}x to ${high}x)`,
      })),
    },
    {
      id: "surplusCash",
      label: "Surplus cash & non-trading assets",
      type: "currency",
      default: 0,
      min: 0,
      max: 20000000,
      step: 10000,
      help: "Cash and other assets in the business beyond what's needed to run it day to day, added on top of the enterprise value.",
    },
    {
      id: "debt",
      label: "Debt",
      type: "currency",
      default: 0,
      min: 0,
      max: 20000000,
      step: 10000,
      help: "Loans, overdrafts and other interest-bearing debt, deducted from the enterprise value to arrive at what a shareholder would actually receive.",
    },
  ],
  compute(values) {
    const r = calcBusinessValuation(
      Number(values.ebitda),
      String(values.sector) as ValuationSector,
      Number(values.surplusCash),
      Number(values.debt),
    );
    const rows = [
      { label: "Multiple applied", value: `${r.multipleLow}x to ${r.multipleHigh}x` },
      { label: "Enterprise value range", value: `${gbp(r.enterpriseValueLow)} to ${gbp(r.enterpriseValueHigh)}` },
      { label: "Plus surplus cash / non-trading assets", value: gbp(Number(values.surplusCash)) },
      { label: "Less debt", value: gbp(Number(values.debt)) },
      {
        label: "Indicative equity value range",
        value: `${gbp(r.equityValueLow)} to ${gbp(r.equityValueHigh)}`,
        strong: true as const,
      },
    ];
    return {
      headline: {
        label: "Indicative equity value (midpoint)",
        value: gbp(r.equityValueMid),
        sub: `Range: ${gbp(r.equityValueLow)} to ${gbp(r.equityValueHigh)}`,
      },
      rows,
      note: "Multiples are indicative only, based on general UK sector ranges. Your actual value depends on growth, customer concentration, recurring revenue, owner dependence and current market conditions. Not a formal or RICS valuation.",
    };
  },
  explainer: {
    heading: "How an indicative business valuation is worked out",
    paragraphs: [
      "The most common way to value a trading business is to apply a multiple to its earnings, usually adjusted EBITDA (earnings before interest, tax, depreciation and amortisation, after adding back one-off costs and any owner's salary above a fair market rate). Multiplying adjusted EBITDA by a sector-appropriate multiple gives the enterprise value, the value of the operating business itself.",
      "To get to equity value, the figure a shareholder would actually receive, you add back any surplus cash and non-trading assets sitting in the business beyond what it needs to operate, and deduct any debt. The multiple itself varies enormously by sector, by size, and by the specifics of the business: recurring revenue, customer concentration, growth rate, and how dependent the business is on the owner all push the multiple up or down within (or beyond) the typical range for the sector.",
      "This is why a valuation is always best expressed as a range rather than a single number, and why the number you get here is a starting point for a conversation, not a final figure. Worked example: a company with £500,000 of adjusted EBITDA in a sector with a 3x to 5x range gives an enterprise value of £1.5 million to £2.5 million. Add £50,000 of surplus cash and deduct £100,000 of debt, and the indicative equity value range becomes £1.45 million to £2.45 million, with a midpoint around £1.95 million.",
    ],
  },
  faqs: [
    {
      question: "How is a business valued in the UK?",
      answer:
        "The most common approach for a profitable trading business is an earnings multiple: adjusted EBITDA or net profit multiplied by a sector-appropriate multiple, giving enterprise value, then adjusted for surplus cash and debt to reach equity value. Asset-heavy or loss-making businesses are sometimes valued instead on their net assets, and larger or more complex businesses may use a discounted cash flow approach.",
    },
    {
      question: "What multiple is my business worth?",
      answer:
        "It depends heavily on your sector, size and specifics. Smaller, owner-dependent businesses typically sit at the lower end of their sector's range, while larger businesses with recurring revenue, a strong management team and low customer concentration sit at the higher end or above it. The sector ranges here are general indicators, not a guarantee for any individual business.",
    },
    {
      question: "What is adjusted EBITDA and why does it matter?",
      answer:
        "Adjusted EBITDA starts from reported profit and adds back interest, tax, depreciation, amortisation, one-off or non-recurring costs, and any owner's salary paid above what a market-rate manager would cost. The adjustment matters because it shows a buyer the true, ongoing earning power of the business, which is what the multiple is actually applied to.",
    },
    {
      question: "Why do valuations for the same business differ so much between advisers?",
      answer:
        "Because valuation is a judgement exercise, not a formula with one right answer. Different advisers may use different comparable transactions, weight growth and risk factors differently, or focus on different methods (earnings multiple vs asset-based vs discounted cash flow), all of which can be entirely reasonable while producing different numbers.",
    },
    {
      question: "Is this the price a buyer will actually pay?",
      answer:
        "Not necessarily. This calculator gives an indicative value based on general sector multiples. The price a specific buyer pays also reflects negotiation, how much they want your business specifically (strategic value), deal structure (cash vs earn-out), and the state of the market for buyers at the time you sell.",
    },
    {
      question: "When do I need a formal valuation instead of this estimate?",
      answer:
        "Get a formal valuation from a qualified professional when you have a specific purpose that requires one, such as a shareholder dispute, a divorce settlement, a probate valuation, an HMRC-facing valuation (for example ahead of an EOT sale or share scheme), or when you're actually negotiating a sale and need a defensible number.",
    },
  ],
  related: [
    { label: "Business Valuation Guide", href: "/blog/exit-and-capital-gains/business-valuation-guide" },
    { label: "How to Value a Business", href: "/blog/exit-and-capital-gains/how-to-value-a-business" },
    { label: "EOT Tax Saving Calculator", href: "/calculators/eot-tax-saving-calculator" },
  ],
};
