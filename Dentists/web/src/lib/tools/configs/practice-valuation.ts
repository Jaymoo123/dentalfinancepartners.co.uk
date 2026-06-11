import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcPracticeValuation } from "@/lib/tools/compute/practice-valuation";
import type { PracticeMix, Region, Demand } from "@/lib/tools/compute/practice-valuation";

export const practiceValuationTool: GenericTool = {
  kind: "generic",
  slug: "practice-valuation",
  name: "Practice Valuation Calculator",
  category: "Practice accounting",
  oneLiner: "EBITDA multiple range by practice mix and region, plus tangible assets. Indicative 2025/26 UK dental market ranges.",
  embedHeight: 500,
  metaTitle: "Dental Practice Valuation Calculator UK 2025/26",
  metaDescription:
    "Indicative practice valuation range using EBITDA multiples. Practice mix (NHS vs private), region and buyer demand adjustments. UK dental market 2025/26.",
  intro:
    "Enter your normalised EBITDA, choose your practice mix, region and buyer demand environment, then add your tangible asset value. The calculator returns an indicative goodwill multiple range and total value range based on 2025/26 UK dental market data.",
  fields: [
    {
      id: "ebitda",
      label: "Normalised EBITDA (£/yr)",
      type: "currency",
      default: 180000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "EBITDA after removing principal salary to market rate, personal expenses and one-off items.",
    },
    {
      id: "mix",
      label: "Practice mix",
      type: "select",
      default: "mixed",
      options: [
        { value: "nhs-heavy", label: "NHS-heavy (over 75% NHS)" },
        { value: "mixed", label: "Mixed NHS and private" },
        { value: "private-heavy", label: "Private-heavy (over 75% private)" },
      ],
    },
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "midlands",
      options: [
        { value: "london", label: "London and South East" },
        { value: "south", label: "South and South West" },
        { value: "midlands", label: "Midlands" },
        { value: "north", label: "North" },
        { value: "wales", label: "Wales" },
        { value: "ni", label: "Northern Ireland" },
      ],
    },
    {
      id: "demand",
      label: "Buyer demand in your area",
      type: "select",
      default: "normal",
      options: [
        { value: "low", label: "Lower demand (rural, contract risk, aging facility)" },
        { value: "normal", label: "Normal demand" },
        { value: "high", label: "High demand (prime location, good buyer pool)" },
      ],
    },
    {
      id: "tangibleAssets",
      label: "Tangible assets (chairs, X-ray, equipment, fixtures) (£)",
      type: "currency",
      default: 180000,
      min: 0,
      max: 2000000,
      step: 5000,
    },
  ],
  compute(values) {
    const ebitda = Number(values.ebitda);
    const mix = String(values.mix) as PracticeMix;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as Demand;
    const tangibleAssets = Number(values.tangibleAssets);
    const r = calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets);
    return {
      headline: {
        label: "Indicative total value range",
        value: `${gbp(r.totalLow)} to ${gbp(r.totalHigh)}`,
        sub: `Goodwill multiple: ${r.multipleLow.toFixed(2)}x to ${r.multipleHigh.toFixed(2)}x EBITDA, plus tangible assets`,
        tone: "default" as const,
      },
      rows: [
        { label: "Goodwill value range", value: `${gbp(r.goodwillLow)} to ${gbp(r.goodwillHigh)}` },
        { label: "Tangible assets", value: gbp(tangibleAssets) },
        { label: "Total range", value: `${gbp(r.totalLow)} to ${gbp(r.totalHigh)}`, strong: true },
      ],
      note: "Directional EBITDA multiple model using 2025/26 UK dental market indicative ranges. Actual values depend on buyer type, contract specifics, lease vs freehold, and individual negotiation. Corporate buyer premium not modelled.",
    };
  },
  explainer: {
    heading: "How practice valuations work",
    paragraphs: [
      "UK dental practice values are expressed as a multiple of normalised EBITDA (earnings before interest, tax, depreciation and amortisation), plus the value of physical assets separately.",
      "The normalised EBITDA figure matters more than the multiple. Add-backs (adjusting the principal's salary to a market rate, removing personal expenses and one-off items) typically swing the EBITDA by 10 to 20 percent, which moves the total valuation significantly.",
      "Practice mix affects the multiple because NHS-contract income is contracted but lower-margin and subject to commissioner risk; private practices attract higher multiples because of the income quality and growth optionality.",
      "Tangible assets (dental chairs, radiography equipment, and fit-out) are valued separately, usually at depreciated replacement cost.",
    ],
  },
  faqs: [
    {
      question: "How is EBITDA normalised for a dental practice?",
      answer: "Normalisation means removing items that are specific to the current owner and would not recur for a buyer. Common add-backs include: principal salary above or below market rate, personal vehicle costs run through the practice, one-off renovation costs, and family member salaries above market. Getting these right can increase the EBITDA by 10 to 20 percent and therefore the headline valuation by more.",
    },
    {
      question: "Do corporate buyers pay more than independent buyers?",
      answer: "Often yes. Corporate acquirers can pay a strategic premium of 10 to 30 percent above the EBITDA multiple range shown here when the practice fits their estate strategy. However, corporate offers may include earn-out provisions tied to post-sale performance, which reduces the effective upfront consideration.",
    },
    {
      question: "Does the NHS contract transfer on sale?",
      answer: "In England, a GDS or PDS contract can be novated to a buyer with NHS England approval. The contract transfer process can take 3 to 6 months and is a significant risk factor in any dental acquisition. A practice whose contract is at risk of termination or reduction will be discounted materially.",
    },
  ],
};
