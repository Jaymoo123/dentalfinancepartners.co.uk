/**
 * Settlement-run layer for this site's dark hero sections: ecommerce's answer
 * to Property's `HeroBrickBackdrop`, generalist's `GeneralistBackdrop`,
 * crypto's `CryptoBackdrop`, charities' `CharitiesBackdrop` and
 * contractors-ir35's `ContractorsBackdrop`. Same mechanism, different subject:
 * columns of order units of unequal height standing on one settlement rule,
 * with the top unit of each column marked as settled. That is the only
 * structure this site sells help with, a marketplace payout period and the
 * orders that were reconciled into it. Units are drawn square with no radius
 * on purpose: square is this site's own geometry.
 *
 * Shopping carts, parcel glyphs, trolleys and delivery-van iconography were
 * rejected. The reader arriving here has a VAT or a settlement reconciliation
 * problem, and the register is sober.
 *
 * Mechanism is Trade's, crypto's, charities' and contractors': a
 * `patternUnits="userSpaceOnUse"` pattern painted into a `width="100%"
 * height="100%"` rect, with no `viewBox` and no `preserveAspectRatio="slice"`.
 * The fixed-viewBox shape is what produces horizontal overflow.
 *
 * Colour is #c9861b, this site's declared `--color-primary-400` and the brand
 * hex, written as a literal rather than `var(--color-primary-400)`: an
 * undefined custom property invalidates the whole declaration and the element
 * then paints nothing with every test still green, and the Tailwind v4 ramp
 * emits its own value rather than the sRGB the ratios below were measured on.
 * No new brand colour is introduced. The hex is graphic-grade only on light
 * grounds (3.04 on white), which is why this component paints on dark grounds
 * only and is never mounted on a white or #fafaf9 section.
 *
 * Contrast, at the backdrop's STRONGEST point (a 1px stroke at full alpha
 * inside the 0.10 group, i.e. assuming copy sits directly on a rule, which the
 * left-fading mask means it effectively never does). Method self-tested
 * against slate-500 / white = 4.76 and slate-400 / white = 2.56:
 *   - on primary-700 #8a5e1a (the brand hero, this site's WORST case): stroke
 *     composites to #90621a. White hero copy = 5.32, past the 4.5 text floor.
 *     `text-white/80` body copy is 4.06, against 4.30 on the bare ground: that
 *     figure is BELOW 4.5 before this backdrop exists and no alpha can lift it,
 *     so the alpha is held at 0.10 to keep the loss to 0.24 rather than the
 *     0.37 a 0.16 group would cost. It is also the reason the fill marks run
 *     at an effective 0.05 and the mask clears the copy column entirely.
 *   - on neutral-800 #262626: composites to #363025. White = 13.07.
 *   - on neutral-900 #171717: composites to #292217. White = 15.72,
 *     `text-neutral-300` = 10.61.
 *   - on the research navy #1a3a5c: composites to #2c4256. White = 10.39.
 * Every ground clears the 4.5 floor for white copy, so the 3.0 graphic floor is
 * moot as well.
 *
 * No JavaScript, no animation, no dependency, no data URI: identical in the
 * static HTML and under `prefers-reduced-motion: reduce`, because there is
 * nothing to reduce. Hidden below `sm` (the heroes render as a solid ground
 * there), which is also why it cannot contribute horizontal overflow at 390px.
 *
 * Host contract (same as Property's `HeroBrickBackdrop`, and the same contract
 * the kit's `SlimHero` `backdrop` slot already satisfies): the parent section
 * must be `relative overflow-hidden` and its content `relative z-10`, or the
 * texture paints over the copy.
 */

// ponytail: one tone. Every ground this site can mount a backdrop on is dark
// (#8a5e1a, neutral-800, neutral-900, and #1a3a5c on the research family), so a
// cream branch would have no caller. The heights are a fixed sequence rather
// than random: a backdrop must render byte-identically on the server and the
// client.
const COLUMNS = [3, 1, 4, 2, 3];

/**
 * `patternId` exists because a DOM id must be unique per DOCUMENT, not per
 * component, and the homepage mounts this twice (hero and lead panel). Two
 * <pattern> elements sharing an id is invalid HTML and the second fill
 * silently resolves to the first. A server component cannot call useId, so
 * the id is a prop with a default: single-mount pages pass nothing, and a
 * page that mounts it more than once passes a distinct id per instance.
 */
export default function EcommerceBackdrop({
  patternId = "ecommerce-settlement-run",
}: {
  patternId?: string;
}) {
  const mask = "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{ opacity: 0.1, maskImage: mask, WebkitMaskImage: mask }}
    >
      <svg className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          {/* 80 x 80 = five 16px column slots on one 80px settlement rule, so
              the rule and the column rhythm meet across the tile seam and the
              field reads as one continuous run rather than detached glyphs. */}
          <pattern
            id={patternId}
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#c9861b" strokeWidth="1">
              {/* The settlement rule: what every column is totalled onto. */}
              <path d="M0 72.5h80" />
              {COLUMNS.flatMap((units, col) =>
                Array.from({ length: units }, (_, row) => (
                  <rect
                    key={`${col}-${row}`}
                    x={4.5 + col * 16}
                    y={60.5 - row * 14}
                    width="11"
                    height="11"
                  />
                )),
              )}
            </g>
            {/* The settled unit: the top of each column carries a wash, the way
                a reconciled line is ticked off a payout statement. Kept well
                below the stroke alpha (0.5 inside the 0.10 group is an
                effective 0.05), because a filled square covers area a 1px rule
                does not, so the stroke stays the strongest point the ratios
                above assume. */}
            <g fill="#c9861b" fillOpacity="0.5">
              {COLUMNS.map((units, col) => (
                <rect
                  key={col}
                  x={4.5 + col * 16}
                  y={60.5 - (units - 1) * 14}
                  width="11"
                  height="11"
                />
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
