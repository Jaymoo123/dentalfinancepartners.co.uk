/**
 * Per-site motif layer for this site's dark grounds: startups-tech's answer to
 * Property's `HeroBrickBackdrop`, generalist's `GeneralistBackdrop`, crypto's
 * `CryptoBackdrop`, charities' `CharitiesBackdrop`, contractors-ir35's
 * `ContractorsBackdrop` and ecommerce's `EcommerceBackdrop`. Same mechanism,
 * different subject: a rising funding staircase with a node at each step, which
 * is the only structure this site sells help with, a company moving from
 * pre-seed through SEIS, EIS and a priced round while the share register and the
 * relief claims have to keep up with it.
 *
 * Rockets, lightbulbs, hockey-stick graphs and unicorn glyphs were rejected. The
 * reader arriving here has an R&D claim, an EMI valuation or an advance
 * assurance problem, and the register is sober.
 *
 * Mechanism is Trade's, crypto's, charities', contractors' and ecommerce's: a
 * `patternUnits="userSpaceOnUse"` pattern painted into a `width="100%"
 * height="100%"` rect, with NO `viewBox` and no `preserveAspectRatio="slice"`.
 * The fixed-viewBox shape (generalist's) is what produces horizontal overflow,
 * and a phase-1 brief has recommended copying it before now.
 *
 * Colour is the indigo-400 step `#818cf8`, written as a literal rather than
 * `var(--color-primary-400)`: an undefined custom property invalidates the whole
 * declaration and the element then paints nothing with every test still green,
 * and the Tailwind v4 ramp emits oklch rather than the sRGB the ratios below
 * were measured on. No new brand colour is introduced; `#818cf8` is the on-dark
 * step of this site's indigo, and it is the same step the kit footer already
 * paints its wordmark rule in (`primary-400`). The brand hex `#4f46e5` is NOT
 * used here: on `slate-900` it is a dark-on-dark texture that reads as dirt
 * rather than as a motif.
 *
 * Contrast, at the backdrop's STRONGEST point (a 1px stroke at full alpha inside
 * the 0.10 group, i.e. assuming copy sits directly on a rule, which the
 * left-fading mask means it effectively never does). Ground is the kit footer's
 * `bg-slate-900` `#0f172a`, the only ground this component is mounted on today.
 *   - bare `#0f172a`: white 17.97, `text-slate-300` 12.09.
 *   - composited `#1b2333` (0.10 of #818cf8 over #0f172a): white 12.14,
 *     `text-slate-300` 8.17.
 * Both figures clear the 4.5 text floor with room, so the 3.0 graphic floor is
 * moot as well. The cost of the motif is 5.8 points of headroom on copy that had
 * 17.97 to spend.
 *
 * No JavaScript, no animation, no dependency, no data URI: identical in the
 * static HTML and under `prefers-reduced-motion: reduce`, because there is
 * nothing to reduce. Hidden below `sm` (the footer reads as a solid ground
 * there), which is also why it cannot contribute horizontal overflow at 390px.
 *
 * Host contract (same as Property's `HeroBrickBackdrop`, and the contract the
 * kit's `SiteFooter` `backdrop` slot and `SlimHero` `backdrop` slot already
 * satisfy): the parent section must be `relative overflow-hidden` and its
 * content `relative z-10`, or the texture paints over the copy.
 */

// ponytail: one tone. Every ground this site can mount a backdrop on today is
// the kit footer's slate-900, so a light branch would have no caller. The step
// heights are a fixed sequence rather than random: a backdrop must render
// byte-identically on the server and the client.
const STEPS = [0, 1, 2, 3, 4];

/**
 * `patternId` exists because a DOM id must be unique per DOCUMENT, not per
 * component. A server component cannot call useId, so the id is a prop with a
 * default: single-mount pages pass nothing, and a page that mounts it more than
 * once passes a distinct id per instance. Two `<pattern>` elements sharing an id
 * is invalid HTML and the second fill silently resolves to the first.
 */
export default function StartupsBackdrop({
  patternId = "startups-round-ladder",
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
          {/* 80 x 80 = five 16px step slots rising 14px each, so the staircase
              meets itself across the tile seam and the field reads as one
              continuous ascent rather than as detached glyphs. */}
          <pattern id={patternId} width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#818cf8" strokeWidth="1">
              {STEPS.map((step) => {
                const x = step * 16;
                const y = 72.5 - step * 14;
                return (
                  <g key={step}>
                    {/* The tread: one round's flat period. */}
                    <path d={`M${x} ${y}h16`} />
                    {/* The riser: the raise that lifts the next one. */}
                    <path d={`M${x + 16} ${y}v-14`} />
                  </g>
                );
              })}
            </g>
            {/* The round itself: a node on the tread it closes on. Kept well
                below the stroke alpha (0.5 inside the 0.10 group is an effective
                0.05), because a filled disc covers area a 1px rule does not, so
                the stroke stays the strongest point the ratios above assume. */}
            <g fill="#818cf8" fillOpacity="0.5">
              {STEPS.map((step) => (
                <circle key={step} cx={step * 16 + 8} cy={72.5 - step * 14} r="2" />
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
