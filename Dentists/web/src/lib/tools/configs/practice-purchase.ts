import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcPracticeValuation } from "@/lib/tools/compute/practice-valuation";
import type { PracticeMix, Region, Demand } from "@/lib/tools/compute/practice-valuation";
import { calcAffordability } from "@/lib/tools/compute/practice-affordability";

export const practicePurchaseTool: GenericTool = {
  kind: "generic",
  slug: "practice-purchase",
  name: "Practice Purchase Affordability Calculator",
  category: "Practice accounting",
  oneLiner: "Indicative valuation range from normalised EBITDA, plus deposit, borrowing and EBITDA cover sense-check.",
  embedHeight: 540,
  metaTitle: "Dental Practice Purchase Calculator UK 2026/27",
  metaDescription:
    "Estimate an indicative value range for a dental practice from its normalised EBITDA, then sense-check the deal: deposit, borrowing required, and whether practice profit covers repayments.",
  intro:
    "Enter the normalised EBITDA of the practice you want to buy, choose its mix and region, then add your deposit and financing assumptions. The calculator returns an indicative value range and checks whether the practice profit comfortably covers the repayments.",
  fields: [
    {
      id: "ebitda",
      label: "Normalised EBITDA of the target practice",
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
      label: "Buyer demand in your area",
      type: "select",
      default: "normal",
      options: [
        { value: "low", label: "Low (rural, contract risk, ageing facility)" },
        { value: "normal", label: "Normal" },
        { value: "high", label: "High (city, strong NHS contract, modern fit-out)" },
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
      id: "depositPct",
      label: "Your deposit (%)",
      type: "number",
      default: 20,
      min: 0,
      max: 100,
      step: 5,
    },
    {
      id: "interestRate",
      label: "Loan interest rate (%)",
      type: "number",
      default: 8,
      min: 0,
      max: 20,
      step: 0.5,
      help: "Your own assumption. Dental acquisition loans vary by lender, practice size and buyer profile.",
    },
    {
      id: "termYears",
      label: "Loan term (years)",
      type: "number",
      default: 15,
      min: 1,
      max: 30,
      step: 1,
    },
  ],
  compute(values) {
    const ebitda = Number(values.ebitda) || 0;
    const mix = String(values.mix) as PracticeMix;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as Demand;
    const tangibleAssets = Number(values.tangibleAssets) || 0;
    const depositPct = Number.isFinite(Number(values.depositPct)) ? Number(values.depositPct) : 20;
    const interestRate = Number.isFinite(Number(values.interestRate)) ? Number(values.interestRate) : 8;
    const termYears = Number.isFinite(Number(values.termYears)) ? Number(values.termYears) : 15;

    const val = calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets);
    const midTotal = (val.totalLow + val.totalHigh) / 2;
    const aff = calcAffordability({ purchasePrice: midTotal, depositPct, interestRate, termYears, ebitda });

    const coverOk = aff.annualRepayment > 0 && ebitda / aff.annualRepayment >= 1.2;
    const coverRatio = aff.annualRepayment > 0 ? ebitda / aff.annualRepayment : 0;

    return {
      headline: {
        label: "Indicative total value range",
        value: `${gbp(val.totalLow)} to ${gbp(val.totalHigh)}`,
        sub: `Goodwill ${gbp(val.goodwillLow)} to ${gbp(val.goodwillHigh)} (${val.multipleLow}x to ${val.multipleHigh}x EBITDA) plus ${gbp(tangibleAssets)} tangibles`,
        tone: "default",
      },
      rows: [
        { label: "Indicative goodwill range", value: `${gbp(val.goodwillLow)} to ${gbp(val.goodwillHigh)}` },
        { label: "Tangible assets", value: gbp(tangibleAssets) },
        { label: "Indicative total value range", value: `${gbp(val.totalLow)} to ${gbp(val.totalHigh)}`, strong: true },
        { label: "Deposit required (on mid-point)", value: gbp(aff.deposit) },
        { label: "Borrowing required (on mid-point)", value: gbp(aff.loanAmount) },
        { label: "Estimated annual repayment", value: gbp(aff.annualRepayment) },
        {
          label: "EBITDA cover ratio",
          value: coverRatio > 0 ? `${coverRatio.toFixed(2)}x` : "N/A",
          strong: true,
        },
      ],
      verdict: {
        text: coverOk
          ? `EBITDA covers repayments ${coverRatio.toFixed(2)}x — above the 1.2x rule-of-thumb minimum`
          : aff.annualRepayment === 0
            ? "Enter interest rate and term to see the repayment sense-check"
            : `EBITDA covers repayments only ${coverRatio.toFixed(2)}x — below the 1.2x rule-of-thumb minimum`,
        positive: coverOk,
      },
      note: "Indicative valuation only. EBITDA multiples reflect 2025/26 UK dental market ranges; actual multiples vary significantly by buyer type, NHS contract security, CQC position, and local competition. Interest rate and loan term are your own assumptions. The 1.2x cover ratio is a rule of thumb, not a lending requirement. Tangible assets are added at book value; a surveyor or equipment valuer may give a different figure. Not advice; take specialist financial and legal advice before committing to an acquisition.",
    };
  },
  explainer: {
    heading: "How the calculation works",
    paragraphs: [
      "The valuation range applies EBITDA multiples drawn from 2025/26 UK dental market data, adjusted for practice mix (NHS-heavy practices trade at lower multiples than private-heavy ones, reflecting NHS contract risk and commissioner consent requirements on a transfer), region, and the local buyer demand environment. Goodwill is the multiple applied to normalised EBITDA; tangible assets are added at your stated book value to give the total value range.",
      "The affordability sense-check uses the mid-point of the indicative total value range as the default purchase price, applies your deposit percentage to split the price into equity and borrowing, then runs a standard amortising loan calculation at your stated interest rate and term. The annual repayment is compared to the normalised EBITDA: a ratio above 1.2x means the practice generates at least 20% more cash than the annual debt service, which is a commonly used minimum threshold for dental practice acquisition lending.",
      "This is an indicative tool. Actual loan terms, lender coverage ratios, NHS contract transfer conditions and professional fee costs all affect whether a deal is financeable and on what terms. Always take specialist legal, financial and dental accountancy advice before proceeding.",
      "Worked example: David is buying a mixed NHS and private practice in the Midlands with normalised EBITDA of £200,000 and £60,000 of tangible assets. The indicative valuation range is £230,000 to £290,000 (0.85x to 1.15x EBITDA plus tangibles), giving a mid-point of £260,000. With a 20% deposit (£52,000), David borrows £208,000 at 8% over 15 years. The amortising annual repayment is approximately £23,853, giving an EBITDA cover ratio of 8.38x, well above the 1.2x rule-of-thumb minimum, confirming the deal is comfortably serviceable on paper at these assumptions.",
    ],
  },
};
