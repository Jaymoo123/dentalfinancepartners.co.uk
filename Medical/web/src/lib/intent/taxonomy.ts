/**
 * Canonical intent taxonomy for Medical Accountants UK.
 *
 * Single source of truth mapping a page (by its blog category or calculator)
 * to a "topic" that carries the personalisation payload (matched calculator,
 * intent-matched CTA copy, lead-magnet resource).
 *
 * The 8 real blog categories (from content/ frontmatter, 73 posts) all resolve
 * to one of 5 topics. The site uses FLAT /blog/[slug] routing, so the category
 * is resolved server-side from post.category and passed as a prop -- it is
 * NEVER derived from the URL path on blog posts.
 *
 * Category slug -> topic mapping:
 *
 *  gp-practice-management             -> gp-practice  (20 posts)
 *  gp-accountant-services             -> gp-practice  (16 posts)
 *  gp-tax-and-accounts                -> gp-tax       (16 posts)
 *  medical-expenses                   -> gp-tax       (1 post)
 *  nhs-pension-planning               -> nhs-pension  (8 posts)
 *  locum-tax                          -> locum        (6 posts)
 *  incorporation-and-company-structures -> incorporation-private  (4 posts)
 *  private-practice                   -> incorporation-private  (2 posts)
 *
 * Config "Consultant Tax" category: 0 posts -- DELIBERATELY ABSENT from
 * taxonomy (no content to drive personalisation from). Not a bug.
 *
 * Tool slug -> topic mapping (3 tools from registry.ts):
 *  nhs-pension-annual-allowance -> nhs-pension
 *  locum-tax-calculator         -> locum
 *  private-practice-incorporation -> incorporation-private
 *
 * /for-* routes:
 *  for-gps               -> gp-practice  (broad GP practice focus)
 *  for-consultants       -> gp-tax        (consultants face complex tax, no
 *                                          specific tool; closest topic is
 *                                          gp-tax which surfaces the specialist
 *                                          fallback since gp-tax has a calculator)
 *  for-locum-doctors     -> locum
 *  for-junior-doctors    -> gp-tax        (junior doctors face income tax +
 *                                          NHS pension questions; gp-tax is
 *                                          the broadest tax topic)
 *
 * /nhs-pension pillar   -> nhs-pension
 *
 * Static hub paths -> their topic:
 *  /blog/gp-practice-management         -> gp-practice
 *  /blog/gp-accountant-services         -> gp-practice
 *  /blog/gp-tax-and-accounts            -> gp-tax
 *  /blog/medical-expenses               -> gp-tax
 *  /blog/nhs-pension-planning           -> nhs-pension
 *  /blog/locum-tax                      -> locum
 *  /blog/incorporation-and-company-structures -> incorporation-private
 *  /blog/private-practice               -> incorporation-private
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "gp-practice"
  | "gp-tax"
  | "nhs-pension"
  | "locum"
  | "incorporation-private";

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
    key: "gp-practice",
    label: "GP practice accounting and services",
    blogCategorySlugs: ["gp-practice-management", "gp-accountant-services"],
    primaryCalculator: null,
    ctaCopy: "Speak to a specialist medical accountant about your practice",
    resourceId: null,
  },
  {
    key: "gp-tax",
    label: "GP and doctor tax and accounts",
    blogCategorySlugs: ["gp-tax-and-accounts", "medical-expenses"],
    primaryCalculator: "locum-tax-calculator",
    ctaCopy: "Estimate your tax as a salaried or self-employed doctor",
    resourceId: "locum",
  },
  {
    key: "nhs-pension",
    label: "NHS pension and annual allowance",
    blogCategorySlugs: ["nhs-pension-planning"],
    primaryCalculator: "nhs-pension-annual-allowance",
    ctaCopy: "Check your NHS pension annual allowance and taper",
    resourceId: "nhs-pension",
  },
  {
    key: "locum",
    label: "Locum doctor tax",
    blogCategorySlugs: ["locum-tax"],
    primaryCalculator: "locum-tax-calculator",
    ctaCopy: "Calculate your take-home pay as a locum doctor",
    resourceId: "locum",
  },
  {
    key: "incorporation-private",
    label: "Incorporation and private practice",
    blogCategorySlugs: [
      "incorporation-and-company-structures",
      "private-practice",
    ],
    primaryCalculator: "private-practice-incorporation",
    ctaCopy: "Model your tax saving from incorporating your private practice",
    resourceId: "incorporation-private",
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 *
 * All 3 slugs from registry.ts are mapped:
 *   nhs-pension-annual-allowance   -> nhs-pension
 *   locum-tax-calculator           -> locum
 *   private-practice-incorporation -> incorporation-private
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "nhs-pension-annual-allowance": "nhs-pension",
  "locum-tax-calculator": "locum",
  "private-practice-incorporation": "incorporation-private",
};

const BLOG_SLUG_TO_TOPIC: Record<string, TopicKey> = {};
const BY_KEY: Record<string, Topic> = {};
for (const t of TOPICS) {
  BY_KEY[t.key] = t;
  for (const s of t.blogCategorySlugs) BLOG_SLUG_TO_TOPIC[s] = t.key;
}

export function getTopic(key: string | null | undefined): Topic | null {
  return key ? (BY_KEY[key] ?? null) : null;
}
export function topicForBlogSlug(slug: string): TopicKey | null {
  return BLOG_SLUG_TO_TOPIC[slug] ?? null;
}
export function topicForCalcSlug(slug: string): TopicKey | null {
  return CALC_SLUG_TO_TOPIC[slug] ?? null;
}
