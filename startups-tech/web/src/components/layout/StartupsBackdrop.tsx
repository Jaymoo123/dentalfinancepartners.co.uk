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
 * left-fading mask means it effectively never does). Figures below are the
 * bare ground and the ground composited with 0.10 of #818cf8, against white
 * and `text-slate-300` (#cbd5e1), one row per ground this component mounts on
 * across this port (U4 = footer only; U1 mounts on the homepage hero; U2 mounts
 * on the hub/calculator hero bands):
 *   - `bg-slate-900` `#0f172a` (footer, U4's own mount): bare white 17.85,
 *     slate-300 12.02; composited `#1a233f` white 15.49, slate-300 10.43. PASS.
 *   - `bg-primary-950` `#1e1b4b` (homepage hero, U1): bare white 15.99,
 *     slate-300 10.77; composited `#28265c` white 13.80, slate-300 9.29. PASS.
 *   - `bg-primary-700` `#4338ca` (hub hero bands, U2): bare white 7.90,
 *     slate-300 5.32; composited `#4940cf` white 7.20, slate-300 4.85. PASS.
 *   - `bg-primary-600` `#4f46e5` (calculator hero, U2): bare white 6.29,
 *     slate-300 4.23; composited `#544de7` white 5.85, slate-300 3.94. White
 *     copy PASSES (5.85, both floors). `text-slate-300` copy FAILS the 4.5
 *     text floor at this worst-case assumption (3.94, though it clears the 3.0
 *     graphic floor). U2: do not set standfirst/body copy to slate-300 on this
 *     specific ground while the backdrop is mounted; use white or slate-200
 *     instead, or verify against the actual rendered composite (the mask fades
 *     left, so real risk near body copy is materially lower than this
 *     worst-case figure).
 * No `tone` prop added: the motif colour (`#818cf8`, indigo-400) and alpha stay
 * the same on every ground above, so there is no light/dark branch to switch -
 * only the primary-600 ground needs a caller-side text-colour choice, which is
 * U2's file, not this component's.
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
