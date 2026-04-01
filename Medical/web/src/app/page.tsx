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
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--medical-teal)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--medical-teal)] transition-all duration-200 hover:border-[var(--medical-teal)] hover:bg-[var(--medical-teal)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)]";

export const metadata: Metadata = {
  title: "GP Accountants UK | Tax Specialists for Doctors",
  description: "Medical accounting specialists for UK doctors. NHS pension optimization, locum tax returns, practice incorporation, and medical expense claims. Free consultation for GPs and consultants.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "GP Accountants UK | Tax Specialists for Doctors",
    description: "Medical accounting specialists for UK doctors. NHS pension optimization, locum tax returns, practice incorporation, and medical expense claims. Free consultation for GPs and consultants.",
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
};

const PRACTICAL_SLUGS = [
  "nhs-pension-annual-allowance-complete-guide",
  "locum-doctor-tax-complete-guide",
  "private-practice-incorporation-complete-guide",
] as const;

const realityPoints = [
  {
    title: "Complex NHS and private income mix",
    body: "Reconciling NHS pension contributions, practice income, and private patient fees requires specific knowledge of medical sector accounting. Generalist accountants often miss the nuances of superannuation and expense allocations.",
  },
  {
    title: "NHS pension annual allowance traps",
    body: "Many GPs and consultants face unexpected tax charges due to the NHS pension's annual allowance. Without specialist advice, these complex calculations can lead to significant, avoidable tax bills.",
  },
  {
    title: "Locum tax confusion and compliance",
    body: "Locum doctors managing multiple engagements often struggle with self-assessment, allowable expense claims, and VAT registration thresholds. This leads to compliance risks and potential overpayment of tax.",
  },
  {
    title: "Inefficient practice structures",
    body: "Medical practices operating without optimal company structures or clear partnership agreements miss opportunities for tax efficiency, asset protection, and smooth succession planning.",
  },
];

const whoWeWorkWith = [
  {
    title: "GP Partners & Salaried GPs",
    subtitle: "Practice income · NHS pension · GP tax advice",
    body: "From partnership accounts and profit-sharing to individual tax returns and pension planning. Our GP accountants ensure your practice finances are structured efficiently and your personal tax position is optimised, particularly around NHS superannuation and GP tax planning.",
  },
  {
    title: "Hospital Consultants",
    subtitle: "NHS & private practice · Consultant accountant",
    body: "Managing a mix of NHS salary, private patient fees, and medico-legal work creates a complex tax picture. Our medical accountants provide clarity on income splitting, legitimate expense claims, and long-term pension strategy to protect your wealth.",
  },
  {
    title: "Locum Doctors",
    subtitle: "Locum accountant · Self-assessment · IR35",
    body: "If you're working through agencies or directly with practices, you're running a business. Our locum accountants handle your self-assessment, advise on allowable expenses, manage your VAT position, and ensure you're compliant and tax-efficient with specialist locum tax advice.",
  },
];

const howWeWorkItems = [
  {
    n: "01",
    title: "GP and practice accounts",
    body: "Accurate preparation and timely filing of partnership and limited company accounts for medical practices. We ensure compliance while providing insights into practice profitability and financial health.",
  },
  {
    n: "02",
    title: "NHS pension advice & planning",
    body: "Specialist guidance on NHS superannuation, including annual allowance calculations, lifetime allowance planning, and the implications of pension growth on your personal tax position.",
  },
  {
    n: "03",
    title: "Locum doctor tax & self-assessment",
    body: "Complete handling of self-assessment tax returns for locums, ensuring all legitimate expenses are claimed and your tax liability is calculated correctly across multiple income sources.",
  },
  {
    n: "04",
    title: "Private practice incorporation",
    body: "Advising on the tax and legal implications of incorporating your private practice, including share structures, profit extraction strategies, and ongoing company compliance.",
  },
  {
    n: "05",
    title: "Medical expense claims & optimisation",
    body: "Expert review of claimable expenses for medical professionals, including professional subscriptions, indemnity insurance, travel, and equipment, ensuring you maximise your allowable deductions.",
  },
  {
    n: "06",
    title: "Tax planning & advisory",
    body: "Proactive advice on income tax, corporation tax, and VAT planning tailored to the unique financial situations of GPs, consultants, and practice owners.",
  },
];

