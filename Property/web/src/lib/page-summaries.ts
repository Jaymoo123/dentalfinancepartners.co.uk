/**
 * The one-line summary each non-article page introduces itself with.
 *
 * WHY THIS EXISTS. A related-reading card pointing at a blog post shows the
 * article's opening sentence, so the reader knows what they are clicking into. A
 * card pointing at /landlord-tax or /services/property-tax-advice used to show
 * the link label and nothing else, which is a worse card for a more important
 * destination.
 *
 * WHY IT IS A REGISTRY RATHER THAN COPY IN THE CARD. The obvious version is to
 * type the sentence into the link list on whichever page renders the card, which
 * is a second copy of the page's own standfirst that nothing keeps in sync: edit
 * the hero and the card silently keeps describing the old page. So the sentence
 * lives here ONCE and the owning page imports it for its own hero. One string,
 * two consumers, no drift.
 *
 * WHEN NOT TO ADD AN ENTRY HERE. Routes whose summary can be read from live data
 * are resolved at render instead and must not be duplicated into this file:
 *   - `/blog/<category>/<slug>` uses `firstSentence` over the post body;
 *   - `/resources/<topic>` uses `getGuideByTopic(topic).summary`.
 * Add a route here only when its standfirst is authored inline in a page and
 * there is nowhere else to read it from. Keep the sentences short enough to
 * survive a three-line clamp in a card.
 */
export const PAGE_SUMMARIES: Record<string, string> = {
  "/landlord-tax":
    "Every tax that touches a let property, what changes next April, and where the money actually goes.",
  "/section-24":
    "How the finance cost restriction works, what it costs you a year, who it hits hardest, and what actually reduces the bill.",
  "/services/property-tax-advice":
    "One-off consultations on a specific decision: structuring, capital gains timing, capital allowances and portfolio inheritance tax, with written advice and no ongoing tie-in.",
  "/blog/property-types-and-specialist-tax":
    "Different property types face different tax rules. Guidance on HMOs, commercial property, serviced accommodation, holiday lets, student housing and property development.",
  "/blog/landlord-tax-essentials":
    "Core tax knowledge every UK landlord needs. Self assessment filing and rental income tax through to VAT registration, stamp duty, and maximising your allowable expenses.",
};

/** The summary for an internal route, or undefined if it has no authored one. */
export function pageSummary(href: string): string | undefined {
  return PAGE_SUMMARIES[href.split(/[?#]/)[0]];
}
