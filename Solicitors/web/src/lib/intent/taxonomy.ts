/**
 * Canonical intent taxonomy for Accounts for Lawyers (Solicitors).
 *
 * Single source of truth mapping a page (by its blog category or calculator)
 * to a "topic" that carries the personalisation payload (matched calculator,
 * intent-matched CTA copy, lead-magnet resource).
 *
 * Extensibility (deliberate):
 *  - A new blog post in an EXISTING category needs nothing: the topic is
 *    derived from the URL category slug.
 *  - A brand-new topic = one entry in TOPICS.
 *  - A new calculator = one line in CALC_SLUG_TO_TOPIC.
 *
 * Blog category slugs are the output of slugifyCategory() in lib/blog.ts:
 *   "SRA Compliance & Trust Accounting"  -> "sra-compliance-trust-accounting"
 *   "Sole Practitioner Tax"              -> "sole-practitioner-tax"
 *   "Partnership & LLP Accounting"       -> "partnership-llp-accounting"
 *   "Practice Sale & Succession"         -> "practice-sale-succession"
 *   "Practice Finance & Cash Flow"       -> "practice-finance-cash-flow"
 *   "VAT & Compliance"                   -> "vat-compliance"
 *   "Structure & Incorporation"          -> "structure-incorporation"
 *   "SRA Accounts Rules"                 -> "sra-accounts-rules"
 *   "Compliance & Risk (COLP / COFA)"    -> "compliance-risk-colp-cofa"
 *   "Fee-Earner Tax & Compensation"      -> "fee-earner-tax-compensation"
 *   "Firm Acquisition & Merger"          -> "firm-acquisition-merger"
 *   "Locum Solicitor Tax"                -> "locum-solicitor-tax"
 *   "Conveyancing Compliance"            -> "conveyancing-compliance"
 *   "Practice Accounting"                -> "practice-accounting"
 *
 * NOTE: the static hub page for Practice Sale & Succession lives at
 * /blog/practice-succession-sale (directory slug differs from the category
 * slug that posts use). Both are mapped to the succession-sale topic.
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "sra-compliance"
  | "sole-practitioner"
  | "partnership-llp"
  | "succession-sale"
  | "practice-finance"
  | "vat"
  | "incorporation";

export type Topic = {
  key: TopicKey;
  label: string;
  /** slugifyCategory() outputs that resolve to this topic. */
  blogCategorySlugs: string[];
  /** the calculator to recommend for this topic (slug), or null. */
  primaryCalculator: string | null;
  /** short, intent-matched CTA used by the personalisation layer. */
  ctaCopy: string;
  /** lead-magnet resource id (Phase 4). null until the asset actually exists. */
  resourceId: string | null;
};

export const TOPICS: Topic[] = [
  {
    key: "sra-compliance",
    label: "SRA compliance and client account accounting",
    blogCategorySlugs: [
      "sra-compliance-trust-accounting",
      "sra-accounts-rules",
      "compliance-risk-colp-cofa",
      "conveyancing-compliance",
    ],
    primaryCalculator: "sra-client-account-reserve",
    ctaCopy: "Check your SRA client account reserve",
    resourceId: "sra-compliance",
  },
  {
    key: "sole-practitioner",
    label: "Sole practitioner tax and take-home",
    blogCategorySlugs: [
      "sole-practitioner-tax",
      "locum-solicitor-tax",
      "fee-earner-tax-compensation",
    ],
    primaryCalculator: "solicitor-take-home",
    ctaCopy: "Estimate your take-home as a solicitor",
    resourceId: "sole-practitioner",
  },
  {
    key: "partnership-llp",
    label: "Partnership and LLP accounting",
    blogCategorySlugs: [
      "partnership-llp-accounting",
      "practice-accounting",
    ],
    primaryCalculator: "llp-profit-share-allocation",
    ctaCopy: "Calculate your LLP profit share",
    resourceId: "partnership-llp",
  },
  {
    key: "succession-sale",
    label: "Practice succession and sale",
    blogCategorySlugs: [
      "practice-sale-succession",
      "practice-succession-sale",
      "firm-acquisition-merger",
    ],
    primaryCalculator: "law-firm-valuation",
    ctaCopy: "Value your law firm",
    resourceId: "succession-sale",
  },
  {
    key: "practice-finance",
    label: "Practice finance and cash flow",
    blogCategorySlugs: [
      "practice-finance-cash-flow",
    ],
    primaryCalculator: "indemnity-premium-estimator",
    ctaCopy: "Estimate your indemnity premium",
    resourceId: null,
  },
  {
    key: "vat",
    label: "VAT and regulatory compliance",
    blogCategorySlugs: [
      "vat-compliance",
    ],
    primaryCalculator: null,
    ctaCopy: "Get your VAT position checked by a specialist",
    resourceId: null,
  },
  {
    key: "incorporation",
    label: "Firm structure and incorporation",
    blogCategorySlugs: [
      "structure-incorporation",
    ],
    primaryCalculator: "solicitor-take-home",
    ctaCopy: "Compare your take-home under different structures",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. Add one line when a calculator is added to
 * registry.ts. Unmapped calculators resolve to null and fall back to the
 * generic experience.
 *
 * All slugs from registry.ts are mapped:
 *   solicitor-take-home          -> sole-practitioner
 *   fa-2014-salaried-member      -> partnership-llp
 *   llp-profit-share-allocation  -> partnership-llp
 *   law-firm-valuation           -> succession-sale
 *   sra-client-account-reserve   -> sra-compliance
 *   indemnity-premium-estimator  -> practice-finance
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "solicitor-take-home": "sole-practitioner",
  "fa-2014-salaried-member": "partnership-llp",
  "llp-profit-share-allocation": "partnership-llp",
  "law-firm-valuation": "succession-sale",
  "sra-client-account-reserve": "sra-compliance",
  "indemnity-premium-estimator": "practice-finance",
};

const BLOG_SLUG_TO_TOPIC: Record<string, TopicKey> = {};
const BY_KEY: Record<string, Topic> = {};
for (const t of TOPICS) {
  BY_KEY[t.key] = t;
  for (const s of t.blogCategorySlugs) BLOG_SLUG_TO_TOPIC[s] = t.key;
}

export function getTopic(key: string | null | undefined): Topic | null {
  return key ? BY_KEY[key] ?? null : null;
}
export function topicForBlogSlug(slug: string): TopicKey | null {
  return BLOG_SLUG_TO_TOPIC[slug] ?? null;
}
export function topicForCalcSlug(slug: string): TopicKey | null {
  return CALC_SLUG_TO_TOPIC[slug] ?? null;
}