const trustItems = [
  {
    title: "Medical-only focus",
    stat: "100%",
    body: "100% medical focus. Every GP accountant on our team works exclusively with GPs, consultants, locums, and practice owners.",
  },
  {
    title: "Proven experience",
    stat: "50+",
    body: "50+ doctors and medical practices across London, Manchester, Birmingham, and major UK cities.",
  },
  {
    title: "Transparent pricing",
    stat: "Fixed fees",
    body: "Clear, agreed fees with no hidden charges. You know exactly what you're paying for.",
  },
];

const whySpecialistItems = [
  {
    title: "GP accountant expertise",
    body: "Every medical accountant on our team specializes in GP accounting, NHS pension annual allowance calculations, locum IR35 compliance, medical partnership structures, and healthcare-specific accounting regulations.",
  },
  {
    title: "Proactive GP tax planning",
    body: "Beyond compliance, our GP accountants provide strategic tax planning, NHS pension modelling, and practice structure advice. We help medical professionals make informed financial decisions to protect and grow your wealth.",
  },
  {
    title: "Clear, accessible service",
    body: "Fixed fees, no jargon, and direct access to your dedicated GP accountant. We're here to provide clarity and support whenever you need it.",
  },
];

const specialistRows = [
  { area: "NHS pension calculations", detail: "Handled with specialist knowledge" },
  { area: "Locum tax position", detail: "Reviewed and optimised annually" },
  { area: "Practice partnership accounts", detail: "Prepared accurately" },
  { area: "Private practice incorporation", detail: "Sector-specific structuring advice" },
  { area: "Medical expense claims", detail: "Maximised correctly" },
  { area: "Mixed NHS/private income", detail: "Reconciled and reported properly" },
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
            <span className="block">Specialist Accountants for</span>
            <span className="block">GPs & Medical Professionals</span>
          </h1>
          <p className="hero-reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            GP accountants and medical accounting specialists exclusively for UK doctors. We handle NHS pension complexities, locum tax returns, private practice structures, and medical expense claims. Our entire client base is medical—GPs, consultants, and practice owners who need a specialist GP accountant with sector-specific financial expertise.
          </p>
          <p className="hero-reveal-delay-2 mt-4 text-sm font-medium text-white/80">
            Serving GPs, consultants, and locum doctors in London, Manchester, Birmingham, Leeds, and Bristol.
          </p>
          <div className="hero-reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className={`${btnPrimary} min-w-0`}>
              Speak to a medical accountant
            </Link>
            <Link
              href="#how-we-work"
              className={`inline-flex min-h-12 items-center text-sm font-semibold text-white/90 underline decoration-[var(--coral)] decoration-2 underline-offset-4 transition-colors hover:text-white ${focusRing} rounded-full px-2`}
            >
              How we work →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
            GP accountants and medical accounting specialists serving UK doctors exclusively. Our client base includes GP partners, salaried GPs, hospital consultants, private practice owners, and locum doctors. Over 50 medical professionals rely on our GP accountant team for NHS pension planning, tax optimization, and practice financial management.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="section-label">What sets us apart</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--medical-teal-dark)] sm:text-4xl">
            Built for the medical profession
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="font-serif text-4xl font-bold text-[var(--coral)] sm:text-5xl">
                  {item.stat}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Common challenges</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl md:text-[2.5rem]">
            <span className="block">Most GPs and consultants face</span>
            <span className="block text-[var(--coral-strong)]">avoidable tax complications.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Medical finances are uniquely complex. Between NHS pensions, mixed NHS and private income, locum engagements, practice partnerships, and professional expenses, the picture requires specialist understanding. A generalist accountant will process what you give them — but that's not the same as understanding how a medical professional's finances actually work.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {realityPoints.map((item) => (
              <article key={item.title} className="card-flat p-6 sm:p-8">
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)] sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Medical sector expertise</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            Why GPs choose specialist medical accountants
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
            {whySpecialistItems.map((item) => (
              <div key={item.title} className="card-flat p-6 sm:p-8">
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)] sm:text-xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Client types</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">GPs, consultants, and locum doctors</span>
            <span className="block">at every career stage.</span>
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {whoWeWorkWith.map((block) => (
              <div key={block.title} className="min-w-0">
                <h3 className="text-xl font-semibold text-[var(--ink)]">{block.title}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--coral)]">{block.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-we-work" className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <p className="section-label">Our approach</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">Medical accounting services</span>
            <span className="block">tailored to your practice.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            No generic packages or one-size-fits-all solutions. Our GP accountants start with your specific situation—whether it's NHS pension planning, locum tax returns, or practice incorporation—and build a service around your needs. Here's what ongoing support from a medical accountant looks like for GPs and consultants.
          </p>
          <ol className="mt-14 grid list-none gap-10 pl-0 sm:gap-12 lg:grid-cols-2">
            {howWeWorkItems.map((item) => (
              <li key={item.n} className="flex gap-5 sm:gap-6">
                <span
                  className="font-serif text-3xl font-semibold tabular-nums leading-none text-[var(--coral)] sm:text-4xl"
                  aria-hidden
                >
                  {item.n}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--ink)] sm:text-xl">{item.title}</h3>
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
          <p className="section-label">Specialist advantage</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            Medical specialists deliver measurably better outcomes.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            <p>
              Generalist accountants aren't incompetent—they simply lack exposure to GP accounting and medical sector nuances. A specialist GP accountant will immediately recognize NHS pension annual allowance traps, understand locum IR35 status implications, and know HMRC's current stance on medical expense claims for conferences and journals.
            </p>
            <p>
              GP accountants and medical specialists encounter these scenarios weekly. This concentrated experience means proactive identification of tax-saving opportunities specific to doctors—pension carry-forward claims, optimal practice structure for consultants with private work, or locum expense optimization strategies that generalists simply won't consider.
            </p>
            <p>
              Efficiency matters too. You won't spend time explaining NHS superannuation mechanics, BMA contract structures, or medical indemnity insurance. We already understand the medical profession's financial landscape, allowing immediate focus on your specific tax position and planning opportunities.
            </p>
          </div>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[32rem] text-left text-sm sm:text-base">
              <caption className="sr-only">How {siteConfig.name} handles typical medical accounting areas</caption>
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)]">
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--ink)] sm:px-6 sm:py-4">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[var(--ink)] sm:px-6 sm:py-4">
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
          <p className="section-label">Resources for doctors</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            <span className="block">NHS pension, locum tax, and</span>
            <span className="block">practice finance guidance.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Practical advice on medical tax planning, NHS pension optimization, locum compliance, and practice structures. Written by accountants serving UK doctors exclusively. Each guide answers real questions from GPs, consultants, and locum doctors navigating complex financial decisions.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {practicalPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className={`card-premium group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[rgba(0,27,61,0.08)] ${focusRing}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--coral)]">
                    {p.category}
                  </span>
                  <span className="mt-3 font-serif text-lg font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--coral)] group-hover:underline-offset-4">
                    {p.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.summary}</span>
                  <span className="mt-4 text-sm font-semibold text-[var(--medical-teal)]">Read more →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link
              href="/blog"
              className={`inline-flex min-h-11 items-center text-sm font-semibold text-[var(--medical-teal)] underline decoration-[var(--coral)] decoration-2 underline-offset-4 ${focusRing} rounded`}
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
              <h2 className="display-serif mt-4 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                Speak with GP accountants who specialize in the medical profession
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                GP partners, salaried GPs, hospital consultants, or locum doctors—our GP accountants handle NHS pension planning, mixed income tax optimization, and practice financial structures. Initial consultation with a medical accountant is free and obligation-free. Discuss your specific situation with GP accounting specialists.
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
          <p className="section-label">Questions from doctors</p>
          <h2 className="display-serif mt-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Common questions from medical professionals.</h2>
          <div className="mt-8 max-w-3xl">
            <details className="group card-flat open:shadow-md">
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[var(--ink)] sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  Do I need a specialist accountant as a medical professional?
                  <span className="text-[var(--coral)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)] sm:px-6 sm:py-5 sm:text-base">
                <p>
                  Not strictly — but the question is whether a generalist accountant can give you genuinely useful advice on the financial specifics of the medical sector. In our experience, the gap shows most clearly around NHS pension planning, locum tax rules, mixed NHS/private income, and practice partnership structures. A competent generalist can handle your compliance. A medical specialist can do that and help you make better financial decisions that protect your wealth.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}