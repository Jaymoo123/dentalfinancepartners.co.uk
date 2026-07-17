/**
 * Tool: Associate incorporation calculator (sole trader vs Ltd, NHS Pension aware).
 *
 * toolId: associate-incorporation-premium
 * topic: associate
 *
 * The differentiator no SERP competitor has (TOOL_ROSTER.md #5, CONFIRMED
 * WHITESPACE): the NHS Pension consequence of incorporating. A sole-trader
 * associate is normally a type-1 practitioner member; associate work billed
 * through a limited company generally falls out of the practitioner route.
 * The tool quantifies the forgone employer-equivalent pension value
 * (20.6% employer rate + 0.08% administration levy = 20.68% of pensionable pay)
 * against the headline incorporation tax saving and gives a verdict on the
 * pension-adjusted position. Employer-equivalent value = 20.6% employer rate
 * + 0.08% administration levy = 20.68% of pensionable pay.
 *
 * FIGURES TRACED (all in compute/associate-incorporation.ts):
 * - 2026/27 income tax, Class 4 6%/2%, Class 2 £3.45/week.
 * - Employer NIC 15% above £5,000 (from 6 Apr 2025); £12,570 optimal salary.
 * - CT 19%/26.5% marginal/25%; dividends 10.75%/35.75%/39.35% (FA 2026 s.4).
 * - NHS employer-equivalent 20.68%: an ESTIMATE, scheme-rule caveats in copy.
 *
 * NOT registered anywhere: registry.ts / resources.ts wiring is a separate,
 * deliberate integration step.
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calcAssociateIncorporation } from "@/lib/tools/compute/associate-incorporation";

function gbp(n: number): string {
  const abs = "£" + Math.abs(Math.round(n)).toLocaleString("en-GB");
  return n < 0 ? "-" + abs : abs;
}

export const associateIncorporationConfig: PremiumToolConfig = {
  id: "associate-incorporation-premium",
  topic: "associate",
  title: "Should an associate dentist incorporate? Sole trader vs Ltd with the NHS Pension cost",
  intro:
    "Compare your take-home as a self-employed associate against a limited company at 2026/27 rates, then see what incorporation costs you in forgone NHS Pension employer value, the figure generic incorporation calculators leave out.",
  fields: [
    {
      id: "grossFees",
      label: "Gross fees you generate a year",
      type: "currency",
      default: 200000,
      min: 0,
      max: 600000,
      step: 5000,
    },
    {
      id: "associatePct",
      label: "Your fee split (%)",
      type: "number",
      default: 45,
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
      default: 4000,
      min: 0,
      max: 100000,
      step: 500,
    },
    {
      id: "nhsPct",
      label: "NHS share of your fee income (%)",
      type: "number",
      default: 80,
      min: 0,
      max: 100,
      step: 5,
      help: "Drives the pensionable-earnings estimate. Only NHS earnings are pensionable in the NHS Pension Scheme; private fees are not.",
    },
    {
      id: "pensionableOverride",
      label: "Pensionable earnings (override)",
      type: "currency",
      default: 0,
      min: 0,
      max: 300000,
      step: 1000,
      advanced: true,
      help: "Leave at 0 to estimate pensionable pay as your NHS share of net fees. Enter your actual net pensionable earnings (from your ARR / Compass statement) if you know them.",
    },
  ],
  compute({ values }): PremiumResult {
    const r = calcAssociateIncorporation(
      Number(values.grossFees) || 0,
      Number(values.associatePct) || 0,
      Number(values.labPct) || 0,
      Number(values.expenses) || 0,
      Number(values.nhsPct) || 0,
      Number(values.pensionableOverride) || 0,
    );

    const gap = Math.abs(r.netPositionAfterPension);
    const scenarioResults: ScenarioResult[] = [
      {
        id: "sole-trader",
        label: "Sole trader (NHS Pension member)",
        headline: {
          label: "Total annual value",
          value: gbp(r.soleTrader.totalValue),
          sub: `${gbp(r.soleTrader.net)} net cash + ${gbp(r.pensionEmployerValue)} pension employer value`,
          tone: "good" as const,
        },
        rows: [
          { label: "Net cash after tax", value: gbp(r.soleTrader.net), strong: true },
          { label: "Income tax", value: gbp(r.soleTrader.incomeTax) },
          { label: "Class 4 NIC", value: gbp(r.soleTrader.class4Ni) },
          { label: "Class 2 NIC", value: gbp(r.soleTrader.class2Ni) },
          { label: "NHS Pension employer-equivalent value", value: gbp(r.pensionEmployerValue), strong: true },
        ],
        best: !r.ltdWins,
      },
      {
        id: "ltd",
        label: "Limited company",
        headline: {
          label: "Total annual value",
          value: gbp(r.ltd.totalValue),
          sub: `${gbp(r.ltd.net)} net cash, no NHS Pension accrual on associate work`,
          tone: r.ltdWins ? ("good" as const) : ("warn" as const),
        },
        rows: [
          { label: "Net cash after tax", value: gbp(r.ltd.net), strong: true },
          { label: "Director salary (uses personal allowance)", value: gbp(r.ltd.salary) },
          { label: "Employer NIC on salary", value: gbp(r.ltd.employerNi) },
          { label: "Corporation tax", value: gbp(r.ltd.corporationTax) },
          { label: "Dividend tax", value: gbp(r.ltd.dividendTax) },
          { label: "Admin and accountancy", value: gbp(r.ltd.adminCost) },
          { label: "NHS Pension employer value forgone", value: `-${gbp(r.pensionEmployerValue)}`, strong: true },
        ],
        best: r.ltdWins,
      },
    ];

    return {
      headline: {
        label: r.ltdWins
          ? "Limited company ahead, even after the NHS Pension cost"
          : "Sole trader ahead once the NHS Pension is counted",
        value: gbp(gap),
        sub: r.ltdWins
          ? `Ltd tax saving ${gbp(r.taxSavingBeforePension)} exceeds the ${gbp(r.pensionEmployerValue)} pension value forgone`
          : r.taxSavingBeforePension > 0
            ? `the ${gbp(r.taxSavingBeforePension)} Ltd tax saving is wiped out by ${gbp(r.pensionEmployerValue)} of forgone pension value`
            : "the Ltd route saves no tax on your figures and also forfeits the NHS Pension",
        tone: r.ltdWins ? "good" : "warn",
      },
      verdict: {
        text: r.ltdWins
          ? `Incorporation ahead by ${gbp(gap)} a year on your figures`
          : `Staying sole trader ahead by ${gbp(gap)} a year on your figures`,
        positive: !r.ltdWins,
      },
      breakdown: [
        { label: "Associate share (fee split)", value: gbp(r.associateShare) },
        { label: "Less: lab fees", value: `-${gbp(r.lab)}` },
        { label: "Less: other expenses", value: `-${gbp(Number(values.expenses) || 0)}` },
        { label: "Net fee income (both routes)", value: gbp(r.netFees), strong: true },
        { label: "Estimated pensionable earnings", value: gbp(r.pensionableEarnings) },
        { label: "Ltd tax saving before pension", value: gbp(r.taxSavingBeforePension) },
        { label: "NHS Pension employer value at stake (20.68%)", value: gbp(r.pensionEmployerValue) },
        {
          label: "Net position of incorporating, after pension",
          value: gbp(r.netPositionAfterPension),
          strong: true,
        },
      ],
      scenarioResults,
      chart: {
        data: [
          {
            name: "Sole trader",
            net: Math.round(r.soleTrader.net),
            pension: Math.round(r.pensionEmployerValue),
          },
          {
            name: "Limited company",
            net: Math.round(r.ltd.net),
            pension: 0,
          },
        ],
      },
      note: "2026/27 rates throughout (employer NIC 15% above £5,000; dividend rates 10.75%/35.75%/39.35% under FA 2026 s.4; CT 19%/26.5% marginal/25%). The Ltd route assumes a £12,570 director salary, full dividend extraction, £1,800 admin and no Employment Allowance. NHS Pension: modelled as fully lost on incorporation, which is the usual outcome where associate income is billed through a company rather than earned personally as a performer. The 20.68% employer-equivalent figure (20.6% employer rate plus 0.08% administration levy) is an estimate; the exact employer-side rate depends on the scheme year and your arrangement, and limited routes back into the scheme can exist in specific circumstances. Member contributions are excluded from both routes. IR35 on NHS engagements can remove the Ltd advantage entirely. Estimates, not advice; take scheme-specific advice before incorporating.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "net", label: "Net cash after tax", color: "var(--gold)" },
      { dataKey: "pension", label: "NHS Pension employer value", color: "var(--navy)" },
    ],
  },
  explainer: {
    heading: "How this comparison works",
    paragraphs: [
      "Both routes start from the same net fee income: your fee split of gross fees, less lab fees and other deductible expenses. As a sole trader that figure is your taxable profit, charged to income tax at 20%, 40% or 45%, Class 4 National Insurance at 6% up to £50,270 and 2% above, and Class 2 at £3.45 a week. Through a limited company the same income becomes company turnover: a £12,570 director salary (which uses your personal allowance and attracts £1,135.50 of employer NIC at 15% above the £5,000 threshold, with no Employment Allowance for a single-director company), corporation tax at 19% to 25% on the balance, then dividend tax at the 2026/27 rates of 10.75%, 35.75% and 39.35% on full extraction.",
      "The pension layer is what makes this comparison honest. A self-employed associate performing NHS dental services is normally a type-1 practitioner member of the NHS Pension Scheme, and the employer side of that benefit, a 20.6% contribution plus a 0.08% administration levy on pensionable pay, is funded for you. Bill the same work through a limited company and you generally fall out of the practitioner route: the company is not an Employing Authority, so no NHS Pension accrues on that income. The tool prices that forgone employer value at 20.68% of your estimated pensionable earnings and sets it against the headline tax saving.",
      "The verdict compares total annual value: net cash plus pension employer value for the sole trader, against net cash alone for the company. For a typical NHS-weighted associate the pension value swamps the incorporation tax saving. The gap narrows as the private share of your income rises, because private fees were never pensionable in the first place.",
    ],
  },
};

/* ---------------------------------------------------------------------------
 * Page copy for the hosting article / tool page (SSR prose, not part of the
 * client island). Consumed by the integrator alongside the SSR worked-example
 * block in components/tools/premium/AssociateIncorporationWorkedExamples.tsx.
 * ------------------------------------------------------------------------- */

