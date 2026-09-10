import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Users, MapPin, CalendarClock, Compass, Check } from "lucide-react";
import { siteContainerLg, btnPrimary } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { NumberedReasons } from "@accounting-network/web-shared/design/marketing/NumberedReasons";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { JsonLd, buildOrganization, buildBreadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: `About`,
  description: `${siteConfig.name} serves UK limited companies, sole traders, contractors and partnerships. National coverage, fixed fees, plain-English advice.`,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: "Accountants for UK businesses of every shape.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

const principles = [
  {
    title: "Compliance is table stakes.",
    body: "Filing year-end accounts on time is the floor, not the ceiling. The work that pays for itself is the advisory that sits on top: pay structures, scheme selection, capital allowances, R&D claims, succession planning, exit timing. We bill for that work, not for filing.",
  },
  {
    title: "Technical standards, plainly.",
    body: "Every answer we give is traceable to a primary source: HMRC guidance, Companies House rules, or the relevant statute. One named accountant on every file means the reasoning doesn’t get diluted through handoffs or junior routing.",
  },
  {
    title: "One named accountant.",
    body: "You speak to the same accountant every time. No call-centre routing, no junior handoffs. Fixed fees agreed up front in writing, no surprises, no hourly billing on questions.",
  },
  {
    title: "Cloud-first, country-wide.",
    body: "Xero, FreeAgent or QuickBooks depending on what you already use. Everything else runs on email and scheduled calls. Local presence has stopped mattering for accounting; competence and responsiveness haven’t.",
  },
];

/** Quick facts. Bodies are nodes, not strings, so two of them can carry a real
 *  cross-link: the port removes the two closing buttons that used to be this
 *  page's only outbound routes. */
const quickFacts: { label: string; icon: typeof Users; body: ReactNode }[] = [
  {
    label: "Who",
    icon: Users,
    body: (
      <>
        Limited company directors, contractors and freelancers, sole traders, and partnerships
        across every UK sector. <InlineLink href="/services">See what we cover</InlineLink>.
      </>
    ),
  },
  {
    label: "Where",
    icon: MapPin,
    body: (
      <>
        Nationwide. Cloud-first delivery means London, Leeds, Glasgow and Bristol clients get the
        same response time.
      </>
    ),
  },
  {
    label: "How",
    icon: CalendarClock,
    body: (
      <>
        Annual cycle of bookkeeping handover, quarterly VAT where relevant, monthly payroll,
        year-end, plus a planning conversation that sits outside the compliance cycle.
      </>
    ),
  },
  {
    label: "Why",
    icon: Compass,
    body: (
      <>
        Most UK firms compete on price. The ones worth hiring compete on the cost of the advice you
        didn’t get.
      </>
    ),
  },
];

/** The editorial-standards prose block, now three ruled claims. Same three
 *  paragraphs, each given a title so a reader can take one at a time. */
const editorialStandards: { title: string; body: ReactNode }[] = [
  {
    title: "Every figure is dated and sourced",
    body: (
      <>
        Every figure on this site uses 2026/27 UK tax rates and is traceable to a primary source:
        HMRC, Companies House, or the relevant statute. Where rates are scheduled to change, we say
        so and date the change.
      </>
    ),
  },
  {
    title: "Articles are editorial, not advice",
    body: (
      <>
        They explain mechanics; they don’t apply them to your specific circumstances. For advice
        that fits, book a call. There’s no pitch and no obligation; if we’re not a fit we’ll say so
        quickly.
      </>
    ),
  },
  {
    title: "Corrections are welcome",
    body: (
      <>
        Found a mistake, an out-of-date figure or an unclear paragraph?{" "}
        <InlineLink href="/contact">Contact the editorial team</InlineLink> and we’ll fix it.
      </>
    ),
  },
];

export default function AboutPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "About" }];

  return (
    <>
      <JsonLd data={[buildOrganization(), buildBreadcrumb(crumbs)]} />

      {/* Hero. Navy, not cream: the brand accent in the h1 measured 2.68:1 on
          the old cream ground and failed AA outright. On slate-900 the same
          accent at the 400 step clears it comfortably. */}
      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb siteUrl={siteConfig.url} onDark items={crumbs} />
            <Eyebrow onDark>About</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-6xl">
              A modern firm, <span className="text-primary-400">technically rigorous.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:mt-6 sm:text-lg">
              {siteConfig.name} works with UK business owners across every sector. We cover the four
              trading structures (limited company, sole trader, contractor, partnership), with the
              depth a specialist firm would bring and the responsiveness an in-house team would
              expect.
            </p>
            {/* The page's first ask used to be at the very foot, and both of the
                buttons there sent the reader somewhere else to start. */}
            <div className="mt-6 sm:mt-8">
              <Link href="#book" data-cta="about_hero_book" data-cta-placement="hero" className={btnPrimary}>
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Four operating principles.
            </h2>
          </div>
          <NumberedReasons items={principles} />
        </div>
      </section>

      {/* Quick facts. Was a full-bleed neutral-900 band whose only job was
          decoration; it broke the light/dark oscillation and put the accent
          label on a second, different dark ground. Light icon cards instead. */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>In short</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Who, where, how, why.</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((item) => (
              <div key={item.label} className="rounded-xl bg-white p-6 ring-1 ring-slate-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <item.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary-700">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial standards */}
      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Editorial</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">On what you read here.</h2>
          </div>
          <ul className="mt-8 sm:mt-12">
            {editorialStandards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 border-t border-slate-200 py-6 last:border-b sm:flex-row sm:gap-6 sm:py-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <Check aria-hidden className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="sm:grid sm:flex-1 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:mt-0 sm:text-base">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing ask. Contained rather than navy: the footer is slate-900 and
          navy must never touch navy. Ground flipped to slate because the
          section above it is white. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          title="Have a short call with an accountant."
          description="Tell us where the business sits today. We’ll come back with a plain note on what the engagement would look like and what it would cost."
          proofPoints={[
            { title: "One named accountant", detail: "The same person every time you call" },
            { title: "Fixed fees agreed up front", detail: "In writing, before any work starts" },
            {
              title: "Technical answers traceable to source",
              detail: "HMRC guidance, Companies House rules, or the statute",
            },
          ]}
          form={<LeadForm submitLabel="Request callback" redirectOnSuccess={false} />}
          contained
          ground="slate"
          footnote="No obligation and no hard sell. If your position is already right, we will say so."
        />
      </div>
    </>
  );
}
