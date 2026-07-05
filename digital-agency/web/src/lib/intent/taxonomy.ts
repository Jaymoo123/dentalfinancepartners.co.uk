/**
 * Canonical intent taxonomy for Agency Founder Finance (digital-agency).
 *
 * Single source of truth mapping a page (by its blog category slug, calculator
 * slug, for-* route, agencies/* route, or relocation page) to a "topic" that
 * carries the personalisation payload (matched calculator, intent-matched CTA
 * copy, lead-magnet resource).
 *
 * Blog category slugs are produced by slugifyCategory() in lib/blog.ts
 * (lowercase, parentheses stripped, "&" -> "and", spaces -> "-"):
 *   "International Agencies"      -> "international-agencies"
 *   "Tax and Compliance"          -> "tax-and-compliance"
 *   "Growth and Exit"             -> "growth-and-exit"
 *   "Agency Finance Essentials"   -> "agency-finance-essentials"
 *   "Contractors and IR35"        -> "contractors-and-ir35"
 *   "Making Tax Digital"          -> "making-tax-digital"
 *   "Salary and Dividends"        -> "salary-and-dividends"
 *   "Incorporation and Structure" -> "incorporation-and-structure"
 *   "Agency Accountant Services"  -> "agency-accountant-services"
 *
 * All 8 calculator slugs from registry.ts:
 *   salary-dividend-optimiser
 *   rd-tax-credit-estimator
 *   agency-valuation
 *   badr-cgt-calculator
 *   vat-scheme-comparator
 *   pension-contribution-optimiser
 *   take-home-pay-calculator
 *   employer-ni-calculator
 *
 * 19 /agencies/* slugs (trailing segment only):
 *   advertising-agencies, ai-agencies, branding-agencies, creative-agencies,
 *   crypto-web3-agencies, digital-agencies, ecommerce-agencies,
 *   email-marketing-agencies, influencer-marketing-agencies,
 *   marketing-agencies, performance-marketing-agencies, ppc-agencies,
 *   pr-agencies, recruitment-agencies, saas-agencies, seo-agencies,
 *   social-media-agencies, video-production-agencies, web-design-agencies
 *
 * 10 relocation page slugs (at root, e.g. /dubai-relocation):
 *   dubai-relocation, portugal-relocation, cyprus-relocation, spain-relocation,
 *   singapore-relocation, malta-relocation, estonia-relocation, greece-relocation,
 *   italy-relocation, switzerland-relocation
 *
 * 3 for-* routes:
 *   for-new-founders, for-growth-stage, for-pre-exit
 */

export type TopicKey =
  | "international"
  | "pay-planning"
  | "rnd"
  | "exit"
  | "compliance-vat"
  | "structure";

export type Topic = {
  key: TopicKey;
  label: string;
  /** blog category slugs (slugifyCategory output) that map to this topic. */
  blogCategorySlugs: string[];
  /** the primary calculator to recommend (slug from registry.ts), or null. */
  primaryCalculator: string | null;
  /** short, intent-matched CTA used by the personalisation layer. */
  ctaCopy: string;
  /** lead-magnet resource id (Phase 4). null until the asset exists. */
  resourceId: string | null;
};

