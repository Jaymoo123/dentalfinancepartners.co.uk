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
// Newsletter SignupForm RETIRED (owner-locked). Mounts removed from homepage.

export const metadata: Metadata = {
  title: "Accountants for Marketing Agencies | Agency Founder Finance",
  description:
    "Specialist accountants for UK and UAE agency founders. Tax planning, management accounts, IR35, salary structures and exit planning for marketing, creative, digital and all agency types.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Agency Founder Finance | The Accountant Built for Agency Founders",
    description:
      "Specialist accounting for agency founders. Tax planning, management accounts, IR35 and exit strategy for marketing, creative, digital and all agency types.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Founder Finance | The Accountant Built for Agency Founders",
    description:
      "Specialist accounting for agency founders. Tax planning, management accounts, IR35 and exit strategy for marketing, creative, digital and all agency types.",
  },
};

const services = [
  {
    title: "Tax Planning",
    description: "Salary structures, dividends, corporation tax and R&D credits optimised for agency businesses",
    Icon: Calculator,
  },
  {
    title: "Management Accounts",
    description: "Monthly reporting, cash flow forecasting and KPI dashboards built around how agencies work",
    Icon: LineChart,
  },
  {
    title: "Incorporation & Structure",
    description: "Sole trader to limited company, holding companies and share structures for agency founders",
    Icon: Building2,
  },
  {
    title: "IR35 & Contractors",
    description: "Compliance, SDS documentation and off-payroll guidance for agencies engaging freelancers",
    Icon: FileCheck,
  },
];

const agencyTypes = [
  { label: "Marketing agencies", href: "/agencies/marketing-agencies" },
  { label: "Creative agencies", href: "/agencies/creative-agencies" },
  { label: "Digital agencies", href: "/agencies/digital-agencies" },
  { label: "Advertising agencies", href: "/agencies/advertising-agencies" },
  { label: "PR agencies", href: "/agencies/pr-agencies" },
  { label: "Web design agencies", href: "/agencies/web-design-agencies" },
  { label: "SEO agencies", href: "/agencies/seo-agencies" },
  { label: "Branding agencies", href: "/agencies/branding-agencies" },
  { label: "eCommerce agencies", href: "/agencies/ecommerce-agencies" },
  { label: "Performance marketing", href: "/agencies/performance-marketing-agencies" },
  { label: "Recruitment agencies", href: "/agencies/recruitment-agencies" },
];

const keyStats = [
  { value: "73+", label: "Agency clients served" },
  { value: "£30M+", label: "In agency finance managed" },
  { value: "ICAEW", label: "Qualified accountants" },
  { value: "UK & UAE", label: "Territories covered" },
];

const faqs = [
  {
    question: "Do I need a specialist accountant for my agency?",
    answer:
      "Not strictly. But a generalist accountant will rarely know the nuances of agency finance: retainer income recognition, contractor IR35 risk, R&D credits for digital work, or how to structure a partial agency sale. A specialist saves you money and helps you make better decisions from the start.",
  },
  {
    question: "How should I pay myself as an agency founder?",
    answer:
      "Most limited company agency founders take a low salary up to the National Insurance threshold (currently £12,570) and the rest as dividends. The optimal split depends on your personal tax position, pension contributions, and whether you have other income. We model this for every client.",
  },
  {
    question: "Does my agency qualify for R&D tax credits?",
    answer:
      "More agencies qualify than you might expect, especially digital, web development, AI, software and technology agencies. If your team is solving technical problems that are not straightforward to implement, you may be able to claim. We assess eligibility as standard across our client base.",
  },
  {
    question: "What does an agency accountant cost?",
    answer:
      "Fees depend on the complexity of your agency — number of directors, payroll size, VAT scheme, R&D activity, international exposure. Rather than publish a tiered price list that won't apply to most agencies, we quote fixed fees after a short discovery call so you know exactly what you're paying for upfront.",
  },
];

