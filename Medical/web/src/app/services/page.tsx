import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { JsonLd, buildServicePageSchema, buildFaqPage } from "@/lib/schema";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { StatsBar } from "@accounting-network/web-shared/components/StatsBar";
import { serviceTiers, siteStats } from "@/config/service-tiers";
import { allTools, toolPath } from "@/lib/tools/registry";

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
    body: "Year-end accounts and tax returns tailored for GPs, whether salaried or partners. We handle NHS and private income splits, partnership profit shares, and ensure full compliance with HMRC and NHS pension reporting.",
    links: [{ href: "/blog/gp-partnership-tax-complete-guide", label: "GP partnership tax guide" }],
  },
  {
    title: "NHS Pension Planning",
    body: "The measure for a defined benefit scheme is the pension input amount, the capitalised growth in your benefits, not the contributions you paid. The annual allowance is £60,000 for 2026/27, unchanged from 2025/26, tapering by £1 for every £2 of adjusted income above £260,000 where threshold income also exceeds £200,000, down to a £10,000 floor. Work covers the input calculation, carry-forward from the three previous tax years, and whether a Scheme Pays election is worth making. The lifetime allowance was abolished on 6 April 2024, so the retirement-side planning now works to the Lump Sum Allowance and the Lump Sum and Death Benefit Allowance instead.",
    links: [{ href: "/blog/nhs-pension-annual-allowance-complete-guide", label: "Annual allowance guidance" }],
  },
  {
    title: "Locum Tax & Compliance",
    body: "Tax planning and Self Assessment support for locum doctors. We specialise in managing multiple income streams, claiming professional expenses correctly, and ensuring efficient tax payments across engagements.",
    links: [{ href: "/blog/locum-doctor-expenses-what-you-can-claim", label: "Locum expenses guide" }],
  },
  {
    title: "Private Practice Incorporation",
    body: "Structured advice on setting up a limited company for your private practice. We cover profit extraction, corporation tax planning, and maintaining optimal tax efficiency between personal and business finances.",
    links: [{ href: "/blog/private-practice-incorporation-complete-guide", label: "Incorporation guide" }],
  },
  {
    title: "Medical Expense Claims",
    body: "Maximising legitimate expense claims for medical professionals, including professional subscriptions, indemnity insurance, equipment, and travel. We ensure claims are robust and fully compliant with HMRC rules.",
    links: [{ href: "/blog/medical-professional-expenses-what-is-claimable", label: "Claimable expenses" }],
  },
  {
    title: "Consultant Tax Planning",
    body: "Comprehensive tax services for hospital consultants balancing NHS work, private practice, and additional roles. We coordinate multiple income sources, pension contributions, and personal tax liabilities.",
    links: [],
  },
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
      "Sometimes, but less often than the headline corporation tax rate suggests, and the arithmetic changed on 6 April 2026 when dividend rates rose. Corporation tax is 19% on profits up to £50,000 and 25% above £250,000, with marginal relief between at an effective rate of about 26.5%. Against that, income routed through a company is not NHS-pensionable, so dividends buy no pension accrual at all, and a limited company cannot hold a GMS or PMS contract. For a GP partner with only NHS income it is usually the wrong answer. The genuine drivers are managing the annual allowance taper by keeping private income out of pensionable pay, retained earnings, and family shareholding, not the headline rate.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <JsonLd data={serviceSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <div className={`${contentNarrow} ${sectionY}`}>
        <Breadcrumb
          suppressJsonLd
          items={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          Medical accounting services for UK doctors
        </h1>
        <div className="mt-8">
          <StatsBar stats={siteStats} />
        </div>
        <p className="mt-8 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Medical accounting for GPs, consultants, locums and GP practices across the UK. The list below is the actual shape of the work rather than a menu: six areas, each of which has a specific technical problem at its centre, and most doctors need two or three of them rather than all six.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Accounting for doctors differs from general practice accounting in what has to be read, not in the standards applied. PCSE remittances, NHSBSA pension savings statements, Status Determination Statements from NHS Trusts, superannuation certificates, agency self-billing invoices and partnership profit allocations are all documents a generalist rarely handles and a medical accountant handles weekly.
        </p>

        <ol className="mt-10 list-none space-y-10 pl-0 sm:mt-12 sm:space-y-12">
          {sections.map((s, i) => (
            <li key={s.title}>
              <h2 className="font-serif text-xl font-semibold leading-snug text-[var(--ink)] sm:text-2xl">
                <span className="text-[var(--accent-strong)]">{i + 1}. </span>
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{s.body}</p>
              {s.links.length > 0 ? (
                <p className="mt-4 text-sm">
                  Related:{" "}
                  {s.links.map((l, idx) => (
                    <span key={l.href}>
                      {idx > 0 ? " · " : null}
                      <Link
                        href={l.href}
                        className={`font-medium text-[var(--accent-strong)] underline ${focusRing} rounded`}
                      >
                        {l.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
              <p className="mt-4 text-sm">
                <Link
                  href="/contact"
                  className={`inline-flex min-h-10 items-center font-semibold text-[var(--accent-strong)] underline ${focusRing} rounded`}
                >
                  Ask about this service
                </Link>
              </p>
            </li>
          ))}
        </ol>

        {/* Where we help */}
        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            Where we help
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            We work with GPs, consultants, and locum doctors throughout the UK. Location pages cover local context and how to book.
          </p>
          <ul className="mt-6 grid list-none gap-3 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((loc) => {
              const city = loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1);
              return (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className={`flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent-strong)] hover:shadow-sm ${focusRing}`}
                  >
                    <span className="text-sm font-semibold text-[var(--ink)]">{city}</span>
                    <span className="text-xs font-medium text-[var(--accent-strong)]">GP accountant →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Try our calculators */}
        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            Ten free medical tax calculators
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Instant estimates covering NHS Pension annual allowance and the taper, Scheme Pays, tiered superannuation contributions, locum tax, GP partner drawings, salaried GP versus partner, and the private practice incorporation comparison. No email gate, no sign-up.
          </p>
          {/* Driven off the tool registry rather than a hand-written list of
              three. The hand-written list said "3 free calculators" while ten
              were live, so the page understated itself by seven. */}
          <ul className="mt-6 grid list-none gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {allTools().map((c) => (
              <li key={c.slug}>
                <Link
                  href={toolPath(c.slug)}
                  className={`block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent-strong)] hover:shadow-sm ${focusRing}`}
                >
                  <h3 className="text-sm font-semibold text-[var(--ink)]">{c.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">{c.oneLiner}</p>
                  <span className="mt-3 block text-xs font-semibold text-[var(--accent-strong)]">Open calculator →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            How we work with you
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            From free self-serve tools to full-service medical accounting.
          </p>
          <div className="mt-6">
            <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
          </div>
        </section>

        {/* Added 2026-08-26: the corepage pack showed page-1 competitors
            carrying a median of 4.5 FAQs against our 1, and FAQPage MISSING
            from this page's commercial schema checklist. */}
        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            Questions about medical accounting services
          </h2>
          <div className="mt-6 space-y-3">
            {SERVICES_FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] open:shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-[var(--accent-strong)] transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </span>
                </summary>
                <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)]">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
          <CTASection
            title="Book a short scoping call"
            description="Walk us through your professional structure: your NHS commitments, private practice, and financial goals for the year ahead."
            primaryHref="/contact"
            secondaryHref="/blog"
            secondaryLabel="Read related articles"
          />
          <CTASection
            title="Prefer to start with content?"
            description="Our articles are written for UK medical professionals: practical, sector-specific, and free of generic tax advice."
            primaryHref="/blog"
            primaryLabel="Open the blog"
            secondaryHref="/about"
            secondaryLabel="Why we specialise"
          />
        </div>
      </div>
    </>
  );
}
