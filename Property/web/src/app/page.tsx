import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { CalculatorTabs } from "@/components/calculators/CalculatorTabs";
import { allTools } from "@/lib/calculators/registry";
import { btnOnDark, btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche, getActiveCta, isPackagesMode } from "@/config/niche-loader";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { buildBreadcrumbJsonLd } from "@/lib/schema";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { StatsCounter } from "@/components/property/StatsCounter";
import { siteStats } from "@/lib/site-stats";
import { ProblemStatement } from "@/components/property/ProblemStatement";
import { TestimonialsSection } from "@/components/property/TestimonialsSection";
import {
  WhoWeAreSection,
  WhyChooseUsSection,
  WhatWeCoverSection,
} from "@/components/property/MarketingSections";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import { getAllPosts, getCategorySlug, categoryDisplayName } from "@/lib/blog";
import { ArrowRight, BarChart3, Briefcase, Building2, CalendarClock, Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/page-blocks";

export const metadata: Metadata = {
  title: "Property Accountants UK | Specialist Landlord Tax Advice",
  description:
    // Ours (c218d7a6): shortened to fit the SERP snippet.
    "Specialist property accountants for UK landlords and investors. Section 24, MTD, incorporation and CGT planning. Fixed fees and free calculators.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: `${siteConfig.name} | Property Accountants for UK Landlords`,
    description:
      "Get your property tax sorted. Section 24, MTD, incorporation. Trusted by 100+ landlords. Free calculators.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Property Accountants for UK Landlords`,
    description:
      "Get your property tax sorted. Section 24, MTD, incorporation. Trusted by 100+ landlords. Free calculators.",
  },
};

const services = [
  {
    title: "Section 24 Planning",
    description: "Calculate your tax hit and explore mitigation strategies",
    icon: BarChart3,
  },
  {
    title: "MTD Compliance",
    description: "Quarterly digital reporting from April 2026",
    icon: CalendarClock,
  },
  {
    title: "Incorporation Analysis",
    description: "Full feasibility modelling: CGT, SDLT, break-even",
    icon: Building2,
  },
  {
    title: "Portfolio Reporting",
    description: "Property-by-property profitability tracking",
    icon: Briefcase,
  },
];

// Same figures as the /about stats bar — keep the two in sync.

// "Who we are", "Why choose us" and "What we cover" now live in
// components/property/MarketingSections.tsx, shared with /contact.

const trustBadges = [
  "Property-only specialists",
  "24hr response time",
  "Fixed fees",
  "MTD ready",
  "100+ landlords",
];

// The comprehensive tax-area coverage list is shared with the /blog index via
// src/lib/essential-guides.ts (single canonical hub per topic, no drift).

// Testimonial data now lives in components/property/TestimonialsSection.tsx,
// shared with /services.

