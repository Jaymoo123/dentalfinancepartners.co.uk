import { Check, PlaneTakeoff } from "lucide-react";

/**
 * The planning window around leaving the UK, drawn as a boarding pass.
 *
 * The bar inside it is the actual argument: the emerald run is the period where
 * the decisions below are still available, and it stops dead at departure. The
 * proportions are illustrative rather than measured — there is no quantity
 * being plotted, only a before and an after — which is why it carries no axis
 * and no numbers.
 *
 * Everything ticket-shaped here (header strip, perforation, notches, barcode)
 * is decoration and is hidden from assistive tech. What is left to a screen
 * reader is the two stub facts and the checklist, in that order, which is the
 * whole content.
 *
 * Server component, no JavaScript.
 *
 * RULE ZERO (c), applied in Phase 6.7. The "Mostly gone" end-label was
 * `text-slate-400` on the slate-50 ticket, measured in Edge at 2.51:1 against
 * the 4.5:1 AA floor for 11px text; it is now `text-slate-500` at 4.55:1. It is
 * the label for half the bar, so it is content rather than decoration. Nothing
 * else about the treatment changed, and it is recorded here so a later diff
 * against Property_zip does not read it as drift.
 */

const BEFORE = [
  "Split-year treatment, which decides the side of the line your income and gains fall on",
  "The exchange date on a sale, which can decide whether a disposal is taxed as a resident or a non-resident",
  "Refinancing, while lenders still price you as a UK borrower rather than an expat one",
  "Non-resident landlord scheme registration, before the first rent payment rather than after",
  "Telling HMRC you are leaving, and getting the agent instructions in writing",
];

const STUB = [
  { label: "Departs", value: "The day you leave" },
  { label: "Planning window", value: "12 months either side" },
];

/** Deterministic bar widths — a real barcode would imply real data. */
const BARCODE = ["w-px", "w-1", "w-px", "w-0.5", "w-1", "w-px", "w-px", "w-1", "w-0.5", "w-px", "w-1", "w-px"];

export function DepartureWindow() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="overflow-hidden rounded-xl bg-slate-50 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-slate-900 px-6 py-3 text-white sm:px-8">
          <span className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em]">
            <PlaneTakeoff aria-hidden className="h-4 w-4 text-emerald-400" strokeWidth={2} />
            Departure planning
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            UK resident &rarr; Non-resident
          </span>
        </div>

        <div className="md:flex">
          <div className="flex-1 p-6 sm:p-8">
            {/* pt-10 clears the plane badge: it is 36px tall and centred on the
                bar, so it reaches 18px above it and would otherwise crowd the
                label sitting at the top of this box. */}
            <div className="relative pt-10">
              {/* Departure marker: label above, plane sitting on the bar. Both are
                  pinned to the same 58% the bar splits at, so they move together
                  if the split is ever retuned. */}
              <span
                aria-hidden
                className="absolute left-[58%] top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
              >
                You leave
              </span>
              <div className="relative">
                <div className="flex h-3 overflow-hidden rounded-full">
                  <div className="w-[58%] bg-emerald-500" />
                  <div className="flex-1 bg-slate-200" />
                </div>
                <span
                  aria-hidden
                  className="absolute left-[58%] top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-emerald-600 shadow-md ring-1 ring-slate-200"
                >
                  <PlaneTakeoff className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />
                </span>
              </div>
              <div className="mt-2.5 flex justify-between text-[11px] font-semibold uppercase tracking-wide">
                <span className="text-emerald-800">Everything below is still open</span>
                <span className="text-slate-500">Mostly gone</span>
              </div>
            </div>

            <ul className="mt-8 space-y-3.5 border-t border-slate-200 pt-6">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perforation. The notches are the ground colour showing through, so
              they read as punched holes; they follow the tear line, which is
              horizontal on a stacked layout and vertical from md. */}
          <div aria-hidden className="relative border-t border-dashed border-slate-300 md:border-l md:border-t-0">
            <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-white md:hidden" />
            <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-white md:hidden" />
            <span className="absolute -top-2 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-white md:block" />
            <span className="absolute -bottom-2 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-white md:block" />
          </div>

          <div className="p-6 sm:p-8 md:w-60 md:shrink-0">
            <dl className="space-y-5">
              {STUB.map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{row.label}</dt>
                  <dd className="mt-1 text-base font-bold leading-snug text-slate-900">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div aria-hidden className="mt-7 flex h-12 items-stretch gap-[3px]">
              {BARCODE.map((width, i) => (
                <span key={i} className={`${width} bg-slate-900`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
