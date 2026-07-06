/**
 * Tool 5: R&D tax relief estimator (merged scheme + ERIS, CORRECTED rates) (premium).
 *
 * toolId: rd-tax-credit-premium
 * topic: rnd
 *
 * NOTE: rnd has no blog category, so this tool does NOT surface via the R2 blog
 * island. It is built for spine completeness, the CORRECTED-rate golden, and R3
 * (calculator-page resources on rd-tax-credit-estimator, which maps to rnd).
 *
 * Composes calcRdTaxCredit from compute/rd-tax-credit.ts. NO maths forked.
 *
 * CORRECTED RATES (HP §4, locked 2026-07-05):
 *   Merged RDEC:  20% expenditure credit; taxable, so net ~15% at 25% CT.
 *   ERIS:         Intensity threshold 30% (NOT stale 40%).
 *                 86% enhanced deduction (186% total) + 14.5% payable credit.
 *                 Net benefit = qualifying * 1.86 * 0.145 = ~26.97p/GBP.
 *   Subcontractor haircut: 65% of qualifying cost is claimable.
 *
 * GOLDEN (executed 2026-07-06, defaults):
 *   totalExpenditure=800000, staffCost=120000, subcontractorCost=40000,
 *   consumablesCost=15000, softwareCost=25000
 *   qualifying=186000, intensityRatio=0.2325, isIntensive=false
 *   creditRate=0.20, grossCredit=37200, netBenefit=27900
 *
 * ERIS case (totalExpenditure=200000, staffCost=90000, rest=0):
 *   intensityRatio=0.45, isIntensive=true, usedEris=true
 *   creditRate=0.2697, grossCredit=24273, netBenefit=24273
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcRdTaxCredit } from "@/lib/tools/compute/rd-tax-credit";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (n * 100).toFixed(2) + "%";
}

export const rdTaxCreditConfig: PremiumToolConfig = {
  id: "rd-tax-credit-premium",
  topic: "rnd",
  title: "R&D tax relief estimator (merged scheme + ERIS, 2026/27)",
  intro: "Estimate the potential R&D tax benefit under the merged RDEC scheme or ERIS for loss-making R&D-intensive SMEs. Most agency projects do not qualify: read the eligibility note carefully before using this tool.",
  fields: [
    {
      id: "totalExpenditure",
      label: "Total expenditure in the period",
      type: "currency",
      default: 800000,
      min: 0,
      max: 10000000,
      step: 10000,
      help: "Total expenditure in the period, used to calculate the R&D intensity ratio for the ERIS test.",
    },
    {
      id: "staffCost",
      label: "Qualifying staff costs",
      type: "currency",
      default: 120000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "Staff costs directly engaged in qualifying R&D activities (not management or support).",
    },
    {
      id: "subcontractorCost",
      label: "Qualifying subcontractor costs",
      type: "currency",
      default: 40000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "65% of qualifying subcontractor cost is claimable under the merged scheme. Overseas subcontractors are restricted from April 2024.",
    },
    {
      id: "consumablesCost",
      label: "Qualifying consumables",
      type: "currency",
      default: 15000,
      min: 0,
      max: 500000,
      step: 1000,
    },
    {
      id: "softwareCost",
      label: "Qualifying software",
      type: "currency",
      default: 25000,
      min: 0,
      max: 500000,
      step: 1000,
    },
  ],
  compute({ values }): PremiumResult {
    const totalExpenditure = Number(values.totalExpenditure) || 0;
    const staffCost = Number(values.staffCost) || 0;
    const subcontractorCost = Number(values.subcontractorCost) || 0;
    const consumablesCost = Number(values.consumablesCost) || 0;
    const softwareCost = Number(values.softwareCost) || 0;

    const r = calcRdTaxCredit({ totalExpenditure, staffCost, subcontractorCost, consumablesCost, softwareCost });

    const schemeLabel = r.usedEris
      ? "ERIS (R&D-intensive SME, 86% enhanced deduction + 14.5% payable credit)"
      : "Merged RDEC (20% expenditure credit, ~15% net at 25% CT)";

    const intensityLabel = (r.intensityRatio * 100).toFixed(1) + "%";
    const erisLabel = r.isIntensive ? "Yes (intensity >= 30%)" : "No (intensity < 30%)";

    return {
      headline: {
        label: "Estimated R&D benefit",
        value: gbp(r.netBenefit),
        sub: schemeLabel,
        tone: "default",
      },
      breakdown: [
        { label: "Qualifying R&D spend", value: gbp(r.qualifying) },
        { label: "R&D intensity ratio", value: intensityLabel },
        { label: "ERIS applies", value: erisLabel },
        { label: "Credit rate", value: pct(r.creditRate) },
        { label: "Gross credit", value: gbp(r.grossCredit) },
        { label: "Net benefit", value: gbp(r.netBenefit), strong: true },
      ],
      note: "ELIGIBILITY WARNING: most agency projects do NOT qualify for R&D relief. Qualifying R&D must seek an advance in science or technology through genuine technical uncertainty. Routine web development on existing frameworks, creative or routine design, off-the-shelf implementation and marketing campaigns are excluded. HMRC is actively auditing R&D claims with penalties up to 100%. The merged scheme applies to accounting periods beginning on or after 1 April 2024. ERIS: intensity threshold 30% (qualifying / total expenditure), 86% enhanced deduction, 14.5% payable credit (~26.97p per £1 qualifying). Subcontractor haircut: 65% of qualifying subcontractor cost claimable; overseas subcontractors restricted from April 2024. This tool is illustrative only, not an encouragement to claim.",
    };
  },
  explainer: {
    heading: "How the R&D tax relief estimator works",
    paragraphs: [
      "Most agency work does not qualify for R&D relief, and HMRC is auditing claims hard. If you have a genuine technical advance, here is a rough benefit under the merged scheme, or under ERIS if you are a loss-making R&D-intensive SME. Treat this as a first sense-check, not a green light to claim.",
      "The merged RDEC scheme (for accounting periods starting on or after 1 April 2024) gives a 20% expenditure credit on qualifying R&D spend. The credit is taxable income, so the net benefit at the 25% main CT rate is approximately 15p per £1 of qualifying spend. ERIS (the enhanced R&D intensive support scheme) is available to loss-making SMEs whose qualifying R&D spend is at least 30% of their total expenditure. ERIS gives an 86% enhanced deduction (186% total) and a 14.5% payable credit on the surrendered loss, equivalent to approximately 26.97p per £1 of qualifying spend.",
      "Qualifying costs include: directly engaged staff costs, 65% of qualifying subcontractor costs (restricted to UK-based contractors from April 2024), consumables, and software used directly in the R&D activity. Management, support, and indirect costs are excluded. The intensity ratio (qualifying spend divided by total expenditure) determines whether ERIS applies: at 30% or above the ERIS rules apply; below 30% you use the standard merged RDEC rate.",
    ],
  },
};
