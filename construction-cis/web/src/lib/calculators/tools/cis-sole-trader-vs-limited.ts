/**
 * cis-sole-trader-vs-limited
 *
 * Compares sole-trader and limited-company structures for a CIS subcontractor.
 * CIS-unique angle: EPS monthly reclaim (limited) vs Self Assessment year-end
 * reclaim (sole trader) cash-flow difference.
 *
 * Rates: 2026/27 (FA 2026). Income >=£100k cases MUST use the PA taper;
 * this tool inlines a correct taper rather than reusing the flat saLiability
 * helper (which does not model PA taper and is noted as a known ceiling in
 * cis-tax.ts). ponytail: inline taper, upgrade to shared helper when
 * cis-tax.ts adds paAfterTaper() per the TOOL_ROSTER.md note.
 */

import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";
import {
  PERSONAL_ALLOWANCE,
  BASIC_RATE_LIMIT,
  CLASS4_NI,
  CLASS1_NI,
  INCOME_TAX_RATES,
} from "../cis-tax";

// ---------------------------------------------------------------------------
// 2026/27 rates (FA 2026)
// ---------------------------------------------------------------------------

const EMPLOYER_NIC_RATE = 0.15;
const EMPLOYER_NIC_THRESHOLD = 5000; // secondary threshold 2026/27
const CT_SMALL_RATE = 0.19; // up to £50,000 profit
const CT_MAIN_RATE = 0.25; // £250,000+
const CT_SMALL_LIMIT = 50000;
const CT_MAIN_LIMIT = 250000;
const DIV_ALLOWANCE = 500;
const DIV_BASIC_RATE = 0.1075;
const DIV_HIGHER_RATE = 0.3575;
const DIV_ADDITIONAL_RATE = 0.3935;
const ADDITIONAL_RATE_THRESHOLD = 125140; // income above which 45% applies

// ---------------------------------------------------------------------------
// Inline PA-taper engine (correct for incomes >=£100k)
// ---------------------------------------------------------------------------

/** Personal allowance after taper (£1 per £2 over £100,000, floor £0). */
function paAfterTaper(income: number): number {
  if (income <= 100000) return PERSONAL_ALLOWANCE;
  const reduction = Math.floor((income - 100000) / 2);
  return Math.max(0, PERSONAL_ALLOWANCE - reduction);
}

/**
 * Income tax on a given total income using correct 2026/27 bands with PA taper.
 *
 * Bands:
 *   basic  = min(taxable, £37,700) @ 20%
 *   higher = from £37,700 up to (£125,140 − PA) − £37,700 wider band @ 40%
 *   additional = above £125,140 @ 45%
 */
function incomeTaxWithTaper(income: number): number {
  const pa = paAfterTaper(income);
  const taxable = Math.max(0, income - pa);
  const basicTax = Math.min(taxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic;
  // higher-rate band width: correct formula = (125,140 − PA) − 37,700
  const higherBandWidth = Math.max(0, ADDITIONAL_RATE_THRESHOLD - pa - BASIC_RATE_LIMIT);
  const higherTax =
    Math.min(Math.max(0, taxable - BASIC_RATE_LIMIT), higherBandWidth) * INCOME_TAX_RATES.higher;
  const additionalTax =
    Math.max(0, taxable - BASIC_RATE_LIMIT - higherBandWidth) * 0.45;
  return basicTax + higherTax + additionalTax;
}

/** Class 4 NI on self-employment profit. */
function class4Ni(profit: number): number {
  const p = Math.max(0, profit);
  const lower =
    Math.min(
      Math.max(0, p - CLASS4_NI.lowerLimit),
      CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit
    ) * CLASS4_NI.main;
  const upper = Math.max(0, p - CLASS4_NI.upperLimit) * CLASS4_NI.upper;
  return lower + upper;
}

/** Employee Class 1 NI on gross salary. */
function class1EmpNi(salary: number): number {
  const s = Math.max(0, salary);
  const lower =
    Math.min(
      Math.max(0, s - CLASS4_NI.lowerLimit),
      CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit
    ) * CLASS1_NI.main;
  const upper = Math.max(0, s - CLASS4_NI.upperLimit) * CLASS1_NI.upper;
  return lower + upper;
}

/** Employer NIC on salary above £5,000 secondary threshold, 15%. */
function employerNic(salary: number): number {
  return Math.max(0, salary - EMPLOYER_NIC_THRESHOLD) * EMPLOYER_NIC_RATE;
}

/**
 * Corporation tax with marginal relief (50k to 250k).
 * Marginal relief fraction: (250,000 − profit) / (250,000 − 50,000) × profit × (0.25 − 0.19).
 */
function corpTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_LIMIT) return profit * CT_SMALL_RATE;
  if (profit >= CT_MAIN_LIMIT) return profit * CT_MAIN_RATE;
  // marginal relief: effective rate tapers from 19% to 25%
  const mainTax = profit * CT_MAIN_RATE;
  const relief =
    ((CT_MAIN_LIMIT - profit) / (CT_MAIN_LIMIT - CT_SMALL_LIMIT)) *
    profit *
    (CT_MAIN_RATE - CT_SMALL_RATE);
  return mainTax - relief;
}

