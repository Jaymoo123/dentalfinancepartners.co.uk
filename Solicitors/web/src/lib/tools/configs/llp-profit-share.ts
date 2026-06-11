import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcLLPProfitShare, type AllocationMethod } from "@/lib/tools/compute/llp-profit-share";

export const llpProfitShareTool: GenericTool = {
  kind: "generic",
  slug: "llp-profit-share-allocation",
  name: "LLP Profit Share Allocation",
  category: "LLP / Partnership",
  oneLiner:
    "Allocate annual profit across senior, junior and fixed-share partners under four allocation methodologies.",
  embedHeight: 520,
  metaTitle: "LLP Profit Share Allocation Calculator | UK Law Firm Profit Splits",
  metaDescription:
    "Free LLP profit allocation calculator. Model equal split, two-tier, points-based and fixed-share-plus-equity methodologies. Instant per-partner figures.",
  intro:
    "LLP profit allocation drives partner motivation, retention and succession. This tool models the four most common UK law firm methodologies and shows the per-partner figures immediately.",
  fields: [
    {
      id: "totalProfit",
      label: "Total profit available for partner allocation",
      type: "currency",
      default: 800000,
      min: 0,
      max: 20000000,
      step: 10000,
    },
    {
      id: "method",
      label: "Allocation method",
      type: "select",
      default: "two-tier",
      options: [
        { value: "equal", label: "Equal split (all partners)" },
        { value: "two-tier", label: "Two-tier (senior 1.5x, junior 1x)" },
        { value: "points", label: "Points-based (custom senior multiplier)" },
        { value: "fixed-share-plus-equity", label: "Fixed-share + equity (mixed)" },
      ],
    },
    {
      id: "seniorPartners",
      label: "Number of senior equity partners",
      type: "number",
      default: 3,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      id: "juniorPartners",
      label: "Number of junior equity partners",
      type: "number",
      default: 2,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      id: "fixedSharePartners",
      label: "Number of fixed-share partners",
      type: "number",
      default: 2,
      min: 0,
      max: 20,
      step: 1,
      help: "Applies to fixed-share + equity method only",
    },
    {
      id: "fixedShareEach",
      label: "Fixed-share amount each (£/yr)",
      type: "currency",
      default: 85000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Applies to fixed-share + equity method only",
    },
    {
      id: "seniorMultiplier",
      label: "Senior partner point multiplier",
      type: "number",
      default: 1.6,
      min: 1,
      max: 10,
      step: 0.1,
      help: "Applies to points-based method only",
    },
  ],
  compute(values) {
    const totalProfit = Number(values.totalProfit);
    const method = String(values.method) as AllocationMethod;
    const seniorPartners = Number(values.seniorPartners);
    const juniorPartners = Number(values.juniorPartners);
    const fixedSharePartners = Number(values.fixedSharePartners);
    const fixedShareEach = Number(values.fixedShareEach);
    const seniorMultiplier = Number(values.seniorMultiplier);

    const r = calcLLPProfitShare({
      totalProfit,
      method,
      seniorPartners,
      juniorPartners,
      fixedSharePartners,
      fixedShareEach,
      seniorMultiplier,
    });

    const rows = r.partners.map((p) => ({
      label: p.label,
      value: `${gbp(Math.round(p.share))} (${p.percentage.toFixed(1)}%)`,
    }));

    const topPartner = r.partners.reduce((a, b) => (b.share > a.share ? b : a), r.partners[0] ?? { label: "n/a", share: 0, percentage: 0 });

    return {
      headline: {
        label: r.partners.length > 0 ? `${r.partners.length} allocations` : "No partners",
        value: r.partners.length > 0 ? gbp(Math.round(topPartner.share)) : "—",
        sub: r.partners.length > 0 ? `Highest: ${topPartner.label}` : "Add partners to see allocations",
        tone: "default" as const,
      },
      rows,
      note: "Indicative allocation only. Real LLP agreements often include capital interest, lock-in schedules, and partner-specific adjustments. Fixed-share members should be audited against the FA 2014 Salaried Member Rules.",
    };
  },
  explainer: {
    heading: "About the allocation methods",
    paragraphs: [
      "Equal split divides profit equally across all partners regardless of seniority. Simple to operate but offers no incentive gradient.",
      "Two-tier gives senior partners 1.5x the points of junior partners, creating a predictable seniority premium without full lock-step complexity.",
      "Points-based allows you to set a custom senior multiplier (e.g. 2x), reflecting steeper differentials common in specialist or high-revenue firms.",
      "Fixed-share plus equity pays fixed-share partners a defined annual amount first, then distributes the remainder to equity partners on a points basis. This method is used where a firm wants to acknowledge contributions below full equity without granting profit-sharing rights.",
    ],
  },
  faqs: [
    {
      question: "Do fixed-share partners need to check the FA 2014 rules?",
      answer:
        "Yes. Fixed-share LLP members whose pay is mostly fixed may trigger the Salaried Member Rules (Finance Act 2014). If all three conditions (A: >80% fixed reward, B: limited influence, C: capital < 25% of fixed reward) are met, the LLP must operate PAYE. Use the FA 2014 Salaried Member Test calculator to check each member's position.",
    },
    {
      question: "Can I include capital interest in this calculator?",
      answer:
        "Not currently. Capital interest (typically 2-5% of capital account balance per year) is a prior deduction before profit allocation in most LLP agreements and should be added to each partner's allocation separately. The calculator shows the profit-sharing step only.",
    },
  ],
};
