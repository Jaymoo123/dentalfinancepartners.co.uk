/**
 * The disposal figures, pulled out of the prose beside them: the 60-day clock,
 * the rates that apply to the gain, and the three ways the gain can be
 * computed.
 *
 * Every term and number here is load-bearing for search as well as for the
 * reader — "UK property disposal return", the 18% and 24% rates, the £3,000
 * annual exempt amount, and the April 2015 / April 2019 rebasing dates all live
 * in rendered text, not in an image or an aria-label.
 *
 * Server component, no JavaScript.
 *
 * `showRebasing` drops the rebasing card. Rebasing is a non-resident concept:
 * on a page written for UK-resident landlords it is a third possible answer to
 * a question those readers do not have, so /landlord-tax takes the 60-day clock
 * and the rates without it. Defaults to true, so the NRL page is unchanged.
 *
 * CARVE-OUT 1, applied in Phase 6.5. `showRebasing` also switches the wording on
 * the 60-day clock, because the same two sentences are not true of both
 * audiences and the designer only ever wrote the non-resident one. House
 * positions section 5 is explicit: a NON-resident files the 60-day return on
 * every UK land disposal regardless of tax due, while a UK RESIDENT files only
 * where capital gains tax is due, and "60-day applies to all UK residents'
 * disposals regardless of tax due" is on the do-not-write list. Their copy
 * ("on every disposal of UK land... even to a disposal producing a loss, and to
 * one fully covered by private residence relief") is the non-resident rule, and
 * on /landlord-tax it would have been a factual defect. No new prop: rebasing
 * and the file-regardless rule are the same audience switch, so one flag
 * carries both.
 */

const RATES = [
  { value: "18%", label: "Residential gains within the basic rate band" },
  { value: "24%", label: "Residential gains above it" },
  { value: "£3,000", label: "Annual exempt amount" },
];

const REBASING = [
  "Market value at April 2015",
  "Market value at April 2019",
  "Straight-line time apportionment",
];

export function DisposalFigures({ showRebasing = true }: { showRebasing?: boolean } = {}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* The clock is the whole point of the section, so it gets the weight: a
          reader who takes only one thing from here should take this one. */}
      <div className="overflow-hidden rounded-xl bg-slate-900 text-white ring-1 ring-slate-900">
        <div className="flex items-center gap-5 p-6 sm:p-8">
          <div className="shrink-0 text-center">
            <div className="text-5xl font-bold leading-none text-emerald-400 sm:text-6xl">60</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">Days</div>
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold sm:text-lg">From completion, not from the tax year end</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {showRebasing
                ? "A UK property disposal return is due within 60 days of completion on every disposal of UK land, and the tax is payable on the same date."
                : "A UK property disposal return is due within 60 days of completion where capital gains tax is due on the disposal, and the tax is payable on the same date."}
            </p>
          </div>
        </div>
        <p className="border-t border-white/10 px-6 py-4 text-sm leading-relaxed text-slate-300 sm:px-8">
          {showRebasing
            ? "It applies even to a disposal producing a loss, and to one fully covered by private residence relief."
            : "Where the gain is fully covered by private residence relief, losses or the annual exempt amount, no 60-day return is needed."}
        </p>
      </div>

      <div className={`grid gap-5 sm:gap-6 ${showRebasing ? "md:grid-cols-2" : ""}`}>
        <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">The charge on the gain</p>
          <dl className="mt-4 space-y-4">
            {RATES.map((rate) => (
              <div key={rate.value} className="flex items-baseline gap-4">
                <dt className="w-20 shrink-0 text-2xl font-bold leading-none text-slate-900">{rate.value}</dt>
                <dd className="text-sm leading-relaxed text-slate-700">{rate.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {showRebasing ? (
        <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rebasing: three possible bases</p>
          <ol className="mt-4 space-y-3">
            {REBASING.map((option, i) => (
              <li key={option} className="flex items-center gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-900">{option}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
            Which are available depends on the type of property and when the regime started applying to it. The
            difference between them can be large.
          </p>
        </div>
        ) : null}
      </div>
    </div>
  );
}
