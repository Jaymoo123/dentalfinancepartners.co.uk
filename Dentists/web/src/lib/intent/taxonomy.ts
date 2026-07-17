/**
 * Canonical intent taxonomy for Dental Finance Partners.
 *
 * Single source of truth mapping a page (by its blog category or calculator)
 * to a "topic" that carries the personalisation payload (matched calculator,
 * intent-matched CTA copy, lead-magnet resource).
 *
 * The 12 real blog categories (from content/ frontmatter) all resolve to one
 * of 7 topics. Multiple casing variants of the same category (e.g.
 * "Associate Tax" / "Associate tax") merge at slug level because
 * slugifyCategory() is applied before the lookup.
 *
 * Category slug -> topic mapping:
 *
 *  associate-tax                      -> associate
 *  locum-tax                          -> associate
 *  practice-accounting                -> principal
 *  practice-finance                   -> principal
 *  capital-allowances-and-equipment   -> principal
 *  buying-a-practice                  -> buying
 *  goodwill-and-practice-sale         -> selling
 *  nhs-contracts                      -> nhs
 *  nhs-pension                        -> nhs
 *  vat-and-compliance                 -> compliance
 *  general                            -> compliance (specialist fallback)
 *  specialist-services                -> compliance (specialist fallback)
 *
 * Tool slug -> topic mapping:
 *  associate-take-home   -> associate
 *  locum-structure       -> associate
 *  practice-valuation    -> buying
 *  principal-extraction  -> principal
 *  uda-value             -> nhs
 *
 * /for-* routes:
 *  for-associates        -> associate
 *  for-principals        -> principal
 *  for-practice-buyers   -> buying
 *  for-locum-dentists    -> associate
 *
 * This module is string-only (no heavy imports) so it is safe to pull into
 * the global client bundle via deriveTopic().
 */

export type TopicKey =
  | "associate"
  | "associate-incorporation"
  | "principal"
  | "buying"
  | "selling"
  | "nhs"
  | "uda-calc"
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
    key: "associate",
    label: "Associate and locum dentist tax",
    blogCategorySlugs: ["associate-tax", "locum-tax"],
    primaryCalculator: "associate-take-home",
    ctaCopy: "Calculate your take-home pay as a dental associate or locum",
    resourceId: "associate",
  },
  {
    key: "associate-incorporation",
    label: "Associate incorporation: sole trader vs limited company",
    blogCategorySlugs: ["associate-incorporation"],
    primaryCalculator: null,
    ctaCopy: "Model the NHS Pension cost of incorporating as a dental associate",
    resourceId: "associate-incorporation",
  },
  {
    key: "principal",
    label: "Practice accounting and finance",
    blogCategorySlugs: [
      "practice-accounting",
      "practice-finance",
      "capital-allowances-and-equipment",
    ],
    primaryCalculator: "principal-extraction",
    ctaCopy: "Optimise your profit extraction as a practice owner",
    resourceId: "principal",
  },
  {
    key: "buying",
    label: "Buying a dental practice",
    blogCategorySlugs: ["buying-a-practice"],
    primaryCalculator: "practice-valuation",
    ctaCopy: "Value a dental practice before you buy",
    resourceId: "buying",
  },
  {
    key: "selling",
    label: "Selling a dental practice",
    blogCategorySlugs: ["goodwill-and-practice-sale"],
    primaryCalculator: "practice-valuation",
    ctaCopy: "Get a valuation estimate before you sell",
    resourceId: "selling",
  },
  {
    key: "nhs",
    label: "NHS contracts and pensions",
    blogCategorySlugs: ["nhs-contracts", "nhs-pension"],
    primaryCalculator: "uda-value",
    ctaCopy: "Calculate the value of your NHS UDA contract",
    resourceId: "nhs",
  },
  {
    key: "compliance",
    label: "VAT, compliance and specialist services",
    blogCategorySlugs: ["vat-and-compliance", "general", "specialist-services"],
    primaryCalculator: null,
    ctaCopy: "Speak to a specialist dental accountant",
    resourceId: null,
  },
];

/**
 * Calculator slug -> topic. The ONLY per-calculator wiring: add a line when a
 * calculator is added (registry.ts). Unmapped calculators resolve to null and
 * fall back to the generic experience.
 *
 * All 5 slugs from registry.ts are mapped:
 *   uda-value             -> nhs
 *   associate-take-home   -> associate
 *   practice-valuation    -> buying  (relevant to both buying + selling)
 *   locum-structure       -> associate
 *   principal-extraction  -> principal
 */
export const CALC_SLUG_TO_TOPIC: Record<string, TopicKey> = {
  "uda-value": "nhs",
  "associate-take-home": "associate",
  "practice-valuation": "buying",
  "locum-structure": "associate",
  "principal-extraction": "principal",
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
