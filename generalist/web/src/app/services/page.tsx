import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  siteContainerLg,
  btnPrimary,
  btnOnCream,
  heroCreamSurface,
  linkArrow,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd, buildService, buildFaqPage } from "@/lib/schema";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { DrawnTickList } from "@accounting-network/web-shared/design/marketing/DrawnTickList";
import { ProcessTimeline } from "@accounting-network/web-shared/design/marketing/ProcessTimeline";
import {
  StatsCounter,
  type StatItem,
} from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { SERVICE_LINES } from "@/lib/service-lines";

export const metadata: Metadata = {
  // Brand-less title: the layout template appends " | Holloway Davies" once.
  title: `Small Business Accounting Services`,
  description: `Accounting, tax and advisory for UK small businesses: corporation tax, VAT, payroll, self assessment, R&D credits and exit planning. Fixed fees, one named accountant.`,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: `Small Business Accounting Services | ${siteConfig.name}`,
    description: "Accounting, tax and advisory for UK small businesses. Fixed fees, one named accountant.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

/**
 * `siteStats` is the shared StatsBar shape (icon + a pre-formatted string) and
 * has fourteen other consumers estate-wide, so the mapping to the kit counter's
 * numeric shape happens here rather than in the config. Splitting "24h" into
 * 24 + "h" keeps the two surfaces reading from one source instead of a second
 * hand-typed copy of the same four numbers.
 */
const HERO_STATS: StatItem[] = siteStats.map(({ value, label }) => {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return { target: 0, suffix: value, label };
  const [, digits, suffix] = match;
  const decimals = digits.split(".")[1]?.length ?? 0;
  return { target: Number(digits), decimals, suffix, label };
});

/** Verbatim from the pre-port "What's in every engagement" band. */
const INCLUDED = [
  "Fixed fees. Quoted in writing before engagement starts. No hourly billing on questions; no year-end surprises.",
  "Named accountant. One accountant on the engagement, consistent throughout. No call-centre routing.",
  "Cloud-first. Xero, FreeAgent or QuickBooks depending on what you use. We meet your stack, not the other way round.",
  "24-hour reply. Questions answered within one working day, usually same day. Office hours, not a 9-to-5 portal.",
];

/**
 * The real engagement sequence, authored for the port. Deliberately no
 * turnaround promises beyond the reply window the site already commits to, and
 * no client counts.
 */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "Introductory call",
    body: "A short call to understand the business as it actually runs: structure, turnover, VAT position, whether there is payroll, and who takes money out and how. Nothing to prepare and no documents needed at this stage.",
  },
  {
    n: "02",
    title: "Scope and fixed fee in writing",
    body: "We set out which service lines you need, what each one covers over the year, and what it costs. You get that in writing before anything starts, and nothing begins until you have agreed it.",
  },
  {
    n: "03",
    title: "Engagement, identity checks and authorisation",
    body: "Signed engagement letter, anti-money-laundering identity checks, HMRC agent authorisation for each tax we are taking on, and professional clearance from your outgoing accountant if you have one.",
  },
  {
    n: "04",
    title: "Records handover and software",
    body: "We take over your Xero, FreeAgent or QuickBooks file, or set one up, agree the chart of accounts, reconcile the opening balances against the last filed accounts, and confirm every filing date already in the diary.",
  },
  {
    n: "05",
    title: "The trading year",
    body: "VAT returns on the quarter, payroll and RTI on the payroll dates, and questions answered as they come up rather than banked until year end. Decisions get made while they can still change the outcome.",
  },
  {
    n: "06",
    title: "Year end, then the planning conversation",
    body: "Statutory accounts, the corporation tax computation and the personal returns that go with them. Before the next year closes we go back over pay, pension and timing while there is still time to act on it.",
  },
];

/**
 * Authored for the port. Every figure is checked against
 * docs/generalist/house_positions.md; anything not in there is written around
 * rather than guessed.
 */
