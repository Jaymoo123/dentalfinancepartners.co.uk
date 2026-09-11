import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { CalculatorTabs } from "@/components/tools/CalculatorTabs";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { JsonLd, buildServicePageSchema, buildFaqPage } from "@/lib/schema";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { serviceTiers } from "@/config/service-tiers";
import { allTools } from "@/lib/tools/registry";

// Retitled 2026-08-26. Title and H1 already carried "medical accounting", which
// is right: this page's own head is "medical accounting" (127 impr @80.5) and
// "accounting for doctors" (46 @78.1), both currently caught by the homepage.
// The old title was 103 characters with the site suffix and truncated in SERP
// before reaching "Locum Tax Returns"; the description was 300+ characters and
// ran to filler ("Expert GP accountants ... nationwide"). Shortened, and
// "accounting for doctors" and "bookkeeping" added because both are in the
// query set and neither appeared anywhere in the old meta.
const SERVICES_TITLE = "Medical Accounting Services | Accounting for Doctors";
const SERVICES_DESCRIPTION =
  "Medical accounting for UK doctors: GP partnership accounts, NHS Pension annual allowance planning, locum tax returns and IR35, private practice incorporation, bookkeeping and medical expense claims.";

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    url: `${siteConfig.url}/services`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
  },
};

const sections = [
  {
    title: "GP Tax & Accounts",
    body: "Year-end accounts and tax returns for GPs, whether salaried or partners. NHS and private income splits, partnership profit shares, and HMRC and NHS pension reporting are read as one position rather than three.",
    links: [{ href: "/blog/gp-partnership-tax-complete-guide", label: "GP partnership tax guide" }],
  },
  {
    title: "NHS Pension Planning",
    body: "The measure for a defined benefit scheme is the pension input amount, the capitalised growth in your benefits, not the contributions you paid. The annual allowance is £60,000 for 2026/27, unchanged from 2025/26, tapering by £1 for every £2 of adjusted income above £260,000 where threshold income also exceeds £200,000, down to a £10,000 floor. Work covers the input calculation, carry-forward from the three previous tax years, and whether a Scheme Pays election is worth making. The lifetime allowance was abolished on 6 April 2024, so the retirement-side planning now works to the Lump Sum Allowance and the Lump Sum and Death Benefit Allowance instead.",
    links: [{ href: "/blog/nhs-pension-annual-allowance-complete-guide", label: "Annual allowance guidance" }],
  },
  {
    title: "Locum Tax & Compliance",
    body: "Tax planning and Self Assessment support for locum doctors. The work is several income streams at once, professional expenses claimed correctly, and tax payments managed across engagements rather than discovered in January.",
    links: [{ href: "/blog/locum-doctor-expenses-what-you-can-claim", label: "Locum expenses guide" }],
  },
  {
    title: "Private Practice Incorporation",
    body: "Structured advice on setting up a limited company for your private practice. It covers profit extraction, corporation tax planning, and how the personal and company positions sit against each other.",
    links: [{ href: "/blog/medical-practice-incorporation-step-by-step", label: "Incorporation guide" }],
  },
  {
    title: "Medical Expense Claims",
    body: "Legitimate expense claims for medical professionals: professional subscriptions, indemnity, equipment and travel. Claims are made defensible against HMRC's own stated position rather than against a generic list.",
    links: [{ href: "/blog/medical-professional-expenses-what-is-claimable", label: "Claimable expenses" }],
  },
  {
    title: "Consultant Tax Planning",
    body: "Tax work for hospital consultants balancing NHS work, private practice and additional roles. Multiple income sources, pension contributions and personal tax liabilities are coordinated in one return.",
    links: [{ href: "/medical-guides/consultant-private-practice-tax", label: "Consultant private practice tax guide" }],
  },
];

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

