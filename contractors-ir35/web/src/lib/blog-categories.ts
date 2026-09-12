/**
 * Per-category blog copy for Contractor Tax Accountants: the enquiry CTA and
 * the category hub definition, for each of the seven real categories.
 *
 * KEYED ON THE SLUG, never the frontmatter label. `slugifyCategory` in
 * `lib/blog.ts` is what both the /blog/[category] route and the article
 * renderer resolve with, so keying on the label would leave anything with a
 * case or "and"/"&" variation falling through to the generic fallback.
 *
 * The seven slugs below were derived from the frontmatter of all 62 posts,
 * not from `niche.config.json`. See docs/contractors-ir35/_port/P1_SITE_DATA.md
 * for the deriving commands and post counts.
 *
 * ONE binding for two consumers. The article closing panel and the hub CTA both
 * read `CTA_BY_CATEGORY`, so a hub can never advertise something different from
 * the articles sitting under it.
 *
 * COPY RULES this file is bound by, and the reasons:
 *   - no qualification, regulator or PII claim. This site makes none today and
 *     a test guards that;
 *   - no turnaround or response-time promise of any kind;
 *   - no published price for our own services;
 *   - no client counts, no testimonials, no "trusted by N";
 *   - no em-dashes, UK English;
 *   - first person "we do the work" voice, per the owner's positioning ruling
 *     of 2026-09-12;
 *   - any published figure must trace to docs/contractors-ir35/house_positions.md.
 *     None of this copy carries a figure, deliberately, so nothing here can go
 *     stale against a rate change.
 */

export type BlogCtaCopy = { heading: string; body: string; button: string };

export const CTA_BY_CATEGORY: Record<string, BlogCtaCopy> = {
  "ir35-status": {
    heading: "Want your IR35 status read properly?",
    body: "A status determination turns on the contract and on how the engagement actually runs, and those two rarely say the same thing. We read both, against substitution, control and mutuality, and put the position in writing so you have something to stand behind if it is ever questioned.",
    button: "Request an IR35 status review",
  },
  "umbrella-vs-limited-company": {
    heading: "Weighing up umbrella against your own company?",
    body: "The answer moves with your day rate, your expected contract length, how many of your engagements are caught by the off-payroll rules and how much admin you want. We run your actual numbers both ways rather than quoting a rule of thumb.",
    button: "Compare umbrella and limited",
  },
  "mtd-and-compliance": {
    heading: "Want your filing obligations mapped out?",
    body: "Making Tax Digital, the company filings and your own self assessment land on different dates and in different places, and a contractor running a company is on the hook for all of them. We set out what you owe, when, and what has to be kept digitally.",
    button: "Get your filing position checked",
  },
  "contractor-accounting-basics": {
    heading: "Setting up, or want a second look at how you are set up?",
    body: "Company, bank account, VAT, payroll, bookkeeping and the accountant: getting the order right at the start saves unpicking it later. We do the setup work and explain what each piece is actually for.",
    button: "Talk through your setup",
  },
  "limited-company-tax": {
    heading: "Want the company side handled?",
    body: "Corporation tax, the year-end accounts, the director payroll and what you can take out are one decision, not four. We prepare and file them together, so the tax you pay is the result of a plan rather than of whatever the deadline forced.",
    button: "Request a company tax review",
  },
  "pension-and-dividends": {
    heading: "Deciding what to take out and what to leave in?",
    body: "Salary, dividends and employer pension contributions come out of the same pot and are taxed in completely different ways. We model the split against your own profits so you can see what each pound costs before you move it.",
    button: "Model your salary and dividends",
  },
  "expenses-and-deductions": {
    heading: "Not sure what you can actually claim?",
    body: "Travel, the home office, equipment, training and the 24-month rule are where contractor claims get overstated and where they get missed entirely. We go through your spending and tell you which side of the line each item falls, with the reasoning.",
    button: "Get your expenses reviewed",
  },
  general: {
    heading: "Want to talk to a contractor accountant?",
    body: "Whatever you are weighing up, from a new contract to how you are paying yourself, get it read by someone who works with contractors and PSC directors every day. No obligation.",
    button: "Book a consultation",
  },
};

/** The map, with the caller's generic copy as the fallback for an unmapped slug. */
export function ctaCopyForCategory(
  categorySlug: string,
  fallback: BlogCtaCopy = CTA_BY_CATEGORY.general,
): BlogCtaCopy {
  return CTA_BY_CATEGORY[categorySlug] ?? fallback;
}

/**
 * What each /blog/<category> hub is for.
 *
 * `heading` is the visible h1. `description` is the meta description and the
 * standfirst. `intent` is the reader state the hub is written for, and
 * `belongs` is the editorial boundary: what goes on this hub and, by omission,
 * what belongs on a neighbouring one. `belongs` is editorial guidance for
 * whoever files the next post, not rendered copy.
 */
export type CategoryHub = {
  heading: string;
  description: string;
  intro: string;
  intent: string;
  belongs: string[];
};

