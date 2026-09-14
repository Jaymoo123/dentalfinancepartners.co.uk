/**
 * Pooled-ledger layer for navy hero sections: crypto's answer to Property's
 * `HeroBrickBackdrop` and generalist's `GeneralistBackdrop`. Same mechanism
 * (a masked SVG pattern on the right, fading out toward the copy), different
 * subject: a lattice of square cells linked by short stubs, which is the
 * shape of the only two structures this site actually sells help with, the
 * Section 104 pool and the chain of disposals feeding it. Cells are drawn
 * square with no radius on purpose: square is this site's own geometry.
 *
 * Coin glyphs, candlesticks and rocket iconography were rejected. The reader
 * arriving here has an HMRC problem, and the register is sober.
 *
 * Stroke is #c9835c, the declared `--color-primary-400` step, written as a
 * literal: a background data URI cannot resolve a custom property, and the v4
 * ramp utility emits oklch() rather than the sRGB value the ratio below was
 * measured on. At the 0.18 opacity this paints, a stroke composites to
 * #302d40 on the navy ground, which is 13.35:1 against the white hero copy,
 * so the copy clears its 4.5 text floor at the backdrop's strongest point.
 *
 * No JavaScript, no animation, no dependency: it is identical in the static
 * HTML and under `prefers-reduced-motion: reduce`. Hidden below `sm` (the
 * hero renders as a solid ground there), which is also why it cannot
 * contribute horizontal overflow at 390px.
 *
 * Host contract (same as Property's `HeroBrickBackdrop`): the parent section
 * must be `relative overflow-hidden` and its content `relative z-10`, or the
 * texture paints over the copy.
 */
export default function CryptoBackdrop() {
  // ponytail: one tone. crypto paints no cream hero surface (heroCreamSurface
  // is re-exported but unused), so the navy/cream flip the sibling backdrops
  // carry would be a branch with one caller.
  const mask = "linear-gradient(to left, black 35%, transparent 92%)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{ opacity: 0.18, maskImage: mask, WebkitMaskImage: mask }}
    >
      <svg className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          {/* 84 x 84 = three 28px cells each way, so the linking stubs meet
              across the tile seam and the lattice reads as continuous. */}
          <pattern
            id="crypto-pooled-ledger"
            width="84"
            height="84"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#c9835c" strokeWidth="1">
              {/* The cells: 20px squares on 28px centres. */}
              <path d="M4.5 4.5h19v19h-19zM32.5 4.5h19v19h-19zM60.5 4.5h19v19h-19z" />
              <path d="M4.5 32.5h19v19h-19zM32.5 32.5h19v19h-19zM60.5 32.5h19v19h-19z" />
              <path d="M4.5 60.5h19v19h-19zM32.5 60.5h19v19h-19zM60.5 60.5h19v19h-19z" />
              {/* Horizontal links, including the half-stubs at both tile edges
                  so the chain continues across the seam. */}
              <path d="M0 14h4M24 14h8M52 14h8M80 14h4M0 70h4M24 70h8M52 70h8M80 70h4" />
              {/* Vertical links down the middle column only: a full grid of
                  connectors reads as graph paper rather than a chain. */}
              <path d="M42 24v8M42 52v8" />
            </g>
            {/* Pooled holdings: two cells carry a wash. Kept below the stroke
                alpha because a filled cell covers area a 1px rule does not. */}
            <g fill="#c9835c" fillOpacity="0.55">
              <rect x="32.5" y="32.5" width="19" height="19" />
              <rect x="60.5" y="60.5" width="19" height="19" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crypto-pooled-ledger)" />
      </svg>
    </div>
  );
}
