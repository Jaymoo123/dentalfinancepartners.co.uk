import type { Metadata } from "next";
import Link from "next/link";
import { Check, TriangleAlert } from "lucide-react";
import { BrandLogoHero } from "@/components/brand/BrandLogoHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { TestimonialSlider } from "@/components/solicitors/TestimonialSlider";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { siteStats, serviceTiers } from "@/config/service-tiers";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { niche } from "@/config/niche-loader";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";

const activeCta = getActiveCta(niche);
const packagesMode = isPackagesMode(niche);

const btnMailOutline =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

/** Dark-band resource card, the contract recipe (rounded-xl + a ring) on navy/crimson. */
const resourceCard =
  "group block rounded-xl bg-white/5 p-6 ring-1 ring-white/20 transition-all hover:bg-white/10 hover:ring-white";

export const metadata: Metadata = {
  title: "Accountants for Solicitors UK 2025/26 | SRA + LLP + Partner Tax",
  description: "Specialist accountancy matching for UK solicitors and law firms. SRA Accountant's Report, LLP and partnership tax, BADR pre-sale planning. Fixed monthly fees.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Accountants for Solicitors UK 2025/26 | SRA + LLP + Partner Tax",
    description: "Specialist accountancy matching for UK solicitors and law firms. SRA Accountant's Report, LLP and partnership tax, BADR pre-sale planning. Fixed monthly fees.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
};

const realityPoints = [
  {
    title: "SRA Accounts Rules complexity",
    body: "Managing client money, trust accounts, and 5-week reconciliations requires specialized knowledge. Generalist accountants often miss the nuances of SRA compliance, putting your practicing certificate at risk.",
  },
  {
    title: "Partnership and LLP tax confusion",
    body: "Basis Period Reform and potential employer NI changes for LLPs create uncertainty. Without specialist advice on profit allocation, drawings, and structure optimization, you may be paying more tax than necessary.",
  },
  {
    title: "Cash flow and lock-up pressure",
    body: "Law firms face average lock-up of 128-139 days. Without proper working capital management and cash flow forecasting, practices struggle with partner drawings and growth investment.",
  },
  {
    title: "Practice succession uncertainty",
    body: "Valuing goodwill, planning partner retirements, and structuring practice sales require sector-specific expertise. Poor succession planning leads to lower valuations and unexpected tax charges.",
  },
];

const whoWeWorkWith = [
  {
    title: "Sole Practitioners",
    subtitle: "Self-assessment · Expenses · MTD compliance",
    body: "From self-assessment tax returns to allowable expense claims and Making Tax Digital preparation. The specialist accountant we match you with keeps your practice finances compliant and your personal tax position optimized, particularly with the April 2026 MTD rollout.",
  },
  {
    title: "Law Firm Partners",
    subtitle: "Partnership tax · LLP conversion · Profit extraction",
    body: "Managing partnership profit allocations, drawings, and structure decisions creates complexity. The law firm accountant we match you with gives clarity on partnership vs LLP taxation, profit extraction strategies, and long-term tax planning.",
  },
  {
    title: "Practice Managers & COFAs",
    subtitle: "SRA compliance · Trust accounting · Reporting",
    body: "If you're responsible for client money and SRA compliance, you need accountants who understand the Accounts Rules as well as you do. We put you with a firm that handles reconciliations, Accountant's Reports, and regulatory compliance, so you can focus on practice management.",
  },
];

const howWeWorkItems = [
  {
    n: "01",
    title: "SRA-compliant accounting",
    body: "Accurate client account reconciliations, trust accounting, and preparation of annual Accountant's Reports in full compliance with SRA Accounts Rules, so your client money handling meets regulatory standards.",
  },
  {
    n: "02",
    title: "Partnership & LLP tax returns",
    body: "Complete handling of partnership tax returns, LLP member allocations, and individual partner self-assessments. Your partner firm navigates Basis Period Reform and optimizes profit extraction strategies.",
  },
  {
    n: "03",
    title: "VAT compliance for legal services",
    body: "Expert VAT advice on legal services, disbursements vs expenses treatment, counsel fees, and registration thresholds. The result is a VAT position that is correct and compliant.",
  },
  {
    n: "04",
    title: "Practice finance & cash flow",
    body: "Working capital management, lock-up reduction strategies, and cash flow forecasting tailored to legal practices. The support covers partner drawings and funding practice growth.",
  },
  {
    n: "05",
    title: "Structure optimization & LLP conversion",
    body: "Advising on partnership vs LLP structures, conversion tax implications, and profit extraction strategies. Your partner firm helps you choose and implement the most tax-efficient structure for your practice.",
  },
  {
    n: "06",
    title: "Practice succession & valuation",
    body: "Expert guidance on practice valuations, goodwill calculations, partner retirement planning, and practice sales. The aim is a smooth transition with optimal tax treatment.",
  },
];

