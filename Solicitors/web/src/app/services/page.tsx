import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, btnOnCream, focusRing, siteContainerLg, sectionY, heroCreamSurface } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildService, buildBreadcrumbJsonLd, buildFaqPage, buildOrganizationJsonLd, JsonLd } from "@/lib/schema/index";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";

const TITLE = "Accountants for Solicitors and Lawyers UK | SRA, LLP + Partner Tax";
const DESCRIPTION =
  "Specialist accountants for solicitors and law firms across the UK. SRA Accounts Rules + accountant's reports, LLP and partnership accounting, professional indemnity, partner tax, practice valuation. Fixed monthly fees.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: {
      "en-GB": `${siteConfig.url}/services`,
      "x-default": `${siteConfig.url}/services`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/services`, type: "website" },
};

const SERVICES = [
  {
    eyebrow: "Regulatory",
    title: "SRA Accounts Rules + accountant's report",
    description:
      "We handle the SRA-mandated annual accountant's report, the five-weekly client account reconciliations, and the COFA support that keeps the report clean. The report is the floor. The work is making sure the firm's client account handling never gives the SRA a reason to ask.",
    features: [
      "SRA Accountant's Report annually within 6 months of period end",
      "Five-weekly client account reconciliations",
      "COFA support and breach reporting",
      "Client money interest policy review",
    ],
    href: "/services/sra-accounts-rules",
  },
  {
    eyebrow: "Structure",
    title: "Partnership + LLP accounting",
    description:
      "LLPs and partnerships are tax-transparent: members pay personal tax on their share of profit. The work is the allocation methodology, the Salaried Member Rules (FA 2014) audit, and the partner-by-partner self-assessment. We do it cleanly.",
    features: [
      "LLP accounts + SA800 partnership tax return",
      "Salaried Member Rules audit (Conditions A/B/C)",
      "Partner capital interest relief (ITA 2007 s.398)",
      "Profit allocation modelling for incoming/outgoing partners",
    ],
    href: "/services/llp-accounts",
  },
  {
    eyebrow: "Tax",
    title: "Tax planning for partners and fee-earners",
    description:
      "Proactive across the tax year. We model partner drawings, retained earnings, capital contributions and pension contribution timing at current rates. For salaried partners we audit the FA 2014 conditions so you know exactly which side of the line you're on.",
    features: [
      "Partner self-assessment and quarterly drawings reconciliation",
      "Spouse employment in the firm (defensibility audit)",
      "Personal pension contribution timing for partners",
      "Salaried partner FA 2014 audit",
    ],
    href: "/services/solicitor-accountants",
  },
  {
    eyebrow: "Sale",
    title: "Practice valuation + succession",
    description:
      "Law firm valuation is multiples of normalised profit (1-3x for partnership/LLP, more for specialist firms) plus WIP and tangible assets. Pre-sale planning needs 18-24 months. BADR rate rises from 14% to 18% on 6 April 2026, which materially changes timing.",
    features: [
      "Normalised profit + WIP modelling",
      "BADR pre-sale planning (timing the rate change)",
      "Section 162 incorporation relief for unincorporated firms",
      "Vendor financing structures + buyer-side due diligence",
    ],
    href: "/services/practice-valuation",
  },
  {
    eyebrow: "Compliance",
    title: "COFA + COLP compliance support",
    description:
      "If you've just stepped into the COFA or COLP role, or you've taken over from someone who left in a hurry, we help you bed in the controls. SRA Accounts Rules in plain English, a five-weekly reconciliation rhythm that actually holds, and breach reporting templates.",
    features: [
      "COFA onboarding for new appointments",
      "Reconciliation rhythm + evidence file setup",
      "Breach decision log + reporting templates",
      "AML supervision support and risk assessments",
    ],
    href: "/services/cofa-compliance-support",
  },
  {
    eyebrow: "Payroll",
    title: "Law firm payroll + auto-enrolment",
    description:
      "Trainees, paralegals, fee-earners, salaried partners. Each goes through PAYE under different employment-status reasoning. We run the payroll, manage the workplace pension, and audit the salaried-partner status quarterly so it never drifts.",
    features: [
      "PAYE + RTI submissions",
      "Workplace pension auto-enrolment compliance",
      "Salaried partner FA 2014 quarterly check",
      "Trainee solicitor onboarding payroll",
    ],
    href: "/services/llp-accounts",
  },
];

const PRICING_TIERS = [
  {
    name: "Essentials",
    eyebrow: "Sole practitioners + small firms",
    description: "Compliance floor for sole practitioners and 2-3 fee-earner firms. SRA Accountant's Report, statutory accounts, partnership/personal SA, basic tax planning.",
    features: [
      "Statutory accounts + SA800 / personal SA",
      "SRA Accountant's Report (if applicable)",
      "Basic VAT returns",
      "Quarterly check-in",
    ],
  },
  {
    name: "Growth",
    eyebrow: "Mid-sized LLPs + multi-partner",
    description: "For LLPs and partnerships scaling fee-earner headcount. Monthly management accounts, partner-level tax planning, salaried-partner audit, COFA support.",
    features: [
      "Everything in Essentials, plus:",
      "Monthly management accounts + KPI dashboard",
      "Salaried Member Rules quarterly audit",
      "COFA compliance support + breach review",
      "PII renewal timing + cost benchmarking",
    ],
    featured: true,
  },
  {
    name: "Specialist",
    eyebrow: "Practice sale + acquisition + complex",
    description: "Bespoke engagements: pre-sale planning, post-merger integration, ABS application support, complex partner structure design.",
    features: [
      "Practice valuation + pre-sale planning",
      "BADR + Section 162 incorporation modelling",
      "Post-merger COLP/COFA transition",
      "Acquisition financial due diligence",
      "ABS application support",
    ],
  },
];

const INCLUDED = [
  "Direct line to the senior accountant working your file (no junior triage)",
  "Fixed monthly fees, no hourly billing on routine work",
  "Quarterly partner / director review meeting included",
  "SRA Accounts Rules in plain English, not regulatory speak",
  "Five-weekly reconciliation rhythm support",
  "Specialist legal-sector software fluency (Xero + Leap, Clio, ProClaim)",
];

const FAQS = [
  {
    question: "Do you only work with solicitors?",
    answer:
      "Legal-sector work is our primary focus. Solicitors, LLPs, partnerships, sole practitioners, conveyancers, locum solicitors, COLPs and COFAs are the bulk of the book. Other professional-services firms occasionally, but we deliberately stay narrow enough to keep the sector knowledge deep.",
  },
  {
    question: "Can you complete our SRA Accountant's Report?",
    answer:
      "Yes. We are independent of your firm and qualified to deliver the SRA-mandated annual Accountant's Report under the Accounts Rules. The report must be filed within six months of your firm's accounting period end.",
  },
  {
    question: "We are an LLP. Do you handle the SA800 partnership return?",
    answer:
      "Yes, including the per-member allocation, the salaried-member FA 2014 audit, and each partner's personal self-assessment. We co-ordinate the LLP accounts filing at Companies House with the partnership tax return and personal returns so the picture is consistent across all three filings.",
  },
  {
    question: "What is the FA 2014 Salaried Member audit?",
    answer:
      "The Finance Act 2014 introduced rules that deem a member of an LLP as an employee for tax purposes if all three conditions are met: Condition A — disguised salary is at least 80% of total reward; Condition B — limited rights to influence the LLP's affairs; Condition C — capital contribution less than 25% of disguised salary. If all three apply, PAYE runs on drawings. We audit quarterly because the position can drift as the firm grows.",
  },
  {
    question: "We are thinking about converting from partnership to LLP. Help?",
    answer:
      "Yes. The conversion preserves the tax-transparent treatment but adds limited liability for members and a Companies House filing obligation. Most firms benefit; a minority don't (typically very small practices where the admin overhead outweighs the liability protection). We model the conversion economics, draft the partnership agreement updates required, and co-ordinate the Companies House process.",
  },
  {
    question: "Are you accountants for solicitors across the whole UK?",
    answer:
      "Yes. We are accountants for solicitors and law firms nationally, working remotely with practices from Cornwall to Scotland. Legal-sector accounting is location-independent (SRA Accounts Rules, LLP and partnership tax, and the annual Accountant's Report are the same wherever the firm sits), so we serve clients across England, Wales, Scotland and Northern Ireland rather than by postcode. Meetings run by video call, with the senior accountant on your file directly reachable.",
  },
  {
    question: "Do you act as accountants for lawyers and barristers?",
    answer:
      "Yes. Solicitors and law firm partners are the core of the book, and we also act for barristers, legal-sector consultants and conveyancers. The regulatory frame differs (barristers are BSB-regulated and do not hold client money the way solicitors do under the SRA Accounts Rules), so we scope the engagement to the specific practice type rather than applying a single legal-sector template.",
  },
  {
    question: "How are your fees structured?",
    answer:
      "Fixed monthly fees agreed up front, based on firm size and complexity rather than hourly billing on routine work. Sole practitioners and small firms typically start on our Essentials tier, scaling LLPs on Growth, and practice-sale or acquisition work is quoted bespoke under Specialist. You know the fee before you commit, and there is no hourly meter running on day-to-day questions.",
  },
];

export default function ServicesPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Services" }];
  const serviceSchema = {
    ...buildService({
      name: "Accountants for Solicitors and Lawyers",
      description: DESCRIPTION,
      path: "/services",
      serviceType: "Legal Sector Accountancy",
      category: "Professional Services Accountancy",
    }),
    // Point provider at the site-wide Organization node instead of a duplicate inline entity.
    provider: { "@id": `${siteConfig.url}#organization` },
  };
  // National LocalBusiness: we serve solicitors UK-wide, no single trading storefront.
  const orgSchema = buildOrganizationJsonLd();
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteConfig.url}/services#localbusiness`,
    name: siteConfig.name,
    description: DESCRIPTION,
    url: `${siteConfig.url}/services`,
    image: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    areaServed: { "@type": "Country", name: "GB" },
    parentOrganization: { "@id": `${siteConfig.url}#organization` },
  };
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = [orgSchema, serviceSchema, localBusinessSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero. Cream ground plus the ledger motif, replacing the crimson slab:
          the port's hero recipe, and it lets the breadcrumb and the secondary
          button use the standard on-light treatments. Copy is byte-identical. */}
      <section
        className={`relative flex min-h-[350px] items-center overflow-hidden py-10 sm:py-12 lg:py-14 ${heroCreamSurface}`}
      >
        <SolicitorsBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb items={breadcrumbItems} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Specialist services
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              Accountants for UK solicitors and law firms
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg">
              Specialist accountants for solicitors and lawyers across the whole of the UK. SRA Accounts Rules + accountant&apos;s report, LLP and partnership accounting, professional indemnity, partner tax, practice valuation. We work with law firms only, on fixed monthly fees, with the senior accountant on your account answering your emails.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/contact"
                data-cta="services_hero_book"
                data-cta-placement="services"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book a free scoping call
              </Link>
              <Link href="/free-firm-health-check" className={btnOnCream}>
                Take the firm health check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement tiers. Slate ground, white cards: a card's ground opposes
          its section's. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
              How we engage
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Three engagement tiers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Most firms start on Essentials or Growth, depending on size and complexity. Specialist is bespoke for the harder transactions: sale, acquisition, post-merger.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl bg-white p-6 shadow-sm sm:p-7 ${
                  tier.featured
                    ? "shadow-lg ring-2 ring-[var(--primary)]/30"
                    : "ring-1 ring-slate-200/70"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most chosen
                  </div>
                )}
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {tier.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{tier.description}</p>
                <ul className="mt-6 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards. White ground, slate cards: the ground oscillates
          against the band above. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
              What we cover
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Six service areas, all legal-sector specific
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className={`group block rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 transition-all hover:shadow-md hover:ring-[var(--primary)]/40 ${focusRing}`}
              >
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {s.eyebrow}
                </p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="mt-1.5 inline-flex h-1 w-1 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-primary-700 group-hover:underline">
                  Learn more &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's included. siteContainerLg is the measure, so the old
          max-w-4xl clamp nested inside it is gone. */}
      <section className="bg-slate-50">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
              Every engagement includes
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Standard across all tiers
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200/70"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                  &#10003;
                </span>
                <span className="text-sm leading-relaxed text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ. White ground, slate cards, no body clamp. */}
      <section className="bg-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Frequently asked
          </h2>
          <dl className="mt-10 grid gap-5 lg:grid-cols-2">
            {FAQS.map((f) => (
              <div
                key={f.question}
                className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-7"
              >
                <dt className="text-lg font-bold text-slate-900">{f.question}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing ask. Contained variant on a slate ground rather than the
          full-bleed navy band: this is the last section before the slate-900
          footer and navy must never touch navy. Heading and description are
          the old crimson band's own strings, byte for byte, and both of its
          links survive in the footnote so no href moves. */}
      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow=""
          title="Talk to a legal-sector specialist"
          description="30-minute scoping call. We'll tell you which engagement tier fits, what the fee would be, and whether the change is worth making. No drip sequence, no follow-up chase."
          proofPoints={[]}
          formTitle=""
          form={<LeadForm redirectOnSuccess={false} />}
          contained
          ground="slate"
          footnote={
            <>
              <Link
                href="/contact"
                data-cta="services_book"
                data-cta-placement="services"
                data-cta-goal="form"
                className="font-semibold text-primary-700 hover:underline"
              >
                Book your scoping call
              </Link>
              {" \u00b7 "}
              <Link
                href="/free-firm-health-check"
                className="font-semibold text-primary-700 hover:underline"
              >
                Take the health check
              </Link>
            </>
          }
        />
      </div>
    </>
  );
}
