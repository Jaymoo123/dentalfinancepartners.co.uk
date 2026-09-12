import { Check } from "lucide-react";

/**
 * The dark reassurance card that sits beside an ask on the three post-submit
 * routes (/book, /complete, /thank-you).
 *
 * On a post-submit surface the reader has already acted and the only thing left
 * to win is whether they answer the phone, so saying what is coming, from whom
 * and how long it takes is the conversion work on these pages.
 *
 * `title` and `items` are REQUIRED and there are no defaults, deliberately. The
 * sibling-site version of this component shipped a default title and a default
 * item list, and routes that passed neither published copy nobody had written
 * for them, including a fee claim. Every visible string here comes from the
 * route that renders it.
 *
 * It is a CARD on a light section, not a full-bleed navy band, so the
 * navy-must-not-touch-navy rule is not in play. Do not promote it to a section.
 * The tick is --highlight-on-dark (#fdba74), 8.2 on slate-900; --accent
 * (#f97316) measures 3.3 there and is below the text floor.
 */
export function WhatToExpectCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl bg-slate-900 p-6 text-white sm:p-8">
      <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-200 sm:space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 sm:gap-3">
            <Check
              aria-hidden
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--highlight-on-dark)] sm:h-5 sm:w-5"
              strokeWidth={3}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
