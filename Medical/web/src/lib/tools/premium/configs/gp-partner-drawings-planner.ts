/**
 * Tool 6: GP partner drawings planner.
 *
 * toolId: gp-partner-drawings-planner
 * topic: gp-practice
 *
 * Translates an annual partnership profit share into sustainable monthly
 * drawings after income tax, Class 4 National Insurance, NHS superannuation
 * and any student loan are set aside. Optional extra buffer percentage lets
 * cautious partners hold back an additional reserve on top of the computed
 * liabilities.
 *
 * INCOME-TAX BAND RULE (locked per TOOL_ROSTER.md §5):
 *   PA = £12,570 tapered £1 per £2 above £100,000; fully gone at £125,140.
 *   Basic band = FIXED £37,700 (£12,571-£50,270 when PA is full).
 *   Higher band width = (125,140 - PA) - 37,700.  NOT a fixed £74,870.
 *   Additional (45%) above £125,140.
 *
 * CLASS 4 NI (2026/27):
 *   6% on profits £12,570-£50,270; 2% above.
 *   Class 2 is no longer a compulsory payment from 6 April 2024.
 *
 * NHS SUPERANNUATION (GP partner, 2026/27 tiers):
 *   Tiered employee contribution on superannuable profit, from the shared
 *   single-source module compute/nhs-super-tiers.ts. Do NOT inline a table.
 *
 * STUDENT LOAN (2026/27 thresholds -- builder confirm annually):
 *   Plan 1: £26,065  Plan 2: £28,470  Plan 4: £32,745  all at 9%.
 *
 * FIGURES CROSS-CHECK (worked example from TOOL_ROSTER.md §4.6):
 *   Profit share £120,000 | superannuable £120,000 | no student loan
 *   PA = 12,570 - (120,000 - 100,000)/2 = £2,570
 *   IT: basic £37,700 @ 20% = £7,540
 *       higher = (125,140 - 2,570) - 37,700 = £84,870 wide; income in band
 *       = 120,000 - (2,570 + 37,700) = £79,730 @ 40% = £31,892
 *       total IT = £39,432
 *   Class 4 NI: 6% × (50,270 - 12,570) = £2,262; 2% × (120,000 - 50,270) = £1,395 => £3,657
 *   Super: £120,000 × 12.5% = £15,000
 *   Net = 120,000 - 39,432 - 3,657 - 15,000 = £61,911 => £5,159/month
 *
 * NO chart: single take-home output, not a comparison.
 */
import type { PremiumToolConfig, PremiumResult, CalcResultRow } from "../types";
import { nhsSuperEmployeeRate } from "@/lib/tools/compute/nhs-super-tiers";

/**
 * NHS employee superannuation contribution (stepped, not marginal -- the whole
 * profit is charged at the single tier rate it falls into). Table lives in the
 * shared single-source module.
 */
function calcSuper(superannuablePay: number): { amount: number; rate: number } {
  const rate = nhsSuperEmployeeRate(superannuablePay);
  return { amount: superannuablePay * rate, rate };
}

// ---------------------------------------------------------------------------
// Income tax: correct band arithmetic per TOOL_ROSTER.md §5.
// ---------------------------------------------------------------------------
function calcIncomeTax(income: number): {
  tax: number;
  pa: number;
  basicTax: number;
  higherTax: number;
  additionalTax: number;
} {
  // Personal allowance taper
  const pa = income > 125140 ? 0 : income > 100000 ? Math.max(0, 12570 - (income - 100000) / 2) : 12570;

  const basicBand = 37700; // fixed
  const higherBandWidth = Math.max(0, 125140 - pa - basicBand);

  const paEnd = pa;
  const basicEnd = pa + basicBand;
  const higherEnd = pa + basicBand + higherBandWidth; // = 125,140 when pa > 0

  const basicIncome = Math.max(0, Math.min(income, basicEnd) - paEnd);
  const higherIncome = Math.max(0, Math.min(income, higherEnd) - basicEnd);
  const additionalIncome = Math.max(0, income - higherEnd);

  const basicTax = basicIncome * 0.20;
  const higherTax = higherIncome * 0.40;
  const additionalTax = additionalIncome * 0.45;

  return {
    tax: basicTax + higherTax + additionalTax,
    pa,
    basicTax,
    higherTax,
    additionalTax,
  };
}

