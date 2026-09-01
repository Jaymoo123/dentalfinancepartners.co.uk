/**
 * Private practice incorporation calculator — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch.
 *
 * Compares sole trader vs limited company tax for medical private practice.
 * Uses 2026/27 dividend tax rates (10.75% / 35.75% / 39.35%, FA 2026 s.4).
 *
 * ORDER OF OPERATIONS (corrected 2026-09-01, wave C defects A, B and C):
 * - The director salary and the employer NIC on it are DEDUCTIBLE EXPENSES of
 *   the company, so they come off the profit BEFORE corporation tax. The old
 *   model deducted the salary from the post-CT balance, taxing the company on
 *   its own salary cost.
 * - Corporation tax is the CTA 2010 Part 3 structure, not a flat 25%: 19% small
 *   profits to £50,000, 25% main above £250,000, marginal relief between at the
 *   standard fraction 3/200 (house_positions.md §5, unchanged for FY2026).
 * - Employer secondary Class 1 NIC is charged at 15% above the £5,000 secondary
 *   threshold (house_positions.md §5). No Employment Allowance: a company whose
 *   only employee is a single director cannot claim it.
 * - Both "net income" figures are now the same definition, net cash in hand
 *   after every tax and NIC the model charges. The company side previously
 *   omitted income tax on the NHS salary, so it was not comparable.
 *
 * NOT MODELLED, disclosed in the calculator copy rather than built:
 * - Associated companies (the £50,000 / £250,000 limits are not divided).
 * - Employee primary Class 1 NIC on the director salary. It is nil at the
 *   default £12,570 salary and house_positions.md does not lock the rate.
 */

export type IncorporationInput = {
  privateIncome: number;
  expenses: number;
  desiredSalary: number;
  nhsIncome: number;
};

export type IncorporationResult = {
  soleTraderTaxableIncome: number;
  soleTraderTotalTax: number;
  soleTraderNetIncome: number;
  companyProfit: number;
  employerNIC: number;
  corporationTax: number;
  dividendAmount: number;
  dividendTax: number;
  payeIncomeTax: number;
  limitedCompanyTotalTax: number;
  limitedCompanyNetIncome: number;
  taxSavings: number;
  savingsPerMonth: number;
};

// Constants
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const NI_LOWER_LIMIT = 12570;
const NI_UPPER_LIMIT = 50270;
const DIVIDEND_ALLOWANCE = 500;

// 2026/27 dividend tax rates
const DIVIDEND_BASIC_RATE = 0.1075;
const DIVIDEND_HIGHER_RATE = 0.3575;
const DIVIDEND_ADDITIONAL_RATE = 0.3935;

// Corporation tax, CTA 2010 Part 3 ss.18 to 19 (FY beginning 1 April 2026)
const CT_SMALL_PROFITS_RATE = 0.19;
const CT_MAIN_RATE = 0.25;
const CT_LOWER_LIMIT = 50000;
const CT_UPPER_LIMIT = 250000;
const CT_MARGINAL_RELIEF_FRACTION = 3 / 200;

// Employer secondary Class 1 NIC, from 6 April 2025
const EMPLOYER_NIC_RATE = 0.15;
const EMPLOYER_NIC_SECONDARY_THRESHOLD = 5000;

/**
 * Corporation tax on taxable total profits, assuming a 12-month accounting
 * period and no associated companies. Marginal relief is
 * fraction x (upper limit - profits), which makes the charge continuous at both
 * boundaries: £50,000 costs exactly 19% and £250,000 exactly 25%.
 */
export function calcCorporationTax(profits: number): number {
  if (profits <= 0) return 0;
  if (profits <= CT_LOWER_LIMIT) return profits * CT_SMALL_PROFITS_RATE;
  if (profits >= CT_UPPER_LIMIT) return profits * CT_MAIN_RATE;
  return profits * CT_MAIN_RATE - CT_MARGINAL_RELIEF_FRACTION * (CT_UPPER_LIMIT - profits);
}

/**
 * Income tax on taxable income (already net of the personal allowance). `pa` is
 * the PA actually applied so the 45% band starts at £125,140 gross even when the
 * PA has tapered: additional threshold in taxable terms = (HIGHER_RATE_LIMIT - pa),
 * never below the basic limit. The fixed £74,870 higher band only holds at full PA.
 */
function calcIncomeTax(taxableAfterPA: number, pa: number = PERSONAL_ALLOWANCE): number {
  let tax = 0;
  if (taxableAfterPA <= 0) return 0;

  const basicBand = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE; // 37,700, fixed
  const additionalTaxable = Math.max(basicBand, HIGHER_RATE_LIMIT - pa);

  const basicBandIncome = Math.min(taxableAfterPA, basicBand);
  tax += basicBandIncome * 0.2;

  if (taxableAfterPA > basicBand) {
    const higherBandIncome = Math.min(taxableAfterPA - basicBand, additionalTaxable - basicBand);
    tax += higherBandIncome * 0.4;

    if (taxableAfterPA > additionalTaxable) {
      const additionalBandIncome = taxableAfterPA - additionalTaxable;
      tax += additionalBandIncome * 0.45;
    }
  }
  return tax;
}

/** Personal allowance after the £100k taper (£1 lost per £2 over £100k, nil at £125,140). */
function paFor(grossIncome: number): number {
  if (grossIncome <= 100000) return PERSONAL_ALLOWANCE;
  return Math.max(0, PERSONAL_ALLOWANCE - (grossIncome - 100000) / 2);
}

