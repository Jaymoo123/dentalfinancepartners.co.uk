import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { btnPrimary, linkArrow, siteContainerLg } from "@/components/ui/layout-utils";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { PromptMarquee } from "@accounting-network/web-shared/design/marketing/PromptMarquee";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { HOME_PROMPTS } from "@/lib/home-prompts";

/**
 * The homepage body bands, lifted out of app/page.tsx so the page file is the
 * running order and nothing else. Copy is the existing homepage copy verbatim;
 * only the structure and the tokens change (F.2 in
 * docs/generalist/_port/DISPOSITION_SLICE1.md §B).
 *
 * `HomeProblemStatement` is a local mirror of the kit's `ProblemStatement`
 * rather than a call to it: the kit component hardcodes Property's landlord
 * copy ("Your rent went up. Your profit didn't.") with no copy props, and
 * web-shared is a manager-direct carve-out this package may not edit. Layout,
 * grounds and the marquee slot position are the kit component's, line for line,
 * so it can be swapped for the kit call the moment that file takes copy props.
 */

// Who we help, mapped to the lead-form segments, each linking to its pillar.
const segments = [
  {
    title: "Limited companies",
    body: "Statutory accounts, the CT600 corporation tax return, and the salary-versus-dividend split modelled to each director's personal position.",
    href: "/fundamentals/definitive-guide-limited-company-accountant",
    linkLabel: "Limited company accounting",
  },
  {
    title: "Sole traders",
    body: "Self assessment done properly, every expense you are entitled to claim, and a clear view of when incorporating starts to pay.",
    href: "/fundamentals/definitive-guide-sole-trader-accountant",
    linkLabel: "Sole trader accounting",
  },
  {
    title: "Contractors and freelancers",
    body: "IR35 status reviewed, the most efficient way to draw income, and the admin kept light so you can get on with billing.",
    href: "/fundamentals/definitive-guide-choosing-contractor-accountant-uk",
    linkLabel: "Contractor accounting",
  },
  {
    title: "Partnerships and LLPs",
    body: "Partnership returns, profit-share allocation, and each partner's self assessment, all handled together so the figures reconcile.",
    href: "/fundamentals/small-business-accountant-guide",
    linkLabel: "Small business guide",
  },
  {
    title: "Just starting out",
    body: "Sole trader or limited company, when to register for VAT, and the first-year decisions that are expensive to undo later.",
    href: "/fundamentals/limited-company-vs-sole-trader",
    linkLabel: "Sole trader vs limited company",
  },
];

// Trade and industry guides. The head-family demand is heavily trade-flavoured
// ("plumbers accountant", "vet accountant", "accountant for cis contractors")
// and lands on these blog pages at positions 11-35. The homepage names the
// trades it serves and passes equity down; the guides carry the depth.
const tradeGuides = [
  { label: "Plumbers and heating engineers", href: "/blog/sole-trader-and-self-employment/accountant-for-plumbers-uk" },
  { label: "Construction subcontractors (CIS)", href: "/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis" },
  { label: "Vets and veterinary practices", href: "/blog/limited-company-tax/accountant-for-vets-uk" },
  { label: "Dentists", href: "/blog/limited-company-tax/accountants-for-dentists" },
  { label: "Forex and day traders", href: "/blog/sole-trader-and-self-employment/accountant-for-forex-traders-uk" },
  { label: "Photographers", href: "/blog/sole-trader-and-self-employment/accountant-for-photographers-uk" },
];

// What we handle: entity coverage with an internal pillar link and an
// external HMRC / Companies House authority link per line.
const coverage = [
  {
    title: "Corporation tax and year-end accounts",
    body: "Statutory accounts and CT600 filing, with marginal relief modelled across the £50,000 to £250,000 band and the 19% small profits rate applied where it fits.",
    pillar: { href: "/fundamentals/how-does-corporation-tax-work", label: "How corporation tax works" },
    authority: {
      href: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual",
      label: "HMRC Company Taxation Manual",
    },
  },
  {
    title: "VAT and Making Tax Digital",
    body: "Registration timing against the £90,000 threshold, scheme selection (Standard, Flat Rate, Cash, Annual) and the quarterly Making Tax Digital discipline.",
    pillar: { href: "/fundamentals/vat-accountant", label: "When to register for VAT" },
    authority: { href: "https://www.gov.uk/vat-registration", label: "gov.uk VAT registration" },
  },
  {
    title: "Payroll, PAYE and pensions",
    body: "Monthly payroll, RTI submissions, employer National Insurance, salary-sacrifice schemes and workplace pension auto-enrolment.",
    pillar: { href: "/services", label: "Payroll services" },
    authority: { href: "https://www.gov.uk/paye-for-employers", label: "HMRC PAYE for employers" },
  },
  {
    title: "Self assessment and MTD for Income Tax",
    body: "Self assessment for sole traders, partners and directors, with Making Tax Digital for Income Tax phasing in from April 2026 for the self-employed and landlords over the income threshold.",
    pillar: { href: "/fundamentals/making-tax-digital-for-income-tax-guide", label: "MTD for Income Tax guide" },
    authority: {
      href: "https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax",
      label: "gov.uk MTD sign-up checker",
    },
  },
  {
    title: "R&D tax credits",
    body: "Merged-scheme R&D claims with the qualifying-activity narrative written in-house, costs eligibility reviewed, and enhanced support applied where the loss-making intensive route qualifies.",
    pillar: { href: "/fundamentals/r-and-d-tax-credits-explained", label: "R&D tax credits explained" },
    authority: {
      href: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual",
      label: "HMRC R&D (CIRD) manual",
    },
  },
  {
    title: "Companies House and exit planning",
    body: "Confirmation statements and annual accounts filed on time, plus Business Asset Disposal Relief planning (18% from April 2026, £1m lifetime limit) when it is time to sell or wind down.",
    pillar: { href: "/services", label: "All services" },
    authority: { href: "https://www.gov.uk/file-your-company-annual-accounts", label: "Companies House filing" },
  },
];

