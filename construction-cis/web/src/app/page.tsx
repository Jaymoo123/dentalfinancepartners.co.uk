import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { buildFaqJsonLd } from "@/lib/schema";
import { UnionJack } from "@/components/brand/UnionJack";
import { HeroOffer } from "@/components/intent/HeroOffer";

export const metadata: Metadata = {
  title: "CIS Accountants & Construction Tax Specialists | UK",
  description:
    "Specialist CIS accountants for UK construction subcontractors and contractors. CIS tax refunds, gross payment status, sole trader and limited company accounting. The average CIS subcontractor overpays around £2,000 a year.",
  alternates: { canonical: siteConfig.url },
};

const keyStats = [
  { value: "~£2,000", label: "Average CIS subcontractor overpayment per year" },
  { value: "1.4m+", label: "CIS-registered subcontractors in the UK" },
  { value: "20%", label: "Deducted on labour (0% with GPS)" },
  { value: "24h", label: "Response guarantee" },
];

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
    body: "We calculate the full refund you are owed, account for all allowable expenses, and submit your Self Assessment return. Most subcontractors receive their refund within 8 to 12 weeks.",
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

const faqs = [
  {
    question: "Do I need a CIS accountant?",
    answer:
      "Not strictly, but a specialist CIS accountant will identify overpayments a generalist misses. The materials split, mileage at the correct rate, capital allowances on tools and equipment, and the GPS application process all require specific knowledge of how CIS works. Most subcontractors recoup our fees many times over in the first year's refund alone.",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />
      {/* Hero */}
      <section className="relative flex items-center min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=2000&q=85"
          alt="Construction site with workers in high-visibility vests"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/97 via-neutral-950/90 to-neutral-900/60" />
        <div className={`${siteContainerLg} relative z-10 py-16 sm:py-20 w-full`}>
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
                We are CIS accountants for UK construction subcontractors and contractors. The average CIS subcontractor overpays around £2,000 a year in tax deductions. We claim it back, then keep you compliant.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <HeroOffer
                  fallback={
                    <Link href="/cis-refund" className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                      Check your CIS refund
                    </Link>
                  }
                />
                <Link
                  href="/gross-payment-status"
                  className={`inline-flex min-h-12 items-center justify-center border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white hover:bg-white/20 transition-colors text-center ${focusRing}`}
                >
                  Gross payment status
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

      {/* Key Stats bar */}
      <section className="bg-[#1e293b] py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-orange-300 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            CIS deductions are taken before any expenses or allowances are applied. Most subcontractors overpay across the year. The refund is real money back in your pocket, and it starts with a correctly filed Self Assessment return.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="section-label mb-4">Real outcomes</div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
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
                className="relative bg-white border border-neutral-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-orange-200" aria-hidden />
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

      {/* Pain points */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">What CIS subcontractors come to us with</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            The financial challenges specific to construction trades.
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {painPoints.map((item) => (
              <article
                key={item.title}
                className="border border-neutral-200 border-l-4 border-l-orange-500 bg-neutral-50 p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              What we do for construction trades
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600">
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
                  className={`group block border border-neutral-200 bg-white p-6 sm:p-8 transition-all hover:border-orange-500 hover:shadow-md ${focusRing}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-orange-500 mb-4 group-hover:bg-orange-600 transition-colors">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                  <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className={btnSecondary}>
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Trade verticals */}
      <section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-orange-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Every construction trade
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              We work with all UK construction trades
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-300">
              CIS works the same way across trades, but the materials split, expenses and typical refund size differ by trade. We know the specifics.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {tradeTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/for/${type.slug}`}
                className="group block bg-white/5 border border-white/10 p-4 sm:p-5 transition-all hover:bg-orange-500/20 hover:border-orange-400/40"
              >
                <span className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                  {type.title}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-neutral-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
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

      {/* Specialist comparison table */}
      <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="section-label mb-4">Why specialist matters</div>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            A generalist handles your compliance.{" "}
            <span className="text-orange-600">We handle CIS-specific tax.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            The materials split, the mileage rate, GPS qualification tests, April 2026 nil returns, EPS real-time reclaims: these are things a generalist accountant handles occasionally. We deal with them every week across a large CIS client base.
          </p>
          <div className="mt-12 overflow-x-auto border border-neutral-200">
            <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical CIS accounting areas</caption>
              <thead>
                <tr className="bg-[#1e293b] text-white">
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
                    className={`border-b border-neutral-200 last:border-0 ${i % 2 === 1 ? "bg-neutral-50" : "bg-white"}`}
                  >
                    <th scope="row" className="px-4 py-3.5 font-semibold text-neutral-900 sm:px-6 sm:py-4">
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

      {/* Mid-page image break */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=2000&q=85"
          alt="Construction workers on a building site"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1e293b]/82" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Your accountant should understand how CIS works
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-orange-200">
              The deduction base, GPS qualification, April 2026 nil returns, EPS real-time reclaims. We see these issues every week, so we know where the refunds and risks are.
            </p>
          </div>
        </div>
      </section>

      {/* Proudly British trust strip */}
      <section className="border-b border-neutral-200 bg-[#fafaf9] py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:gap-6">
            <UnionJack width={28} aria-label="Union Jack flag" />
            <div>
              <p className="text-base font-semibold text-neutral-900 sm:text-lg">
                Proudly British
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600 max-w-xl">
                UK based, UK regulated, serving British construction businesses and the trades that build the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-[#1e293b]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-neutral-900/0 to-neutral-900/0 pointer-events-none" />
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-6">Get started</div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Find out what you are owed
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-neutral-200">
                Book a free call. We will review your CIS deductions, identify what you are owed, and explain your options. No hard sell, no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "CIS specialists only", sub: "We do not work with non-construction clients" },
                  { title: "24-hour response time", sub: "Usually the same day" },
                  { title: "Fixed fees, no surprises", sub: "Quoted before we start" },
                  { title: "All conversations are confidential", sub: "We never discuss one client's affairs with another" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-neutral-200">
                    <div className="h-12 w-12 flex items-center justify-center bg-orange-500 text-white font-bold text-xl flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-neutral-400">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">Book your free call</h3>
              <LeadForm submitLabel="Request a callback" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                  className="group border border-neutral-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-orange-700 transition-colors list-none">
                    <span>{faq.question}</span>
                    <span
                      className="flex-shrink-0 text-orange-500 transition-transform group-open:rotate-45"
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

      {/* Blog CTA */}
      <section className="border-t border-neutral-200 bg-[#fafaf9] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="section-label mb-4">CIS guides</div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Practical CIS and construction tax guides.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Plain English articles on CIS deductions, refunds, gross payment status, VAT reverse charge and MTD. Written by specialist CIS accountants.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/blog" className={btnPrimary}>
                Browse all guides
              </Link>
              <Link
                href="/cis-refund"
                className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-semibold text-sm sm:text-base transition-colors"
              >
                CIS refund service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
