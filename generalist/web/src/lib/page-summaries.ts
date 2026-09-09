/**
 * The one-line summary each non-article page introduces itself with.
 *
 * WHY THIS EXISTS. A related-reading card pointing at a blog post shows the
 * article's opening sentence, so the reader knows what they are clicking into. A
 * card pointing at /services or /uk-tax-rates would otherwise show the link
 * label and nothing else, which is a worse card for a more important
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
 *   - `/fundamentals/<slug>` and `/guides/<slug>` carry their own summary field.
 * Add a route here only when its standfirst is authored inline in a page and
 * there is nowhere else to read it from. Keep the sentences short enough to
 * survive a three-line clamp in a card.
 *
 * VOICE. FT-plain, British English, no em dashes, no client counts. Readers are
 * directors, owners and UK businesses.
 */
export const PAGE_SUMMARIES: Record<string, string> = {
  "/": "Year-round compliance and the advisory that goes with it for UK limited companies, sole traders, contractors and partnerships, with one named accountant and fixed fees agreed up front.",
  "/services":
    "Eight service lines covering the full trading year, from incorporation through year-end accounts, VAT, payroll and R&D claims to exit planning.",
  "/accountant-near-me":
    "How a remote-first firm works when you want an accountant nearby, with in-person meetings on request and a dedicated page for every town and city we cover.",
  "/r-and-d-credits":
    "Specialist R&D tax credit claims for UK companies doing custom development, novel engineering or process science, prepared to HMRC's current evidence standards.",
  "/locations":
    "Accountants for UK businesses city by city, with each location page researched against the local economic mix, named employers and sector emphasis.",
  "/calculators":
    "Free calculators answering the questions UK business owners actually ask, from take-home pay and salary versus dividend to the cost of a hire, on current rates and with no email gate.",
  "/blog":
    "Plain-English articles on limited company tax, self assessment, VAT and MTD, payroll, R&D credits, director pay and exit, written or reviewed by a specialist accountant.",
  "/fundamentals":
    "The pillar guides we wish every UK business owner had read before incorporating, hiring or selling.",
  "/guides":
    "Long-form practical guides for UK business owners, covering year-end tax planning, switching accountants, the first 90 days as a limited company and a first contract as a contractor.",
  "/glossary":
    "Plain-English definitions of the UK tax, finance and accounting terms business owners actually need to understand, with figures checked against current rates.",
  "/templates":
    "Free PDF templates for UK limited companies, contractors and sole traders, each reviewed against current HMRC and Companies House requirements and downloadable without an email.",
  "/uk-tax-rates":
    "A citable reference of every UK tax rate a director, contractor, sole trader or partnership owner needs for the current tax year, with primary sources and a machine-readable version.",
  "/research":
    "Original, sourced reads on UK small business conditions, built entirely from official open data and free to cite with attribution.",
  "/research/uk-small-business-barometer":
    "The all-sector read on UK small business conditions, fusing Companies House formations, Insolvency Service insolvencies and ONS survival and population data into one quarterly barometer.",
  "/research/uk-late-payment-index":
    "How long the UK's largest buyers take to pay their suppliers, as an aggregate half-yearly trend built from statutory Payment Practices Reporting filings, with no company named or ranked.",
  "/research/uk-sector-insolvency-league":
    "Every SIC section ranked by trailing 12-month company insolvencies in England and Wales, from Insolvency Service open data.",
  "/research/uk-business-density-map":
    "Every UK region and nation ranked by businesses per 10,000 resident adults, from the official Business Population Estimates.",
  "/contact":
    "Tell us where the business sits today and we will come back with a short note on what the engagement would look like and what it would cost.",
  "/newsletter":
    "One short email a week on UK tax, pay, structure and exit for directors and owners, plain text, one idea per issue, unsubscribe in one click.",
  "/about":
    "Who we are and how we work with UK business owners across the four trading structures, with the depth of a specialist firm and the responsiveness of an in-house team.",
};

/** The summary for an internal route, or undefined if it has no authored one. */
export function pageSummary(href: string): string | undefined {
  return PAGE_SUMMARIES[href.split(/[?#]/)[0]];
}