export const TOPICS: Topic[] = [
  {
    key: "international",
    label: "International relocation for agency founders",
    blogCategorySlugs: ["international-agencies"],
    primaryCalculator: null, // no dedicated international calc yet
    ctaCopy: "Find out if international relocation works for your agency",
    resourceId: null,
  },
  {
    key: "pay-planning",
    label: "Salary and dividend planning",
    blogCategorySlugs: ["salary-and-dividends"],
    primaryCalculator: "salary-dividend-optimiser",
    ctaCopy: "Model your optimal salary and dividend split",
    resourceId: null,
  },
  {
    key: "rnd",
    label: "R&D tax credits for agencies",
    blogCategorySlugs: [],
    primaryCalculator: "rd-tax-credit-estimator",
    ctaCopy: "Check whether your agency qualifies for R&D tax credits",
    resourceId: null,
  },
  {
    key: "exit",
    label: "Agency exit and sale planning",
    blogCategorySlugs: ["growth-and-exit"],
    primaryCalculator: "badr-cgt-calculator",
    ctaCopy: "Model the CGT and BADR on your agency exit",
    resourceId: null,
  },
  {
    key: "compliance-vat",
    label: "Agency tax compliance and VAT",
    blogCategorySlugs: ["tax-and-compliance", "making-tax-digital"],
    primaryCalculator: "vat-scheme-comparator",
    ctaCopy: "Compare VAT schemes for your agency",
    resourceId: null,
  },
  {
    key: "structure",
    label: "Agency structure and incorporation",
    blogCategorySlugs: [
      "incorporation-and-structure",
      "agency-finance-essentials",
      "agency-accountant-services",
      "contractors-and-ir35",
    ],
    primaryCalculator: "take-home-pay-calculator",
    ctaCopy: "See how your agency structure affects your take-home pay",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. All 8 registry slugs are mapped.
 * salary-dividend-optimiser         -> pay-planning
 * rd-tax-credit-estimator           -> rnd
 * agency-valuation                  -> exit
 * badr-cgt-calculator               -> exit
 * vat-scheme-comparator             -> compliance-vat
 * pension-contribution-optimiser    -> pay-planning (pension = pay optimisation)
 * take-home-pay-calculator          -> structure
 * employer-ni-calculator            -> structure (employer cost = structure choice)
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "salary-dividend-optimiser": "pay-planning",
  "pension-contribution-optimiser": "pay-planning",
  "rd-tax-credit-estimator": "rnd",
  "agency-valuation": "exit",
  "badr-cgt-calculator": "exit",
  "vat-scheme-comparator": "compliance-vat",
  "take-home-pay-calculator": "structure",
  "employer-ni-calculator": "structure",
};

/**
 * /agencies/* slug (trailing segment) -> topic.
 * All 19 are mapped to their most natural topic.
 */
export const AGENCIES_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  // Digital/tech-forward agencies -> R&D + structure
  "ai-agencies": "rnd",
  "crypto-web3-agencies": "rnd",
  "saas-agencies": "rnd",
  "ecommerce-agencies": "structure",
  // Creative / marketing / media -> compliance + pay
  "marketing-agencies": "compliance-vat",
  "advertising-agencies": "compliance-vat",
  "social-media-agencies": "compliance-vat",
  "email-marketing-agencies": "compliance-vat",
  "influencer-marketing-agencies": "compliance-vat",
  "performance-marketing-agencies": "compliance-vat",
  "ppc-agencies": "compliance-vat",
  // Professional/creative services -> pay or structure
  "creative-agencies": "pay-planning",
  "branding-agencies": "pay-planning",
  "digital-agencies": "pay-planning",
  "web-design-agencies": "structure",
  "seo-agencies": "structure",
  "pr-agencies": "structure",
  "video-production-agencies": "structure",
  "recruitment-agencies": "structure",
};

/**
 * Relocation page slug (full, e.g. "dubai-relocation") -> topic.
 * All 10 relocation pages -> international.
 */
export const RELOCATION_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "dubai-relocation": "international",
  "portugal-relocation": "international",
  "cyprus-relocation": "international",
  "spain-relocation": "international",
  "singapore-relocation": "international",
  "malta-relocation": "international",
  "estonia-relocation": "international",
  "greece-relocation": "international",
  "italy-relocation": "international",
  "switzerland-relocation": "international",
};

// ------- Internal lookup maps (derived, do not export directly) -------
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
export function topicForAgenciesSlug(slug: string): TopicKey | null {
  return AGENCIES_SLUG_TO_TOPIC[slug] ?? null;
}
export function topicForRelocationSlug(slug: string): TopicKey | null {
  return RELOCATION_SLUG_TO_TOPIC[slug] ?? null;
}
