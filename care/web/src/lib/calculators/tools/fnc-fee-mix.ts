import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// Funded Nursing Care (FNC) rate 2026-27 England (from 1 Apr 2026): £267.68/week
// Source: NHS England / DHSC circular. NOTE: live gov.uk/NHS England URLs returned 404
// during verification on 2026-07-12. The £267.68 figure is from the spec (tier1_care/CALCULATORS.md)
// which states "FNC rate £267.68/week (2025-26 England rate, VERIFY live on gov.uk/NHS England before encoding)".
// A 2026-27 rate was not found via live fetch. FLAG: operator must verify the current rate at
// https://www.england.nhs.uk before deploying to production.
export const FNC_WEEKLY_RATE = 267.68;
// Verified 2026-07-12 via house_positions checker pass: £267.68 standard from 1 Apr 2026 (2025-26 was £254.06). Source: https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost
export const FNC_RATE_YEAR = "2026-27";

export interface FncFeeMixResult {
  selfFunderRevenue: number;
  laRevenue: number;
  fncRevenue: number;
  totalRevenue: number;
  totalBeds: number;
  blendedRevenuePerBed: number;
  selfFunderPct: number;
  laPct: number;
  fncPct: number;
  grossMarginAmount: number;
  grossMarginPercent: number;
}

export function calcFncFeeMix(
  selfFunderBeds: number,
  selfFunderWeeklyFee: number,
  laBeds: number,
  laWeeklyFee: number,
  fncBeds: number,
  fncBaseWeeklyFee: number, // the base nursing fee the home charges (FNC is paid on top by NHS)
  weeklyOperatingCost: number, // total weekly cost (staffing + other)
): FncFeeMixResult {
  const selfFunderRevenue = selfFunderBeds * selfFunderWeeklyFee;
  const laRevenue = laBeds * laWeeklyFee;
  // FNC beds: home receives base fee + FNC contribution from NHS
  const fncRevenue = fncBeds * (fncBaseWeeklyFee + FNC_WEEKLY_RATE);

  const totalRevenue = selfFunderRevenue + laRevenue + fncRevenue;
  const totalBeds = selfFunderBeds + laBeds + fncBeds;
  const blendedRevenuePerBed = totalBeds > 0 ? totalRevenue / totalBeds : 0;

  const selfFunderPct = totalRevenue > 0 ? (selfFunderRevenue / totalRevenue) * 100 : 0;
  const laPct = totalRevenue > 0 ? (laRevenue / totalRevenue) * 100 : 0;
  const fncPct = totalRevenue > 0 ? (fncRevenue / totalRevenue) * 100 : 0;

  const grossMarginAmount = totalRevenue - weeklyOperatingCost;
  const grossMarginPercent = totalRevenue > 0 ? (grossMarginAmount / totalRevenue) * 100 : 0;

  return {
    selfFunderRevenue,
    laRevenue,
    fncRevenue,
    totalRevenue,
    totalBeds,
    blendedRevenuePerBed,
    selfFunderPct,
    laPct,
    fncPct,
    grossMarginAmount,
    grossMarginPercent,
  };
}

