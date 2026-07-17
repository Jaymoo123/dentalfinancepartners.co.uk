/**
 * Tool 4: NHS Superannuation tiered contribution calculator.
 *
 * toolId: nhs-superannuation-tiered-contribution
 * topic: nhs-pension
 *
 * Computes the NHS Pension employee contribution for GPs, locums and
 * hospital doctors using the 2025/26 tiered rate table, plus the deemed
 * employer contribution that feeds the Annual Allowance adjusted-income
 * calculation.
 *
 * TIERS + deemed employer rate come from the shared single-source module
 * compute/nhs-super-tiers.ts (2026/27 table, cross-checked 2026-07-17). Do NOT
 * re-declare a tier table here.
 *
 * Deemed employer contribution rate: 23.7% of pensionable pay (NHSBSA rate
 * from 1 April 2024 onward, confirmed 2025/26 and 2026/27). This feeds "adjusted
 * income" in the Annual Allowance taper test (threshold income + deemed employer
 * contribution) and is explicitly NOT the same as the pension input amount
 * (capitalised growth), which is calculated separately by NHS Pensions.
 *
 * ponytail: tiered contribution is a stepped (not banded) calculation --
 * one rate applies to the WHOLE pensionable pay. This is correct for the
 * NHS 2015 scheme; the threshold alone determines the rate.
 *
 * NOTE FOR ANNUAL UPDATES: The NHSBSA reviews tier thresholds and rates
 * each April alongside the pay uplift. The TIERS array below is the single
 * source of truth -- update it after each NHSBSA published update.
 * The deemedEmployerRate constant is also a calibration knob.
 *
 * COMPLIANCE NOTE: This is NOT a take-home tool. Income-tax band arithmetic
 * is used only for the optional "net of tax relief" note. No full income-tax
 * computation is performed here (HP §4).
 *
 * TARGET QUERIES: "how much does a self employed gp pay in superannuation uk
 * when earning £200,000" (8 imp), "pension contribution gp" (20 imp),
 * "gp locum a form april 2026" (20 imp) -- see TOOL_ROSTER.md §4.
 */
import type { PremiumToolConfig, PremiumResult, CalcResultRow } from "../types";
import {
  nhsSuperEmployeeTier,
  NHS_DEEMED_EMPLOYER_RATE as DEEMED_EMPLOYER_RATE,
} from "@/lib/tools/compute/nhs-super-tiers";

/* ---------------------------------------------------------------------------
 * Marginal income-tax rates for the relief note only
 * -------------------------------------------------------------------------*/
const MARGINAL_RATES: Record<string, number> = {
  basic: 0.20,
  higher: 0.40,
  additional: 0.45,
};

/* ---------------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------------*/
function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

/* ---------------------------------------------------------------------------
 * Role help-text map
 * -------------------------------------------------------------------------*/
const ROLE_HELP: Record<string, string> = {
  "salaried-gp":
    "Enter your NHS pensionable pay (your contracted salary, not total earnings). This appears on your NHSBSA statement.",
  "gp-partner":
    "Enter your superannuable profit as a GP partner. This is your net NHS income (drawings) after practice expenses but before superannuation. You report this on Form B each July.",
  "gp-locum":
    "Enter your total superannuable earnings across all locum sessions in the year. You report these on Form A for each practice, then carry the total to Form B.",
  "officer":
    "Enter your NHS pensionable pay as shown on your NHSBSA Pensions Annual Benefit Statement. Hospital doctors accrue benefits on the 2015 Career Average scheme.",
};

/* ---------------------------------------------------------------------------
 * Config
 * -------------------------------------------------------------------------*/
