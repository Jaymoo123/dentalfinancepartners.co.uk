/**
 * Premium Tool 6 — Exit and BADR timing planner (badr-exit-premium)
 *
 * Topic: exit-cgt.
 * Reuses: calcBADR from compute/badr-cgt.ts.
 * Premium value: 2025/26 vs 2026/27 BADR-rate comparison (the live 6 April 2026
 *   14% to 18% timing lever) and net-proceeds breakdown.
 */

import type { PremiumToolConfig, PremiumComputeFn } from "../types";
import { calcBADR } from "@/lib/tools/compute/badr-cgt";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";

const compute: PremiumComputeFn = ({ values }) => {
  const saleProceeds = Number(values.saleProceeds) || 0;
  const originalCost = Number(values.originalCost) || 0;
  const previousBADRUsed = Number(values.previousBADRUsed) || 0;
  const meetsEligibility = Boolean(values.meetsEligibility);

  // Compute for both years
  const res2025 = calcBADR(saleProceeds, originalCost, previousBADRUsed, "2025/26", meetsEligibility);
  const res2026 = calcBADR(saleProceeds, originalCost, previousBADRUsed, "2026/27", meetsEligibility);

  // The timing difference (always 2026/27 has higher or equal tax when eligible)
  const extraTax = res2026.totalTax - res2025.totalTax;

  return {
    headline: {
      label: "CGT if you sell in 2026/27",
      value: gbp(res2026.totalTax),
      sub: extraTax > 0
        ? `${gbp(extraTax)} more than completing before 6 April 2026`
        : "No difference between years (BADR not applicable or gain is zero)",
      tone: extraTax > 0 ? "warn" : "default",
    },
    scenarioResults: [
      {
        label: "Sale before 6 April 2026 (14% BADR)",
        value: gbp(res2025.totalTax),
        best: meetsEligibility && res2025.totalTax <= res2026.totalTax,
        rows: [
          { label: "Total gain", value: gbp(res2025.gain) },
          { label: "Eligible for BADR (×14%)", value: gbp(res2025.eligibleForBADR) },
          ...(res2025.notEligible > 0
            ? [{ label: "Above £1m limit (×24%)", value: gbp(res2025.notEligible) }]
            : []),
          { label: "Total CGT", value: gbp(res2025.totalTax), strong: true },
          { label: "Net proceeds", value: gbp(res2025.netProceeds), strong: true },
          { label: "Effective CGT rate", value: pct(res2025.effectiveRate * 100) },
        ],
      },
      {
        label: "Sale on or after 6 April 2026 (18% BADR)",
        value: gbp(res2026.totalTax),
        best: !meetsEligibility || res2026.totalTax < res2025.totalTax,
        rows: [
          { label: "Total gain", value: gbp(res2026.gain) },
          { label: "Eligible for BADR (×18%)", value: gbp(res2026.eligibleForBADR) },
          ...(res2026.notEligible > 0
            ? [{ label: "Above £1m limit (×24%)", value: gbp(res2026.notEligible) }]
            : []),
          { label: "Total CGT", value: gbp(res2026.totalTax), strong: true },
          { label: "Net proceeds", value: gbp(res2026.netProceeds), strong: true },
          { label: "Effective CGT rate", value: pct(res2026.effectiveRate * 100) },
        ],
      },
    ],
    note:
      "The BADR rate stepped from 14% to 18% for disposals on or after 6 April 2026. " +
      "For late 2025/26 completions this is a live planning lever. " +
      "The lifetime limit is £1,000,000; gains above the limit are taxed at the standard " +
      "higher rate of 24%. Whether to use an asset sale or a share sale changes both the CGT " +
      "and the BADR eligibility conditions substantially. Get a specialist to model your exit " +
      "before exchanging contracts.",
  };
};

export const badrExitPremium: PremiumToolConfig = {
  id: "badr-exit-premium",
  name: "Exit and BADR timing planner",
  topic: "exit-cgt",
  description:
    "See how much more CGT you pay by completing a business sale after 6 April 2026, " +
    "when the BADR rate steps from 14% to 18%.",
  fields: [
    {
      id: "saleProceeds",
      label: "Sale proceeds",
      type: "currency",
      default: 600000,
      min: 0,
      max: 5000000,
      step: 10000,
    },
    {
      id: "originalCost",
      label: "Original cost",
      type: "currency",
      default: 100000,
      min: 0,
      max: 5000000,
      step: 10000,
      help: "What you originally paid for the business or shares.",
    },
    {
      id: "previousBADRUsed",
      label: "BADR already claimed (lifetime)",
      type: "currency",
      default: 0,
      min: 0,
      max: 1000000,
      step: 10000,
      help: "BADR you have already claimed against your £1m lifetime limit.",
      advanced: true,
    },
    {
      id: "meetsEligibility",
      label: "Do you meet the BADR conditions throughout the 2 years to sale?",
      type: "toggle",
      default: true,
      help:
        "5% shares plus voting rights plus officer/employee for a share sale; " +
        "a trading business for an asset sale.",
    },
  ],
  compute,
  ctaLabel: "Get specialist advice on your exit and CGT planning",
};
