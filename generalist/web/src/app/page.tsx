import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, CalendarClock, Receipt, Users } from "lucide-react";
import { btnOnDark, btnPrimary, linkArrow, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  JsonLd,
  buildFaqPage,
  buildAccountingService,
  buildService,
  buildBreadcrumb,
  type SchemaThing,
} from "@/lib/schema";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { Eyebrow, Prose } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { CalculatorTabs } from "@/components/tools/CalculatorTabs";
import {
  HomeProblemStatement,
  WhoWeAreSection,
  WhyChooseUsSection,
  WhatWeCoverSection,
} from "@/components/marketing/HomeSections";
import { siteStats } from "@/config/service-tiers";
import { allTools } from "@/lib/tools/registry";
import { getAllPosts, getCategorySlug } from "@/lib/blog";
import { niche } from "@/config/niche-loader";
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";

const activeCta = getActiveCta(niche);

const META_TITLE = "Fixed-Fee Small Business Accountants UK | Holloway Davies";
const META_DESC =
  "Fixed-fee online accountants for UK small businesses: limited companies, sole traders and contractors. Corporation tax, VAT, payroll, self assessment and MTD.";

export const metadata: Metadata = {
  // `absolute` opts out of the layout title template so the brand is not doubled.
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: META_TITLE,
    description: META_DESC,
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESC,
  },
};

/**
 * Hero trust badges (F.2 §3). Claims about how we work, not client counts. The
 * client-count tile the old proof band carried is struck, and no
 * client-count claim replaces it.
 */
const trustBadges = [
  "Fixed fees agreed up front",
  "One named accountant",
  "24-hour response window",
  "Cloud-first (Xero, QuickBooks, FreeAgent)",
  "UK-wide, remote-first",
];

/**
 * Homepage services grid (F.2 §10). Replaces `ServiceTiers`, which carries a
 * "Most Popular" badge: a pricing affordance, and this site publishes no
 * pricing. ServiceTiers stays on /services.
 */
const services = [
  {
    title: "Year-end accounts and CT",
    description: "Statutory accounts and the CT600, with marginal relief and the small profits rate applied where they fit.",
    href: "/fundamentals/how-does-corporation-tax-work",
    icon: CalendarClock,
  },
  {
    title: "VAT and MTD",
    description: "Registration timing, the right scheme, digital links and the quarterly rhythm.",
    href: "/fundamentals/vat-accountant",
    icon: Receipt,
  },
  {
    title: "Payroll, PAYE and pensions",
    description: "Monthly payroll, RTI, employer National Insurance and auto-enrolment, run and filed on time.",
    href: "/services",
    icon: Users,
  },
  {
    title: "Director pay and self assessment",
    description: "The salary and dividend split modelled on this year's thresholds, and the returns that follow it.",
    href: "/fundamentals/definitive-guide-limited-company-accountant",
    icon: Banknote,
  },
];

/**
 * `siteStats` is the estate-wide config shape (`icon` + string `value`), read by
 * fourteen other consumers, so the mapping to the kit's `StatItem` happens here
 * rather than in the config: "24h" becomes target 24 with suffix "h".
 */
const heroStats = siteStats.map(({ value, label }) => {
  const match = /^([\d.]+)(.*)$/.exec(value);
  return { target: Number(match?.[1] ?? 0), suffix: match?.[2] || undefined, label };
});