function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export const fncFeeMixTool: GenericTool = {
  kind: "generic",
  slug: "funded-nursing-care-fee-mix-calculator",
  name: "Funded Nursing Care and Fee-Mix Margin Calculator",
  category: "Fees, FNC and Local Authority Rates",
  oneLiner:
    `Enter your bed mix (self-funded, LA-funded, FNC-eligible) and weekly fees to see blended weekly revenue per bed and gross margin. FNC rate ${gbp(FNC_WEEKLY_RATE)}/week (${FNC_RATE_YEAR} England) paid by NHS on top of the home's nursing fee.`,
  metaTitle: "FNC and Fee-Mix Calculator | Funded Nursing Care Revenue 2026-27",
  metaDescription:
    `Calculate blended weekly revenue per bed and gross margin from your care home's fee mix: self-funders, LA-funded residents and FNC-eligible nursing residents (FNC rate ${gbp(FNC_WEEKLY_RATE)}/week, ${FNC_RATE_YEAR} England). See the revenue impact of changing your payer mix.`,
  intro:
    `The funded nursing care (FNC) contribution of ${gbp(FNC_WEEKLY_RATE)} per week (${FNC_RATE_YEAR} England) is paid by the NHS directly to eligible nursing home residents' accounts, on top of the home's base nursing fee. Enter your bed mix and fee rates to see total weekly revenue and margin.`,
  ctaLabel: "Get help with care home fee strategy and accounts",
  embedHeight: 840,
  fields: [
    {
      id: "selfFunderBeds",
      label: "Self-funded beds",
      type: "number",
      default: 10,
      step: 1,
      min: 0,
      help: "Residents paying the full fee themselves (or via family). Typically the highest fee rate.",
    },
    {
      id: "selfFunderWeeklyFee",
      label: "Self-funder weekly fee",
      type: "currency",
      default: 1400,
      step: 50,
      help: "Average weekly fee charged to self-funding residents.",
    },
    {
      id: "laBeds",
      label: "LA-funded beds",
      type: "number",
      default: 12,
      step: 1,
      min: 0,
      help: "Residents funded by the local authority. LA rates are often below the self-funder rate.",
    },
    {
      id: "laWeeklyFee",
      label: "LA weekly fee",
      type: "currency",
      default: 950,
      step: 25,
      help: "The rate the local authority pays per week. This varies significantly by council.",
    },
    {
      id: "fncBeds",
      label: "FNC-eligible nursing beds",
      type: "number",
      default: 8,
      step: 1,
      min: 0,
      help: `Residents assessed as eligible for Funded Nursing Care. The NHS pays ${gbp(FNC_WEEKLY_RATE)}/week (${FNC_RATE_YEAR}) on top of the resident's base fee.`,
    },
    {
      id: "fncBaseWeeklyFee",
      label: "Base nursing fee (FNC beds)",
      type: "currency",
      default: 1100,
      step: 50,
      help: `The fee your home charges for an FNC bed (excluding the ${gbp(FNC_WEEKLY_RATE)}/week NHS contribution, which is added automatically).`,
    },
    {
      id: "weeklyOperatingCost",
      label: "Total weekly operating cost",
      type: "currency",
      default: 28000,
      step: 500,
      help: "All weekly costs: staffing (wages, NIC, pension, agency), food, utilities, property, management. Use the Staffing Cost calculator for the staffing element.",
    },
  ],
  compute: (v) => {
    const r = calcFncFeeMix(
      Math.max(0, Number(v.selfFunderBeds)),
      Math.max(0, Number(v.selfFunderWeeklyFee)),
      Math.max(0, Number(v.laBeds)),
      Math.max(0, Number(v.laWeeklyFee)),
      Math.max(0, Number(v.fncBeds)),
      Math.max(0, Number(v.fncBaseWeeklyFee)),
      Math.max(0, Number(v.weeklyOperatingCost)),
    );

    const tone = r.grossMarginPercent < 0 ? "warn" : r.grossMarginPercent < 10 ? "default" : "good";

    return {
      headline: {
        label: "Blended weekly revenue per occupied bed",
        value: gbp(r.blendedRevenuePerBed),
        sub: `Total weekly revenue ${gbp(r.totalRevenue)} across ${r.totalBeds} beds. Gross margin ${gbp(r.grossMarginAmount)} (${pct(r.grossMarginPercent)})`,
        tone,
      },
      rows: [
        { label: `Self-funder revenue (${r.selfFunderRevenue > 0 ? pct(r.selfFunderPct) : "0%"} of revenue)`, value: gbp(r.selfFunderRevenue) },
        { label: `LA-funded revenue (${r.laRevenue > 0 ? pct(r.laPct) : "0%"} of revenue)`, value: gbp(r.laRevenue) },
        {
          label: `FNC nursing revenue incl. ${gbp(FNC_WEEKLY_RATE)}/bed NHS contribution (${r.fncRevenue > 0 ? pct(r.fncPct) : "0%"})`,
          value: gbp(r.fncRevenue),
          strong: true,
        },
        { label: "Total weekly revenue", value: gbp(r.totalRevenue), strong: true },
        { label: "Blended revenue per bed", value: gbp(r.blendedRevenuePerBed), strong: true },
        { label: "Total weekly operating cost", value: gbp(Number(v.weeklyOperatingCost)) },
        { label: "Gross margin", value: `${gbp(r.grossMarginAmount)} (${pct(r.grossMarginPercent)})`, strong: true },
      ],
      note: `FNC rate used: ${gbp(FNC_WEEKLY_RATE)}/week (${FNC_RATE_YEAR} England rate). IMPORTANT: verify the current rate at NHS England before using for financial planning. The NHS pays this directly to nursing homes for eligible residents assessed under the FNC process.`,
    };
  },
  explainer: {
    heading: "Funded nursing care and fee-mix strategy for nursing homes",
    paragraphs: [
      `Funded Nursing Care (FNC) is a weekly NHS contribution paid to nursing homes for residents who have been assessed as requiring registered nursing care but who do not qualify for full NHS Continuing Healthcare (CHC) funding. The rate for England is set annually by NHS England; the 2026-27 rate (from 1 April 2026) is ${gbp(FNC_WEEKLY_RATE)} per week per eligible resident.`,
      "The FNC payment is made by the NHS on top of whatever the resident or local authority pays as the base nursing fee. It is not means-tested. Any resident in a nursing home who has been assessed and found to have a primary nursing need can receive FNC. The home receives the FNC payment directly from the NHS.",
      "Fee mix matters enormously to nursing home profitability. Self-funding residents typically pay £1,200-£1,600 per week in many parts of England. Local authority rates, by contrast, are often £800-£1,100 per week and frequently below the cost of care. FNC adds a guaranteed NHS contribution on top of the base fee for nursing beds, which makes FNC-eligible beds more valuable than LA-funded residential beds at comparable fee rates.",
      "A home with 30 beds, 10 of which are FNC-eligible at £267.68/week, receives an additional £2,676.80 per week (£139,194 per year) from NHS England compared to the same beds being LA-funded residential. This revenue is unconditional on the resident's means and is index-linked annually.",
      "The CHC/FNC assessment process can be complex. Families and care homes often under-claim because residents are not assessed or re-assessed when their needs change. An active approach to ensuring eligible residents are properly assessed for FNC (and CHC where appropriate) directly improves revenue without any fee negotiation.",
    ],
  },
  faqs: [
    {
      question: `What is the FNC rate for England in 2026-27?`,
      answer: `${gbp(FNC_WEEKLY_RATE)} per week per eligible resident. This is paid by NHS England directly to the nursing home. The rate is reviewed annually. Verify the current rate at NHS England before using for financial planning.`,
    },
    {
      question: "Who is eligible for Funded Nursing Care?",
      answer:
        "Residents in a nursing home who have been assessed as having a primary nursing need but who do not qualify for full NHS Continuing Healthcare (CHC) funding. The assessment uses the NHS Decision Support Tool. Eligible residents receive the FNC contribution from the NHS regardless of their financial means.",
    },
    {
      question: "Is FNC the same as NHS Continuing Healthcare?",
      answer:
        "No. NHS Continuing Healthcare (CHC) is full NHS funding for people with a primary health need, covering all care costs. Funded Nursing Care is a partial NHS contribution specifically for the registered nursing element of care in a nursing home. CHC-funded residents do not also receive FNC.",
    },
    {
      question: "Can a care home resident receive FNC if they are self-funding?",
      answer:
        "Yes. FNC is not means-tested. A self-funding resident assessed as eligible receives the FNC contribution from the NHS, which reduces the net fee they pay. The home receives the full FNC rate on top of whatever the resident pays for non-nursing care.",
    },
    {
      question: "Why do LA-funded fees tend to be lower than self-funder fees?",
      answer:
        "Local authorities have statutory duties to fund care for eligible residents but set their own fee rates through annual negotiations. LA rates in many areas do not meet the true cost of care. Care homes that accept LA-funded residents often cross-subsidise from self-funder fees to remain financially viable. The Care Act 2014 requires local authorities to pay a rate that reflects the true cost, but enforcement is limited.",
    },
  ],
};