const faqs = [
  {
    question: "Do I need a property accountant?",
    answer:
      "Not always, but most landlords break even or save money by using one. A property accountant makes sure you claim every allowable expense, apply the Section 24 finance-cost credit correctly, meet the Making Tax Digital quarterly deadlines, and report any capital gain within the 60-day HMRC window. If even one mortgaged property pushes your qualifying income over the MTD for Income Tax threshold (£50,000 from 6 April 2026, £30,000 from 2027, £20,000 from 2028), specialist help usually costs less than the penalties and missed reliefs it prevents.",
  },
  {
    question: "What does a property tax accountant do?",
    answer:
      "A property tax accountant handles the tax side of owning rental property: Self Assessment with rental schedules, Section 24 planning, capital gains tax on disposals, incorporation feasibility, MTD for Income Tax compliance, and limited company accounts for buy-to-let SPVs. The work centres on the rules that govern rental income, which a general high-street accountant rarely lives inside day to day.",
  },
  {
    question: "How much does a property accountant cost?",
    answer:
      "Fees depend on portfolio size and complexity, not a flat menu. A single rental property on Self Assessment sits at the lower end; a multi-property limited company with quarterly MTD filing and management accounts sits higher. We quote fixed fees up front so there are no surprises. For most landlords the fee is recovered several times over through correctly claimed expenses and avoided penalties.",
  },
  {
    question: "What is the difference between a property accountant and a regular accountant?",
    answer:
      "A general accountant handles a broad mix of clients and knows the basics of Self Assessment and corporation tax. A specialist property accountant works only with landlords, developers, and investors, so Section 24, the 60-day CGT reporting window, ATED, the Non-Resident Landlord Scheme, and the personal-versus-limited-company decision are core competence. In practice a generalist may still treat mortgage interest as a deductible expense (it has not been since 6 April 2020) and rarely models incorporation.",
  },
  {
    question: "Do I need Making Tax Digital?",
    answer:
      "If your combined property and self-employment income exceeds £50,000, yes. MTD for Income Tax has been live since 6 April 2026, and you must submit quarterly digital reports to HMRC. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028. Use our MTD checker below to see if you are affected and what to file next.",
  },
  {
    question: "Should I incorporate my buy-to-let portfolio?",
    answer:
      "It depends on your mortgage levels, tax bracket, and holding period. Incorporation can move rental profits from personal rates of 40% or 45% (after Section 24) to corporation tax of 19% to 25%, but transferring existing properties triggers SDLT (including the 5% additional-dwellings surcharge) and a CGT charge on the deemed disposal at market value. Use our incorporation calculator below for a quick estimate, then we model the upfront cost against the long-term saving.",
  },
  {
    question: "Can a property accountant help me decide whether to incorporate?",
    answer:
      "Yes, and it is one of the most valuable things we do. We model the corporation tax saving against the upfront cost of SDLT and CGT on transfer, factor in your holding period and mortgage position, and give you a clear recommendation rather than a generic rule of thumb. The incorporation calculator above gives you a quick first estimate.",
  },
  {
    question: "Do you work with landlords outside London?",
    answer:
      "Yes. Tax legislation is national, so we act for landlords and investors anywhere in the UK, with remote support and digital document handling. We publish city-specific guidance for the markets where we work most, including London, Manchester, Birmingham, Leeds, and Bristol, but a property accountant does not need to share your postcode to advise on Section 24, CGT, MTD, or incorporation.",
  },
  {
    question: "Do I need a specialist property accountant?",
    answer:
      "Not strictly, but the question is whether a generalist can give you useful advice on Section 24, MTD, and incorporation. A specialist helps you make better financial decisions around incorporation feasibility, MTD quarterly reporting, and portfolio-level profitability, and is far less likely to miss a relief or a deadline that costs you more than the fee.",
  },
];