const faqs = [
  {
    question: "How much does a small business accountant cost?",
    answer:
      "Fees depend on complexity: turnover, payroll size, VAT scheme, number of directors, R&D activity, and whether you need management accounts as well as year-end. We quote a fixed fee in writing after a short discovery call, and nothing is added without your sign-off. As a rule of thumb a straightforward limited company costs less than a VAT-registered company running monthly payroll, and a sole trader return costs less again.",
  },
  {
    question: "Do I need an accountant for a limited company?",
    answer:
      "There is no legal requirement to use one, but a limited company carries obligations a sole trader does not: statutory accounts, a CT600 corporation tax return, a confirmation statement, and director self assessment, all to deadlines that carry automatic penalties. Most directors find a fixed-fee accountant costs less than the tax and penalties a good one saves, and frees the time to run the business.",
  },
  {
    question: "Can I switch my accountant part-way through the year?",
    answer:
      "Yes, and you do not need to wait for your year-end. We write to your current accountant for professional clearance and the handover information, move your records across, and pick up wherever things stand. Most switches are done within a couple of weeks with nothing for you to chase.",
  },
  {
    question: "Online accountant or local accountant: which is better?",
    answer:
      "For most UK small businesses the location of the office matters far less than the quality of the advice and how quickly you get a reply. We work cloud-first through Xero, FreeAgent or QuickBooks, with one named accountant on your file, so you get a national specialist who answers within a working day rather than whoever happens to be down the road.",
  },
  {
    question: "What does a fixed-fee accountant include?",
    answer:
      "Your fee is agreed up front and covers the scope you sign off: usually year-end accounts and tax filings, plus payroll, VAT or self assessment where relevant, and questions through the year. Ad-hoc advice is not billed by the hour. One-off projects outside the scope, such as an R&D claim, an incorporation or a disposal, are quoted separately before any work starts.",
  },
  {
    question: "Do you work with sole traders and partnerships, or only limited companies?",
    answer:
      "All four UK trading structures. Sole traders, partnerships, LLPs and limited companies are all on the engagement roster. The work that applies depends on the structure: self assessment for sole traders and partners, partnership returns where relevant, and corporation tax with director pay planning for limited companies.",
  },
  {
    question: "Should I be a sole trader or a limited company?",
    answer:
      "It depends mostly on profit. Below roughly the level where you draw all the profit to live on, a sole trader is simpler and the tax difference is small. Once profits rise and you can leave money in the business, a limited company usually wins on tax and gives you limited liability, at the cost of public filing and more admin. We model both on your real numbers before you decide.",
  },
  {
    question: "When does my business need to register for VAT?",
    answer:
      "You must register once your VAT-taxable turnover passes £90,000 in any rolling twelve-month period, or if you expect to pass it in the next thirty days alone. You can also register voluntarily below that, which sometimes pays. We watch the threshold for you and handle registration and scheme choice when the time comes.",
  },
  {
    question: "Who writes and reviews the content on this site?",
    answer:
      "Articles are written and reviewed by James Holloway, a senior accountant with the firm. Every figure is traceable to a primary source: HMRC guidance, Companies House, or the relevant statute. The content explains the mechanics; it is editorial, not tailored advice. For advice specific to your business, book a short call. No pitch, no obligation.",
  },
  {
    question: "How does the relationship work, week to week?",
    answer:
      "Cloud-first through Xero, FreeAgent or QuickBooks, depending on what you already use, with one named accountant on the engagement. Email and scheduled calls, with ad-hoc questions answered within one working day. The annual cycle runs from bookkeeping handover through VAT quarters where relevant, monthly payroll, year-end accounts, and a planning conversation before the next year starts.",
  },
];

// --- Schema graph (one #organization @id graph) -----------------------------
const siteUrl = siteConfig.url;

const localBusinessSchema = buildAccountingService({
  name: siteConfig.name,
  description:
    "Fixed-fee accountants for UK small businesses: limited companies, sole traders, contractors and partnerships. Corporation tax, VAT, payroll, self assessment, MTD and R&D credits, with national coverage.",
  url: siteUrl,
  city: "Bradford",
  address: {
    streetAddress: "20 Ashfield Avenue, Shipley",
    addressLocality: "Bradford",
    postalCode: "BD18 3AL",
    addressCountry: "GB",
  },
});
// The builder hardcodes areaServed to City and omits parentOrganization / structured
// opening hours; override for a national instance, mirroring the locations page. No
// price band is published anywhere on this site, so none is asserted here either.
Object.assign(localBusinessSchema as Record<string, unknown>, {
  areaServed: { "@type": "Country", name: "United Kingdom" },
  parentOrganization: { "@type": "Organization", "@id": `${siteUrl}#organization` },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
});

const serviceSchema = buildService({
  name: "Small business accounting and tax services",
  description:
    "Year-round accounting and tax for UK limited companies, sole traders, contractors and partnerships: corporation tax, VAT, payroll, self assessment, Making Tax Digital and R&D tax credits, on a fixed fee.",
  url: siteUrl,
  serviceType: "Small business accounting and tax advice",
  areaServed: "United Kingdom",
  hasOfferCatalog: {
    name: "Small business accounting services",
    items: [
      "Corporation tax and year-end accounts",
      "VAT and Making Tax Digital",
      "Payroll, PAYE and pensions",
      "Self assessment and partnership returns",
      "R&D tax credits",
      "Company formation and incorporation",
      "Director pay and tax planning",
      "Exit and capital gains planning",
    ],
  },
});

const webPageSchema: SchemaThing = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}#webpage`,
  url: siteUrl,
  name: META_TITLE,
  description: META_DESC,
  isPartOf: { "@id": `${siteUrl}#website` },
  about: { "@id": `${siteUrl}#organization` },
  inLanguage: "en-GB",
};