const FAQS = [
  {
    question: "When does my business have to register for VAT?",
    answer:
      "You must register when your taxable turnover exceeds £90,000 in any rolling 12-month period, or when you expect to exceed £90,000 in the next 30 days on its own. It is a rolling test, not a test on your accounting year, which is why businesses miss it. You can also register voluntarily below the threshold to reclaim input VAT, and the deregistration threshold is £88,000.",
  },
  {
    question: "Should I trade as a sole trader or a limited company?",
    answer:
      "It depends on profit level, how much you need to draw, and what you want the business to look like in a few years. A company pays corporation tax at 19% on profits up to £50,000 and 25% above £250,000, with marginal relief tapering the rate between the two, while a sole trader pays income tax and Class 4 National Insurance on the whole profit. Incorporation also brings filing obligations and, where property or goodwill moves across, its own tax cost. We model both on your actual figures rather than a rule of thumb.",
  },
  {
    question: "When does Making Tax Digital for Income Tax apply to me?",
    answer:
      "Qualifying income above £50,000 brings you in from 6 April 2026, above £30,000 from 6 April 2027, and above £20,000 from 6 April 2028. The test looks at your gross self-employment and property income on an earlier year's return, so the year you are assessed on has usually already been filed by the time you are told.",
  },
  {
    question: "What are the self assessment deadlines?",
    answer:
      "Register by 5 October following the end of your first tax year of trading. A paper return is due by 31 October and an online return by 31 January, with the balancing payment due on the same 31 January date. Payments on account, where they apply, fall on 31 January and 31 July, which is why a first full year often lands as a larger bill than people expect.",
  },
  {
    question: "How are company directors usually paid?",
    answer:
      "Normally a mix of salary and dividends, set once a year and revisited when thresholds move. For 2026/27 the dividend allowance is £500 and dividends are taxed at 10.75%, 35.75% and 39.35% across the ordinary, upper and additional rates, on top of the corporation tax the company has already paid on the same profit. Pension contributions made by the company are often the part that gets left on the table.",
  },
  {
    question: "Can I switch accountants part-way through the year?",
    answer:
      "Yes, and there is a set process for it. We write to your current accountant for professional clearance and the handover records, take fresh HMRC agent authorisation for each tax, and reconcile the opening balances against the last set of filed accounts so nothing carries over unchecked. You do not need to wait for a year end.",
  },
  {
    question: "What does R&D tax relief look like now?",
    answer:
      "Claims for accounting periods beginning on or after 1 April 2024 go through the merged scheme, with the enhanced support route (ERIS) available to loss-making, R&D-intensive companies. The work is in the evidence rather than the arithmetic: the qualifying activity has to be described against the technological uncertainty it resolved, and it has to survive an enquiry.",
  },
  {
    question: "What do you need from me to give a quote?",
    answer:
      "The structure, roughly what the business turns over, whether you are VAT registered, whether you run payroll and for how many people, and which software the records sit in. That is enough for a fixed fee in writing. Anything unusual, such as a group, a property held in the company or an overseas element, we will ask about on the call.",
  },
];