export default function HomePage() {
  // Ours (1c066426 / 7ab42441 / 7f7eae12): the live CTA variant. One flag in
  // niche.config.json switches the hero and the closing block between the
  // leadgen and packages propositions, and both are instrumented.
  const activeCta = getActiveCta(niche);
  const packagesMode = isPackagesMode(niche);
  const orgSchema = buildOrganizationJsonLd();
  const faqSchema = buildFaqPageJsonLd(faqs);

  // National property-accountant entity graph: a LocalBusiness/Service node,
  // plus WebSite + WebPage + BreadcrumbList (competitor-standard, previously
  // missing). All nodes reference the single #organization @id.
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    image: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    // No public telephone advertised: enquiries go via the on-site /contact form.
    areaServed: { "@type": "Country", name: "United Kingdom" },
    priceRange: "££",
    parentOrganization: { "@id": `${siteConfig.url}#organization` },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}#service`,
    serviceType: "Property accountancy and landlord tax advice",
    provider: { "@id": `${siteConfig.url}#organization` },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    description:
      "Specialist accounting and tax services for UK landlords, buy-to-let investors, and property developers: Section 24 planning, Making Tax Digital, incorporation feasibility, capital gains tax, and portfolio reporting.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property tax services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Section 24 tax planning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Making Tax Digital compliance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buy-to-let incorporation analysis" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Capital gains tax on property" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portfolio accounting and reporting" } },
      ],
    },
  };

  const breadcrumbSchema = buildBreadcrumbJsonLd([{ label: "Home" }]);

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}#organization` },
    inLanguage: "en-GB",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}#webpage`,
    url: siteConfig.url,
    name: "Property accountants for UK landlords and investors",
    isPartOf: { "@id": `${siteConfig.url}#website` },
    about: { "@id": `${siteConfig.url}#organization` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.publisherLogoUrl}` },
    inLanguage: "en-GB",
  };

  const recentPosts = getAllPosts().slice(0, 3).map((post) => ({
    ...post,
    categorySlug: getCategorySlug(post),
  }));

  return (
    <>
      <StickyCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero Section — solid navy with etched brickwork on the right (tablet/desktop only) */}
      <section className="relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-slate-900">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-blue-400/10 backdrop-blur-lg ring-1 ring-white/25 px-4 py-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 shadow-lg">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              MTD is now live for landlords
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Property accountants for UK landlords and investors
            </h1>
            <p className="mt-4 sm:mt-6 text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl max-w-3xl">
              Whether you need to get ready for Making Tax Digital, run a buy-to-let limited company, or get specialist advice on Section 24, CGT, and incorporation. Property tax sorted, your way, with ease.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href={activeCta.hero_primary.href} data-cta="hero_book" data-cta-placement="hero" data-cta-goal={packagesMode ? "pricing" : "form"} data-cta-variant={niche.cta.variant} className={`${btnPrimary} bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                {activeCta.hero_primary.label}
              </Link>
              <Link href="#calculators" data-cta="hero_calculators" data-cta-placement="hero" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white hover:text-emerald-700 hover:border-white text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Try free calculators
              </Link>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar (shared figures with /about) — counts up on scroll into view.
          White strip: cleanest break from the navy hero, and the hairline keeps it
          distinct from the white sections further down. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={siteStats} />
        </div>
      </section>

      {/* Self-identification: the reader's problem, before any claim about us */}
      <ProblemStatement />

      {/* National property-accountant intro. Shared with /contact. */}
      <WhoWeAreSection />

      {/* Why landlords choose a specialist. Shared with /contact. */}
      <WhyChooseUsSection />

      {/* Core Services - Visual Grid */}
      <section className="bg-sky-50/60 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              What a property accountant does for landlords
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Property-only focus means we understand Section 24, MTD, incorporation, and CGT inside out, at every scale from individual landlords with a single flat to large portfolio owners.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-emerald-100 bg-white p-6 shadow-[0_6px_20px_-8px_rgba(5,150,105,0.28)] transition-colors duration-200 hover:border-emerald-300"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <service.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive tax-area coverage. Shared with /contact, which renders
          the `white` ground because its neighbours differ. */}
      <WhatWeCoverSection />

      {/* Calculators Section */}
      <section id="calculators" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Calculate your property tax position
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Get instant answers on Section 24, incorporation costs, MTD compliance, and portfolio profitability. Select a calculator below, enter your figures, and see where you stand.
            </p>
          </div>
          <CalculatorTabs />
          {/* Carve-out 5. CalculatorTabs renders <button role="tab">, so the block
              itself contains no crawlable link, and the homepage body carried none
              before it either. This is the designer's own pattern from their /blog
              index (data-cta="blog_calculators_all"), and the count is derived from
              the registry rather than typed, per their rule. */}
          <div className="mt-8 sm:mt-10">
            <Link
              href="/calculators"
              data-cta="home_calculators_all"
              data-cta-placement="calculator_bridge"
              className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              See all {allTools().length} calculators
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What landlords say (anonymised social proof) — navy band, echoes hero.
          Shared with /services via TestimonialsSection. */}
      <TestimonialsSection />

      {/* Latest Insights */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl">
            <div className="mb-8 sm:mb-12">
              <Eyebrow>From the blog</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                Latest property tax insights
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                Practical guidance on Section 24, MTD, incorporation, and portfolio management
              </p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {recentPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.categorySlug}/${post.slug}`}
                    className="flex items-center gap-4 py-4 sm:gap-6 sm:py-5"
                  >
                    <span className="hidden w-40 shrink-0 text-xs font-bold uppercase tracking-wider text-emerald-700 sm:block">
                      {categoryDisplayName(post.categorySlug, post.category)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-emerald-700 sm:hidden">
                        {categoryDisplayName(post.categorySlug, post.category)}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                        {post.title}
                      </h3>
                      {post.summary && (
                        <p className="mt-1 hidden text-sm text-slate-600 line-clamp-1 sm:block">{post.summary}</p>
                      )}
                    </span>
                    <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600" />
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-8 sm:mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-base sm:text-lg transition-colors"
              >
                View all articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA — navy with brickwork, matches hero.
          `id="book"` is the site-wide anchor every on-page primary CTA scrolls to
          (owner rule: on-page green CTAs go to the form on the page, only the
          header CTA and the sticky banner leave for /contact). `scroll-mt` clears
          the sticky header so the form heading is not hidden under it. */}
      <section id="book" className="relative overflow-hidden bg-slate-900 scroll-mt-24">
        <HeroBrickBackdrop />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16 items-start">
            <div>
              <Eyebrow onDark>Get started</Eyebrow>
              {/* Ours: the closing block follows the live CTA variant. Their copy is
                  the leadgen branch; the packages branch is unchanged from ours and
                  carries home_cta_primary / home_cta_secondary, two live rows in
                  vw_cta_performance that a straight take-theirs would have dropped. */}
              {packagesMode ? (
                <>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl">
                    {activeCta.home_cta.heading}
                  </h2>
                  <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-slate-200">
                    {activeCta.home_cta.body}
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <Link
                      href={activeCta.home_cta.primary.href}
                      data-cta="home_cta_primary"
                      data-cta-placement="home_cta"
                      data-cta-goal={activeCta.home_cta.primary.href.startsWith("/contact") ? "form" : "pricing"}
                      data-cta-variant={niche.cta.variant}
                      className={`${btnPrimary} text-base px-6 py-3 text-center`}
                    >
                      {activeCta.home_cta.primary.label}
                    </Link>
                    {activeCta.home_cta.secondary ? (
                      <Link
                        href={activeCta.home_cta.secondary.href}
                        data-cta="home_cta_secondary"
                        data-cta-placement="home_cta"
                        data-cta-goal={activeCta.home_cta.secondary.href.startsWith("/contact") ? "form" : "pricing"}
                        data-cta-variant={niche.cta.variant}
                        className={`${btnOnDark} text-base px-6 py-3 text-center`}
                      >
                        {activeCta.home_cta.secondary.label}
                      </Link>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white sm:text-4xl">
                    Get your property tax sorted today
                  </h2>
                  <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-slate-200">
                    Book a free consultation. We&apos;ll discuss your situation, model the numbers, and give you clear
                    recommendations.
                  </p>
                </>
              )}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"><Check aria-hidden className="h-6 w-6" strokeWidth={1.75} /></div>
                  <div>
                    <div className="font-bold text-white">24-hour response time</div>
                    <div className="text-sm text-slate-300">Usually same day</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"><Check aria-hidden className="h-6 w-6" strokeWidth={1.75} /></div>
                  <div>
                    <div className="font-bold text-white">Fixed fees, no surprises</div>
                    <div className="text-sm text-slate-300">Transparent pricing</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"><Check aria-hidden className="h-6 w-6" strokeWidth={1.75} /></div>
                  <div>
                    <div className="font-bold text-white">Property-only specialists</div>
                    <div className="text-sm text-slate-300">We only work with landlords</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10">
              {packagesMode ? (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Send us an enquiry</h3>
                  <p className="text-sm text-slate-600 mb-4 sm:mb-6">
                    Tell us about your portfolio and we will reply within 24 hours.
                  </p>
                </>
              ) : (
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Book your free consultation</h3>
              )}
              <LeadForm submitLabel="Request callback" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl mb-8 sm:mb-12">Common questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </section>
    </>
  );
}
