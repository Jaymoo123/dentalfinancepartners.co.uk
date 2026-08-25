import { ArrowRight, FileText, PenLine } from "lucide-react";

/**
 * The window in which property tax is actually decided, and the window in which
 * it is merely reported.
 *
 * The section's argument is about timing, not about a list of mistakes: each of
 * these is cheap to get right at the decision and impossible to fix at the
 * return. Prose can only put those two moments in sequence; a figure can put
 * them side by side, which is the whole point. Every row is one choice read
 * twice — what it looks like while it is still a choice, and what it has
 * hardened into by filing.
 *
 * Not a chart. No quantities here, so no scale and no palette: emerald is the
 * side you can still act on, slate the side you cannot.
 *
 * Ported 2026-08-22, Phase 6.3. The only change from the designer's file is the
 * standing accessibility floor (CONTEXT.md Rule Zero (c)): the seam arrow was
 * `text-slate-400` on a white chip, 2.51:1, and is now `text-slate-500` at
 * 4.76:1. Nothing else moves.
 */

const ROWS: Array<{ decision: string; consequence: string }> = [
  {
    decision: "Whose name the property is bought in",
    consequence: "Income taxed at the wrong rate for as long as you hold it",
  },
  {
    decision: "Which tax year the sale completes in",
    consequence: "A gain landing in the wrong year, with an allowance wasted",
  },
  {
    decision: "Whether fixtures are valued on a commercial purchase",
    consequence: "Allowances lost, with the election window already closed",
  },
  {
    decision: "How a portfolio is structured to pass on",
    consequence: "An inheritance tax bill nobody costed while there was time",
  },
];

export function DecisionWindow() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]">
      <div className="grid md:grid-cols-2">
        <div className="flex items-center gap-3 border-b border-emerald-200 bg-emerald-50 px-5 py-4 sm:px-6">
          <PenLine aria-hidden className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.75} />
          <span>
            <span className="block text-sm font-bold leading-tight text-emerald-900">At the decision</span>
            <span className="block text-xs leading-tight text-emerald-700">Still a choice. Advice changes it</span>
          </span>
        </div>
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-5 py-4 sm:px-6">
          <FileText aria-hidden className="h-5 w-5 shrink-0 text-slate-500" strokeWidth={1.75} />
          <span>
            <span className="block text-sm font-bold leading-tight text-slate-700">At the return</span>
            <span className="block text-xs leading-tight text-slate-500">Already fixed. The return just reports it</span>
          </span>
        </div>
      </div>

      <ul className="divide-y divide-slate-100">
        {ROWS.map((row) => (
          <li key={row.decision} className="grid md:grid-cols-2">
            <div className="flex items-start gap-3 bg-emerald-50/40 px-5 py-4 sm:px-6">
              <span className="text-sm font-semibold leading-relaxed text-slate-900">{row.decision}</span>
            </div>
            <div className="relative flex items-start gap-3 px-5 py-4 sm:px-6">
              {/* The arrow sits on the seam, pointing from the choice to what it becomes. */}
              <ArrowRight
                aria-hidden
                className="absolute -left-2.5 top-4 hidden h-5 w-5 rounded-full bg-white text-slate-500 md:block"
                strokeWidth={2}
              />
              <span className="text-sm leading-relaxed text-slate-600">{row.consequence}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
