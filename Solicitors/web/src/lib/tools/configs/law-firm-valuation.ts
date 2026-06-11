import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcLawFirmValuation, type FirmType, type Region, type MarketDemand } from "@/lib/tools/compute/law-firm-valuation";

export const lawFirmValuationTool: GenericTool = {
  kind: "generic",
  slug: "law-firm-valuation",
  name: "Law Firm Valuation Calculator",
  category: "Practice Finance",
  oneLiner:
    "Indicative law firm value: normalised profit x multiple (by firm type and region), plus WIP and tangible assets. UK 2025/26 ranges.",
  embedHeight: 540,
  metaTitle: "Law Firm Valuation Calculator 2025/26 | UK Solicitor Practice Value",
  metaDescription:
    "Free law firm valuation calculator. Goodwill multiple by firm type and region, plus WIP and tangible assets. UK 2025/26 indicative market ranges.",
  intro:
    "Valuation is the first step in any succession plan, acquisition conversation or equity partnership negotiation. Enter your normalised profit, firm type and region to get an indicative range based on current UK market multiples.",
  fields: [
    {
      id: "profit",
      label: "Normalised annual profit",
      type: "currency",
      default: 600000,
      min: 0,
      max: 20000000,
      step: 10000,
      help: "After add-backs: partner drawings normalised, personal expenses removed",
    },
    {
      id: "firmType",
      label: "Firm type",
      type: "select",
      default: "partnership-llp",
      options: [
        { value: "sole-practitioner", label: "Sole practitioner (small)" },
        { value: "partnership-llp", label: "Partnership / LLP (mid-market)" },
        { value: "specialist", label: "Specialist firm (PI / commercial litigation / prestige)" },
        { value: "high-volume", label: "High-volume (conveyancing factory etc.)" },
      ],
    },
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "midlands",
      options: [
        { value: "london", label: "London / South East" },
        { value: "south", label: "South + South West" },
        { value: "midlands", label: "Midlands" },
        { value: "north", label: "North" },
        { value: "wales", label: "Wales" },
        { value: "scotland-ni", label: "Scotland / Northern Ireland" },
      ],
    },
    {
      id: "demand",
      label: "Buyer demand in your area",
      type: "select",
      default: "normal",
      options: [
        { value: "low", label: "Low (soft market, conveyancing depressed)" },
        { value: "normal", label: "Normal demand" },
        { value: "high", label: "High (prime location, strong buyer pool)" },
      ],
    },
    {
      id: "wip",
      label: "Work in Progress (WIP)",
      type: "currency",
      default: 180000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "Recoverable WIP only",
    },
    {
      id: "tangibleAssets",
      label: "Tangible assets",
      type: "currency",
      default: 40000,
      min: 0,
      max: 2000000,
      step: 5000,
      help: "IT, fit-out, furniture etc.",
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const firmType = String(values.firmType) as FirmType;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as MarketDemand;
    const wip = Number(values.wip);
    const tangibleAssets = Number(values.tangibleAssets);
    const r = calcLawFirmValuation({ profit, firmType, region, demand, wip, tangibleAssets });
    return {
      headline: {
        label: "Indicative total value range",
        value: `${gbp(Math.round(r.totalLow))} to ${gbp(Math.round(r.totalHigh))}`,
        sub: `Multiple: ${r.multipleLow.toFixed(2)}x to ${r.multipleHigh.toFixed(2)}x normalised profit`,
        tone: "default" as const,
      },
      rows: [
        { label: "Goodwill range", value: `${gbp(Math.round(r.goodwillLow))} to ${gbp(Math.round(r.goodwillHigh))}` },
        { label: "WIP", value: gbp(Math.round(wip)) },
        { label: "Tangible assets", value: gbp(Math.round(tangibleAssets)) },
      ],
      note: "Directional model, UK 2025/26 indicative market ranges. Normalised profit add-backs typically swing the valuation by more than the multiple range. Corporate acquirer premiums not modelled.",
    };
  },
  explainer: {
    heading: "How law firm valuations work",
    paragraphs: [
      "The most common UK method values a law firm as goodwill (a multiple of normalised profit) plus separable assets (recoverable WIP and tangible assets such as IT and fit-out).",
      "Normalised profit is the key driver. Add-backs that move the profit number 10-20% — removing personal expenses, adjusting partner drawings to market salary, stripping one-off items — typically move the valuation by more than moving the multiple.",
      "Multiples vary widely: specialist firms with high-margin recurring instruction streams command premium multiples; high-volume conveyancing factories and sole practitioners trade at lower multiples because goodwill is less transferable. London adds a premium; northern markets trade at a modest discount to Midlands.",
    ],
  },
  faqs: [
    {
      question: "What is normalised profit?",
      answer:
        "Normalised profit is the profit figure you would show a buyer as a true representation of the business. You start with stated profit, then add back items that are personal to current owners or non-recurring: owner drawings above a market salary, personal car, spouse on payroll, one-off legal or restructuring costs. The adjusted number is what the multiple is applied to.",
    },
    {
      question: "Why is WIP added separately?",
      answer:
        "Goodwill (multiple of profit) reflects the earning power of the business. WIP is a current asset: work already done but not yet billed. It gets added at face value adjusted for realisability — aged WIP above 6 months is typically discounted, and litigation WIP more heavily than conveyancing WIP.",
    },
    {
      question: "How does a succession buyout differ from an external sale?",
      answer:
        "Internal succession (partners buying out a retiring partner) usually uses a formula in the partnership or LLP deed, which may differ from external market value. External buyers (consolidators, private equity-backed groups) may pay a strategic premium above the formula. This calculator models the arms-length market range.",
    },
  ],
};
