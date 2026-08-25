import Link from "next/link";
import { ArrowRight, Building2, Calculator, CalendarClock, PieChart, Receipt, Scale } from "lucide-react";

/**
 * Grid of links out to the free calculators, used by the "Free tools" section
 * on the service pages.
 *
 * Cards rather than tabs on purpose: every tool stays a real crawlable link and
 * all of them are readable at once. Tabs would hide three in four behind a
 * click and put the other three behind JS, which is the wrong trade for a
 * section whose whole job is to send people into a calculator.
 *
 * Note the cards are `flex` and not plain blocks: `next/link` renders an `<a>`,
 * which is inline by default, so a padded card in a plain stack overlaps its
 * neighbours instead of sitting below them.
 */
const ICONS: Record<string, typeof Calculator> = {
  "section-24-calculator": Scale,
  "mtd-checker": CalendarClock,
  "incorporation-cost-calculator": Building2,
  "portfolio-profitability-calculator": PieChart,
  "stamp-duty-calculator": Receipt,
};

export function CalculatorLinkCards({
  items,
}: {
  items: Array<{ href: string; title: string; body: string }>;
}) {
  return (
    <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
      {items.map((item) => {
        const Icon = ICONS[item.href.split("/").pop() ?? ""] ?? Calculator;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transform-none"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.body}</p>
            <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              Open calculator
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