// Composite testimonials — anonymised, based on patterns across founder-stories.
// Names/locations changed, tax mechanics real. See /founder-stories for full versions.
const testimonials = [
  {
    quote: "They spotted a BADR balance-sheet issue 14 months before our sale. We saved £43k each on the exit.",
    attribution: "Creative agency, 7 staff, Bristol (pre-exit)",
  },
  {
    quote: "Switching from sole trader to Ltd mid-year was the obvious move once they modelled it. £11k saved in year one.",
    attribution: "Digital agency, founder + 2, London (early scaling)",
  },
  {
    quote: "We had no idea we qualified for R&D credits. The first claim covered three years of accountancy fees.",
    attribution: "Performance marketing agency, 12 staff, Manchester (growth stage)",
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
      <section className="relative min-h-[480px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000&q=85"
          alt="Agency founders in a modern office"
          fill
          className="object-cover brightness-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/98 via-slate-900/85 to-slate-900/50" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center py-14 sm:py-0`}>
          <div className="max-w-3xl">
            <div className="inline-block bg-indigo-600 px-3 py-1.5 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 shadow-lg">
              ICAEW qualified accountants for agency founders
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Accountants for marketing agencies{" "}
              <span className="text-indigo-400">and 18 other types.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-slate-200 sm:text-xl lg:text-2xl max-w-2xl">
              From first-incorporation decisions to mid-7-figure exits. ICAEW-qualified network, agency-only focus, optional Dubai support when you&rsquo;re ready to leave.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/free-health-check" className={`${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Free agency finance health check
              </Link>
              <Link href="/contact" className={`${btnSecondary} bg-white/10 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4 text-center`}>
                Book a free call
              </Link>
            </div>
            <div className="mt-6 sm:mt-8 flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <ShieldCheck className="h-4 w-4 text-indigo-400 flex-shrink-0" aria-hidden />
              <span className="font-semibold">
                Trusted by founders behind multi-million-pound UK and UAE agencies
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

      {/* Composite testimonials — anonymised */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20" aria-labelledby="testimonials-heading">
        <div className={siteContainerLg}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-slate-900 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Real outcomes
            </div>
            <h2 id="testimonials-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              What we&rsquo;ve done for agency founders
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Composite snapshots based on patterns across our agency clients. Names and figures anonymised. The tax mechanics are real.
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
          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/founder-stories"
              className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-800 font-semibold text-sm sm:text-base transition-colors"
            >
              Read the full founder stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              What we do for agency founders
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              We focus exclusively on founder-led agencies. That means our advice is grounded in how agencies earn, spend and grow, not how a generic SME does.
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

      {/* Agency Types */}
      <section className="bg-slate-900 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-block bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Every agency type
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              We work with all agency businesses
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-300">
              The financial challenges of running a founder-led agency are unique, whether you are a one-person studio or a 50-person network.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
            {agencyTypes.map((type) => (
              <Link
                key={type.href}
                href={type.href}
                className="group block bg-white/5 border border-white/10 p-4 sm:p-5 transition-all hover:bg-indigo-600/20 hover:border-indigo-400/40"
              >
                <span className="text-sm sm:text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {type.label}
                </span>
                <ArrowRight className="mt-2 h-4 w-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            <Link
              href="/agencies"
              className="group block bg-indigo-600 border border-indigo-500 p-4 sm:p-5 transition-all hover:bg-indigo-500"
            >
              <span className="text-sm sm:text-base font-bold text-white">
                See all 19 agency types
              </span>
              <ArrowRight className="mt-2 h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mid-page image break */}
      <section className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=2000&q=85"
          alt="Agency team working together"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-indigo-900/80" />
        <div className={`${siteContainerLg} relative z-10 h-full flex items-center`}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              Your accountant should understand your business
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-indigo-100">
              Retainers, project billing, contractor mix, staff costs. We know how agency finances work and give advice that fits.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's pillar guides */}
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
                  The definitive guides for agency founders
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                  Long-form, ICAEW-written reference guides on the decisions that matter: tax, structure, IR35, exit.
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

      {/* Latest Insights */}
      {recentPosts.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
          <div className={siteContainerLg}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                  Latest insights for agency founders
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                  Practical guidance on tax, finance and running a profitable agency
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
            alt="Modern agency office"
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
                Get your agency finances properly sorted
              </h2>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-slate-200">
                Book a free call. We will talk through your situation and give you clear, practical recommendations. No jargon, no obligation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: "ICAEW qualified accountants", sub: "Professional standards, not just registered agents" },
                  { title: "24-hour response time", sub: "Usually the same day" },
                  { title: "Fixed fees, no surprises", sub: "Transparent pricing upfront" },
                  { title: "Agency specialists only", sub: "We work exclusively with agencies" },
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
