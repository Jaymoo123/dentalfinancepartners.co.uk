import { AlertTriangle, ArrowRight, Check, Wallet } from "lucide-react";

/**
 * Section 162 incorporation relief as three gates in series, rather than three
 * cards side by side.
 *
 * The distinction is the whole point of the figure. Cards in a grid say "here
 * are three things about the relief", which is exactly the wrong reading: the
 * three conditions are CUMULATIVE, all of them have to hold, and failing any one
 * means the gain is taxed on transfer rather than rolled into the shares. A
 * chain with an outcome pinned to the end of it says that; a grid cannot.
 *
 * Gate 1 carries the warning treatment because it is where the claims actually
 * fail. Holding property and collecting rent is an investment activity, and the
 * going-concern test is the one a landlord is most likely to assume they pass.
 * Amber, not red: a reader who fails this test has not done anything wrong, and
 * a red cross would read as an accusation. Same posture as `ComparisonTable`'s
 * neutral dash and `SchemeFlow`'s "not counted" column.
 *
 * The copy is the section's own, unchanged. Every keyword-bearing term it used
 * to carry in prose is still in rendered text here: Section 162 TCGA 1992,
 * incorporation relief, going concern, Ramsay v HMRC, connected-party, market
 * value, company buy-to-let lending.
 *
 * Server component, no JavaScript. Nothing rests on hue: each gate is numbered
 * and titled, and the warning gate says "where most claims fail" in words.
 */

const GATES = [
  {
    n: 1,
    title: "A business transferred as a going concern",
    body: "Holding property and collecting rent is an investment activity, not a business, unless the scale of what you do takes it further. Advisers work from Ramsay v HMRC, where roughly 20 hours a week of hands-on management across a property of 10 flats was accepted as a business: repairs organised personally, tenant management, viewings, maintenance and accounts. A portfolio run entirely through a letting agent, on a few hours a month of oversight, generally does not qualify however large it is. The evidence has to exist before the transfer, not be reconstructed afterwards.",
    warn: "This is where most landlord claims fail",
  },
  {
    n: 2,
    title: "All of the assets of that business, other than cash",
    body: "The whole business has to move, not a selected part of it. Cash is the one asset you are allowed to keep back.",
  },
  {
    n: 3,
    title: "Wholly or partly in exchange for shares",
    body: "Only the share element qualifies for relief, so taking a director loan account out of the transfer reduces the relief proportionately.",
  },
];

export function IncorporationReliefGates() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          Three conditions, and all three have to hold
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Fail any one of them and Section 162 gives you nothing: the gain is simply taxed on transfer.
        </p>

        <ol className="mt-6 space-y-4">
          {GATES.map((gate) => (
            <li
              key={gate.n}
              className={`rounded-xl bg-white p-5 ring-1 sm:p-6 ${
                gate.warn ? "ring-amber-300" : "ring-slate-200/70"
              }`}
            >
              <div className="flex gap-4">
                <span
                  aria-hidden
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1 ${
                    gate.warn
                      ? "bg-amber-50 text-amber-700 ring-amber-200"
                      : "bg-emerald-50 text-emerald-700 ring-emerald-100"
                  }`}
                >
                  {gate.n}
                </span>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-slate-900">{gate.title}</h4>
                  {gate.warn ? (
                    <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-amber-700">
                      <AlertTriangle aria-hidden className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                      {gate.warn}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{gate.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* The outcome the chain leads to, so the gates are visibly a route to
            something rather than a list of hurdles. */}
        <div className="mt-5 flex items-start gap-4 rounded-xl bg-slate-900 p-5 sm:p-6">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"
          >
            <Check className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <h4 className="text-base font-bold text-white">All three hold: the gain is deferred, not forgiven</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              The gain on the properties is not taxed on transfer. It is rolled into the base cost of the shares you
              receive, so the tax is deferred until you dispose of those shares.
            </p>
          </div>
        </div>

        {/* Connected-party and the mortgage consequence. It sits outside the
            chain deliberately: it is not a fourth condition, it is a rule that
            runs alongside all three and bites whatever the answer. */}
        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="flex gap-4">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 ring-1 ring-slate-200"
            >
              <Wallet className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <h4 className="flex flex-wrap items-center gap-x-2 text-base font-bold text-slate-900">
                Running alongside all three
                <ArrowRight aria-hidden className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-slate-700">connected-party rules</span>
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Because you control the company, market value is substituted for whatever price you set, for CGT as
                well as SDLT, so undervaluing the transfer buys nothing except a valuation argument later. Get a
                defensible valuation at the point of transfer and keep it. The same connection is why the mortgage
                matters: lenders normally require the personal borrowing to be redeemed and replaced with company
                buy-to-let lending, with its own arrangement fees and early repayment charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
