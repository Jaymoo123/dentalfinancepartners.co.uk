/**
 * Private practice incorporation calculator — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch.
 *
 * Compares sole trader vs limited company tax for medical private practice.
 * Uses 2026/27 dividend tax rates (10.75% / 35.75% / 39.35%) and CT 25%.
 * The component file comment states "2026/27 using updated dividend tax rates"
 * and these are correct post-FA 2025 (1.25pp uplift on all dividend bands).
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
  corporationTax: number;
  dividendAmount: number;
  dividendTax: number;
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

function calcIncomeTax(taxableAfterPA: number): number {
  let tax = 0;
  if (taxableAfterPA <= 0) return 0;

  const basicBandIncome = Math.min(taxableAfterPA, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  tax += basicBandIncome * 0.2;

  if (taxableAfterPA > BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) {
    const higherBandIncome = Math.min(
      taxableAfterPA - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE),
      HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT,
    );
    tax += higherBandIncome * 0.4;

    if (taxableAfterPA > HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE) {
      const additionalBandIncome = taxableAfterPA - (HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE);
      tax += additionalBandIncome * 0.45;
    }
  }
  return tax;
}

export function calcIncorporation(input: IncorporationInput): IncorporationResult {
  const { privateIncome, expenses, desiredSalary, nhsIncome } = input;

  // --- Sole trader ---
  const soleTraderProfit = privateIncome - expenses;
  const soleTraderTaxableIncome = soleTraderProfit + nhsIncome;
  const taxableAfterPA = Math.max(0, soleTraderTaxableIncome - PERSONAL_ALLOWANCE);
  const soleTraderIncomeTax = calcIncomeTax(taxableAfterPA);

  // Class 4 NI on private practice profit only
  let soleTraderNI = 0;
  if (soleTraderProfit > NI_LOWER_LIMIT) {
    const niableBand1 = Math.min(soleTraderProfit - NI_LOWER_LIMIT, NI_UPPER_LIMIT - NI_LOWER_LIMIT);
    soleTraderNI += niableBand1 * 0.09;
    if (soleTraderProfit > NI_UPPER_LIMIT) {
      soleTraderNI += (soleTraderProfit - NI_UPPER_LIMIT) * 0.02;
    }
  }

  const soleTraderTotalTax = soleTraderIncomeTax + soleTraderNI;
  const soleTraderNetIncome = soleTraderTaxableIncome - soleTraderTotalTax;

  // --- Limited company ---
  const companyProfit = privateIncome - expenses;
  const corporationTax = companyProfit * 0.25;
  const profitAfterCT = companyProfit - corporationTax;
  const dividendAmount = profitAfterCT - desiredSalary;

  // Dividend tax
  const taxableDividends = Math.max(0, dividendAmount - DIVIDEND_ALLOWANCE);
  const totalIncomeBeforeDividends = nhsIncome + desiredSalary;

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

  // NHS income tax (PAYE side)
  const nhsIncomeTaxableAfterPA = Math.max(0, nhsIncome - PERSONAL_ALLOWANCE);
  const nhsIncomeTax = calcIncomeTax(nhsIncomeTaxableAfterPA);

  const limitedCompanyTotalTax = corporationTax + dividendTax + nhsIncomeTax;
  const limitedCompanyNetIncome = nhsIncome + desiredSalary + dividendAmount - dividendTax;

  const taxSavings = soleTraderTotalTax - limitedCompanyTotalTax;
  const savingsPerMonth = taxSavings / 12;

  return {
    soleTraderTaxableIncome,
    soleTraderTotalTax,
    soleTraderNetIncome,
    companyProfit,
    corporationTax,
    dividendAmount,
    dividendTax,
    limitedCompanyTotalTax,
    limitedCompanyNetIncome,
    taxSavings,
    savingsPerMonth,
  };
}
