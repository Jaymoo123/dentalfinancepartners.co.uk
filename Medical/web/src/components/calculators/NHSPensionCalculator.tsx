"use client";

import { useState } from "react";

export function NHSPensionCalculator() {
  const [thresholdIncome, setThresholdIncome] = useState(150000);
  const [pensionGrowth, setPensionGrowth] = useState(40000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [taxBand, setTaxBand] = useState<"basic" | "higher" | "additional">("higher");

  const taxRates = {
    basic: 0.20,
    higher: 0.40,
    additional: 0.45,
  };

  // Calculate adjusted income
  const adjustedIncome = thresholdIncome + pensionGrowth;
  
  // Calculate tapered allowance
  const standardAllowance = 60000;
  const minAllowance = 10000;
  const thresholdLimit = 200000;
  const adjustedLimit = 260000;
  
  let annualAllowance = standardAllowance;
  let isTapered = false;
  
  if (thresholdIncome > thresholdLimit && adjustedIncome > adjustedLimit) {
    isTapered = true;
    const excessIncome = adjustedIncome - adjustedLimit;
    const reduction = excessIncome / 2;
    annualAllowance = Math.max(minAllowance, standardAllowance - reduction);
  }
  
  // Calculate excess and tax charge
  const excess = Math.max(0, pensionGrowth - annualAllowance);
  const taxCharge = excess * taxRates[taxBand];
  
  // Calculate effective cost
  const effectiveCost = taxCharge > 0 ? (taxCharge / pensionGrowth) * 100 : 0;

  return (
    <div className="bg-white border-l-4 border-[var(--navy)] p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-[var(--navy)] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">NHS Pension Annual Allowance Calculator</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Calculate your tapered annual allowance and potential tax charges on NHS pension growth.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="threshold-income" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Threshold income (salary + other income)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="threshold-income"
                type="number"
                inputMode="numeric"
                min="0"
                step="5000"
                value={thresholdIncome}
                onChange={(e) => setThresholdIncome(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">NHS salary + private income - pension contributions</p>
          </div>

          <div>
            <label htmlFor="pension-growth" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Annual pension growth
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="pension-growth"
                type="number"
                inputMode="numeric"
                min="0"
                step="1000"
                value={pensionGrowth}
                onChange={(e) => setPensionGrowth(Number(e.target.value))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">From your annual pension statement</p>
          </div>

          <div>
            <label htmlFor="tax-band" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Your income tax band
            </label>
            <select
              id="tax-band"
              value={taxBand}
              onChange={(e) => setTaxBand(e.target.value as typeof taxBand)}
              className="w-full border-2 border-slate-300 bg-white px-3 sm:px-4 py-3 text-sm sm:text-base font-semibold text-slate-900 focus:border-[var(--navy)] focus:outline-none transition-colors min-h-[44px]"
            >
              <option value="basic">Basic rate (20%)</option>
              <option value="higher">Higher rate (40%)</option>
              <option value="additional">Additional rate (45%)</option>
            </select>
          </div>
        </div>

        <div className="bg-[var(--navy)] p-6 sm:p-8 text-white">
          <div className="mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-[var(--copper)] uppercase tracking-wider mb-2">
              {isTapered ? "Tapered allowance" : "Standard allowance"}
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono">
              £{annualAllowance.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
              Your annual allowance for 2025/26
            </div>
          </div>

          {excess > 0 && (
            <div className="mb-4 sm:mb-6 p-4 bg-red-900/30 border border-red-500/50">
              <div className="text-xs sm:text-sm font-bold text-red-300 uppercase tracking-wider mb-1">
                Annual allowance charge
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                £{taxCharge.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </div>
              <div className="mt-1 text-xs text-red-200">
                Tax on £{excess.toLocaleString("en-GB")} excess pension growth
              </div>
            </div>
          )}

          <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Threshold income</span>
              <span className="text-base sm:text-lg font-semibold text-slate-400">
                £{thresholdIncome.toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Adjusted income</span>
              <span className="text-base sm:text-lg font-semibold text-slate-400">
                £{adjustedIncome.toLocaleString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">Pension growth</span>
              <span className="text-base sm:text-lg font-semibold text-slate-400">
                £{pensionGrowth.toLocaleString("en-GB")}
              </span>
            </div>
            {excess > 0 && (
              <>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm text-slate-300">Excess growth</span>
                  <span className="text-base sm:text-lg font-semibold text-red-300">
                    £{excess.toLocaleString("en-GB")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm text-slate-300">Effective cost</span>
                  <span className="text-base sm:text-lg font-semibold text-red-300">
                    {effectiveCost.toFixed(1)}%
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 sm:mt-8 border-t border-slate-700 pt-4 sm:pt-6">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isTapered 
                ? "Your annual allowance is tapered because your threshold income exceeds £200k and adjusted income exceeds £260k. The allowance reduces by £1 for every £2 over £260k."
                : "You have the standard £60,000 annual allowance. Tapering only applies if threshold income exceeds £200k and adjusted income exceeds £260k."
              }
            </p>
            {excess > 0 && (
              <p className="mt-3 text-xs sm:text-sm text-red-200 leading-relaxed">
                ⚠️ You have excess pension growth of £{excess.toLocaleString("en-GB")}. Consider using Scheme Pays or reducing pensionable income to avoid this charge.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
