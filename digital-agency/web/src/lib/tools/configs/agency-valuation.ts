/**
 * Agency Valuation Calculator — GenericTool config.
 * EBITDA x multiple model. Market multiples circa 2025.
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcAgencyValuation, type ValuationType } from "../compute/agency-valuation";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export const agencyValuationTool: GenericTool = {
  kind: "generic",
  slug: "agency-valuation",
  name: "Agency Valuation Calculator",
  category: "Growth and exit",
  oneLiner:
    "EBITDA x multiple model with adjustments for retainer revenue, client concentration and founder dependency. What is your agency worth?",
  metaTitle: "Agency Valuation Calculator 2025 | Free UK Tool",
  metaDescription:
    "Free agency valuation calculator for UK founders. EBITDA multiple model with retainer, concentration and key-person adjustments. Market multiples 2025.",
  intro:
    "Estimate your agency's value using an EBITDA multiple model. Adjustments for retainer income, client concentration risk and key-person dependency. Indicative 2025 market ranges.",
  embedHeight: 420,
  fields: [
    {
      id: "revenue",
      label: "Annual revenue",
      type: "currency",
      default: 1200000,
      min: 0,
      max: 50000000,
      step: 50000,
    },
    {
      id: "ebitdaPct",
      label: "EBITDA margin",
      type: "number",
      default: 18,
      min: 0,
      max: 60,
      step: 1,
      suffix: "%",
      help: "Earnings before interest, tax, depreciation and amortisation as % of revenue.",
    },
    {
      id: "type",
      label: "Agency type",
      type: "select",
      default: "generalist",
      options: [
        { value: "generalist", label: "Generalist (3-5x range)" },
        { value: "specialist", label: "Specialist / niche (5-8x range)" },
        { value: "premium", label: "Premium / AI / high-growth (7-9x range)" },
      ],
    },
    {
      id: "retainerPct",
      label: "Retainer / recurring revenue",
      type: "number",
      default: 30,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
      help: "Percentage of revenue from recurring retainer contracts.",
    },
    {
      id: "topClientPct",
      label: "Top client as % of revenue",
      type: "number",
      default: 20,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
      help: "Concentration risk: what % of revenue comes from your single largest client?",
    },
    {
      id: "keyPersonDependent",
      label: "Key-person dependent",
      type: "toggle",
      default: false,
      help: "Would losing the founder significantly impact revenue? Buyers apply a discount.",
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcAgencyValuation({
      revenue: Number(values.revenue) || 0,
      ebitdaPct: Number(values.ebitdaPct) || 0,
      type: (values.type as ValuationType) || "generalist",
      retainerPct: Number(values.retainerPct) || 0,
      topClientPct: Number(values.topClientPct) || 0,
      keyPersonDependent: Boolean(values.keyPersonDependent),
    });
    const range = out.ebitda > 0 ? `${fmt(out.low)} to ${fmt(out.high)}` : "—";
    return {
      headline: {
        label: "Indicative valuation (mid)",
        value: fmt(out.mid),
        sub: `Range: ${range}`,
        tone: "good",
      },
      rows: [
        { label: "EBITDA", value: fmt(out.ebitda) },
        { label: "Base multiple", value: `${out.baseMultiple}x` },
        { label: "Retainer uplift", value: `${out.retainerUplift > 0 ? "+" : ""}${out.retainerUplift}x` },
        { label: "Concentration discount", value: `${out.concentrationDiscount}x` },
        { label: "Key-person discount", value: `${out.keyPersonDiscount}x` },
        { label: "Adjusted multiple", value: `${out.adjustedMultiple}x`, strong: true },
        { label: "Low estimate", value: fmt(out.low) },
        { label: "Mid estimate", value: fmt(out.mid), strong: true },
        { label: "High estimate", value: fmt(out.high) },
      ],
      note: "Indicative market ranges only. Actual sale price depends on deal structure, buyer synergies, earnout terms and conditions at the time of sale.",
    };
  },
  explainer: {
    heading: "How agency valuations work",
    paragraphs: [
      "Most UK agency M&A transactions are priced on an EBITDA multiple. Boutique generalist agencies typically trade at 3 to 5 times adjusted EBITDA. Specialist or niche agencies (AI, performance, SaaS-focused) command 5 to 8 times. Premium/high-growth agencies can reach 7 to 9 times.",
      "Key adjustments: strong recurring retainer income (50%+) adds 0.5 to 1 times, while high client concentration (top client >30% of revenue) subtracts 0.5 to 1.5 times. Key-person dependency typically discounts the multiple by around 1 turn.",
    ],
  },
  faqs: [
    {
      question: "Are these multiples current?",
      answer:
        "The ranges reflect 2025 market conditions in the UK mid-market. Multiples compress in a weaker M&A environment and expand when acquirers are competing aggressively. For a live market-check, book a call.",
    },
    {
      question: "Does this account for earnouts?",
      answer:
        "No. Earnouts are a common feature of agency deals and can significantly affect the total headline number vs the day-one payment. This model shows the headline valuation multiple only.",
    },
  ],
};
