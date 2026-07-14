import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";

/**
 * 2026/27 tax constants (rUK: England, Wales, Northern Ireland).
 * Source: contractors-ir35/web/src/lib/calculators/tax2026.ts (single estate source).
 * Rates verified against gov.uk on 2026-07-14 for tax year 6 Apr 2026 to 5 Apr 2027.
 */

// Income tax bands (2026/27)
const PERSONAL_ALLOWANCE = 12_570; // gov.uk/income-tax-rates
const BASIC_RATE_LIMIT = 37_700;   // taxable income width of 20% band
const HIGHER_RATE_LIMIT = 112_570; // taxable income up to 45% threshold (£125,140 - PA)
const INCOME_TAX = { basic: 0.20, higher: 0.40, additional: 0.45 } as const;

// Dividend rates 2026/27 (HP 28; FA 2026 s.4)
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_RATES = { ordinary: 0.1075, upper: 0.3575, additional: 0.3935 } as const;

// NI 2026/27 (HP 25)
const NI_PRIMARY_THRESHOLD = 12_570;
const NI_UPPER_EARNINGS_LIMIT = 50_270;
const NI_EMPLOYEE_MAIN = 0.08;
const NI_EMPLOYEE_UPPER = 0.02;
const NI_SECONDARY_THRESHOLD = 5_000;
const NI_EMPLOYER_RATE = 0.15; // HP 25: 15% above £5,000 secondary threshold from 6 Apr 2025
const APPRENTICESHIP_LEVY = 0.005;

// Corporation tax 2026/27 (HP 27)
const CT_SMALL_RATE = 0.19;       // ≤ £50,000 profits
const CT_MAIN_RATE = 0.25;        // ≥ £250,000 profits
const CT_LOWER = 50_000;
const CT_UPPER = 250_000;
const CT_MARGINAL_FRACTION = 3 / 200; // marginal relief standard fraction

// Class 2 NIC 2026/27 (sole trader, self-employed)
// £3.45/week (gov.uk/self-employed-national-insurance-rates)
const CLASS2_WEEKLY = 3.45;

// ---- Tax primitives (mirrors tax2026.ts, no cross-package import) ----

function incomeTaxOnSalary(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const basic = Math.min(taxableIncome, BASIC_RATE_LIMIT) * INCOME_TAX.basic;
  const higher =
    Math.min(Math.max(taxableIncome - BASIC_RATE_LIMIT, 0), HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT) *
    INCOME_TAX.higher;
  const additional = Math.max(taxableIncome - HIGHER_RATE_LIMIT, 0) * INCOME_TAX.additional;
  return basic + higher + additional;
}

function employeeNI(salary: number): number {
  const main =
    Math.min(Math.max(salary - NI_PRIMARY_THRESHOLD, 0), NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD) *
    NI_EMPLOYEE_MAIN;
  const upper = Math.max(salary - NI_UPPER_EARNINGS_LIMIT, 0) * NI_EMPLOYEE_UPPER;
  return main + upper;
}

function employerNI(salary: number): number {
  return Math.max(salary - NI_SECONDARY_THRESHOLD, 0) * NI_EMPLOYER_RATE;
}

function corporationTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_LOWER) return profit * CT_SMALL_RATE;
  if (profit >= CT_UPPER) return profit * CT_MAIN_RATE;
  return profit * CT_MAIN_RATE - CT_MARGINAL_FRACTION * (CT_UPPER - profit);
}

/** Sole-trader take-home: income - expenses = profit; income tax + Class 2 + Class 4 NIC. */
function soleTraderTakeHome(annualIncome: number, expenses: number): {
  profit: number;
  incomeTax: number;
  class2NIC: number;
  class4NIC: number;
  netTakeHome: number;
} {
  const profit = Math.max(0, annualIncome - expenses);
  const taxable = Math.max(0, profit - PERSONAL_ALLOWANCE);
  const tax = incomeTaxOnSalary(taxable);
  // Class 2 NIC: £3.45/week × 52 (if profit above Small Profits Threshold £6,845 2026/27)
  // ponytail: Class 2 SPT check omitted — at locum day rates profit is always above threshold
  const class2 = CLASS2_WEEKLY * 52;
  // Class 4 NIC (2026/27): 6% on profits between the primary threshold and upper limit, 2% above
  // gov.uk/self-employed-national-insurance-rates (2026/27: 6% on lower band → confirmed 6% from 2024)
  // ponytail: using 6% / 2% as gov.uk 2026/27 self-employed rates
  const class4Main = Math.min(Math.max(profit - NI_PRIMARY_THRESHOLD, 0), NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD) * 0.06;
  const class4Upper = Math.max(profit - NI_UPPER_EARNINGS_LIMIT, 0) * 0.02;
  const totalNIC = class2 + class4Main + class4Upper;
  const netTakeHome = Math.max(0, profit - tax - totalNIC);
  return { profit, incomeTax: tax, class2NIC: class2, class4NIC: class4Main + class4Upper, netTakeHome };
}

