/**
 * MTD ITSA PREMIUM tool config — the flagship on-page interactive tool for the
 * Making Tax Digital category.
 *
 * Headline value: a "does Making Tax Digital for Income Tax apply to you, and
 * when?" checker. You enter your GROSS qualifying income (rental + sole-trade)
 * and pick how you hold it; the tool tells you whether MTD ITSA applies, from
 * which April (6 April 2026 for income over £50,000, 6 April 2027 for over
 * £30,000, 6 April 2028 for over £20,000), and renders a readiness checklist of
 * exactly what you will need (digital records, compatible software, four
 * quarterly updates, the final declaration).
 *
 * An optional editable MINI-GRID lets a landlord list several income streams
 * (each property's gross rent, plus any sole-trade turnover) so the GROSS
 * qualifying-income aggregate — the figure the threshold is actually tested on —
 * is built up correctly. This matters: house_positions §19.2 is explicit that the
 * test is on GROSS, before deductions, aggregated across streams.
 *
 * All logic comes from lib/mtd.ts (the locked thresholds + dates), so this tool,
 * the bespoke MTDCheckerCalculator and the Excel deadline tracker can never
 * disagree on who is in and when.
 */
import type { PremiumToolConfig, PremiumComputeContext, GridRow } from "../types";
import {
  computeMtd,
  gbp,
  MTD_TIERS,
  MTD_STANDARD_QUARTERS,
  FINAL_DECLARATION_DUE,
  type MtdEntity,
} from "@/lib/mtd";

const ENTITY_OPTIONS = [
  { value: "individual", label: "Individual / sole trader (in my own name)" },
  { value: "company", label: "Limited company" },
  { value: "partnership", label: "Partnership / LLP" },
  { value: "trust", label: "Trust" },
];

/**
 * Sum the grid rows into a single GROSS qualifying-income total. Each row is one
 * income stream (a property's gross rent, or sole-trade turnover). Returns 0 and
 * used:false if the grid is empty, so the scalar inputs drive the model instead.
 */
function gridTotals(rows: GridRow[]): { gross: number; used: boolean; count: number } {
  let gross = 0;
  let count = 0;
  for (const row of rows) {
    const amount = Number(row.amount) || 0;
    if (amount > 0) {
      gross += amount;
      count += 1;
    }
  }
  return { gross, used: count > 0, count };
}

/** Build the readiness checklist shown once a landlord is (or will be) mandated. */
function readinessRows() {
  return [
    {
      label: "Keep digital records",
      value: "Each income + expense logged in software (or a spreadsheet with a digital link to bridging software). No more shoebox of receipts and one annual tot-up.",
    },
    {
      label: "Use HMRC-recognised compatible software",
      value: "From the gov.uk 'find compatible software' list. Spreadsheet + recognised bridging software is allowed; manual copy-paste is not a digital link.",
    },
    {
      label: `Submit ${MTD_STANDARD_QUARTERS.length} quarterly updates`,
      value: "A cumulative summary of income and expenses for each quarter, sent to HMRC roughly one month after each quarter end.",
    },
    {
      label: "File a final declaration",
      value: `The annual wrap-up that replaces the old Self Assessment return — confirms the year's figures and any other income, due ${FINAL_DECLARATION_DUE}.`,
    },
    {
      label: "If you use an accountant",
      value: "They must connect via an Agent Services Account (ASA) and you re-authorise them specifically for MTD — old 64-8 authorisations do not carry across.",
    },
  ];
}

