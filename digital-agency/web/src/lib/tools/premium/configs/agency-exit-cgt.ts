/**
 * Tool 2: Agency exit CGT and Business Asset Disposal Relief calculator (premium).
 *
 * toolId: agency-exit-cgt-premium
 * topic: exit
 *
 * Composes calcBadrCgt from compute/badr-cgt.ts (called twice: eligible + not
 * eligible) so the reader sees the BADR saving at a glance. NO maths forked.
 *
 * RATES (HP §5):
 *   BADR 2025/26: 14% (disposals to 5 April 2026)
 *   BADR 2026/27: 18% (from 6 April 2026)
 *   Standard CGT higher rate: 24%
 *   Lifetime BADR limit: £1,000,000
 *
 * GOLDEN (executed 2026-07-06, defaults saleProceeds=750000, cost=50000, 2026/27):
 *   eligible:   gain=700000, badrTax=126000, netProceeds=624000, effectiveRate=0.18
 *   not eligible: totalTax=168000, netProceeds=582000
 *   2025/26 eligible: badrTax=98000, netProceeds=652000, effectiveRate=0.14
 *   over-limit (1500000/0/2026/27): badrTax=180000, stdTax=120000, totalTax=300000
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcBadrCgt } from "@/lib/tools/compute/badr-cgt";
import type { BadrYear } from "@/lib/tools/compute/badr-cgt";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export const agencyExitCgtConfig: PremiumToolConfig = {
  id: "agency-exit-cgt-premium",
  topic: "exit",
  title: "Agency exit CGT and BADR calculator (2026/27)",
  intro: "Estimate the CGT bill when you sell your agency, compare the position with and without Business Asset Disposal Relief, and see how much the BADR saving is worth on your numbers.",
  fields: [
    {
      id: "saleProceeds",
      label: "Sale proceeds",
      type: "currency",
      default: 750000,
      min: 0,
      max: 10000000,
      step: 10000,
    },
    {
      id: "originalCost",
      label: "Original cost (base cost of shares)",
      type: "currency",
      default: 50000,
      min: 0,
      max: 10000000,
      step: 1000,
    },
    {
      id: "year",
      label: "Tax year of disposal",
      type: "select",
      default: "2026/27",
      options: [
        { value: "2026/27", label: "2026/27 (from 6 April 2026)" },
        { value: "2025/26", label: "2025/26 (to 5 April 2026)" },
      ],
      help: "BADR is 14% for disposals to 5 April 2026 and 18% from 6 April 2026 (HP §5).",
    },
    {
      id: "previousBadrUsed",
      label: "BADR lifetime allowance already used",
      type: "currency",
      default: 0,
      min: 0,
      max: 1000000,
      step: 1000,
      advanced: true,
      help: "BADR has a £1,000,000 lifetime limit per person (HP §5). Enter the amount used on previous disposals.",
    },
  ],
  compute({ values }): PremiumResult {
    const saleProceeds = Number(values.saleProceeds) || 0;
    const originalCost = Number(values.originalCost) || 0;
    const year = (String(values.year) || "2026/27") as BadrYear;
    const previousBadrUsed = Number(values.previousBadrUsed) || 0;

    const eligible = calcBadrCgt({ saleProceeds, originalCost, previousBadrUsed, year, meetsEligibility: true });
    const notEligible = calcBadrCgt({ saleProceeds, originalCost, previousBadrUsed, year, meetsEligibility: false });

    const badrRateLabel = year === "2025/26" ? "14% (to 5 Apr 2026)" : "18% (from 6 Apr 2026)";
    const withBadrBest = eligible.netProceeds > notEligible.netProceeds;

    return {
      headline: {
        label: "Estimated CGT with BADR",
        value: gbp(eligible.totalTax),
        sub: `Net proceeds ${gbp(eligible.netProceeds)} after CGT`,
        tone: "default",
      },
      breakdown: [
        { label: "Sale proceeds", value: gbp(saleProceeds) },
        { label: "Original cost", value: gbp(originalCost) },
        { label: "Gain", value: gbp(eligible.gain) },
        { label: "BADR-eligible slice", value: gbp(eligible.eligibleForBadr) },
        { label: `BADR at ${badrRateLabel}`, value: gbp(eligible.badrTax) },
        { label: "Slice above lifetime limit at 24%", value: gbp(eligible.standardTax) },
        { label: "Effective rate on gain", value: pct(eligible.effectiveRate) },
        { label: "Net proceeds", value: gbp(eligible.netProceeds), strong: true },
      ],
      scenarioResults: [
        {
          id: "with-badr",
          label: "With BADR",
          headline: {
            label: "Net proceeds",
            value: gbp(eligible.netProceeds),
            tone: withBadrBest ? "good" : "default",
          },
          rows: [
            { label: "CGT", value: gbp(eligible.totalTax) },
            { label: "Net proceeds", value: gbp(eligible.netProceeds), strong: true },
          ],
          best: withBadrBest,
        },
        {
          id: "standard-cgt",
          label: "Standard CGT (if you do not qualify)",
          headline: {
            label: "Net proceeds",
            value: gbp(notEligible.netProceeds),
            tone: "default",
          },
          rows: [
            { label: "CGT at 24%", value: gbp(notEligible.totalTax) },
            { label: "Net proceeds", value: gbp(notEligible.netProceeds), strong: true },
          ],
          best: !withBadrBest,
        },
      ],
      chart: {
        data: [
          { name: "With BADR", netProceeds: Math.round(eligible.netProceeds), cgt: Math.round(eligible.totalTax) },
          { name: "Standard CGT", netProceeds: Math.round(notEligible.netProceeds), cgt: Math.round(notEligible.totalTax) },
        ],
      },
      note: "BADR rate schedule: 14% for disposals to 5 April 2026, 18% from 6 April 2026 (HP §5). Lifetime BADR limit £1,000,000 per person. For a share sale, qualifying conditions include holding at least 5% of ordinary share capital and voting rights, and being an officer or employee throughout the last 2 years (HP §5). An earn-out is usually taxed at the standard CGT rate, not the BADR rate (the Marren v Ingles right-to-future-payment principle, HP §5). If you plan to sell after leaving the UK: BADR is not available while you are non-resident and the temporary non-residence rule can pull a non-resident disposal back into UK CGT on your return; take specialist advice before relocating (HP §8.A). These are estimates only.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "netProceeds", label: "Net proceeds", color: "var(--accent)" },
      { dataKey: "cgt", label: "CGT", color: "var(--ink)" },
    ],
  },
  explainer: {
    heading: "How the agency exit CGT and BADR calculator works",
    paragraphs: [
      "On an agency share sale, Business Asset Disposal Relief can cut the CGT on the first £1,000,000 of qualifying gain, but the rate stepped up to 18% from 6 April 2026 and the conditions are strict. Here is your bill with and without it, and what you keep. Never imply BADR is automatic.",
      "The calculator computes the CGT twice: once assuming you qualify for BADR (at 14% to 5 April 2026 or 18% from 6 April 2026 on the eligible slice, 24% on any gain above the £1,000,000 lifetime limit), and once assuming the standard rate of 24% on the full gain. The side-by-side comparison shows you the value of qualifying.",
      "The qualifying conditions for BADR on a share sale are strict: you need at least 5% of ordinary share capital and voting rights, and you must be an officer or employee of the company for at least 2 years before the disposal (HP §5). An earn-out where part of the consideration is tied to future performance is typically taxed as a right to future income under Marren v Ingles, not as part of the capital gain, and does not attract BADR on the deferred element.",
    ],
  },
};
