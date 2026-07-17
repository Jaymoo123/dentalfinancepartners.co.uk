import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcPracticeValuation } from "@/lib/tools/compute/practice-valuation";
import type { PracticeMix, Region, Demand } from "@/lib/tools/compute/practice-valuation";
import { calcPracticeSaleCgt, BADR_RATE_FROM_6APR2026, CGT_BASIC_RATE, CGT_HIGHER_RATE } from "@/lib/tools/compute/practice-sale-cgt";

export const practiceSaleCgtTool: GenericTool = {
  kind: "generic",
  slug: "practice-sale-cgt",
  name: "Practice Sale CGT Calculator",
  category: "Practice accounting",
  oneLiner: "Indicative goodwill valuation range plus CGT and BADR net-proceeds estimate at 2026/27 rates.",
  embedHeight: 560,
  metaTitle: "Dental Practice Sale CGT Calculator UK 2026/27",
  metaDescription:
    "Estimate what you keep from selling your dental practice after Capital Gains Tax and Business Asset Disposal Relief at 2026/27 rates. Indicative valuation range from normalised EBITDA.",
  intro:
    "Enter your normalised EBITDA, practice mix and region to get an indicative valuation range, then see your estimated net proceeds after Capital Gains Tax at 2026/27 rates — including Business Asset Disposal Relief (BADR) at 18%.",
  fields: [
    {
      id: "ebitda",
      label: "Normalised EBITDA",
      type: "currency",
      default: 200000,
      min: 0,
      max: 2000000,
      step: 10000,
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
      label: "Buyer demand",
      type: "select",
      default: "normal",
      options: [
        { value: "low", label: "Low" },
        { value: "normal", label: "Normal" },
        { value: "high", label: "High" },
      ],
    },
    {
      id: "tangibleAssets",
      label: "Tangible assets (equipment, fit-out)",
      type: "currency",
      default: 60000,
      min: 0,
      max: 1000000,
      step: 5000,
    },
    {
      id: "otherIncome",
      label: "Your other taxable income this year",
      type: "currency",
      default: 50000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Salary, drawings or partnership profit share. Used to estimate remaining basic-rate band for CGT.",
    },
    {
      id: "badrEligible",
      label: "Claiming Business Asset Disposal Relief?",
      type: "select",
      default: "yes",
      options: [
        { value: "yes", label: "Yes — I expect to qualify" },
        { value: "no", label: "No — not eligible or not claiming" },
      ],
      help: "BADR reduces CGT to 18% on qualifying gains up to £1,000,000 lifetime. Two-year minimum holding period and genuine business interest required.",
    },
  ],
  compute(values) {
    const ebitda = Number(values.ebitda) || 0;
    const mix = String(values.mix) as PracticeMix;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as Demand;
    const tangibleAssets = Number(values.tangibleAssets) || 0;
    const otherIncome = Number(values.otherIncome) || 0;
    const badrEligible = String(values.badrEligible) !== "no";

    const val = calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets);
    const midGoodwill = (val.goodwillLow + val.goodwillHigh) / 2;

    const cgt = calcPracticeSaleCgt({
      gain: midGoodwill,
      otherIncome,
      badrEligible,
    });

    const netProceeds = midGoodwill - cgt.totalCgt;

    return {
      headline: {
        label: "Indicative net proceeds after CGT (on mid-point goodwill)",
        value: gbp(netProceeds),
        sub: `${gbp(cgt.totalCgt)} total CGT on estimated ${gbp(midGoodwill)} goodwill gain`,
        tone: "default",
      },
      rows: [
        { label: "Indicative goodwill range", value: `${gbp(val.goodwillLow)} to ${gbp(val.goodwillHigh)}` },
        { label: "Indicative total value range", value: `${gbp(val.totalLow)} to ${gbp(val.totalHigh)}`, strong: true },
        { label: "Mid-point goodwill (used for CGT)", value: gbp(midGoodwill) },
        { label: "BADR gain taxed at 18%", value: gbp(cgt.gainAtBadr) },
        { label: "Standard-rate CGT gain (18% / 24%)", value: gbp(cgt.gainAtBasic + cgt.gainAtHigher) },
        { label: "Total CGT", value: gbp(cgt.totalCgt), strong: true },
        { label: "Estimated net proceeds from goodwill", value: gbp(netProceeds), strong: true },
      ],
      verdict: {
        text: badrEligible
          ? `BADR at ${(BADR_RATE_FROM_6APR2026 * 100).toFixed(0)}% applied to qualifying gain; standard CGT at ${(CGT_BASIC_RATE * 100).toFixed(0)}%/${(CGT_HIGHER_RATE * 100).toFixed(0)}% above`
          : `No BADR claimed; CGT at ${(CGT_BASIC_RATE * 100).toFixed(0)}%/${(CGT_HIGHER_RATE * 100).toFixed(0)}% on net gain`,
        positive: true,
      },
      note: "2026/27 CGT rates throughout. BADR at 18% from 6 April 2026 (gov.uk). Standard CGT 18% within any remaining basic-rate band, 24% above, both from 30 October 2024. Annual exempt amount £3,000. The chargeable gain defaults to the mid-point goodwill figure; it excludes tangible assets (which attract different tax treatment) and any base cost. Actual gain depends on your original cost, any enhancement expenditure, and how the sale is structured. BADR eligibility requires meeting two-year minimum holding and genuine business interest conditions — these are your responsibility to confirm. Earn-out arrangements attract CGT at standard rates on each payment as it falls due. Estimates, not advice; take specialist tax advice before any practice disposal.",
    };
  },
  explainer: {
    heading: "How the calculation works",
    paragraphs: [
      `The valuation range applies EBITDA multiples from 2025/26 UK dental market data, adjusted for practice mix, region and buyer demand. The goodwill mid-point is used as the illustrative chargeable gain for the CGT calculation, which is a simplification: in a real disposal the gain is the sale proceeds less original purchase price and enhancement costs, and tangible assets are treated separately.`,
      `The CGT calculation deducts the £3,000 annual exempt amount, then applies Business Asset Disposal Relief at ${(BADR_RATE_FROM_6APR2026 * 100).toFixed(0)}% on qualifying gains up to the £1,000,000 lifetime limit (as in force from 6 April 2026). Gain above the BADR amount is charged at ${(CGT_BASIC_RATE * 100).toFixed(0)}% within any remaining basic-rate band (estimated from your other income against the £50,270 threshold) and ${(CGT_HIGHER_RATE * 100).toFixed(0)}% above it. Both standard rates apply from 30 October 2024.`,
      "This is an indicative tool only. Structure (asset sale vs share sale), base cost, earn-out provisions, spouse-relief and pension fund ownership all materially affect the outcome. Always take specialist legal and tax advice before proceeding with a practice disposal.",
      "Worked example: Mark sells a mixed NHS and private practice in the Midlands with normalised EBITDA of £200,000 and £60,000 of tangible assets. The indicative goodwill range is £170,000 to £230,000; the mid-point goodwill of £200,000 is used as the illustrative chargeable gain. After deducting the £3,000 annual exempt amount, the taxable gain is £197,000. Mark has other income of £50,000, which leaves only £270 of basic-rate band unused. Because BADR applies (18% from 6 April 2026) to the entire £197,000 qualifying gain within the £1,000,000 lifetime limit, the total CGT is £197,000 multiplied by 18% = £35,460, leaving estimated net proceeds from goodwill of £164,540.",
    ],
  },
};
