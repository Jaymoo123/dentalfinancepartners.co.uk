import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";
import { niche } from "@/config/niche-loader";
import { slugifyCategory } from "@/lib/blog";

/**
 * Per-category CTA copy for the blog funnel. ONE map feeds three surfaces so
 * they can never disagree: the article's #enquiry-form panel, the sticky
 * BlogSidebarCta card, and the category hub's closing LeadCTAPanel.
 *
 * Keyed on the SLUG the router produces (slugifyCategory), never the raw
 * frontmatter label: label-keying is the defect that mis-CTA'd 57 posts on
 * Property. The guard test asserts every configured category has a key.
 */
export type BlogCtaCopy = {
  heading: string;
  body: string;
  button: string;
};

export const CTA_BY_CATEGORY: Record<string, BlogCtaCopy> = {
  "limited-company-tax": {
    heading: "Want your company's tax position checked?",
    body: "An accountant runs the numbers on the company: profit extraction, allowances, timing. Free call, no hard sell.",
    button: "Book a company tax review",
  },
  "sole-trader-and-self-employment": {
    heading: "Sole trader, and wondering if that is still right?",
    body: "We model self assessment against a limited company on your actual figures, and tell you if the switch is worth it or not.",
    button: "Book a structure review",
  },
  "vat-and-making-tax-digital": {
    heading: "Get your VAT and MTD setup checked",
    body: "Registration timing, the right scheme, digital links and software. We check it before HMRC does.",
    button: "Book an MTD readiness call",
  },
  "payroll-and-paye": {
    heading: "Payroll, PAYE and pensions, off your desk",
    body: "RTI, auto-enrolment, statutory pay and the director's own payroll. Run properly, filed on time.",
    button: "Book a payroll call",
  },
  "corporation-tax": {
    heading: "Corporation tax bill bigger than you expected?",
    body: "We look at the allowances, the timing and the reliefs before the return is filed, not after.",
    button: "Book a corporation tax review",
  },
  "randd-tax-credits": {
    heading: "Not sure whether you actually qualify for R&D relief?",
    body: "A straight answer on eligibility before you spend a day on a claim, and a properly evidenced claim if you do.",
    button: "Book an R&D eligibility call",
  },
  "incorporation-and-structure": {
    heading: "Thinking about incorporating?",
    body: "Incorporation is one of the more consequential decisions an owner makes. We model the tax, the timing and the running cost on your figures.",
    button: "Book an incorporation review",
  },
  "exit-and-capital-gains": {
    heading: "Selling or winding down in the next two years?",
    body: "BADR, MVL against strike-off, earn-outs. The saving is made 12 to 24 months out, not at completion.",
    button: "Book an exit planning call",
  },
  "bookkeeping-and-compliance": {
    heading: "Behind on the books, or dreading year end?",
    body: "We take the records as they are, get them straight, and keep the deadlines off your calendar.",
    button: "Book a compliance call",
  },
  "director-pay-and-dividends": {
    heading: "Is your salary and dividend split still the right one?",
    body: "Thresholds move every year and most splits are set once and never revisited. We check yours against this year's numbers.",
    button: "Book a director pay review",
  },
  "business-finance": {
    heading: "Want a second pair of eyes on the numbers?",
    body: "Cash, margin, funding and forecasting, read alongside the tax rather than separately. Practical recommendations, no hard sell.",
    button: "Book a finance review",
  },
};

/**
 * The three proof rows every LeadCTAPanel on the site carries. One copy so the
 * blog index, the eleven hubs, the four stage pages, /fundamentals, /guides and
 * /glossary cannot drift from the homepage's closing band.
 */
export const LEAD_PROOF_POINTS = [
  { title: "24-hour response, usually same day", detail: "You hear back from a person, not an autoresponder" },
  { title: "Fixed fees, agreed before any work", detail: "In writing, before anything starts" },
  { title: "One named accountant, not a team inbox", detail: "The same person every time you call" },
];

/** Copy for a raw frontmatter category label, falling back to the niche default. */
export function blogCtaCopy(rawCategory: string): BlogCtaCopy {
  const bySlug = CTA_BY_CATEGORY[slugifyCategory(rawCategory)];
  if (bySlug) return bySlug;
  const blog = getActiveCta(niche).blog;
  return {
    heading: blog.cta_heading,
    body: blog.cta_body,
    button: blog.cta_button,
  };
}
