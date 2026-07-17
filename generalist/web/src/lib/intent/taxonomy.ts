/**
 * Canonical intent taxonomy for Holloway Davies (generalist small-business accountants).
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
 * Categories from content/blog/*.md frontmatter:
 *   "Limited Company Tax"            -> "limited-company-tax"
 *   "Sole Trader and Self Employment"-> "sole-trader-and-self-employment"
 *   "VAT and Making Tax Digital"     -> "vat-and-making-tax-digital"
 *   "Payroll and PAYE"               -> "payroll-and-paye"
 *   "R&D Tax Credits"                -> "randd-tax-credits"
 *     NOTE: slugifyCategory replaces "&" with "and", so "R&D" becomes "rand",
 *     producing "randd-tax-credits" (not "rd-tax-credits"). This is verified
 *     against slugifyCategory in lib/blog.ts and covered by the intent-engine test.
 *   "Incorporation and Structure"    -> "incorporation-and-structure"
 *   "Exit and Capital Gains"         -> "exit-and-capital-gains"
 *   "Director Pay and Dividends"     -> "director-pay-and-dividends"
 *   "Bookkeeping and Compliance"     -> "bookkeeping-and-compliance"
 *   "Corporation Tax"                -> "corporation-tax"
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "limited-company"
  | "sole-trader"
  | "vat-mtd"
  | "payroll"
  | "rnd"
  | "incorporation"
  | "exit-cgt"
  | "director-pay"
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
  /** lead-magnet resource id (Phase 4). null until the asset actually exists. */
  resourceId: string | null;
};

export const TOPICS: Topic[] = [
  {
    key: "limited-company",
    label: "Limited company tax",
    blogCategorySlugs: ["limited-company-tax"],
    primaryCalculator: "salary-dividend-optimiser",
    ctaCopy: "Optimise your salary and dividend split",
    resourceId: "limited-company",
  },
  {
    key: "sole-trader",
    label: "Sole trader and self-employment",
    blogCategorySlugs: ["sole-trader-and-self-employment"],
    primaryCalculator: "take-home-pay-calculator",
    ctaCopy: "Calculate your take-home pay as a sole trader",
    resourceId: "sole-trader",
  },
  {
    key: "vat-mtd",
    label: "VAT and Making Tax Digital",
    blogCategorySlugs: ["vat-and-making-tax-digital"],
    primaryCalculator: "vat-scheme-comparator",
    ctaCopy: "Compare VAT schemes and find the right one",
    resourceId: "vat-mtd",
  },
  {
    key: "payroll",
    label: "Payroll and PAYE",
    blogCategorySlugs: ["payroll-and-paye"],
    primaryCalculator: "employer-ni-calculator",
    ctaCopy: "Calculate your employer National Insurance bill",
    resourceId: "payroll",
  },
  {
    key: "rnd",
    label: "R&D tax credits",
    // IMPORTANT: slugifyCategory("R&D Tax Credits") -> "randd-tax-credits"
    // because "&" is replaced by "and" (no space around it), so "R&D" -> "rand",
    // not "r-and-d". Verified against lib/blog.ts slugifyCategory() logic.
    blogCategorySlugs: ["randd-tax-credits"],
    primaryCalculator: "rd-tax-credit-estimator",
    ctaCopy: "Estimate your R&D tax credit claim",
    resourceId: "rnd",
  },
  {
    key: "incorporation",
    label: "Incorporation and structure",
    blogCategorySlugs: ["incorporation-and-structure"],
    primaryCalculator: "salary-dividend-optimiser",
    ctaCopy: "See what you could save by incorporating",
    resourceId: "incorporation",
  },
  {
    key: "exit-cgt",
    label: "Exit planning and capital gains",
    blogCategorySlugs: ["exit-and-capital-gains"],
    primaryCalculator: "badr-cgt-calculator",
    ctaCopy: "Estimate your capital gains and BADR relief",
    resourceId: "exit-cgt",
  },
  {
    key: "director-pay",
    label: "Director pay and dividends",
    blogCategorySlugs: ["director-pay-and-dividends"],
    primaryCalculator: "salary-dividend-optimiser",
    ctaCopy: "Find the most tax-efficient way to pay yourself",
    resourceId: "director-pay",
  },
  {
    key: "compliance",
    label: "Bookkeeping and compliance",
    blogCategorySlugs: ["bookkeeping-and-compliance", "corporation-tax"],
    primaryCalculator: null,
    ctaCopy: "Speak to a specialist about your compliance",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 *
 * All 7 slugs from registry.ts are mapped:
 *   salary-dividend-optimiser    -> limited-company (primary) + also director-pay + incorporation
 *   take-home-pay-calculator     -> sole-trader
 *   vat-scheme-comparator        -> vat-mtd
 *   employer-ni-calculator       -> payroll
 *   rd-tax-credit-estimator      -> rnd
 *   badr-cgt-calculator          -> exit-cgt
 *   pension-contribution-optimiser -> director-pay (pension is a director-pay strategy)
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "salary-dividend-optimiser": "limited-company",
  "take-home-pay-calculator": "sole-trader",
  "vat-scheme-comparator": "vat-mtd",
  "employer-ni-calculator": "payroll",
  "rd-tax-credit-estimator": "rnd",
  "badr-cgt-calculator": "exit-cgt",
  "pension-contribution-optimiser": "director-pay",
};

/**
 * Blog category slug -> early tool island (tool registry slug).
 * Keyed by CATEGORY slug (not TopicKey) so corporation-tax and
 * bookkeeping-and-compliance get different tools without splitting the
 * "compliance" topic (which would ripple into assistant TOPIC_NOUN/TOPIC_HOOKS).
 * Consumed by BlogPostRenderer via earlyToolForBlogSlug().
 *
 * Tools with no matching blog category (no posts to host them):
 *   mileage-claim, capital-allowances-vehicle, cis-subcontractor-deduction
 */
export const EARLY_TOOL_BY_CATEGORY: Record<string, string> = {
  "limited-company-tax": "dividend-tax-2026-27",
  "sole-trader-and-self-employment": "sole-trader-vs-ltd",
  "vat-and-making-tax-digital": "vat-threshold-checker",
  "payroll-and-paye": "p11d-bik-calculator",
  "randd-tax-credits": "rd-tax-credit-estimator",
  "incorporation-and-structure": "sole-trader-vs-ltd",
  "exit-and-capital-gains": "cgt-60-day-reporter",
  "director-pay-and-dividends": "dividend-tax-2026-27",
  "bookkeeping-and-compliance": "mtd-itsa-readiness",
  "corporation-tax": "associated-companies-ct",
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
