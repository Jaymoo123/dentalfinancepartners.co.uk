import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogoHero } from "@/components/brand/BrandLogoHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { TestimonialSlider } from "@/components/solicitors/TestimonialSlider";
import { getAllPosts, getCategorySlug, calculateReadTime } from "@/lib/blog";

const btnMailOutline =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export const metadata: Metadata = {
  title: "Accountant for Solicitors UK | Specialist Law Firm Accountants",
  description: "Expert accounting for UK solicitors and law firms. SRA compliance, trust accounting, partnership tax, LLP conversion advice. Book free consultation with legal sector specialists.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Accountant for Solicitors UK | Specialist Law Firm Accountants",
    description: "Expert accounting for UK solicitors and law firms. SRA compliance, trust accounting, partnership tax, LLP conversion advice. Book free consultation with legal sector specialists.",
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
    body: "From self-assessment tax returns to allowable expense claims and Making Tax Digital preparation. Our solicitor accountants ensure your practice finances are compliant and your personal tax position is optimized, particularly with the April 2026 MTD rollout.",
  },
  {
    title: "Law Firm Partners",
    subtitle: "Partnership tax · LLP conversion · Profit extraction",
    body: "Managing partnership profit allocations, drawings, and structure decisions creates complexity. Our law firm accountants provide clarity on partnership vs LLP taxation, profit extraction strategies, and long-term tax planning.",
  },
  {
    title: "Practice Managers & COFAs",
    subtitle: "SRA compliance · Trust accounting · Reporting",
    body: "If you're responsible for client money and SRA compliance, you need accountants who understand the Accounts Rules as well as you do. We handle reconciliations, Accountant's Reports, and regulatory compliance so you can focus on practice management.",
  },
];

const howWeWorkItems = [
  {
    n: "01",
    title: "SRA-compliant accounting",
    body: "Accurate client account reconciliations, trust accounting, and preparation of annual Accountant's Reports in full compliance with SRA Accounts Rules. We ensure your client money handling meets regulatory standards.",
  },
  {
    n: "02",
    title: "Partnership & LLP tax returns",
    body: "Complete handling of partnership tax returns, LLP member allocations, and individual partner self-assessments. We navigate Basis Period Reform and optimize profit extraction strategies.",
  },
  {
    n: "03",
    title: "VAT compliance for legal services",
    body: "Expert VAT advice on legal services, disbursements vs expenses treatment, counsel fees, and registration thresholds. We ensure your VAT position is correct and compliant.",
  },
  {
    n: "04",
    title: "Practice finance & cash flow",
    body: "Working capital management, lock-up reduction strategies, and cash flow forecasting tailored to legal practices. We help you manage partner drawings and fund practice growth.",
  },
  {
    n: "05",
    title: "Structure optimization & LLP conversion",
    body: "Advising on partnership vs LLP structures, conversion tax implications, and profit extraction strategies. We help you choose and implement the most tax-efficient structure for your practice.",
  },
  {
    n: "06",
    title: "Practice succession & valuation",
    body: "Expert guidance on practice valuations, goodwill calculations, partner retirement planning, and practice sales. We ensure smooth transitions and optimal tax treatment.",
  },
];

