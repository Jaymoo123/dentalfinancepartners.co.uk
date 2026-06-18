/**
 * Canonical intent taxonomy for Trade Tax Specialists (construction-cis).
 *
 * The single source of truth mapping a page (by its blog category or
 * calculator) to a "topic" that carries the personalisation payload (matched
 * calculator, intent-matched CTA copy, lead-magnet resource).
 *
 * Extensibility (deliberate):
 *  - A new blog post in an EXISTING category needs nothing: the topic is
 *    derived from the URL category slug.
 *  - A brand-new topic = one entry in TOPICS.
 *  - A new calculator = one line in CALC_SLUG_TO_TOPIC.
 *
 * Blog category slugs are the output of slugifyCategory() in lib/blog.ts
 * (lowercase, "()" stripped, "&" -> "and", spaces -> "-").
 * Categories from niche.config.json:
 *   "CIS Basics"        -> "cis-basics"
 *   "CIS Compliance"    -> "cis-compliance"
 *   "CIS Refunds"       -> "cis-refunds"
 *   "CIS Advanced"      -> "cis-advanced"
 *   "VAT and MTD"       -> "vat-and-mtd"
 *   "Expenses"          -> "expenses"
 *   "Limited Company"   -> "limited-company"
 *   "Software and Tools"-> "software-and-tools"
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "cis-refund"
  | "gross-payment-status"
  | "cis-deductions"
  | "self-assessment"
  | "limited-company"
  | "vat-reverse-charge";

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
    key: "cis-refund",
    label: "CIS tax refunds",
    blogCategorySlugs: ["cis-refunds", "cis-basics"],
    primaryCalculator: "cis-refund-estimator",
    ctaCopy: "Check what CIS refund you're owed",
    resourceId: null,
  },
  {
    key: "gross-payment-status",
    label: "Gross payment status",
    blogCategorySlugs: ["cis-compliance", "cis-advanced"],
    primaryCalculator: "cis-gps-eligibility-checker",
    ctaCopy: "See if you qualify for gross payment status",
    resourceId: null,
  },
  {
    key: "cis-deductions",
    label: "CIS deductions",
    blogCategorySlugs: ["expenses"],
    primaryCalculator: "cis-deduction-calculator",
    ctaCopy: "Check your CIS deductions",
    resourceId: null,
  },
  {
    key: "self-assessment",
    label: "Self Assessment for CIS subcontractors",
    blogCategorySlugs: [],
    primaryCalculator: "cis-self-assessment-calculator",
    ctaCopy: "Estimate your Self Assessment bill",
    resourceId: null,
  },
  {
    key: "limited-company",
    label: "Limited company CIS accounting",
    blogCategorySlugs: ["limited-company"],
    primaryCalculator: "cis-vs-paye-comparison",
    ctaCopy: "Compare CIS take-home: sole trader vs limited company",
    resourceId: null,
  },
  {
    key: "vat-reverse-charge",
    label: "VAT domestic reverse charge",
    blogCategorySlugs: ["vat-and-mtd", "software-and-tools"],
    primaryCalculator: null,
    ctaCopy: "Get the VAT reverse charge right",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 *
 * All 8 slugs from registry.ts are mapped:
 *   cis-deduction-calculator     -> cis-deductions
 *   cis-gps-eligibility-checker  -> gross-payment-status
 *   cis-refund-estimator         -> cis-refund
 *   cis-self-assessment-calculator -> self-assessment
 *   cis-take-home-calculator     -> limited-company (closest: income comparison)
 *   cis-invoice-splitter         -> cis-deductions (closest: labour/materials split)
 *   cis-vs-paye-comparison       -> limited-company
 *   cis-back-years-calculator    -> cis-refund (back-year refunds)
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "cis-refund-estimator": "cis-refund",
  "cis-back-years-calculator": "cis-refund",
  "cis-deduction-calculator": "cis-deductions",
  "cis-invoice-splitter": "cis-deductions",
  "cis-gps-eligibility-checker": "gross-payment-status",
  "cis-self-assessment-calculator": "self-assessment",
  "cis-take-home-calculator": "limited-company",
  "cis-vs-paye-comparison": "limited-company",
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