export default function HomePage() {
  const recentPosts = getAllPosts()
    .slice(0, 3)
    .map((post) => ({ ...post, categorySlug: getCategorySlug(post) }));

  return (
    <>
      {/* 1. Homepage only, not site-wide: Property measured 586 shows / 1 click
          for the site-wide mount and pulled it back to the homepage. */}
      <StickyCTA />

      {/* 2. JSON-LD set. Organization + WebSite ship site-wide from the root layout. */}
      <JsonLd
        data={[
          webPageSchema,
          localBusinessSchema,
          serviceSchema,
          buildBreadcrumb([{ label: "Home" }]),
          buildFaqPage(faqs),
        ].filter((s): s is NonNullable<typeof s> => s !== null)}
      />

      {/* 3. HERO: navy with the ruled-ledger motif on the right. */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[600px] sm:py-12 lg:min-h-[700px] lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-primary-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg ring-1 ring-white/25 backdrop-blur-lg sm:mb-6 sm:text-sm">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-400" />
              </span>
              Making Tax Digital is live for sole traders
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl">
              Fixed-fee small business accountants for UK limited companies, sole traders and
              contractors
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg lg:text-xl">
              UK business accounting, done with conviction. Year-round compliance and the
              advisory you actually want: one named accountant, cloud-first delivery, and fixed
              fees agreed up front.
            </p>
            <div className="mt-6 flex flex-col flex-wrap gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              {/* 4. Primary CTA scrolls to the on-page form. */}
              <Link
                href={activeCta.hero_primary.href}
                data-cta="hero_primary"
                data-cta-placement="hero"
                data-cta-goal="form"
                data-cta-variant={niche.cta.variant}
                className={`${btnPrimary} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
              >
                {activeCta.hero_primary.label}
              </Link>
              {/* 5. Secondary CTA scrolls to the calculators band. */}
              {activeCta.hero_secondary ? (
                <Link
                  href={activeCta.hero_secondary.href}
                  data-cta="hero_secondary"
                  data-cta-placement="hero"
                  data-cta-variant={niche.cta.variant}
                  className={`${btnOnDark} px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg`}
                >
                  {activeCta.hero_secondary.label}
                </Link>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-200 sm:mt-8 sm:gap-6 sm:text-sm">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                  <span className="font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATS STRIP: the two duplicate proof bands merged into one. */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsCounter stats={heroStats} />
        </div>
      </section>

      {/* 7. Self-identification, before any claim about us. */}
      <HomeProblemStatement />

      {/* 8 + 9. */}
      <WhoWeAreSection />
      <WhyChooseUsSection />

      {/* 10. SERVICES GRID. */}
      <section className="bg-primary-50/60 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-8 max-w-3xl sm:mb-12">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              What a small business accountant does across the year
            </h2>
            <Prose>
              <p>
                Four blocks of work cover most of what a UK business owner needs: the year-end
                filing, the VAT rhythm, the payroll, and how you pay yourself. Everything else
                is built on top of those.
              </p>
            </Prose>
          </div>
          <ScrollGlowGroup className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="rounded-xl border border-primary-100 bg-white p-6 shadow-[0_6px_20px_-8px_rgba(234,88,12,0.28)] transition-colors duration-200 hover:border-primary-300"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <service.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* 11. */}
      <WhatWeCoverSection />

      {/* 12. CALCULATORS. Tabs render buttons, so this band also carries a
          literal link to a tool page (the calculator-tabs-crawl-path guard). */}
      <section id="calculators" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-8 max-w-3xl sm:mb-12">
            <Eyebrow>Free tools</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Work out where you stand before you call anyone
            </h2>
            <Prose>
              <p>
                Pick a tab and the calculator loads in place. Every figure is 2026/27, and
                nothing you type leaves your browser.
              </p>
            </Prose>
          </div>
          <CalculatorTabs />
          <p className="mt-6 text-sm text-slate-600">
            Prefer the full page for one of these?{" "}
            <Link href="/calculators/salary-dividend-optimiser" className={linkArrow}>
              Open the salary and dividend optimiser
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
          <div className="mt-6">
            <Link
              href="/calculators"
              data-cta="home_calculators_all"
              data-cta-placement="calculator_bridge"
              className={linkArrow}
            >
              See all {allTools().length} calculators
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Testimonials OMITTED: no real anonymisable quotes exist, and the
          band is never invented (DESIGN_DELTA §4b). */}

      {/* 14. LATEST INSIGHTS. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="mb-8 sm:mb-12">
            <Eyebrow>From the blog</Eyebrow>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">
              Latest guidance for UK business owners
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link
                  href={`/blog/${post.categorySlug}/${post.slug}`}
                  className="flex items-center gap-4 py-4 sm:gap-6 sm:py-5"
                >
                  <span className="hidden w-40 shrink-0 text-xs font-bold uppercase tracking-wider text-primary-700 sm:block">
                    {post.category}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary-700 sm:hidden">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary-700 sm:text-lg">
                      {post.title}
                    </h3>
                    {post.summary ? (
                      <p className="mt-1 hidden text-sm text-slate-600 line-clamp-1 sm:block">
                        {post.summary}
                      </p>
                    ) : null}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary-600"
                  />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 sm:mt-12">
            <Link href="/blog" className={linkArrow}>
              View all articles
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 15. CLOSING BAND: the on-page form every primary CTA scrolls to. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Get started"
          title={activeCta.home_cta.heading}
          description={activeCta.home_cta.body}
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Request callback" />}
          backdrop={<GeneralistBackdrop />}
        />
      </div>

      {/* 16. FAQ: the same `faqs` binding that feeds buildFaqPage above, so the
          rendered questions and the FAQPage schema cannot drift. */}
      <FaqSection mountAnswers eyebrow="Common questions" title="The honest answers" faqs={faqs} />
    </>
  );
}
