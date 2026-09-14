/**
 * Status-determination layer for contractors-ir35's dark hero sections: this
 * site's answer to Property's `HeroBrickBackdrop`, generalist's
 * `GeneralistBackdrop`, Trade's `TradeBackdrop`, crypto's `CryptoBackdrop` and
 * charities' `CharitiesBackdrop`. Same mechanism, different subject: a chain of
 * engagements, each one entering a determination node, splitting into the two
 * statuses, and rejoining into the next engagement. That is the only structure
 * this site sells help with. A contractor arrives here with one contract to
 * place on one side of the line, and then the next contract, and the one after
 * that; the motif is the fork and the fact that it repeats.
 *
 * Hard hats, briefcases, handshakes and generic "business" iconography were
 * rejected, as were coin and document glyphs: the reader has a status
 * determination problem and the register is sober. A contract chain drawn as
 * separate client/agency/intermediary/worker boxes was rejected too, because at
 * this scale four labelled boxes reduce to indistinguishable rectangles and
 * read as crypto's lattice; the fork is legible at 1px.
 *
 * Mechanism is Trade's, crypto's and charities', NOT generalist's: a
 * `patternUnits="userSpaceOnUse"` pattern painted into a `width="100%"
 * height="100%"` rect, with no `viewBox` and no `preserveAspectRatio="slice"`.
 * The fixed-viewBox shape is what produces horizontal overflow.
 *
 * Colour is #22d3ee, this site's declared `--color-primary-400`, written as a
 * literal rather than `var(--color-primary-400)`: an undefined custom property
 * invalidates the whole declaration and the element then paints nothing with
 * every test still green, and the Tailwind v4 ramp emits its own value rather
 * than the sRGB the ratios below were measured on. No new brand colour.
 *
 * Contrast, at the backdrop's STRONGEST point (a 1px stroke at full alpha
 * inside the 0.16 group, i.e. assuming copy sits directly on a rule, which the
 * left-fading mask means it effectively never does):
 *   - on slate-900 #0f172b (`SlimHero`): stroke composites to #12354a. White
 *     hero copy = 12.81:1.
 *   - on neutral-900 #171717 (this site's 19 flat content heroes): composites
 *     to #193539. White copy = 13.01:1, `text-neutral-300` body = 8.78:1.
 *   - on the homepage photographic hero, assuming the WORST realistic photo,
 *     one that is pure white at every pixel: under the gradient's 0.90 stop,
 *     which is the weakest stop the `max-w-3xl` copy column reaches, the ground
 *     is #222222 and the stroke composites to #223e43. White copy = 11.32:1,
 *     `text-neutral-300` = 7.64:1, the `text-primary-400` headline span = 7.70:1
 *     measured at the 0.97 stop it actually sits under.
 * Every ratio clears the 4.5 text floor, so the 3.0 graphic floor is moot.
 *
 * No JavaScript, no animation, no dependency: identical in the static HTML and
 * under `prefers-reduced-motion: reduce`, because there is nothing to reduce.
 * Hidden below `sm`, which is also why it cannot contribute horizontal overflow
 * at 390px.
 *
 * Host contract (same as Property's `HeroBrickBackdrop`): the parent section
 * must be `relative overflow-hidden` and its content `relative z-10`, or the
 * texture paints over the copy.
 */
export default function ContractorsBackdrop() {
  // ponytail: no props. One tone covers every host, because every hero on this
  // site that can take a backdrop is dark (slate-900, neutral-900, or a
  // neutral-950/cyan-950 gradient over a photo). A tone branch would have one
  // caller. The mask fades at BOTH ends rather than only toward the copy: the
  // right edge is where the photographic heroes expose the most photo, and a
  // texture laid over visible photography is noise.
  const mask =
    "linear-gradient(to left, transparent 0%, black 18%, black 68%, transparent 97%)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
      style={{ opacity: 0.16, maskImage: mask, WebkitMaskImage: mask }}
    >
      <svg className="h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          {/* 80 x 80. The chain enters at y=40 on the left edge and leaves at
              y=40 on the right edge, so the engagements link across the tile
              seam and the field reads as one continuous run rather than a grid
              of detached glyphs. */}
          <pattern
            id="contractors-status-fork"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#22d3ee" strokeWidth="1">
              {/* The engagement arriving at the determination. */}
              <path d="M0 40.5H28" />
              {/* Inside and outside: the fork, and the rejoin into the next
                  engagement. Both legs are drawn identically. Weighting one
                  would assert an answer, and this site's whole product is that
                  the answer depends on the contract. */}
              <path d="M36 40.5L52 16.5H64L80 40.5" />
              <path d="M36 40.5L52 64.5H64L80 40.5" />
              {/* The two statuses, marked as nodes on their own leg. */}
              <path d="M54.5 12.5h7v8h-7zM54.5 60.5h7v8h-7z" />
            </g>
            {/* The determination point itself: the only filled mark, because it
                is the only place on the chain where something is decided. Kept
                small, since a filled square covers area a 1px rule does not, so
                the stroke stays the strongest point the ratios above assume. */}
            <rect
              x="28"
              y="36"
              width="8"
              height="8"
              fill="#22d3ee"
              fillOpacity="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contractors-status-fork)" />
      </svg>
    </div>
  );
}