const trustItems = [
  {
    title: "Legal-only focus",
    stat: "100%",
    body: "100% legal sector focus. Every firm we match you with works with solicitors, law firms, and legal practitioners.",
  },
  {
    title: "SRA Accounts Rules",
    stat: "Client money",
    body: "Client account reconciliations, residual balances and the annual accountant's report are handled on a monthly rhythm against the Accounts Rules, so year-end is a check on work already done.",
  },
  {
    title: "Transparent pricing",
    stat: "Fixed fees",
    body: "Clear, agreed fees with no hidden charges. You know exactly what you're paying for.",
  },
];

const whySpecialistItems = [
  {
    title: "Solicitor accountant expertise",
    body: "The accountants we match you with specialize in SRA Accounts Rules, client money compliance, partnership/LLP taxation, legal sector VAT, and practice succession planning. We speak your language and understand your regulatory environment.",
  },
  {
    title: "Proactive tax planning",
    body: "Beyond compliance, the partner firms in our network provide strategic tax planning, structure optimization, and practice finance advice, so legal professionals can make informed financial decisions to protect and grow the practice.",
  },
  {
    title: "Clear, accessible service",
    body: "Fixed fees, no jargon, and direct access to the solicitor accountant we match you with. We're here to help whenever you need it.",
  },
];

const specialistRows = [
  { area: "SRA Accounts Rules compliance", detail: "Handled with specialist knowledge" },
  { area: "Client money reconciliations", detail: "Completed accurately every 5 weeks" },
  { area: "Partnership & LLP tax returns", detail: "Prepared and filed on time" },
  { area: "VAT on legal services", detail: "Correctly applied and reported" },
  { area: "Practice cash flow management", detail: "Monitored and optimized" },
  { area: "Practice succession planning", detail: "Structured for optimal tax treatment" },
];

