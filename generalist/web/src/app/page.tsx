import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, btnSecondary, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildOrganization, buildWebSite } from "@/lib/schema";
import { buildFaqPage } from "@/lib/schema/faq-page";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { getAllFundamentals } from "@/lib/fundamentals";
import { ArrowRight, BookOpen, Calculator, LineChart, Building2, FileCheck, Quote, ShieldCheck } from "lucide-react";
import { SignupForm } from "@/components/newsletter/SignupForm";

export const metadata: Metadata = {
  title: "UK Business Accountants | Specialist Tax, VAT, Payroll and R&D",
  description:
    "Specialist UK accountants for limited companies, contractors, sole traders and partnerships. Corporation tax, VAT, payroll, R&D credits, MTD, and exit planning. ICAEW network, national coverage, fixed fees.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: `${siteConfig.name} | Accountants for UK Businesses of Every Shape`,
    description:
      "Specialist UK accountants for limited companies, contractors, sole traders and partnerships. Fixed fees, ICAEW-qualified network, national coverage.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Accountants for UK Businesses of Every Shape`,
    description:
      "Specialist UK accountants for limited companies, contractors, sole traders and partnerships. Fixed fees, ICAEW-qualified network, national coverage.",
  },
};

const services = [
  {
    title: "Corporation Tax",
    description: "Year-end accounts and CT600 filings, marginal relief planning, optimised director pay structures",
    Icon: Calculator,
  },
  {
    title: "VAT and MTD",
    description: "VAT registration, scheme selection (FRS, Cash, Standard), and Making Tax Digital quarterly returns",
    Icon: LineChart,
  },
  {
    title: "Incorporation and Structure",
    description: "Sole trader to limited company, group structures, share allocations, and director loan accounts",
    Icon: Building2,
  },
  {
    title: "R&D and Tax Reliefs",
    description: "R&D tax credit claims, capital allowances, BADR planning, and patent box where it applies",
    Icon: FileCheck,
  },
];

const businessTypes = [
  { label: "Limited companies", href: "/services" },
  { label: "Sole traders", href: "/services" },
  { label: "Contractors and freelancers", href: "/services" },
  { label: "Partnerships and LLPs", href: "/services" },
  { label: "New incorporations", href: "/incorporation" },
  { label: "Growing SMEs", href: "/services" },
  { label: "R&D-claiming businesses", href: "/r-and-d-credits" },
  { label: "Exit-ready founders", href: "/services" },
];

const keyStats = [
  { value: "100+", label: "UK business clients" },
  { value: "Nationwide", label: "Coverage" },
  { value: "ICAEW", label: "Qualified network" },
  { value: "Fixed fees", label: "No surprises" },
];

const faqs = [
  {
    question: "How much does an accountant cost for a UK limited company?",
    answer:
      "Fees depend on complexity: turnover, payroll size, VAT scheme, number of directors, R&D activity, and whether you need management accounts as well as year-end. Rather than publish a tiered price list that won't apply to most businesses, we quote fixed fees after a short discovery call so you know exactly what you're paying for upfront. Most small limited companies pay between a few hundred and a few thousand pounds per year, all in.",
  },
  {
    question: "Do I need an accountant for my sole trader business?",
    answer:
      "Not strictly. You can file your own Self Assessment via HMRC's online service. An accountant adds value when your situation gets non-obvious: turnover approaching the VAT threshold (currently £90,000), considering incorporation, multiple income streams, claiming R&D or capital allowances, or you simply value getting the time back. The cost is typically tax-deductible against your trading profits.",
  },
  {
    question: "When should I incorporate as a limited company?",
    answer:
      "There is no single threshold, but commonly it is worth modelling once your trading profit consistently exceeds about £30,000 to £40,000 a year. Above that the tax efficiency of dividends plus a low salary often outweighs the extra admin of a limited company. Below it the savings rarely justify the additional compliance. The decision also depends on personal tax position, pension plans, mortgage requirements and whether you want to retain profit inside the business.",
  },
  {
    question: "Can you work with my business if I'm not in London?",
    answer:
      "Yes. Our ICAEW-qualified network operates nationally and almost everything we do, from year-end accounts through to advisory calls, runs over secure cloud accounting (Xero, FreeAgent, QuickBooks) and video. We have clients across the UK from Glasgow to Brighton. Local presence isn't a cost factor any more.",
  },
];

