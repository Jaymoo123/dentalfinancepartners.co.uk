import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcUdaValue } from "@/lib/tools/compute/uda-value";
import type { UdaRegion } from "@/lib/tools/compute/uda-value";

const REGION_LABELS: Record<UdaRegion, string> = {
  england: "England (NHS / GDS contract)",
  wales: "Wales (revised contract)",
  ni: "Northern Ireland (HS dental)",
};

export const udaValueTool: GenericTool = {
  kind: "generic",
  slug: "uda-value",
  name: "UDA Value Calculator",
  category: "Practice accounting",
  oneLiner: "Your effective UDA value, benchmarked against regional 2025/26 ranges, with cumulative inflation since signing.",
  embedHeight: 480,
  metaTitle: "NHS UDA Value Calculator UK 2025/26 | Effective UDA Rate Benchmark",
  metaDescription:
    "Calculate your effective NHS UDA value and benchmark it against 2025/26 UK regional ranges. Real value adjusted for CPI since your contract was signed.",
  intro:
    "Enter your annual UDA volume, contract value, the year your contract was last signed or restructured, and your region. The calculator shows your effective UDA rate, how it compares to current benchmarks, and the real value after adjusting for inflation since signing.",
  fields: [
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "england",
      options: (Object.entries(REGION_LABELS) as [UdaRegion, string][]).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      id: "udas",
      label: "Annual UDA volume",
      type: "number",
      default: 3000,
      min: 0,
      max: 50000,
      step: 100,
    },
    {
      id: "contractValue",
      label: "Annual contract value (£)",
      type: "currency",
      default: 90000,
      min: 0,
      max: 5000000,
      step: 500,
    },
    {
      id: "yearSigned",
      label: "Year contract last signed or restructured",
      type: "number",
      default: 2010,
      min: 2006,
      max: 2026,
      step: 1,
    },
  ],
  compute(values) {
    const region = String(values.region) as UdaRegion;
    const udas = Number(values.udas);
    const contractValue = Number(values.contractValue);
    const yearSigned = Number(values.yearSigned);
    const r = calcUdaValue(region, udas, contractValue, yearSigned);
    const benchmarkLabel = REGION_LABELS[region];
    const positionText =
      r.positionVsBenchmark === "below"
        ? "below typical range"
        : r.positionVsBenchmark === "above"
        ? "above typical range"
        : "within typical range";
    return {
      headline: {
        label: "Your effective UDA value",
        value: `£${r.effectiveUda.toFixed(2)}`,
        sub: `per UDA at current contract value and volume`,
        tone: r.positionVsBenchmark === "below" ? "warn" : "good" as const,
      },
      rows: [
        { label: `${benchmarkLabel} benchmark`, value: `£${r.benchmarkLow} to £${r.benchmarkHigh}` },
        { label: "Position vs benchmark", value: positionText, strong: true },
        { label: `Real value at signing (${yearSigned}, 2026 £)`, value: `£${r.realValuePerUda.toFixed(2)}` },
        { label: "Cumulative CPI proxy since signing", value: pct(r.cumulativeCpi * 100) },
        { label: "Years since signed", value: String(r.yearsSinceSigned) },
      ],
      note: "Effective UDA value = contract value divided by UDA volume. Benchmark ranges are 2025/26 indicative; actual rates vary by commissioner and individual contract. Real value uses a 2.5% annual CPI proxy — actual UK CPI has been higher in some years.",
    };
  },
  explainer: {
    heading: "How the UDA value calculation works",
    paragraphs: [
      "Your effective UDA value is simply your annual contract value divided by your annual UDA volume. This is the most useful number for comparing across practices and contract years, because the headline UDA numbers vary widely by region and year of signing.",
      "The real value calculation adjusts your effective UDA rate back to current prices using a 2.5% annual CPI proxy. If your contract was signed in 2010, the real purchasing power of each UDA pound has fallen by roughly 48 percent by 2026 at 2.5% annually.",
      "The benchmark ranges show the typical 2025/26 NHS dental UDA rates in your region. Being below the benchmark indicates your contract may be undervalued relative to current new contracts in your area.",
    ],
  },
  faqs: [
    {
      question: "What is a UDA in NHS dentistry?",
      answer: "A Unit of Dental Activity (UDA) is the unit by which NHS England and NHS Wales measure and pay for NHS dental treatment. A Band 1 course of treatment is worth 1 UDA, Band 2 is 3 UDAs, and Band 3 is 12 UDAs. Your practice's GDS or PDS contract specifies the total number of UDAs you must complete each year and the amount NHS pays for each one.",
    },
    {
      question: "Why is my effective UDA value lower than other practices?",
      answer: "Effective UDA values vary because NHS dental contracts were negotiated at different times and under different local commissioning arrangements. Practices that signed their contract in the early 2000s often have lower effective UDA values than those that renegotiated more recently, and values vary significantly by region even for contemporaneous contracts.",
    },
    {
      question: "Can I renegotiate my NHS contract value?",
      answer: "NHS contract renegotiations are possible in some circumstances, particularly if your practice has undergone significant growth or change in mix, or if local commissioning priorities have shifted. Contractual changes require engagement with your NHS regional team. An accountant who specialises in dental practices can help you understand whether a renegotiation case is viable.",
    },
  ],
};
