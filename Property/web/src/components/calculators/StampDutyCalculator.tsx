"use client";

import { useState } from "react";
import {
  STANDARD_SDLT_BANDS,
  FTB_SDLT_BANDS,
  NON_RESIDENTIAL_SDLT_BANDS,
  ADDITIONAL_DWELLING_SURCHARGE,
  marginalSdlt,
} from "@/lib/sdlt";
import { NumberInput } from "@/components/calculators/fields/NumberInput";
import { ResultGate } from "@/components/calculators/ResultGate";
import { Eyebrow } from "@/components/ui/page-blocks";

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
  // Connected-party / company-transfer mode (s.53 FA 2003): SDLT is charged on
  // MARKET VALUE, not the consideration paid. Page variant only; the embed keeps
  // its current height and behaviour.
  const [connectedParty, setConnectedParty] = useState(false);
  const [marketValue, setMarketValue] = useState(350_000);
  // s.116(7) FA 2003: 6+ dwellings in one transaction are AUTOMATICALLY treated
  // as non-residential (statutory deeming, not an election). No 5% surcharge on
  // that basis.
  const [sixDwellings, setSixDwellings] = useState(false);

  const showCompanyModes = variant !== "embed";
  const connectedActive = showCompanyModes && connectedParty;
  const sixActive = showCompanyModes && sixDwellings;

  // The chargeable amount: market value under s.53 when transferring to a
  // connected company, otherwise the price paid. Identical to price when the
  // mode is off, so existing behaviour is unchanged.
  const chargeableAmount = connectedActive ? Math.max(0, marketValue) : price;

  // First-time-buyer relief: only if the buyer is NOT also buying an additional
  // property and the price is within the £500k cap.
  const ftbReliefApplies = ftb && !additional && chargeableAmount <= 500_000;
  const standard = marginalSdlt(chargeableAmount, ftbReliefApplies ? FTB_SDLT_BANDS : STANDARD_SDLT_BANDS);
  const surcharge = additional ? chargeableAmount * ADDITIONAL_DWELLING_SURCHARGE : 0;
  const nonRes = nonResident ? chargeableAmount * 0.02 : 0;
  const residentialTotal = standard + surcharge + nonRes;
  // Six-dwellings basis: non-residential bands, no additional-dwelling surcharge.
  // Surcharges are excluded on this basis; edge cases go to advice, per the
  // existing disclaimer pattern.
  const sixDwellingsTotal = marginalSdlt(chargeableAmount, NON_RESIDENTIAL_SDLT_BANDS);
  const total = sixActive ? sixDwellingsTotal : residentialTotal;
  const effectiveRate = chargeableAmount > 0 ? (total / chargeableAmount) * 100 : 0;

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
    <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        {/* Was a filled navy pill badge. Eyebrow is the shared section
            label; it carries its own bottom margin. */}
        <Eyebrow>Calculator</Eyebrow>
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
              <NumberInput
                id="sdlt-price"
                value={price}
                onChange={setPrice}
                className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
              About this purchase
            </legend>

            <label className="flex items-start gap-3 cursor-pointer rounded-xl border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
              <input
                type="checkbox"
                checked={additional}
                onChange={toggleAdditional}
                className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                <span className="font-bold">Additional property</span> (buy-to-let or second home):
                adds the <span className="font-semibold">5% surcharge</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer rounded-xl border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
              <input
                type="checkbox"
                checked={ftb}
                onChange={toggleFtb}
                className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                <span className="font-bold">First-time buyer</span>: relief on the first £300,000 (price up to £500,000)
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer rounded-xl border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
              <input
                type="checkbox"
                checked={nonResident}
                onChange={() => setNonResident((v) => !v)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                <span className="font-bold">Non-UK resident</span>: adds the <span className="font-semibold">2% surcharge</span>
              </span>
            </label>

            {showCompanyModes && (
              <>
                <label className="flex items-start gap-3 cursor-pointer rounded-xl border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                  <input
                    type="checkbox"
                    checked={connectedParty}
                    onChange={() =>
                      setConnectedParty((v) => {
                        if (!v) {
                          // A connected-company transfer is almost always an
                          // additional-property purchase; pre-tick, still editable.
                          setAdditional(true);
                          setFtb(false);
                          setMarketValue(price);
                        }
                        return !v;
                      })
                    }
                    className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
                  />
                  <span className="text-sm leading-snug text-slate-800">
                    <span className="font-bold">Transfer to your own company</span> (connected party):
                    SDLT is charged on <span className="font-semibold">market value</span>, not the price paid
                  </span>
                </label>

                {connectedParty && (
                  <div className="ml-8">
                    <label
                      htmlFor="sdlt-market-value"
                      className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1"
                    >
                      Open-market value
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">£</span>
                      <NumberInput
                        id="sdlt-market-value"
                        value={marketValue}
                        onChange={setMarketValue}
                        className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 text-lg font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      The figure SDLT is calculated on for a connected-party transfer, even if no cash changes hands (s.53 FA 2003).
                    </p>
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer rounded-xl border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                  <input
                    type="checkbox"
                    checked={sixDwellings}
                    onChange={() => setSixDwellings((v) => !v)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
                  />
                  <span className="text-sm leading-snug text-slate-800">
                    <span className="font-bold">Six or more dwellings</span> in one transaction:
                    non-residential rates apply <span className="font-semibold">automatically</span> (s.116(7) FA 2003)
                  </span>
                </label>
              </>
            )}
          </fieldset>

          <p className="text-xs text-slate-500 leading-relaxed">
            Buying in Scotland or Wales? Different taxes apply (LBTT and LTT). This tool covers England &amp; Northern Ireland only.
          </p>
        </div>

        {/* Result */}
        <ResultGate campaign="stamp-duty-calculator" enabled={variant !== "embed"}>
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
            {connectedActive && (
              <p className="text-xs text-emerald-300/90 leading-relaxed">
                Connected-party transfer: charged on the £{Math.round(chargeableAmount).toLocaleString("en-GB")} market value (s.53 FA 2003), not the price paid.
              </p>
            )}
            {sixActive ? (
              <>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm text-slate-300">Non-residential basis (six-plus dwellings, no 5% surcharge)</span>
                  <span className="text-base sm:text-lg font-semibold text-white">{gbp(sixDwellingsTotal)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm text-slate-400">On the residential basis this would be</span>
                  <span className="text-sm font-semibold text-slate-400">{gbp(residentialTotal)}</span>
                </div>
                <p className="text-xs text-amber-300/90 leading-relaxed">
                  Six or more dwellings in a single transaction are treated as non-residential automatically. Surcharges and reliefs on multi-dwelling deals have edge cases; we can confirm your exact position.
                </p>
              </>
            ) : (
              <>
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
              </>
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
              className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
            >
              {ctaText}
            </a>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              An estimate based on current rates. Reliefs and edge cases (mixed-use, six-or-more dwellings,
              uninhabitable property) can change the figure, and we can confirm your exact position.
            </p>
          </div>
        </div>
        </ResultGate>
      </div>
    </div>
  );
}
