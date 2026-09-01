"use client";

import { useState } from "react";
import { EmbedCta } from "@/components/embed/EmbedCta";
import { computeIncorporation } from "@/lib/incorporation";
import { NumberInput } from "@/components/calculators/fields/NumberInput";
import { ResultGate } from "@/components/calculators/ResultGate";
import { Eyebrow } from "@/components/ui/page-blocks";

export function IncorporationCostCalculator({
  variant = "page",
}: {
  variant?: "page" | "embed";
}) {
  const [propertyValue, setPropertyValue] = useState(300000);
  const [purchasePrice, setPurchasePrice] = useState(200000);
  const [annualRentalIncome, setAnnualRentalIncome] = useState(24000);
  const [mortgageInterest, setMortgageInterest] = useState(9000);
  const [taxBand, setTaxBand] = useState<"basic" | "higher" | "additional">("higher");
  // One-off professional fees + running cost (page variant only; the embed keeps
  // its current height). All default 0 so the tax-only figures are unchanged.
  const [solicitorFee, setSolicitorFee] = useState(0);
  const [valuationFee, setValuationFee] = useState(0);
  const [lenderFee, setLenderFee] = useState(0);
  const [annualRunningCost, setAnnualRunningCost] = useState(0);

  const showFees = variant !== "embed";

  // All math via the shared incorporation engine (lib/incorporation.ts), which
  // reuses the locked CGT / SDLT / Section 24 / Corporation Tax / dividend modules,
  // so this calculator, the premium tool and the Excel model cannot drift apart.
  const res = computeIncorporation({
    propertyValue,
    purchasePrice,
    annualRentalIncome,
    mortgageInterest,
    taxBand,
    solicitorFee: showFees ? solicitorFee : 0,
    valuationFee: showFees ? valuationFee : 0,
    lenderFee: showFees ? lenderFee : 0,
    annualRunningCost: showFees ? annualRunningCost : 0,
  });

  const cgtCost = res.cgtCost;
  const sdltCost = res.sdltCost;
  const totalUpfrontCost = res.totalUpfrontCost;
  const annualSaving = res.annualSaving;
  const breakEvenYears = res.breakEvenYears;
  const effectiveCgtRate = res.capitalGain > 0 ? (res.cgtCost / res.capitalGain) * 100 : 0;

  return (
    <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        {/* Was a filled navy pill badge. Eyebrow is the shared section
            label; it carries its own bottom margin. */}
        <Eyebrow>Calculator</Eyebrow>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Incorporation Cost Calculator</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Calculate the upfront cost (CGT + SDLT) and break-even timeline for incorporating your rental property.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="property-value" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Current property value
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="property-value"
                value={propertyValue}
                onChange={setPropertyValue}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="purchase-price" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Original purchase price
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="purchase-price"
                value={purchasePrice}
                onChange={setPurchasePrice}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="rental-income-inc" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Annual rental income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="rental-income-inc"
                value={annualRentalIncome}
                onChange={setAnnualRentalIncome}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="mortgage-interest-inc" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Annual mortgage interest
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="mortgage-interest-inc"
                value={mortgageInterest}
                onChange={setMortgageInterest}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tax-band-inc" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Your income tax band
            </label>
            <select
              id="tax-band-inc"
              value={taxBand}
              onChange={(e) => setTaxBand(e.target.value as typeof taxBand)}
              className="w-full border-2 border-slate-300 bg-white px-3 sm:px-4 py-3 text-sm sm:text-base font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
            >
              <option value="basic">Basic rate (20%)</option>
              <option value="higher">Higher rate (40%)</option>
              <option value="additional">Additional rate (45%)</option>
            </select>
          </div>

          {showFees && (
            <fieldset className="space-y-4 rounded-xl border-2 border-slate-200 p-4">
              <legend className="px-1 text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                One-off fees and running costs (optional)
              </legend>
              {(
                [
                  ["inc-solicitor-fee", "Solicitor / conveyancing fee", solicitorFee, setSolicitorFee, "Typically £900-£1,800 for a company transfer"],
                  ["inc-valuation-fee", "Valuation fee", valuationFee, setValuationFee, "Lender or RICS valuation, typically £250-£500"],
                  ["inc-lender-fee", "Mortgage arrangement / broker fee", lenderFee, setLenderFee, "Typically £1,000-£2,000 if refinancing into the company"],
                  ["inc-running-cost", "Annual company running cost", annualRunningCost, setAnnualRunningCost, "Accountant, filings, registered office. Shown separately, never mixed into the tax saving"],
                ] as const
              ).map(([id, label, value, setter, help]) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-bold text-slate-700 mb-1">
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">£</span>
                    <NumberInput
                      id={id}
                      value={value}
                      onChange={setter}
                      className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-1.5 text-base font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[40px]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{help}</p>
                </div>
              ))}
            </fieldset>
          )}
        </div>

        <ResultGate campaign="incorporation-cost-calculator" enabled={variant !== "embed"}>
        <div className="bg-slate-900 p-6 sm:p-8 text-white space-y-6 sm:space-y-8">
          <div>
            <div className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Upfront cost</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono">
              £{totalUpfrontCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">CGT ({effectiveCgtRate.toFixed(0)}%)</span>
                <span className="font-semibold text-slate-300">£{cgtCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SDLT (incl. 5% surcharge)</span>
                <span className="font-semibold text-slate-300">£{sdltCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</span>
              </div>
              {res.professionalFees > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Professional fees (solicitor, valuation, lender)</span>
                  <span className="font-semibold text-slate-300">£{res.professionalFees.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 sm:pt-6">
            <div className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Annual saving</div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">
              £{annualSaving.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-300">per year after incorporating</div>
            {res.annualRunningCost > 0 && (
              <div className="mt-2 flex justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Annual company running cost (not counted in the saving)</span>
                <span className="font-semibold text-slate-300">£{res.annualRunningCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-700 pt-4 sm:pt-6">
            <div className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Break-even</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {breakEvenYears < 50 ? `${breakEvenYears.toFixed(1)} years` : "Never"}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-300">
              {breakEvenYears < 50 
                ? "Time to recover upfront costs"
                : "Annual saving too low to justify incorporation"}
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 sm:pt-6">
            <p className="text-xs text-slate-400 leading-relaxed">
              Simplified estimate. Actual costs depend on your specific circumstances and require full feasibility analysis.
            </p>
          </div>
        </div>
        </ResultGate>
      </div>
      {variant === "embed" ? <EmbedCta campaign="incorporation-cost-calculator" /> : null}
    </div>
  );
}
