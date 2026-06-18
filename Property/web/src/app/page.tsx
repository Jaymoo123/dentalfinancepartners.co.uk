import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { buildBreadcrumbJsonLd } from "@/lib/schema";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MTDCountdown } from "@/components/property/MTDCountdown";
import { ServiceTiers } from "@/components/property/ServiceTiers";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { essentialGuides } from "@/lib/essential-guides";
import { ArrowRight } from "lucide-react";

// Lazy load calculators (below the fold, client-only)
const Section24Calculator = dynamic(
  () => import("@/components/calculators/Section24Calculator").then(mod => ({ default: mod.Section24Calculator })),
  { loading: () => <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-96 bg-slate-100 rounded"></div></div> }
);

const IncorporationCostCalculator = dynamic(
  () => import("@/components/calculators/IncorporationCostCalculator").then(mod => ({ default: mod.IncorporationCostCalculator })),
  { loading: () => <div className="bg-white border-l-4 border-amber-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-96 bg-slate-100 rounded"></div></div> }
);

const MTDCheckerCalculator = dynamic(
  () => import("@/components/calculators/MTDCheckerCalculator").then(mod => ({ default: mod.MTDCheckerCalculator })),
  { loading: () => <div className="bg-white border-l-4 border-amber-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-64 bg-slate-100 rounded"></div></div> }
);

const PortfolioProfitabilityCalculator = dynamic(
  () => import("@/components/calculators/PortfolioProfitabilityCalculator").then(mod => ({ default: mod.PortfolioProfitabilityCalculator })),
  { loading: () => <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-96 bg-slate-100 rounded"></div></div> }
);

export const metadata: Metadata = {
  title: "Property Accountants UK | Specialist Landlord Tax Advice",
  description:
    "Specialist property accountants for UK landlords and investors. Section 24, MTD, incorporation and CGT planning. Fixed fees, 24hr response, free calculators.",
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
    icon: "📊",
  },
  {
    title: "MTD Compliance",
    description: "Quarterly digital reporting from April 2026",
    icon: "📅",
  },
  {
    title: "Incorporation Analysis",
    description: "Full feasibility modelling: CGT, SDLT, break-even",
    icon: "🏢",
  },
  {
    title: "Portfolio Reporting",
    description: "Property-by-property profitability tracking",
    icon: "💼",
  },
];

const whoWeHelp = [
  {
    title: "Individual Landlords",
    subtitle: "1-3 properties",
    points: [
      "Self Assessment with rental schedules",
      "Section 24 tax planning",
      "MTD compliance support",
      "Incorporation feasibility",
    ],
  },
  {
    title: "Portfolio Owners",
    subtitle: "4-10 properties",
    points: [
      "Management accounts",
      "Property-by-property reporting",
      "Limited company accounts",
      "Acquisition support",
    ],
  },
  {
    title: "Large Portfolios",
    subtitle: "10+ properties",
    points: [
      "Group accounting",
      "Corporation tax planning",
      "Disposal planning (CGT)",
      "Portfolio restructuring",
    ],
  },
];

const trustBadges = [
  "Property-only specialists",
  "24hr response time",
  "Fixed fees",
  "MTD ready",
  "100+ landlords",
];

// The comprehensive tax-area coverage list is shared with the /blog index via
// src/lib/essential-guides.ts (single canonical hub per topic, no drift).

// Anonymised social proof only (no client names), per the lead-gen model.
const testimonials = [
  {
    quote: "They modelled our Section 24 position properly for the first time and showed us exactly where incorporation did and did not make sense. No hard sell, just the numbers.",
    attribution: "Higher-rate landlord, 7-property portfolio, London",
  },
  {
    quote: "We were weeks from missing the 60-day capital gains deadline on a sale. They turned the computation around and filed on time. Worth the fee on that alone.",
    attribution: "Buy-to-let investor, Manchester",
  },
  {
    quote: "Getting ready for Making Tax Digital felt overwhelming. They set up the software, mapped every property, and now the quarterly filing just happens.",
    attribution: "Individual landlord, 2 properties, Leeds",
  },
];

const whyUs = [
  {
    title: "Property is all we do",
    body: "We work only with landlords, investors, and developers, so the property rules are core competence rather than an occasional sideline.",
  },
  {
    title: "Specialist depth where generalists slip",
    body: "Section 24, the 60-day CGT window, and incorporation modelled correctly, not treated as an afterthought.",
  },
  {
    title: "Fixed fees, no surprises",
    body: "Quoted up front, and for most landlords recovered several times over through reliefs claimed and penalties avoided.",
  },
  {
    title: "Up to date with every change",
    body: "The Finance Act 2026 measures, the 2027 income tax rate change, and the falling MTD thresholds are built into your plan.",
  },
];

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

      {/* Hero Section with Large Property Image */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=2000&q=85"
          alt="UK residential property"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/70" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-600 px-3 py-1.5 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 shadow-lg">
              MTD is now live for landlords
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Property accountants for UK landlords and investors
            </h1>
            <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-white sm:text-xl lg:text-2xl max-w-2xl">
              Property tax sorted, your way. Whether you need to get ready for Making Tax Digital, run a buy-to-let limited company, or get specialist advice on Section 24, CGT, and incorporation.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" data-cta="hero_book" data-cta-placement="hero" data-cta-goal="form" className={`${btnPrimary} bg-blue-600 border-blue-800 hover:bg-blue-700 hover:border-blue-900 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Book free consultation
              </Link>
              <Link href="#calculators" data-cta="hero_calculators" data-cta-placement="hero" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Try free calculators
              </Link>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-emerald-400" />
                  <span className="font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MTD Urgent Banner */}
      <section className="border-y-2 border-slate-200">
        <div className={siteContainerLg}>
          <MTDCountdown />
        </div>
      </section>

      {/* National property-accountant intro */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
              Property Tax Partners is a firm of specialist property accountants working with landlords, buy-to-let investors, and property developers across the UK. We work only with property, so Section 24, the Non-Resident Landlord Scheme, capital gains on disposals, ATED, and the personal-versus-limited-company decision are core competence rather than an occasional sideline.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
              Whether you hold one rental flat or a portfolio of thirty, a property tax accountant turns the rules into a plan: modelling your{" "}
              <Link href="/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide" className="font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Section 24</Link>{" "}
              finance-cost restriction, getting you compliant with{" "}
              <Link href="/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide" className="font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Making Tax Digital for Income Tax</Link>{" "}
              (live since 6 April 2026), running the{" "}
              <Link href="/incorporation" className="font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">incorporation</Link>{" "}
              arithmetic before you commit, and filing your capital gains within the 60-day HMRC window. Fixed fees, 24-hour response, no hard sell.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services - Visual Grid */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              What a property accountant does for landlords
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Property-only focus means we understand Section 24, MTD, incorporation, and CGT inside out.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="text-center group">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 text-3xl sm:text-4xl mb-3 sm:mb-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 backdrop-blur-sm border border-emerald-400/20">
                  {service.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="mt-1.5 sm:mt-2 text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive tax-area coverage */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              The tax areas a property accountant handles
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              From the everyday return to the once-in-a-portfolio decision, here is the full scope we cover for UK landlords and investors.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {essentialGuides.map((area) => (
              <div key={area.title} className="bg-white p-5 sm:p-6 border-l-4 border-emerald-600 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  <Link href={area.href} className="hover:text-emerald-700 transition-colors">{area.title}</Link>
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">{area.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Choose your level of support
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              From free calculators to full-service accounting. Start with DIY tools, upgrade when you need expert help.
            </p>
          </div>
          <ServiceTiers />
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Free tools
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Calculate your property tax position
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Get instant answers on Section 24, incorporation costs, MTD compliance, and portfolio profitability.
            </p>
          </div>
          <div className="space-y-12 sm:space-y-16">
            <div id="section24">
              <Section24Calculator resultCta />
            </div>
            <div id="incorporation">
              <IncorporationCostCalculator resultCta />
            </div>
            <div id="mtd">
              <MTDCheckerCalculator resultCta />
            </div>
            <div id="portfolio">
              <PortfolioProfitabilityCalculator resultCta />
            </div>
          </div>
        </div>
      </section>

      {/* Property Image Section */}
      <section className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=2000&q=85"
          alt="UK property portfolio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              Landlords at every scale
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-slate-200">
              From individual landlords to large portfolio owners. We understand property accounting.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {whoWeHelp.map((segment) => (
              <div key={segment.title} className="bg-slate-50 p-6 sm:p-8 border-l-4 border-emerald-600">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{segment.title}</h3>
                <p className="mt-2 text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-wider">{segment.subtitle}</p>
                <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  {segment.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-slate-700">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas we serve */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Property accountants across the UK
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Tax law is national, so we act for landlords anywhere in the UK. We also publish city-specific guidance for the markets where we work most.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {siteConfig.locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {loc.title}
              </Link>
            ))}
            <Link
              href="/locations"
              className="bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-600 transition-colors"
            >
              All locations
            </Link>
          </div>
        </div>
      </section>

      {/* Why landlords choose a specialist */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                Why landlords choose a specialist
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                A generalist accountant can file your return. A specialist property accountant makes sure the structure, the reliefs, and the deadlines are right before you ever get there.
              </p>
              <p className="mt-4 text-sm sm:text-base text-slate-600">
                Our team are qualified accountants who work only with property, and we keep current with every change that affects landlords.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-5 sm:gap-6 sm:grid-cols-2">
              {whyUs.map((item) => (
                <div key={item.title} className="flex gap-3 sm:gap-4">
                  <span className="mt-1 text-emerald-600 font-bold flex-shrink-0 text-lg">✓</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What landlords say (anonymised social proof) */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              What landlords say
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Anonymised feedback from landlords and investors we have worked with.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.attribution} className="bg-white p-6 sm:p-8 border-t-4 border-emerald-600 shadow-sm flex flex-col">
                <div className="text-4xl leading-none text-emerald-600 font-serif" aria-hidden="true">&ldquo;</div>
                <blockquote className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700 flex-grow">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                Latest property tax insights
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                Practical guidance on Section 24, MTD, incorporation, and portfolio management
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {recentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                >
                  <Link
                    href={`/blog/${post.categorySlug}/${post.slug}`}
                    className="block p-6 h-full flex flex-col"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-slate-600 mb-4 flex-grow line-clamp-3 text-sm sm:text-base">
                        {post.summary}
                      </p>
                    )}
                    <div className="flex items-center text-emerald-600 font-medium text-sm mt-auto">
                      Read article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-12">
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

      {/* Contact CTA with Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=2000&q=85"
            alt="London property skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-block bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-4 sm:mb-6">
                Get started
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Get your property tax sorted today
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-slate-200">
                Book a free consultation. We&apos;ll discuss your situation, model the numbers, and give you clear
                recommendations.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="h-12 w-12 flex items-center justify-center bg-emerald-600 text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-white">24-hour response time</div>
                    <div className="text-sm text-slate-300">Usually same day</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="h-12 w-12 flex items-center justify-center bg-emerald-600 text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-white">Fixed fees, no surprises</div>
                    <div className="text-sm text-slate-300">Transparent pricing</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-200">
                  <div className="h-12 w-12 flex items-center justify-center bg-emerald-600 text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-white">Property-only specialists</div>
                    <div className="text-sm text-slate-300">We only work with landlords</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Book your free consultation</h3>
              <LeadForm submitLabel="Request callback" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8 sm:mb-12 sm:text-4xl lg:text-5xl">Common questions</h2>
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
        </div>
      </section>
    </>
  );
}
