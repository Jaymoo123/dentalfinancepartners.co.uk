import Link from "next/link";
import { btnPrimary } from "@/components/ui/layout-utils";

/**
 * LOCAL MIRROR of `packages/web-shared/design/marketing/ComparisonTable.tsx`
 * (playbook T12). Two reasons it is a mirror rather than an import, and neither
 * is fixable in the kit without changing Property and 18 other sites:
 *
 *  1. The kit's `Pill()` hardcodes a literal "most recommended" superlative and is called
 *     unconditionally in both layouts (kit `:135` and `:185`). There is no prop
 *     to suppress it. On Dentists that is an unevidenced superlative about our
 *     own service and falls under the locked no-aggregate-claims rule, so the
 *     pill is simply absent here.
 *  2. The kit imports `Check` and `Minus` from `lucide-react`, which is NOT a
 *     declared dependency of Dentists/web. `tsc` passes an undeclared import
 *     and only `scripts/check_dependency_closure.py` catches it (T24), so the
 *     two marks are inline SVG instead.
 *
 * Everything else is the kit's structure and its standing rules: the other side
 * gets a neutral dash and never a red cross (the honest claim is about focus,
 * not ability), and the same rows render as a table above md and as a stack
 * below it so the call to action is never parked off-screen.
 *
 * Contrast, measured against each element's own SECTION ground (DESIGN_DELTA
 * s2): ink #001b3d on white 17.15 and on the primary-50 column 15.66; muted
 * #475569 on white 7.58; the primary-600 tick 9.05 on white as a graphic; the
 * neutral dash is slate-500 at 4.76, the same floor repair the kit made. No
 * gold carries text anywhere in this file.
 */

export type ComparisonRow = {
  dimension: string;
  general: string;
  specialist: string;
};

type Props = {
  rows: ComparisonRow[];
  /** What the other side is called, e.g. "A generalist accountant". */
  generalLabel: string;
  generalCaption: string;
  /** The sub-line under our trading name. */
  ourCaption: string;
  tradingName: string;
  cta?: { href: string; label: string; note?: string; ctaId: string };
};

const CARD =
  "overflow-hidden rounded-xl bg-white ring-1 ring-[var(--border)] shadow-[0_18px_40px_-28px_rgba(0,27,61,0.4)]";
const OUR_COLUMN = "border-l border-primary-200 bg-primary-50/70";

function Tick() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-primary-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}

function Dash() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <path d="M4 10h12" />
    </svg>
  );
}

function OurLabel({ caption, tradingName }: { caption: string; tradingName: string }) {
  return (
    <span className="flex items-start gap-2">
      <Tick />
      <span>
        <span className="block text-sm font-bold text-[var(--ink)]">{tradingName}</span>
        <span className="block text-xs font-normal text-[var(--muted)]">{caption}</span>
      </span>
    </span>
  );
}

function Cta({ cta }: { cta: NonNullable<Props["cta"]> }) {
  return (
    <>
      <Link
        href={cta.href}
        data-cta={cta.ctaId}
        data-cta-placement="comparison_table"
        data-cta-goal="form"
        className={`${btnPrimary} w-full`}
      >
        {cta.label}
      </Link>
      {cta.note ? <p className="mt-3 text-xs text-[var(--muted)]">{cta.note}</p> : null}
    </>
  );
}

export function ComparisonTable(props: Props) {
  const { rows, generalLabel, generalCaption, ourCaption, tradingName, cta } = props;

  return (
    <>
      <div className={`hidden md:block ${CARD}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              {generalLabel} compared with {tradingName}
            </caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className="px-5 py-4 sm:px-6">
                  <span className="sr-only">Area</span>
                </th>
                <th scope="col" className="px-5 pb-4 pt-5 align-bottom sm:px-6">
                  <span className="flex items-start gap-2">
                    <Dash />
                    <span>
                      <span className="block text-sm font-bold text-[var(--ink-soft)]">{generalLabel}</span>
                      <span className="block text-xs font-normal text-[var(--muted)]">{generalCaption}</span>
                    </span>
                  </span>
                </th>
                <th scope="col" className={`px-5 pb-4 pt-5 align-bottom sm:px-6 ${OUR_COLUMN}`}>
                  <OurLabel caption={ourCaption} tradingName={tradingName} />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.dimension} className="border-b border-[var(--border)] last:border-b-0">
                  <th
                    scope="row"
                    className="px-5 py-4 align-top text-sm font-bold text-[var(--ink)] sm:px-6"
                  >
                    {row.dimension}
                  </th>
                  <td className="px-5 py-4 align-top text-sm leading-relaxed text-[var(--muted)] sm:px-6">
                    {row.general}
                  </td>
                  <td
                    className={`px-5 py-4 align-top text-sm font-semibold leading-relaxed text-[var(--ink)] sm:px-6 ${OUR_COLUMN}`}
                  >
                    <span className="flex gap-2">
                      <Tick />
                      <span>{row.specialist}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {cta ? (
              <tfoot>
                <tr>
                  <td className="px-5 sm:px-6" />
                  <td className="px-5 sm:px-6" />
                  <td className={`px-5 py-6 align-top sm:px-6 ${OUR_COLUMN}`}>
                    <Cta cta={cta} />
                  </td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      </div>

      <div className={`md:hidden ${CARD}`}>
        <div className="border-b border-primary-200 bg-primary-50/70 px-5 py-4">
          <OurLabel caption={ourCaption} tradingName={tradingName} />
        </div>
        <ul className="divide-y divide-[var(--border)]">
          {rows.map((row) => (
            <li key={row.dimension} className="px-5 py-5">
              <p className="text-sm font-bold text-[var(--ink)]">{row.dimension}</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <Dash />
                  <span className="text-sm leading-relaxed text-[var(--muted)]">
                    <span className="font-semibold text-[var(--ink-soft)]">{generalLabel}: </span>
                    {row.general}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Tick />
                  <span className="text-sm font-semibold leading-relaxed text-[var(--ink)]">
                    <span className="font-bold">{tradingName}: </span>
                    {row.specialist}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {cta ? (
          <div className="border-t border-primary-200 bg-primary-50/70 px-5 py-5">
            <Cta cta={cta} />
          </div>
        ) : null}
      </div>
    </>
  );
}
