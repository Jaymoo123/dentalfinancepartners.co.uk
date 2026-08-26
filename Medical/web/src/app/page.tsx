import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogoHero } from "@/components/brand/BrandLogoHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { btnPrimary, focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blog";
import { buildFaqPage, buildHomepageServiceSchema } from "@/lib/schema";
import { TestimonialSlider } from "@/components/medical/TestimonialSlider";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { niche } from "@/config/niche-loader";
import { getActiveCta, isPackagesMode } from "@accounting-network/web-shared/lib/niche-config";

const activeCta = getActiveCta(niche);
const packagesMode = isPackagesMode(niche);

// FAQPage JSON-LD for the homepage's single visible Q&A (the "Do I need a
// specialist accountant" details block). Schema-only: this mirrors the on-page
// answer so answer engines can extract it. The comma below stands in for the
// on-page dash to keep the estate no-em-dash rule; the answer is otherwise the
// same text rendered on the page. No rendered markup is changed.
const HOMEPAGE_FAQS = [
  {
    question: "What is a GP accountant?",
    answer:
      "A GP accountant is an accountant whose work is concentrated on general practice: partnership accounts prepared to the shape NHS commissioners expect, reconciliation of PCSE statements and global sum, Carr-Hill and QOF income, superannuation certificates, and the individual self-assessment returns of the partners and salaried GPs behind the practice. The distinguishing skill is not the accounting standard, it is knowing how NHS practice income arrives and how it should be split between the partnership and the individual.",
  },
  {
    question: "Do I need a specialist medical accountant, or will a generalist do?",
    answer:
      "A competent generalist accountant can file your accounts and your return. The question is whether they can advise you. The gap shows most clearly in four places: NHS Pension annual allowance and the tapered allowance, where the input amount grows without you contributing anything extra; locum IR35 status, which is determined by the engagement and not the contract; mixed NHS and private income, where the same fee can be reported twice or not at all; and GP partnership structures, where notional rent, reimbursed expenses and mid-year profit share changes all have to be handled consistently across several people's returns.",
  },
  {
    question: "What do medical accountants actually do for doctors?",
    answer:
      "For a GP partner: partnership accounts, the profit allocation, the superannuation certificate, and the personal return. For a salaried GP: self-assessment where private, locum or sessional income sits alongside the NHS post. For a hospital consultant: the split between NHS employment, private practice and medico-legal work, plus the incorporation question if the private income is material. For a locum: IR35 status, the limited company versus umbrella versus sole trader decision, expense claims, and NHS Pension Forms A and B so that locum work counts towards pensionable service.",
  },
  {
    question: "Which doctors do you work with?",
    answer:
      "GP partners and salaried GPs, hospital consultants with NHS and private income, locum and sessional doctors, junior doctors, and GP practices as entities. We do not take work outside the medical professions, which is the point: the same questions recur, so the answers are already worked out.",
  },
  {
    question: "Are you able to help doctors outside London?",
    answer:
      "Yes. Enquiries come from across the UK and the work is handled remotely, which is normal for medical accounting because the records that matter (PCSE statements, NHSBSA pension savings statements, agency remittances, practice ledgers) are all digital. Note that NHS contracting and pension administration differ between England, Wales, Scotland and Northern Ireland, so the nation you practise in changes the answer more than the city does.",
  },
  {
    question: "How much does a specialist medical accountant cost?",
    answer:
      "Fees depend on what the work actually involves: a single self-assessment return for a salaried GP is not comparable to a six-partner practice with partnership accounts, superannuation certificates and six individual returns. Tell us your role, your income mix and whether a practice is involved, and you will get a scoped figure rather than a headline price that changes later.",
  },
  {
    question: "Can I switch accountants part-way through the tax year?",
    answer:
      "Yes, and most doctors do. Professional clearance is requested from your existing accountant, who passes over the records and the tax history. You are picked up from your current position rather than starting again, and there is no need to wait for a year end or a filing deadline to pass.",
  },
];

const btnMailOutline =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--medical-teal)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--medical-teal)] transition-all duration-200 hover:border-[var(--medical-teal)] hover:bg-[var(--medical-teal)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)]";

