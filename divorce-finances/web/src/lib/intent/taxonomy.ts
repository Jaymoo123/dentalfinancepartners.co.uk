/**
 * Canonical intent taxonomy for divorce-finances.
 *
 * STUB (scaffold phase): topic keys are divorce-neutral placeholders with no
 * calculators or resources wired. Real topics land with the content build.
 *
 * The single source of truth mapping a page (by its blog category or
 * calculator) to a "topic" that carries the personalisation payload.
 *
 * Blog category slugs are the output of slugifyCategory() in lib/blog.ts.
 * Categories from niche.config.json:
 *   "Financial Settlements"   -> "financial-settlements"
 *   "Pensions and Divorce"    -> "pensions-and-divorce"
 *   "Tax on Divorce"          -> "tax-on-divorce"
 *   "The Family Home"         -> "the-family-home"
 *   "Maintenance and Support" -> "maintenance-and-support"
 *   "Process and Costs"       -> "process-and-costs"
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "financial-settlement"
  | "pension-sharing"
  | "tax-on-divorce"
  | "family-home"
  | "maintenance"
  | "process-costs";

export type Topic = {
  key: TopicKey;
  label: string;
  /** slugifyCategory() outputs that resolve to this topic. */
  blogCategorySlugs: string[];
  /** the calculator to recommend for this topic (slug), or null. */
  primaryCalculator: string | null;
  /** short, intent-matched CTA used by the personalisation layer. */
  ctaCopy: string;
  /** lead-magnet resource id; null until the asset actually exists. */
  resourceId: string | null;
};

export const TOPICS: Topic[] = [
  {
    key: "financial-settlement",
    label: "Financial settlements",
    blogCategorySlugs: ["financial-settlements"],
    primaryCalculator: null,
    ctaCopy: "Work out where you stand on a settlement",
    resourceId: null,
  },
  {
    key: "pension-sharing",
    label: "Pensions and divorce",
    blogCategorySlugs: ["pensions-and-divorce"],
    primaryCalculator: null,
    ctaCopy: "Understand how pensions get split",
    resourceId: null,
  },
  {
    key: "tax-on-divorce",
    label: "Tax on divorce",
    blogCategorySlugs: ["tax-on-divorce"],
    primaryCalculator: null,
    ctaCopy: "Check the tax position on your split",
    resourceId: null,
  },
  {
    key: "family-home",
    label: "The family home",
    blogCategorySlugs: ["the-family-home"],
    primaryCalculator: null,
    ctaCopy: "Work out the options for the family home",
    resourceId: null,
  },
  {
    key: "maintenance",
    label: "Maintenance and support",
    blogCategorySlugs: ["maintenance-and-support"],
    primaryCalculator: null,
    ctaCopy: "Understand maintenance and support",
    resourceId: null,
  },
  {
    key: "process-costs",
    label: "Process and costs",
    blogCategorySlugs: ["process-and-costs"],
    primaryCalculator: null,
    ctaCopy: "Understand the process and what it costs",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. Empty at scaffold: add a line when a calculator
 * is added (registry.ts). Unmapped calculators resolve to null and fall back
 * to the generic experience.
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {};

/**
 * Blog category slug -> early tool island (calculator slug).
 * Empty at scaffold: no calculators exist yet, so the fallback fires everywhere.
 */
export const EARLY_TOOL_BY_CATEGORY: Record<string, string> = {};

export function earlyToolForBlogSlug(slug: string): string | null {
  return EARLY_TOOL_BY_CATEGORY[slug] ?? null;
}

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
