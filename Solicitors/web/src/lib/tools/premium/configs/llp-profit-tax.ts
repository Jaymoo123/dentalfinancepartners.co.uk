/**
 * Tool 1: LLP profit share and partner tax planner.
 *
 * toolId: llp-profit-tax-premium
 * topic: partnership-llp
 *
 * Composes calcLLPProfitShare + calcSolicitorTakeHome to show per-partner
 * take-home after income tax and Class 4 NIC on each partner's allocated share.
 * The key message: "you are taxed on your profit share, not your drawings" (HP §2).
 *
 * FIGURES TRACED:
 * - Profit allocation: calcLLPProfitShare (existing golden-tested lib).
 * - Per-partner tax: calcSolicitorTakeHome 2026/27 rates (updated R2 2026-07-05;
 *   partnership result used, which is income tax + Class 4 NIC, no dividends).
 * - Class 4 upper limit: £50,270 (HP §3, 2026/27 unchanged).
 * - All HP §2 compliance notes included in explainer and note.
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcLLPProfitShare, type AllocationMethod } from "@/lib/tools/compute/llp-profit-share";
import { calcSolicitorTakeHome } from "@/lib/tools/compute/solicitor-take-home";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return n.toFixed(1) + "%";
}

export const llpProfitTaxConfig: PremiumToolConfig = {
  id: "llp-profit-tax-premium",
  topic: "partnership-llp",
  title: "LLP profit share and partner tax planner",
  intro: "Split your firm's distributable profit across the partners, then see what each partner keeps after income tax and Class 4 National Insurance. Compare an equal split against a two-tier or points allocation.",
  fields: [
    {
      id: "totalProfit",
      label: "Distributable profit for the year",
      type: "currency",
      default: 800000,
      min: 0,
      max: 5000000,
      step: 25000,
    },
    {
      id: "method",
      label: "Allocation method",
      type: "select",
      default: "two-tier",
      options: [
        { value: "equal", label: "Equal" },
        { value: "two-tier", label: "Two-tier (senior 1.5x)" },
        { value: "points", label: "Points" },
        { value: "fixed-share-plus-equity", label: "Fixed-share plus equity" },
      ],
    },
    {
      id: "seniorPartners",
      label: "Senior (equity) partners",
      type: "number",
      default: 3,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      id: "juniorPartners",
      label: "Junior (equity) partners",
      type: "number",
      default: 2,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      id: "seniorMultiplier",
      label: "Senior points multiplier",
      type: "number",
      default: 1.5,
      min: 1,
      max: 3,
      step: 0.1,
      advanced: true,
      help: "Only used by the Points method",
    },
    {
      id: "fixedSharePartners",
      label: "Fixed-share partners",
      type: "number",
      default: 0,
      min: 0,
      max: 40,
      step: 1,
      advanced: true,
    },
    {
      id: "fixedShareEach",
      label: "Fixed share each",
      type: "currency",
      default: 90000,
      min: 0,
      max: 2000000,
      step: 5000,
      advanced: true,
      help: "Only used by the Fixed-share plus equity method",
    },
  ],
  compute({ values }): PremiumResult {
    const totalProfit = Number(values.totalProfit) || 0;
    const method = String(values.method) as AllocationMethod;
    const seniorPartners = Math.max(0, Math.round(Number(values.seniorPartners) || 0));
    const juniorPartners = Math.max(0, Math.round(Number(values.juniorPartners) || 0));
    const fixedSharePartners = Math.max(0, Math.round(Number(values.fixedSharePartners) || 0));
    const fixedShareEach = Number(values.fixedShareEach) || 0;
    const seniorMultiplier = Number(values.seniorMultiplier) || 1.5;

    const allocation = calcLLPProfitShare({
      totalProfit,
      method,
      seniorPartners,
      juniorPartners,
      fixedSharePartners,
      fixedShareEach,
      seniorMultiplier,
    });

    const partners = allocation.partners;

    if (partners.length === 0) {
      return {
        headline: {
          label: "Top partner keeps",
          value: gbp(0),
          sub: "No partners entered",
          tone: "good",
        },
        breakdown: [
          { label: "Total distributable profit", value: gbp(totalProfit) },
          { label: "Partners", value: "0" },
        ],
        rows: [],
        note: "Enter at least one partner to see the allocation.",
      };
    }

    // Compute take-home for each partner using the 2026/27 partnership result.
    const results = partners.map((p) => {
      const th = calcSolicitorTakeHome({ profit: p.share, pensionContrib: 0 });
      return {
        label: p.label,
        share: p.share,
        net: th.partnership.net,
        tax: th.partnership.tax,
      };
    });

    const topPartner = results.reduce((a, b) => (b.net > a.net ? b : a));
    const firmTotalTax = results.reduce((sum, r) => sum + r.tax, 0);
    const firmTotalKept = results.reduce((sum, r) => sum + r.net, 0);
    const effectiveTaxRate = totalProfit > 0 ? (firmTotalTax / totalProfit) * 100 : 0;

    // Per-partner rows (for the workings panel).
    const rows = results.map((r) => ({
      label: `${r.label}: share ${gbp(r.share)}`,
      value: `keeps ${gbp(r.net)}`,
    }));

    // Chart: first 8 partners, share vs net.
    const chartPartners = results.slice(0, 8);
    const chartData = chartPartners.map((r) => ({
      name: r.label.replace("Senior partner ", "Sr ").replace("Junior partner ", "Jr ").replace("Fixed-share ", "FS ").replace("Senior equity ", "Sr eq ").replace("Junior equity ", "Jr eq "),
      share: Math.round(r.share),
      net: Math.round(r.net),
    }));
    const chartTruncated = results.length > 8;

    return {
      headline: {
        label: "Top partner keeps",
        value: gbp(topPartner.net),
        sub: `after income tax and Class 4 NIC on a ${gbp(topPartner.share)} share`,
        tone: "good",
      },
      rows,
      breakdown: [
        { label: "Total distributable profit", value: gbp(totalProfit) },
        { label: "Number of partners", value: String(partners.length) },
        { label: "Total tax across all partners", value: gbp(firmTotalTax) },
        { label: "Total kept across all partners", value: gbp(firmTotalKept) },
        { label: "Effective tax rate (firm)", value: pct(effectiveTaxRate) },
      ],
      chart: {
        data: [
          ...chartData,
          ...(chartTruncated ? [{ name: "(showing first 8)", share: 0, net: 0 }] : []),
        ],
      },
      note: "2026/27 basis (FA 2026 dividend rates apply to Ltd structures, not shown here). The LLP pays no corporation tax on trading profit. Partner drawings are advances against the profit share: tax is due on the full allocated share regardless of drawings. This model excludes capital interest, pension relief, and the salaried-member re-classification (ITTOIA 2005 ss.863A to 863G). Qualifying-loan interest on a capital buy-in (ITA 2007 ss.398 to 412) is a real deduction not modelled here. These are estimates, not advice for your firm.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "share", label: "Profit share", color: "var(--accent)" },
      { dataKey: "net", label: "Kept after tax", color: "var(--primary)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "An LLP is tax-transparent under ITTOIA 2005 s.863: each member is taxed as a self-employed partner on their allocated profit share, not on their drawings. Drawings are cash advances against the share, so a partner who draws less than their allocation still pays tax on the full amount. This is the single most common partner cash-flow planning point (HP §2).",
      "The planner first allocates the distributable profit using your chosen method (equal, two-tier senior 1.5x, points, or fixed-share plus equity), then runs each allocation through the 2026/27 income tax and Class 4 NIC calculation. The result shows what each partner keeps after the personal tax charge on their share.",
      "The salaried-member rules (ITTOIA 2005 ss.863A to 863G, inserted by Finance Act 2014) can re-classify a member as an employee if all three conditions are met: Condition A (at least 80% of reward is disguised salary), Condition B (no significant influence) and Condition C (capital contribution less than 25% of disguised salary). A caught member pays PAYE and employer NIC instead of self-employment tax. This planner assumes full equity partners who are not caught by the rules.",
    ],
  },
};
