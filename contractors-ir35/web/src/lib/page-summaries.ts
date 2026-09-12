/**
 * The one-line summary each non-article route introduces itself with.
 *
 * WHY THIS EXISTS. A related-reading or cross-link card pointing at a blog post
 * can show the article's opening sentence, so the reader knows what they are
 * clicking into. A card pointing at /ir35-status or /calculators would
 * otherwise show the link label and nothing else, which is a worse card for a
 * more important destination.
 *
 * WHY A REGISTRY. The obvious version is to type the sentence into the link
 * list on whichever page renders the card, which is a second copy of that
 * page's own standfirst that nothing keeps in sync. It lives here once.
 *
 * WHEN NOT TO ADD AN ENTRY. Routes whose summary can be read from live data are
 * resolved at render and must not be duplicated here:
 *   - /blog/<category> reads CATEGORY_HUBS in `lib/blog-categories.ts`;
 *   - /blog/<category>/<slug> reads the post's own opening sentence;
 *   - /calculators/<slug>, /for/<slug>, /glossary/<slug> and /locations/<slug>
 *     each carry a description field in their own registry or data file.
 * Add a route here only when its standfirst is authored inline in a page and
 * there is nowhere else to read it from. Keep every sentence short enough to
 * survive a three-line clamp in a card.
 *
 * DELIBERATELY ABSENT: /book, /complete, /thank-you and /embed are noindex or
 * funnel-internal and are never the target of a reading card, and /admin is not
 * public. /privacy-policy, /terms and /cookie-policy are footer routes with no
 * card surface.
 *
 * COPY RULES. UK English, no em-dashes, first person, no fee figures, no
 * turnaround promises, no qualification or regulator claim, no client counts.
 * No entry carries a tax figure, so nothing here goes stale against a rate
 * change; anything that ever does must trace to
 * docs/contractors-ir35/house_positions.md.
 */
export const PAGE_SUMMARIES: Record<string, string> = {
  "/": "Accountants who work only with UK contractors, PSC directors and umbrella workers, covering IR35 status, the company tax and how you pay yourself.",
  "/services":
    "What we actually do for contractors: IR35 status reviews, limited company accounts and corporation tax, director payroll, the salary and dividend split, VAT and expenses.",
  "/ir35-status":
    "A contract and working practices review that tests your engagement against substitution, control and mutuality, and gives you the conclusion in writing with the reasoning behind it.",
  "/for":
    "How contracting works sector by sector, from IT and engineering to NHS locums, oil and gas, legal and construction, because the status arguments and the typical contract differ in each.",
  "/blog":
    "Practical guides for UK contractors on IR35 and the off-payroll rules, umbrella against limited, company tax, expenses, dividends and pension planning.",
  "/calculators":
    "Free contractor calculators on current rates, covering inside and outside IR35 take-home, umbrella against limited, dividend and corporation tax, and the director salary question. No email gate.",
  "/glossary":
    "Plain-English definitions of the IR35, off-payroll and contractor tax terms you will meet in a determination, a contract or a conversation with an agency.",
  "/locations":
    "The UK contractor markets we work across, with a page for each city covering the sectors that dominate it and how the local engagement patterns tend to look.",
  "/research":
    "Original, sourced reads on UK contractor and personal service company formation, survival and insolvency, built entirely from official open data and free to cite with attribution.",
  "/research/uk-contractor-index":
    "How many personal service companies the UK is forming, tracked from Companies House data across the SIC codes contractors actually incorporate under.",
  "/research/uk-contractor-survival-index":
    "How long contractor companies last, from incorporation through to dissolution, built from official company-level data rather than survey responses.",
  "/research/uk-contractor-insolvency-index":
    "Insolvency among small contractor-heavy companies in England and Wales, tracked from Insolvency Service open data on a trailing basis.",
  "/about":
    "Why we only take contractor clients, how the work is done and who does it, and what that specialism changes about the advice you get.",
  "/contact":
    "Tell us what the engagement looks like and where you are stuck, and we will come back on what we would do about it. No obligation.",
};

/** The summary for an internal route, or undefined if it has no authored one. */
export function pageSummary(href: string): string | undefined {
  return PAGE_SUMMARIES[href.split(/[?#]/)[0]];
}
