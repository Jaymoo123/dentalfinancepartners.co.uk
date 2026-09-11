/**
 * Per-category article CTA copy for the blog.
 *
 * Keyed on the category SLUG (the output of `slugifyCategory`), never the raw
 * frontmatter label: "VAT and MTD" and "Software and Tools" both carry "and"
 * vs "&" spelling variants in authored frontmatter and every variant slugifies
 * to the same hub, so keying on the label silently misses.
 *
 * One map, two consumers: the article's `#enquiry-form` section and the
 * sidebar card that points at it (and, from phase 2 onward, the category hub's
 * closing panel). They read the same entry so the shoutout and the form it
 * jumps to can never drift.
 *
 * Copy rules applied (PROPERTY_STANDARD_ROLLOUT §I, house_positions §13):
 * no turnaround promise (the pool model discloses up to six independent
 * firms), no outcome or saving figure, no "no hard sell" style claim that the
 * site cannot stand behind, no em dashes.
 */
export type BlogCtaCopy = { heading: string; body: string; button: string };

export const CTA_BY_CATEGORY: Record<string, BlogCtaCopy> = {
  "cis-basics": {
    heading: "Want your CIS position checked?",
    body: "Tell us how you are paid and who deducts from you. A specialist CIS accountant will look at your registration, your deduction rate and your return position, and tell you what is actually required of you.",
    button: "Request a CIS review",
  },
  "cis-compliance": {
    heading: "Not sure your CIS filings are compliant?",
    body: "Monthly CIS300 returns, verification and deduction statements all carry their own deadlines and their own penalties. Send us your position and a specialist will tell you where the exposure is.",
    button: "Request a compliance check",
  },
  "cis-refunds": {
    heading: "Think you have overpaid under CIS?",
    body: "Deductions taken at 20% or 30% before expenses routinely exceed the tax actually due. A specialist will work out your real position from your statements and tell you whether a repayment is due.",
    button: "Request a refund check",
  },
  "cis-advanced": {
    heading: "Have a harder CIS question?",
    body: "Gross payment status, mixed contracts, deemed contractors, offset against PAYE. Send us the specifics and you will hear from a specialist who has handled the same situation before.",
    button: "Request a specialist review",
  },
  "vat-and-mtd": {
    heading: "Want your VAT and MTD setup checked?",
    body: "The domestic reverse charge and Making Tax Digital change how construction invoices and records have to work. A specialist will check your invoicing, your records and your software against what HMRC requires.",
    button: "Request a VAT and MTD check",
  },
  expenses: {
    heading: "Not sure what you can claim?",
    body: "Tools, travel, protective clothing, training, use of home. What is allowable depends on how you trade and how you are paid. A specialist will go through your costs and tell you which ones stand up.",
    button: "Request an expenses review",
  },
  "limited-company": {
    heading: "Weighing up a limited company?",
    body: "Incorporating changes your CIS treatment, your payroll obligations and how profit reaches you. A specialist will model your position both ways before you commit to either.",
    button: "Request a structure review",
  },
  "software-and-tools": {
    heading: "Want help getting your records straight?",
    body: "Bookkeeping, CIS statements and MTD-ready records are easier to fix before a deadline than after one. A specialist will look at how you record work now and what would actually make it simpler.",
    button: "Request a records review",
  },
};

/**
 * Fallback for a category that has no entry. Kept deliberately generic; the
 * guard in `src/tests/design/blog-cta-map.test.ts` asserts every live category
 * slug resolves to a real entry, so this should never render.
 */
export const CTA_FALLBACK: BlogCtaCopy = {
  heading: "Want your position checked by a CIS specialist?",
  body: "Tell us how you are paid and what you are trying to sort out. A specialist construction accountant will look at it and tell you where you stand.",
  button: "Request a review",
};

export function ctaForCategory(categorySlug: string): BlogCtaCopy {
  return CTA_BY_CATEGORY[categorySlug] ?? CTA_FALLBACK;
}