// Sole trader vs limited company at a glance (the decision element competitors carry).
// Geometry is the kit `ComparisonTable` (SLICE1 B.11): card shadow, a scroll table above
// md and the same rows stacked below it, with the limited-company side primary-edged so
// the column reads as one block. The kit's "Most recommended" pill is deliberately NOT
// ported: this page's own FAQ refuses to declare one structure the winner.
const OUR_COLUMN = "border-l border-primary-200 bg-primary-50/60";
const COMPARISON_CARD =
  "overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]";

const decisionRows = [
  {
    label: "Setting up",
    soleTrader: "Register for self assessment with HMRC. Minimal admin.",
    limited: "Incorporate at Companies House, then register for corporation tax.",
  },
  {
    label: "How profit is taxed",
    soleTrader: "Income tax plus Class 4 National Insurance on all profit.",
    limited: "Corporation tax (19% to 25%), then tax on the salary and dividends you draw.",
  },
  {
    label: "Public filing",
    soleTrader: "Your accounts stay private.",
    limited: "Accounts and directors sit on the public Companies House register.",
  },
  {
    label: "Best when",
    soleTrader: "Profits are modest and you want simplicity.",
    limited: "Profits are rising, you reinvest, or you want limited liability.",
  },
];

/**
 * Self-identification band: the reader's own position, before any claim about
 * us. Structure is the kit `ProblemStatement` (slate-50 section, two columns,
 * marquee on the right); the copy is generalist's.
 */
export function HomeProblemStatement() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Sound familiar?</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 text-balance sm:text-4xl">
              You are running the business. The tax side is running on guesswork.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
              Structure, director pay, VAT timing and payroll are all decisions with right
              answers. Most owners never get told what theirs are, because filing the return
              is where a lot of accountants stop.
            </p>
            <p className="mt-6 text-base font-bold leading-relaxed text-slate-900 text-balance sm:text-lg">
              If two or more of these sound like you, nothing has gone wrong. You are just
              guessing at questions somebody should have answered for you.
            </p>
            <Link
              href="#book"
              data-cta="problem_book"
              data-cta-placement="problem_statement"
              data-cta-goal="form"
              className={`${btnPrimary} mt-6 w-full sm:mt-8 sm:w-auto`}
            >
              Book a free call
            </Link>
          </div>

          <PromptMarquee prompts={HOME_PROMPTS} />
        </div>
      </div>
    </section>
  );
}

/** Who we are: the structures we act for, and the standard we work to. */
export function WhoWeAreSection() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className={siteContainerLg}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              A small business accountant for every UK structure
            </h2>
            <Prose>
              <p>
                A good small business accountant does more than file your accounts. We handle
                the full year for UK limited companies, sole traders, contractors and
                partnerships: the compliance that has to be right, and the planning that
                decides how much tax you actually pay.
              </p>
              <p>
                Most UK firms compete on price. The ones worth hiring compete on the cost of
                the advice you did <em>not</em> get. We work to the second standard.
              </p>
              <p>
                Accountants across the UK.{" "}
                <Link
                  href="/locations"
                  className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                >
                  Find your area
                </Link>{" "}
                or{" "}
                <Link
                  href="/accountant-near-me"
                  className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                >
                  search accountants near you
                </Link>
                .
              </p>
            </Prose>
          </div>
          <DrawnTickList
            items={segments.map((seg) => seg.title)}
            tickClassName="text-primary-600"
            className="space-y-4 text-base font-semibold text-slate-900 sm:text-lg"
          />
        </div>
      </div>
    </section>
  );
}