const SERVICES_FAQS = [
  {
    question: "Which of these services does a salaried GP actually need?",
    answer:
      "Usually one: self-assessment, and only if there is income beyond the salaried post. Private sessions, locum shifts, sessional or appraisal work, rental or investment income, or total income above £100,000 (which starts tapering the personal allowance) all create a filing requirement that PAYE does not cover. Many salaried GPs assume the practice payroll handles everything and discover otherwise late. NHS Pension annual allowance work becomes relevant on top of that once pensionable pay is high enough for the input amount to approach £60,000.",
  },
  {
    question: "Do you work with the practice, or with individual doctors?",
    answer:
      "Both, and often together. A GP practice needs partnership accounts, income analysed by NHS stream, PCSE reconciliation and a profit allocation. Each partner then needs a personal return that agrees with the partnership return on profit share, superannuation and reimbursed expenses. When those two pieces of work sit with different firms, nobody owns the reconciliation between them.",
  },
  {
    question: "Is incorporating my private practice worth it?",
    answer:
      "Sometimes, but less often than the headline corporation tax rate suggests, and the arithmetic changed on 6 April 2026 when dividend rates rose. Corporation tax is 19% on profits up to £50,000 and 25% above £250,000, with marginal relief between at an effective rate of about 26.5%. Against that, income routed through a company is not NHS-pensionable, so dividends buy no pension accrual at all, and a doctor's ordinary personal service company cannot hold a GMS or PMS contract. For a GP partner with only NHS income it is usually the wrong answer. The genuine drivers are managing the annual allowance taper by keeping private income out of pensionable pay, retained earnings, and family shareholding, not the headline rate.",
  },
  {
    question: "Is my private medical work subject to VAT?",
    answer:
      "Medical care provided by a registered practitioner is VAT-exempt under Schedule 9 Group 7 where the principal purpose is protecting, maintaining or restoring health, so genuine private medical care is exempt rather than standard-rated. The watch items are cosmetic-only work, medico-legal and expert-witness reports, and some occupational health, which can be standard-rated. Registration is required when taxable, meaning non-exempt, turnover passes £90,000 in a rolling 12 months, within 30 days of the end of that month. A practitioner with both exempt and taxable supplies operates partial exemption.",
  },
  {
    question: "Does Making Tax Digital for Income Tax apply to me?",
    answer:
      "It is already live for the first tranche. Sole traders and landlords with qualifying income above £50,000 came into MTD for Income Tax on 6 April 2026, with £30,000 following on 6 April 2027 and £20,000 on 6 April 2028, each tested on the prior year's return. Most full-time locums and unincorporated private GPs are therefore already in scope. Limited companies are outside it entirely, because it is an income tax regime. General partnerships are deferred with no confirmed date, so a GP partnership is not yet mandated at partnership level, although an individual partner's own sole-trader income can still bring their personal return into it.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "For the first conversation, nothing but your role and your income mix. To take the work on: professional clearance with your current accountant, the last set of accounts or returns, and whichever of the medical documents apply to you, which typically means PCSE statements, your NHSBSA pension savings statement, superannuation certificates, agency remittances and any Status Determination Statements. Switching part-way through a year is normal and does not require waiting for a year end.",
  },
];

