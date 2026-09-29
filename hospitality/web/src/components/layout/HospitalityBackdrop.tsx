/**
 * Per-site motif layer for this site's dark grounds: hospitality's answer to
 * startups-tech's `StartupsBackdrop` and generalist's `GeneralistBackdrop`.
 * Same mechanism, different subject: a repeating table-and-cover rhythm, a
 * plate with a fork and knife laid at each setting, which is the sober
 * structure a service pass actually repeats rather than a chef-hat or
 * cocktail-glass glyph.
 *
 * Chef hats, cocktail glasses and cutlery clip-art were rejected for the same
 * reason startups-tech rejected rockets. The wordmark already carries
 * `UtensilsCrossed`; this backdrop must not repeat it, so the motif is the
 * table setting (plate + place lines), not crossed utensils.
 *
 * Mechanism is startups-tech's, generalist's and Property's: a
 * `patternUnits="userSpaceOnUse"` pattern painted into a `width="100%"
 * height="100%"` rect, with NO `viewBox` and no `preserveAspectRatio="slice"`.
 * The fixed-viewBox shape (generalist's) is what produces horizontal
 * overflow, and a phase-1 brief has recommended copying it before now.
 *
 * Colour is the primary-400 step `#e58764`, written as a literal rather than
 * `var(--color-primary-400)`: an undefined custom property invalidates the
 * whole declaration and the element then paints nothing with every test
 * still green, and the Tailwind v4 ramp emits oklch rather than the sRGB the
 * ratios below were measured on. No new brand colour is introduced; `#e58764`
 * is the declared primary-400 step of this site's own ramp (P1-A). The brand
 * hex `#b0532f` is NOT used here: on a dark ground it reads as dirt rather
 * than as a motif.
 *
 * Contrast, at the backdrop's STRONGEST point (a 1px stroke at full alpha
 * inside the 0.10 group, i.e. assuming copy sits directly on a line, which
 * the left-fading mask means it effectively never does). Figures below are
 * the bare ground and the ground composited with 0.10 of #e58764, against
 * white and `text-slate-300` (#cbd5e1). One row per ground this component
 * mounts on across this port; phase 1 mounts it on the footer only, so
 * phase 1 writes exactly one row and later phases add theirs.
 *   - `bg-slate-900` `#0f172a` (footer, phase 1's own mount): bare white
 *     17.85, slate-300 12.02; composited `#182234` white 16.34, slate-300
 *     11.00. PASS.
 *
 * No `tone` prop added: the motif colour (`#e58764`, primary-400) and alpha
 * stay the same on the one ground phase 1 mounts on, so there is no
 * light/dark branch to switch yet. A later phase that mounts on a different
 * ground adds its own contrast row above before reusing this component
 * as-is.
 *
 * No JavaScript, no animation, no dependency, no data URI: identical in the
 * static HTML and under `prefers-reduced-motion: reduce`, because there is
 * nothing to reduce. Hidden below `sm` (the footer reads as a solid ground
 * there), which is also why it cannot contribute horizontal overflow at
 * 390px.
 *
 * Host contract (same as startups-tech's, generalist's and Property's
 * backdrops, and the contract the kit's `SiteFooter` `backdrop` slot already
 * satisfies): the parent section must be `relative overflow-hidden` and its
 * content `relative z-10`, or the texture paints over the copy.
 */

// ponytail: one tone. Every ground this site can mount a backdrop on today is
// the kit footer's slate-900, so a light branch would have no caller. The
// setting positions are a fixed sequence rather than random: a backdrop must
// render byte-identically on the server and the client.
const SETTINGS = [0, 1, 2, 3];

/**
 * `patternId` exists because a DOM id must be unique per DOCUMENT, not per
 * component. A server component cannot call useId, so the id is a prop with
 * a default: single-mount pages pass nothing, and a page that mounts it more
 * than once passes a distinct id per instance. Two `<pattern>` elements
 * sharing an id is invalid HTML and the second fill silently resolves to the
 * first.
 */
export default function HospitalityBackdrop({
  patternId = "hospitality-table-setting",
}: {
  patternId?: string;
}) {
  /* R1 G7: gate row 7 lists this file because of the linear-gradient below.
   * It is a MASK, not a painted ground: it sets maskImage, so it publishes no
   * colour and only fades the motif's own alpha out to the left. There are no
   * ground stops to measure here; the one ground row this component mounts on
   * is the footer's slate-900, measured in the header comment above. */
  const mask = "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{ opacity: 0.1, maskImage: mask, WebkitMaskImage: mask }}
    >
      <svg className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          {/* 80 x 80 = four place settings per tile, each a plate with a
              fork line to its left and a knife line to its right, laid on
              a shared table line, so the field reads as one continuous
              service pass rather than detached glyphs. */}
          <pattern id={patternId} width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#e58764" strokeWidth="1">
              {/* The table line the whole tile shares. */}
              <path d="M0 68h80" />
              {SETTINGS.map((setting) => {
                const x = setting * 20 + 10;
                return (
                  <g key={setting}>
                    {/* The fork: two tines and a handle to the left of the plate. */}
                    <path d={`M${x - 8} 44v16`} />
                    <path d={`M${x - 8} 44v6M${x - 6} 44v6`} />
                    {/* The knife: a blade and handle to the right of the plate. */}
                    <path d={`M${x + 8} 44v16`} />
                  </g>
                );
              })}
            </g>
            {/* The plate itself: a shallow ring centred on each setting,
                kept well below the stroke alpha (0.5 inside the 0.10 group
                is an effective 0.05), because a filled ring covers area a
                1px rule does not, so the stroke stays the strongest point
                the ratios above assume. */}
            <g fill="none" stroke="#e58764" strokeWidth="1" strokeOpacity="0.5">
              {SETTINGS.map((setting) => (
                <circle key={setting} cx={setting * 20 + 10} cy="52" r="7" />
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