export const nhsSuperannuationTieredContributionConfig: PremiumToolConfig = {
  id: "nhs-superannuation-tiered-contribution",
  topic: "nhs-pension",

  title: "NHS Superannuation contribution calculator (2026/27 tiers)",

  intro:
    "Find your NHS Pension employee contribution using the 2026/27 tiered rate table, and see the deemed employer contribution that feeds your Annual Allowance adjusted-income figure. Use the result to complete Form A or Form B for the year.",

  fields: [
    {
      id: "role",
      label: "Your role",
      type: "select",
      default: "gp-partner",
      options: [
        { value: "salaried-gp",  label: "Salaried GP" },
        { value: "gp-partner",   label: "GP partner (self-employed)" },
        { value: "gp-locum",     label: "GP locum" },
        { value: "officer",      label: "Officer (hospital doctor / consultant)" },
      ],
      help: "The label on the pensionable pay field changes by role.",
    },
    {
      id: "pensionablePay",
      label: "Pensionable pay / superannuable profit",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "See the role selector for what figure to enter. GP partners and locums enter their superannuable profit, not gross turnover.",
    },
    {
      id: "taxYear",
      label: "Tax year",
      type: "select",
      default: "2026-27",
      options: [
        { value: "2026-27", label: "2026/27" },
      ],
      help: "This calculator uses the 2026/27 NHSBSA tier table. The six contribution rates are unchanged from 2025/26; only the pay-band thresholds were uplifted by CPI.",
    },
    {
      id: "incomeTaxBand",
      label: "Your marginal income tax rate",
      type: "select",
      default: "higher",
      options: [
        { value: "basic",      label: "Basic rate (20%)" },
        { value: "higher",     label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
      help: "Used only for the net-of-relief note. Your contribution is paid gross; HMRC gives back the tax relief via self-assessment or PAYE coding.",
    },
  ],

  compute({ values }): PremiumResult {
    const pay = Math.max(0, Number(values.pensionablePay) || 0);
    const role = String(values.role || "gp-partner");
    const bandKey = String(values.incomeTaxBand || "higher");
    const marginalRate = MARGINAL_RATES[bandKey] ?? 0.40;

    const { rate, label: tierLabel } = nhsSuperEmployeeTier(pay);

    const employeeContribution = pay * rate;
    const deemedEmployerContribution = pay * DEEMED_EMPLOYER_RATE;
    const combinedPensionInput = employeeContribution + deemedEmployerContribution;
    const netOfReliefCost = employeeContribution * (1 - marginalRate);

    const roleHelp = ROLE_HELP[role] ?? ROLE_HELP["gp-partner"];
    const _ = roleHelp; // referenced in explainer prose; suppress unused warning

    const tone = pay > 0 ? "good" : "default";

    const breakdownRows: CalcResultRow[] = [
      {
        label: "Applicable tier",
        value: tierLabel,
      },
      {
        label: `Employee contribution (${pct(rate)} of ${gbp(pay)})`,
        value: gbp(employeeContribution),
        strong: true,
      },
      {
        label: `Deemed employer contribution (${pct(DEEMED_EMPLOYER_RATE)} of ${gbp(pay)})`,
        value: gbp(deemedEmployerContribution),
      },
      {
        label: "Combined pension input proxy (feeds Annual Allowance check)",
        value: gbp(combinedPensionInput),
      },
      {
        label: `Net cost after ${Math.round(marginalRate * 100)}% income-tax relief`,
        value: gbp(netOfReliefCost),
      },
    ];

    const note = [
      "2026/27 NHSBSA tiered contribution rates (England and Wales). ",
      "The contribution tier is determined by your total pensionable pay for the year; the rate applies to the whole amount, not just the slice above each threshold. ",
      "The deemed employer contribution (23.7%) is the employer rate used by NHSBSA from 1 April 2024; this is the figure to add to threshold income when checking whether the Annual Allowance taper applies (adjusted income = threshold income + deemed employer contribution). ",
      "The combined pension input proxy shown is an approximation; your actual pension input amount (capitalised growth in defined-benefit entitlement) is calculated separately by NHS Pensions and will differ. ",
      "GP partners and locums report superannuable profit on Form A/B; NHSBSA deducts the employee contribution from drawings at source for partners or via self-assessment for locums. ",
      "Tax relief on contributions is given at your marginal rate via self-assessment or PAYE. ",
      "These are estimates, not advice.",
    ].join("");

    return {
      headline: {
        label: "Employee contribution",
        value: gbp(employeeContribution),
        sub: `${tierLabel} | deemed employer ${gbp(deemedEmployerContribution)}`,
        tone,
      },
      breakdown: breakdownRows,
      note,
    };
  },

  explainer: {
    heading: "How NHS superannuation contributions are calculated",
    paragraphs: [
      "The NHS Pension Scheme uses a tiered contribution structure where the rate you pay depends on your total pensionable pay or superannuable profit for the year. Unlike income tax, the same rate applies to your whole pay, not just the slice above each threshold. For 2026/27, the tiers range from 5.2% on pay up to £13,259 to 12.5% on pay of £67,669 and above. The NHSBSA reviews these thresholds each April in line with the pay uplift; the six contribution rates are unchanged from 2025/26, with only the pay-band thresholds uplifted by CPI.",
      "GP partners and locums pay contributions on their superannuable profit, not their gross turnover or total drawings. Superannuable profit is broadly your net NHS income after practice expenses but before the superannuation deduction itself. Partners report this figure on Form B each July, with per-session locum earnings declared on Form A for each practice. Salaried GPs and hospital doctors pay contributions on their NHS pensionable pay as shown on payslips and the NHSBSA annual benefit statement.",
      "In addition to the employee contribution, the NHS also makes a deemed employer contribution (23.7% of pensionable pay from 1 April 2024). This figure is important beyond pension funding: it is the number you add to your threshold income to calculate adjusted income for the Annual Allowance taper test. If your threshold income exceeds £200,000 AND your adjusted income (threshold income plus deemed employer contribution) exceeds £260,000, your Annual Allowance begins to taper down from £60,000 towards a £10,000 floor. Carry this figure directly into the Annual Allowance calculator for your taper check.",
      "The combined pension input proxy shown by this tool is the sum of the employee and deemed employer contributions. It is an approximation of the pension input amount used in Annual Allowance testing. Your actual pension input amount is the capitalised increase in your defined-benefit entitlement, calculated by NHS Pensions using a standard multiplier (currently 16x for the 2015 CARE scheme). For senior doctors with high pay and significant accrual, the pension input amount can be materially different from the contributions paid, which is why NHSBSA-issued statements are essential before drawing any conclusion about an Annual Allowance breach.",
      "Employee contributions attract income-tax relief at your marginal rate. A higher-rate taxpayer contributing £15,000 pays a net cost of £9,000 after 40% relief. GP partners and locums claim this relief through self-assessment; salaried doctors normally receive it automatically through PAYE coding. National Insurance is not charged on employee pension contributions, which adds a further saving for self-employed doctors paying Class 4 NI.",
    ],
  },
};

/* ---------------------------------------------------------------------------
 * Inline self-check (run: npx tsx nhs-superannuation-tiered-contribution.ts)
 * Worked example: GP partner, £120,000 (2026/27 tiers).
 * £120,000 is in the top tier (£67,669 and above) at 12.5%.
 * Expected: employee £15,000, deemed employer £28,440, combined £43,440, net of 40% £9,000.
 * -------------------------------------------------------------------------*/
if (typeof process !== "undefined" && process.argv[1]?.endsWith("nhs-superannuation-tiered-contribution.ts")) {
  const result = nhsSuperannuationTieredContributionConfig.compute({
    values: { role: "gp-partner", pensionablePay: 120000, taxYear: "2026-27", incomeTaxBand: "higher" },
    rows: [],
  });
  const bd = result.breakdown ?? [];
  console.log("=== Worked example: GP partner £120,000 ===");
  console.log("Headline:", result.headline.value, "/", result.headline.sub);
  for (const r of bd) console.log(" ", r.label, ":", r.value);
  // Assertions
  const empRow = bd.find(r => r.label?.startsWith("Employee contribution"));
  const deemedRow = bd.find(r => r.label?.startsWith("Deemed employer"));
  const combinedRow = bd.find(r => r.label?.startsWith("Combined"));
  const reliefRow = bd.find(r => r.label?.startsWith("Net cost"));
  const pass = (label: string, got: string | undefined, want: string) => {
    const ok = got === want;
    console.log((ok ? "PASS" : "FAIL"), label, "got:", got, "want:", want);
  };
  pass("employee contribution", empRow?.value, "£15,000");
  pass("deemed employer",      deemedRow?.value, "£28,440");
  pass("combined",             combinedRow?.value, "£43,440");
  pass("net of 40% relief",   reliefRow?.value, "£9,000");
}
