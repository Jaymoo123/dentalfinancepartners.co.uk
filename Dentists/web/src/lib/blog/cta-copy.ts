/**
 * Per-category enquiry copy for blog articles and category hubs.
 *
 * Keyed on the category SLUG produced by `slugifyCategory`, never the raw
 * frontmatter label: six of the twelve labels carry a case or "&"/"and"
 * spelling split across the 223 posts, and every variant slugifies to the same
 * hub. Keying on the label would leave roughly half the corpus falling through
 * to the generic string.
 *
 * ONE binding. The article closing panel heading, its body, its submit label
 * and the sidebar card all read this object, so the card can never advertise
 * something different from the form it jumps to. Hubs (WP3) read the same map.
 *
 * Copy rules this file is bound by (docs/dentists/DESIGN_DELTA.md §4):
 * no pricing for our own services, no turnaround promises, no client counts or
 * aggregate performance claims, no em-dashes, British English.
 */
export type BlogCtaCopy = { heading: string; body: string; button: string };

export const CTA_BY_CATEGORY: Record<string, BlogCtaCopy> = {
  "practice-finance": {
    heading: "Planning a borrowing or cash-flow decision?",
    body: "Practice borrowing, equipment finance and drawings all move your tax position at the same time. Get a dental accountant to read the finance and the tax together before you commit.",
    button: "Book a practice finance review",
  },
  "associate-tax": {
    heading: "Want your associate tax position checked?",
    body: "Self-employed associate income, expenses, pension input and the incorporation question rarely sit neatly. Talk it through with an accountant who works with associates every week.",
    button: "Book an associate tax review",
  },
  "practice-accounting": {
    heading: "Want a second pair of eyes on your practice accounts?",
    body: "Year-end accounts, payroll, bookkeeping and the tax return are one system, not four. Get a dental accountant to check how yours fit together and where they are leaking.",
    button: "Book a practice accounts review",
  },
  "capital-allowances-and-equipment": {
    heading: "Buying or refitting surgery equipment?",
    body: "Chairs, imaging, surgery fit-outs and integral features are claimed under different rules, and the wrong route can cost you the relief entirely. Get the claim checked before it is filed.",
    button: "Book a capital allowances review",
  },
  "buying-a-practice": {
    heading: "Buying a dental practice?",
    body: "Structure, goodwill, the NHS contract and the funding package all have to work together, and the decisions are hard to unwind afterwards. Get a specialist to read the deal with you.",
    button: "Book a practice purchase review",
  },
  "nhs-contracts": {
    heading: "Questions about your NHS contract position?",
    body: "UDA delivery, clawback, contract variations and how they land in your accounts are a specialist corner. Talk to a dental accountant who reads these contracts regularly.",
    button: "Book an NHS contract review",
  },
  "goodwill-and-practice-sale": {
    heading: "Thinking about selling your practice?",
    body: "Goodwill, capital gains, reliefs and the shape of the sale decide what you actually keep. Get the tax position modelled before you agree terms, not after.",
    button: "Book a practice sale review",
  },
  "vat-and-compliance": {
    heading: "Unsure where you stand on VAT or compliance?",
    body: "Dental supplies, mixed income, partial exemption and registration thresholds catch out practices that are otherwise well run. Get your position confirmed by a specialist.",
    button: "Book a VAT and compliance check",
  },
  "nhs-pension": {
    heading: "Want your NHS pension position checked?",
    body: "Annual allowance, tapering, pensionable pay and the interaction with private income are where dentists lose money quietly. Get the numbers run by a dental accountant.",
    button: "Book an NHS pension review",
  },
  "locum-tax": {
    heading: "Working as a locum and unsure about the tax?",
    body: "Locum income, expenses, employment status and whether to trade through a company all move together. Talk it through with an accountant who acts for locum dentists.",
    button: "Book a locum tax review",
  },
  general: {
    heading: "Want to talk to a dental accountant?",
    body: "Whatever you are weighing up, from your accounts to your pension to your next move, get it read by someone who works with dentists all day. No obligation.",
    button: "Book a consultation",
  },
  "specialist-services": {
    heading: "Have a specialist dental finance question?",
    body: "Orthodontics, implants, squat practices and group structures each carry their own tax treatment. Get a specialist who has handled your situation before.",
    button: "Book a specialist call",
  },
};

/** The map, with the site's generic copy as the fallback for an unmapped slug. */
export function ctaCopyForCategory(
  categorySlug: string,
  fallback: BlogCtaCopy,
): BlogCtaCopy {
  return CTA_BY_CATEGORY[categorySlug] ?? fallback;
}
