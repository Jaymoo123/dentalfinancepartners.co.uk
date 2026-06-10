import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcBADR, type BADRYear } from "@/lib/tools/compute/badr-cgt";

export const badrTool: GenericTool = {
  kind: "generic",
  slug: "badr-cgt-calculator",
  name: "BADR CGT Calculator",
  category: "Capital Gains",
  oneLiner: "See your post-relief CGT on a business sale, your remaining lifetime allowance, and what the 6 April 2026 rate jump from 14% to 18% costs if you delay.",
  embedHeight: 520,
  metaTitle: "BADR CGT Calculator 2025/26 | Business Asset Disposal Relief",
  metaDescription:
    "Free BADR capital gains tax calculator for UK business owners. See CGT on sale proceeds with and without Business Asset Disposal Relief. 2025/26 and 2026/27 rates.",
  intro:
    "Business Asset Disposal Relief (BADR) cuts your CGT rate to 14% on qualifying gains up to the £1 million lifetime limit — but only until 5 April 2026. From 6 April 2026 the rate rises to 18%. Enter your sale proceeds, cost, and any prior BADR usage to see your CGT bill under both years.",
  fields: [
    {
      id: "saleProceeds",
      label: "Sale proceeds (your share)",
      type: "currency",
      default: 2500000,
      min: 0,
      max: 20000000,
      step: 10000,
    },
    {
      id: "originalCost",
      label: "Original cost of shares",
      type: "currency",
      default: 100,
      min: 0,
      max: 5000000,
      step: 100,
      help: "What you paid for the shares originally. Often nominal (£1 or £100) for founders who incorporated their own business.",
    },
    {
      id: "previousBADRUsed",
      label: "BADR previously used (lifetime)",
      type: "currency",
      default: 0,
      min: 0,
      max: 1000000,
      step: 10000,
      help: "The £1M lifetime limit applies across all qualifying disposals ever. If this is your first disposal, enter 0.",
    },
    {
      id: "year",
      label: "Tax year of disposal",
      type: "select",
      default: "2025/26",
      options: [
        { value: "2025/26", label: "2025/26 (14% BADR rate)" },
        { value: "2026/27", label: "2026/27 (18% BADR rate)" },
      ],
    },
    {
      id: "meetsEligibility",
      label: "Meets BADR eligibility: 5%+ shares, officer or employee, held 2+ years",
      type: "toggle",
      default: true,
    },
  ],
  compute(values) {
    const r = calcBADR(
      Number(values.saleProceeds),
      Number(values.originalCost),
      Number(values.previousBADRUsed),
      String(values.year) as BADRYear,
      Boolean(values.meetsEligibility),
    );
    const rows = [
      { label: "Capital gain", value: gbp(r.gain) },
      ...(r.eligibleForBADR > 0
        ? [{ label: "Qualifies for BADR (capped at £1M lifetime)", value: gbp(r.eligibleForBADR) }]
        : []),
      ...(r.badrTax > 0 ? [{ label: "BADR tax", value: gbp(r.badrTax) }] : []),
      ...(r.notEligible > 0
        ? [{ label: "Gain above BADR limit (standard CGT)", value: gbp(r.notEligible) }]
        : []),
      ...(r.standardTax > 0 ? [{ label: "Standard CGT (24%)", value: gbp(r.standardTax) }] : []),
      { label: "Total CGT", value: gbp(r.totalTax), strong: true as const },
      { label: "Net proceeds after CGT", value: gbp(r.netProceeds) },
    ];
    return {
      headline: {
        label: "Total CGT bill",
        value: gbp(r.totalTax),
        sub: `${pct(r.effectiveRate * 100)} effective rate · net proceeds ${gbp(r.netProceeds)}`,
        tone: r.totalTax === 0 ? "good" : "default",
      },
      rows,
      note: "This model assumes higher-rate CGT of 24% on any overflow above the BADR lifetime limit. Actual liability depends on your full income picture and other gains in the year.",
    };
  },
  explainer: {
    heading: "How BADR works",
    paragraphs: [
      "Business Asset Disposal Relief reduces CGT to 14% (2025/26) on qualifying gains up to £1 million over your lifetime. Any gain above the lifetime limit is taxed at the standard higher rate of 24%.",
      "The rate rises to 18% from 6 April 2026. If you are planning a sale, the difference on a £1 million eligible gain is £40,000 in CGT. Timing the disposal before the end of the 2025/26 tax year can save a significant amount.",
    ],
  },
  faqs: [
    {
      question: "What are the BADR eligibility conditions?",
      answer:
        "You must hold at least 5% of the company's ordinary share capital, be an officer or employee of the company, and have held the shares for at least two years before the disposal. All three conditions must be met for the disposal to qualify.",
    },
    {
      question: "What is the BADR lifetime limit?",
      answer:
        "£1,000,000 across all qualifying disposals in your lifetime. Once you have used the full £1M, any further qualifying gains are taxed at the standard CGT rate. The calculator lets you enter any prior usage so it can calculate your remaining allowance correctly.",
    },
    {
      question: "What CGT rate applies above the BADR limit?",
      answer:
        "For 2025/26 and 2026/27, the higher rate of CGT on business assets is 24%. The calculator uses this rate for any gain that exceeds your remaining BADR lifetime allowance.",
    },
  ],
};