export default function ServicesPage() {
  const serviceSchema = buildService({
    name: "Accounting and tax services for UK small businesses",
    description:
      "Year-end accounts and corporation tax, VAT and Making Tax Digital, payroll, director pay planning, R&D tax credits, incorporation, self assessment and exit planning for UK small businesses.",
    url: "/services",
    serviceType: "Small business accounting and tax advice",
    areaServed: "United Kingdom",
    hasOfferCatalog: {
      name: "Service lines",
      items: SERVICE_LINES.map((s) => s.title),
    },
  });
  // BreadcrumbList is emitted by the kit <Breadcrumb> in the hero.
  // FAQPage is built from the same FAQS binding handed to <FaqSection mountAnswers>, so the
  // rendered questions and the structured data cannot drift.
  const faqSchema = buildFaqPage(FAQS);

  return (
    <>
      <JsonLd data={faqSchema ? [serviceSchema, faqSchema] : [serviceSchema]} />

      <section
        className={`relative flex min-h-[360px] items-center overflow-hidden py-10 sm:min-h-[420px] sm:py-12 lg:min-h-[440px] lg:py-14 ${heroCreamSurface}`}
      >
        <GeneralistBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              items={[{ label: "Home", href: "/" }, { label: "Services" }]}
            />
            <h1 className="text-2xl font-bold leading-tight text-slate-900 text-balance sm:text-4xl lg:text-6xl">
              The full <span className="text-primary-700">annual cycle.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:mt-6 sm:text-lg">
              Eight service lines covering everything a UK business needs across a
              trading year, from incorporation through annual filings to exit. One
              named accountant, fixed fee, plain English.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href="#book"
                data-cta="services_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free call
              </Link>
              <Link href="/calculators" className={btnOnCream}>
                Try the calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip directly under the hero: a break from the cream ground
          rather than a section of its own. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={HERO_STATS} />
        </div>
      </section>

      {/* Service lines */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>What the work covers</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            Eight service lines, one engagement
          </h2>
          <CoverageCards
            columns={2}
            tone="slate"
            items={SERVICE_LINES.map((s) => ({
              title: s.title,
              body: s.body,
              // The bullet list from the pre-port rows, kept verbatim and pinned
              // to the card foot where the kit puts the outcome line.
              outcome: s.bullets.join(" · "),
              icon: s.icon,
            }))}
          />

          <h3 className="mt-12 text-base font-bold text-slate-900 sm:text-lg">
            Model it before you ask us
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            One free calculator per service line, on 2026/27 rates. No sign-up.
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {SERVICE_LINES.map((s) => (
              <li key={s.calc.slug}>
                <Link href={`/calculators/${s.calc.slug}`} className={linkArrow}>
                  {s.calc.label}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tiers. No prices anywhere on this site; the tiers describe scope only. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>How we can help</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            From self-serve tools to a full annual engagement.
          </h2>
          <div className="mt-8 sm:mt-10">
            <ServiceTiers tiers={serviceTiers} featuredBadge="" />
          </div>
        </div>
      </section>

      {/* What's in every engagement */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>What&rsquo;s in every engagement</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            The same four things, whichever lines you take
          </h2>
          <DrawnTickList
            items={INCLUDED}
            tickClassName="text-primary-600"
            className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700 sm:mt-10 sm:text-base"
          />
        </div>
      </section>

      {/* How an engagement starts */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>How it starts</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            From first call to the first year end
          </h2>
          <Prose>
            <p>
              The same sequence whether you are incorporating this month or moving a
              ten-year-old company across. If you are looking for someone nearby, the{" "}
              <Link href="/accountant-near-me" className="font-semibold text-primary-700 underline underline-offset-2">
                accountant near me
              </Link>{" "}
              page explains how the remote engagement works, and{" "}
              <Link href="/locations" className="font-semibold text-primary-700 underline underline-offset-2">
                our locations
              </Link>{" "}
              lists the towns and cities we already work in.
            </p>
          </Prose>
          <ProcessTimeline steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* Deeper reading */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Read before you decide</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
            The detail behind the service lines
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
            <li>
              <Link href="/r-and-d-credits" className={linkArrow}>
                How R&amp;D tax credits work under the merged scheme
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href="/blog/incorporation-and-structure" className={linkArrow}>
                Incorporating: what it costs and what changes
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href="/guides" className={linkArrow}>
                Plain-English guides by trading structure
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href="/blog" className={linkArrow}>
                Latest on rates, thresholds and filing dates
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <FaqSection mountAnswers
        faqs={FAQS}
        eyebrow="Before you engage"
        title="Questions we get asked first"
        className="bg-slate-50 py-12 sm:py-16 lg:py-20"
        tone="white"
      />

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="A short call. A clear quote. No follow-up sequence."
          description="Tell us where the business sits today and which service lines you need. We come back with a fixed-fee quote and a short note on what the engagement would look like. No pitch deck, no obligation."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm redirectOnSuccess submitLabel="Request a quote" />}
          formTitle="Request a fixed-fee quote"
          footnote="One named accountant will reply within one working day."
          backdrop={<GeneralistBackdrop />}
        />
      </div>
    </>
  );
}