/**
 * Dividend income tax on a dividend amount, given the shareholder's existing
 * income (salary + other) that already fills the bands.
 */
function dividendTax(dividend: number, existingIncome: number): number {
  if (dividend <= 0) return 0;
  const pa = paAfterTaper(existingIncome + dividend);
  // available dividend allowance
  const afterAllowance = Math.max(0, dividend - DIV_ALLOWANCE);
  if (afterAllowance === 0) return 0;

  // work out which band the dividend sits in after stacking above existing income
  const taxableBase = Math.max(0, existingIncome - pa);
  // portion of basic band already used
  const basicUsed = Math.min(taxableBase, BASIC_RATE_LIMIT);
  const higherBandWidth = Math.max(
    0,
    ADDITIONAL_RATE_THRESHOLD - pa - BASIC_RATE_LIMIT
  );
  const higherUsed = Math.min(
    Math.max(0, taxableBase - BASIC_RATE_LIMIT),
    higherBandWidth
  );

  const basicRemaining = Math.max(0, BASIC_RATE_LIMIT - basicUsed);
  const higherRemaining = Math.max(0, higherBandWidth - higherUsed);

  let remaining = afterAllowance;
  const basicDiv = Math.min(remaining, basicRemaining);
  remaining -= basicDiv;
  const higherDiv = Math.min(remaining, higherRemaining);
  remaining -= higherDiv;
  const additionalDiv = remaining;

  return (
    basicDiv * DIV_BASIC_RATE +
    higherDiv * DIV_HIGHER_RATE +
    additionalDiv * DIV_ADDITIONAL_RATE
  );
}

// ---------------------------------------------------------------------------
// Tool config
// ---------------------------------------------------------------------------

