/**
 * Premium Tool 5 — R&D tax relief estimator (rd-estimator-premium)
 *
 * Topic: rnd.
 * Reuses: calcRDCredit from compute/rd-credit.ts.
 * Premium value: qualifying-spend build-up, the ERIS-vs-RDEC branch verdict
 * (intensity test), and the payable/net benefit with the 30% threshold explained.
 */

import type { PremiumToolConfig, PremiumComputeFn } from "../types";
import { calcRDCredit } from "@/lib/tools/compute/rd-credit";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";

const compute: PremiumComputeFn = ({ values }) => {
  const totalExpenditure = Number(values.totalExpenditure) || 0;
  const staffCost = Number(values.staffCost) || 0;
  const subcontractorCost = Number(values.subcontractorCost) || 0;
  const consumablesCost = Number(values.consumablesCost) || 0;
  const softwareCost = Number(values.softwareCost) || 0;

  const res = calcRDCredit(totalExpenditure, staffCost, subcontractorCost, consumablesCost, softwareCost);

  const verdict = {
    text: res.isIntensive
      ? "You look R&D-intensive: ERIS route"
      : "Merged RDEC scheme route",
    positive: true,
  };

  return {
    verdict,
    headline: {
      label: "Estimated net R&D benefit",
      value: gbp(res.netBenefit),
      tone: "good",
    },
    rows: [
      { label: "Qualifying R&D spend", value: gbp(res.qualifying), strong: true },
      { label: "R&D intensity ratio", value: pct(res.intensityRatio * 100) },
      { label: "Credit rate", value: pct(res.creditRate * 100) },
      { label: "Gross credit", value: gbp(res.grossCredit) },
      { label: "Net benefit", value: gbp(res.netBenefit), strong: true },
    ],
    note:
      "The intensity threshold is 30% of total operating expenditure (for accounting periods from " +
      "1 April 2024). ERIS (R&D-intensive SMEs): 86% enhanced deduction surrendered for a 14.5% " +
      "payable credit, approximately 26.97p per £1 of qualifying spend. This is payable cash, not " +
      "a tax deduction. Merged RDEC: 20% above-the-line taxable credit, net benefit approximately " +
      "15p per £1 after 25% CT. Only 65% of subcontractor costs qualify. This is a directional " +
      "estimate only: the PAYE cap, loss position, grant treatment, and connected-party rules all " +
      "affect a real claim.",
  };
};

export const rdEstimatorPremium: PremiumToolConfig = {
  id: "rd-estimator-premium",
  name: "R&D tax relief estimator",
  topic: "rnd",
  description:
    "Enter your R&D spend and see whether you clear the 30% intensity test for the more " +
    "generous ERIS route, and roughly what the claim is worth.",
  fields: [
    {
      id: "totalExpenditure",
      label: "Total operating expenditure for the year",
      type: "currency",
      default: 500000,
      min: 0,
      max: 5000000,
      step: 10000,
      help: "Your total operating expenditure for the year (used to test R&D intensity).",
    },
    {
      id: "staffCost",
      label: "R&D staff costs",
      type: "currency",
      default: 120000,
      min: 0,
      max: 5000000,
      step: 10000,
    },
    {
      id: "subcontractorCost",
      label: "R&D subcontractor costs",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000000,
      step: 10000,
      help: "Only 65% of subcontractor cost qualifies.",
    },
    {
      id: "consumablesCost",
      label: "R&D consumables",
      type: "currency",
      default: 10000,
      min: 0,
      max: 5000000,
      step: 1000,
    },
    {
      id: "softwareCost",
      label: "R&D software costs",
      type: "currency",
      default: 5000,
      min: 0,
      max: 5000000,
      step: 1000,
    },
  ],
  compute,
  ctaLabel: "Get specialist advice on your R&D claim",
};
