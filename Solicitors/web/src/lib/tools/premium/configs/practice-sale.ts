/**
 * Tool 3: Practice sale value and net-of-tax planner.
 *
 * toolId: practice-sale-premium
 * topic: succession-sale
 *
 * Reuses calcLawFirmValuation (existing golden-tested lib) for the goodwill
 * and total value range, then applies the new calcPracticeSaleCgt lib for the
 * CGT / BADR net-proceeds layer.
 *
 * FIGURES TRACED:
 * - calcLawFirmValuation: indicative 2025/26 UK market multiples (HP §9 / TOOLS.md).
 * - calcPracticeSaleCgt: HP §9 (CGT 18%/24% from 30 Oct 2024; AEA £3,000 2025/26 and 2026/27).
 * - BADR 18% from 6 April 2026 (HP verification log; F2 resolved 2026-07-05).
 * - BADR lifetime limit £1,000,000 (confirmed at gov.uk/business-asset-disposal-relief, 2026-07-05).
 * - WIP on sale is an income receipt (HP §4, ITTOIA 2005 ss.182 to 185) -- noted in tool note.
 * - Transferring client-account balances on a sale needs client consent (HP §5) -- noted.
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calcLawFirmValuation, type FirmType, type Region, type MarketDemand } from "@/lib/tools/compute/law-firm-valuation";
import { calcPracticeSaleCgt } from "@/lib/tools/compute/practice-sale-cgt";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function gbpRange(low: number, high: number): string {
  return `${gbp(low)} to ${gbp(high)}`;
}

export const practiceSaleConfig: PremiumToolConfig = {
  id: "practice-sale-premium",
  topic: "succession-sale",
  title: "Law firm sale value and net proceeds calculator",
  intro: "Estimate an indicative goodwill and total value for your firm from its normalised profit, then see roughly what you keep after Capital Gains Tax and Business Asset Disposal Relief on a sale.",
  fields: [
    {
      id: "profit",
      label: "Normalised annual profit (EBITDA)",
      type: "currency",
      default: 400000,
      min: 0,
      max: 5000000,
      step: 25000,
    },
    {
      id: "firmType",
      label: "Firm type",
      type: "select",
      default: "partnership-llp",
      options: [
        { value: "sole-practitioner", label: "Sole practitioner" },
        { value: "partnership-llp", label: "Partnership or LLP" },
        { value: "specialist", label: "Specialist" },
        { value: "high-volume", label: "High-volume" },
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
        { value: "scotland-ni", label: "Scotland or Northern Ireland" },
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
      id: "wip",
      label: "Work in progress (WIP)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 5000000,
      step: 5000,
      advanced: true,
      help: "Note: WIP realised on sale is taxed as income, not as a capital gain (HP §4, ITTOIA 2005 ss.182 to 185)",
    },
    {
      id: "tangibleAssets",
      label: "Tangible assets",
      type: "currency",
      default: 40000,
      min: 0,
      max: 5000000,
      step: 5000,
      advanced: true,
    },
    {
      id: "chargeableGain",
      label: "Chargeable gain on your interest",
      type: "currency",
      default: 0,
      min: 0,
      max: 10000000,
      step: 25000,
      advanced: true,
      help: "Your share of the capital gain (defaults to mid-point goodwill when left at 0)",
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
      help: "Sets the CGT 18% / 24% split (how much basic-rate band remains)",
    },
    {
      id: "badrEligible",
      label: "Business Asset Disposal Relief expected?",
      type: "toggle",
      default: true,
      help: "BADR rate 18% from 6 April 2026 (within the £1,000,000 lifetime limit). Requires a qualifying interest held for at least two years.",
    },
  ],
  compute({ values }): PremiumResult {
    const profit = Number(values.profit) || 0;
    const firmType = String(values.firmType) as FirmType;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as MarketDemand;
    const wip = Number(values.wip) || 0;
    const tangibleAssets = Number(values.tangibleAssets) || 0;
    const otherIncome = Number(values.otherIncome) || 0;
    const badrEligible = Boolean(values.badrEligible);

    const val = calcLawFirmValuation({ profit, firmType, region, demand, wip, tangibleAssets });

    // Default chargeableGain to the mid-point goodwill if not overridden.
    const midGoodwill = (val.goodwillLow + val.goodwillHigh) / 2;
    const chargeableGainInput = Number(values.chargeableGain) || 0;
    const chargeableGain = chargeableGainInput > 0 ? chargeableGainInput : midGoodwill;

    const cgt = calcPracticeSaleCgt({
      gain: chargeableGain,
      otherIncome,
      badrEligible,
      aeaAvailable: 3000,
      badrLifetimeRemaining: 1000000,
    });

    const midTotal = (val.totalLow + val.totalHigh) / 2;

    const scenarios: ScenarioResult[] = [
      {
        id: "low",
        label: "Low (conservative)",
        headline: {
          label: "Goodwill",
          value: gbp(val.goodwillLow),
          sub: `${val.multipleLow.toFixed(2)}x profit`,
          tone: "good",
        },
        rows: [
          { label: "Goodwill", value: gbp(val.goodwillLow) },
          { label: "WIP", value: gbp(wip) },
          { label: "Tangible assets", value: gbp(tangibleAssets) },
          { label: "Total", value: gbp(val.totalLow), strong: true },
        ],
      },
      {
        id: "high",
        label: "High (optimistic)",
        headline: {
          label: "Goodwill",
          value: gbp(val.goodwillHigh),
          sub: `${val.multipleHigh.toFixed(2)}x profit`,
          tone: "good",
        },
        rows: [
          { label: "Goodwill", value: gbp(val.goodwillHigh) },
          { label: "WIP", value: gbp(wip) },
          { label: "Tangible assets", value: gbp(tangibleAssets) },
          { label: "Total", value: gbp(val.totalHigh), strong: true },
        ],
      },
    ];

    const chartData = [
      {
        name: "Goodwill",
        low: Math.round(val.goodwillLow),
        high: Math.round(val.goodwillHigh),
      },
      {
        name: "Total value",
        low: Math.round(val.totalLow),
        high: Math.round(val.totalHigh),
      },
      {
        name: "Net after CGT",
        low: Math.round(cgt.netProceeds),
        high: Math.round(cgt.netProceeds),
      },
    ];

    return {
      headline: {
        label: "Indicative total value",
        value: gbp(midTotal),
        sub: `goodwill ${gbpRange(val.goodwillLow, val.goodwillHigh)} at ${val.multipleLow.toFixed(1)}x to ${val.multipleHigh.toFixed(1)}x profit`,
        tone: "good",
      },
      scenarioResults: scenarios,
      breakdown: [
        { label: "Goodwill range", value: gbpRange(val.goodwillLow, val.goodwillHigh) },
        { label: "WIP", value: gbp(wip) },
        { label: "Tangible assets", value: gbp(tangibleAssets) },
        { label: "Total value range", value: gbpRange(val.totalLow, val.totalHigh) },
        { label: "Estimated chargeable gain (capital)", value: gbp(chargeableGain), strong: true },
        { label: "Less: Annual Exempt Amount", value: `-${gbp(3000)}` },
        { label: "Taxable gain", value: gbp(cgt.taxableGain) },
        ...(badrEligible ? [{ label: "BADR at 18% (from 6 Apr 2026, up to £1,000,000 lifetime)", value: gbp(cgt.gainAtBadr * 0.18) }] : []),
        ...(cgt.gainAtBasic > 0 ? [{ label: "CGT at 18% (basic-rate band)", value: gbp(cgt.gainAtBasic * 0.18) }] : []),
        ...(cgt.gainAtHigher > 0 ? [{ label: "CGT at 24% (above basic-rate band)", value: gbp(cgt.gainAtHigher * 0.24) }] : []),
        { label: "Total CGT payable", value: gbp(cgt.totalCgt) },
        { label: "Net proceeds after CGT", value: gbp(cgt.netProceeds), strong: true },
      ],
      chart: { data: chartData },
      note: "Goodwill multiples are indicative 2025/26 UK market ranges, not a formal valuation. BADR requires a qualifying business asset interest held for at least two years; a salaried or re-classified member (ITTOIA 2005 ss.863A to 863G) may not qualify (HP §2.A). WIP realised on sale of a law firm is taxed as an income receipt, not a capital gain (HP §4, ITTOIA 2005 ss.182 to 185): the seller's real tax is a mix of CGT on goodwill and income tax on WIP; this tool shows only the CGT layer. Transferring client-account balances on a sale requires client consent (HP §5). These are estimates, not advice for your firm.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "low", label: "Low", color: "var(--accent)" },
      { dataKey: "high", label: "High", color: "var(--primary)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "The goodwill value is estimated from your normalised annual profit multiplied by an indicative market range. The range varies by firm type (sole practitioner, partnership/LLP, specialist and high-volume each attract different multiples), region (London commands a premium; north and Wales carry a discount) and buyer demand conditions. WIP and tangible assets are added to give an indicative total value.",
      "The CGT and BADR layer takes the estimated chargeable gain (defaulting to the mid-point goodwill), deducts the £3,000 Annual Exempt Amount, and applies Business Asset Disposal Relief at 18% (from 6 April 2026, HP verification log) within the £1,000,000 lifetime limit. Gains above the BADR limit are taxed at standard CGT rates: 18% within any remaining basic-rate band and 24% above, effective from 30 October 2024 (HP §9).",
      "Important: unbilled WIP realised on a firm sale is an income receipt under ITTOIA 2005 ss.182 to 185, taxed as trading income rather than as a capital gain. The total tax on a practice sale is therefore a combination of CGT on the goodwill and income tax on any WIP realised, which this tool models separately.",
    ],
  },
};
