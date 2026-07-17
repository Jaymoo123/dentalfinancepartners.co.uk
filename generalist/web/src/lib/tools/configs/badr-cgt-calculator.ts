import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcBADR, type BADRYear } from "@/lib/tools/compute/badr-cgt";

export const badrTool: GenericTool = {
  kind: "generic",
  slug: "badr-cgt-calculator",
  name: "BADR CGT Calculator",
  category: "Capital Gains",
  oneLiner: "See your post-relief CGT on a business sale, your remaining lifetime allowance, and how the 2026/27 BADR rate of 18% (up from 14% in 2025/26) affects your CGT bill.",
  embedHeight: 520,
  metaTitle: "BADR CGT Calculator 2026/27 | Business Asset Disposal Relief",
  metaDescription:
    "Free BADR capital gains tax calculator for UK business owners. See CGT on sale proceeds with and without Business Asset Disposal Relief. 2025/26 and 2026/27 rates.",
  intro:
    "Business Asset Disposal Relief (BADR) reduces your CGT rate to 18% on qualifying gains up to the £1 million lifetime limit for disposals from 6 April 2026 (2026/27). The rate was 14% in 2025/26. Enter your sale proceeds, cost, and any prior BADR usage to see your CGT bill for 2025/26 or 2026/27.",
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
      default: "2026/27",
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
      "Business Asset Disposal Relief reduces CGT to 18% (2026/27, from 6 April 2026) on qualifying gains up to £1 million over your lifetime. The rate was 14% in 2025/26. Any gain above the lifetime limit is taxed at the standard higher rate of 24%.",
      "The BADR rate increased to 18% from 6 April 2026 (up from 14% in 2025/26). On a £1 million eligible gain, this rate change increases CGT by £40,000 compared with a 2025/26 disposal.",
      "Worked example: a founder sells their company in 2026/27 for £500,000, having incorporated it for £100 in nominal share capital. The capital gain is £499,900. The founder holds more than 5% of the shares, has been a director for over two years, and has not used any prior BADR lifetime allowance. The entire £499,900 gain qualifies for BADR at the 2026/27 rate of 18%, giving a CGT bill of £89,982. Net proceeds after tax are £410,018. Had the disposal taken place in 2025/26 at the then-rate of 14%, the CGT bill would have been £69,986, so the rate increase from 14% to 18% costs this founder an additional £19,996 on the same sale.",
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
