import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";

/**
 * A generic "them against us" comparison.
 *
 * The pages using this are careful not to call general practices incompetent, and the component
 * holds that line: the other side gets a neutral dash, never a red cross. The honest claim is about
 * focus and timing, not ability, and a comparison that overstated it would undercut the copy around
 * it.
 *
 * Two layouts, one source of rows. Above md the table works, and our column is bounded by an emerald
 * edge so it reads as one block from the "most recommended" pill down to the button. Below md that
 * table would be a sideways scroll with the call to action parked off-screen, so the same rows stack
 * instead, our line tinted and edged exactly as the column is on desktop. Every structural cue
 * survives the breakpoint; only the axis changes.
 *
 * `dimension` is optional. Supplied, it becomes a leading column naming what each row compares;
 * omitted, the table is two columns and the stacked rows lead with the other side's line.
 *
 * Ported 2026-08-22, Phase 6.3. The only change from the designer's file is the
 * standing accessibility floor (CONTEXT.md Rule Zero (c)): the two neutral
 * `Minus` marks were `text-slate-400`, which measures 2.51:1 on this card's
 * white ground, and are now `text-slate-500` at 4.76:1. Nothing else moves.
 */

export type ComparisonRow = {
  dimension?: string;
  general: string;
  specialist: string;
};

type Props = {
  rows: ComparisonRow[];
  /** What the other side is called, e.g. "A general practice". */
  generalLabel: string;
  generalCaption: string;
  /** The sub-line under our trading name, e.g. "A landlord-only practice like us". */
  ourCaption: string;
  cta?: { href: string; label: string; note?: string };
};

const CARD =
  "overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]";
const OUR_COLUMN = "border-l border-emerald-200 bg-emerald-50/60";

/** The identity block, shared by both layouts so the two cannot drift apart. */
function OurLabel({ caption }: { caption: string }) {
  return (
    <span className="flex items-start gap-2">
      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
      <span>
        <span className="block text-sm font-bold text-emerald-900">{siteConfig.company.tradingName}</span>
        <span className="block text-xs font-normal text-emerald-700">{caption}</span>
      </span>
    </span>
  );
}

function Pill() {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
      Most recommended
    </span>
  );
}

function Cta({ cta }: { cta: NonNullable<Props["cta"]> }) {
  return (
    <>
      <Link href={cta.href} className={`${btnPrimary} w-full`}>
        {cta.label}
      </Link>
      {cta.note && <p className="mt-3 text-xs text-slate-600">{cta.note}</p>}
    </>
  );
}

function ComparisonTableView({ rows, generalLabel, generalCaption, ourCaption, cta }: Props) {
  const hasDimensions = rows.every((row) => row.dimension);

  return (
    <div className={`hidden md:block ${CARD}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            {generalLabel} compared with {siteConfig.company.tradingName}
          </caption>
          <thead>
            <tr className="border-b border-slate-200">
              {hasDimensions && (
                <th scope="col" className="px-5 py-4 sm:px-6">
                  <span className="sr-only">Area</span>
                </th>
              )}
              <th scope="col" className="px-5 pb-4 pt-3 align-bottom sm:px-6">
                {/* Empty pill-sized row, so both headings sit on the same line. */}
                <span aria-hidden className="mb-2 block h-5" />
                <span className="flex items-start gap-2">
                  <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2.5} />
                  <span>
                    <span className="block text-sm font-bold text-slate-700">{generalLabel}</span>
                    <span className="block text-xs font-normal text-slate-500">{generalCaption}</span>
                  </span>
                </span>
              </th>
              <th scope="col" className={`px-5 pb-4 pt-3 align-bottom sm:px-6 ${OUR_COLUMN}`}>
                <span className="mb-2 flex h-5 items-center">
                  <Pill />
                </span>
                <OurLabel caption={ourCaption} />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.general} className="border-b border-slate-100 last:border-b-0">
                {hasDimensions && (
                  <th scope="row" className="px-5 py-4 align-top text-sm font-bold text-slate-900 sm:px-6">
                    {row.dimension}
                  </th>
                )}
                <td className="px-5 py-4 align-top text-sm leading-relaxed text-slate-600 sm:px-6">
                  {row.general}
                </td>
                <td
                  className={`px-5 py-4 align-top text-sm font-semibold leading-relaxed text-slate-900 sm:px-6 ${OUR_COLUMN}`}
                >
                  <span className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                    <span>{row.specialist}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {cta && (
            <tfoot>
              <tr>
                {hasDimensions && <td className="px-5 sm:px-6" />}
                <td className="px-5 sm:px-6" />
                <td className={`px-5 py-6 align-top sm:px-6 ${OUR_COLUMN}`}>
                  <Cta cta={cta} />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

function ComparisonStackView({ rows, generalLabel, ourCaption, cta }: Props) {
  return (
    <div className={`md:hidden ${CARD}`}>
      <div className="border-b border-emerald-200 bg-emerald-50/60 px-5 py-4">
        <span className="mb-2 block">
          <Pill />
        </span>
        <OurLabel caption={ourCaption} />
      </div>

      <ul className="divide-y divide-slate-100">
        {rows.map((row) => (
          <li key={row.general} className="px-5 py-5">
            {row.dimension && <p className="text-sm font-bold text-slate-900">{row.dimension}</p>}
            <div className={row.dimension ? "mt-3 space-y-2" : "space-y-2"}>
              <div className="flex items-start gap-2">
                <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2.5} />
                <span className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-500">{generalLabel}: </span>
                  {row.general}
                </span>
              </div>
              <div className={`flex items-start gap-2 px-3 py-2 ${OUR_COLUMN}`}>
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                <span className="text-sm font-semibold leading-relaxed text-slate-900">
                  <span className="font-bold text-emerald-800">Us: </span>
                  {row.specialist}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {cta && (
        <div className="border-t border-emerald-200 bg-emerald-50/60 px-5 py-6">
          <Cta cta={cta} />
        </div>
      )}
    </div>
  );
}

export function ComparisonTable(props: Props) {
  return (
    <div className="mt-8">
      <ComparisonTableView {...props} />
      <ComparisonStackView {...props} />
    </div>
  );
}