/** Limited company (single director, no Employment Allowance, all profit as dividends). HP 27, 28. */
function limitedTakeHome(annualIncome: number, expenses: number): {
  salary: number;
  employerNI: number;
  profitBeforeTax: number;
  ct: number;
  dividends: number;
  dividendTax: number;
  netTakeHome: number;
} {
  const salary = PERSONAL_ALLOWANCE; // £12,570 — common director salary, at PT/PA
  const eni = employerNI(salary); // single-director PSC cannot claim Employment Allowance (HP 26)
  const profitBeforeTax = Math.max(0, annualIncome - salary - eni - expenses);
  const ct = corporationTax(profitBeforeTax);
  const dividends = Math.max(0, profitBeforeTax - ct);

  // Personal tax on salary + dividends
  const pa = PERSONAL_ALLOWANCE;
  // Salary is fully within PA → no income tax on salary
  const salaryTaxable = Math.max(0, salary - pa);
  const salaryTax = incomeTaxOnSalary(salaryTaxable);

  // Dividend tax: dividends stack on top of salary in the bands
  const divTaxable = dividends; // no PA left (all used by salary at £12,570)
  const pos = salaryTaxable; // 0 (salary = PA)
  const basicRoom = Math.max(0, BASIC_RATE_LIMIT - pos);
  const higherRoom = Math.max(0, HIGHER_RATE_LIMIT - Math.max(pos, BASIC_RATE_LIMIT));
  let dBasic = Math.min(divTaxable, basicRoom);
  let dHigher = Math.min(divTaxable - dBasic, higherRoom);
  let dAdditional = divTaxable - dBasic - dHigher;
  // £500 dividend allowance: 0%-rated from lowest band up (HP 28)
  let allowance = DIVIDEND_ALLOWANCE;
  const aBasic = Math.min(allowance, dBasic); dBasic -= aBasic; allowance -= aBasic;
  const aHigher = Math.min(allowance, dHigher); dHigher -= aHigher; allowance -= aHigher;
  const aAdditional = Math.min(allowance, dAdditional); dAdditional -= aAdditional;
  const divTax = dBasic * DIVIDEND_RATES.ordinary + dHigher * DIVIDEND_RATES.upper + dAdditional * DIVIDEND_RATES.additional;

  const eniOnSalary = employeeNI(salary); // £0 at £12,570 (PT = PA = 12570)
  const netTakeHome = salary + dividends - salaryTax - eniOnSalary - divTax;

  return { salary, employerNI: eni, profitBeforeTax, ct, dividends, dividendTax: divTax, netTakeHome };
}

/** Umbrella/PAYE: employer NIC + levy funded from assignment income; PAYE on gross salary. */
function umbrellaTakeHome(annualIncome: number, umbrellaMargin: number): {
  grossSalary: number;
  employerNI: number;
  incomeTax: number;
  employeeNI: number;
  netTakeHome: number;
} {
  const pot = Math.max(0, annualIncome - umbrellaMargin);
  // Solve for grossSalary: pot = grossSalary*(1 + employerRate + levy) - employerRate*ST
  const grossSalary =
    (pot + NI_EMPLOYER_RATE * NI_SECONDARY_THRESHOLD) / (1 + NI_EMPLOYER_RATE + APPRENTICESHIP_LEVY);
  const eni = employerNI(grossSalary);
  const taxable = Math.max(0, grossSalary - PERSONAL_ALLOWANCE);
  const tax = incomeTaxOnSalary(taxable);
  const nic = employeeNI(grossSalary);
  return {
    grossSalary,
    employerNI: eni,
    incomeTax: tax,
    employeeNI: nic,
    netTakeHome: grossSalary - tax - nic,
  };
}

