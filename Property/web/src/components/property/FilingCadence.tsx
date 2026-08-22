/**
 * What MTD actually replaces, drawn once.
 *
 * "One annual return becomes four quarterly updates plus a final declaration"
 * is the sentence the whole page rests on, and prose can only assert it. Two
 * tracks to the same width make the reader see one filing become five, which is
 * the change, and see that the fifth is not a fifth quarter but a different kind
 * of thing.
 *
 * The final declaration is navy rather than emerald deliberately. It is where
 * the year is actually taxed (capital allowances, the Section 24 restriction,
 * other income and reliefs all land there), so it is not the fifth in a run of
 * five. The four updates are summaries and nothing becomes payable on them.
 *
 * Every date here is already asserted elsewhere on the page: the update
 * deadlines come from the standard-quarters FAQ answer, the 31 January final
 * declaration from the "does the annual return disappear" answer. If those
 * change, change them in both places or not at all.
 *
 * The bar is aria-hidden and every block is direct-labelled in normal text
 * beneath it, so nothing here rests on hue or on the figure rendering at all.
 */

import { ExampleFigureNote } from "@/components/ui/ExampleFigureNote";

type Filing = { label: string; due: string; tone: "update" | "final" };

const AFTER: Filing[] = [
  { label: "Q1 update", due: "7 Aug", tone: "update" },
  { label: "Q2 update", due: "7 Nov", tone: "update" },
  { label: "Q3 update", due: "7 Feb", tone: "update" },
  { label: "Q4 update", due: "7 May", tone: "update" },
  { label: "Final declaration", due: "31 Jan", tone: "final" },
];

export function FilingCadence() {
  return (
    <figure className="not-prose mt-8 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)] sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <figcaption className="text-sm font-bold text-slate-900">What replaces what</figcaption>
        <p className="text-xs text-slate-500">Standard quarters, a landlord mandated from April 2026</p>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Before</p>
            <p className="text-xs font-bold text-slate-900">One filing a year</p>
          </div>
          <div aria-hidden className="mt-2 flex h-11 items-center rounded-[4px] bg-slate-500 px-4">
            <span className="truncate text-xs font-semibold text-white sm:text-sm">
              Self Assessment return
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">Due 31 January</p>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Now</p>
            <p className="text-xs font-bold text-slate-900">Five filings a year</p>
          </div>
          {/* Five equal blocks rather than blocks scaled to the periods they
              cover: the claim is a count, not a duration, and scaling would
              make the final declaration look like a fifth quarter. */}
          <div aria-hidden className="mt-2 flex h-11 gap-[3px]">
            {AFTER.map((f) => (
              <div
                key={f.label}
                className={`flex flex-1 items-center justify-center rounded-[4px] px-1 ${
                  f.tone === "final" ? "bg-slate-900" : "bg-emerald-600"
                }`}
              >
                <span className="truncate text-[10px] font-semibold text-white sm:text-xs">
                  {f.tone === "final" ? "Final" : f.label.replace(" update", "")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-[3px]">
            {AFTER.map((f) => (
              <p key={f.label} className="flex-1 text-center text-[10px] text-slate-500 sm:text-xs">
                {f.due}
              </p>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-6 space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-baseline gap-3">
          <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[2px] bg-emerald-600" />
          <dt className="text-xs leading-relaxed text-slate-600 sm:text-sm">
            <span className="font-semibold text-slate-900">Four quarterly updates.</span> Categorised summaries of
            income and expenses. They are not tax calculations, so nothing becomes payable four times a year.
          </dt>
        </div>
        <div className="flex items-baseline gap-3">
          <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[2px] bg-slate-900" />
          <dt className="text-xs leading-relaxed text-slate-600 sm:text-sm">
            <span className="font-semibold text-slate-900">One final declaration.</span> Where the year is actually
            taxed, and the job the annual return used to do. Payment dates are untouched.
          </dt>
        </div>
      </dl>
      <ExampleFigureNote className="mt-4" />
    </figure>
  );
}