// Title/description written 2026-08-26 from the 90d GSC head set (data through
// 2026-08-23). The old title carried "gp accountants" (1,309 impr) but nothing
// from the "medical accountants" family (377 + 284 + 225 + 86 impr), which the
// homepage also catches and which is how the page-1 incumbents title themselves.
// This one carries both exact phrases plus "specialist medical accountants".
const HOME_TITLE = "Specialist Medical Accountants & GP Accountants | UK";
const HOME_DESCRIPTION =
  "Accountants for UK doctors only. NHS Pension annual allowance, GP practice and partnership accounts, locum IR35 and tax returns, consultant private practice and medical expense claims.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const PRACTICAL_SLUGS = [
  "nhs-pension-annual-allowance-complete-guide",
  "locum-doctor-tax-complete-guide",
  "medical-practice-incorporation-step-by-step",
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
    href: "/for-gps",
    title: "GP practices, partners and salaried GPs",
    subtitle: "GP practice accountants · Partnership accounts · Superannuation",
    body: "For the practice: income analysed by NHS stream, PCSE reconciliation, notional rent, capital and current accounts, and a profit allocation that copes with a partner joining or leaving mid-year. For the individual: the partner or salaried GP return prepared against the practice figures rather than separately from them.",
  },
  {
    href: "/for-consultants",
    title: "Hospital consultants",
    subtitle: "NHS salary · Private practice · Medico-legal income",
    body: "An NHS post, private patient fees and expert-witness work are three different tax positions in one person. The recurring questions are how the income splits, which expenses hold up, whether incorporating the private side is worth the NHS pension accrual it costs, and where the annual allowance taper bites.",
  },
  {
    href: "/for-locum-doctors",
    title: "Locum doctors",
    subtitle: "Locum accountant · IR35 · Self-assessment",
    body: "Agency, bank and direct practice engagements are a business, whatever it feels like. The work is IR35 status per engagement, the limited company versus umbrella versus sole trader decision modelled on your actual earnings, expense claims, the VAT registration threshold, and Forms A and B so locum sessions count towards pensionable service.",
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
    body: "Pension input amounts calculated for the NHS scheme, the tapered annual allowance tested against threshold and adjusted income, carry-forward from the three previous tax years checked, and Scheme Pays assessed where a charge is unavoidable. The lifetime allowance was abolished on 6 April 2024, so the retirement-side work is now the Lump Sum Allowance and the Lump Sum and Death Benefit Allowance instead.",
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
    title: "Medical work only",
    stat: "100%",
    body: "No general practice clients from outside medicine. Every enquiry that comes through this site is from a GP, consultant, locum, junior doctor or a practice, which is why the same NHS Pension and partnership questions get answered rather than researched.",
  },
  {
    title: "Free calculators, no email gate",
    stat: "10",
    body: "Ten medical tax calculators covering NHS Pension annual allowance, tapered allowance, Scheme Pays, tiered superannuation contributions, locum tax, GP partner drawings and the incorporation comparison. No sign-up, no email required.",
  },
  {
    title: "Answered by a working day",
    stat: "1 day",
    body: "Enquiries sent through this site get a reply within one working day, and the first conversation is a scoping call rather than a sales call.",
  },
];