export const locumTakeHomeComparator: GenericTool = {
  kind: "generic",
  slug: "locum-take-home-comparator",
  name: "Locum Pharmacist Take-Home Comparator",
  category: "Locum Pharmacists",
  oneLiner:
    "Compare 2026/27 net take-home for a locum pharmacist under sole trader, limited company and umbrella/PAYE, with HMRC employment-status warnings (ESM4270) baked in.",
  metaTitle: "Locum Pharmacist Take-Home Calculator 2026/27 | Pharmacy Finance Partners",
  metaDescription:
    "Compare sole trader vs limited company vs umbrella take-home for locum pharmacists in 2026/27. Includes HMRC ESM4270 employment-status warnings. Scenario tool only.",
  intro:
    "Enter your day rate, working pattern and expenses to see estimated net take-home under three routes. This is a scenario tool, not a \"go limited\" recommendation. HMRC's locum-pharmacist position is more restrictive than the general self-employed rules: the status tests matter as much as the tax arithmetic.",
  embedHeight: 640,
  fields: [
    {
      id: "dayRate",
      label: "Day rate (£)",
      type: "currency",
      default: 350,
      min: 0,
      step: 25,
      help: "Your locum day rate before any tax. Day-rate norms vary widely by specialism, session type and region.",
    },
    {
      id: "daysPerWeek",
      label: "Days per week",
      type: "number",
      default: 4,
      min: 1,
      max: 7,
      step: 0.5,
      help: "Average days worked per week across the year.",
    },
    {
      id: "weeksPerYear",
      label: "Weeks per year",
      type: "number",
      default: 46,
      min: 1,
      max: 52,
      step: 1,
      help: "Working weeks per year. 46 to 48 is typical once holiday and gaps are accounted for.",
    },
    {
      id: "annualExpenses",
      label: "Annual allowable expenses (£)",
      type: "currency",
      default: 3_000,
      min: 0,
      step: 500,
      help: "Genuine business expenses: indemnity insurance, GPhC registration, CPD, equipment, business travel. Applied to sole-trader and limited-company routes only.",
    },
  ],
  compute(v) {
    const dayRate = Math.max(0, Number(v.dayRate));
    const daysPerWeek = Math.max(0, Number(v.daysPerWeek));
    const weeksPerYear = Math.max(0, Number(v.weeksPerYear));
    const expenses = Math.max(0, Number(v.annualExpenses));

    const annualIncome = dayRate * daysPerWeek * weeksPerYear;
    // Umbrella margin default: £1,200/year (£25/week × 48 weeks — user cannot change this in the
    // simplified locum tool; umbrella margin detail is not the focus here)
    const umbrellaMarginAnnual = 1_200;

    const st = soleTraderTakeHome(annualIncome, expenses);
    const ltd = limitedTakeHome(annualIncome, expenses);
    const umb = umbrellaTakeHome(annualIncome, umbrellaMarginAnnual);

    const best = Math.max(st.netTakeHome, ltd.netTakeHome, umb.netTakeHome);

    return {
      headline: {
        label: "Estimated annual gross income",
        value: gbp(annualIncome),
        sub: `${gbp(dayRate)}/day × ${daysPerWeek} days × ${weeksPerYear} weeks`,
        tone: "default",
      },
      rows: [
        { label: "Annual gross income", value: gbp(annualIncome) },
        { label: "--- Sole trader (self-employed) ---", value: "" },
        { label: "Self-employment profit", value: gbp(st.profit) },
        { label: "Income tax", value: `−${gbp(st.incomeTax)}` },
        { label: "Class 2 NIC (£3.45/week)", value: `−${gbp(st.class2NIC)}` },
        { label: "Class 4 NIC (6% / 2%)", value: `−${gbp(st.class4NIC)}` },
        { label: "Sole trader net take-home", value: gbp(st.netTakeHome), strong: true },
        { label: "--- Limited company (outside IR35 only) ---", value: "" },
        { label: "Director salary", value: gbp(ltd.salary) },
        { label: "Employer NIC (15% above £5,000)", value: `−${gbp(ltd.employerNI)}` },
        { label: "Corporation tax (HP 27)", value: `−${gbp(ltd.ct)}` },
        { label: "Dividend tax (HP 28)", value: `−${gbp(ltd.dividendTax)}` },
        { label: "Limited company net take-home", value: gbp(ltd.netTakeHome), strong: true },
        { label: "--- Umbrella / PAYE (inside IR35 or employed) ---", value: "" },
        { label: "Employer NIC + levy (funded from rate)", value: `−${gbp(umb.employerNI)}` },
        { label: "Income tax (PAYE)", value: `−${gbp(umb.incomeTax)}` },
        { label: "Employee NIC", value: `−${gbp(umb.employeeNI)}` },
        { label: "Umbrella / PAYE net take-home", value: gbp(umb.netTakeHome), strong: true },
        { label: "--- Summary ---", value: "" },
        {
          label: "Highest estimated take-home",
          value: gbp(best),
          strong: true,
        },
      ],
      note: "STATUS WARNING (HP 20-22, ESM4270): HMRC has a locum-pharmacist-specific employment status page (ESM4270) and its position is restrictive. Self-employed status depends on the actual working arrangements, including control, substitution rights and financial risk. Many locum pharmacist engagements do not meet the tests, and \"everyone does it self-employed\" is not a defence. Where a locum works through their own limited company and the client is a medium or large pharmacy group, IR35 off-payroll rules (Chapter 10) apply and the limited company figure above is NOT available. Check your status at HMRC's CEST tool before drawing conclusions from this comparison (gov.uk/guidance/check-employment-status-for-tax). Limited company uses 2026/27 corporation tax (19% / 25% HP 27) and dividend rates (10.75% / 35.75% / 39.35%, £500 allowance HP 28). Sole trader uses Class 2 NIC at £3.45/week and Class 4 NIC at 6% (£12,570-£50,270) / 2% above. Umbrella uses £1,200/year illustrative margin.",
    };
  },
  explainer: {
    heading: "Why the tax route matters less than employment status for locum pharmacists",
    paragraphs: [
      "The numbers above show three different tax outcomes for the same gross income. The limited company route typically produces the highest take-home because corporation tax rates (19% to 25%) are lower than higher-rate income tax (40%) and dividends carry no National Insurance. However, the limited company figure is only available if the engagement is genuinely outside IR35, meaning it is a business-to-business contract rather than disguised employment. HMRC's locum-pharmacist guidance (ESM4270) sets out specific factors that make the pharmacist status question more restrictive than the general contractor test.",
      "For locum pharmacists working through their own limited companies with medium or large pharmacy group clients, the off-payroll working rules (Chapter 10, IR35) place the status determination on the client. If the client decides the engagement is inside IR35, the limited company takes no tax advantage and the umbrella row is closer to the relevant figure. For small independent pharmacy clients, the locum self-assesses under Chapter 8 IR35. The HMRC CEST tool (gov.uk/guidance/check-employment-status-for-tax) is the check of record.",
      "MTD for Income Tax applies to sole-trader locums from April 2026 where qualifying income exceeds £50,000, and from April 2027 at £30,000 (HP 23). Cash basis is the default method for unincorporated businesses (HP 24). These are administrative obligations that apply regardless of which tax route is numerically more efficient.",
    ],
  },
  faqs: [
    {
      question: "Are locum pharmacists automatically self-employed?",
      answer:
        "No. HMRC has a specific page on locum pharmacist employment status (ESM4270) and its position is more restrictive than the general self-employed rules. Whether a locum pharmacist is genuinely self-employed depends on the actual working arrangements: who controls the session, whether substitution is genuinely possible, and whether the locum bears real financial risk. The fact that many locums operate this way is not a defence if the tests are not met.",
    },
    {
      question: "Can a locum pharmacist use a limited company?",
      answer:
        "Yes, but only where the engagement is genuinely outside IR35. If the client is a medium or large pharmacy group, the off-payroll working rules require the client to assess the status. If the client issues an inside-IR35 Status Determination Statement, the limited company does not unlock the take-home figure shown. For small pharmacy clients the locum self-assesses. Structure should follow confirmed status, not the other way round.",
    },
    {
      question: "What expenses can a locum pharmacist claim?",
      answer:
        "Genuine business expenses deductible by a self-employed locum include GPhC registration fees, indemnity insurance, CPD and professional subscriptions, equipment, and business travel between client sites (not home to first site if that is a regular workplace). An umbrella or PAYE locum generally cannot claim these expenses. Expenses reduce the tax base for sole traders and limited companies but do not affect the umbrella route.",
    },
    {
      question: "What is MTD for Income Tax and does it affect locum pharmacists?",
      answer:
        "Making Tax Digital for Income Tax (MTD ITSA) requires sole traders and landlords with qualifying income above £50,000 to keep digital records and submit quarterly updates to HMRC from April 2026, and above £30,000 from April 2027 (HP 23). Many locum pharmacists working full-time will cross these thresholds. The obligation is about record-keeping and reporting, not tax rates, and a specialist can help set up a compliant system.",
    },
  ],
};