// ---------------------------------------------------------------------------
// Class 4 NI (2026/27).
// ---------------------------------------------------------------------------
function calcClass4NI(profit: number): number {
  const lpl = 12570;
  const upl = 50270;
  const band1 = Math.max(0, Math.min(profit, upl) - lpl);
  const band2 = Math.max(0, profit - upl);
  return band1 * 0.06 + band2 * 0.02;
}

// ---------------------------------------------------------------------------
// Student loan repayment (2026/27 thresholds -- builder confirm annually).
// ---------------------------------------------------------------------------
type SLPlan = "none" | "plan1" | "plan2" | "plan4";
const SL_THRESHOLDS: Record<SLPlan, number> = {
  none: Infinity,
  plan1: 26065,
  plan2: 28470,
  plan4: 32745,
};
function calcStudentLoan(income: number, plan: SLPlan): number {
  if (plan === "none") return 0;
  return Math.max(0, income - SL_THRESHOLDS[plan]) * 0.09;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}
function pct(r: number): string {
  return (r * 100).toFixed(1) + "%";
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
export const gpPartnerDrawingsPlannerConfig: PremiumToolConfig = {
  id: "gp-partner-drawings-planner",
  topic: "gp-practice",
  title: "GP partner drawings planner",
  intro:
    "Translate your annual partnership profit share into sustainable monthly drawings after income tax, Class 4 National Insurance, NHS superannuation and any student loan are set aside.",
  fields: [
    {
      id: "profitShare",
      label: "Annual partnership profit share",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Your share of the practice's taxable profits for the year, before any drawings.",
    },
    {
      id: "superannuablePay",
      label: "Superannuable profit (for NHS pension)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Usually the same as your profit share for most GP partners. Use the NHS Superannuation Tiered Contribution calculator output if you have it.",
    },
    {
      id: "studentLoanPlan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1" },
        { value: "plan2", label: "Plan 2" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
      ],
    },
    {
      id: "taxReservePct",
      label: "Extra buffer to hold back (%)",
      type: "number",
      default: 0,
      min: 0,
      max: 30,
      step: 1,
      advanced: true,
      help: "Percentage of profit share to hold back over and above the computed tax/super set-aside. 0 means draw the full net; 5 means keep an extra 5% in the practice account as a cushion.",
    },
  ],

  compute({ values }): PremiumResult {
    const profitShare = Math.max(0, Number(values.profitShare) || 0);
    const superannuablePay = Math.max(0, Number(values.superannuablePay) || 0);
    const slPlan = (String(values.studentLoanPlan) || "none") as SLPlan;
    const bufferPct = Math.min(30, Math.max(0, Number(values.taxReservePct) || 0)) / 100;

    const { tax, pa, basicTax, higherTax, additionalTax } = calcIncomeTax(profitShare);
    const ni = calcClass4NI(profitShare);
    const { amount: superAmount, rate: superRate } = calcSuper(superannuablePay);
    const sl = calcStudentLoan(profitShare, slPlan);

    const buffer = profitShare * bufferPct;
    const totalSetAside = tax + ni + superAmount + sl + buffer;
    const netAnnual = Math.max(0, profitShare - totalSetAside);
    const monthlyDrawings = netAnnual / 12;

    const effectiveRate = profitShare > 0 ? (totalSetAside - buffer) / profitShare : 0;

    const breakdown: CalcResultRow[] = [
      { label: "Annual profit share", value: gbp(profitShare) },
      { label: "Personal allowance", value: gbp(pa) },
      { label: "Income tax (basic rate 20%)", value: gbp(basicTax) },
    ];

    if (higherTax > 0) {
      breakdown.push({ label: "Income tax (higher rate 40%)", value: gbp(higherTax) });
    }
    if (additionalTax > 0) {
      breakdown.push({ label: "Income tax (additional rate 45%)", value: gbp(additionalTax) });
    }

    breakdown.push(
      { label: "Total income tax", value: gbp(tax), strong: true },
      { label: "Class 4 National Insurance", value: gbp(ni) },
      {
        label: `NHS superannuation (${pct(superRate)} tier on ${gbp(superannuablePay)})`,
        value: gbp(superAmount),
      },
    );

    if (sl > 0) {
      breakdown.push({ label: "Student loan repayment", value: gbp(sl) });
    }

    breakdown.push(
      { label: "Total set-aside (tax + NI + super + loan)", value: gbp(tax + ni + superAmount + sl), strong: true },
    );

    if (buffer > 0) {
      breakdown.push({ label: `Extra buffer (${(bufferPct * 100).toFixed(0)}% of profit)`, value: gbp(buffer) });
      breakdown.push({ label: "Total held back (set-aside + buffer)", value: gbp(totalSetAside), strong: true });
    }

    breakdown.push(
      { label: "Net available for drawings (annual)", value: gbp(netAnnual), strong: true },
      { label: "Sustainable monthly drawings", value: gbp(monthlyDrawings), strong: true },
    );

    const headlineTone: "good" | "warn" =
      pa === 0 ? "warn" : "good";

    return {
      headline: {
        label: "Sustainable monthly drawings",
        value: gbp(monthlyDrawings),
        sub: `effective tax + super rate ${(effectiveRate * 100).toFixed(1)}% | annual net ${gbp(netAnnual)}`,
        tone: headlineTone,
      },
      breakdown,
      note: pa === 0
        ? "2026/27 basis. Your personal allowance is fully withdrawn above £125,140, creating an effective 60% marginal rate in the £100,000-£125,140 band. NHS superannuation is set aside separately from your drawings and paid directly to the scheme. Class 4 NI is 6% between £12,570 and £50,270 then 2% above. Tax is due in two payments on account (31 January and 31 July) plus a balancing payment; monthly drawings must leave cash available for those dates. These are estimates, not advice."
        : "2026/27 basis. Income tax is computed using the correct band arithmetic: personal allowance £12,570 (tapered above £100,000), basic band fixed at £37,700, higher band widening once the personal allowance tapers. NHS superannuation is set aside separately from your drawings and paid directly to the scheme. Class 4 NI is 6% between £12,570 and £50,270 then 2% above. Tax is due in two payments on account (31 January and 31 July) plus a balancing payment; monthly drawings must leave cash available for those dates. These are estimates, not advice.",
    };
  },

  explainer: {
    heading: "How the GP partner drawings planner works",
    paragraphs: [
      "GP partners are self-employed and receive a share of the practice's profits rather than a salary. Because income tax, National Insurance and NHS pension contributions are not deducted at source, partners draw money from the practice throughout the year and then face substantial lump-sum payments in January and July. The most common mistake is drawing too much and finding the tax bill cannot be met. This planner calculates the maximum amount you can sustainably draw each month by working out all the liabilities first and leaving them behind.",
      "Income tax is calculated on your profit share using the correct 2026/27 band structure. The personal allowance is £12,570 but tapers by £1 for every £2 of income above £100,000, disappearing entirely at £125,140. The basic-rate band is always fixed at £37,700 (20%), but the higher-rate band widens as the personal allowance shrinks, which is what creates the well-known 60% effective rate in the £100,000-£125,140 corridor. Above £125,140 the additional rate of 45% applies. Class 4 National Insurance is charged at 6% on profits between £12,570 and £50,270 and 2% on profits above that. Class 2 NIC is no longer a compulsory payment since 6 April 2024.",
      "NHS superannuation (the pension contribution to the NHS Pension Scheme) is charged on your superannuable profit at the tier rate that applies to your income band. The full profit falls into a single tier rather than being taxed marginally, so moving into the next tier changes the rate on the entire amount. Superannuation is not deductible for income tax purposes, which means your tax bill is calculated on the full profit share and the superannuation comes out of your net pay separately. This tool models both flows correctly: tax on the full profit, then super deducted afterwards to reach the true net.",
      "If you have a student loan, the repayment is calculated at 9% on profit above your plan threshold (Plan 1 £26,065 / Plan 2 £28,470 / Plan 4 £32,745 for Scottish borrowers). The optional buffer field lets you hold back an additional percentage of your profit share beyond the computed liabilities, which some partners use as a practice working-capital cushion or to absorb year-end adjustments.",
      "Worked example: a GP partner with a profit share of £120,000 and superannuable profit of £120,000, no student loan and no buffer. The personal allowance tapers to £2,570 (12,570 minus half of the £20,000 excess above £100,000). Income tax: £7,540 at basic rate plus £31,892 at higher rate, totalling £39,432. Class 4 NI: £2,262 at 6% plus £1,395 at 2%, totalling £3,657. NHS superannuation: 12.5% tier applies at £120,000, so £15,000 set aside. Net available for drawings: £120,000 minus £58,089 in liabilities = £61,911 a year, or £5,159 a month.",
    ],
  },
};
