/**
 * Ruled-ledger layer for hero and CTA sections. Sits on the right and fades out
 * toward the middle so it never competes with the copy. Hidden on mobile (those
 * sections render as a solid ground there).
 *
 * `tone="navy"` — light rules on a `bg-slate-900` parent (SlimHero, the navy
 * LeadCTAPanel). `tone="cream"` — brand rules on a light parent, held to a lower
 * opacity: brand-on-cream is a far higher-contrast pairing than brand-on-navy,
 * so matching the navy figure reads as pipework rather than texture. The cream
 * fade also starts later, so more of the ruling stays legible.
 *
 * Host contract (same as Property's HeroBrickBackdrop): the parent section must
 * be `relative overflow-hidden` and its content `relative z-10`, or the texture
 * paints over the copy.
 */
export function GeneralistBackdrop({ tone = "navy" }: { tone?: "navy" | "cream" }) {
  const cream = tone === "cream";
  // Two tones can co-exist on one page; a shared pattern id would let the
  // first one win for both.
  const id = `gb-rules-${tone}`;
  const mask = cream
    ? "linear-gradient(to left, black 45%, transparent 97%)"
    : "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <svg
      aria-hidden
      // ponytail: fixed viewBox + `slice` instead of a JS-measured size. The
      // motif is texture, not content, so cropping the tile is invisible.
      viewBox="0 0 448 560"
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] sm:block ${
        cream ? "text-primary-600" : "text-primary-400"
      }`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <defs>
        {/* Horizontal rules at 28px pitch. Pattern content does not inherit
            from the referencing shape, so the rule carries its own stroke. */}
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M0 27.5h28"
            stroke="currentColor"
            strokeOpacity={cream ? 0.1 : 0.18}
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>
      <g stroke="currentColor" strokeOpacity={cream ? 0.1 : 0.18} strokeWidth="1" fill="none">
        <rect width="448" height="560" fill={`url(#${id})`} stroke="none" />
        {/* Column rules: 112px apart (4x the pitch), stopping short of both edges. */}
        <path d="M112.5 56v448M224.5 56v448M336.5 56v448" />
        {/* Ledger entries: short filled ticks at 1.5x weight, placed irregularly. */}
        <g strokeWidth="1.5">
          <path d="M132 167.5h64M244 335.5h48M356 111.5h56" />
        </g>
      </g>
    </svg>
  );
}
