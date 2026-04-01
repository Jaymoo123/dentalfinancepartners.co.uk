import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogoHero } from "@/components/brand/BrandLogoHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getCategorySlug } from "@/lib/blog";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

const btnMailOutline =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--navy)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)] hover:bg-[var(--navy)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

export const metadata: Metadata = {
  title: "Dental Accountant UK | Specialist Accounting for Dentists",
  description: "Specialist dental accountant UK for associates, practice owners & groups. NHS contracts, associate tax, VAT & acquisitions. London & Manchester. Book a free consultation.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Dental Accountant UK | Specialist Accounting for Dentists",
    description: "Specialist dental accountant UK for associates, practice owners & groups. NHS contracts, associate tax, VAT & acquisitions. London & Manchester.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
};

const PRACTICAL_SLUGS = [
  "associate-dentist-tax-self-assessment-uk",
  "dental-practice-profit-extraction-uk",
  "practice-acquisition-financial-due-diligence",
] as const;

const realityPoints = [
  {
    title: "Mixed NHS and private income",
    body: "Reconciling NHS contract payments alongside private fee income and capitation plans — and understanding what each actually contributes to your profit — is something most generalist accountants simply do not encounter. We do, regularly.",
  },
  {
    title: "Self assessment confusion for associates",
    body: "Associate dentists are almost always self-employed, but many are not clear on what they can legitimately claim, when to register for VAT, or how their income interacts with pension contributions and higher-rate tax. These things matter.",
  },
  {
    title: "No useful management information",
    body: "Year-end accounts tell you what happened. They rarely help you make decisions. Practice owners who want to understand their cost per surgery, chair utilisation, or associate versus principal profitability need something more structured.",
  },
  {
    title: "Growth without a financial plan",
    body: "Buying a second site or taking on an associate feels like the right move — but without proper cash flow modelling and an understanding of how that changes your tax position, it can create as many problems as it solves.",
  },
];

const whoWeWorkWith = [
  {
    title: "Associate Dentists",
    subtitle: "Self-employed · NHS & private",
    body: "If you are working as an associate, you are running a small business — whether it feels like it or not. Self assessment, allowable expenses, pension planning, and knowing when incorporation makes sense are all things you should have clear answers on. We handle the compliance and make sure you are not overpaying tax through simple oversights.",
  },
  {
    title: "Practice Owners",
    subtitle: "Sole trader · Limited company · Partnership",
    body: "Owning a practice brings a different set of financial questions — payroll for staff and associates, VAT on dental and non-dental income, equipment finance, goodwill, and profit extraction from a limited company. We prepare accounts that are useful, not just compliant, and advise on structure as the practice grows.",
  },
  {
    title: "Multi-Practice Groups",
    subtitle: "Group structures · Acquisition support",
    body: "Running multiple sites introduces complexity around inter-company transactions, group reporting, and acquisition accounting. We work with dentists who are building a group — whether that is two practices or ten — and can support with due diligence, restructuring, and ongoing financial management across the portfolio.",
  },
];

const howWeWorkItems = [
  {
    n: "01",
    title: "Annual accounts and corporation tax",
    body: "Prepared accurately, filed on time, and reviewed with you properly — not just emailed over as a PDF you will never open. We explain what the numbers mean for your business.",
  },
  {
    n: "02",
    title: "Self assessment and personal tax",
    body: "For associates and practice owners alike. We make sure all legitimate expenses are claimed, that your payment on account position is managed, and that you are not hit with an unexpected HMRC bill.",
  },
  {
    n: "03",
    title: "Payroll and associate payments",
    body: "Running payroll for a dental practice has its own quirks — particularly where associates are paid on a percentage split. We handle this cleanly and make sure the treatment of self-employed associates holds up to scrutiny.",
  },
  {
    n: "04",
    title: "VAT and mixed-supply advice",
    body: "Dental practices often supply a mix of exempt and standard-rated services. Getting this wrong creates problems. We review your VAT position and advise accordingly — particularly relevant for practices with significant laboratory or facial aesthetics income.",
  },
  {
    n: "05",
    title: "Management accounts and reporting",
    body: "For practice owners who want to make informed decisions throughout the year, not just at year-end. We produce monthly or quarterly management accounts structured around how a dental practice actually generates profit.",
  },
  {
    n: "06",
    title: "Practice acquisition and structuring",
    body: "Buying a practice is one of the most significant financial decisions you will make. We support with pre-purchase due diligence, advise on how to structure the acquisition, and help you understand the financial position you are taking on.",
  },
];

const trustItems = [
  {
    title: "Dental-only focus",
    stat: "100%",
    body: "We only work with dental practices. Every client is a dentist, associate, or practice owner.",
  },
  {
    title: "Proven experience",
    stat: "50+",
    body: "Trusted by over 50 dental professionals across London, Manchester, and the UK.",
  },
  {
    title: "Transparent pricing",
    stat: "Fixed fees",
    body: "No hidden charges, no long-term contracts. You know exactly what you're paying for.",
  },
];

const whySpecialistItems = [
  {
    title: "Dental-only expertise",
    body: "We only work with dentists. That means we understand NHS contracts, UDA targets, associate splits, and the sector-specific tax rules that generalist accountants rarely encounter.",
  },
  {
    title: "Proactive advice, not just compliance",
    body: "Management accounts structured for dental KPIs. Tax planning for associates and practice owners. Acquisition support and due diligence. We help you make better financial decisions, not just file returns.",
  },
  {
    title: "Transparent and accessible",
    body: "Fixed fees with no surprises. You speak to the same accountant every time. Plain English explanations, not accounting jargon. We&apos;re here when you need us.",
  },
];

const specialistRows = [
  { area: "NHS income treatment", detail: "Understood from day one" },
  { area: "Associate tax position", detail: "Reviewed carefully every year" },
  { area: "Mixed VAT supply", detail: "Assessed correctly" },
  { area: "Practice acquisition", detail: "Sector-specific due diligence" },
  { area: "Pension & superannuation", detail: "Dental-aware planning" },
  { area: "Management accounts", detail: "Structured for dental KPIs" },
];

export default function HomePage() {
  const practicalPosts = PRACTICAL_SLUGS.map((slug) => getPostBySlug(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const orgSchema = buildOrganizationJsonLd();

  return (
    <>
      <StickyCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <section className="hero-brand border-b border-white/10">
        <div className={`hero-inner ${siteContainerLg} ${sectionYLoose}`}>
          <div className="hero-reveal">
            <BrandLogoHero />
          </div>
          <h1 className="hero-reveal-delay display-serif mt-8 max-w-4xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            <span className="block">Specialist dental accountants</span>
            <span className="block">for UK practices.</span>
          </h1>
          <p className="hero-reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            We&apos;re accountants for dentists — associates, practice owners, and groups. NHS contracts, associate tax, VAT, and acquisitions. We only work with dental practices, so we understand the financial specifics that generalist accountants miss.
          </p>
          <p className="hero-reveal-delay-2 mt-4 text-sm font-medium text-white/80">
            Trusted by dental professionals across London, Manchester, and the UK.
          </p>
          <div className="hero-reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className={`${btnPrimary} min-w-0`}>
              Speak to a dental accountant
            </Link>
            <Link
              href="#how-we-work"
              className={`inline-flex min-h-12 items-center text-sm font-semibold text-white/90 underline decoration-[var(--gold)] decoration-2 underline-offset-4 transition-colors hover:text-white ${focusRing} rounded-full px-2`}
            >
              How we work →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
            We&apos;re specialist dental accountants working exclusively with UK dental practices — from newly qualified associates to established multi-site groups. Over 50 dental clients trust us with their accounting, tax, and financial planning.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="section-label">Why dentists choose us</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            Trusted by dental professionals across the UK
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="font-serif text-4xl font-bold text-[var(--gold-strong)] sm:text-5xl">
                  {item.stat}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--navy)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">The reality</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl md:text-[2.5rem]">
            <span className="block">Most dentists are</span>
            <span className="block text-[var(--gold-strong)]">financially underserved.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Dental income is rarely straightforward. Between NHS UDAs, private fee structures, associate agreements, laboratory costs, and equipment finance, the picture is genuinely complex. A generalist accountant will work with what you give them — but that&apos;s not the same as understanding how a dental practice actually operates.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {realityPoints.map((item) => (
              <article key={item.title} className="card-flat p-6 sm:p-8">
                <h3 className="text-lg font-semibold leading-snug text-[var(--navy)] sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Why choose a specialist</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            Why work with a dental accountant?
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
            {whySpecialistItems.map((item) => (
              <div key={item.title} className="card-flat p-6 sm:p-8">
                <h3 className="text-lg font-semibold leading-snug text-[var(--navy)] sm:text-xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Who we work with</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            <span className="block">We work with dentists</span>
            <span className="block">at every stage.</span>
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {whoWeWorkWith.map((block) => (
              <div key={block.title} className="min-w-0">
                <h3 className="text-xl font-semibold text-[var(--navy)]">{block.title}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--gold-strong)]">{block.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-we-work" className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">How we work</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            <span className="block">What we actually do,</span>
            <span className="block">and how we do it.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            We do not hand you a services brochure and ask you to pick a package. Most clients come to us with a specific problem, and we start from there. What follows is what ongoing support typically looks like once we are working together.
          </p>
          <ol className="mt-14 grid list-none gap-10 pl-0 sm:gap-12 lg:grid-cols-2">
            {howWeWorkItems.map((item) => (
              <li key={item.n} className="flex gap-5 sm:gap-6">
                <span
                  className="font-serif text-3xl font-semibold tabular-nums leading-none text-[var(--gold)] sm:text-4xl"
                  aria-hidden
                >
                  {item.n}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--navy)] sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <Link href="/contact" className={`${btnPrimary} inline-flex`}>
              Arrange an initial call
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Why it matters</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            The difference a specialist makes is not theoretical.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            <p>
              A generalist accountant isn&apos;t cutting corners. They simply don&apos;t see enough dental clients to build genuine expertise in how the sector works. They won&apos;t know, off the top of their head, how NHS superannuation interacts with your pension annual allowance, or what HMRC&apos;s view is on associate expense claims.
            </p>
            <p>
              We do, because it comes up constantly. That breadth of exposure — across hundreds of dental clients — means we can spot issues before they become problems, and give advice grounded in what actually happens in dental practices, not just what the textbook says.
            </p>
            <p>
              It also means the conversation is more efficient. You don&apos;t have to explain how an NHS contract works, or what a UDA is, or why your income varies each month. We already know, so we can focus on solving your specific problem.
            </p>
          </div>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical dental accounting areas</caption>
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)]">
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--navy)] sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--navy)] sm:px-6 sm:py-4">
                    {siteConfig.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {specialistRows.map((row) => (
                  <tr key={row.area} className="border-b border-[var(--border)] last:border-0">
                    <th scope="row" className="px-4 py-3.5 font-medium text-[var(--ink)] sm:px-6 sm:py-4">
                      {row.area}
                    </th>
                    <td className="px-4 py-3.5 text-[var(--muted)] sm:px-6 sm:py-4">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Practical guidance</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            <span className="block">Dental accounting insights</span>
            <span className="block">from specialists.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Real-world guidance on associate tax, practice finance, and NHS accounting — written by accountants who work exclusively with UK dental practices. Each article addresses questions we&apos;re actually asked by dentists every week.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {practicalPosts.map((p) => {
              const categorySlug = getCategorySlug(p);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${categorySlug}/${p.slug}`}
                    className={`card-premium group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[rgba(0,27,61,0.08)] ${focusRing}`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gold-strong)]">
                      {p.category}
                    </span>
                    <span className="mt-3 font-serif text-lg font-semibold leading-snug text-[var(--navy)] group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                      {p.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.summary}</span>
                    <span className="mt-4 text-sm font-semibold text-[var(--navy-soft)]">Read more →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-10">
            <Link
              href="/blog"
              className={`inline-flex min-h-11 items-center text-sm font-semibold text-[var(--navy)] underline decoration-[var(--gold)] decoration-2 underline-offset-4 ${focusRing} rounded`}
            >
              View all articles
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={siteContainerLg}>
          <div className={`${sectionYLoose} grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16`}>
            <div className="min-w-0">
              <p className="section-label">Get started</p>
              <h2 className="display-serif mt-4 text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
                Ready to work with a dental accountant who understands your practice?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Whether you&apos;re an associate looking to optimize your tax position, or a practice owner who needs proper financial visibility, the first conversation is straightforward and without obligation. Book your free consultation today.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className={`${btnPrimary}`}>
                  Book your free consultation
                </Link>
                <Link href={`mailto:${siteConfig.contact.email}`} className={btnMailOutline}>
                  Email us directly
                </Link>
              </div>
              <p className="mt-10 text-sm font-medium text-[var(--ink)]">We respond within one working day.</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Fill in the form and one of our dental accountants will be in touch to arrange a short introductory call. No hard sell — just an honest conversation about your situation and whether we&apos;re the right fit.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Prefer to call or email? You&apos;ll speak to someone who works with dental practices every day.
              </p>
              <p className="mt-6 text-sm text-[var(--muted)]">All initial conversations are confidential and carry no obligation.</p>
            </div>
            <div className="card-flat p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <p className="section-label">Common questions</p>
          <h2 className="display-serif mt-3 text-2xl font-semibold text-[var(--navy)] sm:text-3xl">Frequently asked.</h2>
          <div className="mt-8 max-w-3xl">
            <details className="group card-flat open:shadow-md">
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[var(--navy)] sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  Do I need a specialist accountant as a dentist?
                  <span className="text-[var(--gold-strong)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)] sm:px-6 sm:py-5 sm:text-base">
                <p>
                  Not strictly — but the question is whether a generalist accountant can give you genuinely useful advice on the financial specifics of dentistry. In our experience, the gap shows most clearly around NHS income, VAT on mixed dental supplies, associate expenses, and practice acquisition. A competent generalist can handle your compliance. A dental specialist can do that and help you make better financial decisions.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
