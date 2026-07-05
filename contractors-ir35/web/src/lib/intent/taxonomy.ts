/**
 * Canonical intent taxonomy for Contractor Tax Accountants (contractors-ir35).
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
 * Categories from niche.config.json (verified against 50 live posts):
 *   "IR35 Status"                -> "ir35-status"               (16 posts)
 *   "Contractor Accounting Basics" -> "contractor-accounting-basics" (7 posts)
 *   "Umbrella vs Limited Company" -> "umbrella-vs-limited-company"  (6 posts)
 *   "Limited Company Tax"        -> "limited-company-tax"       (6 posts)
 *   "Pension and Dividends"      -> "pension-and-dividends"     (5 posts)
 *   "MTD and Compliance"         -> "mtd-and-compliance"        (5 posts)
 *   "Expenses and Deductions"    -> "expenses-and-deductions"   (5 posts)
 *
 * Calculator slugs verified against lib/calculators/registry.ts:
 *   outside-ir35-take-home-calculator
 *   inside-ir35-take-home-calculator
 *   umbrella-vs-limited-calculator
 *   dividend-tax-calculator
 *   corporation-tax-calculator
 *   contractor-salary-dividend-calculator
 *
 * /for/[slug] types from src/data/contractor-types.ts (10 types):
 *   it-contractors, engineering-contractors, finance-contractors,
 *   management-consultants, project-managers, nhs-locum-doctors,
 *   oil-gas-contractors, legal-contractors, marketing-contractors,
 *   construction-contractors
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "ir35"
  | "structure"
  | "company-tax"
  | "pay-planning"
  | "basics-expenses";

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

/**
 * Five topics designed from the content truth (7 categories + 6 tools).
 *
 * ir35          <- ir35-status posts -> outside + inside IR35 tools (dual intent:
 *                 reading about IR35 -> show the take-home calculator that gives
 *                 the financial answer to "does it matter?").
 * structure     <- umbrella-vs-limited-company posts -> umbrella-vs-limited tool
 *                 (the structural decision is the natural next step after reading
 *                 the comparison articles).
 * company-tax   <- limited-company-tax + mtd-and-compliance posts -> corporation-tax
 *                 (these posts are about running the company, corp tax is the core).
 * pay-planning  <- pension-and-dividends posts -> dividend-tax + salary-dividend
 *                 calculators (pay-planning readers want the numbers).
 * basics-expenses <- contractor-accounting-basics + expenses-and-deductions posts
 *                 -> specialist fallback (broad basics = no single tool fits, so
 *                 send to a free specialist review instead).
 */
export const TOPICS: Topic[] = [
  {
    key: "ir35",
    label: "IR35 status",
    blogCategorySlugs: ["ir35-status"],
    primaryCalculator: "outside-ir35-take-home-calculator",
    ctaCopy: "See your take-home pay outside IR35",
    resourceId: null,
  },
  {
    key: "structure",
    label: "Umbrella vs limited company",
    blogCategorySlugs: ["umbrella-vs-limited-company"],
    primaryCalculator: "umbrella-vs-limited-calculator",
    ctaCopy: "Compare your umbrella vs limited company take-home",
    resourceId: null,
  },
  {
    key: "company-tax",
    label: "Limited company tax",
    blogCategorySlugs: ["limited-company-tax", "mtd-and-compliance"],
    primaryCalculator: "corporation-tax-calculator",
    ctaCopy: "Estimate your corporation tax bill",
    resourceId: null,
  },
  {
    key: "pay-planning",
    label: "Pay planning and dividends",
    blogCategorySlugs: ["pension-and-dividends"],
    primaryCalculator: "contractor-salary-dividend-calculator",
    ctaCopy: "Find the most tax-efficient salary and dividend split",
    resourceId: null,
  },
  {
    key: "basics-expenses",
    label: "Contractor accounting and expenses",
    blogCategorySlugs: ["contractor-accounting-basics", "expenses-and-deductions"],
    primaryCalculator: null,
    ctaCopy: "Get a free review of your contractor accounting",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 *
 * All 6 slugs from registry.ts are mapped:
 *   outside-ir35-take-home-calculator  -> ir35
 *   inside-ir35-take-home-calculator   -> ir35  (same intent: IR35 financial impact)
 *   umbrella-vs-limited-calculator     -> structure
 *   dividend-tax-calculator            -> pay-planning
 *   corporation-tax-calculator         -> company-tax
 *   contractor-salary-dividend-calculator -> pay-planning
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "outside-ir35-take-home-calculator": "ir35",
  "inside-ir35-take-home-calculator": "ir35",
  "umbrella-vs-limited-calculator": "structure",
  "dividend-tax-calculator": "pay-planning",
  "corporation-tax-calculator": "company-tax",
  "contractor-salary-dividend-calculator": "pay-planning",
};

/**
 * /for/[slug] contractor type -> topic.
 * All 10 types from src/data/contractor-types.ts are mapped.
 * Every contractor landing on a /for/* page has an IR35 entry intent
 * (it is the primary concern that brought them to a contractor accountant),
 * so they all resolve to "ir35" as the default. This is the correct
 * fallback: the outside-ir35-take-home-calculator answers the fundamental
 * "how much better off am I outside IR35?" question that drives the visit.
 */
export const FOR_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "it-contractors": "ir35",
  "engineering-contractors": "ir35",
  "finance-contractors": "pay-planning",
  "management-consultants": "ir35",
  "project-managers": "ir35",
  "nhs-locum-doctors": "pay-planning",
  "oil-gas-contractors": "ir35",
  "legal-contractors": "ir35",
  "marketing-contractors": "ir35",
  "construction-contractors": "basics-expenses",
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
export function topicForForSlug(slug: string): TopicKey | null {
  return FOR_SLUG_TO_TOPIC[slug] ?? null;
}