// Composite testimonials, anonymised. Patterns are real, names and figures changed.
const testimonials = [
  {
    quote: "Switched from a high-street firm and the difference in proactivity was night and day. They flagged a CT marginal-relief issue before it cost me anything.",
    attribution: "Limited company director, eCommerce, Bristol",
  },
  {
    quote: "I'd been a sole trader for six years. Their incorporation modelling showed me I was leaving £6k a year on the table.",
    attribution: "Independent consultant, Leeds (newly incorporated)",
  },
  {
    quote: "VAT scheme review saved us £2,800 in year one. We were on Standard when Flat Rate was clearly better for our cost mix.",
    attribution: "Two-director Ltd, professional services, Manchester",
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3).map((post) => ({
    ...post,
    categorySlug: getCategorySlug(post),
  }));
  const featuredPillars = getAllFundamentals().slice(0, 3);

  return (
    <>
      <JsonLd data={[buildOrganization(), buildWebSite(), buildFaqPage(faqs)].filter((s): s is NonNullable<typeof s> => s !== null)} />

      {/* Hero */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=2000&q=85"
          alt="UK business owners reviewing accounts"
          fill
          className="object-cover brightness-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/98 via-slate-900/85 to-slate-900/50" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-3xl">
            <div className="inline-block bg-indigo-600 px-3 py-1.5 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 shadow-lg">
              ICAEW qualified accountants, national coverage
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Accountants for UK businesses{" "}
              <span className="text-indigo-400">of every shape.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-slate-200 sm:text-xl lg:text-2xl max-w-2xl">
              Limited companies, contractors, sole traders, partnerships. Corporation tax, VAT, payroll, R&D and exit planning. Fixed fees, plain English, 24 hour response.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/free-health-check" className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Free business finance health check
              </Link>
              <Link href="/contact" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Book a free call
              </Link>
            </div>
            <div className="mt-6 sm:mt-8 flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <ShieldCheck className="h-4 w-4 text-indigo-400 flex-shrink-0" aria-hidden />
              <span className="font-semibold">
                ICAEW-qualified network, national coverage, fixed fees
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-indigo-700 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {keyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Composite testimonials, anonymised */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-slate-900 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Real outcomes
            </div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What we&rsquo;ve done for UK business owners
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Composite snapshots based on patterns across our client base. Names and figures anonymised. The tax mechanics are real.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative bg-white border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-indigo-200" aria-hidden />
                <blockquote className="text-base sm:text-lg leading-relaxed text-slate-800 font-medium pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-slate-100 text-xs sm:text-sm font-semibold text-slate-600">
                  {t.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              What we do for UK businesses
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Year-round compliance plus the advisory you actually want. Fixed fees, one named accountant, ICAEW-qualified.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.Icon;
              return (
                <div key={service.title} className="text-center group">
                  <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700 mb-3 sm:mb-4 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className={`${btnSecondary}`}>
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Every business shape
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              We work across the UK business landscape
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-300">
              From a one-person Ltd company to multi-director groups. The right accountant fits your stage, not the other way round.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
            {businessTypes.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className="group block bg-white/5 border border-white/10 p-4 sm:p-5 transition-all hover:bg-indigo-600/20 hover:border-indigo-400/40"
              >
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {type.label}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar guides */}
      {featuredPillars.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  <BookOpen className="h-3.5 w-3.5" />
                  Pillar guides
                </div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                  Plain-English guides for UK business owners
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                  Long-form reference guides on the decisions that matter: incorporation, VAT, R&D, payroll and exit.
                </p>
              </div>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                {featuredPillars.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/fundamentals/${guide.slug}`}
                    className="group block bg-slate-50 border border-slate-200 hover:border-indigo-600 hover:shadow-md transition-all overflow-hidden"
                  >
                    {guide.image ? (
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={guide.image}
                          alt={guide.altText || guide.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/30" />
                        <div className="absolute bottom-3 left-3 bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                          Pillar guide
                        </div>
                      </div>
                    ) : null}
                    <div className="p-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
                        {guide.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 line-clamp-3">{guide.summary}</p>
                      <div className="mt-4 flex items-center text-indigo-600 font-semibold text-sm">
                        Read the guide
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8 sm:mt-12">
                <Link
                  href="/fundamentals"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-base sm:text-lg transition-colors"
                >
                  View all pillar guides
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter inline */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="max-w-2xl mx-auto">
            <SignupForm
              source="homepage-mid"
              variant="card"
              heading="One UK business tax idea a week."
              body="A short read for UK business owners: tax, structure, VAT, payroll. Plain text, one CTA, unsubscribe in one click."
              showAgencyType={false}
            />
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      {recentPosts.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                  Latest insights for UK business owners
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                  Practical guidance on tax, structure, payroll and running a profitable UK business
                </p>
              </div>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                {recentPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                  >
                    <Link
                      href={`/blog/${post.categorySlug}/${post.slug}`}
                      className="block p-6 h-full flex flex-col"
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      {post.summary && (
                        <p className="text-slate-600 mb-4 flex-grow line-clamp-3 text-sm sm:text-base">
                          {post.summary}
                        </p>
                      )}
                      <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
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
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-base sm:text-lg transition-colors"
                >
                  View all articles
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=85"
            alt="UK business office"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/92" />
        </div>
        <div className={`${siteContainerLg} relative z-10 py-12 sm:py-20 lg:py-24`}>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-block bg-indigo-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white uppercase tracking-wider mb-4 sm:mb-6">
                Get started
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                Get your business finances properly sorted
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-slate-200">
                Book a free call. We will talk through your situation and give you clear, practical recommendations. No jargon, no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "ICAEW qualified accountants", sub: "Professional standards, not just registered agents" },
                  { title: "24-hour response time", sub: "Usually the same day" },
                  { title: "Fixed fees, no surprises", sub: "Transparent pricing upfront" },
                  { title: "National coverage", sub: "Cloud-first, we work wherever you are" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 text-slate-200">
                    <div className="h-12 w-12 flex items-center justify-center bg-indigo-600 text-white font-bold text-xl flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-slate-300">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Book your free call</h3>
              <LeadForm submitLabel="Request a callback" />
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
              {faqs.map((item, i) => (
                <AccordionItem key={item.question} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{item.answer}</p>
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
