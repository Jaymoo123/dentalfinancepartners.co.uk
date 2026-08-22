"use client";

import { useState } from "react";
import { EmbedCta } from "@/components/embed/EmbedCta";
import { NumberInput } from "@/components/calculators/fields/NumberInput";
import { ResultGate } from "@/components/calculators/ResultGate";
import { Eyebrow } from "@/components/ui/page-blocks";

export function MTDCheckerCalculator({
  variant = "page",
}: {
  variant?: "page" | "embed";
}) {
  const [rentalIncome, setRentalIncome] = useState(35000);
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState(20000);
  const [otherIncome, setOtherIncome] = useState(0);

  const totalIncome = rentalIncome + selfEmploymentIncome + otherIncome;
  const mtdThreshold = 50000;
  const requiresMTD = totalIncome >= mtdThreshold;
  const distanceFromThreshold = mtdThreshold - totalIncome;

  return (
    <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        {/* Was a filled navy pill badge. Eyebrow is the shared section
            label; it carries its own bottom margin. */}
        <Eyebrow>Calculator</Eyebrow>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">MTD Checker</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Check if you need to comply with Making Tax Digital from April 2026.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="rental-income-mtd" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Annual rental income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="rental-income-mtd"
                value={rentalIncome}
                onChange={setRentalIncome}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-amber-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Before expenses</p>
          </div>

          <div>
            <label htmlFor="self-employment-income" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Self-employment income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="self-employment-income"
                value={selfEmploymentIncome}
                onChange={setSelfEmploymentIncome}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-amber-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">If applicable</p>
          </div>

          <div>
            <label htmlFor="other-income" className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Other business income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <NumberInput
                id="other-income"
                value={otherIncome}
                onChange={setOtherIncome}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-amber-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Optional</p>
          </div>
        </div>

        <ResultGate campaign="mtd-checker" enabled={variant !== "embed"}>
        {/* Navy in both outcomes, to match every other calculator result panel.
            The yes/no answer carries the amber or emerald signal instead. */}
        <div className="bg-slate-900 p-6 sm:p-8 text-white">
          <div className="mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-2">Your total income</div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono">
              £{totalIncome.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="border-t border-white/20 pt-4 sm:pt-6 mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-2">MTD threshold</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              £{mtdThreshold.toLocaleString("en-GB")}
            </div>
          </div>

          <div className="border-t border-white/20 pt-4 sm:pt-6 mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-3">Do you need MTD?</div>
            <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 text-xl sm:text-2xl font-bold ${requiresMTD ? 'bg-amber-400 text-amber-950' : 'bg-emerald-400 text-emerald-950'}`}>
              {requiresMTD ? "YES" : "NO"}
            </div>
            {!requiresMTD && distanceFromThreshold > 0 && (
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/90">
                You are £{distanceFromThreshold.toLocaleString("en-GB")} below the threshold.
              </p>
            )}
          </div>

          <div className="border-t border-white/20 pt-4 sm:pt-6">
            {requiresMTD ? (
              <div className="space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-bold text-white">You must comply (live since 6 April 2026)</p>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  Quarterly digital submissions to HMRC using MTD-compatible software. Reports due within one month of each quarter end.
                </p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-bold text-white">You&apos;re currently below the threshold</p>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  Monitor your income. If you exceed £50,000, you&apos;ll need to comply. We recommend preparing early if you&apos;re close.
                </p>
              </div>
            )}
          </div>
        </div>
        </ResultGate>
      </div>
      {variant === "embed" ? <EmbedCta campaign="mtd-checker" /> : null}
    </div>
  );
}