import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogoHero } from "@/components/brand/BrandLogoHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blog";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

const btnMailOutline =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--navy)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)] hover:bg-[var(--navy)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

export const metadata: Metadata = {
  title: "GP Accountants UK | Tax Specialists for Medical Professionals",
  description: "Expert accounting for GPs, consultants & medical practices. NHS pension advice, locum tax planning, private practice incorporation. Book free consultation.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "GP Accountants UK | Medical Tax Specialists",
    description: "Expert accounting for GPs, consultants & medical practices. NHS pension advice, locum tax planning, private practice incorporation. Book free consultation.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
};

const PRACTICAL_SLUGS = [
  "gp-tax-return-self-assessment-uk",
  "nhs-pension-annual-allowance-gp",
  "locum-doctor-tax-planning-uk",
] as const;

const realityPoints = [
  {
    title: "Complex NHS pension calculations",
    body: "Annual allowance charges, lifetime allowance planning, and pension input periods create genuine complexity. Most accountants see this once a year. We handle it constantly and know exactly how your NHS pension interacts with your overall tax position.",
  },
  {
    title: "Locum income and expenses confusion",
    body: "Working across multiple locations, travel expenses, professional fees, and understanding when incorporation makes sense — locum doctors face unique tax challenges that require specialist knowledge of the medical sector.",
  },
  {
    title: "Private practice structure decisions",
    body: "Whether to operate through a limited company or as a sole trader depends on your income level, NHS commitments, and personal circumstances. Getting this wrong can cost thousands in unnecessary tax.",
  },
  {
    title: "Medical expense claims overlooked",
    body: "Professional subscriptions, conferences, equipment, indemnity insurance — medical professionals have extensive allowable expenses that generalist accountants often miss or undervalue, leading to overpaid tax.",
  },
];

const whoWeWorkWith = [
  {
    title: "GP Partners",
    subtitle: "Practice owners · NHS contracts · Private income",
    body: "Running a GP practice involves complex partnership accounts, NHS contract income, and often mixed private work. We handle the compliance requirements while providing management information that helps you understand practice profitability and plan for the future.",
  },
  {
    title: "Locum Doctors",
    subtitle: "Self-employed · Multiple locations · Variable income",
    body: "Locum work creates unique tax challenges around travel expenses, professional costs, and irregular income. We ensure you claim all allowable expenses, manage your tax payments efficiently, and advise on whether incorporation would benefit your situation.",
  },
  {
    title: "Hospital Consultants",
    subtitle: "NHS employment · Private practice · Pension planning",
    body: "Balancing NHS employment with private practice income requires careful tax planning and pension management. We help you optimise your structure, manage annual allowance charges, and ensure your private practice is tax-efficient.",
  },
];

const howWeWorkItems = [
  {
    n: "01",
    title: "GP practice accounts and partnership returns",
    body: "Complete partnership accounting for GP practices, including NHS contract income analysis, profit allocation, and individual partner returns. We ensure compliance while providing insights into practice performance.",
  },
  {
    n: "02",
    title: "NHS pension planning and annual allowance",
    body: "Specialist advice on NHS pension schemes, annual allowance calculations, and lifetime allowance planning. We help you navigate complex pension rules and minimise tax charges on pension growth.",
  },
  {
    n: "03",
    title: "Locum tax returns and expense planning",
    body: "Comprehensive self-assessment for locum doctors, ensuring all travel expenses, professional costs, and equipment purchases are correctly claimed. We also advise on payment on account management and incorporation timing.",
  },
  {
    n: "04",
    title: "Private practice incorporation and structure",
    body: "Advice on whether to incorporate your private practice, including company formation, profit extraction strategies, and ongoing compliance. We help you choose the most tax-efficient structure for your circumstances.",
  },
  {
    n: "05",
    title: "Medical expense claims and allowances",
    body: "Detailed review of all professional expenses including GMC fees, medical defence subscriptions, conference costs, equipment, and continuing professional development. We ensure nothing is missed.",
  },
  {
    n: "06",
    title: "Consultant tax advice and compliance",
    body: "Specialist support for hospital consultants managing both NHS employment and private practice income, including IR35 considerations, pension planning, and optimising your overall tax position.",
  },
];

const trustItems = [
  {
    title: "Medical-only focus",
    stat: "100%",
    body: "We only work with medical professionals. Every client is a GP, consultant, locum, or medical practice.",
  },
  {
    title: "Proven experience",
    stat: "200+",
    body: "Trusted by over 200 medical professionals across London, Manchester, and the UK.",
  },
  {
    title: "Transparent pricing",
    stat: "Fixed fees",
    body: "No hidden charges, no long-term contracts. You know exactly what you're paying for.",
  },
];

const whySpecialistItems = [
  {
    title: "Medical-only expertise",
    body: "We only work with medical professionals. That means we understand NHS contracts, pension schemes, locum arrangements, and the sector-specific tax rules that generalist accountants rarely encounter.",
  },
  {
    title: "Proactive advice, not just compliance",
    body: "NHS pension planning structured for medical careers. Tax planning for locums and private practice. Practice incorporation support. We help you make better financial decisions, not just file returns.",
  },
  {
    title: "Transparent and accessible",
    body: "Fixed fees with no surprises. You speak to the same accountant every time. Plain English explanations, not accounting jargon. We're here when you need us.",
  },
];

const specialistRows = [
  { area: "NHS pension planning", detail: "Annual allowance calculations done correctly" },
  { area: "Locum expense claims", detail: "All allowable travel and professional costs" },
  { area: "Practice partnership accounts", detail: "NHS contract income properly analysed" },
  { area: "Private practice structure", detail: "Incorporation advice when it makes sense" },
  { area: "Medical expense planning", detail: "Professional subscriptions never missed" },
  { area: "Consultant tax position", detail: "NHS/private income optimised" },
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
            <span className="block">Specialist Accountants for GPs</span>
            <span className="block">& Medical Professionals</span>
          </h1>
          <p className="hero-reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Expert accountants for GPs, consultants, and medical practices. NHS pension advice, locum tax planning, private practice incorporation, and medical expense claims. We understand the financial complexities that medical professionals face.
          </p>
          <p className="hero-reveal-delay-2 mt-4 text-sm font-medium text-white/80">
            Trusted by doctors across London, Manchester, and the UK.
          </p>
          <div className="hero-reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className={`${btnPrimary} min-w-0`}>
              Speak to a medical accountant
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
            We're specialist medical accountants working exclusively with UK GPs, consultants, locum doctors, and medical practices. Over 200 medical professionals trust us with their accounting, tax planning, and NHS pension advice.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="section-label">Why medical professionals choose us</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
            Trusted by doctors across the UK
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
            <span className="block">Most medical professionals are</span>
            <span className="block text-[var(--gold-strong)]">financially underserved.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Medical income structures are genuinely complex. Between NHS contracts, pension schemes, locum arrangements, private practice income, and professional expenses, the financial picture requires specialist knowledge. A generalist accountant will handle the basics — but that's not the same as understanding how medical careers actually work.
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
            Why work with a medical accountant?
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
            <span className="block">We work with medical professionals</span>
            <span className="block">at every career stage.</span>
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
            We don't hand you a services brochure and ask you to pick a package. Most medical professionals come to us with a specific challenge around tax, pensions, or practice structure. What follows is what ongoing support typically looks like once we're working together.
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
              A generalist accountant isn't cutting corners. They simply don't see enough medical clients to build genuine expertise in how the NHS works, how medical careers develop, or how pension schemes interact with private practice income. They won't know, off the top of their head, how annual allowance charges work or what expenses locum doctors can legitimately claim.
            </p>
            <p>
              We do, because it comes up constantly. That breadth of exposure — across hundreds of medical clients — means we can spot issues before they become problems, and give advice grounded in what actually happens in medical practices, not just what the tax manual says.
            </p>
            <p>
              It also means the conversation is more efficient. You don't have to explain how an NHS contract works, or what a UDA means, or why your pension contributions vary. We already know, so we can focus on solving your specific situation.
            </p>
          </div>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical medical accounting areas</caption>
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
            <span className="block">Medical accounting insights</span>
            <span className="block">from specialists.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Real-world guidance on GP tax, NHS pension planning, and locum accounting — written by accountants who work exclusively with UK medical professionals. Each article addresses questions we're actually asked by doctors every week.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {practicalPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
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
            ))}
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
                Ready to work with a medical accountant who understands your practice?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Whether you're a GP looking to optimise your tax position, a locum doctor managing complex expenses, or a consultant planning your NHS pension, the first conversation is straightforward and without obligation. Book your free consultation today.
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
                Fill in the form and one of our medical accountants will be in touch to arrange a short introductory call. No hard sell — just an honest conversation about your situation and whether we're the right fit.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Prefer to call or email? You'll speak to someone who works with medical professionals every day.
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
                  Do I need a specialist accountant as a medical professional?
                  <span className="text-[var(--gold-strong)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)] sm:px-6 sm:py-5 sm:text-base">
                <p>
                  Not strictly — but the question is whether a generalist accountant can give you genuinely useful advice on NHS pensions, locum expenses, or private practice structuring. In our experience, the gap shows most clearly around annual allowance calculations, legitimate medical expense claims, and knowing when incorporation makes sense for your situation. A competent generalist can handle basic compliance. A medical specialist can do that and help you make better financial decisions throughout your career.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}