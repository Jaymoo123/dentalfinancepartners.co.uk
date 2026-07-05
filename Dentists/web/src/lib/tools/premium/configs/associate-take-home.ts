/**
 * Tool 1: Dental associate take-home and locum-structure planner.
 *
 * toolId: associate-take-home-premium
 * topic: associate
 *
 * Composes calcAssociateTakeHome + calcLocumStructure into one tool:
 *   - Headline: associate take-home from gross fees (sole-trader basis).
 *   - Advanced panel: locum-structure comparison (sole trader / Ltd / umbrella).
 *
 * FIGURES TRACED:
 * - calcAssociateTakeHome: 2025/26 income-tax bands and NIC (unchanged into
 *   2026/27 for sole-trader associates, F2 resolved). Outputs dated
 *   "2025/26 to 2026/27 basis" in copy.
 * - calcLocumStructure: 2026/27 rates (employer NIC 15% above £5,000 secondary
 *   threshold from 6 Apr 2025; dividend rates 10.75%/35.75%/39.35% FA 2026 s.4).
 * - NHS Pension treated as deductible from taxable profit (practitioner
 *   arrangement, HP §2.C -- not all arrangements qualify; stated in note).
 * - IR35 on NHS engagements can flip the Ltd locum answer (HP §1.A -- stated in note).
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calcAssociateTakeHome } from "@/lib/tools/compute/associate-take-home";
import { calcLocumStructure } from "@/lib/tools/compute/locum-structure";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return n.toFixed(1) + "%";
}

export const associateTakeHomeConfig: PremiumToolConfig = {
  id: "associate-take-home-premium",
  topic: "associate",
  title: "Dental associate take-home and structure planner",
  intro: "See what you keep from your associate fees after income tax, Class 4 and Class 2 National Insurance, then compare working as a sole trader against a limited company or umbrella if you locum.",
  fields: [
    {
      id: "grossFees",
      label: "Gross fees you generate a year",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 5000,
    },
    {
      id: "associatePct",
      label: "Your fee split (%)",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: "labPct",
      label: "Lab fees (% of your gross)",
      type: "number",
      default: 8,
      min: 0,
      max: 30,
      step: 1,
    },
    {
      id: "expenses",
      label: "Other deductible expenses a year",
      type: "currency",
      default: 3000,
      min: 0,
      max: 100000,
      step: 500,
    },
    {
      id: "pensionContribution",
      label: "NHS Pension contribution a year",
      type: "currency",
      default: 0,
      min: 0,
      max: 60000,
      step: 500,
      advanced: true,
      help: "Deducted from taxable profit under the practitioner arrangement. Not all associate agreements qualify (HP §2.C).",
    },
    {
      id: "dayRate",
      label: "Locum day rate (if you locum)",
      type: "currency",
      default: 500,
      min: 0,
      max: 2000,
      step: 25,
      advanced: true,
      help: "Drives the locum-structure comparison below. Leave at 0 if not applicable.",
    },
    {
      id: "locumDays",
      label: "Locum days a year",
      type: "number",
      default: 220,
      min: 0,
      max: 260,
      step: 5,
      advanced: true,
    },
  ],
  compute({ values }): PremiumResult {
    const grossFees = Number(values.grossFees) || 0;
    const associatePct = Number(values.associatePct) || 0;
    const labPct = Number(values.labPct) || 0;
    const expenses = Number(values.expenses) || 0;
    const pensionContribution = Number(values.pensionContribution) || 0;
    const dayRate = Number(values.dayRate) || 0;
    const locumDays = Number(values.locumDays) || 0;

    const th = calcAssociateTakeHome(
      grossFees,
      associatePct,
      labPct,
      expenses,
      pensionContribution,
    );

    const locumScenarios: ScenarioResult[] = [];
    let chartData: { name: string; net: number; tax: number }[] = [];

    if (dayRate > 0 && locumDays > 0) {
      const ls = calcLocumStructure(dayRate, locumDays, expenses);
      const structures: { id: string; label: string; result: { net: number; tax: number } }[] = [
        { id: "sole-trader", label: "Sole trader", result: ls.soleTrader },
        { id: "ltd", label: "Limited company", result: ls.ltd },
        { id: "umbrella", label: "Umbrella", result: ls.umbrella },
      ];
      const bestNet = Math.max(ls.soleTrader.net, ls.ltd.net, ls.umbrella.net);
      locumScenarios.push(
        ...structures.map((s) => ({
          id: s.id,
          label: s.label,
          headline: {
            label: "Net take-home",
            value: gbp(s.result.net),
            sub: `tax and NIC ${gbp(s.result.tax)}`,
            tone: "good" as const,
          },
          rows: [
            { label: "Net take-home", value: gbp(s.result.net), strong: true },
            { label: "Total tax and NIC", value: gbp(s.result.tax) },
          ],
          best: s.result.net === bestNet,
        }))
      );
      chartData = structures.map((s) => ({
        name: s.label,
        net: Math.round(s.result.net),
        tax: Math.round(s.result.tax),
      }));
    }

    return {
      headline: {
        label: "Estimated take-home",
        value: gbp(th.netCash),
        sub: `on a ${gbp(th.profit)} profit · effective rate ${pct(th.effectiveRate)}`,
        tone: "good",
      },
      breakdown: [
        { label: "Associate share (fee split)", value: gbp(th.associateShare) },
        { label: "Less: lab fees", value: `-${gbp(th.lab)}` },
        { label: "Less: other expenses", value: `-${gbp(expenses)}` },
        { label: "Taxable profit", value: gbp(th.taxableProfit), strong: true },
        ...(pensionContribution > 0
          ? [{ label: "NHS Pension (deducted from profit)", value: `-${gbp(pensionContribution)}` }]
          : []),
        { label: "Income tax", value: gbp(th.incomeTax) },
        { label: "Class 4 National Insurance", value: gbp(th.class4Ni) },
        { label: "Class 2 National Insurance", value: gbp(th.class2Ni) },
        { label: "Total tax and NIC", value: gbp(th.totalTax), strong: true },
        { label: "Net take-home", value: gbp(th.netCash), strong: true },
        { label: "Effective tax rate", value: pct(th.effectiveRate) },
      ],
      ...(locumScenarios.length > 0
        ? {
            scenarioResults: locumScenarios,
            chart: {
              data: chartData,
            },
          }
        : {}),
      note: "2025/26 to 2026/27 basis (income-tax bands unchanged; Class 2 £3.45/week). Sole-trader associate only: the Ltd associate route is not modelled in the headline take-home line. NHS Pension contributions are treated as deductible from taxable profit under the practitioner arrangement, but not all associate agreements qualify (HP §2.C). The locum-structure comparison uses 2026/27 rates (employer NIC 15% above the £5,000 secondary threshold from 6 April 2025). The Ltd locum route loses NHS Pension access on the dividend portion, and IR35 can change the answer on NHS engagements (HP §1.A). Umbrella assumes a 5% margin. Excludes student loan repayments and Marriage Allowance. These are estimates, not advice for your practice.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "net", label: "Kept after tax", color: "var(--gold)" },
      { dataKey: "tax", label: "Total tax and NIC", color: "var(--navy)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "Your associate take-home starts with the gross fees you generate, not the fees billed. Your fee split (typically 40 to 50%) gives your associate share. Lab fees come off that share, then your deductible expenses, then any NHS Pension contribution (under the practitioner arrangement, HP §2.C). The result is your taxable profit, which is subject to income tax at 20%, 40% or 45%, plus Class 4 National Insurance at 6% (up to £50,270) and 2% above, and Class 2 NIC at £3.45 a week. The figures are on a 2025/26 to 2026/27 basis: the income-tax bands are unchanged between the two years.",
      "Your fee split is not your take-home. A common planning error is to read the headline split percentage as the take-home percentage. Once lab fees, expenses, and the tax charge are accounted for, the effective take-home on a typical associate income can be 20 to 30 percentage points below the fee-split rate.",
      "The locum-structure panel compares three routes at your chosen day rate and working days: as a self-employed sole trader (Class 4 and Class 2 NIC on profit, no employer NIC), through a limited company (£12,570 director salary plus dividends, 2026/27 dividend rates of 10.75%/35.75%/39.35%, employer NIC at 15% above the £5,000 secondary threshold, £1,800 annual admin), and through an umbrella company (a 5% umbrella margin, then employer NIC at 15% above £5,000 and PAYE on the balance). The comparison is indicative: the Ltd route loses NHS Pension access on the dividend portion and IR35 can override it on NHS engagements.",
    ],
  },
};