export const associateIncorporationPageCopy = {
  intro:
    "Every generic incorporation calculator will tell you a limited company saves tax. For an associate dentist that answer is often wrong, because it ignores the single most valuable benefit of self-employment in NHS dentistry: type-1 practitioner membership of the NHS Pension Scheme. This calculator runs the full 2026/27 sole trader vs limited company comparison, then prices the pension consequence of incorporating so you can see the real net position.",
  methodology: [
    "Step 1, common base. Gross fees × your fee split, less lab fees on your share and other deductible expenses, gives net fee income. Both routes start here, so the comparison isolates structure, not workload.",
    "Step 2, sole trader. Net fee income is taxed as trading profit: income tax (personal allowance £12,570, 20%/40%/45%, allowance tapered above £100,000), Class 4 NIC at 6% between £12,570 and £50,270 and 2% above, and Class 2 NIC at £3.45 a week.",
    "Step 3, limited company. The company pays you a £12,570 salary (no income tax or employee NIC at that level; £1,135.50 employer NIC), deducts £1,800 of admin and accountancy, pays corporation tax at 19% up to £50,000 profit, an effective 26.5% in the marginal band to £250,000, and 25% above, then distributes the balance as dividends taxed at 10.75%, 35.75% and 39.35% (FA 2026 rates, £500 allowance).",
    "Step 4, the pension layer. Pensionable earnings are estimated as the NHS share of your net fees (or your own override). As a sole-trader practitioner member, the employer side of your NHS Pension, a 20.6% contribution plus the 0.08% administration levy, 20.68% in total, is funded on that pay. Incorporating generally forfeits it, so the tool counts 20.68% of pensionable pay as an annual cost of the Ltd route.",
    "Step 5, verdict. Sole-trader total value (net cash plus pension employer value) against Ltd net cash. The tool reports which route is ahead and by how much a year.",
  ],
  faqs: [
    {
      question: "Can an associate dentist keep the NHS Pension after incorporating?",
      answer:
        "Generally no, for associate work billed through the company. Type-1 practitioner membership attaches to a self-employed performer earning NHS income personally. A standard limited company is not an NHS Employing Authority, so income routed through it does not build NHS Pension benefits. Narrow exceptions exist (for example where a company itself holds a GDS/PDS contract and qualifies as an Employing Authority), but they do not apply to a typical associate arrangement. Treat any adviser who says the pension simply carries over with caution, and confirm your position with NHSBSA before signing anything.",
    },
    {
      question: "How much NHS Pension value does incorporation actually give up?",
      answer:
        "The employer side of the scheme is worth roughly 20.68% of your pensionable pay each year: a 20.6% employer contribution plus a 0.08% administration levy. An associate with £70,000 of pensionable NHS earnings is therefore receiving around £14,500 a year of employer-funded pension value on top of fee income. That is the benchmark any incorporation tax saving has to beat, and on typical NHS-weighted figures it does not come close.",
    },
    {
      question: "When does a limited company still make sense for an associate?",
      answer:
        "The stronger your private weighting, the weaker the pension argument, because private fees are not pensionable anyway. A predominantly private associate, an associate who has already opted out of the scheme or is constrained by the annual allowance taper, or one who plans to retain profits in the company rather than extract everything, can still see a genuine advantage. Run your own NHS percentage through the calculator; the crossover point is different for every book of fees.",
    },
    {
      question: "Does IR35 affect an incorporated associate?",
      answer:
        "It can, and it is a separate risk on top of the pension cost. If an engagement would look like employment without the company in the way, the off-payroll rules can apply, PAYE is due on the fee, and the dividend planning that produces the tax saving disappears while the pension is still lost. Associate agreements drafted on standard BDA terms usually support self-employment, but status depends on working practices, not paperwork.",
    },
    {
      question: "Are the 20.6% and 0.08% figures fixed?",
      answer:
        "No. Employer-side NHS Pension rates are set by the Department of Health and Social Care and move between scheme years, and how the employer cost is met for dental practitioners depends on the commissioning arrangements. The tool uses the 20.6% employer contribution plus the 0.08% administration levy as a reasonable current estimate of the employer-equivalent value; the strategic conclusion is not sensitive to a point or two either way, but check the current NHSBSA rates before making a final decision.",
    },
    {
      question: "Should I use my Compass or ARR figure for pensionable earnings?",
      answer:
        "Yes, if you have it. The tool's default estimate (NHS share of net fees) is a heuristic; your actual net pensionable earnings from your Annual Reconciliation Report or Compass statement is the accurate input. Enter it in the advanced pensionable-earnings override and the pension valuation will use your real figure.",
    },
  ],
} as const;
