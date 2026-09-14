/**
 * Fund-ledger layer for charities' hero sections: this site's answer to
 * Property's `HeroBrickBackdrop`, generalist's `GeneralistBackdrop`, Trade's
 * `TradeBackdrop` and crypto's `CryptoBackdrop`. Same mechanism, different
 * subject: ruled account rows, a paired money-column rule, narration marks on
 * the left and figures on the right, with the right-hand column carrying a
 * wash. That is the fund accounting this site exists for, restricted and
 * unrestricted columns side by side under SORP, and the form a trustee or a
 * finance officer already reads every year.
 *
 * Hearts, hands, ribbons, donation and people iconography were rejected: the
 * reader arriving here has a compliance problem (independent examination
 * thresholds, Gift Aid, a trustees' report), not a warm feeling to be sold.
 *
 * Mechanism is Trade's and crypto's, NOT generalist's: a
 * `patternUnits="userSpaceOnUse"` pattern painted into a `width="100%"
 * height="100%"` rect, with no `viewBox` and no `preserveAspectRatio="slice"`.
 * The fixed-viewBox shape is what produces horizontal overflow.
 *
 * Colour is this site's own declared ramp, written as literals rather than
 * `var(--color-primary-*)`: an undefined custom property invalidates the whole
 * declaration and the element then paints nothing with every test still green,
 * and the Tailwind v4 ramp emits oklch() rather than the sRGB values the ratios
 * below were measured on. No new brand colour is introduced.
 *
 * Contrast, at the backdrop's STRONGEST point (a 1px stroke at full alpha
 * inside the 0.18 group, i.e. assuming copy sits directly on a rule, which the
 * left-fading mask means it effectively never does):
 *   - dark on primary-900 #102d24 (the homepage hero): stroke #57a88f
 *     composites to #1d4337. White hero copy = 10.99:1, `text-white/90` body
 *     = 9.23:1. Both clear the 4.5 text floor.
 *   - dark on slate-900 #0f172b (`PageHero tone="dark"`): composites to
 *     #1c313d. White copy = 13.67:1. `richLinkOnDark`'s primary-400 anchors,
 *     6.27:1 on the bare ground, are 4.81:1 here: still over 4.5.
 *   - cream on `--hero-cream` #f2fbf7: stroke #1a5c4a at the 0.10 group
 *     composites to #dcebe6, and slate-900 copy is 14.32:1.
 * Every ratio clears its floor, so the graphic 3.0 floor is moot as well.
 *
 * No JavaScript, no animation, no dependency: identical in the static HTML and
 * under `prefers-reduced-motion: reduce`, because there is nothing to reduce.
 * Hidden below `sm` (the hero renders as a solid ground there), which is also
 * why it cannot contribute horizontal overflow at 390px.
 *
 * Host contract (same as Property's `HeroBrickBackdrop`): the parent section
 * must be `relative overflow-hidden` and its content `relative z-10`, or the
 * texture paints over the copy.
 */
export default function CharitiesBackdrop({
  tone = "dark",
}: {
  tone?: "dark" | "cream";
} = {}) {
  const cream = tone === "cream";
  // Tone-scoped so a cream and a dark hero on one page cannot collide on the
  // pattern id. Two of the SAME tone resolve to an identical pattern, so the
  // shared id is harmless.
  const patternId = `charities-fund-ledger-${tone}`;
  const stroke = cream ? "#1a5c4a" : "#57a88f"; // primary-600 / primary-400
  const mask = cream
    ? "linear-gradient(to left, black 45%, transparent 97%)"
    : "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{
        opacity: cream ? 0.1 : 0.18,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <svg className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          {/* 96 x 72 = three 24px ledger rows by one column set, so the rules
              and the paired money column meet across the tile seam. */}
          <pattern
            id={patternId}
            width="96"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            {/* The restricted column carries a wash, the way a ruled fund
                account shades the column it totals. Kept well below the stroke
                alpha: a filled band covers area a 1px rule does not, so the
                stroke stays the strongest point the ratios above assume. */}
            <rect
              x="60.5"
              y="0"
              width="35.5"
              height="72"
              fill={stroke}
              fillOpacity="0.35"
            />
            <g fill="none" stroke={stroke} strokeWidth={cream ? 1.15 : 1}>
              {/* Ledger rows, 24px */}
              <path d="M0 0.5h96M0 24.5h96M0 48.5h96" />
              {/* The money column: a paired rule, which is what separates
                  unrestricted from restricted funds on a ruled account. */}
              <path d="M56.5 0v72M60.5 0v72" />
              {/* Narration marks, unrestricted side: varying lengths, because
                  equal ones read as graph paper rather than as entries. */}
              <path d="M8 12.5h36M8 36.5h28M8 60.5h40" />
              {/* Figures, restricted side */}
              <path d="M68 12.5h20M72 36.5h16M68 60.5h20" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