/** Why owners choose a fixed fee, and what the fee actually covers. */
export function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Why UK business owners choose a fixed-fee accountant
            </h2>
          </div>
          <Prose>
            <p>
              We quote a fixed fee in writing after a short discovery call, based on what the
              work actually involves: turnover, payroll size, VAT scheme, number of directors,
              and whether you need management accounts as well as year-end. Nothing is added
              without your sign-off.
            </p>
            <p>
              You can ask questions through the year without watching a clock, because we do
              not bill by the hour. The engagement letter is plain English, and you can leave
              with reasonable notice. One-off projects outside the agreed scope are always
              quoted before any work starts.
            </p>
            <p>
              Wondering what accountants charge across the market?{" "}
              <Link
                href="/blog/bookkeeping-and-compliance/accounting-fee-2025-26-uk-business-guide"
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Read our guide to UK accountancy fees for 2025/26
              </Link>
              .
            </p>
          </Prose>
        </div>
      </div>
    </section>
  );
}

/**
 * What we cover: the year-round scope, who it is for, and the one decision
 * most owners arrive with (sole trader against limited company).
 */
export function WhatWeCoverSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <div className="mb-8 max-w-3xl sm:mb-12">
          <Eyebrow>What we cover</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            What we handle across the year
          </h2>
          <Prose>
            <p>
              Compliance is the floor, not the service. The work that pays for itself is the
              advice that sits on top: the right VAT scheme, a sensible pay structure, an
              R&amp;D claim that holds up, a disposal timed for relief.
            </p>
          </Prose>
        </div>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {coverage.map((c) => (
            <li key={c.title} className="py-6 sm:py-8">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{c.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {c.body}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <Link
                  href={c.pillar.href}
                  className="font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-800"
                >
                  {c.pillar.label}
                </Link>
                <span className="text-slate-300" aria-hidden>
                  ·
                </span>
                <a
                  href={c.authority.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 underline underline-offset-4 hover:text-slate-700"
                >
                  {c.authority.label}
                </a>
              </p>
            </li>
          ))}
        </ul>

        {/* Who we help: the same scope read by structure rather than by task. */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">Who we help</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {segments.map((seg) => (
              <li key={seg.title} className="rounded-xl bg-slate-50 p-5 sm:p-6">
                <h4 className="text-base font-bold text-slate-900">{seg.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{seg.body}</p>
                <Link href={seg.href} className={`${linkArrow} mt-3`}>
                  {seg.linkLabel}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Accountants by trade and industry. */}
        <div className="mt-10 border-t border-slate-200 pt-8">
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
            Accountants by trade and industry
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Every trade has its own tax quirks: CIS deductions for subcontractors, equipment
            allowances for photographers, badges of trade for forex traders. We publish
            dedicated guides for the industries we work with most.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {tradeGuides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="font-semibold text-primary-700 hover:text-primary-800"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The decision most owners arrive with. */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
            Sole trader or limited company?
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            The structure you trade under changes how much tax you pay, what you file
            publicly, and how protected you are personally. The short version:
          </p>
          <div className={`mt-6 hidden md:block ${COMPARISON_CARD}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Sole trader compared with limited company
                </caption>
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="px-5 py-4">
                      <span className="sr-only">Area</span>
                    </th>
                    <th scope="col" className="px-5 py-4 align-bottom">
                      <span className="flex items-start gap-2">
                        <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2.5} />
                        <span className="text-sm font-bold text-slate-700">Sole trader</span>
                      </span>
                    </th>
                    <th scope="col" className={`px-5 py-4 align-bottom ${OUR_COLUMN}`}>
                      <span className="flex items-start gap-2">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={2.5} />
                        <span className="text-sm font-bold text-primary-900">Limited company</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {decisionRows.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
                      <th scope="row" className="px-5 py-4 text-left align-top font-bold text-slate-900">
                        {row.label}
                      </th>
                      <td className="px-5 py-4 align-top leading-relaxed text-slate-600">
                        <span className="flex gap-2">
                          <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2.5} />
                          <span>{row.soleTrader}</span>
                        </span>
                      </td>
                      <td className={`px-5 py-4 align-top font-semibold leading-relaxed text-slate-900 ${OUR_COLUMN}`}>
                        <span className="flex gap-2">
                          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={3} />
                          <span>{row.limited}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Below md the table would be a sideways scroll, so the same rows stack. */}
          <div className={`mt-6 md:hidden ${COMPARISON_CARD}`}>
            <ul className="divide-y divide-slate-100">
              {decisionRows.map((row) => (
                <li key={row.label} className="px-5 py-5">
                  <p className="text-sm font-bold text-slate-900">{row.label}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2.5} />
                      <span className="text-sm leading-relaxed text-slate-600">
                        <span className="font-semibold text-slate-500">Sole trader: </span>
                        {row.soleTrader}
                      </span>
                    </div>
                    <div className={`flex items-start gap-2 px-3 py-2 ${OUR_COLUMN}`}>
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={3} />
                      <span className="text-sm font-semibold leading-relaxed text-slate-900">
                        <span className="font-bold text-primary-800">Limited company: </span>
                        {row.limited}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ExampleFigureNote className="mt-3" />
          <Link href="/fundamentals/limited-company-vs-sole-trader" className={`${linkArrow} mt-4`}>
            Read the full comparison
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
