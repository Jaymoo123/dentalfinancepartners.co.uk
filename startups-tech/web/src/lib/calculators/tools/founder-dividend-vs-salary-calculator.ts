import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// ---------------------------------------------------------------------------
// HP-anchored constants (do not change without updating house_positions.md)
// ---------------------------------------------------------------------------
// HP21 – Corporation Tax
const CT_SMALL_RATE = 0.19;       // profits <= £50,000
const CT_MAIN_RATE  = 0.25;       // profits >= £250,000
const CT_SMALL_LIMIT  = 50_000;
const CT_MAIN_LIMIT   = 250_000;

// HP22 – Dividend tax 2026/27 (FA 2026 s.4)
const DIV_ALLOWANCE   = 500;
const DIV_RATE_BASIC  = 0.1075;
const DIV_RATE_HIGHER = 0.3575;
const DIV_RATE_ADDL   = 0.3935;

// HP23 – Employer NIC
const EMP_NIC_SECONDARY_THRESHOLD = 5_000;
const EMP_NIC_RATE = 0.15;
const EA_MAX = 10_500;  // Employment Allowance max (N/A for solo directors)

// HP30 – Income tax 2026/27 (rest of UK)
const PA              = 12_570;   // personal allowance
const BASIC_LIMIT     = 50_270;   // top of basic rate band
const HIGHER_LIMIT    = 125_140;  // personal allowance fully tapered
const BASIC_RATE      = 0.20;
const HIGHER_RATE     = 0.40;
const ADDL_RATE       = 0.45;
const PA_TAPER_FLOOR  = 100_000;  // PA begins tapering at £100k

// HP31 – Employee NIC 2026/27
const EE_NIC_PT  = 12_570;   // primary threshold = primary threshold
const EE_NIC_UEL = 50_270;   // upper earnings limit
const EE_NIC_MAIN = 0.08;
const EE_NIC_UPPER = 0.02;

// HP32 – LEL 2026/27 (qualifying year floor)
const LEL = 6_708;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

/** Marginal CT rate using marginal relief formula (HP21). */
function marginalCtRate(profit: number): number {
  if (profit <= 0)           return CT_SMALL_RATE;
  if (profit <= CT_SMALL_LIMIT)  return CT_SMALL_RATE;
  if (profit >= CT_MAIN_LIMIT)   return CT_MAIN_RATE;
  // Marginal relief: effective rate tapers between 19% and 25%
  // HMRC formula: tax = main_rate * profit - MRF * (upper - profit)
  // MRF = 3/200 => effective rate = (25% * profit - 3/200 * (250k - profit)) / profit
  const mrf = 3 / 200;
  return (CT_MAIN_RATE * profit - mrf * (CT_MAIN_LIMIT - profit)) / profit;
}

/** Effective average CT rate on a given profit level (same formula, returns total tax). */
function ctTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_LIMIT) return profit * CT_SMALL_RATE;
  if (profit >= CT_MAIN_LIMIT)  return profit * CT_MAIN_RATE;
  const mrf = 3 / 200;
  return CT_MAIN_RATE * profit - mrf * (CT_MAIN_LIMIT - profit);
}

/** Effective personal allowance after £100k taper (HP30). */
function effectivePa(totalIncome: number): number {
  if (totalIncome <= PA_TAPER_FLOOR) return PA;
  const taper = Math.floor((totalIncome - PA_TAPER_FLOOR) / 2);
  return Math.max(0, PA - taper);
}

/** Income tax on a given income, HP30. */
function incomeTax(income: number): number {
  const pa = effectivePa(income);
  const taxable = Math.max(0, income - pa);
  if (taxable <= 0) return 0;
  const inBasic  = Math.max(0, Math.min(taxable, BASIC_LIMIT - pa));
  const inHigher = Math.max(0, Math.min(taxable - inBasic, HIGHER_LIMIT - BASIC_LIMIT));
  const inAddl   = Math.max(0, taxable - inBasic - inHigher);
  return inBasic * BASIC_RATE + inHigher * HIGHER_RATE + inAddl * ADDL_RATE;
}

/** Employee NIC on a given salary, HP31. */
function employeeNic(salary: number): number {
  const inMain  = Math.max(0, Math.min(salary, EE_NIC_UEL) - EE_NIC_PT);
  const inUpper = Math.max(0, salary - EE_NIC_UEL);
  return inMain * EE_NIC_MAIN + inUpper * EE_NIC_UPPER;
}

