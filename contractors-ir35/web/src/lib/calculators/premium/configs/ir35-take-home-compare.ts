/**
 * Tool 1 (FLAGSHIP): Outside vs inside IR35 take-home comparator.
 *
 * toolId: ir35-take-home-compare-premium
 * topic: ir35
 *
 * Composes both tax2026.ts primitives on the SAME gross:
 *   - limitedTakeHome({ turnover, salary, expenses }) for the outside-IR35 side.
 *   - umbrellaTakeHome({ assignmentIncome: turnover, umbrellaMargin }) for the
 *     inside-IR35 / umbrella side.
 *   - Gap = outside.netTakeHome - inside.netTakeHome.
 *
 * FIGURES TRACED (all from tax2026.ts, no maths forked):
 *   Default: dayRate=500, billableDays=240, salary=12570, expenses=6000, margin=1200
 *   turnover = 500 * 240 = 120000
 *   limitedTakeHome({120000, 12570, 6000}).netTakeHome = 71820.95  -> "£71,821"
 *   umbrellaTakeHome({120000, 1200}).netTakeHome = 69889.87        -> "£69,890"
 *   gap = 71820.95 - 69889.87 = 1931.08                            -> "£1,931"
 *
 * No em-dashes anywhere. No DJH. 2026/27 rates (HP §5-7).
 * IR35 status note: outside figure is never presented as advice to declare outside.
 * CEST is not a guarantee (HP §2, §17.A).
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import {
  limitedTakeHome,
  umbrellaTakeHome,
} from "@/lib/calculators/tax2026";

function gbp(n: number): string {
  return "£" + Math.round(Number.isFinite(n) ? n : 0).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (Number.isFinite(n) ? n : 0).toFixed(1) + "%";
}

export const ir35TakeHomeCompareConfig: PremiumToolConfig = {
  id: "ir35-take-home-compare-premium",
  topic: "ir35",
  title: "Outside vs inside IR35 take-home comparator",
  intro: "See the exact take-home difference between contracting outside IR35 through your own limited company and working inside IR35 through an umbrella, on the same day rate.",
  fields: [
    {
      id: "dayRate",
      label: "Day rate",
      type: "currency",
      default: 500,
      min: 100,
      max: 3000,
      step: 25,
      help: "Your daily rate charged to the client or agency.",
    },
    {
      id: "billableDays",
      label: "Billable days per year",
      type: "number",
      default: 240,
      min: 1,
      max: 365,
      step: 5,
    },
    {
      id: "salary",
      label: "Director salary (outside IR35)",
      type: "select",
      default: "12570",
      options: [
        { value: "12570", label: "£12,570 (personal allowance)" },
        { value: "6708",  label: "£6,708 (lower earnings limit)" },
      ],
      help: "The director salary drawn from your limited company. Most single-director PSCs choose £12,570 or £6,708 (HP §8).",
    },
    {
      id: "annualExpenses",
      label: "Annual business expenses",
      type: "currency",
      default: 6000,
      min: 0,
      max: 50000,
      step: 500,
      advanced: true,
      help: "Allowable business expenses deducted before corporation tax. Reduces your taxable profit.",
    },
    {
      id: "umbrellaMargin",
      label: "Umbrella margin per year",
      type: "currency",
      default: 1200,
      min: 0,
      max: 5000,
      step: 100,
      advanced: true,
      help: "The umbrella company's annual fee (margin), deducted from the assignment rate before employer costs (HP §12).",
    },
  ],
  compute({ values }): PremiumResult {
    const dayRate     = Number.isFinite(Number(values.dayRate))     ? Number(values.dayRate)     : 500;
    const billableDays = Number.isFinite(Number(values.billableDays)) ? Number(values.billableDays) : 240;
    const salary      = Number(values.salary) || 12570;
    const expenses    = Number.isFinite(Number(values.annualExpenses)) ? Number(values.annualExpenses) : 6000;
    const margin      = Number.isFinite(Number(values.umbrellaMargin)) ? Number(values.umbrellaMargin) : 1200;

    const turnover = dayRate * billableDays;

    const outside = limitedTakeHome({ turnover, salary, expenses });
    const inside  = umbrellaTakeHome({ assignmentIncome: turnover, umbrellaMargin: margin });

    const gap = outside.netTakeHome - inside.netTakeHome;
    const outsideWins = gap >= 0;

    const headlineLabel = outsideWins
      ? "You keep more outside IR35"
      : "Inside IR35 is closer than you think here";
    const headlineValue = outsideWins
      ? `${gbp(Math.abs(gap))} more outside IR35`
      : `${gbp(Math.abs(gap))} more inside IR35`;
    const headlineTone = outsideWins ? ("good" as const) : ("warn" as const);
    const headlineSub = `On ${gbp(turnover)} annual turnover (${gbp(dayRate)}/day x ${billableDays} days). 2026/27 rates.`;

    const outsideScenario: ScenarioResult = {
      id: "outside",
      label: "Outside IR35 (limited company)",
      headline: {
        label: "Net take-home",
        value: gbp(outside.netTakeHome),
        sub: `${pct(outside.retentionPct)} of turnover`,
        tone: "good",
      },
      best: outsideWins,
      rows: [
        { label: "Turnover", value: gbp(outside.turnover) },
        { label: "Director salary", value: gbp(outside.salary) },
        { label: "Employer NIC", value: `-${gbp(outside.employerNI)}` },
        { label: "Business expenses", value: `-${gbp(outside.expenses)}` },
        { label: "Profit before CT", value: gbp(outside.profitBeforeTax), strong: true },
        { label: "Corporation tax", value: `-${gbp(outside.corporationTax)}` },
        { label: "Dividends drawn", value: gbp(outside.dividends) },
        { label: "Income tax on salary", value: `-${gbp(outside.incomeTaxOnSalary)}` },
        { label: "Employee NIC", value: `-${gbp(outside.employeeNI)}` },
        { label: "Dividend tax", value: `-${gbp(outside.dividendTax)}` },
        { label: "Net take-home", value: gbp(outside.netTakeHome), strong: true },
      ],
    };

    const insideScenario: ScenarioResult = {
      id: "inside",
      label: "Inside IR35 (umbrella)",
      headline: {
        label: "Net take-home",
        value: gbp(inside.netTakeHome),
        sub: `${pct(inside.retentionPct)} of assignment rate`,
        tone: "good",
      },
      best: !outsideWins,
      rows: [
        { label: "Assignment rate", value: gbp(inside.assignmentIncome) },
        { label: "Umbrella margin", value: `-${gbp(inside.umbrellaMargin)}` },
        { label: "Employer NIC", value: `-${gbp(inside.employerNI)}` },
        { label: "Apprenticeship levy", value: `-${gbp(inside.apprenticeshipLevy)}` },
        { label: "Gross salary", value: gbp(inside.grossSalary), strong: true },
        { label: "Income tax (PAYE)", value: `-${gbp(inside.incomeTax)}` },
        { label: "Employee NIC", value: `-${gbp(inside.employeeNI)}` },
        { label: "Net take-home", value: gbp(inside.netTakeHome), strong: true },
      ],
    };

    return {
      headline: {
        label: headlineLabel,
        value: headlineValue,
        sub: headlineSub,
        tone: headlineTone,
      },
      scenarioResults: [outsideScenario, insideScenario],
      chart: {
        data: [
          {
            name: "Outside IR35",
            takeHome: Math.round(outside.netTakeHome),
            deductions: Math.round(outside.turnover - outside.netTakeHome),
          },
          {
            name: "Inside IR35",
            takeHome: Math.round(inside.netTakeHome),
            deductions: Math.round(inside.assignmentIncome - inside.netTakeHome),
          },
        ],
      },
      note: "2026/27 basis: dividends 10.75%/35.75%/39.35% (FA 2026 s.4), employer NIC 15% above £5,000 secondary threshold (HP §6), CT 19/25 with 3/200 marginal relief (HP §7). The outside-IR35 side assumes a genuine outside-IR35 engagement. The take-home advantage here is not a reason to mis-declare status: IR35 status is determined by the whole-picture facts-and-circumstances test, and HMRC's CEST tool is not a guarantee (HP §2, §17.A). The inside-IR35 side models an umbrella: the umbrella margin, employer NIC and apprenticeship levy all come out of the assignment rate before PAYE applies (HP §12). Single-director PSC (no Employment Allowance). These are estimates, not advice.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "takeHome",   label: "Take-home",        color: "var(--accent)" },
      { dataKey: "deductions", label: "Total deductions",  color: "#64748b" },
    ],
  },
  explainer: {
    heading: "How this comparator works",
    paragraphs: [
      "The comparator runs the same annual turnover through two completely different tax models, side by side. Outside IR35, your limited company collects the assignment rate, pays a director salary, covers employer National Insurance and your business expenses, then pays corporation tax on the profit before distributing the rest as dividends. You then pay income tax and National Insurance on the salary, and dividend tax on the dividends at 2026/27 rates (10.75% ordinary, 35.75% upper, 39.35% additional).",
      "Inside IR35, the assignment rate goes to the umbrella company. The umbrella deducts its margin, then employer National Insurance (15% above the £5,000 secondary threshold from April 2025) and the apprenticeship levy (0.5% of the pay bill). What remains is your gross PAYE salary, on which income tax and employee National Insurance are charged in the normal way. The umbrella model solves the employer-cost circularity: the costs come out of your assignment rate, not on top of it.",
      "The gap between the two figures is the financial value of your IR35 status. IR35 status is not a choice: it is determined by the facts of each engagement using the whole-picture case-law test. The outside-IR35 figure is not a reason to declare outside; it is a reason to get the determination right. The actual IR35 status of a given engagement depends on substitution, control and mutuality of obligation among other factors, and HMRC's CEST tool is indicative only.",
    ],
  },
};