export const CATEGORY_HUBS: Record<string, CategoryHub> = {
  "ir35-status": {
    heading: "IR35 status and the off-payroll rules",
    description:
      "How IR35 status is decided for UK contractors: substitution, control and mutuality, status determination statements, CEST, and what to do when a client gets your determination wrong.",
    intro:
      "The largest section on this site, because status is the decision every other one depends on. These guides cover how the three tests are actually applied, what a status determination statement has to contain, how to challenge one you disagree with, and where the liability sits when a determination turns out to be wrong.",
    intent:
      "A contractor who has been handed a determination, is about to sign a contract, or wants to know how exposed the last few years look.",
    belongs: [
      "the three status tests and the case law behind them",
      "status determination statements, client-led disputes and the appeal route",
      "CEST, its limits and what to keep alongside it",
      "who carries the liability in a public or private sector chain",
      "evidence and working practices worth recording while a contract runs",
    ],
  },
  "umbrella-vs-limited-company": {
    heading: "Umbrella or limited company",
    description:
      "Choosing between an umbrella company and your own limited company as a UK contractor: what each costs you, how take-home compares, and how to move between them without leaving a mess.",
    intro:
      "The second largest section, and the question most contractors arrive with. These guides compare the two routes on take-home, on admin, on what happens when a contract is caught by the off-payroll rules, and on how to switch, including what to do with a company you are no longer using.",
    intent:
      "A contractor choosing a trading route for a new contract, or already in one and wondering whether the other would suit them better.",
    belongs: [
      "take-home comparisons between umbrella and limited on the same day rate",
      "how to read an umbrella company and its deductions",
      "switching in either direction, and the timing of it",
      "what to do with a limited company you have stopped using",
      "why an inside-IR35 contract changes the comparison",
    ],
  },
  "mtd-and-compliance": {
    heading: "Making Tax Digital and contractor compliance",
    description:
      "Making Tax Digital, self assessment, VAT and Companies House obligations for UK contractors: what has to be filed, what has to be kept digitally, and where the penalties come from.",
    intro:
      "Running through a company means filing in three places, and the rules on how records are kept have changed under Making Tax Digital. These guides set out what is required, when each thing is due, and the compliance corners that catch contractors who are otherwise trading perfectly well.",
    intent:
      "A contractor who needs to know what they are obliged to file and keep, and what the consequence is of getting it wrong.",
    belongs: [
      "Making Tax Digital scope, thresholds and digital record keeping",
      "self assessment for directors and what has to go on the return",
      "VAT registration, schemes and deregistration for contractors",
      "Companies House filings and confirmation statements",
      "penalties, late filing and how the points work",
    ],
  },
  "contractor-accounting-basics": {
    heading: "Contractor accounting basics",
    description:
      "The groundwork of contracting through a limited company: setting the company up, choosing an accountant, opening the right accounts, and the paperwork of the first year.",
    intro:
      "Written for the first year, and for anyone who set things up quickly and never went back to check. These guides cover incorporation, what an accountant should be doing for you, how the money moves through the company, and the decisions worth getting right before they become habits.",
    intent:
      "A new or newly incorporated contractor working out how the machinery fits together.",
    belongs: [
      "incorporation and the first setup decisions",
      "what a contractor accountant does, and how to choose one",
      "business banking, bookkeeping and record keeping in practice",
      "the shape of the first trading year and its deadlines",
      "switching accountants and what should transfer with you",
    ],
  },
  "limited-company-tax": {
    heading: "Limited company tax for contractors",
    description:
      "Corporation tax, year-end accounts and the company side of contracting: how profit is taxed, what the accounts have to show, and how to close a company down properly.",
    intro:
      "Everything that happens inside the company rather than in your own hands. These guides cover how contractor profit is taxed, what the year-end accounts are doing, the reliefs a one-person company can genuinely use, and what closing the company down involves when the contracting stops.",
    intent:
      "A PSC director who wants to understand what the company owes and why, rather than just paying what the accountant sends.",
    belongs: [
      "corporation tax on contractor profit and how it is calculated",
      "year-end accounts and what they are for",
      "director loan accounts and drawings from the company",
      "reliefs and allowances a one-person company can actually use",
      "closing, striking off or selling the company",
    ],
  },
  "pension-and-dividends": {
    heading: "Pension and dividends",
    description:
      "Paying yourself from a contractor limited company: the salary and dividend split, dividend tax, and employer pension contributions from company profit.",
    intro:
      "How money gets from the company to you, and what each route costs. These guides cover the salary and dividend split, how dividends are taxed once they leave the company, and why an employer pension contribution is taxed differently from either. They are about the order of the decisions as much as the numbers.",
    intent:
      "A director deciding what to take now, what to leave in the company, and what to put into a pension.",
    belongs: [
      "the salary and dividend split and the reasoning behind it",
      "dividend tax, allowances and the paperwork of a lawful dividend",
      "employer pension contributions from the company",
      "timing extractions across tax years",
      "what to do with retained profit you are not drawing",
    ],
  },
  "expenses-and-deductions": {
    heading: "Contractor expenses and deductions",
    description:
      "What a UK contractor can and cannot claim: travel and the 24-month rule, working from home, equipment, training, and what happens under an umbrella.",
    intro:
      "The smallest section and the one with the most folklore attached to it. These guides set out where the line actually sits on travel, home working, equipment and training, why the 24-month rule catches longer engagements, and why the answer changes once a contract is inside IR35 or run through an umbrella.",
    intent:
      "A contractor deciding whether a specific cost is claimable, before they claim it rather than after.",
    belongs: [
      "travel and subsistence, and the 24-month rule",
      "working from home and the use of home as office",
      "equipment, software and capital items",
      "training, subscriptions and professional costs",
      "how the claimable set narrows inside IR35 or under an umbrella",
    ],
  },
};

/** The hub definition for a category slug, or undefined if it has no authored one. */
export function categoryHub(categorySlug: string): CategoryHub | undefined {
  return CATEGORY_HUBS[categorySlug];
}