/** Employer NIC on a given salary, HP23. Returns raw cost BEFORE any EA offset. */
function employerNicRaw(salary: number): number {
  return Math.max(0, salary - EMP_NIC_SECONDARY_THRESHOLD) * EMP_NIC_RATE;
}

/**
 * Dividend income tax (HP22). otherIncome places dividends in the right band.
 * Returns personal tax on dividends after the £500 allowance.
 */
function dividendTax(dividends: number, otherIncome: number): number {
  if (dividends <= 0) return 0;
  // Total income to determine band placement
  const totalIncome = otherIncome + dividends;
  const pa = effectivePa(totalIncome);
  // Non-dividend income fills bands first
  const nonDivTaxable = Math.max(0, otherIncome - pa);
  const basicUsed    = Math.min(nonDivTaxable, BASIC_LIMIT - pa);
  const higherUsed   = Math.min(Math.max(0, nonDivTaxable - basicUsed), HIGHER_LIMIT - BASIC_LIMIT);

  const basicRemaining  = Math.max(0, (BASIC_LIMIT - pa) - basicUsed);
  const higherRemaining = Math.max(0, (HIGHER_LIMIT - BASIC_LIMIT) - higherUsed);

  // Apply dividend allowance
  const divTaxable = Math.max(0, dividends - DIV_ALLOWANCE);
  if (divTaxable <= 0) return 0;

  // Slice dividends across remaining band space
  const inBasic  = Math.min(divTaxable, basicRemaining);
  const inHigher = Math.min(divTaxable - inBasic, higherRemaining);
  const inAddl   = divTaxable - inBasic - inHigher;
  return inBasic * DIV_RATE_BASIC + inHigher * DIV_RATE_HIGHER + inAddl * DIV_RATE_ADDL;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const founderDividendVsSalaryCalculator: GenericTool = {
  kind: "generic",
  slug: "founder-dividend-vs-salary-calculator",
  name: "Founder Dividend vs Salary Calculator 2026/27",
  category: "Founder Tax and Extraction",
  oneLiner:
    "Compare the combined tax cost of salary versus dividends for a UK founder-director in 2026/27, with the Employment Allowance solo-director trap built in.",
  metaTitle: "Founder Dividend vs Salary Calculator 2026/27",
  metaDescription:
    "Compare salary vs dividend extraction for UK founder-directors. 2026/27 rates: CT 19%/25%, dividend 10.75%/35.75%/39.35%, NIC 15% above £5,000. Solo director EA trap shown.",
  intro:
    "Enter what you want to extract and your company profit. The tool computes the combined tax (Corporation Tax plus personal tax) for both the salary+dividend route and an all-salary route, with the Employment Allowance solo-director exclusion applied correctly. Outputs are a general illustration for 2026/27, not personal tax advice.",
  embedHeight: 520,
  fields: [
    {
      id: "targetExtraction",
      label: "Target extraction this year (£)",
      type: "currency",
      default: 50_000,
      min: 0,
      help: "Total amount you want to take from the company (salary + dividends combined).",
    },
    {
      id: "companyProfit",
      label: "Company profit before extraction (£)",
      type: "currency",
      default: 80_000,
      min: 0,
      help: "Accounting profit before any salary or dividends are paid. Used to compute CT and available dividend pool.",
    },
    {
      id: "soloDirector",
      label: "Sole director/employee?",
      type: "toggle",
      default: true,
      help: "If you are the only employee paid above the secondary NIC threshold, the Employment Allowance does NOT apply.",
    },
    {
      id: "otherIncome",
      label: "Other personal income this year (£)",
      type: "currency",
      default: 0,
      min: 0,
      advanced: true,
      help: "Income from other sources (excluding this extraction). Places dividends and salary in the correct tax bands.",
    },
    {
      id: "scotland",
      label: "Scottish taxpayer?",
      type: "toggle",
      default: false,
      help: "Scottish income tax has different bands on the salary line. The tool flags this; CT and dividend rates are UK-wide.",
    },
  ],

  compute(v) {
    const T        = Math.max(0, Number(v.targetExtraction));
    const P        = Math.max(0, Number(v.companyProfit));
    const solo     = Boolean(v.soloDirector);
    const other    = Math.max(0, Number(v.otherIncome));
    const scotland = Boolean(v.scotland);

    // -----------------------------------------------------------------------
    // Recommended salary: set at £12,570 (personal allowance = primary threshold)
    // to preserve NIC qualifying year (HP32/HP31) while keeping income tax
    // on the salary itself at zero. This is the standard founder-director
    // starting point; below this, a salary at the LEL (£6,708) is also viable
    // if the founder wants to minimise employer NIC.
    // ponytail: salary pinned at PT (£12,570); optimal tuning deferred to adviser.
    // -----------------------------------------------------------------------
    const salary = Math.min(T, PA); // £12,570 (PT = PA for 2026/27, HP30/HP31)

    // Employer NIC on that salary (HP23)
    const erNicRaw = employerNicRaw(salary);
    const eaOffset = solo ? 0 : Math.min(erNicRaw, EA_MAX);
    const erNic    = erNicRaw - eaOffset;

    // CT saving from salary + employer NIC being deductible (HP21)
    const salaryDeductible = salary + erNic;
    const taxableAfterSalary = Math.max(0, P - salaryDeductible);
    const ctAfterSalary = ctTax(taxableAfterSalary);
    const ctBeforeAny   = ctTax(P);
    const ctSaving      = ctBeforeAny - ctAfterSalary; // positive = less CT due to salary

    // Post-CT profit available for dividends (HP21 — dividends paid from post-CT profit)
    const postCtProfit  = Math.max(0, taxableAfterSalary - ctAfterSalary);

    // Remaining extraction as dividends (capped at distributable pool)
    const wantedDividends = Math.max(0, T - salary);
    const lowProfit = postCtProfit < wantedDividends;
    const actualDividends = lowProfit ? postCtProfit : wantedDividends;

    // Employee NIC on salary (HP31)
    const eeNic = employeeNic(salary);

    // Income tax on salary (HP30)
    const itOnSalary = incomeTax(salary + other) - incomeTax(other);

    // Dividend tax (HP22)
    const divTax = dividendTax(actualDividends, salary + other);

    // -----------------------------------------------------------------------
    // Salary+dividend route total tax (personal + company)
    // -----------------------------------------------------------------------
    const splitPersonalTax = Math.round(itOnSalary + eeNic + divTax);
    const splitCompanyTax  = Math.round(ctAfterSalary + erNic);
    const splitTotalTax    = splitPersonalTax + splitCompanyTax;

    // -----------------------------------------------------------------------
    // All-salary comparison route (HP21/HP30/HP31/HP23)
    // -----------------------------------------------------------------------
    const allSalaryErNicRaw = employerNicRaw(T);
    const allSalaryEaOffset = solo ? 0 : Math.min(allSalaryErNicRaw, EA_MAX);
    const allSalaryErNic    = allSalaryErNicRaw - allSalaryEaOffset;
    const allSalaryDeductible  = T + allSalaryErNic;
    const allSalaryTaxableP    = Math.max(0, P - allSalaryDeductible);
    const allSalaryCt          = ctTax(allSalaryTaxableP);
    const allSalaryItAndNic    = incomeTax(T + other) - incomeTax(other) + employeeNic(T);
    const allSalaryTotalTax    = Math.round(allSalaryItAndNic + allSalaryErNic + allSalaryCt);

    const saving = allSalaryTotalTax - splitTotalTax;

    // -----------------------------------------------------------------------
    // Output
    // -----------------------------------------------------------------------
    const headline = lowProfit
      ? {
          label: "Low-profit warning",
          value: gbp(splitTotalTax),
          sub: `Company post-CT profit (${gbp(Math.round(postCtProfit))}) cannot fund the full extraction of ${gbp(T)}. Dividends capped. Consider banking trading losses.`,
          tone: "warn" as const,
        }
      : {
          label: "Combined tax: salary + dividend route",
          value: gbp(splitTotalTax),
          sub:
            saving > 0
              ? `Saves ${gbp(saving)} vs all-salary (${gbp(allSalaryTotalTax)})`
              : `All-salary route: ${gbp(allSalaryTotalTax)}`,
        };

    const rows = [
      { label: "Recommended salary", value: gbp(salary) },
      { label: "Dividends paid", value: gbp(Math.round(actualDividends)) },
      { label: `Employer NIC (15% above £5,000${solo ? ", EA excluded (sole director)" : ", EA offsets up to £10,500"})`, value: gbp(Math.round(erNic)) },
      { label: "CT on company profit after salary", value: gbp(Math.round(ctAfterSalary)) },
      { label: "Income tax on salary (personal)", value: gbp(Math.round(itOnSalary)) },
      { label: "Employee NIC on salary (personal)", value: gbp(Math.round(eeNic)) },
      { label: "Dividend tax after £500 allowance (personal)", value: gbp(Math.round(divTax)) },
      { label: "TOTAL TAX: salary + dividend route", value: gbp(splitTotalTax), strong: true },
      { label: "TOTAL TAX: all-salary route (comparison)", value: gbp(allSalaryTotalTax), strong: true },
    ];

    let note =
      "This is a general illustration for 2026/27 based on the figures you entered, not personal tax advice." +
      " Your optimal split depends on your other income, your company's profit, whether you are the sole director," +
      " and your longer-term exit plans. Speak to us to set it up correctly.";

    if (scotland) {
      note =
        "Scottish income tax has different bands on the salary line. The figures above use rest-of-UK rates." +
        " If you are a Scottish taxpayer, your salary income tax will differ. The CT and dividend figures are UK-wide and unaffected." +
        " Speak to us for a Scotland-specific extraction plan. " + note;
    }

    if (solo && erNic > 0) {
      note =
        `Solo-director Employment Allowance trap: the £${erNic.toLocaleString()} employer NIC shown is a real cash cost` +
        " that the £10,500 Employment Allowance does NOT cover for a sole-director company." +
        " A company with at least one non-director employee above the secondary threshold would qualify for EA and pay no employer NIC up to £10,500. " +
        note;
    }

    return { headline, rows, note };
  },

  explainer: {
    heading: "How the salary vs dividend calculation works",
    paragraphs: [
      "Founder-directors of UK limited companies typically pay a low salary (at or around the personal allowance) and draw the balance as dividends. The salary is deductible for Corporation Tax; dividends are paid from post-CT profit and are not deductible. Getting this asymmetry right is the core of the maths.",
      "For 2026/27, CT is 19% on profits up to £50,000, rising to 25% above £250,000 with marginal relief between. Dividend tax rates are 10.75% (basic), 35.75% (upper) and 39.35% (additional), with a £500 allowance (FA 2026 s.4). Employer NIC is 15% above a £5,000 secondary threshold.",
      "The critical wedge for founders: a company whose only employee paid above the secondary threshold is a director cannot claim the Employment Allowance. That means employer NIC on even a modest director salary is a real cash cost, not an offset. The toggle above applies this rule correctly.",
      "If you hold EMI options or are planning a BADR exit (18% from April 2026), over-optimising current extraction can affect the exit. Use the EMI vs unapproved calculator to model the share-scheme interaction.",
      "Pre-revenue or low-profit companies: if the company does not have distributable post-CT profit, dividends above that amount are not lawful. The tool caps dividends and flags the low-profit case. Filing losses now banks them against future profits.",
    ],
  },

  faqs: [
    {
      question: "What is the best salary/dividend split for a founder in 2026/27?",
      answer:
        "The most tax-efficient split for a sole-director company is usually a salary at the personal allowance (£12,570) to avoid income tax and employee NIC on the salary itself, then dividends for the balance. However, that salary still triggers £1,050 employer NIC (£12,570 minus £5,000 = £7,570 at 15%) if you are the sole director, because the Employment Allowance does not apply. The right answer depends on your profit level, other income, and exit plans.",
    },
    {
      question: "Can a single-director company claim the Employment Allowance?",
      answer:
        "No. If the only employee paid above the secondary NIC threshold is also the director, the company is excluded from the Employment Allowance. This is one of the most common gaps in generic optimiser tools.",
    },
    {
      question: "What are the 2026/27 dividend tax rates?",
      answer:
        "10.75% (basic rate), 35.75% (upper rate) and 39.35% (additional rate), after a £500 dividend allowance. These are the FA 2026 rates in force from 6 April 2026.",
    },
    {
      question: "What if my company has no profit yet?",
      answer:
        "If the company has no distributable post-CT profit, dividends above that amount are not lawful. The calculator caps them and flags the constraint. File the CT return to bank trading losses against future profits.",
    },
    {
      question: "Do Scottish founders pay a different rate on salary?",
      answer:
        "Yes. Scottish income tax has different bands on the salary line. Toggle the Scotland flag above to see the warning. CT and dividend rates are UK-wide and unaffected.",
    },
    {
      question: "How do EMI options affect my extraction plan?",
      answer:
        "EMI shares qualify for Business Asset Disposal Relief at 18% on gains up to a £1m lifetime limit. Over-optimising current salary or dividend extraction can affect your marginal rate at exit. See the EMI vs unapproved calculator for the share-scheme comparison.",
    },
  ],

  related: [
    { label: "EMI vs Unapproved Options Calculator", href: "/calculators/emi-vs-unapproved-calculator" },
    { label: "Core Compliance Services", href: "/services/core-compliance" },
    { label: "Fractional CFO for Scaling Founders", href: "/services/fractional-cfo" },
    { label: "For Pre-Seed Founders", href: "/for/pre-seed-founders" },
  ],
};