const trustItems = [
  {
    title: "Legal-only focus",
    stat: "100%",
    body: "100% legal sector focus. Every accountant on our team works exclusively with solicitors, law firms, and legal practitioners.",
  },
  {
    title: "SRA compliance expertise",
    stat: "100%",
    body: "100% pass rate on SRA Accountant's Reports. We understand the Accounts Rules and client money regulations as well as you do.",
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
    body: "Every accountant on our team specializes in SRA Accounts Rules, client money compliance, partnership/LLP taxation, legal sector VAT, and practice succession planning. We speak your language and understand your regulatory environment.",
  },
  {
    title: "Proactive tax planning",
    body: "Beyond compliance, our solicitor accountants provide strategic tax planning, structure optimization, and practice finance advice. We help legal professionals make informed financial decisions to protect and grow your practice.",
  },
  {
    title: "Clear, accessible service",
    body: "Fixed fees, no jargon, and direct access to your dedicated solicitor accountant. We're here to provide clarity and support whenever you need it.",
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
  const orgSchema = buildOrganizationJsonLd();
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <section
        className={sectionYLoose}
        style={{
          background: "linear-gradient(135deg, rgba(196, 30, 58, 0.75) 0%, rgba(160, 24, 41, 0.80) 100%), url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070') center/cover",
          color: "white",
        }}
      >
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-4xl text-center">
            <BrandLogoHero />
            <p className="mt-6 text-xl leading-relaxed text-white/90 md:text-2xl">
              {siteConfig.tagline}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              SRA Accounts Rules compliance, trust accounting, partnership tax, LLP conversion, and practice succession planning. We understand the unique challenges facing legal practices.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className={btnPrimary} style={{ background: "white", borderColor: "white", color: "var(--primary)" }}>
                Book free consultation
              </Link>
              <Link href="/services" className={btnMailOutline}>
                Our services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionY} style={{ background: "var(--surface-elevated)" }}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Trusted by legal professionals
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Why solicitors choose specialist accountants
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              26.2% of SRA firm closures are due to accounting breaches. With heightened regulatory scrutiny, MTD for Income Tax starting April 2026, and complex partnership taxation, you need accountants who understand the legal sector.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {trustItems.map((item, i) => (
              <div key={i} className="card-premium text-center">
                <div className="text-4xl font-bold text-[var(--accent)]">{item.stat}</div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--primary)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              What our clients say
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Real results for law firms
            </h2>
          </div>
          <div className="mt-10 max-w-3xl mx-auto">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      <section className={sectionY}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Latest insights
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Expert guidance for UK solicitors
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Stay informed with our latest articles on SRA compliance, tax planning, and practice management.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {recentPosts.map((post) => {
              const categorySlug = getCategorySlug(post);
              const readTime = calculateReadTime(post.contentHtml);
              return (
                <article key={post.slug} className="card-flat group">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                    {post.category}
                  </p>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-[var(--primary)] leading-tight">
                    <Link
                      href={`/blog/${categorySlug}/${post.slug}`}
                      className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-[var(--muted)]">
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
                  <Link
                    href={`/blog/${categorySlug}/${post.slug}`}
                    className={`mt-4 inline-flex items-center text-sm font-medium text-[var(--primary)] hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                  >
                    Read article
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className={`inline-flex items-center min-h-[48px] px-6 py-3 rounded-lg border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] font-medium transition-all hover:bg-[var(--primary)] hover:text-white ${focusRing}`}
            >
              View all articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionY} style={{ background: "var(--surface-elevated)" }}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              The reality
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              What generalist accountants miss
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              Legal practices have unique accounting challenges. Here's what happens when you work with accountants who don't specialize in the legal sector:
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {realityPoints.map((point, i) => (
              <div key={i} className="card-flat">
                <h3 className="text-lg font-semibold text-[var(--primary)]">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY} style={{ background: "var(--surface-elevated)" }}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Who we work with
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Specialist accounting for every type of legal practice
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {whoWeWorkWith.map((item, i) => (
              <div key={i} className="card-premium">
                <h3 className="text-xl font-semibold text-[var(--primary)]">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-[var(--accent)]">{item.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              How we work
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Complete accounting for solicitors and law firms
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              From SRA compliance to strategic tax planning, we provide comprehensive accounting services tailored to the legal sector.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {howWeWorkItems.map((item, i) => (
              <div key={i} className="card-flat">
                <div className="text-3xl font-bold text-[var(--accent)]">{item.n}</div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--primary)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY} style={{ background: "var(--surface-elevated)" }}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Why it matters
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Specialist vs generalist accountants
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
              When you work with accountants who specialize in the legal sector, here's what changes:
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-[var(--border)] bg-white">
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--primary)", color: "white" }}>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Area</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">With specialist solicitor accountants</th>
                </tr>
              </thead>
              <tbody>
                {specialistRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "white" : "var(--surface-elevated)",
                    }}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[var(--primary)]">{row.area}</td>
                    <td className="px-6 py-4 text-sm text-[var(--ink-soft)]">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={sectionY}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              Why choose us
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
              Specialist accountants for solicitors
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {whySpecialistItems.map((item, i) => (
              <div key={i} className="card-premium">
                <h3 className="text-xl font-semibold text-[var(--primary)]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionY} style={{ background: "var(--surface-elevated)" }}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                Get started
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--primary)] md:text-4xl">
                Book your free consultation
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                Whether you're a sole practitioner managing self-assessment, a partner navigating LLP conversion, or a COFA ensuring SRA compliance, we're here to help. Fill in the form below and we'll arrange a short introductory call to discuss your specific needs.
              </p>
            </div>

            <div className="mt-10">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>


      <section className={sectionY}>
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-3xl">
            <details className="card-premium">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-[var(--primary)]">
                <span>Why do I need a specialist solicitor accountant?</span>
                <span className="text-2xl text-[var(--accent)]">+</span>
              </summary>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                <p>
                  Legal practices face unique accounting challenges that generalist accountants often don't understand. SRA Accounts Rules require strict client money handling, 5-week reconciliations, and annual Accountant's Reports. Partnership and LLP taxation involves complex profit allocations, drawings, and Basis Period Reform implications. VAT on legal services has specific rules around disbursements and counsel fees.
                </p>
                <p>
                  A specialist solicitor accountant understands these nuances, ensures regulatory compliance, and provides strategic advice on practice structure, succession planning, and tax optimization. With 26.2% of SRA firm closures due to accounting breaches, having specialist support isn't just helpful—it's essential for protecting your practicing certificate and optimizing your practice finances.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
