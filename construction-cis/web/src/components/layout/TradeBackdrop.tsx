/**
 * Setting-out / scaffold grid. Trade's brand motif, the counterpart to Property's
 * etched brickwork: vertical standards at 28px, ledger transoms at 44px, diagonal
 * braces and dimension ticks, i.e. the geometry a site sets out before anything is
 * built. Decorative only, so aria-hidden, and inline SVG so the strokes come from
 * the brand ramp via `stroke-primary-*` rather than a hard-coded hex (a background
 * data URI cannot resolve a CSS variable, which is why Property's brickwork has to
 * inline its colour and this does not).
 *
 * Sits on the right side and fades out toward the middle so it never competes with
 * hero copy. Hidden below sm: (the panel renders as a solid ground).
 *
 * `tone="navy"`: light standards on a `bg-slate-900` parent: primary-300 at 0.18.
 * `tone="cream"`: dark standards on `heroCreamSurface`: primary-600 at 0.10.
 * Navy on cream is a far higher-contrast pairing than orange on navy, so matching
 * the navy figure there would read as pipework rather than texture.
 *
 * Parent section must be `relative overflow-hidden`; content `relative z-10`.
 */
export function TradeBackdrop({ tone = "navy" }: { tone?: "navy" | "cream" }) {
  const cream = tone === "cream";
  // Tone-scoped so a navy and a cream backdrop on the same page cannot collide on
  // the pattern id. Two of the SAME tone resolve to an identical pattern, so the
  // shared id is harmless there.
  const patternId = `trade-setting-out-${tone}`;
  const mask = cream
    ? "linear-gradient(to left, black 45%, transparent 97%)"
    : "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{
        opacity: cream ? 0.1 : 0.18,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <svg className="h-full w-full" aria-hidden focusable="false">
        <defs>
          {/* 112 x 88 = four 28px standards by two 44px lifts, so the braces and
              the dimension ticks tile without a visible seam. */}
          <pattern id={patternId} width="112" height="88" patternUnits="userSpaceOnUse">
            <g
              fill="none"
              strokeWidth={cream ? 1.15 : 1}
              className={cream ? "stroke-primary-600" : "stroke-primary-300"}
            >
              {/* Ledger transoms (horizontals, 44px lifts) */}
              <path d="M0 0.5h112M0 44.5h112" />
              {/* Vertical standards at 28px centres */}
              <path d="M0.5 0v88M28.5 0v88M56.5 0v88M84.5 0v88" />
              {/* Diagonal braces, one per lift, alternating hand */}
              <path d="M0.5 44.5L28.5 0.5M56.5 0.5L84.5 44.5M28.5 88.5L56.5 44.5" />
              {/* Dimension ticks on the transoms, at the half-bay */}
              <path d="M14.5 41v7M42.5 41v7M70.5 41v7M98.5 41v7" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
