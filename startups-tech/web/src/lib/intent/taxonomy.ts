/**
 * Canonical intent taxonomy for Founder Tax Partners (startups and tech).
 *
 * Single source of truth mapping a route (blog category, calculator, service,
 * audience hub, research page) to a "topic" that carries the personalisation
 * payload used by the proactive assistant.
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
 *                      spaces -> "-"). The five published categories are
 *                      "Share Schemes and EMI", "Research and Development",
 *                      "SEIS and EIS", "SaaS and Tech Finance",
 *                      "Startup Compliance".
 *   calculator slugs = lib/calculators/tools/*.ts `slug:` (4 tools).
 *   service slugs    = data/startups-services.ts `slug:` (6).
 *   audience slugs   = data/startups-hubs.ts `slug:` (5), routed at /for/<slug>.
 *   research slugs   = app/research/<slug>/page.tsx (5).
 *
 * String-only (no heavy imports) so it is safe in the global client bundle via
 * deriveTopic().
 */

export type TopicKey =
  | "rnd"
  | "seis-eis"
  | "share-schemes"
  | "founder-pay"
  | "saas-finance"
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
    key: "rnd",
    label: "R&D tax relief",
    blogCategorySlugs: ["research-and-development"],
    primaryCalculator: "rd-relief-estimator",
    ctaCopy: "Estimate your R&D tax relief claim",
    resourceId: null,
  },
  {
    key: "seis-eis",
    label: "SEIS and EIS",
    blogCategorySlugs: ["seis-and-eis"],
    primaryCalculator: "seis-eis-relief-calculator",
    ctaCopy: "See what SEIS and EIS relief is worth",
    resourceId: null,
  },
  {
    key: "share-schemes",
    label: "Share schemes and EMI",
    blogCategorySlugs: ["share-schemes-and-emi"],
    primaryCalculator: "emi-vs-unapproved-calculator",
    ctaCopy: "Compare EMI with unapproved options",
    resourceId: null,
  },
  {
    key: "founder-pay",
    label: "Founder pay and extraction",
    // No blog category of its own yet: this topic is reached through the
    // founder pay calculator and the /for audience hubs.
    blogCategorySlugs: [],
    primaryCalculator: "founder-dividend-vs-salary-calculator",
    ctaCopy: "Work out your salary and dividend split",
    resourceId: null,
  },
  {
    key: "saas-finance",
    label: "SaaS and tech finance",
    blogCategorySlugs: ["saas-and-tech-finance"],
    primaryCalculator: "founder-dividend-vs-salary-calculator",
    ctaCopy: "Get your SaaS numbers investor ready",
    resourceId: null,
  },
  {
    key: "compliance",
    label: "Startup compliance",
    blogCategorySlugs: ["startup-compliance"],
    primaryCalculator: null,
    ctaCopy: "Check your filing deadlines are covered",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. All 4 slugs in lib/calculators/registry.ts are
 * mapped. Unmapped calculators resolve to null and fall back to generic.
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "rd-relief-estimator": "rnd",
  "seis-eis-relief-calculator": "seis-eis",
  "emi-vs-unapproved-calculator": "share-schemes",
  "founder-dividend-vs-salary-calculator": "founder-pay",
};

/** Service slug (data/startups-services.ts) -> topic. All 6 mapped. */
export const SERVICE_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "rd-tax-claims": "rnd",
  "seis-eis-advance-assurance": "seis-eis",
  "emi-scheme-setup": "share-schemes",
  "share-schemes": "share-schemes",
  "fractional-cfo": "saas-finance",
  "core-compliance": "compliance",
};

/**
 * Audience hub slug (data/startups-hubs.ts, routed at /for/<slug>) -> topic.
 * Each hub is mapped to the relief that stage of company most often arrives
 * for, rather than a single blanket fallback.
 */
export const HUB_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "pre-seed-founders": "seis-eis",
  "funded-startups": "rnd",
  "saas-companies": "saas-finance",
  "software-development-companies": "rnd",
  "fintech-startups": "seis-eis",
};

/** Research page slug (app/research/<slug>) -> topic. All 5 mapped. */
export const RESEARCH_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "rd-tax-relief-index": "rnd",
  "uk-tech-funding-reliefs-index": "seis-eis",
  "tech-startup-survival-index": "saas-finance",
  "startup-formation-survival-index": "saas-finance",
  "uk-tech-formations-index": "saas-finance",
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
