/**
 * Canonical intent taxonomy for Hospitality Tax.
 *
 * Single source of truth mapping a route (blog category, calculator, service,
 * audience hub, research page) to a "topic" that carries the personalisation
 * payload used by the floating help widget.
 *
 * Extensibility, deliberate:
 *  - A new blog post in an EXISTING category needs nothing: the topic falls out
 *    of the URL category slug.
 *  - A brand-new topic = one entry in TOPICS.
 *  - A new calculator / service / hub / research page = one line in the
 *    matching lookup below.
 *
 * Every slug in this file was derived from the repo, not from memory:
 *   blog categories  = content/blog/*.md `category:` through slugifyCategory()
 *                      in lib/blog.ts (lowercase, "(),"" stripped, "&" -> "and",
 *                      spaces -> "-"). The eight published categories are
 *                      "Business Rates", "Capital Allowances",
 *                      "Hospitality Accounts", "Hospitality VAT",
 *                      "Licensed Trade", "Making Tax Digital",
 *                      "Payroll and Employment", "Tips and Tronc".
 *   calculator slugs = lib/calculators/tools/*.ts `slug:` (3 tools).
 *   service slugs    = data/hospitality-services.ts `slug:` (5).
 *   audience slugs   = data/hospitality-hubs.ts `slug:` (6), routed at /for/<slug>.
 *   research slugs   = app/research/<slug>/page.tsx (3).
 *
 * Hub mapping rule: each hub takes the topic of its OWN first-listed challenge
 * in data/hospitality-hubs.ts, not a guess about the trade. That is why five of
 * the six hubs resolve to VAT (their first challenge is a rate question) and
 * pubs resolve to licensed trade (wet and dry GP).
 *
 * String-only (no heavy imports) so it is safe in the global client bundle via
 * deriveTopic().
 */

export type TopicKey =
  | "tronc"
  | "vat"
  | "staff-costs"
  | "business-rates"
  | "licensed-trade"
  | "compliance";

export type Topic = {
  key: TopicKey;
  label: string;
  /** slugifyCategory() outputs that resolve to this topic. */
  blogCategorySlugs: string[];
  /** the calculator to recommend for this topic (slug), or null. */
  primaryCalculator: string | null;
  /** short, intent-matched CTA used by the personalisation layer. */
  ctaCopy: string;
  /** lead-magnet resource id. null until such an asset actually exists. */
  resourceId: string | null;
};

export const TOPICS: Topic[] = [
  {
    key: "tronc",
    label: "Tronc and tips",
    blogCategorySlugs: ["tips-and-tronc"],
    primaryCalculator: "tronc-tips-paye-nic-calculator",
    ctaCopy: "Run your tronc through the PAYE and NIC tool",
    resourceId: null,
  },
  {
    key: "vat",
    label: "Food and drink VAT",
    blogCategorySlugs: ["hospitality-vat"],
    primaryCalculator: "food-drink-vat-rate-checker",
    ctaCopy: "Check a menu line against the VAT rules",
    resourceId: null,
  },
  {
    key: "staff-costs",
    label: "Staff costs and payroll",
    blogCategorySlugs: ["payroll-and-employment"],
    primaryCalculator: "staff-cost-rota-margin-calculator",
    ctaCopy: "Work out staff cost against your covers",
    resourceId: null,
  },
  {
    key: "business-rates",
    label: "Business rates and property costs",
    blogCategorySlugs: ["business-rates", "capital-allowances"],
    primaryCalculator: null,
    ctaCopy: "See which rates reliefs apply to your site",
    resourceId: null,
  },
  {
    key: "licensed-trade",
    label: "Licensed trade",
    blogCategorySlugs: ["licensed-trade"],
    primaryCalculator: null,
    ctaCopy: "Get your wet and dry margins looked at",
    resourceId: null,
  },
  {
    key: "compliance",
    label: "Accounts, deadlines and compliance",
    blogCategorySlugs: ["hospitality-accounts", "making-tax-digital"],
    primaryCalculator: null,
    ctaCopy: "Check your filing deadlines are covered",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. All 3 slugs in lib/calculators/registry.ts are
 * mapped. Unmapped calculators resolve to null and fall back to generic.
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "tronc-tips-paye-nic-calculator": "tronc",
  "food-drink-vat-rate-checker": "vat",
  "staff-cost-rota-margin-calculator": "staff-costs",
};

/** Service slug (data/hospitality-services.ts) -> topic. All 5 mapped. */
export const SERVICE_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "tronc-scheme-setup": "tronc",
  "hospitality-payroll": "staff-costs",
  "hospitality-vat": "vat",
  "toms-advice": "vat",
  "business-rates-relief": "business-rates",
};

/**
 * Audience hub slug (data/hospitality-hubs.ts, routed at /for/<slug>) -> topic.
 * Each hub takes the topic of its own first-listed challenge.
 */
export const HUB_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  restaurants: "vat",
  "pubs-and-bars": "licensed-trade",
  takeaways: "vat",
  "hotels-and-guesthouses": "vat",
  "cafes-and-coffee-shops": "vat",
  "caterers-and-street-food": "vat",
};

/**
 * Research page slug (app/research/<slug>) -> topic. All 3 mapped.
 * These are operating-environment datasets rather than relief pages, so they
 * carry the running-the-business topic rather than a relief the visitor has not
 * asked about.
 */
export const RESEARCH_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "hospitality-openings-closures-index": "compliance",
  "uk-hospitality-insolvency-index": "compliance",
  "uk-hospitality-food-hygiene-map": "compliance",
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
export function topicForServiceSlug(slug: string): TopicKey | null {
  return SERVICE_SLUG_TO_TOPIC[slug] ?? null;
}
export function topicForHubSlug(slug: string): TopicKey | null {
  return HUB_SLUG_TO_TOPIC[slug] ?? null;
}
export function topicForResearchSlug(slug: string): TopicKey | null {
  return RESEARCH_SLUG_TO_TOPIC[slug] ?? null;
}
