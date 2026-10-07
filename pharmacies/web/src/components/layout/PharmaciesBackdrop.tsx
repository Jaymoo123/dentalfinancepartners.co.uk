/**
 * Per-site motif layer for this site's dark grounds: pharmacies' answer to
 * startups-tech's `StartupsBackdrop`, hospitality's `HospitalityBackdrop` and
 * generalist's `GeneralistBackdrop`. Same mechanism, different subject: a
 * dispensary-shelf rhythm, a horizontal shelf rule at a fixed pitch with short
 * vertical dividers reading as the edge of a run of shelving, and a longer
 * full-height vertical where a bay ends.
 *
 * Pill capsules, mortar-and-pestle glyphs, green crosses and prescription-pad
 * clip art are rejected for the same reason startups-tech rejected rockets: the
 * wordmark already carries the pharmacy mark, so the backdrop must be structure,
 * not iconography. The shelving run is the structure the reader's own premises
 * actually repeats, and it tiles seamlessly in both axes, which a glyph cannot.
 *
 * Mechanism is startups-tech's and hospitality's, NOT generalist's: a
 * user-space pattern painted into a `width="100%" height="100%"` rect, with no
 * fixed view box and no sliced aspect ratio. generalist's fixed-box shape is
 * what produces horizontal overflow at 390, and a phase-1 brief has recommended
 * copying it before now. Baseline on this site is 0 overflow at every width and
 * this component must not break that.
 *
 * Colour is the `primary-400` step `#45cdff`, written as a LITERAL rather than
 * `var(--color-primary-400)`, for two reasons: an undefined custom property
 * invalidates the whole declaration and the element then paints nothing with
 * every test still green, and the Tailwind v4 ramp emits oklch rather than the
 * sRGB these ratios were measured on. No new colour enters: `#45cdff` is a
 * declared step of the P1-A ramp. The brand hex `#0f3a4a` is NOT used here: it
 * measures 1.47 on slate-900, i.e. invisible on the one ground phase 1 mounts
 * this on.
 *
 * Contrast, at the backdrop's STRONGEST point (a 1px stroke at full alpha inside
 * the 0.10 group, i.e. assuming copy sits directly on a rule, which the
 * left-fading mask means it effectively never does). Figures are the bare ground
 * and the ground composited with 0.10 of `#45cdff`, against white (footer
 * headings) and `text-slate-300` `#cbd5e1` (footer links). ONE row, because
 * phase 1 mounts this on the kit footer only; later phases add their own row
 * before reusing this component on a new ground.
 *   - `bg-slate-900` `#0f172a` (kit footer, phase 1's own and only mount):
 *     bare white 17.85, slate-300 12.02; composited `#14293f` white 14.80,
 *     slate-300 9.97. PASS. (`#45cdff` on bare slate-900 is 9.72 at full
 *     strength; that is NOT the figure that matters, the composited pair above
 *     is.)
 *
 * No `tone` prop: the one ground phase 1 mounts on needs one colour and one
 * alpha, so a light/dark branch would have no caller.
 *
 * No JavaScript, no animation, no dependency, no data URI: identical in the
 * static HTML and on the client, and identical under
 * `prefers-reduced-motion: reduce` because there is nothing to reduce. Hidden
 * below `sm` (the footer reads as a solid ground there), which is also why it
 * cannot contribute horizontal overflow at 390px.
 *
 * Host contract (the contract the kit `SiteFooter` `backdrop` slot already
 * satisfies): the parent must be `relative overflow-hidden` and its content
 * `relative z-10`, or the texture paints over the copy.
 */

// ponytail: one tone, fixed divider positions. A backdrop must render
// byte-identically on the server and the client, so nothing here is random.
const DIVIDERS = [20, 40, 60];

/**
 * `patternId` exists because a DOM id must be unique per DOCUMENT, not per
 * component. A server component cannot call useId, so the id is a prop with a
 * default: single-mount pages pass nothing, and a page that mounts it more than
 * once passes a distinct id per instance. Two `<pattern>` elements sharing an id
 * is invalid HTML and the second fill silently resolves to the first.
 */
export default function PharmaciesBackdrop({
  patternId = "pharmacies-dispensary-shelving",
}: {
  patternId?: string;
}) {
  /* A MASK, not a painted ground: it sets maskImage only, publishes no colour,
   * and just fades the motif's own alpha out to the left so it never competes
   * with the copy. There are no ground stops to measure here; the single ground
   * row is in the header comment. */
  const mask = "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{ opacity: 0.1, maskImage: mask, WebkitMaskImage: mask }}
    >
      <svg className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          {/* 80 x 80 = two shelf runs at a 40px pitch, three short dividers per
              run at 20px spacing, and one full-height bay edge. Both the shelf
              rules and the bay edge meet themselves across the tile seam, so
              the field reads as one continuous run of shelving rather than as
              detached boxes. */}
          <pattern id={patternId} width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#45cdff" strokeWidth="1">
              {/* The two shelf rules. */}
              <path d="M0 39.5h80M0 79.5h80" />
              {/* The bay edge: the one longer vertical, where a run ends. */}
              <path d="M0.5 0v80" />
            </g>
            {/* The dividers: short verticals standing on each shelf. Held below
                the shelf alpha (0.6 inside the 0.10 group is an effective 0.06)
                so the shelf rule stays the strongest point the ratios above
                assume, and so the rhythm reads horizontal rather than as a
                grid. */}
            <g fill="none" stroke="#45cdff" strokeWidth="1" strokeOpacity="0.6">
              {DIVIDERS.map((x) => (
                <g key={x}>
                  <path d={`M${x + 0.5} 28v11`} />
                  <path d={`M${x + 0.5} 68v11`} />
                </g>
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
