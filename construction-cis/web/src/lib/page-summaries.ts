/**
 * The one-line summary each non-article page introduces itself with.
 *
 * WHY THIS EXISTS. A related-reading card pointing at a blog post shows the
 * post's opening sentence, so the reader knows what they are clicking into. A
 * card pointing at /cis-refund or /calculators would otherwise show the link
 * label and nothing else, which is a worse card for a more important
 * destination. Per `docs/property/DESIGN_SYSTEM.md` section 3.
 *
 * WHY IT IS A REGISTRY RATHER THAN COPY IN THE CARD. Typing the sentence into
 * whichever link list renders the card makes a second copy of the page's own
 * standfirst that nothing keeps in sync. The sentence lives here once.
 *
 * HOW DRIFT IS PREVENTED. Every sentence below is the route's own
 * `metadata.description`, and `src/tests/design/page-summaries.test.ts`
 * asserts that byte-for-byte against the page source. So this file cannot
 * quietly describe a page that has since been rewritten: change the page's
 * description and the guard fails until this registry follows.
 *
 * WHAT DOES NOT BELONG HERE. Routes whose summary is readable from live data
 * are resolved at render and must not be duplicated in: `/blog/<cat>/<slug>`
 * uses `firstSentence` over the post body, `/glossary/<term>` and
 * `/locations/<city>` carry their own generated summary field. Add a route
 * only when the standfirst is authored inline in the page.
 *
 * VOICE. FT-plain, British English, no em dashes, no client counts.
 */
export const PAGE_SUMMARIES: Record<string, string> = {
  "/":
    "Specialist CIS accountants for UK construction subcontractors and contractors. CIS tax refunds, gross payment status, sole trader and limited company accounting. The average CIS subcontractor overpays around £2,000 a year.",
  "/services":
    "CIS accounting for UK construction subcontractors and contractors: CIS refunds, GPS applications, sole trader SA, limited company EPS reclaim and CIS300 returns.",
  "/cis-refund":
    "CIS tax refund service for UK construction subcontractors. The average CIS subcontractor is owed around £2,000 back. We calculate, claim and handle every step.",
  "/gross-payment-status":
    "CIS Gross Payment Status application and maintenance service. GPS eliminates the 20% deduction entirely. We manage the application, the three qualifying tests and ongoing April 2026 compliance.",
  "/for":
    "Specialist CIS accounting for every construction trade. Plumbers, electricians, joiners, groundworkers, roofers, builders, gas engineers, painters, scaffolders and civil engineers.",
  "/calculators":
    "Free CIS calculators for UK construction subcontractors and contractors. Estimate your CIS refund, take-home pay, gross payment status eligibility, and more.",
  "/blog":
    "Practical CIS and construction tax guides. CIS deductions, refunds, gross payment status, VAT reverse charge, expenses and limited company accounting. Written by specialist CIS accountants.",
  "/glossary":
    "Plain-English definitions of CIS, tax and construction accounting terms. Deduction rates, gross payment status, self assessment, VAT and more. Verified for 2025/26.",
  "/locations":
    "CIS accountants for construction subcontractors and contractors across the UK. Find your local CIS tax expert in London, Manchester, Birmingham and beyond.",
  "/research":
    "Original, sourced data on UK construction company formation and insolvency trends, built from official open data. Free to read and cite.",
  "/about":
    "Specialist CIS accountants for UK construction trades. We only work with CIS subcontractors and contractors, so we understand the rules that a generalist accountant will not.",
  "/contact":
    "Book a free call with a specialist CIS accountant. CIS refunds, gross payment status and construction accounting. We respond within one working day.",
  "/cis-invoice-template":
    "Free CIS subcontractor invoice template for UK construction. Labour and materials split, CIS deduction line, plus standard VAT, domestic reverse charge and non-VAT versions. Excel and PDF.",
  "/cis-payment-deduction-statement-template":
    "Download a free CIS payment and deduction statement template with every field HMRC requires under Regulation 4. Editable Excel version with built-in formulas, plus a printable PDF.",
};

/** Resolve a href to its summary, ignoring any query string or fragment. */
export function pageSummary(href: string): string | undefined {
  return PAGE_SUMMARIES[href.split(/[?#]/)[0]];
}