export default function HomePage() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <>
      {/* Organization + WebSite now ship site-wide from the root layout. */}

      {/* F.2 band 3. Navy ground plus the ruled-ledger motif. The external
          Unsplash JPEG and the crimson wash over it are retired (owner decision
          2026-09-11): the motif is first-party, needs no third-party request,
          and is the same mark the footer and 27 other surfaces already carry. */}
      <section className={`relative overflow-hidden bg-slate-900 ${sectionYLoose}`}>
        <SolicitorsBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <BrandLogoHero />
            <p className="mt-6 text-xl leading-relaxed text-white/90 md:text-2xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              SRA Accounts Rules compliance, trust accounting, partnership tax, LLP conversion, and practice succession planning. We understand the unique challenges facing legal practices.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={activeCta.hero_primary.href}
                className={btnPrimary}
                style={{ background: "white", borderColor: "white", color: "var(--primary)" }}
                data-cta="hero_primary" data-cta-placement="hero"
                data-cta-variant={niche.cta.variant}
              >
                {activeCta.hero_primary.label}
              </Link>
              {activeCta.hero_secondary ? (
                <Link
                  href={activeCta.hero_secondary.href}
                  className={btnMailOutline}
                  data-cta="hero_secondary" data-cta-placement="hero"
                  data-cta-variant={niche.cta.variant}
                >
                  {activeCta.hero_secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* F.2 band 4. Strip chrome only: StatsBar stays (two of the four values
          are not numeric, so StatsCounter cannot carry them without new copy). */}
      <section className="border-b border-slate-200 bg-white py-5 sm:py-7">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
        </div>
      </section>

      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Trusted by legal professionals</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Why solicitors choose specialist accountants
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              26.2% of SRA firm closures are due to accounting breaches. With heightened regulatory scrutiny, MTD for Income Tax starting April 2026, and complex partnership taxation, you need accountants who understand the legal sector.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {trustItems.map((item, i) => (
              <div key={i} className="card-premium">
                <div className="text-4xl font-bold text-[var(--primary)]">{item.stat}</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F.2 band 11. Navy band, local slider kept: the kit TestimonialsSection
          hardcodes Property's own testimonials with no prop (plan section 0.2). */}
      <section className={`relative overflow-hidden bg-slate-900 ${sectionY}`}>
        <SolicitorsBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Eyebrow onDark>What the work looks like</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Four situations legal sector accountants see repeatedly
            </h2>
          </div>
          <div className="mt-10">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* F.2 band 12. Card grid to a ruled row list. Every text node the cards
          carried is still here: category, title, summary, date, bullet, read
          time, and the "Read article" affordance with its own href. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Latest insights</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Expert guidance for UK solicitors
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Stay informed with our latest articles on SRA compliance, tax planning, and practice management.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {recentPosts.map((post) => {
              const categorySlug = getCategorySlug(post);
              const readTime = calculateReadTime(post.contentHtml);
              return (
                <article key={post.slug} className="group py-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                    <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] sm:w-44">
                      {post.category}
                    </p>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold leading-tight text-slate-900">
                        <Link
                          href={`/blog/${categorySlug}/${post.slug}`}
                          className={`transition-colors hover:text-[var(--primary)] ${focusRing} rounded`}
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)] line-clamp-2">
                        {post.summary}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-[var(--muted)]">
                        {post.date && (
                          <time dateTime={post.date}>
                            {new Intl.DateTimeFormat("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(post.date))}
                          </time>
                        )}
                        <span>•</span>
                        <span>{readTime} min read</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${categorySlug}/${post.slug}`}
                      className={`inline-flex shrink-0 items-center text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--accent-strong)] ${focusRing} rounded`}
                    >
                      Read article
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className={`inline-flex items-center min-h-[48px] px-6 py-3 rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] font-medium transition-all hover:bg-[var(--primary)] hover:text-white ${focusRing}`}
            >
              View all articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* F.2 band 5. Restyled in place, NOT the kit ProblemStatement, which
          hardcodes Property's landlord prose (plan section 0.2 / R1). */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>The reality</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              What generalist accountants miss
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Legal practices have unique accounting challenges. Here's what happens when you work with accountants who don't specialize in the legal sector:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {realityPoints.map((point, i) => (
              <div key={i} className="card-flat flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                  <TriangleAlert aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F.2 band 6. White ground, so the cards take the opposing slate ground
          via a utility (the .card-premium recipe itself is untouched: plan 0.7). */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Who we work with</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Specialist accounting for every type of legal practice
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whoWeWorkWith.map((item, i) => (
              <div key={i} className="card-premium bg-slate-50">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-[var(--accent)]">{item.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F.2 band 8. Six cards stay six; the count is in no visible string. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Complete accounting for solicitors and law firms
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              From SRA compliance to strategic tax planning, we connect you with partner firms covering the full range of accounting services the legal sector needs.
            </p>
          </div>

          <ScrollGlowGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {howWeWorkItems.map((item, i) => (
              <div key={i} className="card-flat">
                <div className="text-3xl font-bold text-[var(--primary)]">{item.n}</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Restyled in place, NOT the kit ComparisonTable, which hardcodes
          Property's own rows and pills (plan R1). */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Specialist vs generalist accountants
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              When you work with accountants who specialize in the legal sector, here's what changes:
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200/70">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Area</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">With specialist solicitor accountants</th>
                </tr>
              </thead>
              <tbody>
                {specialistRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.area}</td>
                    <td className="px-6 py-4 text-sm text-[var(--ink-soft)]">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* F.2 band 7. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Specialist accountants for solicitors
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whySpecialistItems.map((item, i) => (
              <div key={i} className="card-premium">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                  <Check aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="mb-10 max-w-3xl">
            <Eyebrow>How we can help</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Choose the level of support that fits your firm
            </h2>
          </div>
          <ServiceTiers tiers={serviceTiers} featuredBadge="Most chosen" />
        </div>
      </section>

      {/* F.2 band 9. Already carries the literal /calculators anchor the
          contract requires; band 10 (#calculators + CalculatorTabs) is NOT
          built, it needs a new heading and standfirst (plan R7). */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Free resources</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
            Tools and guides built specifically for UK law firms
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            Free calculators, pillar guides, a tax-rates reference, and a 10-minute firm health check. All UK 2025/26 rates and current SRA Accounts Rules.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {!packagesMode ? (
              <Link href="/free-firm-health-check" className={resourceCard}>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 mb-2">Diagnostic · 10 min</p>
                <h3 className="text-base font-semibold text-white">Free firm health check</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  15+ solicitor-specific rules across SRA, FA 2014, BADR, structure, MTD.
                </p>
              </Link>
            ) : null}
            <Link href="/calculators" className={resourceCard}>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 mb-2">6 calculators</p>
              <h3 className="text-base font-semibold text-white">Law firm calculators</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                Valuation, FA 2014 test, LLP profit share, take-home, PII estimator, SRA reserve.
              </p>
            </Link>
            <Link href="/solicitor-guides" className={resourceCard}>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 mb-2">6 pillar guides</p>
              <h3 className="text-base font-semibold text-white">Pillar guides</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                SRA Accounts Rules, partnership vs LLP, post-merger, PII, COFA, fee-share vs equity.
              </p>
            </Link>
            <Link href="/uk-solicitor-tax-rates" className={resourceCard}>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 mb-2">Reference · 2025/26</p>
              <h3 className="text-base font-semibold text-white">UK solicitor tax rates</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                Income tax, NI, CT, BADR, dividend, CGT, plus legal-sector specifics.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {packagesMode ? (
        <section className={`bg-slate-50 ${sectionY}`}>
          <div className={siteContainerLg}>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Get started
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                  {activeCta.home_cta.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                  {activeCta.home_cta.body}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={activeCta.home_cta.primary.href}
                    className={btnPrimary}
                    data-cta="home_cta_primary" data-cta-placement="home_cta"
                    data-cta-variant={niche.cta.variant}
                  >
                    {activeCta.home_cta.primary.label}
                  </Link>
                  {activeCta.home_cta.secondary ? (
                    <Link
                      href={activeCta.home_cta.secondary.href}
                      className={`inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--primary)] transition-all duration-200 hover:bg-[var(--primary)] hover:text-white ${focusRing}`}
                      data-cta="home_cta_secondary" data-cta-placement="home_cta"
                      data-cta-variant={niche.cta.variant}
                    >
                      {activeCta.home_cta.secondary.label}
                    </Link>
                  ) : null}
                </div>
              </div>

              <p className="mt-12 text-center text-sm text-[var(--ink-soft)]">
                Or send us a note and we will come back to you.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* F.2 band 13. The live branch. `contained` rather than the navy
           variant because the band directly above is the crimson resources
           slab and the band below runs toward the navy footer: two dark fields
           with no light between them read as one slab (LeadCTAPanel docstring).
           Heading and body are the existing literals, moved byte for byte, and
           `eyebrow` carries the existing "Get started" label so no string is
           lost. No button is rendered: plan R6, an owner item.
           `proofPoints` is deliberately EMPTY, see the receipt. */
        <div id="book" className="scroll-mt-24">
          <LeadCTAPanel
            eyebrow="Get started"
            formTitle=""
            title="Book your free consultation"
            description="Whether you're a sole practitioner managing self-assessment, a partner navigating LLP conversion, or a COFA ensuring SRA compliance, we're here to help. Fill in the form below and we'll arrange a short introductory call to discuss your specific needs."
            proofPoints={[]}
            form={<LeadForm />}
            contained
          />
        </div>
      )}


      {/* F.2 band 14. The <details> becomes the phase-4 <dl> recipe: the same
          two paragraphs, always rendered (they were already in the server HTML).
          Not the kit FaqSection, per the phase-4 manager override. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <dl className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
              <dt className="text-lg font-semibold text-slate-900">
                Why do I need a specialist solicitor accountant?
              </dt>
              <dd className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                <p>
                  Legal practices face unique accounting challenges that generalist accountants often don't understand. SRA Accounts Rules require strict client money handling, 5-week reconciliations, and annual Accountant's Reports. Partnership and LLP taxation involves complex profit allocations, drawings, and Basis Period Reform implications. VAT on legal services has specific rules around disbursements and counsel fees.
                </p>
                <p>
                  A specialist solicitor accountant understands these nuances, ensures regulatory compliance, and provides strategic advice on practice structure, succession planning, and tax optimization. With 26.2% of SRA firm closures due to accounting breaches, having specialist support isn't just helpful, it's essential for protecting your practicing certificate and optimizing your practice finances.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </section>

    </>
  );
}