const whySpecialistItems = [
  {
    title: "The NHS Pension is the recurring problem",
    body: "The scheme is defined benefit, so your pension input amount grows with your pensionable pay whether or not you pay in another penny. Above £260,000 adjusted income the annual allowance tapers, and NHSBSA pension savings statements are issued late and are not always right. A medical accountant checks the input figure before deciding whether a Scheme Pays election is worth making.",
  },
  {
    title: "Income arrives from several directions at once",
    body: "A GP partner has a profit share, superannuation deducted at source, and possibly out-of-hours or appraisal work. A consultant has an NHS salary, private fees and medico-legal reports. A locum has agency, bank and direct practice engagements. Each stream is treated differently for tax, National Insurance, IR35 and pension, and the errors happen where they meet.",
  },
  {
    title: "Practice accounting has its own vocabulary",
    body: "Global sum and Carr-Hill weighting, QOF and enhanced services, PCN and DES income, notional rent, reimbursed expenses, capital and current accounts, mutual assessment periods. None of this appears in general SME accounting, and none of it is guessable from the ledger alone.",
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

  const faqSchema = buildFaqPage(HOMEPAGE_FAQS);
  const serviceSchema = buildHomepageServiceSchema(howWeWorkItems.map((i) => i.title));

  return (
    <>
      <StickyCTA />
      {/* Organization now ships site-wide from the root layout. */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section className="hero-brand border-b border-white/10">
        <div className={`hero-inner ${siteContainerLg} ${sectionYLoose}`}>
          <div className="hero-reveal">
            <BrandLogoHero />
          </div>
          <h1 className="hero-reveal-delay display-serif mt-8 max-w-4xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            <span className="block">Specialist medical accountants</span>
            <span className="block">and GP accountants for UK doctors</span>
          </h1>
          <p className="hero-reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Medical accountants working with doctors and nobody else: GP partners, salaried GPs, hospital consultants, locums and GP practices. The work that fills the year is NHS Pension annual allowance modelling, partnership accounts and superannuation certificates, locum IR35 and self-assessment, the private practice incorporation question, and expense claims that survive an HMRC look.
          </p>
          <p className="hero-reveal-delay-2 mt-4 text-sm font-medium text-white/80">
            Doctors in London, Manchester, Birmingham, Leeds, Bristol and across England, Wales, Scotland and Northern Ireland, with the contract and pension differences between the four nations accounted for.
          </p>
          <div className="hero-reveal-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={activeCta.hero_primary.href}
              className={`${btnPrimary} min-w-0`}
              data-cta="hero_primary" data-cta-placement="hero"
              data-cta-variant={niche.cta.variant}
            >
              {activeCta.hero_primary.label}
            </Link>
            {activeCta.hero_secondary ? (
              <Link
                href={activeCta.hero_secondary.href}
                className={`inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/70 hover:bg-white/10 ${focusRing}`}
                data-cta="hero_secondary" data-cta-placement="hero"
                data-cta-variant={niche.cta.variant}
              >
                {activeCta.hero_secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-10 sm:py-12">
        <div className={siteContainerLg}>
          <p className="max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
            Medical accountants for UK doctors, and only for UK doctors. GP partners and salaried GPs, hospital consultants with private and medico-legal income, locum and sessional doctors, junior doctors, and GP practices as partnerships in their own right. If your income arrives partly through PCSE and partly through a private clinic, that is the normal case here rather than the exception.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <StatsBar stats={siteStats} />
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
            Between the NHS Pension, mixed NHS and private income, locum engagements, practice partnerships and professional expenses, a doctor's tax position has more moving parts than most owner-managed businesses. A generalist accountant will process what you hand over accurately. That is not the same as knowing what you should have handed over, or what the figures on a PCSE statement mean.
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
                <Link
                  href={block.href}
                  className={`mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--medical-teal)] underline decoration-[var(--coral)] decoration-2 underline-offset-4 ${focusRing} rounded`}
                >
                  View specialist services →
                </Link>
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
            There is no standard package, because a salaried GP with one private clinic and a six-partner practice with a superannuation certificate to certify are not the same job. The starting point is your actual position: NHS Pension exposure, locum self-assessment, partnership accounts or the incorporation question. Here is the work that a medical accountant does across a year for GPs, consultants and locums.
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
            What a specialist medical accountant sees that a generalist does not.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            <p>
              This is not a competence argument. Generalist accountants are not weaker technically, they simply do not see enough doctors for the medical patterns to become obvious. A specialist reads a pension savings statement and knows immediately whether the input amount looks plausible for that pensionable pay, reads a locum engagement and knows which IR35 factors will decide it, and reads an expense schedule and knows which items HMRC has historically challenged for doctors.
            </p>
            <p>
              The difference shows up as things noticed early rather than repaired late. Unused carry-forward from the three previous tax years before an annual allowance charge crystallises. Forms A and B filed so that locum sessions actually count towards pensionable service instead of quietly falling out. A basis period reform adjustment modelled before it lands on a payment on account. An incorporation modelled properly rather than assumed, because for a partner with only NHS income it is usually the wrong answer.
            </p>
            <p>
              There is a plainer benefit too. You will not spend the first meeting explaining what superannuation is, why your practice year end is not 5 April, or why your indemnity subscription is a business cost. That vocabulary is already shared, so the conversation starts at your position rather than at the definitions.
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
            Working notes on NHS Pension annual allowance and Scheme Pays, locum IR35 and Forms A and B, GP partnership income and PCSE reconciliation, and the private practice incorporation question. Written for doctors, so the starting assumption is that you already know what superannuation is.
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
          <div className="mt-10 flex flex-wrap gap-6">
            <Link
              href="/blog"
              className={`inline-flex min-h-11 items-center text-sm font-semibold text-[var(--medical-teal)] underline decoration-[var(--coral)] decoration-2 underline-offset-4 ${focusRing} rounded`}
            >
              View all articles
            </Link>
            <Link
              href="/medical-guides"
              className={`inline-flex min-h-11 items-center text-sm font-semibold text-[var(--medical-teal)] underline decoration-[var(--coral)] decoration-2 underline-offset-4 ${focusRing} rounded`}
            >
              Browse medical guides
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="section-label">What the work looks like</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            Four situations medical accountants see repeatedly
          </h2>
          <div className="mt-10 max-w-3xl">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <p className="section-label">How we work with you</p>
          <h2 className="display-serif mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            Choose how much support you need.
          </h2>
          <div className="mt-10">
            <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={siteContainerLg}>
          <div className={`${sectionYLoose} grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16`}>
            {packagesMode ? (
            <div className="min-w-0">
              <p className="section-label">Get started</p>
              <h2 className="display-serif mt-4 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                {activeCta.home_cta.heading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {activeCta.home_cta.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={activeCta.home_cta.primary.href}
                  className={`${btnPrimary}`}
                  data-cta="home_cta_primary" data-cta-placement="home_cta"
                  data-cta-variant={niche.cta.variant}
                >
                  {activeCta.home_cta.primary.label}
                </Link>
                {activeCta.home_cta.secondary ? (
                  <Link
                    href={activeCta.home_cta.secondary.href}
                    className={btnMailOutline}
                    data-cta="home_cta_secondary" data-cta-placement="home_cta"
                    data-cta-variant={niche.cta.variant}
                  >
                    {activeCta.home_cta.secondary.label}
                  </Link>
                ) : null}
              </div>
              <p className="mt-10 text-sm font-medium text-[var(--ink)]">We respond within one working day.</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Prefer to write? Use the form and one of our medical accountants will come back to you, usually the same working day.
              </p>
            </div>
            ) : (
            <div className="min-w-0">
              <p className="section-label">Get started</p>
              <h2 className="display-serif mt-4 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                Speak to a medical accountant about your position
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Whether you are a GP partner, a salaried GP, a hospital consultant with private work or a locum, the useful first conversation is a short scoping call: your role, your income mix, your NHS Pension position, and whether a practice is involved. It is free and there is no obligation attached to it.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className={`${btnPrimary}`}>
                  Book your free consultation
                </Link>
                <Link href="/contact" className={btnMailOutline}>
                  Contact us
                </Link>
              </div>
              <p className="mt-10 text-sm font-medium text-[var(--ink)]">We respond within one working day.</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Fill in the form and a medical accountant will be in touch to arrange a short introductory call. No hard sell, just a conversation about your situation and whether this is the right fit.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Prefer to call or email? You'll speak to someone who works with medical professionals every day.
              </p>
              <p className="mt-6 text-sm text-[var(--muted)]">
                Initial conversations carry no obligation. What happens to the details you send, and the fact that they may be shared with a regulated firm from the specialist partner network so that firm can respond, is set out in the{" "}
                <Link href="/privacy-policy" className={`underline ${focusRing} rounded`}>privacy policy</Link>.
              </p>
            </div>
            )}
            <div className="card-flat p-6 sm:p-8 lg:p-10">
              <LeadForm submitLabel="Send enquiry" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <p className="section-label">Questions from doctors</p>
          <h2 className="display-serif mt-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Common questions about medical accountants.</h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {HOMEPAGE_FAQS.map((faq) => (
              <details key={faq.question} className="group card-flat open:shadow-md">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[var(--ink)] sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-[var(--coral)] transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)] sm:px-6 sm:py-5 sm:text-base">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}