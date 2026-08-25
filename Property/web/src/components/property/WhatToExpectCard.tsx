import { Check } from "lucide-react";

/**
 * The navy reassurance card that sits beside an ask.
 *
 * Lifted out of `/contact`, where it was inline, once `/thank-you`, `/book` and
 * `/complete` all wanted the same thing next to their own form or picker. Four
 * consumers, so one component: four hand-copies of a Check list would drift the
 * first time one page's copy was edited, which is exactly what happened to the
 * "needs the personal link" card before `NoticeCard` (DESIGN_SYSTEM §4d).
 *
 * It is a CARD on a light section, not a full-bleed navy band, so §9's
 * navy-must-not-touch-navy rule is not in play. Do not promote it to a section.
 *
 * Why it exists at all, rather than the page just saying less: on a post-submit
 * surface the reader has already acted and the only thing left to win is
 * whether they answer the phone. Telling them what is coming, from whom, and how
 * long it takes is the conversion work on these pages.
 */

/** `/contact`'s original four, and the default for a caller with nothing more specific. */
const DEFAULT_ITEMS = [
  "Instant text and email from us. Reply to confirm your callback",
  "Initial call to understand your situation",
  "Clear recommendations with no obligation",
  "Fixed fee quote if you decide to proceed",
];

export function WhatToExpectCard({
  title = "What to expect",
  items = DEFAULT_ITEMS,
  className = "",
}: {
  title?: string;
  items?: string[];
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-slate-900 p-6 text-white sm:p-8 ${className}`}>
      <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">{title}</h3>
      <ul className="space-y-2 text-xs text-slate-200 sm:space-y-3 sm:text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 sm:gap-3">
            <Check
              aria-hidden
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400 sm:h-5 sm:w-5"
              strokeWidth={3}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
