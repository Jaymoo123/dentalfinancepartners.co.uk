/**
 * Canonical intent taxonomy for Probate Compass (wills-probate).
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
 *   "Probate Process"       -> "probate-process"
 *   "Making a Will"         -> "making-a-will"
 *   "Inheritance Tax"       -> "inheritance-tax"
 *   "Executors"             -> "executors"
 *   "Intestacy"             -> "intestacy"
 *   "Pensions and IHT 2027" -> "pensions-and-iht-2027"
 *   "Power of Attorney"     -> "power-of-attorney"
 *
 * NOTE: the calculator slugs referenced below (probate-cost-calculator etc.)
 * are PLACEHOLDERS — the actual tool fleet does not exist yet (registry.ts is
 * empty). Wiring is future-proofed so Phase 2 only needs to add the tools.
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "probate-cost"
  | "do-i-need-probate"
  | "inheritance-tax"
  | "probate-timeline"
  | "pensions-iht-2027"
  | "diy-vs-solicitor";

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
    key: "probate-cost",
    label: "Probate costs",
    blogCategorySlugs: ["probate-process", "executors"],
    primaryCalculator: "probate-cost-calculator",
    ctaCopy: "Work out what probate is likely to cost",
    resourceId: null,
  },
  {
    key: "do-i-need-probate",
    label: "Do I need probate",
    blogCategorySlugs: ["intestacy"],
    primaryCalculator: "do-i-need-probate-checker",
    ctaCopy: "Check if this estate needs probate",
    resourceId: null,
  },
  {
    key: "inheritance-tax",
    label: "Inheritance tax",
    blogCategorySlugs: ["inheritance-tax"],
    primaryCalculator: "iht-threshold-calculator",
    ctaCopy: "Check whether inheritance tax is due",
    resourceId: null,
  },
  {
    key: "probate-timeline",
    label: "Probate timeline",
    blogCategorySlugs: [],
    primaryCalculator: "probate-timeline-estimator",
    ctaCopy: "Estimate how long probate will take",
    resourceId: null,
  },
  {
    key: "pensions-iht-2027",
    label: "Pensions and inheritance tax (2027)",
    blogCategorySlugs: ["pensions-and-iht-2027"],
    primaryCalculator: "pensions-iht-2027-estimator",
    ctaCopy: "See how the 2027 pension changes affect this estate",
    resourceId: null,
  },
  {
    key: "diy-vs-solicitor",
    label: "DIY probate vs a solicitor",
    blogCategorySlugs: ["making-a-will", "power-of-attorney"],
    primaryCalculator: "probate-diy-vs-solicitor",
    ctaCopy: "Compare DIY probate against using a solicitor",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 *
 * Placeholder slugs, per the Phase-2 tool brief:
 *   probate-cost-calculator      -> probate-cost
 *   do-i-need-probate-checker    -> do-i-need-probate
 *   iht-threshold-calculator     -> inheritance-tax
 *   probate-timeline-estimator   -> probate-timeline
 *   pensions-iht-2027-estimator  -> pensions-iht-2027
 *   probate-diy-vs-solicitor     -> diy-vs-solicitor
 *   making-a-will-checklist      -> diy-vs-solicitor (closest: planning-stage tool)
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "probate-cost-calculator": "probate-cost",
  "do-i-need-probate-checker": "do-i-need-probate",
  "iht-threshold-calculator": "inheritance-tax",
  "probate-timeline-estimator": "probate-timeline",
  "pensions-iht-2027-estimator": "pensions-iht-2027",
  "probate-diy-vs-solicitor": "diy-vs-solicitor",
  "making-a-will-checklist": "diy-vs-solicitor",
};

/**
 * Blog category slug -> early tool island (calculator slug).
 * Moment 1 of the 3-moment blog capture architecture: a free calculator card
 * injected after the first h2 in the article body.
 *
 * Category slugs are slugifyCategory() outputs (see lib/blog.ts):
 *   "Probate Process"       -> "probate-process"
 *   "Making a Will"         -> "making-a-will"
 *   "Inheritance Tax"       -> "inheritance-tax"
 *   "Executors"             -> "executors"
 *   "Intestacy"             -> "intestacy"
 *   "Pensions and IHT 2027" -> "pensions-and-iht-2027"
 *   "Power of Attorney"     -> "power-of-attorney"
 */
export const EARLY_TOOL_BY_CATEGORY: Record<string, string> = {
  "probate-process": "probate-cost-calculator",
  "executors": "probate-timeline-estimator",
  "intestacy": "do-i-need-probate-checker",
  "inheritance-tax": "iht-threshold-calculator",
  "pensions-and-iht-2027": "pensions-iht-2027-estimator",
  "making-a-will": "making-a-will-checklist",
  "power-of-attorney": "probate-diy-vs-solicitor",
};

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