export function calcIncorporation(input: IncorporationInput): IncorporationResult {
  const { privateIncome, expenses, desiredSalary, nhsIncome } = input;

  // --- Sole trader ---
  const soleTraderProfit = privateIncome - expenses;
  const soleTraderTaxableIncome = soleTraderProfit + nhsIncome;
  const soleTraderPA = paFor(soleTraderTaxableIncome);
  const taxableAfterPA = Math.max(0, soleTraderTaxableIncome - soleTraderPA);
  const soleTraderIncomeTax = calcIncomeTax(taxableAfterPA, soleTraderPA);

  // Class 4 NI on private practice profit only. Main rate 6% (the 9% rate was
  // abolished from 6 April 2024; HP section 5/section 8 lock 6%/2%, matching
  // locum-tax.ts). Corrected 2026-07-06; the old 9% inflated sole-trader tax
  // and biased the incorporation comparison.
  let soleTraderNI = 0;
  if (soleTraderProfit > NI_LOWER_LIMIT) {
    const niableBand1 = Math.min(soleTraderProfit - NI_LOWER_LIMIT, NI_UPPER_LIMIT - NI_LOWER_LIMIT);
    soleTraderNI += niableBand1 * 0.06;
    if (soleTraderProfit > NI_UPPER_LIMIT) {
      soleTraderNI += (soleTraderProfit - NI_UPPER_LIMIT) * 0.02;
    }
  }

  const soleTraderTotalTax = soleTraderIncomeTax + soleTraderNI;
  const soleTraderNetIncome = soleTraderTaxableIncome - soleTraderTotalTax;

  // --- Limited company ---
  // Salary and the employer NIC on it are deductible, so they reduce the profit
  // chargeable to corporation tax.
  const companyProfit = privateIncome - expenses;

  // A salary the profit cannot fund is not payable, so cap it. The cap solves
  // salary + 0.15 * (salary - 5000) = profit, and below the secondary threshold
  // there is no employer NIC so the cap is simply the profit.
  const salaryCap =
    companyProfit <= EMPLOYER_NIC_SECONDARY_THRESHOLD
      ? Math.max(0, companyProfit)
      : (companyProfit + EMPLOYER_NIC_SECONDARY_THRESHOLD * EMPLOYER_NIC_RATE) /
        (1 + EMPLOYER_NIC_RATE);
  const salary = Math.min(desiredSalary, salaryCap);

  const employerNIC = Math.max(0, salary - EMPLOYER_NIC_SECONDARY_THRESHOLD) * EMPLOYER_NIC_RATE;
  const chargeableProfit = Math.max(0, companyProfit - salary - employerNIC);
  const corporationTax = calcCorporationTax(chargeableProfit);
  const dividendAmount = chargeableProfit - corporationTax;

  // Dividend tax
  const taxableDividends = Math.max(0, dividendAmount - DIVIDEND_ALLOWANCE);
  const totalIncomeBeforeDividends = nhsIncome + salary;

  let dividendTax = 0;
  if (taxableDividends > 0) {
    const basicRateRemaining = Math.max(0, BASIC_RATE_LIMIT - totalIncomeBeforeDividends);
    const higherRateRemaining = Math.max(0, HIGHER_RATE_LIMIT - totalIncomeBeforeDividends);

    if (basicRateRemaining > 0) {
      const basicRateDividends = Math.min(taxableDividends, basicRateRemaining);
      dividendTax += basicRateDividends * DIVIDEND_BASIC_RATE;

      if (taxableDividends > basicRateRemaining) {
        const higherRateDividends = Math.min(
          taxableDividends - basicRateRemaining,
          higherRateRemaining - basicRateRemaining,
        );
        dividendTax += higherRateDividends * DIVIDEND_HIGHER_RATE;

        if (taxableDividends > higherRateRemaining) {
          const additionalRateDividends = taxableDividends - higherRateRemaining;
          dividendTax += additionalRateDividends * DIVIDEND_ADDITIONAL_RATE;
        }
      }
    } else if (higherRateRemaining > 0) {
      const higherRateDividends = Math.min(taxableDividends, higherRateRemaining);
      dividendTax += higherRateDividends * DIVIDEND_HIGHER_RATE;

      if (taxableDividends > higherRateRemaining) {
        const additionalRateDividends = taxableDividends - higherRateRemaining;
        dividendTax += additionalRateDividends * DIVIDEND_ADDITIONAL_RATE;
      }
    } else {
      dividendTax = taxableDividends * DIVIDEND_ADDITIONAL_RATE;
    }
  }

  // Income tax on the PAYE side of the company route: the NHS salary AND the
  // director salary. The old model taxed the NHS income only, which is what
  // made the two "net income" rows non-comparable.
  const payeIncome = nhsIncome + salary;
  const payePA = paFor(payeIncome);
  const payeTaxableAfterPA = Math.max(0, payeIncome - payePA);
  const payeIncomeTax = calcIncomeTax(payeTaxableAfterPA, payePA);

  const limitedCompanyTotalTax = corporationTax + employerNIC + dividendTax + payeIncomeTax;
  // Net cash in hand, the same definition as soleTraderNetIncome. Corporation
  // tax and employer NIC are already out of dividendAmount.
  const limitedCompanyNetIncome =
    nhsIncome + salary + dividendAmount - dividendTax - payeIncomeTax;

  const taxSavings = soleTraderTotalTax - limitedCompanyTotalTax;
  const savingsPerMonth = taxSavings / 12;

  return {
    soleTraderTaxableIncome,
    soleTraderTotalTax,
    soleTraderNetIncome,
    companyProfit,
    employerNIC,
    corporationTax,
    dividendAmount,
    dividendTax,
    payeIncomeTax,
    limitedCompanyTotalTax,
    limitedCompanyNetIncome,
    taxSavings,
    savingsPerMonth,
  };
}
