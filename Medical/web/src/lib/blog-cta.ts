/**
 * Per-category CTA copy for the blog subsystem.
 *
 * Keyed on the category SLUG (`slugifyCategory()` output), never the raw
 * frontmatter label. Property learned that the expensive way: keying on the
 * label put 57 posts on the generic CTA, because a category carrying two
 * spelling variants slugifies to one hub but matches neither key. Medical's
 * frontmatter already carries both quoted and unquoted forms of the same
 * labels, so the exposure is real here too.
 *
 * One object feeds three surfaces: the post `#enquiry-form` panel, the post
 * sidebar card, and the hub lead panel. They cannot drift.
 *
 * The key set is pinned by `src/tests/blog-cta.test.ts`, which fails on a
 * missing key and on an orphan key, against `getAllCategories()` (derived from
 * the posts) rather than `niche.config.json`, which lists a ninth category
 * with no posts and no hub route.
 *
 * VOICE (locked, and it was got wrong on the first pass): the copy describes
 * what a SPECIALIST FIRM does, never what "we" do. This site takes an enquiry
 * and passes it to a regulated firm in the partner network, which is what the
 * privacy policy discloses in terms. First-person service copy contradicts our
 * own disclosure, and it sat one line above a proof point reading "Matched to a
 * specialist firm" until an adversarial review caught it.
 *
 * COPY RULES (locked): no fee for our services and no comparative fee claim,
 * no turnaround promise, no client-count or client-behaviour claim, no "most
 * doctors qualify" framing, British English, no em-dashes. Written to name
 * mechanisms rather than figures, so no unsourced number enters the site
 * through the CTA map.
 */
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";
import { niche } from "@/config/niche-loader";

export type BlogCtaCopy = { heading: string; body: string; button: string };

export const CTA_BY_CATEGORY: Record<string, BlogCtaCopy> = {
  "gp-accountant-services": {
    heading: "Want a second read on how the practice and your own return fit together?",
    body: "Practice accounts, the profit allocation and each partner's personal position are one piece of work, not three. A specialist firm reads them together, so the figures agree with each other.",
    button: "Book a practice review",
  },
  "gp-practice-management": {
    heading: "Not sure the practice figures are telling you the right thing?",
    body: "Global sum, Carr-Hill, QOF, enhanced services and PCN income all arrive differently and land in different places. A specialist firm reads the practice accounts against the PCSE statements rather than beside them.",
    button: "Book a practice finance call",
  },
  "gp-tax-and-accounts": {
    heading: "Partnership accounts and your own return, prepared as one job",
    body: "The superannuation certificate, the profit share, notional rent and the partner return move together, and a partner joining or leaving mid-year moves all of them at once.",
    button: "Book a GP tax review",
  },
  "nhs-pension-planning": {
    heading: "Want the annual allowance position checked before the charge lands?",
    body: "The pension input amount grows with pensionable pay whether or not you pay in more. A specialist firm checks the input figure, tests the taper, looks at carry-forward and only then decides whether Scheme Pays is worth electing.",
    button: "Book a pension review",
  },
  "locum-tax": {
    heading: "Working as a locum and want the status question settled?",
    body: "IR35 is decided by the engagement rather than the contract, and the limited company, umbrella or sole trader answer depends on your actual sessions. A specialist firm models it on your own figures, and handles Forms A and B so the work counts towards pensionable service.",
    button: "Book a locum tax review",
  },
  "private-practice": {
    heading: "NHS post, private fees and medico-legal work in one tax position",
    body: "Three income streams, three treatments, and the errors happen where they meet. A specialist firm looks at the split, the expenses that hold up, and whether incorporating the private side is worth what it costs in pension accrual.",
    button: "Book a private practice call",
  },
  "incorporation-and-company-structures": {
    heading: "Thinking about incorporating the private side?",
    body: "Incorporation is modelled, not assumed. For a partner with only NHS income it is usually the wrong answer, and the useful version of this conversation starts from your income mix rather than from the idea.",
    button: "Book an incorporation review",
  },
  "medical-expenses": {
    heading: "Want the expense claim to survive an HMRC look?",
    body: "Professional subscriptions, indemnity, examination fees, equipment and travel are each treated differently, and doctors' claims are challenged in predictable places. A specialist firm reviews what is claimed against what is defensible.",
    button: "Book an expenses review",
  },
};

/**
 * The generic fallback, straight from the active cta variant, so packages mode
 * keeps its own pricing-led copy without this map knowing anything about it.
 */
export function blogCtaFor(categorySlug: string | undefined): BlogCtaCopy {
  const mapped = categorySlug ? CTA_BY_CATEGORY[categorySlug] : undefined;
  if (mapped) return mapped;
  const blog = getActiveCta(niche).blog;
  return { heading: blog.cta_heading, body: blog.cta_body, button: blog.cta_button };
}
