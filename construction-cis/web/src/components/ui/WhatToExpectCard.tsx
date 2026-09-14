import { Check } from "lucide-react";

/**
 * The dark reassurance card that sits beside an ask on the three post-submit
 * routes (/book, /complete, /thank-you).
 *
 * On a post-submit surface the reader has already acted and the only thing left
 * to win is whether they answer the phone, so saying what is coming, from whom
 * and how long it takes is the conversion work on these pages.
 *
 * KIT DECLINE (2026-09-14 kit-adoption uplift), on two measurements. The kit twin
 * is packages/web-shared/design/marketing/WhatToExpectCard.tsx. (1) It ships a
 * DEFAULT title and a DEFAULT four-item list, one of which is a fixed-fee quote
 * claim. That default is the exact mechanism that published copy nobody had
 * written for this site's routes, which is why `title` and `items` are required
 * here with no fallback, and adopting it would put the fallback back. (2) Its
 * tick is text-primary-400, which on this card's slate-900 ground measures 7.51;
 * the tick here is --highlight-on-dark (#fdba74) at 10.59 on the same ground.
 * Both clear 4.5, so this is a decline on the claims risk with the contrast as a
 * tiebreak, not the other way round. The kit also drops the body a step to
 * text-xs below sm. Adopt only if the kit's defaults are removed upstream.
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