export default function ServicesPage() {
  const orgSchema = buildOrganizationJsonLd();
  const faqSchema = buildFaqPage(SERVICES_FAQS);

  // Service + OfferCatalog (with a single BreadcrumbList) so the services hub
  // emits the same answer-ready structured data as /nhs-pension. The visible
  // Breadcrumb below suppresses its own JSON-LD so only one BreadcrumbList is
  // emitted (no duplicate). Offer items mirror the six services listed on-page.
  const serviceSchema = buildServicePageSchema({
    name: "Medical accounting services",
    description:
      "Specialist accounting and tax support for GPs, consultants, locums and practice owners across the UK: GP partnership accounts, NHS pension annual allowance planning, locum tax returns, private practice incorporation, medical expense claims and consultant tax planning.",
    path: "/services",
    breadcrumbLabel: "Services",
    serviceType: "Medical accountancy and tax",
    offerItems: sections.map((s) => s.title),
  });

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={serviceSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 sm:py-20">
        <MedicalBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            variant="light"
            suppressJsonLd
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-[var(--copper)]/40 bg-[var(--copper)]/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
              Medical accounting services
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Medical accounting services for UK doctors
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              Six areas of work, each with a specific technical problem at its centre. Which of them apply depends on your position, and the fastest way to find out is to describe it.
            </p>
            <div className="mt-8">
              <Link href="#book" className={btnPrimary}>
                Tell us what you need
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What medical accounting actually reads */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Medical accounting for GPs, consultants, locums and GP practices across the UK. The list below is the actual shape of the work rather than a menu: six areas, each of which has a specific technical problem at its centre. Which of them apply depends on your position.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Accounting for doctors differs from general practice accounting in what has to be read, not in the standards applied. PCSE remittances, NHSBSA pension savings statements, Status Determination Statements from NHS Trusts, superannuation certificates, agency self-billing invoices and partnership profit allocations are all documents a generalist rarely handles and a medical accountant handles weekly.
            </p>
          </div>

          {/* Six equivalent service areas, so a grid rather than a numbered
              list: the numbering implied a sequence they do not have. The
              "Related:" links survive the conversion; the per-item /contact
              link does not, because it duplicates the header CTA. */}
          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <div key={s.title} className="flex flex-col rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
                <h2 className="text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">{s.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{s.body}</p>
                {s.links.length > 0 ? (
                  <p className="mt-4 text-sm">
                    Related:{" "}
                    {s.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={`font-medium text-[var(--copper-strong)] underline ${focusRing} rounded`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we help */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Where we help
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            Enquiries come from GPs, consultants and locum doctors throughout the UK. Location pages cover local context and how to book.
          </p>
          <ul className="mt-8 grid list-none gap-3 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((loc) => {
              const city = loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1);
              return (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className={`flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-200 transition-all hover:ring-[var(--copper)] ${focusRing}`}
                  >
                    <span className="text-sm font-semibold text-[var(--ink)]">{city}</span>
                    <span className="text-xs font-medium text-[var(--copper-strong)]">GP accountant</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Ten free calculators. Three of them mount here as tabs so a reader can
          run one where they are standing; all ten keep a crawlable anchor in
          the plain list below, because a tabs block emits buttons, not links.
          A CARD pointing at a calculator is the artefact that is gone from
          both halves. DISPOSITION_SLICE2 B.2, recorded manager decision. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free calculators</Eyebrow>
          <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Ten free medical tax calculators
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            Instant estimates covering NHS Pension annual allowance and the taper, Scheme Pays, tiered superannuation contributions, locum tax, GP partner drawings, salaried GP versus partner, and the private practice incorporation comparison. Three of them run below, starting with the{" "}
            <Link href="/calculators/nhs-pension-annual-allowance" className={`font-medium text-[var(--copper-strong)] underline ${focusRing} rounded`}>
              NHS Pension annual allowance calculator
            </Link>
            . We ask once whether a specialist should confirm your figure, and you can skip that and still see it.
          </p>
          <div className="mt-8">
            <CalculatorTabs tabs={["annualallowance", "locumtax", "incorporation"]} />
          </div>
          <h3 className="mt-12 text-lg font-bold text-[var(--ink)] sm:text-xl">All ten calculators</h3>
          <ul className="mt-4 grid list-none gap-x-8 gap-y-2 pl-0 sm:grid-cols-2">
            {allTools().map((c) => (
              <li key={c.slug} className="text-sm leading-relaxed">
                <Link
                  href={`/calculators/${c.slug}`}
                  className={`font-semibold text-[var(--copper-strong)] underline decoration-2 underline-offset-4 ${focusRing} rounded`}
                >
                  {c.name}
                </Link>
                <span className="ml-2 text-[var(--muted)]">{c.oneLiner}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work with you */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            How we work with you
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            From free self-serve tools to full-service medical accounting.
          </p>
          <div className="mt-8">
            {/* featuredBadge="" explicitly, not omitted: omitting it leaves the
                shared component rendering its own default badge, which is a
                claim about what other readers chose. */}
            <ServiceTiers tiers={serviceTiers} featuredBadge="" />
          </div>
        </div>
      </section>

      {/* Added 2026-08-26: the corepage pack showed page-1 competitors
          carrying a median of 4.5 FAQs against our 1, and FAQPage MISSING
          from this page's commercial schema checklist. SERVICES_FAQS is the
          single binding: it feeds both this section and buildFaqPage above. */}
      <FaqSection
        className="bg-white py-12 sm:py-16 lg:py-20"
        eyebrow="FAQ"
        title="Questions about medical accounting services"
        faqs={SERVICES_FAQS}
      />

      <div id="book" className="scroll-mt-24" data-cta="services_book" data-cta-goal="form" data-cta-placement="services">
        <LeadCTAPanel
          contained
          ground="slate"
          title="Book a short scoping call"
          description="Walk us through your professional structure: your NHS commitments, private practice, and financial goals for the year ahead. We match the enquiry to a firm that works with doctors every day."
          proofPoints={MEDICAL_PROOF_POINTS}
          footnote="No obligation. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Ask a medical accountant" />}
        />
      </div>
    </>
  );
}
