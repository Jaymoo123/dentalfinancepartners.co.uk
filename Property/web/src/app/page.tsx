import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { MTDCountdown } from "@/components/property/MTDCountdown";
import { ServiceTiers } from "@/components/property/ServiceTiers";

// Lazy load calculators (below the fold, client-only)
const Section24Calculator = dynamic(
  () => import("@/components/calculators/Section24Calculator").then(mod => ({ default: mod.Section24Calculator })),
  { ssr: false, loading: () => <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-96 bg-slate-100 rounded"></div></div> }
);

const IncorporationCostCalculator = dynamic(
  () => import("@/components/calculators/IncorporationCostCalculator").then(mod => ({ default: mod.IncorporationCostCalculator })),
  { ssr: false, loading: () => <div className="bg-white border-l-4 border-amber-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-96 bg-slate-100 rounded"></div></div> }
);

const MTDCheckerCalculator = dynamic(
  () => import("@/components/calculators/MTDCheckerCalculator").then(mod => ({ default: mod.MTDCheckerCalculator })),
  { ssr: false, loading: () => <div className="bg-white border-l-4 border-amber-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-64 bg-slate-100 rounded"></div></div> }
);

const PortfolioProfitabilityCalculator = dynamic(
  () => import("@/components/calculators/PortfolioProfitabilityCalculator").then(mod => ({ default: mod.PortfolioProfitabilityCalculator })),
  { ssr: false, loading: () => <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10 animate-pulse"><div className="h-96 bg-slate-100 rounded"></div></div> }
);

export const metadata: Metadata = {
  title: "Landlord Accountant UK | Section 24, MTD & Incorporation Specialists",
  description:
    "Specialist property accountants for UK landlords. Section 24 planning, MTD compliance, incorporation analysis. Fixed fees, 24hr response. Free calculators.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Landlord Accountant UK | Property Tax Specialists",
    description:
      "Get your property tax sorted. Section 24, MTD, incorporation. Trusted by 100+ landlords. Free calculators.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
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
    description: "Full feasibility modeling: CGT, SDLT, break-even",
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

export default function HomePage() {
  const orgSchema = buildOrganizationJsonLd();

  return (
    <>
      <StickyCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

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
            <div className="inline-block bg-emerald-600 px-3 py-1.5 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 shadow-lg">
              MTD starts 6 April 2026
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Property tax sorted.
              <br />
              Your way.
            </h1>
            <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-white sm:text-xl lg:text-2xl max-w-2xl">
              Whether you need to get ready for Making Tax Digital, run a limited company, or get tax advice from property specialists.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/contact" className={`${btnPrimary} bg-emerald-600 border-emerald-800 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Book free consultation
              </Link>
              <Link href="#calculators" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
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

      {/* Core Services - Visual Grid */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              What we specialise in
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Property-only focus means we understand Section 24, MTD, and incorporation inside out.
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
              <Section24Calculator />
            </div>
            <div id="incorporation">
              <IncorporationCostCalculator />
            </div>
            <div id="mtd">
              <MTDCheckerCalculator />
            </div>
            <div id="portfolio">
              <PortfolioProfitabilityCalculator />
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
            <div className="space-y-3 sm:space-y-4">
              <details className="group bg-slate-50 border-l-4 border-slate-300 hover:border-emerald-600 transition-all">
                <summary className="cursor-pointer list-none px-4 py-4 sm:px-6 sm:py-5 font-bold text-slate-900 hover:bg-slate-100 transition-colors [&::-webkit-details-marker]:hidden text-sm sm:text-base">
                  <span className="flex items-center justify-between gap-3 sm:gap-4">
                    Do I need Making Tax Digital from April 2026?
                    <span className="text-emerald-600 text-2xl font-bold transition-transform group-open:rotate-45 flex-shrink-0">
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed text-slate-700">
                  <p>
                    If your combined property and self-employment income exceeds £50,000, yes. You must submit quarterly
                    digital reports to HMRC from 6 April 2026. Use our{" "}
                    <Link href="#mtd" className="font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
                      MTD checker
                    </Link>{" "}
                    to see if you&apos;re affected.
                  </p>
                </div>
              </details>

              <details className="group bg-slate-50 border-l-4 border-slate-300 hover:border-emerald-600 transition-all">
                <summary className="cursor-pointer list-none px-4 py-4 sm:px-6 sm:py-5 font-bold text-slate-900 hover:bg-slate-100 transition-colors [&::-webkit-details-marker]:hidden text-sm sm:text-base">
                  <span className="flex items-center justify-between gap-3 sm:gap-4">
                    Should I incorporate my buy-to-let portfolio?
                    <span className="text-emerald-600 text-2xl font-bold transition-transform group-open:rotate-45 flex-shrink-0">
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed text-slate-700">
                  <p>
                    It depends on your mortgage levels, tax bracket, and holding period. Incorporation triggers CGT and
                    SDLT — upfront costs can exceed £50,000. Use our{" "}
                    <Link href="#incorporation" className="font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
                      incorporation calculator
                    </Link>{" "}
                    for a quick estimate.
                  </p>
                </div>
              </details>

              <details className="group bg-slate-50 border-l-4 border-slate-300 hover:border-emerald-600 transition-all">
                <summary className="cursor-pointer list-none px-4 py-4 sm:px-6 sm:py-5 font-bold text-slate-900 hover:bg-slate-100 transition-colors [&::-webkit-details-marker]:hidden text-sm sm:text-base">
                  <span className="flex items-center justify-between gap-3 sm:gap-4">
                    Do I need a specialist property accountant?
                    <span className="text-emerald-600 text-2xl font-bold transition-transform group-open:rotate-45 flex-shrink-0">
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed text-slate-700">
                  <p>
                    Not strictly — but the question is whether a generalist can give you useful advice on Section 24,
                    MTD, and incorporation. A specialist helps you make better financial decisions around incorporation
                    feasibility, MTD quarterly reporting, and portfolio-level profitability.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
