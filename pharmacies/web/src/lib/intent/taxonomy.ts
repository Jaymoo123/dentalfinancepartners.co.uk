/**
 * Canonical intent taxonomy for Pharmacy Tax (pharmacies).
 *
 * Single source of truth mapping a route (blog category, calculator, service,
 * audience hub, research page) to a "topic" that carries the personalisation
 * payload the capture surfaces read.
 *
 * Extensibility, deliberate:
 *  - A new blog post in an EXISTING category needs nothing: the topic falls out
 *    of the URL category slug.
 *  - A brand-new topic = one entry in TOPICS.
 *  - A new calculator / service / hub / research page = one line in the
 *    matching lookup below.
 *
 * Every slug here was derived from this repo, not from memory and NOT from
 * niche.config.json (`content_strategy.categories` lists 7 names, two of which
 * have zero posts):
 *   blog categories  = content/blog/*.md `category:` through slugifyCategory()
 *                      in lib/blog.ts (lowercase, "(),"" stripped, "&" -> "and",
 *                      spaces -> "-"). The five PUBLISHED categories are
 *                      "Buying a Pharmacy" (7 posts), "NHS Contract and Income"
 *                      (7), "Selling a Pharmacy" (3), "Locum Pharmacists" (3),
 *                      "VAT and Retail Schemes" (2).
 *   calculator slugs = lib/calculators/tools/*.ts `slug:` (3 tools).
 *   service slugs    = data/pharmacies-services.ts `slug:` (8).
 *   audience slugs   = data/pharmacies-hubs.ts `slug:` (5), routed at /for/<slug>.
 *   research slugs   = app/research/<slug>/page.tsx (2).
 *
 * String-only (no heavy imports) so it is safe in the global client bundle.
 */

export type TopicKey =
  | "buying"
  | "selling"
  | "nhs-income"
  | "vat-retail"
  | "locum"
  | "structure";

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
    key: "buying",
    label: "buying a pharmacy",
    blogCategorySlugs: ["buying-a-pharmacy"],
    primaryCalculator: "pharmacy-purchase-affordability",
    ctaCopy: "Check what a pharmacy purchase looks like on your numbers",
    resourceId: null,
  },
  {
    key: "selling",
    label: "selling a pharmacy",
    blogCategorySlugs: ["selling-a-pharmacy"],
    // No calculator covers a sale on this site today (3 tools: purchase
    // affordability, FP34 cash flow, locum take-home). null means the ladder
    // falls through to a review, which is correct rather than pointing a seller
    // at the buyer's tool.
    primaryCalculator: null,
    ctaCopy: "Check where you stand on a pharmacy sale",
    resourceId: null,
  },
  {
    key: "nhs-income",
    label: "NHS contract income and FP34 cash flow",
    blogCategorySlugs: ["nhs-contract-and-income"],
    primaryCalculator: "pharmacy-fp34-cash-flow-estimator",
    ctaCopy: "Map your FP34 cash flow month by month",
    resourceId: null,
  },
  {
    key: "vat-retail",
    label: "VAT and retail schemes",
    blogCategorySlugs: ["vat-and-retail-schemes"],
    primaryCalculator: null,
    ctaCopy: "Check your VAT retail scheme is the right one",
    resourceId: null,
  },
  {
    key: "locum",
    label: "locum pharmacist pay and tax",
    blogCategorySlugs: ["locum-pharmacists"],
    primaryCalculator: "locum-take-home-comparator",
    ctaCopy: "Compare your locum take-home pay",
    resourceId: null,
  },
  {
    key: "structure",
    label: "pharmacy structure, payroll and benchmarking",
    // No blog category of its own: this topic is reached through the structure,
    // payroll and group routes.
    blogCategorySlugs: [],
    primaryCalculator: null,
    ctaCopy: "Check your pharmacy structure and payroll are right",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. All 3 slugs in lib/calculators/registry.ts are
 * mapped. Unmapped calculators resolve to null and fall back to generic.
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "pharmacy-purchase-affordability": "buying",
  "pharmacy-fp34-cash-flow-estimator": "nhs-income",
  "locum-take-home-comparator": "locum",
};

/**
 * Service slug (data/pharmacies-services.ts) -> topic. All 8 mapped.
 * `pharmacy-valuation-goodwill` sits with selling: a valuation is read on this
 * site as the first step of a sale, and the sale service names it.
 * `pharmacy-benchmarking-margin` sits with nhs-income: pharmacy margin on this
 * site is discussed as NHS contract income against cost.
 */
export const SERVICE_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "pharmacy-purchase-accounting": "buying",
  "pharmacy-sale-cgt-badr": "selling",
  "pharmacy-valuation-goodwill": "selling",
  "nhs-payment-reconciliation-fp34": "nhs-income",
  "pharmacy-vat-retail-schemes": "vat-retail",
  "pharmacy-payroll-workforce": "structure",
  "pharmacy-incorporation-structure": "structure",
  "pharmacy-benchmarking-margin": "nhs-income",
};

/**
 * Audience hub slug (data/pharmacies-hubs.ts, routed at /for/<slug>) -> topic.
 * All 5 mapped. `pharmacy-owners` is the broad owner hub, so it takes the
 * topic owners arrive for most: NHS contract income.
 */
export const HUB_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "pharmacy-owners": "nhs-income",
  "buying-a-pharmacy": "buying",
  "selling-a-pharmacy": "selling",
  "pharmacy-groups": "structure",
  "locum-pharmacists": "locum",
};

/** Research page slug (app/research/<slug>) -> topic. Both mapped. */
export const RESEARCH_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "pharmacy-openings-closures-index": "buying",
  "pharmacy-density-and-workload-index": "nhs-income",
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