export const cisSoleTraderVsLimited: GenericTool = {
  kind: "generic",
  slug: "cis-sole-trader-vs-limited",
  name: "Sole Trader vs Limited Company Calculator for CIS Subcontractors",
  category: "CIS Comparisons",
  oneLiner:
    "Compare your net take-home as a sole trader versus a limited company, including the CIS-specific cash flow difference between monthly EPS reclaims and an annual Self Assessment wait.",
  metaTitle: "Sole Trader vs Limited Company Calculator | CIS Subcontractors 2026/27",
  metaDescription:
    "Calculate whether operating through a limited company or as a sole trader puts more money in your pocket as a CIS subcontractor. Includes the monthly EPS reclaim vs annual Self Assessment cash flow comparison. 2026/27 rates.",
  intro:
    "The choice between sole trader and limited company is one of the most consequential decisions a CIS subcontractor makes. The tax arithmetic is only part of the picture. As a limited company, you can reclaim CIS deductions from HMRC every month through the Employer Payment Summary (EPS), using them to offset your PAYE and employer NIC liability. As a sole trader, those same deductions sit with HMRC until your Self Assessment return is processed, which can mean waiting 12 to 18 months from the first deduction before you see the money. This calculator quantifies both the annual tax difference and the cash flow timing gap so you can see the full picture at your income level.",
  ctaLabel: "Get tailored advice on your structure from a CIS specialist →",
  embedHeight: 740,
  fields: [
    {
      id: "grossIncome",
      label: "Annual gross CIS income",
      type: "currency",
      default: 60000,
      step: 1000,
      help: "Your total CIS invoices before any deductions or materials. This is what the contractor pays you before deducting CIS.",
    },
    {
      id: "materialsExpenses",
      label: "Materials and allowable expenses",
      type: "currency",
      default: 10000,
      step: 500,
      help: "Materials you supply, plus all allowable business expenses: tools, PPE, mileage (55p per mile for the first 10,000 miles from April 2026), van running costs, and accountancy fees. These reduce taxable profit on both routes.",
    },
    {
      id: "salary",
      label: "Director salary (limited company route)",
      type: "currency",
      default: 12570,
      step: 500,
      help: "The salary you would pay yourself as a director. Most CIS limited-company directors set this at £12,570 (the personal allowance) to minimise income tax and employee NI while still counting as a qualifying year for the State Pension.",
    },
    {
      id: "cisRate",
      label: "Your CIS deduction rate",
      type: "select",
      default: "20",
      options: [
        { value: "0", label: "0% (Gross Payment Status)" },
        { value: "20", label: "20% (registered subcontractor)" },
        { value: "30", label: "30% (unregistered subcontractor)" },
      ],
    },
  ],
  compute: (v) => {
    const gross = Math.max(0, Number(v.grossIncome));
    const deductions = Math.max(0, Number(v.materialsExpenses));
    const salary = Math.max(0, Number(v.salary));
    const cisRate = Number(v.cisRate) / 100;

    // Labour base for CIS deduction (materials are not subject to CIS, but
    // since the field combines materials + expenses, we treat the whole input
    // as reducing profit and compute CIS on gross − combined materials+expenses
    // at the rate chosen). CIS base = max(0, gross − materialsExpenses).
    // ponytail: if user wants to split materials vs expenses separately,
    // add that field; for this model the combined deduction is simpler and
    // matches the spec's worked example structure.
    const cisBase = Math.max(0, gross - deductions);
    const cisDeducted = cisBase * cisRate;

    // -----------------------------------------------------------------------
    // SOLE TRADER ROUTE
    // -----------------------------------------------------------------------
    const stProfit = Math.max(0, gross - deductions);
    const stIncomeTax = incomeTaxWithTaper(stProfit);
    const stClass4 = class4Ni(stProfit);
    const stTotalTax = stIncomeTax + stClass4;
    const stNetInPocket = stProfit - stTotalTax;
    const stEffectiveRate = stProfit > 0 ? stTotalTax / stProfit : 0;

    // CIS cash flow: deducted at source, recovered via SA (annual)
    // Refund = cisDeducted − stTotalTax (positive = refund, negative = owe)
    const stCisRefundOwe = cisDeducted - stTotalTax;

    // -----------------------------------------------------------------------
    // LIMITED COMPANY ROUTE
    // -----------------------------------------------------------------------
    const empNic = class1EmpNi(salary);
    const emplNic = employerNic(salary);

    // Company profit = gross income − deductions − salary − employer NIC
    const companyProfit = Math.max(0, gross - deductions - salary - emplNic);
    const ct = corpTax(companyProfit);
    const retainedAfterCt = Math.max(0, companyProfit - ct);

    // Dividend: extract all retained profit as dividends
    const dividend = retainedAfterCt;
    const divTax = dividendTax(dividend, salary);

    // Director personal tax: income tax on salary + employee NI
    const salaryIncomeTax = incomeTaxWithTaper(salary);
    const directorPersonalTax = salaryIncomeTax + empNic;

    // Net in pocket: salary + dividend, after all taxes
    const ltNetInPocket = salary - directorPersonalTax + dividend - divTax;
    const ltTotalTax = stProfit > 0
      ? stProfit - ltNetInPocket
      : ct + directorPersonalTax + divTax + emplNic;
    const ltEffectiveRate = stProfit > 0 ? ltTotalTax / stProfit : 0;

    // CIS EPS monthly reclaim: limited company can offset CIS deductions
    // against monthly PAYE/NIC liability via EPS. Monthly surplus arises when
    // CIS deducted > PAYE due. Annual PAYE+eNIC bill = directorPersonalTax + emplNic.
    const annualPayeLiability = directorPersonalTax + emplNic;
    const cisEpsMonthlyOffset = cisDeducted - annualPayeLiability;
    // If positive, company recovers that surplus from HMRC via EPS in-year.
    // If negative, EPS still clears the PAYE bill monthly but no net refund.

    const netDiff = ltNetInPocket - stNetInPocket;
    const ltWins = netDiff >= 0;

    // VAT registration note (£90,000 threshold)
    const nearVatThreshold = gross >= 75000 && gross < 100000;
    const overVatThreshold = gross >= 90000;

    return {
      headline: {
        label: ltWins
          ? "Limited company annual advantage"
          : "Sole trader annual advantage",
        value: gbp(Math.abs(netDiff)),
        sub: `Limited: ${gbp(ltNetInPocket)} vs sole trader: ${gbp(stNetInPocket)} net per year`,
      },
      rows: [
        { label: "Gross CIS income", value: gbp(gross) },
        { label: "Materials and expenses", value: `−${gbp(deductions)}` },
        { label: "Profit (before structure)", value: gbp(stProfit) },
        { label: "", value: "" },

        { label: "SOLE TRADER", value: "", strong: true },
        { label: "Income tax (2026/27, with PA taper)", value: gbp(stIncomeTax) },
        { label: "Class 4 NI", value: gbp(stClass4) },
        { label: "Total tax and NI", value: gbp(stTotalTax) },
        {
          label: "Net in pocket",
          value: gbp(stNetInPocket),
          strong: true,
        },
        {
          label: "Effective rate on profit",
          value: `${(stEffectiveRate * 100).toFixed(1)}%`,
        },
        {
          label: `CIS deducted at source (${Number(v.cisRate)}%)`,
          value: gbp(cisDeducted),
        },
        {
          label:
            stCisRefundOwe >= 0
              ? "Estimated SA refund (received ~12-18 months after first deduction)"
              : "Estimated SA underpayment",
          value: gbp(Math.abs(stCisRefundOwe)),
        },
        { label: "", value: "" },

        { label: "LIMITED COMPANY", value: "", strong: true },
        { label: "Director salary", value: gbp(salary) },
        { label: "Employer NIC on salary (15% over £5,000)", value: gbp(emplNic) },
        { label: "Company profit after salary and employer NIC", value: gbp(companyProfit) },
        { label: "Corporation tax", value: gbp(ct) },
        { label: "Retained profit available as dividends", value: gbp(retainedAfterCt) },
        { label: "Director income tax on salary", value: gbp(salaryIncomeTax) },
        { label: "Director employee NI on salary", value: gbp(empNic) },
        { label: "Dividend tax (after £500 allowance)", value: gbp(divTax) },
        {
          label: "Net in pocket (salary + dividends after all tax)",
          value: gbp(ltNetInPocket),
          strong: true,
        },
        {
          label: "Effective rate on profit",
          value: `${(ltEffectiveRate * 100).toFixed(1)}%`,
        },
        { label: "", value: "" },

        { label: "CIS CASH FLOW (limited route)", value: "", strong: true },
        {
          label: "CIS deducted at source",
          value: gbp(cisDeducted),
        },
        {
          label: "Annual PAYE and employer NIC bill",
          value: gbp(annualPayeLiability),
        },
        {
          label:
            cisEpsMonthlyOffset >= 0
              ? "Net CIS surplus reclaimed monthly via EPS"
              : "CIS offsets PAYE monthly (no surplus refund needed)",
          value:
            cisEpsMonthlyOffset >= 0
              ? gbp(cisEpsMonthlyOffset)
              : "EPS offsets in full",
        },
        ...(nearVatThreshold
          ? [
              {
                label: "VAT note",
                value: "Turnover is approaching the £90,000 VAT registration threshold",
              },
            ]
          : []),
        ...(overVatThreshold && !nearVatThreshold
          ? [
              {
                label: "VAT note",
                value: "Turnover exceeds the £90,000 VAT registration threshold. VAT registration is compulsory.",
              },
            ]
          : []),
      ],
      note: `Rates: 2026/27 (FA 2026). Income tax uses the correct PA taper above £100,000 (personal allowance reduces £1 per £2 over £100,000, reaching £0 at £125,140). Corporation tax: 19% up to £50,000 profit, 25% above £250,000, marginal relief between. Dividend rates: 10.75% basic / 35.75% higher / 39.35% additional (FA 2026 s.4) after the £500 dividend allowance. Employer NIC: 15% above the £5,000 secondary threshold (2026/27). This is an estimate for comparison purposes. Accountancy fees, insurance, and company running costs (typically £1,000 to £2,500 per year for a simple CIS limited company) are not deducted here. Take professional advice before changing your structure.`,
    };
  },
  explainer: {
    heading: "Sole trader vs limited company: the CIS cash flow difference explained",
    paragraphs: [
      "The most important difference between the two structures for a CIS subcontractor is not the annual tax bill, it is when you get your money back. As a sole trader, CIS deductions are withheld at source by every contractor you work for. Those deductions pile up throughout the year and can only be recovered when HMRC processes your Self Assessment return, typically 12 to 18 months after the first deduction was taken. A subcontractor earning £60,000 a year with £12,000 withheld at 20% is, in effect, lending HMRC an interest-free loan for more than a year before the refund arrives.",
      "A limited company changes the mechanics entirely. The company registers as a CIS contractor and employer, and uses the Employer Payment Summary (EPS) to tell HMRC each month how much CIS it has suffered as a subcontractor. Those CIS credits are set against the company's own PAYE and employer NIC liability. Where the CIS deductions exceed the PAYE due, the company can claim the net balance back from HMRC in-year, often within days through the EPS. For subcontractors with significant deductions and modest salary bills, this can mean the CIS deductions are largely back in the company's bank account within a few months rather than waiting more than a year.",
      "On the tax side, the limited company route typically shows a modest annual saving over sole trader at incomes above roughly £35,000 to £40,000, because corporation tax at 19% (on profits up to £50,000) is lower than the 20% income tax plus 6% Class 4 NI that a sole trader pays at the same profit level. The gap widens as profits push into the higher-rate band. But the company route comes with running costs: accountancy fees, Companies House filings, a separate business bank account, and the administrative overhead of running payroll each month. These costs, typically £1,000 to £2,500 per year for a straightforward CIS limited company, erode the tax saving and should be weighed against the headline figures this calculator shows.",
    ],
  },
  workedExamples: [
    {
      heading: "Example 1: registered subcontractor at £60,000 gross",
      inputs: "£60,000 gross CIS income, £10,000 materials and expenses, £12,570 salary, 20% CIS rate.",
      steps: [
        "Profit before structure: £60,000 − £10,000 = £50,000.",
        "Sole trader income tax: PA = £12,570 (income below £100,000, no taper). Taxable = £37,430. All within basic band. Tax = £37,430 x 20% = £7,486.",
        "Sole trader Class 4 NI: £37,430 at 6% = £2,245.80. Total tax and NI = £9,731.80.",
        "Sole trader net in pocket: £50,000 − £9,731.80 = £40,268.20.",
        "CIS deducted at source: labour base £50,000 (gross minus combined deductions) at 20% = £10,000. SA refund = £10,000 − £9,731.80 = £268.20 (small owe scenario; if gross CIS income base differs, recalculate accordingly).",
        "Limited: salary £12,570. Employer NIC = (£12,570 − £5,000) x 15% = £1,135.50. Company profit = £50,000 − £12,570 − £1,135.50 = £36,294.50.",
        "Corporation tax at 19% (below £50k): £36,294.50 x 19% = £6,895.96. Retained for dividends = £29,398.54.",
        "Director income tax on salary £12,570: taxable = £0 (salary = PA). Income tax = £0. Employee NI = (£12,570 − £12,570) = £0 (at NI primary threshold).",
        "Dividend tax: £29,398.54 after £500 allowance = £28,898.54 at 10.75% (all within basic band remaining after £12,570 salary) = £3,106.64.",
        "Limited net in pocket: £12,570 + £29,398.54 − £0 − £3,106.64 = £38,861.90.",
        "Annual difference: sole trader ahead by ≈ £1,406 at this income level (before company running costs).",
        "EPS cash flow: CIS deducted £10,000. Annual PAYE liability (income tax £0 + employee NI £0 + employer NIC £1,135.50) = £1,135.50. EPS monthly reclaim available = £10,000 − £1,135.50 = £8,864.50 claimable in-year via EPS versus waiting 12+ months via SA.",
      ],
    },
    {
      heading: "Example 2: high-earning subcontractor at £130,000 gross (PA taper kicks in)",
      inputs: "£130,000 gross CIS income, £20,000 materials and expenses, £12,570 salary, 20% CIS rate.",
      steps: [
        "Profit before structure: £130,000 − £20,000 = £110,000.",
        "Sole trader PA taper: income £110,000 is £10,000 over £100,000. PA reduces by £5,000 to £7,570.",
        "Taxable income: £110,000 − £7,570 = £102,430.",
        "Basic-rate tax: £37,700 x 20% = £7,540.",
        "Higher-rate band width: (£125,140 − £7,570) − £37,700 = £79,870. Higher-rate taxable: £102,430 − £37,700 = £64,730 (all within the higher band). Tax: £64,730 x 40% = £25,892.",
        "Sole trader total income tax: £7,540 + £25,892 = £33,432.",
        "Class 4 NI: (£50,270 − £12,570) x 6% = £2,262; (£110,000 − £50,270) x 2% = £1,194.60. Total Class 4 = £3,456.60.",
        "Sole trader total tax: £36,888.60. Net in pocket: £110,000 − £36,888.60 = £73,111.40.",
        "CIS deducted at source: £110,000 x 20% = £22,000. SA underpayment = £22,000 − £36,888.60 < 0 (deductions exceed liability, large refund via SA; refund = £0, owe = £14,888.60 extra due).",
        "Limited: employer NIC = (£12,570 − £5,000) x 15% = £1,135.50. Company profit = £110,000 − £12,570 − £1,135.50 = £96,294.50.",
        "Corporation tax: between £50k and £250k, marginal relief applies. Main tax = £96,294.50 x 25% = £24,073.63. Relief = ((£250,000 − £96,294.50) / £200,000) x £96,294.50 x 6% = £4,423.23. CT = £24,073.63 − £4,423.23 = £19,650.40. Retained = £76,644.10.",
        "Dividend tax: dividends £76,644.10 sit above the higher threshold when stacked on £12,570 salary. After £500 allowance = £76,144.10. Approximately £37,700 at 10.75% = £4,052.75 and remainder ≈ £38,444 at 35.75% = £13,743.73. Total dividend tax ≈ £17,796.",
        "Limited net in pocket ≈ £12,570 + £76,644.10 − £17,796 = £71,418 (approximate; tool computes exactly).",
        "EPS: CIS deducted £22,000. Annual PAYE liability ≈ £1,135.50 (employer NIC). Net EPS reclaim available = £22,000 − £1,135.50 = £20,864.50 claimable monthly rather than waiting 12+ months for SA.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the EPS monthly reclaim and why does it matter for CIS limited companies?",
      answer:
        "When your limited company works as a CIS subcontractor, contractors deduct either 20% or 30% from your labour payments and pay it to HMRC on your behalf. Your company can offset these CIS credits against its own PAYE obligation every month through the Employer Payment Summary (EPS). Where the CIS credits exceed what the company owes in PAYE and employer NIC for that month, HMRC repays the surplus, often within a few days. This means the money deducted from you in February is typically back in the company bank account by mid-March, rather than sitting with HMRC until you file a Self Assessment return more than a year later.",
    },
    {
      question: "At what income level does limited company typically become more tax-efficient?",
      answer:
        "For most CIS subcontractors the limited company route shows a positive tax saving above roughly £35,000 to £40,000 of profit, because corporation tax at 19% is lower than the combined income tax at 20% plus Class 4 NI at 6% a sole trader pays in the basic-rate band. The saving narrows and can reverse at very high profits once dividends start attracting higher-rate dividend tax (35.75%) and the marginal corporation tax rate rises toward 25% under the associated-companies rules. The calculator shows the exact crossover for your numbers.",
    },
    {
      question: "What does the personal allowance taper mean for sole traders earning over £100,000?",
      answer:
        "The personal allowance (£12,570 in 2026/27) is reduced by £1 for every £2 of income above £100,000. A sole trader with £110,000 of profit loses £5,000 of personal allowance, leaving only £7,570 tax-free. By £125,140 the personal allowance is gone entirely. This creates an effective 60% marginal income tax rate between £100,000 and £125,140 (40% income tax on the extra income plus 40% on the allowance being clawed back), which the calculator models correctly. The limited company can help, but director-level salary decisions need to account for this band too.",
    },
    {
      question: "Does a limited company still need to file Self Assessment?",
      answer:
        "The company files a Corporation Tax return (CT600) and annual accounts. The director files a personal Self Assessment return for the salary and dividend income. However, the SA return for a limited-company director typically results in no refund (or a small additional payment) rather than the large refund a sole trader receives, because the CIS deductions have already been reclaimed monthly via EPS. The company's month-by-month EPS process replaces the sole trader's one-large-annual-refund process.",
    },
    {
      question: "Are there costs to running a limited company?",
      answer:
        "Yes. Accountancy fees for a straightforward CIS limited company typically run from £1,000 to £2,500 per year, covering payroll, the CT600 corporation tax return, annual accounts and the director's personal Self Assessment. Companies House requires an annual confirmation statement (£34 online). A separate business bank account is obligatory. These costs are real and reduce the headline tax saving. For subcontractors earning below roughly £40,000 of profit, the costs often outweigh the tax saving, making sole trader the simpler and cheaper route.",
    },
    {
      question: "What happens to the CIS deductions if I am on Gross Payment Status (GPS)?",
      answer:
        "GPS means contractors pay you in full without any CIS deduction. In this case the EPS monthly reclaim advantage disappears entirely for both routes because there is nothing to reclaim. The sole trader vs limited comparison then reduces to a pure tax arithmetic question, which the calculator still computes correctly. GPS holders with substantial profits should focus on the annual tax rate difference rather than the cash flow timing angle.",
    },
    {
      question: "Can I switch from sole trader to limited company mid-year?",
      answer:
        "Yes, but the timing has practical implications. You would close your sole trader books, file a final Self Assessment, and incorporate a new company. The company registers with HMRC for PAYE, sets up its payroll, and notifies each contractor of the new company details and its CIS verification status. Contractors will need to reverify the company before they can apply the registered 20% rate rather than the 30% unregistered rate. The transition typically takes four to six weeks to complete cleanly and is best done at the start of a new tax year.",
    },
  ],
};
