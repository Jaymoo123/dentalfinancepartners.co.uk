/**
 * Per-category blog CTA copy, keyed on the slug `slugifyCategory()` produces
 * (see `src/lib/blog.ts`), the same key the article renderer and the category
 * hub both resolve with, so a hub never advertises something different from
 * the articles under it. Shape ported from contractors-ir35's
 * `CTA_BY_CATEGORY` per the phase 0 parity brief section 4 (2026-09-28).
 *
 * The eight slugs below come from the frontmatter of all 32 posts
 * (`grep -h "^category:" web/content/blog/*.md`), not from niche.config.json.
 *
 * 2026-09-28 Opus read: the bodies stand, they already speak in the firm voice
 * and name the specific rule per category. The button labels did not: every one
 * of them read "our" from the visitor's side ("Check our VAT position") while
 * the page's own "we" is the firm, so the same word meant two different parties
 * on the same panel. Relabelled as plain requests. `BLOG_CTA` (blog-cta.ts)
 * stays as the fallback for the all-posts /blog index, which has no single
 * category.
 */
export type BlogCtaCopy = { heading: string; body: string; button: string };

export const CTA_BY_CATEGORY: Record<string, BlogCtaCopy> = {
  "trustee-compliance": {
    heading: "Want your trustee compliance position checked?",
    body: "Reserves policy, restricted funds, related-party disclosure and the annual return all sit with the trustees, and it is easy to miss one while the others are in hand. We go through your own accounts and filings and tell you what still needs doing.",
    button: "Request a compliance check",
  },
  "cics-and-social-enterprises": {
    heading: "Want your CIC or social enterprise structure checked?",
    body: "The asset lock, the dividend cap and the community interest report each work differently to a standard company or a charity, and getting one wrong can hold up your filing. We work through your own figures and tell you what applies.",
    button: "Request a CIC review",
  },
  "independent-examination-and-audit": {
    heading: "Not sure whether you need an examination or an audit?",
    body: "The right level of scrutiny depends on your income, your gross assets and your governing document, not on what you had last year. We look at your own numbers and tell you which applies, and prepare the accounts with that examination in mind.",
    button: "Confirm which one applies",
  },
  "gift-aid": {
    heading: "Want your Gift Aid claim checked?",
    body: "A missed declaration or an ineligible donation can cost a claim its exemption, and the rules for GASDS run separately from ordinary Gift Aid. We go through your donor records and tell you what you can safely claim.",
    button: "Request a Gift Aid check",
  },
  "charity-vat": {
    heading: "Want your charity VAT position checked?",
    body: "Charity VAT reliefs apply to specific supplies, not to the charity as a whole, and partial exemption catches most organisations that mix trading and grant income. We look at what you actually sell and buy and tell you where you stand.",
    button: "Request a VAT review",
  },
  "charity-finance": {
    heading: "Want a second look at your charity's finances?",
    body: "Cash flow, reserves and restricted funds all read differently once they sit against your own year end rather than a general rule. We go through your own figures and set out what they mean for your organisation.",
    button: "Request a finance review",
  },
  "charity-accounts-and-sorp": {
    heading: "Want your accounts checked against the current SORP?",
    body: "The Charities SORP sets out how the accounts must be presented, and the edition that applies follows your accounting period, not the date you prepare them. We prepare the accounts to the edition that applies to you.",
    button: "Request a SORP check",
  },
  "charity-governance": {
    heading: "Want a governance question answered against your own charity?",
    body: "Trustee powers, delegation and what needs Charity Commission authority all turn on your own governing document. We read it against what you are proposing and tell you where you stand.",
    button: "Ask a governance question",
  },
};
