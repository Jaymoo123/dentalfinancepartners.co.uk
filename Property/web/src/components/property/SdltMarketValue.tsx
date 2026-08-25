import { ArrowRight } from "lucide-react";
import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";
import {
  ADDITIONAL_DWELLING_SURCHARGE,
  additionalDwellingSdlt,
  marginalSdlt,
} from "@/lib/sdlt";

/**
 * The connected-party market-value rule, as money rather than as a sentence.
 *
 * The section's claim is the one landlords consistently get wrong: no money has
 * to change hands for SDLT to be due, because you and your company are
 * connected persons, so the transfer is deemed to happen at market value. Prose
 * can only assert that. Setting the price actually paid beside the value the
 * charge is computed on, and then showing both bills, makes the size of the
 * substitution visible in one look, which is the whole reason the section
 * exists.
 *
 * EVERY FIGURE IS DERIVED, none is typed in. The bills come from
 * `additionalDwellingSdlt` in `lib/sdlt.ts`, the same function behind the stamp
 * duty calculator and the incorporation cost calculator, whose docstring states
 * it is the figure a company pays when a rental is transferred into it. So this
 * visual cannot drift from the calculators the paragraph above it links to, and
 * a band change in `house_positions.md` flows through here without anyone
 * remembering to update a component. Do not hard-code a total here, ever.
 *
 * The two prices are the worked example the section's own copy already uses
 * (bought for £180,000, now worth £310,000), so the figure and the prose are
 * telling one story rather than two.
 *
 * Server component, no JavaScript.
 *
 * Palette: emerald for the price paid, orange for the value actually charged.
 * That is the #059669 / #ea580c pair already validated and shipped in
 * `RentalProfitStack` and `RateWedge`. Re-run before changing either:
 *
 *   node scripts/validate_palette.js "#059669,#ea580c" --mode light
 *
 * Emerald and rose FAILS CVD separation, so do not "fix" this to red and green.
 * Nothing rests on hue in any case: every figure is direct-labelled beside its
 * own bar, and the bars are `aria-hidden` for exactly that reason.
 */

/** The section's own worked example. Kept here so the figure and copy agree. */
const PRICE_PAID = 180_000;
const MARKET_VALUE = 310_000;

const gbp = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export function SdltMarketValue() {
  const paidBill = additionalDwellingSdlt(PRICE_PAID);
  const valueBill = additionalDwellingSdlt(MARKET_VALUE);
  const extra = valueBill - paidBill;

  const bands = marginalSdlt(MARKET_VALUE);
  const surcharge = MARKET_VALUE * ADDITIONAL_DWELLING_SURCHARGE;

  // Bars are drawn against the larger of the two, so the shorter one reads as a
  // proportion of it rather than both filling the track and cancelling out.
  const paidWidth = (PRICE_PAID / MARKET_VALUE) * 100;

  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          SDLT is charged on market value, not on what you paid
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          You and your company are connected persons, so the transfer is treated as taking place at market value
          whatever the paperwork says the consideration was.
        </p>

        <dl className="mt-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-sm font-semibold text-slate-700">What you paid for it</dt>
              <dd className="text-lg font-bold text-slate-900 sm:text-xl">{gbp(PRICE_PAID)}</dd>
            </div>
            <div aria-hidden className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-600" style={{ width: `${paidWidth}%` }} />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-sm font-semibold text-slate-900">
                What it is worth now, and what SDLT is charged on
              </dt>
              <dd className="text-lg font-bold text-slate-900 sm:text-xl">{gbp(MARKET_VALUE)}</dd>
            </div>
            <div aria-hidden className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full rounded-full bg-[#ea580c]" />
            </div>
          </div>
        </dl>

        {/* The bill itself, and the counterfactual beside it. The gap between the
            two is the cost of the market-value rule on this one property, which
            is the number a reader is actually trying to find. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              If it were charged on what you paid
            </div>
            <div className="mt-1.5 text-2xl font-bold text-slate-500 line-through decoration-slate-400 sm:text-3xl">
              {gbp(paidBill)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-900 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              SDLT actually due on the transfer
            </div>
            <div className="mt-1.5 text-2xl font-bold text-white sm:text-3xl">{gbp(valueBill)}</div>
            <div className="mt-2 text-sm text-emerald-400">
              {gbp(extra)} more, on a transfer where no money changes hands
            </div>
          </div>
        </div>

        {/* How the bill is built. Both components are named in rendered text
            rather than left to the reader to infer from a total: "standard
            residential bands" and "additional-dwelling surcharge" are the terms
            the section is about. */}
        <div className="mt-6 border-t border-slate-200 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-700">
            <span>
              <span className="font-semibold text-slate-900">{gbp(bands)}</span> standard residential bands
            </span>
            <span aria-hidden className="text-slate-400">
              +
            </span>
            <span>
              <span className="font-semibold text-slate-900">{gbp(surcharge)}</span> additional-dwelling surcharge at{" "}
              {ADDITIONAL_DWELLING_SURCHARGE * 100}% of the whole price
            </span>
            <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="font-bold text-slate-900">{gbp(valueBill)}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            A company gets no first-property exemption, so the surcharge applies to its first purchase as much as its
            tenth.
          </p>
        </div>

        <ExampleFigureNote className="mt-5" />
      </div>
    </div>
  );
}
