import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  btnPrimary,
  btnSecondary,
  focusRing,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ShieldCheck,
  Quote,
  FileCheck,
  Building2,
  Receipt,
  ClipboardList,
  BadgePoundSterling,
} from "lucide-react";
import { tradeTypes } from "@/data/trade-types";
import {
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { HeroOffer } from "@/components/intent/HeroOffer";
import { TradeBackdrop } from "@/components/layout/TradeBackdrop";
import {
  WhoWeAreSection,
  WhyChooseUsSection,
} from "@/components/marketing/MarketingSections";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { niche } from "@/config/niche-loader";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { getGenericTool } from "@/lib/calculators/registry";

const activeCta = getActiveCta(niche);
const packagesMode = isPackagesMode(niche);

export const metadata: Metadata = {
  title: "CIS Accountants & Construction Tax Specialists | UK",
  description:
    "Specialist CIS accountants for UK construction subcontractors and contractors. CIS tax refunds, gross payment status, sole trader and limited company accounting. Third-party reported averages put the annual refund for a registered CIS subcontractor at around £2,000 (illustrative, not guaranteed).",
  alternates: { canonical: siteConfig.url },
};

const testimonials = [
  {
    quote:
      "Three years filing my own returns and I never got the materials split right. First year with a proper CIS accountant and the refund was more than four times what I had been getting.",
    attribution: "Self-employed roofer, West Midlands",
  },
  {
    quote:
      "My contractor was taking 20% off the full invoice including materials. Once we split it out correctly and claimed the mileage, the refund was considerably larger than expected.",
    attribution: "Self-employed plumber, South East England",
  },
  {
    quote:
      "Applied for GPS on the advice of our accountant. No more 20% taken every month. The cash flow difference on a £500k-a-year turnover is enormous.",
    attribution: "Groundwork contractor, Yorkshire",
  },
];

const painPoints = [
  {
    title: "Overpaying on every job",
    body: "The 20% CIS deduction is taken before any expenses or allowances are considered. Materials, mileage, tools, PPE and van costs are never factored in at source. Most subcontractors are owed a meaningful refund at year end, but only if someone files the Self Assessment return correctly.",
  },
  {
    title: "Wrong deduction base",
    body: "CIS deductions apply to labour only. The cost of materials you supply is excluded. Many main contractors apply the 20% to the full invoice value rather than splitting out materials. When that happens you overpay on every single job and the difference is recoverable.",
  },
  {
    title: "Sole trader vs limited company",
    body: "Limited company subcontractors can reclaim CIS deductions in real time via the EPS process, rather than waiting for the annual Self Assessment return. At higher income levels the cash flow difference is significant. We model both structures for your situation.",
  },
  {
    title: "Gross payment status",
    body: "GPS means no CIS deduction at all. You receive the full payment and settle the tax yourself. To qualify you must pass three tests and, from April 2026, maintain strict due diligence to avoid immediate revocation. We handle the application and keep you compliant.",
  },
];

const servicesOverview = [
  {
    title: "CIS tax refunds",
    body: "We calculate the full refund you are owed, account for all allowable expenses, and submit your Self Assessment return.",
    href: "/cis-refund",
    Icon: BadgePoundSterling,
  },
  {
    title: "Gross payment status",
    body: "GPS eliminates the 20% deduction entirely. We manage the application, the three qualifying tests, and the ongoing compliance that keeps GPS active under the April 2026 rules.",
    href: "/gross-payment-status",
    Icon: ShieldCheck,
  },
  {
    title: "Sole trader Self Assessment",
    body: "Annual Self Assessment filed correctly, with every allowable expense claimed. No missed mileage, no unclaimed tools, no overpayment left on the table.",
    href: "/services",
    Icon: FileCheck,
  },
  {
    title: "Limited company CIS accounting",
    body: "EPS real-time reclaim of CIS deductions, Corporation Tax, annual accounts and Companies House filings for CIS-registered limited companies.",
    href: "/services",
    Icon: Building2,
  },
  {
    title: "CIS300 contractor returns",
    body: "Monthly CIS300 returns filed on time. From April 2026, nil returns are mandatory for months with no subcontractor payments. We handle every filing, including nil returns.",
    href: "/services",
    Icon: ClipboardList,
  },
  {
    title: "VAT and expenses",
    body: "VAT domestic reverse charge advice, MTD ITSA preparation, and a full review of allowable expenses: mileage at 55p per mile (from April 2026), tools, PPE and van costs.",
    href: "/services",
    Icon: Receipt,
  },
];

const comparisonRows = [
  { area: "CIS deduction base", detail: "Labour only, materials excluded (we verify every deduction slip)" },
  { area: "Self Assessment refund", detail: "All allowable expenses included, filed to maximise refund" },
  { area: "GPS application", detail: "Three-test assessment, application handled, compliance maintained" },
  { area: "EPS real-time reclaim (Ltd Co)", detail: "CIS suffered offset against PAYE/CIS liabilities each month" },
  { area: "Mileage (from April 2026)", detail: "55p per mile (first 10,000), 25p thereafter" },
  { area: "April 2026 nil returns", detail: "Filed for every inactive month, penalties avoided" },
  { area: "MTD ITSA", detail: "£50k gross income threshold from April 2026 (not net)" },
];

/**
 * The four homepage calculator cards (F.2 block 8).
 *
 * Read from the live registry by slug rather than re-listing names and paths,
 * so a renamed tool cannot leave a dead link here. `.filter(Boolean)` covers a
 * slug being retired from the registry: the band shrinks, it does not 500.
 *
 * ponytail: four literal server-rendered anchors, no tabs component and no
 * client JS. Property's CalculatorTabs is a client component and this band
 * needs to be four crawlable hrefs, nothing more.
 */
const featuredCalculatorSlugs = [
  "cis-refund-estimator",
  "cis-deduction-calculator",
  "cis-gps-eligibility-checker",
  "cis-sole-trader-vs-limited",
];

const faqs = [
  {
    question: "Do I need a CIS accountant?",
    answer:
      "Not strictly, but a specialist CIS accountant will identify overpayments a generalist misses. The materials split, mileage at the correct rate, capital allowances on tools and equipment, and the GPS application process all require specific knowledge of how CIS works.",
  },
  {
    question: "How do I claim back CIS deductions?",
    answer:
      "Sole traders claim CIS deductions back through the Self Assessment return after the tax year ends. You declare your gross CIS income, deduct all allowable expenses, and the tax you owe is set against the deductions already taken. If deductions exceed the liability, HMRC refunds the difference. Limited companies use the EPS process to reclaim in real time each month.",
  },
  {
    question: "What is the average CIS refund?",
    answer:
      "The average first-year CIS refund for a sole-trader subcontractor is around £2,000, though the figure varies considerably depending on income level, how much you spend on materials, and what other allowable expenses you have. This is a typical illustrative figure, not a guarantee for any individual.",
  },
  {
    question: "What is gross payment status?",
    answer:
      "GPS means a subcontractor is paid in full with no CIS deduction. To qualify you must pass three tests: a business test (UK construction work through a bank account), a turnover test (£30,000 net of materials for a sole trader), and a compliance test (no late tax returns or unpaid obligations in the past 12 months). From April 2026, GPS can be revoked immediately for fraud-related reasons and a 5-year reapplication ban applies.",
  },
];

export default function HomePage() {
  const calculators = featuredCalculatorSlugs
    .map((slug) => getGenericTool(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  // Three most recent articles. getAllPosts() is already sorted newest first.
  const recentPosts = getAllPosts()
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      summary: post.summary,
      category: post.category,
      slug: post.slug,
      categorySlug: getCategorySlug(post),
    }));

  return (
    <>
      {/* JSON-LD. Organization and WebSite are emitted site-wide by the layout;
          these three are the homepage's own. `faqs` feeds both this and the
          rendered FAQ below from ONE array (trap 17) -- never fork it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* No BreadcrumbList here. The homepage is the root: it renders no
          breadcrumb (aria-label="Breadcrumb" is absent on / and present on the
          other three phase 5 routes), and a one-item BreadcrumbList would
          describe a UI element the page does not have, which is trap 17. The
          other three routes keep theirs, emitted by <Breadcrumb> alongside the
          visible trail from the same items array. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildServiceJsonLd({
            name: "CIS accounting for construction subcontractors and contractors",
            description:
              "CIS tax refunds, gross payment status applications, Self Assessment, limited company CIS accounting and monthly CIS300 contractor returns.",
            url: siteConfig.url,
          }),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "AccountingService"],
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          areaServed: "United Kingdom",
          isPartOf: { "@type": "WebSite", url: siteConfig.url },
        }}
      />

      {/* 1. Hero. The hotlinked third-party stock photo that used to sit here was
          the LCP image on the front door and ~97% hidden under its own scrim.
          Replaced by the brand's own drawn setting-out grid. */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[var(--dark)] sm:min-h-[640px] lg:min-h-[720px]">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10 w-full py-16 sm:py-20`}>
          <div className="max-w-3xl">
            <div className="hero-reveal">
              <div className="section-label mb-6">
                Specialist CIS accountants
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Specialist CIS accountants for UK construction trades.
              </h1>
            </div>
            <div className="hero-reveal-delay">
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
                We are CIS accountants for UK construction subcontractors and contractors. Third-party reported averages put the annual refund for a registered CIS subcontractor at around £2,000 (illustrative, not guaranteed). We claim it back, then keep you compliant.
              </p>
              <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
                <HeroOffer
                  fallback={
                    <Link href="/cis-refund" className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                      Check your CIS refund
                    </Link>
                  }
                />
                {/* ADDITIVE id, phase 5 / WP-E1. The page had no on-page ask in
                    the hero: every hero CTA left the page. `home_hero_book` is
                    NEW, matching the precedent set by `for_hero_book` (45
                    routes) and `calc_hero_help` (12), because reusing
                    `hero_primary` would merge this site's single off-page hero
                    CTA with an on-page one and split its history at the cutover
                    (trap 22). Goal is `form` per this site's taxonomy: `form` is
                    an on-page form anchor, `lead` is a CTA that leaves the page.
                    No data-cta-variant: the four other additive *_book ids
                    (for_hero_book, calc_hero_help, services_hero_book,
                    glossary_entry_book) carry none, and this id has never
                    shipped, so dropping it splits no history. */}
                <Link
                  href="#book"
                  className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
                  data-cta="home_hero_book" data-cta-placement="hero" data-cta-goal="form"
                >
                  Book a free call
                </Link>
                {/* FROZEN LITERAL. `hero_primary|hero|lead` renders on this one
                    route site-wide; the id, placement, goal and href are pinned
                    by cta_baseline.json. Do not repoint it at #book. */}
                <Link
                  href={activeCta.hero_primary.href}
                  className={`inline-flex min-h-12 items-center justify-center text-base sm:text-lg font-medium text-orange-300 hover:text-orange-200 transition-colors text-center underline underline-offset-4 ${focusRing}`}
                  data-cta="hero_primary" data-cta-placement="hero" data-cta-goal="lead"
                  data-cta-variant={niche.cta.variant}
                >
                  {activeCta.hero_primary.label}
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2.5 text-sm text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-orange-400 flex-shrink-0" aria-hidden />
                <span className="font-medium">Fixed fees. Plain English. No hard sell.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip. The navy `keyStats` band that used to sit above this one
          was retired: F.2 gives ONE stats strip. Its four tax facts (4 years,
          1.4m+, 20%, 55p) now read as prose in the comparison band below, where
          they are mechanics rather than a proof count. */}
      <section className="border-b border-neutral-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      {/* 3. Problem statement. Restyled in place: the four card bodies already ARE
          the argument F.2 asks for. The kit ProblemStatement hardcodes Property's
          landlord copy with no copy props (trap 12), so it is not mirrored. */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">What CIS subcontractors come to us with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The financial challenges specific to construction trades.
          </h2>
          <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 md:gap-8">
            {painPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-neutral-200 border-l-4 border-l-[var(--btn-ground)] bg-white p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 and 5. Shared with phase 6's /contact, so they live in a component
          rather than inline. */}
      <WhoWeAreSection />
      <WhyChooseUsSection />

      {/* 6. Services grid. All six service hrefs and the "View all services" link
          are load-bearing and stay. */}
      <section className="bg-primary-50/60 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              What we do for construction trades
            </h2>
            <p className="mt-3 text-base text-neutral-600 sm:mt-4 sm:text-lg">
              Every service is built around how CIS works in practice, not generic small-business accounting.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesOverview.map((item) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group block rounded-xl border border-primary-100 bg-white p-6 transition-all hover:border-primary-400 hover:shadow-md sm:p-8 ${focusRing}`}
                >
                  {/* Glyph tile: white icon on --btn-ground (5.18), not on
                      --accent (2.80). DESIGN_DELTA section 1: --accent is
                      grounds and decorative strokes only. */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--btn-ground)] transition-colors group-hover:bg-[var(--btn-ground-hover)]">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 transition-colors group-hover:text-orange-700">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-[var(--accent-strong)] font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className={btnSecondary}>
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Service tiers. Not an F.2 block, a sanctioned addition. featuredBadge=""
          is mandatory, NOT omitted: the kit default is the string "Most Popular",
          an aggregate claim about client behaviour, banned by section I. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
            <div className="section-label mb-4">How we work</div>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
              From free tools to full CIS accounting.
            </h2>
            <p className="mt-3 text-base text-neutral-600 sm:mt-4 sm:text-lg">
              Start with our free calculators or speak to us directly. Fixed fees, no surprises.
            </p>
          </div>
          <ServiceTiers tiers={serviceTiers} featuredBadge="" />
        </div>
      </section>

      {/* 7. What we cover. A reference surface is citable because of its table, so
          the table stays and is restyled, not replaced by a figure. The opening
          paragraph carries the four tax facts relocated from the retired navy
          stats band. */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">What we cover</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            The CIS mechanics we handle, area by area.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            A CIS refund can be claimed up to four years back. There are more than 1.4 million CIS-registered subcontractors in the UK, and deductions are taken from the labour element only, at 20% for a registered subcontractor, 30% if you are not registered, or 0% once gross payment status is in place. Mileage runs at 55p per mile for the first 10,000 miles from April 2026. Each of those is a number on your return, and each one is somewhere a return goes wrong.
          </p>
          <div className="mt-12 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full min-w-[36rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical CIS accounting areas</caption>
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-sm uppercase tracking-wider sm:px-6 sm:py-4">
                    Our approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.area}
                    className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}
                  >
                    <th
                      scope="row"
                      className="border-l-4 border-l-[var(--btn-ground)] px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4"
                    >
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-neutral-600 sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trade verticals. THE LINK FLOOR: the 45 /for/[slug] anchors below are 45
          of this page's 45 unique body destinations. They are rendered here
          unconditionally, server-side, from the full tradeTypes array. Never
          slice, paginate, filter, tab or client-render this grid: losing one
          anchor is a link-floor breach and it is invisible in review. */}
      <section className="relative overflow-hidden bg-[var(--dark)] py-12 sm:py-16 lg:py-20">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
            {/* .section-label is white on --btn-ground (5.18), ground-independent,
                so it replaces the solid orange-500 pill (white on orange-500 =
                2.89 from the utility, below even the 3:1 graphics floor). */}
            <div className="section-label mb-4">
              Every construction trade
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              We work with all UK construction trades
            </h2>
            <p className="mt-3 text-base text-neutral-300 sm:mt-4 sm:text-lg">
              CIS works the same way across trades, but the materials split, expenses and typical refund size differ by trade. We know the specifics.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {tradeTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className={`group block rounded-xl bg-white/5 p-4 ring-1 ring-white/15 transition-all hover:bg-white/10 hover:ring-white/30 sm:p-5 ${focusRing}`}
              >
                <span className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                  {type.title}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-neutral-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link
              href="/for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              See all trade types
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Calculators. Four literal server-rendered anchors read from the tool
          registry. No tabs component, no client JS. */}
      <section id="calculators" className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
            <div className="section-label mb-4">Free tools</div>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
              Work out your position before you speak to anyone.
            </h2>
            <p className="mt-3 text-base text-neutral-600 sm:mt-4 sm:text-lg">
              Every calculator is free, needs no account, and runs on the rates that apply to your tax year.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {calculators.map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className={`group flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all hover:border-primary-400 hover:shadow-md sm:p-6 ${focusRing}`}
              >
                <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:text-orange-700 sm:text-lg">
                  {tool.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{tool.oneLiner}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent-strong)]">
                  Open calculator
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/calculators" className={btnSecondary}>
              See all free calculators
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Testimonials. Moved to F.2's position (after the calculators block).
          The three quotes and the three lines of framing copy around them are
          held BYTE-IDENTICAL pending an open owner decision on client-outcome
          claims (OWNER_CLAIM_EVIDENCE.md). Do not rewrite them here. */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              What we have done for CIS subcontractors
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Composite snapshots based on patterns across our CIS clients. Names and figures anonymised. The tax mechanics are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-primary-200" aria-hidden />
                <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-neutral-100 text-xs sm:text-sm font-semibold text-neutral-500">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Latest insights. Three real article rows plus the view-all link: the
          only band on this page that adds unique body destinations, and three
          crawl paths from the highest-authority page into the article corpus.
          Hrefs are /blog/{categorySlug}/{slug}: this site's blog is NESTED. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-8 max-w-3xl sm:mb-12">
            <div className="section-label mb-4">CIS guides</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Practical CIS and construction tax guides.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Plain English articles on CIS deductions, refunds, gross payment status, VAT reverse charge and MTD. Written by specialist CIS accountants.
            </p>
          </div>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link
                  href={`/blog/${post.categorySlug}/${post.slug}`}
                  className={`flex items-center gap-4 py-4 sm:gap-6 sm:py-5 ${focusRing}`}
                >
                  <span className="hidden w-48 shrink-0 text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)] sm:block">
                    {post.category}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)] sm:hidden">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:text-orange-700 sm:text-lg">
                      {post.title}
                    </h3>
                    {post.summary ? (
                      <p className="mt-1 hidden text-sm text-neutral-600 sm:block">{post.summary}</p>
                    ) : null}
                  </span>
                  <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-[var(--accent-strong)]" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 sm:mt-10">
            <Link href="/blog" className={btnPrimary}>
              Browse all guides
            </Link>
            <Link
              href="/cis-refund"
              className="inline-flex items-center gap-2 text-[var(--accent-strong)] hover:text-orange-800 font-semibold text-sm sm:text-base transition-colors"
            >
              CIS refund service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Closing capture band. Restyled in place: the anatomy was already
          right. The packagesMode branch stays structurally intact and silent
          (the live variant is leadgen, so the else branch is what renders). */}
      <section id="book" className="relative scroll-mt-24 overflow-hidden bg-[var(--dark)]">
        <TradeBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <div className="section-label mb-6">Get started</div>
              {packagesMode ? (
                <>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                    {activeCta.home_cta.heading}
                  </h2>
                  <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-neutral-200">
                    {activeCta.home_cta.body}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <Link
                      href={activeCta.home_cta.primary.href}
                      className={btnPrimary}
                      data-cta="home_cta_primary" data-cta-placement="home_cta" data-cta-goal="lead"
                      data-cta-variant={niche.cta.variant}
                    >
                      {activeCta.home_cta.primary.label}
                    </Link>
                    {activeCta.home_cta.secondary ? (
                      <Link
                        href={activeCta.home_cta.secondary.href}
                        className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
                        data-cta="home_cta_secondary" data-cta-placement="home_cta" data-cta-goal="contact"
                        data-cta-variant={niche.cta.variant}
                      >
                        {activeCta.home_cta.secondary.label}
                      </Link>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Find out what you are owed
                  </h2>
                  <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-neutral-200">
                    Book a free call. We will review your CIS deductions, identify what you are owed, and explain your options. No hard sell, no obligation.
                  </p>
                </>
              )}
              <div className="mt-8 space-y-4">
                {[
                  { title: "CIS specialists only", sub: "We do not work with non-construction clients" },
                  { title: "A specialist CIS accountant gets in touch", sub: "Not a sales team, not a call centre" },
                  { title: "Fixed fees, no surprises", sub: "Quoted before we start" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's affairs with another" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-neutral-200">
                    {/* On-dark badge: --highlight-on-dark (orange-300) on white/5
                        over --dark, 10.59. The old solid orange-500 tile carried
                        a white glyph at 2.89 and is exactly what section 3 bans. */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl font-bold text-[var(--highlight-on-dark)] ring-1 ring-white/15">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-neutral-300">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 ring-1 ring-neutral-200 sm:p-8 lg:p-10">
              {packagesMode ? (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">Prefer to send a message?</h3>
                  <p className="text-sm text-neutral-600 mb-4 sm:mb-6">Tell us where you are up to and a specialist CIS accountant will be in touch.</p>
                  <LeadForm submitLabel="Send enquiry" />
                </>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">Book your free call</h3>
                  <LeadForm submitLabel="Request a callback" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ, last, light, and hand-rolled <details> on purpose. The kit
          FaqSection wraps answers in a Radix AccordionContent with no forceMount,
          so closed answers leave the server HTML entirely. <details> is
          crawlable closed, and it keeps the light tail the navy footer needs. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-4xl">
              Common questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-orange-700 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-[var(--accent-strong)] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
