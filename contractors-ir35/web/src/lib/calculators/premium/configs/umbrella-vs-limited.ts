/**
 * Tool 2: Umbrella vs limited company structure planner.
 *
 * toolId: umbrella-vs-limited-premium
 * topic: structure
 *
 * Composes both tax2026.ts primitives on the same gross (same maths as Tool 1,
 * distinct toolId and framing -- the STRUCTURE choice rather than IR35 status).
 *   - limitedTakeHome({ turnover, salary, expenses }) for the limited company side.
 *   - umbrellaTakeHome({ assignmentIncome: turnover, umbrellaMargin }) for the
 *     umbrella side.
 *
 * FIGURES TRACED (from tax2026.ts, no maths forked):
 *   Default: dayRate=500, billableDays=240, salary=12570, expenses=6000, margin=1200
 *   limitedTakeHome({120000, 12570, 6000}).netTakeHome = 71820.95  -> "£71,821"
 *   umbrellaTakeHome({120000, 1200}).netTakeHome = 69889.87        -> "£69,890"
 *   gap = 71820.95 - 69889.87 = 1931.08                            -> "£1,931"
 *   (Equals Tool 1 gap by construction, proving both wrap the same maths.)
 *
 * Structure note includes: PSC running costs/admin vs umbrella simplicity (HP §17.C),
 * and the April 2026 umbrella JSL reform (HP §12). Never "the PSC is always better".
 *
 * No em-dashes anywhere. No DJH. 2026/27 rates.
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

export const umbrellaVsLimitedPremiumConfig: PremiumToolConfig = {
  id: "umbrella-vs-limited-premium",
  topic: "structure",
  title: "Umbrella vs limited company structure planner",
  intro: "Compare the net take-home from the same day rate whether you operate through your own limited company or an umbrella, and see what the annual difference actually is.",
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
      label: "Director salary (limited company)",
      type: "select",
      default: "12570",
      options: [
        { value: "12570", label: "£12,570 (personal allowance)" },
        { value: "6708",  label: "£6,708 (lower earnings limit)" },
      ],
      help: "Director salary drawn from the limited company. The most efficient level depends on Employment Allowance eligibility (HP §8). Single-director PSCs cannot claim EA.",
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
      help: "Allowable expenses deducted before corporation tax in the limited company.",
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
    const dayRate      = Number.isFinite(Number(values.dayRate))      ? Number(values.dayRate)      : 500;
    const billableDays = Number.isFinite(Number(values.billableDays)) ? Number(values.billableDays) : 240;
    const salary       = Number(values.salary) || 12570;
    const expenses     = Number.isFinite(Number(values.annualExpenses)) ? Number(values.annualExpenses) : 6000;
    const margin       = Number.isFinite(Number(values.umbrellaMargin)) ? Number(values.umbrellaMargin) : 1200;

    const turnover = dayRate * billableDays;

    const ltd      = limitedTakeHome({ turnover, salary, expenses });
    const umbrella = umbrellaTakeHome({ assignmentIncome: turnover, umbrellaMargin: margin });

    const gap = ltd.netTakeHome - umbrella.netTakeHome;
    const ltdWins = gap >= 0;

    const headlineLabel = ltdWins
      ? "Limited company keeps more"
      : "Umbrella keeps more on these numbers";
    const headlineValue = ltdWins
      ? `${gbp(Math.abs(gap))} more per year through a limited company`
      : `${gbp(Math.abs(gap))} more per year through an umbrella`;
    const headlineTone = ("good" as const);
    const headlineSub = `On ${gbp(turnover)} annual turnover. 2026/27 rates.`;

    const ltdScenario: ScenarioResult = {
      id: "limited",
      label: "Limited company",
      headline: {
        label: "Net take-home",
        value: gbp(ltd.netTakeHome),
        sub: `${pct(ltd.retentionPct)} of turnover`,
        tone: "good",
      },
      best: ltdWins,
      rows: [
        { label: "Turnover", value: gbp(ltd.turnover) },
        { label: "Director salary", value: gbp(ltd.salary) },
        { label: "Employer NIC", value: `-${gbp(ltd.employerNI)}` },
        { label: "Business expenses", value: `-${gbp(ltd.expenses)}` },
        { label: "Profit before CT", value: gbp(ltd.profitBeforeTax), strong: true },
        { label: "Corporation tax", value: `-${gbp(ltd.corporationTax)}` },
        { label: "Dividends drawn", value: gbp(ltd.dividends) },
        { label: "Income tax on salary", value: `-${gbp(ltd.incomeTaxOnSalary)}` },
        { label: "Employee NIC", value: `-${gbp(ltd.employeeNI)}` },
        { label: "Dividend tax", value: `-${gbp(ltd.dividendTax)}` },
        { label: "Net take-home", value: gbp(ltd.netTakeHome), strong: true },
      ],
    };

    const umbrellaScenario: ScenarioResult = {
      id: "umbrella",
      label: "Umbrella",
      headline: {
        label: "Net take-home",
        value: gbp(umbrella.netTakeHome),
        sub: `${pct(umbrella.retentionPct)} of assignment rate`,
        tone: "good",
      },
      best: !ltdWins,
      rows: [
        { label: "Assignment rate", value: gbp(umbrella.assignmentIncome) },
        { label: "Umbrella margin", value: `-${gbp(umbrella.umbrellaMargin)}` },
        { label: "Employer NIC", value: `-${gbp(umbrella.employerNI)}` },
        { label: "Apprenticeship levy", value: `-${gbp(umbrella.apprenticeshipLevy)}` },
        { label: "Gross salary", value: gbp(umbrella.grossSalary), strong: true },
        { label: "Income tax (PAYE)", value: `-${gbp(umbrella.incomeTax)}` },
        { label: "Employee NIC", value: `-${gbp(umbrella.employeeNI)}` },
        { label: "Net take-home", value: gbp(umbrella.netTakeHome), strong: true },
      ],
    };

    return {
      headline: {
        label: headlineLabel,
        value: headlineValue,
        sub: headlineSub,
        tone: headlineTone,
      },
      scenarioResults: [ltdScenario, umbrellaScenario],
      chart: {
        data: [
          {
            name: "Limited",
            takeHome: Math.round(ltd.netTakeHome),
            deductions: Math.round(ltd.turnover - ltd.netTakeHome),
          },
          {
            name: "Umbrella",
            takeHome: Math.round(umbrella.netTakeHome),
            deductions: Math.round(umbrella.assignmentIncome - umbrella.netTakeHome),
          },
        ],
      },
      note: "2026/27 basis: dividends 10.75%/35.75%/39.35% (FA 2026 s.4), employer NIC 15% above £5,000 secondary threshold, CT 19/25 marginal relief 3/200. A limited company usually keeps more of your day rate, but it carries running costs (typically £1,000 to £2,000 per year), annual accounts, corporation tax returns, confirmation statements and IR35 exposure that an umbrella does not (HP §17.C). From April 2026 the compliance rules on umbrellas tightened: the agency or end client is now jointly and severally liable for unpaid PAYE if the umbrella fails to operate it, so using a non-compliant umbrella is a risk for your client as well as for you (HP §12). Single-director PSC (no Employment Allowance). These are estimates, not advice.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "takeHome",   label: "Take-home",       color: "var(--accent)" },
      { dataKey: "deductions", label: "Total deductions", color: "#64748b" },
    ],
  },
  explainer: {
    heading: "How the structure planner works",
    paragraphs: [
      "The planner runs the same annual turnover through two contracting structures side by side. The limited company route pays a director salary, covers employer National Insurance and business expenses, then pays corporation tax on the remaining profit before distributing the balance as dividends at 2026/27 dividend rates. The umbrella route deducts the umbrella margin first, then employer National Insurance and the apprenticeship levy (both funded from your assignment rate), leaving a gross PAYE salary on which income tax and employee National Insurance are charged.",
      "A limited company usually keeps more of your day rate on paper. The practical trade-off is running costs and administrative burden: you will need to file annual accounts, a corporation tax return, a confirmation statement and usually run payroll monthly. These typically cost £1,000 to £2,000 per year with a contractor accountant, which narrows the gap. An umbrella handles all employer obligations, statutory pay entitlements and pension auto-enrolment, at the cost of a lower net income.",
      "From April 2026, HMRC's joint and several liability (JSL) rules for umbrella companies came into force: the agency or end client is now potentially liable for unpaid PAYE and National Insurance if the umbrella fails to operate them correctly. This increases the scrutiny on umbrella compliance and is a reason to choose a reputable, fully compliant umbrella company rather than one offering implausibly high net pay. The right structure depends on your mix of inside and outside IR35 work, not just the net income figure alone.",
    ],
  },
};
