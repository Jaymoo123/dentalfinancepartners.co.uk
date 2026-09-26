/**
 * Site layout utilities. Row 1 of the kit-adoption gate.
 *
 * Everything the shared kit already gets right is RE-EXPORTED from
 * `packages/web-shared/design/layout-utils.ts` rather than retyped. Where this
 * file deliberately keeps a local recipe, the reason is written immediately
 * above it and names that kit file path, so `grep -n "web-shared/design/layout-utils"`
 * finds every decline as well as every adoption.
 *
 * Deleted, not ported: `linkArrow`, `btnOnTeal` and `btnOnDark`. All three had
 * ZERO consumers anywhere under `ecommerce/web/src`, and `btnOnTeal`/`btnOnDark`
 * were both aliased to `btnSecondary`, a neutral-outline recipe that would have
 * been near-invisible on the dark grounds their names promise. They were
 * leftovers from another site. The kit has a real `btnOnDark` if one is ever
 * needed: import it from packages/web-shared/design/layout-utils.
 */

export {
  // Byte-identical to the local versions they replace. Pure adoption.
  siteContainer,
  siteContainerLg,
  contentNarrow,
  // Not byte-identical: the kit's rhythm is tighter (py-12 sm:py-16 md:py-20 vs
  // the old py-16 sm:py-20 lg:py-28). Adopted deliberately - the Property
  // standard vertical rhythm is the point of the port, and keeping a local
  // spacing scale is exactly the drift the gate exists to stop.
  sectionY,
  sectionYLoose,
  // Brand-outline secondary, on light grounds only. Now legal here: its
  // `border-primary-600` is #9e6615 (4.81 on white) and its `text-primary-700`
  // is #8a5e1a (5.68 on white), both past the floors, because globals.css
  // anchors the ramp on the accessible steps rather than on the brand hex.
  btnSecondary,
  // Re-exported for the chrome package. The header CTA MUST compose from this
  // base, never from `btnPrimary`: `btnPrimary` opens with a bare `inline-flex`,
  // and in this site's bundle `.hidden{` is emitted 79 bytes BEFORE
  // `.inline-flex{`, so `hidden lg:inline-flex` composed over it loses the
  // cascade race at equal specificity and the CTA never hides on mobile.
  btnPrimaryBase,
} from "@accounting-network/web-shared/design/layout-utils";

/**
 * DECLINED: `focusRing` from packages/web-shared/design/layout-utils.ts:20.
 *
 * The kit ring is single-valued (`outline-primary-600`). On this site
 * primary-600 IS the primary button ground, so the kit ring would be 1.00:1
 * against the button it rings - the identical defect this port is fixing, just
 * with a different hex. And no single colour can replace it: the impossibility
 * proof (analytic plus a 4,096-point sRGB sweep) is written out in
 * `src/app/globals.css` above --focus-ring-on-light. Read it before collapsing
 * these two into one.
 *
 * What the ring must contrast with is the GROUND, not the control. Every recipe
 * here carries `outline-offset-2`, so the outline is painted two pixels OUTSIDE
 * the control, on whatever the section is painting. Ground is an ancestor fact,
 * so it is carried by the inherited `--focus-ring` custom property: `:root`
 * defaults it to the light value and `.ground-dark` rebinds it to the on-brand
 * white. This is the ONLY ring mechanism on the site - one grep,
 * `outline-\[var\(--focus-ring\)\]`, finds every ring.
 */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * ESCAPE HATCH, currently unused by design, kept on purpose.
 *
 * `.ground-dark` is a SECTION class, and custom properties inherit, so it
 * cannot express an element-level dark island inside a light section. This site
 * paints exactly that in `src/components/forms/BookingPicker.tsx:27` (the
 * selected slot, `bg-neutral-900`, sitting in a white grid) and at
 * `thank-you/page.tsx:20,137,151`. Those are outside this package's lease; when
 * they are corrected, this is the recipe they need, because putting
 * `.ground-dark` on their parent would hand a white ring to every light sibling.
 *
 * White: 3.04 / 3.77 / 4.81 / 14.59 against #c9861b / #b5761a / #9e6615 /
 * #1a2942 - all past the 3:1 graphic floor.
 */
export const focusRingOnBrand =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-on-brand)]";

/**
 * DECLINED: `btnPrimary` from packages/web-shared/design/layout-utils.ts:39.
 *
 * Its ground is right and is adopted verbatim below via the same
 * --btn-ground/-hover/-active tokens (declared in src/app/globals.css). What is
 * wrong is its focus ring: the kit hardcodes `outline-primary-600`, which on
 * this site resolves to the button's own ground, 1.00:1.
 *
 * The ring here reads `var(--focus-ring)`, NOT a fixed value. A previous pass
 * pinned it to the on-brand white on the reasoning that an amber button wants a
 * white ring; that is wrong, because `outline-offset-2` paints the ring two
 * pixels outside the button, on the section ground. Most of this button's call
 * sites sit on white, #fafaf9, slate-50 or amber-50, where a white ring is
 * 1.00:1 and invisible. Three sit on `bg-neutral-900` and one on the #1a2942
 * hero, where white is correct; those sections carry `.ground-dark`.
 *
 * Written out in full rather than composed as `${btnPrimaryBase} outline-...`,
 * because appending a competing utility ties on specificity and the winner is
 * decided by Tailwind's emission order, not by the order of this string. That
 * composition race is already live on this site at six call sites
 * (`${btnPrimary} text-base`, where `.text-base{` is emitted at byte 36727 and
 * `.text-sm{` at 36917, so the append LOSES). Adopting the kit's `text-base`
 * default here also retires that race.
 *
 * Ground: white label on #9e6615 = 4.81, on #8a5e1a = 5.68, on #6f4b15 = 7.80.
 * The old #c9861b ground was 3.04 and failed.
 */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-[var(--btn-ground,var(--color-primary-600))] px-8 py-3.5 text-base font-bold text-white transition-all duration-150 hover:bg-[var(--btn-ground-hover,var(--color-primary-700))] active:bg-[var(--btn-ground-active,var(--color-primary-800))] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * The ring for anchors inside AUTHORED HTML (`dangerouslySetInnerHTML`).
 *
 * Those anchors are written in the data files, so no call site can put a class
 * on them. The only reachable handle is a descendant variant on the wrapper,
 * which is why this is `[&_a]:` rather than a recipe an element carries. It is
 * the SAME mechanism as `focusRing` above, one variant deeper: same width, same
 * `outline-offset-2`, same `var(--focus-ring)`. Establishing it once here and
 * appending it to every authored-HTML wrapper keeps the grep
 * `outline-\[var\(--focus-ring\)\]` as the single census of rings on this site.
 *
 * The token, not a literal colour, because these wrappers sit on BOTH grounds:
 * `linkOnLight` on white and #fafaf7 (ring #8a5e1a, 5.68 / 5.44) and
 * `linkOnDark` on the `.ground-dark` primary-700 hero and neutral-800 stats
 * band (ring #ffffff, past the 3:1 graphic floor on both). A literal would be
 * wrong on one of the two; `.ground-dark` rebinds the token and the same string
 * is correct on both.
 */
export const focusRingAuthoredLinks =
  "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
