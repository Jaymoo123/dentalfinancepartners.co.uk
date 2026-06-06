/**
 * Canonical intent taxonomy — the single source of truth mapping a page (by its
 * blog category or calculator) to a "topic" that carries the personalization
 * payload (matched calculator, intent-matched CTA copy, lead-magnet resource).
 *
 * Extensibility (deliberate):
 *  - A new blog post in an EXISTING category needs nothing: the topic is derived
 *    from the URL category slug.
 *  - A brand-new topic = one entry in TOPICS.
 *  - A new calculator = one line in CALC_SLUG_TO_TOPIC.
 *
 * Blog category slugs below are the output of slugifyCategory() in lib/blog.ts
 * (lowercase, "()" stripped, "&" -> "and", spaces -> "-").
 *
 * This module is string-only (no heavy imports) so it is safe to pull into the
 * global client bundle via deriveTopic().
 */

export type TopicKey =
  | "section-24"
  | "incorporation"
  | "capital-gains"
  | "landlord-essentials"
  | "mtd"
  | "portfolio"
  | "non-resident"
  | "property-types"
  | "stamp-duty"
  | "services";

export type Topic = {
  key: TopicKey;
  label: string;
  /** slugifyCategory() outputs that resolve to this topic. */
  blogCategorySlugs: string[];
  /** the calculator to recommend for this topic (slug), or null. */
  primaryCalculator: string | null;
  /** short, intent-matched CTA used by the personalization layer. */
  ctaCopy: string;
  /** lead-magnet resource id (Phase 4). null until the asset actually exists. */
  resourceId: string | null;
};

export const TOPICS: Topic[] = [
  {
    key: "section-24",
    label: "Section 24 and mortgage interest relief",
    blogCategorySlugs: ["section-24-and-tax-relief"],
    primaryCalculator: "section-24-calculator",
    ctaCopy: "Get your Section 24 position checked",
    resourceId: "section-24",
  },
  {
    key: "incorporation",
    label: "Incorporation and company structures",
    blogCategorySlugs: ["incorporation-and-company-structures"],
    primaryCalculator: "incorporation-cost-calculator",
    ctaCopy: "See the real cost and saving of incorporating",
    resourceId: "incorporation",
  },
  {
    key: "capital-gains",
    label: "Capital Gains Tax",
    blogCategorySlugs: ["capital-gains-tax"],
    primaryCalculator: "capital-gains-tax-calculator",
    ctaCopy: "Estimate the CGT on your sale",
    resourceId: "capital-gains",
  },
  {
    key: "landlord-essentials",
    label: "Landlord tax essentials",
    blogCategorySlugs: ["landlord-tax-essentials"],
    primaryCalculator: "rental-income-tax-calculator",
    ctaCopy: "Check your landlord tax position",
    resourceId: "landlord-essentials",
  },
  {
    key: "mtd",
    label: "Making Tax Digital",
    blogCategorySlugs: ["making-tax-digital-mtd"],
    primaryCalculator: "mtd-checker",
    ctaCopy: "Check if and when MTD applies to you",
    resourceId: "mtd",
  },
  {
    key: "portfolio",
    label: "Portfolio management",
    blogCategorySlugs: ["portfolio-management"],
    primaryCalculator: "portfolio-profitability-calculator",
    ctaCopy: "Check your portfolio's profitability",
    resourceId: null,
  },
  {
    key: "non-resident",
    label: "Non-resident landlord tax",
    blogCategorySlugs: ["non-resident-landlord-tax"],
    primaryCalculator: "rental-income-tax-calculator",
    ctaCopy: "Check your non-resident landlord tax",
    resourceId: null,
  },
  {
    key: "property-types",
    label: "Property types and specialist tax",
    blogCategorySlugs: ["property-types-and-specialist-tax"],
    primaryCalculator: "stamp-duty-calculator",
    ctaCopy: "Work out the tax on your property",
    resourceId: null,
  },
  {
    key: "stamp-duty",
    label: "Stamp duty (SDLT / LBTT / LTT)",
    blogCategorySlugs: [],
    primaryCalculator: "stamp-duty-calculator",
    ctaCopy: "Check your stamp duty",
    resourceId: "stamp-duty",
  },
  {
    key: "services",
    label: "Property accountant services",
    blogCategorySlugs: ["property-accountant-services"],
    primaryCalculator: null,
    ctaCopy: "Talk to a property tax specialist",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "stamp-duty-calculator": "stamp-duty",
  "first-time-buyer-stamp-duty-calculator": "stamp-duty",
  "lbtt-calculator": "stamp-duty",
  "ltt-calculator": "stamp-duty",
  "section-24-calculator": "section-24",
  "incorporation-cost-calculator": "incorporation",
  "corporation-tax-calculator": "incorporation",
  "dividend-tax-calculator": "incorporation",
  "mtd-checker": "mtd",
  "portfolio-profitability-calculator": "portfolio",
  "rental-yield-calculator": "portfolio",
  "buy-to-let-cashflow-calculator": "portfolio",
  "capital-gains-tax-calculator": "capital-gains",
  "rental-income-tax-calculator": "landlord-essentials",
  "rent-a-room-relief-calculator": "landlord-essentials",
  "property-allowance-checker": "landlord-essentials",
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
