/**
 * Slugs that have their own static page under src/app/calculators/<slug>/.
 *
 * They stay `kind: "generic"` in the registry (gallery, sitemap, nav and the
 * embed routes all list generic tools, and demoting them would drop the page
 * from those surfaces), so /calculators/[slug] would otherwise ALSO prerender
 * them. Both routes write the same file,
 * `.next/server/app/calculators/<slug>.html`, and the [slug] render clobbers
 * the bespoke one: that is how law-firm-sale-cgt lost its worked-example block
 * and its gate wording, and with it the live `data-cta="see_result"` (the
 * generic CalculatorClient wraps the result in a ResultGate with no
 * `dataCta`/`blurb`/`buttonLabel`).
 *
 * Kept in sync with the filesystem by src/tests/calculator-route-collision.test.ts.
 */
export const BESPOKE_CALCULATOR_SLUGS = ["law-firm-sale-cgt"];
