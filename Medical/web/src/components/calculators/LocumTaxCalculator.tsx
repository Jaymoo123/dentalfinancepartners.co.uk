"use client";

import { useState } from "react";

export function LocumTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(80000);
  const [expenses, setExpenses] = useState(5000);
  const [pensionContributions, setPensionContributions] = useState(10000);
  const [hasStudentLoan, setHasStudentLoan] = useState(false);
  const [studentLoanPlan, setStudentLoanPlan] = useState<"plan1" | "plan2" | "plan4">("plan2");

  // Tax calculation
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const higherRateLimit = 125140;
  
  const netIncome = grossIncome - expenses - pensionContributions;
  const taxableIncome = Math.max(0, netIncome - personalAllowance);
  
  // Calculate tax by bands
  let incomeTax = 0;
  if (taxableIncome > 0) {
    const basicBandIncome = Math.min(taxableIncome, basicRateLimit - personalAllowance);
    incomeTax += basicBandIncome * 0.20;
    
    if (taxableIncome > basicRateLimit - personalAllowance) {
      const higherBandIncome = Math.min(
        taxableIncome - (basicRateLimit - personalAllowance),
        higherRateLimit - basicRateLimit
      );
      incomeTax += higherBandIncome * 0.40;
      
      if (taxableIncome > higherRateLimit - personalAllowance) {
        const additionalBandIncome = taxableIncome - (higherRateLimit - personalAllowance);
        incomeTax += additionalBandIncome * 0.45;
      }
    }
  }
  
  // National Insurance (Class 4 for self-employed) - 2025/26 rates
  const niLowerLimit = 12570;
  const niUpperLimit = 50270;
  
  let nationalInsurance = 0;
  if (netIncome > niLowerLimit) {
    const niableBand1 = Math.min(netIncome - niLowerLimit, niUpperLimit - niLowerLimit);
    nationalInsurance += niableBand1 * 0.06; // 6% on £12,570-£50,270
    
    if (netIncome > niUpperLimit) {
      const niableBand2 = netIncome - niUpperLimit;
      nationalInsurance += niableBand2 * 0.02; // 2% above £50,270
    }
  }
  
  // Student loan repayment
  let studentLoanRepayment = 0;
  if (hasStudentLoan) {
    const thresholds = {
      plan1: 24990,
      plan2: 27295,
      plan4: 31395,
    };
    const threshold = thresholds[studentLoanPlan];
    if (netIncome > threshold) {
      studentLoanRepayment = (netIncome - threshold) * 0.09;
    }
  }
  
  const totalDeductions = incomeTax + nationalInsurance + studentLoanRepayment;
  const netTakeHome = netIncome - totalDeductions;
  const effectiveTaxRate = (totalDeductions / netIncome) * 100;

  return (
    <div className="bg-white border-l-4 border-[var(--navy)] p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-[var(--navy)] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Locum Doctor Tax Calculator</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Calculate your income tax, National Insurance, and student loan repayments as a self-employed locum doctor.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="gross-income" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Gross locum income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="gross-income"
                type="number"
                inputMode="numeric"
                min="0"
                step="5000"
                value={grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="expenses" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Allowable expenses
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="expenses"
                type="number"
                inputMode="numeric"
                min="0"
                step="500"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">GMC, indemnity, BMA, travel, equipment</p>
          </div>

          <div>
            <label htmlFor="pension" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Pension contributions
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="pension"
                type="number"
                inputMode="numeric"
                min="0"
                step="1000"
                value={pensionContributions}
                onChange={(e) => setPensionContributions(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Personal pension or NHS locum contributions</p>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasStudentLoan}
                onChange={(e) => setHasStudentLoan(e.target.checked)}
                className="w-5 h-5 border-2 border-slate-300 text-[var(--navy)] focus:ring-[var(--navy)] focus:ring-offset-0"
              />
              <span className="text-sm font-semibold text-slate-900">I have a student loan</span>
            </label>
          </div>

          {hasStudentLoan && (
            <div>
              <label htmlFor="loan-plan" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Student loan plan
              </label>
              <select
                id="loan-plan"
                value={studentLoanPlan}
                onChange={(e) => setStudentLoanPlan(e.target.value as typeof studentLoanPlan)}
                className="w-full border-2 border-slate-300 bg-white px-3 sm:px-4 py-3 text-sm sm:text-base font-semibold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              >
                <option value="plan1">Plan 1 (before 2012)</option>
                <option value="plan2">Plan 2 (2012-2023)</option>
                <option value="plan4">Plan 4 (postgraduate)</option>
              </select>
            </div>
          )}
        </div>

        <div className="bg-[var(--navy)] p-6 sm:p-8 text-white">
          <div className="mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-[var(--copper)] uppercase tracking-wider mb-2">Your net income</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono">
              £{netTakeHome.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-300 uppercase tracking-wider">After tax and deductions</div>
          </div>

          <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Gross income</span>
              <span className="text-base sm:text-lg font-semibold text-slate-400">
                £{grossIncome.toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Expenses</span>
              <span className="text-base sm:text-lg font-semibold text-slate-400">
                -£{expenses.toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Pension</span>
              <span className="text-base sm:text-lg font-semibold text-slate-400">
                -£{pensionContributions.toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-slate-700 pt-3">
              <span className="text-xs sm:text-sm text-slate-300">Net income</span>
              <span className="text-base sm:text-lg font-semibold text-white">
                £{netIncome.toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Income tax</span>
              <span className="text-base sm:text-lg font-semibold text-red-300">
                -£{incomeTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">National Insurance</span>
              <span className="text-base sm:text-lg font-semibold text-red-300">
                -£{nationalInsurance.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </span>
            </div>
            {hasStudentLoan && studentLoanRepayment > 0 && (
              <div className="flex justify-between items-baseline">
                <span className="text-xs sm:text-sm text-slate-300">Student loan</span>
                <span className="text-base sm:text-lg font-semibold text-red-300">
                  -£{studentLoanRepayment.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
                </span>
              </div>
            )}
            <div className="flex justify-between items-baseline border-t border-slate-700 pt-3">
              <span className="text-xs sm:text-sm font-bold text-[var(--copper)]">Effective tax rate</span>
              <span className="text-xl sm:text-2xl font-bold text-[var(--copper)]">
                {effectiveTaxRate.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 border-t border-slate-700 pt-4 sm:pt-6">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This calculator is for self-employed locum doctors. Figures are for 2025/26 tax year. Includes Class 4 NI (6% on £12,570-£50,270, 2% above). Does not include Class 2 NI (£3.70/week).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
