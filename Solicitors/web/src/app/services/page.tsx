import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { btnPrimary, focusRing, siteContainerLg, sectionY, sectionYLoose } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildService, buildBreadcrumbJsonLd, buildFaqPage, JsonLd } from "@/lib/schema/index";

const TITLE = `Specialist Accountants for UK Solicitors and Law Firms | ${siteConfig.name}`;
const DESCRIPTION =
  "Specialist accountants for UK law firms. SRA accounts rules + accountant's reports, LLP and partnership accounting, professional indemnity, partner tax, practice valuation. Fixed fees.";

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
    monthly: "From £180/mo",
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
    monthly: "From £450/mo",
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
    monthly: "Bespoke",
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
  "Same-day response on regulatory or SRA-deadline questions",
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
      "Yes. We are independent of your firm and qualified to deliver the SRA-mandated annual Accountant's Report under the Accounts Rules. The report must be filed within six months of your firm's accounting period end. We work to that deadline as the backstop and aim to issue clean reports 4-6 weeks ahead so any issues are surfaced early.",
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
];

export default function ServicesPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Services" }];
  const serviceSchema = buildService({
    name: "Specialist Accountancy for UK Solicitors and Law Firms",
    description: DESCRIPTION,
    path: "/services",
    serviceType: "Legal Sector Accountancy",
    category: "Professional Services Accountancy",
  });
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              Specialist services
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Accountants for UK solicitors and law firms
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              SRA Accounts Rules + accountant&apos;s report, LLP and partnership accounting, professional indemnity, partner tax, practice valuation. We work with solicitors only, on fixed monthly fees, with the senior accountant on your account answering your emails.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={btnPrimary} style={{background: "white", color: "var(--primary)"}}>
                Book a free scoping call
              </Link>
              <Link href="/free-firm-health-check" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10">
                Take the firm health check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              How we engage
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Three engagement tiers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              Most firms start on Essentials or Growth, depending on size and complexity. Specialist is bespoke for the harder transactions: sale, acquisition, post-merger.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border bg-white p-6 sm:p-7 ${
                  tier.featured
                    ? "border-[var(--primary)] shadow-lg ring-2 ring-[var(--primary)]/20"
                    : "border-[var(--border)]"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most chosen
                  </div>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {tier.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[var(--ink)]">{tier.name}</h3>
                <p className="mt-2 font-serif text-lg font-semibold text-[var(--primary)]">{tier.monthly}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{tier.description}</p>
                <ul className="mt-6 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
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

      {/* Service cards */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
              What we cover
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Six service areas, all legal-sector specific
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className={`group block rounded-2xl border border-[var(--border)] bg-white p-6 transition-all hover:border-[var(--primary)] hover:shadow-md ${focusRing}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)] mb-2">
                  {s.eyebrow}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--primary)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                      <span className="mt-1.5 inline-flex h-1 w-1 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-[var(--primary)] group-hover:underline">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Every engagement includes
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                Standard across all tiers
              </h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--ink-soft)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Frequently asked
            </h2>
            <dl className="mt-10 space-y-5">
              {FAQS.map((f) => (
                <div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-white p-6 sm:p-7">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Talk to a legal-sector specialist
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              30-minute scoping call. We&apos;ll tell you which engagement tier fits, what the fee would be, and whether the change is worth making. No drip sequence, no follow-up chase.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90">
                Book your scoping call
              </Link>
              <Link href="/free-firm-health-check" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10">
                Take the health check
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
