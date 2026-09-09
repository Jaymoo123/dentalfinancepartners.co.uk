import type { BlogPost } from "@/types/blog";

/**
 * The blog "business stage" taxonomy, single-sourced.
 *
 * It used to live in THREE files (the /blog index chip list, the /blog/stage
 * switchboard cards, and the /blog/stage/[stage] matcher), each with its own
 * copy of the four slugs. This is the only copy now; every surface reads it.
 */
export type BlogStage = {
  slug: string;
  name: string;
  /** Short keyword triplet, the switchboard card eyebrow. */
  keywords: string;
  /** One-line card summary on the switchboard. */
  summary: string;
  /** Hero eyebrow on the stage page. */
  intro: string;
  /** Hero standfirst on the stage page. */
  longIntro: string;
  /** Closing LeadCTAPanel copy for this stage. */
  cta: { heading: string; body: string; button: string };
  /**
   * Categories that count as "this stage" content. A post can appear in more
   * than one stage; that is intentional, the same content serves different
   * intents.
   */
  categories: string[];
  /**
   * Title/summary keyword filters (lowercase substrings) that promote a post
   * into this stage regardless of its tax category.
   */
  titleKeywords?: string[];
};

export const BLOG_STAGES: Record<string, BlogStage> = {
  "starting-a-business": {
    slug: "starting-a-business",
    name: "Starting a business",
    keywords: "Set up. Register. First step.",
    summary:
      "Sole trader vs limited company, incorporation, first VAT registration, registering for self-assessment, first 90 days.",
    intro: "You are about to register, or you just have.",
    longIntro:
      "If you are deciding between sole trader and limited company, registering for self-assessment, incorporating, or thinking about VAT registration for the first time, these are the articles to read first.",
    cta: {
      heading: "Getting the structure right before you register saves the most",
      body: "We model sole trader against limited company on your own figures, and tell you which one to register, when, and what it will cost to run.",
      button: "Book a structure review",
    },
    categories: ["Incorporation and Structure", "Sole Trader and Self Employment"],
    titleKeywords: [
      "register",
      "set up",
      "start",
      "incorporat",
      "sole trader vs",
      "first 90 days",
      "company formation",
    ],
  },
  "running-a-business": {
    slug: "running-a-business",
    name: "Running a business",
    keywords: "Day-to-day. Monthly. Quarterly. Yearly.",
    summary:
      "Bookkeeping, payroll, VAT returns, corporation tax, dividends, director pay. The operational tax decisions month-to-month.",
    intro: "You are up and running, and the monthly decisions have started.",
    longIntro:
      "Bookkeeping, payroll, VAT returns, corporation tax, dividends and director pay. The operational tax and finance decisions that come up every month, quarter or year once your business is trading.",
    cta: {
      heading: "A second look at director pay and VAT usually pays for itself",
      body: "Thresholds move every year and most splits are set once and never revisited. We check yours, and the VAT scheme with it, against this year's numbers.",
      button: "Book a director pay review",
    },
    categories: [
      "Bookkeeping and Compliance",
      "VAT and Making Tax Digital",
      "Payroll and PAYE",
      "Corporation Tax",
      "Director Pay and Dividends",
      "Limited Company Tax",
    ],
  },
  "scaling-a-business": {
    slug: "scaling-a-business",
    name: "Scaling a business",
    keywords: "Hire. Restructure. Optimise.",
    summary:
      "Hiring, R&D claims, holding companies, restructuring, alphabet shares, associated company rules. Tax for growth.",
    intro: "You are hiring, claiming R&D, restructuring, or considering a holding company.",
    longIntro:
      "Once your business has stable trading profits, you face a different set of tax questions: how to structure for growth, when R&D credits are worth claiming, how to add directors and shareholders, when a holding company makes sense, and how to plan for the next stage.",
    cta: {
      heading: "Before you hire or restructure, model the tax",
      body: "Associated company rules, employer National Insurance, share classes and R&D eligibility all move together. We run them on your figures before you commit.",
      button: "Book a growth structure call",
    },
    categories: ["R&D Tax Credits", "Incorporation and Structure"],
    titleKeywords: [
      "hiring",
      "holding company",
      "alphabet share",
      "growth",
      "restructur",
      "r&d",
      "scaling",
      "associated compan",
    ],
  },
  "exiting-a-business": {
    slug: "exiting-a-business",
    name: "Exiting a business",
    keywords: "Sell. Wind down. Hand over.",
    summary:
      "BADR planning, MVL vs strike-off, earn-out structures, due diligence prep. The 12 to 24 months before exit are where the tax saving happens.",
    intro: "You are selling, winding down, or planning an exit in the next two years.",
    longIntro:
      "BADR planning, MVL against strike-off, earn-out structures, goodwill valuation and due diligence preparation. The decisions you make 12 to 24 months before exit are where the real tax saving, or loss, happens.",
    cta: {
      heading: "The 12 to 24 months before exit is where the saving is",
      body: "BADR qualification, MVL against strike-off, earn-outs and the timing of it all. Start early enough and the structure is still yours to choose.",
      button: "Book an exit planning call",
    },
    categories: ["Exit and Capital Gains"],
    titleKeywords: [
      "badr",
      "exit",
      "selling",
      "mvl",
      "members voluntary",
      "earn-out",
      "goodwill",
      "due diligence",
      "close a limited",
    ],
  },
};

export const BLOG_STAGE_LIST: BlogStage[] = Object.values(BLOG_STAGES);

export function postMatchesStage(post: BlogPost, stage: BlogStage): boolean {
  if (stage.categories.includes(post.category)) return true;
  if (stage.titleKeywords) {
    const t = (post.title + " " + post.summary).toLowerCase();
    if (stage.titleKeywords.some((k) => t.includes(k))) return true;
  }
  return false;
}
