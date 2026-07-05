/**
 * Tool 4: Dental practice sale value and net proceeds calculator.
 *
 * toolId: practice-sale-premium
 * topic: selling
 *
 * Composes calcPracticeValuation (existing lib) with the new calcPracticeSaleCgt
 * lib for the CGT / BADR net-proceeds layer.
 *
 * FIGURES TRACED:
 * - calcPracticeValuation: indicative UK dental market multiples, 2025/26 (HP §4).
 * - calcPracticeSaleCgt: BADR 18% from 6 April 2026, £1,000,000 lifetime limit
 *   (HP §4 + primary source gov.uk BADR); AEA £3,000 and standard CGT 18%/24%
 *   from 30 October 2024 (estate CGT ground truth, F1 resolved).
 * - HP §4.A: unconditional exchange on or before 5 April 2026 would fix the
 *   14% rate (mentioned in note, not modelled).
 * - HP §4: BADR qualification conditions; earn-out at standard CGT rate (note).
 * - HP §3: NHS contract novation (note).
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import {
  calcPracticeValuation,
  type PracticeMix,
  type Region,
  type Demand,
} from "@/lib/tools/compute/practice-valuation";
import { calcPracticeSaleCgt, DEFAULT_AEA, BADR_RATE_FROM_6APR2026, CGT_BASIC_RATE, CGT_HIGHER_RATE } from "@/lib/tools/compute/practice-sale-cgt";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function gbpRange(low: number, high: number): string {
  return `${gbp(low)} to ${gbp(high)}`;
}

export const practiceSaleConfig: PremiumToolConfig = {
  id: "practice-sale-premium",
  topic: "selling",
  title: "Dental practice sale value and net proceeds calculator",
  intro: "Estimate an indicative goodwill and total value for your practice from its normalised EBITDA, then see roughly what you keep after Capital Gains Tax and Business Asset Disposal Relief on a sale.",
  fields: [
    {
      id: "ebitda",
      label: "Normalised EBITDA",
      type: "currency",
      default: 200000,
      min: 0,
      max: 2000000,
      step: 10000,
    },
    {
      id: "mix",
      label: "Practice mix",
      type: "select",
      default: "mixed",
      options: [
        { value: "nhs-heavy", label: "NHS-heavy" },
        { value: "mixed", label: "Mixed" },
        { value: "private-heavy", label: "Private-heavy" },
      ],
    },
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "midlands",
      options: [
        { value: "london", label: "London" },
        { value: "south", label: "South" },
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
      label: "Tangible assets",
      type: "currency",
      default: 60000,
      min: 0,
      max: 1000000,
      step: 5000,
      advanced: true,
    },
    {
      id: "chargeableGain",
      label: "Chargeable gain on your interest",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000000,
      step: 10000,
      advanced: true,
      help: "Your share of the capital gain (defaults to mid-point goodwill when left at 0).",
    },
    {
      id: "otherIncome",
      label: "Your other taxable income this year",
      type: "currency",
      default: 50000,
      min: 0,
      max: 500000,
      step: 5000,
      advanced: true,
      help: "Sets the CGT 18% / 24% split (how much basic-rate band remains after your other income).",
    },
    {
      id: "badrEligible",
      label: "Business Asset Disposal Relief expected?",
      type: "toggle",
      default: true,
      help: "BADR rate 18% from 6 April 2026 (HP §4), within the £1,000,000 lifetime limit. Requires a qualifying interest held for at least two years.",
    },
  ],
  compute({ values }): PremiumResult {
    const ebitda = Number(values.ebitda) || 0;
    const mix = String(values.mix) as PracticeMix;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as Demand;
    const tangibleAssets = Number(values.tangibleAssets) || 0;
    const otherIncome = Number(values.otherIncome) || 0;
    const badrEligible = Boolean(values.badrEligible);

    const val = calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets);
    const midGoodwill = (val.goodwillLow + val.goodwillHigh) / 2;
    const midTotal = (val.totalLow + val.totalHigh) / 2;

    // Default chargeableGain to the mid-point goodwill if not overridden.
    const chargeableGainInput = Number(values.chargeableGain) || 0;
    const chargeableGain = chargeableGainInput > 0 ? chargeableGainInput : midGoodwill;

    const cgt = calcPracticeSaleCgt({
      gain: chargeableGain,
      otherIncome,
      badrEligible,
      aeaAvailable: 3000,
      badrLifetimeRemaining: 1000000,
    });

    const scenarios: ScenarioResult[] = [
      {
        id: "low",
        label: "Low (conservative)",
        headline: {
          label: "Goodwill",
          value: gbp(val.goodwillLow),
          sub: `${val.multipleLow.toFixed(2)}x EBITDA`,
          tone: "good",
        },
        rows: [
          { label: "Goodwill (low)", value: gbp(val.goodwillLow) },
          { label: "Tangible assets", value: gbp(tangibleAssets) },
          { label: "Total value (low)", value: gbp(val.totalLow), strong: true },
        ],
      },
      {
        id: "high",
        label: "High (optimistic)",
        headline: {
          label: "Goodwill",
          value: gbp(val.goodwillHigh),
          sub: `${val.multipleHigh.toFixed(2)}x EBITDA`,
          tone: "good",
        },
        rows: [
          { label: "Goodwill (high)", value: gbp(val.goodwillHigh) },
          { label: "Tangible assets", value: gbp(tangibleAssets) },
          { label: "Total value (high)", value: gbp(val.totalHigh), strong: true },
        ],
      },
    ];

    return {
      headline: {
        label: "Indicative total value",
        value: gbp(midTotal),
        sub: `goodwill ${gbpRange(val.goodwillLow, val.goodwillHigh)} at ${val.multipleLow.toFixed(1)}x to ${val.multipleHigh.toFixed(1)}x EBITDA`,
        tone: "good",
      },
      scenarioResults: scenarios,
      breakdown: [
        { label: "Goodwill range", value: gbpRange(val.goodwillLow, val.goodwillHigh) },
        { label: "Tangible assets", value: gbp(tangibleAssets) },
        { label: "Total value range", value: gbpRange(val.totalLow, val.totalHigh) },
        { label: "Estimated chargeable gain", value: gbp(chargeableGain), strong: true },
        { label: "Less: Annual Exempt Amount", value: `-${gbp(DEFAULT_AEA)}` },
        { label: "Taxable gain", value: gbp(cgt.taxableGain) },
        ...(badrEligible ? [{ label: "BADR at 18% (from 6 Apr 2026, up to £1,000,000 lifetime)", value: gbp(cgt.gainAtBadr * BADR_RATE_FROM_6APR2026) }] : []),
        ...(cgt.gainAtBasic > 0 ? [{ label: "CGT at 18% (basic-rate band)", value: gbp(cgt.gainAtBasic * CGT_BASIC_RATE) }] : []),
        ...(cgt.gainAtHigher > 0 ? [{ label: "CGT at 24% (above basic-rate band)", value: gbp(cgt.gainAtHigher * CGT_HIGHER_RATE) }] : []),
        { label: "Total CGT payable", value: gbp(cgt.totalCgt) },
        { label: "Net proceeds after CGT", value: gbp(cgt.netProceeds), strong: true },
      ],
      chart: {
        data: [
          { name: "Goodwill", low: Math.round(val.goodwillLow), high: Math.round(val.goodwillHigh) },
          { name: "Total value", low: Math.round(val.totalLow), high: Math.round(val.totalHigh) },
          { name: "Net after CGT", low: Math.round(cgt.netProceeds), high: Math.round(cgt.netProceeds) },
        ],
      },
      note: "BADR requires a qualifying interest held for at least two years. For a share sale, the 5% share-capital, 5% voting, and officer-or-employee conditions must be met throughout (HP §4). An earn-out is usually taxed at the standard CGT rate, not the BADR rate, because the right to the future payment is a separate chargeable asset (HP §4.A). On an asset sale, the NHS contract transfers by novation with commissioner consent (HP §3). s.162 incorporation relief can convert an unincorporated practice pre-sale so a later share sale reaches BADR (HP §4). From 6 April 2026, BADR is 18%; an unconditional exchange on or before 5 April 2026 would have fixed the previous 14% rate even if completion follows, but a conditional contract would not (HP §4.A). Goodwill multiples are indicative 2025/26 market ranges, not a formal valuation. These are estimates, not advice for your practice.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "low", label: "Low", color: "var(--gold)" },
      { dataKey: "high", label: "High", color: "var(--navy)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "The goodwill value is estimated from your normalised EBITDA multiplied by an indicative market-multiple range. The range varies by practice mix (NHS-heavy practices attract lower multiples), region (London commands a premium; north, Wales and Northern Ireland a discount) and buyer-demand conditions. Tangible assets are added to give an indicative total value. The range shown is conservative to optimistic; the real outcome depends on buyer type, contract security, associate retention and negotiation.",
      "The CGT and BADR layer takes the estimated chargeable gain (defaulting to the mid-point goodwill), deducts the £3,000 Annual Exempt Amount, and applies Business Asset Disposal Relief at 18% (from 6 April 2026, HP §4) within the £1,000,000 lifetime limit. Gains above the BADR limit are taxed at standard CGT rates: 18% within any remaining basic-rate band and 24% above, effective from 30 October 2024.",
      "The BADR rate has stepped up twice recently: from 10% to 14% on 6 April 2025, then to 18% on 6 April 2026. For larger practices approaching the £1,000,000 lifetime limit, careful structuring of the sale timetable and the allocation of proceeds between goodwill, equipment and restrictive covenants can materially affect the net result. A specialist dental accountant should model the full picture before heads of terms are signed.",
    ],
  },
};
