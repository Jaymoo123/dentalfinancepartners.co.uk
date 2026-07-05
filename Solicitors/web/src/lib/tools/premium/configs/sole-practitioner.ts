/**
 * Tool 2: Sole-practitioner take-home and structure planner.
 *
 * toolId: sole-practitioner-premium
 * topic: sole-practitioner
 *
 * Direct reuse of calcSolicitorTakeHome. Returns partnership/sole-trader vs
 * limited company scenario comparison. The honest framing (HP §3): do NOT
 * present incorporation as a flat tax win at typical partner profits; the
 * 2026/27 dividend rise narrows it.
 *
 * FIGURES TRACED:
 * - calcSolicitorTakeHome 2026/27 rates (updated R2 2026-07-05; FA 2026 s.4
 *   dividend rates 10.75%/35.75%/39.35%, HP §3).
 * - SRA incorporation: recognised body / ABS licensing (HP §1).
 * - All HP §1/§3 compliance notes in the tool note and explainer.
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calcSolicitorTakeHome } from "@/lib/tools/compute/solicitor-take-home";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (n >= 0 ? "" : "-") + Math.abs(n).toFixed(1) + "%";
}

function effectiveRate(tax: number, gross: number): string {
  if (gross <= 0) return "0.0%";
  return pct((tax / gross) * 100);
}

export const solePractitionerConfig: PremiumToolConfig = {
  id: "sole-practitioner-premium",
  topic: "sole-practitioner",
  title: "Solicitor take-home and structure calculator",
  intro: "See what you keep from your practice profit as a sole practitioner or partner versus through a limited company, after income tax, National Insurance, corporation tax and dividend tax.",
  fields: [
    {
      id: "profit",
      label: "Annual practice profit (before tax)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 1000000,
      step: 5000,
    },
    {
      id: "pensionContrib",
      label: "Pension contribution",
      type: "currency",
      default: 0,
      min: 0,
      max: 60000,
      step: 1000,
      advanced: true,
      help: "Annual pension contribution (deducted from taxable profit for all structures)",
    },
  ],
  compute({ values }): PremiumResult {
    const profit = Number(values.profit) || 0;
    const pensionContrib = Number(values.pensionContrib) || 0;

    const r = calcSolicitorTakeHome({ profit, pensionContrib });

    const soleNet = r.soleTrader.net;
    const soleTax = r.soleTrader.tax;
    const ltdNet = r.ltd.net;
    const ltdTax = r.ltd.tax;

    const bestIsSole = soleNet >= ltdNet;
    const bestLabel = bestIsSole ? "Sole trader / partner" : "Limited company";
    const bestNet = bestIsSole ? soleNet : ltdNet;

    const diff = Math.abs(soleNet - ltdNet);

    const scenarios: ScenarioResult[] = [
      {
        id: "sole",
        label: "Sole trader / partner",
        headline: {
          label: "Keeps",
          value: gbp(soleNet),
          sub: `Effective rate: ${effectiveRate(soleTax, profit)}`,
          tone: "good",
        },
        rows: [
          { label: "Net take-home", value: gbp(soleNet), strong: true },
          { label: "Income tax + Class 4 NIC", value: gbp(soleTax) },
          { label: "Effective rate", value: effectiveRate(soleTax, profit) },
        ],
        best: bestIsSole,
      },
      {
        id: "ltd",
        label: "Limited company",
        headline: {
          label: "Keeps",
          value: gbp(ltdNet),
          sub: `Effective rate: ${effectiveRate(ltdTax, profit)}`,
          tone: "good",
        },
        rows: [
          { label: "Net take-home", value: gbp(ltdNet), strong: true },
          { label: "Corp tax + dividend tax + admin", value: gbp(ltdTax) },
          { label: "Effective rate", value: effectiveRate(ltdTax, profit) },
          { label: "(Min salary £12,570 + dividends, £2,500 admin)", value: "" },
        ],
        best: !bestIsSole,
      },
    ];

    // Chart data: two groups (Kept after tax, Total tax), two series.
    const chartData = [
      {
        name: "Kept after tax",
        soleTrader: Math.round(soleNet),
        ltd: Math.round(ltdNet),
      },
      {
        name: "Total tax",
        soleTrader: Math.round(soleTax),
        ltd: Math.round(ltdTax),
      },
    ];

    return {
      headline: {
        label: "Best structure keeps",
        value: gbp(bestNet),
        sub: `as ${bestLabel.toLowerCase()}`,
        tone: "good",
      },
      scenarioResults: scenarios,
      breakdown: [
        { label: "Difference in take-home", value: gbp(diff), strong: true },
        { label: "Sole trader / partner effective rate", value: effectiveRate(soleTax, profit) },
        { label: "Limited company effective rate", value: effectiveRate(ltdTax, profit) },
      ],
      chart: { data: chartData },
      note: "2026/27 basis (FA 2026 s.4: dividend rates 10.75% basic / 35.75% higher / 39.35% additional from 6 April 2026, HP §3). The company's retained profit is not your personal money: dividends extracted are taxed again at 2026/27 dividend rates, already included in the Ltd figure. An SRA-regulated firm cannot incorporate freely and must be authorised by the SRA as a recognised body (wholly lawyer-owned) or licensed as an ABS if non-lawyer owners are involved (Legal Services Act 2007 Part 5, HP §1). The Ltd scenario excludes student loans, Marriage Allowance, salary optimisation above the secondary threshold, and Employment Allowance (not available to a single-director company). These are estimates, not advice for your firm.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "soleTrader", label: "Sole trader / partner", color: "var(--accent)" },
      { dataKey: "ltd", label: "Limited company", color: "var(--primary)" },
    ],
  },
  explainer: {
    heading: "How this calculator works",
    paragraphs: [
      "For a sole practitioner or partner in a tax-transparent partnership or LLP, practice profit is taxed as personal income: income tax at 20%, 40% and 45% plus Class 4 National Insurance at 6% on profits from £12,570 to £50,270 and 2% above. Class 2 NIC was abolished from 6 April 2024. The personal allowance (£12,570) is tapered above £100,000 and lost at £125,140.",
      "For a limited company, the calculator applies corporation tax on profits (19% on profits up to £50,000, 25% main rate above £250,000, marginal relief between), employer NIC at 15% on the minimum salary above £9,100, then dividend tax on the remaining distributable profit at 2026/27 rates (10.75% basic / 35.75% higher / 39.35% additional, FA 2026 s.4 from 6 April 2026). A fixed £2,500 annual admin cost is included.",
      "Following the FA 2026 dividend rise, the tax advantage of a limited company over a partnership or LLP has narrowed at typical partner profit levels. Before incorporating, a solicitor must also weigh SRA authorisation requirements (HP §1): an SRA-regulated firm incorporating as a limited company needs recognition as a recognised body, or an ABS licence if any non-lawyer holds an interest.",
    ],
  },
};
