"use client";

import { useState } from "react";

export function IncorporationCalculator() {
  const [privateIncome, setPrivateIncome] = useState(100000);
  const [expenses, setExpenses] = useState(15000);
  const [desiredSalary, setDesiredSalary] = useState(12570);
  const [nhsIncome, setNhsIncome] = useState(50000);

  // Sole trader calculation
  const soleTraderProfit = privateIncome - expenses;
  const soleTraderTaxableIncome = soleTraderProfit + nhsIncome;
  
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const higherRateLimit = 125140;
  
  // Calculate sole trader tax
  const taxableAfterPA = Math.max(0, soleTraderTaxableIncome - personalAllowance);
  let soleTraderIncomeTax = 0;
  
  if (taxableAfterPA > 0) {
    const basicBandIncome = Math.min(taxableAfterPA, basicRateLimit - personalAllowance);
    soleTraderIncomeTax += basicBandIncome * 0.20;
    
    if (taxableAfterPA > basicRateLimit - personalAllowance) {
      const higherBandIncome = Math.min(
        taxableAfterPA - (basicRateLimit - personalAllowance),
        higherRateLimit - basicRateLimit
      );
      soleTraderIncomeTax += higherBandIncome * 0.40;
      
      if (taxableAfterPA > higherRateLimit - personalAllowance) {
        const additionalBandIncome = taxableAfterPA - (higherRateLimit - personalAllowance);
        soleTraderIncomeTax += additionalBandIncome * 0.45;
      }
    }
  }
  
  // Sole trader NI (Class 4)
  const niLowerLimit = 12570;
  const niUpperLimit = 50270;
  let soleTraderNI = 0;
  
  if (soleTraderProfit > niLowerLimit) {
    const niableBand1 = Math.min(soleTraderProfit - niLowerLimit, niUpperLimit - niLowerLimit);
    soleTraderNI += niableBand1 * 0.09;
    
    if (soleTraderProfit > niUpperLimit) {
      const niableBand2 = soleTraderProfit - niUpperLimit;
      soleTraderNI += niableBand2 * 0.02;
    }
  }
  
  const soleTraderTotalTax = soleTraderIncomeTax + soleTraderNI;
  const soleTraderNetIncome = soleTraderTaxableIncome - soleTraderTotalTax;
  
  // Limited company calculation
  const companyProfit = privateIncome - expenses;
  const corporationTax = companyProfit * 0.25; // 25% corporation tax
  const profitAfterCT = companyProfit - corporationTax;
  
  // Salary (up to personal allowance, no tax/NI)
  const salaryTax = 0;
  const salaryNI = 0;
  
  // Dividends
  const dividendAmount = profitAfterCT - desiredSalary;
  const dividendAllowance = 500;
  const taxableDividends = Math.max(0, dividendAmount - dividendAllowance);
  
  // Calculate dividend tax based on total income
  const totalIncomeBeforeDividends = nhsIncome + desiredSalary;
  let dividendTax = 0;
  
  if (taxableDividends > 0) {
    // Determine which band dividends fall into
    const basicRateRemaining = Math.max(0, basicRateLimit - totalIncomeBeforeDividends);
    const higherRateRemaining = Math.max(0, higherRateLimit - totalIncomeBeforeDividends);
    
    if (basicRateRemaining > 0) {
      const basicRateDividends = Math.min(taxableDividends, basicRateRemaining);
      dividendTax += basicRateDividends * 0.1075; // 10.75% from April 2026
      
      if (taxableDividends > basicRateRemaining) {
        const higherRateDividends = Math.min(
          taxableDividends - basicRateRemaining,
          higherRateRemaining - basicRateRemaining
        );
        dividendTax += higherRateDividends * 0.3575; // 35.75% from April 2026
        
        if (taxableDividends > higherRateRemaining) {
          const additionalRateDividends = taxableDividends - higherRateRemaining;
          dividendTax += additionalRateDividends * 0.3935;
        }
      }
    } else if (higherRateRemaining > 0) {
      const higherRateDividends = Math.min(taxableDividends, higherRateRemaining);
      dividendTax += higherRateDividends * 0.3575; // 35.75% from April 2026
      
      if (taxableDividends > higherRateRemaining) {
        const additionalRateDividends = taxableDividends - higherRateRemaining;
        dividendTax += additionalRateDividends * 0.3935;
      }
    } else {
      dividendTax = taxableDividends * 0.3935;
    }
  }
  
  // Calculate NHS income tax (simplified - assume already taxed via PAYE)
  const nhsIncomeTaxableAfterPA = Math.max(0, nhsIncome - personalAllowance);
  let nhsIncomeTax = 0;
  
  if (nhsIncomeTaxableAfterPA > 0) {
    const basicBandIncome = Math.min(nhsIncomeTaxableAfterPA, basicRateLimit - personalAllowance);
    nhsIncomeTax += basicBandIncome * 0.20;
    
    if (nhsIncomeTaxableAfterPA > basicRateLimit - personalAllowance) {
      const higherBandIncome = Math.min(
        nhsIncomeTaxableAfterPA - (basicRateLimit - personalAllowance),
        higherRateLimit - basicRateLimit
      );
      nhsIncomeTax += higherBandIncome * 0.40;
    }
  }
  
  const limitedCompanyTotalTax = corporationTax + dividendTax + nhsIncomeTax;
  const limitedCompanyNetIncome = nhsIncome + desiredSalary + dividendAmount - dividendTax;
  
  const taxSavings = soleTraderTotalTax - limitedCompanyTotalTax;
  const savingsPerMonth = taxSavings / 12;

  return (
    <div className="bg-white border-l-4 border-[var(--navy)] p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-[var(--navy)] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Private Practice Incorporation Calculator</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Compare tax as a sole trader vs limited company for your private practice income.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="private-income" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Private practice income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="private-income"
                type="number"
                inputMode="numeric"
                min="0"
                step="5000"
                value={privateIncome}
                onChange={(e) => setPrivateIncome(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nhs-income" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              NHS income (if any)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="nhs-income"
                type="number"
                inputMode="numeric"
                min="0"
                step="5000"
                value={nhsIncome}
                onChange={(e) => setNhsIncome(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="expenses-inc" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Business expenses
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="expenses-inc"
                type="number"
                inputMode="numeric"
                min="0"
                step="1000"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="salary" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Desired salary from company
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="salary"
                type="number"
                inputMode="numeric"
                min="0"
                step="1000"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Usually £12,570 (personal allowance)</p>
          </div>
        </div>

        <div className="bg-[var(--navy)] p-6 sm:p-8 text-white">
          <div className="mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-[var(--copper)] uppercase tracking-wider mb-2">
              {taxSavings > 0 ? "Annual tax savings" : "No savings"}
            </div>
            <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-mono ${taxSavings > 0 ? 'text-[var(--copper)]' : 'text-slate-400'}`}>
              £{Math.abs(taxSavings).toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
              {taxSavings > 0 ? "By incorporating" : taxSavings < 0 ? "Stay as sole trader" : "Break even"}
            </div>
          </div>

          {taxSavings > 0 && (
            <div className="mb-4 p-4 bg-[var(--copper-soft)] border border-[var(--copper)]/30">
              <div className="text-xs font-bold text-[var(--copper)] uppercase tracking-wider mb-1">
                Monthly savings
              </div>
              <div className="text-2xl font-bold text-[var(--copper)] font-mono">
                £{savingsPerMonth.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </div>
            </div>
          )}

          <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">As sole trader</div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Total income</span>
                  <span className="font-semibold text-white">
                    £{soleTraderTaxableIncome.toLocaleString("en-GB")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Income tax + NI</span>
                  <span className="font-semibold text-red-300">
                    -£{soleTraderTotalTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm border-t border-slate-700 pt-2">
                  <span className="text-slate-300 font-bold">Net income</span>
                  <span className="font-bold text-white">
                    £{soleTraderNetIncome.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">As limited company</div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Company profit</span>
                  <span className="font-semibold text-white">
                    £{companyProfit.toLocaleString("en-GB")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Corporation tax (25%)</span>
                  <span className="font-semibold text-red-300">
                    -£{corporationTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Salary</span>
                  <span className="font-semibold text-white">
                    £{desiredSalary.toLocaleString("en-GB")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Dividends</span>
                  <span className="font-semibold text-white">
                    £{dividendAmount.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-slate-300">Dividend tax</span>
                  <span className="font-semibold text-red-300">
                    -£{dividendTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm border-t border-slate-700 pt-2">
                  <span className="text-slate-300">Total tax</span>
                  <span className="font-semibold text-red-300">
                    -£{limitedCompanyTotalTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm border-t border-slate-700 pt-2">
                  <span className="text-slate-300 font-bold">Net income</span>
                  <span className="font-bold text-white">
                    £{limitedCompanyNetIncome.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 border-t border-slate-700 pt-4 sm:pt-6">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This is a simplified comparison for 2026/27 using updated dividend tax rates (10.75% basic, 35.75% higher, 39.35% additional). Corporation tax is 25%. Actual savings depend on IR35 status, pension planning, and other factors. Speak to a specialist medical accountant before incorporating.
            </p>
            {taxSavings < 0 && (
              <p className="mt-2 text-xs sm:text-sm text-red-200 leading-relaxed">
                ⚠️ At this income level, incorporation may not be beneficial due to corporation tax and dividend tax rates. Consider other factors like liability protection.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
