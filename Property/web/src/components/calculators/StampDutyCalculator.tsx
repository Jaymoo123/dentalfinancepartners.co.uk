"use client";

import { useState } from "react";
import {
  STANDARD_SDLT_BANDS,
  FTB_SDLT_BANDS,
  ADDITIONAL_DWELLING_SURCHARGE,
  marginalSdlt,
} from "@/lib/sdlt";

/**
 * Stamp Duty Land Tax (SDLT) calculator — England & Northern Ireland.
 * Figures locked from docs/property/house_positions.md §1 (from 1 April 2025):
 *   Standard bands: 0% to 125k, 2% 125k-250k, 5% 250k-925k, 10% 925k-1.5m, 12% above.
 *   Additional-dwelling surcharge: +5% of the whole price (from 31 Oct 2024).
 *   First-time-buyer relief: 0% to 300k, 5% 300k-500k, withdrawn if price > 500k.
 *   Non-UK-resident surcharge: +2% of the whole price.
 * Scotland (LBTT) and Wales (LTT) are different taxes — not covered here.
 */

type Variant = "page" | "embed";

const gbp = (n: number) =>
  "£" + Math.round(n).toLocaleString("en-GB", { maximumFractionDigits: 0 });

export function StampDutyCalculator({ variant = "page" }: { variant?: Variant }) {
  const [price, setPrice] = useState(350_000);
  const [additional, setAdditional] = useState(true);
  const [ftb, setFtb] = useState(false);
  const [nonResident, setNonResident] = useState(false);

  // First-time-buyer relief: only if the buyer is NOT also buying an additional
  // property and the price is within the £500k cap.
  const ftbReliefApplies = ftb && !additional && price <= 500_000;
  const standard = marginalSdlt(price, ftbReliefApplies ? FTB_SDLT_BANDS : STANDARD_SDLT_BANDS);
  const surcharge = additional ? price * ADDITIONAL_DWELLING_SURCHARGE : 0;
  const nonRes = nonResident ? price * 0.02 : 0;
  const total = standard + surcharge + nonRes;
  const effectiveRate = price > 0 ? (total / price) * 100 : 0;

  // Toggling Additional and First-time buyer are mutually exclusive.
  const toggleAdditional = () => {
    setAdditional((v) => {
      if (!v) setFtb(false);
      return !v;
    });
  };
  const toggleFtb = () => {
    setFtb((v) => {
      if (!v) setAdditional(false);
      return !v;
    });
  };

  const ctaHref =
    variant === "embed"
      ? "https://www.propertytaxpartners.co.uk/contact?utm_source=partner-embed&utm_medium=iframe&utm_campaign=sdlt-calculator"
      : "#get-expert-help";
  const ctaText =
    variant === "embed"
      ? "Buying a buy-to-let? We'll handle the tax →"
      : "Get expert help with your purchase →";

  return (
    <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
          Stamp Duty (SDLT) Calculator
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Work out the Stamp Duty Land Tax on a property purchase, including the 5% additional-dwelling
          surcharge for buy-to-lets and second homes. <span className="font-semibold text-slate-700">England &amp; Northern Ireland.</span>
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label
              htmlFor="sdlt-price"
              className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2"
            >
              Property price
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>
              <input
                id="sdlt-price"
                type="number"
                inputMode="numeric"
                min="0"
                step="5000"
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
              About this purchase
            </legend>

            <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
              <input
                type="checkbox"
                checked={additional}
                onChange={toggleAdditional}
                className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                <span className="font-bold">Additional property</span> (buy-to-let or second home) —
                adds the <span className="font-semibold">5% surcharge</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
              <input
                type="checkbox"
                checked={ftb}
                onChange={toggleFtb}
                className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                <span className="font-bold">First-time buyer</span> — relief on the first £300,000 (price up to £500,000)
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
              <input
                type="checkbox"
                checked={nonResident}
                onChange={() => setNonResident((v) => !v)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                <span className="font-bold">Non-UK resident</span> — adds the <span className="font-semibold">2% surcharge</span>
              </span>
            </label>
          </fieldset>

          <p className="text-xs text-slate-500 leading-relaxed">
            Buying in Scotland or Wales? Different taxes apply (LBTT and LTT). This tool covers England &amp; Northern Ireland only.
          </p>
        </div>

        {/* Result */}
        <div className="bg-slate-900 p-6 sm:p-8 text-white">
          <div className="mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Stamp duty you&apos;ll pay
            </div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono">
              {gbp(total)}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
              Effective rate {effectiveRate.toFixed(1)}%
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs sm:text-sm text-slate-300">
                {ftbReliefApplies ? "Standard SDLT (first-time-buyer relief)" : "Standard SDLT"}
              </span>
              <span className="text-base sm:text-lg font-semibold text-white">{gbp(standard)}</span>
            </div>
            {additional && (
              <div className="flex justify-between items-baseline">
                <span className="text-xs sm:text-sm text-slate-300">Additional-property surcharge (5%)</span>
                <span className="text-base sm:text-lg font-semibold text-white">{gbp(surcharge)}</span>
              </div>
            )}
            {nonResident && (
              <div className="flex justify-between items-baseline">
                <span className="text-xs sm:text-sm text-slate-300">Non-resident surcharge (2%)</span>
                <span className="text-base sm:text-lg font-semibold text-white">{gbp(nonRes)}</span>
              </div>
            )}
            {ftb && !ftbReliefApplies && (
              <p className="text-xs text-amber-300/90 leading-relaxed">
                {additional
                  ? "First-time-buyer relief does not apply to an additional property."
                  : "First-time-buyer relief is withdrawn above £500,000."}
              </p>
            )}
          </div>

          <div className="mt-6 sm:mt-8 border-t border-slate-700 pt-5 sm:pt-6">
            <a
              href={ctaHref}
              {...(variant === "embed" ? { target: "_blank", rel: "noopener" } : {})}
              className="inline-flex w-full items-center justify-center bg-emerald-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white border-b-4 border-emerald-800 hover:bg-emerald-700 active:border-b-2 active:translate-y-0.5 transition-colors"
            >
              {ctaText}
            </a>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              An estimate based on current rates. Reliefs and edge cases (mixed-use, six-or-more dwellings,
              uninhabitable property) can change the figure — we can confirm your exact position.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
