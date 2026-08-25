import { CalendarClock, Hammer, Receipt, Users } from "lucide-react";

/**
 * The page's core argument as a figure: the decisions that set a landlord's tax
 * bill are made across the year, and the return is only where they get typed up.
 *
 * The bar carries no scale and no numbers on purpose. Nothing is being measured
 * — it is a "before" and an "and then" — and an axis would imply a precision
 * that does not exist. The 78/22 split is illustrative weighting, not a claim
 * about how the year divides.
 *
 * Server component, no JavaScript.
 */

const DECISIONS = [
  {
    icon: Hammer,
    title: "The refurbishment",
    body: "Categorised as a repair or as capital, at the point you spend it.",
  },
  {
    icon: Users,
    title: "The ownership",
    body: "Whose name it sits in, and whether a Form 17 election matches that.",
  },
  {
    icon: CalendarClock,
    title: "The finance costs",
    body: "Treated as a deduction or as a basic rate tax reducer.",
  },
  {
    icon: Receipt,
    title: "The disposal",
    body: "Modelled before contracts are exchanged, not after completion.",
  },
];

export function TaxYearGap() {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
        <div className="flex h-3 overflow-hidden rounded-full">
          <div className="w-[78%] bg-emerald-500" />
          <div className="flex-1 bg-slate-300" />
        </div>
        <div className="mt-3 flex justify-between gap-4 text-[11px] font-semibold uppercase tracking-wide">
          <span className="text-emerald-800">The twelve months where the bill is decided</span>
          <span className="shrink-0 text-slate-500">January, when it is typed up</span>
        </div>

        <div className="mt-8 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2 sm:gap-6">
          {DECISIONS.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <item.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 border-t border-slate-200 pt-4 text-sm font-semibold leading-relaxed text-slate-900">
          All four are settled before a general practice accountant opens the property pages in January.
        </p>
      </div>
    </div>
  );
}