function compute(ctx: PremiumComputeContext) {
  const entity = String(ctx.values.entity ?? "individual") as MtdEntity;

  // The grid, when used, builds the GROSS aggregate across every income stream;
  // otherwise the two scalar inputs (rent + sole-trade) drive the model.
  const totals = gridTotals(ctx.rows);
  const usingGrid = totals.used;
  const rentalIncome = usingGrid ? totals.gross : Number(ctx.values.rentalIncome) || 0;
  const soleTradeIncome = usingGrid ? 0 : Number(ctx.values.soleTradeIncome) || 0;

  const res = computeMtd({ rentalIncome, soleTradeIncome, entity });

  // The chart plots the qualifying income against the three threshold tiers so a
  // landlord can see which phase they clear at a glance.
  const chartData = MTD_TIERS.map((t) => ({
    name: `From ${t.fromYear}`,
    income: res.qualifyingIncome,
    threshold: t.threshold,
  }));

  // Verdict badge: green = no current mandate / out of scope, amber = mandated.
  const positive = !res.applies;

  // Breakdown depends on status.
  const breakdown =
    res.status === "out-of-scope"
      ? [
          { label: "Qualifying income entered", value: gbp(res.qualifyingIncome) },
          { label: "MTD ITSA applies?", value: "No — out of scope", strong: true },
        ]
      : res.status === "mandated" && res.tier
        ? [
            { label: "Qualifying income (gross, aggregated)", value: gbp(res.qualifyingIncome), strong: true },
            { label: "Earliest threshold cleared", value: `over ${gbp(res.tier.threshold)}` },
            { label: "Mandatory from", value: res.tier.fromLabel, strong: true },
            { label: "Tested against", value: res.tier.testedAgainst },
            { label: "Quarterly updates each year", value: String(MTD_STANDARD_QUARTERS.length) },
          ]
        : [
            { label: "Qualifying income (gross, aggregated)", value: gbp(res.qualifyingIncome), strong: true },
            { label: "Lowest published threshold", value: `over ${gbp(res.boundary)} (from April 2028)` },
            { label: "Amount below that threshold", value: gbp(Math.abs(res.marginToThreshold)) },
            { label: "MTD ITSA mandatory now?", value: "No (voluntary opt-in available)", strong: true },
          ];

  const scopeNote = usingGrid
    ? `Aggregated across ${totals.count} income stream${totals.count === 1 ? "" : "s"} in the grid below. `
    : "";

  const checklistNote =
    res.status === "mandated"
      ? "You are in scope. The result panel lists what you will need to have in place by your start date. "
      : res.status === "below"
        ? "No mandate applies yet, but the thresholds are dropping (£50k → £30k → £20k) and the test is on GROSS income before expenses, so a low-profit, high-rent landlord can still be caught. "
        : "";

  return {
    headline: {
      label: "Qualifying income (gross)",
      value: gbp(res.qualifyingIncome),
      sub: res.applies && res.tier ? `MTD ITSA mandatory from ${res.tier.fromLabel}` : "No MTD ITSA mandate currently applies",
      tone: (res.applies ? "warn" : "good") as "warn" | "good",
    },
    verdict: {
      text:
        res.status === "out-of-scope"
          ? "Out of scope — MTD ITSA does not apply"
          : res.status === "mandated" && res.tier
            ? `Yes — MTD applies from ${res.tier.fromLabel}`
            : "Not yet — below the threshold",
      positive,
    },
    // The readiness checklist is shown for individuals who are (or will be) in.
    scenarioResults:
      res.status === "mandated"
        ? [
            {
              id: "readiness",
              label: "Your MTD readiness checklist",
              best: true,
              headline: { label: "What you'll need in place", value: "5 steps" },
              rows: readinessRows(),
            },
          ]
        : undefined,
    breakdown,
    chart: { data: chartData },
    note:
      scopeNote +
      checklistNote +
      "Qualifying income is your GROSS rental income plus GROSS sole-trade turnover, before any expenses — not your profit. Employment (PAYE), pension, dividend and savings income do NOT count towards it. Joint owners test their SHARE of the rent, not the property's total. This checker is general guidance based on the published schedule, not advice for your specific situation.",
  };
}

export const mtdPremiumTool: PremiumToolConfig = {
  id: "mtd-premium",
  topic: "mtd",
  title: "Does Making Tax Digital apply to you, and when?",
  intro:
    "Enter your gross qualifying income (rental plus any sole-trade turnover) and see whether MTD for Income Tax applies, from which April, and exactly what you will need to get ready. Add each income stream in the grid to build the gross total the threshold is actually tested on.",
  fields: [
    {
      id: "rentalIncome",
      label: "Annual rental income (gross)",
      type: "currency",
      default: 35000,
      help: "Total rents for the year BEFORE expenses (used unless you add streams in the grid below).",
    },
    {
      id: "soleTradeIncome",
      label: "Sole-trade / self-employment turnover (gross)",
      type: "currency",
      default: 20000,
      help: "Gross self-employment turnover, if any. Aggregated with rents for the threshold test.",
    },
    {
      id: "entity",
      label: "How do you hold this income?",
      type: "select",
      default: "individual",
      options: ENTITY_OPTIONS,
      help: "Only individuals / sole traders are in MTD ITSA. Companies, partnerships and trusts are out of scope.",
    },
  ],
  grid: {
    heading: "Or list each income stream to build your gross total (optional)",
    columns: [
      { id: "name", label: "Income stream", type: "text" },
      { id: "amount", label: "Annual gross income", type: "currency" },
    ],
    rowFactory: (index: number) => ({
      id: `stream-${index}-${Math.random().toString(36).slice(2, 8)}`,
      name: index === 0 ? "Property 1 rent" : `Income stream ${index + 1}`,
      amount: 0,
    }),
    minRows: 0,
    maxRows: 15,
    addLabel: "+ Add an income stream",
  },
  compute,
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    valueAxisLabel: "£ per year",
    series: [
      { dataKey: "income", label: "Your qualifying income", color: "#f59e0b" },
      { dataKey: "threshold", label: "Mandate threshold", color: "#10b981" },
    ],
  },
  explainer: {
    heading: "How the MTD threshold test works",
    paragraphs: [
      "Making Tax Digital for Income Tax (MTD ITSA) is being phased in by income level. From 6 April 2026 it is mandatory for individuals whose qualifying income is over £50,000; from 6 April 2027 the threshold drops to over £30,000; and from 6 April 2028 to over £20,000. This tool finds the earliest April you cross a threshold and treats that as your start date.",
      "The figure tested is your QUALIFYING INCOME: gross property rental income plus gross sole-trade turnover, added together, before any expenses are taken off. That last point catches people out, a landlord with £52,000 of rent and £40,000 of costs (only £12,000 profit) is still in from April 2026, because the test is on the £52,000 gross, not the profit. Employment, pension, dividend and savings income are excluded from the test.",
      "Limited companies are outside MTD ITSA entirely (they file a Company Tax return). General partnerships and LLPs are deferred with no confirmed date, and trustees are outside it too. Once you are mandated you must keep digital records, file four quarterly updates and a final declaration each year using HMRC-recognised software. Use this checker for the headline answer, then get your records and software in place well before your start date.",
    ],
  },
};
